import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import StudioHero from "@/components/StudioHero";

// Homepage is the studio overview — every operational app in one place.
// The contractor-specific pitch (Hero, Services, HowItWorks, Pricing,
// FAQ, blog, etc.) lives at /contractors. About + Contact + Footer are
// reused on both pages.
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const About = dynamic(() => import("@/components/About"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export const metadata: Metadata = {
  title: "BlueWave Projects — Pacific software studio · Honolulu",
  description:
    "Independent software studio shipping web, iOS, and AI-native apps from Honolulu. A dozen products live: contractor SaaS, real estate signals, webcam streaming, maritime compliance, events, and more.",
  keywords: [
    "software studio",
    "Honolulu software",
    "Hawaii software studio",
    "AI app developer",
    "custom apps",
    "iOS RoomPlan",
    "FastAPI Next.js",
    "Pacific software",
    "BlueWave Projects",
  ],
  alternates: { canonical: "https://bluewaveprojects.com" },
  openGraph: {
    title: "BlueWave Projects — Pacific software studio",
    description:
      "Independent studio. A dozen apps live in production. Built solo from Honolulu.",
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
