"use client";

import { TrackedCTA } from "./TrackedCTA";

// Studio landing hero — used on the homepage to position BlueWave as a
// multi-product Pacific studio. The contractor-specific hero lives in
// Hero.tsx and is rendered on /contractors.

export default function StudioHero() {
  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-16 px-6">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden -z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-ocean-600/20 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-wave-500/15 rounded-full blur-[128px] animate-pulse-glow [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ocean-800/20 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/60 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Honolulu software studio · 20 apps live for Hawai'i operators
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.95] mb-6">
          Hawai'i runs on paperwork.
          <br />
          <span className="text-gradient">We turn it into software.</span>
        </h1>

        <p className="text-lg sm:text-2xl text-white/65 max-w-3xl mx-auto leading-relaxed mb-10">
          STR compliance, USCG credentials, harbor billing, building permits, residential scope —
          twenty production apps shipped for Hawai'i operators. <span className="text-white/85">Subscribe to one
          we already built, hire us to build yours,</span> or learn the playbook in the AI School.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <TrackedCTA
            href="#apps"
            location="hero"
            className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg"
          >
            Browse the apps
          </TrackedCTA>
          <TrackedCTA
            href="/work"
            location="hero"
            className="px-8 py-4 rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 font-medium text-lg"
          >
            Hire the studio →
          </TrackedCTA>
          <TrackedCTA
            href="/school"
            location="hero"
            className="px-8 py-4 rounded-full text-white/60 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-300 font-medium text-lg"
          >
            AI School
          </TrackedCTA>
        </div>

        {/* Stats bar */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="glass rounded-2xl px-6 py-5 flex flex-wrap items-center justify-around gap-y-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
            <Stat value="12+" label="Apps live" />
            <Stat value="13" label="Domains running" />
            <Stat value="~600K" label="Lines shipped" />
            <Stat value="15B+" label="Claude tokens" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 min-w-[120px] text-center px-3">
      <div className="text-2xl sm:text-3xl font-bold text-gradient leading-none">{value}</div>
      <div className="text-xs text-white/40 uppercase tracking-wider mt-2">{label}</div>
    </div>
  );
}
