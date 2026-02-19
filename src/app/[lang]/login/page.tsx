'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslations } from '@/contexts/LocaleContext'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import LogoAventurei from '@/components/Logo'
import PhoneInput from '@/components/ui/inputPhone'

export default function LoginPage() {
    const t = useTranslations()
    const router = useRouter()
    const { lang } = useParams()
    const searchParams = useSearchParams()
    const next = searchParams.get('next')
    const { signIn, signUp, signInWithGoogle } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await signIn({ email, password })
            if (error) throw error
            toast.success(t.login_success)
            router.push(next || `/${lang}/dashboard`)
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-[#012822]">
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
                                <LogoAventurei size={60} variant='white' />
                            </Link>

                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-white">
                                    {t.welcome}
                                </h1>
                                <p className="mt-2 text-sm text-white/60">
                                    {t.login_subtitle}
                                </p>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={handleAuth}>
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
                                        {t.sign_in}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-center text-sm text-white/50">
                            {t.no_account_yet}{" "}
                            <button
                                type="button"
                                className="font-bold text-gold hover:underline cursor-pointer"
                                onClick={() => router.push(`/${lang}/se-un-guia`)}
                            >
                                {t.be_a_guide}
                            </button>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}