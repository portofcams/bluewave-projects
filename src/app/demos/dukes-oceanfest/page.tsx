import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  OceanShell,
  Seal,
  PhotoPlaceholder,
  OceanConditions,
  SITE,
  HUB_PATH,
  type OceanAccent,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders so the proof
// never pollutes bluewaveprojects.com's index.
export const metadata: Metadata = {
  title: "Duke's OceanFest — Waikiki Ocean-Sports Festival Info Hub (Sample)",
  description:
    "Duke's OceanFest information headquarters — a Waikiki ocean-sports festival honoring Duke Kahanamoku at Kuhio Beach. What to watch, how to take part, Duke's legacy, plan your visit, and a live Waikiki ocean-conditions panel. A sample build by BlueWave Projects on public information.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED EVENT DATA
// ---------------------------------------------------------------------------
// Disciplines are the real recurring OceanFest program (per the brief's grounded
// facts). Exact 2026 heat times/dates are NOT published here, so every date is
// "[confirm]" and no times are invented.
type WatchEvent = {
  title: string;
  accent: OceanAccent;
  figure: "surfer" | "paddler" | "swimmer" | "sun";
  blurb: string;
  access: "Free to watch" | "Open entry" | "Spectator + entry";
};

const watchEvents: WatchEvent[] = [
  {
    title: "Longboard & logboard surfing",
    accent: "wave",
    figure: "surfer",
    blurb:
      "Classic-style longboard and traditional logboard heats off Kuhio Beach — the discipline closest to how Duke himself rode. Watch from the sand or the wall.",
    access: "Spectator + entry",
  },
  {
    title: "Tandem surfing",
    accent: "tandem",
    figure: "surfer",
    blurb:
      "Two riders, one board, lifts and poses on a moving wave — a Waikiki tradition Duke helped popularize. One of the festival's most photogenic events.",
    access: "Spectator + entry",
  },
  {
    title: "Stand-up paddle & paddleboard race",
    accent: "paddle",
    figure: "paddler",
    blurb:
      "SUP and prone paddleboard races out along the Waikiki shoreline. Distance courses draw both elite and recreational paddlers.",
    access: "Open entry",
  },
  {
    title: "Ocean swim",
    accent: "swim",
    figure: "swimmer",
    blurb:
      "An open-water swim off Waikiki, honoring Duke's roots as an Olympic gold-medal swimmer. A grounded nod to where his fame began.",
    access: "Open entry",
  },
  {
    title: "Beach volleyball & water polo",
    accent: "beach",
    figure: "sun",
    blurb:
      "Sand-court volleyball and in-water polo bring team sport to the beachfront. Fast, social, and easy to watch between the surf heats.",
    access: "Free to watch",
  },
  {
    title: "Surf-polo & ocean games",
    accent: "sunset",
    figure: "paddler",
    blurb:
      "Surf-polo and other ocean-skills games round out the program — the festival's playful, all-ages side, right on the Kuhio Beach shoreline.",
    access: "Free to watch",
  },
];

// A quick 3-step "how to take part" — grounded, no invented fees/links.
const takePart = [
  {
    n: "1",
    t: "Come watch — it's mostly free",
    d: "Most of Duke's OceanFest is free to spectate right from Kuhio Beach and the Waikiki wall. Bring water, reef-safe sunscreen, and a beach mat; arrive early for shade and a spot near the shoreline.",
  },
  {
    n: "2",
    t: "Enter an event",
    d: "Several disciplines — the paddle races, the ocean swim, and the surf divisions — take competitor entries. Entry windows, divisions, and any fees are set each year by the organizers [confirm]; register through the official Duke's OceanFest channels.",
  },
  {
    n: "3",
    t: "Honor the water — mālama i ke kai",
    d: "This is a celebration of Hawaiian ocean culture. Know your limits, heed the lifeguards, respect other riders and the reef, and carry Duke's spirit of aloha in and out of the water.",
  },
];

// Grounded FAQ. Anything not publicly confirmed is marked [confirm].
const hubFaq: { q: string; a: string }[] = [
  {
    q: "When and where is Duke's OceanFest?",
    a: "Duke's OceanFest is held at Kuhio Beach in Waikiki, on the island of Oahu, typically in late August around Duke Kahanamoku's August 24 birthday. Exact 2026 dates are not confirmed here [confirm] — check the official Duke's OceanFest schedule before planning travel.",
  },
  {
    q: "Who was Duke Kahanamoku?",
    a: "Duke Paoa Kahanamoku (1890–1968) was a Native Hawaiian waterman: an Olympic gold-medal swimmer, the father of modern surfing, and Hawaii's beloved Ambassador of Aloha. He carried surfing and the spirit of aloha to the world. The festival honors his legacy.",
  },
  {
    q: "Who organizes the festival?",
    a: "Duke's OceanFest is organized by the Outrigger Duke Kahanamoku Foundation (ODKF), which supports Hawaii's youth through athletics and education in Duke's name.",
  },
  {
    q: "Does it cost anything to attend?",
    a: "Most of the festival is free to watch from the beach — you can spend the day on the sand at Kuhio Beach at no charge. Competing in a discipline may involve an entry registration [confirm]. There is no ticket gate for spectators.",
  },
  {
    q: "What can I watch?",
    a: "The program spans ocean sports: longboard and logboard surfing, tandem surfing, stand-up paddle and paddleboard races, an open-water ocean swim, beach volleyball, water polo, and surf-polo — most of it visible right from the Waikiki shoreline.",
  },
  {
    q: "Is the surf and tide data on this page real?",
    a: "The tide and water-temperature readings in the live-conditions panel are pulled live from NOAA Tides & Currents (Honolulu station 1612340) with no API key. Sunrise/sunset are computed for Waikiki. The surf/swell figure is a clearly-labeled sample — a full build would wire the organizer's chosen live surf feed.",
  },
];

export default function DukesOceanFestPage() {
  return (
    // Page-local "Waikiki ocean" theme: warm-sand canvas, deep ocean-teal ink,
    // sunset gold/coral accents, Fraunces display serif. Everything scoped under
    // <OceanShell> (.duke-ocean) — no globals.css / tailwind.config / shared
    // components touched, so the rest of bluewaveprojects.com is unchanged.
    <OceanShell>
      <main className="min-h-screen text-[#0b2b31]">
        <Nav />

        {/* HERO — info headquarters over a deep-ocean band, live panel prominent */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0a3d47] via-[#0e5561] to-[#062a33] text-[#e8f6f2]">
          {/* layered wave lines + sunset glow */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="hero-sun" cx="82%" cy="16%" r="40%">
                <stop offset="0%" stopColor="#ffe6b8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffe6b8" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1200" height="600" fill="url(#hero-sun)" />
            <path d="M-50 300 C 250 250, 500 340, 800 290 S 1250 250, 1300 300" stroke="#e8f6f2" strokeWidth="1.6" fill="none" />
            <path d="M-50 380 C 250 330, 500 420, 800 370 S 1250 330, 1300 380" stroke="#e8f6f2" strokeWidth="1.3" fill="none" />
            <path d="M-50 460 C 250 410, 500 500, 800 450 S 1250 410, 1300 460" stroke="#2fb0a3" strokeWidth="1.1" fill="none" />
          </svg>

          <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e8a54c]/45 bg-[#062a33]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f2c884]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e8a54c]" />
                  Kuhio Beach · Waikiki, Oahu
                </div>
                <h1 className="duke-display mb-5 max-w-2xl text-5xl font-bold leading-[1.02] sm:text-6xl">
                  Duke&apos;s OceanFest{" "}
                  <span className="text-[#e8a54c]">honoring the Ambassador of Aloha.</span>
                </h1>
                <div className="duke-rule !mx-0 mb-6" />
                <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#e8f6f2]/85">
                  Your headquarters for the Waikiki ocean-sports festival that
                  celebrates Duke Kahanamoku — surfing, paddling, tandem, and the
                  open-water swim, staged where he made the sport famous. Held in
                  late August around Duke&apos;s birthday.{" "}
                  <span className="rounded bg-[#e8f6f2]/10 px-1 py-0.5 font-mono text-[13px] text-[#f2c884]">
                    2026 dates [confirm]
                  </span>
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#watch"
                    className="rounded-full bg-gradient-to-r from-[#e8a54c] to-[#e8734f] px-8 py-3.5 text-center text-sm font-semibold text-[#062a33] shadow-[0_10px_30px_-10px_rgba(232,115,79,0.7)] transition-transform hover:-translate-y-0.5"
                  >
                    What to watch →
                  </a>
                  <a
                    href="#visit"
                    className="rounded-full border border-[#e8f6f2]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#e8f6f2]/90 transition-colors hover:border-[#e8f6f2]/70 hover:bg-[#e8f6f2]/5"
                  >
                    Plan your visit
                  </a>
                </div>
              </div>

              {/* LIVE CONDITIONS — the showpiece, prominent in the hero */}
              <div className="relative">
                <OceanConditions />
                <Seal size={104} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
              </div>
            </div>
          </div>
        </section>

        {/* QUICK FACTS — grounded anchors, sand tiles */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { v: "Late Aug", l: "When", s: "Around Duke's Aug 24 birthday" },
              { v: "Kuhio Beach", l: "Where", s: "Waikiki, Oahu" },
              { v: "8+", l: "Ocean sports", s: "Surf, paddle, swim & more" },
              { v: "Free", l: "To spectate", s: "Most events, from the sand" },
            ].map((stat) => (
              <div key={stat.l} className="duke-card p-5">
                <div className="duke-display text-2xl font-bold text-[#c9522f] sm:text-3xl">
                  {stat.v}
                </div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5561]">
                  {stat.l}
                </div>
                <div className="mt-1 text-xs leading-relaxed text-[#6c7f80]">
                  {stat.s}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT TO WATCH — the disciplines */}
        <section id="watch" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <p className="duke-eyebrow mb-3">The program</p>
            <h2 className="duke-display text-4xl font-bold text-[#0b2b31] sm:text-5xl">
              What to watch on the <span className="text-[#c9522f]">Waikiki shoreline.</span>
            </h2>
            <div className="duke-rule" />
            <p className="mx-auto mt-4 max-w-2xl text-[#3a5a60]">
              Duke&apos;s OceanFest spans a week-plus of ocean sports, most of it
              visible right from Kuhio Beach. Here&apos;s the recurring program —
              exact 2026 heat times are set by the organizers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {watchEvents.map((e) => (
              <div key={e.title} className="duke-card flex flex-col overflow-hidden">
                <PhotoPlaceholder
                  accent={e.accent}
                  figure={e.figure}
                  label={e.title}
                  className="rounded-b-none border-0"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="duke-display text-lg font-semibold leading-tight text-[#0b2b31]">
                      {e.title}
                    </h3>
                    <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#0e5561]/20 bg-[#0e5561]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0e5561]">
                      {e.access}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#3a5a60]">{e.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW TO TAKE PART */}
        <section id="take-part" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="duke-eyebrow mb-3">Be part of it</p>
            <h2 className="duke-display text-4xl font-bold text-[#0b2b31] sm:text-5xl">
              How to take part.
            </h2>
            <div className="duke-rule" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {takePart.map((s) => (
              <div key={s.n} className="duke-card p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e8a54c] to-[#e8734f] duke-display text-lg font-bold text-[#062a33]">
                  {s.n}
                </div>
                <h3 className="duke-display mb-2 text-lg font-semibold text-[#0b2b31]">
                  {s.t}
                </h3>
                <p className="text-sm leading-relaxed text-[#3a5a60]">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DUKE'S LEGACY — respectful, grounded, no invented quotes */}
        <section id="legacy" className="relative overflow-hidden bg-gradient-to-br from-[#0a3d47] via-[#0e5561] to-[#062a33] py-20 text-[#e8f6f2]">
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d="M-50 200 C 250 160, 500 240, 800 200 S 1250 160, 1300 200" stroke="#e8f6f2" strokeWidth="1.4" fill="none" />
            <path d="M-50 280 C 250 240, 500 320, 800 280 S 1250 240, 1300 280" stroke="#2fb0a3" strokeWidth="1.1" fill="none" />
          </svg>
          <div className="relative mx-auto max-w-5xl px-6">
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="flex justify-center lg:justify-start">
                <Seal size={190} />
              </div>
              <div>
                <p className="duke-eyebrow mb-3 !text-[#f2c884]">The legacy</p>
                <h2 className="duke-display mb-4 text-3xl font-bold sm:text-4xl">
                  Duke Kahanamoku, <span className="text-[#e8a54c]">1890–1968.</span>
                </h2>
                <div className="space-y-4 text-[#e8f6f2]/85">
                  <p className="leading-relaxed">
                    Born in Honolulu, Duke Paoa Kahanamoku became the fastest
                    swimmer in the world — an Olympic gold medalist who broke the
                    100-meter freestyle record. Between the pool and the sea, he
                    was a Native Hawaiian waterman in the truest sense.
                  </p>
                  <p className="leading-relaxed">
                    He carried surfing from the waters of Waikiki to the world,
                    giving demonstrations from California to Australia, and earned
                    the title Hawaii still gives him: the{" "}
                    <span className="font-semibold text-[#e8f6f2]">
                      Ambassador of Aloha
                    </span>
                    . OceanFest is a celebration of that legacy — of the ocean,
                    of aloha, and of mālama i ke kai, caring for the sea.
                  </p>
                  <p className="text-sm leading-relaxed text-[#e8f6f2]/60">
                    The festival is organized by the Outrigger Duke Kahanamoku
                    Foundation, which invests in Hawaii&apos;s youth through
                    athletics and education in Duke&apos;s name.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLAN YOUR VISIT — practical, grounded, landmark-based */}
        <section id="visit" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="duke-eyebrow mb-3">Plan your visit</p>
            <h2 className="duke-display text-4xl font-bold text-[#0b2b31] sm:text-5xl">
              A day at <span className="text-[#c9522f]">Kuhio Beach.</span>
            </h2>
            <div className="duke-rule" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                t: "Getting there",
                d: "Kuhio Beach sits along Kalakaua Avenue in the heart of Waikiki, near the Duke Kahanamoku statue. From Honolulu it's a short drive or TheBus ride; most Waikiki hotels are within an easy walk of the sand.",
              },
              {
                t: "Parking & access",
                d: "Waikiki parking is limited and fills early on event days — the Waikiki Shell / Kapiolani Park lots and nearby garages are the usual options [confirm]. Walking, biking, or transit beats circling for a stall. Restrooms and showers line the beach.",
              },
              {
                t: "Make a day of it",
                d: "The festival footprint is steps from Kalakaua Avenue's shops and eateries and a short stroll to Kapiolani Park and the Waikiki Aquarium. Bring reef-safe sunscreen, water, and shade — the sun off Waikiki is strong.",
              },
            ].map((card) => (
              <div key={card.t} className="duke-card p-6">
                <h3 className="duke-display mb-2 text-lg font-semibold text-[#0b2b31]">
                  {card.t}
                </h3>
                <p className="text-sm leading-relaxed text-[#3a5a60]">{card.d}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-[#6c7f80]">
            Always confirm dates, schedules, entry windows, and parking through
            the official Duke&apos;s OceanFest and Outrigger Duke Kahanamoku
            Foundation channels before planning travel. Items marked{" "}
            <span className="rounded bg-[#0e5561]/8 px-1 py-0.5 font-mono text-[#c9522f]">
              [confirm]
            </span>{" "}
            are real recurring details not yet published for the coming edition.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
          <div className="mb-10 text-center">
            <p className="duke-eyebrow mb-3">Frequently asked</p>
            <h2 className="duke-display text-4xl font-bold text-[#0b2b31] sm:text-5xl">
              OceanFest, <span className="text-[#c9522f]">answered.</span>
            </h2>
            <div className="duke-rule" />
          </div>

          <div className="space-y-4">
            {hubFaq.map((f) => (
              <div key={f.q} className="duke-card p-6">
                <h3 className="duke-display mb-2 text-base font-semibold leading-snug text-[#0b2b31]">
                  {f.q}
                </h3>
                <p className="text-sm leading-relaxed text-[#3a5a60]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING SIGN-OFF — informational, not a hard CTA */}
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#e8a54c]/40 bg-gradient-to-br from-[#0a3d47] via-[#0e5561] to-[#062a33] p-10 text-center text-[#e8f6f2] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            <Seal size={92} className="mx-auto mb-6" />
            <h2 className="duke-display mb-4 text-3xl font-bold sm:text-4xl">
              He&apos;e nalu — <span className="text-[#e8a54c]">ride the wave.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-[#e8f6f2]/85">
              Duke&apos;s OceanFest returns to Kuhio Beach in late August. Use the
              program above to plan a day on the sand, and check the official
              schedule for this year&apos;s dates. Mālama i ke kai — take care of
              the ocean, and it will take care of you.
            </p>
          </div>
        </section>

        {/* SAMPLE NOTE — honest disclaimer */}
        <div className="mx-auto max-w-5xl px-6 pb-12">
          <div className="duke-card px-5 py-4 text-center text-xs leading-relaxed text-[#6c7f80]">
            <p>
              This is a{" "}
              <span className="font-semibold text-[#0b2b31]">sample information hub</span>{" "}
              built by{" "}
              <a
                href={SITE}
                className="font-semibold text-[#c9522f] underline underline-offset-2 hover:text-[#e8734f]"
              >
                BlueWave Projects
              </a>{" "}
              on public information. All imagery is{" "}
              <span className="font-semibold text-[#0b2b31]">designed placeholder art</span>{" "}
              — the final build would use the Outrigger Duke Kahanamoku
              Foundation&apos;s own official photography and logo. Tide and
              water-temperature figures are read live from NOAA Tides &amp;
              Currents (Honolulu station 1612340); sunrise/sunset are computed for
              Waikiki; the surf/swell figure is a labeled sample. Event dates,
              schedules, and entry details marked{" "}
              <span className="rounded bg-[#0e5561]/8 px-1 py-0.5 font-mono text-[#c9522f]">
                [confirm]
              </span>{" "}
              are real recurring details not yet published for the coming edition.
              This page is not affiliated with or endorsed by Duke&apos;s
              OceanFest or the Outrigger Duke Kahanamoku Foundation.
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </OceanShell>
  );
}
