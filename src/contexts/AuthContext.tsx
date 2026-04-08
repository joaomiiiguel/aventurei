'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSupabaseClient } from '@/utils/supabase/client'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { UserType } from '@/types/User'

type AuthContextType = {
    user: UserType | null
    session: Session | null
    isLoading: boolean
    signOut: () => Promise<void>
    signIn: (credentials: { email: string, password: string }) => Promise<any>
    signUp: (credentials: { email: string, password: string, name: string, phone: string, city?: string, activity?: string, next?: string }) => Promise<any>
    signInWithGoogle: (next?: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    isLoading: true,
    signOut: async () => { },
    signIn: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    signInWithGoogle: async (next?: string) => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const supabase = useSupabaseClient()
    const [user, setUser] = useState<UserType | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        let mounted = true
        let currentFetchId = 0

        const fetchProfile = async (session: Session) => {
            const fetchId = ++currentFetchId
            try {
                const response = await fetch('/api/auth/me')
                const data = await response.json()
                if (!mounted || fetchId !== currentFetchId) return
                if (data.user) {
                    setUser(data.user)
                }
            } catch (error) {
                console.error('Error fetching profile via API:', error)
            } finally {
                if (mounted && fetchId === currentFetchId) setIsLoading(false)
            }
        }

        // Handle initial session via API route for SSR consistency
        const initAuth = async () => {
            try {
                const response = await fetch('/api/auth/me')
                const data = await response.json()
                if (mounted) {
                    setSession(data.session)
                    setUser(data.user)
                }
            } catch (error) {
                console.error('Error in initAuth:', error)
            } finally {
                if (mounted) setIsLoading(false)
            }
        }

        initAuth()

        // Listen for changes
        const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!mounted) return
            setSession(session)
            if (session) {
                await fetchProfile(session)
            } else {
                setUser(null)
                setIsLoading(false)
            }

            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
                router.refresh()
            }
        })

        return () => {
            mounted = false
            subscription.subscription.unsubscribe()
        }
    }, [router, supabase])

    const signOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
        router.push(`/`)
    }

    const signIn = async ({ email, password }: any) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        const result = await response.json()

        // If successful, we need to refresh the session on the client
        if (response.ok) {
            await supabase.auth.getSession()
            router.refresh()
        }

        return result
    }

    const signUp = async ({ email, password, name, phone, city, activity, next = '/' }: any) => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, phone, city, activity, next }),
        })
        const result = await response.json()
        return result
    }

    const signInWithGoogle = async (next: string = '/') => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`,
            },
        })
    }

    return (
        <AuthContext.Provider value={{
            user,
            session,
            isLoading,
            signOut,
            signIn,
            signUp,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
