'use client'

import { FadeIn } from './fade-in'
import { Lock } from 'lucide-react'
import { Card } from '@/components/ui/card'

const phases = [
    { phase: 1, title: 'Detox', desc: 'Days 1-7' },
    { phase: 2, title: 'Rewire', desc: 'Days 8-14' },
    { phase: 3, title: 'Discipline', desc: 'Days 15-21' },
    { phase: 4, title: 'Identity Upgrade', desc: 'Days 22-30' },
]

export function ProPreview() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white md:text-5xl mb-4">
                            30-Day Transformation System
                        </h2>
                        <p className="text-slate-400">For those ready to go all the way.</p>
                    </div>
                </FadeIn>

                <div className="relative">
                    {/* Overlay for "Pro" feel */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/60 backdrop-blur-[2px]">
                        <div className="bg-slate-900 border border-slate-700 rounded-full px-6 py-2 flex items-center shadow-2xl">
                            <Lock className="h-4 w-4 text-indigo-400 mr-2" />
                            <span className="text-indigo-200 font-semibold text-sm">Unlock Pro to Assess Full Program</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 opacity-50 select-none pointer-events-none">
                        {phases.map((phase, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <Card className="h-48 flex flex-col items-center justify-center text-center p-6 border-slate-800 bg-slate-900/40">
                                    <div className="text-xs font-mono text-indigo-500 mb-2">Phase {phase.phase}</div>
                                    <h3 className="text-xl font-bold text-white mb-1">{phase.title}</h3>
                                    <p className="text-slate-500 text-sm">{phase.desc}</p>
                                </Card>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
