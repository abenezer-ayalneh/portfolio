'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navLinks = [
	{ label: 'about', href: '/#about' },
	{ label: 'experience', href: '/#experience' },
	{ label: 'skills', href: '/#skills' },
	{ label: 'projects', href: '/projects' },
	{ label: 'contact', href: '/contact' },
]

export function Navbar() {
	const pathname = usePathname()
	const [mobileOpen, setMobileOpen] = useState(false)

	const isActive = (href: string) => {
		if (href.startsWith('/#')) return pathname === '/'
		return pathname === href
	}

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
			<nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
				<Link href="/" className="group flex items-center font-mono text-base font-medium tracking-tight" aria-label="Abenezer Ayalneh — home">
					<span className="text-primary">~/</span>
					<span className="text-foreground group-hover:text-primary transition-colors">abenezer</span>
					<span className="ml-0.5 text-primary cursor-blink" aria-hidden="true">
						_
					</span>
				</Link>

				{/* Desktop navigation */}
				<ul className="hidden md:flex items-center gap-1" role="list">
					{navLinks.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className={cn(
									'px-3 py-2 rounded-md font-mono text-sm transition-colors',
									isActive(link.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
								)}>
								<span className="text-primary/60">/</span>
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						className="hidden md:flex font-mono text-xs border-primary/50 text-primary hover:bg-primary/10 hover:text-primary"
						asChild>
						<a href="/resume.pdf" download="Abenezer Ayalneh -- Resume.pdf" aria-label="Download resume">
							resume.pdf
						</a>
					</Button>
					<ThemeToggle />

					{/* Mobile hamburger */}
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-72">
							<SheetHeader>
								<SheetTitle className="text-left">Navigation</SheetTitle>
								<SheetDescription className="sr-only">Portfolio sections, projects, contact details, and a resume download.</SheetDescription>
							</SheetHeader>
							<nav className="mt-8 flex flex-col gap-2" aria-label="Mobile navigation">
								{navLinks.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										onClick={() => setMobileOpen(false)}
										className={cn(
											'px-4 py-3 rounded-lg font-mono text-base transition-colors',
											isActive(link.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted',
										)}>
										<span className="text-primary/60">/</span>
										{link.label}
									</Link>
								))}
								<div className="mt-4 pt-4 border-t border-border">
									<Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10" asChild>
										<a href="/resume.pdf" download="Abenezer Ayalneh -- Resume.pdf">
											Download Resume
										</a>
									</Button>
								</div>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	)
}
