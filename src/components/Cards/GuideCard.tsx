"use client";
import { MapPin, ArrowRight } from "lucide-react";
import { ModalityTag } from "@/components/ModalityTag";
// import { StarRating } from "@/components/StarRating";
import type { Guide } from "@/data/mockData";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/contexts/LocaleContext";
import { useParams } from "next/navigation";

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  const t = useTranslations();
  const params = useParams();
  const lang = params.lang as string;

  return (
    <div className="adventure-card group bg-white text-primary">
      {/* Header with photo */}
      <div className="relative flex items-center gap-4 p-4 pb-3">
        <Image
          src={guide.photo}
          alt={guide.name}
          width={60}
          height={60}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/10"
        />
        <div className="flex-1">
          <h3 className="font-bold text-primary group-hover:text-primary transition-colors">
            {guide.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{guide.city}, {guide.state}</span>
          </div>
          {/* <div className="mt-1">
            <StarRating rating={guide.rating} reviewCount={guide.reviewCount} />
          </div> */}
        </div>
      </div>

      {/* Modalities */}
      <div className="flex flex-wrap gap-2 px-4 pb-3">
        {guide.modalities.slice(0, 3).map((modality) => (
          <div key={modality} className="bg-primary/20 rounded-md">
            <ModalityTag modality={modality} size="sm" />
          </div>
        ))}
        {guide.modalities.length > 3 && (
          <span className="px-2 py-0.5 text-xs text-muted-foreground">
            +{guide.modalities.length - 3}
          </span>
        )}
      </div>

      {/* Link */}
      <div className=" px-4 py-3">
        <Link
          href={`/${lang}/${guide.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary transition-colors hover:text-white/80 btn-adventure w-full justify-center py-2"
        >
          {t.guide_profile || "Ver perfil do guia"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

