'use client'

import { FadeIn } from './fade-in'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
    {
        quote: "I tried everything. Apps, blockers, therapy. Nothing worked until I understood the dopamine mechanism. This program saved my marriage.",
        author: "James T.",
        role: "Software Engineer",
    },
    {
        quote: "The urge tracking is a game changer. Seeing the data made me realize my triggers were totally predictable. 30 days clean today.",
        author: "Marcus R.",
        role: "Entrepreneur",
    },
    {
        quote: "Straight to the point. No fluff. Just a raw, effective system for men who want to regain control of their minds.",
        author: "David K.",
        role: "Athlete",
    },
]

export function Testimonials() {
    return (
        <section className="py-24 bg-slate-900/30">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <h2 className="text-3xl font-bold text-white md:text-5xl mb-16 text-center">
                        Success Stories
                    </h2>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <Card className="h-full border-slate-800 bg-slate-900/50">
                                <CardContent className="p-8 flex flex-col justify-between h-full">
                                    <div className="flex space-x-1 mb-6">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>
                                    <blockquote className="text-lg text-slate-300 mb-6 italic">&quot;{t.quote}&quot;</blockquote>
                                    <div>
                                        <div className="font-bold text-white">{t.author}</div>
                                        <div className="text-sm text-slate-500">{t.role}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    )
}
