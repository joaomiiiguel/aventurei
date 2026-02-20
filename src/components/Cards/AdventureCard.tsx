"use client";
import { MapPin, ArrowRight } from "lucide-react";
import { ModalityTag } from "@/components/ModalityTag";
import { getGuideById } from "@/data/mockData";
import type { Adventure } from "@/data/mockData";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/contexts/LocaleContext";
import { useParams } from "next/navigation";

interface AdventureCardProps {
  adventure: Adventure;
}

export default function AdventureCard({ adventure }: AdventureCardProps) {
  const guide = getGuideById(adventure.nickname);
  const t = useTranslations();
  const params = useParams();
  const lang = params.lang as string;

  return (
    <div className="adventure-card group bg-white text-primary">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={adventure.coverPhoto}
          alt={adventure.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          width={300}
          height={200}
        />
        <div className="image-overlay absolute inset-0" />
        <div className="absolute left-3 top-3 bg-white/80 rounded-md">
          <ModalityTag modality={adventure.modality} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
          {adventure.name}
        </h3>

        <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{adventure.city}, {adventure.state}</span>
        </div>

        {guide && (
          <div className="mb-4 flex items-center gap-2">
            <Image
              src={guide.photo}
              alt={guide.name}
              className="h-6 w-6 rounded-full object-cover"
              width={24}
              height={24}
            />
            <span className="text-sm text-muted-foreground">
              {lang === 'en' ? 'by' : lang === 'es' ? 'por' : 'por'}{" "}
              <span className="font-bold">{guide.name}</span>
            </span>
          </div>
        )}

        <Link
          href={`/${lang}/${adventure.nickname}/${adventure.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary transition-colors hover:text-white/80 btn-adventure w-full justify-center py-2"
        >
          {t.view_more || 'Ver Mais'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

