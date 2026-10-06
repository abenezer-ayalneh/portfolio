# Abenezer Ayalneh — Portfolio

A personal portfolio site built with **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. It showcases work experience, projects, skills, and provides a contact form with validation.

The design is a futuristic, bold "amber-CRT" direction: a warm amber accent on a near-monochrome base, Space Grotesk / Inter / JetBrains Mono typography, and a moderate terminal motif (a CRT terminal panel in the hero, monospace labels and tags). See `CONTEXT.md` and `docs/adr/0001-amber-crt-redesign-direction.md`.

## Features

- **Dark / light mode** — Dark-first theme toggle with `next-themes`; theme persists across sessions
- **Split hero** — Bold display statement beside a CRT terminal panel that types `whoami` / `cat stack.txt` / `uptime`
- **Responsive layout** — Single responsive render path (no duplicate mobile/desktop markup); mobile navigation via sheet/sidebar
- **Routing** — Next.js App Router with pages: `/` (home), `/projects`, `/contact`
- **Contact form** — `react-hook-form` + Zod validation, field-level errors, success/error toasts (Sonner)
- **Motion** — Framer Motion scroll-entry animations, animated stat counters, and magnetic buttons (all respect `prefers-reduced-motion`)
- **Accessibility** — Semantic HTML, ARIA labels, keyboard-friendly navigation
- **SEO** — Metadata, Open Graph, `robots.txt`, `sitemap.xml`

## Tech Stack

| Category   | Tools                                                                                  |
| ---------- | -------------------------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router), React 19                                                      |
| Language   | TypeScript                                                                             |
| Styling    | Tailwind CSS v4, shadcn/ui (Radix UI), CSS variables                                   |
| Typography | Space Grotesk (display), Inter (body), JetBrains Mono (terminal motif) via `next/font` |
| Forms      | react-hook-form, Zod, @hookform/resolvers                                              |
| Animations | Framer Motion                                                                          |
| UI / UX    | Sonner (toasts), Lucide React (icons)                                                  |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, theme, nav, footer, metadata)
│   ├── page.tsx            # Home (hero, stats, featured work, about+education, experience, skills, CTA)
│   ├── projects/page.tsx   # Projects listing (alternating feature rows)
│   ├── contact/page.tsx    # Contact form + details
│   └── globals.css         # Global styles, design tokens, CRT primitives
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, StatsStrip, FeaturedProjects, About, Experience, Skills, CtaBand
│   ├── projects/           # ProjectFeatureRow
│   ├── contact/            # ContactForm
│   ├── shared/             # SectionWrapper, SectionHeading, MonoTag, Magnetic, ThemeToggle
│   └── ui/                 # shadcn-style components (Button, Card, Badge, etc.)
├── data/                   # Content (work, projects, education, skills, social)
└── lib/
    └── utils.ts            # cn() and helpers
```

## Getting Started

### Prerequisites

- **Node.js** 20+ (see `.nvmrc`; Vercel uses this for deployment)
- **pnpm** (the project's package manager; `corepack enable` picks up the pinned version)

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build and start (production)

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Deployment

### Vercel

1. Connect the repo to Vercel.
2. **Framework preset:** Next.js (auto-detected).
3. **Node.js version:** 20.x or 24.x (or leave unset; `engines` in `package.json` and `.nvmrc` specify Node 20+).
4. Do **not** set a custom **Output Directory**; Next.js uses its own build output.

### GitHub Actions + VPS

Automated deployment to a VPS using Docker:

1. Set up GitHub repository secrets:
    - `DOCKERHUB_USERNAME` - Your Docker Hub username
    - `DOCKERHUB_TOKEN` - Docker Hub access token (with write permissions)
    - `VPS_IP` - Your VPS server IP
    - `VPS_USER` - SSH username (usually `root`)
    - `VPS_SSH_KEY` - SSH private key (base64 encoded)

2. Configure your VPS:
    - Ensure Docker and Docker Compose are installed
    - Set up SSH access with the provided key
    - Clone the repository to `/home/portfolio` (or update the path in the workflow)

3. The workflow will:
    - Build the Docker image and push to Docker Hub
    - SSH into the VPS and deploy the latest image using Docker Compose

See `.github/workflows/deploy.yml` for the complete workflow configuration.

## Configuration

- **Contact form** — Submits to FormSubmit.co; endpoint is in `src/data/social.ts` (`SITE_CONFIG.formSubmitEndpoint`).
- **Resume** — Place `resume.pdf` in `public/`; the nav "Resume" button links to `/resume.pdf`.
- **Project screenshots** — Drop images in `public/projects/` and set `image` on each entry in `src/data/projects.ts`; rows fall back to a branded placeholder when unset.

## AI-readable profile

`/llms.txt` indexes the sources. `/llms-full.txt` and `/profile.json` expose the biography, work responsibilities, education, skills, project case studies, screenshot URLs, languages, availability, and contact information from the same data used by the site. The biography is maintained in `src/data/about.ts` and preserves its links and emphasis on the homepage.

The profile date is resolved at build time by `scripts/profile-last-updated.mjs` from the latest Git commit affecting `src/data`, project screenshots, or `src/lib/public-profile.ts`. Uncommitted content uses the current snapshot date. Builds without Git metadata also use the snapshot date unless `PROFILE_LAST_UPDATED=YYYY-MM-DD` is supplied. The generated `/sitemap.xml` shares this date; there is no separate XML date to maintain.

The VPS workflow passes the content date into Docker, where `.git` is excluded. For a manual Docker build from a local checkout:

```bash
docker build --build-arg PROFILE_LAST_UPDATED="$(node scripts/profile-last-updated.mjs)" -t nextjs-app:latest .
```

Cloudflare can deny otherwise public endpoints before requests reach Next.js. A Python client returning HTTP 403 with `error code: 1010` is a Browser Integrity Check issue, not a `robots.txt` restriction. A narrowly scoped configuration rule can turn off only Browser Integrity Check for public GET/HEAD requests matching:

```text
(http.host eq "abenezer-ayalneh.dev" and http.request.method in {"GET" "HEAD"} and http.request.uri.path in {"/" "/projects" "/contact" "/resume.pdf" "/llms.txt" "/llms-full.txt" "/profile.json" "/robots.txt" "/sitemap.xml"})
```

This rule must be applied in Cloudflare separately from deploying the site. Verify using an ordinary Python user agent, without replacing it with a browser signature:

```bash
curl --fail-with-body -A 'Python-urllib/3.9' https://abenezer-ayalneh.dev/llms.txt
curl --fail-with-body -A 'Python-urllib/3.9' https://abenezer-ayalneh.dev/llms-full.txt
curl --fail-with-body -A 'Python-urllib/3.9' https://abenezer-ayalneh.dev/profile.json
```

## License

Private / personal use. All rights reserved.
