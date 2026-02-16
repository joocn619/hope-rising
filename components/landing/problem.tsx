'use client'

import { motion } from 'framer-motion'
import { fadeInUpVariant, staggerContainerVariant, cardHoverVariant, viewportConfig } from './animation-constants'
import { RefreshCcw, EyeOff, BrainCircuit, AlertOctagon, XCircle, ZapOff } from 'lucide-react'

const pains = [
    {
        title: "Stuck in Relapse Cycles",
        desc: "You promise yourself 'never again', but days later you fall back into the same trap, eroding your self-trust.",
        icon: RefreshCcw,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        title: "Shame and Isolation",
        desc: "Carrying a secret weight that prevents you from fully connecting with those you love or being your authentic self.",
        icon: EyeOff,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20"
    },
    {
        title: "Losing Focus",
        desc: "Brain fog and dopamine depletion make it impossible to concentrate on your goals, career, or passions.",
        icon: BrainCircuit,
        color: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20"
    },
]

export function Problem() {
    return (
        <section className="py-32 bg-[#0f172a] relative overflow-hidden border-t border-white/5">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.div
                        variants={fadeInUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300 backdrop-blur-md mb-6"
                    >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-red-400 mr-2 animate-pulse" />
                        The Hidden Cost
                    </motion.div>

                    <motion.h2
                        variants={fadeInUpVariant}
                        viewport={viewportConfig}
                        initial="hidden"
                        whileInView="visible"
                        className="text-4xl md:text-5xl font-bold text-white mb-6 balanced leading-tight"
                    >
                        You&apos;re not broken. <br />
                        <span className="text-slate-400">Your brain is just overstimulated.</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUpVariant}
                        viewport={viewportConfig}
                        initial="hidden"
                        whileInView="visible"
                        className="text-lg text-slate-400 leading-relaxed"
                    >
                        Porn addiction hijacks your dopamine system, creating a feedback loop that feels impossible to escape.
                    </motion.p>
                </div>

                <motion.div
                    variants={staggerContainerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {pains.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUpVariant}
                            whileHover="hover"
                        >
                            <motion.div
                                variants={cardHoverVariant}
                                style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'subpixel-antialiased' }}
                                className="h-full p-8 rounded-[2rem] border border-white/10 bg-[#111827] relative overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-indigo-500/10 transition-shadow duration-500"
                            >
                                {/* Hover Glow Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-${item.color.split('-')[1]}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                                <div className={`relative z-10 h-14 w-14 rounded-2xl ${item.bg} ${item.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className={`h-7 w-7 ${item.color}`} />
                                </div>

                                <h3 className="relative z-10 text-xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="relative z-10 text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
                                    {item.desc}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section >
    )
}
