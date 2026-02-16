'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

// Mock data (replace with real Firestore data later)
const data = [
    { day: 'Mon', intensity: 8 },
    { day: 'Tue', intensity: 5 },
    { day: 'Wed', intensity: 6 },
    { day: 'Thu', intensity: 3 },
    { day: 'Fri', intensity: 2 },
    { day: 'Sat', intensity: 7 },
    { day: 'Sun', intensity: 4 },
]

export function WeeklySparkline() {
    const lastValue = data[data.length - 1].intensity
    const prevValue = data[data.length - 2].intensity
    const trend = lastValue < prevValue ? 'down' : lastValue > prevValue ? 'up' : 'neutral'

    return (
        <Card className="glass-card bg-slate-900/40 border-slate-800">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Weekly Urge Intensity</CardTitle>
                <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-white">{lastValue}/10</span>
                    <span className={`text-xs font-medium flex items-center ${trend === 'down' ? 'text-green-500' : trend === 'up' ? 'text-red-500' : 'text-slate-500'
                        }`}>
                        {trend === 'down' && <ArrowDown className="h-3 w-3 mr-1" />}
                        {trend === 'up' && <ArrowUp className="h-3 w-3 mr-1" />}
                        {trend === 'neutral' && <Minus className="h-3 w-3 mr-1" />}
                        {trend === 'down' ? 'Improving' : trend === 'up' ? 'Spike detected' : 'Stable'}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[80px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Line
                                type="monotone"
                                dataKey="intensity"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#8b5cf6' }}
                                cursor={{ stroke: '#ffffff20' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
