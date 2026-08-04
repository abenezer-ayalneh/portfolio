import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import './globals.css'

// Three-role type system: Inter (body), Space Grotesk (display), JetBrains Mono
// (the terminal motif — labels, tags, eyebrows). See CONTEXT.md.
const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
})

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-display',
})

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://abenezer-ayalneh.dev'),
	manifest: '/site.webmanifest',
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/logo.svg', type: 'image/svg+xml' },
			{ url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
			{ url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
		],
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
	title: {
		default: 'Abenezer Ayalneh — Full-Stack Developer',
		template: '%s | Abenezer Ayalneh',
	},
	description: 'Full-Stack Developer with 5+ years of experience building scalable web applications using TypeScript, Angular, Nest.js, React, and Next.js.',
	keywords: ['Full-Stack Developer', 'TypeScript', 'Angular', 'Nest.js', 'React', 'Next.js', 'Portfolio', 'Abenezer Ayalneh'],
	authors: [{ name: 'Abenezer Ayalneh' }],
	creator: 'Abenezer Ayalneh',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://abenezer-ayalneh.dev',
		title: 'Abenezer Ayalneh — Full-Stack Developer',
		description:
			'Full-Stack Developer with 5+ years of experience building scalable web applications using TypeScript, Angular, Nest.js, React, and Next.js.',
		siteName: 'Abenezer Ayalneh Portfolio',
		images: [
			{
				url: '/og.png',
				width: 1200,
				height: 630,
				alt: 'Abenezer Ayalneh — Full-Stack Developer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Abenezer Ayalneh — Full-Stack Developer',
		description:
			'Full-Stack Developer with 5+ years of experience building scalable web applications using TypeScript, Angular, Nest.js, React, and Next.js.',
		images: ['/og.png'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
			<head>
				<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable portfolio summary" />
				<link rel="alternate" type="text/plain" href="/llms-full.txt" title="Complete LLM-readable professional profile" />
				<link rel="alternate" type="application/json" href="/profile.json" title="Machine-readable professional profile" />
			</head>
			<body className="min-h-screen bg-background font-sans antialiased">
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<div className="relative flex min-h-screen flex-col">
						<Navbar />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
					<Toaster richColors position="top-right" />
				</ThemeProvider>
			</body>
		</html>
	)
}
