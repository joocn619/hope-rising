'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

interface WeeklyReflectionProps {
    cleanCount: number
}

export function WeeklyReflection({ cleanCount }: WeeklyReflectionProps) {
    return (
        <Card className="glass-card bg-linear-to-br from-slate-900/40 to-indigo-950/20 border-slate-800 h-full flex items-center justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="h-24 w-24 text-indigo-500" />
            </div>

            <CardContent className="text-center p-6 relative z-10">
                <h3 className="text-indigo-300 font-medium mb-2 uppercase tracking-widest text-xs">Weekly Insight</h3>
                <p className="text-xl md:text-2xl font-serif text-slate-200 italic leading-relaxed">
                    &quot;You handled <span className="text-white font-bold not-italic">{cleanCount} urges</span> without relapse this week.&quot;
                </p>
                <div className="mt-4 inline-flex items-center text-xs text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full border border-white/5">
                    Keep pushing.
                </div>
            </CardContent>
        </Card>
    )
}
