import type { MetadataRoute } from 'next'
import { prompts } from '@/lib/prompts-data'

const SITE = 'https://crazysimpleyoutube.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/prompts`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/worksheets`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/gear`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/community`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/work-with-me`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/book2`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/bonus`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const promptPages: MetadataRoute.Sitemap = prompts.map((p) => ({
    url: `${SITE}/prompts/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...promptPages]
}
