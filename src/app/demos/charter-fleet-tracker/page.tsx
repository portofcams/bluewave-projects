import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import {
  ChartShell,
  Emblem,
  ArtTile,
  CharterFleet,
  SITE,
  HUB_PATH,
  type ChAccent,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders.
export const metadata: Metadata = {
  title: "Resurrection Bay Charters — Seward Halibut & Salmon Fishing with a Live Fleet Map (Sample Demo)",
  description:
    "A guest-facing sample for a Seward, Alaska charter fishing operator: halibut, silver salmon, and bottom fishing out of Resurrection Bay — with a live vessel map so the family on shore can watch the boat. A clearly-labeled sample concept by BlueWave Projects on public geography and real public AIS traffic; a fictional brand, not affiliated with any real operator.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED DATA (research 2026-07-09)
// ---------------------------------------------------------------------------
// "Resurrection Bay Charters" is a DELIBERATELY FICTIONAL sample brand
// (prototyped on Seward, not Homer: most Homer charter boats are under 65 ft
// and don't transmit AIS, so a live map would be sparse; Seward has the same
// sport-fishing identity plus dense AIS traffic). Real geography, real species,
// real live public AIS traffic (labeled) — NO real operator name/prices, and
// the live map never relabels a real vessel as "our fleet."

const BRAND = "Resurrection Bay Charters";

type Item = {
  title: string;
  accent: ChAccent;
  figure: "boat" | "halibut" | "sonar" | "chart" | "rod" | "sea";
  blurb: string;
  tag: string;
};

const chase: Item[] = [
  {
    title: "Halibut on the bottom",
    accent: "ocean",
    figure: "halibut",
    blurb:
      "The reason Alaska sport-fishing exists — flat, powerful, and delicious, from 20-lb 'chickens' to the 100-lb-plus 'barn doors.' We fish the deep grounds off Resurrection Bay and into the Gulf.",
    tag: "Halibut",
  },
  {
    title: "Silver salmon runs",
    accent: "orange",
    figure: "rod",
    blurb:
      "When the silvers (coho) pour into Resurrection Bay in August, it's non-stop — bright, hard-fighting fish on light tackle. Seward's Silver Salmon Derby is one of Alaska's biggest.",
    tag: "Salmon",
  },
  {
    title: "Rockfish & lingcod",
    accent: "steel",
    figure: "sonar",
    blurb:
      "Drop to the reefs and pinnacles for hard-fighting rockfish and toothy lingcod — a fish-finder morning that fills the cooler and rarely disappoints.",
    tag: "Bottom fish",
  },
  {
    title: "Fjords & wildlife runs",
    accent: "ocean",
    figure: "boat",
    blurb:
      "Not everyone's here to fish. Combine a trip with the tidewater glaciers and wildlife of the Kenai Fjords right next door — whales, otters, puffins, and ice.",
    tag: "Sightseeing",
  },
];

const plan = [
  {
    n: "01",
    t: "Out of Seward",
    d: "We run from the Seward small-boat harbor at the head of Resurrection Bay — about two and a half hours south of Anchorage down the Seward Highway, or a scenic ride on the Alaska Railroad's Coastal Classic.",
  },
  {
    n: "02",
    t: "The season",
    d: "Charters run roughly May through September, with halibut all season, silver salmon peaking in August around the derby, and bottom fishing whenever the weather cooperates.",
  },
  {
    n: "03",
    t: "Watch the boat from the dock",
    d: "The live map up top is the whole idea: friends and family on shore can see the boat's position and the conditions in the bay in real time — no more wondering when to head down to the harbor for the photo at the fish-cleaning table.",
  },
];

const faq: { q: string; a: string }[] = [
  {
    q: "What will we catch?",
    a: "Out of Seward: Pacific halibut on the bottom all season, silver (coho) salmon peaking in August, and rockfish and lingcod on the reefs. Many trips mix species, and you can combine fishing with a Kenai Fjords wildlife and glacier run.",
  },
  {
    q: "Do I need experience or my own gear?",
    a: "No — charter trips supply the boat, gear, and the know-how; you bring layers, snacks, and a cooler for the fish. A licensed captain and crew handle the rest. (Specifics, licenses, and limits are the operator's to confirm.)",
  },
  {
    q: "Is the fleet map real?",
    a: "It's built on real live public AIS — the same vessel-position broadcasts ships use to see each other. When our proxy is connected, the map shows real vessel traffic in Resurrection Bay (via aisstream.io); until then it shows a clearly-labeled illustrative sample fleet. Most small charter boats don't carry AIS yet, so the live layer is larger vessels — the point is that once a boat carries a GPS/AIS unit, it becomes a live marker your family can follow. Tide, wind, and water temp are live NOAA/NWS readings for Seward.",
  },
  {
    q: "Can people really follow our boat live?",
    a: "That's the feature. Once a boat is equipped with an AIS or GPS tracker, its position streams to a page like this — so the folks back at the harbor (or at home) can watch it work the grounds and time their walk down to the dock. It's a small piece of hardware and a live map; the rest is what you see here.",
  },
];

const quickFacts = [
  { v: "Resurrection Bay", l: "Out of", s: "Seward, Alaska" },
  { v: "Halibut & silvers", l: "We chase", s: "+ rockfish, lingcod" },
  { v: "Live map", l: "Track the boat", s: "watch from shore" },
  { v: "May–Sept", l: "Season", s: "derby in August" },
];

export default function CharterFleetTrackerPage() {
  return (
    <>
      <ChartShell>
        <main className="min-h-screen text-[#0e2438]">
          <Nav />
          <DemoTracking demo="charter-fleet-tracker" />

          {/* HERO — headline + the full-width live fleet map */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0c2740] via-[#123a5c] to-[#081a2b] text-[#eef6fa]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <pattern id="chf-hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
                  <path d="M56 0H0V56" fill="none" stroke="#d6e6ee" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="1200" height="600" fill="url(#chf-hero-grid)" />
              <path d="M-50 430 C 300 400, 700 470, 1250 420" stroke="#7fb0cc" strokeWidth="1.2" fill="none" opacity="0.5" />
              <path d="M-50 470 C 300 440, 700 510, 1250 460" stroke="#2fd07a" strokeWidth="1" fill="none" opacity="0.35" strokeDasharray="4 8" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-28">
              <div className="mb-8 max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2fd07a]/45 bg-[#081a2b]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8fe6b8]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2fd07a] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2fd07a]" />
                  </span>
                  Seward · Resurrection Bay · live
                </div>
                <h1 className="chf-display mb-5 text-5xl font-extrabold leading-[1.02] sm:text-6xl">
                  {BRAND.replace(" Charters", "")}{" "}
                  <span className="text-[#ff7a3c]">Charters.</span>
                </h1>
                <div className="chf-rule !mx-0 mb-6" />
                <p className="max-w-xl text-lg leading-relaxed text-[#eef6fa]/85">
                  Halibut, silver salmon, and bottom fishing out of Seward — and
                  a live map of the bay so the family on shore can watch the boat
                  work the grounds. This is what a charter site looks like when
                  it shows you the water in real time.
                </p>
              </div>

              {/* THE SHOWPIECE — full width */}
              <CharterFleet />
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="chf-card p-5">
                  <div className="chf-display text-2xl font-bold text-[#e05f28] sm:text-3xl">{stat.v}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#16466b]">{stat.l}</div>
                  <div className="mt-1 text-xs leading-relaxed text-[#6a7f8e]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* WHAT WE CHASE */}
          <section id="fish" className="mx-auto max-w-6xl px-6 py-8">
            <div className="mb-12 text-center">
              <p className="chf-eyebrow mb-3">On the grounds</p>
              <h2 className="chf-display text-4xl font-bold text-[#0e2438] sm:text-5xl">
                What we <span className="text-[#e05f28]">chase.</span>
              </h2>
              <div className="chf-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3a5568]">
                Seward sits at the head of Resurrection Bay, minutes from deep
                halibut water and the salmon runs — with the Kenai Fjords right
                next door.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {chase.map((it) => (
                <div key={it.title} className="chf-card flex flex-col overflow-hidden">
                  <ArtTile accent={it.accent} figure={it.figure} label={it.title} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="chf-display text-base font-semibold leading-tight text-[#0e2438]">{it.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#16466b]/20 bg-[#16466b]/8 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#16466b]">
                        {it.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3a5568]">{it.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THE FEATURE BAND — the live tracking value prop */}
          <section id="track" className="relative overflow-hidden bg-gradient-to-br from-[#0c2740] via-[#123a5c] to-[#081a2b] py-20 text-[#eef6fa]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#2fd07a" strokeWidth="1.2" fill="none" strokeDasharray="4 9" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <ArtTile accent="sonar" figure="sonar" label="Live vessel positions" tall className="w-full max-w-md sm:h-[340px]" />
                </div>
                <div>
                  <p className="chf-eyebrow mb-3 !text-[#ff9d6e]">The feature no one else has</p>
                  <h2 className="chf-display mb-4 text-3xl font-bold sm:text-4xl">
                    Watch the boat, <span className="text-[#2fd07a]">live.</span>
                  </h2>
                  <div className="space-y-4 text-[#eef6fa]/85">
                    <p className="leading-relaxed">
                      Every charter site has photos and a phone number. None of
                      them show you where the boat actually is. The map up top
                      does — real vessel positions from public AIS, the same
                      broadcasts ships use to see each other, on a live chart of
                      Resurrection Bay.
                    </p>
                    <p className="leading-relaxed">
                      Put a small GPS/AIS unit on a charter boat and it becomes a
                      live marker on that map: the family on shore can watch it
                      run out, work the grounds, and turn for home — and time
                      their walk to the harbor for the photo at the cleaning
                      table. That&apos;s the feature this sample is really about.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PLAN */}
          <section id="plan" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <p className="chf-eyebrow mb-3">Plan your trip</p>
              <h2 className="chf-display text-4xl font-bold text-[#0e2438] sm:text-5xl">
                Getting on the <span className="text-[#e05f28]">water.</span>
              </h2>
              <div className="chf-rule" />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {plan.map((s) => (
                <div key={s.n} className="chf-card p-6">
                  <div className="chf-display mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff7a3c] to-[#e05f28] text-sm font-bold text-[#081a2b]">
                    {s.n}
                  </div>
                  <h3 className="chf-display mb-2 text-lg font-semibold text-[#0e2438]">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-[#3a5568]">{s.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
            <div className="mb-10 text-center">
              <p className="chf-eyebrow mb-3">Frequently asked</p>
              <h2 className="chf-display text-4xl font-bold text-[#0e2438] sm:text-5xl">
                Before you <span className="text-[#e05f28]">book.</span>
              </h2>
              <div className="chf-rule" />
            </div>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="chf-card p-6">
                  <h3 className="chf-display mb-2 text-base font-semibold leading-snug text-[#0e2438]">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#3a5568]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CLOSING */}
          <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#ff7a3c]/40 bg-gradient-to-br from-[#0c2740] via-[#123a5c] to-[#081a2b] p-10 text-center text-[#eef6fa] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" bottomText="Resurrection Bay · AK" />
              <h2 className="chf-display mb-4 text-3xl font-bold sm:text-4xl">
                Lines in the water by <span className="text-[#ff7a3c]">sunrise.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#eef6fa]/85">
                Halibut, silvers, and a live map of the bay. On a real build this
                is where the operator&apos;s booking and their own live fleet
                would go — reach out and we&apos;ll rig it up.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="chf-card px-5 py-4 text-center text-xs leading-relaxed text-[#6a7f8e]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#0e2438]">sample marketing &amp; concept build</span>{" "}
                by{" "}
                <a href={SITE} className="font-semibold text-[#e05f28] underline underline-offset-2 hover:text-[#16466b]">
                  BlueWave Projects
                </a>
                .{" "}
                <span className="font-semibold text-[#0e2438]">&quot;{BRAND}&quot; is a fictional sample brand</span>{" "}
                — not a real business, and not affiliated with or endorsed by any actual Seward or Homer operator.
                All illustration is designed sample art, not photography. No prices, schedules, licenses, phone
                numbers, or addresses are shown, because none are real; the species, geography, and season are
                real and publicly verifiable. The live fleet map uses <span className="font-semibold text-[#0e2438]">real
                public AIS</span> (vessel-position broadcasts, via aisstream.io) when its proxy is connected — showing
                genuine third-party vessel traffic in Resurrection Bay that is <span className="font-semibold text-[#0e2438]">never
                relabeled as &quot;our fleet&quot;</span>; when the proxy is offline it shows a clearly-labeled illustrative
                sample fleet. AIS is a public, crowd-sourced, best-effort broadcast — a planning aid, not an
                authoritative or guaranteed feed. Tide, wind, and water temperature are live NOAA/NWS readings for
                Seward; daylight is computed. Always confirm trips, licenses, and rates with a real, licensed
                operator before booking.
              </p>
            </div>
          </div>
        </main>
      </ChartShell>
      {/* Footer OUTSIDE <ChartShell>: shell paints a light chart canvas; the site
          Footer is styled for dark backgrounds — on deep chart navy it reads
          correctly. */}
      <div className="bg-[#081a2b] text-[#eef6fa]">
        <Footer />
      </div>
    </>
  );
}
