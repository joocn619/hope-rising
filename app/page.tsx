import { LandingHeader } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'
import { Problem } from '@/components/landing/problem'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { DailyProtocol } from '@/components/landing/daily-protocol'
import { FreeFeatures } from '@/components/landing/FreeFeatures'
import { ProPreview } from '@/components/landing/ProPreview'
import { Screenshots } from '@/components/landing/Screenshots'
import { Roadmap } from '@/components/landing/Roadmap'
import { Pricing } from '@/components/landing/pricing'
import { FAQ } from '@/components/landing/faq'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-purple-500/30">
      <LandingHeader />

      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <DailyProtocol />
        <FreeFeatures />
        <ProPreview />
        <Screenshots />
        <Roadmap />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
