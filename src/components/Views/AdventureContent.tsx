"use client";
import { ModalityTag } from "@/components/ModalityTag";
import { getAdventureById, getGuideById } from "@/data/mockData";
import { MapPin, Clock, Users, ArrowLeft, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Layout } from "../Layout/Layout";
import Link from "next/link";
import DifficultyBadge from "../DifficultyBadge";
import { useTranslations } from "@/contexts/LocaleContext";

interface AdventureContentProps {
  slug: string;
  lang: string;
}

export default function AdventureDetail({ slug, lang }: AdventureContentProps) {
  const t = useTranslations();
  const adventure = getAdventureById(slug || "");
  const guide = adventure ? getGuideById(adventure.guideId) : undefined;
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  if (!adventure) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">{t.adventure_not_found || "Aventura não encontrada"}</h1>
          <Link href={`/${lang}`} className="text-primary hover:underline">
            {t.back_to_home || "Voltar para a página inicial"}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <>
      {/* Back Button */}
      <div className="container py-4 px-[5%]">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back_to_adventures || "Voltar para aventuras"}
        </Link>
      </div>

      {/* Photo Gallery */}
      <section className="flex flex-col w-full pb-8 px-[5%] gap-4">

        {/* Main Photo */}
        <div className="lg:col-span-2">
          <div className="aspect-[16/10] h-[60vh] w-full overflow-hidden rounded-2xl">
            <img
              src={adventure.photos[selectedPhoto]}
              alt={adventure.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {adventure.photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedPhoto(index)}
              className={`flex-1 h-[15vh] overflow-hidden rounded-xl transition-all ${selectedPhoto === index
                ? "ring-2 ring-primary ring-offset-2"
                : "opacity-70 hover:opacity-100"
                }`}
            >
              <img
                src={photo}
                alt={`${adventure.name} - ${t.photo || "Foto"} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="flex pb-12 px-[5%] text-[#00382F] ">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 ">
            {/* Header */}
            <div className="mb-6">
              <h1 className="mb-3 text-3xl font-extrabold md:text-4xl">
                {adventure.name}
              </h1>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{adventure.city}, {adventure.state}</span>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="mb-8 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-white/50 p-4 text-center flex flex-col items-center justify-center">
                <ModalityTag modality={adventure.modality} />
                <p className="text-xs text-gray-400">{t.modality || "Modalidade"}</p>
              </div>
              <div className="rounded-xl bg-white/50 p-4 text-center flex flex-col items-center justify-center">
                <p className="text-sm font-bold">{adventure.targetAudience}</p>
                <p className="text-xs text-gray-400">{t.target_audience || "Público"}</p>
              </div>
              <div className="rounded-xl bg-white/50 p-4 text-center flex flex-col items-center justify-center">
                <DifficultyBadge difficulty={adventure.difficulty} />
                <p className="text-xs text-gray-400">{t.difficulty || "Dificuldade"}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-foreground">{t.about_experience || "Sobre a Experiência"}</h2>
              <p className="text-muted-foreground leading-relaxed">{adventure.description}</p>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="rounded-2xl shadow p-6 bg-white">

              <button
                className="bg-[#00382F] text-white w-full flex justify-center items-center gap-2 font-bold text-lg px-10 py-3 rounded-full shadow-xl transition-transform hover:scale-102 hover:cursor-pointer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t.request_booking || 'Solicitar reserva'}
              </button>


              <p className="mt-4 text-center text-sm text-gray-400 font-bold">
                {t.response_time_24h || "Resposta em até 24 horas"}
              </p>
            </div>

            {/* Guide Card */}
            {guide && (
              <div className="rounded-2xl bg-white p-6 shadow">
                <h3 className="mb-4 text-sm font-medium text-gray-400 font-bold">
                  {t.responsible_guide || "Guia responsável"}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={guide.photo}
                    alt={guide.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-foreground">{guide.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <MapPin className="h-3.5 w-3.5" />
                      {guide.city}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/${lang}/${guide.id}`}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00382F] py-2 text-sm font-medium text-white hover:bg-secondary/80 transition-colors"
                >
                  {t.view_full_profile || "Ver perfil completo"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
