# BlueWave Projects — MEMORY.md

## Project Info
- **Name**: BlueWave Projects
- **Domain**: bluewaveprojects.com
- **Repo**: github.com/portofcams/bluewave-projects
- **Stack**: Next.js 16, Tailwind CSS v4, Framer Motion, static export
- **Hosting**: Cloudflare Pages (auto-deploy on push to main)
- **API**: ai.portofcams.com (Vultr server, FastAPI)
- **Dashboard ID**: bluewave-projects

## Credentials
- **Admin password**: bluewave2026
- **API Key**: fn_pbhINS8ivTLYF84ofv_nGPjj3ZdBPVa5SsCz0k9BZ3idn
- **Contact form endpoint**: POST https://ai.portofcams.com/api/bluewave/contact
- **Email notifications**: portofcams@gmail.com via Resend

## What's Built (2026-03-16)
### Landing Page (15 sections)
- Hero with terminal preview, metrics card, animated ocean waves
- Portfolio (6 apps: Port of Cams, ContractorCalc, Perdiemify, Address API, RentReady, HitchLife)
- Services (AI Consulting, Custom Apps, APIs & Infra, R&D)
- How It Works (3-step flow)
- Before/After AI showcase
- Pricing ($79/mo school, $249/mo school+coaching, custom consulting)
- AI School preview with skill tree
- About (Captain J photo, bio, skills)
- Testimonials (placeholder — need real ones)
- Lead Magnet (AI Starter Kit — email capture, NOT functional yet)
- Blog Preview (links to /blog)
- FAQ (6 items, accordion)
- Contact form (WORKING — emails portofcams@gmail.com)
- Footer

### AI School (/school)
- 8 waves, 61 lessons, hundreds of exercises
- Wave 1: AI Foundations
- Wave 2: Prompt Engineering
- Wave 3: Email & Writing
- Wave 4: Business Operations
- Wave 5: Data & Analysis
- Wave 6: Custom AI Agents
- Wave 7: Advanced Workflows
- Wave 8: AI Architect (capstone)
- Exercise types: quiz, prompt-challenge, free-response, matching, fill-blank
- XP tracking, streaks, progress — all localStorage
- Lesson viewer with prev/next navigation, breadcrumbs

### Blog (/blog)
- 6 articles with full content (500+ words each)
- Individual post pages with related posts

### Admin (/admin)
- Password login (bluewave2026)
- Dashboard with stats, contact submissions, quick links

### API Endpoints (Vultr)
- POST /api/bluewave/contact — contact form → email

## What's NOT Built Yet (TODOs for next session)
- [ ] Stripe checkout for $79/$249 plans
- [ ] Student auth (signup/login, gate school content behind paywall)
- [ ] Booking system for 1-on-1 consulting
- [ ] Completion certificates/badges per wave
- [ ] Email sequences (welcome, weekly nudge)
- [ ] Server-side progress syncing (replace localStorage)
- [ ] SEO: meta tags, OG images, sitemap.xml, robots.txt
- [ ] Terms of Service & Privacy Policy pages
- [ ] Custom 404 page
- [ ] Social links in footer (GitHub, LinkedIn)
- [ ] Lead magnet email capture (save to list, send PDF)
- [ ] Connect Plausible analytics
- [ ] More blog content for SEO
- [ ] Replace placeholder testimonials with real ones

## Architecture Notes
- Static export (output: "export" in next.config.ts)
- Dynamic routes need generateStaticParams
- Images must be unoptimized (no Next.js image optimizer on static)
- Captain photo at /public/captain.jpg
- Logo is text-only: "Blue" (white) + "Wave" (gradient)
- Color theme: ocean blues, deep-900 dark bg, wave/glacier accents
- All school progress in localStorage (lib/school-progress.ts)
- Admin auth in localStorage (lib/admin-auth.ts)
