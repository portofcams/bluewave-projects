import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { events, HUB_PATH, SITE } from "./events";
import {
  HeritageShell,
  Seal,
  PhotoPlaceholder,
  SampleNote,
  IditarodMotion,
  ticketBadge,
  accentText,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. The robots block keeps this
// proof out of bluewaveprojects.com's index so it never pollutes SEO.
export const metadata: Metadata = {
  title: "Iditarod 2027 — Dates, Events & How to Follow the Race (Sample Hub)",
  description:
    "Iditarod 2027 information headquarters — the 55th running of The Last Great Race, Anchorage to Nome. Key dates, race-week events, how to attend, and how to follow every mile from home. A sample build by BlueWave Projects on public information.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// Season-at-a-glance timeline, drawn from the same grounded event data so the
// two never drift. Order matches the race-week flow: banquet → ceremonial
// start → restart → finisher's banquet → documentary premiere.
const timelineOrder = [
  "mushers-banquet",
  "ceremonial-start",
  "restart-willow",
  "finishers-banquet-nome",
  "documentary-premiere",
] as const;

// A few real attendee/reporter questions, answered from grounded facts + the
// event data. Anything unpublished is marked [confirm], matching the rest of
// the build.
const hubFaq: { q: string; a: string }[] = [
  {
    q: "When and where does the Iditarod 2027 start?",
    a: "The 2027 race — the 55th running — begins with the Ceremonial Start on Saturday, March 6, 2027 in downtown Anchorage, followed by the Official Restart on Sunday, March 7, 2027 at Willow Lake. From there the teams run roughly 1,000 miles to the finish in Nome. Dates are from the official Iditarod calendar at iditarod.com/calendar.",
  },
  {
    q: "What's the difference between the Ceremonial Start and the Restart?",
    a: "The Ceremonial Start in Anchorage is a festive, untimed run down 4th Avenue for the crowds and the cameras. The Official Restart in Willow, about 75 miles north, is the competitive start — that's where the race clock begins and teams head out toward Nome.",
  },
  {
    q: "How long is the Iditarod and where does it finish?",
    a: "The Iditarod runs roughly 1,000 miles from Anchorage to Nome on the Bering Sea coast. It was first run in 1973 and is nicknamed The Last Great Race. The 2027 finish and Finisher's Banquet are in Nome.",
  },
  {
    q: "Can the public attend the Musher's Banquet?",
    a: "Yes. The Musher's Meet & Greet and Drawing Banquet on Thursday, March 4, 2027 at the Dena'ina Center in Anchorage is a public, ticketed event — a plated dinner with a fundraising auction, a fan autograph meet-and-greet, and the mushers' bib draw that sets the starting order.",
  },
  {
    q: "How do I get tickets to race-week events?",
    a: "Ticketed events (the Musher's Banquet, the Idita-Rider ceremonial sled seats, and the Finisher's Banquet in Nome) are sold through the Iditarod Trail Committee's official channels linked from iditarod.com. Exact 2027 prices are not yet published [confirm]. The Ceremonial Start and the Willow restart are free to spectate.",
  },
  {
    q: "How do I follow the race from home?",
    a: "The field is tracked mile by mile via GPS, with standings and checkpoint times updated throughout the run. The Iditarod Trail Committee offers a paid Insider subscription (live GPS tracker and race video), and it releases an official race documentary after the season — premiered in Anchorage and sold as a paid stream.",
  },
];

export default function IditarodHubPage() {
  return (
    // Page-local "rugged heritage" theme (Direction 3): warm cream paper canvas,
    // deep spruce ink, rust/oxblood accents, aged-gold seal, vintage slab/serif
    // display type. Everything is scoped under <HeritageShell> (.idit-heritage) —
    // no globals.css / tailwind.config / shared components touched, so the rest of
    // bluewaveprojects.com is unchanged.
    <>
    <HeritageShell>
      <main className="min-h-screen text-[#1f3d2f]">
        <Nav />

        {/* Hero — informational headquarters, spruce band over the real
            start-line photo, cream display type */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#2b4d3b] via-[#1f3d2f] to-[#152a20] text-[#F3EAD7]">
          {/* faint woodcut trail lines (aged gold / cream) */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path
              d="M-50 180 C 300 80, 600 240, 900 140 S 1300 90, 1300 180"
              stroke="#C08A2D"
              strokeWidth="60"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M0 470 C 250 440, 450 500, 700 470 S 1050 440, 1250 480"
              stroke="#F3EAD7"
              strokeWidth="1.5"
              strokeDasharray="3 10"
              fill="none"
            />
          </svg>

          {/* Subtle "alive" layer: falling flecks, aged-gold aurora shimmer, and a
              spruce sled-dog team running across the band. CSS/SVG only, scoped,
              disabled for prefers-reduced-motion. Sits above texture, below
              content. */}
          <IditarodMotion />

          <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="idit-eyebrow mb-5 inline-flex items-center gap-2 rounded-sm border border-[#C08A2D]/45 bg-[#14241c]/40 px-3 py-1.5 !text-[#e9dcbf]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C08A2D]" />
                  Iditarod 2027 · 55th running · Anchorage to Nome
                </div>
                <h1 className="idit-display mb-5 max-w-3xl text-5xl font-bold leading-[0.98] sm:text-7xl">
                  Iditarod 2027{" "}
                  <span className="text-[#e0a94a]">The Last Great Race.</span>
                </h1>
                <div className="idit-perf-rule !mx-0 mb-6" />
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#F3EAD7]/85">
                  Your headquarters for the 55th running of the Iditarod — the
                  key dates, the race-week events, how to attend in person, and
                  how to follow every one of the roughly 1,000 miles from
                  Anchorage to Nome. First run in 1973.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#schedule"
                    className="idit-display rounded-sm border-2 border-[#7d3517] bg-[#B5502A] px-8 py-3.5 text-center text-sm font-bold text-[#F3EAD7] shadow-[4px_4px_0_rgba(20,36,28,0.4)] transition-transform hover:-translate-y-0.5"
                  >
                    See the 2027 schedule →
                  </a>
                  <a
                    href="#follow"
                    className="idit-display rounded-sm border-2 border-[#F3EAD7]/35 px-8 py-3.5 text-center text-sm font-bold text-[#F3EAD7]/90 transition-colors hover:border-[#F3EAD7]/70 hover:bg-[#F3EAD7]/5"
                  >
                    How to follow along
                  </a>
                </div>
              </div>

              <div className="relative">
                <PhotoPlaceholder
                  accent="aurora"
                  tall
                  imageKey="hero"
                  label="Iditarod start line — Anchorage"
                  stub
                />
                {/* Aged-gold vintage seal overlapping the hero photo */}
                <Seal
                  size={132}
                  className="absolute -bottom-8 -left-8 hidden sm:inline-flex"
                />
              </div>
            </div>
          </div>
        </section>

      {/* Quick facts — heritage ticket-well tiles, all grounded anchors */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { v: "55th", l: "Running", s: "Est. 1973" },
            { v: "~1,000", l: "Miles", s: "Anchorage to Nome" },
            { v: "Mar 6", l: "Ceremonial start", s: "Downtown Anchorage" },
            { v: "Mar 7", l: "Official restart", s: "Willow" },
          ].map((stat) => (
            <div
              key={stat.l}
              className="rounded-sm border-2 border-[#1f3d2f]/30 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-5 shadow-[4px_4px_0_rgba(31,61,47,0.14)]"
            >
              <div className="idit-display text-4xl font-bold text-[#B5502A]">
                {stat.v}
              </div>
              <div className="idit-display mb-1 mt-2 text-xs font-semibold tracking-[0.12em] text-[#1f3d2f]">
                {stat.l}
              </div>
              <div className="text-xs leading-relaxed text-[#6b5f4a]">
                {stat.s}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Season at a glance — heritage timeline strip of the key 2027 dates */}
      <section id="schedule" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <p className="idit-eyebrow mb-3">Season at a glance</p>
          <h2 className="idit-display text-4xl font-bold text-[#1f3d2f] sm:text-5xl">
            The 2027 race week, <span className="text-[#B5502A]">start to finish.</span>
          </h2>
          <div className="idit-perf-rule" />
          <p className="mx-auto mt-4 max-w-3xl text-[#6b5f4a]">
            The dates fans plan their trip around, in order — from the banquet
            in Anchorage to the finish in Nome, plus the documentary premiere
            after the season. Dates from the official Iditarod calendar.
          </p>
        </div>

        <ol className="relative mx-auto max-w-3xl">
          {/* vertical spine (dashed perforation motif) */}
          <span
            className="pointer-events-none absolute left-[19px] top-2 bottom-2 w-px sm:left-[calc(9rem+19px)]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, #1f3d2f 0 8px, transparent 8px 14px)",
            }}
          />
          {timelineOrder.map((slug) => {
            const e = events.find((ev) => ev.slug === slug);
            if (!e) return null;
            return (
              <li
                key={e.slug}
                className="relative mb-6 flex flex-col gap-1 pl-14 sm:flex-row sm:items-baseline sm:gap-6 sm:pl-0"
              >
                {/* date rail */}
                <div className="idit-display shrink-0 text-sm font-bold text-[#B5502A] sm:w-36 sm:text-right">
                  {e.date}
                </div>
                {/* node marker */}
                <span
                  className="absolute left-[11px] top-1 h-4 w-4 rounded-full border-2 border-[#1f3d2f] bg-[#C08A2D] sm:left-[calc(9rem+11px)]"
                  aria-hidden="true"
                />
                <div className="sm:pl-8">
                  <h3 className="idit-display text-lg font-bold leading-tight text-[#1f3d2f]">
                    {e.shortName}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6b5f4a]">
                    {e.location}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* The events — informational ticket-stub cards */}
      <section id="events" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <p className="idit-eyebrow mb-3">The 2027 events</p>
          <h2 className="idit-display text-4xl font-bold text-[#1f3d2f] sm:text-5xl">
            Five moments of the season.
          </h2>
          <div className="idit-perf-rule" />
          <p className="mx-auto mt-4 max-w-3xl text-[#6b5f4a]">
            What happens at each event, who it&apos;s for, and how to take part —
            from free spectating along the trail to the ticketed banquets. Tap
            any stub for the full event details.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {events.map((e) => {
            const badge = ticketBadge[e.ticketed];
            return (
              <Link
                key={e.slug}
                href={`${HUB_PATH}/${e.slug}`}
                className="group idit-ticket flex flex-col overflow-hidden rounded-sm"
              >
                <PhotoPlaceholder
                  accent={e.accent}
                  imageKey={e.slug}
                  label={e.shortName}
                  className="idit-stub-tear rounded-none border-0"
                  stub
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="idit-display text-xl font-bold leading-tight text-[#1f3d2f]">
                        {e.shortName}
                      </h3>
                      <p className={`mt-1 text-sm font-semibold ${accentText[e.accent]}`}>
                        {e.date}
                      </p>
                    </div>
                    <span
                      className={`idit-display inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm border px-2 py-1 text-[10px] tracking-[0.12em] ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="mb-1 text-xs uppercase tracking-[0.08em] text-[#6b5f4a]">
                    {e.location}
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-[#14241c]">
                    {e.teaser}
                  </p>
                  <div className="idit-stub-foot mt-auto flex items-center justify-between pt-4">
                    <span className="idit-display text-sm font-bold text-[#B5502A] transition-colors group-hover:text-[#7d3517]">
                      Event details →
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.1em] text-[#8a7d63]">
                      {e.ticketed === "free-spectate"
                        ? "Free to spectate"
                        : "Ticket info"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Plan your visit / follow the race — practical grounded info */}
      <section id="follow" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="idit-eyebrow mb-3">Plan your visit · follow the race</p>
          <h2 className="idit-display text-4xl font-bold text-[#1f3d2f] sm:text-5xl">
            See it in person, <span className="text-[#B5502A]">or follow every mile.</span>
          </h2>
          <div className="idit-perf-rule" />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              t: "Where the action is",
              d: "Anchorage hosts the Musher's Banquet and the free Ceremonial Start down 4th Avenue. Willow, about 75 miles north, holds the Official Restart on Willow Lake. Nome, on the Bering Sea coast, is the finish line and the Finisher's Banquet.",
            },
            {
              t: "Getting there & tickets",
              d: "The Ceremonial Start and the Willow restart are free to spectate. The banquets and the Idita-Rider sled seats are ticketed through the Iditarod Trail Committee's official channels. Exact 2027 prices and on-sale dates are not yet published [confirm].",
            },
            {
              t: "Follow it from home",
              d: "You don't have to be trailside. The field is tracked mile by mile by GPS, with standings and checkpoint times through the run. The Iditarod Trail Committee's paid Insider subscription carries the live tracker and race video, and the official race documentary is released after the season.",
            },
          ].map((card) => (
            <div
              key={card.t}
              className="rounded-sm border-2 border-[#1f3d2f]/25 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-6 shadow-[4px_4px_0_rgba(31,61,47,0.12)]"
            >
              <h3 className="idit-display mb-2 text-lg font-bold text-[#1f3d2f]">
                {card.t}
              </h3>
              <p className="leading-relaxed text-[#14241c]">{card.d}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-[#6b5f4a]">
          Always confirm ticket prices, on-sale dates, and official links
          through the Iditarod Trail Committee at iditarod.com before booking
          travel. Items marked{" "}
          <span className="rounded-sm bg-[#1f3d2f]/8 px-1 py-0.5 font-mono text-[#B5502A]">
            [confirm]
          </span>{" "}
          are real recurring details not yet published for 2027.
        </p>
      </section>

      {/* FAQ — real attendee/reporter questions, grounded answers */}
      <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
        <div className="mb-10 text-center">
          <p className="idit-eyebrow mb-3">Frequently asked</p>
          <h2 className="idit-display text-4xl font-bold text-[#1f3d2f] sm:text-5xl">
            Iditarod 2027, <span className="text-[#B5502A]">answered.</span>
          </h2>
          <div className="idit-perf-rule" />
        </div>

        <div className="space-y-4">
          {hubFaq.map((f) => (
            <div
              key={f.q}
              className="rounded-sm border-2 border-[#1f3d2f]/25 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-6 shadow-[4px_4px_0_rgba(31,61,47,0.12)]"
            >
              <h3 className="idit-display mb-2 text-base font-bold leading-snug text-[#1f3d2f]">
                {f.q}
              </h3>
              <p className="leading-relaxed text-[#14241c]">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing seal band — informational sign-off, no conversion pitch */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
        <div className="relative overflow-hidden rounded-sm border-4 border-[#C08A2D]/70 bg-gradient-to-br from-[#2b4d3b] via-[#1f3d2f] to-[#152a20] p-10 text-center text-[#F3EAD7] shadow-[8px_8px_0_rgba(31,61,47,0.3)]">
          <Seal size={96} className="mx-auto mb-6" />
          <h2 className="idit-display mb-4 text-3xl font-bold sm:text-4xl">
            Anchorage to Nome,{" "}
            <span className="text-[#e0a94a]">roughly 1,000 miles.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-[#F3EAD7]/85">
            The 55th running of The Last Great Race gets underway in Anchorage in
            March 2027. Use the schedule above to plan a trip, or follow the run
            mile by mile from wherever you are.
          </p>
        </div>
      </section>

      <SampleNote />
      </main>
    </HeritageShell>
    <div className="bg-[#152a20] text-[#F3EAD7]">
      <Footer />
    </div>
    </>
  );
}
