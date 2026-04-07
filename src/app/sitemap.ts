import { MetadataRoute } from 'next';
import { createClient as createStaticClient } from '@/utils/supabase/static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient();
  
  // Normalize the base URL to prevent double slashes (removes trailing slash if present)
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aventurei.es';
  const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

  const getAlternates = (translations: Record<string, string>) => {
    const alternates: Record<string, string> = {};
    Object.entries(translations).forEach(([lang, p]) => {
      // Ensure the path starts with a single slash
      const cleanPath = p.startsWith('/') ? p : `/${p}`;
      alternates[lang] = `${baseUrl}${cleanPath}`;
    });
    return alternates;
  };

  // Static routes with language alternates
  const staticRouteDefinitions = [
    {
      defaults: { 'pt-br': 'pt-br', 'es': 'es', 'en': 'en' },
      priority: 1,
    },
    {
      defaults: { 'pt-br': 'pt-br/sobre', 'es': 'es/sobre', 'en': 'en/sobre' },
      priority: 0.7,
    },
    {
      defaults: { 'pt-br': 'pt-br/se-un-guia', 'es': 'es/se-un-guia', 'en': 'en/se-un-guia' },
      priority: 0.8,
    },
  ];

  const staticRoutes: MetadataRoute.Sitemap = [];
  staticRouteDefinitions.forEach((route) => {
    Object.entries(route.defaults).forEach(([lang, path]) => {
      staticRoutes.push({
        url: `${baseUrl}/${path}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route.priority,
        alternates: {
          languages: getAlternates(route.defaults),
        },
      });
    });
  });

  // Dynamic Guide routes from real data
  const { data: guides } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('profile', 'guide');
  
  const guideRoutes: MetadataRoute.Sitemap = [];
  
  if (guides) {
    guides.forEach((guide) => {
      const translations = {
        'pt-br': `pt-br/${guide.nickname}`,
        'es': `es/${guide.nickname}`,
        'en': `en/${guide.nickname}`,
      };
      
      Object.entries(translations).forEach(([lang, path]) => {
        guideRoutes.push({
          url: `${baseUrl}/${path}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
          alternates: {
            languages: getAlternates(translations),
          },
        });
      });
    });
  }

  // Dynamic Adventure routes from real data
  const { data: adventures } = await supabase
    .from('adventures')
    .select('slug, nickname');
    
  const adventureRoutes: MetadataRoute.Sitemap = [];

  if (adventures) {
    adventures.forEach((adventure) => {
      const translations = {
        'pt-br': `pt-br/${adventure.nickname}/${adventure.slug}`,
        'es': `es/${adventure.nickname}/${adventure.slug}`,
        'en': `en/${adventure.nickname}/${adventure.slug}`,
      };

      Object.entries(translations).forEach(([lang, path]) => {
        adventureRoutes.push({
          url: `${baseUrl}/${path}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.9,
          alternates: {
            languages: getAlternates(translations),
          },
        });
      });
    });
  }

  return [...staticRoutes, ...guideRoutes, ...adventureRoutes];
}
