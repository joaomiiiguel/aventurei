"use client";
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModalityIcon } from "@/components/ModalityIcon";
import { type Modality } from "../data/mockData";
import { useTranslations } from "@/contexts/LocaleContext";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedModalities: Modality[];
  onModalitiesChange: (modalities: Modality[]) => void;
}

const allModalities: Modality[] = [
  "trilha",
  "escalada",
  "rafting",
  "mergulho",
  "canoagem",
  "rapel",
  "mountain-bike",
  "camping",
];

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedModalities,
  onModalitiesChange,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const t = useTranslations();

  const toggleModality = (modality: Modality) => {
    if (selectedModalities.includes(modality)) {
      onModalitiesChange(selectedModalities.filter((m) => m !== modality));
    } else {
      onModalitiesChange([...selectedModalities, modality]);
    }
  };

  const clearFilters = () => {
    onSearchChange("");
    onModalitiesChange([]);
  };

  const getModalityLabel = (m: Modality) => {
    const key = `modality_${m.replace('-', '_')}`;
    return t[key] || m;
  };

  const hasActiveFilters =
    searchQuery.length > 0 || selectedModalities.length > 0;

  return (
    <div className="w-full mx-auto max-w-5xl z-10 rounded-xl bg-card p-6 shadow-card bg-white/50 border border-green-50/60 text-green-50 backdrop-blur-md mt-10 shadow-lg">
      {/* Search and Toggle */}
      <div className="flex flex-col items-start">
        <p className="mb-2 text-md font-bold text-primary">
          {t.filter || 'Filtrar'}
        </p>
        <div className="relative flex-1 w-full text-primary">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder={t.search_adventures_guides || 'Buscar aventuras ou guias...'}
            value={searchQuery}
            onChange={(e: { target: { value: string } }) =>
              onSearchChange(e.target.value)
            }
            className="pl-10 placeholder:text-primary/70 bg-white/50 w-full"
          />
        </div>
        {hasActiveFilters && (
          <Button onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="mt-4 text-left">
        <div className="flex flex-wrap gap-2">
          {allModalities.map((modality) => {
            const isSelected = selectedModalities.includes(modality);
            return (
              <button
                key={modality}
                onClick={() => toggleModality(modality)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-all ${isSelected
                    ? "bg-green-900/20 text-primary border border-primary"
                    : "bg-primary text-white hover:bg-primary/80 hover:cursor-pointer border border-primary"
                  }`}
              >
                <ModalityIcon modality={modality} className="h-4 w-4" />
                {getModalityLabel(modality)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


