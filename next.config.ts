import type { NextConfig } from 'next'
import { execFileSync } from 'node:child_process'

const profileLastUpdated = execFileSync(process.execPath, ['scripts/profile-last-updated.mjs'], { encoding: 'utf8' }).trim()

const nextConfig: NextConfig = {
	env: {
		NEXT_PUBLIC_PROFILE_LAST_UPDATED: profileLastUpdated,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
}

export default nextConfig
