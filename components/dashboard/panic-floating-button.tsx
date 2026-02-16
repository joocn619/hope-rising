'use client'

import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

interface PanicFloatingButtonProps {
    onClick: () => void
}

export function PanicFloatingButton({ onClick }: PanicFloatingButtonProps) {
    return (
        <Button
            onClick={onClick}
            className="fixed bottom-6 right-6 lg:hidden z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-[0_0_20px_rgba(124,58,237,0.5)] animate-pulse hover:animate-none hover:scale-110 transition-transform duration-300 p-0 flex items-center justify-center border border-white/20"
            aria-label="I Feel an Urge"
        >
            <Zap className="h-7 w-7 text-white fill-white" />
        </Button>
    )
}
