'use client'

import { Layout } from '@/components/Layout/Layout'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslations } from '@/contexts/LocaleContext'
import { motion } from 'framer-motion'
import {
    LogOut, User as UserIcon, ShieldCheck, Eye,
    Mountain, Star, TrendingUp, Users, Plus,
    MapPin, Calendar, Clock, Loader2,
    Pencil,
    Trash2
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Avatar from '@/components/Avatar'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Modality, PlaceType } from '@/types/Place'
import { ModalityTag } from '@/components/ModalityTag'
import Image from 'next/image'

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white rounded-2xl shadow-sm ${className}`}>
        {children}
    </div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
)

export default function DashboardPage() {
    const { user, signOut } = useAuth()
    const { lang } = useParams()
    const t = useTranslations()
    const [places, setPlaces] = useState<PlaceType[]>([])
    const [isLoadingPlaces, setIsLoadingPlaces] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchPlaces() {
            try {
                const { data, error } = await supabase
                    .from('places')
                    .select('*')
                    .order('created_at', { ascending: false })

                if (error) throw error
                setPlaces(data || [])
            } catch (error) {
                console.error('Error fetching places:', error)
            } finally {
                setIsLoadingPlaces(false)
            }
        }

        fetchPlaces()
    }, [supabase])

    if (!user) return null

    const stats = [
        { label: t.stat_adventures, value: places?.length || 0, icon: Mountain, color: "text-primary" },
        { label: t.stat_reviews, value: user.reviewCount || 0, icon: Star, color: "text-gold" },
        { label: t.stat_average_rating, value: user.rating?.toFixed(1) || "0.0", icon: TrendingUp, color: "text-emerald-500" },
        { label: t.stat_modalities, value: user.modalities?.length || 0, icon: Users, color: "text-blue-500" },
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-background">
                {/* Header Section */}
                <div className="bg-primary/50 border-b border-border px-[5%] mt-[-8vh] pt-[10vh]">
                    <div className="container mx-auto py-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar src={user.avatar} name={user.name} />
                                <div>
                                    <h1 className="text-2xl font-bold text-foreground">
                                        {t.welcome_user}{user.name || 'Aventureiro'}
                                    </h1>
                                    <p className="text-muted-foreground text-sm">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href={`/${lang}/${user.id}`} target='_blank'>
                                    <Button onClick={() => { }}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        {t.view_public_profile}
                                    </Button>
                                </Link>
                                <Button onClick={() => signOut()} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    <LogOut className="h-4 w-4 mr-2" />
                                    {t.logout}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto px-[5%] py-12">
                    {/* Stats Grid */}
                    <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {stats.map((stat) => (
                            <Card key={stat.label}>
                                <CardContent className="flex items-center gap-4 p-5">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Activities/Places Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-foreground">{t.my_adventures}</h2>
                            <Button onClick={() => { }} className="bg-primary text-white">
                                <Plus className="h-4 w-4 mr-2" />
                                {t.new_adventure}
                            </Button>
                        </div>

                        {isLoadingPlaces ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) :
                            places.length === 0 ? (
                                <Card className="p-12 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="bg-primary/10 p-4 rounded-full">
                                            <Mountain className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground">{t.no_adventures_message}</h3>
                                        <p className="text-sm text-muted-foreground">{t.create_first_adventure}</p>
                                        <Button onClick={() => { }} className="bg-primary text-white">
                                            <Plus className="h-4 w-4 mr-2" />
                                            {t.new_adventure}
                                        </Button>
                                    </div>
                                </Card>
                            ) : places.map((adv, index) => (
                                <motion.div
                                    key={adv.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Card className="overflow-hidden">
                                        <div className="flex flex-col sm:flex-row sm:h-48">
                                            <div className="relative aspect-square h-48 w-full sm:w-48 shrink-0 overflow-hidden">
                                                {adv.cover_img ? (
                                                    <Image
                                                        src={adv.cover_img}
                                                        alt={adv.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full bg-primary/10 animate-pulse flex items-center justify-center">
                                                        <Mountain className="h-8 w-8 text-primary/20" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-between flex-1 px-5 py-5">
                                                <div>
                                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                                        <h3 className="text-lg font-bold text-foreground">{adv.title}</h3>
                                                    </div>
                                                    <p className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                                                        <MapPin className="h-3.5 w-3.5" />
                                                        {adv.city}, {adv.UF}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3.5 w-3.5" />
                                                            3-5 {t.days}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Users className="h-3.5 w-3.5" />
                                                            {adv.min_age}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex gap-2">
                                                    <Link href={`/${lang}/${user.id}/${adv.id}`}>
                                                        <Button className="gap-1.5" onClick={() => { }}>
                                                            <Eye className="h-3.5 w-3.5" />
                                                            {t.view}
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        className="gap-1.5"
                                                        onClick={() => { }}
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                        {t.edit}
                                                    </Button>
                                                    <Button className="gap-1.5 bg-red-500 border border-red-500 hover:bg-red-500/50 hover:text-white" onClick={() => { }}>
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                        {t.delete}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
