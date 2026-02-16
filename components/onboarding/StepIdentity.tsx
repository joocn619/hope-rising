'use client'

import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface StepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
}

export function StepIdentity({ data, updateData, onNext }: StepProps) {
    const isValid = data.displayName?.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Let's start with you.</h2>
                <p className="text-slate-400">This is a safe space. Your identity is private.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-slate-300">What should we call you?</Label>
                    <Input
                        id="displayName"
                        placeholder="e.g. Alex (or a pseudonym)"
                        value={data.displayName || ''}
                        onChange={(e) => updateData({ ...data, displayName: e.target.value })}
                        className="bg-slate-900/50 border-slate-700 text-white h-12"
                    />
                </div>
            </div>

            <Button
                onClick={onNext}
                disabled={!isValid}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all"
            >
                Continue
            </Button>
        </motion.div>
    )
}
