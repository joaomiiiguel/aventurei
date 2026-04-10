import AboutView from "@/components/Views/AboutView";
import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { constructMetadata } from "@/lib/seo";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const about = dict.about_page;

    return constructMetadata({
        title: about?.sobre_title || "Sobre o Aventurei Espanha",
        description: about?.sobre_p1?.substring(0, 160) || "Conectando pessoas apaixonadas por natureza, cultura e aventura.",
        lang,
        slug: "/sobre",
    });
}

export default function SobrePage() {
    return <AboutView />;
}
