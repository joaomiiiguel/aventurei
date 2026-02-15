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
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    isLoading: true,
    signOut: async () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const setData = async () => {
            const { data: { session }, error } = await supabase.auth.getSession()
            if (error) {
                console.error('Error getting session:', error)
            }
            setSession(session)
            if (session?.user) {
                setUser({
                    ...session.user.user_metadata,
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata.full_name || session.user.user_metadata.name,
                } as UserType)
            } else {
                setUser(null)
            }
            setIsLoading(false)
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session?.user) {
                setUser({
                    ...session.user.user_metadata,
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata.full_name || session.user.user_metadata.name,
                } as UserType)
            } else {
                setUser(null)
            }
            setIsLoading(false)
            router.refresh()
        })

        setData()

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase, router])

    const signOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
