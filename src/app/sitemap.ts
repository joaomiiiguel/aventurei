import { MockDataService } from '@/data/mockData';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aventurei.es';

  // Static routes
  const routes = [
    '',
    '/sobre',
    '/contato',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // Dynamic Guide routes
  const guides = await MockDataService.getAllGuides();
  const guideRoutes = guides.map((guide) => ({
    url: `${baseUrl}/${guide.id}`, // Or guide.slug depending on routing strategy
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic Adventure routes
  const adventures = await MockDataService.getAllAdventures();
  const adventureRoutes = adventures.map((adventure) => ({
    url: `${baseUrl}/${adventure.guideId}/${adventure.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...guideRoutes, ...adventureRoutes];
}
