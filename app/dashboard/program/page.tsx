'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Lock, Loader2, PlayCircle, Crown, Shield } from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { getUserProfile, completeProgramDay, completeTransformationDay } from '@/lib/firebase/firestore'
import { UserProfile } from '@/types/firestore'
import { TransformationProgram } from '@/components/dashboard/program/transformation-program'
import { format } from 'date-fns'

const days = [
    { day: 1, title: 'Awareness', content: 'Understand your triggers and why you relapse. The first step to change is observing your behavior without judgment.', action: 'Complete the "My Why" worksheet (Mental)' },
    { day: 2, title: 'Trigger Mapping', content: 'Identify the external cues (people, places, things) and internal cues (emotions, thoughts) that precede an urge.', action: 'List your top 3 triggers in the Urge Log.' },
    { day: 3, title: 'Urge Control', content: 'Learn the technique of "Urge Surfing". Watch the urge rise like a wave, peak, and crash, without fighting it.', action: 'Practice Urge Surfing for 5 minutes today.' },
    { day: 4, title: 'Dopamine Reset', content: 'Your brain is overstimulated. Today, facilitate a partial dopamine detox by avoiding high-dopamine activities.', action: 'No social media or video games for 24 hours.' },
    { day: 5, title: 'Environment', content: 'Your environment dictates your habits. Make bad habits difficult and good habits easy.', action: 'Remove one trigger from your immediate environment.' },
    { day: 6, title: 'Discipline', content: 'Motivation is fleeting; discipline is consistent. Build a small morning routine to anchor your day.', action: 'Wake up 15 minutes early and hydrate immediately.' },
    { day: 7, title: 'Identity Shift', content: 'True change comes from identity. Stop saying "I am trying to quit" and start saying "I am not a user".', action: 'Write a letter to your future self.' },
]

export default function ProgramPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [viewDay, setViewDay] = useState(1) // Which day the user is currently viewing
    const [isCompleting, setIsCompleting] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(true)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
            return
        }

        async function fetchProfile() {
            if (!user) return
            try {
                const data = await getUserProfile(user.uid)
                if (data) {
                    setProfile(data)
                    // Default view to their current day (capped at 7)
                    if (!data.settings?.isPro) {
                        setViewDay(Math.min(data.starter7CurrentDay || 1, 7))
                    }
                }
            } catch (error) {
                console.error("Failed to load profile", error)
            } finally {
                setIsLoadingData(false)
            }
        }

        if (user) {
            fetchProfile()
        }
    }, [user, loading, router])

    const handleCompleteDay = async () => {
        if (!user || !profile) return

        setIsCompleting(true)
        try {
            await completeProgramDay(user.uid, viewDay)

            // Optimistic update
            const updatedProfile = { ...profile, starter7CurrentDay: (profile.starter7CurrentDay || 1) + 1 }
            setProfile(updatedProfile)

            // If there's a next day, switch view to it
            if (viewDay < 7) {
                setTimeout(() => setViewDay(viewDay + 1), 1000)
            }
        } catch (error) {
            console.error("Failed to complete day", error)
        } finally {
            setIsCompleting(false)
        }
    }

    const handleCompleteTransformationDay = async (dayString: number) => {
        if (!user || !profile) return
        await completeTransformationDay(user.uid, dayString)
        // Refresh profile to get new state
        const data = await getUserProfile(user.uid)
        if (data) setProfile(data)
    }

    if (loading || isLoadingData) return <div className="p-8 text-slate-400">Loading program...</div>
    if (!profile) return null

    // PRO MODE VIEW
    if (profile.settings?.isPro) {
        return (
            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                            Full Recovery Program
                            <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded-full border border-yellow-500/20 flex items-center gap-1">
                                <Crown className="h-3 w-3" /> PRO Member
                            </span>
                        </h1>
                        <p className="text-slate-400">Your complete roadmap to lifelong freedom.</p>
                    </div>
                </div>

                <TransformationProgram
                    userProfile={profile}
                    onCompleteDay={handleCompleteTransformationDay}
                />
            </div>
        )
    }

    // FREE MODE VIEW
    const currentProgressDay = profile.starter7CurrentDay || 1
    const dayData = days[viewDay - 1]
    const isLocked = viewDay > currentProgressDay
    const isCompleted = viewDay < currentProgressDay
    const isCurrent = viewDay === currentProgressDay

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">7-Day Reset Program</h1>
                    <p className="text-slate-400">Rebuild your foundation one day at a time.</p>
                </div>
                <div className="hidden md:block">
                    <span className="text-indigo-400 font-mono text-lg bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-500/30">
                        Day {currentProgressDay <= 7 ? currentProgressDay : 7} / 7
                    </span>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className={`glass-card bg-slate-900/40 border-slate-800 relative overflow-hidden transition-all duration-500 ${isLocked ? 'opacity-70 grayscale' : ''}`}>
                        {isLocked && (
                            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 border border-slate-800 rounded-xl">
                                <Lock className="h-12 w-12 text-slate-500 mb-4" />
                                <h3 className="text-xl font-bold text-white">Day {viewDay} Locked</h3>
                                <p className="text-slate-400 mt-2">Complete previous days to unlock.</p>
                            </div>
                        )}

                        <CardHeader className="relative z-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Day {viewDay}</h2>
                                    <CardTitle className="text-3xl text-indigo-300 mb-2">
                                        {dayData.title}
                                    </CardTitle>
                                </div>
                                {isCompleted && (
                                    <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-green-500/20 flex items-center gap-2">
                                        <CheckCircle className="h-3 w-3" /> Completed
                                    </div>
                                )}
                            </div>
                            <CardDescription>Estimated time: 10-15 mins</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 text-slate-300 relative z-0">
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p>{dayData.content}</p>
                                <p>
                                    Focus on this single concept for the next 24 hours. Do not overwhelm yourself with the future.
                                    Recovery happens in the present moment.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-slate-800">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <PlayCircle className="h-5 w-5 text-indigo-400" /> Today's Action
                                </h3>
                                <div className="bg-slate-800/40 p-5 rounded-lg border border-slate-700/50 hover:border-indigo-500/30 transition-colors">
                                    <p className="text-slate-200 font-medium">{dayData.action}</p>
                                </div>
                            </div>

                            {isCurrent && (
                                <Button
                                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white h-12 text-lg font-medium shadow-lg shadow-indigo-900/20"
                                    onClick={handleCompleteDay}
                                    disabled={isCompleting}
                                >
                                    {isCompleting ? (
                                        <span className="flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /> Updating...</span>
                                    ) : (
                                        <span className="flex items-center gap-2">Mark Day Complete <CheckCircle className="h-5 w-5" /></span>
                                    )}
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    {/* Upsell Card for Free Users */}
                    <Card className="bg-gradient-to-br from-yellow-900/20 to-black border-yellow-500/20 relative overflow-hidden group hover:border-yellow-500/40 transition-all">
                        <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors"></div>
                        <CardContent className="p-6 relative z-10 flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Crown className="h-5 w-5 text-yellow-500" /> Unlock Phase 2: Transformation
                                </h3>
                                <p className="text-slate-400 text-sm max-w-lg">
                                    The 7-Day Reset is just the beginning. The 30-Day Pro program is designed to rewire your brain and build lasting freedom.
                                </p>
                            </div>
                            <Button onClick={() => router.push('/dashboard/subscription')} className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold">
                                Upgrade to Unlock
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Navigation */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-400 px-1">Course Schedule</h3>
                    <div className="space-y-2">
                        {days.map((day) => {
                            const dayStatusLocked = day.day > currentProgressDay
                            const dayStatusCompleted = day.day < currentProgressDay
                            const dayStatusCurrent = day.day === currentProgressDay
                            const isSelected = viewDay === day.day

                            return (
                                <div
                                    key={day.day}
                                    onClick={() => setViewDay(day.day)}
                                    className={`
                                        group p-4 rounded-lg border cursor-pointer transition-all duration-200
                                        ${isSelected
                                            ? 'bg-indigo-900/20 border-indigo-500/50 shadow-md shadow-indigo-900/10 scale-[1.02]'
                                            : 'bg-slate-900/20 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'}
                                    `}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`
                                                flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold transition-colors
                                                ${dayStatusCompleted ? 'bg-green-500/20 text-green-400' : ''}
                                                ${dayStatusCurrent ? 'bg-indigo-500 text-white' : ''}
                                                ${dayStatusLocked ? 'bg-slate-800 text-slate-500' : ''}
                                            `}>
                                                {dayStatusCompleted ? <CheckCircle className="h-4 w-4" /> : day.day}
                                            </div>
                                            <div>
                                                <div className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                                    {day.title}
                                                </div>
                                                <div className="text-xs text-slate-500">Day {day.day}</div>
                                            </div>
                                        </div>

                                        {dayStatusLocked && <Lock className="h-4 w-4 text-slate-700" />}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="p-5 rounded-lg border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 mt-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-indigo-300">Phase 2: Growth</span>
                                <Lock className="h-4 w-4 text-slate-500" />
                            </div>
                            <div className="text-sm text-slate-400 mb-3">30-Day Transformation Program</div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600"
                                onClick={() => router.push('/dashboard/subscription')} // Upsell Link
                            >
                                Upgrade to Access
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
