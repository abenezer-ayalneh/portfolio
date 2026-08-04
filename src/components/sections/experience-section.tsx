'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionWrapper, staggerContainer, fadeUpItem } from '@/components/shared/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { workHistory } from '@/data/work'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'

export function ExperienceSection() {
	const reduced = useReducedMotion() ?? false

	return (
		<section id="experience" aria-labelledby="experience-heading" className="py-20 lg:py-28">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<SectionWrapper>
					<SectionHeading index="03" eyebrow="experience" title="Work history" titleId="experience-heading" className="mb-12" />
				</SectionWrapper>

				<motion.div
					{...(!reduced && {
						variants: staggerContainer,
						initial: 'hidden',
						whileInView: 'show',
						viewport: { once: true, margin: '-80px' },
					})}
					className="relative space-y-6">
					{/* Timeline line */}
					<div className="absolute left-[19px] top-8 bottom-0 hidden w-0.5 bg-border md:block" />

					{workHistory.map((job, index) => (
						<motion.article key={job.title + job.period} {...(!reduced && { variants: fadeUpItem })} className="relative">
							<div className="flex gap-6">
								{/* Timeline dot */}
								<div className="hidden flex-col items-center md:flex">
									<div className="z-10 mt-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-mono text-sm font-bold text-primary">
										{String(index + 1).padStart(2, '0')}
									</div>
								</div>

								<Card className="flex-1 border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
									<CardContent className="p-6">
										<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
											<div>
												<h3 className="font-display text-lg font-semibold text-foreground">{job.title}</h3>
												<a
													href={job.company.link}
													target="_blank"
													rel="noopener noreferrer"
													className="mt-0.5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
													aria-label={`${job.company.name} — opens in new tab`}>
													{job.company.name}
													<ExternalLink className="h-3 w-3" />
												</a>
											</div>
											<span className="inline-flex shrink-0 self-start rounded-md border border-border bg-muted/40 px-2 py-1 font-mono text-xs text-muted-foreground">
												{job.jobType}
											</span>
										</div>

										<div className="mb-4 flex flex-wrap gap-4 font-mono text-xs text-muted-foreground">
											<span className="flex items-center gap-1.5">
												<Calendar className="h-3.5 w-3.5 text-primary" />
												{job.period}
											</span>
											<span className="flex items-center gap-1.5">
												<MapPin className="h-3.5 w-3.5 text-primary" />
												{job.location}
											</span>
										</div>

										{job.description.map((para) => (
											<p key={para} className="mb-2 text-sm text-muted-foreground">
												{para}
											</p>
										))}

										{job.bulletPoints.length > 0 && (
											<ul className="mt-3 space-y-2" aria-label="Key responsibilities">
												{job.bulletPoints.map((point) => (
													<li key={point} className="flex gap-2 text-sm text-muted-foreground">
														<span className="mt-0.5 shrink-0 font-mono text-primary">&gt;</span>
														<span>{point}</span>
													</li>
												))}
											</ul>
										)}
									</CardContent>
								</Card>
							</div>
						</motion.article>
					))}
				</motion.div>
			</div>
		</section>
	)
}
