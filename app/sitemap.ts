import type { MetadataRoute } from 'next'

const routes = [
  '',
  '/about',
  '/careers',
  '/contact',
  '/faq',
  '/for-parents',
  '/for-schools',
  '/how-it-works',
  '/live-tracking',
  '/our-fleet',
  '/partners',
  '/privacy-policy',
  '/safety',
  '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://www.tranzita.africa${route}`,
    lastModified: new Date(),
    changeFrequency: route ? 'weekly' : 'daily',
    priority: route ? 0.7 : 1,
  }))
}
