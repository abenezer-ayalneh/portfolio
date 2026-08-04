import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionWrapper } from '@/components/shared/section-wrapper'
import { ProjectFeatureRow } from '@/components/projects/project-feature-row'
import { projects } from '@/data/projects'
import { Github } from '@/components/icons/brand-icons'

export const metadata: Metadata = {
	title: 'Projects',
	description: 'Project case studies by Abenezer Ayalneh — real-time systems, multiplayer games, and full-stack web applications.',
}

export default function ProjectsPage() {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="relative overflow-hidden py-20 lg:py-28" aria-labelledby="projects-heading">
				<div
					className="pointer-events-none absolute inset-0 -z-10 bg-grid"
					style={{
						maskImage: 'radial-gradient(ellipse 60% 80% at 50% 0%, black, transparent)',
						WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 50% 0%, black, transparent)',
					}}
				/>
				<div
					className="pointer-events-none absolute inset-0 -z-10"
					style={{
						background: 'radial-gradient(ellipse 60% 50% at 50% 0%, hsl(var(--primary) / 0.12), transparent 70%)',
					}}
				/>
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					<SectionWrapper>
						<Link
							href="/"
							className="mb-6 inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-primary">
							<ArrowLeft className="h-3.5 w-3.5" /> ~/home
						</Link>
						<p className="mb-3 font-mono text-sm text-primary">
							<span className="text-primary/50">{'//'}</span> work
						</p>
						<h1 id="projects-heading" className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Projects
						</h1>
						<p className="mt-4 max-w-2xl text-lg text-muted-foreground">
							A selection of projects I&apos;ve built — from real-time multiplayer games to full-stack web applications. Each one is a problem I found
							worth solving.
						</p>
					</SectionWrapper>
				</div>
			</section>

			{/* Project feature rows */}
			<section className="pb-20 lg:pb-28" aria-label="All projects">
				<div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6 lg:space-y-28 lg:px-8">
					<h2 className="sr-only">Project case studies</h2>
					{projects.map((project, index) => (
						<SectionWrapper key={project.title}>
							<ProjectFeatureRow project={project} index={index} />
						</SectionWrapper>
					))}
				</div>

				{/* GitHub CTA */}
				<div className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
					<SectionWrapper className="text-center">
						<div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-border/50 bg-card/30 p-8">
							<p className="text-muted-foreground">Want to see more? Check out my GitHub for all public repositories.</p>
							<Button variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary" asChild>
								<a
									href="https://github.com/abenezer-ayalneh"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="GitHub profile — opens in new tab">
									<Github className="h-4 w-4" /> View GitHub Profile
								</a>
							</Button>
						</div>
					</SectionWrapper>
				</div>
			</section>
		</div>
	)
}
