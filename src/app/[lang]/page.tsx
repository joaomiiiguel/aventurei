import { Layout } from "@/components/Layout/Layout";
import HomeContent from "@/components/Views/HomeContent";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { createClient as createStaticClient } from "@/utils/supabase/static";

export const revalidate = 3600; // 1 hour ISR

interface LangPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: LangPageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.metadata_title || "Aventurei - Descubre tu próxima aventura",
    description: dict.metadata_description || 'Conéctate con los mejores guías locales y explora destinos increíbles en España con seguridad y exclusividad.',
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'pt-br': '/pt-br',
        'es': '/es',
        'en': '/en',
        'x-default': '/es',
      },
    },
    openGraph: {
      title: dict.metadata_title,
      description: dict.metadata_description,
      url: `https://aventurei.es/${lang}`,
      siteName: 'Aventurei',
      locale: lang === 'pt-br' ? 'pt_BR' : lang === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Aventurei',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata_title,
      description: dict.metadata_description,
      images: ['/og-image.jpg'],
    },
  };
}

/**
 * Root page for [lang] route - Renders the home page directly
 */
export default async function LangPage({ params }: LangPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const jsonLd = {
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
        "url": "https://aventurei.es/logo.png"
      }
    }
  };

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
