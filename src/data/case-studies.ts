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
    slug: "ikena-contractor",
    title: "Running a Hawaii Design-Build Practice on a Tenant of Our Own SaaS",
    client: "Ikena Design & Build",
    tag: "Active Construction",
    tagColor: "bg-lava-500/20 text-lava-500",
    gradient: "from-slate-700 to-cyan-500",
    excerpt:
      "Ikena uses BlueWave Projects as Tenant 1 to run a live Honolulu design-build practice — over $1M of construction work flowing through the system, including the active $139,165 Puuikena Drive renovation.",
    url: "https://ikenagroup.com",
    stats: [
      { label: "Construction managed", value: "$1M+" },
      { label: "Active project (live)", value: "$139K" },
      { label: "Ops tools in the portal", value: "9" },
      { label: "Tax jurisdictions handled", value: "Hawaii" },
    ],
    challenge: `Most construction project management software is built for general contractors at scale — multi-region GCs running hundreds of jobs concurrently. The category leaders (Procore, Buildertrend, CoConstruct) charge per user, hide everything behind enterprise gates, and don't know what to do with a Hawaii §237-13(3)(B) sub deduction.

For a Honolulu design-build practice doing high-end residential renovation, the fit was wrong on every axis: too expensive for a small crew, too generic for the regulatory layer, and too closed for the AI-augmented workflows that small operators actually run on day-to-day.`,
    solution: `We built BlueWave Projects to solve our own problem first, then opened it up. Ikena is Tenant 1.

**9 ops tools wired together end to end**
Invoices, subs ledger with tax accounting, time clock (iOS + web), daily logs, client document center, finish-selection sign-offs, change orders with public approve links, blueprint editor, and a 3D editor — all in one tenant with row-level isolation.

**AI scope generator on every job**
Drop a RoomPlan scan + a couple of photos, get a phase-by-phase scope of work with line-item ranges and a tax gross-up in 60 seconds. The output becomes the basis of the client quote and seeds the change-order ledger.

**Client share by link, not by login**
Every project has a public timeline + selection + change-order link the client can open from email. No accounts, no app downloads — they see the same project room the crew sees, just read-only.

**Hawaii tax accounting baked in**
Sub-deduction tracking is set up automatically. The system computes the gross-up on the quote, files the deduction at invoice time, and keeps a running ledger so the books match the state filing.`,
    results: `Ikena is the proof that the system runs a real construction business, not a demo. The active $139,165 Puuikena Drive renovation lives entirely inside the BlueWave portal — scope, blueprints, daily logs, change orders, client portal docs — without exporting to spreadsheets or a separate accounting tool.

Over $1M of construction work has flowed through the system since launch. Every feature we ship on BlueWave Projects gets dogfooded on a real job site before it goes out to other tenants.`,
    techStack: [
      "Next.js 16",
      "FastAPI",
      "Postgres",
      "Multi-tenant rows",
      "DocuSeal",
      "Swift + RoomPlan",
      "Claude API",
    ],
    claudeRole:
      "Claude wrote ~half the tenant-scoped routers, generated the invoice + change-order PDFs, handled the public-client view JSON shaping, and powers the live scope generator. Every commit to the multi-tenant schema gets a Claude-reviewed migration. The system was designed and built solo with Claude Code over a 9-week sprint.",
  },
  {
    slug: "hawaii-as-code",
    title: "Every Parcel in Hawaii, Compiled as TypeScript and Committed to Git",
    client: "Hawaii 3D Map · Ikena Group + BlueWave AI",
    tag: "Geospatial Infrastructure",
    tagColor: "bg-emerald-500/20 text-emerald-400",
    gradient: "from-emerald-500 to-sky-400",
    excerpt:
      "Every TMK parcel, building footprint, and address in Hawaiʻi pulled from state and county GIS endpoints, encoded as TypeScript modules, and committed to a single Git repo. The whole dataset diffs in Git and renders as a 3D map.",
    url: "https://maps.ikenagroup.com",
    stats: [
      { label: "Statewide TMK parcels", value: "384,262" },
      { label: "Honolulu building footprints", value: "239,458" },
      { label: "Address points", value: "204,775" },
      { label: "Islands covered", value: "4" },
    ],
    challenge: `Hawaii's authoritative geospatial data is scattered across a half-dozen sources: the state ArcGIS portal for statewide parcels, four separate county REST endpoints for the richer per-county data, OSM Overpass for building footprints with real heights, and a tangle of qPublic / Honolulu DPP pages for permits and ownership detail.

Every contractor, realtor, and homeowner tool we ship — Property Brief, Aloha Network, the AI scope generator, ProBuildCalc — needs that data, and needs it fresh. Standing up a normalized warehouse, an ETL pipeline, an API service, and a cache layer for every product was a lot of plumbing for a dataset that, in raw form, is well under a gigabyte.`,
    solution: `We treated the dataset like source code, not like data.

**Weekly scrapers emit TypeScript, not rows**
Every Saturday, a cron job hits the upstream ArcGIS + REST endpoints, normalizes the response, and writes the result back to the repo as typed TypeScript modules — one file per island per layer. The whole geospatial corpus lives in Git: \`parcels/oahu/*.ts\`, \`buildings/honolulu/*.ts\`, \`addresses/maui/*.ts\`.

**Diffs are the audit trail**
Because the data is text, every weekly refresh shows up as a Git diff. New parcels, building height corrections, address changes — all reviewable in a normal PR view. No "ETL ran, no idea what changed" — you can scroll the diff.

**Same data layer feeds every product**
The map at maps.ikenagroup.com renders the same TypeScript that ProBuildCalc, Property Brief, the scope generator, and the lookup tool all import. One source of truth, no API drift between products.

**Static export → instant 3D map**
The TypeScript dataset feeds a Three.js renderer at build time. The 3D map of Hawaii — buildings extruded to real heights, parcels clickable down to TMK / acres / qPublic — is just the static export of the same compiled data.`,
    results: `One repo now backs every Hawaii-aware product the studio ships. The 3D map at maps.ikenagroup.com renders all 384K parcels and 239K Honolulu building footprints in real heights, with click-through to per-parcel TMK / acreage / qPublic links.

Onboarding a new product to the data layer is now an \`import\` statement rather than a backend integration. The same approach extends to permit history and zoning when those layers are added — they slot into the same TypeScript directory tree.`,
    techStack: [
      "TypeScript",
      "Three.js",
      "Hawaii statewide ArcGIS",
      "Hawaii County REST",
      "OSM Overpass",
      "Cron + Git",
      "Static export",
    ],
    claudeRole:
      "Claude wrote every scraper, designed the file-per-island directory layout, and handled the cross-source normalization (ArcGIS, county REST, and OSM Overpass return wildly different shapes). It built the Three.js renderer and the parcel click-to-TMK interaction. The week-over-week migrations are handled by Claude reading the diff and writing the codemod.",
  },
  {
    slug: "portofcams",
    title: "Scaling a Live Camera Network to 14,400+ Cameras with AI",
    client: "Port of Cams",
    tag: "Live Streaming Platform",
    tagColor: "bg-ocean-500/20 text-ocean-400",
    gradient: "from-ocean-500 to-wave-400",
    excerpt:
      "How we used Claude to build scrapers, generate SEO content, and scale a webcam streaming platform from 30 cameras to 14,400+ live cameras (24,500+ unique pages) in under two weeks.",
    url: "https://portofcams.com",
    stats: [
      { label: "Live Cameras", value: "14,400+" },
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
Claude diagnosed and fixed HLS streaming issues: tuned MediaMTX to 4-second segments with 4x queue depth, forced TCP transport to eliminate packet loss over VPN, and implemented HLS.js error recovery that automatically handles frozen feeds across all 14,400+ player instances.`,
    results: `The platform went from 413 cameras and 617 pages to over 14,400 live cameras and 24,500+ pages in under two weeks. Key outcomes:

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
    slug: "address-api",
    title: "A Multi-Source Address Enrichment API for Real Estate and Insurance",
    client: "Address API",
    tag: "Developer API",
    tagColor: "bg-amber-500/20 text-amber-400",
    gradient: "from-amber-500 to-orange-400",
    excerpt:
      "How we built a production API that enriches any US address with flood risk, demographics, and broadband data from 5 redundant government sources.",
    url: "https://addressapi.portofcams.com",
    stats: [
      { label: "Data Sources", value: "5" },
      { label: "Response Time", value: "<500ms" },
      { label: "Redundancy", value: "Full" },
      { label: "Coverage", value: "All US" },
    ],
    challenge: `Real estate platforms, insurance underwriters, and property management companies need enriched address data — flood risk zones, demographic profiles, broadband availability — but getting this data is a nightmare of government APIs, each with different formats, authentication methods, and reliability issues.

The FEMA National Flood Hazard Layer API returns XML in one format. The Census Bureau's American Community Survey requires raw URL construction (it rejects encoded URL parameters). FCC broadband data uses yet another schema. Each source has its own rate limits, downtime patterns, and data quirks.

Companies were either paying enterprise vendors thousands per month for aggregated data, or building fragile in-house integrations that broke whenever a government API changed its format. There was a clear gap for a clean, affordable API that handles the complexity behind a single endpoint.`,
    solution: `Claude architected and built the entire API service:

**5 Data Sources with Redundancy**
Each data category has a primary source with an automatic fallback:
- **Flood risk**: FEMA National Flood Hazard Layer (NFHL) as primary, OpenFEMA NFIP Policies as fallback. If the primary GIS query times out or returns no data, the system automatically queries the fallback source and normalizes the response to the same schema.
- **Demographics**: Census American Community Survey (ACS). Claude discovered that the Census API rejects URLSearchParams-encoded requests — it requires raw URL construction, a quirk that would have taken hours to debug without AI assistance.
- **Broadband**: FCC broadband availability data by location
- **Geocoding**: Address normalization and coordinate resolution
- **Property basics**: Parcel-level data where available

**Clean REST API**
A single endpoint accepts any US address and returns enriched data across all five categories. The response is normalized — regardless of which underlying source provided the data, the API returns a consistent JSON schema. Developers don't need to understand FEMA flood zone codes or Census tract identifiers.

**Production Infrastructure**
- Node.js service running as a systemd unit on Vultr
- SSL via Let's Encrypt with auto-renewal
- API key authentication with rate limiting
- Health monitoring integrated with the shared dashboard
- Nginx Proxy Manager routing at addressapi.portofcams.com

**Error Handling and Resilience**
Government APIs are notoriously unreliable. The service implements:
- Automatic failover between primary and fallback sources
- Graceful degradation (returns available data even if one source is down)
- Response caching for repeated lookups
- Detailed error logging for source-specific debugging`,
    results: `Address API launched as a production-ready enrichment service:

- **5 integrated data sources** with full redundancy — no single point of failure
- **Sub-500ms response times** for enriched address lookups including flood, demographics, and broadband
- **All-US coverage** with automatic fallback when primary sources are unavailable
- **Clean developer experience** — one endpoint, one API key, consistent JSON responses
- **SSL-secured** with Let's Encrypt auto-renewal (next renewal June 2026)
- **Zero maintenance** since deployment — the systemd service has required no manual intervention

The API was built, tested, and deployed to production in three development sessions. Every line of code — HTTP handlers, source integrations, error handling, deployment scripts — was written with Claude as the engineering partner.`,
    techStack: [
      "Node.js",
      "Express",
      "Systemd",
      "Nginx",
      "Let's Encrypt",
      "REST API",
      "Vultr VPS",
    ],
    claudeRole:
      "Claude designed the multi-source architecture with automatic failover, built every data source integration (debugging the Census API's URL encoding quirk), implemented the response normalization layer, configured systemd deployment, and set up SSL with Let's Encrypt. It served as the sole engineer across three build sessions.",
  },
  {
    slug: "last-frontier-events",
    title: "An Autonomous Events Platform for Alaska with 13 Scrapers",
    client: "Last Frontier Events",
    tag: "Events Platform",
    tagColor: "bg-cyan-500/20 text-cyan-400",
    gradient: "from-cyan-500 to-blue-400",
    excerpt:
      "How we cloned a proven events platform architecture to Alaska, built 13 custom scrapers, added a ticketing system with QR scanning, and launched a full business portal — all with AI.",
    url: "https://lastfrontierevents.com",
    stats: [
      { label: "Events Tracked", value: "252+" },
      { label: "Scrapers", value: "13" },
      { label: "Ticket Fee", value: "2% + $0.99" },
      { label: "Business Portal", value: "Full CRM" },
    ],
    challenge: `Alaska has a unique events landscape — aurora viewing tours, salmon derbies, dog mushing races, Native cultural celebrations, summer solstice festivals — spread across a state larger than Texas, California, and Montana combined. There was no comprehensive events calendar for the state.

Existing solutions fell short in every direction. Eventbrite only captured ticketed events in Anchorage. Facebook events were scattered across hundreds of community groups. Tourism sites like Alaska.org had partial listings but no aggregation. Local venues published events on their own websites with no standardized format.

The vision went beyond a simple calendar. Alaska's events industry needed:
- A self-updating calendar that discovers events automatically from every source
- A ticketing system that undercuts Eventbrite's 13.8% fee
- A business portal where venues and promoters can manage events, teams, and ticket sales
- Affiliate monetization through Alaska-specific product recommendations
- A CRM for managing relationships with event organizers`,
    solution: `Claude built the entire platform by cloning and extending the proven AlohaCalendar architecture:

**13 Custom Scrapers**
Each Alaska event source required its own scraper because none share a common API:
- **Ticketmaster API**: structured JSON with pagination and category mapping — the most reliable source with 16+ events
- **Eventbrite API**: OAuth-authenticated with venue resolution, re-enabled after initial issues
- **Alaska.org**: HTML scraping with Cheerio, handling 155+ events with deduplication
- **Alaska Events**: another HTML source yielding 336 discovered events
- **Venue-specific scrapers**: Alaska PAC, JAHC, Fairbanks Concert Association — each with completely different DOM structures and date formats

Claude wrote every scraper, handling edge cases like relative dates ("next Saturday"), inconsistent timezones across Alaska's two time zones, missing images, and HTML entities in titles. Scrapers run on a 30-minute cron cycle with automatic past-event expiration.

**Ticketing System with QR Scanning**
A full ticketing engine at 2% + $0.99 per ticket — a fraction of Eventbrite's 13.8%. Features include:
- Stripe-integrated checkout with real-time ticket generation
- QR code scanning for door entry validation
- Organizer payout tracking and reporting

**Business Portal**
Event organizers get a complete management dashboard:
- Team management with role-based access
- Event creation, editing, and analytics
- Ticket sales tracking and revenue reporting
- CRM for managing attendee relationships
- Affiliate tracking for partner referrals

**Monetization Stack**
- Amazon Associates affiliate links — Alaska-themed products (bear spray, hand warmers, aurora tripods, cold weather gear)
- Stripe live mode for ticketing revenue
- Newsletter digest via Resend for subscriber engagement
- Google AdSense for ad revenue`,
    results: `Last Frontier Events launched as Alaska's most comprehensive events platform:

- **252+ approved events** with 13 active scrapers discovering new events 24/7
- **Zero manual curation** — scrapers run autonomously every 30 minutes with auto-expire and deduplication
- **Ticketing at 2% + $0.99** — saving event organizers 80%+ compared to Eventbrite's fees
- **Full business portal** with team management, CRM, and affiliate tracking
- **Newsletter system** with automated weekly digests (Sunday 7pm UTC)
- **Blog roundup** auto-generated weekly (Monday 5pm UTC)
- **Cloned from AlohaCalendar** in a single session — proving the architecture is a repeatable template for any regional events market

The platform was built, deployed, and made fully autonomous by a solo developer working with Claude. The entire clone-and-customize process from AlohaCalendar to LFE took one development session.`,
    techStack: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Stripe",
      "Resend",
      "Cheerio",
      "Node.js",
    ],
    claudeRole:
      "Claude cloned the AlohaCalendar codebase, adapted all 13 scrapers for Alaska-specific sources, built the ticketing system with QR scanning, created the business portal with CRM and team management, implemented the affiliate tracking system, and deployed everything to production. It served as the sole engineering resource for the entire platform.",
  },
];
