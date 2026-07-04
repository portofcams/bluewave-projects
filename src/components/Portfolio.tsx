"use client";

import { useReveal } from "@/hooks/useReveal";

// Each project has either a `logo` (path to a real favicon/logo image in
// /public/logos) or an `icon` (inline SVG mark). Cards render the real
// logo on a dark chip when present; otherwise the SVG mark renders on the
// project's gradient. Order is curated — flagships up top.

type Project = {
  name: string;
  tag: string;
  description: string;
  tech: string[];
  color: string;
  link: string;
  stat: string;
  logo?: string;
  icon?: React.ReactNode;
  appStoreLinks?: { name: string; url: string }[];
};

const projects: Project[] = [
  {
    name: "Ikena",
    tag: "Flagship App · Premium",
    description:
      "The complete operator suite for property, contracting, and real estate. Sixteen ops modules on the web — projects, invoices with Hawaii GET handled, subs, time, change orders, blueprint + 3D editor, leads, employees, handbook. Plus the iOS scanner. Built by an operator running real Hawaii jobs.",
    tech: ["Next.js 16", "FastAPI", "Postgres", "Claude API"],
    color: "from-wave-400 to-ocean-500",
    link: "/ikena",
    stat: "Web $79 · Suite $99 · Enterprise from $499",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9.75l9-7 9 7v11.25a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 21V9.75z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    name: "Ikena Permit",
    tag: "AI Pre-Check · Early Access",
    description:
      "Upload a plan set, get every probable ROH §21, IBC, and Honolulu LUO violation back in 30 minutes — citation-anchored, verbatim code sections. Variance narrative drafts and DPP comment-response drafts included. Built for self-certifying Hawaii architects who want an independent compliance read before they sign.",
    tech: ["Next.js 16", "FastAPI", "Claude Opus", "Stripe"],
    color: "from-teal-500 to-cyan-400",
    link: "https://permit.ikenagroup.com",
    stat: "$299 / check · $599 / mo firm seat",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Binnacle.ai",
    tag: "Maritime SaaS",
    description:
      "Bridge-intelligence platform for commercial mariners and fleet operators. IEC 62388 ARPA radar with target trails and guard zones, voice bridge interface, port-captain prompt drafting, class-society audit log, crew credential tracking, inspection prep, and USCG regulation lookup. Built by a 100-ton USCG Master who has actually run the inspections. The native iOS suite is live on the App Store — Binnacle AI, Binnacle Harbor, Binnacle Dockmaster, and Binnacle School (USCG exam study) — plus Binnacle Arcade, 38 maritime mini-games for crew downtime.",
    tech: ["Next.js", "PostgreSQL", "Claude AI", "Stripe"],
    color: "from-blue-600 to-indigo-500",
    link: "https://binnacleai.com",
    stat: "Sub-M operators · 5 iOS apps live",
    appStoreLinks: [
      { name: "Binnacle AI", url: "https://apps.apple.com/app/id6770324114" },
      { name: "Binnacle Harbor", url: "https://apps.apple.com/app/id6771552119" },
      { name: "Binnacle Dockmaster", url: "https://apps.apple.com/app/id6771552759" },
      { name: "Binnacle School", url: "https://apps.apple.com/app/id6778185737" },
      { name: "Binnacle Arcade", url: "https://apps.apple.com/app/id6777791460" },
    ],
    logo: "/logos/binnacle.png",
  },
  {
    name: "Binnacle Radar",
    tag: "Maritime · IEC 62388",
    description:
      "Full IEC 62388 ARPA bridge radar in the browser — no hardware required. AIS symbol set (triangle/cross/box), target trails, guard zones with breach alarms, auto-acquisition, ROT indicator, relative-motion vectors, and a real-time simulation clock. Ships as a tab inside Binnacle AI and at radar.binnacleai.com.",
    tech: ["React", "Canvas API", "AIS / ARPA", "Next.js"],
    color: "from-blue-900 to-sky-600",
    link: "https://radar.binnacleai.com",
    stat: "Features 1-12 live",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round" />
        <path d="M12 12l5-5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "PermitPaddler",
    tag: "Hawaiʻi STR Compliance SaaS",
    description:
      "Hawaiʻi short-term rental compliance — all 4 counties. TVR / STRH / NUC / STVR permit tracking, GET + TAT + county-TAT filings, AI document classifier, and 30/14/7/3/1-day reminders. Free TMK lookup and printable 2026 tax calendar.",
    tech: ["Next.js 16", "Prisma", "Postgres", "Claude API", "Stripe"],
    color: "from-cyan-500 to-teal-500",
    link: "https://permitpaddler.ikenagroup.com",
    stat: "$79 / $199 / $499 · 4 counties",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12c3-3 6-3 9 0s6 3 9 0" strokeLinecap="round" />
        <path d="M3 17c3-3 6-3 9 0s6 3 9 0" strokeLinecap="round" />
        <path d="M12 4v4M10 6h4" strokeLinecap="round" />
        <circle cx="12" cy="10" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "BinnacleHarbor",
    tag: "Harbor SaaS · Concierge setup",
    description:
      "Harbor and marina management built for harbormasters, not accountants. Live SVG slip map, 30-second vessel check-in, automated nightly billing, NOAA storm alerts, owner PWA. We pre-set every harbor up for the operator before first login — no computer experience needed.",
    tech: ["Next.js 16", "Prisma", "Stripe Connect", "PWA"],
    color: "from-sky-500 to-blue-600",
    link: "https://binnacleharbor.com",
    stat: "$79 / $179 / $349 · 30-day free trial",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v6M9 5h6" strokeLinecap="round" />
        <circle cx="12" cy="13" r="3" />
        <path d="M3 21c2.5-2 4-2 6 0s4 2 6 0 4-2 6 0" strokeLinecap="round" />
        <path d="M5 17l1-4h12l1 4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Ikena Portal — tenant zero",
    tag: "Production reference",
    description:
      "The live tenant-zero instance of Ikena, in continuous production use. Every module — invoices, subs & GET, time, daily logs, documents, selections, change orders, blueprint, 3D editor — exercised on real work. The proof that the platform handles a real Hawaii residential job end-to-end.",
    tech: ["Next.js", "FastAPI", "DocuSeal", "Postgres"],
    color: "from-slate-700 to-cyan-500",
    link: "https://portal.ikenagroup.com",
    stat: "Live · in production",
    logo: "/logos/ikena.png",
  },
  {
    name: "Hawaii 3D Map",
    tag: "Geospatial Product",
    description:
      "Every parcel, building, and address in Hawaiʻi as TypeScript — served as a 3D map. 384,262 statewide TMK parcels, 239,458 Honolulu building footprints with real heights, 204,775 address points. Click any property → instant TMK, acres, qPublic link.",
    tech: ["Three.js", "Hawaii GIS", "ArcGIS", "TypeScript"],
    color: "from-emerald-500 to-sky-400",
    link: "https://maps.ikenagroup.com",
    stat: "384K parcels · 4 islands",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" strokeLinejoin="round" />
        <path d="M9 3v15M15 6v15" />
      </svg>
    ),
  },
  {
    name: "Property Brief",
    tag: "Subscription Product",
    description:
      "Weekly Hawaii property data digest for homeowners and investors. TMK, zoning, lava zone, permit history, comps — your saved addresses every Wednesday. Built on the same Hawaii data layer as the scope generator.",
    tech: ["Next.js", "FastAPI cron", "Resend", "Hawaii GIS"],
    color: "from-ocean-500 to-glacier-300",
    link: "/property-brief",
    stat: "$15 / month · waitlist open",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    name: "Aloha Off-Market Network",
    tag: "Real Estate Signals",
    description:
      "Deal flow before MLS. Hawaii adjacency alerts, distressed-permit signals, intros to vetted agents and lenders. Three tiers — $99 watcher, $499 builder, $1,500 founding member.",
    tech: ["Next.js", "FastAPI", "Stripe", "Hawaii GIS"],
    color: "from-lava-500 to-amber-400",
    link: "/aloha",
    stat: "$99 / $499 / $1500 tiers",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 18l4-8 5 6 4-3 5 5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="10" r="1.2" fill="currentColor" />
        <circle cx="12" cy="16" r="1.2" fill="currentColor" />
        <circle cx="16" cy="13" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Port of Cams",
    tag: "Live Platform",
    description:
      "Real-time webcam streaming from Hawaii, Alaska, and the Pacific Northwest plus DOT traffic feeds across 50 states. 14,400+ live cameras with HD/Lite toggle, interactive maps, and multi-view grids.",
    tech: ["Astro", "React", "HLS.js", "Cloudflare"],
    color: "from-ocean-500 to-wave-400",
    link: "https://portofcams.com",
    stat: "14,400+ Live Cameras",
    logo: "/logos/portofcams.svg",
  },
  {
    name: "AlohaCalendar",
    tag: "Events Platform",
    description:
      "Automated Hawaii events calendar with 13 scrapers, AI image enrichment, Stripe ticketing, and newsletter automation. Self-updating every 30 minutes.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    color: "from-emerald-500 to-teal-400",
    link: "https://alohacalendar.com",
    stat: "13 Auto-Scrapers",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    name: "Da Plate Lunch",
    tag: "Hawaii Directory · Live",
    description:
      "Locals-first Hawaii plate lunch directory — the anti-Yelp. Every local spot, pidgin descriptions, real vibes. Restaurant profiles, verified reviews, photo uploads, Sign in with Apple, and a $29/mo featured-listing subscription for operators. Built for the kind of place that doesn't have a marketing budget.",
    tech: ["Next.js", "Prisma", "Postgres", "Stripe"],
    color: "from-orange-500 to-red-500",
    link: "https://daplatelunchindex.com",
    stat: "$29 / mo featured · live",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12h8M12 8v8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Aina Atlas",
    tag: "iOS + Web · Hawaii",
    description:
      "Hawaii land stewardship app — TMK-anchored property intelligence meets cultural context. Live on the App Store, plus web SIWA and backend API. Three IAPs, parcel detail, and a 3D geospatial layer built on the same GIS data stack as the Hawaii Property Lookup.",
    tech: ["Swift", "SwiftUI", "Next.js", "FastAPI"],
    color: "from-green-700 to-emerald-500",
    link: "https://ainaatlas.com",
    stat: "Live on the App Store · 3 IAPs",
    appStoreLinks: [{ name: "Aina Atlas", url: "https://apps.apple.com/app/id6770377344" }],
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    name: "pocTickets",
    tag: "Ticketing · Stripe Connect",
    description:
      "Full-stack event ticketing platform with Stripe Connect organizer payouts, QR-code check-in, destination charges, and a public event storefront. Built to serve Pacific Harbor events without the 20% take that the big ticketing platforms skim.",
    tech: ["Next.js", "Stripe Connect", "Prisma", "QR"],
    color: "from-violet-600 to-purple-500",
    link: "https://poctickets.com",
    stat: "Live · sk_live",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9v6a1 1 0 001 1h16a1 1 0 001-1V9a2 2 0 01-2-2H5a2 2 0 01-2 2z" />
        <path d="M9 16v2M12 16v2M15 16v2" strokeLinecap="round" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    ),
  },
  {
    name: "Last Frontier Events",
    tag: "Events Platform",
    description:
      "Alaska's premier event discovery platform. Aggregates events from multiple sources with deals, northern lights viewing, and region-based browsing across 6 Alaska regions.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Scrapers"],
    color: "from-amber-500 to-yellow-400",
    link: "https://lastfrontierevents.com",
    stat: "6 Alaska Regions",
    logo: "/logos/lastfrontier.png",
  },
  {
    name: "claude-prompt-cache",
    tag: "Open Source · MIT",
    description:
      "Drop-in prompt-caching helpers for the Anthropic Python SDK. cache_system() auto-applies cache_control markers respecting the 1024-token minimum + 4-block per-request cap. CacheMetrics tracks hit-rate and surfaces dollar cost. Extracted from BlueWave Projects' production LLM pipelines.",
    tech: ["Python", "Anthropic SDK", "pytest", "MIT"],
    color: "from-amber-400 to-orange-500",
    link: "https://github.com/portofcams/claude-prompt-cache",
    stat: "Public · 15/15 tests pass",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "ProtestTracker",
    tag: "Civic Data · Live",
    description:
      "Global protest tracker — Next.js + Prisma + Postgres. Just relaunched: rebuilt container, attached persistent pgdata volume, restored DNS, behind the same Vultr / Nginx Proxy Manager stack as the rest of the studio.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Docker"],
    color: "from-rose-500 to-orange-500",
    link: "https://protestracker.portofcams.com",
    stat: "Live · ProtestPulse",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        <circle cx="17" cy="8" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Hawaii Property Lookup",
    tag: "Public Tool + API",
    description:
      "Address autocomplete + parcel card (TMK, island, county, acres, zone) backed by statewide ArcGIS, county REST endpoints, and OSM Overpass. Memos, /stats dashboard, adjacent parcels, geofencing, print/PDF letterhead, lead capture.",
    tech: ["TypeScript", "Postgres", "Hawaii GIS", "Vultr"],
    color: "from-violet-500 to-purple-400",
    link: "https://addressapi.portofcams.com",
    stat: "4-island coverage",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    name: "ProBuildCalc",
    tag: "iOS · Entry tier",
    description:
      "The lighter sibling of Ikena. iOS-only — Apple RoomPlan + Object Capture, multi-room stitching, AI ballpark, send-as-lead. For operators who just need a measure-and-quote tool in their pocket. Upgrade path to Ikena Suite when you need the web admin too.",
    tech: ["Swift", "RoomPlan", "Object Capture", "Claude API"],
    color: "from-lava-500 to-amber-400",
    link: "https://probuildcalc.com",
    stat: "$19 / mo · Live on the App Store",
    appStoreLinks: [{ name: "ProBuildCalc", url: "https://apps.apple.com/app/id6773896754" }],
    logo: "/logos/probuildcalc.png",
  },
  {
    name: "Family Tree",
    tag: "Personal App",
    description:
      "Interactive family tree builder with photo uploads, relationship mapping, and beautiful visualizations. Preserve your family history digitally.",
    tech: ["Python", "FastAPI", "D3.js", "Docker"],
    color: "from-emerald-500 to-green-400",
    link: "#",
    stat: "Visual Heritage",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    name: "CamDrop",
    tag: "B2B SaaS",
    description:
      "Construction site timelapse cameras. Weatherproof cameras that capture months of progress into shareable timelapses. Perfect for builders, developers, and project managers.",
    tech: ["Next.js", "HLS.js", "Cloudflare", "Stripe"],
    color: "from-sky-500 to-cyan-400",
    link: "#",
    stat: "$99/mo Starter Plan",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, inView } = useReveal();
  const delayClass = index >= 1 && index <= 8 ? `reveal-d-${index}` : "";

  const inDev = project.link === "#";

  return (
    <div
      ref={ref}
      className={`reveal-up ${delayClass} ${inView ? "in" : ""} group glass glass-hover rounded-2xl p-8 flex flex-col h-full transition-all duration-500 ${
        inDev ? "opacity-60 hover:opacity-90" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        {project.logo ? (
          <div className="w-14 h-14 rounded-xl bg-white/95 p-1.5 flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src={project.logo}
              alt={`${project.name} logo`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white shadow-lg`}
          >
            {project.icon}
          </div>
        )}
        <div className="flex flex-col items-end gap-1 max-w-[55%]">
          {inDev && (
            <span className="text-[10px] font-semibold text-amber-300/90 uppercase tracking-widest px-2 py-0.5 rounded-full border border-amber-300/30 bg-amber-300/5">
              Coming Soon
            </span>
          )}
          <span className="text-xs font-medium text-white/30 uppercase tracking-widest text-right">
            {project.tag}
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
        {project.name}
      </h3>

      <p className="text-white/40 leading-relaxed mb-6 flex-grow text-sm">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/5"
          >
            {t}
          </span>
        ))}
      </div>

      {project.appStoreLinks && project.appStoreLinks.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.appStoreLinks.map((app) => (
            <a
              key={app.url}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/90 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <svg viewBox="0 0 384 512" className="w-3 h-3 fill-current">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              {app.name}
            </a>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-sm font-medium text-white/50">{project.stat}</span>
        {project.link !== "#" ? (
          <a
            href={project.link}
            target={project.link.startsWith("http") ? "_blank" : undefined}
            rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-sm text-ocean-400 hover:text-ocean-300 transition-colors flex items-center gap-1"
          >
            Visit
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        ) : (
          <span className="text-sm text-white/20">In Development</span>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { ref, inView } = useReveal();

  return (
    <section id="apps" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`reveal-up ${inView ? "in" : ""} text-center mb-20`}
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            The apps
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Built. Shipped.</span>{" "}
            <span className="text-gradient">Running.</span>
          </h2>
          <p className="text-lg text-white/45 max-w-2xl mx-auto">
            Twenty live products under active maintenance — web, iOS, AI, infra. Each card links to the live site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
