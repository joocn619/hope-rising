'use client'

import { useState, useEffect } from 'react'
import { X, Clock, AlertTriangle, CheckCircle, ChevronRight, Calculator, Calendar } from 'lucide-react'
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useAuth } from '@/components/providers/auth-provider'
import { UrgeLog } from '@/types/firestore'
import { cn } from '@/lib/utils'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TodayUrgesDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TodayUrgesDrawer({ isOpen, onClose }: TodayUrgesDrawerProps) {
    const { user } = useAuth()
    const [urges, setUrges] = useState<UrgeLog[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedUrge, setSelectedUrge] = useState<UrgeLog | null>(null)
    const [activeTab, setActiveTab] = useState<'today' | 'week'>('today')

    useEffect(() => {
        if (!isOpen || !user) return

        async function fetchUrges() {
            setLoading(true)
            setSelectedUrge(null)
            try {
                const now = new Date()
                let startDate = new Date()

                if (activeTab === 'today') {
                    startDate.setHours(0, 0, 0, 0)
                } else {
                    startDate.setDate(now.getDate() - 7)
                    startDate.setHours(0, 0, 0, 0)
                }

                const urgesRef = collection(db, 'urge_logs')
                const q = query(
                    urgesRef,
                    where('userId', '==', user?.uid),
                    where('createdAt', '>=', Timestamp.fromDate(startDate)),
                    orderBy('createdAt', 'desc')
                )

                const snapshot = await getDocs(q)
                const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UrgeLog))
                setUrges(logs)

            } catch (error) {
                console.error("Error fetching urges:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUrges()
    }, [isOpen, user, activeTab])

    const getStats = () => {
        const total = urges.length
        const clean = urges.filter(u => !u.actedOut).length
        const relapses = urges.filter(u => u.actedOut).length
        const avgIntensity = total > 0
            ? Math.round(urges.reduce((acc, u) => acc + u.urgeLevel, 0) / total * 10) / 10
            : 0

        return { total, clean, relapses, avgIntensity }
    }

    const formatTime = (timestamp: any) => {
        if (!timestamp) return '--:--'
        return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const formatDate = (timestamp: any) => {
        if (!timestamp) return ''
        return timestamp.toDate().toLocaleDateString([], { month: 'short', day: 'numeric' })
    }

    if (!isOpen) return null

    const stats = getStats()

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity animate-in fade-in"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-950 border-l border-white/10 shadow-2xl z-50 animate-in slide-in-from-right duration-300 flex flex-col">

                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Clock className="h-5 w-5 text-indigo-400" />
                        Urge History
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-6 py-4 bg-slate-900/30">
                    <Tabs defaultValue="today" value={activeTab} onValueChange={(v) => setActiveTab(v as 'today' | 'week')} className="w-full">
                        <TabsList className="w-full bg-slate-800">
                            <TabsTrigger value="today" className="flex-1">Today</TabsTrigger>
                            <TabsTrigger value="week" className="flex-1">Last 7 Days</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden relative">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                            Loading history...
                        </div>
                    ) : (
                        <ScrollArea className="h-full">
                            <div className="p-6 space-y-6">
                                {/* Summary Card (Only if data exists) */}
                                {urges.length > 0 && (
                                    <div className="bg-slate-900/60 rounded-xl p-4 border border-white/5 space-y-3">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-xs text-slate-400 uppercase tracking-wider">Total</p>
                                                <p className="text-2xl font-bold text-white">{stats.total}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-slate-400 uppercase tracking-wider">Avg Intensity</p>
                                                <div className="flex items-center gap-1">
                                                    <p className="text-2xl font-bold text-indigo-200">{stats.avgIntensity}</p>
                                                    <span className="text-xs text-slate-500">/10</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Bar */}
                                        <div className="flex h-2 rounded-full overflow-hidden bg-slate-800">
                                            <div style={{ width: `${(stats.clean / stats.total) * 100}%` }} className="bg-emerald-500" />
                                            <div style={{ width: `${(stats.relapses / stats.total) * 100}%` }} className="bg-red-500" />
                                        </div>

                                        {/* Relapse Warning */}
                                        {stats.relapses > 0 && (
                                            <div className="flex items-center gap-2 text-xs text-red-300 bg-red-500/10 p-2 rounded border border-red-500/20">
                                                <AlertTriangle className="h-3 w-3" />
                                                Relapse occurred. Be kind to yourself.
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Urge List */}
                                <div className="space-y-3">
                                    {urges.length === 0 ? (
                                        <div className="text-center py-12 text-slate-500 italic">
                                            No urges recorded for this period. <br />
                                            <span className="text-xs mt-2 block">That's a good thing!</span>
                                        </div>
                                    ) : (
                                        urges.map((urge) => (
                                            <div
                                                key={urge.id}
                                                onClick={() => setSelectedUrge(urge)}
                                                className="group bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 hover:border-indigo-500/30 rounded-lg p-4 cursor-pointer transition-all active:scale-[0.98]"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-sm font-semibold text-white">
                                                                {activeTab === 'week' && <span className="text-slate-400 font-normal mr-1">{formatDate(urge.createdAt)}</span>}
                                                                {formatTime(urge.createdAt)}
                                                            </span>
                                                            <span className={cn(
                                                                "text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide",
                                                                urge.urgeLevel >= 8 ? "bg-red-500/20 text-red-300" :
                                                                    urge.urgeLevel >= 5 ? "bg-orange-500/20 text-orange-300" :
                                                                        "bg-blue-500/20 text-blue-300"
                                                            )}>
                                                                Lvl {urge.urgeLevel}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-slate-300 line-clamp-1">{urge.triggerType || "Unknown Trigger"}</p>
                                                    </div>

                                                    {urge.actedOut ? (
                                                        <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                                            <X className="h-4 w-4 text-red-500" />
                                                        </div>
                                                    ) : (
                                                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </ScrollArea>
                    )}

                    {/* Detail Overlay (Mini Modal inside Drawer) */}
                    {selectedUrge && (
                        <div className="absolute inset-0 bg-slate-950/95 z-10 animate-in fade-in slide-in-from-bottom-10 flex flex-col">
                            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                                <button onClick={() => setSelectedUrge(null)} className="text-slate-400 hover:text-white flex items-center gap-1 text-sm">
                                    <ChevronRight className="h-4 w-4 rotate-180" /> Back
                                </button>
                                <span className="text-sm font-mono text-slate-500">
                                    {formatDate(selectedUrge.createdAt)} • {formatTime(selectedUrge.createdAt)}
                                </span>
                            </div>

                            <ScrollArea className="flex-1 p-6">
                                <div className="space-y-6">
                                    {/* Status Hero */}
                                    <div className={cn(
                                        "p-6 rounded-2xl border text-center space-y-2",
                                        selectedUrge.actedOut
                                            ? "bg-red-500/10 border-red-500/20"
                                            : "bg-emerald-500/10 border-emerald-500/20"
                                    )}>
                                        <div className={cn(
                                            "mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-2",
                                            selectedUrge.actedOut ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                                        )}>
                                            {selectedUrge.actedOut ? <X className="h-6 w-6" /> : <CheckCircle className="h-6 w-6" />}
                                        </div>
                                        <h3 className={cn("text-xl font-bold", selectedUrge.actedOut ? "text-red-100" : "text-emerald-100")}>
                                            {selectedUrge.actedOut ? "Relapse Logged" : "Victory Recorded"}
                                        </h3>
                                    </div>

                                    {/* Grid Details */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-900 p-4 rounded-xl border border-white/5">
                                            <p className="text-xs text-slate-500 mb-1">Intensity</p>
                                            <p className="text-2xl font-bold text-white">{selectedUrge.urgeLevel}<span className="text-sm font-normal text-slate-600">/10</span></p>
                                        </div>
                                        <div className="bg-slate-900 p-4 rounded-xl border border-white/5">
                                            <p className="text-xs text-slate-500 mb-1">Bucket</p>
                                            <p className="text-lg font-medium text-white capitalize">{selectedUrge.timeOfDay}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-xs text-slate-500 uppercase tracking-wider">Trigger</p>
                                            <p className="text-lg text-slate-200 bg-slate-900/50 p-3 rounded-lg border border-white/5">
                                                {selectedUrge.triggerType || "Unknown"}
                                            </p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-xs text-slate-500 uppercase tracking-wider">Emotional State</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedUrge.emotionalState ? (
                                                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm border border-indigo-500/30">
                                                        {selectedUrge.emotionalState}
                                                    </span>
                                                ) : (<span className="text-slate-500 italic">None recorded</span>)}
                                            </div>
                                        </div>

                                        {selectedUrge.notes && (
                                            <div className="space-y-1">
                                                <p className="text-xs text-slate-500 uppercase tracking-wider">Notes</p>
                                                <p className="text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg border border-white/5 italic">
                                                    "{selectedUrge.notes}"
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Metadata Footer */}
                                    {selectedUrge.dayOfWeek !== undefined && (
                                        <div className="pt-6 border-t border-white/5 flex gap-4 text-xs text-slate-600 font-mono">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Day: {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][selectedUrge.dayOfWeek]}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calculator className="h-3 w-3" />
                                                Hour: {selectedUrge.hourOfDay}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
