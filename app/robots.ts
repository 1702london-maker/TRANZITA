import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/dashboard', '/api'],
    },
    sitemap: 'https://www.tranzita.africa/sitemap.xml',
  }
}
