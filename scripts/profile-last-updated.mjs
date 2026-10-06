import { execFileSync } from 'node:child_process'

// Only changes to public content or its exports advance the profile date.
const contentPaths = ['src/data', 'src/assets/images/project-mockups', 'src/lib/public-profile.ts']

export function profileLastUpdated() {
	const override = process.env.PROFILE_LAST_UPDATED
	if (override) {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(override) || new Date(override).toISOString().slice(0, 10) !== override) {
			throw new Error('PROFILE_LAST_UPDATED must be a valid YYYY-MM-DD date')
		}
		return override
	}

	const snapshotDate = new Date().toISOString().slice(0, 10)
	try {
		const git = (args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
		if (git(['status', '--porcelain', '--', ...contentPaths])) return snapshotDate
		const committed = git(['log', '-1', '--format=%cI', '--', ...contentPaths])
		if (committed) return committed.slice(0, 10)
	} catch {
		// Archives without Git metadata use the snapshot date. Docker deployments
		// pass PROFILE_LAST_UPDATED from the checkout to preserve the content date.
	}
	return snapshotDate
}

console.log(profileLastUpdated())
