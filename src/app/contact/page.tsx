import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, ArrowLeft } from 'lucide-react'
import { Linkedin } from '@/components/icons/brand-icons'
import { SectionWrapper } from '@/components/shared/section-wrapper'
import { ContactForm } from '@/components/contact/contact-form'
import { resume } from '@/data/resume'
import { socialLinks } from '@/data/social'

export const metadata: Metadata = {
	title: 'Contact',
	description: 'Get in touch with Abenezer Ayalneh — Full-Stack Developer. Available for new opportunities and collaborations.',
}

function getSocialLink(name: string) {
	const link = socialLinks.find((item) => item.name === name)
	if (!link) throw new Error(`Missing ${name} social link`)
	return link
}

const email = getSocialLink('Email')
const phone = getSocialLink('Phone')
const linkedin = getSocialLink('LinkedIn')
const opportunityTypes = resume.opportunityTypes.map((type) => type.toLowerCase())
const opportunityTypesText = `${opportunityTypes.slice(0, -1).join(', ')}, or ${opportunityTypes.at(-1)}`

const contactDetails = [
	{
		icon: Mail,
		label: 'email',
		value: email.url,
		href: `mailto:${email.url}`,
	},
	{
		icon: Phone,
		label: 'phone',
		value: phone.url.replace(/^(\+251)(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4'),
		href: `tel:${phone.url}`,
	},
	{
		icon: Linkedin,
		label: 'linkedin',
		value: (new URL(linkedin.url).pathname.split('/').filter(Boolean).at(-1) ?? linkedin.url).replace(/-b[a-z0-9]+$/i, ''),
		href: linkedin.url,
	},
]

export default function ContactPage() {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="relative overflow-hidden py-20 lg:py-28" aria-labelledby="contact-heading">
				<div
					className="pointer-events-none absolute inset-0 -z-10 bg-grid"
					style={{
						maskImage: 'radial-gradient(ellipse 60% 80% at 50% 0%, black, transparent)',
						WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 50% 0%, black, transparent)',
					}}
				/>
				<div
					className="pointer-events-none absolute inset-0 -z-10"
					style={{
						background: 'radial-gradient(ellipse 60% 50% at 50% 0%, hsl(var(--primary) / 0.12), transparent 70%)',
					}}
				/>
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					<SectionWrapper>
						<Link
							href="/"
							className="mb-6 inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-primary">
							<ArrowLeft className="h-3.5 w-3.5" /> ~/home
						</Link>
						<p className="mb-3 font-mono text-sm text-primary">
							<span className="text-primary/50">{'//'}</span> contact
						</p>
						<h1 id="contact-heading" className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Let&apos;s work together
						</h1>
						<p className="mt-4 max-w-2xl text-lg text-muted-foreground">
							Whether you have an opportunity, a project in mind, or just want to say hello — my inbox is always open.
						</p>
					</SectionWrapper>
				</div>
			</section>

			{/* Content */}
			<section className="pb-20 lg:pb-28" aria-label="Contact form and details">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					<div className="grid items-start gap-10 lg:grid-cols-5">
						{/* Form in a terminal panel */}
						<SectionWrapper className="lg:col-span-3">
							<div className="terminal-panel overflow-hidden rounded-xl">
								<div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
									<span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
									<span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
									<span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
									<span className="ml-3 font-mono text-xs text-muted-foreground">send-message.sh</span>
								</div>
								<div className="p-6 sm:p-8">
									<ContactForm />
								</div>
							</div>
						</SectionWrapper>

						{/* Sidebar: details + availability */}
						<div className="space-y-6 lg:col-span-2">
							<SectionWrapper delay={0.1}>
								<div className="rounded-xl border border-border/50 bg-card/40 p-6">
									<p className="mb-5 font-mono text-xs text-primary">
										<span className="text-primary/50">{'//'}</span> direct
									</p>
									<div className="space-y-5">
										{contactDetails.map(({ icon: Icon, label, value, href }) => (
											<div key={label} className="flex items-start gap-3">
												<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
													<Icon className="h-4 w-4 text-primary" />
												</div>
												<div>
													<p className="font-mono text-xs text-muted-foreground">{label}</p>
													<a
														href={href}
														target={href.startsWith('http') ? '_blank' : undefined}
														rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
														className="break-all text-sm font-medium transition-colors hover:text-primary">
														{value}
													</a>
												</div>
											</div>
										))}
									</div>
								</div>
							</SectionWrapper>

							<SectionWrapper delay={0.2}>
								<div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
									<div className="mb-3 flex items-center gap-2">
										<span className="relative flex h-2.5 w-2.5">
											<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
											<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
										</span>
										<p className="font-mono text-xs uppercase tracking-wider text-primary">available</p>
									</div>
									<p className="text-sm leading-relaxed text-muted-foreground">
										I typically respond <span className="font-medium text-foreground">{resume.typicalResponseTime.toLowerCase()}</span>.
										Currently <span className="font-medium text-primary">open to new opportunities</span> — {opportunityTypesText}.
									</p>
								</div>
							</SectionWrapper>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
