'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, type Variants, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, Mail, Phone } from 'lucide-react'
import { Github, Linkedin } from '@/components/icons/brand-icons'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/shared/magnetic'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { socialLinks } from '@/data/social'
import { toast } from 'sonner'

function getSocialUrl(name: string) {
	const link = socialLinks.find((item) => item.name === name)
	if (!link) throw new Error(`Missing ${name} social link`)
	return link.url
}

const socialActions = [
	{
		icon: Github,
		label: 'GitHub',
		ariaLabel: 'GitHub profile',
		action: () => window.open(getSocialUrl('GitHub'), '_blank'),
	},
	{
		icon: Linkedin,
		label: 'LinkedIn',
		ariaLabel: 'LinkedIn profile',
		action: () => window.open(getSocialUrl('LinkedIn'), '_blank'),
	},
	{
		icon: Mail,
		label: 'Email',
		ariaLabel: 'Copy email address',
		action: () => {
			navigator.clipboard.writeText(getSocialUrl('Email'))
			toast.success('Email copied to clipboard!')
		},
	},
	{
		icon: Phone,
		label: 'Phone',
		ariaLabel: 'Copy phone number',
		action: () => {
			navigator.clipboard.writeText(getSocialUrl('Phone'))
			toast.success('Phone number copied to clipboard!')
		},
	},
]

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.12, delayChildren: 0.05 },
	},
}

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
	},
}

export function HeroSection() {
	const reduced = useReducedMotion() ?? false

	return (
		<section id="hero" aria-label="Introduction" className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
			{/* Hero backdrop: faint amber grid + radial glow, masked toward the edges. */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div
					className="absolute inset-0 bg-grid"
					style={{
						maskImage: 'radial-gradient(ellipse 75% 70% at 50% 35%, black, transparent)',
						WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 35%, black, transparent)',
					}}
				/>
				<div
					className="absolute inset-0"
					style={{
						background: 'radial-gradient(ellipse 70% 55% at 70% 0%, hsl(var(--primary) / 0.18), transparent 70%)',
					}}
				/>
			</div>

			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
					{/* Left: bold statement */}
					<motion.div {...(!reduced && { variants: containerVariants, initial: 'hidden', animate: 'visible' })}>
						<motion.p variants={itemVariants} className="mb-5 font-mono text-sm tracking-wide text-muted-foreground">
							<span className="text-primary">~ $</span> whoami
						</motion.p>

						<motion.h1
							variants={itemVariants}
							className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
							ABENEZER
							<br />
							<span className="text-primary text-glow">AYALNEH</span>
						</motion.h1>

						<motion.p variants={itemVariants} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
							I build scalable, production-ready web applications with <span className="font-medium text-foreground">TypeScript</span>,{' '}
							<span className="font-medium text-foreground">Angular</span>, <span className="font-medium text-foreground">Nest.js</span>,{' '}
							<span className="font-medium text-foreground">React</span>, and <span className="font-medium text-foreground">Next.js</span>. 5+
							years across gaming and enterprise.
						</motion.p>

						<motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3">
							<Magnetic>
								<Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
									<Link href="/projects">
										View Work <ArrowRight className="h-4 w-4" />
									</Link>
								</Button>
							</Magnetic>
							<Button size="lg" variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary" asChild>
								<a href="/resume.pdf" download="Abenezer Ayalneh -- Resume.pdf">
									<Download className="h-4 w-4" /> Resume
								</a>
							</Button>
							<Button size="lg" variant="ghost" className="gap-2" asChild>
								<Link href="/contact">Contact</Link>
							</Button>
						</motion.div>

						<motion.div variants={itemVariants} className="mt-10 flex items-center gap-3">
							<TooltipProvider>
								{socialActions.map(({ icon: Icon, label, ariaLabel, action }) => (
									<Tooltip key={label}>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												onClick={action}
												aria-label={ariaLabel}
												className="rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
												<Icon className="h-5 w-5" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>{label}</p>
										</TooltipContent>
									</Tooltip>
								))}
							</TooltipProvider>
						</motion.div>
					</motion.div>

					{/* Right: CRT terminal panel */}
					<motion.div
						{...(!reduced && {
							initial: { opacity: 0, y: 24, scale: 0.98 },
							animate: { opacity: 1, y: 0, scale: 1 },
							transition: {
								duration: 0.6,
								delay: 0.2,
								ease: [0.25, 0.46, 0.45, 0.94],
							},
						})}>
						<TerminalPanel />
					</motion.div>
				</div>
			</div>
		</section>
	)
}

const LINES = [
	{ cmd: 'whoami', out: 'Abenezer Ayalneh — Full-Stack Developer' },
	{
		cmd: 'cat stack.txt',
		out: 'TypeScript · Angular · Nest.js · React · Next.js',
	},
	{ cmd: 'uptime', out: '5+ years · gaming + enterprise · open to remote work' },
] as const

function Cursor() {
	return (
		<span className="cursor-blink ml-0.5 inline-block w-[0.6ch] -translate-y-px bg-primary text-transparent" aria-hidden="true">
			_
		</span>
	)
}

function TerminalPanel() {
	const prefersReduced = useReducedMotion() ?? false
	const [lineIdx, setLineIdx] = useState(0)
	const [charIdx, setCharIdx] = useState(0)
	const [showOut, setShowOut] = useState(false)

	const showAll = prefersReduced

	useEffect(() => {
		if (prefersReduced) return
		if (lineIdx >= LINES.length) return

		const line = LINES[lineIdx]

		if (!showOut) {
			if (charIdx < line.cmd.length) {
				const t = setTimeout(() => setCharIdx((c) => c + 1), 50)
				return () => clearTimeout(t)
			}
			const t = setTimeout(() => setShowOut(true), 220)
			return () => clearTimeout(t)
		}

		const t = setTimeout(() => {
			setLineIdx((i) => i + 1)
			setCharIdx(0)
			setShowOut(false)
		}, 650)
		return () => clearTimeout(t)
	}, [charIdx, showOut, lineIdx, prefersReduced])

	const done = showAll || lineIdx >= LINES.length

	return (
		<div className="terminal-panel crt-flicker relative overflow-hidden rounded-xl">
			{/* Title bar */}
			<div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
				<span className="h-3 w-3 rounded-full bg-destructive/70" />
				<span className="h-3 w-3 rounded-full bg-primary/70" />
				<span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
				<span className="ml-2 font-mono text-xs text-muted-foreground">abenezer@portfolio: ~</span>
			</div>

			{/* Screen */}
			<div className="crt-scanlines crt-vignette relative min-h-[300px] p-5 font-mono text-sm leading-relaxed sm:text-[0.95rem]">
				{LINES.map((line, i) => {
					const reveal = showAll || i <= lineIdx
					if (!reveal) return null

					const isCurrent = !showAll && i === lineIdx
					const cmdText = isCurrent ? line.cmd.slice(0, charIdx) : line.cmd
					const outVisible = showAll || i < lineIdx || (isCurrent && showOut)

					return (
						<div key={line.cmd} className="mb-3">
							<div className="text-foreground">
								<span className="text-primary">~ $</span> <span className="text-glow">{cmdText}</span>
								{isCurrent && !showOut && <Cursor />}
							</div>
							{outVisible && <div className="pl-5 text-muted-foreground">&gt; {line.out}</div>}
						</div>
					)
				})}

				{done && (
					<div className="text-foreground">
						<span className="text-primary">~ $</span>
						<Cursor />
					</div>
				)}
			</div>
		</div>
	)
}
