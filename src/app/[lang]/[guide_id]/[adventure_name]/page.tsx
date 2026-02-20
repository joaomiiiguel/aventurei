import AdventureContent from "@/components/Views/AdventureContent";
import { MockDataService } from "@/data/mockData";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Product, WithContext } from "schema-dts";
import { locales } from "@/lib/i18n-config";

export const revalidate = 43200; // 12 hours ISR

interface PageProps {
  params: Promise<{
    lang: string;
    guide_id: string;
    adventure_name: string;
  }>;
}

export async function generateStaticParams() {
  const adventures = await MockDataService.getAllAdventures();

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
  const adventure = await MockDataService.getAdventureBySlug(adventure_name);

  if (!adventure) {
    return {
      title: "Passeio não encontrado",
      description: "O passeio que você procura não foi encontrado."
    };
  }

  return {
    title: `${adventure.name} - Aventura Inesquecível | Aventurei`,
    description: adventure.description.substring(0, 160),
    openGraph: {
      title: adventure.name,
      description: adventure.description,
      images: [adventure.imageUrl],
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
  const { adventure_name, lang } = await params;
  const adventure = await MockDataService.getAdventureBySlug(adventure_name);

  if (!adventure) {
    notFound();
  }

  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: adventure.name,
    image: adventure.imageUrl,
    description: adventure.description,
    offers: {
      "@type": "Offer",
      price: adventure.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: adventure.rating,
      reviewCount: adventure.reviewCount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdventureContent slug={adventure_name} lang={lang} />
    </>
  );
};

export default AdventurePage;
