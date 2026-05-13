import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/notes'],
      disallow: ['/api/'],
    },
    sitemap: 'https://yashvijaykar.com/sitemap.xml',
  };
}
