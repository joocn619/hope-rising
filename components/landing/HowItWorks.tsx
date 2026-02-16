'use client'

import { motion } from 'framer-motion'
import { fadeInUpVariant, staggerContainerVariant, cardHoverVariant, viewportConfig } from './animation-constants'
import { Activity, ShieldCheck, Zap, ArrowRight } from 'lucide-react'

const steps = [
    {
        step: "01",
        title: "Track Your Urges",
        desc: "Log when urges hit. Identify patterns in time, location, and emotional state to build self-awareness.",
        icon: Activity,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        step: "02",
        title: "Replace Habits",
        desc: "When a trigger strikes, use our toolkit to choose a healthy dopamine alternative instantly.",
        icon: Zap,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20"
    },
    {
        step: "03",
        title: "Rewire Your Brain",
        desc: "As streaks grow, your baseline dopamine resets, restoring natural focus, joy, and confidence.",
        icon: ShieldCheck,
        color: "text-teal-400",
        bg: "bg-teal-500/10",
        border: "border-teal-500/20"
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-32 bg-[#0f172a] relative overflow-hidden border-t border-white/5">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-900/5 rounded-[100%] blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        variants={fadeInUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300 backdrop-blur-md mb-6"
                    >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-purple-400 mr-2 animate-pulse" />
                        The System
                    </motion.div>

                    <motion.h2
                        variants={fadeInUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        How <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">HopeRising</span> Works
                    </motion.h2>
                </div>

                <motion.div
                    variants={staggerContainerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className="relative grid md:grid-cols-3 gap-8"
                >
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[24px] left-[16%] right-[16%] h-[2px] bg-slate-800 z-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent w-1/2 animate-[shimmer_3s_infinite_linear]" />
                    </div>

                    {steps.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUpVariant}
                            whileHover="hover"
                            className="relative flex flex-col items-center text-center group"
                        >
                            {/* Step Number Circle */}
                            <div className="relative z-10 w-14 h-14 rounded-full bg-[#0a0a0a] border-4 border-[#0a0a0a] flex items-center justify-center mb-8 shadow-xl shadow-purple-500/10">
                                <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-purple-500/50 transition-colors duration-500" />
                                <span className="text-sm font-mono font-bold text-slate-400 group-hover:text-purple-400 transition-colors">
                                    {item.step}
                                </span>
                            </div>

                            {/* Content Card */}
                            <div className="w-full relative group/card">
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 -z-10" />

                                <motion.div
                                    variants={cardHoverVariant}
                                    style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'subpixel-antialiased' }}
                                    className="p-8 rounded-3xl border border-white/10 bg-[#111827] hover:border-purple-500/30 transition-all duration-300"
                                >
                                    <div className={`mx-auto h-14 w-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 text-white border ${item.border} group-hover/card:scale-110 transition-transform duration-300`}>
                                        <item.icon className={`h-7 w-7 ${item.color}`} />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover/card:text-purple-200 transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Mobile Arrow */}
                            {i < steps.length - 1 && (
                                <div className="md:hidden mt-8 mb-4 text-slate-700">
                                    <ArrowRight className="h-6 w-6 rotate-90" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
