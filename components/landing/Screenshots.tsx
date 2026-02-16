'use client'

import { motion } from 'framer-motion'
import { fadeInUpVariant, floatingVariant, viewportConfig } from './animation-constants'
import { Activity, Calendar, CheckCircle, ChevronLeft, Menu, MoreHorizontal, Plus } from 'lucide-react'
import { UrgeChart } from '@/components/dashboard/urge-chart'
import { DailyAction } from '@/components/dashboard/daily-action'

export function Screenshots() {

    return (
        <section className="py-32 bg-[#0f172a] overflow-hidden relative border-t border-white/5">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-8 text-center mb-20 relative z-10">
                <motion.div
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                >
                    <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300 backdrop-blur-md mb-6">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-purple-400 mr-2 animate-pulse" />
                        V2 Interface
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 balanced">
                        Designed for <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">Deep Focus</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        A recovery environment that respects your attention. Dark mode by default.
                        No distractions. Just pure clarity.
                    </p>
                </motion.div>
            </div>

            {/* Mockups Container */}
            <div className="relative flex justify-center items-center gap-8 -mx-32 px-32 overflow-visible min-h-[700px]">

                {/* LEFT PHONE: URGE LOG */}
                <motion.div
                    custom={0}
                    variants={floatingVariant}
                    animate="animate"
                    initial="initial"
                    className="hidden md:block absolute left-[15%] lg:left-[20%] w-[320px] h-[650px] bg-[#0b0f19] rounded-[3.5rem] border-[8px] border-slate-800/80 shadow-2xl z-0 scale-90 opacity-70 blur-[1px] hover:blur-0 hover:scale-95 hover:z-10 hover:opacity-100 transition-all duration-500"
                >
                    {/* Notch & Bezel */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-20" />
                    <div className="absolute inset-0 rounded-[3rem] border border-white/5 pointer-events-none z-20" />

                    {/* Screen Content */}
                    <div className="w-full h-full bg-[#0f172a] rounded-[3rem] overflow-hidden flex flex-col pt-12">
                        <div className="px-6 pb-4 flex justify-between items-center border-b border-white/5">
                            <ChevronLeft className="h-5 w-5 text-slate-400" />
                            <span className="text-white font-semibold">Log Urge</span>
                            <MoreHorizontal className="h-5 w-5 text-slate-400" />
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-500 uppercase">Intensity</label>
                                <div className="h-12 bg-slate-900 rounded-xl border border-white/5 flex items-center px-4">
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full w-[75%] bg-linear-to-r from-orange-500 to-red-500" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-500 uppercase">Trigger</label>
                                <div className="p-4 bg-slate-900 rounded-xl border border-white/5 text-slate-300 text-sm">
                                    Feeling stressed after work meeting...
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-500 uppercase">Location</label>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30">Home</span>
                                    <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs border border-white/5">Work</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto p-6 bg-slate-900/50 border-t border-white/5">
                            <div className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl text-center shadow-lg shadow-white/10">
                                Save Log
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT PHONE: JOURNAL */}
                <motion.div
                    custom={2}
                    variants={floatingVariant}
                    animate="animate"
                    initial="initial"
                    className="hidden md:block absolute right-[15%] lg:right-[20%] w-[320px] h-[650px] bg-[#0b0f19] rounded-[3.5rem] border-[8px] border-slate-800/80 shadow-2xl z-0 scale-90 opacity-70 blur-[1px] hover:blur-0 hover:scale-95 hover:z-10 hover:opacity-100 transition-all duration-500"
                >
                    {/* Notch & Bezel */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-20" />
                    <div className="absolute inset-0 rounded-[3rem] border border-white/5 pointer-events-none z-20" />

                    {/* Screen Content */}
                    <div className="w-full h-full bg-[#0f172a] rounded-[3rem] overflow-hidden flex flex-col pt-12">
                        <div className="px-6 pb-4 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Journal</h3>
                            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center">
                                <Plus className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 hover:bg-slate-800 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs text-slate-500">Oct {12 - i}, 2024</span>
                                        {i === 1 && <Activity className="h-3 w-3 text-green-400" />}
                                    </div>
                                    <div className="font-medium text-slate-200 text-sm mb-1 group-hover:text-white">Morning Reflection</div>
                                    <div className="h-1 w-12 bg-slate-700 rounded-full group-hover:bg-purple-500/50 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* CENTER PHONE: DASHBOARD (HERO) */}
                <motion.div
                    custom={1}
                    variants={floatingVariant}
                    animate="animate"
                    initial="initial"
                    className="relative z-10 w-[360px] h-[720px] bg-[#0b0f19] rounded-[4rem] border-[8px] border-slate-700 shadow-[0_0_60px_rgba(124,58,237,0.15)]"
                >
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-slate-800 rounded-b-2xl z-30" />
                    <div className="absolute inset-0 rounded-[3.5rem] border border-white/10 pointer-events-none z-20" />

                    {/* Reflective Glint */}
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-linear-to-l from-white/[0.03] to-transparent pointer-events-none z-20 rounded-r-[3.5rem]" />

                    {/* Screen Content */}
                    <div className="w-full h-full bg-[#0f172a] rounded-[3.5rem] overflow-hidden flex flex-col pt-14 relative group-hover:overflow-y-auto no-scrollbar scroll-smooth">
                        {/* Background Glow inside screen */}
                        <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] bg-purple-600/20 blur-[80px] pointer-events-none" />

                        {/* App Header */}
                        <div className="px-6 pb-6 flex justify-between items-center relative z-10">
                            <div>
                                <div className="text-xs text-slate-400">Welcome back</div>
                                <div className="text-xl font-bold text-white">Alex</div>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden relative">
                                <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-blue-500 opacity-80" />
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">A</div>
                            </div>
                        </div>

                        <div className="px-4 pb-24 space-y-6 relative z-10">
                            {/* Stats Grid (2x2 for mobile density) */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Streak Card */}
                                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                                    <div className="flex items-center justify-between mb-2">
                                        <Activity className="h-4 w-4 text-orange-500" />
                                        <span className="text-[10px] text-slate-400 uppercase font-bold">Streak</span>
                                    </div>
                                    <div className="text-2xl font-bold text-white">14</div>
                                    <div className="text-xs text-slate-500">Days Clean</div>
                                </div>

                                {/* Focus Score */}
                                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                                    <div className="flex items-center justify-between mb-2">
                                        <Activity className="h-4 w-4 text-blue-500" />
                                        <span className="text-[10px] text-slate-400 uppercase font-bold">Focus</span>
                                    </div>
                                    <div className="text-2xl font-bold text-white">92%</div>
                                    <div className="text-xs text-green-400">+5% vs last week</div>
                                </div>

                                {/* Urges Today */}
                                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                                    <div className="flex items-center justify-between mb-2">
                                        <Activity className="h-4 w-4 text-red-500" />
                                        <span className="text-[10px] text-slate-400 uppercase font-bold">Urges</span>
                                    </div>
                                    <div className="text-2xl font-bold text-white">2</div>
                                    <div className="text-xs text-slate-500">Resisted successfully</div>
                                </div>

                                {/* Program Day */}
                                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md relative overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10" />
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-2">
                                            <Calendar className="h-4 w-4 text-indigo-400" />
                                            <span className="text-[10px] text-slate-400 uppercase font-bold">Program</span>
                                        </div>
                                        <div className="text-2xl font-bold text-white">Day 5</div>
                                        <div className="w-full h-1 bg-slate-800 rounded-full mt-2">
                                            <div className="h-full w-[70%] bg-indigo-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Urge Chart */}
                            <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                                <UrgeChart data={[
                                    { name: 'M', urges: 2 },
                                    { name: 'T', urges: 1 },
                                    { name: 'W', urges: 4 },
                                    { name: 'T', urges: 2 },
                                    { name: 'F', urges: 0 },
                                    { name: 'S', urges: 1 },
                                    { name: 'S', urges: 3 },
                                ]} />
                            </div>

                            {/* Daily Action */}
                            <div className="scale-95 origin-top">
                                <DailyAction />
                            </div>
                        </div>

                        {/* Bottom Nav Mockup */}
                        <div className="h-20 bg-[#0f172a]/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-6 absolute bottom-0 w-full z-20">
                            <div className="flex flex-col items-center gap-1 text-purple-400">
                                <div className="p-1 rounded-full bg-purple-500/20"><Menu className="h-5 w-5" /></div>
                            </div>
                            <div className="flex flex-col items-center gap-1 text-slate-600">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col items-center gap-1 text-slate-600">
                                <Activity className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
