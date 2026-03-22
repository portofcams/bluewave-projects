export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tag: string;
  tagColor: string;
  gradient: string;
  excerpt: string;
  url: string;
  stats: { label: string; value: string }[];
  challenge: string;
  solution: string;
  results: string;
  techStack: string[];
  claudeRole: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "portofcams",
    title: "Scaling a Live Camera Network to 24,500+ Pages with AI",
    client: "Port of Cams",
    tag: "Live Streaming Platform",
    tagColor: "bg-ocean-500/20 text-ocean-400",
    gradient: "from-ocean-500 to-wave-400",
    excerpt:
      "How we used Claude to build scrapers, generate SEO content, and scale a webcam streaming platform from 30 cameras to 24,500+ pages in under two weeks.",
    url: "https://portofcams.com",
    stats: [
      { label: "Live Cameras", value: "24,500+" },
      { label: "Pages Generated", value: "24,500+" },
      { label: "Data Sources", value: "10+" },
      { label: "Time to Scale", value: "2 Weeks" },
    ],
    challenge: `Port of Cams started as a simple project — a handful of webcams from Hawaii and Alaska streamed via HLS. The streaming infrastructure (MediaMTX + Caddy) was solid, but scaling the camera catalog was a manual, tedious process.

Each camera needed an RTSP source, an HLS endpoint, a dedicated page with metadata, weather data, map coordinates, and SEO-optimized content. Adding one camera could take 30 minutes. The goal was to go from dozens of cameras to thousands — covering every scenic highway cam, ski resort, and DOT traffic feed in the US — without hiring a team.

The real bottleneck wasn't infrastructure. It was the sheer volume of data wrangling: scraping camera feeds from 10+ government and third-party APIs, each with different formats, auth methods, and data structures.`,
    solution: `Claude became the core engineering partner for the entire scaling effort. Here's what we built together:

**10 Custom Scrapers in 3 Days**
Each government DOT system has a completely different API. FAA WeatherCams uses a REST API with Referer header auth. WSDOT publishes open JSON. Oregon DOT serves direct JPGs from TripCheck. Utah, Idaho, Nevada, and 9 other states use a mix of Iteris GeoJSON, ArcGIS endpoints, and 511 DataTables platforms.

Claude analyzed each API's structure, wrote the scraper logic, handled pagination and rate limiting, and generated the Astro page templates — all in a single session per source. What would have been weeks of reverse-engineering became hours.

**Automated Page Generation**
For each camera, Claude generated a complete Astro page with:
- HLS.js video player with auto-recovery and stall detection
- Weather widget integration
- Interactive Leaflet map with precise coordinates
- SEO metadata, JSON-LD structured data, and OpenGraph tags
- Amazon Associates affiliate links (context-aware by location)
- Multi-view grid layouts for DOT sites with multiple angles

**Infrastructure Optimization**
Claude diagnosed and fixed HLS streaming issues: tuned MediaMTX to 4-second segments with 4x queue depth, forced TCP transport to eliminate packet loss over VPN, and implemented HLS.js error recovery that automatically handles frozen feeds across all 24,500+ player instances.`,
    results: `The platform went from 413 cameras and 617 pages to over 24,500 cameras and 24,500+ pages in under two weeks. Key outcomes:

- **10 scrapers** covering FAA, WSDOT, Oregon DOT, 12 state 511 systems, Caltrans, Windy API, Alaska DOT, and ski resorts
- **24,500+ SEO-optimized pages** with structured data, each ranking for location-specific camera queries
- **Zero-downtime scaling** — the HLS infrastructure handled the 40x increase without architectural changes
- **Monetization ready** — every page includes Google AdSense, Amazon Associates affiliate links, and Meta Pixel tracking
- **11K+ additional cameras researched** in the pipeline for future expansion

The entire scaling effort was done by a solo developer working with Claude. No additional engineers, no outsourcing, no content writers.`,
    techStack: [
      "Astro",
      "React",
      "HLS.js",
      "MediaMTX",
      "Caddy",
      "Cloudflare Pages",
      "Node.js",
      "Leaflet",
    ],
    claudeRole:
      "Claude wrote all 10 scrapers, generated 24,500+ page templates, debugged HLS streaming issues, optimized MediaMTX configuration, and handled SEO markup generation. It served as the full engineering team — architect, backend developer, frontend developer, and DevOps — across a two-week sprint.",
  },
  {
    slug: "probuildcalc",
    title: "AI-Powered Job Estimation for Construction Contractors",
    client: "ProBuildCalc",
    tag: "Business Tool",
    tagColor: "bg-lava-500/20 text-lava-500",
    gradient: "from-lava-500 to-amber-400",
    excerpt:
      "Building a full-stack contractor management platform with AI photo estimation, receipt scanning, and real-time job costing — from zero to 47 API routes.",
    url: "https://contract.portofcams.com",
    stats: [
      { label: "API Routes", value: "47" },
      { label: "Database Tables", value: "20" },
      { label: "AI Features", value: "4" },
      { label: "Mobile Ready", value: "iOS + Web" },
    ],
    challenge: `Hawaii's flooring contractors were estimating jobs with pen, paper, and gut feel. A typical bid process looked like this: drive to the site, eyeball the square footage, guess at material costs based on memory, and write up a number on the spot. Errors meant eating costs on underbids or losing jobs on overbids.

The contractor needed a tool that could:
- Take photos of a room and estimate square footage using AI
- Scan receipts and automatically extract line items and costs
- Track jobs, materials, labor, and profitability in real time
- Work on a phone at a job site with spotty connectivity
- Generate professional PDF estimates to send to clients

No existing tool combined all of these. QuickBooks doesn't do photo estimation. Buildertrend is enterprise-priced. The gap was a mobile-first tool built specifically for small trade contractors.`,
    solution: `Claude architected and built the entire platform across multiple sessions:

**AI Photo Estimation**
Contractors snap photos of rooms, floors, or surfaces. The app sends images to Claude's vision API, which analyzes the space and returns square footage estimates, material recommendations, and cost projections. This replaced the "eyeball and guess" workflow with data-backed estimates.

**Receipt Scanning**
Snap a photo of a Home Depot or supplier receipt. Claude's vision API extracts every line item — product name, quantity, unit price, total — and maps them to the correct job in the system. No manual data entry.

**Full-Stack Platform**
- 47 REST API routes covering jobs, estimates, materials, labor, clients, invoices, calendar sync, and a contractor marketplace
- 20 database tables with full relational integrity
- Real-time job costing: know your margin on every project as costs come in
- PDF estimate and invoice generation
- SMS notifications (Twilio integration)
- Calendar sync for scheduling

**Mobile-First Architecture**
Built with Capacitor for iOS deployment alongside the web app. The UI is optimized for one-handed use at a job site — large tap targets, camera-first workflows, and offline capability.`,
    results: `ProBuildCalc went from concept to a fully deployed platform with 47 API routes and 20 database tables:

- **4 AI-powered features**: photo estimation, receipt scanning, multi-photo analysis, and smart material recommendations
- **Real contractor adoption**: built in direct collaboration with a Hawaii flooring contractor who uses it daily
- **Complete job lifecycle**: from initial estimate through invoicing and profitability reporting
- **Mobile deployment**: runs on iOS via Capacitor and web via any browser
- **Marketplace feature**: contractors can list services and find subcontractors

Every line of code — backend API, database schema, frontend UI, AI integrations, and deployment scripts — was written in collaboration with Claude across 9 development sessions.`,
    techStack: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "FastAPI",
      "Claude Vision API",
      "Capacitor",
      "Docker",
      "Twilio",
    ],
    claudeRole:
      "Claude designed the database schema, wrote all 47 API routes, built the AI photo estimation and receipt scanning pipelines, created the frontend UI, configured Docker deployment, and iterated on the product based on real contractor feedback. It was the sole engineering resource across 9 build sessions.",
  },
  {
    slug: "alohacalendar",
    title: "Automated Event Discovery for Hawaii with AI Scraping",
    client: "AlohaCalendar",
    tag: "Events Platform",
    tagColor: "bg-emerald-500/20 text-emerald-400",
    gradient: "from-emerald-500 to-teal-400",
    excerpt:
      "How we built a self-updating events calendar that scrapes 13 sources, enriches listings with AI, and runs autonomously — replacing manual curation entirely.",
    url: "https://alohacalendar.com",
    stats: [
      { label: "Event Sources", value: "13" },
      { label: "Events Tracked", value: "250+" },
      { label: "Image Coverage", value: "99%" },
      { label: "Scrape Cycle", value: "30 min" },
    ],
    challenge: `Hawaii has a vibrant events scene — concerts, food festivals, cultural celebrations, outdoor adventures — but no single source that aggregates them all. Visitors and locals rely on scattered Facebook groups, venue websites, and word of mouth.

Existing solutions like Eventbrite only capture ticketed events. The majority of Hawaii's events — free beach cleanups, farmers markets, community lu'aus, surf competitions — live on dozens of individual websites with no API and no standardized format.

The goal was to build a comprehensive, always-current events calendar that:
- Automatically discovers events from 13+ sources
- Handles duplicate detection across sources
- Enriches listings with images (most source sites have none)
- Requires zero manual curation after setup
- Monetizes through ticketing, affiliate links, and premium features`,
    solution: `Claude built the entire platform — backend, frontend, scrapers, and automation:

**13-Source Scraper Network**
Each source required a custom scraper because none share a common format:
- **Ticketmaster API**: structured JSON, paginated, category-mapped
- **Eventbrite API**: OAuth-authenticated, with venue resolution
- **Alaska.org / Alaska Events**: HTML scraping with Cheerio, date parsing across multiple formats
- **Venue-specific scrapers**: Alaska PAC, JAHC, Fairbanks Concert Association — each with unique DOM structures

Claude wrote every scraper, handling the edge cases: relative dates ("next Saturday"), inconsistent timezones, missing images, and HTML entities in titles.

**AI Image Enrichment**
Most event sources don't include images. Claude built an enrichment pipeline that:
1. Searches for relevant images based on event title, venue, and category
2. Validates image quality and relevance
3. Achieves 99% image coverage (up from ~30% from raw scraper data)

**Automated Operations**
- Scrapers run on a 30-minute cron cycle
- Auto-expire removes past events
- Duplicate detection collapses recurring shows (same title + venue) with "+N dates" badges
- Health monitoring with dashboard alerts when sources return zero events

**Monetization Stack**
- Stripe payments (live mode) for premium features
- Amazon Associates affiliate links — category-aware (concerts get speaker recommendations, outdoor events get sunscreen and coolers)
- Ticketing system at 2% + $0.99 per ticket (vs Eventbrite's 13.8%)
- Newsletter digest with Resend integration`,
    results: `AlohaCalendar launched as a fully autonomous events platform:

- **13 active scrapers** discovering events 24/7 with zero manual intervention
- **250+ approved events** with 99% image coverage
- **Recurring event deduplication** — clean listings instead of 50 entries for the same weekly show
- **Full monetization**: Stripe live, affiliate links generating clicks, ticketing ready for event organizers
- **Newsletter system**: automated weekly digest to subscribers
- **Cloned to Alaska**: the entire platform was forked as LastFrontierEvents.com with Alaska-specific scrapers and theming, deployed in a single session

The same architecture was replicated for a second market (Alaska) in one day, proving the platform is a repeatable template for any regional events calendar.`,
    techStack: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Stripe",
      "Resend",
      "Cheerio",
      "Cloudflare R2",
    ],
    claudeRole:
      "Claude built the entire stack: database schema, 13 scrapers, image enrichment pipeline, Stripe integration, newsletter system, admin dashboard, and frontend. It also cloned the platform to a second market (Alaska) in a single session. Zero external developers were involved.",
  },
];
