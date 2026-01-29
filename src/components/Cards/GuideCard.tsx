
import { MapPin, ArrowRight } from "lucide-react";
import { ModalityTag } from "@/components/ModalityTag";
// import { StarRating } from "@/components/StarRating";
import type { Guide } from "@/data/mockData";
import Image from "next/image";
import Link from "next/link";

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <div className="adventure-card group">
      {/* Header with photo */}
      <div className="relative flex items-center gap-4 p-4 pb-3">
        <Image
          src={guide.photo}
          alt={guide.name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/10"
        />
        <div className="flex-1">
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
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
          <ModalityTag key={modality} modality={modality} size="sm" />
        ))}
        {guide.modalities.length > 3 && (
          <span className="px-2 py-0.5 text-xs text-muted-foreground">
            +{guide.modalities.length - 3}
          </span>
        )}
      </div>

      {/* Link */}
      <div className="border-t border-border px-4 py-3">
        <Link
          href={`/guia/${guide.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Ver perfil do guia
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
