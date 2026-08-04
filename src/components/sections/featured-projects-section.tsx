import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/section-heading'
import { SectionWrapper } from '@/components/shared/section-wrapper'
import { ProjectFeatureRow } from '@/components/projects/project-feature-row'
import { projects } from '@/data/projects'

const featured = projects.filter((p) => p.featured)

export function FeaturedProjectsSection() {
	return (
		<section id="work" aria-labelledby="work-heading" className="py-20 lg:py-28">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<SectionWrapper>
					<SectionHeading
						index="01"
						eyebrow="selected work"
						title="Featured projects"
						titleId="work-heading"
						description="A few things I've built and shipped — spanning real-time collaboration, multiplayer systems, and full-stack web products."
						className="mb-16"
					/>
				</SectionWrapper>

				<div className="space-y-20 lg:space-y-28">
					{featured.map((project, index) => (
						<SectionWrapper key={project.title}>
							<ProjectFeatureRow project={project} index={index} />
						</SectionWrapper>
					))}
				</div>

				<SectionWrapper className="mt-16">
					<Button variant="outline" size="lg" className="gap-2 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary" asChild>
						<Link href="/projects">
							View all projects <ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</SectionWrapper>
			</div>
		</section>
	)
}
