"use client";
import GuideCard from "@/components/Cards/GuideCard";
import { guides, Modality } from "@/data/mockData";
import { useMemo } from "react";
import { filterGuides } from "@/utils/filterUtils";
import { useTranslations } from "@/contexts/LocaleContext";

const ListGuiasSession = ({ searchQuery, selectedModalities }: { searchQuery: string, selectedModalities: Modality[] }) => {
    const t = useTranslations();
    const filteredGuides = useMemo(() => {
        return filterGuides(guides, searchQuery, selectedModalities);
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