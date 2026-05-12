"use client";

import { useReveal } from "@/hooks/useReveal";

const projects = [
  {
    name: "BlueWave Projects",
    tag: "Multi-Tenant SaaS",
    description:
      "Project room for design-build contractors. AI scope generator, RoomPlan blueprints, client-shareable timelines, Hawaii GET tax handling. Multi-tenant — Tenant 1 (Ikena) is actively running a $139K renovation through the system.",
    tech: ["Next.js 16", "FastAPI", "Postgres", "Claude API"],
    color: "from-wave-400 to-ocean-500",
    link: "/contractors",
    stat: "Live · Tenant 1 running real jobs",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9.75l9-7 9 7v11.25a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 21V9.75z" />
        <path d="M9 22V12h6v10" />
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
      "Real-time webcam streaming from Hawaii, Alaska, and the Pacific Northwest. Hundreds of live cameras with HD/Lite toggle, interactive maps, and multi-view grids.",
    tech: ["Astro", "React", "HLS.js", "Cloudflare"],
    color: "from-ocean-500 to-wave-400",
    link: "https://portofcams.com",
    stat: "400+ Live Cameras",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    name: "Binnacle.ai",
    tag: "Maritime SaaS",
    description:
      "AI-powered USCG compliance platform for commercial mariners and operators. Credential tracking, inspection prep, regulation lookup, and rotation planning for the maritime industry.",
    tech: ["Next.js", "PostgreSQL", "Claude AI", "Stripe"],
    color: "from-blue-600 to-indigo-500",
    link: "https://binnacleai.com",
    stat: "USCG Compliance",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path d="M12 3v18M3 12h18M12 7.5l3 3-3 3-3-3 3-3z" />
      </svg>
    ),
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
    name: "Last Frontier Events",
    tag: "Events Platform",
    description:
      "Alaska's premier event discovery platform. Aggregates events from multiple sources with deals, northern lights viewing, and region-based browsing across 6 Alaska regions.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Scrapers"],
    color: "from-amber-500 to-yellow-400",
    link: "https://lastfrontierevents.com",
    stat: "6 Alaska Regions",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    name: "Ikena Design & Build",
    tag: "Active GC Practice",
    description:
      "Honolulu design-build practice — also Tenant 1 of BlueWave Projects. Currently running a $139,165 Puuikena Drive renovation through the BlueWave portal end-to-end: scope, blueprints, change orders, GET tax handling.",
    tech: ["Next.js", "iOS", "ARKit", "LiDAR"],
    color: "from-slate-700 to-cyan-500",
    link: "https://ikenagroup.com",
    stat: "$139K project running",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2.25 21h19.5M3 21V8.25l9-6 9 6V21M9 21V12h6v9M9 7.5h.008v.008H9V7.5zm3 0h.008v.008H12V7.5zm3 0h.008v.008H15V7.5z" />
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
    tag: "Business Tool",
    description:
      "Smart calculator for contractors to estimate jobs, track costs, and manage projects. Built with AI-assisted estimation and mobile-first design.",
    tech: ["Next.js", "Prisma", "Capacitor", "Claude AI"],
    color: "from-lava-500 to-amber-400",
    link: "https://probuildcalc.com",
    stat: "AI-Powered Estimates",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm-6.004-9h9.004a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5h-9.004a1.5 1.5 0 01-1.5-1.5v-12a1.5 1.5 0 011.5-1.5z" />
      </svg>
    ),
  },
  {
    name: "Perdiemify",
    tag: "Finance App",
    description:
      "Per diem rate calculator and tracker for travelers and remote workers. Instant GSA rate lookups, trip logging, and expense reporting made dead simple.",
    tech: ["FastAPI", "React", "GSA Data", "Python"],
    color: "from-emerald-500 to-teal-400",
    link: "https://perdiemify.com",
    stat: "All 50 States Covered",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18v-.008zm-12 0h.008v.008H6v-.008z" />
      </svg>
    ),
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
  project: (typeof projects)[number];
  index: number;
}) {
  const { ref, inView } = useReveal();
  const delayClass = index >= 1 && index <= 8 ? `reveal-d-${index}` : "";

  return (
    <div
      ref={ref}
      className={`reveal-up ${delayClass} ${inView ? "in" : ""} group glass glass-hover rounded-2xl p-8 flex flex-col h-full transition-all duration-500`}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white shadow-lg`}
        >
          {project.icon}
        </div>
        <span className="text-xs font-medium text-white/30 uppercase tracking-widest">
          {project.tag}
        </span>
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

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-sm font-medium text-white/50">{project.stat}</span>
        {project.link !== "#" ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
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
            Live products under active maintenance — web, iOS, AI, infra. Each card links to the live site.
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
