// app/[lang]/(marketing)/seja-um-guia/page.jsx

import { Layout } from '@/components/Layout/Layout';
import BecomeGuideContent from '@/components/Views/BecomeGuideContent';
import { getDictionary } from '@/lib/dictionary'

interface SeUnGuiaPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: SeUnGuiaPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang)

  return {
    title: dict.be_a_guide,
    description: dict.be_a_guide,
    alternates: {
      canonical: `/${lang}/se-un-guia`,
      languages: {
        'pt-br': `/pt-br/se-un-guia`,
        'es': `/es/se-un-guia`,
        'en': `/en/se-un-guia`,
        'x-default': `/es/se-un-guia`
      }
    }
  }
}

export default async function SejaUmGuiaPage({ params }: SeUnGuiaPageProps) {
  const { lang } = await params;

  return (
    <Layout>
      <BecomeGuideContent lang={lang} />
    </Layout>
  )
}