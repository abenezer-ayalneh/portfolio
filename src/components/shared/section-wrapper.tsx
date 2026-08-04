'use client'

import { motion, type Variants, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

interface SectionWrapperProps {
	children: ReactNode
	className?: string
	delay?: number
}

export function SectionWrapper({ children, className = '', delay = 0 }: SectionWrapperProps) {
	const reduced = useReducedMotion() ?? false

	if (reduced) {
		return <div className={className}>{children}</div>
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
			viewport={{ once: true, margin: '-80px' }}
			className={className}>
			{children}
		</motion.div>
	)
}

export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

export const fadeUpItem: Variants = {
	hidden: { opacity: 0, y: 30 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
	},
}
