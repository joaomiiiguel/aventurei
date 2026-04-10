import { Metadata } from "next";
const siteConfig = {
  name: "Aventurei",
  description: "Descubre aventuras únicas en España con guías locales expertos. Senderismo, rápel, rafting, escalada y más. Reserva tu próxima experiencia en la naturaleza con seguridad.",
  url: "https://aventurei.es",
  ogImage: "https://aventurei.es/og-image.png",
  keywords: [
    "turismo activo",
    "aventura españa",
    "guías locales",
    "senderismo",
    "escalada",
    "ecoturismo",
    "turismo activo españa",
    "ecoturismo Espanha",
    "turismo sustentável Espanha",
    "turismo de natureza Espanha",
    "viagens ecológicas Espanha",
    "parques nacionais Espanha",
    "trilhas ecológicas Espanha",
    "observação de aves Espanha",
    "hospedagem ecológica Espanha",
    "eco lodges Espanha",
    "casas rurais sustentáveis Espanha",
    "melhores destinos ecoturismo Espanha",
    "roteiros natureza Espanha",
    "ecoturismo na Andaluzia",
    "ecoturismo na Catalunha",
    "ecoturismo em Picos de Europa",
    "ecoturismo em Doñana",
    "ecoturismo em Sierra Nevada",
    "ecoturismo nas Ilhas Baleares",
    "ecoturismo nas Ilhas Canárias",
    "trilhas na Espanha",
    "caminhadas em parques nacionais Espanha",
    "avistamento de linces ibéricos",
    "observação de baleias Espanha",
    "praias virgens Espanha",
    "turismo rural sustentável Espanha",
    "roteiro de ecoturismo 3 dias Espanha",
    "melhor época para ecoturismo Espanha",
    "guias de natureza Espanha",
    "atividades sustentáveis para crianças Espanha",
    "certificação ecológica Espanha"
  ],
};

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  slug?: string;
  lang?: string;
  keywords?: string[];
  noIndex?: boolean;
  verification?: {
    google?: string;
    yandex?: string;
    me?: string;
    other?: {
      [key: string]: string | string[];
    };
  };
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  slug = "",
  lang = "es",
  keywords = siteConfig.keywords,
  noIndex = false,
  verification,
}: MetadataProps = {}): Metadata {
  const cleanSlug = slug.startsWith('/') ? slug : `/${slug}`;
  const pathPart = cleanSlug === '/' ? '' : cleanSlug;
  const url = `${siteConfig.url}/${lang}${pathPart}`;
  const locale = lang === 'pt-br' ? 'pt_BR' : lang === 'en' ? 'en_US' : 'es_ES';

  return {
    title: title ? {
      absolute: `${title} | ${siteConfig.name}`,
    } : {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: keywords || siteConfig.keywords,
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale,
      url,
      title: title || siteConfig.name,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.name,
      description,
      images: [image],
      creator: "@aventurei.es",
    },
    alternates: {
      canonical: url,
      languages: {
        'pt-br': `${siteConfig.url}/pt-br${pathPart}`,
        'es': `${siteConfig.url}/es${pathPart}`,
        'en': `${siteConfig.url}/en${pathPart}`,
        'x-default': `${siteConfig.url}/es${pathPart}`,
      },
    },
    verification,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
