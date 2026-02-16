'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Trophy, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MilestonesProps {
    streak: number
}

const MILESTONES = [3, 7, 14, 30]

export function Milestones({ streak }: MilestonesProps) {
    return (
        <Card className="glass-card bg-slate-900/40 border-slate-800 h-full">
            <CardHeader>
                <CardTitle className="text-slate-200 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Clean Streak Milestones
                </CardTitle>
                <p className="text-xs text-slate-500">Unlocked by your current clean streak.</p>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4 justify-between">
                    {MILESTONES.map((days) => {
                        const unlocked = streak >= days
                        return (
                            <div key={days} className="flex flex-col items-center gap-2">
                                <div className={cn(
                                    "relative flex items-center justify-center h-14 w-14 rounded-full border-2 transition-all duration-500",
                                    unlocked
                                        ? "border-purple-500 bg-linear-to-br from-purple-600/30 to-blue-600/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                        : "border-slate-800 bg-slate-900/50 grayscale opacity-70"
                                )}>
                                    {unlocked ? (
                                        <span className="font-bold text-white text-sm">{days}d</span>
                                    ) : (
                                        <Lock className="h-5 w-5 text-slate-600" />
                                    )}
                                </div>
                                <span className={cn(
                                    "text-xs font-medium transition-colors",
                                    unlocked ? "text-purple-300" : "text-slate-600"
                                )}>
                                    {days} Days
                                </span>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
