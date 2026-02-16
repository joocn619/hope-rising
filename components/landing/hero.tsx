'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, PlayCircle, Shield, BarChart3, Activity, Check } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeInUpVariant, buttonClickVariant, floatingVariant, viewportConfig } from './animation-constants'
import { useRef } from 'react'

export function Hero() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, 200])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#0f172a]">
            {/* --- STUDIO LIGHTING BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Main Spotlight */}
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-indigo-600/20 opacity-40 blur-[140px] rounded-full mix-blend-screen" />

                {/* Secondary Ambient Light (Purple) */}
                <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 opacity-30 blur-[120px] rounded-full mix-blend-screen" />

                {/* Secondary Ambient Light (Teal) */}
                <div className="absolute  bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-teal-600/10 opacity-20 blur-[120px] rounded-full mix-blend-screen" />

                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

                {/* Grid Pattern (Subtle) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
            </div>

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* --- LEFT CONTENT --- */}
                    <motion.div
                        variants={fadeInUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="text-left space-y-10 max-w-2xl relative z-10"
                    >
                        {/* High-End Chip */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md shadow-lg hover:bg-white/[0.05] transition-colors cursor-default"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Build the New You
                        </motion.div>

                        {/* Cinematic Headline */}
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                            <span className="block text-slate-200">Quit Porn.</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x pb-2">
                                Reboot Your Brain.
                            </span>
                            <span className="block text-slate-200">Recover Control.</span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed font-light">
                            The first science-based recovery system designed for men who are ready to stop fighting alone. Private, calm, and effective.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5 pt-4 relative z-20">
                            <Link href="/signup">
                                <motion.div variants={buttonClickVariant} whileHover="hover" whileTap="tap">
                                    <Button
                                        size="lg"
                                        className="relative h-14 px-10 text-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] transition-all duration-300 group overflow-hidden border border-white/10"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            Start Recovery Now
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform text-indigo-200 group-hover:text-white" />
                                        </span>
                                        {/* Shimmer Effect */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
                                    </Button>
                                </motion.div>
                            </Link>

                            <Link href="#how-it-works">
                                <motion.div variants={buttonClickVariant} whileHover="hover" whileTap="tap">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="h-14 px-8 text-lg border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white rounded-full backdrop-blur-md transition-all duration-300 group hover:border-white/20"
                                    >
                                        <PlayCircle className="mr-2 h-5 w-5 text-slate-400 group-hover:text-white transition-colors group-hover:scale-110 duration-300" />
                                        How It Works
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`h-12 w-12 rounded-full border-4 border-[#0a0a0a] bg-slate-800 flex items-center justify-center overflow-hidden relative shadow-lg`}>
                                        {/* Placeholder Avatars with Gradients */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${i === 1 ? 'from-blue-400 to-indigo-600' :
                                            i === 2 ? 'from-purple-400 to-pink-600' :
                                                i === 3 ? 'from-teal-400 to-green-600' :
                                                    'from-orange-400 to-red-600'
                                            }`} />
                                        <span className="text-[10px] font-bold text-white/50 relative z-10">{String.fromCharCode(64 + i)}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center gap-1 mb-1">
                                    {[1, 2, 3, 4, 5].map(i => <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + (i * 0.05) }} className="h-4 w-4 text-yellow-500 fill-current"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></motion.div>)}
                                </div>
                                <div className="text-sm text-slate-400">
                                    <span className="text-white font-bold">1,200+ Members</span> reclaiming focus.
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- RIGHT CONTENT (3D MOCKUP) --- */}
                    <motion.div
                        style={{ y, opacity }}
                        className="relative hidden lg:block perspective-1000"
                    >
                        <motion.div
                            variants={floatingVariant}
                            animate="animate"
                            initial="initial"
                        >
                            <div className="relative z-10 rounded-2xl border border-white/10 bg-[#0f172a]/90 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[4/3] group transform transition-transform duration-700 hover:scale-[1.01] hover:shadow-[0_20px_60px_rgba(79,70,229,0.15)]">

                                {/* Glossy Reflection Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] via-transparent to-transparent pointer-events-none z-20" />

                                {/* Browser Bezel */}
                                <div className="h-10 border-b border-white/5 bg-[#0a0a0a] flex items-center px-4 gap-2">
                                    <div className="flex gap-2 opacity-50">
                                        <div className="h-3 w-3 rounded-full bg-red-500" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                        <div className="h-3 w-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="ml-4 h-6 px-3 bg-[#1e293b] rounded text-[10px] text-slate-500 flex items-center w-64 border border-white/5">
                                        hoperising.app/dashboard
                                    </div>
                                </div>

                                {/* Dashboard UI */}
                                <div className="p-8 grid grid-cols-12 gap-6 h-full bg-[#0b0f19]">

                                    {/* Sidebar Area */}
                                    <div className="hidden xl:block col-span-3 border-r border-white/5 pr-6 space-y-6">
                                        <div className="h-8 w-24 bg-white/5 rounded-md animate-pulse" />
                                        <div className="space-y-3">
                                            {[1, 2, 3, 4].map(i => <div key={i} className="h-8 w-full bg-white/[0.02] rounded-md" />)}
                                        </div>
                                    </div>

                                    {/* Main Area */}
                                    <div className="col-span-12 xl:col-span-9 grid grid-cols-2 gap-6 content-start">
                                        {/* Box 1 */}
                                        <div className="p-5 rounded-2xl bg-[#131b2c] border border-white/5 relative overflow-hidden group/card hover:border-indigo-500/30 transition-colors">
                                            <div className="absolute top-0 right-0 p-4 opacity-10"><Shield className="h-12 w-12 text-indigo-500" /></div>
                                            <div className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                                <Shield className="h-3 w-3" /> Streak
                                            </div>
                                            <div className="text-4xl font-bold text-white mb-1">14 Days</div>
                                        </div>

                                        {/* Box 2 */}
                                        <div className="p-5 rounded-2xl bg-[#131b2c] border border-white/5 relative overflow-hidden group/card hover:border-blue-500/30 transition-colors">
                                            <div className="absolute top-0 right-0 p-4 opacity-10"><Activity className="h-12 w-12 text-blue-500" /></div>
                                            <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                                <Activity className="h-3 w-3" /> Focus Score
                                            </div>
                                            <div className="text-4xl font-bold text-white mb-1">92%</div>
                                        </div>

                                        {/* Chart Area */}
                                        <div className="col-span-2 bg-[#131b2c] border border-white/5 rounded-2xl p-6 h-64 relative overflow-hidden">
                                            <div className="flex justify-between items-center mb-8">
                                                <div className="flex items-center gap-2 text-slate-300 font-medium">
                                                    <BarChart3 className="h-4 w-4 text-slate-500" /> Dopamine Baseline
                                                </div>
                                                <div className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">
                                                    +15% vs Last Week
                                                </div>
                                            </div>

                                            <div className="flex items-end justify-between gap-3 h-32 px-2">
                                                {[35, 50, 45, 70, 60, 85, 95].map((h, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ height: 0 }}
                                                        whileInView={{ height: `${h}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                                        className={`flex-1 rounded-t-md relative ${i >= 5 ? 'bg-gradient-to-t from-indigo-600 to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-slate-700/50'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Back Glow for Mockup */}
                        <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] -z-10 rounded-full transform translate-y-10" />
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
