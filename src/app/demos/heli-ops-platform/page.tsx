import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { OpsShell, PrototypeBanner, ThemeProvider, ThemeToggle, SITE, HUB_PATH } from "./_shared";
import PageBody from "./PageBody";

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
// Module 5: Live-data & realism — a real live NWS weather panel and real
// computed sunrise/sunset/daylight for a real Alaska coordinate, a real
// days-since-last-incident counter computed from Module 4's incident log,
// simulated GPS/ADS-B-style position blips added to Module 2's existing
// schematic zone map, and a clearly-labeled SIMULATED/ILLUSTRATIVE
// avalanche-danger-rating widget styled after the real public avalanche.org
// scale (LiveDataRealism.tsx + an extension inside FlightFollowing.tsx).
// Module 6 (this build): UX/interaction polish — a genuine dark/light theme
// (ThemeProvider/ThemeToggle below), a wall-mounted ops-room TV display
// mode, instant guest search across the day's full roster, an audible
// overdue-check-in alert, and a first-time-viewer onboarding tour (all in
// PageBody.tsx + TvMode.tsx + GuestSearch.tsx + OnboardingTour.tsx).
//
// NOTE ON STRUCTURE: page.tsx stays a Server Component (required to export
// `metadata`), and now only wraps <OpsShell>/<ThemeProvider> around
// <PageBody>, which owns literally all of the actual page content as a
// Client Component — see PageBody.tsx's file-level comment for exactly why
// this split was necessary for feature 26 (dark/light mode) to genuinely
// reach every part of the page, including the hero and module tabs that
// used to be inlined directly in this Server Component's own JSX.
// ---------------------------------------------------------------------------

export default function HeliOpsPlatformDemo() {
  return (
    <ThemeProvider>
      <OpsShell>
        <PrototypeBanner />
        <Nav />
        <div className="mx-auto flex max-w-6xl justify-end px-4 pt-4 sm:px-6">
          <ThemeToggle />
        </div>
        <PageBody />
        <Footer />
      </OpsShell>
    </ThemeProvider>
  );
}
