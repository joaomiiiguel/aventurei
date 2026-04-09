import FaqView from "@/components/Views/FaqView";
import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const faq = dict.faq_section;

    return {
        title: faq?.title || "FAQ - Aventurei",
        description: faq?.description || "Perguntas frequentes sobre o Aventurei.",
        alternates: {
            canonical: `/${lang}/faq`,
            languages: {
                'pt-br': '/pt-br/faq',
                'es': '/es/faq',
                'en': '/en/faq',
                'x-default': '/es/faq',
            },
        },
        openGraph: {
            title: faq?.title,
            description: faq?.description,
            url: `https://aventurei.es/${lang}/faq`,
            siteName: 'Aventurei',
            locale: lang === 'pt-br' ? 'pt_BR' : lang === 'en' ? 'en_US' : 'es_ES',
            type: 'website',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'FAQ Aventurei',
                },
            ],
        },
    };
}

export default function FaqPage() {
    return <FaqView />;
}
