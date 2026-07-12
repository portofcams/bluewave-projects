import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import { GalleryCard } from "./gallery-card";

// The index of every do-the-work-first proof — ONE link to send. Unlisted like
// everything under /demos: NOINDEX + robots-disallowed, shared only by hand.
export const metadata: Metadata = {
  title: "The Proof Shelf — 27 Working Demos by BlueWave Projects",
  description:
    "Every do-the-work-first build in one place: sample operator sites with live NOAA/NWS/PacIOOS/space-weather data, unofficial event hubs, live AIS vessel maps, reverent tributes, a scroll-driven data essay, and product prototypes — Alaska, Hawaiʻi, and the Salish Sea.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

// ---------------------------------------------------------------------------
// THE SHELF — every demo, honestly labeled. `kind` chips match what each page
// says about itself; `feeds` only lists live sources the page actually carries.
// ---------------------------------------------------------------------------
type Demo = {
  slug: string;
  name: string;
  blurb: string;
  region: "Alaska" | "Hawaiʻi" | "Washington" | "Oʻahu";
  kind: "Sample brand" | "Unofficial hub" | "Tribute" | "Data essay" | "Prototype";
  feeds: string[];
};

const OPERATORS: Demo[] = [
  {
    slug: "charter-fleet-tracker",
    name: "Resurrection Bay Charters",
    blurb: "Seward halibut & salmon charters with the portfolio's boldest feature — a live AIS vessel map of the bay, so the family on shore can watch the boat.",
    region: "Alaska",
    kind: "Sample brand",
    feeds: ["AIS vessels", "NOAA tide", "NWS wind"],
  },
  {
    slug: "san-juan-whale-watch",
    name: "Haro Strait Whale Tours",
    blurb: "Friday Harbor whale watching: live vessel map plus real community whale sightings (Acartia) — shown as coarse areas, never pins. Be Whale Wise, by design.",
    region: "Washington",
    kind: "Sample brand",
    feeds: ["AIS vessels", "Whale sightings", "Tidal current"],
  },
  {
    slug: "waikiki-surf-dive",
    name: "Waikiki Surf & Dive Co.",
    blurb: "Learn to surf at Queens, dive the wrecks — with live South Shore surf, water temp, tide, and UV on the page. Reef-safe and mālama-first.",
    region: "Hawaiʻi",
    kind: "Sample brand",
    feeds: ["PacIOOS surf", "NOAA tide & temp", "EPA UV"],
  },
  {
    slug: "kachemak-bay-water-taxi",
    name: "Kachemak Bay Water Taxi Co.",
    blurb: "Homer drop-offs and crossings, ruled by one of the biggest tides on earth — a live NOAA tide curve sits where the booking decision happens.",
    region: "Alaska",
    kind: "Sample brand",
    feeds: ["NOAA tides", "NWS wind"],
  },
  {
    slug: "lazy-otter-charters",
    name: "Lazy Otter Charters",
    blurb: "A real Whittier operator's story, rebuilt as a sample: Prince William Sound glacier tours with a live Portage Glacier weather read.",
    region: "Alaska",
    kind: "Sample brand",
    feeds: ["NWS conditions"],
  },
  {
    slug: "alaska-rainbow-lodge",
    name: "Alaska Rainbow Lodge",
    blurb: "A Bristol Bay fly-in fishing lodge with a live King Salmon flying-conditions panel — weather a floatplane guest actually checks.",
    region: "Alaska",
    kind: "Sample brand",
    feeds: ["NWS conditions"],
  },
  {
    slug: "alaska-royal-coachman-lodge",
    name: "Royal Coachman Lodge",
    blurb: "The Wood-Tikchik sibling build — same wedge, different palette, live Dillingham panel. Proof the pattern repeats cleanly.",
    region: "Alaska",
    kind: "Sample brand",
    feeds: ["NWS conditions"],
  },
  {
    slug: "aurora-fairbanks",
    name: "Tanana Ridge Aurora Co.",
    blurb: "Fairbanks aurora chase tours with a live NOAA space-weather panel — Kp index and aurora probability honestly gated on a computed darkness window, not just a Kp number.",
    region: "Alaska",
    kind: "Sample brand",
    feeds: ["NOAA space weather", "NWS sky", "Computed darkness"],
  },
  {
    slug: "queen-k-cycle-kona",
    name: "Queen K Cycle Co.",
    blurb: "A Kailua-Kona bike shop for Ironman race-week riders — live Queen K wind turned into an honest wheel-choice read, the same crosswinds that get disc wheels restricted at Kona.",
    region: "Hawaiʻi",
    kind: "Sample brand",
    feeds: ["NWS wind/temp", "Computed daylight"],
  },
];

const EVENTS: Demo[] = [
  {
    slug: "valdez-fly-in",
    name: "Valdez Fly-In & Air Show",
    blurb: "The grandfather of STOL competitions — with live PAVD weather and a density-altitude tile computing the number every bush pilot fights.",
    region: "Alaska",
    kind: "Unofficial hub",
    feeds: ["NWS METAR", "Density altitude"],
  },
  {
    slug: "port-townsend-wooden-boat",
    name: "Port Townsend Wooden Boat Festival",
    blurb: "A varnish-and-brass hub for North America's great wooden boat gathering — led by the live Point Wilson tidal current, the water that runs the show.",
    region: "Washington",
    kind: "Unofficial hub",
    feeds: ["Tidal current", "NOAA tide", "NWS wind"],
  },
  {
    slug: "alaska-aviation-gathering",
    name: "Great Alaska Aviation Gathering",
    blurb: "Palmer's GA homecoming with a live 'flying in?' METAR panel — decoded for pilots, honest about its sources.",
    region: "Alaska",
    kind: "Unofficial hub",
    feeds: ["FAA/NWS METAR"],
  },
  {
    slug: "dukes-oceanfest",
    name: "Duke's OceanFest",
    blurb: "Waikiki's ocean-sports festival with live NOAA tides — the first live-data showpiece in the series.",
    region: "Hawaiʻi",
    kind: "Unofficial hub",
    feeds: ["NOAA tides"],
  },
  {
    slug: "kodiak-crab-festival",
    name: "Kodiak Crab Festival",
    blurb: "A working-harbor festival hub with live Kodiak conditions, in neutral info-first tone.",
    region: "Alaska",
    kind: "Unofficial hub",
    feeds: ["NWS conditions"],
  },
  {
    slug: "iditarod-2027",
    name: "Iditarod 2027",
    blurb: "An information headquarters for the Last Great Race — dates, events, and how to actually follow it.",
    region: "Alaska",
    kind: "Unofficial hub",
    feeds: [],
  },
  {
    slug: "yukon-quest-2027",
    name: "Yukon Quest 2027",
    blurb: "The tougher, quieter thousand-mile race, explained — route, dates, and following the teams.",
    region: "Alaska",
    kind: "Unofficial hub",
    feeds: [],
  },
  {
    slug: "fur-rondy-2027",
    name: "Fur Rondy 2027",
    blurb: "Anchorage's winter carnival, organized into a planable schedule and guide.",
    region: "Alaska",
    kind: "Unofficial hub",
    feeds: [],
  },
  {
    slug: "alaska-state-fair-2026",
    name: "Alaska State Fair 2026",
    blurb: "A day-planner hub for the Palmer fair — concerts, tickets, and giant vegetables, demystified.",
    region: "Alaska",
    kind: "Unofficial hub",
    feeds: [],
  },
  {
    slug: "anchorage-film-fest-2026",
    name: "Anchorage International Film Festival",
    blurb: "Schedule, tickets, and a festival guide built the way a filmgoer actually uses one.",
    region: "Alaska",
    kind: "Unofficial hub",
    feeds: [],
  },
  {
    slug: "hawaii-international-film-festival-2026",
    name: "Hawaiʻi International Film Festival",
    blurb: "HIFF's island-hopping program, made navigable — schedule plus an island guide.",
    region: "Hawaiʻi",
    kind: "Unofficial hub",
    feeds: [],
  },
];

const EDITORIAL: Demo[] = [
  {
    slug: "two-heartbeats",
    name: "One Island, Two Heartbeats",
    blurb: "A scroll-driven data essay: 16 years of the SWAN wave model show Oʻahu's two shores breathing out of phase — with today's live reading placed on the rhythm.",
    region: "Oʻahu",
    kind: "Data essay",
    feeds: ["PacIOOS live overlay", "Baked 16-yr dataset"],
  },
  {
    slug: "molokai-hoe",
    name: "Molokaʻi Hoe & Nā Wāhine O Ke Kai",
    blurb: "An independent tribute to the world-championship Kaʻiwi Channel crossings, with live channel conditions offered in mālama — never as marketing.",
    region: "Hawaiʻi",
    kind: "Tribute",
    feeds: ["PacIOOS swell", "NWS wind", "NOAA tide"],
  },
  {
    slug: "the-eddie",
    name: "The Eddie",
    blurb: "A reverent information hub for the Eddie Aikau Big Wave Invitational at Waimea Bay — a portfolio piece, never a pitch.",
    region: "Hawaiʻi",
    kind: "Tribute",
    feeds: [],
  },
  {
    slug: "denali-park-road",
    name: "Denali Park Road",
    blurb: "The template case for content-first work: a live 'Denali right now' panel on real visitor guidance.",
    region: "Alaska",
    kind: "Unofficial hub",
    feeds: ["NWS conditions"],
  },
];

const PROTOTYPES: Demo[] = [
  {
    slug: "heli-ops-platform",
    name: "Heli-Ops Platform",
    blurb: "A B2B concept prototype: scheduling, manifests, dispatch, and flight-following for a heli-ski operation — six modules deep.",
    region: "Alaska",
    kind: "Prototype",
    feeds: ["NWS conditions"],
  },
  {
    slug: "clearspar-heli-ios",
    name: "Clearspar Heli — Native Apps",
    blurb: "The same heli-ski operation rebuilt as two native iOS + watchOS apps — the skier's trip companion and the crew's ops board — where nothing on screen is ever faked. A live sim walkthrough.",
    region: "Alaska",
    kind: "Prototype",
    feeds: [],
  },
  {
    slug: "ai-front-desk",
    name: "AI Front Desk",
    blurb: "A working AI concierge sample — the conversational front desk a small operator could actually run.",
    region: "Hawaiʻi",
    kind: "Prototype",
    feeds: [],
  },
];

const SECTIONS: { title: string; sub: string; demos: Demo[] }[] = [
  {
    title: "Operators, with the ocean on the page",
    sub: "Fictional sample brands on real geography — each carries the live data its real customers would actually check.",
    demos: OPERATORS,
  },
  {
    title: "Events & festivals",
    sub: "Independent, unofficial information hubs for real events — info-first tone, dates verified, nothing invented.",
    demos: EVENTS,
  },
  {
    title: "Tributes & essays",
    sub: "Editorial work: reverent tribute hubs and a scroll-driven data story. Respect first, always.",
    demos: EDITORIAL,
  },
  {
    title: "Product concepts",
    sub: "Deeper software prototypes — operations platforms and AI, beyond the marketing page.",
    demos: PROTOTYPES,
  },
];

const KIND_STYLE: Record<Demo["kind"], string> = {
  "Sample brand": "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  "Unofficial hub": "border-sky-400/40 bg-sky-400/10 text-sky-200",
  Tribute: "border-amber-300/40 bg-amber-300/10 text-amber-100",
  "Data essay": "border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-200",
  Prototype: "border-orange-400/40 bg-orange-400/10 text-orange-200",
};

const COUNT = OPERATORS.length + EVENTS.length + EDITORIAL.length + PROTOTYPES.length;

export default function DemosIndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050d18] via-[#081426] to-[#050d18] text-slate-100">
      <Nav />
      <DemoTracking demo="demos-index" />

      {/* HEADER */}
      <header className="mx-auto max-w-5xl px-6 pb-10 pt-32 text-center">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
          BlueWave Projects · do-the-work-first
        </p>
        <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          The proof shelf.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          {COUNT} working builds — sample operator sites with live ocean,
          aviation, and space-weather data, unofficial event hubs, live vessel
          maps, reverent tributes, and a data essay. We build the proof first,
          then start the conversation.
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-xs leading-relaxed text-slate-500">
          Every page is unlisted and honestly labeled: sample brands are
          fictional, event hubs are independent and unofficial, live panels fall
          back to clearly-marked samples when a feed is unreachable, and nothing
          is ever presented as affiliated or endorsed.
        </p>
      </header>

      {/* SECTIONS */}
      {SECTIONS.map((sec) => (
        <section key={sec.title} className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{sec.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{sec.sub}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sec.demos.map((d) => (
              <GalleryCard
                key={d.slug}
                slug={d.slug}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-[17px] font-semibold leading-snug text-white">{d.name}</h3>
                  <span className="shrink-0 rounded-full border border-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    {d.region}
                  </span>
                </div>
                <p className="flex-1 text-[13px] leading-relaxed text-slate-300">{d.blurb}</p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] ${KIND_STYLE[d.kind]}`}>
                    {d.kind}
                  </span>
                  {d.feeds.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1 rounded-full border border-teal-300/30 bg-teal-300/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-teal-200">
                      <span className="relative flex h-1 w-1">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
                        <span className="relative inline-flex h-1 w-1 rounded-full bg-teal-300" />
                      </span>
                      {f}
                    </span>
                  ))}
                </div>
                <span className="mt-4 text-[12px] font-semibold text-sky-300 opacity-0 transition-opacity group-hover:opacity-100">
                  Open the build →
                </span>
              </GalleryCard>
            ))}
          </div>
        </section>
      ))}

      {/* FOOT NOTE */}
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-6">
        <p className="text-center text-xs leading-relaxed text-slate-500">
          Built by{" "}
          <a href="https://bluewaveprojects.com" className="font-semibold text-slate-300 underline underline-offset-2">
            BlueWave Projects
          </a>{" "}
          in Honolulu — on public data from NOAA, the National Weather Service,
          PacIOOS, EPA, Acartia, and public AIS. Live panels are planning aids,
          never navigational or official guidance. If one of these is yours to
          claim — an event we&apos;ve honored, an operator we&apos;ve sampled —
          say the word and we&apos;ll tailor it, hand it over, or take it down.
        </p>
      </div>

      <Footer />
    </main>
  );
}
