'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useTranslations } from '@/contexts/LocaleContext'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import LogoAventurei from '@/components/Logo'

export default function LoginPage() {
    const t = useTranslations()
    const router = useRouter()
    const { lang } = useParams()
    const searchParams = useSearchParams()
    const next = searchParams.get('next')
    const supabase = createClient()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                        },
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                toast.success(t.signup_success)
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                toast.success(t.login_success)
                router.push(next || `/${lang}/dashboard`)
                router.refresh()
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            })
            if (error) throw error
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-[#012822]">
            <Toaster position="top-center" />

            <div className="flex min-h-screen">
                {/* Left — Hero visual */}
                <div className="relative hidden w-[60%] lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=1600&fit=crop"
                        alt="Montanha"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#00382F]/40" />
                    <div className="absolute bottom-12 left-12 right-12 text-white">
                        <h2 className="mb-3 text-3xl font-bold leading-tight">
                            {t.discover_adventures} <br />
                            <span className="text-gold">{t.unforgettable}</span>
                        </h2>
                        <p className="text-sm text-white/70">
                            {t.login_hero_subtitle}
                        </p>
                    </div>
                </div>

                {/* Right — Form */}
                <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-[#012822]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-sm space-y-8"
                    >
                        {/* Logo */}
                        <div className="flex flex-col items-center gap-6">
                            <Link href="/">
                                <LogoAventurei size={70} variant='white' />
                            </Link>

                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-white">
                                    {isSignUp ? t.create_account : t.welcome}
                                </h1>
                                <p className="mt-2 text-sm text-white/60">
                                    {isSignUp ? t.signup_subtitle : t.login_subtitle}
                                </p>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={handleAuth}>
                            {isSignUp && (
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-white/50 ml-1">
                                        {t.full_name}
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder={t.name_placeholder}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:ring-gold/50 h-12 rounded-xl"
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-white/50 ml-1">
                                    {t.email}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                                    <Input
                                        type="email"
                                        placeholder={t.email_placeholder}
                                        className="pl-11 bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:ring-gold/50 h-12 rounded-xl"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-white/50">
                                        {t.password}
                                    </label>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="pl-11 pr-12 bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:ring-gold/50 h-12 rounded-xl"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <button type="button" className="text-xs text-white/70 font-medium text-gold hover:underline">
                                    {t.forgot_password}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-primary font-bold py-3.5 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 mt-6 shadow-xl shadow-black/10 cursor-pointer"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        {isSignUp ? t.sign_up : t.sign_in}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/5" />
                            </div>
                            <div className="relative z-10 flex justify-center text-xs uppercase">
                                <span className="bg-[#012822] px-4 text-white/40 font-bold tracking-widest">{t.or_continue_with}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all cursor-pointer"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                    fill="#FFF"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#FFF"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FFF"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#FFF"
                                />
                            </svg>
                            Google
                        </button>

                        <p className="text-center text-sm text-white/50">
                            {isSignUp ? t.have_account : t.no_account_yet}{" "}
                            <button
                                type="button"
                                className="font-bold text-gold hover:underline cursor-pointer"
                                onClick={() => setIsSignUp(!isSignUp)}
                            >
                                {isSignUp ? t.sign_in : t.sign_up}
                            </button>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}