import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import {
  AlpineShell,
  Roundel,
  ArtTile,
  ValdezConditions,
  SITE,
  HUB_PATH,
  type VfAccent,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders so the proof
// never pollutes bluewaveprojects.com's index.
export const metadata: Metadata = {
  title: "Valdez Fly-In & Air Show (Valdez STOL) — Bush-Plane Info Hub with Live PAVD Weather (Sample)",
  description:
    "An information headquarters for the Valdez Fly-In & Air Show (Valdez STOL) — the grandfather of short-takeoff-and-landing competitions, held each May at Valdez Pioneer Field under the Chugach. The STOL classes, the air show, flying in vs. driving in, and a live 'flying in?' PAVD weather panel with a STOL density-altitude read. A sample build by BlueWave Projects on public information; not affiliated with the event.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED EVENT DATA (research 2026-07-09)
// ---------------------------------------------------------------------------
// Real event name used per the event-demo pattern (the organizer is the pitch
// target). Every recurring feature below is publicly verified. NO 2027 date is
// published anywhere — the page says "May 2027 — dates TBA" and never invents
// one. Fees, exact schedule times, and soft-confirmed items are marked
// [confirm] and nothing is fabricated.

type SeeItem = {
  title: string;
  accent: VfAccent;
  figure: "range" | "stol" | "glacier" | "plane" | "camp" | "fjord";
  blurb: string;
  tag: string;
};

const seeItems: SeeItem[] = [
  {
    title: "The STOL competition",
    accent: "vermilion",
    figure: "stol",
    blurb:
      "The main event: shortest takeoff plus shortest landing wins. Pilots fly against the tape in weight and engine classes — the purest test of what a bush plane and a good stick can do on a short strip.",
    tag: "Signature",
  },
  {
    title: "The classes",
    accent: "steel",
    figure: "plane",
    blurb:
      "Bush, Alternate Bush, Light Sport, Light Touring, Heavy Touring, Experimental Heavy Touring, and Turbine — from stock Super Cubs to purpose-built Carbon Cubs and Bearhawks. Everyone finds their category.",
    tag: "Divisions",
  },
  {
    title: "The air show",
    accent: "alpine",
    figure: "range",
    blurb:
      "Aerobatics overhead against the Chugach, plus fly-in traditions like the balloon bust and flour bombing — the crowd-pleasers that turn a competition weekend into a show.",
    tag: "Overhead",
  },
  {
    title: "Beach landings & the Poker Run",
    accent: "gold",
    figure: "fjord",
    blurb:
      "Bush flying is about landing where there's no runway. The fly-in has long featured a Poker Run out to intertidal beaches like Hook Point — weather permitting, as the marine layer always gets a vote. [confirm current schedule]",
    tag: "Fly-out",
  },
  {
    title: "Static displays & judging",
    accent: "steel",
    figure: "camp",
    blurb:
      "Walk the line of parked aircraft, from restored classics to backcountry rigs, with static-display judging and a 'farthest traveled' award for the pilot who came the longest way to play.",
    tag: "Flight line",
  },
  {
    title: "Under the Chugach",
    accent: "ice",
    figure: "glacier",
    blurb:
      "What sets Valdez apart is the setting — a field boxed into a fjord with the Chugach and their glaciers towering just to the north. It's been called a scaled-down AirVenture with a mountain wall for a backdrop.",
    tag: "The setting",
  },
];

const gettingThere = [
  {
    n: "01",
    t: "Fly yourself in",
    d: "Plenty of the field flies in. Airport camping at Valdez Pioneer Field (PAVD) is part of the weekend — park the plane, pitch a tent, and stay for the show. Confirm the Association's current fly-in, parking, and camping details, prior permission, and any NOTAMs before you launch. [confirm]",
  },
  {
    n: "02",
    t: "Drive the Richardson",
    d: "Valdez sits at the end of the Richardson Highway, deep in a Chugach fjord — a long, spectacular drive from Glennallen and Anchorage past the Worthington Glacier and Thompson Pass. You can also arrive by Alaska Marine Highway ferry across Prince William Sound.",
  },
  {
    n: "03",
    t: "Use the live panel up top",
    d: "The 'Flying in?' panel pulls current Valdez Pioneer (PAVD) weather — ceiling, visibility, wind, and a STOL density-altitude read. In a fjord where a low marine layer can cut off late arrivals, it's a useful glance before you launch. It is never your only preflight brief.",
  },
];

const hubFaq: { q: string; a: string }[] = [
  {
    q: "When and where is the Valdez Fly-In & Air Show?",
    a: "It's held at Valdez Pioneer Field (PAVD) in Valdez, Alaska, historically in mid-May. The most recent edition ran May 9–10, 2026. The 2027 dates are not yet announced — the organizers have said to stay tuned, so treat it as \"May 2027, dates TBA\" and confirm on their official site before planning travel. [confirm]",
  },
  {
    q: "Who organizes it?",
    a: "The Valdez Fly-In Association, a volunteer-run organization based in Valdez (P.O. Box 2825, Valdez, AK 99686). The event has run since 2003 and is now often branded \"Valdez STOL.\" It bills itself as the grandfather of short-takeoff-and-landing competitions and the premier bush-plane competition in the Western U.S.",
  },
  {
    q: "What is the STOL competition?",
    a: "Short takeoff and landing: aircraft are measured on the shortest ground roll to get airborne and the shortest distance to touch down and stop, flown in weight and engine classes (Bush, Alternate Bush, Light Sport, the Touring classes, and Turbine). It's the discipline the fly-in is famous for.",
  },
  {
    q: "Can I fly in and camp?",
    a: "Flying in is central to the culture, and airport camping at Pioneer Field has traditionally been part of the weekend. Prior-permission, parking, and camping details are set each year by the Association [confirm] — confirm current fly-in procedures and any NOTAMs before you launch.",
  },
  {
    q: "How do I register or buy tickets?",
    a: "Pilot and exhibitor registration is handled through the Association's official channels each year, and spectators are welcome at the field. Check valdezflyin.com for the current year's registration links, schedule, and any admission details — this hub points you there rather than handling sign-ups itself.",
  },
  {
    q: "Is the weather data on this page real?",
    a: "Yes. The 'Flying in?' panel pulls a live observation for Valdez Pioneer Field (ICAO PAVD) from the National Weather Service API and decodes it into aviation fields, including a density-altitude read computed from the live temperature and altimeter against the field's 121 ft elevation — the number that governs a STOL takeoff roll. If the feed is unreachable it shows a clearly-labeled sample. Sunrise, sunset, and daylight are computed for Valdez. Never use it as your sole preflight brief.",
  },
];

const quickFacts = [
  { v: "May 2027", l: "When", s: "dates TBA [confirm]" },
  { v: "Pioneer Field", l: "Where", s: "Valdez (PAVD)" },
  { v: "STOL", l: "The contest", s: "shortest takeoff + landing" },
  { v: "Since 2003", l: "Running", s: "20+ years under the Chugach" },
];

export default function ValdezFlyInPage() {
  return (
    <>
      <AlpineShell>
        <main className="min-h-screen text-[#0d2a30]">
          <Nav />
          <DemoTracking demo="valdez-fly-in" />

          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2f3d] via-[#1a4a52] to-[#08202b] text-[#eef7f7]">
            {/* sectional grid + compass rose + low sun + peak wall */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <pattern id="vfi-hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M60 0H0V60" fill="none" stroke="#eef7f7" strokeWidth="0.7" />
                </pattern>
                <radialGradient id="vfi-hero-sun" cx="85%" cy="16%" r="42%">
                  <stop offset="0%" stopColor="#ffe1b4" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffe1b4" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#vfi-hero-grid)" />
              <rect width="1200" height="600" fill="url(#vfi-hero-sun)" />
              {/* compass rose */}
              <g transform="translate(980 150)" opacity="0.5">
                <circle r="70" fill="none" stroke="#eef7f7" strokeWidth="1.2" />
                <circle r="54" fill="none" stroke="#eef7f7" strokeWidth="0.6" />
                <path d="M0 -70 L7 0 L0 70 L-7 0 Z" fill="#edb24a" opacity="0.85" />
                <path d="M-70 0 L0 7 L70 0 L0 -7 Z" fill="#eef7f7" opacity="0.5" />
              </g>
              {/* Chugach wall + contrail */}
              <path d="M-50 470 L140 350 L300 440 L520 320 L720 440 L920 340 L1120 440 L1250 380 L1250 600 L-50 600 Z" fill="#08202b" opacity="0.3" />
              <path d="M-50 250 C 300 200, 700 300, 1250 230" stroke="#eef7f7" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#edb24a]/45 bg-[#08202b]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f2c98a]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e0532f]" />
                    Valdez, Alaska · Pioneer Field
                  </div>
                  <h1 className="vfi-display mb-5 max-w-2xl text-5xl font-bold leading-[1.02] sm:text-6xl">
                    The Valdez Fly-In{" "}
                    <span className="text-[#e0532f]">&amp; Air Show.</span>
                  </h1>
                  <div className="vfi-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#eef7f7]/85">
                    The grandfather of STOL competitions — bush planes flying
                    against the tape for the shortest takeoff and landing, an
                    aerobatics air show, and fly-in traditions, all under the
                    Chugach at Valdez Pioneer Field.{" "}
                    <span className="vfi-mono rounded bg-[#eef7f7]/10 px-1 py-0.5 text-[13px] text-[#f2c98a]">
                      returns May 2027 — dates TBA
                    </span>
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#see"
                      className="rounded-full bg-gradient-to-r from-[#e0532f] to-[#edb24a] px-8 py-3.5 text-center text-sm font-semibold text-[#08202b] shadow-[0_10px_30px_-10px_rgba(224,83,47,0.6)] transition-transform hover:-translate-y-0.5"
                    >
                      What to see →
                    </a>
                    <a
                      href="#getting-there"
                      className="rounded-full border border-[#eef7f7]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#eef7f7]/90 transition-colors hover:border-[#eef7f7]/70 hover:bg-[#eef7f7]/5"
                    >
                      Flying in / driving in
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — the showpiece */}
                <div className="relative">
                  <ValdezConditions />
                  <Roundel size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="vfi-card p-5">
                  <div className="vfi-display text-2xl font-bold text-[#b83c22] sm:text-3xl">
                    {stat.v}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a4a52]">
                    {stat.l}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#5d7b80]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* WHAT IT IS */}
          <section className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="vfi-card overflow-hidden p-8 sm:p-10">
              <div className="mb-8 max-w-3xl">
                <p className="vfi-eyebrow mb-3">What it is</p>
                <h2 className="vfi-display text-3xl font-bold leading-tight text-[#0d2a30] sm:text-4xl">
                  Where bush flying{" "}
                  <span className="text-[#b83c22]">keeps score.</span>
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-[#35565c]">
                  Every May, pilots point their tailwheels toward a small strip
                  at the head of a fjord and find out who can get off the ground
                  shortest and put it back down on a dime. The Valdez Fly-In &amp;
                  Air Show — now often called <span className="font-semibold text-[#0d2a30]">Valdez STOL</span> — has
                  been doing this since 2003, and it&apos;s widely called the
                  grandfather of short-takeoff-and-landing competitions. Part
                  contest, part air show, part gathering of the backcountry-flying
                  tribe — set against the Chugach and their glaciers.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { t: "The grandfather of STOL", d: "Billed as the premier bush-plane competition in the Western U.S. and the event that set the template for STOL contests everywhere." },
                  { t: "Run by volunteers", d: "Organized by the Valdez Fly-In Association, a volunteer-run organization based in Valdez — by pilots, for pilots." },
                  { t: "At Pioneer Field", d: "Held at Valdez Pioneer Field (PAVD), boxed into a Chugach fjord at the end of the Richardson Highway." },
                  { t: "20+ years on", d: "Running since 2003, through more than two decades of shortest-takeoff bragging rights." },
                ].map((v) => (
                  <div key={v.t} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#e0532f] to-[#b83c22]" aria-hidden="true" />
                    <div>
                      <h3 className="vfi-display mb-1 text-[15px] font-semibold leading-snug text-[#0d2a30]">{v.t}</h3>
                      <p className="text-[13px] leading-relaxed text-[#35565c]">{v.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT TO SEE */}
          <section id="see" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="vfi-eyebrow mb-3">On the field</p>
              <h2 className="vfi-display text-4xl font-bold text-[#0d2a30] sm:text-5xl">
                What to see at <span className="text-[#b83c22]">Valdez.</span>
              </h2>
              <div className="vfi-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#35565c]">
                The weekend runs from the shortest-takeoff tape to the air show
                overhead. Exact 2027 program and schedule are set by the
                organizers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {seeItems.map((e) => (
                <div key={e.title} className="vfi-card flex flex-col overflow-hidden">
                  <ArtTile accent={e.accent} figure={e.figure} label={e.title} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="vfi-display text-lg font-semibold leading-tight text-[#0d2a30]">{e.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#1a4a52]/20 bg-[#1a4a52]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1a4a52]">
                        {e.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#35565c]">{e.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THE STOL BAND — ties back to the density-altitude live panel */}
          <section id="stol" className="relative overflow-hidden bg-gradient-to-br from-[#0f2f3d] via-[#1a4a52] to-[#08202b] py-20 text-[#eef7f7]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <pattern id="vfi-stol-grid" width="54" height="54" patternUnits="userSpaceOnUse">
                  <path d="M54 0H0V54" fill="none" stroke="#eef7f7" strokeWidth="0.7" />
                </pattern>
              </defs>
              <rect width="1200" height="400" fill="url(#vfi-stol-grid)" />
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#7ec8d6" strokeWidth="1.2" fill="none" strokeDasharray="3 10" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <ArtTile accent="ice" figure="stol" label="Shortest takeoff, shortest landing" tall className="w-full max-w-md sm:h-[340px]" />
                </div>
                <div>
                  <p className="vfi-eyebrow mb-3 !text-[#f2c98a]">Against the tape</p>
                  <h2 className="vfi-display mb-4 text-3xl font-bold sm:text-4xl">
                    Shortest wins. <span className="text-[#e0532f]">Every foot counts.</span>
                  </h2>
                  <div className="space-y-4 text-[#eef7f7]/85">
                    <p className="leading-relaxed">
                      A STOL run is simple to explain and brutal to master: get
                      airborne in the fewest feet of ground roll, then come back
                      and stop in the fewest feet you can. Measured to the inch,
                      flown in classes from stock Super Cubs to purpose-built
                      Carbon Cubs and turbines.
                    </p>
                    <p className="leading-relaxed">
                      And the air itself sets the bar. On a cold, dense Valdez
                      morning a bush plane leaps off short; when it warms up, the
                      density altitude climbs and the same airplane needs more
                      runway. That&apos;s the very number the live panel up top
                      computes from Pioneer Field&apos;s current weather — a small
                      window into what the competitors are feeling on the strip.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* GETTING THERE */}
          <section id="getting-there" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <p className="vfi-eyebrow mb-3">Getting there</p>
              <h2 className="vfi-display text-4xl font-bold text-[#0d2a30] sm:text-5xl">
                Flying in <span className="text-[#b83c22]">or driving in.</span>
              </h2>
              <div className="vfi-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#35565c]">
                Whether you fly your own into Pioneer Field or drive the
                Richardson down to the water, here&apos;s the lay of the land.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {gettingThere.map((s) => (
                <div key={s.n} className="vfi-card p-6">
                  <div className="vfi-display mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e0532f] to-[#b83c22] text-sm font-bold text-[#08202b]">
                    {s.n}
                  </div>
                  <h3 className="vfi-display mb-2 text-lg font-semibold text-[#0d2a30]">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-[#35565c]">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-6 max-w-3xl vfi-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#5d7b80]">
                Fly-in procedures, prior-permission requirements, parking,
                camping, and NOTAMs for Valdez Pioneer Field (PAVD) are set each
                year and can change. Always confirm current details with the
                Valdez Fly-In Association and official aviation sources — and get
                a full weather briefing — before you launch. Items marked{" "}
                <span className="vfi-mono rounded bg-[#1a4a52]/8 px-1 py-0.5 text-[#b83c22]">[confirm]</span>{" "}
                are real recurring details not yet published for the coming edition.
              </p>
            </div>
          </section>

          {/* ATTEND / REGISTER */}
          <section id="attend" className="mx-auto max-w-6xl px-6 pb-8 pt-4">
            <div className="mb-10 text-center">
              <p className="vfi-eyebrow mb-3">How to take part</p>
              <h2 className="vfi-display text-4xl font-bold text-[#0d2a30] sm:text-5xl">
                Compete, exhibit, <span className="text-[#b83c22]">or spectate.</span>
              </h2>
              <div className="vfi-rule" />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                { t: "Fly the competition", d: "Pilots register for the STOL classes each year through the Association's official channels. Check valdezflyin.com for the current registration link, class rules, and pilot briefing details." },
                { t: "Exhibit or sponsor", d: "Vendors, exhibitors, and sponsors coordinate directly with the Valdez Fly-In Association. Their official site is the place to start if you'd like a booth or to support the event." },
                { t: "Come watch", d: "Spectators are welcome at the field to take in the STOL runs and the air show. Confirm this year's spectator access, dates, and any admission on the Association's official site." },
              ].map((card) => (
                <div key={card.t} className="vfi-card p-6">
                  <h3 className="vfi-display mb-2 text-lg font-semibold text-[#0d2a30]">{card.t}</h3>
                  <p className="text-sm leading-relaxed text-[#35565c]">{card.d}</p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-[#5d7b80]">
              This hub points you to the Valdez Fly-In Association for
              registration, schedule, and tickets — always confirm dates, hours,
              and any fees on their official site before planning travel.
            </p>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
            <div className="mb-10 text-center">
              <p className="vfi-eyebrow mb-3">Frequently asked</p>
              <h2 className="vfi-display text-4xl font-bold text-[#0d2a30] sm:text-5xl">
                Valdez STOL, <span className="text-[#b83c22]">answered.</span>
              </h2>
              <div className="vfi-rule" />
            </div>
            <div className="space-y-4">
              {hubFaq.map((f) => (
                <div key={f.q} className="vfi-card p-6">
                  <h3 className="vfi-display mb-2 text-base font-semibold leading-snug text-[#0d2a30]">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#35565c]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CLOSING SIGN-OFF */}
          <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#edb24a]/40 bg-gradient-to-br from-[#0f2f3d] via-[#1a4a52] to-[#08202b] p-10 text-center text-[#eef7f7] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Roundel size={88} className="mx-auto mb-6" />
              <h2 className="vfi-display mb-4 text-3xl font-bold sm:text-4xl">
                See you on the <span className="text-[#e0532f]">strip.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#eef7f7]/85">
                The Valdez Fly-In &amp; Air Show returns to Pioneer Field in May
                2027 <span className="vfi-mono text-[13px] text-[#f2c98a]">dates TBA</span>. Use
                the program above to plan your weekend, check the live panel
                before you fly or drive, and confirm this year&apos;s dates,
                registration, and schedule with the Valdez Fly-In Association.
                Fly safe — and welcome to the head of the fjord.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE — honest disclaimer */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="vfi-card px-5 py-4 text-center text-xs leading-relaxed text-[#5d7b80]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#0d2a30]">sample information hub</span>{" "}
                built by{" "}
                <a href={SITE} className="font-semibold text-[#b83c22] underline underline-offset-2 hover:text-[#cf9130]">
                  BlueWave Projects
                </a>{" "}
                on public information. All imagery is designed sample
                illustration, not photography — a real build would use the
                event&apos;s own official photography, branding, and logo. The
                &quot;Flying in?&quot; panel pulls a live observation for Valdez
                Pioneer Field (ICAO PAVD) from the National Weather Service API;
                density altitude is computed from the live temperature and
                altimeter against the field&apos;s 121 ft elevation, and sunrise,
                sunset, and daylight are computed for Valdez. If the feed is
                unreachable, the panel shows a clearly-labeled sample instead —
                never presented as live, and never a substitute for an official
                preflight brief. The event runs annually since 2003; the most
                recent edition was May 9–10, 2026. No 2027 date is shown because
                none has been published — items marked{" "}
                <span className="vfi-mono rounded bg-[#1a4a52]/8 px-1 py-0.5 text-[#b83c22]">[confirm]</span>{" "}
                are real recurring details not yet published for the coming
                edition. This page is a concept sample and is not affiliated with
                or endorsed by the Valdez Fly-In &amp; Air Show or the Valdez
                Fly-In Association. Always confirm dates, registration, and
                details on their official site before planning travel.
              </p>
            </div>
          </div>
        </main>
      </AlpineShell>
      {/* Footer OUTSIDE <AlpineShell>: the shell paints a light alpine canvas and
          the site Footer is styled for dark backgrounds — rendered here on a deep
          alpine surface it reads correctly. */}
      <div className="bg-[#08202b] text-[#eef7f7]">
        <Footer />
      </div>
    </>
  );
}
