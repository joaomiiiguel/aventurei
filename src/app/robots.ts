import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aventurei.es';

  return {
    rules: [{
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/', '/*/dashboard/', '/*/login/', '/*/se-un-guia/', '/*/sobre/'],
    },
    {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "Google-Extended",
          "anthropic-ai",
          "PerplexityBot"
        ],
        allow: "/",
        disallow: ['/private/', '/admin/', '/api/', '/*/dashboard/', '/*/login/'],
    }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
