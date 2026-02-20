import { Layout } from "@/components/Layout/Layout";
import HomeContent from "@/components/Views/HomeContent";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";

interface LangPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: LangPageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.metadata_title || "Aventurei - Descubra sua próxima aventura",
    description: dict.metadata_description || "Conecte-se com os melhores guias e explore destinos incríveis com segurança e exclusividade.",
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'pt-br': '/pt-br',
        'es': '/es',
        'en': '/en',
        'x-default': '/es',
      },
    }
  };
}

/**
 * Root page for [lang] route - Renders the home page directly
 */
export default async function LangPage({ params }: LangPageProps) {
  const { lang } = await params;

  return (
    <Layout>
      <HomeContent />
    </Layout>
  );
}
