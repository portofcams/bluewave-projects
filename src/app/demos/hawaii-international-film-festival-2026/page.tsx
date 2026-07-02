import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  screenings,
  deepScreenings,
  islandsCovered,
  HUB_PATH,
  SITE,
  FESTIVAL_2026,
} from "./events";
import {
  PremiereShell,
  Seal,
  PhotoPlaceholder,
  SampleNote,
  PremiereMotion,
  ticketBadge,
  accentText,
} from "./_shared";
import ScheduleExplorer, { type ScheduleRow } from "./schedule";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. The robots block keeps this
// proof out of bluewaveprojects.com's index so it never pollutes SEO.
export const metadata: Metadata = {
  title:
    "Hawai'i International Film Festival 2026 — Schedule & Island Guide (Sample Hub)",
  description:
    "HIFF46 information headquarters — the 46th annual Hawai'i International Film Festival, October 22–November 1, 2026 (kickoff Oct 21) at Consolidated Theatres Kahala. One statewide festival, six weeks, up to five neighbor islands — in one filterable schedule. A sample build by BlueWave Projects on public information.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// Real attendee questions, answered from grounded facts + the event data.
// Anything unpublished for 2026 is marked [confirm].
const hubFaq: { q: string; a: string }[] = [
  {
    q: "When is HIFF46?",
    a: "October 22 – November 1, 2026, with a kickoff event on October 21, at Consolidated Theatres Kahala — confirmed directly on HIFF's own site (hiff.org's homepage banner states these dates explicitly). A third-party aggregator lists a conflicting 'October 15–25' window; that figure is unreliable and not used here.",
  },
  {
    q: "Has the HIFF46 film lineup been announced yet?",
    a: "Not as of this build. HIFF's own site confirms the festival window and presenting sponsor but had not published the day-by-day 2026 program. The screenings shown on this hub's schedule are the verified HIFF45 (2025) lineup, clearly labeled as past-festival reference — not invented 2026 claims.",
  },
  {
    q: "Does HIFF only screen on Oʻahu?",
    a: "No — HIFF calls itself the only statewide film festival in the United States. The verified 2025 program screened on Oʻahu, then toured Kauaʻi, Maui, Molokaʻi, and Hawaiʻi Island (Waimea and Hilo) over the following weeks. Whether 2026 follows the same island list hasn't been confirmed yet.",
  },
  {
    q: "Do neighbor-island screenings use a different ticket system?",
    a: "No — direct verification this session (hiff.org's event pages, calendar, and the 'Ōpio Fest subdomain) confirms every HIFF ticket, on every island, sells through the same embedded Elevent checkout on hiff.org. There's no second vendor to navigate — the real complexity is the calendar, not the checkout.",
  },
  {
    q: "Who presents HIFF?",
    a: "Halekulani — hiff.org's own sponsors page is titled \"HIFF 2026 Sponsors\" and lists Halekulani under its top \"Presenting\" tier, verified live this session. Halekulani has held the presenting role since 2011 (Louis Vuitton held it 2002–2008 before that).",
  },
  {
    q: "What makes HIFF notable?",
    a: "Founded in 1981 by Jeannette Paulson Hereniko as a project of the East-West Center, HIFF is an Academy Award-qualifying festival and the only statewide film festival in the US, focused on cinema from Asia, the Pacific, and Hawaiʻi.",
  },
];

export default function HiffHubPage() {
  // Serializable rows for the client-side schedule explorer.
  const rows: ScheduleRow[] = screenings.map((e) => ({
    slug: e.slug,
    shortName: e.shortName,
    date: e.date,
    sortKey: e.sortKey,
    venue: e.venue,
    island: e.island,
    category: e.category,
    ticketed: e.ticketed,
    teaser: e.teaser,
    href: e.deep ? `${HUB_PATH}/${e.slug}` : undefined,
    sourceUrl: e.sourceUrl,
  }));

  return (
    // Page-local "golden hour premiere" theme: dusk-violet tropical-evening
    // canvas, sunset-gold, coral, and orchid accents. Everything is scoped
    // under <PremiereShell> (.hiff-premiere) — no globals.css / tailwind
    // config / shared components touched, so the rest of
    // bluewaveprojects.com is unchanged.
    <PremiereShell>
      <main className="min-h-screen text-[#f7f2ea]">
        <Nav />

        {/* Hero — the festival's front door: violet band, sunset glow,
            palm silhouette. */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#23153a] via-[#1c1030] to-[#0e0819]">
          <PremiereMotion />

          <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="hiff-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-[#f5a742]/40 bg-[#0e0819]/50 px-4 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f5a742]" />
                  HIFF46 · Honolulu · Statewide
                </div>
                <h1 className="hiff-display mb-5 max-w-3xl text-5xl leading-[1.02] sm:text-6xl">
                  Hawaiʻi International Film Festival 2026{" "}
                  <span className="text-[#f16a5c]">
                    One festival. Six weeks. Five islands.
                  </span>
                </h1>
                <div className="hiff-rule !mx-0 mb-6" />
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#d8cfe2]">
                  October 22–November 1, 2026 in Honolulu (kickoff October
                  21) at Consolidated Theatres Kahala — then HIFF, the only
                  statewide film festival in the US, tours neighbor islands
                  for weeks after. The 46th annual edition, presented by
                  Halekulani.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#schedule"
                    className="hiff-cond rounded-lg border border-[#d8862a] bg-[#f5a742] px-8 py-3.5 text-center text-sm font-bold text-[#0e0819] shadow-[0_8px_24px_rgba(245,167,66,0.25)] transition-transform hover:-translate-y-0.5"
                  >
                    Browse the schedule →
                  </a>
                  <a
                    href="#featured"
                    className="hiff-cond rounded-lg border border-[#f7f2ea]/30 px-8 py-3.5 text-center text-sm font-bold text-[#f7f2ea]/90 transition-colors hover:border-[#f16a5c]/60 hover:bg-[#f16a5c]/5"
                  >
                    How to plan your HIFF
                  </a>
                </div>
              </div>

              <div className="relative">
                <PhotoPlaceholder
                  accent="dusk-violet"
                  tall
                  imageKey="hero"
                  label="Waikiki, home of HIFF"
                />
                <Seal
                  size={132}
                  className="absolute -bottom-8 -left-8 hidden sm:inline-flex"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick facts — premiere tiles, all grounded anchors */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { v: "46th", l: "Annual edition", s: "Running since 1981" },
              { v: "10", l: "Honolulu days", s: FESTIVAL_2026.dates },
              { v: `${islandsCovered.length}`, l: "Islands in the 2025 tour", s: "Oʻahu + neighbor islands" },
              { v: "1", l: "Ticket system", s: "One hiff.org checkout, statewide" },
            ].map((stat) => (
              <div key={stat.l} className="hiff-panel hiff-lei p-5">
                <div className="hiff-display text-4xl text-[#f5a742]">
                  {stat.v}
                </div>
                <div className="hiff-cond mb-1 mt-2 text-xs font-semibold tracking-[0.12em] text-[#f7f2ea]">
                  {stat.l}
                </div>
                <div className="text-xs leading-relaxed text-[#b3a6c4]">
                  {stat.s}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE HOOK — one festival, a long statewide tail */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="hiff-panel hiff-lei relative overflow-hidden p-8 sm:p-10">
            <p className="hiff-eyebrow mb-3">The real complexity</p>
            <h2 className="hiff-display mb-4 text-3xl text-[#f7f2ea] sm:text-4xl">
              One checkout.{" "}
              <span className="text-[#f5a742]">A six-week calendar.</span>
            </h2>
            <p className="mb-6 max-w-3xl leading-relaxed text-[#d8cfe2]">
              Unlike some festivals that split tickets across unrelated
              vendors, HIFF genuinely runs on one system — every screening we
              checked, on every island, sells through the same embedded
              Elevent checkout on hiff.org. The real planning problem is
              different: HIFF calls itself the only statewide film festival
              in the US, and the verified 2025 program proved it — an
              eleven-day Honolulu run, a separate West Oʻahu window, then
              weeks of neighbor-island dates on{" "}
              <span className="font-semibold text-[#3fc4b0]">
                Kauaʻi, Maui, Molokaʻi, and Hawaiʻi Island
              </span>
              . A Maui moviegoer and an Oʻahu moviegoer are working from
              genuinely different calendars of the same festival, and HIFF's
              own site doesn't put every island's dates on one page.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#f16a5c]/40 bg-[#f16a5c]/10 p-5">
                <p className="hiff-cond mb-1 text-xs font-semibold tracking-[0.14em] text-[#ff8b7d]">
                  Honolulu run
                </p>
                <p className="text-sm leading-relaxed text-[#d8cfe2]">
                  Ten days at Consolidated Theatres Kahala, October 22–
                  November 1, 2026 (kickoff Oct 21) — confirmed directly by
                  HIFF. In 2025, a separate West Oʻahu window followed three
                  days after Honolulu closed.
                </p>
              </div>
              <div className="rounded-xl border border-[#3fc4b0]/40 bg-[#3fc4b0]/10 p-5">
                <p className="hiff-cond mb-1 text-xs font-semibold tracking-[0.14em] text-[#3fc4b0]">
                  The statewide tail
                </p>
                <p className="text-sm leading-relaxed text-[#d8cfe2]">
                  In 2025, the tour continued for weeks after Honolulu —
                  Kauaʻi, Maui, Molokaʻi, and Hawaiʻi Island (Waimea &amp;
                  Hilo) — same checkout, completely different dates and
                  venues per island.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured screenings — the four headliners with landing pages */}
        <section id="featured" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <p className="hiff-eyebrow mb-3">How to plan your HIFF</p>
            <h2 className="hiff-display text-4xl text-[#f7f2ea] sm:text-5xl">
              Four things worth{" "}
              <span className="text-[#f16a5c]">understanding first.</span>
            </h2>
            <div className="hiff-rule" />
            <p className="mx-auto mt-4 max-w-3xl text-[#b3a6c4]">
              What opening night, the neighbor-island tour, the pass ladder,
              and the parallel HIFILM industry track each actually look
              like. Tap any card for the full guide.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {deepScreenings.map((e) => {
              const badge = ticketBadge[e.ticketed];
              return (
                <Link
                  key={e.slug}
                  href={`${HUB_PATH}/${e.slug}`}
                  className="group hiff-panel hiff-lei flex flex-col overflow-hidden"
                >
                  <PhotoPlaceholder
                    accent={e.accent}
                    imageKey={e.slug}
                    label={e.shortName}
                    className="rounded-b-none rounded-t-[15px] border-0"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="hiff-cond text-xl font-semibold leading-tight text-[#f7f2ea]">
                          {e.shortName}
                        </h3>
                        <p
                          className={`mt-1 text-sm font-semibold ${accentText[e.accent]}`}
                        >
                          {e.date}
                        </p>
                      </div>
                      <span
                        className={`hiff-cond inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-1 text-[10px] tracking-[0.12em] ${badge.cls}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="mb-1 text-xs uppercase tracking-[0.08em] text-[#9c8fae]">
                      {e.venue}
                    </p>
                    <p className="mb-4 text-sm leading-relaxed text-[#d8cfe2]">
                      {e.teaser}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-[#3a2652] pt-4">
                      <span className="hiff-cond text-sm font-bold text-[#f5a742] transition-colors group-hover:text-[#f16a5c]">
                        Full guide →
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.1em] text-[#9c8fae]">
                        {e.island}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Full schedule — the hub's thesis: every program, one door,
            filterable by island */}
        <section id="schedule" className="mx-auto max-w-4xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="hiff-eyebrow mb-3">The 2025 program (reference)</p>
            <h2 className="hiff-display text-4xl text-[#f7f2ea] sm:text-5xl">
              Every program, <span className="text-[#f16a5c]">one schedule.</span>
            </h2>
            <div className="hiff-rule" />
            <p className="mx-auto mt-4 max-w-3xl text-[#b3a6c4]">
              HIFF hasn&apos;t published its HIFF46 film lineup yet, so this
              schedule blends the most recently completed (HIFF45, 2025)
              program with the few HIFF46 dates already confirmed (ʻŌpio
              Fest) — everything clearly dated. Filter by program type or by{" "}
              <span className="font-semibold text-[#f7f2ea]">
                which island
              </span>{" "}
              it screens on.
            </p>
          </div>

          <ScheduleExplorer rows={rows} />
        </section>

        {/* Plan your visit — practical grounded info */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="hiff-eyebrow mb-3">Plan your HIFF</p>
            <h2 className="hiff-display text-4xl text-[#f7f2ea] sm:text-5xl">
              Ten days on Oʻahu,{" "}
              <span className="text-[#f16a5c]">weeks statewide.</span>
            </h2>
            <div className="hiff-rule" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                t: "Consolidated Theatres Kahala",
                d: "HIFF46's confirmed home venue for the October 22–November 1, 2026 Honolulu run, kicking off October 21. In 2025, Consolidated Theatres Ward with TITAN LUXE served as a second Oʻahu venue.",
              },
              {
                t: "Neighbor islands",
                d: "In the verified 2025 program: Kauaʻi, Maui, Molokaʻi, and Hawaiʻi Island (Waimea & Hilo) all hosted screenings in the weeks following the Honolulu run — same checkout, different dates per island.",
              },
              {
                t: "HIFILM & ʻŌpio Fest",
                d: "Two parallel programs worth knowing about: HIFILM's industry conference runs alongside the main festival for filmmakers, and ʻŌpio Fest — HIFF's youth showcase — is a separate confirmed spring 2026 event (April 17–19).",
              },
            ].map((card) => (
              <div key={card.t} className="hiff-panel p-6">
                <h3 className="hiff-cond mb-2 text-lg font-semibold text-[#f5a742]">
                  {card.t}
                </h3>
                <p className="leading-relaxed text-[#d8cfe2]">{card.d}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-[#9c8fae]">
            Always confirm dates, times, and official ticket links through
            HIFF at hiff.org before booking travel. Screening details shown
            above reflect the verified HIFF45 (2025) program; the HIFF46
            film lineup and neighbor-island dates were not yet published as
            of this build.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
          <div className="mb-10 text-center">
            <p className="hiff-eyebrow mb-3">Frequently asked</p>
            <h2 className="hiff-display text-4xl text-[#f7f2ea] sm:text-5xl">
              HIFF46, <span className="text-[#f16a5c]">answered.</span>
            </h2>
            <div className="hiff-rule" />
          </div>

          <div className="space-y-4">
            {hubFaq.map((f) => (
              <div key={f.q} className="hiff-panel p-6">
                <h3 className="hiff-cond mb-2 text-base font-semibold leading-snug text-[#f7f2ea]">
                  {f.q}
                </h3>
                <p className="leading-relaxed text-[#d8cfe2]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing seal band — informational sign-off, no conversion pitch */}
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
          <div className="hiff-panel hiff-lei relative overflow-hidden p-10 text-center">
            <Seal size={96} className="mx-auto mb-6" />
            <h2 className="hiff-display mb-4 text-3xl text-[#f7f2ea] sm:text-4xl">
              Since 1981,{" "}
              <span className="text-[#f5a742]">
                Hawaiʻi&apos;s vanguard forum for film.
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-[#d8cfe2]">
              HIFF has brought Asia-Pacific cinema to Hawaiʻi for 46 years.
              Use the schedule above to plan your festival — Honolulu or
              your home island.
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
    </PremiereShell>
  );
}
