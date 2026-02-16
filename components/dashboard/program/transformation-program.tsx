'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Lock, PlayCircle, Star, Shield, Brain, Heart, Zap } from 'lucide-react'
import { UserProfile } from '@/types/firestore'

// This would eventually be fetched from a CMS or Firestore
const transformationDays = [
    // PHASE 1: FOUNDATION (Days 1-7)
    {
        day: 1,
        phase: 'Foundation',
        title: 'The Neuroscience of Addiction',
        icon: Brain,
        content: `Addiction is not a moral failing; it is a neurological adaptation. Your brain has rewired itself to prioritize the addictive stimulus above survival needs. 
        
        Today, we simply acknowledge this: You are fighting biology, not a character flaw.`,
        action: 'Watch the "Dopamine Highway" visualization (Coming Soon).'
    },
    {
        day: 2,
        phase: 'Foundation',
        title: 'Radical Acceptance',
        icon: Heart,
        content: `Fighting reality causes suffering. Acceptance does not mean approving of your situation; it means acknowledging it so you can change it.`,
        action: 'Journal for 5 minutes: "What am I refusing to accept?"'
    },
    {
        day: 3,
        phase: 'Foundation',
        title: 'Pattern Interrupts',
        icon: Zap,
        content: `You cannot stop an urge, but you can break the pattern. When the loop starts, you must physically move your body to change your state.`,
        action: 'Create a "Pattern Break" menu (3 physical actions you can do instantly).'
    },
    {
        day: 4,
        phase: 'Foundation',
        title: 'Environment Design',
        icon: Shield,
        content: `Willpower is a finite resource. Don't rely on it. Design your environment so that acting out requires more effort than you are willing to give.`,
        action: 'Identify and remove 1 digital and 1 physical trigger from your space.'
    },
    {
        day: 5,
        phase: 'Foundation',
        title: 'Urge Surfing',
        icon: Star,
        content: `Urges are like waves. They rise, peak, and crash. You don't have to fight the wave; you just have to ride it until it passes.`,
        action: 'Practice "Urge Surfing" for 3 minutes next time you feel a craving.'
    },
    {
        day: 6,
        phase: 'Foundation',
        title: 'The Power of "Yet"',
        icon: Brain,
        content: `Shift your mindset from "I can\'t do this" to "I haven\'t mastered this... yet." Growth mindset is the key to resilience.`,
        action: 'Rephrase 3 negative self-talk statements using "yet".'
    },
    {
        day: 7,
        phase: 'Foundation',
        title: 'Weekly Review & Reset',
        icon: CheckCircle,
        content: `Reflection is where learning happens. Look back on the week. What worked? What didn't? Adjust your strategy for the week ahead.`,
        action: 'Complete the Weekly Reflection module in your dashboard.'
    },

    // PHASE 2: GROWTH (Days 8-14)
    {
        day: 8,
        phase: 'Growth',
        title: 'Identity Shifting',
        icon: Brain,
        content: `True change happens at the identity level. Stop saying "I'm trying to quit." Start saying "I am not the kind of person who does that."`,
        action: 'Write down your new identity statement and place it where you see it daily.'
    },
    {
        day: 9,
        phase: 'Growth',
        title: 'Dopamine Detox',
        icon: Zap,
        content: `Your brain's reward system needs a reset. By lowering high-dopamine activities, you re-sensitize yourself to the simple joys of life.`,
        action: 'Commit to 24 hours of low-stimulation living (no social media, processed sugar, or gaming).'
    },
    {
        day: 10,
        phase: 'Growth',
        title: 'Emotional Intelligence',
        icon: Heart,
        content: `Addiction is often a way to numb emotions. Learning to sit with discomfort—boredom, loneliness, anger—is a superpower.`,
        action: 'Use the "HALT" method (Hungry, Angry, Lonely, Tired) next time you feel off.'
    },
    {
        day: 11,
        phase: 'Growth',
        title: 'Social Connection',
        icon: Heart,
        content: `The opposite of addiction is not sobriety; it is connection. Isolation feeds the cycle. Vulnerability breaks it.`,
        action: 'Reach out to one friend or family member today just to connect.'
    },
    {
        day: 12,
        phase: 'Growth',
        title: 'Stress Management',
        icon: Shield,
        content: `Stress is a major trigger. You need healthy outlets. Exercise, meditation, and creative expression are your new drugs of choice.`,
        action: 'Try a 10-minute guided meditation for stress relief.'
    },
    {
        day: 13,
        phase: 'Growth',
        title: 'Visualizing Success',
        icon: Star,
        content: `Elite athletes visualize their wins. Your brain can\'t tell the difference between a vivid imagination and reality. Use this to your advantage.`,
        action: 'Spend 5 minutes visualizing yourself successfully navigating a difficult trigger.'
    },
    {
        day: 14,
        phase: 'Growth',
        title: 'Two-Week Milestone',
        icon: CheckCircle,
        content: `You've made it two weeks. This is significant. Your brain is starting to heal. Celebrate this victory—you earned it.`,
        action: 'Reward yourself with a healthy, non-addictive treat (e.g., a good meal, a movie, a new book).'
    },

    // PHASE 3: MASTERY (Days 15-30)
    ...Array.from({ length: 16 }, (_, i) => ({
        day: i + 15,
        phase: 'Mastery',
        title: `Day ${i + 15}: Advanced Mastery`,
        icon: Star,
        content: 'This advanced content is locked. Keep going to unlock the final phase of your transformation.',
        action: 'Complete previous days to unlock.'
    }))
]

interface TransformationProgramProps {
    userProfile: UserProfile
    onCompleteDay: (day: number) => Promise<void>
}

export function TransformationProgram({ userProfile, onCompleteDay }: TransformationProgramProps) {
    const [viewDay, setViewDay] = useState(userProfile.transformationCurrentDay || 1)
    const [isCompleting, setIsCompleting] = useState(false)

    // Current progress
    const currentDay = userProfile.transformationCurrentDay || 1
    const dayData = transformationDays[viewDay - 1]

    // Status checks
    const isLocked = viewDay > currentDay
    const isCompleted = viewDay < currentDay
    const isCurrent = viewDay === currentDay

    // Phase calculation
    const currentPhase = dayData.phase

    const handleComplete = async () => {
        setIsCompleting(true)
        try {
            await onCompleteDay(viewDay)
            if (viewDay < 30) {
                // Optimistically switch to next day after short delay
                setTimeout(() => setViewDay(viewDay + 1), 500)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsCompleting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Shield className="h-6 w-6 text-yellow-500" />
                        30-Day Transformation
                    </h2>
                    <p className="text-slate-400">Phase: <span className="text-indigo-400 font-medium">{currentPhase}</span></p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-white">{Math.floor(((currentDay - 1) / 30) * 100)}%</span>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Completed</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Card className={`glass-card bg-slate-900/40 border-slate-800 relative overflow-hidden min-h-[400px] transition-all duration-500 ${isLocked ? 'opacity-70 grayscale' : ''}`}>
                        {isLocked && (
                            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 border border-slate-800 rounded-xl">
                                <Lock className="h-16 w-16 text-slate-600 mb-4" />
                                <h3 className="text-2xl font-bold text-white">Day {viewDay} Locked</h3>
                                <p className="text-slate-400 mt-2">Complete previous days to unlock.</p>
                            </div>
                        )}

                        <CardHeader className="relative z-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Day {viewDay}</h2>
                                    <CardTitle className="text-3xl text-yellow-100 mb-2">
                                        {dayData.title}
                                    </CardTitle>
                                </div>
                                <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                    <dayData.icon className="h-6 w-6 text-yellow-500" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8 relative z-0">
                            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                                {dayData.content.split('\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                                    <PlayCircle className="h-5 w-5 text-indigo-400" /> Action Step
                                </h4>
                                <p className="text-slate-300">{dayData.action}</p>
                            </div>

                            {isCurrent && (
                                <Button
                                    onClick={handleComplete}
                                    disabled={isCompleting}
                                    className="w-full h-12 text-lg bg-yellow-600 hover:bg-yellow-500 text-black font-bold"
                                >
                                    {isCompleting ? 'Updating...' : 'Complete Day ' + viewDay}
                                </Button>
                            )}
                            {isCompleted && (
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center gap-2 text-green-400 font-medium">
                                    <CheckCircle className="h-5 w-5" />
                                    Day Completed
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="font-medium text-slate-400">Course Map</h3>
                    </div>
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {transformationDays.map((day) => {
                            const statusLocked = day.day > currentDay
                            const statusCompleted = day.day < currentDay
                            const statusCurrent = day.day === currentDay
                            const isSelected = viewDay === day.day

                            return (
                                <button
                                    key={day.day}
                                    onClick={() => setViewDay(day.day)}
                                    className={`
                                        w-full text-left p-3 rounded-lg border flex items-center gap-3 transition-all
                                        ${isSelected
                                            ? 'bg-yellow-500/10 border-yellow-500/30'
                                            : 'bg-slate-900/20 border-slate-800 hover:bg-slate-800/40'}
                                    `}
                                >
                                    <div className={`
                                        h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                                        ${statusCompleted ? 'bg-green-500/20 text-green-400' : ''}
                                        ${statusCurrent ? 'bg-yellow-500 text-black' : ''}
                                        ${statusLocked ? 'bg-slate-800 text-slate-600' : ''}
                                    `}>
                                        {statusCompleted ? <CheckCircle className="h-4 w-4" /> : day.day}
                                    </div>
                                    <div className="truncate">
                                        <p className={`text-sm font-medium truncate ${isSelected ? 'text-yellow-100' : 'text-slate-400'}`}>
                                            {day.title}
                                        </p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
