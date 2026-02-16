'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, Trophy, TrendingUp } from 'lucide-react'

import { useRouter } from 'next/navigation'

interface StatsCardsProps {
    streak: number;
    urgesToday: number;
    programDay: number;
    hideUpgrade?: boolean;
    onUrgesClick?: () => void;
    streakIntelligence?: React.ReactNode;
}

export function StatsCards({ streak, urgesToday, programDay, hideUpgrade, onUrgesClick, streakIntelligence }: StatsCardsProps) {
    const router = useRouter()

    return (
        <div className={hideUpgrade ? "contents" : "grid gap-4 md:grid-cols-2 lg:grid-cols-4"}>
            <Card className="glass-card bg-slate-900/40 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-200">
                        Current Streak
                    </CardTitle>
                    <Flame className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">{streak} Days</div>
                    <p className="text-xs text-slate-400 mb-2">
                        Keep the fire burning!
                    </p>
                    {streakIntelligence}
                </CardContent>
            </Card>
            <Card className="glass-card bg-slate-900/40 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-200">
                        Program Progress
                    </CardTitle>
                    <Trophy className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">Day {programDay}</div>
                    <p className="text-xs text-slate-400">
                        7-Day Reset Program
                    </p>
                    <div className="mt-2 h-1 w-full rounded-full bg-slate-800">
                        <div
                            className="h-1 rounded-full bg-indigo-500"
                            style={{ width: `${(programDay / 7) * 100}%` }}
                        />
                    </div>
                </CardContent>
            </Card>
            <Card
                className="glass-card bg-slate-900/40 border-slate-800 cursor-pointer hover:border-red-500/30 transition-all hover:bg-slate-900/60 group"
                onClick={onUrgesClick}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-200 group-hover:text-red-200 transition-colors">
                        Urges Today
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform origin-left">{urgesToday}</div>
                    <p className="text-xs text-slate-400 group-hover:text-slate-300">
                        Stay strong. You got this.
                    </p>
                </CardContent>
            </Card>
            {!hideUpgrade && (
                <Card className="relative glass-card border-0 overflow-hidden group cursor-pointer" onClick={() => router.push('/dashboard/subscription')}>
                    {/* Animated Gradient Border */}
                    <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-indigo-500 to-purple-600 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-[1px] bg-[#0f172a] rounded-xl z-0" />

                    <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-indigo-300">
                            Upgrade to Pro
                        </CardTitle>
                        <Trophy className="h-4 w-4 text-indigo-400 group-hover:text-purple-400 transition-colors" />
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-2xl font-bold text-white mb-1">Unlock</div>
                        <p className="text-xs text-slate-400 mb-3 group-hover:text-slate-300 transition-colors">
                            30-Day Transformation
                        </p>
                        <button
                            className="w-full text-xs bg-linear-to-r from-indigo-600 to-purple-600 text-white px-3 py-2 rounded-lg font-bold hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all hover:scale-[1.02]"
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push('/dashboard/subscription');
                            }}
                        >
                            Upgrade Now
                        </button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
