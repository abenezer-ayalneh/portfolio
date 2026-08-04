'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionWrapper, staggerContainer, fadeUpItem } from '@/components/shared/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { MonoTag } from '@/components/shared/mono-tag'
import { skillCategories } from '@/data/skills'

export function SkillsSection() {
	const reduced = useReducedMotion() ?? false

	return (
		<section id="skills" aria-labelledby="skills-heading" className="bg-muted/30 py-20 lg:py-28">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<SectionWrapper>
					<SectionHeading
						index="04"
						eyebrow="stack"
						title="Tech stack"
						titleId="skills-heading"
						description="Technologies I work with across the full stack — from UI to infrastructure."
						className="mb-12"
					/>
				</SectionWrapper>

				<motion.div
					{...(!reduced && {
						variants: staggerContainer,
						initial: 'hidden',
						whileInView: 'show',
						viewport: { once: true, margin: '-80px' },
					})}
					className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
					{skillCategories.map((category) => (
						<motion.div key={category.category} {...(!reduced && { variants: fadeUpItem })}>
							<h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
								<span className="text-primary/60">/</span>
								{category.category}
							</h3>
							<div className="flex flex-wrap gap-2">
								{category.skills.map((skill) => (
									<MonoTag key={skill.name}>{skill.name}</MonoTag>
								))}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
