'use client'

import { motion } from 'framer-motion'
import { fadeInUpVariant, staggerContainerVariant, cardHoverVariant, viewportConfig } from './animation-constants'
import { Check, Shield, Zap, BarChart3, Lock, BookOpen } from 'lucide-react'

const features = [
    {
        title: "Advanced Urge Tracker",
        desc: "Log intensity, triggers, and location in seconds.",
        icon: Zap,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20"
    },
    {
        title: "Daily Reflection Journal",
        desc: "Guided prompts to process emotions and build clarity.",
        icon: BookOpen,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        title: "7-Day Reset Program",
        desc: "A science-backed crash course to break the cycle.",
        icon: Shield,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20"
    },
    {
        title: "Real-time Streak Counter",
        desc: "Watch your progress grow down to the second.",
        icon: Check,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20"
    },
    {
        title: "Weekly Progress Charts",
        desc: "Visualize your recovery patterns and identify trends.",
        icon: BarChart3,
        color: "text-teal-400",
        bg: "bg-teal-500/10",
        border: "border-teal-500/20"
    },
    {
        title: "Secure & Private",
        desc: "Your data is encrypted and never shared. 100% anonymous.",
        icon: Lock,
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20"
    },
]

export function FreeFeatures() {
    return (
        <section className="py-24 bg-[#0f172a] overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 md:px-8">
                <div className="relative rounded-[3rem] bg-[#111827] border border-white/10 p-8 md:p-16 overflow-hidden">

                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" />

                    <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-center">

                        {/* Left Column: Heading */}
                        <div className="lg:col-span-4 text-left">
                            <motion.div
                                variants={fadeInUpVariant}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                className="inline-flex items-center rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-300 backdrop-blur-md mb-6"
                            >
                                <span className="flex h-1.5 w-1.5 rounded-full bg-teal-400 mr-2 animate-pulse" />
                                Always Free
                            </motion.div>

                            <motion.h2
                                variants={fadeInUpVariant}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
                            >
                                Everything needed to start. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">
                                    Completely Free.
                                </span>
                            </motion.h2>

                            <motion.p
                                variants={fadeInUpVariant}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                className="text-slate-400 text-lg leading-relaxed mb-8"
                            >
                                We believe basic recovery tools should be accessible to everyone.
                                No credit card required. No trials. Just create an account and start your journey.
                            </motion.p>
                        </div>

                        {/* Right Column: Feature Grid */}
                        <motion.div
                            variants={staggerContainerVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportConfig}
                            className="lg:col-span-8 grid sm:grid-cols-2 gap-4"
                        >
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUpVariant}
                                    whileHover="hover"
                                >
                                    <motion.div
                                        variants={cardHoverVariant}
                                        style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'subpixel-antialiased' }}
                                        className="group relative p-5 bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${feature.bg} ${feature.color} border ${feature.border} group-hover:scale-110 transition-transform duration-300`}>
                                                <feature.icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold mb-1 group-hover:text-teal-200 transition-colors">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm leading-relaxed">
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
