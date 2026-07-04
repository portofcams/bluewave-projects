import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { OpsShell, PrototypeBanner, SectionHeading, SampleTag, OPS, SITE, HUB_PATH } from "./_shared";
import ManifestBoard from "./ManifestBoard";
import FlightFollowing from "./FlightFollowing";
import OpsOverview from "./OpsOverview";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders so the
// concept prototype never pollutes bluewaveprojects.com's index.
export const metadata: Metadata = {
  title: "Heli-Ops Platform — Scheduling & Dispatch Concept (Sample Prototype)",
  description:
    "A concept prototype for a heli-ski / heli-charter operations platform: an interactive scheduling and manifest board with automatic weight-and-balance flags, weather-hold reslotting, and a unified helicopter + snowcat schedule view. Fictional sample data only — not affiliated with or representing any real operator. A portfolio build by BlueWave Projects.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// MODULE REGISTRY
//
// Module 1: Scheduling — the daily manifest / weight-and-balance board
// (ManifestBoard.tsx).
// Module 2 (this build): Dispatch & Flight Following — the live check-in /
// escalation / activity-log board (FlightFollowing.tsx).
// ---------------------------------------------------------------------------
type ModuleKey = "scheduling" | "dispatch";

const MODULES: { key: ModuleKey; label: string; shortLabel: string }[] = [
  { key: "scheduling", label: "Scheduling & Manifest Board", shortLabel: "Scheduling" },
  { key: "dispatch", label: "Flight-Following & Dispatch", shortLabel: "Dispatch" },
];

export default function HeliOpsPlatformDemo() {
  return (
    <OpsShell>
      <PrototypeBanner />
      <Nav />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        {/* HERO */}
        <section className="mb-10">
          <div className="hops-eyebrow mb-3">Concept demo &middot; Operations platform</div>
          <h1 className="hops-display text-3xl leading-tight sm:text-4xl md:text-5xl" style={{ color: OPS.snow }}>
            Heli-Ski &amp; Heli-Charter Operations Platform
          </h1>
          <div className="hops-rule mt-4" />
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: OPS.textMuted }}>
            A working concept prototype of what a modern day-of-ops platform could look like for a heli-ski or
            heli-charter operation — one reconciled view of the whole day, from manifest to check-in to gear room:
            helicopters and snowcats on one board, automatic weight-and-balance math instead of manual addition,
            live flight-following in place of a dispatcher's memory, and a safety card that puts medical/dietary
            flags in front of a guide instead of buried in a spreadsheet cell.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <SampleTag />
            <span
              className="hops-pill"
              style={{ background: "rgba(255,255,255,.06)", color: OPS.textMuted, border: `1px solid ${OPS.line}` }}
            >
              Portfolio prototype &middot; BlueWave Projects
            </span>
          </div>
        </section>

        {/* TODAY'S OPS OVERVIEW — unified landing strip above the module
            tabs, computed from the same seed data both modules use. */}
        <OpsOverview />

        {/* MODULE TABS */}
        <ModuleTabs />
      </main>

      <Footer />
    </OpsShell>
  );
}

// ---------------------------------------------------------------------------
// MODULE TABS — server-rendered section switcher. Kept as plain anchor-style
// in-page sections (both modules visible via hash-linked tabs) so Module 2
// can be dropped in without needing to touch client state wiring here.
// ---------------------------------------------------------------------------
function ModuleTabs() {
  return (
    <div>
      <nav
        className="mb-8 flex flex-wrap gap-2 border-b pb-0"
        style={{ borderColor: OPS.line }}
        aria-label="Operations modules"
      >
        {MODULES.map((m, i) => (
          <a
            key={m.key}
            href={`#module-${m.key}`}
            className="hops-mono -mb-px rounded-t-md border border-b-0 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[.05em] transition"
            style={{
              borderColor: i === 0 ? OPS.line : "transparent",
              background: i === 0 ? OPS.slate : "transparent",
              color: i === 0 ? OPS.ice : OPS.textMuted,
            }}
          >
            {String(i + 1).padStart(2, "0")} &middot; {m.shortLabel}
          </a>
        ))}
      </nav>

      {/* MODULE 1 — SCHEDULING (this build) */}
      <section id="module-scheduling" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Module 01 · Live"
          title="Scheduling & Manifest Board"
          blurb="Every helicopter, guide group, and snowcat for the day in one view. Weight-and-balance totals recalculate automatically per guide group and per cargo bay, with weather-hold guests one click away from a same-day reslot."
        />
        <ManifestBoard />
      </section>

      {/* MODULE 2 — DISPATCH & FLIGHT FOLLOWING */}
      <section id="module-dispatch" className="mt-16 scroll-mt-24">
        <SectionHeading
          eyebrow="Module 02 · Live"
          title="Flight-Following &amp; Dispatch"
          blurb="Structured check-in timers, escalation steps, and an audit trail for every aircraft in the air — replacing a single dispatcher's memory and informal chat-app logging."
        />
        <FlightFollowing />
      </section>
    </div>
  );
}
