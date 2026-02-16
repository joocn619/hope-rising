'use client'

import { FadeIn } from './fade-in'
import { Eye, Hammer, UserCheck } from 'lucide-react'

export function Solution() {
    return (
        <section className="py-24 bg-slate-900/30" id="how-it-works">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm">Introducing HopeRising</span>
                        <h2 className="text-3xl font-bold text-white md:text-5xl mt-4 mb-6">
                            A Structured 30-Day Rewire System
                        </h2>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Pillar 1 */}
                    <FadeIn delay={0.1}>
                        <div className="text-center">
                            <div className="mx-auto h-20 w-20 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20">
                                <Eye className="h-10 w-10 text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">1. Awareness</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Log urges and identify triggers. You cannot fight an enemy you cannot see.
                                We bring the subconscious into the light.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Pillar 2 */}
                    <FadeIn delay={0.2}>
                        <div className="text-center">
                            <div className="mx-auto h-20 w-20 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                                <Hammer className="h-10 w-10 text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">2. Rewiring</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Abstain from super-stimuli to reset your baseline. Use proven protocols
                                to surf the urge without acting on it.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Pillar 3 */}
                    <FadeIn delay={0.3}>
                        <div className="text-center">
                            <div className="mx-auto h-20 w-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                                <UserCheck className="h-10 w-10 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">3. Identity Shift</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Stop saying &quot;I&apos;m trying to quit.&quot; Start saying &quot;I don&apos;t do that.&quot;
                                Shift your identity from a user to a disciplined man.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}
