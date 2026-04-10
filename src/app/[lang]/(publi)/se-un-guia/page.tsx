// app/[lang]/(marketing)/seja-um-guia/page.jsx

import { Layout } from '@/components/Layout/Layout';
import BecomeGuideContent from '@/components/Views/BecomeGuideContent';
import { getDictionary } from '@/lib/dictionary'
import { constructMetadata } from "@/lib/seo";

interface SeUnGuiaPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: SeUnGuiaPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang)

  return constructMetadata({
    title: `${dict.be_a_guide} | Aventurei`,
    description: dict.become_guide?.hero_description || dict.be_a_guide,
    lang,
    slug: "/se-un-guia",
  });
}

export default async function SejaUmGuiaPage({ params }: SeUnGuiaPageProps) {
  const { lang } = await params;

  return (
    <Layout>
      <BecomeGuideContent lang={lang} />
    </Layout>
  )
}