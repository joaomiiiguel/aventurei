import AdventureContent from "@/components/Views/AdventureContent";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Product, BreadcrumbList, WithContext } from "schema-dts";
import { locales } from "@/lib/i18n-config";
import { createClient } from "@/utils/supabase/server";
import { createClient as createStaticClient } from "@/utils/supabase/static";

export const revalidate = 43200; // 12 hours ISR

interface PageProps {
  params: Promise<{
    lang: string;
    guide_id: string;
    adventure_name: string;
  }>;
}

export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data: adventures } = await supabase
    .from('adventures')
    .select('slug, nickname');

  if (!adventures) return [];

  // Generate params for all locales and all adventures
  return locales.flatMap(lang =>
    adventures.map((adventure) => ({
      lang,
      guide_id: adventure.nickname,
      adventure_name: adventure.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { adventure_name, lang } = await params;
  const supabase = createStaticClient();
  
  const { data: adventure } = await supabase
    .from('adventures')
    .select('*')
    .eq('slug', adventure_name)
    .single();

  if (!adventure) {
    return {
      title: "Passeio não encontrado",
      description: "O passeio que você procura não foi encontrado."
    };
  }

  return {
    title: `${adventure.title} | Aventurei`,
    description: (adventure.description || "").substring(0, 160),
    openGraph: {
      title: adventure.title,
      description: adventure.description,
      images: [adventure.cover_img || ""],
      type: "website",
    },
    alternates: {
      canonical: `/${lang}/${adventure.nickname}/${adventure.slug}`,
      languages: {
        'pt-br': `/pt-br/${adventure.nickname}/${adventure.slug}`,
        'es': `/es/${adventure.nickname}/${adventure.slug}`,
        'en': `/en/${adventure.nickname}/${adventure.slug}`,
        'x-default': `/es/${adventure.nickname}/${adventure.slug}`,
      },
    }
  };
}

const AdventurePage = async ({ params }: PageProps) => {
  const { adventure_name, lang, guide_id } = await params;
  const supabase = createStaticClient();

  const { data: adventure } = await supabase
    .from('adventures')
    .select('*')
    .eq('slug', adventure_name)
    .single();

  const { data: guide } = await supabase
    .from('profiles')
    .select('*')
    .eq('nickname', guide_id)
    .single();

  if (!adventure || !guide) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aventurei.es';

  // 1. Product Schema
  const productJsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: adventure.title,
    image: adventure.cover_img || "",
    description: adventure.description,
    offers: {
      "@type": "Offer",
      price: adventure.price || 0,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/${lang}/${guide.nickname}/${adventure.slug}`
    },
  };

  // 2. Breadcrumb Schema
  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === 'pt-br' ? "Início" : "Inicio",
        item: `${baseUrl}/${lang}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: guide.name,
        item: `${baseUrl}/${lang}/${guide.nickname}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: adventure.title,
        item: `${baseUrl}/${lang}/${guide.nickname}/${adventure.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AdventureContent adventure={adventure} guide={guide} lang={lang} />
    </>
  );
};

export default AdventurePage;
