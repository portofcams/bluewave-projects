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
const About = dynamic(() => import("@/components/About"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export const metadata: Metadata = {
  title: "BlueWave Projects — AI consulting, custom apps & AI school · Honolulu",
  description:
    "Independent software studio in Honolulu. AI consulting, custom AI apps (web + iOS), multi-tenant SaaS builds, and the BlueWave AI School. Twelve products live to prove it.",
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
      "Independent AI studio in Honolulu. Consulting · custom apps · multi-tenant SaaS · AI school.",
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

      {/* Maritime credibility flourish — radar scope between hero and services */}
      <section className="px-6 pt-4 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300/90 text-xs uppercase tracking-[0.16em] mb-5 font-mono">
              From the bridge to the cloud
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
              Built by a 100-ton captain
              <br />
              <span className="text-gradient">who codes the same way he runs a watch.</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl mb-6">
              Before the studio there was 1,000+ days at sea, 10+ vessels captained, and a USCG Master credential.
              Software here ships the way a good watch is stood — calm, attentive, and ready for weather. Maritime
              and contractor verticals are first-class citizens because they&apos;re what the captain actually knows.
            </p>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em] text-white/40 font-mono">
              <span>USCG Master · 100T</span>
              <span aria-hidden>·</span>
              <span>1,000+ Sea days</span>
              <span aria-hidden>·</span>
              <span>10+ Vessels</span>
            </div>
          </div>
          <RadarScope />
        </div>
      </section>

      <StudioServices />
      <Portfolio />

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
              href="/contractors"
              className="btn-primary px-7 py-3.5 rounded-full text-white font-medium"
            >
              See contractor + realtor tools →
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
