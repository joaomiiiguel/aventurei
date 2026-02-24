import AboutView from "@/components/Views/AboutView";
import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const about = dict.about_page;

    return {
        title: about?.sobre_title || "Sobre o Aventurei Espanha",
        description: about?.sobre_p1?.substring(0, 160) || "Conectando pessoas apaixonadas por natureza, cultura e aventura.",
        alternates: {
            canonical: `/${lang}/sobre`,
            languages: {
                'pt-br': '/pt-br/sobre',
                'es': '/es/sobre',
                'en': '/en/sobre',
                'x-default': '/es/sobre',
            },
        },
        openGraph: {
            title: about?.sobre_title,
            description: about?.sobre_p1?.substring(0, 160),
            url: `https://aventurei.es/${lang}/sobre`,
            siteName: 'Aventurei',
            locale: lang === 'pt-br' ? 'pt_BR' : lang === 'en' ? 'en_US' : 'es_ES',
            type: 'website',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Sobre Aventurei',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: about?.sobre_title,
            description: about?.sobre_p1?.substring(0, 160),
            images: ['/og-image.jpg'],
        },
    };
}

export default function SobrePage() {
    return <AboutView />;
}
