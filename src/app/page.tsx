import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
import { StatsStrip } from '@/components/sections/stats-strip'
import { FeaturedProjectsSection } from '@/components/sections/featured-projects-section'
import { AboutSection } from '@/components/sections/about-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { SkillsSection } from '@/components/sections/skills-section'
import { CtaBand } from '@/components/sections/cta-band'
import { profileJsonLd } from '@/lib/public-profile'

export const metadata: Metadata = {
	title: 'Abenezer Ayalneh — Full-Stack Developer',
	description: 'Full-Stack Developer with 5+ years of experience building scalable web applications using TypeScript, Angular, React, and Nest.js.',
	alternates: {
		canonical: 'https://abenezer-ayalneh.dev',
	},
}

export default function HomePage() {
	const serializedProfileJsonLd = JSON.stringify(profileJsonLd).replace(/</g, '\\u003c')

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializedProfileJsonLd }} />
			<HeroSection />
			<StatsStrip />
			<FeaturedProjectsSection />
			<AboutSection />
			<ExperienceSection />
			<SkillsSection />
			<CtaBand />
		</>
	)
}
