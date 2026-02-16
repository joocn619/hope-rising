'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addUrgeLog } from '@/lib/firebase/firestore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/components/providers/auth-provider'
import { Loader2, CheckCircle2, RotateCcw, Clock } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Timestamp } from 'firebase/firestore'

export function UrgeLogForm() {
    const { user } = useAuth()
    const router = useRouter()

    const [intensity, setIntensity] = useState([5])
    const [triggerType, setTriggerType] = useState('')
    const [emotionalState, setEmotionalState] = useState<string | undefined>(undefined)
    const [actedOut, setActedOut] = useState(false)
    const [notes, setNotes] = useState('')

    // Time Intelligence State
    const [isManualTime, setIsManualTime] = useState(false)
    const [manualTime, setManualTime] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [showResetModal, setShowResetModal] = useState(false)

    // Helper to get time of day string
    const getBucket = (hour: number): 'morning' | 'afternoon' | 'evening' | 'night' => {
        if (hour < 12) return 'morning'
        if (hour < 17) return 'afternoon'
        if (hour < 21) return 'evening'
        return 'night'
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        setIsLoading(true)
        try {
            // Calculate Time Fields
            let finalDate = new Date()

            if (isManualTime && manualTime) {
                const [hours, minutes] = manualTime.split(':').map(Number)
                finalDate.setHours(hours, minutes, 0, 0)
            }

            const hourOfDay = finalDate.getHours()
            const dayOfWeek = finalDate.getDay() // 0-6
            const timeOfDay = getBucket(hourOfDay)

            await addUrgeLog({
                userId: user.uid,
                urgeLevel: intensity[0],
                triggerType: triggerType || 'Unknown',
                actedOut,
                emotionalState,
                notes,
                timeOfDay,
                hourOfDay,
                dayOfWeek,
                createdAt: Timestamp.fromDate(finalDate)
            })

            if (actedOut) {
                // Show Recovery Reset Modal instead of direct success
                setShowResetModal(true)
            } else {
                setIsSuccess(true)
                setTimeout(() => {
                    router.push('/dashboard')
                }, 1500)
            }

        } catch (error) {
            console.error('Error logging urge:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (showResetModal) {
        return (
            <Card className="glass-card max-w-2xl bg-slate-900/40 border-slate-800 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="h-16 w-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <RotateCcw className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Recovery Reset</h3>
                <p className="text-slate-300 mb-6 max-w-md">
                    It happened. Recovery is not a straight line, and perfection isn't the goal. What matters is what you do next.
                </p>

                <div className="space-y-4 w-full max-w-sm mb-8">
                    <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">1</div>
                        <span className="text-slate-300 text-sm">Take a deep breath. Forgive yourself.</span>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">2</div>
                        <span className="text-slate-300 text-sm">Reflect on the trigger (you just logged it).</span>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">3</div>
                        <span className="text-slate-300 text-sm">Reset your day 1. It starts now.</span>
                    </div>
                </div>

                <Button
                    onClick={() => router.push('/dashboard')}
                    className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-500 text-white h-12 rounded-xl"
                >
                    I'm Ready to Reset
                </Button>
            </Card>
        )
    }

    if (isSuccess) {
        return (
            <Card className="glass-card max-w-2xl bg-slate-900/40 border-slate-800 flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Victory Recorded</h3>
                    <p className="text-slate-400">Great job resisting! Keep going.</p>
                    <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
                </div>
            </Card>
        )
    }

    return (
        <Card className="glass-card max-w-2xl bg-slate-900/40 border-slate-800">
            <CardHeader>
                <CardTitle className="text-xl text-white">Log an Urge</CardTitle>
                <CardDescription className="text-slate-400">Track your triggers to identify patterns and build resilience.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Intensity Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label className="text-base text-slate-200">Intensity Level</Label>
                            <span className="text-indigo-400 font-bold text-lg">{intensity[0]}/10</span>
                        </div>
                        <Slider
                            value={intensity}
                            onValueChange={setIntensity}
                            max={10}
                            min={1}
                            step={1}
                            className="py-4"
                        />
                        <div className="flex justify-between text-xs text-slate-500 px-1">
                            <span>Manageable</span>
                            <span>Overwhelming</span>
                        </div>
                    </div>

                    {/* Time Intelligence (Optional Manual Time) */}
                    <div className="pt-2">
                        <div className="flex items-center gap-3">
                            <Label htmlFor="manual-time-toggle" className="text-sm text-slate-400 flex items-center gap-2 cursor-pointer">
                                <Clock className="h-3.5 w-3.5" />
                                Did this happen earlier?
                            </Label>
                            <Switch
                                id="manual-time-toggle"
                                checked={isManualTime}
                                onCheckedChange={setIsManualTime}
                                className="scale-75 origin-left"
                            />
                        </div>

                        {isManualTime && (
                            <div className="mt-3 animate-in slide-in-from-top-2 fade-in duration-200">
                                <Input
                                    type="time"
                                    value={manualTime}
                                    onChange={(e) => setManualTime(e.target.value)}
                                    className="w-40 bg-slate-900/50 border-slate-700 text-white"
                                    required={isManualTime}
                                />
                            </div>
                        )}
                    </div>


                    {/* Trigger Input */}
                    <div className="space-y-2">
                        <Label htmlFor="trigger" className="text-slate-200">What triggered it?</Label>
                        <Input
                            id="trigger"
                            value={triggerType}
                            onChange={(e) => setTriggerType(e.target.value)}
                            placeholder="e.g. Stress at work, saw an ad, boredom..."
                            className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                            required
                        />
                    </div>

                    {/* Emotional State (HALT) */}
                    <div className="space-y-2">
                        <Label className="text-slate-200">What were you feeling? (HALT)</Label>
                        <ToggleGroup type="single" value={emotionalState} onValueChange={setEmotionalState} className="flex flex-wrap justify-start gap-2">
                            {['Hungry', 'Angry', 'Lonely', 'Tired', 'Bored', 'Stressed'].map((emotion) => (
                                <ToggleGroupItem
                                    key={emotion}
                                    value={emotion}
                                    className="data-[state=on]:bg-indigo-600 data-[state=on]:text-white bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800"
                                >
                                    {emotion}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>

                    {/* Acted Out Switch */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="space-y-0.5">
                            <Label htmlFor="acted-out" className="text-base text-slate-200">Did you act on the urge?</Label>
                            <p className="text-sm text-slate-400">Be honest. This helps track your streak accurately.</p>
                        </div>
                        <Switch
                            id="acted-out"
                            checked={actedOut}
                            onCheckedChange={setActedOut}
                        />
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="note" className="text-slate-200">Notes (Optional)</Label>
                        <Textarea
                            id="note"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="How did you feel? What did you do to cope?"
                            className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                            </span>
                        ) : 'Save Entry'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
