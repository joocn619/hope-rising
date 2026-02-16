'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

interface AuthFormProps {
    view: 'login' | 'signup'
}

export function AuthForm({ view }: AuthFormProps) {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            if (view === 'signup') {
                await createUserWithEmailAndPassword(auth, email, password)
                router.push('/dashboard')
            } else {
                await signInWithEmailAndPassword(auth, email, password)
                router.push('/dashboard')
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An authentication error occurred')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={view === 'login' ? '' : ''}>
            <Card className="glass-card w-full max-w-md border-white/10 bg-slate-900/50 text-slate-100">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400">
                        {view === 'login' ? 'Welcome Back' : 'Start Your Journey'}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        {view === 'login'
                            ? 'Enter your credentials to access your dashboard'
                            : 'Create an account to begin your recovery'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-slate-950/50 border-slate-800 focus:border-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-slate-950/50 border-slate-800 focus:border-indigo-500"
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button
                            type="submit"
                            className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {view === 'login' ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-slate-400">
                        {view === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <a href={view === 'login' ? '/signup' : '/login'} className="text-indigo-400 hover:text-indigo-300 hover:underline">
                            {view === 'login' ? 'Sign Up' : 'Log In'}
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
