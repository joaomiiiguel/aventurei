"use client";
import GuideCard from "@/components/Cards/GuideCard";

import { useState, useEffect } from "react";
import { filterGuides } from "@/utils/filterUtils";
import { useTranslations } from "@/contexts/LocaleContext";
import { MockDataService, Guide } from "@/data/mockData";
import { Modality } from "@/types/Place";

const ListGuiasSession = ({ searchQuery, selectedModalities }: { searchQuery: string, selectedModalities: Modality[] }) => {
    const t = useTranslations();
    const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAndFilter = async () => {
            setIsLoading(true);
            const guides = await MockDataService.getAllGuides();
            const filtered = filterGuides(guides, searchQuery, selectedModalities);
            setFilteredGuides(filtered);
            setIsLoading(false);
        };
        fetchAndFilter();
    }, [searchQuery, selectedModalities]);


    return (
        <>
            {filteredGuides?.length > 0 ? (
                <div className="w-full grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredGuides.map((guide) => (
                        <GuideCard key={guide.id} guide={guide} />
                    ))}
                </div>
            ) : (
                <div className="rounded-xl bg-muted/50 py-12 text-center">
                    <p className="text-muted-foreground">
                        {t.no_guides_found || "Nenhum guia encontrado com os filtros selecionados."}
                    </p>
                </div>
            )}
        </>
    );
};

export default ListGuiasSession;