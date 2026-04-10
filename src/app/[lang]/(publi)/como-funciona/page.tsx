import HowItWorksView from "@/components/Views/HowItWorksView";
import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { constructMetadata } from "@/lib/seo";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const section = dict.how_it_works_section;

    return constructMetadata({
        title: section?.title || "Como Funciona - Aventurei",
        description: section?.description || "Saiba como o Aventurei conecta você às melhores aventuras.",
        lang,
        slug: "/como-funciona",
    });
}

export default function ComoFuncionaPage() {
    return <HowItWorksView />;
}
