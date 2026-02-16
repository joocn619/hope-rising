'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useAuth } from '@/components/providers/auth-provider'
import { UrgeLog } from '@/types/firestore'
import { Activity, AlertTriangle, CheckCircle, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

type RecoveryRisk = 'LOW' | 'MEDIUM' | 'HIGH'

export function RecoveryStateCard() {
    const { user } = useAuth()
    const [risk, setRisk] = useState<RecoveryRisk>('LOW')
    const [loading, setLoading] = useState(true)
    const [reason, setReason] = useState("No recent urges detected.")

    useEffect(() => {
        if (!user) return

        async function analyzeRisk() {
            try {
                const now = new Date()
                const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000)
                const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

                const urgesRef = collection(db, 'urge_logs')
                const q = query(
                    urgesRef,
                    where('userId', '==', user?.uid),
                    where('createdAt', '>=', Timestamp.fromDate(fortyEightHoursAgo)),
                    orderBy('createdAt', 'desc')
                )

                const snapshot = await getDocs(q)
                const logs = snapshot.docs.map(doc => doc.data() as UrgeLog)

                const relapseExists = logs.some(log => log.actedOut)
                const urgeCountLast24h = logs.filter(log =>
                    log.createdAt.toDate() >= twentyFourHoursAgo
                ).length

                if (relapseExists) {
                    setRisk('HIGH')
                    setReason("Recent relapse detected.")
                } else if (urgeCountLast24h >= 3) {
                    setRisk('MEDIUM')
                    setReason(`${urgeCountLast24h} urges in the last 24h.`)
                } else {
                    setRisk('LOW')
                    setReason("Stable recovery state.")
                }

            } catch (error) {
                console.error("Error analyzing recovery risk:", error)
            } finally {
                setLoading(false)
            }
        }

        analyzeRisk()
    }, [user])

    if (loading) {
        return (
            <Card className="h-full p-6 bg-slate-900/40 backdrop-blur-xl border-white/5 animate-pulse">
                <div className="h-4 w-24 bg-slate-800 rounded mb-4" />
                <div className="h-8 w-16 bg-slate-800 rounded mb-2" />
                <div className="h-4 w-32 bg-slate-800 rounded" />
            </Card>
        )
    }

    const config = {
        LOW: {
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            shadow: 'shadow-emerald-500/10',
            icon: CheckCircle,
            label: 'Stable'
        },
        MEDIUM: {
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            shadow: 'shadow-amber-500/10',
            icon: Shield,
            label: 'Caution'
        },
        HIGH: {
            color: 'text-red-400',
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
            shadow: 'shadow-red-500/10',
            icon: AlertTriangle,
            label: 'High Risk'
        }
    }

    const state = config[risk]
    const Icon = state.icon

    return (
        <Card className={cn(
            "h-full p-6 backdrop-blur-xl border transition-all duration-500",
            "bg-slate-900/40 border-white/10",
            risk === 'HIGH' && "animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.2)]"
        )}>
            <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-slate-200">Recovery State</h3>
                <Icon className={cn("h-5 w-5", state.color)} />
            </div>

            <div className="flex items-center gap-3 mb-2">
                <div className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold border",
                    state.bg, state.color, state.border, state.shadow
                )}>
                    {state.label}
                </div>
            </div>

            <p className="text-sm text-slate-400 mt-2">
                {reason}
            </p>
        </Card>
    )
}
