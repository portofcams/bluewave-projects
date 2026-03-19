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
- Lead Magnet (AI Starter Kit — FUNCTIONAL, POSTs to /api/bluewave/lead)
- Blog Preview (links to /blog)
- FAQ (6 items, accordion)
- Contact form (WORKING — emails portofcams@gmail.com)
- Footer (Products, Services, Connect, Legal columns + GitHub link)

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
- Wave completion certificates (/school/certificate/[waveId])

### Blog (/blog)
- 6 articles with full content (500+ words each)
- Individual post pages with related posts

### Admin (/admin)
- Password login (bluewave2026)
- Dashboard with stats, contact submissions, quick links

### SEO & Legal
- Meta tags and OG data in layout.tsx
- robots.txt and sitemap.xml
- Terms of Service (/terms)
- Privacy Policy (/privacy)
- Custom 404 page with ocean theme

### API Endpoints (Vultr)
- POST /api/bluewave/contact — contact form → email
- POST /api/bluewave/lead — lead magnet email capture → sends AI Starter Kit + notifies owner
- POST /api/bluewave/auth/register — user registration (email/password)
- POST /api/bluewave/auth/login — JWT login
- POST /api/bluewave/auth/apple — Apple Sign In
- POST /api/bluewave/auth/google — Google Sign In
- POST /api/bluewave/auth/refresh — refresh JWT token
- GET /api/bluewave/auth/me — get current user
- GET /api/bluewave/curriculum/waves — full curriculum (8 waves, 62 lessons)
- GET /api/bluewave/curriculum/lessons/{id} — single lesson
- GET /api/bluewave/progress — user progress
- PATCH /api/bluewave/progress/lesson — mark lesson complete
- PATCH /api/bluewave/progress/exercise — mark exercise complete
- GET /api/bluewave/subscription/status — subscription check (free beta)

### Universal Analytics (2026-03-18)
- GET /api/analytics/tracker.js — lightweight JS tracker script
- POST /api/analytics/pageview — track page view
- POST /api/analytics/event — track custom event
- GET /api/analytics/stats/{domain}?period=7d — get stats for a domain
- Tracks: bluewaveprojects.com, portofcams.com, alohacalendar.com, lastfrontierevents.com
- Dashboard: captj-dashboard.pages.dev/site-analytics
- DB: /data/site_analytics.db

### iOS App (2026-03-18)
- **Repo**: github.com/portofcams/bluewave-ai-ios (private)
- **Stack**: SwiftUI, iOS 17+, MVVM with @Observable
- **Files**: 47 Swift files, BUILD SUCCEEDED
- **Tabs**: Learn, Explore, Progress, Profile
- **AI Modules**: Claude, ChatGPT, Gemini, Copilot, Midjourney
- **Auth**: JWT with Keychain storage, Apple/Google Sign In ready
- **Needs**: Apple Developer account ($99/yr), then TestFlight

## What's NOT Built Yet (TODOs)
- [ ] Apple Developer account enrollment ($99/yr) — user does tomorrow
- [ ] Stripe checkout for $79/$249 plans
- [ ] Google Sign-In SDK integration for iOS
- [ ] Booking system for 1-on-1 consulting
- [ ] Email sequences (welcome, weekly nudge)
- [ ] More blog content for SEO
- [ ] Replace placeholder testimonials with real ones
- [ ] OG images for social sharing
- [ ] App icon design for BlueWave AI

## Architecture Notes
- Static export (output: "export" in next.config.ts)
- Dynamic routes need generateStaticParams
- Images must be unoptimized (no Next.js image optimizer on static)
- Captain photo at /public/captain.jpg
- Logo is text-only: "Blue" (white) + "Wave" (gradient)
- Color theme: ocean blues, deep-900 dark bg, wave/glacier accents
- Web school progress in localStorage (lib/school-progress.ts)
- iOS progress syncs via /api/bluewave/progress
- Admin auth in localStorage (lib/admin-auth.ts)
- Server disk cleanup cron at /root/camdrop-cleanup.sh (runs every 4h, keeps 24h of frames)
