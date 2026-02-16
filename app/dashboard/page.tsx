'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'
import { getUserProfile, getRecentUrges, checkAndUpdateStreak } from '@/lib/firebase/firestore'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { UrgeChart } from '@/components/dashboard/urge-chart'
import { DailyAction } from '@/components/dashboard/daily-action'
import { RecoveryTools } from '@/components/dashboard/recovery-tools'
import { Milestones } from '@/components/dashboard/milestones'
import { WeeklyReflection } from '@/components/dashboard/weekly-reflection'
import { UrgeSurvivalModal } from '@/components/dashboard/urge-survival-modal'
import { Button } from '@/components/ui/button'
import { Zap, Moon } from 'lucide-react'

import { RecoveryStateCard } from '@/components/dashboard/recovery-state-card'
import { CleanDaysCard } from '@/components/dashboard/clean-days-card'
import { RiskTimeCard } from '@/components/dashboard/risk-time-card'
import { PanicFloatingButton } from '@/components/dashboard/panic-floating-button'

import { TodayUrgesDrawer } from '@/components/dashboard/today-urges-drawer'
import { CommitmentCard } from '@/components/dashboard/commitment-card'
import { StreakIntelligence } from '@/components/dashboard/streak-intelligence'
import { TodaysFocusStrip } from '@/components/dashboard/todays-focus-strip'

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    // Stats State
    const [streak, setStreak] = useState(0)
    const [urgesToday, setUrgesToday] = useState(0)
    const [programDay, setProgramDay] = useState(1)
    const [chartData, setChartData] = useState<{ name: string, urges: number }[]>([])
    const [welcomeReady, setWelcomeReady] = useState(false)
    const [showSurvivalModal, setShowSurvivalModal] = useState(false)
    const [isLateNight, setIsLateNight] = useState(false)
    const [showUrgesDrawer, setShowUrgesDrawer] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
            return
        }

        async function fetchData() {
            if (!user) return

            try {
                // 1. Fetch & Update User Profile (Calculates active streak)
                const profile = await checkAndUpdateStreak(user.uid)
                if (profile) {
                    setStreak(profile.streak || 0)
                    setProgramDay(profile.starter7CurrentDay || 1)
                } else {
                    // If no profile, maybe redirect to onboarding?
                    router.push('/onboarding')
                }

                // 2. Fetch Recent Urges for Chart & Today's Count
                const urges = await getRecentUrges(user.uid, 20) // Get enough for a week's data safely

                // Calculate Urges Today
                const today = new Date().toDateString()
                const todayCount = urges.filter(u => new Date(u.createdAt.toDate()).toDateString() === today).length
                setUrgesToday(todayCount)

                // Format for Chart (Last 7 Days)
                const last7Days = Array.from({ length: 7 }, (_, i) => {
                    const d = new Date()
                    d.setDate(d.getDate() - (6 - i))
                    return d.toDateString() // "Mon Feb 16 2026"
                })

                const formattedChartData = last7Days.map(dateStr => {
                    const dayName = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' })
                    const count = urges.filter(u => new Date(u.createdAt.toDate()).toDateString() === dateStr).length
                    return { name: dayName, urges: count }
                })

                setChartData(formattedChartData)
                setChartData(formattedChartData)
                setWelcomeReady(true)

                // Check Time for Late Night Warning (> 23:00)
                const currentHour = new Date().getHours()
                if (currentHour >= 23 || currentHour < 5) {
                    setIsLateNight(true)
                }

            } catch (error) {
                console.error("Error fetching dashboard data:", error)
            }
        }

        if (user) {
            fetchData()
        }
    }, [user, loading, router])

    if (loading || !welcomeReady) {
        return <div className="p-8 text-slate-400">Loading dashboard...</div>
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 relative">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard</h2>
                    <p className="text-slate-400">
                        Track your progress and stay disciplined.
                    </p>
                </div>

                {/* EMERGENCY BUTTON (Desktop) */}
                <div className="w-full md:w-auto flex justify-center md:block hidden">
                    <Button
                        onClick={() => setShowSurvivalModal(true)}
                        className="w-full md:w-auto rounded-full bg-linear-to-r from-purple-600 to-blue-500 px-8 py-6 text-lg font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.03] hover:shadow-purple-500/40 transition-all duration-300"
                    >
                        <Zap className="mr-2 h-5 w-5 fill-white" />
                        I Feel an Urge
                    </Button>
                </div>
            </div>

            {/* Late Night Warning */}
            {isLateNight && (
                <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 flex items-center gap-4 text-red-200 animate-in fade-in slide-in-from-top-4">
                    <div className="p-2 bg-red-500/20 rounded-full">
                        <Moon className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-100">Late Night Risk</h4>
                        <p className="text-sm text-red-300/80 uppercase tracking-wide">Willpower is lowest now. Consider sleep.</p>
                    </div>
                </div>
            )}

            <UrgeSurvivalModal isOpen={showSurvivalModal} onClose={() => setShowSurvivalModal(false)} />
            <TodayUrgesDrawer isOpen={showUrgesDrawer} onClose={() => setShowUrgesDrawer(false)} />

            {/* Commitment Card (New) */}
            <div className="mb-8 animate-fade-up delay-100">
                <CommitmentCard />
                <TodaysFocusStrip />
            </div>

            {/* Row 1: Key Stats + Recovery State (New) */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade-up delay-200">
                <StatsCards
                    streak={streak}
                    urgesToday={urgesToday}
                    programDay={programDay}
                    hideUpgrade={true}
                    onUrgesClick={() => setShowUrgesDrawer(true)}
                    streakIntelligence={<StreakIntelligence streak={streak} />}
                />
                <RecoveryStateCard />
            </div>

            {/* Row 2: Charts & Action */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 animate-fade-up delay-300">
                <div className="col-span-1 lg:col-span-4 h-full">
                    <UrgeChart data={chartData} />
                </div>
                <div className="col-span-1 lg:col-span-3 h-full">
                    <DailyAction />
                </div>
            </div>

            {/* Row 3: New Intelligence (Clean Days | Risk Pattern) */}
            <div className="grid gap-6 md:grid-cols-2 animate-fade-up delay-400">
                <div className="min-h-[16rem] h-full">
                    <CleanDaysCard />
                </div>
                <div className="min-h-[16rem] h-full">
                    <RiskTimeCard onSurvivalStart={() => setShowSurvivalModal(true)} />
                </div>
            </div>

            {/* Row 4: Recovery Tools */}
            <div className="space-y-4 animate-fade-up delay-500">
                <h3 className="text-lg font-semibold text-white">Quick Tools</h3>
                <RecoveryTools />
            </div>

            {/* Row 5: Progress & Reflection */}
            <div className="grid gap-6 md:grid-cols-2 animate-fade-up delay-500">
                <div className="h-full">
                    <Milestones streak={streak} />
                </div>
                <div className="h-full">
                    <WeeklyReflection cleanCount={streak} />
                </div>
            </div>

            {/* Mobile Panic Button */}
            <PanicFloatingButton onClick={() => setShowSurvivalModal(true)} />
        </div>
    )
}
