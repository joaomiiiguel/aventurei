import FaqView from "@/components/Views/FaqView";
import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { constructMetadata } from "@/lib/seo";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const faq = dict.faq_section;

    return constructMetadata({
        title: faq?.title || "FAQ - Aventurei",
        description: faq?.description || "Perguntas frequentes sobre o Aventurei.",
        lang,
        slug: "/faq",
    });
}

export default function FaqPage() {
    return <FaqView />;
}
