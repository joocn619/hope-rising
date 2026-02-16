'use client'

import { SubscriptionPlans } from '@/components/dashboard/subscription-plans'

export default function SubscriptionPage() {
    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-4">Invest in Your Freedom</h1>
                <p className="text-slate-400 text-lg">
                    Upgrade to HopeRising Pro to unlock the 30-Day Transformation Program, advanced analytics, and AI coaching.
                </p>
            </div>

            <SubscriptionPlans />

            <div className="max-w-3xl mx-auto text-center pt-8 border-t border-slate-800/50">
                <p className="text-sm text-slate-500">
                    Secure payment via Stripe. Cancel anytime. <br />
                    Need help? Contact support@hoperising.com
                </p>
            </div>
        </div>
    )
}
