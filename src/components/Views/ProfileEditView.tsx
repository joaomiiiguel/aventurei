'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User as UserIcon, Camera, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSupabaseClient } from '@/utils/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslations } from '@/contexts/LocaleContext'
import { getStorageUrl } from '@/utils/supabase/storage'
import { Modality, modalityLabels } from '@/types/Place'
import { UserType } from '@/types/User'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Label from '../ui/label'
import Textarea from '../ui/textarea'

interface ProfileEditViewProps {
    onClose: () => void
}

export function ProfileEditView({ onClose }: ProfileEditViewProps) {
    const { user } = useAuth()
    const router = useRouter()
    const t = useTranslations()
    const supabase = useSupabaseClient()

    const [isUploading, setIsUploading] = useState(false)
    const [profileForm, setProfileForm] = useState<Partial<UserType>>({
        name: '',
        city: '',
        UF: '',
        description: '',
        email: '',
        numberID: '',
        nickname: '',
        modalities: [],
        avatar: '',
        banner: '',
    })

    useEffect(() => {
        if (user) {
            setProfileForm({
                name: user.name || '',
                city: user.city || '',
                UF: user.UF || '',
                description: user.description || '',
                email: user.email || '',
                numberID: user.numberID || '',
                nickname: user.nickname || '',
                modalities: user.modalities || [],
                avatar: user.avatar || '',
                banner: user.banner || '',
            })
        }
    }, [user])

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !user) return

        try {
            setIsUploading(true)
            const fileExt = file.name.split('.').pop()
            const filePath = `${user.id}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('users')
                .upload(filePath, file, { upsert: true })

            if (uploadError) throw uploadError

            setProfileForm(prev => ({ ...prev, avatar: filePath }))
            toast.success(t.avatar_uploaded_success || 'Avatar atualizado!')
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsUploading(false)
        }
    }

    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !user) return

        try {
            setIsUploading(true)
            const fileExt = file.name.split('.').pop()
            const filePath = `banners/${user.id}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('users')
                .upload(filePath, file, { upsert: true })

            if (uploadError) throw uploadError

            setProfileForm(prev => ({ ...prev, banner: filePath }))
            toast.success(t.banner_uploaded_success)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsUploading(false)
        }
    }

    const toggleModality = (modality: Modality) => {
        const currentModalities = profileForm.modalities || []
        if (currentModalities.includes(modality)) {
            setProfileForm(prev => ({
                ...prev,
                modalities: currentModalities.filter(m => m !== modality)
            }))
        } else {
            setProfileForm(prev => ({
                ...prev,
                modalities: [...currentModalities, modality]
            }))
        }
    }

    const handleProfileSave = async () => {
        if (!user) return

        try {
            // Validate Nickname Uniqueness if changed
            if (profileForm.nickname && profileForm.nickname !== user.nickname) {
                const { data: existingUser } = await supabase
                    .from('users')
                    .select('id')
                    .eq('nickname', profileForm.nickname)
                    .single()

                if (existingUser) {
                    toast.error(t.nickname_taken)
                    return
                }
            }

            const { error } = await supabase
                .from('users')
                .update({
                    name: profileForm.name,
                    city: profileForm.city,
                    UF: profileForm.UF,
                    description: profileForm.description,
                    email: profileForm.email,
                    numberID: profileForm.numberID,
                    nickname: profileForm.nickname,
                    modalities: profileForm.modalities,
                    avatar: profileForm.avatar,
                    banner: profileForm.banner,
                })
                .eq('id', user.id)

            if (error) throw error
            toast.success(t.profile_updated_success)
            onClose()
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="space-y-6">
            {/* Banner Upload Sector */}
            <div className="relative h-32 w-full overflow-hidden rounded-xl border-2 border-dashed border-primary/20 transition-all hover:border-primary group">
                {isUploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                ) : profileForm.banner ? (
                    <Image
                        src={getStorageUrl('users', profileForm.banner)!}
                        alt="Banner"
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/5">
                        <div className="text-center">
                            <Camera className="mx-auto h-8 w-8 text-primary/40" />
                            <p className="mt-2 text-xs text-muted-foreground">{t.add_banner}</p>
                        </div>
                    </div>
                )}
                <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 z-20">
                    <Camera className="h-8 w-8 text-white" />
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleBannerUpload}
                        disabled={isUploading}
                    />
                </label>
            </div>

            {/* Avatar Upload Sector */}
            <div className="flex flex-col items-center gap-4">
                <div className="relative group cursor-pointer">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary/20 transition-all hover:ring-primary">
                        {isUploading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <Loader2 className="h-8 w-8 animate-spin text-white" />
                            </div>
                        ) : profileForm.avatar ? (
                            <Image
                                src={getStorageUrl('users', profileForm.avatar)!}
                                alt="Avatar"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary/10">
                                <UserIcon className="h-10 w-10 text-primary/40" />
                            </div>
                        )}
                        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <Camera className="h-8 w-8 text-white" />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                                disabled={isUploading}
                            />
                        </label>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">{t.click_to_change_avatar}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">{t.full_name}</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder={t.name_placeholder}
                        value={profileForm.name || ''}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="city">{t.city}</Label>
                        <Input
                            id="city"
                            type="text"
                            placeholder={t.city}
                            value={profileForm.city || ''}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, city: e.target.value }))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">{t.state}</Label>
                        <Input
                            id="state"
                            type="text"
                            placeholder={t.state}
                            value={profileForm.UF || ''}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, UF: e.target.value }))}
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={profileForm.email || ''}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="numberID">{t.id_number}</Label>
                    <Input
                        id="numberID"
                        type="text"
                        placeholder="numberID or ID"
                        value={profileForm.numberID || ''}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, numberID: e.target.value }))}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="nickname">{t.nickname}</Label>
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">aventurei.es/</span>
                    <Input
                        id="nickname"
                        type="text"
                        placeholder="your-nickname"
                        value={profileForm.nickname || ''}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, nickname: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                    />
                </div>
                <p className="text-[10px] text-muted-foreground">{t.public_link_hint}</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">{t.description}</Label>
                <Textarea
                    id="description"
                    value={profileForm.description || ''}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={t.description}
                />
            </div>

            <div>
                <Label className="mb-2 block">{t.modalities}</Label>
                <div className="flex flex-wrap gap-2">
                    {Object.keys(modalityLabels).map((value) => {
                        const isSelected = profileForm.modalities?.includes(value as Modality)
                        const translationKey = `modality_${value.replace('-', '_')}`
                        return (
                            <button
                                key={value}
                                type="button"
                                onClick={() => toggleModality(value as Modality)}
                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-all ${isSelected
                                    ? "bg-primary text-white border border-primary hover:bg-primary/80 hover:cursor-pointer"
                                    : "bg-green-900/10 text-primary hover:bg-primary/80 hover:text-white hover:cursor-pointer border border-primary"
                                    }`}
                            >
                                {t[translationKey] || value}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <Button onClick={handleProfileSave} className="bg-primary text-white">
                    {t.save_changes}
                </Button>
            </div>
        </div>
    )
}
