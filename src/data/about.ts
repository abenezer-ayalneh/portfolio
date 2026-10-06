export interface BioSegment {
	text: string
	emphasis?: boolean
	href?: string
}

export const biography: BioSegment[][] = [
	[
		{
			text: "I'm a passionate Full-Stack Developer with 5+ years of professional experience building everything from enterprise web applications to real-time multiplayer games.",
		},
	],
	[
		{ text: 'My journey started at ' },
		{ text: 'Addis Ababa University', emphasis: true },
		{
			text: " where I studied Computer Science, and I've been building things for the web ever since. I love working across the full stack — architecting backends with ",
		},
		{ text: 'Nest.js', emphasis: true },
		{ text: ', crafting responsive frontends with ' },
		{ text: 'Angular', emphasis: true },
		{ text: ' and ' },
		{ text: 'React', emphasis: true },
		{ text: ', and wiring them together with clean, maintainable ' },
		{ text: 'TypeScript', emphasis: true },
		{ text: '.' },
	],
	[
		{ text: "When I'm not writing code, you'll find me exploring new technologies, contributing to side projects like " },
		{ text: 'Lynx', href: 'https://gametrix.org' },
		{ text: ', or thinking about the next thing to build.' },
	],
]
