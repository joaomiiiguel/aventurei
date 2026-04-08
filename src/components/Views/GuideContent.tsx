import { ModalityTag } from "@/components/ModalityTag";
import { MapPin, Award, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import AdventureCard from "../Cards/AdventureCard";
import { Layout } from "../Layout/Layout";
import { getDictionary } from "@/lib/dictionary";
import { UserType } from "@/types/User";
import { createClient } from "@/utils/supabase/server";
import { getStorageUrl } from "@/utils/supabase/storage";

interface GuideContentProps {
    guide: UserType;
    lang: string;
}

export default async function GuideContent({ guide, lang }: GuideContentProps) {
    const supabase = await createClient();
    const t = await getDictionary(lang);

    // Fetch adventures directly on the server
    const { data: guideAdventures } = await supabase
        .from('adventures')
        .select('*')
        .eq('nickname', guide.nickname);

    const adventures = guideAdventures || [];

    // WhatsApp link formatting
    const whatsappNumber = guide?.phone || "+34000000000";
    const whatsappMessage = encodeURIComponent(
        `${t.whatsapp_hello || "Olá"}, ${guide?.name}! ${t.whatsapp_more_info || "Gostaria de mais informações sobre datas e reservas."}`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${whatsappMessage}`;

    return (
        <Layout>
            {/* Hero Banner */}
            <section className="relative bg-primary text-white pt-24 md:pt-32 pb-10 px-[5%] 2xl:px-[10%] mt-[-8vh]">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src={getStorageUrl('users', guide.banner) || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=600&fit=crop"}
                        alt="Banner do guia"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="relative">
                    <Link
                        href={`/${lang}`}
                        className="mb-6 inline-flex items-center gap-2 text-sm text-white hover:text-primary-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t.back || "Voltar"}
                    </Link>

                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 md:flex-row md:items-end">
                        <img
                            src={getStorageUrl('users', guide.avatar) || "/default-avatar.png"}
                            alt={guide.name || "Guia"}
                            className="h-32 w-32 rounded-2xl object-cover ring-4 ring-primary-foreground/20 md:h-40 md:w-40 bg-white"
                        />
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="mb-2 text-3xl font-extrabold md:text-4xl text-white">
                                {guide.name || guide.nickname}
                            </h1>
                            <div className="mb-3 flex flex-wrap justify-center md:justify-start items-center gap-4">
                                <div className="flex items-center gap-1 text-white/90">
                                    <MapPin className="h-4 w-4" />
                                    <span>{guide.city}, {guide.uf}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {guide.modalities?.map((modality) => (
                                    <ModalityTag key={modality} modality={modality} className="bg-white/20 text-white border-white rounded-md" />
                                ))}
                            </div>
                        </div>
                        <Link
                            href={whatsappUrl}
                            target="_blank"
                            className="flex items-center gap-2 bg-white text-primary hover:bg-white/90 font-bold text-lg px-10 py-3 rounded-lg shadow-xl transition-transform hover:scale-105"
                        >
                            <MessageCircle className="h-4 w-4 font-bold" />
                            {t.contact_guide || 'Entrar em contato'}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-4 md:py-8 px-[5%] 2xl:px-[10%] mx-auto">
                {/* About */}
                <div className="w-full mb-8 rounded-2xl bg-white p-6 shadow-sm border border-border">
                    <h2 className="mb-4 text-xl font-bold text-foreground">{t.about_guide || "Sobre o Guia"}</h2>
                    <p className="mb-4 text-muted-foreground whitespace-pre-wrap">{guide.short_description || guide.description}</p>
                    {guide.experience && (
                        <div className="mt-4 pt-4 border-t border-border">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">{t.experience || "Experiência"}</h3>
                            <p className="text-muted-foreground">{guide.experience}</p>
                        </div>
                    )}
                </div>

                {/* Certifications*/}
                {guide.certifications && guide.certifications.length > 0 && (
                    <div className="rounded-2xl bg-white p-6 mb-8 shadow-sm border border-border">
                        <div className="mb-4 flex items-center gap-2">
                            <Award className="h-5 w-5 text-amber-500" />
                            <h3 className="font-bold text-foreground">{t.certifications || "Certificações"}</h3>
                        </div>
                        <ul className="flex flex-col md:flex-row flex-wrap gap-x-6 gap-y-2">
                            {guide.certifications.map((cert, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    {cert}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Adventures */}
                <div>
                    <h2 className="mb-6 text-xl font-bold text-foreground">
                        {t.offered_adventures || "Aventuras oferecidas"} ({adventures.length})
                    </h2>
                    {adventures.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {adventures.map((adventure) => (
                                <AdventureCard key={adventure.id} adventure={adventure} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-muted/30 rounded-2xl">
                            <p className="text-muted-foreground">{t.no_adventures_found || "Nenhuma aventura encontrada para este guia."}</p>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}
