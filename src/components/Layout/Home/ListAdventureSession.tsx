"use client";
import { adventures, guides, type Modality } from "@/data/mockData";
import AdventureCard from "@/components/Cards/AdventureCard";
import { useMemo, useState } from "react";

interface ListAdventureSessionProps {
  searchQuery: string;
  selectedModalities: Modality[];
}

const ListAdventureSession = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);

  const filteredAdventures = useMemo(() => {
    return adventures.filter((adventure) => {
      const matchesSearch =
        adventure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adventure.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesModality =
        selectedModalities.length === 0 ||
        selectedModalities.includes(adventure.modality);
      return matchesSearch && matchesModality;
    });
  }, [searchQuery, selectedModalities]);

  return (
    <>
      {filteredAdventures?.length > 0 ? (
        <div className="w-full grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {filteredAdventures.map((adventure) => (
            <AdventureCard key={adventure.id} adventure={adventure} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-muted/50 py-12 text-center">
          <p className="text-muted-foreground">
            Nenhuma aventura encontrada com os filtros selecionados.
          </p>
        </div>
      )}
    </>
  );
};

export default ListAdventureSession;
