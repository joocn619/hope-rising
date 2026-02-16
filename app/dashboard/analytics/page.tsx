import { AnalyticsDashboard } from '@/components/analytics/analytics-dashboard'

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Insights & Analytics</h2>
                <p className="text-muted-foreground">
                    Visualize your recovery patterns and identify triggers.
                </p>
            </div>

            <AnalyticsDashboard />
        </div>
    )
}
