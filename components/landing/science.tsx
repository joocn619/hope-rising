'use client'

import { FadeIn } from './fade-in'
import { ArrowDown } from 'lucide-react'

export function Science() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white md:text-5xl mb-4">
                            What&apos;s Happening Inside Your Brain?
                        </h2>
                        <p className="text-slate-400">The Loop of Suffering</p>
                    </div>
                </FadeIn>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
                    {/* Step 1 */}
                    <FadeIn delay={0.1} className="flex-1 w-full">
                        <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-center">
                            <div className="text-red-400 font-bold mb-2">TRIGGER</div>
                            <p className="text-sm text-slate-400">Stress, Boredom, Cue</p>
                        </div>
                    </FadeIn>

                    <ArrowDown className="md:-rotate-90 text-slate-600 h-8 w-8" />

                    {/* Step 2 */}
                    <FadeIn delay={0.2} className="flex-1 w-full">
                        <div className="p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 text-center">
                            <div className="text-orange-400 font-bold mb-2">SPIKE</div>
                            <p className="text-sm text-slate-400">Cheap Dopamine Hit</p>
                        </div>
                    </FadeIn>

                    <ArrowDown className="md:-rotate-90 text-slate-600 h-8 w-8" />

                    {/* Step 3 */}
                    <FadeIn delay={0.3} className="flex-1 w-full">
                        <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800/50 text-center opacity-50">
                            <div className="text-slate-400 font-bold mb-2">CRASH</div>
                            <p className="text-sm text-slate-500">Baseline Drops Lower</p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}
