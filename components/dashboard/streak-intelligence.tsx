'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Shield, TrendingUp, Lock, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StreakIntelligenceProps {
    streak: number
}

export function StreakIntelligence({ streak }: StreakIntelligenceProps) {
    const [message, setMessage] = useState('')
    const [phase, setPhase] = useState('')
    const [icon, setIcon] = useState<any>(null)
    const [colorClass, setColorClass] = useState('')

    useEffect(() => {
        if (streak < 3) {
            setPhase('Vulnerable Phase')
            setMessage("This is your vulnerable phase. Protect your environment carefully.")
            setIcon(Shield)
            setColorClass("text-amber-400 border-amber-500/20 bg-amber-500/5")
        } else if (streak >= 3 && streak < 7) {
            setPhase('Early Momentum')
            setMessage("Early momentum phase. Stay consistent.")
            setIcon(Zap)
            setColorClass("text-blue-400 border-blue-500/20 bg-blue-500/5")
        } else if (streak >= 7 && streak < 14) {
            setPhase('Momentum Phase')
            setMessage("Momentum phase — don’t break the chain.")
            setIcon(TrendingUp)
            setColorClass("text-indigo-400 border-indigo-500/20 bg-indigo-500/5")
        } else {
            setPhase('Identity Shift')
            setMessage("Identity shift phase — you are rebuilding yourself.")
            setIcon(Lock)
            setColorClass("text-purple-400 border-purple-500/20 bg-purple-500/5")
        }
    }, [streak])

    const Icon = icon || Shield

    return (
        <div className="animate-fade-up delay-100">
            <div className={cn(
                "mt-2 rounded-lg border p-3 flex items-start gap-3 transition-all duration-500",
                colorClass
            )}>
                <div className={cn("p-1.5 rounded-full bg-slate-900/40 shrink-0 mt-0.5", colorClass.split(' ')[0])}>
                    <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                    <h4 className={cn("text-xs font-bold uppercase tracking-wider opacity-90", colorClass.split(' ')[0])}>
                        {phase}
                    </h4>
                    <p className={cn("text-xs font-medium opacity-80 leading-relaxed mt-0.5", colorClass.split(' ')[0])}>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    )
}
