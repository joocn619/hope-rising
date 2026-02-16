'use client'

import { FadeIn } from './fade-in'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
    return (
        <section className="py-32 relative overflow-hidden flex items-center justify-center">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px]" />

            <div className="container relative mx-auto px-6 text-center z-10">
                <FadeIn>
                    <h2 className="text-4xl font-bold text-white md:text-6xl mb-8">
                        Your 30-Day Transformation <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
                            Starts Today.
                        </span>
                    </h2>
                    <Link href="/signup">
                        <Button size="lg" className="h-16 px-10 text-xl bg-white text-indigo-950 font-bold hover:bg-slate-200 rounded-full shadow-xl shadow-indigo-500/20 transition-transform hover:scale-105">
                            Start Free Reset
                            <ArrowRight className="ml-2 h-6 w-6" />
                        </Button>
                    </Link>
                    <p className="mt-6 text-slate-500 text-sm">No credit card required for 7-Day Reset.</p>
                </FadeIn>
            </div>
        </section>
    )
}
