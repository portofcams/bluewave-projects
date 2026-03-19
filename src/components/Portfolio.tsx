"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
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
    name: "ContractorCalc",
    tag: "Business Tool",
    description:
      "Smart calculator for contractors to estimate jobs, track costs, and manage projects. Built with AI-assisted estimation and mobile-first design.",
    tech: ["Next.js", "Prisma", "Capacitor", "Claude AI"],
    color: "from-lava-500 to-amber-400",
    link: "https://contract.portofcams.com",
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
    name: "Address API",
    tag: "Developer API",
    description:
      "Fast, reliable address validation and geocoding API for developers. Clean RESTful endpoints, high uptime, and built for integration.",
    tech: ["Node.js", "REST API", "Geocoding", "Vultr"],
    color: "from-violet-500 to-purple-400",
    link: "https://addressapi.portofcams.com",
    stat: "99.9% Uptime",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    name: "RentReady",
    tag: "Mobile App",
    description:
      "Rental property inspection app with photo documentation, checklists, and report generation. Cross-platform with offline support.",
    tech: ["React", "Capacitor", "Supabase", "iOS"],
    color: "from-rose-500 to-pink-400",
    link: "#",
    stat: "iOS & Web",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    name: "WagonWheel Trading",
    tag: "Trading Platform",
    description:
      "Options trading platform built on the Wheel strategy. Scans 1,097 stocks every 5 minutes, scores them for suitability, and generates trade ideas based on your capital and risk tolerance. Built on 625+ real trades.",
    tech: ["Web App", "Options Data", "Real-Time", "Scoring Engine"],
    color: "from-amber-500 to-yellow-400",
    link: "https://wagonwheeltrading.com",
    stat: "$96K Realized Profits",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v-5.5m3 5.5V8.25m3 3v-2" />
      </svg>
    ),
  },
  {
    name: "HitchLife",
    tag: "Travel Platform",
    description:
      "Social travel platform connecting adventurers. Route sharing, trip planning, and community features for the wanderlust crowd.",
    tech: ["React", "Supabase", "PWA", "Maps"],
    color: "from-sky-500 to-cyan-400",
    link: "#",
    stat: "Coming Soon",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group glass glass-hover rounded-2xl p-8 flex flex-col h-full transition-all duration-500"
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
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="portfolio" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Our Work
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Built. Shipped.</span>{" "}
            <span className="text-gradient">Running.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Live products generating real traffic. Every project in our portfolio
            is built, deployed, and actively maintained by our team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
