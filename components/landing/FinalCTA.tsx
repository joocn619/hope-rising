'use client'

import { motion } from 'framer-motion'
import { fadeInUpVariant, buttonClickVariant, viewportConfig } from './animation-constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, PlayCircle, Star } from 'lucide-react'

export function FinalCTA() {
    return (
        <section className="relative py-40 overflow-hidden flex items-center justify-center border-t border-white/5">
            {/* --- Ultra-Premium Background Layer --- */}
            <div className="absolute inset-0 bg-[#0f172a] -z-30" />

            {/* Subtle Grid Pattern with animated mask */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:60px_60px] opacity-[0.03] -z-20 pointer-events-none mask-image-gradient" />

            {/* Cinematic Radial Glows - Dynamic */}
            <div className="absolute inset-0 bg-radial-gradient from-indigo-900/10 via-[#0f172a]/90 to-[#0f172a] -z-10" />

            {/* Aurora Borealis Effects - Smoother Animation */}
            <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow -z-10 mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen" />

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <motion.div
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className="max-w-5xl mx-auto"
                >
                    <div className="flex flex-col items-center text-center">

                        {/* Premium Badge - Glassmorphism */}
                        <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-6 py-2 text-xs font-semibold text-indigo-300 backdrop-blur-xl mb-10 shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:shadow-[0_0_40px_rgba(99,102,241,0.25)] transition-all duration-500 hover:scale-105 cursor-default">
                            <span className="relative flex h-2 w-2 mr-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Your Future Starts Now
                        </div>

                        {/* Hero Headline - Gradient & Glow */}
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-10 tracking-tight leading-[1.1] drop-shadow-2xl">
                            You don&apos;t need to <br className="hidden md:block" />
                            <span className="relative inline-block">
                                <span className="absolute -inset-1 bg-indigo-500/20 blur-2xl" />
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]">
                                    fight alone anymore.
                                </span>
                            </span>
                        </h2>

                        {/* Subheadline - Better Contrast */}
                        <p className="text-xl md:text-2xl text-slate-300 mb-14 max-w-3xl mx-auto leading-relaxed font-light balanced drop-shadow-md">
                            Recovery is possible. Join thousands of men reclaiming their clarity, strength, and purpose today.
                        </p>

                        {/* --- Floating Action Dock --- */}
                        <div className="relative group scale-100 md:scale-110 transition-transform duration-500">
                            {/* Glassmorphism Container */}
                            <div className="relative z-10 p-2 pr-3 pl-3 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full flex flex-col sm:flex-row items-center gap-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/5">

                                {/* Primary CTA - Glowing Button */}
                                <Link href="/signup">
                                    <motion.div variants={buttonClickVariant} whileHover="hover" whileTap="tap">
                                        <Button
                                            size="lg"
                                            className="h-16 px-10 text-lg bg-white text-[#0f172a] hover:bg-slate-50 rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300 group/btn relative overflow-hidden"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                Start Free Today
                                                <ArrowRight className="h-5 w-5 text-indigo-600 transition-transform group-hover/btn:translate-x-1" />
                                            </span>
                                        </Button>
                                    </motion.div>
                                </Link>

                                {/* Divider */}
                                <div className="hidden sm:block w-px h-8 bg-white/10 mx-2" />

                                {/* Secondary CTA */}
                                <Link href="#how-it-works">
                                    <motion.div variants={buttonClickVariant} whileHover="hover" whileTap="tap">
                                        <Button
                                            variant="ghost"
                                            size="lg"
                                            className="h-16 px-8 text-lg text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors font-medium flex items-center gap-3"
                                        >
                                            <PlayCircle className="h-6 w-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                            See How It Works
                                        </Button>
                                    </motion.div>
                                </Link>
                            </div>

                            {/* Dock Glow Effect */}
                            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        </div>

                        {/* Trust Indicator - Enhanced */}
                        <div className="mt-12 flex flex-col md:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-8 w-8 rounded-full border-[3px] border-[#0f172a] bg-slate-800 overflow-hidden relative shadow-lg">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-purple-500 to-indigo-500' : 'from-blue-500 to-teal-500'}`} />
                                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white opacity-50">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-medium">
                                <span className="block text-white">Join 10,000+ members</span>
                                <span className="block text-xs text-indigo-400">4.9/5 Average Rating <span className="text-slate-600 mx-1">•</span> Free Forever Plan</span>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    )
}
