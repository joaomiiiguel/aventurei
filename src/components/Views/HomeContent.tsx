"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeroSession from "@/components/Layout/Home/HeroSession";
import { FilterBar } from "@/components/FilterBar";
import ListAdventureSession from "@/components/Layout/Home/ListAdventureSession";
import ListGuiasSession from "@/components/Layout/Home/ListGuiasSession";
import HowItWorksSession from "@/components/Layout/Home/HowItWorksSession";
import HomeFaqSession from "@/components/Layout/Home/HomeFaqSession";
import { Compass } from "lucide-react";
import { useTranslations } from "@/contexts/LocaleContext";
import { Modality, PlaceType } from "@/types/Place";
import { UserType } from "@/types/User";

interface HomeContentProps {
  initialAdventures?: PlaceType[];
  initialGuides?: UserType[];
}

const HomeContent = ({ initialAdventures, initialGuides }: HomeContentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);
  const t = useTranslations();

  return (
    <>
      <section>
        <HeroSession />
      </section>
      <section className="w-full flex flex-col items-start justify-between pb-6 md:pb-12 px-[5%] 2xl:px-[10%] gap-10">
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
        <div className="w-full">
          <ListAdventureSession
            searchQuery={searchQuery}
            selectedModalities={selectedModalities}
            initialData={initialAdventures}
          />
        </div>

        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-[#00382F]" />
          <h2 className="mb-0 text-xl md:text-2xl font-bold text-[#00382F]">
            {t.featured_guides_title || 'Guias Experientes'}
          </h2>
        </div>
        <div className="w-full">
          <ListGuiasSession
            searchQuery={searchQuery}
            selectedModalities={selectedModalities}
            initialData={initialGuides}
          />
        </div>
      </section>
      <HomeFaqSession />

      {/* SEO Text Section */}
      <section className="py-24 px-[5%] bg-white">
        <div className="container mx-auto max-w-5xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-8 text-primary leading-tight">
              {t.home_seo_section?.title}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.home_seo_section?.intro}
            </p>
          </motion.div>

          <div className="grid gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                <span className="h-1 w-8 bg-gold rounded-full"></span>
                {t.home_seo_section?.destinations_title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.home_seo_section?.destinations_text}
              </p>

              <h3 className="text-2xl font-bold text-primary flex items-center gap-3 pt-6">
                <span className="h-1 w-8 bg-gold rounded-full"></span>
                {t.home_seo_section?.activities_title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.home_seo_section?.activities_text}
              </p>
              <ul className="space-y-3">
                {t.home_seo_section?.activities_list?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                <span className="h-1 w-8 bg-gold rounded-full"></span>
                {t.home_seo_section?.differentiators_title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.home_seo_section?.differentiators_text}
              </p>
              <ul className="space-y-4">
                {t.home_seo_section?.differentiators_list?.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-4 rounded-2xl bg-primary/5 p-4 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium text-primary/80">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold text-primary flex items-center gap-3 pt-6">
                <span className="h-1 w-8 bg-gold rounded-full"></span>
                {t.home_seo_section?.safety_title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.home_seo_section?.safety_text}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New SEO Rich Text Section (Keyword Rich) */}
      <section id="destinations" className="py-24 px-[5%] bg-primary/5 border-t border-primary/10">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-primary leading-tight">
              {t.home_seo_rich_text?.destinations_title}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              {t.home_seo_rich_text?.destinations_paragraph}
            </p>

            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
              {t.home_seo_rich_text?.guides_title}
            </h3>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              {t.home_seo_rich_text?.guides_paragraph}
            </p>

            <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm">
              <p className="text-sm font-bold text-primary uppercase tracking-wider mb-6">Destinos Destacados</p>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                {t.home_seo_rich_text?.destinations_list?.map((dest: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-primary/80 font-semibold group cursor-default">
                    <span className="w-2 h-2 rounded-full bg-gold group-hover:scale-125 transition-transform"></span>
                    {dest}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomeContent;

