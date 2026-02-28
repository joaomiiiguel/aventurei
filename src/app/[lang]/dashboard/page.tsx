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
    Trash2,
    Award,
    Camera
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Avatar from '@/components/Avatar'
import { useEffect, useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSupabaseClient } from '@/utils/supabase/client'
import { Modality, PlaceType, modalityLabels } from '@/types/Place'
import Image from 'next/image'
import { UserType } from '@/types/User'
import { ProfileEditView } from '@/components/Views/ProfileEditView'
import Modal from '@/components/Modal'
import AdventureEditView from '@/components/Views/AdventureEditView'
import { MockDataService } from '@/data/mockData'
import { OnboardingFlow } from '@/components/Views/OnboardingFlow'

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
    const { user, signOut, isLoading } = useAuth()
    const { lang } = useParams()
    const router = useRouter()
    const t = useTranslations()
    const [places, setPlaces] = useState<PlaceType[]>([])
    const [isLoadingPlaces, setIsLoadingPlaces] = useState(true)
    const supabase = useSupabaseClient()
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
    const [isEditPlaceOpen, setIsEditPlaceOpen] = useState(false)
    const [editingPlace, setEditingPlace] = useState<PlaceType | null>(null);

    useEffect(() => {
        async function fetchPlaces() {
            if (user?.email === 'test@mail.com') {
                const mockPlaces = await MockDataService.getAllAdventures()
                setPlaces(mockPlaces)
                setIsLoadingPlaces(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from('places')
                    .select('*')
                    .eq('user_id', user?.id)
                    .order('created_at', { ascending: false })

                if (error) throw error
                setPlaces(data || [])
            } catch (error) {
                console.error('Error fetching places:', error)
            } finally {
                setIsLoadingPlaces(false)
            }
        }

        if (user?.id) {
            fetchPlaces()
        } else if (!isLoading) {
            setIsLoadingPlaces(false)
        }
    }, [supabase, user?.id, user?.email, isLoading])

    if (isLoading || isLoadingPlaces) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">{t.loading}</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-xl font-bold mb-4">{t.unauthorized_access}</h1>
                    <Link href={`/${lang}/login`} className="text-primary hover:underline">
                        {t.go_to_login}
                    </Link>
                </div>
            </div>
        )
    }

    const isTestUser = user?.email === 'teste@mail.com';

    const stats = [
        { label: t.stat_adventures, value: places?.length || 0, icon: Mountain, color: "text-primary" },
        { label: t.stat_reviews, value: isTestUser ? 145 : (user.reviewCount || 0), icon: Star, color: "text-gold" },
        { label: t.stat_average_rating, value: isTestUser ? "4.9" : (user.rating?.toFixed(1) || "0.0"), icon: TrendingUp, color: "text-emerald-500" },
        { label: t.stat_modalities, value: isTestUser ? 3 : (user.modalities?.length || 0), icon: Users, color: "text-blue-500" },
    ];

    const openNewAdventure = () => {
        setEditingPlace(null);
        setIsEditPlaceOpen(true);
    };

    const openEditAdventure = (adv: PlaceType) => {
        setEditingPlace(adv);
        setIsEditPlaceOpen(true);
    };

    return (
        <Layout>
            {!user.onboarded && (
                <OnboardingFlow />
            )}
            <div className="min-h-screen bg-background">
                {/* Header Section */}
                <div className="relative overflow-hidden bg-primary/60 px-[5%] mt-[-8vh] pt-[16vh] pb-8">
                    {/* Background Banner Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={user.banner || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070"}
                            alt={t.dashboard_banner_alt}
                            fill
                            className="object-cover opacity-20 grayscale-[20%]"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
                    </div>

                    <div className="container mx-auto relative z-10">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar src={user.avatar} name={user.name} />
                                    {/* Subdued badge for quality score or status could go here */}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-1">
                                        {t.welcome_user}
                                    </p>
                                    <h1 className="text-3xl font-bold text-white">
                                        {user.name || t.default_user_name}
                                    </h1>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href={`/${lang}/${user.nickname}`} target='_blank'>
                                    <Button onClick={() => { }}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        {t.view_public_profile}
                                    </Button>
                                </Link>
                                <Button onClick={() => setIsEditProfileOpen(true)} className="text-primary hover:bg-muted transition-colors">
                                    <Pencil className="h-4 w-4 mr-2" />
                                    {t.edit_profile}
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
                            <Button onClick={() => openNewAdventure()} className="bg-primary text-white">
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
                                        <Button onClick={() => openNewAdventure()} className="bg-primary text-white">
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
                                                        onClick={() => openEditAdventure(adv)}
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
            <Modal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} title={t.edit_profile}>
                <ProfileEditView onClose={() => setIsEditProfileOpen(false)} />
            </Modal>
            <Modal isOpen={isEditPlaceOpen} onClose={() => setIsEditPlaceOpen(false)} title={!editingPlace ? t.create_adventure : t.edit_adventure}>
                <AdventureEditView onClose={() => setIsEditPlaceOpen(false)} editingAdventure={editingPlace} />
            </Modal>
        </Layout>
    )
}
function setAdventureForm(arg0: { name: string; modality: string; city: string | undefined; state: string | undefined; description: string; difficulty: string; duration: string; targetAudience: string; photos: never[] }) {
    throw new Error('Function not implemented.')
}

