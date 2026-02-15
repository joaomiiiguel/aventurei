import { ModalityTag } from "@/components/ModalityTag";
import { getGuideById, getAdventuresByGuide } from "@/data/mockData";
import { MapPin, Award, ArrowLeft } from "lucide-react";
import Link from "next/link";
import AdventureCard from "../Cards/AdventureCard";
import { Layout } from "../Layout/Layout";
import { getDictionary } from "@/lib/dictionary";

interface GuideContentProps {
    guide_id: string;
    lang: string;
}

export default async function GuideContent({ guide_id, lang }: GuideContentProps) {
    const guide = getGuideById(guide_id || "");
    const guideAdventures = getAdventuresByGuide(guide_id || "");
    const t = await getDictionary(lang);

    if (!guide) {
        return (
            <Layout>
                <div className="container py-16 text-center">
                    <h1 className="mb-4 text-2xl font-bold">{t.guide_not_found || "Guia não encontrado"}</h1>
                    <Link href={`/${lang}`} className="text-primary hover:underline">
                        {t.back_to_home || "Voltar para a página inicial"}
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Banner */}
            <section className="relative bg-primary text-white pt-24 md:pt-32 pb-10 px-[5%] mt-[-8vh]">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=600&fit=crop"
                        alt=""
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
                            src={guide.photo}
                            alt={guide.name}
                            className="h-32 w-32 rounded-2xl object-cover ring-4 ring-primary-foreground/20 md:h-40 md:w-40"
                        />
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="mb-2 text-3xl font-extrabold md:text-4xl">
                                {guide.name}
                            </h1>
                            <div className="mb-3 flex flex-wrap justify-center md:justify-start items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{guide.city}, {guide.state}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {guide.modalities.map((modality) => (
                                    <ModalityTag key={modality} modality={modality} />
                                ))}
                            </div>
                        </div>
                        <button
                            className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-10 py-3 rounded-full shadow-xl transition-transform hover:scale-105 hover:cursor-pointer"
                        >
                            {t.contact_guide || 'Entrar em contato'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-4 md:py-8 px-[5%] mx-auto">
                {/* About */}
                <div className="w-full mb-8 rounded-2xl bg-white p-6 shadow-card">
                    <h2 className="mb-4 text-xl font-bold text-foreground">{t.about_guide || "Sobre o Guia"}</h2>
                    <p className="mb-4 text-muted-foreground">{guide.description}</p>
                    <p className="text-muted-foreground">{guide.experience}</p>
                </div>

                {/* Certifications */}
                <div className="rounded-2xl bg-white p-6 mb-8 shadow-card">
                    <div className="mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-gold" />
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

                {/* Adventures */}
                <div>
                    <h2 className="mb-6 text-xl font-bold text-foreground">
                        {t.offered_adventures || "Aventuras oferecidas"} ({guideAdventures.length})
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {guideAdventures.map((adventure) => (
                            <AdventureCard key={adventure.id} adventure={adventure} />
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
