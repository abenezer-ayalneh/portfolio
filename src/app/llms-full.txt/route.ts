import { renderLlmsFullText } from '@/lib/public-profile'

export const dynamic = 'force-static'
export const revalidate = 86400

export function GET() {
	return new Response(renderLlmsFullText(), {
		status: 200,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Content-Language': 'en',
			'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
			'X-Robots-Tag': 'index, follow',
		},
	})
}
