import type { StaticImageData } from 'next/image'
import huddle1 from '@/assets/images/project-mockups/huddle/1.png'
import huddle2 from '@/assets/images/project-mockups/huddle/2.png'
import huddle3 from '@/assets/images/project-mockups/huddle/3.png'
import huddle4 from '@/assets/images/project-mockups/huddle/4.png'
import lynx1 from '@/assets/images/project-mockups/lynx/1.png'
import lynx2 from '@/assets/images/project-mockups/lynx/2.png'
import lynx3 from '@/assets/images/project-mockups/lynx/3.png'
import lynx4 from '@/assets/images/project-mockups/lynx/4.png'
import lynx5 from '@/assets/images/project-mockups/lynx/5.png'
import lynx6 from '@/assets/images/project-mockups/lynx/6.png'
import triads1 from '@/assets/images/project-mockups/triads/1.png'
import triads2 from '@/assets/images/project-mockups/triads/2.png'
import triads3 from '@/assets/images/project-mockups/triads/3.png'
import freeDemoKit1 from '@/assets/images/project-mockups/free-demo-kit/1.png'
import freeDemoKit2 from '@/assets/images/project-mockups/free-demo-kit/2.png'
import freeDemoKit3 from '@/assets/images/project-mockups/free-demo-kit/3.png'

export interface ProjectEntry {
	title: string
	shortDescription: string
	description: string
	problem: string
	solution: string
	techStack: string[]
	liveUrl?: string
	githubUrl?: string
	featured: boolean
	/**
	 * Project screenshots shown as a swipeable gallery in the visual half of the
	 * feature row. Prefer imported assets from `src/assets/` (optimized + no 404
	 * risk); plain `public/` URL strings (e.g. `/projects/lynx-1.png`) also work.
	 * A single entry renders as a static image (no arrows/dots); multiple entries
	 * enable the carousel. When omitted or empty, a branded placeholder is
	 * rendered instead — drop the images in to upgrade.
	 */
	images?: (string | StaticImageData)[]
}

export const projects: ProjectEntry[] = [
	{
		title: 'Huddle — Self-Hosted Video Conferencing',
		shortDescription: 'A self-hosted, browser-based video conferencing app built on LiveKit.',
		description:
			'A real-time video conferencing solution that puts you in control. Schedule meetings, create instant rooms, and collaborate with crystal-clear video and audio. Guests join with just a link — no accounts, no installs required.',
		problem:
			'Cloud-based video platforms compromise your privacy, lock you into their ecosystem, and charge for features you need. You want real-time collaboration without sacrificing control or paying recurring fees.',
		solution:
			'Built a complete self-hosted video conferencing solution using LiveKit for WebRTC media, NestJS for token management and room services, and Next.js for the frontend. Users can host their own meetings with full control over infrastructure and data.',
		techStack: ['Next.js', 'React', 'TypeScript', 'Nest.js', 'LiveKit', 'Redis', 'PostgreSQL', 'Prisma', 'Docker', 'Caddy', 'Better Auth'],
		liveUrl: 'https://huddle.abenezer-ayalneh.dev',
		featured: true,
		images: [huddle1, huddle2, huddle3, huddle4],
	},
	{
		title: 'Lynx — Word Guessing Game',
		shortDescription: 'A real-time multiplayer word guessing game with voice communication.',
		description:
			'A fun game playable solo or with friends. Shows cue words with one common answer that players must guess. Supports real-time multiplayer and WebRTC-based voice chat between players.',
		problem: 'Classic word games lack real-time social interaction, making remote play feel disconnected and less engaging.',
		solution:
			'Built a synchronized multiplayer experience using Colyseus for real-time game state and LiveKit for WebRTC voice communication, enabling a fully social gameplay loop.',
		techStack: [
			'Angular',
			'TailwindCSS',
			'NgRx SignalStore',
			'Nest.js',
			'Node.js',
			'TypeScript',
			'Colyseus',
			'LiveKit',
			'PostgreSQL',
			'Prisma',
			'Docker',
			'nginx',
		],
		liveUrl: 'https://gametrix.org',
		featured: true,
		images: [lynx1, lynx2, lynx3, lynx4, lynx5, lynx6],
	},
	{
		title: 'Triads — Word Puzzle Game',
		shortDescription: 'A word puzzle game where players find hidden keywords connecting groups of three cue words.',
		description:
			'A single-player word puzzle game where 9 physics-driven floating word bubbles are shown on screen. Players must identify which groups of 3 cues share a hidden keyword (e.g. "SECOND-", "POKER", "SHAKE" → HAND). Solving the 3 initial triads unlocks a bonus 4th round where the discovered keywords become the new cues. Features difficulty levels, a hint system, score tracking, and lifetime statistics. Playable on web, iOS, and Android.',
		problem:
			'Word puzzle games often feel static and visually flat, with no sense of physicality or progression — and most require account creation just to play.',
		solution:
			'Built a fully accountless experience with physics-based floating bubbles (Matter.js) and fluid GSAP animations to make the puzzle feel alive. All player identity and statistics are stored locally, removing any friction to start playing. The backend stays stateless per player, focusing purely on serving and validating puzzle content.',
		techStack: [
			'Angular',
			'TailwindCSS',
			'DaisyUI',
			'NgRx Signals',
			'Capacitor',
			'Ionic',
			'Matter.js',
			'GSAP',
			'AG Charts',
			'Nest.js',
			'Node.js',
			'TypeScript',
			'PostgreSQL',
			'Prisma',
			'Docker',
			'PM2',
		],
		liveUrl: 'https://triads.gametrix.org',
		featured: true,
		images: [triads1, triads2, triads3],
	},
	{
		title: 'White-Label Sports Betting Platform',
		shortDescription: 'A fully-featured mobile-first sports betting application.',
		description:
			'A production-grade sports betting application supporting real-time price updates, bet placement, bet history, and a mobile-first responsive UI for a white-label client.',
		problem:
			'The client needed a white-label based sports betting frontend that could be skinned for multiple brands while supporting real-time market data over WebSockets.',
		solution:
			'Engineered an Angular + Ionic hybrid application with NgRx SignalStore for reactive state management and Web Workers for off-thread WebSocket processing, ensuring smooth UI performance under high-frequency data updates.',
		techStack: ['Angular', 'Ionic', 'TypeScript', 'NgRx SignalStore', 'TailwindCSS', 'WebSocket', 'Web Workers'],
		liveUrl: 'https://m.freedemokit.com',
		featured: false,
		images: [freeDemoKit1, freeDemoKit2, freeDemoKit3],
	},
	// {
	//   title: 'Portfolio Website',
	//   shortDescription: 'This portfolio — built with Next.js, shadcn/ui, and Framer Motion.',
	//   description:
	//     'A personal portfolio site built to showcase projects, work history, and skills. Designed with a focus on accessibility, performance, and modern UI/UX.',
	//   problem:
	//     'The previous portfolio was a Vite SPA with no routing, duplicated rendering logic, and no dark mode or accessibility support.',
	//   solution:
	//     'Migrated to Next.js 15 (App Router) with shadcn/ui components, next-themes for dark/light mode, react-hook-form + Zod for form validation, and Framer Motion for scroll-triggered animations.',
	//   techStack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'Framer Motion', 'Zod'],
	//   liveUrl: 'https://abenezer-ayalneh.dev',
	//   featured: false,
	// },
]
