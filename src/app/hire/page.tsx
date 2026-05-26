import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TrackedCTA } from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Hire BlueWave Projects — AI software studio · Honolulu",
  description:
    "Engage the BlueWave Projects studio for AI consulting, a custom app build, or an ongoing engineering retainer. Hawai'i-based, remote-fluent, 20 production apps shipped.",
  alternates: { canonical: "https://bluewaveprojects.com/hire" },
  openGraph: {
    title: "Hire BlueWave Projects — AI software studio",
    description:
      "AI consulting, custom app builds, and engineering retainers from a Honolulu studio with 20 production apps shipped.",
    url: "https://bluewaveprojects.com/hire",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const engagements = [
  {
    title: "AI Consulting",
    tag: "One-off or recurring",
    price: "Day rate · contact for quote",
    description:
      "Strategy, architecture, and prompt engineering. Bring us in to evaluate an LLM integration, audit an existing pipeline, or design a multi-agent system before you build it.",
    deliverables: [
      "LLM stack selection and cost modeling",
      "Prompt architecture and caching strategy",
      "Eval pipeline design",
      "Claude API integration and structured outputs",
      "Written recommendations or async Loom walkthrough",
    ],
    color: "from-wave-500 to-ocean-500",
    border: "border-wave-500/25",
    accent: "text-wave-400",
    cta: "Book a discovery call",
  },
  {
    title: "Custom App Build",
    tag: "Fixed scope · 4–10 week sprint",
    price: "From $15K · scoped per project",
    description:
      "A complete production app — web, iOS, or both — designed, built, deployed, and handed off running. Every app in the portfolio below was built this way.",
    deliverables: [
      "Next.js web app or Swift iOS app (or both)",
      "FastAPI backend + Postgres on Vultr or your infra",
      "Stripe billing, auth, transactional email",
      "Claude API integration if the project calls for it",
      "Deployed, documented, and yours to operate",
    ],
    color: "from-ocean-400 to-ocean-700",
    border: "border-ocean-500/25",
    accent: "text-ocean-300",
    cta: "Start a scoping call",
  },
  {
    title: "Engineering Retainer",
    tag: "Ongoing partnership",
    price: "From $5K / month",
    description:
      "Dedicated engineering hours each month — features, fixes, migrations, infrastructure. Treat the studio as a fractional senior engineer embedded in your product team.",
    deliverables: [
      "Committed hours per month (scoped upfront)",
      "Weekly async status + GitHub activity",
      "Priority turnaround on critical issues",
      "Direct Slack / iMessage access",
      "Month-to-month, cancel anytime",
    ],
    color: "from-lava-500 to-amber-400",
    border: "border-lava-500/25",
    accent: "text-lava-500",
    cta: "Talk about a retainer",
  },
];

const proofPoints = [
  {
    name: "Ikena",
    result: "Full operator SaaS — 16 modules, invoicing, subs, GET tax, blueprints, iOS scanner. Running a live Hawaii renovation as tenant-zero.",
    link: "https://ikenagroup.com",
  },
  {
    name: "PermitPaddler",
    result: "Hawai'i STR compliance SaaS — all 4 counties, AI doc classifier, tax calendar, $79–$499 tiered billing. Live.",
    link: "https://permitpaddler.ikenagroup.com",
  },
  {
    name: "Binnacle.ai",
    result: "USCG compliance platform for commercial mariners — credential tracking, inspection prep, Claude-powered regulation lookup.",
    link: "https://binnacleai.com",
  },
  {
    name: "Ikena Permit",
    result: "AI plan-set review for Hawaii architects — citation-anchored code violations in 30 minutes. $299/check or $599/mo firm seat.",
    link: "https://permit.ikenagroup.com",
  },
  {
    name: "BinnacleHarbor",
    result: "Harbor management SaaS — live SVG slip map, 30-second vessel check-in, automated nightly billing, NOAA storm alerts.",
    link: "https://binnacleharbor.com",
  },
  {
    name: "AlohaCalendar",
    result: "13-scraper Hawaii events platform with AI image enrichment, Stripe ticketing, and newsletter automation. Self-updating every 30 minutes.",
    link: "https://alohacalendar.com",
  },
];

const steps = [
  {
    n: "01",
    title: "Discovery call",
    detail: "30 minutes. You describe the problem, the current state, and what success looks like. No prep required — just show up.",
  },
  {
    n: "02",
    title: "Scoped proposal",
    detail: "Within 3 business days: a written scope, stack recommendation, timeline, and fixed price (for builds) or hourly rate (for consulting).",
  },
  {
    n: "03",
    title: "Build and ship",
    detail: "Weekly async updates, GitHub commits you can watch in real time, and a deployed product at the end — not a Figma file.",
  },
];

const faqs = [
  {
    q: "Who is this for?",
    a: "Operators, founders, and small teams who need production software and don't have a full engineering team. Most clients are in regulated or paperwork-heavy industries — construction, real estate, maritime, hospitality, compliance. If you're in Hawaii, that's a bonus.",
  },
  {
    q: "What do I need to have ready before I reach out?",
    a: "Nothing formal. A rough description of the problem and a sense of budget range is enough to start. The scoping call is where we turn that into a real plan.",
  },
  {
    q: "Do you only work on Hawaii projects?",
    a: "No — but Hawaii operators get a studio that already understands the regulatory landscape (GET, TAT, county rules, DPP permitting). Remote clients are welcome in any industry that maps to the stack.",
  },
  {
    q: "What stack do you build in?",
    a: "Next.js 16 + React 19 for web, Swift + RoomPlan + ARKit for iOS, FastAPI + Postgres for backend, Docker on Vultr or your cloud, Cloudflare for edge and DNS. Claude API for anything that needs a language model inside.",
  },
];

export default function HirePage() {
  return (
    <main className="ocean-gradient min-h-screen text-white">
      <Nav />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/60 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Honolulu studio · taking new clients
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
          Hire the studio.
          <br />
          <span className="text-gradient">Get it shipped.</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/65 max-w-3xl mx-auto leading-relaxed mb-10">
          Three ways to engage BlueWave Projects — a one-off AI consult, a fixed-scope custom
          build, or a monthly engineering retainer. Twenty production apps shipped as proof
          we can do it.
        </p>
        <TrackedCTA
          href="/booking"
          location="hire-hero"
          className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg"
        >
          Book a discovery call →
        </TrackedCTA>
      </section>

      {/* Engagement types */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Engagement types
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Three ways to work together.
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {engagements.map((e) => (
            <div key={e.title} className={`glass rounded-2xl p-7 flex flex-col border ${e.border}`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${e.color} flex items-center justify-center text-white shadow-lg mb-5`}>
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {e.title === "AI Consulting" && (
                    <><path d="M12 4.5v15M4.5 12h15" strokeLinecap="round" /><circle cx="12" cy="12" r="7" /></>
                  )}
                  {e.title === "Custom App Build" && (
                    <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>
                  )}
                  {e.title === "Engineering Retainer" && (
                    <><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" strokeLinecap="round" strokeLinejoin="round" /></>
                  )}
                </svg>
              </div>

              <div className="mb-1">
                <span className={`text-xs uppercase tracking-widest font-medium ${e.accent}`}>{e.tag}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{e.title}</h3>
              <p className="text-sm text-white/40 mb-4 font-mono">{e.price}</p>
              <p className="text-white/60 leading-relaxed mb-5 text-sm flex-grow">{e.description}</p>

              <ul className="space-y-2 mb-7">
                {e.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-sm text-white/65 leading-relaxed">
                    <span className={`mt-1.5 h-1 w-1 rounded-full ${e.accent.replace("text-", "bg-")} shrink-0`} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <TrackedCTA
                href="/booking"
                location="inline"
                className={`inline-flex items-center gap-2 text-sm font-medium ${e.accent} hover:text-white transition-colors mt-auto`}
              >
                {e.cta}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </TrackedCTA>
            </div>
          ))}
        </div>
      </section>

      {/* Proof strip */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Proof of work
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Twenty apps shipped.{" "}
            <span className="text-gradient">Six of the most relevant.</span>
          </h2>
          <p className="text-white/45 mt-4 max-w-2xl mx-auto">
            Every product below is live, paying customers or actively used in production. Not demos, not MVPs waiting for Series A — running software.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {proofPoints.map((p) => (
            <a
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover rounded-2xl p-6 flex flex-col group transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold group-hover:text-gradient transition-all duration-300">{p.name}</h3>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/30 group-hover:text-ocean-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              <p className="text-sm text-white/55 leading-relaxed">{p.result}</p>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="/#apps" className="text-sm text-ocean-400 hover:text-ocean-300 transition-colors">
            See all 20 apps →
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            How it works.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="glass rounded-2xl p-7">
              <div className="text-4xl font-bold text-gradient mb-4">{s.n}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-white/55 leading-relaxed text-sm">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Common questions
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Before you reach out.
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="glass rounded-2xl p-7">
              <h3 className="text-lg font-bold mb-3">{f.q}</h3>
              <p className="text-white/60 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="glass rounded-3xl p-10 sm:p-14">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Ready to start
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5">
            Book a discovery call.
            <br />
            <span className="text-gradient">30 minutes, no prep needed.</span>
          </h2>
          <p className="text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe the problem. We'll figure out whether consulting, a fixed build, or a retainer is the right fit — and scope it from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedCTA
              href="/booking"
              location="hire-footer-cta"
              className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg"
            >
              Book a discovery call →
            </TrackedCTA>
            <TrackedCTA
              href="mailto:portofcams@gmail.com?subject=Studio%20inquiry"
              external
              location="hire-footer-email"
              className="px-8 py-4 rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 font-medium text-lg"
            >
              Email instead
            </TrackedCTA>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
