import { ArrowUpRight } from 'lucide-react'
import { Github } from '@/components/icons/brand-icons'
import { Button } from '@/components/ui/button'
import { MonoTag } from '@/components/shared/mono-tag'
import { ProjectGallery } from '@/components/projects/project-gallery'
import { type ProjectEntry } from '@/data/projects'
import { cn } from '@/lib/utils'

interface ProjectFeatureRowProps {
	project: ProjectEntry
	index: number
}

/**
 * Full-width alternating project block (see "Feature row" in CONTEXT.md): a
 * browser-framed screenshot on one side, the write-up on the other. Even rows
 * put the visual on the left, odd rows on the right (desktop only).
 */
export function ProjectFeatureRow({ project, index }: ProjectFeatureRowProps) {
	const reversed = index % 2 === 1
	const number = String(index + 1).padStart(2, '0')
	const host = project.liveUrl?.replace(/^https?:\/\//, '') ?? project.title.toLowerCase()

	return (
		<article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
			{/* Visual */}
			<div className={cn('lg:order-1', reversed && 'lg:order-2')}>
				<div className="terminal-panel overflow-hidden rounded-xl">
					{/* Browser chrome */}
					<div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
						<span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
						<span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
						<span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
						<span className="ml-3 truncate font-mono text-xs text-muted-foreground">{host}</span>
					</div>

					{/* Gallery or branded placeholder */}
					<div className="relative aspect-[16/10] bg-gradient-to-br from-surface via-muted/40 to-background">
						{project.images && project.images.length > 0 ? (
							<ProjectGallery images={project.images} title={project.title} priority={index === 0} />
						) : (
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
								<div
									className="absolute inset-0 opacity-[0.07]"
									style={{
										backgroundImage:
											'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
										backgroundSize: '28px 28px',
									}}
								/>
								<span className="font-display text-6xl font-bold text-primary/25 select-none">{project.title.charAt(0)}</span>
								<span className="font-mono text-xs text-muted-foreground/70">{host}</span>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Write-up */}
			<div className={cn('lg:order-2', reversed && 'lg:order-1')}>
				<p className="mb-3 font-mono text-xs text-primary">
					<span className="text-primary/50">{project.featured ? '★ featured' : 'past client work'}</span> · {number}
				</p>
				<h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h3>
				<p className="mt-3 leading-relaxed text-muted-foreground">{project.shortDescription}</p>

				<dl className="mt-5 space-y-3 border-l-2 border-border pl-4">
					<div>
						<dt className="font-mono text-xs uppercase tracking-wider text-primary/70">Problem</dt>
						<dd className="mt-1 text-sm text-muted-foreground">{project.problem}</dd>
					</div>
					<div>
						<dt className="font-mono text-xs uppercase tracking-wider text-primary/70">Solution</dt>
						<dd className="mt-1 text-sm text-muted-foreground">{project.solution}</dd>
					</div>
				</dl>

				<div className="mt-5 flex flex-wrap gap-1.5">
					{project.techStack.map((tech) => (
						<MonoTag key={tech}>{tech}</MonoTag>
					))}
				</div>

				<div className="mt-6 flex flex-wrap gap-3">
					{project.liveUrl && (
						<Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
							<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — live demo`}>
								Live <ArrowUpRight className="h-3.5 w-3.5" />
							</a>
						</Button>
					)}
					{project.githubUrl && (
						<Button size="sm" variant="outline" className="gap-1.5 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary" asChild>
							<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — GitHub repository`}>
								<Github className="h-3.5 w-3.5" /> Code
							</a>
						</Button>
					)}
				</div>
			</div>
		</article>
	)
}
