import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { OpsShell, PrototypeBanner, SectionHeading, SampleTag, OPS, SITE, HUB_PATH } from "./_shared";
import ManifestBoard from "./ManifestBoard";
import FlightFollowing from "./FlightFollowing";
import OpsOverview from "./OpsOverview";
import GuideView from "./GuideView";
import EndOfDayDebrief from "./EndOfDayDebrief";
import SafetyCompliance from "./SafetyCompliance";
import LiveDataRealism from "./LiveDataRealism";
import { PlatformProvider } from "./_platform";

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
// Module 2: Dispatch & Flight Following — the live check-in / escalation /
// activity-log board (FlightFollowing.tsx).
// Module 3: Cross-cutting refinements — Guide View, End-of-Day Debrief,
// Incident Mode, Settings, deep-linking (_platform.tsx + GuideView.tsx +
// EndOfDayDebrief.tsx).
// Module 4: Safety & Compliance Depth — Part 135-style duty-hours log, guide
// cert/avalanche-training tracker, incident/near-miss logging form, and
// per-helicopter weight-and-balance export + pilot sign-off
// (SafetyCompliance.tsx).
// Module 5 (this build): Live-data & realism — a real live NWS weather panel
// and real computed sunrise/sunset/daylight for a real Alaska coordinate, a
// real days-since-last-incident counter computed from Module 4's incident
// log, simulated GPS/ADS-B-style position blips added to Module 2's
// existing schematic zone map, and a clearly-labeled SIMULATED/ILLUSTRATIVE
// avalanche-danger-rating widget styled after the real public avalanche.org
// scale (LiveDataRealism.tsx + an extension inside FlightFollowing.tsx).
// ---------------------------------------------------------------------------
type ModuleKey = "scheduling" | "dispatch" | "guide-view" | "debrief" | "safety-compliance" | "live-data-realism";

const MODULES: { key: ModuleKey; label: string; shortLabel: string }[] = [
  { key: "scheduling", label: "Scheduling & Manifest Board", shortLabel: "Scheduling" },
  { key: "dispatch", label: "Flight-Following & Dispatch", shortLabel: "Dispatch" },
  { key: "guide-view", label: "Guide View (Mobile)", shortLabel: "Guide View" },
  { key: "debrief", label: "End-of-Day Debrief", shortLabel: "Debrief" },
  { key: "safety-compliance", label: "Safety & Compliance Depth", shortLabel: "Safety" },
  { key: "live-data-realism", label: "Live-Data & Realism", shortLabel: "Live Data" },
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

        {/* PlatformProvider (Module 3 — cross-cutting refinements) hoists the
            live aircraft/log/settings state that used to live only inside
            FlightFollowing's local useState calls, so Guide View, the
            End-of-Day Debrief, Incident Mode, the Settings panel, and Module
            1's "View live status" link can all read and write the SAME real
            state instead of duplicating a parallel copy. */}
        <PlatformProvider>
          <ModuleTabs />
        </PlatformProvider>
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
          blurb="Structured check-in timers, escalation steps, and an audit trail for every aircraft in the air — replacing a single dispatcher's memory and informal chat-app logging. Includes Incident Mode (coordinated response) and editable demo settings."
        />
        <FlightFollowing />
      </section>

      {/* MODULE 3a — GUIDE-FACING MOBILE VIEW (cross-cutting refinement) */}
      <section id="module-guide-view" className="mt-16 scroll-mt-24">
        <SectionHeading
          eyebrow="Module 03 · Live"
          title="Guide View (Mobile)"
          blurb="A simplified, large-tap-target view of what a guide would see on their own phone — their aircraft, their group's guests, and one big check-in button wired to the same real check-in used in Module 02."
        />
        <GuideView />
      </section>

      {/* MODULE 3b — END-OF-DAY DEBRIEF (cross-cutting refinement) */}
      <section id="module-debrief" className="mt-16 scroll-mt-24">
        <SectionHeading
          eyebrow="Module 03 · Live"
          title="End-of-Day Debrief"
          blurb="A closing-out-the-day report computed live from the same manifest and flight-following state shown above — not a separately hardcoded summary."
        />
        <EndOfDayDebrief />
      </section>

      {/* MODULE 4 — SAFETY & COMPLIANCE DEPTH */}
      <section id="module-safety-compliance" className="mt-16 scroll-mt-24">
        <SectionHeading
          eyebrow="Module 04 · Live"
          title="Safety & Compliance Depth"
          blurb="A Part 135 duty-hours log, a guide cert/avalanche-training tracker checked against today's real assignments, a real incident/near-miss logging form, and a per-helicopter weight-and-balance export with a genuine pilot sign-off step — illustrative only, not a certified regulatory system."
        />
        <SafetyCompliance />
      </section>

      {/* MODULE 5 — LIVE-DATA & REALISM */}
      <section id="module-live-data-realism" className="mt-16 scroll-mt-24">
        <SectionHeading
          eyebrow="Module 05 · Live"
          title="Live-Data & Realism"
          blurb="A real live NWS weather + computed sunrise/sunset panel for a real Alaska coordinate, a real days-since-last-incident counter tied to Module 04's incident log, and a clearly-labeled SIMULATED avalanche-danger widget styled after the real public avalanche.org scale — never a real advisory. Module 02's zone map above also gained simulated GPS-style position blips."
        />
        <LiveDataRealism />
      </section>
    </div>
  );
}
