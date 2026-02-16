'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { useAuth } from '@/components/providers/auth-provider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

import { MobileSidebar } from '@/components/layout/mobile-sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-200">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!user) {
        return null // Will redirect
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 md:block border-r border-slate-800">
                <Sidebar />
            </aside>

            <div className="flex flex-col flex-1 h-full overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl z-20 sticky top-0">
                    <div className="flex items-center gap-2">
                        <MobileSidebar />
                        <span className="font-bold text-lg text-white">HopeRising</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    {children}
                </main>
            </div>
        </div>
    )
}
