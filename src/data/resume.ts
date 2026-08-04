export interface LanguageProficiency {
	name: string
	level: string
}

export const resume = {
	professionalTitle: 'Full-Stack Developer',
	yearsOfExperience: '5+ years',
	location: 'Addis Ababa, Ethiopia',
	availability: ['Open to work', 'Open to remote opportunities', 'Open to project collaborations'],
	opportunityTypes: ['Full-time', 'Contract', 'Freelance'],
	typicalResponseTime: 'Within 24 hours',
	remoteReady: true,
	focusAreas: ['Gaming', 'Enterprise applications', 'Real-time systems', 'AI-powered products'],
	tagline: 'Full-Stack Developer — TypeScript · Angular · Nest.js · React · Next.js',
	summary:
		'Full-Stack Developer with 5+ years of experience building scalable, production-ready web applications. Specialises in TypeScript-based frontend and backend development with Angular, React, and Nest.js. Proven track record delivering across gaming and enterprise domains — from solo side projects to leading multi-person engineering teams.',
	languages: [
		{ name: 'English', level: 'Professional fluency' },
		{ name: 'Amharic', level: 'Native' },
	] satisfies LanguageProficiency[],
}
