'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { collection, query, where, getDocs, Timestamp, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useAuth } from '@/components/providers/auth-provider'
import { UrgeLog } from '@/types/firestore'
import { Zap, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TodaysFocusStrip() {
    const { user } = useAuth()
    const [focusMessage, setFocusMessage] = useState('')
    const [riskTime, setRiskTime] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [hasRecentRelapse, setHasRecentRelapse] = useState(false)

    useEffect(() => {
        if (!user) return

        async function fetchIntelligence() {
            try {
                // 1. Fetch recent logs for Risk Analysis (Last 30 days for pattern)
                const now = new Date()
                const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
                const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000)

                const urgesRef = collection(db, 'urge_logs')

                // Pattern Query
                const patternQuery = query(
                    urgesRef,
                    where('userId', '==', user?.uid),
                    where('createdAt', '>=', Timestamp.fromDate(thirtyDaysAgo))
                )

                const snapshot = await getDocs(patternQuery)
                const logs = snapshot.docs.map(doc => doc.data() as UrgeLog)

                // 2. Check for recent relapse (Last 48 hours)
                const recentRelapse = logs.some(log =>
                    log.actedOut &&
                    log.createdAt.toDate() > twoDaysAgo
                )
                setHasRecentRelapse(recentRelapse)

                // 3. Calculate Risk Time
                if (logs.length > 0) {
                    const counts: Record<string, number> = {}
                    logs.forEach(log => {
                        const time = log.timeOfDay
                        counts[time] = (counts[time] || 0) + 1
                    })

                    let maxTime = ''
                    let maxCount = 0

                    Object.entries(counts).forEach(([time, count]) => {
                        if (count > maxCount) {
                            maxCount = count
                            maxTime = time
                        }
                    })

                    if (maxTime) {
                        const formattedTime = maxTime.charAt(0).toUpperCase() + maxTime.slice(1)
                        setRiskTime(formattedTime)
                        setFocusMessage(getRiskMessage(formattedTime))
                    } else {
                        setFocusMessage("Stay structured today. Avoid idle time.")
                    }
                } else {
                    setFocusMessage("Stay structured today. Avoid idle time.")
                }

            } catch (error) {
                console.error("Error fetching focus intelligence:", error)
                setFocusMessage("Stay structured today. Avoid idle time.")
            } finally {
                setLoading(false)
            }
        }

        fetchIntelligence()
    }, [user])

    const getRiskMessage = (time: string) => {
        switch (time.toLowerCase()) {
            case 'morning':
                return "Since Mornings are your riskier time, build a solid routine immediately upon waking."
            case 'afternoon':
                return "If Afternoon is your highest risk period, avoid isolation and schedule movement or social activity between 2–5 PM."
            case 'evening':
                return "Evenings are high risk. Plan a specific hobby or activity to bridge the gap between work and sleep."
            case 'night':
                return "Nighttime brings risk. Keep devices out of the bedroom and stick to a strict sleep schedule."
            default:
                return "Stay structured today. Avoid idle time."
        }
    }

    if (loading) return null

    return (
        <div className="animate-fade-up delay-200 mb-8">
            <div className={cn(
                "relative overflow-hidden rounded-xl border p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-500",
                hasRecentRelapse
                    ? "bg-red-950/20 border-red-500/20"
                    : "bg-slate-900/40 border-purple-500/20 backdrop-blur-md"
            )}>
                {/* Background Gradient */}
                <div className={cn(
                    "absolute top-0 left-0 w-1 h-full",
                    hasRecentRelapse ? "bg-red-500" : "bg-purple-500"
                )} />

                <div className="flex items-center gap-3 shrink-0">
                    <div className={cn(
                        "p-2 rounded-full",
                        hasRecentRelapse ? "bg-red-500/10 text-red-400" : "bg-purple-500/10 text-purple-400"
                    )}>
                        {hasRecentRelapse ? <AlertTriangle className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                    </div>
                    <span className={cn(
                        "text-xs font-bold tracking-widest uppercase",
                        hasRecentRelapse ? "text-red-400" : "text-purple-400"
                    )}>
                        TODAY'S FOCUS
                    </span>
                </div>

                <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200 leading-relaxed">
                        {focusMessage}
                    </p>
                    {hasRecentRelapse && (
                        <p className="text-xs text-red-300 mt-1 flex items-center gap-1.5">
                            <ShieldIcon className="h-3 w-3" />
                            Extra caution recommended today due to recent slip.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

function ShieldIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    )
}
