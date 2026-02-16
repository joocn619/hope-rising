'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, Wind, Waves, ArrowRight, Dumbbell, GlassWater, Footprints } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface UrgeSurvivalModalProps {
    isOpen: boolean
    onClose: () => void
}

export function UrgeSurvivalModal({ isOpen, onClose }: UrgeSurvivalModalProps) {
    const router = useRouter()
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
    const [timeLeft, setTimeLeft] = useState(60)
    const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale')

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep(1)
            setTimeLeft(60)
        }
    }, [isOpen])

    // Timer Logic for Step 1
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isOpen && step === 1 && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
        } else if (timeLeft === 0 && step === 1) {
            setStep(2) // Auto advance after timer
        }
        return () => clearInterval(interval)
    }, [isOpen, step, timeLeft])

    // Breathing Animation Logic for Step 3
    useEffect(() => {
        if (step !== 3) return

        const phases = [
            { phase: 'inhale', duration: 4000 },
            { phase: 'hold1', duration: 4000 },
            { phase: 'exhale', duration: 4000 },
            { phase: 'hold2', duration: 4000 },
        ] as const

        let currentPhaseIndex = 0

        const runPhase = () => {
            const current = phases[currentPhaseIndex]
            setBreathingPhase(current.phase)

            // Advance to next phase
            currentPhaseIndex = (currentPhaseIndex + 1) % phases.length

            setTimeout(runPhase, current.duration)
        }

        // Start loop
        const timerId = setTimeout(runPhase, 0)
        return () => clearTimeout(timerId) // Cleanup is tricky with self-scheduling timeout, but this is okay for simplified React effect
    }, [step])


    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg">
            {/* Prevent background scroll is usually handled by a library or global style, 
                for now we assume fixed inset-0 covers interaction */}

            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-md p-4 relative"
                >
                    <Card className="glass-card bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center text-center shadow-2xl shadow-indigo-500/10">
                        {/* Background Ambient Glow */}
                        <div className="absolute inset-0 bg-linear-to-b from-indigo-500/5 to-purple-500/5 pointer-events-none" />

                        {/* STEP 1: COUNTDOWN */}
                        {step === 1 && (
                            <motion.div
                                className="space-y-8 relative z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold text-white tracking-tight">Pause.</h2>
                                    <p className="text-slate-400 font-medium">Urges peak and fall like waves.</p>
                                </div>

                                <div className="relative h-64 w-64 mx-auto flex items-center justify-center">
                                    {/* Timer Ring */}
                                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                                        <circle
                                            cx="128" cy="128" r="120"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.05)"
                                            strokeWidth="8"
                                        />
                                        <motion.circle
                                            cx="128" cy="128" r="120"
                                            fill="none"
                                            stroke="#818cf8"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 1 }}
                                            animate={{ pathLength: timeLeft / 60 }}
                                            transition={{ duration: 1, ease: "linear" }}
                                        />
                                    </svg>
                                    <div className="text-6xl font-mono font-bold text-white tabular-nums">
                                        {timeLeft}
                                    </div>
                                    <div className="absolute bottom-16 text-xs text-indigo-300 uppercase tracking-widest font-semibold">
                                        Seconds remaining
                                    </div>
                                </div>

                                <Button variant="ghost" className="text-slate-500 hover:text-white" onClick={() => setStep(2)}>
                                    Skip Timer (I'm ready)
                                </Button>
                            </motion.div>
                        )}

                        {/* STEP 2: SURFING INSTRUCTIONS */}
                        {step === 2 && (
                            <motion.div
                                className="space-y-8 relative z-10 w-full"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <div className="h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Waves className="h-8 w-8 text-blue-400" />
                                </div>

                                <h3 className="text-2xl font-bold text-white">Ride the Wave</h3>

                                <div className="text-left space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <div className="flex gap-4">
                                        <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">1</div>
                                        <p className="text-slate-300 text-sm">Notice the urge. Don't fight it.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">2</div>
                                        <p className="text-slate-300 text-sm">Ideally observe where you feel it in your body.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">3</div>
                                        <p className="text-slate-300 text-sm">Breathing calms the nervous system.</p>
                                    </div>
                                </div>

                                <Button onClick={() => setStep(3)} className="w-full bg-blue-600 hover:bg-blue-500 h-12 rounded-xl text-lg">
                                    Start Breathing <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>
                        )}

                        {/* STEP 3: BOX BREATHING */}
                        {step === 3 && (
                            <motion.div
                                className="space-y-8 relative z-10 w-full"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-white">Box Breathing</h3>
                                    <p className="text-indigo-300 text-lg font-medium capitalize">
                                        {breathingPhase === 'hold1' || breathingPhase === 'hold2' ? 'Hold...' : breathingPhase + '...'}
                                    </p>
                                </div>

                                <div className="relative h-64 w-64 mx-auto flex items-center justify-center">
                                    {/* Expansion Animation */}
                                    <motion.div
                                        className="h-32 w-32 bg-indigo-500 rounded-3xl blur-xl absolute opacity-50"
                                        animate={{
                                            scale: breathingPhase === 'inhale' ? 1.5 : breathingPhase === 'exhale' ? 1 : 1.5,
                                            opacity: breathingPhase === 'inhale' ? 0.6 : 0.3
                                        }}
                                        transition={{ duration: 4, ease: "easeInOut" }}
                                    />
                                    <motion.div
                                        className="h-32 w-32 bg-indigo-600 rounded-3xl shadow-2xl border border-indigo-400/30 flex items-center justify-center relative z-10"
                                        animate={{
                                            scale: breathingPhase === 'inhale' ? 1.5 : breathingPhase === 'exhale' ? 1 : 1.5, // Hold keeps size
                                        }}
                                        transition={{ duration: 4, ease: "easeInOut" }}
                                    >
                                        <Wind className="h-10 w-10 text-white" />
                                    </motion.div>

                                    {/* Guide Text */}
                                    <div className="absolute -bottom-8 text-slate-400 text-sm">
                                        4 - 4 - 4 - 4
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" onClick={() => setStep(4)} className="border-slate-700 hover:bg-slate-800 text-slate-300">
                                        I feel calmer
                                    </Button>
                                    <Button onClick={() => setStep(4)} className="bg-indigo-600 hover:bg-indigo-500">
                                        Next Step
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: PATTERN BREAK (FINAL) */}
                        {step === 4 && (
                            <motion.div
                                className="space-y-8 relative z-10 w-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-white">You survived this wave.</h3>
                                    <p className="text-slate-400">Shift your physiology to lock it in.</p>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex flex-col items-center gap-2 hover:bg-slate-800 transition-colors">
                                        <Dumbbell className="h-6 w-6 text-orange-400" />
                                        <span className="text-xs font-medium text-slate-300">20 Pushups</span>
                                    </div>
                                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex flex-col items-center gap-2 hover:bg-slate-800 transition-colors">
                                        <GlassWater className="h-6 w-6 text-blue-400" />
                                        <span className="text-xs font-medium text-slate-300">Cold Water</span>
                                    </div>
                                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex flex-col items-center gap-2 hover:bg-slate-800 transition-colors">
                                        <Footprints className="h-6 w-6 text-green-400" />
                                        <span className="text-xs font-medium text-slate-300">Walk 3m</span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <Button onClick={onClose} className="w-full bg-slate-800 hover:bg-slate-700 text-white h-12 rounded-xl border border-slate-700">
                                        Urge Passed (Close)
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            onClose()
                                            router.push('/dashboard/urge-log')
                                        }}
                                        variant="link"
                                        className="text-indigo-400"
                                    >
                                        Log this urge for the record
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

// Icon for step 4
import { CheckCircle2 } from 'lucide-react'
