import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  events,
  deepEvents,
  ticketSystems,
  HUB_PATH,
  SITE,
} from "./events";
import {
  CarnivalShell,
  Seal,
  PhotoPlaceholder,
  SampleNote,
  RondyMotion,
  ticketBadge,
  accentText,
} from "./_shared";
import ScheduleExplorer, { type ScheduleRow } from "./schedule";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. The robots block keeps this
// proof out of bluewaveprojects.com's index so it never pollutes SEO.
export const metadata: Metadata = {
  title:
    "Fur Rondy 2027 — Full Schedule, Tickets & Festival Guide (Sample Hub)",
  description:
    "Fur Rendezvous 2027 information headquarters — Anchorage's midwinter carnival since 1935. The full official event slate in one filterable schedule, the featured events explained, and how tickets work today. A sample build by BlueWave Projects on public information.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// Real attendee questions, answered from grounded facts + the event data.
// Anything unpublished is marked [confirm], matching the rest of the build.
const hubFaq: { q: string; a: string }[] = [
  {
    q: "When is Fur Rondy 2027?",
    a: "The 2027 festival window is Thursday, February 25 through Sunday, March 7, 2027, as published by Visit Anchorage. The official day-by-day calendar from Greater Anchorage, Inc. hadn't posted yet when this hub was built — individual event dates shown here are mapped to each event's traditional slot and marked [confirm].",
  },
  {
    q: "What is Fur Rondy, exactly?",
    a: "Fur Rendezvous — 'Rondy' — is Anchorage's citywide winter festival, running since 1935. It began as a mid-winter gathering where trappers brought furs to market (the fur auction still runs on 3rd Avenue), and grew into eleven days of sled dog world championships, a downtown carnival, the Running of the Reindeer, parades, fireworks, and dozens of official events.",
  },
  {
    q: "How much of the festival is free?",
    a: "Most of it. The sled dog races, Grand Parade, Outhouse Races, fireworks, blanket toss, snow sculptures, and the Native arts market are all free. A handful of marquee events are ticketed or need registration — the Running of the Reindeer, the Music Fest shows, the Melodrama, the kickoff party, and the tournament brackets.",
  },
  {
    q: "Where do I buy tickets?",
    a: "Today, it depends on the event — tickets and registrations are spread across roughly ten different systems (Eventbrite, CenterTix, MyAlaskaTix, RunSignup, and more). Each event page on this hub notes where its tickets actually live. Always start from the official links at furrondy.net.",
  },
  {
    q: "What's the one day not to miss?",
    a: "The final Saturday — March 6, 2027. The Iditarod's Ceremonial Start runs down 4th Avenue that morning, the Running of the Reindeer takes the same street in the late afternoon, and the Rondy Music Fest fills the Egan Center that night [confirm]. It's the biggest single day on Alaska's winter calendar.",
  },
  {
    q: "How cold is it going to be?",
    a: "Anchorage in late February and early March typically runs in the 20s°F by day — genuinely pleasant winter-festival weather by Alaska standards. Dress in real layers, especially for standing events like the parade, the fireworks, and the fence line at the reindeer run.",
  },
];

export default function RondyHubPage() {
  // Serializable rows for the client-side schedule explorer. Deep events link
  // to their landing pages; the Iditarod Ceremonial Start cross-links to its
  // page on the sibling Iditarod 2027 sample hub.
  const rows: ScheduleRow[] = events.map((e) => ({
    slug: e.slug,
    shortName: e.shortName,
    date: e.date,
    sortKey: e.sortKey,
    venue: e.venue,
    category: e.category,
    ticketed: e.ticketed,
    ticketVia: e.ticketVia,
    teaser: e.teaser,
    href: e.deep
      ? `${HUB_PATH}/${e.slug}`
      : e.slug === "iditarod-ceremonial-start"
        ? "/demos/iditarod-2027/ceremonial-start"
        : undefined,
    sourceUrl: e.sourceUrl,
  }));

  return (
    // Page-local "midwinter carnival" theme: night-sky navy canvas, aurora
    // green/violet ribbons, warm string-light gold, carnival-poster slab
    // display type. Everything is scoped under <CarnivalShell>
    // (.rondy-carnival) — no globals.css / tailwind.config / shared components
    // touched, so the rest of bluewaveprojects.com is unchanged.
    <CarnivalShell>
      <main className="min-h-screen text-[#eef2ff]">
        <Nav />

        {/* Hero — the festival's front door: night band, aurora, turning
            Ferris wheel, snow. */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0e1536] via-[#0c1230] to-[#070b1e]">
          <RondyMotion />

          <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="rondy-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-[#ffc65c]/40 bg-[#070b1e]/50 px-4 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffc65c]" />
                  Fur Rendezvous · Anchorage · Est. 1935
                </div>
                <h1 className="rondy-display mb-5 max-w-3xl text-5xl leading-[1.02] sm:text-6xl">
                  Fur Rondy 2027{" "}
                  <span className="text-[#3ddc97]">
                    Anchorage&apos;s midwinter carnival.
                  </span>
                </h1>
                <div className="rondy-rule !mx-0 mb-6" />
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#c9d2f2]">
                  Eleven days, twenty-five-plus official events, one downtown:
                  world championship sled dog racing, a carnival that laughs at
                  February, racing outhouses, fireworks in the winter dark —
                  and a herd of reindeer with the right of way on 4th Avenue.
                  February 25 – March 7, 2027.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#schedule"
                    className="rondy-cond rounded-lg border border-[#d99a2b] bg-[#ffc65c] px-8 py-3.5 text-center text-sm font-bold text-[#070b1e] shadow-[0_8px_24px_rgba(255,198,92,0.25)] transition-transform hover:-translate-y-0.5"
                  >
                    Browse all events →
                  </a>
                  <a
                    href="#featured"
                    className="rondy-cond rounded-lg border border-[#eef2ff]/30 px-8 py-3.5 text-center text-sm font-bold text-[#eef2ff]/90 transition-colors hover:border-[#3ddc97]/60 hover:bg-[#3ddc97]/5"
                  >
                    The headliners
                  </a>
                </div>
              </div>

              <div className="relative">
                <PhotoPlaceholder
                  accent="midnight"
                  tall
                  imageKey="hero"
                  label="Fur Rondy — downtown Anchorage"
                />
                <Seal
                  size={132}
                  className="absolute -bottom-8 -left-8 hidden sm:inline-flex"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick facts — booth tiles, all grounded anchors */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { v: "1935", l: "Running since", s: "Started as a fur market" },
              { v: "11", l: "Festival days", s: "Feb 25 – Mar 7, 2027" },
              { v: "25+", l: "Official events", s: "Plus Rondy Around Town" },
              { v: "Mar 6", l: "The big Saturday", s: "Reindeer, Iditarod & Music Fest" },
            ].map((stat) => (
              <div key={stat.l} className="rondy-booth rondy-string p-5">
                <div className="rondy-display text-4xl text-[#ffc65c]">
                  {stat.v}
                </div>
                <div className="rondy-cond mb-1 mt-2 text-xs font-semibold tracking-[0.12em] text-[#eef2ff]">
                  {stat.l}
                </div>
                <div className="text-xs leading-relaxed text-[#aab4d8]">
                  {stat.s}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured events — the six headliners with landing pages */}
        <section id="featured" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <p className="rondy-eyebrow mb-3">The headliners</p>
            <h2 className="rondy-display text-4xl text-[#eef2ff] sm:text-5xl">
              Six events worth{" "}
              <span className="text-[#3ddc97]">planning a trip around.</span>
            </h2>
            <div className="rondy-rule" />
            <p className="mx-auto mt-4 max-w-3xl text-[#aab4d8]">
              What happens at each one, who it&apos;s for, and how tickets
              actually work — from the free spectacles to the shows that sell
              out. Tap any card for the full guide.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {deepEvents.map((e) => {
              const badge = ticketBadge[e.ticketed];
              return (
                <Link
                  key={e.slug}
                  href={`${HUB_PATH}/${e.slug}`}
                  className="group rondy-booth rondy-string flex flex-col overflow-hidden"
                >
                  <PhotoPlaceholder
                    accent={e.accent}
                    imageKey={e.slug}
                    label={e.shortName}
                    className="rounded-b-none rounded-t-[13px] border-0"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="rondy-cond text-xl font-semibold leading-tight text-[#eef2ff]">
                          {e.shortName}
                        </h3>
                        <p
                          className={`mt-1 text-sm font-semibold ${accentText[e.accent]}`}
                        >
                          {e.date}
                        </p>
                      </div>
                      <span
                        className={`rondy-cond inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-1 text-[10px] tracking-[0.12em] ${badge.cls}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="mb-1 text-xs uppercase tracking-[0.08em] text-[#8992b8]">
                      {e.venue}
                    </p>
                    <p className="mb-4 text-sm leading-relaxed text-[#c9d2f2]">
                      {e.teaser}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-[#26305c] pt-4">
                      <span className="rondy-cond text-sm font-bold text-[#ffc65c] transition-colors group-hover:text-[#3ddc97]">
                        Full guide →
                      </span>
                      {e.ticketVia && (
                        <span className="text-[11px] uppercase tracking-[0.1em] text-[#8992b8]">
                          Tickets via {e.ticketVia}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Full schedule — the hub's thesis: every official event, one door */}
        <section id="schedule" className="mx-auto max-w-4xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="rondy-eyebrow mb-3">The full slate</p>
            <h2 className="rondy-display text-4xl text-[#eef2ff] sm:text-5xl">
              Every official event, <span className="text-[#3ddc97]">one schedule.</span>
            </h2>
            <div className="rondy-rule" />
            <p className="mx-auto mt-4 max-w-3xl text-[#aab4d8]">
              Filter by what you&apos;re into or by what needs a ticket. Today,
              tickets and sign-ups for these events are spread across{" "}
              <span className="font-semibold text-[#eef2ff]">
                {ticketSystems.length}+ different systems
              </span>{" "}
              — each row notes where its tickets actually live.
            </p>
          </div>

          <ScheduleExplorer rows={rows} />
        </section>

        {/* The big final Saturday — March 6 spotlight + sibling-demo crosslink */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rondy-booth rondy-string relative overflow-hidden p-8 sm:p-10">
            <p className="rondy-eyebrow mb-3">Saturday, March 6, 2027</p>
            <h2 className="rondy-display mb-4 text-3xl text-[#eef2ff] sm:text-4xl">
              One street. <span className="text-[#ffc65c]">Three spectacles.</span>
            </h2>
            <p className="mb-6 max-w-3xl leading-relaxed text-[#c9d2f2]">
              Rondy&apos;s final Saturday is the biggest day of the Alaska
              winter. The Iditarod&apos;s Ceremonial Start runs down 4th Avenue
              in the morning, the Running of the Reindeer takes the same blocks
              in the late afternoon, and the Music Fest fills the Egan Center
              into the night [confirm]. Two festivals, six downtown blocks, one
              unforgettable day.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`${HUB_PATH}/running-of-the-reindeer`}
                className="rondy-cond rounded-lg border border-[#d99a2b] bg-[#ffc65c] px-6 py-3 text-center text-sm font-bold text-[#070b1e] transition-transform hover:-translate-y-0.5"
              >
                Running of the Reindeer →
              </Link>
              <Link
                href="/demos/iditarod-2027/ceremonial-start"
                className="rondy-cond rounded-lg border border-[#eef2ff]/30 px-6 py-3 text-center text-sm font-bold text-[#eef2ff]/90 transition-colors hover:border-[#3ddc97]/60 hover:bg-[#3ddc97]/5"
              >
                Iditarod Ceremonial Start guide →
              </Link>
            </div>
          </div>
        </section>

        {/* Plan your visit — practical grounded info */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="rondy-eyebrow mb-3">Plan your Rondy</p>
            <h2 className="rondy-display text-4xl text-[#eef2ff] sm:text-5xl">
              Eleven days, <span className="text-[#3ddc97]">your way.</span>
            </h2>
            <div className="rondy-rule" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                t: "First weekend",
                d: "The sled dog world championships run out of 4th Avenue while the carnival, blanket toss, and fur auction hold down 3rd & E. First Saturday stacks the pancake breakfast, Grand Parade, Outhouse Races, and fireworks into one free downtown day.",
              },
              {
                t: "The middle week",
                d: "The Melodrama plays nearly every night, the carnival runs daily, tournament brackets grind on (curling, hockey, cornhole, pickleball, snowshoe softball), and the Charlotte Jensen Native Arts Market opens at the Dimond Center.",
              },
              {
                t: "The big finish",
                d: "Final Saturday is the marquee: Iditarod Ceremonial Start in the morning, Running of the Reindeer in the afternoon, Music Fest at night [confirm]. Sunday winds down with a family skate on Westchester Lagoon.",
              },
            ].map((card) => (
              <div key={card.t} className="rondy-booth p-6">
                <h3 className="rondy-cond mb-2 text-lg font-semibold text-[#ffc65c]">
                  {card.t}
                </h3>
                <p className="leading-relaxed text-[#c9d2f2]">{card.d}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-[#8992b8]">
            Always confirm dates, times, and official ticket links through
            Greater Anchorage, Inc. at furrondy.net before booking travel.
            Items marked{" "}
            <span className="rounded-sm bg-[#eef2ff]/10 px-1 py-0.5 font-mono text-[#ffc65c]">
              [confirm]
            </span>{" "}
            are real recurring events mapped to their traditional slot in the
            published 2027 festival window (Feb 25 – Mar 7), not yet officially
            dated.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
          <div className="mb-10 text-center">
            <p className="rondy-eyebrow mb-3">Frequently asked</p>
            <h2 className="rondy-display text-4xl text-[#eef2ff] sm:text-5xl">
              Fur Rondy 2027, <span className="text-[#3ddc97]">answered.</span>
            </h2>
            <div className="rondy-rule" />
          </div>

          <div className="space-y-4">
            {hubFaq.map((f) => (
              <div key={f.q} className="rondy-booth p-6">
                <h3 className="rondy-cond mb-2 text-base font-semibold leading-snug text-[#eef2ff]">
                  {f.q}
                </h3>
                <p className="leading-relaxed text-[#c9d2f2]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing seal band — informational sign-off, no conversion pitch */}
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
          <div className="rondy-booth rondy-string relative overflow-hidden p-10 text-center">
            <Seal size={96} className="mx-auto mb-6" />
            <h2 className="rondy-display mb-4 text-3xl text-[#eef2ff] sm:text-4xl">
              Since 1935,{" "}
              <span className="text-[#ffc65c]">
                February is what Anchorage does best.
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-[#c9d2f2]">
              Fur Rendezvous has been the answer to an Alaska February since
              1935. Use the schedule above to build your eleven days — or just
              show up downtown and follow the string lights.
            </p>
          </div>
        </section>

        <SampleNote />
        <Footer />

        {/* schema.org FAQPage for the hub — grounded answers, no invented prices */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: hubFaq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </main>
    </CarnivalShell>
  );
}
