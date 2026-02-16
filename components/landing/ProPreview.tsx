'use client'

import { motion } from 'framer-motion'
import { fadeInUpVariant, viewportConfig } from './animation-constants'
import { Lock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ProPreview() {
    return (
        <section className="py-24 relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 md:px-8">
                <motion.div
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                            Go Deeper with <span className="text-purple-400">Pro</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            For those ready to commit to a full system reset.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                >
                    <div className="relative rounded-3xl border border-purple-500/30 bg-[#111827]/80 backdrop-blur-xl p-1 overflow-hidden max-w-5xl mx-auto shadow-2xl shadow-purple-900/20">
                        {/* Glow Border Effect */}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-purple-500/20 to-transparent opacity-50" />

                        <div className="relative bg-[#111827] rounded-[22px] p-8 md:p-12 overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-8">
                                    <div className="inline-flex items-center space-x-2 text-purple-400 font-semibold bg-purple-900/20 px-4 py-1 rounded-full border border-purple-500/20">
                                        <Sparkles className="h-4 w-4" />
                                        <span>Premium Features</span>
                                    </div>

                                    <ul className="space-y-4">
                                        {[
                                            { title: "30-Day Transformation Program", desc: "Step-by-step daily content to rewire your brain." },
                                            { title: "Advanced Trigger Analytics", desc: "Visualize when and why you are most vulnerable." },
                                            { title: "Habit Replacement System", desc: "Tools to build healthy dopamine sources." },
                                            { title: "Priority Support", desc: "Get help when you need it most." }
                                        ].map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <div className="mt-1 h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mr-4">
                                                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">{feature.title}</div>
                                                    <div className="text-slate-500 text-sm">{feature.desc}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="#pricing">
                                        <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-8 py-6 text-lg">
                                            Unlock Pro Access
                                        </Button>
                                    </Link>
                                </div>

                                {/* Abstract Representation of Pro Dashboard */}
                                <div className="relative h-[400px] bg-slate-900/50 rounded-2xl border border-white/5 p-6 flex flex-col gap-4 opacity-80">
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-2xl z-10">
                                        <Lock className="h-12 w-12 text-purple-400 mb-2" />
                                    </div>
                                    {/* Mock UI elements behind blur */}
                                    <div className="h-8 w-1/3 bg-slate-800 rounded mb-4" />
                                    <div className="flex-1 bg-slate-800/50 rounded border border-white/5" />
                                    <div className="h-32 flex gap-4">
                                        <div className="flex-1 bg-slate-800/50 rounded border border-white/5" />
                                        <div className="flex-1 bg-slate-800/50 rounded border border-white/5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
