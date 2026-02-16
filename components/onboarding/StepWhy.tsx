'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface StepProps {
    data: any;
    updateData: (data: any) => void;
    onSubmit: () => void;
    onBack: () => void;
    isSubmitting: boolean;
}

export function StepWhy({ data, updateData, onSubmit, onBack, isSubmitting }: StepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Your "Why"</h2>
                <p className="text-slate-400">When things get hard, what will you remember? Define your anchor.</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="whyQuit" className="text-slate-300">I am doing this because...</Label>
                <Textarea
                    id="whyQuit"
                    placeholder="e.g. I want to be present for my family. I want to reclaim my energy and confidence."
                    value={data.whyQuit || ''}
                    onChange={(e) => updateData({ ...data, whyQuit: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white min-h-[120px] resize-none"
                />
            </div>

            <div className="flex gap-3">
                <Button variant="ghost" onClick={onBack} className="w-1/3 text-slate-400">Back</Button>
                <Button
                    onClick={onSubmit}
                    disabled={!data.whyQuit || isSubmitting}
                    className="w-2/3 h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl"
                >
                    {isSubmitting ? 'Finalizing...' : 'Commit & Start'}
                </Button>
            </div>
        </motion.div>
    )
}
