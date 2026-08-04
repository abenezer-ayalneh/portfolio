export interface SocialLink {
	name: string
	url: string
	type: 'link' | 'email' | 'phone'
	ariaLabel: string
}

export const socialLinks: SocialLink[] = [
	{
		name: 'GitHub',
		url: 'https://github.com/abenezer-ayalneh',
		type: 'link',
		ariaLabel: 'GitHub profile',
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/abenezer-ayalneh-b579911b5/',
		type: 'link',
		ariaLabel: 'LinkedIn profile',
	},
	{
		name: 'Email',
		url: 'abenezer.ayalneh.42@gmail.com',
		type: 'email',
		ariaLabel: 'Send email',
	},
	{
		name: 'Phone',
		url: '+251916667538',
		type: 'phone',
		ariaLabel: 'Copy phone number',
	},
]

export const SITE_CONFIG = {
	name: 'Abenezer Ayalneh',
	lastUpdated: '2026-08-04',
	title: 'Abenezer Ayalneh — Full-Stack Developer',
	description: 'Full-Stack Developer with 5+ years of experience building scalable web applications using TypeScript, Angular, Nest.js, React, and Next.js.',
	url: 'https://abenezer-ayalneh.dev',
	ogImage: 'https://abenezer-ayalneh.dev/og.png',
	formSubmitEndpoint: 'https://formsubmit.co/ajax/7f836068829d2e4bd8487383f30acdae',
}
