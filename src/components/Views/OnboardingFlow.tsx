'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, ChevronLeft, Mountain, User as UserIcon, Camera, Loader2, Sparkles, ImagePlus, Trash2 } from 'lucide-react'
import { useTranslations } from '@/contexts/LocaleContext'
import { useAuth } from '@/contexts/AuthContext'
import { useSupabaseClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Label from '@/components/ui/label'
import Textarea from '@/components/ui/textarea'
import Avatar from '@/components/Avatar'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { getStorageUrl } from '@/utils/supabase/storage'
import { Modality, modalityLabels, Difficulty, PlaceType } from '@/types/Place'
import Select from '@/components/ui/select'
import { useRouter } from 'next/navigation'

export function OnboardingFlow() {
    const t = useTranslations()
    const { user, signOut } = useAuth()
    const supabase = useSupabaseClient()
    const router = useRouter()
    const [step, setStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [pendingPhotos, setPendingPhotos] = useState<{ file: File; url: string }[]>([])

    // Form States
    const [profileForm, setProfileForm] = useState({
        name: user?.name || '',
        nickname: user?.nickname || '',
        city: user?.city || '',
        UF: user?.UF || '',
        description: user?.description || '',
        avatar: user?.avatar || '',
        modalities: user?.modalities || [],
    })

    const [adventureForm, setAdventureForm] = useState<PlaceType>({
        title: "",
        description: "",
        city: "",
        UF: "",
        price: null,
        nickname: user?.id || "",
        cover_img: "",
        min_age: 4,
        booking_mode: true,
        gallery: [],
        difficulty: "moderate" as Difficulty,
        modalities: null,
        slug: "",
    })

    const totalSteps = 5
    const progress = ((step + 1) / totalSteps) * 100

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps - 1))
    const prevStep = () => setStep(prev => Math.max(prev - 1, 0))

    const handleProfileSubmit = async () => {
        if (!user) return
        setIsSubmitting(true)
        try {
            const { error } = await supabase
                .from('users')
                .update({
                    ...profileForm,
                })
                .eq('id', user.id)

            if (error) throw error
            nextStep()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleAdventureSubmit = async () => {
        // Just move to the next step (photos)
        nextStep()
    }

    const handlePhotosSubmit = async () => {
        if (!user) return
        setIsSubmitting(true)

        try {
            const slug = adventureForm.title.toLowerCase().trim().replace(/\s+/g, "-")

            // Upload photos to the folder named with the slug
            const uploadedUrls: string[] = []
            for (let i = 0; i < pendingPhotos.length; i++) {
                const { file } = pendingPhotos[i]
                const fileExt = file.name.split('.').pop()
                const filePath = `${slug}/${Date.now()}-${i}.${fileExt}`

                const { error: uploadError } = await supabase.storage
                    .from('places')
                    .upload(filePath, file)

                if (uploadError) throw uploadError

                uploadedUrls.push(filePath)
            }

            // Create the place with the final paths in one go
            const { error: insertError } = await supabase
                .from("places")
                .insert({
                    ...adventureForm,
                    gallery: uploadedUrls,
                    cover_img: uploadedUrls[0] || "",
                    slug,
                    user_id: user.id,
                    nickname: user.id
                })

            if (insertError) throw insertError

            nextStep()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const finalizeOnboarding = async () => {
        if (!user) return
        setIsSubmitting(true)
        try {
            const { error } = await supabase
                .from('users')
                .update({ onboarded: true })
                .eq('id', user.id)

            if (error) throw error
            toast.success(t.onboarding_success_title)
            window.location.reload() // Reload to show dashboard
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !user) return
        try {
            setIsSubmitting(true)
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
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-border mt-auto mb-auto">
                {/* Progress Bar */}
                <div className="h-2 bg-muted overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>

                <div className="p-8 md:p-12">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-center space-y-6"
                            >
                                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Sparkles className="h-10 w-10 text-primary" />
                                </div>
                                <h1 className="text-3xl font-bold text-foreground">{t.onboarding_title}</h1>
                                <p className="text-muted-foreground text-lg">{t.onboarding_subtitle}</p>
                                <Button onClick={nextStep} className="w-full h-14 text-lg rounded-xl">
                                    {t.onboarding_btn_profile} <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                                <button onClick={() => signOut()} className="w-full text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                    {t.logout}
                                </button>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <UserIcon className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t.onboarding_profile_title}</h2>
                                </div>

                                <div className="flex flex-col items-center gap-4 py-4">
                                    <div className="relative group">
                                        <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-primary/10 transition-all hover:ring-primary">
                                            {profileForm.avatar ? (
                                                <Image src={getStorageUrl('users', profileForm.avatar)!} alt="Avatar" fill className="object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-muted">
                                                    <UserIcon className="h-12 w-12 text-muted-foreground" />
                                                </div>
                                            )}
                                            <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="h-8 w-8 text-white" />
                                                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                                            </label>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{t.click_to_change_avatar}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>{t.full_name}</Label>
                                        <Input
                                            value={profileForm.name}
                                            onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                                            placeholder={t.name_placeholder}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t.nickname}</Label>
                                        <Input
                                            value={profileForm.nickname}
                                            onChange={e => setProfileForm({ ...profileForm, nickname: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                            placeholder="seu-nickname"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t.city}</Label>
                                        <Input
                                            value={profileForm.city}
                                            onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                                            placeholder={t.city}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t.state}</Label>
                                        <Input
                                            value={profileForm.UF}
                                            onChange={e => setProfileForm({ ...profileForm, UF: e.target.value })}
                                            placeholder={t.state}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>{t.description}</Label>
                                    <Textarea
                                        value={profileForm.description}
                                        onChange={e => setProfileForm({ ...profileForm, description: e.target.value })}
                                        placeholder={t.description}
                                        rows={3}
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button variant="ghost" onClick={prevStep} className="flex-1 h-12">
                                        <ChevronLeft className="mr-2 h-4 w-4" /> {t.onboarding_back}
                                    </Button>
                                    <Button onClick={handleProfileSubmit} disabled={isSubmitting} className="flex-[2] h-12">
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : t.onboarding_btn_adventure}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Mountain className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t.onboarding_adventure_title}</h2>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="space-y-2">
                                        <Label>{t.adventure_name}</Label>
                                        <Input
                                            value={adventureForm.title}
                                            onChange={(e) => setAdventureForm({ ...adventureForm, title: e.target.value })}
                                            placeholder={t.adventure_name_placeholder} type={""} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label>{t.modality}</Label>
                                            <Select
                                                options={Object.keys(modalityLabels).map((key) => ({
                                                    value: key,
                                                    label: t[`modality_${key.replace('-', '_')}`] || key
                                                }))}
                                                value={adventureForm.modalities!}
                                                onChange={(v) => setAdventureForm({ ...adventureForm, modalities: v as Modality })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>{t.difficulty}</Label>
                                            <Select
                                                options={[
                                                    { value: "fácil", label: t.difficulty_easy },
                                                    { value: "moderado", label: t.difficulty_moderate },
                                                    { value: "difícil", label: t.difficulty_hard },
                                                    { value: "extremo", label: t.difficulty_extreme },
                                                ]}
                                                value={adventureForm.difficulty!}
                                                onChange={(v) =>
                                                    setAdventureForm({ ...adventureForm, difficulty: v as Difficulty })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label>{t.city}</Label>
                                            <Input
                                                value={adventureForm.city}
                                                onChange={(e) => setAdventureForm({ ...adventureForm, city: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>{t.state}</Label>
                                            <Input
                                                value={adventureForm.UF}
                                                onChange={(e) => setAdventureForm({ ...adventureForm, UF: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">

                                        <div className="space-y-2">
                                            <Label>{t.min_age}</Label>
                                            <Input
                                                value={adventureForm.min_age?.toString() ?? "3"}
                                                onChange={(e) => setAdventureForm({ ...adventureForm, min_age: Number(e.target.value) })}
                                                placeholder={t.min_age_placeholder}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>{t.price}</Label>
                                            <Input
                                                value={adventureForm.price?.toString() ?? ""}
                                                onChange={(e) => setAdventureForm({ ...adventureForm, price: Number(e.target.value) })}
                                                placeholder={t.price_placeholder || "Ex: 150"}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>{t.description}</Label>
                                        <Textarea
                                            rows={4}
                                            value={adventureForm.description}
                                            onChange={(e) => setAdventureForm({ ...adventureForm, description: e.target.value })}
                                            placeholder={t.adventure_description_placeholder}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button variant="ghost" onClick={prevStep} className="flex-1 h-12">
                                        <ChevronLeft className="mr-2 h-4 w-4" /> {t.onboarding_back}
                                    </Button>
                                    <Button onClick={handleAdventureSubmit} className="flex-[2] h-12">
                                        {t.onboarding_btn_photos}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Camera className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t.onboarding_photos_title}</h2>
                                </div>

                                {/* Photo Upload Section */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        {adventureForm?.gallery?.map((photo, index) => (
                                            <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                                                <img src={getStorageUrl('places', photo)} alt={`Foto ${index + 1}`} className="h-full w-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const urlToRemove = adventureForm.gallery![index];
                                                        setAdventureForm({ ...adventureForm, gallery: adventureForm.gallery?.filter((_, i) => i !== index) });
                                                        setPendingPhotos(prev => prev.filter(p => p.url !== urlToRemove));
                                                    }}
                                                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-red-600 opacity-0 transition-opacity group-hover:opacity-100"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </button>
                                                {index === 0 && (
                                                    <span className="absolute bottom-1 left-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                                                        {t.cover_badge}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 transition-colors hover:border-primary/50 hover:bg-muted">
                                            <ImagePlus className="h-6 w-6 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">{t.add_photo}</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files || []);
                                                    const newPhotos = files.map(file => ({
                                                        file,
                                                        url: URL.createObjectURL(file)
                                                    }));
                                                    setPendingPhotos(prev => [...prev, ...newPhotos]);
                                                    setAdventureForm(prev => ({
                                                        ...prev,
                                                        cover_img: prev.cover_img || newPhotos[0].url,
                                                        gallery: [...(prev.gallery || []), ...newPhotos.map(p => p.url)]
                                                    }));
                                                    e.target.value = "";
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{t.photo_hint}</p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button variant="ghost" onClick={prevStep} className="flex-1 h-12">
                                        <ChevronLeft className="mr-2 h-4 w-4" /> {t.onboarding_back}
                                    </Button>
                                    <Button onClick={handlePhotosSubmit} disabled={isSubmitting} className="flex-[2] h-12">
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : t.onboarding_btn_save}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6"
                            >
                                <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                                    <Check className="h-12 w-12 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-bold">{t.onboarding_success_title}</h2>
                                <p className="text-muted-foreground text-lg">{t.onboarding_success_message}</p>
                                <Button onClick={finalizeOnboarding} disabled={isSubmitting} className="w-full h-14 text-lg rounded-xl">
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : t.onboarding_finish}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
