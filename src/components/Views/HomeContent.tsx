"use client";

import { useState } from "react";
import HeroSession from "@/components/Layout/Home/HeroSession";
import { FilterBar } from "@/components/FilterBar";
import ListAdventureSession from "@/components/Layout/Home/ListAdventureSession";
import ListGuiasSession from "@/components/Layout/Home/ListGuiasSession";
import { Compass } from "lucide-react";
import { Modality } from "@/data/mockData";
import { useTranslations } from "@/contexts/LocaleContext";

const HomeContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);
  const t = useTranslations();

  return (
    <>
      <section>
        <HeroSession />
      </section>
      <section className="w-full flex flex-col items-start justify-between md:pb-12 px-[5%] gap-10">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedModalities={selectedModalities}
          onModalitiesChange={setSelectedModalities}
        />
        <div id="adventures-list" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <h2 className="mb-0 text-xl md:text-2xl font-bold text-primary">
            {t.featured_adventures || 'Aventuras em Destaque'}
          </h2>
        </div>
        <ListAdventureSession
          searchQuery={searchQuery}
          selectedModalities={selectedModalities}
        />

        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-[#00382F]" />
          <h2 className="mb-0 text-xl md:text-2xl font-bold text-[#00382F]">
            {t.featured_guides_title || 'Guias Experientes'}
          </h2>
        </div>
        <ListGuiasSession
          searchQuery={searchQuery}
          selectedModalities={selectedModalities}
        />
      </section>
    </>
  );
};

export default HomeContent;

