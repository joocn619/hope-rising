'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { fadeInUpVariant, viewportConfig } from './animation-constants'
import { Sun, ShieldAlert, Moon, CheckCircle2 } from 'lucide-react'
import { useRef } from 'react'

const routine = [
    {
        time: "07:00 AM",
        title: "Morning Commitment",
        desc: "Start your day by reaffirming your 'Why'. A 30-second pledge to set your intention and build a streak.",
        icon: Sun,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        line: "from-amber-500/50 to-red-500/50",
        shadow: "shadow-amber-500/20"
    },
    {
        time: "02:00 PM",
        title: "Urge Survival",
        desc: "Trigger hit? Tap the 'Panic Button'. Get instant breathing exercises and stoic reframing to ride the wave.",
        icon: ShieldAlert,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        line: "from-red-500/50 to-indigo-500/50",
        shadow: "shadow-red-500/20"
    },
    {
        time: "09:00 PM",
        title: "Evening Reflection",
        desc: "Log your mood and gratitude. Lock in your day's victory and visually watch your recovery stats grow.",
        icon: Moon,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20",
        line: "from-indigo-500/50 to-transparent",
        shadow: "shadow-indigo-500/20"
    }
]

export function DailyProtocol() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    // Smooth out the scroll progress for a sleek feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Use scaleY instead of height for performance (no layout reflows)
    const scaleY = useTransform(smoothProgress, [0, 1], [0, 1])

    return (
        <section ref={containerRef} className="py-24 bg-[#0f172a] relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <motion.div
                        variants={fadeInUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300 backdrop-blur-md mb-6"
                    >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400 mr-2 animate-pulse" />
                        The Daily Protocol
                    </motion.div>

                    <motion.h2
                        variants={fadeInUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Success is a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">System</span>.
                    </motion.h2>
                    <motion.p
                        variants={fadeInUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="text-lg text-slate-400"
                    >
                        HopeRising isn&apos;t just an app you check; it&apos;s a routine you live. Here is what a successful day looks like.
                    </motion.p>
                </div>

                {/* Timeline Content */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line Container (Desktop) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 hidden md:block">
                        {/* Animated Progress Line */}
                        <motion.div
                            style={{ scaleY, originY: 0 }}
                            className="absolute top-0 w-full h-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        />
                    </div>

                    <div className="space-y-12">
                        {routine.map((item, i) => {
                            const isEven = i % 2 === 0

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ ...viewportConfig, margin: "-50px" }}
                                    transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                                    className={`flex flex-col md:flex-row gap-8 items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Content Card */}
                                    <div className="flex-1 w-full relative">
                                        <div
                                            className={`p-6 rounded-2xl bg-[#111827] border border-white/5 group relative overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-[#1e293b]`}
                                        >
                                            {/* Glow Effect */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${item.line} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${item.border} ${item.bg} ${item.color}`}>
                                                    {item.time}
                                                </div>
                                                <div className="flex gap-1">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center Icon Node */}
                                    <div className="relative shrink-0 z-10">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={viewportConfig}
                                            className={`relative z-10 h-16 w-16 rounded-full bg-[#0f172a] border-4 border-[#1e293b] flex items-center justify-center shadow-xl ${item.color} ${item.shadow}`}
                                        >
                                            <item.icon className="h-6 w-6" />
                                        </motion.div>

                                        {/* Pulse Halo */}
                                        <div className={`absolute inset-0 z-0 rounded-full ${item.bg} animate-ping opacity-20`} />

                                        {/* Connector Line for Mobile */}
                                        {i !== routine.length - 1 && (
                                            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-12 bg-slate-800 md:hidden" />
                                        )}
                                    </div>

                                    {/* Empty Spacer for Layout */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Call to Action Mini */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewportConfig}
                    className="text-center mt-20"
                >
                    <div className="inline-flex items-center gap-2 text-slate-500 text-sm bg-slate-900/50 px-4 py-2 rounded-full border border-white/5">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Repeat daily until freedom is automatic.</span>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
