import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import {
  AuroraShell,
  Emblem,
  ArtTile,
  AuroraConditions,
  SITE,
  HUB_PATH,
  type AuAccent,
  type AuPhoto,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders so the proof
// never pollutes bluewaveprojects.com's index.
export const metadata: Metadata = {
  title: "Tanana Ridge Aurora Co. — Fairbanks, Alaska Aurora Tours & Live Space-Weather Conditions (Sample Demo)",
  description:
    "A guest-facing marketing and inquiry sample for a Fairbanks, Alaska aurora-viewing tour operator: nightly chase tours to Cleary Summit, Murphy Dome, and the Chatanika area, photography sessions, and multi-night packages — with a live NOAA space-weather panel that honestly gates the geomagnetic forecast on real darkness, not just a Kp number. A clearly-labeled sample concept built by BlueWave Projects on public geography and live public data. Fictional brand; not affiliated with any real operator.",
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
// "Tanana Ridge Aurora Co." is a DELIBERATELY FICTIONAL sample brand. Research
// (2026-07-10) found every prominent real Fairbanks-area aurora operator
// (Chena Hot Springs Resort, Borealis Basecamp, Aurora Pointe, and several
// chase-tour companies) already runs a real, professional booking site, so a
// real-name demo would misrepresent them — consistent with this portfolio's
// other operator demos. Everything factual below — geography, coordinates,
// the season window, and the darkness mechanics — is real and publicly
// verified. NO real operator's name, prices, departure times, phone, or email
// appear anywhere. No pricing is invented. The real, verified gap this sample
// fills: across ~20 real operator sites reviewed, NONE display live
// aurora/space-weather data on their own page — every one sends visitors
// elsewhere (a UAF forecast link, or nothing at all) for the numbers that
// actually decide whether tonight is worth going out for.

const BRAND = "Tanana Ridge Aurora Co.";

type Service = {
  title: string;
  accent: AuAccent;
  figure: "aurora" | "cabin" | "dome" | "hotsprings" | "stars" | "moose";
  blurb: string;
  tag: string;
};

// Real, openly-licensed interior-Alaska aurora / winter photos keyed by tile title.
const AU_PHOTOS: Record<string, AuPhoto> = {
  "Nightly chase tours": { src: "/demos/aurora-fairbanks/boreal-aurora.webp", credit: "NPS / Tim Rains · Public domain" },
  "Photography sessions": { src: "/demos/aurora-fairbanks/chena-hot-springs.webp", credit: "Carl Chapman · CC BY-SA 2.0" },
  "Multi-night packages": { src: "/demos/aurora-fairbanks/cabin-aurora.webp", credit: "Lisa Hupp / USFWS · Public domain" },
  "Private & custom charters": { src: "/demos/aurora-fairbanks/moose-snow.webp", credit: "BLM / Shawn Swanson · Public domain" },
};

const services: Service[] = [
  {
    title: "Nightly chase tours",
    accent: "green",
    figure: "aurora",
    blurb:
      "Small-group drive-outs routed and timed to that night's real conditions — not a fixed stop, but wherever the darkness window and the forecast actually line up.",
    tag: "Signature",
  },
  {
    title: "Photography sessions",
    accent: "violet",
    figure: "stars",
    blurb:
      "A longer stay at one dark-sky spot with camera and tripod set-up help — built for people who want the shot, not just the glance.",
    tag: "Photography",
  },
  {
    title: "Multi-night packages",
    accent: "navy",
    figure: "cabin",
    blurb:
      "The aurora is never a sure thing on any single night. A multi-night package plans two or three outings across your stay, which is how most visitors actually see it.",
    tag: "Best odds",
  },
  {
    title: "Private & custom charters",
    accent: "green",
    figure: "moose",
    blurb:
      "Your own vehicle and schedule — family groups, photographers who want full control, or a trip built around one specific clear night.",
    tag: "Custom",
  },
];

// Real destinations around Fairbanks (geography only — no operator specifics).
type Dest = { name: string; note: string };
const destinations: Dest[] = [
  {
    name: "Cleary Summit",
    note: "~20 miles north on the Steese Highway, 2,233 ft — often cited as the premier viewing spot near Fairbanks.",
  },
  {
    name: "Murphy Dome",
    note: "~20 miles WNW, nearly 2,900 ft — the summit locals mention first.",
  },
  {
    name: "Chatanika",
    note: "~28 miles north, a gold-rush-era community that's also home to UAF's Poker Flat Research Range — a real aurora-science rocket facility.",
  },
  {
    name: "In town (Fairbanks / UAF)",
    note: "The aurora is visible from town too — city lights just mute it. A few miles out changes everything.",
  },
];

// Grounded FAQ. Sample-framing is explicit; nothing operator-specific invented.
const faq: { q: string; a: string }[] = [
  {
    q: "How does a chase tour work?",
    a: "We pick you up in Fairbanks and drive out to wherever the night's real conditions point — often Cleary Summit, Murphy Dome, or the Chatanika area — then wait and watch, typically from evening into the early morning hours. (This is a sample concept, so no specific pickup times or route are shown — the live build would carry the operator's real logistics.)",
  },
  {
    q: "Where do we meet?",
    a: "In Fairbanks, with the exact meeting point confirmed at booking. (Sample concept — no address, phone, or contact is shown, because none are real. The live build would carry the operator's own details.)",
  },
  {
    q: "When's the season — and why does the panel above sometimes say it's too bright to see it?",
    a: "Fairbanks' aurora season runs roughly August 21 to April 21, per the University of Alaska Fairbanks Geophysical Institute — because for weeks around the summer solstice the sky here never gets fully dark, no matter how active the aurora gets. The live panel computes that darkness window itself, from real solar geometry for Fairbanks, rather than a fixed calendar date — so in the middle of summer it will honestly say the sky isn't dark enough yet, even on a night with real geomagnetic activity.",
  },
  {
    q: "Is the conditions panel real?",
    a: "Yes. Geomagnetic activity and aurora probability are live from NOAA's Space Weather Prediction Center; sky conditions are the latest Fairbanks Airport (PAFA) observation from the National Weather Service; darkness is computed live from real solar geometry for Fairbanks (nautical twilight, not just sunset). If a feed is unreachable, that block shows a clearly-labeled sample instead — never presented as live. It's a planning aid, not a guarantee.",
  },
  {
    q: "Can you guarantee we'll see it?",
    a: "No — and it's worth real skepticism toward any operator who says otherwise. The aurora is a natural phenomenon; even on a strong, active, clear, dark night, nothing is certain. Staying multiple nights meaningfully improves the odds, which is the honest reason multi-night packages exist.",
  },
  {
    q: "Is there cultural significance to the aurora here?",
    a: 'Yes, and it deserves more respect than a tourist page can really give it. The University of Alaska Fairbanks Geophysical Institute has documented Iñupiat aurora knowledge — including the word Kiuġuyat for the northern lights — through a project pairing elders with scientists; one recorded sentiment from that work is "when the northern lights are bright and strong, the ancestors are happy." Traditions vary across Alaska Native communities and across generations — this is one documented perspective, not a single unified legend — and the deeper, better source is Alaska Native voices themselves, not a tour operator\'s website.',
  },
];

const quickFacts = [
  { v: "Aug 21 – Apr 21", l: "Season", s: "per UAF Geophysical Institute" },
  { v: "~20 mi", l: "To dark sky", s: "Cleary Summit & Murphy Dome" },
  { v: "3+ nights", l: "Best odds", s: "clear, moonless skies help most" },
  { v: "By inquiry", l: "Booking", s: "sample concept — see note" },
];

export default function AuroraFairbanksPage() {
  return (
    <>
      <AuroraShell>
        <main className="min-h-screen text-[#0d1330]">
          <Nav />
          <DemoTracking demo="aurora-fairbanks" />

          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1330] via-[#15224a] to-[#05070f] text-[#eaf0ff]">
            {/* night sky + aurora ribbon texture */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22]"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              {[
                [60, 40], [160, 70], [260, 30], [360, 80], [460, 44], [560, 66],
                [680, 34], [780, 72], [880, 46], [980, 60], [1080, 32], [1150, 78],
                [40, 130], [300, 120], [620, 140], [900, 110], [1120, 150],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={i % 4 === 0 ? 2 : 1.3} fill="#eaf0ff" opacity={0.4 + (i % 5) * 0.1} />
              ))}
              <path d="M-50 200 C 250 100, 550 260, 850 130 C 1000 70, 1150 150, 1250 110" stroke="#3fe6a4" strokeWidth="16" fill="none" strokeLinecap="round" opacity="0.4" />
              <path d="M-50 250 C 250 160, 550 310, 850 190 C 1000 140, 1150 210, 1250 170" stroke="#a06bff" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.32" />
              <path d="M-50 470 C 300 410, 700 510, 1250 450" stroke="#05070f" strokeWidth="1.4" fill="none" opacity="0" />
              {/* far mountain silhouette */}
              <path d="M-50 380 L160 270 L320 350 L520 250 L720 360 L920 270 L1120 350 L1250 300 L1250 600 L-50 600 Z" fill="#05070f" opacity="0.45" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#a06bff]/45 bg-[#05070f]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d3bdff]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a06bff]" />
                    Fairbanks, Alaska · Aurora tours
                  </div>
                  <h1 className="aur-display mb-5 max-w-2xl text-5xl font-bold leading-[1.03] sm:text-6xl">
                    {BRAND}{" "}
                    <span className="text-[#3fe6a4]">The nights that are actually dark enough.</span>
                  </h1>
                  <div className="aur-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#eaf0ff]/85">
                    Small-group chase tours out of Fairbanks to Cleary Summit,
                    Murphy Dome, and the Chatanika area — routed and timed by
                    real conditions, not a fixed nightly schedule. A storm
                    being active is only half the story; the sky has to be
                    dark enough to see it.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#services"
                      className="rounded-full bg-gradient-to-r from-[#3fe6a4] to-[#a06bff] px-8 py-3.5 text-center text-sm font-semibold text-[#05070f] shadow-[0_10px_30px_-10px_rgba(160,107,255,0.5)] transition-transform hover:-translate-y-0.5"
                    >
                      See what we run →
                    </a>
                    <a
                      href="#inquire"
                      className="rounded-full border border-[#eaf0ff]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#eaf0ff]/90 transition-colors hover:border-[#eaf0ff]/70 hover:bg-[#eaf0ff]/5"
                    >
                      Plan a chase
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — the showpiece */}
                <div className="relative">
                  <AuroraConditions />
                  <Emblem size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="aur-card p-5">
                  <div className="aur-display text-2xl font-bold text-[#6f3fd6] sm:text-3xl">
                    {stat.v}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1f9d6e]">
                    {stat.l}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#6b7494]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* THE STORY */}
          <section id="story" className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="aur-card overflow-hidden p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="aur-eyebrow mb-3">Under the auroral oval</p>
                  <h2 className="aur-display text-3xl font-bold leading-tight text-[#0d1330] sm:text-4xl">
                    A real storm still needs{" "}
                    <span className="text-[#6f3fd6]">a real dark sky.</span>
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3c4570]">
                    <p>
                      Fairbanks sits far enough north to be under the auroral
                      oval most nights of its season — but a geomagnetic storm
                      being underway doesn&apos;t mean anyone can actually see
                      it. It also has to be dark, and reasonably clear. Most
                      aurora sites print the Kp number and stop there.
                    </p>
                    <p>
                      This sample concept shows how a Fairbanks chase-tour
                      operator could present the whole picture in one place —
                      the real geomagnetic forecast, the sky, and the actual
                      darkness window computed for tonight, not assumed from a
                      calendar.
                    </p>
                  </div>
                </div>
                <ArtTile
                  accent="green"
                  figure="dome"
                  label="Murphy Dome, above the Fairbanks light dome"
                  tall
                  photo={{ src: "/demos/aurora-fairbanks/bear-lake-aurora.webp", credit: "Joshua Strang / U.S. Air Force · Public domain" }}
                />
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section id="services" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="aur-eyebrow mb-3">What we run</p>
              <h2 className="aur-display text-4xl font-bold text-[#0d1330] sm:text-5xl">
                The <span className="text-[#6f3fd6]">chases.</span>
              </h2>
              <div className="aur-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3c4570]">
                Small-group and private tours, routed by conditions — not a
                fixed nightly stop.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((sv) => (
                <div key={sv.title} className="aur-card flex flex-col overflow-hidden">
                  <ArtTile
                    accent={sv.accent}
                    figure={sv.figure}
                    label={sv.title}
                    photo={AU_PHOTOS[sv.title]}
                    className="rounded-b-none border-0"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="aur-display text-lg font-semibold leading-tight text-[#0d1330]">
                        {sv.title}
                      </h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#1f9d6e]/25 bg-[#3fe6a4]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1f9d6e]">
                        {sv.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3c4570]">{sv.blurb}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Honest note: no online pricing on a sample */}
            <div className="mx-auto mt-8 max-w-3xl aur-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#6b7494]">
                <span className="font-semibold text-[#0d1330]">Rates:</span> aurora-tour
                pricing varies widely by group size, season, and add-ons, so no
                pricing is shown on this sample concept — the live build would
                carry the operator&apos;s own current rates and booking.
              </p>
            </div>
          </section>

          {/* DESTINATIONS */}
          <section id="destinations" className="mx-auto max-w-6xl px-6 pb-8">
            <div className="mb-10 text-center">
              <p className="aur-eyebrow mb-3">Where we go</p>
              <h2 className="aur-display text-4xl font-bold text-[#0d1330] sm:text-5xl">
                Out past the <span className="text-[#6f3fd6]">light dome.</span>
              </h2>
              <div className="aur-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3c4570]">
                Real dark-sky spots around Fairbanks — the ridges and valleys
                where the show actually gets good.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((d) => (
                <div key={d.name} className="aur-card p-5">
                  <div className="mb-1.5 flex items-center gap-2">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#6f3fd6]" fill="none" aria-hidden="true">
                      <path d="M10 18s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z" stroke="currentColor" strokeWidth="1.4" />
                      <circle cx="10" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    <h3 className="aur-display text-base font-semibold leading-tight text-[#0d1330]">
                      {d.name}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#3c4570]">{d.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WHY DARKNESS MATTERS — ties back to the live panel */}
          <section id="darkness" className="relative overflow-hidden bg-gradient-to-br from-[#0b1330] via-[#15224a] to-[#05070f] py-20 text-[#eaf0ff]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 220 C 300 160, 700 260, 1250 190" stroke="#3fe6a4" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.5" />
              <path d="M-50 260 C 300 210, 700 300, 1250 240" stroke="#a06bff" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.4" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <ArtTile
                    accent="violet"
                    figure="stars"
                    label="Chatanika, near UAF's Poker Flat Research Range"
                    tall
                    className="w-full max-w-md sm:h-[340px]"
                    photo={{ src: "/demos/aurora-fairbanks/fairbanks-aurora.webp", credit: "Brocken Inaglory · CC BY-SA 3.0" }}
                  />
                </div>
                <div>
                  <p className="aur-eyebrow mb-3 !text-[#3fe6a4]">The gap most aurora sites don&apos;t show</p>
                  <h2 className="aur-display mb-4 text-3xl font-bold sm:text-4xl">
                    The storm isn&apos;t the whole <span className="text-[#3fe6a4]">forecast.</span>
                  </h2>
                  <div className="space-y-4 text-[#eaf0ff]/85">
                    <p className="leading-relaxed">
                      For weeks around the summer solstice, Fairbanks
                      doesn&apos;t reach real darkness at all — the sky stays
                      too bright to see the aurora no matter how active it
                      gets. That&apos;s why the season runs roughly August 21
                      to April 21, per the University of Alaska Fairbanks
                      Geophysical Institute.
                    </p>
                    <p className="leading-relaxed">
                      The panel up top computes that darkness window live,
                      from actual solar geometry for Fairbanks — nautical
                      twilight, the point a bright aurora actually becomes
                      visible, not just sunset — so it can honestly say
                      &quot;not dark enough yet&quot; even on a night the raw
                      Kp number looks exciting. Combined with the sky
                      conditions, that&apos;s the real answer to &quot;should
                      we go out tonight,&quot; not just the storm alone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-16">
            <div className="mb-10 text-center">
              <p className="aur-eyebrow mb-3">Frequently asked</p>
              <h2 className="aur-display text-4xl font-bold text-[#0d1330] sm:text-5xl">
                Planning your <span className="text-[#6f3fd6]">night out.</span>
              </h2>
              <div className="aur-rule" />
            </div>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="aur-card p-6">
                  <h3 className="aur-display mb-2 text-base font-semibold leading-snug text-[#0d1330]">
                    {f.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3c4570]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INQUIRY CTA — clearly-labeled sample, no real contact invented */}
          <section id="inquire" className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#a06bff]/40 bg-gradient-to-br from-[#0b1330] via-[#15224a] to-[#05070f] p-10 text-center text-[#eaf0ff] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="aur-display mb-4 text-3xl font-bold sm:text-4xl">
                Plan a <span className="text-[#3fe6a4]">chase.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#eaf0ff]/85">
                Tell us your dates, and we&apos;ll build the nights around the
                real forecast. On the live build this is where the
                operator&apos;s real booking or inquiry form goes.
              </p>

              {/* sample inquiry mockup — visually complete, intentionally not wired up */}
              <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                {[
                  { l: "Dates", ph: "3 nights, Sep 2026" },
                  { l: "Party size", ph: "2 adults" },
                  { l: "Interest", ph: "Photography session" },
                  { l: "Pickup", ph: "Fairbanks hotel" },
                ].map((f) => (
                  <div key={f.l} className="aur-glass p-3 text-left">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9fb0d9]/80">
                      {f.l}
                    </div>
                    <div className="mt-1 text-sm text-[#eaf0ff]/80">{f.ph}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <button
                  type="button"
                  className="cursor-default rounded-full bg-gradient-to-r from-[#3fe6a4] to-[#a06bff] px-8 py-3.5 text-center text-sm font-semibold text-[#05070f] shadow-[0_10px_30px_-10px_rgba(160,107,255,0.5)]"
                >
                  Request a chase →
                </button>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#eaf0ff]/50">
                This is a sample inquiry mockup, not a live form — it
                doesn&apos;t submit anywhere. The live build wires up the
                operator&apos;s real booking or inquiry system and contact
                details.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE — honest disclaimer */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="aur-card px-5 py-4 text-center text-xs leading-relaxed text-[#6b7494]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#0d1330]">sample marketing &amp; inquiry concept</span>{" "}
                built by{" "}
                <a
                  href={SITE}
                  className="font-semibold text-[#6f3fd6] underline underline-offset-2 hover:text-[#1f9d6e]"
                >
                  BlueWave Projects
                </a>
                .{" "}
                <span className="font-semibold text-[#0d1330]">
                  &quot;{BRAND}&quot; is a fictional sample brand
                </span>{" "}
                — it is not a real business and is not affiliated with or
                endorsed by any actual Fairbanks-area aurora operator. The
                photographs are real, openly-licensed images of interior-Alaska
                aurora and winter scenery (from Wikimedia Commons, the U.S. Air
                Force, NPS, USFWS, and BLM, credited on each), and none shows a
                real operator or its branding; the emblem is a designed mark. A
                real build would use the operator&apos;s own branding and
                photos. No prices, departure times, phone numbers, or
                addresses are shown, because none are real. The geography,
                coordinates, and season window are real and publicly
                verifiable (see the FAQ for sourcing). The &quot;tonight&apos;s
                aurora chance&quot; panel pulls live public data — NOAA Space
                Weather Prediction Center planetary Kp index and OVATION
                aurora-probability model, and the latest Fairbanks Airport
                (PAFA, 64.8378°N 147.7164°W) observation from the National
                Weather Service; darkness is computed from real solar
                geometry (nautical twilight). If a feed is unreachable, the
                panel shows a clearly-labeled sample instead — never
                presented as live. It is a planning aid, not a guarantee —
                the aurora is a natural phenomenon and no one can honestly
                promise a sighting. Always confirm current offerings and
                availability directly with a real, licensed operator before
                booking.
              </p>
            </div>
          </div>
        </main>
      </AuroraShell>
      {/* Footer lives OUTSIDE <AuroraShell>: the shell paints a light canvas
          and the site Footer is styled for dark backgrounds — rendered here
          on a deep night surface it reads correctly. */}
      <div className="bg-[#05070f] text-[#eaf0ff]">
        <Footer />
      </div>
    </>
  );
}
