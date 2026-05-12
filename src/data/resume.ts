// John C. Thomas — master resume data.
// Edit this file, push to main, Cloudflare Pages redeploys in ~30 seconds.
// Both /captain (web) and /captain/print (PDF source) render from this.

export type ResumeRole = {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  track: "saas" | "build" | "maritime" | "snow";
  bullets: string[];
};

export type Vessel = {
  name: string;
  classification: string;
  gross_tons: number;
  length_ft: number;
  hp: number;
  waters: string;
  duty: string;
  position: string;
  period: string;
};

export type Certification = {
  name: string;
  group: "license" | "stcw" | "safety" | "fire" | "id";
};

export const resume = {
  identity: {
    full_name: "John Campbell Thomas",
    display_name: "John C. Thomas",
    headline: "USCG Master Captain · Operations Manager · Founder",
    tagline: "From the bridge to the build site — and now the cloud.",
    summary:
      "Maritime captain turned design-build founder. 100-ton USCG Master with 1,000+ sea days across Alaska and Hawaii waters, now running an active Honolulu remodel practice and building the software that runs the jobs. Operations, leadership, and code — with sawdust on the boots and salt in the rigging.",
    photo: "/captain.webp",
    email: "FjordsAdventures@gmail.com",
    phone: "(907) 769-1165",
    addresses: [
      { label: "Honolulu", line: "440 Lewers Street, Unit 603, Honolulu, HI 96815" },
      { label: "Hope, Alaska", line: "16 Main Street, Hope, AK 99605" },
    ],
    links: [
      { label: "BlueWave Projects", url: "https://bluewaveprojects.com" },
      { label: "Ikena Design & Build", url: "https://ikenagroup.com" },
    ],
  },

  callings: [
    {
      label: "On the water",
      title: "Captain",
      detail:
        "USCG Master 100-Ton. 1,000+ sea days from Prince William Sound to Maui. Towing, salvage, charter, commercial dive, sail.",
      track: "maritime",
    },
    {
      label: "On the ground",
      title: "Builder",
      detail:
        "Honolulu design-build practice. Hardwood, full remodels, GC-B license track. $139K Puuikena renovation active.",
      track: "build",
    },
    {
      label: "In the code",
      title: "Founder",
      detail:
        "Multi-tenant SaaS for contractors. AI scope generator, RoomPlan blueprints, client portals, Hawaii tax accounting.",
      track: "saas",
    },
  ],

  experience: [
    {
      title: "Founder & CEO",
      company: "BlueWave Projects",
      location: "Honolulu, HI",
      start: "2026",
      end: "Current",
      track: "saas",
      bullets: [
        "Built and shipped a multi-tenant project management SaaS for design-build contractors — sole engineer, designer, and operator.",
        "Native stack: Next.js 16, FastAPI, Postgres, Swift/SwiftUI iOS, Cloudflare Pages, Vultr.",
        "AI scope generator, RoomPlan LiDAR blueprints, client share portals, change orders, Hawaii tax accounting, supplier ledgers.",
        "Tenant 1 (Ikena Design & Build) actively running real construction jobs through the system.",
      ],
    },
    {
      title: "Founder · Principal",
      company: "Ikena Design & Build",
      location: "Honolulu, HI",
      start: "2026",
      end: "Current",
      track: "build",
      bullets: [
        "Active Honolulu design-build practice pursuing Hawaii GC-B contractor license.",
        "$139,165 Puuikena Drive renovation in flight — three-phase quote structure, mahogany veneer + termite remediation + interior refinish.",
        "Source-of-truth client for BlueWave Projects: every feature ships first on a real job site.",
      ],
    },
    {
      title: "Project Manager",
      company: "Hawaii Flooring Specialists",
      location: "Oahu, HI",
      start: "Dec 2025",
      end: "Current",
      track: "build",
      bullets: [
        "Manage fleet remodel crews on high-end floor installations, hardwood refinish, and full home remodels.",
        "50/50 partnership with Chris on Hawaii Flooring quotes — labor and project execution lead.",
        "Subs, materials, scheduling, tax accounting, and client communications across multiple concurrent jobs.",
      ],
    },
    {
      title: "USCG Master Captain · Sales Manager",
      company: "Ohana Boats Sales & Hawaii Boat Club",
      location: "Honolulu, HI & Surrounding Islands",
      start: "Apr 2025",
      end: "Nov 2025",
      track: "maritime",
      bullets: [
        "Managed fleet of 12+ private and club vessels at 100% USCG and local regulatory compliance.",
        "Coordinated maintenance, repairs, and charter scheduling; cut downtime 15% via proactive inspection cadence.",
        "Trained and supervised deck crews; standardized safety procedures and emergency response drills.",
      ],
    },
    {
      title: "Senior Tow & Salvage Master Captain",
      company: "Sea Tow International",
      location: "Seward, AK / San Diego, CA",
      start: "Aug 2021",
      end: "Jun 2023",
      track: "maritime",
      bullets: [
        "Navigated complex Alaskan coastal waters in every season; expert use of local charts, currents, and maritime regulations.",
        "Oversaw safe operation of Sea Tow vessels in Alaskan and Californian waters — vessel tows, salvage, marine emergency rescue.",
        "Prioritized passenger safety and swift resolution of incidents at sea.",
      ],
    },
    {
      title: "Charter Operations · Sales Manager · Captain",
      company: "Fjords Adventures, LLC",
      location: "Seward, AK",
      start: "Apr 2020",
      end: "May 2024",
      track: "maritime",
      bullets: [
        "Maintained impeccable USCG and federal/national park maritime compliance; exemplary safety record across charters and inspections.",
        "Safely operated open-ocean vessels in diverse sea conditions; showcased seamanship to elevate passenger experience.",
        "Built and ran the LLC end-to-end — bookings, marketing, regulatory paperwork, captain ops.",
      ],
    },
    {
      title: "Operations Manager · Captain · Lead Mechanic · Dive Supervisor",
      company: "Storm Chasers Shipyard",
      location: "Seward, AK",
      start: "Jun 2021",
      end: "Aug 2023",
      track: "maritime",
      bullets: [
        "Directed commercial dive operations in demanding environments — underwater construction, hydro-sync lifts, pipelines, offshore structures.",
        "Led crew of shipyard laborers through variety of vessel projects on time and safely.",
        "Vessel salvage and industrial dive — Prince William Sound and Cook Inlet.",
      ],
    },
    {
      title: "Snowcat Operations Manager · Fuel Distribution Manager",
      company: "Chugach Powder Guides",
      location: "Girdwood, AK",
      start: "Dec 2018",
      end: "Apr 2025",
      track: "snow",
      bullets: [
        "Led 10+ skilled operators and maintenance crew; built a culture of safety, efficiency, and teamwork.",
        "Implemented control measures that reduced helicopter charter cancellations caused by human and mechanical factors.",
        "Ensured strict compliance with local and Alaska State regulations governing heli-cat and snowcat operations and environmental protection.",
      ],
    },
  ] satisfies ResumeRole[],

  vessels: [
    {
      name: "Yacht Fleet",
      classification: "Pursuit 365, Monterey 385SS, Hatteras 60, TwinVee, WorldCat",
      gross_tons: 108,
      length_ft: 90,
      hp: 1600,
      waters: "Offshore Oahu, Big Island",
      duty: "Private charter & commercial fishing",
      position: "Master & Mechanic",
      period: "Apr 2025 – Current",
    },
    {
      name: "M/V Southern Explorer",
      classification: "97 GT charter",
      gross_tons: 97,
      length_ft: 90,
      hp: 1600,
      waters: "Offshore San Diego",
      duty: "Charter",
      position: "Master & Mate",
      period: "Aug 2024 – Jan 2025",
    },
    {
      name: "F/V Mr. B",
      classification: "41 GT commercial",
      gross_tons: 41,
      length_ft: 44,
      hp: 800,
      waters: "Offshore San Diego",
      duty: "Commercial fishing & passenger charter",
      position: "Master",
      period: "May 2024 – Oct 2024",
    },
    {
      name: "M/V Acorn II",
      classification: "Commercial dive vessel",
      gross_tons: 73,
      length_ft: 70,
      hp: 1100,
      waters: "Prince William Sound to Cook Inlet",
      duty: "Commercial dive operations",
      position: "Master (100 ton)",
      period: "Jul 2021 – May 2024",
    },
    {
      name: "Seatow Central Alaska",
      classification: "Fleet of 30–42′ offshore tow vessels",
      gross_tons: 30,
      length_ft: 42,
      hp: 0,
      waters: "PWS, Seward, Whittier, Offshore Alaska",
      duty: "Vessel tows, salvage, dock assist",
      position: "Master with tow assist",
      period: "May 2021 – Aug 2023",
    },
    {
      name: "Seatow San Diego",
      classification: "Fleet of 30–42′ offshore tow vessels",
      gross_tons: 30,
      length_ft: 42,
      hp: 0,
      waters: "San Diego, Mission Bay, offshore islands",
      duty: "Tows, salvage, dock assist",
      position: "Master with tow assist",
      period: "Aug 2022 – Jan 2023",
    },
    {
      name: "F/V Off The Leash",
      classification: "Volvo-powered 7 GT charter",
      gross_tons: 7,
      length_ft: 37,
      hp: 600,
      waters: "Prince William Sound & Resurrection Bay",
      duty: "Commercial fishing & passenger charter",
      position: "Master",
      period: "Apr 2019 – Apr 2024",
    },
    {
      name: "S/V Reality Check",
      classification: "Auxiliary sail",
      gross_tons: 6.5,
      length_ft: 34,
      hp: 12,
      waters: "Resurrection Bay",
      duty: "Day & overnight chartered sailing",
      position: "Master",
      period: "May 2021 – Aug 2023",
    },
    {
      name: "M/V Nomad",
      classification: "78′ chartered fishing",
      gross_tons: 55,
      length_ft: 78,
      hp: 1200,
      waters: "Offshore San Diego",
      duty: "Chartered fishing",
      position: "Relief Captain",
      period: "Aug 2021 – Dec 2021",
    },
    {
      name: "F/V Ptarmigan",
      classification: "40′ commercial",
      gross_tons: 10,
      length_ft: 40,
      hp: 650,
      waters: "Cordova & Prince William Sound",
      duty: "Commercial fishing",
      position: "Relief Captain",
      period: "Jul 2018 – Aug 2018",
    },
  ] satisfies Vessel[],

  certifications: [
    { name: "USCG Master 100-Ton Near Coastal (incl. sail/auxiliary)", group: "license" },
    { name: "Radar Observer · Unlimited", group: "license" },
    { name: "Able Seafarer · Unlimited", group: "license" },
    { name: "ARPA", group: "license" },
    { name: "Assistance Towing", group: "license" },
    { name: "FCC Marine Radio Operator", group: "license" },
    { name: "Lifeboat Operator", group: "license" },
    { name: "Wiper", group: "license" },
    { name: "Steward's Department (F.H.)", group: "license" },
    { name: "USCG Medical Certification", group: "license" },
    { name: "STCW II/4 — Rating forming part of a navigational watch (RFPNW)", group: "stcw" },
    { name: "STCW VI/1 — Basic Training (BT)", group: "stcw" },
    { name: "STCW VI/2 — Survival craft and rescue boats (PSC)", group: "stcw" },
    { name: "STCW VI/3 — Advanced Firefighting", group: "stcw" },
    { name: "Advanced Firefighting", group: "fire" },
    { name: "UFSAC Firefighter", group: "fire" },
    { name: "PADI Rescue Diver", group: "safety" },
    { name: "First Aid & CPR", group: "safety" },
    { name: "OSHA Hazmat", group: "safety" },
    { name: "FEMA Rescue Technician", group: "safety" },
    { name: "Various NIMS Certifications", group: "safety" },
    { name: "TWIC", group: "id" },
    { name: "USA Passport", group: "id" },
    { name: "Global Entry", group: "id" },
  ] satisfies Certification[],

  awaiting_mmc: [
    "200 Ton Oceans & Near Coastal Master / Mate",
    "VPDSD — Vessel Personnel with Designated Security Duties",
  ],

  education: {
    school: "Miami University",
    school_location: "Oxford, OH",
    degree: "B.S. Business Marketing · Minor in Naval Science",
    period: "May 2014",
    activities: [
      "Delta Sigma Pi Business Fraternity",
      "Full-time Firefighter / EMT",
      "Airport Manager",
      "Rock Climbing Course Instructor",
    ],
  },

  highlights: [
    { value: "1,000+", label: "Sea days logged" },
    { value: "10+", label: "Vessels captained" },
    { value: "100T", label: "USCG Master" },
    { value: "$139K", label: "Project in flight" },
  ],

  download: {
    pdf_url: "/resumes/john-thomas-captain-april6.pdf",
    pdf_label: "Original PDF (April 2026)",
  },

  // ───────────────────────────────────────────────────────────
  // Engineer / SaaS-hire framing — used by /work page + print view
  // ───────────────────────────────────────────────────────────
  engineer: {
    headline: "Solo full-stack AI engineer · Multi-product SaaS founder",
    tagline:
      "Ships agent-augmented production code. Lives in Honolulu (UTC-10) — overlaps US morning, async-friendly with Europe.",
    pitch:
      "I build AI-native SaaS end-to-end, alone — frontend, iOS, backend, infra, billing, ops. In 9 weeks of focused build I shipped 10+ products across the stack with Claude Code as primary collaborator, including a multi-tenant SaaS running a live $139K construction job for tenant one. Looking for a remote founding-engineer or staff role at an AI / vertical-SaaS company where shipping speed and depth of stack actually matter.",
    location: "Honolulu, Hawaii · UTC-10 · Remote",
    availability: "Available now · Open to founding / staff / senior eng roles",
  },

  velocity: [
    { value: "~12B", label: "Claude tokens processed", sub: "Through Claude Code on one Mac in 60 days" },
    { value: "580+", label: "Git commits", sub: "Across 10 active repos, Mar–May 2026" },
    { value: "600K+", label: "Lines of code shipped", sub: "Production code I wrote or directed" },
    { value: "10+", label: "Products live or shipping", sub: "Web, iOS, backend, multi-tenant SaaS" },
    { value: "29", label: "Files with Claude API integrations", sub: "Sonnet / Opus / Haiku across Python, TS, Swift" },
    { value: "13", label: "Production domains running", sub: "Cloudflare Pages + Vultr + Nginx Proxy Manager" },
  ],

  stack: [
    {
      group: "Frontend",
      items: [
        "Next.js 16 (App Router, RSC, ISR)",
        "Astro",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Framer Motion",
        "Cloudflare Pages",
      ],
    },
    {
      group: "iOS / native",
      items: [
        "Swift / SwiftUI",
        "RoomPlan (LiDAR scanning)",
        "ARKit",
        "Object Capture (photogrammetry)",
        "Keychain auth",
        "Combine",
      ],
    },
    {
      group: "Backend",
      items: [
        "FastAPI (Python 3.11+)",
        "Postgres + multi-tenant row-scoping",
        "SQLAlchemy",
        "Pydantic v2",
        "Docker + Docker Compose",
        "systemd",
        "Nginx Proxy Manager",
      ],
    },
    {
      group: "AI / agentic",
      items: [
        "Claude Sonnet / Opus / Haiku (4.5–4.7)",
        "Anthropic SDK (Python + TS)",
        "Prompt caching",
        "Structured outputs + JSON-mode",
        "Multi-turn agent workflows",
        "Claude Code (advanced — agents, hooks, MCP, skills)",
        "RoomPlan → Claude scope-generation pipelines",
      ],
    },
    {
      group: "Infra & ops",
      items: [
        "Vultr (Ubuntu, 2 vCPU box running 8+ Docker services)",
        "Cloudflare (DNS, Pages, Workers-style edge)",
        "Twilio (SMS notifications)",
        "Resend (transactional email)",
        "DocuSeal (e-sign)",
        "Stripe (subscription scaffolding)",
        "Uptime Kuma + custom metrics server",
      ],
    },
  ],

  products: [
    {
      name: "BlueWave Projects",
      domain: "bluewaveprojects.com",
      stage: "saas-shipping",
      summary:
        "Multi-tenant project management SaaS for design-build contractors. End-to-end auth, multi-tenant DB (15+ tables), AI scope generator, RoomPlan blueprints, client portals, change orders, Hawaii tax accounting, invoice + PDF generation, e-sign.",
      stack: "Next.js 16, FastAPI, Postgres, Cloudflare Pages, Claude API",
      role: "Sole engineer + designer + operator",
    },
    {
      name: "Ikena Portal",
      domain: "portal.ikenagroup.com",
      stage: "live-production",
      summary:
        "Production project room running a real $139,165 renovation. 9 ops tools (invoices, subs+GET, time, daily logs, documents, selections, change orders, blueprint, 3D editor). Auto-flows: invoice → PDF → client docs. Time clock-out (iOS) → /ops/time. CO approved → draft invoice line.",
      stack: "Next.js + FastAPI + Postgres + DocuSeal",
      role: "Built solo; tenant one of BlueWave Projects",
    },
    {
      name: "ProBuildCalc iOS",
      domain: "TestFlight + App Store track",
      stage: "ios-shipped",
      summary:
        "Polycam-class native scanning. Multi-room stitching, photo evidence pinning to AR world transforms, time-lapse compare with geometric diff, AI design overlay calling Claude Sonnet with scan + budget + style. Server endpoint live at /api/ikena/design-suggest.",
      stack: "Swift, SwiftUI, RoomPlan, ARKit, Object Capture, Claude API",
      role: "Sole iOS engineer; native LiDAR + AI integration",
    },
    {
      name: "Property Brief",
      domain: "bluewaveprojects.com/property-brief",
      stage: "saas-subscription",
      summary:
        "$15/mo homeowner subscription: weekly property data digests, saved-address list, welcome email, self-serve account page. Cron-driven generation, transactional email pipeline, signup → onboarding → recurring delivery.",
      stack: "Next.js, FastAPI cron, Postgres, Resend",
      role: "Solo build; subscription scaffolding live",
    },
    {
      name: "Aloha Off-Market Network",
      domain: "bluewaveprojects.com/aloha",
      stage: "saas-subscription",
      summary:
        "Hawaii off-market real-estate signal product. Three tiers ($99 / $499 / $1,500). Landing + signup + post-checkout /aloha/setup + founding-member welcome.",
      stack: "Next.js, FastAPI, Stripe-ready",
      role: "Solo build",
    },
    {
      name: "Hawaii Property Lookup",
      domain: "addressapi.portofcams.com",
      stage: "live-production",
      summary:
        "Address autocomplete + parcel card (TMK / island / county / acres / zone). Memos server-synced, /stats dashboard, adjacent parcels, recently-viewed, geofencing, OG images, share URLs, print/PDF letterhead, lead capture. Weekly auto-scrape across 4-island GIS schema.",
      stack: "TypeScript, Node, Postgres, Hawaii statewide ArcGIS + county REST + OSM Overpass fallback",
      role: "Built v1 → v5 in one session; production",
    },
    {
      name: "AI Services Backend",
      domain: "ai.portofcams.com",
      stage: "live-production",
      summary:
        "FastAPI backend powering everything above. 13+ routers: ikena (scans, blueprints, designs, projects, suppliers, leads, documents, invoices+pdf, subs, time-entries, daily-logs, selections, change-orders), bluewave (waitlist, contact, scope-suggest), property-brief, aloha. Multi-tenant routing scoped at every endpoint.",
      stack: "FastAPI, Pydantic v2, Postgres, Docker, Nginx Proxy Manager, Anthropic SDK",
      role: "Sole backend engineer",
    },
    {
      name: "Port of Cams",
      domain: "cams.portofcams.com",
      stage: "live-production",
      summary:
        "Live webcam streaming infrastructure — DVR-style timelapse capture, geo-tagged cams. Active on Vultr running ffmpeg pipelines (with systemd MemoryMax + StartLimit hardening after an OOM incident I caught + fixed).",
      stack: "ffmpeg, systemd, Node, Cloudflare Pages",
      role: "Solo build + ops",
    },
    {
      name: "Binnacle.ai",
      domain: "binnacle.ai",
      stage: "saas-shipping",
      summary:
        "AI-native side product. 35 commits over an overnight build session — full Next.js stack + Vultr deploy with concurrency-safe build watchdog after OOM incident.",
      stack: "Next.js, Vultr, custom build orchestration",
      role: "Solo build",
    },
    {
      name: "Capt J Dashboard",
      domain: "captj-dashboard.pages.dev",
      stage: "live-production",
      summary:
        "Cross-project admin: projects, todos, activity log, ideas, spending tracking. Backs every other project; 120 commits.",
      stack: "Next.js, Cloudflare Pages, REST API",
      role: "Solo build",
    },
    {
      name: "BlueWave School",
      domain: "bluewaveprojects.com/school",
      stage: "shipped-portfolio",
      summary:
        "8-wave AI curriculum, 61 lessons, hundreds of exercises. Built as a separate product, currently de-emphasized on main funnel.",
      stack: "Next.js, MDX",
      role: "Curriculum + build solo",
    },
    {
      name: "Earlier portfolio",
      domain: "various",
      stage: "shipped-portfolio",
      summary:
        "Perdiemify (perdiemify.com), Last Frontier Events, AlohaCalendar, HitchLife, RentReady, Workout BlueWave, Family Tree, CamDrop, Address API, ContractorCalc/ProBuildCalc web.",
      stack: "Mixed: Next.js, FastAPI, iOS, Cloudflare",
      role: "Solo across the board",
    },
  ],

  ai_evidence: [
    "Claude Sonnet 4.6 integrated into iOS ProBuildCalc scan → AI design suggestions endpoint, returning rationale + 6–10 prioritized scope items + inspiration keywords with location context baked in.",
    "Claude in the loop for Ikena scope generator (portal /ops) — RoomPlan scan + photos + address + style → phase-by-phase scope, line-item ranges, contingency, Hawaii sub-deduction computed.",
    "Multi-tenant prompt isolation: every Claude call is scoped to tenant_id with row-level data access — no cross-tenant leakage even when one model serves all customers.",
    "Token-budget aware: production endpoints use prompt caching to keep p99 latency and cost in check.",
    "Built and maintain bespoke Claude Code agents (skills, hooks, MCP servers) that automate code review, deployment, security audits, and customer-zero testing across the project suite.",
  ],

  remote_fit: [
    {
      title: "Time-zone friendly",
      detail:
        "Honolulu (Pacific/Honolulu, UTC-10). Overlaps US Pacific morning through afternoon; Europe evenings async. Async-first communicator; comfortable with PR-driven workflows.",
    },
    {
      title: "Ships into regulated industries",
      detail:
        "USCG-licensed Captain (100-ton Master, STCW, advanced firefighting, FCC). Hawaii GC-B contractor track in flight. I know how to ship software that touches money, safety, and compliance.",
    },
    {
      title: "Operates without supervision",
      detail:
        "Ran charter LLCs, dive operations, snowcat fleet, vessel salvage. Solo founder building 10+ products in parallel. I make decisions, document them, and ship — without needing a manager in the loop.",
    },
    {
      title: "Knows what 'AI in production' really takes",
      detail:
        "Not a wrapper around chat. Real LLM-in-loop deterministic workflows: prompt caching, structured outputs, retry / fallback ladders, multi-tenant isolation, observability, cost ceilings. I have scars and the system logs to prove it.",
    },
  ],
} as const;

export type Resume = typeof resume;
