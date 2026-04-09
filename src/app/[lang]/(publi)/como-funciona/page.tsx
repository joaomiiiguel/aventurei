import HowItWorksView from "@/components/Views/HowItWorksView";
import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const section = dict.how_it_works_section;

    return {
        title: section?.title || "Como Funciona - Aventurei",
        description: section?.description || "Saiba como o Aventurei conecta você às melhores aventuras.",
        alternates: {
            canonical: `/${lang}/como-funciona`,
            languages: {
                'pt-br': '/pt-br/como-funciona',
                'es': '/es/como-funciona',
                'en': '/en/como-funciona',
                'x-default': '/es/como-funciona',
            },
        },
        openGraph: {
            title: section?.title,
            description: section?.description,
            url: `https://aventurei.es/${lang}/como-funciona`,
            siteName: 'Aventurei',
            locale: lang === 'pt-br' ? 'pt_BR' : lang === 'en' ? 'en_US' : 'es_ES',
            type: 'website',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Como Funciona Aventurei',
                },
            ],
        },
    };
}

export default function ComoFuncionaPage() {
    return <HowItWorksView />;
}
