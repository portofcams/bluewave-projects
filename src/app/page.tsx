import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import StudioHero from "@/components/StudioHero";

// Homepage = studio overview: AI consulting + custom apps + AI school.
// The contractor-vertical pitch (Hero, Services, HowItWorks, Pricing,
// FAQ, blog, etc.) lives at /contractors. About + Contact + Footer are
// reused on both pages.
const StudioServices = dynamic(() => import("@/components/StudioServices"));
const RadarScope = dynamic(() => import("@/components/RadarScope"), { ssr: true });
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const InlinePropertyBrief = dynamic(() => import("@/components/InlinePropertyBrief").then(m => ({ default: m.InlinePropertyBrief })));
const About = dynamic(() => import("@/components/About"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export const metadata: Metadata = {
  title: "BlueWave Projects — AI consulting, custom apps & AI school · Honolulu",
  description:
    "Independent software studio in Honolulu. AI consulting, custom AI apps (web + iOS), multi-tenant SaaS builds, and the BlueWave AI School. Twenty products live to prove it.",
  keywords: [
    "AI consulting Hawaii",
    "AI app developer Honolulu",
    "custom AI apps",
    "AI school",
    "Claude API integration",
    "Multi-tenant SaaS Hawaii",
    "iOS RoomPlan developer",
    "FastAPI Next.js studio",
    "BlueWave Projects",
  ],
  alternates: { canonical: "https://bluewaveprojects.com" },
  openGraph: {
    title: "BlueWave Projects — AI consulting, custom apps & AI school",
    description:
      "Independent AI studio in Honolulu. Consulting · custom apps · multi-tenant SaaS · AI school. Twenty products live.",
    url: "https://bluewaveprojects.com",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, type: "image/png" }],
  },
};

export default function Home() {
  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />
      <StudioHero />

      {/* Operator section — copy on top, full-width radar below */}
      <section className="px-6 pt-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300/90 text-xs uppercase tracking-[0.16em] mb-5 font-mono">
              Industry-aware operator
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
              Business trained. Code first.
              <br />
              <span className="text-gradient">AI fluent. Sea tested.</span>
            </h2>
            <p className="text-lg text-white/65 leading-relaxed max-w-3xl mx-auto mb-6">
              Marketing degree, decade of full-stack engineering, deep Anthropic SDK time, snowcat fleet manager,
              design-build founder, and yes — a 100-ton USCG Master credential. The breadth shows up in the work:
              code that reads like someone who has actually run a P&amp;L, navigated a regulated industry, and
              shipped on time when the weather wouldn&apos;t wait.
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-white/45 font-mono">
              <span>BS Marketing</span><span aria-hidden>·</span>
              <span>10+ yrs Code</span><span aria-hidden>·</span>
              <span>Anthropic SDK</span><span aria-hidden>·</span>
              <span>USCG Master 100T</span><span aria-hidden>·</span>
              <span>Founder · 12+ Apps</span>
            </div>
          </div>
          <RadarScope />
        </div>
      </section>

      <StudioServices />
      <Portfolio />

      {/* Passive lead magnet — inline Property Brief signup */}
      <section className="px-6 py-16">
        <InlinePropertyBrief variant="card" />
      </section>

      {/* For pros callout — bridge to /contractors */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto glass rounded-3xl p-10 sm:p-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lava-500/10 border border-lava-500/25 text-lava-500 text-xs uppercase tracking-[0.16em] mb-5">
            For contractors + realtors
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
            Running a build crew or a deal pipeline?
            <br />
            <span className="text-gradient">There&apos;s a dedicated stack for you.</span>
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto mb-8 leading-relaxed">
            Scope generator, RoomPlan blueprints, project room, off-market network, weekly property briefs — built on the same Hawaii data layer the studio uses internally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/ikena"
              className="btn-primary px-7 py-3.5 rounded-full text-white font-medium"
            >
              See Ikena (the flagship) →
            </a>
            <a
              href="/booking"
              className="px-7 py-3.5 rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 font-medium"
            >
              Book a demo
            </a>
          </div>
        </div>
      </section>

      <About />
      <Contact />
      <Footer />
    </main>
  );
}
