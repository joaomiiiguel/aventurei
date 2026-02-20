import GuideContent from "@/components/Views/GuideContent"
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Person, WithContext } from "schema-dts";
import { locales } from "@/lib/i18n-config";
import { createClient } from "@supabase/supabase-js";
import { getGuideById } from "@/data/mockData";

// Force static generation for these paths, but allow ISR for new ones if needed
export const revalidate = 3600; // 1 hour ISR

interface PageProps {
    params: Promise<{ lang: string; guide_id: string }>;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateStaticParams() {
    // No need to await createClient here as we use the static instance defined above
    const { data: users } = await supabase
        .from('users')
        .select('nickname')
        .not('nickname', 'is', null);

    if (!users) return [];

    // Generate params for all locales and all guides with nicknames
    return locales.flatMap(lang =>
        users.map((user) => ({
            lang,
            guide_id: user.nickname,
        }))
    );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { guide_id, lang } = await params;

    const { data: guide } = await supabase
        .from('users')
        .select('*')
        .eq('nickname', guide_id)
        .single();

    if (!guide) {
        return {
            title: "Guia não encontrado",
            description: "O guia que você procura não foi encontrado."
        };
    }

    return {
        title: `${guide.name} - Guia de Aventura | Aventurei`,
        description: (guide.short_description || "").substring(0, 160),
        openGraph: {
            title: `${guide.name} - Guia Profissional`,
            description: guide.short_description,
            images: [guide.avatar],
            type: "profile",
        },
        alternates: {
            canonical: `/${lang}/${guide.nickname}`,
            languages: {
                'pt-br': `/pt-br/${guide.nickname}`,
                'es': `/es/${guide.nickname}`,
                'en': `/en/${guide.nickname}`,
                'x-default': `/es/${guide.nickname}`,
            },
        }
    };
}

const GuidePage = async ({ params }: PageProps) => {
    const { guide_id, lang } = await params;
    let guide = null

    const { data: guideData } = await supabase
        .from('users')
        .select('*')
        .eq('nickname', guide_id)
        .single();

    if (!guideData) {
        const userMocked = await getGuideById(guide_id)
        if (!userMocked) {
            notFound();
        }
        guide = userMocked
    } else {
        guide = guideData
    }

    const jsonLd: WithContext<Person> & { aggregateRating?: any } = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: guide.name,
        image: guide.avatar,
        description: guide.short_description,
        jobTitle: "Guia de Aventura",
        address: {
            "@type": "PostalAddress",
            addressLocality: `${guide.city}, ${guide.UF}`
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: guide.rating || 5,
            reviewCount: guide.reviewCount || 0
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <GuideContent guide={guide} lang={lang} />
        </>
    );
};

export default GuidePage;