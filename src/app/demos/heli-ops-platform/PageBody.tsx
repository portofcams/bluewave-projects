"use client";

// PageBody — the Heli-Ops Platform demo's actual page content (hero +
// module tabs + Module 6 UX/interaction-polish features).
//
// WHY THIS FILE EXISTS: page.tsx must stay a Server Component (it exports
// `metadata`, which Next.js requires to run server-side). Before Module 6,
// page.tsx's hero markup and <ModuleTabs> read `OPS.snow` / `OPS.line` /
// etc. directly inline in that Server Component's own JSX — which is
// composed exactly ONCE per request, on the server, and passed down as a
// fixed prop tree into <OpsShell>. A Server Component's inline JSX never
// re-renders on the client, so those hero/tab colors would have been
// FROZEN at whatever the theme was at first paint (always "dark", since SSR
// always starts dark by design — see _shared.tsx) and would NEVER update
// when a viewer toggles to light mode, even though every module component
// below them (ManifestBoard, FlightFollowing, etc. — all already "use
// client") correctly re-renders and re-themes.
//
// Moving the hero + <ModuleTabs> into this "use client" file is NECESSARY
// but not, on its own, SUFFICIENT: being a Client Component means PageBody
// COULD re-render on a theme toggle, but React only actually re-renders it
// if something PageBody itself subscribes to changes (state, or a context
// it reads via a hook) — merely being rendered as `<PageBody />` inside a
// Server Component's frozen one-time output does not make it re-render just
// because a DIFFERENT client component (OpsShell) elsewhere re-renders.
// Verified by hand-tracing a real toggle in the browser: without this,
// ManifestBoard/FlightFollowing/etc. still correctly re-themed (because
// they already call usePlatform(), whose `now` tick every second happens to
// force their own re-render, incidentally picking up fresh OPS values) —
// but THIS component's own hero <h1>/<p> stayed frozen at dark-mode colors
// even after toggling to light, because nothing here caused ITS OWN
// re-render. Calling useTheme() below is what actually subscribes this
// component to theme changes and fixes that for real.
import { OPS, SampleTag, SectionHeading, panelTint, useTheme } from "./_shared";
import ManifestBoard from "./ManifestBoard";
import FlightFollowing from "./FlightFollowing";
import OpsOverview from "./OpsOverview";
import GuideView from "./GuideView";
import EndOfDayDebrief from "./EndOfDayDebrief";
import SafetyCompliance from "./SafetyCompliance";
import LiveDataRealism from "./LiveDataRealism";
import { PlatformProvider } from "./_platform";
import TvModeLauncher from "./TvMode";
import GuestSearch from "./GuestSearch";
import OnboardingTour, { RetriggerTourLink } from "./OnboardingTour";

type ModuleKey = "scheduling" | "dispatch" | "guide-view" | "debrief" | "safety-compliance" | "live-data-realism";

const MODULES: { key: ModuleKey; label: string; shortLabel: string }[] = [
  { key: "scheduling", label: "Scheduling & Manifest Board", shortLabel: "Scheduling" },
  { key: "dispatch", label: "Flight-Following & Dispatch", shortLabel: "Dispatch" },
  { key: "guide-view", label: "Guide View (Mobile)", shortLabel: "Guide View" },
  { key: "debrief", label: "End-of-Day Debrief", shortLabel: "Debrief" },
  { key: "safety-compliance", label: "Safety & Compliance Depth", shortLabel: "Safety" },
  { key: "live-data-realism", label: "Live-Data & Realism", shortLabel: "Live Data" },
];

export default function PageBody() {
  // Subscribing to theme here is what actually makes this component
  // re-render on toggle — see the file-level note above for why simply
  // being a Client Component wasn't enough.
  useTheme();

  return (
    <PlatformProvider>
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14" data-hops-tour="main">
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
            live flight-following in place of a dispatcher&rsquo;s memory, and a safety card that puts medical/dietary
            flags in front of a guide instead of buried in a spreadsheet cell.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <SampleTag />
            <span
              className="hops-pill"
              style={{ background: panelTint(0.06), color: OPS.textMuted, border: `1px solid ${OPS.line}` }}
            >
              Portfolio prototype &middot; BlueWave Projects
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {/* Module 6, feature 27 — wall-mounted ops-room TV mode launcher */}
            <TvModeLauncher />
            {/* Module 6, feature 30 — re-trigger the onboarding tour */}
            <RetriggerTourLink />
          </div>
        </section>

        {/* TODAY'S OPS OVERVIEW — unified landing strip above the module
            tabs, computed from the same seed data both modules use. */}
        <div data-hops-tour="ops-overview">
          <OpsOverview />
        </div>

        {/* Module 6, feature 28 — instant guest search/filter across the
            current day's full roster. Reads Module 1's real live day-state
            via usePlatform(), so it must live INSIDE PlatformProvider. */}
        <div data-hops-tour="guest-search" className="mb-10">
          <GuestSearch />
        </div>

        <ModuleTabs />
      </main>

      {/* Module 6, feature 30 — first-time-viewer onboarding overlay. Reads
          real DOM anchors (data-hops-tour attributes) placed on the actual
          sections above/below, so its copy points at genuine page regions. */}
      <OnboardingTour />
    </PlatformProvider>
  );
}

// ---------------------------------------------------------------------------
// MODULE TABS — client-rendered section switcher (moved from page.tsx — see
// file-level note above for why). Kept as plain anchor-style in-page
// sections (both modules visible via hash-linked tabs).
// ---------------------------------------------------------------------------
function ModuleTabs() {
  return (
    <div>
      <nav
        className="mb-8 flex flex-wrap gap-2 border-b pb-0"
        style={{ borderColor: OPS.line }}
        aria-label="Operations modules"
        data-hops-tour="module-tabs"
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

      {/* MODULE 1 — SCHEDULING */}
      <section id="module-scheduling" className="scroll-mt-24" data-hops-tour="module-scheduling">
        <SectionHeading
          eyebrow="Module 01 · Live"
          title="Scheduling & Manifest Board"
          blurb="Every helicopter, guide group, and snowcat for the day in one view. Weight-and-balance totals recalculate automatically per guide group and per cargo bay, with weather-hold guests one click away from a same-day reslot."
        />
        <ManifestBoard />
      </section>

      {/* MODULE 2 — DISPATCH & FLIGHT FOLLOWING */}
      <section id="module-dispatch" className="mt-16 scroll-mt-24" data-hops-tour="module-dispatch">
        <SectionHeading
          eyebrow="Module 02 · Live"
          title="Flight-Following &amp; Dispatch"
          blurb="Structured check-in timers, escalation steps, and an audit trail for every aircraft in the air — replacing a single dispatcher's memory and informal chat-app logging. Includes Incident Mode (coordinated response), an audible overdue alert, and editable demo settings."
        />
        <FlightFollowing />
      </section>

      {/* MODULE 3a — GUIDE-FACING MOBILE VIEW */}
      <section id="module-guide-view" className="mt-16 scroll-mt-24" data-hops-tour="module-guide-view">
        <SectionHeading
          eyebrow="Module 03 · Live"
          title="Guide View (Mobile)"
          blurb="A simplified, large-tap-target view of what a guide would see on their own phone — their aircraft, their group's guests, and one big check-in button wired to the same real check-in used in Module 02."
        />
        <GuideView />
      </section>

      {/* MODULE 3b — END-OF-DAY DEBRIEF */}
      <section id="module-debrief" className="mt-16 scroll-mt-24" data-hops-tour="module-debrief">
        <SectionHeading
          eyebrow="Module 03 · Live"
          title="End-of-Day Debrief"
          blurb="A closing-out-the-day report computed live from the same manifest and flight-following state shown above — not a separately hardcoded summary."
        />
        <EndOfDayDebrief />
      </section>

      {/* MODULE 4 — SAFETY & COMPLIANCE DEPTH */}
      <section id="module-safety-compliance" className="mt-16 scroll-mt-24" data-hops-tour="module-safety-compliance">
        <SectionHeading
          eyebrow="Module 04 · Live"
          title="Safety & Compliance Depth"
          blurb="A Part 135 duty-hours log, a guide cert/avalanche-training tracker checked against today's real assignments, a real incident/near-miss logging form, and a per-helicopter weight-and-balance export with a genuine pilot sign-off step — illustrative only, not a certified regulatory system."
        />
        <SafetyCompliance />
      </section>

      {/* MODULE 5 — LIVE-DATA & REALISM */}
      <section id="module-live-data-realism" className="mt-16 scroll-mt-24" data-hops-tour="module-live-data-realism">
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
