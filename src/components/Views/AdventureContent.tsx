'use client'
import Image from "next/image";
import { ModalityTag } from "@/components/ModalityTag";
import { MapPin, Clock, Users, ArrowLeft, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Layout } from "../Layout/Layout";
import Link from "next/link";
import DifficultyBadge from "../DifficultyBadge";
import { useTranslations } from "@/contexts/LocaleContext";
import { getStorageUrl } from "@/utils/supabase/storage";
import { PlaceType } from "@/types/Place";
import { UserType } from "@/types/User";

interface AdventureContentProps {
  adventure: PlaceType;
  guide: UserType;
  lang: string;
}

export default function AdventureDetail({ adventure, guide, lang }: AdventureContentProps) {
  const t = useTranslations();
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

  // WhatsApp link formatting
  const whatsappNumber = guide?.phone || "+34000000000";
  const whatsappMessage = encodeURIComponent(
    `${t.whatsapp_hello || "Olá"}, ${guide?.name}! ${t.whatsapp_interest || "Tenho interesse na aventura"}: *${adventure.title}*. ${t.whatsapp_more_info || "Gostaria de mais informações sobre datas e reservas."}`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${whatsappMessage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": adventure.title,
    "image": adventure.gallery?.map(photo => getStorageUrl('places', photo)),
    "description": adventure.description,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "price": "0.00",
      "availability": "https://schema.org/InStock"
    },
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://aventurei.es/${lang}` },
            { "@type": "ListItem", "position": 2, "name": "Guia", "item": `https://aventurei.es/${lang}/${guide?.nickname || ""}` },
            { "@type": "ListItem", "position": 3, "name": adventure.title }
        ]
    }
  };

  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      <section className="flex flex-col w-full pb-8 px-[5%] 2xl:px-[15%] gap-4">

        {/* Main Photo */}
        <div className="lg:col-span-2">
          <div className="relative aspect-[16/10] h-[60vh] w-full overflow-hidden rounded-2xl">
            <Image
              src={getStorageUrl('places', adventure.gallery?.[selectedPhoto]) || ""}
              alt={adventure.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {adventure.gallery?.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedPhoto(index)}
              className={`relative flex-1 h-[15vh] overflow-hidden rounded-xl transition-all ${selectedPhoto === index
                ? "ring-2 ring-primary ring-offset-2"
                : "opacity-70 hover:opacity-100"
                }`}
            >
              <Image
                src={getStorageUrl('places', photo) || ""}
                alt={`${adventure.title} - ${t.photo || "Foto"} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="flex pb-12 px-[5%] 2xl:px-[15%] text-primary">
        <div className="grid gap-8 lg:grid-cols-3 w-full">
          {/* Main Info */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <h1 className="mb-3 text-3xl font-extrabold md:text-4xl">
                {adventure.title}
              </h1>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{adventure.city}, {adventure.uf}</span>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="mb-8 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-white/50 p-4 text-center flex flex-col items-center justify-center">
                {adventure.modalities && <ModalityTag modality={adventure.modalities} />}
                <p className="text-xs text-gray-400">{t.modality || "Modalidade"}</p>
              </div>
              <div className="rounded-xl bg-white/50 p-4 text-center flex flex-col items-center justify-center">
                <p className="flex flex-row items-center py-1 text-sm gap-1.5">
                  <Users className="h-4 w-4" />
                  {adventure.min_age} {t.years || "anos"}
                </p>
                <p className="text-xs text-gray-400">{t.target_audience || "Público"}</p>
              </div>
              <div className="rounded-xl bg-white/50 p-4 text-center flex flex-col items-center justify-center">
                {adventure.difficulty && <DifficultyBadge difficulty={adventure.difficulty} />}
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

              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white w-full flex justify-center items-center gap-2 font-bold text-lg px-10 py-3 rounded-full shadow-xl transition-transform hover:scale-102 hover:cursor-pointer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t.request_booking_whatsapp || 'Reservar no WhatsApp'}
              </Link>


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
                  <div className="relative h-14 w-14 shrink-0">
                    <Image
                      src={getStorageUrl('users', guide.avatar) || ""}
                      alt={guide.name || guide.nickname || ""}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{guide.name || guide.nickname}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <MapPin className="h-3.5 w-3.5" />
                      {guide.city}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/${lang}/${guide.nickname}`}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-secondary/80 transition-colors"
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
