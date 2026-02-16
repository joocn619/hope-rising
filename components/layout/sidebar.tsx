'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    BrainCircuit,
    Flame,
    BookOpen,
    BarChart,
    Settings,
    LogOut,
    ShieldAlert
} from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'

const sidebarItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Program',
        href: '/dashboard/program',
        icon: BrainCircuit,
    },
    {
        title: 'Urge Log',
        href: '/dashboard/urge-log',
        icon: Flame,
    },
    {
        title: 'Journal',
        href: '/dashboard/journal',
        icon: BookOpen,
    },
    {
        title: 'Analytics',
        href: '/dashboard/analytics',
        icon: BarChart,
    },
    {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
    },
    {
        title: 'Subscription',
        href: '/dashboard/subscription',
        icon: ShieldAlert,
    },
]

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname()
    const { signOut } = useAuth()

    return (
        <div className={cn("flex h-screen flex-col justify-between border-r border-slate-800 bg-slate-900/50 p-4 backdrop-blur-xl", className)}>
            <div className="space-y-4">
                <div className="flex items-center px-2 py-4">
                    <ShieldAlert className="mr-2 h-6 w-6 text-indigo-500" />
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400">
                        HopeRising
                    </h1>
                </div>
                <nav className="space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-slate-800 text-indigo-400"
                                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                            )}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="px-2">
                <Button
                    variant="ghost"
                    onClick={() => signOut()}
                    className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-900/10"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </Button>
            </div>
        </div>
    )
}
