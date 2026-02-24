"use client";
import { adventures } from "@/data/mockData";
import AdventureCard from "@/components/Cards/AdventureCard";
import { useMemo } from "react";
import { filterAdventures } from "@/utils/filterUtils";
import { useTranslations } from "@/contexts/LocaleContext";
import { Modality } from "@/types/Place";

interface ListAdventureSessionProps {
  searchQuery: string;
  selectedModalities: Modality[];
}

const ListAdventureSession = ({ searchQuery, selectedModalities }: ListAdventureSessionProps) => {
  const t = useTranslations();
  const filteredAdventures = useMemo(() => {
    return filterAdventures(adventures, searchQuery, selectedModalities);
  }, [searchQuery, selectedModalities]);

  return (
    <>
      {filteredAdventures?.length > 0 ? (
        <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAdventures.map((adventure) => (
            <AdventureCard key={adventure.id} adventure={adventure} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-muted/50 py-12 text-center">
          <p className="text-muted-foreground">
            {t.no_adventures_found || "Nenhuma aventura encontrada com os filtros selecionados."}
          </p>
        </div>
      )}
    </>
  );
};

export default ListAdventureSession;

