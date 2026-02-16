'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

interface UrgeChartProps {
    data: { name: string; urges: number }[];
}

export function UrgeChart({ data }: UrgeChartProps) {
    // If no data, show empty state or fallback (could be handled in parent too)
    const chartData = data && data.length > 0 ? data : [
        { name: 'Mon', urges: 0 },
        { name: 'Tue', urges: 0 },
        { name: 'Wed', urges: 0 },
        { name: 'Thu', urges: 0 },
        { name: 'Fri', urges: 0 },
        { name: 'Sat', urges: 0 },
        { name: 'Sun', urges: 0 },
    ];

    return (
        <Card className="glass-card bg-slate-900/40 border-slate-800">
            <CardHeader>
                <CardTitle className="text-slate-200">Weekly Urge Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Bar
                            dataKey="urges"
                            fill="currentColor"
                            radius={[4, 4, 0, 0]}
                            className="fill-indigo-500"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
