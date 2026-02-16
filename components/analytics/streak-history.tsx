'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Calendar } from 'lucide-react'

// Mock user streaks
const streaks = [
    { start: '2023-10-01', end: '2023-10-14', length: 14, current: false },
    { start: '2023-11-05', end: '2023-11-20', length: 15, current: false },
    { start: '2024-01-01', end: '2024-01-12', length: 12, current: true },
]

export function StreakHistory({ current, longest }: { current: number, longest: number }) {

    return (
        <Card className="glass-card bg-slate-900/40 border-slate-800">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-white">Streak Stats</CardTitle>
                    <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <CardDescription className="text-slate-400">Your discipline record</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Best Streak Highlight */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <div>
                            <div className="text-xs text-yellow-500 uppercase font-bold tracking-wider">All-Time Best</div>
                            <div className="text-2xl font-bold text-white">{longest} Days</div>
                        </div>
                        <Trophy className="h-8 w-8 text-yellow-500/40" />
                    </div>

                    {/* Current Streak Highlight */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <div>
                            <div className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Current Streak</div>
                            <div className="text-2xl font-bold text-white">{current} Days</div>
                        </div>
                        <Calendar className="h-8 w-8 text-indigo-500/40" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
