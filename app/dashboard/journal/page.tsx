'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'
import { getJournalEntries } from '@/lib/firebase/firestore'
import { JournalEntry } from '@/types/firestore' // Assuming type is exported
import { JournalForm } from '@/components/journal/journal-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'

export default function JournalPage() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [entries, setEntries] = useState<JournalEntry[]>([])
    const [isLoadingEntries, setIsLoadingEntries] = useState(true)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
            return
        }

        async function fetchEntries() {
            if (!user) return
            try {
                const data = await getJournalEntries(user.uid)
                setEntries(data)
            } catch (error) {
                console.error("Failed to load journal entries", error)
            } finally {
                setIsLoadingEntries(false)
            }
        }

        if (user) {
            fetchEntries()
        }
    }, [user, loading, router])

    if (loading) return <div className="p-8 text-slate-400">Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Journal</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <JournalForm />
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-300 mb-4">Recent Entries</h2>

                    {isLoadingEntries ? (
                        <div className="text-slate-500">Loading entries...</div>
                    ) : entries.length === 0 ? (
                        <div className="p-6 border border-dashed border-slate-700 rounded-xl text-center">
                            <p className="text-slate-500 mb-2">No entries yet.</p>
                            <p className="text-sm text-slate-600">Start by writing your first reflection.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {entries.map((entry) => (
                                <Card key={entry.id} className="glass-card bg-slate-900/30 border-slate-800 hover:bg-slate-900/50 transition-colors">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg text-white font-medium">{entry.title}</CardTitle>
                                            <span className="text-xs text-slate-500">
                                                {entry.createdAt ? formatDistanceToNow(entry.createdAt.toDate(), { addSuffix: true }) : 'Just now'}
                                            </span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-300 text-sm line-clamp-3 mb-3">{entry.body}</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {entry.tags.map(tag => (
                                                <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-slate-800 rounded text-slate-400">
                                                    #{tag}
                                                </span>
                                            ))}
                                            <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded">
                                                Mood: {entry.moodScore}/5
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
