'use client'

import { FadeIn } from './fade-in'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { UrgeChart } from '@/components/dashboard/urge-chart'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Flame, BookOpen, User } from 'lucide-react'

export function DashboardPreview() {
    return (
        <section className="py-24 bg-[#0F172A] relative overflow-hidden">
            {/* Background gradient blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white md:text-5xl mb-4">
                            Your Command Center
                        </h2>
                        <p className="text-slate-400">Track every win. Analyze every urge.</p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    {/* Browser Mockup Wrapper */}
                    <div className="rounded-xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden max-w-5xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
                        {/* Mock Window Controls */}
                        <div className="h-8 bg-slate-800 flex items-center px-4 space-x-2 border-b border-slate-700">
                            <div className="h-3 w-3 rounded-full bg-red-500/80" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                            <div className="h-3 w-3 rounded-full bg-green-500/80" />
                        </div>

                        {/* Dashboard Content Layout */}
                        <div className="flex h-[600px]">
                            {/* Mock Sidebar */}
                            <div className="w-16 md:w-64 border-r border-slate-800 bg-slate-900/50 p-4 hidden md:flex flex-col gap-4">
                                <div className="flex items-center space-x-2 px-2 mb-4">
                                    <div className="h-6 w-6 rounded bg-indigo-500" />
                                    <span className="font-bold text-white">HopeRising</span>
                                </div>
                                {[
                                    { icon: LayoutDashboard, label: 'Dashboard', active: true },
                                    { icon: Flame, label: 'Urge Log', active: false },
                                    { icon: BookOpen, label: 'Journal', active: false },
                                    { icon: User, label: 'Profile', active: false },
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-center space-x-3 p-2 rounded-lg ${item.active ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'}`}>
                                        <item.icon className="h-5 w-5" />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 p-8 bg-slate-950 overflow-hidden">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                                        <Button size="sm" className="bg-indigo-600">Sync Data</Button>
                                    </div>

                                    {/* Reusing existing components directly! */}
                                    <div className="pointer-events-none select-none">
                                        <StatsCards
                                            streak={12}
                                            urgesToday={2}
                                            programDay={4}
                                            hideUpgrade={true}
                                            streakIntelligence={
                                                <div className="mt-2 rounded-lg border p-3 flex items-start gap-3 border-indigo-500/20 bg-indigo-500/5">
                                                    <div className="p-1.5 rounded-full bg-slate-900/40 shrink-0 mt-0.5 text-indigo-400">
                                                        <Flame className="h-3.5 w-3.5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold uppercase tracking-wider opacity-90 text-indigo-400">Momentum Phase</h4>
                                                        <p className="text-xs font-medium opacity-80 leading-relaxed mt-0.5 text-indigo-400">Don't break the chain.</p>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2 pointer-events-none select-none">
                                        <UrgeChart data={[
                                            { name: 'Mon', urges: 4 },
                                            { name: 'Tue', urges: 2 },
                                            { name: 'Wed', urges: 5 },
                                            { name: 'Thu', urges: 1 },
                                            { name: 'Fri', urges: 3 },
                                            { name: 'Sat', urges: 0 },
                                            { name: 'Sun', urges: 2 },
                                        ]} />
                                        {/* Placeholder for another widget */}
                                        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
                                            <h3 className="text-slate-200 font-semibold mb-4">Daily Focus</h3>
                                            <div className="space-y-3">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="h-10 rounded bg-slate-800/50 animate-pulse w-full" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    )
}
