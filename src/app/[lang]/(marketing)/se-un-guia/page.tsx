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
    title: `${dict.be_a_guide} | Aventurei`,
    description: dict.become_guide?.hero_description || dict.be_a_guide,
    alternates: {
      canonical: `/${lang}/se-un-guia`,
      languages: {
        'pt-br': `/pt-br/se-un-guia`,
        'es': `/es/se-un-guia`,
        'en': `/en/se-un-guia`,
        'x-default': `/es/se-un-guia`
      }
    },
    openGraph: {
      title: `${dict.be_a_guide} | Aventurei`,
      description: dict.become_guide?.hero_description || dict.be_a_guide,
      url: `https://aventurei.es/${lang}/se-un-guia`,
      siteName: 'Aventurei',
      locale: lang === 'pt-br' ? 'pt_BR' : lang === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: dict.be_a_guide,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dict.be_a_guide} | Aventurei`,
      description: dict.become_guide?.hero_description || dict.be_a_guide,
      images: ['/og-image.jpg'],
    },
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