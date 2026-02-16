'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUpVariant, staggerContainerVariant, viewportConfig } from './animation-constants'
import { ShieldAlert, Twitter, Instagram, Github } from 'lucide-react'

export function Footer() {
    return (
        <footer className="relative border-t border-white/5 bg-[#0f172a] pt-24 pb-12 overflow-hidden">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:30px_30px] opacity-[0.03] pointer-events-none" />

            {/* Top Glow Line - Premium */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-indigo-400/80 blur-[2px]" />

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <motion.div
                    variants={staggerContainerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className="grid md:grid-cols-3 gap-12 mb-16"
                >
                    {/* Column 1: Brand */}
                    <motion.div variants={fadeInUpVariant} className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <ShieldAlert className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">HopeRising</span>
                        </div>
                        <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                            Recovery. Clarity. Strength. <br />
                            We build tools for men who want to regain control of their lives and reach their full potential.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5">
                                <Twitter className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5">
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5">
                                <Github className="h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div variants={fadeInUpVariant}>
                        <h3 className="font-semibold text-white mb-6">Explore</h3>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <Link href="#pricing" className="hover:text-purple-400 transition-colors flex items-center group">
                                    <span className="h-[1px] w-0 bg-purple-400 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:text-purple-400 transition-colors flex items-center group">
                                    <span className="h-[1px] w-0 bg-purple-400 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="hover:text-purple-400 transition-colors flex items-center group">
                                    <span className="h-[1px] w-0 bg-purple-400 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                                    Get Started
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400 transition-colors flex items-center group">
                                    <span className="h-[1px] w-0 bg-purple-400 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Column 3: Legal & Support */}
                    <motion.div variants={fadeInUpVariant}>
                        <h3 className="font-semibold text-white mb-6">Support</h3>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <a href="mailto:support@hoperising.app" className="hover:text-white transition-colors">
                                    support@hoperising.app
                                </a>
                            </li>
                            <li className="pt-2">
                                <Link href="#" className="hover:text-white transition-colors mr-6">Privacy Policy</Link>
                                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                            </li>
                            <li className="pt-4 text-xs text-slate-600">
                                Your journey is private and secure. <br />
                                All data is encrypted.
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-xs text-slate-600">
                        © {new Date().getFullYear()} HopeRising Labs Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-slate-500">All Systems Operational</span>
                    </div>
                </motion.div>
            </div >
        </footer >
    )
}
