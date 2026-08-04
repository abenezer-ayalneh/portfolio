import { workHistory } from '@/data/work'
import { projects } from '@/data/projects'

const stats = [
	{ value: '5+', label: 'years experience' },
	{ value: String(workHistory.length), label: 'work history roles' },
	{ value: String(projects.filter((project) => project.featured).length), label: 'selected case studies' },
]

export function StatsStrip() {
	return (
		<section aria-label="At a glance" className="border-y border-border/60 bg-muted/20">
			<div className="mx-auto grid max-w-6xl grid-cols-3 gap-px px-4 sm:px-6 lg:px-8">
				{stats.map((stat) => (
					<div key={stat.label} className="flex flex-col items-center gap-1 px-4 py-8 text-center">
						<span className="font-display text-3xl font-bold text-primary text-glow sm:text-4xl">
							{stat.value}
						</span>
						<span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</span>
					</div>
				))}
			</div>
		</section>
	)
}
