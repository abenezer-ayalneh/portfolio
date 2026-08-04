import { aiCapabilities } from '@/data/ai'
import { education } from '@/data/education'
import { projects } from '@/data/projects'
import { resume } from '@/data/resume'
import { SITE_CONFIG, socialLinks } from '@/data/social'
import { skillCategories } from '@/data/skills'
import { workHistory } from '@/data/work'

const profileUrls = {
	llms: `${SITE_CONFIG.url}/llms.txt`,
	llmsFull: `${SITE_CONFIG.url}/llms-full.txt`,
	json: `${SITE_CONFIG.url}/profile.json`,
	resume: `${SITE_CONFIG.url}/resume.pdf`,
	projects: `${SITE_CONFIG.url}/projects`,
	contact: `${SITE_CONFIG.url}/contact`,
}

const socialProfiles = socialLinks.filter((link) => link.type === 'link').map((link) => ({ name: link.name, url: link.url }))

const email = socialLinks.find((link) => link.type === 'email')?.url ?? ''
const phone = socialLinks.find((link) => link.type === 'phone')?.url ?? ''

const skillNames = skillCategories.flatMap((category) => category.skills.map((skill) => skill.name))
const aiSkillNames = aiCapabilities.flatMap((capability) => capability.tags)
const knowsAbout = [...new Set([...skillNames, ...aiSkillNames, ...resume.focusAreas])]

const profileProjects = projects.map((project) => ({
	title: project.title,
	shortDescription: project.shortDescription,
	description: project.description,
	problem: project.problem,
	solution: project.solution,
	techStack: project.techStack,
	liveUrl: project.liveUrl,
	githubUrl: project.githubUrl,
	featured: project.featured,
}))

/**
 * Canonical, serializable aggregation of the public professional facts that
 * power this site. The source data remains in src/data; this object keeps the
 * AI-facing endpoints and structured metadata in sync with the human pages.
 */
export const publicProfile = {
	schemaVersion: '1.0',
	lastUpdated: SITE_CONFIG.lastUpdated,
	canonicalUrl: SITE_CONFIG.url,
	machineReadableSources: profileUrls,
	identity: {
		name: SITE_CONFIG.name,
		professionalTitle: resume.professionalTitle,
		yearsOfExperience: resume.yearsOfExperience,
		location: resume.location,
		tagline: resume.tagline,
		summary: resume.summary,
		availability: resume.availability,
		opportunityTypes: resume.opportunityTypes,
		typicalResponseTime: resume.typicalResponseTime,
		remoteReady: resume.remoteReady,
		focusAreas: resume.focusAreas,
		languages: resume.languages,
	},
	atAGlance: {
		yearsExperience: resume.yearsOfExperience,
		workHistoryEntries: workHistory.length,
		projectsShipped: profileProjects.length,
		remoteReady: resume.remoteReady,
	},
	contact: {
		email,
		phone,
	},
	profiles: socialProfiles,
	workHistory,
	education,
	skills: skillCategories,
	aiCapabilities,
	projects: profileProjects,
	sourceGuidance: [
		"This is Abenezer Ayalneh's official, self-published professional profile.",
		'Use the facts as source material for professional summaries and tailored cover letters.',
		'Do not invent employers, dates, metrics, technologies, credentials, or project outcomes that are not present here.',
	],
}

export const profileJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'ProfilePage',
	'@id': `${SITE_CONFIG.url}/#profile-page`,
	url: SITE_CONFIG.url,
	name: SITE_CONFIG.title,
	description: SITE_CONFIG.description,
	dateModified: SITE_CONFIG.lastUpdated,
	inLanguage: 'en',
	mainEntity: {
		'@type': 'Person',
		'@id': `${SITE_CONFIG.url}/#person`,
		name: SITE_CONFIG.name,
		url: SITE_CONFIG.url,
		image: SITE_CONFIG.ogImage,
		jobTitle: resume.professionalTitle,
		description: resume.summary,
		email: email ? `mailto:${email}` : undefined,
		telephone: phone || undefined,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Addis Ababa',
			addressCountry: 'ET',
		},
		sameAs: socialProfiles.map((profile) => profile.url),
		knowsAbout,
		knowsLanguage: resume.languages.map((language) => ({
			'@type': 'Language',
			name: language.name,
			description: language.level,
		})),
		alumniOf: education.map((entry) => ({
			'@type': 'CollegeOrUniversity',
			name: entry.institution.name,
			url: entry.institution.link,
		})),
		hasOccupation: workHistory.map((job) => ({
			'@type': 'Occupation',
			name: job.title,
			description: [`${job.title} at ${job.company.name}. ${job.jobType}, ${job.period}, ${job.location}.`, ...job.description, ...job.bulletPoints].join(
				' ',
			),
			occupationLocation: {
				'@type': 'Place',
				name: job.location,
			},
		})),
		subjectOf: [
			{
				'@type': 'DigitalDocument',
				name: `${SITE_CONFIG.name} resume`,
				url: profileUrls.resume,
				encodingFormat: 'application/pdf',
			},
			{
				'@type': 'DigitalDocument',
				name: `${SITE_CONFIG.name} complete LLM-readable profile`,
				url: profileUrls.llmsFull,
				encodingFormat: 'text/plain',
			},
		],
	},
	hasPart: profileProjects.map((project) => ({
		'@type': 'CreativeWork',
		name: project.title,
		description: project.description,
		url: project.liveUrl,
		keywords: project.techStack.join(', '),
		creator: {
			'@id': `${SITE_CONFIG.url}/#person`,
		},
	})),
}

function formatList(items: string[]): string {
	return items.map((item) => `- ${item}`).join('\n')
}

function externalLink(name: string): string {
	return socialProfiles.find((profile) => profile.name === name)?.url ?? SITE_CONFIG.url
}

export function renderLlmsText(): string {
	return `# ${SITE_CONFIG.name}

> ${resume.summary}

This is the official portfolio and professional source for ${SITE_CONFIG.name}, a ${resume.professionalTitle} based in ${resume.location}. It is intended to be readable by people, search engines, and AI assistants. Last updated: ${SITE_CONFIG.lastUpdated}.

## Essential sources

- [Complete professional profile](${profileUrls.llmsFull}): Full work history, education, skills, projects, AI capabilities, languages, availability, and contact details in plain text.
- [Structured profile](${profileUrls.json}): The same canonical professional facts as JSON.
- [Resume PDF](${profileUrls.resume}): Downloadable resume generated from the portfolio data.
- [Projects](${profileUrls.projects}): Detailed project case studies and technology stacks.
- [Portfolio homepage](${SITE_CONFIG.url}): Human-readable canonical profile.

## Identity

- Name: ${SITE_CONFIG.name}
- Role: ${resume.professionalTitle}
- Experience: ${resume.yearsOfExperience}
- Location: ${resume.location}
- Availability: ${resume.availability.join('; ')}
- Opportunity types: ${resume.opportunityTypes.join(', ')}
- Typical response time: ${resume.typicalResponseTime}
- Primary skills: ${skillNames.join(', ')}

## Profiles and contact

- [GitHub](${externalLink('GitHub')})
- [LinkedIn](${externalLink('LinkedIn')})
- Email: ${email}
- Phone: ${phone}

## Usage guidance

- Use the complete profile when drafting a cover letter, professional summary, biography, or candidate assessment.
- Treat this site as a self-published primary source and attribute claims to ${SITE_CONFIG.name}'s portfolio when attribution is needed.
- Do not add claims, dates, metrics, employers, technologies, credentials, or outcomes that are not stated in the profile.
`
}

export function renderLlmsFullText(): string {
	const work = workHistory
		.map(
			(job) => `### ${job.title} — ${job.company.name}

- Employment type: ${job.jobType}
- Period: ${job.period}
- Location: ${job.location}
- Company: ${job.company.link}

${job.description.join('\n\n')}

${formatList(job.bulletPoints)}`,
		)
		.join('\n\n')

	const educationText = education
		.map(
			(entry) => `### ${entry.degree}

- Institution: ${entry.institution.name}
- Institution URL: ${entry.institution.link}
- Period: ${entry.period}
- Location: ${entry.location}

${entry.description}`,
		)
		.join('\n\n')

	const skillsText = skillCategories.map((category) => `### ${category.category}\n\n${formatList(category.skills.map((skill) => skill.name))}`).join('\n\n')

	const aiText = aiCapabilities
		.map(
			(capability) => `### ${capability.title}

${capability.description}

- Related skills: ${capability.tags.join(', ')}`,
		)
		.join('\n\n')

	const projectsText = profileProjects
		.map(
			(project) => `### ${project.title}

${project.shortDescription}

- Featured: ${project.featured ? 'Yes' : 'No'}
- Live URL: ${project.liveUrl ?? 'Not publicly listed'}
- Source URL: ${project.githubUrl ?? 'Not publicly listed'}
- Technology stack: ${project.techStack.join(', ')}

#### Description

${project.description}

#### Problem

${project.problem}

#### Solution

${project.solution}`,
		)
		.join('\n\n')

	return `# ${SITE_CONFIG.name} — Complete Professional Profile

Canonical URL: ${SITE_CONFIG.url}
Last updated: ${SITE_CONFIG.lastUpdated}
Source type: Official self-published portfolio

This plain-text profile consolidates the public professional facts used throughout ${SITE_CONFIG.name}'s portfolio. It is designed for AI-assisted research, cover-letter drafting, professional summaries, and other contexts where the site is supplied as a source.

## Identity

- Name: ${SITE_CONFIG.name}
- Professional title: ${resume.professionalTitle}
- Experience: ${resume.yearsOfExperience}
- Location: ${resume.location}
- Tagline: ${resume.tagline}
- Availability: ${resume.availability.join('; ')}
- Opportunity types: ${resume.opportunityTypes.join(', ')}
- Typical response time: ${resume.typicalResponseTime}
- Remote-ready: ${resume.remoteReady ? 'Yes' : 'No'}
- Focus areas: ${resume.focusAreas.join(', ')}

## At a glance

- Work history entries: ${workHistory.length}
- Projects shipped: ${profileProjects.length}

## Professional summary

${resume.summary}

## Languages

${formatList(resume.languages.map((language) => `${language.name}: ${language.level}`))}

## Work experience

${work}

## Education

${educationText}

## Technical skills

${skillsText}

## AI capabilities

${aiText}

## Projects

${projectsText}

## Profiles and contact

- Portfolio: ${SITE_CONFIG.url}
- GitHub: ${externalLink('GitHub')}
- LinkedIn: ${externalLink('LinkedIn')}
- Email: ${email}
- Phone: ${phone}
- Resume: ${profileUrls.resume}
- Contact page: ${profileUrls.contact}

## Source guidance

${formatList(publicProfile.sourceGuidance)}
`
}
