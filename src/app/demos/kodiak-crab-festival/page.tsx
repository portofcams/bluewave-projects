import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  FestShell,
  Emblem,
  PhotoPlaceholder,
  FestConditions,
  SITE,
  HUB_PATH,
  type FestAccent,
  type PhotoSrc,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders so the proof
// never pollutes bluewaveprojects.com's index.
export const metadata: Metadata = {
  title: "Kodiak Crab Festival 2026 — Schedule, Parade & Live Conditions (Sample)",
  description:
    "A community information-hub sample for the Kodiak Crab Festival — Memorial Day weekend, May 21-25, 2026, in Kodiak, Alaska. Real daily hours, the Grand Parade, Blessing of the Fleet, Norm Holm Survival Suit Race, carnival lineup, and a live Kodiak Airport conditions panel. A sample build by BlueWave Projects on publicly verified information.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED FESTIVAL DATA
// ---------------------------------------------------------------------------
// Every figure below is from the brief's verified facts (fetched directly
// from kodiakcrabfest.com and kodiak.org, 2026-07-03). Anything not confirmed
// there is marked "[confirm]" and nothing is invented.

const OFFICIAL_SITE = "https://www.kodiakcrabfest.com";

type ScheduleDay = {
  day: string;
  date: string;
  hours: string;
  note?: string;
};

const schedule: ScheduleDay[] = [
  { day: "Thursday", date: "May 21", hours: "Noon – 8 PM" },
  { day: "Friday", date: "May 22", hours: "10 AM – 8 PM" },
  { day: "Saturday", date: "May 23", hours: "11 AM – 8 PM", note: "Grand Parade, 10 AM" },
  { day: "Sunday", date: "May 24", hours: "10 AM – 8 PM" },
  { day: "Monday", date: "May 25", hours: "10 AM – 4 PM", note: "Memorial Day" },
];

type HeadlineEvent = {
  title: string;
  accent: FestAccent;
  figure: "boat" | "crab" | "parade" | "carnival" | "suit";
  when: string;
  blurb: string;
  photo?: PhotoSrc;
};

const headlineEvents: HeadlineEvent[] = [
  {
    title: "Grand Parade",
    accent: "flag",
    figure: "parade",
    when: "Saturday, May 23 · 10 AM",
    blurb:
      "The festival's signature procession runs down Mill Bay Road between Powell and Bartel Street — floats, fishing-fleet pride, and the whole community turning out for Kodiak's biggest weekend of the year.",
    photo: {
      src: "/demos/kodiak-crab-festival/kodiak-downtown.webp",
      credit: "James Brooks · CC BY 2.0",
      position: "center 55%",
    },
  },
  {
    title: "Blessing of the Fleet",
    accent: "teal",
    figure: "boat",
    when: "During festival weekend",
    blurb:
      "A traditional maritime blessing open to all vessels — a service is sung, then an Orthodox priest sprinkles each passing vessel with holy water. A quiet, deeply-rooted counterpoint to the carnival energy elsewhere on the grounds. [confirm exact day/time]",
    photo: {
      src: "/demos/kodiak-crab-festival/blessing-fleet.webp",
      credit: "James Brooks · CC BY 2.0 (Blessing of the Fleet, Port of Juneau — used as a generic stand-in; see CREDITS.md)",
      position: "center 40%",
    },
  },
  {
    title: "Norm Holm Survival Suit Race",
    accent: "gold",
    figure: "suit",
    when: "During festival weekend",
    blurb:
      "Racers sprint down the dock, wrestle into full survival suits, then swim through the harbor into a life raft — equal parts serious safety drill and the funniest thing you'll see on the water all year. [confirm exact day/time]",
    // No fitting license-clean photo found for the suit race specifically — SVG art.
  },
];

type CarnivalItem = {
  title: string;
  blurb: string;
};

const carnivalItems: CarnivalItem[] = [
  {
    title: "509 Jumpers LLC",
    blurb: "Inflatable slides, bounce houses, and obstacle courses running all five festival days.",
  },
  {
    title: "Climbing Elevation Rock Wall",
    blurb: "A rock-climbing wall for festival-goers looking to test their grip between events.",
  },
  {
    title: "Hamster Balls",
    blurb: "Run by Kodiak Christian School — inflatable water-walking balls, a kid (and adult) favorite.",
  },
  {
    title: "Gelly Ball Arena",
    blurb: "A gel-ball battle arena set up on the festival grounds.",
  },
  {
    title: "Bungee Bounce",
    blurb: "The classic bungee-tethered trampoline bounce.",
  },
  {
    title: "Kodiak Lions Club Sawdust Pile",
    blurb: "A community-run sawdust-pile dig for prizes — a Kodiak Crab Festival staple, hosted by the Lions Club.",
  },
  {
    title: "Kiwanis Nail Benders",
    blurb: "The Kiwanis Club's nail-driving contest — a festival classic test of hammer skill.",
  },
];

// Grounded FAQ. Anything not publicly confirmed is marked [confirm].
const hubFaq: { q: string; a: string }[] = [
  {
    q: "When is the Kodiak Crab Festival in 2026?",
    a: "May 21–25, 2026 — Memorial Day weekend — in Kodiak, Alaska. The 2026 theme is \"You, Me, & the Sea.\"",
  },
  {
    q: "What are the daily hours?",
    a: "Thursday May 21: noon–8 PM. Friday May 22: 10 AM–8 PM. Saturday May 23: 11 AM–8 PM. Sunday May 24: 10 AM–8 PM. Monday May 25 (Memorial Day): 10 AM–4 PM.",
  },
  {
    q: "What's the one event I shouldn't miss?",
    a: "The Grand Parade, Saturday May 23 at 10 AM, down Mill Bay Road between Powell and Bartel Street — the festival's signature community event, right as the weekend hits full swing.",
  },
  {
    q: "What is the Blessing of the Fleet?",
    a: "A traditional maritime blessing open to all vessels: a service is sung, then an Orthodox priest sprinkles each passing boat with holy water. It reflects Kodiak's deep Russian Orthodox and commercial-fishing heritage. [confirm exact day/time within festival weekend]",
  },
  {
    q: "What is the Norm Holm Survival Suit Race?",
    a: "Racers sprint down the dock, put on full survival (\"gumby\") suits, then swim through the harbor into a life raft. It's a festival highlight — equal parts safety demonstration and community entertainment. [confirm exact day/time within festival weekend]",
  },
  {
    q: "What's there for kids and carnival-goers?",
    a: "509 Jumpers LLC runs inflatable slides, bounce houses, and obstacle courses all five days, alongside the Climbing Elevation Rock Wall, Hamster Balls (Kodiak Christian School), Gelly Ball Arena, Bungee Bounce, the Kodiak Lions Club Sawdust Pile, and the Kiwanis Nail Benders.",
  },
  {
    q: "Where do I get tickets, or sign up to vend or volunteer?",
    a: "Kodiak Crab Festival doesn't publish a single ticketing/vendor/volunteer contact in this brief — the official site, kodiakcrabfest.com, is the source for current tickets, vendor applications, and volunteer sign-ups. This page is an informational sample, not a booking or ticketing tool.",
  },
];

export default function KodiakCrabFestivalPage() {
  return (
    // Page-local "harbor-blue / carnival-flag" theme: cool sea-foam canvas,
    // deep harbor-teal ink, carnival red-orange + buoy-gold accents, condensed
    // Oswald display type for a harbor-signage/regatta-pennant feel.
    // Everything scoped under <FestShell> (.kcf-fest) — no globals.css /
    // tailwind.config / shared components touched, so the rest of
    // bluewaveprojects.com is unchanged. The site Footer is rendered AFTER
    // </FestShell> on its own dark surface so its light-on-dark text stays
    // legible (inside the shell it washed out).
    <>
      <FestShell>
        <main className="min-h-screen text-[#0d2530]">
          <Nav />

          {/* HERO — festival info-hub hero over a real Coast Guard photo taken
              AT the actual Kodiak Crab Fest, live conditions panel prominent. */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2d3d] via-[#0f4a58] to-[#061c26] text-[#f4f8f7]">
            {/* real hero background photo (license-clean; see CREDITS.md) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/kodiak-crab-festival/hero-sar.webp"
              alt="A U.S. Coast Guard helicopter flies a search-and-rescue demonstration over St. Paul Harbor during Kodiak's Crab Fest — sample hero photo"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 62%" }}
            />
            {/* deep harbor-blue scrim over the photo — keeps text fully legible */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0b2d3d]/92 via-[#0f4a58]/84 to-[#061c26]/94" />
            <div className="pointer-events-none absolute inset-0 bg-[#061c26]/25" />
            {/* on-image hero credit */}
            <span className="absolute right-3 top-20 z-10 rounded-full bg-[#061c26]/50 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#f4f8f7]/70 backdrop-blur-sm">
              USCG Search & Rescue demo, Kodiak Crab Fest 2011 · Public domain
            </span>
            {/* harbor-swell texture + low sun */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="hero-sun" cx="84%" cy="18%" r="42%">
                  <stop offset="0%" stopColor="#ffdca0" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffdca0" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#hero-sun)" />
              <path d="M-50 460 C 300 400, 700 500, 1250 440" stroke="#f4f8f7" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
              <path d="M-50 500 C 300 450, 700 540, 1250 480" stroke="#f4f8f7" strokeWidth="1" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f2a93c]/45 bg-[#061c26]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f7c979]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f2a93c]" />
                    Kodiak, Alaska · Memorial Day Weekend
                  </div>
                  <h1 className="kcf-display mb-5 max-w-2xl text-5xl font-bold leading-[1.03] sm:text-6xl">
                    Kodiak Crab Festival.{" "}
                    <span className="text-[#f2a93c]">You, Me, &amp; the Sea.</span>
                  </h1>
                  <div className="kcf-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#f4f8f7]/85">
                    May 21–25, 2026 — five days celebrating Alaska&apos;s
                    premier commercial fishing port and its fleet: a Grand
                    Parade down Mill Bay Road, the Blessing of the Fleet, the
                    Norm Holm Survival Suit Race, and a full carnival midway,
                    all built around the community that keeps Kodiak&apos;s
                    boats on the water.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#schedule"
                      className="rounded-full bg-gradient-to-r from-[#f2a93c] to-[#c9821f] px-8 py-3.5 text-center text-sm font-semibold text-[#061c26] shadow-[0_10px_30px_-10px_rgba(242,169,60,0.7)] transition-transform hover:-translate-y-0.5"
                    >
                      See the full schedule →
                    </a>
                    <a
                      href="#plan"
                      className="rounded-full border border-[#f4f8f7]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f4f8f7]/90 transition-colors hover:border-[#f4f8f7]/70 hover:bg-[#f4f8f7]/5"
                    >
                      Plan your visit
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — the showpiece, prominent in the hero */}
                <div className="relative">
                  <FestConditions />
                  <Emblem size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS — grounded anchors */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { v: "May 21–25", l: "2026 dates", s: "Memorial Day weekend" },
                { v: "5 days", l: "Festival run", s: "Thu through Mon" },
                { v: "Sat 10 AM", l: "Grand Parade", s: "Mill Bay Road" },
                { v: "Alaska's #1 port", l: "Kodiak", s: "Premier commercial fishing" },
              ].map((stat) => (
                <div key={stat.l} className="kcf-card p-5">
                  <div className="kcf-display text-2xl font-bold text-[#e2542a] sm:text-3xl">
                    {stat.v}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1c5266]">
                    {stat.l}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#5f7d85]">
                    {stat.s}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WHAT IT IS — Memorial Day weekend, fishing-community roots */}
          <section id="story" className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="kcf-card overflow-hidden p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="kcf-eyebrow mb-3">A working harbor&apos;s biggest weekend</p>
                  <h2 className="kcf-display text-3xl font-bold leading-tight text-[#0d2530] sm:text-4xl">
                    Built around the fleet,{" "}
                    <span className="text-[#e2542a]">timed to Memorial Day.</span>
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3c5c66]">
                    <p>
                      Kodiak is Alaska&apos;s premier commercial fishing port
                      — a working harbor town whose economy and identity run
                      on the boats that come and go from St. Paul Harbor. The
                      Crab Festival is the community&apos;s way of marking the
                      start of the season and honoring the fleet, timed every
                      year to Memorial Day weekend.
                    </p>
                    <p>
                      2026&apos;s theme, &quot;You, Me, &amp; the Sea,&quot;
                      runs May 21 through May 25 — five days that mix a
                      genuine maritime tradition (the Blessing of the Fleet,
                      the Grand Parade) with a full carnival midway built for
                      families, all across downtown Kodiak and the harbor
                      it&apos;s named for.
                    </p>
                  </div>
                </div>
                <PhotoPlaceholder
                  accent="teal"
                  figure="boat"
                  label="Kodiak's commercial fishing fleet"
                  tall
                  photo={{
                    src: "/demos/kodiak-crab-festival/kodiak-fleet.webp",
                    credit: "Joseph (\"umnak\") · CC BY-SA 2.0",
                    position: "center 50%",
                  }}
                />
              </div>
            </div>
          </section>

          {/* SCHEDULE — real daily hours */}
          <section id="schedule" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="kcf-eyebrow mb-3">May 21–25, 2026</p>
              <h2 className="kcf-display text-4xl font-bold text-[#0d2530] sm:text-5xl">
                The <span className="text-[#e2542a]">schedule.</span>
              </h2>
              <div className="kcf-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3c5c66]">
                Five days, five sets of hours — mark your calendar, and don&apos;t
                miss the Grand Parade Saturday morning.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {schedule.map((s) => (
                <div key={s.day} className="kcf-card p-6">
                  <div className="kcf-eyebrow mb-1 !text-[#1c5266]">{s.date}</div>
                  <h3 className="kcf-display text-xl font-semibold text-[#0d2530]">
                    {s.day}
                  </h3>
                  <div className="mt-3 text-sm font-semibold text-[#e2542a]">
                    {s.hours}
                  </div>
                  {s.note && (
                    <div className="mt-2 inline-flex items-center rounded-full border border-[#f2a93c]/40 bg-[#f2a93c]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c9821f]">
                      {s.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* HEADLINE EVENTS — Parade, Blessing, Survival Suit Race */}
          <section id="headline-events" className="relative overflow-hidden bg-gradient-to-br from-[#0b2d3d] via-[#0f4a58] to-[#061c26] py-20 text-[#f4f8f7]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#8fc4cf" strokeWidth="1.2" fill="none" strokeDasharray="3 10" />
              <path d="M-50 280 C 300 250, 700 310, 1250 260" stroke="#8fc4cf" strokeWidth="0.8" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>
            <div className="relative mx-auto max-w-6xl px-6">
              <div className="mb-12 text-center">
                <p className="kcf-eyebrow mb-3 !text-[#f7c979]">The must-sees</p>
                <h2 className="kcf-display text-4xl font-bold sm:text-5xl">
                  Headline <span className="text-[#f2a93c]">events.</span>
                </h2>
                <div className="kcf-rule" />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {headlineEvents.map((e) => (
                  <div key={e.title} className="overflow-hidden rounded-2xl border border-[#f4f8f7]/12 bg-[#061c26]/40">
                    <PhotoPlaceholder
                      accent={e.accent}
                      figure={e.figure}
                      label={e.title}
                      photo={e.photo}
                      className="rounded-b-none border-0"
                    />
                    <div className="p-5">
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f2a93c]">
                        {e.when}
                      </div>
                      <h3 className="kcf-display mb-2 text-lg font-semibold leading-tight text-[#f4f8f7]">
                        {e.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#f4f8f7]/75">{e.blurb}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ENTERTAINMENT / CARNIVAL */}
          <section id="carnival" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="kcf-eyebrow mb-3">All five days</p>
              <h2 className="kcf-display text-4xl font-bold text-[#0d2530] sm:text-5xl">
                Carnival &amp; <span className="text-[#e2542a]">entertainment.</span>
              </h2>
              <div className="kcf-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3c5c66]">
                Beyond the boats and the parade — a full midway of rides,
                games, and community-club classics.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {carnivalItems.map((c) => (
                <div key={c.title} className="kcf-card flex flex-col overflow-hidden">
                  <PhotoPlaceholder
                    accent="gold"
                    figure="carnival"
                    label={c.title}
                    className="rounded-b-none border-0"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="kcf-display mb-2 text-lg font-semibold leading-tight text-[#0d2530]">
                      {c.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#3c5c66]">{c.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PLAN YOUR VISIT — Kodiak logistics, live weather panel referenced */}
          <section id="plan" className="relative overflow-hidden bg-gradient-to-br from-[#0b2d3d] via-[#0f4a58] to-[#061c26] py-20 text-[#f4f8f7]">
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <PhotoPlaceholder
                    accent="flag"
                    figure="boat"
                    label="A working harbor town"
                    tall
                    photo={{
                      src: "/demos/kodiak-crab-festival/fishing-boat.webp",
                      credit: "James Brooks · CC BY 2.0",
                      position: "center 50%",
                    }}
                    className="w-full max-w-md sm:h-[340px]"
                  />
                </div>
                <div>
                  <p className="kcf-eyebrow mb-3 !text-[#f7c979]">Getting there</p>
                  <h2 className="kcf-display mb-4 text-3xl font-bold sm:text-4xl">
                    Plan your <span className="text-[#f2a93c]">visit.</span>
                  </h2>
                  <div className="space-y-4 text-[#f4f8f7]/85">
                    <p className="leading-relaxed">
                      Kodiak sits on Kodiak Island, reached by air or the
                      Alaska Marine Highway ferry system — late May is early
                      season in Alaska, so pack layers no matter how the
                      forecast looks the morning you leave. [confirm current
                      travel/ferry schedule directly before booking]
                    </p>
                    <p className="leading-relaxed">
                      The live panel up top pulls current conditions from
                      Kodiak Airport (PADQ) — useful for sizing up what to
                      wear or bring each festival day. The festival&apos;s own
                      organizers and the Coast Guard make the real calls on
                      any weather-sensitive event, like the Blessing of the
                      Fleet or the Survival Suit Race.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-16">
            <div className="mb-10 text-center">
              <p className="kcf-eyebrow mb-3">Frequently asked</p>
              <h2 className="kcf-display text-4xl font-bold text-[#0d2530] sm:text-5xl">
                Planning your <span className="text-[#e2542a]">weekend.</span>
              </h2>
              <div className="kcf-rule" />
            </div>

            <div className="space-y-4">
              {hubFaq.map((f) => (
                <div key={f.q} className="kcf-card p-6">
                  <h3 className="kcf-display mb-2 text-base font-semibold leading-snug text-[#0d2530]">
                    {f.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3c5c66]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INFO-HUB SIGN-OFF — honest: no fake checkout, points to the
              festival's real official site for tickets/vendor/volunteer info. */}
          <section id="official" className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#f2a93c]/40 bg-gradient-to-br from-[#0b2d3d] via-[#0f4a58] to-[#061c26] p-10 text-center text-[#f4f8f7] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="kcf-display mb-4 text-3xl font-bold sm:text-4xl">
                For tickets, vendor &amp; volunteer info —{" "}
                <span className="text-[#f2a93c]">the official site.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#f4f8f7]/85">
                This page is a community information hub, not a ticketing or
                booking tool. For current tickets, vendor applications,
                volunteer sign-ups, and any 2026 schedule updates, go straight
                to the Kodiak Crab Festival&apos;s own official site.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={OFFICIAL_SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gradient-to-r from-[#f2a93c] to-[#c9821f] px-8 py-3.5 text-center text-sm font-semibold text-[#061c26] shadow-[0_10px_30px_-10px_rgba(242,169,60,0.7)] transition-transform hover:-translate-y-0.5"
                >
                  Visit kodiakcrabfest.com →
                </a>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#f4f8f7]/50">
                This is a sample information hub, not the festival&apos;s real
                site — the actual Kodiak Crab Festival handles all tickets,
                vendor, and volunteer inquiries directly.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE — honest disclaimer */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="kcf-card px-5 py-4 text-center text-xs leading-relaxed text-[#5f7d85]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#0d2530]">
                  sample community information hub
                </span>{" "}
                built by{" "}
                <a
                  href={SITE}
                  className="font-semibold text-[#e2542a] underline underline-offset-2 hover:text-[#c9821f]"
                >
                  BlueWave Projects
                </a>{" "}
                on publicly verified information — it is{" "}
                <span className="font-semibold text-[#0d2530]">
                  not affiliated with or endorsed by the Kodiak Crab Festival
                </span>{" "}
                or the City of Kodiak. Photos are{" "}
                <span className="font-semibold text-[#0d2530]">
                  license-clean sample imagery
                </span>{" "}
                from Wikimedia Commons — the final build would use the
                festival&apos;s own official photography, branding, and logo.
                The hero photo (a Coast Guard search-and-rescue demonstration
                over St. Paul Harbor, May 28, 2011) was taken at the actual
                Kodiak Crab Festival and is U.S. government public-domain
                work by Petty Officer 3rd Class Charly Hengen. The fishing
                fleet, harbor, fishing-boat, and downtown Kodiak photos are
                genuine Kodiak, Alaska scenes by Joseph (&quot;umnak&quot;,
                CC BY-SA 2.0) and James Brooks (CC BY 2.0), used as general
                place and industry imagery. The Blessing of the Fleet photo
                depicts the same maritime tradition at the Port of
                Juneau&apos;s own ceremony (James Brooks, CC BY 2.0) — used
                honestly as a generic stand-in, not represented as Kodiak&apos;s
                event. The king-crab-pots photo is public-domain NOAA
                fisheries imagery. Full credits in{" "}
                <span className="kcf-mono rounded bg-[#1c5266]/8 px-1 py-0.5 text-[#e2542a]">
                  /demos/kodiak-crab-festival/CREDITS.md
                </span>
                . The Grand Parade tile reuses the downtown Kodiak photo as a
                place stand-in; the Survival Suit Race and carnival-attraction
                tiles keep designed illustration art — no fitting licensed
                photo was found for those specific activities. The
                &quot;Kodiak, right now&quot; panel attempts a live
                observation for Kodiak Airport (ICAO PADQ) from the National
                Weather Service API; if the browser can&apos;t read it, it
                shows a clearly-labeled sample instead. Sunrise, sunset, and
                daylight hours are computed for Kodiak&apos;s coordinates. All
                2026 dates, daily hours, the Grand Parade route and time, and
                the carnival/entertainment lineup above were verified
                directly from kodiakcrabfest.com and kodiak.org on
                2026-07-03. Items marked{" "}
                <span className="kcf-mono rounded bg-[#1c5266]/8 px-1 py-0.5 text-[#e2542a]">
                  [confirm]
                </span>{" "}
                are real details not fully specified in those sources. Always
                confirm current schedule, tickets, and event times directly
                with the Kodiak Crab Festival before making travel plans.
              </p>
            </div>
          </div>
        </main>
      </FestShell>
      {/* Footer lives OUTSIDE <FestShell>: the shell paints a light sea-foam
          canvas, and the site Footer is styled for dark backgrounds (white-
          alpha text with no background of its own) — inside the shell its
          text washed out. Rendered here on a deep harbor-blue surface it
          reads correctly, matching the palette. */}
      <div className="bg-[#061c26] text-[#f4f8f7]">
        <Footer />
      </div>
    </>
  );
}
