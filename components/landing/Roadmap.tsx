'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeInUpVariant, staggerContainerVariant, cardHoverVariant, viewportConfig } from './animation-constants'
import { CheckCircle2, Flag, Mountain, Star } from 'lucide-react'

const milestones = [
    {
        day: "Day 1",
        title: "The Decision",
        desc: "You make the commitment. Setting up your environment and tracking your first clean hours.",
        icon: Flag,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        day: "Day 7",
        title: "Detox Phase",
        desc: "The hardest part. Physical urges peak and subside. Brain fog begins to lift as dopamine adjusts.",
        icon: Mountain,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20"
    },
    {
        day: "Day 30",
        title: "New Baseline",
        desc: "Rewiring is active. Energy levels stabilize. You start finding joy in everyday activities again.",
        icon: CheckCircle2,
        color: "text-teal-400",
        bg: "bg-teal-500/10",
        border: "border-teal-500/20"
    },
    {
        day: "Day 90",
        title: "Lifestyle Shift",
        desc: "Freedom. It's no longer a struggle, it's just who you are. Your new identity is solidified.",
        icon: Star,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20"
    },
]

export function Roadmap() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const scaleX = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])

    return (
        <section className="py-32 bg-[#0f172a] relative overflow-hidden border-t border-white/5">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[400px] bg-indigo-900/10 rounded-[100%] blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 md:px-8 relative z-10" ref={containerRef}>
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.div
                        variants={fadeInUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 backdrop-blur-md mb-6"
                    >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-400 mr-2 animate-pulse" />
                        The Journey Ahead
                    </motion.div>

                    <motion.h2
                        variants={fadeInUpVariant}
                        viewport={viewportConfig}
                        initial="hidden"
                        whileInView="visible"
                        className="text-4xl md:text-5xl font-bold text-white mb-6 balanced"
                    >
                        Your Road to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400">Recovery</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUpVariant}
                        viewport={viewportConfig}
                        initial="hidden"
                        whileInView="visible"
                        className="text-slate-400 text-lg"
                    >
                        It's not just about stopping. It's about rebuilding your brain, step by step.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            style={{ scaleX, transformOrigin: "left" }}
                            className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"
                        />
                    </div>

                    <motion.div
                        variants={staggerContainerVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="grid md:grid-cols-4 gap-8"
                    >
                        {milestones.map((m, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUpVariant}
                                whileHover="hover"
                                className="relative group"
                            >
                                {/* Timeline Dot */}
                                <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 justify-center -mt-[60px] pb-10">
                                    <div className={`
                                        relative z-10 w-12 h-12 rounded-full border-4 border-[#0f172a] bg-slate-900 
                                        flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-slate-800
                                        ${i === 0 ? 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' : ''}
                                    `}>
                                        <div className={`w-4 h-4 rounded-full ${m.bg.replace('/10', '')} ${m.color.replace('text-', 'bg-')}`} />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="h-full pt-6 md:pt-14 relative group">
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl -z-10 group-hover:from-white/[0.06] transition-colors duration-500" />
                                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-${m.color.split('-')[1]}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <motion.div
                                        variants={cardHoverVariant}
                                        style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'subpixel-antialiased' }}
                                        className="p-6 h-full border border-white/10 bg-[#111827] rounded-2xl relative"
                                    >
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${m.bg} ${m.color} border ${m.border}`}>
                                            <m.icon className="h-3 w-3" />
                                            {m.day}
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                                            {m.title}
                                        </h3>

                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {m.desc}
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
