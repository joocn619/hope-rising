'use client'

import { motion } from 'framer-motion'
import { fadeInUpVariant, viewportConfig } from './animation-constants'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        q: "Is this completely anonymous?",
        a: "Yes. Your data is encrypted and private. We don't share your information with anyone.",
    },
    {
        q: "How does the 7-day reset work?",
        a: "It's a guided introduction to urge surfing and trigger identification. It's designed to give you a quick win.",
    },
    {
        q: "Can I cancel my Pro subscription?",
        a: "Anytime. No questions asked. You can do it directly from your settings.",
    },
    {
        q: "Is this a replacement for therapy?",
        a: "No. HopeRising is a self-help tool utilizing CBT principles. For severe addiction, please seek professional help.",
    },
    {
        q: "What methods do you use?",
        a: "We combine neuroscience education, habit replacement therapy, and cognitive behavioral tools.",
    },
]

export function FAQ() {
    return (
        <section className="py-24 bg-[#0f172a] border-t border-white/5">
            <div className="container mx-auto px-6 md:px-8 max-w-2xl">
                <motion.div
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                >
                    <h2 className="text-3xl font-semibold text-white mb-12 text-center">
                        Questions?
                    </h2>
                </motion.div>

                <motion.div
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-white/10 mb-4 px-4 bg-[#111827] rounded-xl">
                                <AccordionTrigger className="text-slate-200 hover:text-purple-400 hover:no-underline">{faq.q}</AccordionTrigger>
                                <AccordionContent className="text-slate-400">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    )
}
