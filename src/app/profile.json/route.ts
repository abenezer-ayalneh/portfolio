import { publicProfile } from '@/lib/public-profile'

export const dynamic = 'force-static'
export const revalidate = 86400

export function GET() {
	return Response.json(publicProfile, {
		status: 200,
		headers: {
			'Content-Language': 'en',
			'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
			'X-Robots-Tag': 'index, follow',
		},
	})
}
