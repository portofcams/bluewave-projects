import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
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
  title: "BlueWave Projects — AI software for Hawai'i operators · Honolulu studio",
  description:
    "Honolulu software studio turning Hawai'i paperwork into software. STR compliance, USCG, harbors, permits, residential scope — twenty production apps live. Subscribe to one, hire us to build yours, or learn at the AI School.",
  keywords: [
    "Hawaii software studio",
    "AI software Hawaii",
    "Hawaii operator software",
    "STR compliance Hawaii",
    "Hawaii permit software",
    "AI consulting Hawaii",
    "custom AI apps Honolulu",
    "Multi-tenant SaaS Hawaii",
    "BlueWave Projects",
  ],
  alternates: { canonical: "https://bluewaveprojects.com" },
  openGraph: {
    title: "BlueWave Projects — AI software for Hawai'i operators",
    description:
      "Honolulu studio. Twenty production apps for Hawai'i operators — STR compliance, USCG, harbors, permits. Subscribe, hire, or learn.",
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

      {/* Order of operations: offer → proof → who's behind it → passive capture → contact.
          Services come first so a new visitor sees WHAT they can get before WHO ships it. */}
      <StudioServices />
      <Portfolio />

      {/* AI School — the "learn" pillar made concrete: free AI Journey → paid Ship the Stack RAG course */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-wave-500/25 bg-gradient-to-br from-ocean-900/50 via-black/40 to-black p-8 sm:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wave-500/10 border border-wave-500/25 text-wave-300/90 text-xs uppercase tracking-[0.16em] mb-5 font-mono">
              BlueWave AI School
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-4 max-w-2xl">
              Don&apos;t just subscribe — <span className="text-gradient">learn to build it.</span>
            </h2>
            <p className="text-lg text-white/65 leading-relaxed max-w-2xl mb-7">
              Start free with the gamified AI Journey. When you&apos;re ready for the real thing,{" "}
              <span className="text-white font-medium">Ship the Stack</span> is the hands-on course: build a
              working RAG system over your own corpus — six modules, six ship gates. Measured, not
              self-attested. You ship code, run the gate, and it scores you against a baseline.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/school" className="btn-primary px-7 py-3 rounded-full text-sm font-semibold text-white text-center">
                Start free →
              </Link>
              <a href="https://school.bluewaveprojects.com" className="px-7 py-3 rounded-full text-sm font-semibold text-white/80 border border-white/15 hover:border-white/30 transition-colors text-center">
                See Ship the Stack
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who's behind the work — demoted from the top so it doesn't compete with the offer.
          The bio + radar live here as a trust + texture beat between proof and contact. */}
      <section className="px-6 pt-12 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300/90 text-xs uppercase tracking-[0.16em] mb-5 font-mono">
              Who's behind the work
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
              <span>Founder · 12+ Apps</span><span aria-hidden>·</span>
              <span>15B+ Claude tokens</span>
            </div>
          </div>
          <RadarScope />
        </div>
      </section>

      {/* Passive lead magnet — inline Property Brief signup */}
      <section className="px-6 py-16">
        <InlinePropertyBrief variant="card" />
      </section>

      <About />
      <Contact />
      <Footer />
    </main>
  );
}
