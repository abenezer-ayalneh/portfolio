import { SectionWrapper } from '@/components/shared/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { Separator } from '@/components/ui/separator'
import { education } from '@/data/education'
import { resume } from '@/data/resume'
import { MapPin, Calendar, Code2, GraduationCap, ExternalLink } from 'lucide-react'

const highlights = [
	{ icon: Calendar, label: `${resume.yearsOfExperience} experience` },
	{ icon: MapPin, label: resume.location },
	{ icon: Code2, label: resume.availability[1] },
]

const idLines = [
	{ k: 'role', v: resume.professionalTitle },
	{ k: 'exp', v: resume.yearsOfExperience },
	{ k: 'focus', v: resume.focusAreas.slice(0, 2).join(' · ').toLowerCase() },
	{ k: 'status', v: resume.availability[0].toLowerCase() },
]

export function AboutSection() {
	const school = education[0]

	return (
		<section id="about" aria-labelledby="about-heading" className="py-20 lg:py-28">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<SectionWrapper>
					<SectionHeading index="02" eyebrow="about" title="A bit about me" titleId="about-heading" className="mb-12" />
				</SectionWrapper>

				<div className="grid items-start gap-12 lg:grid-cols-5">
					{/* Identity panel */}
					<SectionWrapper delay={0.1} className="lg:col-span-2">
						<div className="terminal-panel overflow-hidden rounded-xl">
							<div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
								<span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
								<span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
								<span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
								<span className="ml-3 font-mono text-xs text-muted-foreground">whoami.json</span>
							</div>
							<div className="p-6">
								<div className="mb-5 flex h-28 w-28 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/20 via-surface to-muted">
									<span className="font-display text-4xl font-bold text-primary/80 select-none">AA</span>
								</div>
								<dl className="space-y-1.5 font-mono text-sm">
									{idLines.map(({ k, v }) => (
										<div key={k} className="flex gap-2">
											<dt className="w-16 shrink-0 text-primary/70">{k}</dt>
											<dd className="text-foreground">{v}</dd>
										</div>
									))}
								</dl>
							</div>
						</div>
					</SectionWrapper>

					{/* Bio + education */}
					<SectionWrapper delay={0.2} className="lg:col-span-3">
						<div className="space-y-6">
							<p className="leading-relaxed text-muted-foreground">
								I&apos;m a passionate Full-Stack Developer with 5+ years of professional experience building everything from enterprise web
								applications to real-time multiplayer games.
							</p>
							<p className="leading-relaxed text-muted-foreground">
								My journey started at <span className="font-medium text-foreground">Addis Ababa University</span> where I studied Computer
								Science, and I&apos;ve been building things for the web ever since. I love working across the full stack — architecting backends
								with <span className="font-medium text-foreground">Nest.js</span>, crafting responsive frontends with{' '}
								<span className="font-medium text-foreground">Angular</span> and <span className="font-medium text-foreground">React</span>, and
								wiring them together with clean, maintainable <span className="font-medium text-foreground">TypeScript</span>.
							</p>
							<p className="leading-relaxed text-muted-foreground">
								When I&apos;m not writing code, you&apos;ll find me exploring new technologies, contributing to side projects like{' '}
								<a href="https://gametrix.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
									Lynx
								</a>
								, or thinking about the next thing to build.
							</p>

							<div className="flex flex-wrap gap-4">
								{highlights.map(({ icon: Icon, label }) => (
									<div key={label} className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
										<Icon className="h-4 w-4 text-primary" />
										<span>{label}</span>
									</div>
								))}
							</div>

							<Separator />

							{/* Education (folded into About) */}
							{school && (
								<div>
									<p className="mb-3 font-mono text-xs text-primary">
										<span className="text-primary/50">{'//'}</span> education
									</p>
									<div className="flex gap-4">
										<div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:flex">
											<GraduationCap className="h-5 w-5 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold text-foreground">{school.degree}</h3>
											<a
												href={school.institution.link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
												aria-label={`${school.institution.name} — opens in new tab`}>
												{school.institution.name}
												<ExternalLink className="h-3 w-3" />
											</a>
											<p className="mt-1 font-mono text-xs text-muted-foreground">
												{school.period} · {school.location}
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</SectionWrapper>
				</div>
			</div>
		</section>
	)
}
