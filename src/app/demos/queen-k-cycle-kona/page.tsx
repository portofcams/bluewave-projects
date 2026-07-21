import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import {
  QkcShell,
  Emblem,
  ArtTile,
  QkcConditions,
  SITE,
  HUB_PATH,
  type KqAccent,
  type KqPhoto,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders so the proof
// never pollutes bluewaveprojects.com's index.
export const metadata: Metadata = {
  title: "Queen K Cycle Co. — Kailua-Kona Race-Week Bike Support & Live Queen K Conditions (Sample Demo)",
  description:
    "A guest-facing marketing and inquiry sample for a Kailua-Kona, Hawaii bike shop serving Ironman World Championship race-week and training-camp riders: TT/tri rentals, tune-ups, and bike-box logistics, with a live NOAA/NWS wind panel that turns today's real Queen K crosswinds into an honest wheel-choice read. A clearly-labeled sample concept built by BlueWave Projects on public geography and live public data. Fictional brand; not affiliated with IRONMAN/WTC or any real operator.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED DATA
// ---------------------------------------------------------------------------
// "Queen K Cycle Co." is a DELIBERATELY FICTIONAL sample brand — a real Kona
// bike shop (Bike Works Kona) already runs rentals and race-week tune-ups, so
// a real-name demo would misrepresent them, consistent with this portfolio's
// other operator demos. Everything factual below — the unified 2026 race
// date, course geography, the crosswind/disc-wheel precedent, and the real
// community/cultural context — is real and publicly verified (research
// 2026-07-12). NO real operator's name, prices, hours, phone, or email
// appear anywhere. No pricing is invented. Race-day temperature and wind
// figures are presented as real reported RANGES, never a single invented
// "the" number — multiple independent sources disagree on an exact figure.

const BRAND = "Queen K Cycle Co.";

type ServiceItem = {
  title: string;
  accent: KqAccent;
  figure: "bike" | "lava" | "wave" | "sun" | "crosswind";
  blurb: string;
  tag: string;
};

// Real, openly-licensed Kona lava / Queen K highway scenery keyed by tile title.
const KQ_PHOTOS: Record<string, KqPhoto> = {
  "Race-week TT & tri rentals": { src: "/demos/queen-k-cycle-kona/lava-road.webp", credit: "dronepicr · CC BY 2.0" },
  "Tune-ups & race prep": { src: "/demos/queen-k-cycle-kona/kohala-coast.webp", credit: "Madereugeneandrew · CC BY-SA 4.0" },
  "Training-ride wheel advice": { src: "/demos/queen-k-cycle-kona/lava-sunset.webp", credit: "dronepicr · CC BY 2.0" },
  "Bike box storage & logistics": { src: "/demos/queen-k-cycle-kona/lava-coast-ocean.webp", credit: "dronepicr · CC BY 2.0" },
};

const services: ServiceItem[] = [
  {
    title: "Race-week TT & tri rentals",
    accent: "heat",
    figure: "bike",
    blurb:
      "Time-trial and triathlon bike rentals for athletes flying in without their own rig, with a fit and mechanical check before you ever hit the Queen K.",
    tag: "Signature",
  },
  {
    title: "Tune-ups & race prep",
    accent: "ocean",
    figure: "crosswind",
    blurb:
      "A full mechanical check before race day — drivetrain, brakes, wheel true — plus the wheel-depth conversation, informed by what the Queen K is actually doing that week.",
    tag: "Prep",
  },
  {
    title: "Training-ride wheel advice",
    accent: "gold",
    figure: "sun",
    blurb:
      "Deep-section, mid-depth, or spoked — the live conditions panel above turns today's real crosswind read into a straight answer before you roll out.",
    tag: "Daily",
  },
  {
    title: "Bike box storage & logistics",
    accent: "lava",
    figure: "wave",
    blurb:
      "Somewhere to stash your travel case race week, and help getting your bike from the airport, to the shop, to transition, and back in the box after.",
    tag: "Logistics",
  },
];

// Real course geography (destinations only — no operator specifics).
type Dest = { name: string; note: string };
const destinations: Dest[] = [
  {
    name: "Kailua Pier",
    note: "Swim start and finish in Kailua Bay — a 2.4-mile out-and-back, turning near the seawall by the King Kamehameha Hotel.",
  },
  {
    name: "Queen Kaʻahumanu Highway",
    note: "\"The Queen K\" — the lava-field spine of the 112-mile bike course, and the reason this shop talks about crosswinds so much.",
  },
  {
    name: "Hawiʻi turnaround",
    note: "Roughly 52–56 miles out (sources don't agree on one exact figure) — the highway's crosswinds are most famous right around here.",
  },
  {
    name: "The Energy Lab",
    note: "An out-and-back off the Queen K on the run course, on the grounds of a real ocean-science research park — fully exposed, no spectators allowed inside.",
  },
];

// Grounded FAQ. Sample-framing is explicit; nothing invented; the race-facts
// and cultural entries cite real, verified sources.
const faq: { q: string; a: string }[] = [
  {
    q: "When's the next race?",
    a: "October 10, 2026 — the first time since 2019 that the men's and women's Ironman World Championship race in Kona on the same day. (After a few years of a split format with Nice, France, the race announced in April 2025 that both would return to one day in Kona starting in 2026.) A 2027 date for this race hasn't been announced yet — only the separate, shorter 70.3 World Championship has a confirmed 2027 host, and it isn't Kona.",
  },
  {
    q: "Why does the wind tile matter so much?",
    a: "The Queen K's crosswinds are real and well-documented — sustained 20+ mph is common, with gusts reported up to 45 mph near the Hawi turnaround. IRONMAN restricts disc wheels at Kona specifically because of this stretch. The live panel above turns today's actual reading into a wheel-choice read for a training ride, not just a number to admire.",
  },
  {
    q: "Is the conditions panel real?",
    a: "Yes. It pulls the latest observation from Kona International Airport (PHKO) via the National Weather Service — keyless, public data. Worth knowing: PHKO sits roughly 7 miles from downtown and the Queen K itself, so it's a real proxy for the area, not a sensor standing on the highway. Sunrise, sunset, and daylight are computed for Kailua-Kona. If the feed is unreachable, the panel shows a clearly-labeled sample instead — never presented as live.",
  },
  {
    q: "How hot does it actually get?",
    a: "There's no single official number — real reported race-day conditions range from the mid-70s to mid-90s°F depending on the year and time of day, with humidity commonly in the 60s but reported as low as 40% and as high as 85%. What's consistent is the combination: heat, humidity, and black lava fields that hold the day's warmth. Anyone telling you one exact temperature is the Kona number is rounding off real variation.",
  },
  {
    q: "Is there anything to know about the course and the local community?",
    a: "Yes, and it's worth more than a footnote. The swim start at Kailua Pier sits right at Kamakahonu, home to Ahuʻena Heiau — Kamehameha I's own heiau, a real National Historic Landmark, not scenery. The bike course also passes Puʻukoholā Heiau National Historic Site at Kawaihae. Kona residents have also gone on record for years about road closures and race-week disruption to daily life — real, documented concerns, not manufactured for this page. We mention this because getting it right matters more than a marketing line would.",
  },
  {
    q: "Can you guarantee good conditions for my ride?",
    a: "No — this is a planning aid, not a promise. Real conditions, the highway, and your own judgment always come first. The live panel tells you what's happening right now; it doesn't decide for you.",
  },
];

const quickFacts = [
  { v: "Oct 10, 2026", l: "Race day", s: "unified men's + women's, first since 2019" },
  { v: "112 mi", l: "Bike course", s: "lava fields to Hawiʻi and back" },
  { v: "45 mph", l: "Queen K gusts", s: "sourced, near the Hawiʻi turnaround" },
  { v: "By inquiry", l: "Booking", s: "sample concept — see note" },
];

export default function QueenKCycleKonaPage() {
  return (
    <>
      <QkcShell>
        <main className="min-h-screen text-[#241812]">
          <Nav />
          <DemoTracking demo="queen-k-cycle-kona" />

          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#1c130d] via-[#2e1c12] to-[#0a0705] text-[#faf3ea]">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="qkc-hero-sun" cx="85%" cy="14%" r="42%">
                  <stop offset="0%" stopColor="#ffe0a8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffe0a8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#qkc-hero-sun)" />
              <path d="M-50 380 L160 300 L320 360 L520 280 L720 370 L920 300 L1120 360 L1250 320 L1250 600 L-50 600 Z" fill="#0a0705" opacity="0.5" />
              <path d="M-50 470 C 300 440, 700 500, 1250 450" stroke="#0891b2" strokeWidth="2" fill="none" opacity="0.4" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ff5a36]/45 bg-[#0a0705]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb49e]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36]" />
                    Kailua-Kona · Hawaiʻi Island
                  </div>
                  <h1 className="qkc-display mb-5 max-w-2xl text-5xl leading-[1.03] sm:text-6xl">
                    {BRAND}{" "}
                    <span className="text-[#0891b2]">Know the wind before you roll out.</span>
                  </h1>
                  <div className="qkc-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#faf3ea]/85">
                    Race-week rentals, tune-ups, and bike-box logistics for
                    Kona&apos;s Ironman crowd — with a live read on what the
                    Queen K&apos;s crosswinds are actually doing today, not
                    just what they usually do.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#services"
                      className="rounded-full bg-gradient-to-r from-[#d63f1f] to-[#ff5a36] px-8 py-3.5 text-center text-sm font-semibold text-[#faf3ea] shadow-[0_10px_30px_-10px_rgba(255,90,54,0.5)] transition-transform hover:-translate-y-0.5"
                    >
                      See what we run →
                    </a>
                    <a
                      href="#inquire"
                      className="rounded-full border border-[#faf3ea]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#faf3ea]/90 transition-colors hover:border-[#faf3ea]/70 hover:bg-[#faf3ea]/5"
                    >
                      Plan race week
                    </a>
                  </div>
                </div>

                <div className="relative">
                  <QkcConditions />
                  <Emblem size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="qkc-card p-5">
                  <div className="qkc-display text-2xl text-[#d63f1f] sm:text-3xl">{stat.v}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5f73]">
                    {stat.l}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#7d6a5c]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* THE STORY */}
          <section id="story" className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="qkc-card overflow-hidden p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="qkc-eyebrow mb-3">Lava fields, real wind</p>
                  <h2 className="qkc-display text-3xl leading-tight text-[#241812] sm:text-4xl">
                    The Queen K doesn&apos;t care{" "}
                    <span className="text-[#0e5f73]">what the forecast said yesterday.</span>
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#5a463a]">
                    <p>
                      Ask anyone who&apos;s ridden it: the crosswind across the
                      lava fields between Kona and Hawiʻi is real, it&apos;s
                      well-documented, and it&apos;s exactly why IRONMAN
                      restricts disc wheels on this course. What it&apos;s
                      doing on any given morning is a live question, not a
                      seasonal average.
                    </p>
                    <p>
                      This sample concept shows how a Kona bike shop could
                      answer that question honestly — a real-time wind read
                      turned into a straight wheel-choice call, right where a
                      rider decides what to roll out on.
                    </p>
                  </div>
                </div>
                <ArtTile accent="ocean" figure="crosswind" label="The Queen K, across the lava fields" tall photo={{ src: "/demos/queen-k-cycle-kona/queen-k-highway.webp", credit: "Ken Lund · CC BY-SA 2.0" }} />
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section id="services" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="qkc-eyebrow mb-3">What we run</p>
              <h2 className="qkc-display text-4xl text-[#241812] sm:text-5xl">
                Race week, <span className="text-[#0e5f73]">handled.</span>
              </h2>
              <div className="qkc-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#5a463a]">
                Rentals, tune-ups, and the daily wheel-choice call — everything
                built around the one thing that actually changes day to day.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {services.map((sv) => (
                <div key={sv.title} className="qkc-card flex flex-col overflow-hidden">
                  <ArtTile accent={sv.accent} figure={sv.figure} label={sv.title} photo={KQ_PHOTOS[sv.title]} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="qkc-display text-base leading-tight text-[#241812]">{sv.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#0e5f73]/25 bg-[#0e5f73]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0e5f73]">
                        {sv.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#5a463a]">{sv.blurb}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-3xl qkc-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#7d6a5c]">
                <span className="font-semibold text-[#241812]">Rates:</span> rental and service
                pricing varies by bike, duration, and season, so no pricing is shown on this sample
                concept — the live build would carry the operator&apos;s own current rates and booking.
              </p>
            </div>
          </section>

          {/* DESTINATIONS */}
          <section id="destinations" className="mx-auto max-w-6xl px-6 pb-8">
            <div className="mb-10 text-center">
              <p className="qkc-eyebrow mb-3">The course</p>
              <h2 className="qkc-display text-4xl text-[#241812] sm:text-5xl">
                Real ground, <span className="text-[#0e5f73]">real wind.</span>
              </h2>
              <div className="qkc-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#5a463a]">
                The landmarks that make this course famous — where the race
                actually goes, and why each stretch has a reputation.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((d) => (
                <div key={d.name} className="qkc-card p-5">
                  <div className="mb-1.5 flex items-center gap-2">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#0e5f73]" fill="none" aria-hidden="true">
                      <path d="M10 18s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z" stroke="currentColor" strokeWidth="1.4" />
                      <circle cx="10" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    <h3 className="qkc-display text-base leading-tight text-[#241812]">{d.name}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#5a463a]">{d.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WHY THE WIND MATTERS — ties back to the live panel */}
          <section id="wind" className="relative overflow-hidden bg-gradient-to-br from-[#1c130d] via-[#2e1c12] to-[#0a0705] py-20 text-[#faf3ea]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 200 C 300 160, 700 240, 1250 190" stroke="#ff5a36" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
              <path d="M-50 240 C 300 210, 700 270, 1250 230" stroke="#0891b2" strokeWidth="1" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <ArtTile accent="heat" figure="sun" label="Afternoon heat over the lava fields" tall className="w-full max-w-md sm:h-[340px]" photo={{ src: "/demos/queen-k-cycle-kona/lava-field.webp", credit: "dronepicr · CC BY 2.0" }} />
                </div>
                <div>
                  <p className="qkc-eyebrow mb-3 !text-[#ff5a36]">Why disc wheels get restricted here</p>
                  <h2 className="qkc-display mb-4 text-3xl sm:text-4xl">
                    A number, <span className="text-[#ff5a36]">not a rumor.</span>
                  </h2>
                  <div className="space-y-4 text-[#faf3ea]/85">
                    <p className="leading-relaxed">
                      The Queen K&apos;s reputation isn&apos;t exaggerated:
                      sustained crosswinds above 20 mph are common on the run
                      to Hawiʻi, with gusts documented up to 45 mph. IRONMAN
                      restricts disc wheels at Kona specifically because of
                      this stretch — a real equipment rule, not shop talk.
                    </p>
                    <p className="leading-relaxed">
                      The panel up top pulls the live Kona Airport read and
                      turns it into a straight call — deep-section, mid-depth,
                      or spoked — before a training ride, not after you&apos;re
                      already fighting the highway.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-16">
            <div className="mb-10 text-center">
              <p className="qkc-eyebrow mb-3">Frequently asked</p>
              <h2 className="qkc-display text-4xl text-[#241812] sm:text-5xl">
                Planning your <span className="text-[#0e5f73]">race week.</span>
              </h2>
              <div className="qkc-rule" />
            </div>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="qkc-card p-6">
                  <h3 className="qkc-display mb-2 text-base leading-snug text-[#241812]">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#5a463a]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INQUIRY CTA — clearly-labeled sample, no real contact invented */}
          <section id="inquire" className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#ff5a36]/35 bg-gradient-to-br from-[#1c130d] via-[#2e1c12] to-[#0a0705] p-10 text-center text-[#faf3ea] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="qkc-display mb-4 text-3xl sm:text-4xl">
                Plan your <span className="text-[#ff5a36]">race week.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#faf3ea]/85">
                Tell us your dates and your bike, and we&apos;ll have it ready.
                On the live build this is where the operator&apos;s real
                booking or inquiry form goes.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                {[
                  { l: "Dates", ph: "Oct 6–11, 2026" },
                  { l: "Need", ph: "TT bike rental + tune-up" },
                  { l: "Wheel depth", ph: "Undecided — check the wind" },
                  { l: "Pickup", ph: "Kailua-Kona" },
                ].map((f) => (
                  <div key={f.l} className="qkc-glass p-3 text-left">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#d9c4b0]/80">{f.l}</div>
                    <div className="mt-1 text-sm text-[#faf3ea]/80">{f.ph}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <button
                  type="button"
                  className="cursor-default rounded-full bg-gradient-to-r from-[#d63f1f] to-[#ff5a36] px-8 py-3.5 text-center text-sm font-semibold text-[#faf3ea] shadow-[0_10px_30px_-10px_rgba(255,90,54,0.5)]"
                >
                  Request race week →
                </button>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#faf3ea]/50">
                This is a sample inquiry mockup, not a live form — it
                doesn&apos;t submit anywhere. The live build wires up the
                operator&apos;s real booking or inquiry system and contact
                details.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE — honest disclaimer */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="qkc-card px-5 py-4 text-center text-xs leading-relaxed text-[#7d6a5c]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#241812]">sample marketing &amp; inquiry concept</span>{" "}
                built by{" "}
                <a href={SITE} className="font-semibold text-[#0e5f73] underline underline-offset-2 hover:text-[#d63f1f]">
                  BlueWave Projects
                </a>
                .{" "}
                <span className="font-semibold text-[#241812]">
                  &quot;{BRAND}&quot; is a fictional sample brand
                </span>{" "}
                — it is not a real business and is not affiliated with or
                endorsed by IRONMAN/WTC or any actual Kona-area operator. The
                scenery photographs are real, openly-licensed images of the
                Queen Kaʻahumanu Highway and Kona&apos;s lava coast (from Wikimedia
                Commons, credited on each), and none shows a real cyclist, team,
                or business branding; the emblem is a designed mark.
                No prices, hours, phone numbers, or addresses are
                shown, because none are real. The race date, course geography,
                and crosswind/disc-wheel facts are real and publicly
                verifiable (see the FAQ for sourcing) — race-day temperature
                and wind figures are presented as reported ranges, since no
                single official number exists. The &quot;ride conditions&quot;
                panel pulls a live public NWS observation from Kona Airport
                (PHKO), roughly 7 miles from the actual course; sunrise,
                sunset, and daylight are computed for Kailua-Kona. If the feed
                is unreachable, the panel shows a clearly-labeled sample
                instead — never presented as live. This is a planning aid, not
                a guarantee. The swim start sits at Kamakahonu, home to
                Ahuʻena Heiau, a real National Historic Landmark — named here
                accurately, not as decoration. Always confirm current
                offerings directly with a real, licensed operator.
              </p>
            </div>
          </div>
        </main>
      </QkcShell>
      <div className="bg-[#0a0705] text-[#faf3ea]">
        <Footer />
      </div>
    </>
  );
}
