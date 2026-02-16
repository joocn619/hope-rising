'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addJournalEntry } from '@/lib/firebase/firestore'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Loader2, CheckCircle2 } from 'lucide-react'

export function JournalForm() {
    const { user } = useAuth()
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [mood, setMood] = useState([3]) // 1-5 scale
    const [tags, setTags] = useState('') // Comma separated for now

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        setIsLoading(true)
        try {
            await addJournalEntry({
                userId: user.uid,
                title,
                body,
                moodScore: mood[0],
                tags: tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
            })

            setIsSuccess(true)

            // Allow user to write another entry or view list. 
            // For now, let's reset form after a delay to indicate success visually.
            setTimeout(() => {
                setIsSuccess(false)
                setTitle('')
                setBody('')
                setMood([3])
                setTags('')
                router.refresh() // Refresh page to show new entry in list
            }, 2000)

        } catch (error) {
            console.error('Error adding journal entry:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <Card className="glass-card bg-slate-900/40 border-slate-800 flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Entry Saved</h3>
                    <p className="text-slate-400">Great reflection. +15 Points!</p>
                </div>
            </Card>
        )
    }

    return (
        <Card className="glass-card bg-slate-900/40 border-slate-800">
            <CardHeader>
                <CardTitle className="text-white">New Entry</CardTitle>
                <CardDescription className="text-slate-400">Write down your thoughts, victories, or struggles.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-200">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Morning Reflection"
                            className="bg-slate-900/50 border-slate-700 text-white"
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label className="text-slate-200">Mood</Label>
                            <span className="text-indigo-400 font-bold">{mood[0]}/5</span>
                        </div>
                        <Slider
                            value={mood}
                            onValueChange={setMood}
                            max={5}
                            min={1}
                            step={1}
                            className="py-4"
                        />
                        <div className="flex justify-between text-xs text-slate-500 px-1">
                            <span>Low</span>
                            <span>High</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="body" className="text-slate-200">Entry</Label>
                        <Textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="What's on your mind?"
                            className="bg-slate-900/50 border-slate-700 text-white min-h-[150px]"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags" className="text-slate-200">Tags (comma separated)</Label>
                        <Input
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. gratitude, anxiety, win"
                            className="bg-slate-900/50 border-slate-700 text-white"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                            </span>
                        ) : 'Save to Journal'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
