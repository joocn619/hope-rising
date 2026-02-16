'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea' // Assuming this exists or using standard input
import { Lock, PenLine, ShieldCheck } from 'lucide-react'
import { doc, updateDoc, getDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useAuth } from '@/components/providers/auth-provider'
import { cn } from '@/lib/utils'

export function CommitmentCard() {
    const { user } = useAuth()
    const [commitment, setCommitment] = useState<string | null>(null)
    const [createdAt, setCreatedAt] = useState<Date | null>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (!user) return

        async function fetchCommitment() {
            try {
                const docRef = doc(db, 'users', user!.uid)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const data = docSnap.data()
                    if (data.commitmentStatement) {
                        setCommitment(data.commitmentStatement)
                        if (data.commitmentCreatedAt) {
                            setCreatedAt(data.commitmentCreatedAt.toDate())
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching commitment:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCommitment()
    }, [user])

    const handleSave = async () => {
        if (!user || !inputValue.trim()) return

        setIsSaving(true)
        try {
            const now = new Date()
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                commitmentStatement: inputValue,
                commitmentCreatedAt: Timestamp.fromDate(now)
            })

            setCommitment(inputValue)
            setCreatedAt(now)
            setIsEditing(false)
        } catch (error) {
            console.error("Error saving commitment:", error)
        } finally {
            setIsSaving(false)
        }
    }

    if (loading) {
        return (
            <Card className="glass-card bg-slate-900/40 border-slate-800 animate-pulse h-40">
                <CardContent className="h-full flex items-center justify-center">
                    <div className="h-4 w-32 bg-slate-800 rounded" />
                </CardContent>
            </Card>
        )
    }

    const hasCommitment = commitment && !isEditing

    return (
        <Card className={cn(
            "relative overflow-hidden transition-all duration-500",
            hasCommitment
                ? "bg-linear-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.05)]"
                : "bg-slate-900/40 border-slate-800"
        )}>
            {/* Background Effects */}
            {hasCommitment && (
                <>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -z-10 translate-y-1/2 -translate-x-1/2" />
                </>
            )}

            <CardContent className="p-6 sm:p-8">
                {hasCommitment ? (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in zoom-in-95 duration-500">
                        <div className="space-y-4 max-w-2xl">
                            <div className="flex items-center gap-2 text-purple-400 mb-1">
                                <Lock className="h-4 w-4" />
                                <span className="text-xs font-semibold uppercase tracking-wider">Ironclad Commitment</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-serif font-medium text-white/90 leading-relaxed italic">
                                "{commitment}"
                            </h3>

                            {createdAt && (
                                <p className="text-sm text-slate-500">
                                    Locked on {createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col items-center justify-center gap-2 min-w-[100px] border-l border-white/5 pl-6 md:pl-8">
                            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                <ShieldCheck className="h-6 w-6 text-purple-400" />
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setInputValue(commitment || '')
                                    setIsEditing(true)
                                }}
                                className="text-xs text-slate-500 hover:text-white h-auto py-1 px-2"
                            >
                                <PenLine className="h-3 w-3 mr-1" /> Edit
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-medium text-slate-200">
                                Define Your Why
                            </CardTitle>
                            <p className="text-sm text-slate-400">
                                Make a solemn promise to yourself. This will be locked on your dashboard daily.
                            </p>
                        </CardHeader>

                        <div className="relative">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="I promise to stay clean for 30 days because..."
                                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none min-h-[100px]"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            {isEditing && commitment && (
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsEditing(false)}
                                    className="text-slate-400 hover:text-white"
                                >
                                    Cancel
                                </Button>
                            )}
                            <Button
                                onClick={handleSave}
                                disabled={!inputValue.trim() || isSaving}
                                className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20"
                            >
                                {isSaving ? "Locking..." : "Lock Commitment"}
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
