'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useAuth } from '@/components/providers/auth-provider'
import { UrgeLog } from '@/types/firestore'
import { Clock, AlertCircle, AlertTriangle, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RiskTimeCardProps {
    onSurvivalStart?: () => void;
}

export function RiskTimeCard({ onSurvivalStart }: RiskTimeCardProps) {
    const { user } = useAuth()
    const [riskyTime, setRiskyTime] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [isHighRiskNow, setIsHighRiskNow] = useState(false)

    // Match logic from UrgeLogForm
    const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
        const hour = new Date().getHours()
        if (hour < 12) return 'morning'
        if (hour < 17) return 'afternoon'
        if (hour < 21) return 'evening'
        return 'night'
    }

    useEffect(() => {
        if (!user) return

        async function analyzeRiskPattern() {
            try {
                const now = new Date()
                const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

                const urgesRef = collection(db, 'urge_logs')
                const q = query(
                    urgesRef,
                    where('userId', '==', user?.uid),
                    where('createdAt', '>=', Timestamp.fromDate(thirtyDaysAgo))
                )

                const snapshot = await getDocs(q)
                const logs = snapshot.docs.map(doc => doc.data() as UrgeLog)

                if (logs.length === 0) {
                    setRiskyTime(null)
                    return
                }

                // Count frequency by timeOfDay
                const counts: Record<string, number> = {}
                logs.forEach(log => {
                    const time = log.timeOfDay
                    counts[time] = (counts[time] || 0) + 1
                })

                // Find max
                let maxTime = ''
                let maxCount = 0

                Object.entries(counts).forEach(([time, count]) => {
                    if (count > maxCount) {
                        maxCount = count
                        maxTime = time
                    }
                })

                if (maxTime) {
                    const formattedMaxTime = maxTime.charAt(0).toUpperCase() + maxTime.slice(1)
                    setRiskyTime(formattedMaxTime)

                    // Check live risk
                    const currentBucket = getTimeOfDay()
                    if (currentBucket.toLowerCase() === maxTime.toLowerCase()) {
                        setIsHighRiskNow(true)
                    }
                }

            } catch (error) {
                console.error("Error analyzing time patterns:", error)
            } finally {
                setLoading(false)
            }
        }

        analyzeRiskPattern()
    }, [user])

    if (loading) {
        return (
            <Card className="h-full p-6 bg-slate-900/40 backdrop-blur-xl border-white/5 animate-pulse">
                <div className="h-4 w-24 bg-slate-800 rounded mb-4" />
                <div className="h-6 w-32 bg-slate-800 rounded" />
            </Card>
        )
    }

    return (
        <Card className={cn(
            "h-full p-6 backdrop-blur-xl transition-all duration-500 overflow-hidden relative flex flex-col justify-between",
            isHighRiskNow
                ? "bg-slate-900/60 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]"
                : "bg-slate-900/40 border-white/10"
        )}>
            {/* Background Glow for High Risk */}
            {isHighRiskNow && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -z-10" />
            )}

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className={cn("font-semibold", isHighRiskNow ? "text-red-200" : "text-slate-200")}>
                        {isHighRiskNow ? "⚠️ High Risk Window" : "Risk Pattern"}
                    </h3>
                    {isHighRiskNow ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
                    ) : (
                        <Clock className="h-5 w-5 text-rose-400" />
                    )}
                </div>

                <div>
                    {!isHighRiskNow && (
                        <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Most Active Time</p>
                    )}

                    {riskyTime ? (
                        <div className={cn(
                            "font-bold flex items-center gap-2",
                            isHighRiskNow ? "text-lg text-red-100 mb-2" : "text-2xl text-rose-200"
                        )}>
                            {isHighRiskNow
                                ? "You are currently in your high-risk window."
                                : riskyTime
                            }
                            {!isHighRiskNow && <AlertCircle className="h-4 w-4 text-rose-500" />}
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <p className="text-slate-500 italic">No patterns detected yet.</p>
                            <p className="text-xs text-slate-600">Keep tracking to unlock insights.</p>
                        </div>
                    )}

                    {!isHighRiskNow && riskyTime && (
                        <p className="text-xs text-slate-500 mt-2">
                            Based on last 30 days of activity.
                        </p>
                    )}
                </div>
            </div>

            {/* Action Button for High Risk */}
            {isHighRiskNow && onSurvivalStart && (
                <div className="mt-4 animate-in slide-in-from-bottom-4 fade-in duration-500">
                    <Button
                        onClick={onSurvivalStart}
                        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/50 hover:border-red-400 transition-all font-semibold"
                    >
                        Start Survival Mode
                    </Button>
                </div>
            )}

            {/* Smart Prevention Suggestion */}
            {riskyTime && !isHighRiskNow && (
                <div className="mt-4 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-purple-500/10 rounded-full mt-0.5">
                            <Lightbulb className="h-3.5 w-3.5 text-purple-400" />
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-purple-200 mb-0.5">Smart Prevention</h4>
                            <p className="text-xs text-purple-200/70 leading-relaxed">
                                {getSuggestion(riskyTime)}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* DEBUG: Remove in production */}
            {/* <div className="mt-4 p-2 bg-black/50 text-[10px] font-mono text-slate-500 rounded">
                 DEBUG: Now={new Date().getHours()}h | Bucket={getTimeOfDay()} | Risk={riskyTime} | Match={isHighRiskNow ? 'YES' : 'NO'}
            </div> */}
        </Card>
    )
}

function getSuggestion(timeOfDay: string): string {
    const time = timeOfDay.toLowerCase()
    switch (time) {
        case 'morning':
            return "Mornings are your toughest time. Try a cold shower or a structured 10-minute plan immediately after waking up."
        case 'afternoon':
            return "Afternoons settle in. Avoid being alone—schedule a gym session, a walk, or call a friend during this window."
        case 'evening':
            return "Evenings trigger you. Have a structured hobby or routine ready. Don't just 'relax' without a plan."
        case 'night':
            return "Late nights are dangerous. Charge your phone outside your room and set a strict sleep hygiene routine."
        default:
            return "Stay vigilant and stick to your routine."
    }
}
