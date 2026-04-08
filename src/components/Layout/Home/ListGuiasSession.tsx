"use client";
import GuideCard from "@/components/Cards/GuideCard";
import { useEffect, useMemo } from "react";
import { filterGuides } from "@/utils/filterUtils";
import { useTranslations } from "@/contexts/LocaleContext";
import { Modality } from "@/types/Place";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setGuides, setGuidesLoading, setGuidesError } from "@/store/slices/guidesSlice";
import EmptyAdventureIcon from "@/components/EmptyResultIcon";

const ListGuiasSession = ({ 
    searchQuery, 
    selectedModalities, 
    initialData 
}: { 
    searchQuery: string, 
    selectedModalities: Modality[],
    initialData?: any[]
}) => {
    const t = useTranslations();
    const dispatch = useAppDispatch();
    const { items: guides, loading, error } = useAppSelector((state) => state.guides);

    useEffect(() => {
        const fetchGuides = async () => {
            // If we have initialData from server and store is empty, use it
            if (initialData && initialData.length > 0 && guides.length === 0) {
                dispatch(setGuides(initialData));
                return;
            }

            if (guides.length > 0) return; // Use cache if available

            dispatch(setGuidesLoading(true));
            try {
                const response = await fetch('/api/guides/all');
                const data = await response.json();
                if (response.ok) {
                    dispatch(setGuides(data));
                } else {
                    dispatch(setGuidesError(data.error || "Failed to fetch guides"));
                }
            } catch (err) {
                dispatch(setGuidesError("Network error"));
            } finally {
                dispatch(setGuidesLoading(false));
            }
        };

        fetchGuides();
    }, [dispatch, guides.length, initialData]);

    const filteredGuides = useMemo(() => {
        return filterGuides(guides, searchQuery, selectedModalities);
    }, [guides, searchQuery, selectedModalities]);

    if (loading && guides.length === 0) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            {filteredGuides?.length > 0 ? (
                <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredGuides.map((guide) => (
                        <GuideCard key={guide.id} guide={guide} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <EmptyAdventureIcon />
                    <p className="text-muted-foreground font-semibold">
                        {t.no_guides_found || "Nenhum guia encontrado com os filtros selecionados."}
                    </p>
                </div>
            )}
        </>
    );
};

export default ListGuiasSession;