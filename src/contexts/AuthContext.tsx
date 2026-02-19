'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { UserType } from '@/types/User'

type AuthContextType = {
    user: UserType | null
    session: Session | null
    isLoading: boolean
    signOut: () => Promise<void>
    signIn: (credentials: any) => Promise<any>
    signUp: (credentials: any) => Promise<any>
    signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    isLoading: true,
    signOut: async () => { },
    signIn: async () => { },
    signUp: async () => { },
    signInWithGoogle: async () => { },
})

const supabase = createClient()

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()

                if (!mounted || fetchId !== currentFetchId) return

                if (error) {
                    if (error.code === 'PGRST116') {
                        console.log('Profile not found in users table, using auth metadata fallback')
                    } else {
                        console.error('Error fetching user profile from "users" table:', error)
                    }

                    // Fallback to auth metadata for any error to allow dashboard to load
                    setUser({
                        ...session.user.user_metadata,
                        id: session.user.id,
                        email: session.user.email,
                        name: session.user.user_metadata.full_name || session.user.user_metadata.name,
                    } as UserType)
                } else {
                    console.log('Successfully fetched profile from "users":', data);
                    // Merge auth metadata with table data to ensure all fields are present
                    const mergedUser = {
                        ...session.user.user_metadata,
                        ...data,
                        id: session.user.id,
                        email: session.user.email,
                        name: data.name || session.user.user_metadata.full_name || session.user.user_metadata.name,
                    } as UserType;
                    console.log('Merged User State:', mergedUser);
                    setUser(mergedUser);
                }
            } catch (error: any) {
                console.error('Catch block in fetchProfile:', error);
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted')
                } else {
                    console.error('Unexpected error fetching profile:', error)
                }
            } finally {
                if (mounted && fetchId === currentFetchId) setIsLoading(false)
            }
        }

        // Handle initial session
        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (!mounted) return
            if (error) {
                console.error('Error getting session:', error)
                setIsLoading(false)
                return
            }
            setSession(session)
            if (session) {
                fetchProfile(session)
            } else {
                setIsLoading(false)
            }
        }).catch(err => {
            if (mounted) setIsLoading(false)
        })

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
            subscription.unsubscribe()
        }
    }, [router])

    const signOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    const signIn = async ({ email, password }: any) => {
        const result = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return result
    }

    const signUp = async ({ email, password, name, phone }: any) => {
        const result = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    phone: phone,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        return result
    }

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
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
