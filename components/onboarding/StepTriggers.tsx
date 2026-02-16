'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface StepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

const triggers = [
    "Stress / Anxiety",
    "Boredom",
    "Loneliness",
    "Tiredness",
    "Social Media",
    "Morning Routine",
    "Late Night",
    "Rejection"
]

export function StepTriggers({ data, updateData, onNext, onBack }: StepProps) {
    const selected = data.mainTriggers || [];

    const toggleTrigger = (trigger: string) => {
        if (selected.includes(trigger)) {
            updateData({ ...data, mainTriggers: selected.filter((t: string) => t !== trigger) })
        } else {
            if (selected.length < 3) {
                updateData({ ...data, mainTriggers: [...selected, trigger] })
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Identify Triggers</h2>
                <p className="text-slate-400">Select up to 3 primary triggers you want to master.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {triggers.map((trigger) => (
                    <button
                        key={trigger}
                        onClick={() => toggleTrigger(trigger)}
                        className={`p-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${selected.includes(trigger)
                                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                                : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600'
                            }`}
                    >
                        {trigger}
                        {selected.includes(trigger) && <Check className="h-4 w-4" />}
                    </button>
                ))}
            </div>

            <div className="flex gap-3">
                <Button variant="ghost" onClick={onBack} className="w-1/3 text-slate-400">Back</Button>
                <Button
                    onClick={onNext}
                    disabled={selected.length === 0}
                    className="w-2/3 h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl"
                >
                    Continue
                </Button>
            </div>
        </motion.div>
    )
}
