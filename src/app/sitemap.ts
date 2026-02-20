import { MockDataService } from '@/data/mockData';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aventurei.es';

  const defaultLanguages = {
    'pt-br': 'pt-br',
    'es': 'es',
    'en': 'en',
  };

  const getAlternates = (path: string, translations: Record<string, string>) => {
    const alternates: Record<string, string> = {};
    Object.entries(translations).forEach(([lang, p]) => {
      alternates[lang] = `${baseUrl}/${p}`;
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
      defaults: { 'pt-br': 'pt-br/sobre', 'es': 'es/sobre', 'en': 'en/about' },
      priority: 0.7,
    },
    {
      defaults: { 'pt-br': 'pt-br/contato', 'es': 'es/contacto', 'en': 'en/contact' },
      priority: 0.7,
    },
    {
      defaults: { 'pt-br': 'pt-br/seja-um-guia', 'es': 'es/se-un-guia', 'en': 'en/become-a-guide' },
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
          languages: getAlternates('', route.defaults),
        },
      });
    });
  });

  // Dynamic Guide routes
  const guides = await MockDataService.getAllGuides();
  const guideRoutes: MetadataRoute.Sitemap = [];
  
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
          languages: getAlternates('', translations),
        },
      });
    });
  });

  // Dynamic Adventure routes
  const adventures = await MockDataService.getAllAdventures();
  const adventureRoutes: MetadataRoute.Sitemap = [];

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
          languages: getAlternates('', translations),
        },
      });
    });
  });

  return [...staticRoutes, ...guideRoutes, ...adventureRoutes];
}
