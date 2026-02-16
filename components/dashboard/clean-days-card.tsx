'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import { useAuth } from '@/components/providers/auth-provider'
import { UrgeLog } from '@/types/firestore'
import { Calendar } from 'lucide-react'

export function CleanDaysCard() {
    const { user } = useAuth()
    const [cleanDays, setCleanDays] = useState(0)
    const [totalDays, setTotalDays] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return

        async function calculateCleanDays() {
            try {
                const now = new Date()
                const year = now.getFullYear()
                const month = now.getMonth()

                // Start of current month
                const startOfMonth = new Date(year, month, 1)
                // End of current month (or today if you prefer "days so far", but requirement says "month visual")
                // Let's use total days in month for the denominator, but mainly we act on data logged.

                // Get last day of month
                const endOfMonth = new Date(year, month + 1, 0)
                const daysInMonth = endOfMonth.getDate()
                setTotalDays(daysInMonth)

                const urgesRef = collection(db, 'urge_logs')
                const q = query(
                    urgesRef,
                    where('userId', '==', user?.uid),
                    where('createdAt', '>=', Timestamp.fromDate(startOfMonth)),
                    where('createdAt', '<=', Timestamp.fromDate(endOfMonth)),
                    where('actedOut', '==', true)
                )

                const snapshot = await getDocs(q)
                const relapses = snapshot.docs.map(doc => doc.data() as UrgeLog)

                // Get unique days with relapse
                const relapseDays = new Set(
                    relapses.map(log => log.createdAt.toDate().toDateString())
                )

                // But we only care about days *passed* so far? 
                // Or "Clean Days This Month" usually implies potential clean days.
                // Let's assume: Clean Days = (Days elapsed so far) - (Relapse Days) 
                // OR simpler: Total Days in Month - Relapse Days (assuming standard goal is full month)
                // Requirement: "cleanDays = totalDaysInMonth - relapseDaysCount"

                setCleanDays(daysInMonth - relapseDays.size)

            } catch (error) {
                console.error("Error calculating clean days:", error)
            } finally {
                setLoading(false)
            }
        }

        calculateCleanDays()
    }, [user])

    if (loading) {
        return (
            <Card className="h-full p-6 bg-slate-900/40 backdrop-blur-xl border-white/5 animate-pulse">
                <div className="h-4 w-24 bg-slate-800 rounded mb-4" />
                <div className="h-8 w-16 bg-slate-800 rounded mb-2" />
            </Card>
        )
    }

    const percentage = Math.round((cleanDays / totalDays) * 100)

    return (
        <Card className="h-full p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-200">Clean Days</h3>
                <Calendar className="h-5 w-5 text-indigo-400" />
            </div>

            <div>
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-white">{cleanDays}</span>
                    <span className="text-sm text-slate-500">/ {totalDays}</span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <p className="text-xs text-slate-400 mt-2 text-right">{percentage}% Success Rate</p>
            </div>
        </Card>
    )
}
