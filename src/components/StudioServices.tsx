"use client";

import { useReveal } from "@/hooks/useReveal";

// Studio services for the homepage — AI consulting + custom apps + the
// AI school. Distinct from Services.tsx, which is the contractor-vertical
// pitch rendered on /contractors.

const services = [
  {
    title: "AI Consulting",
    blurb:
      "Strategy, prompt engineering, model selection, cost modeling, eval pipelines. From a one-off LLM workflow to a full agentic system in production.",
    bullets: [
      "Claude API + Anthropic SDK fluent",
      "Prompt caching · structured outputs",
      "Multi-tenant prompt isolation",
      "Cost + latency p99 instrumentation",
    ],
    cta: { label: "Book a discovery call", href: "/booking" },
    tone: "wave",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4.5v15M4.5 12h15" strokeLinecap="round" />
        <circle cx="12" cy="12" r="7" />
      </svg>
    ),
  },
  {
    title: "Custom AI Apps",
    blurb:
      "Full-stack AI-native apps shipped end-to-end. Web (Next.js), iOS (Swift + RoomPlan + Object Capture), backend (FastAPI / Postgres). Twelve products live to prove it.",
    bullets: [
      "Next.js 16 · React 19 · Tailwind 4",
      "Swift + RoomPlan + ARKit",
      "FastAPI · Postgres · Docker · Vultr",
      "Cloudflare Pages + edge functions",
    ],
    cta: { label: "See the apps", href: "#apps" },
    tone: "ocean",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Multi-Tenant SaaS",
    blurb:
      "Build a SaaS from scratch or extract one from an existing client app. Row-level tenant isolation, signup + billing scaffolding, transactional email, audit trails — same playbook BlueWave Projects ships on.",
    bullets: [
      "Phase-1 tenant scoping (15+ tables)",
      "Stripe billing + webhook handlers",
      "Auth + invite + role permissions",
      "Tenant-scoped LLM workflows",
    ],
    cta: { label: "Talk about a SaaS build", href: "/booking" },
    tone: "lava",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
        <path d="M12 3v18M3 7l9 4M21 7l-9 4" />
      </svg>
    ),
  },
  {
    title: "BlueWave AI School",
    blurb:
      "Learn AI the way operators actually use it. Eight skill waves, 61 lessons, hundreds of hands-on exercises. From foundations to multi-agent workflows — practiced inside a live sandbox.",
    bullets: [
      "9 waves · 61 lessons · live sandbox",
      "XP, streaks, certificates per wave",
      "Operator-grade (no slide decks)",
      "$79/mo solo · $249/mo + coaching",
    ],
    cta: { label: "See the curriculum", href: "/school" },
    tone: "glacier",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6c4 0 4 3 9 3s5-3 9-3" />
        <path d="M3 12c4 0 4 3 9 3s5-3 9-3" />
        <path d="M3 18c4 0 4 3 9 3s5-3 9-3" />
      </svg>
    ),
  },
];

const toneStyle: Record<string, { border: string; bg: string; text: string; iconBg: string }> = {
  wave: {
    border: "border-wave-500/25",
    bg: "bg-wave-500/5",
    text: "text-wave-400",
    iconBg: "from-wave-500 to-ocean-500",
  },
  ocean: {
    border: "border-ocean-500/25",
    bg: "bg-ocean-500/5",
    text: "text-ocean-300",
    iconBg: "from-ocean-400 to-ocean-700",
  },
  lava: {
    border: "border-lava-500/25",
    bg: "bg-lava-500/5",
    text: "text-lava-500",
    iconBg: "from-lava-500 to-amber-400",
  },
  glacier: {
    border: "border-glacier-300/25",
    bg: "bg-glacier-300/5",
    text: "text-glacier-200",
    iconBg: "from-glacier-300 to-wave-500",
  },
};

function ServiceCard({ s, i, inView }: { s: (typeof services)[number]; i: number; inView: boolean }) {
  const t = toneStyle[s.tone];
  const delay = i >= 1 && i <= 8 ? `reveal-d-${i}` : "";
  return (
    <div
      className={`reveal-up ${delay} ${inView ? "in" : ""} glass rounded-2xl p-7 sm:p-8 flex flex-col border ${t.border}`}
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.iconBg} flex items-center justify-center text-white shadow-lg mb-5`}>
        {s.icon}
      </div>

      <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
      <p className="text-white/55 leading-relaxed mb-5">{s.blurb}</p>

      <ul className="space-y-2 mb-6 flex-grow">
        {s.bullets.map((b) => (
          <li key={b} className="flex gap-3 text-sm text-white/65 leading-relaxed">
            <span className={`mt-1.5 h-1 w-1 rounded-full ${t.text.replace("text-", "bg-")} shrink-0`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <a
        href={s.cta.href}
        className={`inline-flex items-center gap-2 text-sm font-medium ${t.text} hover:text-white transition-colors`}
      >
        {s.cta.label}
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

export default function StudioServices() {
  const { ref, inView } = useReveal();

  return (
    <section id="services" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`reveal-up ${inView ? "in" : ""} text-center mb-16`}
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            What the studio does
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            AI consulting,
            <br className="sm:hidden" />
            <span className="text-gradient"> custom apps, and a school.</span>
          </h2>
          <p className="text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
            Four ways to work with BlueWave — from a one-off consult to a full multi-tenant SaaS build to learning to ship your own apps in the AI School.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
