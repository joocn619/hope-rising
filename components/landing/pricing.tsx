'use client'

import { motion } from 'framer-motion'
import { fadeInUpVariant, viewportConfig, cardHoverVariant } from './animation-constants'
import { Check, X, Sparkles, Activity, Brain, BarChart3, Mail, FileText, Award, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Pricing() {
    return (
        <section className="py-24 border-t border-white/5" id="pricing">
            <div className="container mx-auto px-6 md:px-8">
                <motion.div
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
                            Simple Pricing
                        </h2>
                        <p className="text-slate-400">Invest in your freedom.</p>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan */}
                    <motion.div
                        variants={fadeInUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={viewportConfig}
                    >
                        <motion.div
                            variants={cardHoverVariant}
                            style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'subpixel-antialiased' }}
                            className="h-full p-8 rounded-3xl border border-white/10 bg-[#111827] flex flex-col hover:border-white/20 transition-colors relative overflow-hidden"
                        >
                            <div className="mb-6 text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                                <p className="text-indigo-300 font-medium text-sm">Awareness Tools</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-start text-slate-300"><Check className="h-5 w-5 text-indigo-400 mr-3 shrink-0" /> 7-day guided recovery program</li>
                                <li className="flex items-start text-slate-300"><Check className="h-5 w-5 text-indigo-400 mr-3 shrink-0" /> Urge tracking</li>
                                <li className="flex items-start text-slate-300"><Check className="h-5 w-5 text-indigo-400 mr-3 shrink-0" /> Trigger awareness</li>
                                <li className="flex items-start text-slate-300"><Check className="h-5 w-5 text-indigo-400 mr-3 shrink-0" /> Daily habit basics</li>
                                <li className="flex items-start text-slate-300"><Check className="h-5 w-5 text-indigo-400 mr-3 shrink-0" /> Journaling & reflection</li>
                                <li className="flex items-start text-slate-300"><Check className="h-5 w-5 text-indigo-400 mr-3 shrink-0" /> Progress without pressure</li>
                            </ul>

                            <div className="mt-auto">
                                <p className="text-slate-500 text-xs text-center mb-4">No credit card. No time limit.</p>
                                <Link href="/signup">
                                    <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10 h-12 rounded-xl">
                                        Start Free
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>


                    {/* Paid Plan */}
                    <motion.div
                        variants={fadeInUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={viewportConfig}
                    >
                        <motion.div
                            variants={cardHoverVariant}
                            style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'subpixel-antialiased' }}
                            className="relative h-full p-8 rounded-3xl border border-purple-500/50 bg-[#111827] shadow-[0_0_40px_rgba(124,58,237,0.1)] flex flex-col overflow-hidden"
                        >
                            <div className="absolute top-0 inset-x-0 flex justify-center -mt-0">
                                <div className="bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-b-xl shadow-lg shadow-purple-900/50 z-20">
                                    Most supportive
                                </div>
                            </div>

                            <div className="mb-6 relative z-10 text-center mt-4">
                                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                                <div className="flex items-end justify-center gap-1 mb-2">
                                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                                        $19
                                    </div>
                                    <div className="text-slate-400 font-medium mb-1">/month</div>
                                </div>
                                <p className="text-purple-400 font-medium text-sm">Accelerate your transformation.</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1 relative z-10">
                                <li className="flex items-start text-white"><Sparkles className="h-5 w-5 text-purple-400 mr-3 shrink-0" /> 30-day guided recovery program</li>
                                <li className="flex items-start text-white"><Activity className="h-5 w-5 text-purple-400 mr-3 shrink-0" /> Daily tasks & auto progress tracking</li>
                                <li className="flex items-start text-white"><Brain className="h-5 w-5 text-purple-400 mr-3 shrink-0" /> Deep relapse & trigger insights</li>
                                <li className="flex items-start text-white"><BarChart3 className="h-5 w-5 text-purple-400 mr-3 shrink-0" /> Advanced analytics & streaks</li>
                                <li className="flex items-start text-white"><Mail className="h-5 w-5 text-purple-400 mr-3 shrink-0" /> Email accountability system</li>
                                <li className="flex items-start text-white"><FileText className="h-5 w-5 text-purple-400 mr-3 shrink-0" /> PDF progress reports</li>
                                <li className="flex items-start text-white"><Award className="h-5 w-5 text-purple-400 mr-3 shrink-0" /> Pro dashboard & badges</li>
                                <li className="flex items-start text-white"><Zap className="h-5 w-5 text-purple-400 mr-3 shrink-0" /> Future upgrades included</li>
                            </ul>

                            <Link href="/signup" className="relative z-10 block">
                                <Button className="relative w-full h-12 overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/30 group transition-all duration-300 hover:shadow-indigo-500/50 border border-white/10">
                                    <span className="relative z-10 font-bold flex items-center justify-center gap-2">
                                        Unlock Pro Recovery <Zap className="h-4 w-4 fill-white/20" />
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent z-0" />
                                </Button>
                            </Link>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
