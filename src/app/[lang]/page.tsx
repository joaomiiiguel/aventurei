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
    title: dict.metadata_title || "Aventurei - Descubre tu próxima aventura",
    description: dict.metadata_description || 'Descubre aventuras únicas en España con guías locales expertos. Senderismo, rápel, rafting, escalada y más. Reserva tu próxima experiencia en la naturaleza con seguridad.',
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
