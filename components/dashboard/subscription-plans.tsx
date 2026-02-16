'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/providers/auth-provider'
import { Badge } from '@/components/ui/badge'

const plans = [
    {
        name: 'Free',
        price: '0',
        description: 'Essential tools for early recovery.',
        features: [
            '7-Day Reset Program',
            'Basic Urge Tracking',
            'Daily Journaling',
            'Community Support',
        ],
        current: true,
    },
    {
        name: 'Pro',
        price: '19',
        description: 'Accelerate your transformation.',
        features: [
            '30-Day Transformation Program',
            'Advanced Analytics & Insights',
            'AI Recovery Coach (Coming Soon)',
            'Priority Support',
            'Exclusive Workshops',
        ],
        current: false,
        popular: true,
    },
]

export function SubscriptionPlans() {
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleUpgrade = async () => {
        setIsLoading(true)
        // Simulate API call to Stripe
        setTimeout(() => {
            setIsLoading(false)
            alert("Stripe Checkout would open here. Integration required.")
        }, 1500)
    }

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {plans.map((plan) => (
                <Card
                    key={plan.name}
                    className={`relative flex flex-col glass-card border-slate-800 ${plan.popular ? 'border-indigo-500/50 shadow-lg shadow-indigo-900/20' : 'bg-slate-900/40'}`}
                >
                    {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                            <Badge className="bg-indigo-500 hover:bg-indigo-600 border-0 px-4 py-1">Most Popular</Badge>
                        </div>
                    )}

                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="text-xl font-bold text-white">{plan.name}</span>
                            {plan.current && <Badge variant="outline" className="border-indigo-500 text-indigo-400">Current Plan</Badge>}
                        </CardTitle>
                        <div className="mt-2">
                            <span className="text-4xl font-bold text-white">${plan.price}</span>
                            <span className="text-slate-400 ml-1">/month</span>
                        </div>
                        <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start">
                                    <Check className="h-5 w-5 text-indigo-500 mr-2 shrink-0" />
                                    <span className="text-slate-300 text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className={`w-full ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-slate-800 hover:bg-slate-700'}`}
                            disabled={plan.current || isLoading}
                            onClick={plan.current ? undefined : handleUpgrade}
                        >
                            {isLoading && !plan.current ? 'Processing...' : plan.current ? 'Active Plan' : 'Upgrade to Pro'}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
