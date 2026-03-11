import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/menu/',
    '/hotel/',
    '/contact/',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Turkish routes
  routes.forEach((route) => {
    sitemap.push({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          'en': `${siteConfig.url}/en${route}`,
        },
      },
    });
  });

  // English routes
  routes.forEach((route) => {
    sitemap.push({
      url: `${siteConfig.url}/en${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 0.9 : 0.7,
    });
  });

  return sitemap;
}
