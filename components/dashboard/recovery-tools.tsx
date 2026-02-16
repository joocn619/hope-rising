'use client'

import { Card } from '@/components/ui/card'
import { Timer, Zap, Heart, X, Play, RotateCcw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function RecoveryTools() {
    const router = useRouter()
    const [activeTool, setActiveTool] = useState<'timer' | 'grounding' | null>(null)

    // -- Urge Timer Logic --
    const [timeLeft, setTimeLeft] = useState(60)
    const [timerActive, setTimerActive] = useState(false)

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [timerActive, timeLeft])

    const startTimer = () => {
        setTimerActive(true)
    }

    const resetTimer = () => {
        setTimerActive(false)
        setTimeLeft(60)
    }

    const closeModals = () => {
        setActiveTool(null)
        resetTimer()
    }

    const tools = [
        {
            id: 'timer',
            title: "Urge Timer",
            icon: Timer,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            action: "Track Urge",
            onClick: () => setActiveTool('timer')
        },
        {
            id: 'grounding',
            title: "Quick Grounding",
            icon: Zap,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            action: "Start Breathing",
            onClick: () => setActiveTool('grounding')
        },
        {
            id: 'why',
            title: "My Why",
            icon: Heart,
            color: "text-red-400",
            bg: "bg-red-500/10",
            action: "View Motivation",
            onClick: () => router.push('/dashboard/journal')
        }
    ]

    return (
        <>
            <div className="grid gap-4 md:grid-cols-3">
                {tools.map((tool) => (
                    <button key={tool.id} onClick={tool.onClick} className="group text-left">
                        <Card className="h-full glass-card bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform`}>
                                    <tool.icon className="h-6 w-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">{tool.title}</h3>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{tool.action}</p>
                            </div>
                        </Card>
                    </button>
                ))}
            </div>

            {/* --- MOdal Overlay --- */}
            {activeTool && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">

                    {/* URGE TIMER MODAL */}
                    {activeTool === 'timer' && (
                        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
                            <button
                                onClick={closeModals}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="text-center space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Ride the Wave</h3>
                                    <p className="text-slate-400 text-sm">Most urges last less than 60 seconds.</p>
                                </div>

                                <div className="relative h-48 w-48 mx-auto flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                                    <div
                                        className="absolute inset-0 rounded-full border-4 border-orange-500 transition-all duration-1000"
                                        style={{ clipPath: `inset(${100 - (timeLeft / 60) * 100}% 0 0 0)` }}
                                    />
                                    <div className="text-5xl font-mono font-bold text-white tabular-nums">
                                        {timeLeft}
                                    </div>
                                </div>

                                {timeLeft === 0 ? (
                                    <div className="space-y-4">
                                        <div className="text-green-400 font-medium text-lg animate-pulse">
                                            You made it. The urge passed.
                                        </div>
                                        <Button onClick={closeModals} className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                                            Close
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-slate-300 animate-pulse">Breathe deeply...</p>
                                        {!timerActive ? (
                                            <Button onClick={startTimer} size="lg" className="w-full bg-orange-600 hover:bg-orange-500 text-white rounded-full">
                                                <Play className="mr-2 h-4 w-4" /> Start Timer
                                            </Button>
                                        ) : (
                                            <Button onClick={resetTimer} variant="outline" className="w-full border-slate-700 text-slate-400 hover:bg-slate-800">
                                                <RotateCcw className="mr-2 h-4 w-4" /> Reset
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* GROUNDING MODAL */}
                    {activeTool === 'grounding' && (
                        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
                            <button
                                onClick={closeModals}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="text-center space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Box Breathing</h3>
                                    <p className="text-slate-400 text-sm">Inhale 4s • Hold 4s • Exhale 4s • Hold 4s</p>
                                </div>

                                <div className="relative h-48 w-48 mx-auto flex items-center justify-center">
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-[ping_4s_ease-in-out_infinite]" />
                                    <div className="h-32 w-32 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-md border border-blue-500/30 animate-[pulse_4s_ease-in-out_infinite]">
                                        <Zap className="h-10 w-10 text-blue-400" />
                                    </div>
                                </div>

                                <div className="text-slate-300 text-lg font-medium">
                                    Focus on the circle...
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </>
    )
}
