import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  screenings,
  deepScreenings,
  ticketSystems,
  HUB_PATH,
  SITE,
} from "./events";
import {
  MarqueeShell,
  Seal,
  PhotoPlaceholder,
  SampleNote,
  MarqueeMotion,
  ticketBadge,
  accentText,
} from "./_shared";
import ScheduleExplorer, { type ScheduleRow } from "./schedule";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. The robots block keeps this
// proof out of bluewaveprojects.com's index so it never pollutes SEO.
export const metadata: Metadata = {
  title:
    "Anchorage International Film Festival 2026 — Schedule, Tickets & Guide (Sample Hub)",
  description:
    "AIFF 2026 information headquarters — the 26th annual Anchorage International Film Festival, December 4–13, 2026. Every screening in one filterable schedule, plus venues, how to buy tickets, and how to plan your ten days. A sample build by BlueWave Projects on public information.",
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
    q: "When is AIFF 2026?",
    a: "December 4–13, 2026 — the 26th annual Anchorage International Film Festival, confirmed directly by the festival's own site. Ten days of screenings across four Anchorage venues.",
  },
  {
    q: "Has the 2026 film lineup been announced yet?",
    a: "Not as of this build. AIFF's own festival-schedule page still shows the completed 2025 program. The screenings shown on this hub's schedule are the verified 2025 lineup, clearly labeled as past-festival reference — not invented 2026 claims.",
  },
  {
    q: "Where do I buy tickets?",
    a: "Tickets sell through each screening's venue. Bear Tooth Theatrepub screenings sell through FilmBOT, Bear Tooth's own year-round box office. Anchorage Museum, Alaska Experience Theater, and E Street Theater screenings sell through a shared platform, GoElEvent. Each row on the schedule below notes where its tickets are sold, so you can go straight to the right box office. Always confirm the official link through AIFF at anchoragefilmfestival.org.",
  },
  {
    q: "Is FilmFreeway where I buy tickets?",
    a: "No — FilmFreeway (filmfreeway.com/AnchorageInternationalFilmFestival) is exclusively for filmmakers submitting films to the festival. It has nothing to do with attendee ticket sales, which run through FilmBOT and GoElEvent.",
  },
  {
    q: "Is AIFF a real nonprofit?",
    a: "Yes — Anchorage International Film Festival is a 501(c)(3) nonprofit, EIN 76-0758395, formed in 2009, per public IRS nonprofit filings (ProPublica Nonprofit Explorer, verified 2026-07-02).",
  },
  {
    q: "What makes AIFF notable?",
    a: 'MovieMaker Magazine named it one of the "25 Coolest Film Festivals in the World." The festival bills itself as "the Icy Road to the Oscars," and past selections have gone on to Academy Award recognition.',
  },
];

export default function AiffHubPage() {
  // Serializable rows for the client-side schedule explorer.
  const rows: ScheduleRow[] = screenings.map((e) => ({
    slug: e.slug,
    shortName: e.shortName,
    date: e.date,
    sortKey: e.sortKey,
    venue: e.venue,
    category: e.category,
    ticketed: e.ticketed,
    ticketVia: e.ticketVia,
    teaser: e.teaser,
    href: e.deep ? `${HUB_PATH}/${e.slug}` : undefined,
    sourceUrl: e.sourceUrl,
  }));

  return (
    // Page-local "marquee lights" theme: charcoal cinema-screen canvas,
    // marquee-bulb gold, aurora-blue night-sky accents. Everything is scoped
    // under <MarqueeShell> (.aiff-marquee) — no globals.css / tailwind.config
    // / shared components touched, so the rest of bluewaveprojects.com is
    // unchanged.
    <>
    <MarqueeShell>
      <main className="min-h-screen text-[#f3f1ea]">
        <Nav />

        {/* Hero — the festival's front door: charcoal band, aurora glow,
            marquee blade sign, snow. */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#191920] via-[#15151a] to-[#0a0a0d]">
          <MarqueeMotion />

          <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="aiff-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-[#f0b94a]/40 bg-[#0a0a0d]/50 px-4 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f0b94a]" />
                  AIFF · 26th Annual · Anchorage
                </div>
                <h1 className="aiff-display mb-5 max-w-3xl text-5xl leading-[1.02] sm:text-6xl">
                  Anchorage International Film Festival 2026{" "}
                  <span className="text-[#e2685c]">
                    Films worth freezing for.
                  </span>
                </h1>
                <div className="aiff-rule !mx-0 mb-6" />
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#c9c7d0]">
                  Ten days, 100+ independent films, four Anchorage venues:
                  Bear Tooth Theatrepub, the Anchorage Museum, Alaska
                  Experience Theater, and E Street Theater. December 4–13,
                  2026 — the 26th annual edition of a festival MovieMaker
                  Magazine calls one of the 25 coolest in the world.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#schedule"
                    className="aiff-cond rounded-lg border border-[#c9962e] bg-[#f0b94a] px-8 py-3.5 text-center text-sm font-bold text-[#0a0a0d] shadow-[0_8px_24px_rgba(240,185,74,0.25)] transition-transform hover:-translate-y-0.5"
                  >
                    Browse the schedule →
                  </a>
                  <a
                    href="#featured"
                    className="aiff-cond rounded-lg border border-[#f3f1ea]/30 px-8 py-3.5 text-center text-sm font-bold text-[#f3f1ea]/90 transition-colors hover:border-[#e2685c]/60 hover:bg-[#e2685c]/5"
                  >
                    How tickets work
                  </a>
                </div>
              </div>

              <div className="relative">
                <PhotoPlaceholder
                  accent="midnight"
                  tall
                  imageKey="hero"
                  label="Anchorage, home of AIFF"
                />
                <Seal
                  size={132}
                  className="absolute -bottom-8 -left-8 hidden sm:inline-flex"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick facts — marquee tiles, all grounded anchors */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { v: "26th", l: "Annual edition", s: "Running since 2000" },
              { v: "10", l: "Festival days", s: "Dec 4–13, 2026" },
              { v: "100+", l: "Films screened", s: "Features, docs, shorts" },
              { v: "4", l: "Venues", s: "Across Anchorage" },
            ].map((stat) => (
              <div key={stat.l} className="aiff-panel aiff-string p-5">
                <div className="aiff-display text-4xl text-[#f0b94a]">
                  {stat.v}
                </div>
                <div className="aiff-cond mb-1 mt-2 text-xs font-semibold tracking-[0.12em] text-[#f3f1ea]">
                  {stat.l}
                </div>
                <div className="text-xs leading-relaxed text-[#a8a6ae]">
                  {stat.s}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to buy tickets — neutral, attendee-helpful ticketing note */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="aiff-panel aiff-string relative overflow-hidden p-8 sm:p-10">
            <p className="aiff-eyebrow mb-3">How to buy tickets</p>
            <h2 className="aiff-display mb-4 text-3xl text-[#f3f1ea] sm:text-4xl">
              Tickets sell{" "}
              <span className="text-[#f0b94a]">through each venue.</span>
            </h2>
            <p className="mb-6 max-w-3xl leading-relaxed text-[#c9c7d0]">
              AIFF screens across four Anchorage venues, and each screening&apos;s
              tickets are sold through its venue&apos;s own box office. Bear Tooth
              Theatrepub uses{" "}
              <span className="font-semibold text-[#e2685c]">FilmBOT</span>, its
              year-round box office. The Anchorage Museum, Alaska Experience
              Theater, and E Street Theater use a shared platform,{" "}
              <span className="font-semibold text-[#4fd6e8]">GoElEvent</span>. The
              schedule below notes where each screening&apos;s tickets are sold,
              so you can go straight to the right box office.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#c4453a]/40 bg-[#c4453a]/10 p-5">
                <p className="aiff-cond mb-1 text-xs font-semibold tracking-[0.14em] text-[#e2685c]">
                  FilmBOT
                </p>
                <p className="text-sm leading-relaxed text-[#c9c7d0]">
                  Bear Tooth Theatrepub&apos;s own box office — reserved dine-in
                  seating, shared with its regular movie schedule (Hollywood
                  releases, sports broadcasts, classic films). New tickets
                  typically release Tuesdays at 10:30 AM for the coming Friday.
                </p>
              </div>
              <div className="rounded-xl border border-[#4fd6e8]/40 bg-[#4fd6e8]/10 p-5">
                <p className="aiff-cond mb-1 text-xs font-semibold tracking-[0.14em] text-[#4fd6e8]">
                  GoElEvent
                </p>
                <p className="text-sm leading-relaxed text-[#c9c7d0]">
                  The shared event-ticketing platform for the Anchorage Museum,
                  Alaska Experience Theater, and E Street Theater — three
                  venues booking through one checkout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured screenings — the four headliners with landing pages */}
        <section id="featured" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <p className="aiff-eyebrow mb-3">How tickets work</p>
            <h2 className="aiff-display text-4xl text-[#f3f1ea] sm:text-5xl">
              Four things worth{" "}
              <span className="text-[#e2685c]">understanding first.</span>
            </h2>
            <div className="aiff-rule" />
            <p className="mx-auto mt-4 max-w-3xl text-[#a8a6ae]">
              What each venue's ticketing actually looks like, and what a
              pass does (and doesn't) cover. Tap any card for the full guide.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {deepScreenings.map((e) => {
              const badge = ticketBadge[e.ticketed];
              return (
                <Link
                  key={e.slug}
                  href={`${HUB_PATH}/${e.slug}`}
                  className="group aiff-panel aiff-string flex flex-col overflow-hidden"
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
                        <h3 className="aiff-cond text-xl font-semibold leading-tight text-[#f3f1ea]">
                          {e.shortName}
                        </h3>
                        <p
                          className={`mt-1 text-sm font-semibold ${accentText[e.accent]}`}
                        >
                          {e.date}
                        </p>
                      </div>
                      <span
                        className={`aiff-cond inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-1 text-[10px] tracking-[0.12em] ${badge.cls}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="mb-1 text-xs uppercase tracking-[0.08em] text-[#8a8890]">
                      {e.venue}
                    </p>
                    <p className="mb-4 text-sm leading-relaxed text-[#c9c7d0]">
                      {e.teaser}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-[#2e2e38] pt-4">
                      <span className="aiff-cond text-sm font-bold text-[#f0b94a] transition-colors group-hover:text-[#e2685c]">
                        Full guide →
                      </span>
                      {e.ticketVia && (
                        <span className="text-[11px] uppercase tracking-[0.1em] text-[#8a8890]">
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

        {/* Full schedule — the hub's thesis: every screening, one door,
            filterable by which system sells it */}
        <section id="schedule" className="mx-auto max-w-4xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="aiff-eyebrow mb-3">The 2025 program (reference)</p>
            <h2 className="aiff-display text-4xl text-[#f3f1ea] sm:text-5xl">
              Every screening, <span className="text-[#e2685c]">one schedule.</span>
            </h2>
            <div className="aiff-rule" />
            <p className="mx-auto mt-4 max-w-3xl text-[#a8a6ae]">
              AIFF hasn&apos;t published its 2026 film lineup yet, so this
              schedule shows the most recently completed (2025) program —
              real screenings, clearly dated as past-festival reference.
              Filter by category or by{" "}
              <span className="font-semibold text-[#f3f1ea]">
                which of {ticketSystems.length} ticketing systems
              </span>{" "}
              sells it — each row notes exactly where its tickets live.
            </p>
          </div>

          <ScheduleExplorer rows={rows} />
        </section>

        {/* Plan your visit — practical grounded info */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="aiff-eyebrow mb-3">Plan your AIFF</p>
            <h2 className="aiff-display text-4xl text-[#f3f1ea] sm:text-5xl">
              Ten days, <span className="text-[#e2685c]">four venues.</span>
            </h2>
            <div className="aiff-rule" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                t: "Bear Tooth Theatrepub",
                d: "1230 W 27th Ave — dine-in reserved seating, its own year-round box office (FilmBOT). Traditionally hosts opening night and closing-weekend shorts. Tickets typically release Tuesdays at 10:30 AM for the coming Friday.",
              },
              {
                t: "Anchorage Museum",
                d: "625 C Street — the festival's busiest single venue by screening count in the 2025 program. Use the 7th Avenue entrance; paid parking garage on-site. Tickets via GoElEvent.",
              },
              {
                t: "E Street & Alaska Experience Theater",
                d: "315 E Street and 333 W 4th Avenue — downtown screening rooms rounding out the GoElEvent side of the festival's footprint, mixing shorts blocks and features.",
              },
            ].map((card) => (
              <div key={card.t} className="aiff-panel p-6">
                <h3 className="aiff-cond mb-2 text-lg font-semibold text-[#f0b94a]">
                  {card.t}
                </h3>
                <p className="leading-relaxed text-[#c9c7d0]">{card.d}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-[#8a8890]">
            Always confirm dates, times, and official ticket links through
            AIFF at anchoragefilmfestival.org before booking travel. Screening
            details shown above reflect the verified 2025 program; the 2026
            lineup was not yet published as of this build.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
          <div className="mb-10 text-center">
            <p className="aiff-eyebrow mb-3">Frequently asked</p>
            <h2 className="aiff-display text-4xl text-[#f3f1ea] sm:text-5xl">
              AIFF 2026, <span className="text-[#e2685c]">answered.</span>
            </h2>
            <div className="aiff-rule" />
          </div>

          <div className="space-y-4">
            {hubFaq.map((f) => (
              <div key={f.q} className="aiff-panel p-6">
                <h3 className="aiff-cond mb-2 text-base font-semibold leading-snug text-[#f3f1ea]">
                  {f.q}
                </h3>
                <p className="leading-relaxed text-[#c9c7d0]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing seal band — informational sign-off, no conversion pitch */}
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
          <div className="aiff-panel aiff-string relative overflow-hidden p-10 text-center">
            <Seal size={96} className="mx-auto mb-6" />
            <h2 className="aiff-display mb-4 text-3xl text-[#f3f1ea] sm:text-4xl">
              Since 2000,{" "}
              <span className="text-[#f0b94a]">
                December is worth freezing for.
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-[#c9c7d0]">
              AIFF has brought independent film to Anchorage for 26 years.
              Use the schedule above to plan your ten days — or just follow
              the marquee lights downtown.
            </p>
          </div>
        </section>

        <SampleNote />

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
    </MarqueeShell>
    <div className="bg-[#0a0a0d] text-[#f3f1ea]">
      <Footer />
    </div>
    </>
  );
}
