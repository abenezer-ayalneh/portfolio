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
const profileProjects = projects.map((project) => ({
	title: project.title,
	shortDescription: project.shortDescription,
	techStack: project.techStack,
	liveUrl: project.liveUrl,
	githubUrl: project.githubUrl,
	featured: project.featured,
}))

const profileWorkHistory = workHistory.map((job) => ({
	title: job.title,
	company: job.company,
	jobType: job.jobType,
	period: job.period,
	location: job.location,
}))

const profileEducation = education.map((entry) => ({
	degree: entry.degree,
	institution: entry.institution,
	period: entry.period,
	location: entry.location,
}))

const profileSkills = skillCategories.map((category) => ({
	category: category.category,
	skills: category.skills.map((skill) => skill.name),
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
		focusAreas: resume.focusAreas,
		languages: resume.languages,
	},
	atAGlance: {
		yearsExperience: resume.yearsOfExperience,
		workHistoryEntries: workHistory.length,
		selectedCaseStudies: profileProjects.filter((project) => project.featured).length,
	},
	contact: {
		email,
		phone,
	},
	profiles: socialProfiles,
	workHistory: profileWorkHistory,
	education: profileEducation,
	skills: profileSkills,
	projects: profileProjects,
	sourceGuidance: [
		"This is Abenezer Ayalneh's official, self-published professional profile.",
		'Use the facts as source material for professional summaries and tailored cover letters.',
		'Do not infer AI or LLM production experience, metrics, worldwide work eligibility, or project outcomes that are not stated here.',
	],
}

export const profileJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	'@id': `${SITE_CONFIG.url}/#person`,
	url: SITE_CONFIG.url,
	name: SITE_CONFIG.name,
	image: SITE_CONFIG.ogImage,
	jobTitle: resume.professionalTitle,
	description: resume.summary,
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Addis Ababa',
		addressCountry: 'ET',
	},
	sameAs: socialProfiles.map((profile) => profile.url),
	alumniOf: education.map((entry) => ({
		'@type': 'CollegeOrUniversity',
		name: entry.institution.name,
		url: entry.institution.link,
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

- [Complete professional profile](${profileUrls.llmsFull}): Full work history, education, skills, projects, languages, availability, and contact details in plain text.
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

	const projectsText = projects
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
