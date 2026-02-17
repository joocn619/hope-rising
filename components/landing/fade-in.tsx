'use client'

import { motion } from 'framer-motion'

import { useMobile } from '@/hooks/use-mobile'

export function FadeIn({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
    const isMobile = useMobile()

    // Mobile: reduce delay, faster duration, smaller Y offset
    const transition = isMobile
        ? { duration: 0.4, delay: 0, ease: [0.25, 0.1, 0.25, 1.0] as const }
        : { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1.0] as const }

    const initial = isMobile
        ? { opacity: 0, y: 10 }
        : { opacity: 0, y: 20 }

    return (
        <motion.div
            initial={initial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
            transition={transition}
            className={className}
        >
            {children}
        </motion.div>
    )
}
