import GuideContent from "@/components/Views/GuideContent"
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Person, WithContext } from "schema-dts";
import { locales } from "@/lib/i18n-config";
import { createClient } from "@/utils/supabase/server";
import { createClient as createStaticClient } from "@/utils/supabase/static";
import { getStorageUrl } from "@/utils/supabase/storage";

export const revalidate = 3600; // 1 hour ISR

interface PageProps {
    params: Promise<{ lang: string; guide_id: string }>;
}

export async function generateStaticParams() {
    const supabase = createStaticClient();
    const { data: users } = await supabase
        .from('profiles')
        .select('nickname')
        .eq('profile', 'guide')
        .not('nickname', 'is', null);

    if (!users) return [];

    return locales.flatMap(lang =>
        users.map((user) => ({
            lang,
            guide_id: user.nickname,
        }))
    );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { guide_id, lang } = await params;
    const supabase = createStaticClient();

    const { data: guide } = await supabase
        .from('profiles')
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
        title: `${guide.name || guide.nickname} - Guia de Aventura | Aventurei`,
        description: (guide.short_description || guide.description || "").substring(0, 160),
        openGraph: {
            title: `${guide.name} - Guia Profissional`,
            description: guide.short_description || guide.description,
            images: [getStorageUrl('users', guide.avatar) || "/og-image.jpg"],
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
    const supabase = await createClient();

    const { data: guide } = await supabase
        .from('profiles')
        .select('*')
        .eq('nickname', guide_id)
        .single();

    if (!guide) {
        notFound();
    }

    const jsonLd: WithContext<Person> & { aggregateRating?: any } = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: guide.name,
        image: getStorageUrl('users', guide.avatar),
        description: guide.short_description || guide.description,
        jobTitle: "Guia de Aventura",
        address: {
            "@type": "PostalAddress",
            addressLocality: `${guide.city}, ${guide.uf}`
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: guide.rating || 5,
            reviewCount: guide.review_count || 0
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