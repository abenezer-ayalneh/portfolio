import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/data/social'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ path: '/', priority: 1, changeFrequency: 'monthly' as const },
		{ path: '/projects', priority: 0.8, changeFrequency: 'monthly' as const },
		{ path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
		{ path: '/resume.pdf', priority: 0.9, changeFrequency: 'monthly' as const },
		{ path: '/llms.txt', priority: 0.9, changeFrequency: 'monthly' as const },
		{ path: '/llms-full.txt', priority: 0.9, changeFrequency: 'monthly' as const },
		{ path: '/profile.json', priority: 0.8, changeFrequency: 'monthly' as const },
	].map(({ path, ...metadata }) => ({
		url: new URL(path, SITE_CONFIG.url).href,
		lastModified: SITE_CONFIG.lastUpdated,
		...metadata,
	}))
}
