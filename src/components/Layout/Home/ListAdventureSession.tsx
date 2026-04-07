"use client";
import AdventureCard from "@/components/Cards/AdventureCard";
import { useEffect, useMemo } from "react";
import { filterAdventures } from "@/utils/filterUtils";
import { useTranslations } from "@/contexts/LocaleContext";
import { Modality } from "@/types/Place";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAdventures, setAdventuresLoading, setAdventuresError } from "@/store/slices/adventuresSlice";
import EmptyAdventureIcon from "@/components/EmptyResultIcon";

interface ListAdventureSessionProps {
  searchQuery: string;
  selectedModalities: Modality[];
}

const ListAdventureSession = ({ searchQuery, selectedModalities }: ListAdventureSessionProps) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { items: adventures, loading, error } = useAppSelector((state) => state.adventures);

  useEffect(() => {
    const fetchAdventures = async () => {
      if (adventures.length > 0) return; // Use cache if available

      dispatch(setAdventuresLoading(true));
      try {
        const response = await fetch('/api/adventures');
        const data = await response.json();
        if (response.ok) {
          dispatch(setAdventures(data));
        } else {
          dispatch(setAdventuresError(data.error || "Failed to fetch adventures"));
        }
      } catch (err) {
        dispatch(setAdventuresError("Network error"));
      } finally {
        dispatch(setAdventuresLoading(false));
      }
    };

    fetchAdventures();
  }, [dispatch, adventures.length]);

  const filteredAdventures = useMemo(() => {
    return filterAdventures(adventures, searchQuery, selectedModalities);
  }, [adventures, searchQuery, selectedModalities]);

  if (loading && adventures.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {filteredAdventures?.length > 0 ? (
        <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAdventures.map((adventure) => (
            <AdventureCard key={adventure.id} adventure={adventure} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <EmptyAdventureIcon />
          <p className="text-muted-foreground font-semibold">
            {t.no_adventures_found || "Nenhuma aventura encontrada com os filtros selecionados."}
          </p>
        </div>
      )}
    </>
  );
};

export default ListAdventureSession;

