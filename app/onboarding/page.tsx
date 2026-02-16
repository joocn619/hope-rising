'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'
import { createUserProfile } from '@/lib/firebase/firestore'
import { StepIdentity } from '@/components/onboarding/StepIdentity'
import { StepAssessment } from '@/components/onboarding/StepAssessment'
import { StepTriggers } from '@/components/onboarding/StepTriggers'
import { StepWhy } from '@/components/onboarding/StepWhy'
import { ShieldAlert } from 'lucide-react'

export default function OnboardingPage() {
    const { user } = useAuth()
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        displayName: '',
        frequencyLevel: 'daily',
        mainTriggers: [] as string[],
        whyQuit: ''
    })

    const updateData = (newData: any) => {
        setFormData(prev => ({ ...prev, ...newData }))
    }

    const handleNext = () => setStep(prev => prev + 1)
    const handleBack = () => setStep(prev => prev - 1)

    const handleSubmit = async () => {
        if (!user) return

        setIsSubmitting(true)
        try {
            await createUserProfile(user.uid, user.email || '', {
                displayName: formData.displayName,
                frequencyLevel: formData.frequencyLevel as any,
                mainTriggers: formData.mainTriggers,
                whyQuit: formData.whyQuit
            })
            router.push('/dashboard')
        } catch (error) {
            console.error("Onboarding failed:", error)
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px]" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Brand */}
                <div className="flex justify-center mb-8">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <ShieldAlert className="h-6 w-6 text-white" />
                    </div>
                </div>

                {/* Step Indicator */}
                <div className="flex gap-2 mb-8 justify-center">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={`h-1 w-12 rounded-full transition-colors duration-300 ${i <= step ? 'bg-indigo-500' : 'bg-slate-800'
                                }`}
                        />
                    ))}
                </div>

                {/* Form Container */}
                <div className="bg-[#1E293B]/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-xl">
                    {step === 1 && (
                        <StepIdentity
                            data={formData}
                            updateData={updateData}
                            onNext={handleNext}
                        />
                    )}
                    {step === 2 && (
                        <StepAssessment
                            data={formData}
                            updateData={updateData}
                            onNext={handleNext}
                            onBack={handleBack}
                        />
                    )}
                    {step === 3 && (
                        <StepTriggers
                            data={formData}
                            updateData={updateData}
                            onNext={handleNext}
                            onBack={handleBack}
                        />
                    )}
                    {step === 4 && (
                        <StepWhy
                            data={formData}
                            updateData={updateData}
                            onSubmit={handleSubmit}
                            onBack={handleBack}
                            isSubmitting={isSubmitting}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
