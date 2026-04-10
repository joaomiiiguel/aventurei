import { Layout } from "@/components/Layout/Layout";
import HomeContent from "@/components/Views/HomeContent";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { createClient as createStaticClient } from "@/utils/supabase/static";

export const revalidate = 3600; // 1 hour ISR

interface LangPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: LangPageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return constructMetadata({
    title: dict.metadata_title || "Aventurei | Turismo de Aventura en España - Guías Locales y Ecoturismo",
    description: dict.metadata_description || "Conecta con guías certificados en España. Haz senderismo, escalada o rafting con seguridad y precio justo. Sin tasas abusivas. ¡Reserva tu aventura hoy!",
    lang,
    slug: "/",
  });
}

/**
 * Root page for [lang] route - Renders the home page directly
 */
export default async function LangPage({ params }: LangPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Aventurei",
      "url": `https://aventurei.es/${lang}`,
      "description": dict.metadata_description,
      "publisher": {
        "@type": "Organization",
        "name": "Aventurei",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.aventurei.es/LogoBranco.png"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Aventurei",
      "image": "https://www.aventurei.es/LogoBranco.png",
      "url": `https://aventurei.es/${lang}`,
      "description": dict.metadata_description,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ES"
      }
    }
  ];

  const supabase = createStaticClient();

  // Fetch initial guides for ISR
  const { data: initialGuides } = await supabase
    .from("profiles")
    .select("id, name, nickname, avatar, city, uf, modalities, description, rating")
    .eq("profile", "guide")
    .eq("status", true); // Using status like the API does

  // Fetch initial adventures for ISR
  const { data: initialAdventures } = await supabase
    .from("adventures")
    .select(`
      *,
      guide:profiles!adventures_nickname_fkey (
        name,
        avatar
      )
    `)
    .order("created_at", { ascending: false });

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent
        initialAdventures={initialAdventures || []}
        initialGuides={initialGuides || []}
      />
    </Layout>
  );
}
