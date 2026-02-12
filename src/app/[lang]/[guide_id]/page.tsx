import GuideContent from "@/components/Views/GuideContent"
import { MockDataService } from "@/services/mockData";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Person, WithContext } from "schema-dts";
import { locales } from "@/lib/i18n-config";

// Force static generation for these paths, but allow ISR for new ones if needed (fallback: 'blocking' is default for generateStaticParams in App Router if not specified, but we can be explicit if we want strict SSG)
// export const dynamicParams = true; // Default

export const revalidate = 86400; // 24 hours ISR

interface PageProps {
    params: Promise<{ lang: string; guide_id: string }>;
}

export async function generateStaticParams() {
    const guides = await MockDataService.getAllGuides();
    
    // Generate params for all locales and all guides
    return locales.flatMap(lang => 
        guides.map((guide) => ({
            lang,
            guide_id: guide.id,
        }))
    );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { guide_id } = await params;
    const guide = await MockDataService.getGuideById(guide_id);

    if (!guide) {
        return {
            title: "Guia não encontrado",
            description: "O guia que você procura não foi encontrado."
        };
    }

    return {
        title: `${guide.name} - Guia de Aventura | Aventurei`,
        description: guide.bio.substring(0, 160),
        openGraph: {
            title: `${guide.name} - Guia Profissional`,
            description: guide.bio,
            images: [guide.avatar],
            type: "profile",
        },
        alternates: {
            canonical: `/guia/${guide.id}`, // Assuming canonical URL structure
        }
    };
}

const GuidePage = async ({ params }: PageProps) => {
    const { guide_id } = await params;
    const guide = await MockDataService.getGuideById(guide_id);

    if (!guide) {
        notFound();
    }

    const jsonLd: WithContext<Person> & { aggregateRating?: any } = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: guide.name,
        image: guide.avatar,
        description: guide.bio,
        jobTitle: "Guia de Aventura",
        address: {
            "@type": "PostalAddress",
            addressLocality: guide.location
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: guide.rating,
            reviewCount: guide.reviewCount
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <GuideContent guideId={guide_id} />
        </>
    );
};

export default GuidePage;