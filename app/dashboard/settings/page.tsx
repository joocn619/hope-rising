'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import { getUserProfile, updateUserProfile } from '@/lib/firebase/firestore'
import { UserProfile } from '@/types/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Save } from 'lucide-react'

export default function SettingsPage() {
    const { user } = useAuth()
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        displayName: '',
        whyQuit: '',
    })

    useEffect(() => {
        async function loadData() {
            if (!user) return
            try {
                const data = await getUserProfile(user.uid)
                setProfile(data)
                if (data) {
                    setFormData({
                        displayName: data.displayName || '',
                        whyQuit: data.whyQuit || '',
                    })
                }
            } catch (error) {
                console.error("Failed to load settings", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [user])

    const handleSave = async () => {
        if (!user || !profile) return
        setIsSaving(true)
        try {
            await updateUserProfile(user.uid, {
                displayName: formData.displayName,
                whyQuit: formData.whyQuit,
            })
            // Update local state
            setProfile({ ...profile, ...formData })
            alert('Settings saved successfully!')
        } catch (error) {
            console.error("Failed to save settings", error)
            alert('Failed to save settings.')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-slate-500" /></div>

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
                <p className="text-slate-400">Manage your profile and preferences.</p>
            </div>

            <Card className="glass-card bg-slate-900/40 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                    <CardDescription className="text-slate-400">Update your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">Email</Label>
                        <Input id="email" value={profile?.email} disabled className="bg-slate-950/50 border-slate-800 text-slate-500" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-300">Display Name</Label>
                        <Input
                            id="name"
                            value={formData.displayName}
                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                            className="bg-slate-950/50 border-slate-800 text-slate-200 focus:border-indigo-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="why" className="text-slate-300">My "Why" Statement</Label>
                        <Input
                            id="why"
                            value={formData.whyQuit}
                            onChange={(e) => setFormData({ ...formData, whyQuit: e.target.value })}
                            className="bg-slate-950/50 border-slate-800 text-slate-200 focus:border-indigo-500"
                        />
                    </div>

                    <Button onClick={handleSave} disabled={isSaving} className="w-full bg-indigo-600 hover:bg-indigo-500">
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </CardContent>
            </Card>

            <Card className="glass-card bg-slate-900/40 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white">Application Settings</CardTitle>
                    <CardDescription className="text-slate-400">Customize your experience.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500 italic">Notification settings and theme preferences coming soon.</p>
                </CardContent>
            </Card>
        </div>
    )
}
