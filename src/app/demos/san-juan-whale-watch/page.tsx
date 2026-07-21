import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import {
  IslandShell,
  Emblem,
  ArtTile,
  WhaleFleet,
  SITE,
  HUB_PATH,
  type SjAccent,
  type SjPhoto,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders.
export const metadata: Metadata = {
  title: "Haro Strait Whale Tours — San Juan Islands Whale Watching with a Live Fleet Map (Sample Demo)",
  description:
    "A guest-facing sample for a San Juan Islands whale-watch operator out of Friday Harbor: Bigg's orcas, humpbacks, and Salish Sea wildlife — with a live map so you can watch the boat, live conditions, and a responsible Be-Whale-Wise posture. A clearly-labeled sample concept by BlueWave Projects on public geography, real public AIS traffic, and community-reported sightings; a fictional brand, not affiliated with any real operator.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED DATA (workflow research + adversarial verify, 2026-07-09)
// ---------------------------------------------------------------------------
// "Haro Strait Whale Tours" is a DELIBERATELY FICTIONAL sample brand (verified
// unused). Real geography + real live AIS traffic (labeled) + real
// community-reported sightings (Acartia) — NO real operator name/prices/vessel
// names, NO guarantee of whales. Conservation framing verified against WDFW /
// RCW 77.15.740 / PWWA: 1,000 yd from endangered Southern Residents (eff.
// Jan 1 2025), commercial tours focus on Bigg's + other species, keep distance.

const BRAND = "Haro Strait Whale Tours";

type Item = {
  title: string;
  accent: SjAccent;
  figure: "orca" | "island" | "boat" | "fluke" | "sea" | "lighthouse";
  blurb: string;
  tag: string;
};

// Real, openly-licensed Salish Sea / PNW photos keyed by tile title.
const SJ_PHOTOS: Record<string, SjPhoto> = {
  "Bigg's orcas": { src: "/demos/san-juan-whale-watch/sooke-orca.webp", credit: "Buiobuione · CC BY-SA 4.0" },
  "Humpback whales": { src: "/demos/san-juan-whale-watch/humpback-breach.webp", credit: "Gillfoto · CC BY-SA 3.0" },
  "Minke, porpoise & more": { src: "/demos/san-juan-whale-watch/salish-waves.webp", credit: "BLM / N. Teague · Public domain" },
  "Seals, sea lions & eagles": { src: "/demos/san-juan-whale-watch/rosario-strait.webp", credit: "Joe Mabel · CC BY-SA 3.0" },
};

const see: Item[] = [
  {
    title: "Bigg's orcas",
    accent: "cyan",
    figure: "orca",
    blurb:
      "The Salish Sea's thriving mammal-eating orcas — seen on most days through the season, hunting seals, sea lions, and porpoise. These transients are the region's headline sighting, and the reason the water here feels so alive.",
    tag: "Orcas",
  },
  {
    title: "Humpback whales",
    accent: "evergreen",
    figure: "fluke",
    blurb:
      "Humpbacks have made a remarkable comeback in these waters — fluke-up dives, the occasional breach, and long lazy surface passes against an island backdrop. Increasingly the most-seen whale of the summer.",
    tag: "Whales",
  },
  {
    title: "Minke, porpoise & more",
    accent: "sea",
    figure: "sea",
    blurb:
      "Minke whales working the tide lines, harbor and Dall's porpoise riding the bow, and the year-round cast of the Salish Sea — there's always something moving when you know where to look.",
    tag: "Wildlife",
  },
  {
    title: "Seals, sea lions & eagles",
    accent: "slate",
    figure: "island",
    blurb:
      "Harbor seals hauled out on the rocks, Steller and California sea lions barking off the reefs, and bald eagles working the shoreline — the supporting cast that makes every trip worthwhile, whales or not.",
    tag: "On the rocks",
  },
];

const plan = [
  {
    n: "01",
    t: "Ferry to Friday Harbor",
    d: "The Washington State Ferry runs from Anacortes out to Friday Harbor through the islands — a beautiful trip in itself. Vehicle reservations are recommended in summer; check the current schedule and book ahead with Washington State Ferries.",
  },
  {
    n: "02",
    t: "Or fly the floatplane",
    d: "Kenmore Air flies from Seattle to Friday Harbor by floatplane in about 45 minutes, landing right at the marina — the fastest and most scenic way in, over the whole Salish Sea.",
  },
  {
    n: "03",
    t: "Watch the boat, live",
    d: "The map up top shows our vessel on the water in real time from public AIS. It tracks the boat — never the whales — so you can see we're actually out there working the strait, and time your day around the trip.",
  },
];

const wise = [
  {
    t: "1,000 yards from Southern Residents",
    d: "The endangered Southern Resident orcas get a wide berth — Washington law (effective 2025) keeps all vessels 1,000 yards away. We don't seek them out; when they're near, we give them room and go slow.",
  },
  {
    t: "Bigg's & other species are the trip",
    d: "Like all responsible operators, our tours focus on the recovering Bigg's orcas, humpbacks, and the rest of the Salish Sea's wildlife — never the residents. It's better watching and the right thing to do.",
  },
  {
    t: "We track the boat, not the whales",
    d: "Our live map shows our own vessel, broadcasting its own position. We don't publish live whale locations — crowding animals with boats is exactly what the rules exist to prevent. Be Whale Wise.",
  },
];

const faq: { q: string; a: string }[] = [
  {
    q: "Will we see whales?",
    a: "Often — but no honest operator guarantees it; these are wild animals. Bigg's orcas and humpbacks are seen on the great majority of days through the season, and there's almost always other wildlife — seals, sea lions, porpoise, eagles. We go find them; the ocean decides the rest.",
  },
  {
    q: "Will we see the famous resident orcas?",
    a: "You should not expect to. The Southern Resident killer whales are endangered, increasingly rare in these inland waters, and protected by a 1,000-yard setback that all vessels must keep. Responsible tours — including this concept — focus on the thriving Bigg's (transient) orcas and other species, and give the residents space.",
  },
  {
    q: "Is the live map real?",
    a: "Yes. It's built on real public AIS — the vessel-position broadcasts ships use to see each other. Whale-watch tour boats carry AIS (larger vessels by law in this traffic corridor), so once a boat is on the feed it shows as a live marker; until our proxy is connected the map shows a clearly-labeled sample fleet. Tide, tidal current, wind, and water temperature are live NOAA/NWS readings. Whale sightings are community-reported (via Acartia) — approximate and delayed, shown as recent activity, never as live whale positions.",
  },
  {
    q: "What should I bring, and when's the season?",
    a: "Layers, a warm jacket even in summer (it's cool on the water), sunglasses, and a camera. The season runs roughly April through October, with peak wildlife in the warmer months. Departures are from Friday Harbor.",
  },
];

const quickFacts = [
  { v: "Friday Harbor", l: "Departs", s: "San Juan Island" },
  { v: "Bigg's orcas", l: "The draw", s: "+ humpbacks, wildlife" },
  { v: "Live map", l: "Watch the boat", s: "real-time AIS" },
  { v: "Be Whale Wise", l: "How we run", s: "responsible viewing" },
];

export default function SanJuanWhaleWatchPage() {
  return (
    <>
      <IslandShell>
        <main className="min-h-screen text-[#0e2a33]">
          <Nav />
          <DemoTracking demo="san-juan-whale-watch" />

          {/* HERO — headline + the full-width live fleet map */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2f3f] via-[#16495e] to-[#0a1f2e] text-[#f2fbfb]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 440 C 300 410, 700 480, 1250 430" stroke="#cfe4e6" strokeWidth="1.2" fill="none" opacity="0.5" />
              <path d="M-50 480 C 300 450, 700 520, 1250 470" stroke="#2fc7d6" strokeWidth="1" fill="none" opacity="0.35" strokeDasharray="4 8" />
              {/* island silhouettes */}
              <path d="M-50 470 L120 430 L260 466 L420 428 L560 466 L720 430 L900 466 L1060 430 L1250 466 L1250 600 L-50 600 Z" fill="#0a1f2e" opacity="0.3" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-28">
              <div className="mb-8 max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2fc7d6]/45 bg-[#0a1f2e]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a6ecf2]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2fc7d6] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2fc7d6]" />
                  </span>
                  Friday Harbor · San Juan Islands
                </div>
                <h1 className="sjw-display mb-5 text-5xl font-extrabold leading-[1.03] sm:text-6xl">
                  Haro Strait{" "}
                  <span className="text-[#2fc7d6]">Whale Tours.</span>
                </h1>
                <div className="sjw-rule !mx-0 mb-6" />
                <p className="max-w-xl text-lg leading-relaxed text-[#f2fbfb]/85">
                  Bigg&apos;s orcas, humpbacks, and the wildlife of the Salish
                  Sea out of Friday Harbor — with a live map so you can watch the
                  boat work the strait, and a promise to give the whales the
                  space they need.
                </p>
              </div>

              {/* THE SHOWPIECE — full width */}
              <WhaleFleet />
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="sjw-card p-5">
                  <div className="sjw-display text-2xl font-bold text-[#147a8a] sm:text-3xl">{stat.v}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1f4a3a]">{stat.l}</div>
                  <div className="mt-1 text-xs leading-relaxed text-[#64808a]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* WHAT YOU SEE */}
          <section id="see" className="mx-auto max-w-6xl px-6 py-8">
            <div className="mb-12 text-center">
              <p className="sjw-eyebrow mb-3">On the water</p>
              <h2 className="sjw-display text-4xl font-bold text-[#0e2a33] sm:text-5xl">
                Who you&apos;ll <span className="text-[#147a8a]">meet.</span>
              </h2>
              <div className="sjw-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#395962]">
                The Salish Sea is one of the great wildlife theaters on the
                planet — orcas, whales, and a coastline that never stops moving.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {see.map((it) => (
                <div key={it.title} className="sjw-card flex flex-col overflow-hidden">
                  <ArtTile accent={it.accent} figure={it.figure} label={it.title} photo={SJ_PHOTOS[it.title]} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="sjw-display text-base font-semibold leading-tight text-[#0e2a33]">{it.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#16495e]/20 bg-[#16495e]/8 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#16495e]">
                        {it.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#395962]">{it.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BE WHALE WISE band */}
          <section id="wise" className="relative overflow-hidden bg-gradient-to-br from-[#0f2f3f] via-[#16495e] to-[#0a1f2e] py-20 text-[#f2fbfb]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#2fc7d6" strokeWidth="1.2" fill="none" strokeDasharray="4 9" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="mb-10 text-center">
                <p className="sjw-eyebrow mb-3 !text-[#a6ecf2]">Responsible viewing</p>
                <h2 className="sjw-display text-3xl font-bold sm:text-4xl">
                  Be <span className="text-[#2fc7d6]">Whale Wise.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-[#f2fbfb]/85">
                  The best whale watching gives the whales room. Here&apos;s the
                  posture — it&apos;s the law, and it&apos;s the right way to be a
                  guest in their water.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {wise.map((w) => (
                  <div key={w.t} className="rounded-2xl border border-[#cfe4e6]/15 bg-[#0a1f2e]/30 p-6 backdrop-blur-sm">
                    <h3 className="sjw-display mb-2 text-lg font-semibold text-[#f2fbfb]">{w.t}</h3>
                    <p className="text-sm leading-relaxed text-[#f2fbfb]/80">{w.d}</p>
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-[#a6d6da]/70">
                Distances are set by Washington State and NOAA (1,000 yd from Southern Residents; 200 yd from other orcas; 100 yd from
                other whales). A real operator must hold a Washington commercial whale-watching license — confirm before booking any tour.
              </p>
            </div>
          </section>

          {/* PLAN */}
          <section id="plan" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <p className="sjw-eyebrow mb-3">Plan your visit</p>
              <h2 className="sjw-display text-4xl font-bold text-[#0e2a33] sm:text-5xl">
                Getting to <span className="text-[#147a8a]">Friday Harbor.</span>
              </h2>
              <div className="sjw-rule" />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {plan.map((s) => (
                <div key={s.n} className="sjw-card p-6">
                  <div className="sjw-display mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2fc7d6] to-[#147a8a] text-sm font-bold text-[#0a1f2e]">
                    {s.n}
                  </div>
                  <h3 className="sjw-display mb-2 text-lg font-semibold text-[#0e2a33]">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-[#395962]">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-6 max-w-3xl sjw-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#64808a]">
                On San Juan Island&apos;s west side, <span className="font-semibold text-[#0e2a33]">Lime Kiln Point State Park</span> —
                &quot;Whale Watch Park&quot; — is one of the best shore-based whale-watching spots anywhere, where the seabed drops
                near a thousand feet just off the 1919 lighthouse. Ferry schedules, tour times, and prices change seasonally — confirm
                current details with Washington State Ferries and a licensed operator before you travel.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
            <div className="mb-10 text-center">
              <p className="sjw-eyebrow mb-3">Frequently asked</p>
              <h2 className="sjw-display text-4xl font-bold text-[#0e2a33] sm:text-5xl">
                Before you <span className="text-[#147a8a]">cast off.</span>
              </h2>
              <div className="sjw-rule" />
            </div>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="sjw-card p-6">
                  <h3 className="sjw-display mb-2 text-base font-semibold leading-snug text-[#0e2a33]">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#395962]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CLOSING */}
          <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#2fc7d6]/40 bg-gradient-to-br from-[#0f2f3f] via-[#16495e] to-[#0a1f2e] p-10 text-center text-[#f2fbfb] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="sjw-display mb-4 text-3xl font-bold sm:text-4xl">
                Out where the <span className="text-[#2fc7d6]">wild things are.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#f2fbfb]/85">
                Bigg&apos;s orcas, humpbacks, and a live map of the boat that finds
                them. On a real build this is where the operator&apos;s booking and
                their own live vessel would go — reach out and we&apos;ll rig it up.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="sjw-card px-5 py-4 text-center text-xs leading-relaxed text-[#64808a]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#0e2a33]">sample marketing &amp; concept build</span>{" "}
                by{" "}
                <a href={SITE} className="font-semibold text-[#147a8a] underline underline-offset-2 hover:text-[#16495e]">
                  BlueWave Projects
                </a>
                .{" "}
                <span className="font-semibold text-[#0e2a33]">&quot;{BRAND}&quot; is a fictional sample brand</span>{" "}
                — not a real business, and not affiliated with or endorsed by any actual San Juan Islands operator. The scenery and
                wildlife photographs are real, openly-licensed images of the Salish Sea and Pacific Northwest (from Wikimedia Commons,
                BLM, and NOAA, credited on each), and none shows a real operator&apos;s vessel or branding; the emblem is a designed mark.
                No prices, schedules, vessel names, or contact are shown, because none are real;
                the species, geography, and conservation rules are real and publicly verifiable. The live map uses{" "}
                <span className="font-semibold text-[#0e2a33]">real public AIS</span> (vessel-position broadcasts) when its proxy is
                connected — real third-party traffic, never relabeled as &quot;our fleet&quot; — and a clearly-labeled sample fleet
                otherwise. Whale sightings are <span className="font-semibold text-[#0e2a33]">community-reported</span> via Acartia
                (Orca Network, The Whale Museum and others): approximate, delayed, shown as recent activity — never live whale positions.
                Tide and current are live NOAA (Friday Harbor / Haro Strait); water temp is the nearest NOAA sensor (Port Townsend); wind
                is Friday Harbor Airport (KFHR); sun times are computed. No sighting is ever guaranteed. Southern Resident orcas are
                endangered and protected; responsible, licensed operators keep their distance and focus on Bigg&apos;s and other species.
                Always confirm trips, licensing, and rates with a real operator before booking.
              </p>
            </div>
          </div>
        </main>
      </IslandShell>
      {/* Footer OUTSIDE <IslandShell>: shell paints a light misty canvas; the site
          Footer is styled for dark backgrounds — on deep Salish sea it reads
          correctly. */}
      <div className="bg-[#0a1f2e] text-[#f2fbfb]">
        <Footer />
      </div>
    </>
  );
}
