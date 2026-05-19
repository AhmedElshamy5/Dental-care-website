import type { MetadataRoute } from 'next'
import { services } from '@/lib/clinic-data'

const BASE_URL = 'https://bright-smile-dental-murex.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = services.map(s => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/book`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...servicePages,
  ]
}
