'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface StepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

const frequencies = [
    { value: 'daily', label: 'Daily', desc: 'I struggle with this every day.' },
    { value: 'weekly', label: 'Weekly', desc: 'It happens a few times a week.' },
    { value: 'monthly', label: 'Monthly', desc: 'Every now and then.' },
    { value: 'rarely', label: 'Rarely', desc: 'I just want to be prevention-focused.' },
]

export function StepAssessment({ data, updateData, onNext, onBack }: StepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Current Baseline</h2>
                <p className="text-slate-400">Be honest. This sets your initial difficulty level.</p>
            </div>

            <div className="grid gap-3">
                {frequencies.map((freq) => (
                    <button
                        key={freq.value}
                        onClick={() => {
                            updateData({ ...data, frequencyLevel: freq.value })
                        }}
                        className={`p-4 rounded-xl border text-left transition-all ${data.frequencyLevel === freq.value
                                ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/20'
                                : 'bg-slate-900/50 border-slate-700 hover:border-slate-500 ring-0'
                            }`}
                    >
                        <div className={`font-semibold ${data.frequencyLevel === freq.value ? 'text-indigo-300' : 'text-white'}`}>
                            {freq.label}
                        </div>
                        <div className="text-sm text-slate-400">{freq.desc}</div>
                    </button>
                ))}
            </div>

            <div className="flex gap-3">
                <Button variant="ghost" onClick={onBack} className="w-1/3 text-slate-400">Back</Button>
                <Button
                    onClick={onNext}
                    className="w-2/3 h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl"
                >
                    Continue
                </Button>
            </div>
        </motion.div>
    )
}
