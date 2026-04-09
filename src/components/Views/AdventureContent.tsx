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
import Gallery from "../Gallery";

interface AdventureContentProps {
  adventure: PlaceType;
  guide: UserType;
  lang: string;
}

export default function AdventureDetail({ adventure, guide, lang }: AdventureContentProps) {
  const t = useTranslations();
  const gallery = adventure.gallery?.map(photo => getStorageUrl('places', photo)).filter((url): url is string => url !== undefined) ?? [];


  if (!adventure) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">{t.adventure_not_found || "Aventura não encontrada"}</h1>
          <Link href={`/${lang}`} className="text-primary font-semibold hover:underline">
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
    <Layout>
      <div className="w-full h-16 -mt-16 bg-primary"></div>

      <div className="container px-[5%] 2xl:px-[15%] mx-auto text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Back Button */}
        <div className="py-4">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.back || "Voltar"}
          </Link>
        </div>

        {/* Photo Gallery */}

        <Gallery listImg={gallery} />

        <div className="divider w-full my-4 border-primary/20 border-1 rounded-full"></div>

        {/* Content */}
        <section className="flex pb-30 md:pb-10 text-primary">
          <div className="grid gap-4 lg:grid-cols-3 w-full">
            {/* Main Info */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6 max-h-20">
                <h1 className="mb-3 font-bold uppercase text-xl md:text-4xl">
                  {adventure.title}
                </h1>
                <div className="flex items-center gap-1 text-primary text-sm md:text-base">
                  <MapPin className="h-4 w-4" />
                  <span>{adventure.city}, {adventure.uf}</span>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-xl bg-white/50 p-4 text-left flex flex-col shadow-sm">
                <h2 className="mb-4 text-sm md:text-xl font-bold text-primary">{t.about_experience || "Sobre a Experiência"}</h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed min-h-[250px]">{adventure.description}</p>
              </div>

            </div>

            {/* Sidebar */}
            <div className="" >
              {/* CTA Card Desktop */}
              <div className="rounded-xl mb-4 px-6 hidden md:block">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white w-full flex justify-center items-center gap-2 font-bold text-lg px-10 py-3 rounded-full shadow-xl transition-transform hover:scale-102 hover:cursor-pointer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t.request_booking_whatsapp || 'Reservar no WhatsApp'}
                </Link>


                <p className="mt-3 text-center text-sm text-gray-400 font-bold">
                  {t.response_time_24h || "Resposta em até 24 horas"}
                </p>
              </div>

              {/* CTA Card Mobile */}
              <div className="fixed z-10 border-t border-primary/20 bottom-0 left-0 right-0 w-full px-4 py-2 bg-primary md:hidden">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary w-full flex justify-center items-center gap-2 font-bold text-md md:text-md px-10 py-3 rounded-full shadow-xl transition-transform hover:scale-102 hover:cursor-pointer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t.request_booking_whatsapp || 'Reservar no WhatsApp'}
                </Link>


                <p className="mt-2 md:mt-4 text-center text-xs md:text-sm text-gray-400 font-bold">
                  {t.response_time_24h || "Resposta em até 24 horas"}
                </p>
              </div>

              {/* Quick Info Cards */}
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-white/50 p-4 text-center flex flex-col items-center justify-center shadow-sm">
                  {adventure.modalities && <ModalityTag modality={adventure.modalities} />}
                  <p className="text-xs text-gray-400">{t.modality || "Modalidade"}</p>
                </div>
                <div className="rounded-xl bg-white/50 p-4 text-center flex flex-col items-center justify-center shadow-sm">
                  <p className="flex flex-row items-center py-1 text-sm gap-1.5">
                    <Users className="h-4 w-4" />
                    {adventure.min_age} {t.years || "anos"}
                  </p>
                  <p className="text-xs text-gray-400">{t.target_audience || "Público"}</p>
                </div>
                <div className="rounded-xl bg-white/50 p-4 text-center flex flex-col items-center justify-center shadow-sm">
                  {adventure.difficulty && <DifficultyBadge difficulty={adventure.difficulty} />}
                  <p className="text-xs text-gray-400">{t.difficulty || "Dificuldade"}</p>
                </div>
              </div>

              {/* Guide Card */}
              {guide && (
                <div className="rounded-xl bg-white p-6 shadow m-0">
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
      </div>
    </Layout>
  );
}
