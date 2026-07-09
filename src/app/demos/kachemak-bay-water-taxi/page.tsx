import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  TideShell,
  Emblem,
  ArtTile,
  BayConditions,
  SITE,
  HUB_PATH,
  type KbAccent,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders so the proof
// never pollutes bluewaveprojects.com's index.
export const metadata: Metadata = {
  title: "Kachemak Bay Water Taxi Co. — Homer, Alaska Drop-offs, Crossings & Live Tides (Sample Demo)",
  description:
    "A guest-facing marketing and inquiry sample for a Homer, Alaska water-taxi and small-ferry operator: drop-offs and pickups across Kachemak Bay — Kachemak Bay State Park trailheads (Glacier Spit, Grewingk Glacier Lake), Halibut Cove, Seldovia, and Gull Island — with a live NOAA tide panel for a bay where the tide runs the show. A clearly-labeled sample concept built by BlueWave Projects on public geography and live public data. Fictional brand; not affiliated with any real operator.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED DATA
// ---------------------------------------------------------------------------
// "Kachemak Bay Water Taxi Co." is a DELIBERATELY FICTIONAL sample brand (most
// real Homer operators already run online booking, so a real-name demo would
// misrepresent them). Everything factual below — destinations, geography,
// transit ranges, season, and the tide behavior — is real and publicly
// verified (research 2026-07-09). NO real operator's name, prices, departure
// times, phone, or email appear anywhere. No pricing is invented.

const BRAND = "Kachemak Bay Water Taxi Co.";

type Service = {
  title: string;
  accent: KbAccent;
  figure: "bay" | "boat" | "spit" | "puffin" | "otter" | "glacier";
  blurb: string;
  tag: string;
};

const services: Service[] = [
  {
    title: "State Park trailhead drops",
    accent: "spruce",
    figure: "glacier",
    blurb:
      "The classic Kachemak Bay day: dropped at Glacier Spit, out over the Saddle Trail to Grewingk Glacier Lake, and picked back up on your schedule. You set the drop and pickup times; we watch the tide and the crossing.",
    tag: "Signature",
  },
  {
    title: "Gull Island wildlife run",
    accent: "fireweed",
    figure: "puffin",
    blurb:
      "A short scenic loop past the Gull Island seabird rookery — puffins, kittiwakes, murres, and often otters and sea lions on the way. The easy add-on to any crossing.",
    tag: "Wildlife",
  },
  {
    title: "Halibut Cove & Seldovia crossings",
    accent: "bay",
    figure: "boat",
    blurb:
      "Passenger runs across the bay to the Halibut Cove boardwalk and galleries, and to the old harbor town of Seldovia — the small-ferry way to reach communities the road can't.",
    tag: "Crossings",
  },
  {
    title: "Kayak & campsite drops",
    accent: "gold",
    figure: "otter",
    blurb:
      "Drop-offs for kayakers and campers into Tutka Bay, Sadie Cove, Jakolof Bay, China Poot, and the state-park public-use cabins and yurts — gear, boats, and dogs welcome aboard.",
    tag: "Drop-off",
  },
  {
    title: "Custom charters & freight",
    accent: "bay",
    figure: "spit",
    blurb:
      "Private group charters, lodge and cabin transfers, and light freight into the backcountry coves. Small-boat flexibility, built around where you actually need to go.",
    tag: "Custom",
  },
  {
    title: "Tide-timed pickups",
    accent: "ice",
    figure: "bay",
    blurb:
      "Every landing and pickup is planned around the stage of the tide — Kachemak Bay's range is enormous, and beaches, dock ramps, and lagoon entrances open and close with the water. We plan the day around it so you don't have to.",
    tag: "How we run",
  },
];

// Real destinations across Kachemak Bay (geography only — no operator specifics).
type Dest = { name: string; note: string };
const destinations: Dest[] = [
  { name: "Glacier Spit / Saddle Trail", note: "Gateway to the Grewingk Glacier Lake day hike. ~30 min across." },
  { name: "Grewingk Glacier Lake", note: "Icebergs calved off Grewingk Glacier; the flagship trail in the State Park." },
  { name: "Halibut Cove", note: "Artist colony and boardwalk across the bay — galleries, gardens, the lagoon." },
  { name: "Halibut Cove Lagoon", note: "Ranger station and public-use cabins; a tide-gated lagoon entrance." },
  { name: "Seldovia", note: "Historic Russian-Alaskan harbor town — boardwalk, beaches, slower pace." },
  { name: "Gull Island", note: "Seabird rookery — the classic short wildlife stop on the way out." },
  { name: "Tutka & Sadie Cove", note: "Quiet fjords for kayaking, camping, and lodge stays." },
  { name: "Jakolof Bay", note: "Kayak launches and the back road toward Seldovia." },
  { name: "China Poot / Kayak Beach", note: "Paddling water and beach camps close to the Homer side." },
];

// Grounded FAQ. Sample-framing is explicit; nothing operator-specific invented.
const faq: { q: string; a: string }[] = [
  {
    q: "How does a water taxi work?",
    a: "You pick a destination across Kachemak Bay and set a drop-off and a pickup time; the boat runs on demand (plus some scheduled peak-season runs). Most crossings out of the Homer Spit are roughly 30–45 minutes each way depending on where you're headed.",
  },
  {
    q: "Where do we meet?",
    a: "On the Homer Spit — Alaska's long gravel finger of harbor, shops, and boat ramps reaching into Kachemak Bay. (This is a sample concept page, so no specific dock, address, or phone is listed — the live build would show the operator's real ramp and contact.)",
  },
  {
    q: "When does the season run?",
    a: "Roughly May through September, weather and demand permitting — the heart of the Kachemak Bay hiking, kayaking, and Halibut Cove season.",
  },
  {
    q: "Why is there a live tide panel?",
    a: "Because in Kachemak Bay the tide runs everything. The bay has one of the largest tidal ranges in the world — a mean range near 16 feet, a great diurnal range over 18 feet, and swings that can approach 28 feet. Beach landings, dock ramps, and the Halibut Cove Lagoon entrance all open and close with the tide, so a crossing is planned around it. The panel up top pulls the live NOAA tide predictions for Homer (Coal Point) so you can see the day at a glance.",
  },
  {
    q: "Is the conditions panel real?",
    a: "Yes. It pulls live tide predictions for Homer/Coal Point (NOAA station 9455558) and the latest Homer Airport (PAHO) wind and sky from the National Weather Service — both public, keyless feeds. Sunrise, sunset, and daylight are computed for Homer. If a feed is unreachable, that block shows a clearly-labeled sample instead — never presented as live. It's a planning aid, not a go/no-go; a real operator's captains always make the call.",
  },
  {
    q: "Can you carry kayaks, gear, and dogs?",
    a: "A water taxi is built for exactly that — kayaks and canoes on deck, camping and hunting gear, coolers, and dogs. The specifics (capacity, what's aboard, any fees) would be the real operator's to confirm.",
  },
];

const quickFacts = [
  { v: "Homer Spit", l: "Home port", s: "into Kachemak Bay" },
  { v: "~30–45 min", l: "Typical crossing", s: "each way, by destination" },
  { v: "May–Sept", l: "Season", s: "hiking & Halibut Cove months" },
  { v: "By inquiry", l: "Booking", s: "sample concept — see note" },
];

export default function KachemakBayWaterTaxiPage() {
  return (
    <>
      <TideShell>
        <main className="min-h-screen text-[#0c2a30]">
          <Nav />

          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0d3540] via-[#166170] to-[#08222b] text-[#f3faf9]">
            {/* bay-water + low-sun texture */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="kb-hero-sun" cx="85%" cy="16%" r="42%">
                  <stop offset="0%" stopColor="#ffe0b0" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffe0b0" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#kb-hero-sun)" />
              <path d="M-50 470 C 300 410, 700 510, 1250 450" stroke="#c9e9e9" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
              <path d="M-50 510 C 300 460, 700 550, 1250 490" stroke="#c9e9e9" strokeWidth="1" fill="none" strokeDasharray="2 9" opacity="0.6" />
              {/* far mountain silhouette */}
              <path d="M-50 360 L160 250 L320 330 L520 230 L720 340 L920 250 L1120 330 L1250 280 L1250 600 L-50 600 Z" fill="#08222b" opacity="0.28" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e6a94b]/45 bg-[#08222b]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f2c37f]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e6a94b]" />
                    Homer, Alaska · Kachemak Bay
                  </div>
                  <h1 className="kb-display mb-5 max-w-2xl text-5xl font-bold leading-[1.03] sm:text-6xl">
                    {BRAND}{" "}
                    <span className="text-[#e6a94b]">Across the bay, on your schedule.</span>
                  </h1>
                  <div className="kb-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#f3faf9]/85">
                    Drop-offs, pickups, and small-ferry crossings out of the
                    Homer Spit — to the Kachemak Bay State Park trailheads,
                    Halibut Cove, Seldovia, and Gull Island. Every run planned
                    around a tide that swings farther than almost anywhere on
                    earth.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#services"
                      className="rounded-full bg-gradient-to-r from-[#d9558c] to-[#e6a94b] px-8 py-3.5 text-center text-sm font-semibold text-[#08222b] shadow-[0_10px_30px_-10px_rgba(217,85,140,0.6)] transition-transform hover:-translate-y-0.5"
                    >
                      See what we run →
                    </a>
                    <a
                      href="#inquire"
                      className="rounded-full border border-[#f3faf9]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f3faf9]/90 transition-colors hover:border-[#f3faf9]/70 hover:bg-[#f3faf9]/5"
                    >
                      Plan a crossing
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — the showpiece */}
                <div className="relative">
                  <BayConditions />
                  <Emblem size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="kb-card p-5">
                  <div className="kb-display text-2xl font-bold text-[#b23a6e] sm:text-3xl">
                    {stat.v}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#166170]">
                    {stat.l}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#5d7b7f]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* THE STORY */}
          <section id="story" className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="kb-card overflow-hidden p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="kb-eyebrow mb-3">The far side of Kachemak Bay</p>
                  <h2 className="kb-display text-3xl font-bold leading-tight text-[#0c2a30] sm:text-4xl">
                    A boat ride to country{" "}
                    <span className="text-[#b23a6e]">the road can&apos;t reach.</span>
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#37585d]">
                    <p>
                      Across Kachemak Bay from the Homer Spit sits some of the
                      best hiking, paddling, and wildlife country in
                      Alaska — the Kachemak Bay State Park trailheads,
                      the glacier lakes, the seabird rookeries, and the
                      boardwalk communities of Halibut Cove and Seldovia. None
                      of it is on the road system. A water taxi is how you get
                      there.
                    </p>
                    <p>
                      This sample concept shows how a Homer water-taxi operator
                      could present that in one clear place — the crossings,
                      the destinations, and a live read on the one thing that
                      governs every run across this bay: the tide.
                    </p>
                  </div>
                </div>
                <ArtTile
                  accent="bay"
                  figure="spit"
                  label="The Homer Spit, into Kachemak Bay"
                  tall
                />
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section id="services" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="kb-eyebrow mb-3">What we run</p>
              <h2 className="kb-display text-4xl font-bold text-[#0c2a30] sm:text-5xl">
                The <span className="text-[#b23a6e]">crossings.</span>
              </h2>
              <div className="kb-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#37585d]">
                Drop-offs, pickups, and small-ferry runs — custom and
                small-group, planned around the tide.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((sv) => (
                <div key={sv.title} className="kb-card flex flex-col overflow-hidden">
                  <ArtTile
                    accent={sv.accent}
                    figure={sv.figure}
                    label={sv.title}
                    className="rounded-b-none border-0"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="kb-display text-lg font-semibold leading-tight text-[#0c2a30]">
                        {sv.title}
                      </h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#166170]/20 bg-[#166170]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#166170]">
                        {sv.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#37585d]">{sv.blurb}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Honest note: no online pricing on a sample */}
            <div className="mx-auto mt-8 max-w-3xl kb-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#5d7b7f]">
                <span className="font-semibold text-[#0c2a30]">Rates:</span> water-taxi
                pricing varies by destination distance and party size, so no
                pricing is shown on this sample concept — the live build would
                carry the operator&apos;s own current rates and booking.
              </p>
            </div>
          </section>

          {/* DESTINATIONS */}
          <section id="destinations" className="mx-auto max-w-6xl px-6 pb-8">
            <div className="mb-10 text-center">
              <p className="kb-eyebrow mb-3">Where we go</p>
              <h2 className="kb-display text-4xl font-bold text-[#0c2a30] sm:text-5xl">
                Across the <span className="text-[#b23a6e]">bay.</span>
              </h2>
              <div className="kb-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#37585d]">
                Real destinations around Kachemak Bay — the trailheads, coves,
                islands, and communities on the far shore.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((d) => (
                <div key={d.name} className="kb-card p-5">
                  <div className="mb-1.5 flex items-center gap-2">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#b23a6e]" fill="none" aria-hidden="true">
                      <path d="M10 18s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z" stroke="currentColor" strokeWidth="1.4" />
                      <circle cx="10" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    <h3 className="kb-display text-base font-semibold leading-tight text-[#0c2a30]">
                      {d.name}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#37585d]">{d.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WHY TIDES — ties back to the live panel */}
          <section id="tides" className="relative overflow-hidden bg-gradient-to-br from-[#0d3540] via-[#166170] to-[#08222b] py-20 text-[#f3faf9]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#c9e9e9" strokeWidth="1.2" fill="none" strokeDasharray="3 10" />
              <path d="M-50 280 C 300 250, 700 310, 1250 260" stroke="#c9e9e9" strokeWidth="0.8" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <ArtTile
                    accent="ice"
                    figure="glacier"
                    label="Grewingk Glacier Lake, across the bay"
                    tall
                    className="w-full max-w-md sm:h-[340px]"
                  />
                </div>
                <div>
                  <p className="kb-eyebrow mb-3 !text-[#f2c37f]">The tide runs the bay</p>
                  <h2 className="kb-display mb-4 text-3xl font-bold sm:text-4xl">
                    One of the biggest tides <span className="text-[#e6a94b]">on earth.</span>
                  </h2>
                  <div className="space-y-4 text-[#f3faf9]/85">
                    <p className="leading-relaxed">
                      Kachemak Bay, off Cook Inlet, has a mean tidal range near
                      16 feet, a great diurnal range over 18 feet, and swings
                      that can approach 28 feet between a low and the next high.
                      That&apos;s the water rising and falling two or three
                      stories, twice a day.
                    </p>
                    <p className="leading-relaxed">
                      It decides everything a water taxi does. A beach that&apos;s
                      an easy step-off at high water is a mudflat six hours
                      later; the Halibut Cove Lagoon entrance and the dock ramps
                      open and close with the tide. The live panel up top pulls
                      the NOAA predictions for Homer&apos;s Coal Point so the
                      day&apos;s highs and lows are right there before you book.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-16">
            <div className="mb-10 text-center">
              <p className="kb-eyebrow mb-3">Frequently asked</p>
              <h2 className="kb-display text-4xl font-bold text-[#0c2a30] sm:text-5xl">
                Planning your <span className="text-[#b23a6e]">crossing.</span>
              </h2>
              <div className="kb-rule" />
            </div>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="kb-card p-6">
                  <h3 className="kb-display mb-2 text-base font-semibold leading-snug text-[#0c2a30]">
                    {f.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#37585d]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INQUIRY CTA — clearly-labeled sample, no real contact invented */}
          <section id="inquire" className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#e6a94b]/40 bg-gradient-to-br from-[#0d3540] via-[#166170] to-[#08222b] p-10 text-center text-[#f3faf9] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="kb-display mb-4 text-3xl font-bold sm:text-4xl">
                Plan a <span className="text-[#e6a94b]">crossing.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#f3faf9]/85">
                Tell us where you&apos;re headed and when, and we&apos;ll line up
                the drop-off and pickup around the tide. On the live build this
                is where the operator&apos;s real booking or inquiry form goes.
              </p>

              {/* sample inquiry mockup — visually complete, intentionally not wired up */}
              <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                {[
                  { l: "Destination", ph: "Glacier Spit / Grewingk" },
                  { l: "Date", ph: "Jul 2026" },
                  { l: "Party size", ph: "2 hikers + gear" },
                  { l: "Drop-off / pickup", ph: "9:00 AM / 5:00 PM" },
                ].map((f) => (
                  <div key={f.l} className="kb-glass p-3 text-left">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c9e9e9]/70">
                      {f.l}
                    </div>
                    <div className="mt-1 text-sm text-[#f3faf9]/80">{f.ph}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <button
                  type="button"
                  className="cursor-default rounded-full bg-gradient-to-r from-[#d9558c] to-[#e6a94b] px-8 py-3.5 text-center text-sm font-semibold text-[#08222b] shadow-[0_10px_30px_-10px_rgba(217,85,140,0.6)]"
                >
                  Request a crossing →
                </button>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#f3faf9]/50">
                This is a sample inquiry mockup, not a live form — it doesn&apos;t
                submit anywhere. The live build wires up the operator&apos;s real
                booking or inquiry system and contact details.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE — honest disclaimer */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="kb-card px-5 py-4 text-center text-xs leading-relaxed text-[#5d7b7f]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#0c2a30]">sample marketing &amp; inquiry concept</span>{" "}
                built by{" "}
                <a
                  href={SITE}
                  className="font-semibold text-[#b23a6e] underline underline-offset-2 hover:text-[#c9882f]"
                >
                  BlueWave Projects
                </a>
                .{" "}
                <span className="font-semibold text-[#0c2a30]">
                  &quot;{BRAND}&quot; is a fictional sample brand
                </span>{" "}
                — it is not a real business and is not affiliated with or
                endorsed by any actual Homer or Kachemak Bay operator. All
                imagery is designed sample illustration, not photography; a real
                build would use the operator&apos;s own branding and photos. No
                prices, departure times, phone numbers, or addresses are shown,
                because none are real. The destinations, geography, transit
                ranges, and season are real and publicly verifiable. The
                &quot;Homer tides &amp; conditions&quot; panel pulls live public
                data — NOAA CO-OPS tide predictions for Homer / Coal Point
                (station{" "}
                <span className="kb-mono rounded bg-[#166170]/8 px-1 py-0.5 text-[#b23a6e]">9455558</span>
                , relative to MLLW) and the latest Homer Airport (PAHO)
                observation from the National Weather Service; sunrise, sunset,
                and daylight are computed for Homer. If a feed is unreachable, the
                panel shows a clearly-labeled sample instead — never presented as
                live. It is a planning aid, not a navigational or go/no-go tool.
                Always confirm current service, availability, and rates directly
                with a real, licensed operator before booking a crossing.
              </p>
            </div>
          </div>
        </main>
      </TideShell>
      {/* Footer lives OUTSIDE <TideShell>: the shell paints a light canvas and
          the site Footer is styled for dark backgrounds — rendered here on a
          deep bay surface it reads correctly. */}
      <div className="bg-[#08222b] text-[#f3faf9]">
        <Footer />
      </div>
    </>
  );
}
