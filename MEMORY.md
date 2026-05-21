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
- **API Key**: fn_AE62t51zNXfksvtk3HzeJhBu28yD3F78HSm2FtPlwrOIGjdo7LhJHp8f_EESQmVI
- **Contact form endpoint**: POST https://ai.portofcams.com/api/bluewave/contact
- **Email notifications**: portofcams@gmail.com via Resend

## Portfolio Order (2026-04-28)
Cards in `src/components/Portfolio.tsx`, top → bottom:
1. Port of Cams
2. Binnacle.ai (added 2026-04-28)
3. AlohaCalendar
4. Last Frontier Events
5. Ikena (added 2026-04-28, link → ikenagroup.com only)
6. Address API
7. ProBuildCalc
8. Perdiemify
9. Family Tree
10. CamDrop (moved to bottom, link suppressed via "#")

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

## Student Auth + Paywall (2026-03-22)
- **Auth lib**: `src/lib/auth.ts` — JWT in localStorage, talks to `ai.portofcams.com/api/bluewave/auth/*`
- **Login page**: `/login` — email/password, redirect support, registered success message
- **Signup page**: `/signup` — name/email/password, validation, auto-redirect on success
- **Paywall component**: `src/components/school/Paywall.tsx` — gates premium content
- **Paywall logic**: Wave 1 is free for everyone, Waves 2-8 require `school` or `pro` subscription
- **School sidebar**: Shows user avatar/name/plan, login/signup link, logout button, lock icons on premium waves
- **School overview**: Premium waves show locked lesson nodes, upgrade CTA banner at bottom
- **Pricing buttons**: Now pass logged-in user email to Stripe checkout for pre-fill
- **Stripe checkout**: Already existed on backend (`POST /api/bluewave/checkout`), no changes needed
- **Stripe webhook**: Already existed on backend (`POST /api/bluewave/webhook`), no changes needed

## What's NOT Built Yet (TODOs)
- [ ] Apple Developer account enrollment ($99/yr) — user does tomorrow
- [x] Stripe checkout for $79/$249 plans (backend already done, frontend buttons wired)
- [x] Student auth (login/signup/paywall) — built 2026-03-22
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

## 2026-05-21 — site audit cleanup (commit 5aa5ba0)
Swept 14 issues from external SEO/UX audit. Highlights worth remembering:
- **Contact email**: standardized to `portofcams@gmail.com` everywhere (was a mix of FjordsAdventures@gmail.com and portofcams@gmail.com). If a dedicated `hello@bluewaveprojects.com` ever gets set up via Cloudflare Email Routing, this is the place to swap it.
- **AI School pricing**: $39/mo solo is now the canonical entry-tier price across homepage, Paywall, and /school. The old $79 number was lingering on the homepage `StudioServices` card and inside `school/Paywall.tsx`.
- **School curriculum**: 9 waves / 66 lessons is the canonical count. `lib/curriculum.ts` is the source of truth — copy in `StudioServices.tsx` and `/school` page metadata now match it.
- **/captain**: replaced street addresses with "Honolulu, HI" / "Hope, AK". Resume PDF generator reads `src/data/resume.ts`, so this also flows into any printable résumé.
- **Schema**: `LocalBusiness` now describes BlueWave as "Honolulu-based AI software studio" (was "construction project management software"). `SoftwareApplication` schema still describes the Ikena product specifically — left alone.
- **HawaiiSTR**: removed from footer (had no on-site presence). It was added 2026-05 in commit 785d06b; if the product gets a proper landing later, add the footer link back AND a Portfolio card at the same time.
- **Booking page**: audit claimed Steps 2/3 were missing — false positive, progressive reveal works (date → time → details). API at `/api/bluewave/booking/slots` returns 200 with 16 slots/day.
- **Open follow-ups (not addressed):** /scope is non-interactive (decide: build the tool or reframe page), nav inconsistency between desktop & mobile menus, "Hire the studio" vs "Hire me" positioning conflict.
