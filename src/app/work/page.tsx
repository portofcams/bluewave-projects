import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TrackedCTA } from "@/components/TrackedCTA";
import { resume } from "@/data/resume";

export const metadata: Metadata = {
  title: "John C. Thomas — Solo AI engineer · SaaS founder · Remote",
  description:
    "Solo full-stack AI engineer shipping production multi-tenant SaaS. ~15B Claude tokens, 580 commits, 600K LoC in 9 weeks. Available for remote founding / staff engineer roles at AI-native SaaS companies.",
  alternates: { canonical: "https://bluewaveprojects.com/work" },
  openGraph: {
    title: "John C. Thomas — Solo AI engineer · SaaS founder",
    description:
      "12+ products shipped in 9 weeks. Multi-tenant SaaS, LLM-in-loop pipelines, iOS + web + backend. Available for remote roles.",
    url: "https://bluewaveprojects.com/work",
    siteName: "BlueWave Projects",
    type: "profile",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const stageStyle: Record<
  string,
  { label: string; dot: string; pill: string; text: string }
> = {
  "live-production": {
    label: "Live in production",
    dot: "bg-emerald-400",
    pill: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
    text: "text-emerald-300",
  },
  "saas-shipping": {
    label: "SaaS · signup open",
    dot: "bg-wave-400",
    pill: "bg-wave-500/10 text-wave-400 border-wave-500/25",
    text: "text-wave-400",
  },
  "saas-subscription": {
    label: "Subscription product",
    dot: "bg-ocean-400",
    pill: "bg-ocean-500/10 text-ocean-300 border-ocean-500/25",
    text: "text-ocean-300",
  },
  "ios-shipped": {
    label: "iOS · shipped",
    dot: "bg-lava-500",
    pill: "bg-lava-500/10 text-lava-500 border-lava-500/25",
    text: "text-lava-500",
  },
  "shipped-portfolio": {
    label: "Shipped portfolio",
    dot: "bg-glacier-300",
    pill: "bg-glacier-300/10 text-glacier-200 border-glacier-300/25",
    text: "text-glacier-200",
  },
};

export default function WorkPage() {
  const { identity, engineer, velocity, stack, products, ai_evidence, remote_fit, experience, education } = resume;

  return (
    <main className="ocean-gradient min-h-screen text-white">
      <Nav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-12">
        <div className="grid lg:grid-cols-[220px_1fr] gap-10 items-start">
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative">
              <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-wave-500/30 shadow-wave-500/20">
                <img src={identity.photo} alt={identity.full_name} width={176} height={176} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-[10px] uppercase tracking-wider text-emerald-300 font-semibold">
                Available
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2 w-full max-w-[200px] text-sm text-white/60">
              <a href={`mailto:${identity.email}`} className="hover:text-white transition-colors break-all">
                {identity.email}
              </a>
              <a href={`tel:${identity.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-white transition-colors">
                {identity.phone}
              </a>
              <div className="text-white/40 text-xs">{engineer.location}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {identity.links.map((l) => (
                  <a key={l.url} href={l.url} className="text-xs text-wave-400 hover:text-wave-500">{l.label}</a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/60 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {engineer.availability}
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[0.98] mb-3">
              {identity.display_name}
            </h1>
            <p className="text-xl sm:text-2xl text-gradient font-medium mb-5">{engineer.headline}</p>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed mb-4">{engineer.pitch}</p>
            <p className="text-sm text-white/40 italic max-w-3xl mb-8">{engineer.tagline}</p>

            <div className="flex flex-wrap gap-3 mb-10">
              <TrackedCTA
                href={`mailto:${identity.email}?subject=Hiring%20%E2%80%94%20Remote%20engineer%20role`}
                external
                location="hero"
                cta_text_override="Email John (hiring)"
                className="btn-primary px-6 py-3 rounded-full text-white font-medium"
              >
                Email John
              </TrackedCTA>
              <TrackedCTA
                href="/work/print"
                location="hero"
                className="px-6 py-3 rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 font-medium"
              >
                Print / save PDF
              </TrackedCTA>
              <TrackedCTA
                href="/captain"
                location="hero"
                className="px-6 py-3 rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 font-medium"
              >
                Operator résumé
              </TrackedCTA>
            </div>
          </div>
        </div>
      </section>

      {/* Velocity stats */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-2">Shipping velocity · one focused sprint</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Agent-augmented engineer, <span className="text-gradient">measured.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {velocity.map((v) => (
            <div key={v.label} className="glass rounded-2xl p-5">
              <div className="text-3xl font-bold text-gradient">{v.value}</div>
              <div className="text-xs text-white/60 uppercase tracking-wider mt-2 mb-1">{v.label}</div>
              <div className="text-xs text-white/40 leading-relaxed">{v.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What I ship — Products */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">What I ship</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            12+ products. <span className="text-gradient">One operator.</span>
          </h2>
          <p className="text-white/55 mt-3 max-w-3xl">
            Real systems running real workloads, not demos. Every product below is something I designed, built, deployed, and continue to operate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {products.map((p) => {
            const s = stageStyle[p.stage] ?? stageStyle["shipped-portfolio"];
            return (
              <div key={p.name} className="glass rounded-2xl p-6 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <p className="text-xs text-white/40 mt-1">{p.domain}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] px-2 py-1 rounded-full border ${s.pill} whitespace-nowrap`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-3">{p.summary}</p>
                <div className="mt-auto space-y-1.5 pt-3 border-t border-white/5">
                  <div className="text-xs"><span className="text-white/40">Stack: </span><span className="text-white/70">{p.stack}</span></div>
                  <div className="text-xs"><span className="text-white/40">Role: </span><span className="text-white/70">{p.role}</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI / agentic */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">AI in production</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Not a wrapper around chat. <span className="text-gradient">A platform with Claude inside.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {ai_evidence.map((e, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-wave-400 mb-3">Evidence #{i + 1}</div>
              <p className="text-white/75 leading-relaxed">{e}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">Stack</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Production-fluent across <span className="text-gradient">the whole stack.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stack.map((g) => (
            <div key={g.group} className="glass rounded-2xl p-6">
              <h3 className="text-sm uppercase tracking-[0.18em] text-wave-400 mb-3">{g.group}</h3>
              <ul className="space-y-2">
                {g.items.map((t) => (
                  <li key={t} className="flex gap-3 text-white/75 text-sm leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-wave-400 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why hire me (remote fit) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">Why a remote SaaS / AI company hires me</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Engineer who&apos;s already <span className="text-gradient">been the customer.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {remote_fit.map((r) => (
            <div key={r.title} className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-2">{r.title}</h3>
              <p className="text-white/70 leading-relaxed">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Background — abbreviated */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">Operations background</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Software is the third career. <span className="text-gradient">The first two taught me how to ship.</span>
          </h2>
          <p className="text-white/55 mt-3 max-w-3xl">
            Maritime, then design-build, then SaaS. Each one is in regulated industries with safety, money, and reputation on the line. See the{" "}
            <a href="/captain" className="text-wave-400 hover:text-wave-500 underline underline-offset-2">operator résumé</a> for the long version.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {experience.slice(0, 4).map((role) => (
            <div key={role.company} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-base font-bold">{role.title}</h3>
                <span className="text-xs text-white/40 whitespace-nowrap">{role.start} — {role.end}</span>
              </div>
              <p className="text-sm text-wave-400 mb-2">{role.company} · {role.location}</p>
              <p className="text-sm text-white/65 leading-relaxed line-clamp-3">{role.bullets[0]}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 glass rounded-2xl p-6 flex flex-wrap items-center gap-4 justify-between">
          <div>
            <h3 className="text-base font-bold mb-1">{education.school}</h3>
            <p className="text-sm text-white/65">{education.degree} · {education.school_location} · {education.period}</p>
          </div>
          <span className="text-xs text-white/40">B.S. earned + active USCG Master 100-Ton license</span>
        </div>
      </section>

      {/* Targeted companies — names the specific employers I'd take a call from today */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">Top of my list</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Specifically targeting these teams.{" "}
            <span className="text-gradient">I&apos;d take a 20-min call from any of them today.</span>
          </h2>
          <p className="text-white/55 mt-3 max-w-3xl">
            All AI-native, all vertical SaaS into regulated or operations-heavy industries — the asymmetric fit for an operator who&apos;s also an engineer. Other warm leads welcome, but these are the named ones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              name: "Hamilton AI",
              vertical: "Private aviation operations",
              role: "Founding AI Engineer / Staff Fullstack",
              fit: "I've been the fleet operator (12-vessel manager at Ohana Boats Sales). I know what an ops platform has to do because I lived inside one of the cheap-enough-to-survive-without-it kind. Plus the LLM-in-loop multi-tenant SaaS playbook is exactly the BlueWave Projects playbook.",
              url: "https://www.hamilton.ai/careers",
            },
            {
              name: "Trunk Tools",
              vertical: "AI for construction",
              role: "Senior ML / Staff Engineer",
              fit: "Their customer profile is the one I built for. I shipped a multi-tenant operator SaaS that ran a real Hawaii residential renovation end-to-end — in the only category (Hawaii) that no national construction-tech vendor handles well.",
              url: "https://jobs.ashbyhq.com/trunk%20tools",
            },
            {
              name: "Adaptional (YC)",
              vertical: "AI for insurance teams",
              role: "Founding Engineer",
              fit: "&ldquo;Claude-code-for-vertical-X&rdquo; is literally my 9-week playbook in a different vertical. Insurance is the same shape problem as construction: regulated, document-heavy, mid-market operators starved for software that respects their workflow.",
              url: "https://www.ycombinator.com/companies/adaptional",
            },
            {
              name: "Revenue Vessel",
              vertical: "Logistics / freight-forwarder AI",
              role: "Founding Senior Engineer (Eng #4)",
              fit: "Ex-Flexport founders selling into freight. USCG Master + 1,000+ sea days is the differentiator they don't already have on the team — combined with the same multi-tenant LLM-in-loop chops.",
              url: "https://jobs.ashbyhq.com/RevenueVessel",
            },
            {
              name: "Anthropic",
              vertical: "AI labs",
              role: "Applied AI Engineer (Beneficial Deployments) · Staff+ Developer Productivity",
              fit: "15B Claude tokens through Claude Code in one focused sprint. I am exactly the customer they should be hiring from — power-user with production scars and a vertical-SaaS shipping pattern they can amplify.",
              url: "https://job-boards.greenhouse.io/anthropic",
            },
            {
              name: "Wolfia (YC S22)",
              vertical: "AI for security questionnaires / RFPs",
              role: "Full-Stack AI-native Engineer",
              fit: "Stack match is 1:1 (Next.js + Tailwind + FastAPI + Postgres). Confirmed US-remote. Smaller-cap comp than the others on this list, but the cleanest founding-team fit on stack alone.",
              url: "https://www.ycombinator.com/companies/wolfia",
            },
          ].map((co) => (
            <div key={co.name} className="glass rounded-2xl p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-xl font-bold">{co.name}</h3>
                  <p className="text-xs text-wave-400 mt-0.5">{co.vertical}</p>
                </div>
                <a
                  href={co.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/40 hover:text-white/80 transition-colors inline-flex items-center gap-1 shrink-0"
                >
                  Careers
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4.5 19.5l15-15M9 4.5h11v11" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/40 mb-3">{co.role}</p>
              <p
                className="text-sm text-white/70 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: co.fit }}
              />
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/40 max-w-3xl">
          Adjacent and welcome: anywhere shipping LLM-in-loop multi-tenant SaaS into a regulated industry — climate, energy, healthcare, finance, public safety, agriculture. If you&apos;re hiring for that and I&apos;m not on your list, write me anyway.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Bring me in. <span className="text-gradient">I&apos;ll ship.</span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto mb-8">
          Best fit: founding / staff engineer at an AI-native vertical SaaS — especially regulated industries (aviation, marine, construction, healthcare, finance). Remote, async-friendly, fast iteration. Targeting <span className="text-white/80">founding / staff comp range, equity preferred.</span>
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${identity.email}?subject=Hiring%20%E2%80%94%20Remote%20engineer%20role&body=Hi%20John%20%E2%80%94`}
            className="btn-primary px-7 py-3.5 rounded-full text-white font-medium"
          >
            Email me
          </a>
          <a
            href={`tel:${identity.phone.replace(/[^0-9+]/g, "")}`}
            className="px-7 py-3.5 rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 font-medium"
          >
            {identity.phone}
          </a>
          <a
            href="/work/print"
            className="px-7 py-3.5 rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 font-medium"
          >
            Print clean PDF
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
