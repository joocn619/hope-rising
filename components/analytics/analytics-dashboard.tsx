'use client'

import { useState, useEffect } from 'react'
import { WeeklySparkline } from './weekly-sparkline'
import { StreakHistory } from './streak-history'
import { UrgeChart } from '@/components/dashboard/urge-chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/components/providers/auth-provider'
import { getCombinedStats, getUserProfile } from '@/lib/firebase/firestore'
import { Loader2 } from 'lucide-react'

export function AnalyticsDashboard() {
    const { user } = useAuth()
    const [stats, setStats] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            if (!user) return
            try {
                const [statsData, profileData] = await Promise.all([
                    getCombinedStats(user.uid),
                    getUserProfile(user.uid)
                ])
                setStats(statsData)
                setProfile(profileData)
            } catch (error) {
                console.error("Failed to load analytics", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [user])

    if (isLoading) {
        return <div className="flex h-64 items-center justify-center text-slate-400"><Loader2 className="animate-spin h-8 w-8" /></div>
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* We'll pass specific data to Sparkline later, for now let it control itself or keep mock if needed, 
                    but ideally we pass stats.timeOfDay or similar if applicable, or we build a new 'DailyIntensity' chart */}
                <WeeklySparkline />

                <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-center items-center">
                        <span className="text-slate-400 text-xs uppercase tracking-wider">Total Logs</span>
                        <span className="text-3xl font-bold text-white mt-1">{stats?.totalUrges || 0}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-center items-center">
                        <span className="text-slate-400 text-xs uppercase tracking-wider">Journal Entries</span>
                        <span className="text-3xl font-bold text-indigo-400 mt-1">{stats?.journalCount || 0}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-center items-center">
                        <span className="text-slate-400 text-xs uppercase tracking-wider">Victories</span>
                        <span className="text-3xl font-bold text-green-400 mt-1">{stats?.victories || 0}</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="col-span-2">
                    <Tabs defaultValue="7days" className="w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">Urge Analysis</h3>
                            <TabsList className="bg-slate-900 border border-slate-800">
                                <TabsTrigger value="7days">Active</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="7days" className="space-y-4">
                            <UrgeChart data={stats?.dailyActivity || []} />
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="col-span-1">
                    <StreakHistory current={profile?.streak || 0} longest={profile?.longestStreak || 0} />
                </div>
            </div>
        </div>
    )
}
