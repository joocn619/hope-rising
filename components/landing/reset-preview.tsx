'use client'

import { FadeIn } from './fade-in'
import { CheckCircle, Lock } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const days = [
    { day: 1, title: 'Awareness', unlocked: true },
    { day: 2, title: 'Trigger Mapping', unlocked: true },
    { day: 3, title: 'Urge Control', unlocked: true },
    { day: 4, title: 'Dopamine Reset', unlocked: true },
    { day: 5, title: 'Environment', unlocked: false },
    { day: 6, title: 'Discipline', unlocked: false },
    { day: 7, title: 'Identity Shift', unlocked: false },
]

export function ResetPreview() {
    return (
        <section className="py-24 bg-slate-900/30">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white md:text-5xl mb-4">
                            7-Day <span className="text-indigo-400">Free</span> Reset
                        </h2>
                        <p className="text-slate-400">Start your journey with no credit card required.</p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
                    {days.map((day, i) => (
                        <FadeIn key={i} delay={i * 0.1} className={i >= 4 ? "blur-[2px] opacity-70" : ""}>
                            <Card className="h-full border-slate-800 bg-slate-900/50">
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-mono text-indigo-400">Day {day.day}</span>
                                        {day.unlocked ? (
                                            <CheckCircle className="h-3 w-3 text-green-500" />
                                        ) : (
                                            <Lock className="h-3 w-3 text-slate-500" />
                                        )}
                                    </div>
                                    <CardTitle className="text-sm font-medium text-slate-200">{day.title}</CardTitle>
                                </CardHeader>
                            </Card>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn>
                    <div className="text-center">
                        <Link href="/signup">
                            <Button size="lg" className="rounded-full bg-white text-indigo-950 font-bold hover:bg-slate-200">
                                Start Free Reset
                            </Button>
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    )
}
