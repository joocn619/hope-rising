'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShieldAlert } from 'lucide-react'
import { motion } from 'framer-motion'

export function LandingHeader() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed top-0 w-full border-b border-white/5 bg-[#0F172A]/70 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-[#0F172A]/40 transition-all duration-300"
        >
            <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-8">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <ShieldAlert className="relative h-7 w-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-indigo-200 group-hover:to-white transition-all duration-300">
                        HopeRising
                    </span>
                </Link>
                <nav className="flex items-center space-x-6">
                    <Link href="/login" className="hidden sm:block">
                        <Button variant="ghost" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="h-10 px-6 bg-white text-slate-900 hover:bg-indigo-50 font-semibold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 group/btn relative overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started
                            </span>
                            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent z-0" />
                        </Button>
                    </Link>
                </nav>
            </div>
        </motion.header>
    )
}
