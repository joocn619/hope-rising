import { Variants } from "framer-motion"

export const fadeInUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] // Custom smooth ease
        }
    }
}

export const staggerContainerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

export const cardHoverVariant: Variants = {
    hover: {
        scale: 1, // Prevent scaling to stop text/border jitter
        y: -8, // Increased lift for clear feedback
        boxShadow: "0 20px 40px -15px rgba(124, 58, 237, 0.2)", // Stronger, softer glow
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
}

export const buttonClickVariant: Variants = {
    hover: {
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: {
        scale: 0.98,
        transition: { duration: 0.1, ease: "easeOut" }
    }
}

export const floatingVariant: Variants = {
    initial: { y: 0, rotate: 0 },
    animate: (i: number = 0) => ({
        y: [0, -15, 0],
        rotate: [0, 1, -1, 0], // Subtle rotation for organic "drift"
        transition: {
            duration: 6, // Slower for elegance
            delay: i * 0.5, // Stagger based on index
            repeat: Infinity,
            repeatType: "reverse", // Smoother turnaround
            ease: "easeInOut"
        }
    })
}

export const viewportConfig = {
    once: true as const,
    amount: 0.2,
    margin: "-50px"
}

// Mobile Variants (Reduced Motion)
export const fadeInUpMobile: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1.0] as const
        }
    }
}

export const staggerContainerMobile: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0, // No stagger
            delayChildren: 0
        }
    }
}
