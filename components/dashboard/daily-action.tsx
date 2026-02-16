'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Circle } from 'lucide-react'
import { useState } from 'react'

export function DailyAction() {
    const [completed, setCompleted] = useState(false)

    return (
        <Card className="glass-card bg-slate-900/40 border-slate-800">
            <CardHeader>
                <CardTitle className="text-slate-200">Today&apos;s Action: Environment Control</CardTitle>
                <CardDescription className="text-slate-400">Day 5 - 7-Day Reset Program</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-sm text-slate-300">
                        Identify 3 triggers in your immediate environment and remove or block them.
                        This could be apps, websites, or physical objects.
                    </p>
                    <button
                        onClick={() => setCompleted(!completed)}
                        className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        {completed ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                            <Circle className="h-6 w-6" />
                        )}
                        <span className={completed ? "line-through text-slate-500" : ""}>
                            Mark as Complete
                        </span>
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
