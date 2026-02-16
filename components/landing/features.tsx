'use client'

import { FadeIn } from './fade-in'
import { Flame, PenTool, BarChart2, Shield, CalendarCheck, Award } from 'lucide-react'

const features = [
    { icon: Flame, title: 'Urge Logging', desc: 'Track intensity and triggers in real-time.' },
    { icon: PenTool, title: 'Journaling', desc: 'Daily reflection prompts to build awareness.' },
    { icon: BarChart2, title: 'Advanced Analytics', desc: 'Visualize your recovery patterns over time.' },
    { icon: Shield, title: 'Relapse Prevention', desc: 'Identify high-risk times and situations.' },
    { icon: CalendarCheck, title: 'Discipline Challenges', desc: 'Daily tasks to build mental toughness.' },
    { icon: Award, title: 'Completion Certificate', desc: 'Earn badges as you hit milestones.' },
]

export function FeatureBreakdown() {
    return (
        <section className="py-24 bg-slate-900/30">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white md:text-5xl mb-4">
                            Everything You Need to Succeed
                        </h2>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className="flex items-start space-x-4 p-6 rounded-xl hover:bg-slate-800/30 transition-colors">
                                <div className="mt-1 h-10 w-10 text-indigo-400">
                                    <feature.icon className="h-full w-full" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-slate-400 text-sm">{feature.desc}</p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    )
}
