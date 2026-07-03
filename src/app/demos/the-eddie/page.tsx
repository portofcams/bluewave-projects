import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  EddieShell,
  MemorialMark,
  WaveArt,
  SITE,
  HUB_PATH,
  type WaveAccent,
  type PhotoSrc,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. This metadata block keeps the
// sample out of bluewaveprojects.com's index — a memorial page should never be
// crawled as if it were an official Eddie Aikau Foundation property.
export const metadata: Metadata = {
  title: "The Eddie — Eddie Aikau Big Wave Invitational, Waimea Bay (Information Hub Sample)",
  description:
    "A reverent information hub about The Eddie — the Eddie Aikau Big Wave Invitational at Waimea Bay, Oahu — held only when the surf reaches the 20-foot Hawaiian-scale threshold. The story of Eddie Aikau and the Hokule'a, the meaning of 'Eddie Would Go,' the event's rare history, and how it is experienced at Waimea. A sample built by BlueWave Projects on public information.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED DATA — only vetted facts from the brief. Every unconfirmed detail
// carries [confirm]; nothing is invented.
// ---------------------------------------------------------------------------

// The 11 known runnings are not individually enumerated here (only a few are
// publicly detailed in the brief). We show the runnings we can state accurately.
type Running = {
  year: string;
  note: string;
  accent: WaveAccent;
  figure: "wave" | "surfer" | "canoe" | "bay";
  // Optional license-clean Waimea / North Shore big-wave SCENERY photo (Wikimedia
  // Commons; see /public/demos/eddie/CREDITS.md). NOT a photo of the actual event
  // or its competitors — generic North Shore surf scenery, honestly labeled.
  photo?: PhotoSrc;
};

const runnings: Running[] = [
  {
    year: "2023",
    note:
      "Ran January 22, 2023. Won by Luke Shepardson, an Oahu North Shore lifeguard who competed on his work break — the 10th person ever to win The Eddie. Women competed in the event for the first time.",
    accent: "dawn",
    figure: "surfer",
    photo: {
      src: "/demos/eddie/north-shore-wave2.webp",
      credit: "Stan Shebs · CC BY-SA 3.0",
      position: "center 45%",
    },
  },
  {
    year: "2024",
    note:
      "The most recent running, held December 22, 2024. Won by Landon McNamara.",
    accent: "wall",
    figure: "wave",
    photo: {
      src: "/demos/eddie/north-shore-wave.webp",
      credit: "Stan Shebs · CC BY-SA 3.0",
      position: "center 40%",
    },
  },
];

// Practical guidance for experiencing it at Waimea — grounded, landmark-based,
// no invented logistics.
const experience = [
  {
    t: "It is free — there are no tickets",
    d: "The Eddie is free to watch from Waimea Bay. There is no ticket gate. When the event is called, tens of thousands of people make their way to the North Shore to witness it from the beach, the bluffs, and along the highway.",
  },
  {
    t: "Expect crowds, and plan for them",
    d: "A running of The Eddie draws enormous crowds to a two-lane stretch of the North Shore. Traffic and parking fill early [confirm]. Arrive well ahead of light, carry water and sun protection, and be ready for a long, patient day.",
  },
  {
    t: "Respect Waimea, the lifeguards, and the ocean",
    d: "Waimea Bay is a place of great power and deep meaning. Heed every posted warning and every lifeguard. On a 20-foot Hawaiian-scale day the shorebreak and currents are dangerous even from the sand. Give the water the respect it demands.",
  },
];

export default function TheEddiePage() {
  return (
    // Page-local "Waimea big-wave" theme: cool pale-sand canvas, deep-Pacific
    // blue ink, dawn-gold accents, Fraunces display serif. Everything scoped
    // under <EddieShell> (.eddie-hub) — no globals.css / tailwind.config /
    // shared components touched, so the rest of the site is unchanged.
    <>
      <EddieShell>
      <main className="min-h-screen text-[#0a2135]">
        <Nav />

        {/* HERO — a deep-Pacific band over a real, license-clean Waimea / North
            Shore big-surf photo (Wikimedia Commons; see CREDITS.md), held under a
            deep dark scrim that keeps the reverent palette + full legibility. */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#08243d] via-[#0d3a5c] to-[#04121f] text-[#eef5fa]">
          {/* real hero background photo (license-clean scenery — NOT the event) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/demos/eddie/hero-waimea.webp"
            alt="Waimea Bay, North Shore of Oahu, on a big-surf day — sample scenery photo"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 55%" }}
          />
          {/* deep-Pacific scrim over the photo — keeps text fully legible */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#08243d]/92 via-[#0d3a5c]/86 to-[#04121f]/95" />
          <div className="pointer-events-none absolute inset-0 bg-[#04121f]/30" />
          {/* on-image hero credit */}
          <span className="absolute right-3 top-20 z-10 rounded-full bg-[#04121f]/50 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#eef5fa]/70 backdrop-blur-sm">
            Waimea Bay · S. Hedin · CC BY-SA 3.0
          </span>
          {/* towering wave face + cold-dawn glow */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.20]"
            viewBox="0 0 1200 620"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="hero-dawn" cx="80%" cy="14%" r="46%">
                <stop offset="0%" stopColor="#ffe9c2" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ffe9c2" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="hero-face" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="#3a86b8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#04121f" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <rect width="1200" height="620" fill="url(#hero-dawn)" />
            {/* the big wave */}
            <path
              d="M-50 620 L-50 470 C 180 460, 360 430, 500 340 C 620 262, 760 180, 960 176 C 1110 172, 1220 240, 1260 320 L1260 620 Z"
              fill="url(#hero-face)"
            />
            <path d="M500 340 C 620 262, 760 180, 960 176" stroke="#eef5fa" strokeWidth="1.8" fill="none" opacity="0.5" />
            <path d="M-50 300 C 300 250, 600 340, 900 290 S 1250 250, 1300 300" stroke="#bcd9ea" strokeWidth="1.3" fill="none" opacity="0.5" />
          </svg>

          <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-32 text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#e6b062]/45 bg-[#04121f]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f0cd93]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e6b062]" />
              Waimea Bay · North Shore, Oahu
            </div>
            <h1 className="eddie-display mx-auto mb-6 max-w-3xl text-5xl font-bold leading-[1.04] sm:text-6xl">
              The Eddie
            </h1>
            <p className="eddie-quote mx-auto mb-6 max-w-2xl text-xl leading-relaxed text-[#eef5fa]/90">
              The Eddie Aikau Big Wave Invitational, held at Waimea Bay in memory
              of a Native Hawaiian waterman and lifeguard — an event that runs
              only when the ocean is willing.
            </p>
            <div className="eddie-rule mx-auto mb-8" />
            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#bcd9ea]">
              Nobody sets its date. It is held only when open-ocean swells sustain
              a minimum of 20 feet on the Hawaiian scale — and so, most years, it
              does not run at all. As the North Shore says of it:{" "}
              <span className="eddie-quote font-medium text-[#f0cd93]">
                the Bay calls the day.
              </span>
            </p>
          </div>
        </section>

        {/* WHAT THE EDDIE IS + the 20-foot threshold */}
        <section id="what" className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="eddie-eyebrow mb-3">What it is</p>
            <h2 className="eddie-display text-4xl font-bold text-[#0a2135] sm:text-5xl">
              An invitation the ocean has to approve.
            </h2>
            <div className="eddie-rule" />
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4 text-[#39536b]">
              <p className="leading-relaxed">
                Its full name is the{" "}
                <span className="font-semibold text-[#0a2135]">
                  Rip Curl Eddie Aikau Big Wave Invitational in Memory of Eddie
                  Aikau
                </span>{" "}
                — most people simply call it{" "}
                <span className="font-semibold text-[#0a2135]">The Eddie</span>.
                It is an invitational big-wave surf event at Waimea Bay on the
                North Shore of Oahu, and around forty of the world&apos;s finest
                big-wave surfers, plus alternates, are invited to take part.
              </p>
              <p className="leading-relaxed">
                What makes it unlike any other contest is that it will only run
                when the surf is genuinely giant. The requirement is open-ocean
                swells that sustain a minimum of{" "}
                <span className="font-semibold text-[#0a2135]">
                  20 feet on the Hawaiian scale
                </span>{" "}
                — which translates to wave faces of roughly 30 to 40 feet inside
                the bay. Conditions like that are rare, so The Eddie does not run
                in most years. When the forecast is right, the call goes out, and
                Waimea fills.
              </p>
              <p className="leading-relaxed">
                First held in the 1984–85 season — it began at Sunset Beach before
                moving to Waimea — The Eddie has run only{" "}
                <span className="font-semibold text-[#0a2135]">
                  11 times in roughly forty years
                </span>
                . In 2023, women competed in the event for the first time.
              </p>
            </div>

            <div className="eddie-card p-7 text-center">
              <p className="eddie-eyebrow mb-3">The threshold</p>
              <div className="eddie-display text-5xl font-bold text-[#0d3a5c]">
                20 ft
              </div>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#39536b]">
                Hawaiian scale, sustained
              </p>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-[#6b7d8c]">
                Roughly 30–40 foot wave faces in the bay. Below it, the event
                waits. This is why The Eddie is measured in decades, not seasons —
                it has run only{" "}
                <span className="font-semibold text-[#0d3a5c]">11 times</span>.
              </p>
            </div>
          </div>
        </section>

        {/* THE STORY OF EDDIE AIKAU + HOKULE'A + "EDDIE WOULD GO" */}
        <section
          id="eddie"
          className="relative overflow-hidden bg-gradient-to-br from-[#08243d] via-[#0d3a5c] to-[#04121f] py-20 text-[#eef5fa]"
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
            viewBox="0 0 1200 500"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path d="M-50 250 C 300 200, 600 300, 900 250 S 1250 200, 1300 250" stroke="#eef5fa" strokeWidth="1.4" fill="none" />
            <path d="M-50 340 C 300 290, 600 390, 900 340 S 1250 290, 1300 340" stroke="#bcd9ea" strokeWidth="1.1" fill="none" />
          </svg>

          <div className="relative mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <p className="eddie-eyebrow mb-3 !text-[#f0cd93]">The man it honors</p>
              <h2 className="eddie-display text-4xl font-bold sm:text-5xl">
                Eddie Aikau, <span className="text-[#e6b062]">1946–1978.</span>
              </h2>
              <div className="eddie-rule" />
            </div>

            <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex justify-center lg:justify-start">
                <MemorialMark size={210} />
              </div>

              <div className="space-y-4 text-[#eef5fa]/85">
                <p className="leading-relaxed">
                  Eddie Aikau was a Native Hawaiian waterman, born in 1946. In
                  1968 he became the first official lifeguard at Waimea Bay. Over
                  the years he is credited with saving hundreds of lives — and it
                  is said that he never lost anyone at Waimea, no matter how big
                  the surf. He was also a celebrated big-wave surfer, at home in
                  the very water that turned others away.
                </p>
                <p className="leading-relaxed">
                  In 1978, Eddie joined the crew of the{" "}
                  <span className="font-semibold text-[#eef5fa]">Hōkūleʻa</span> —
                  the Polynesian Voyaging Society&apos;s double-hulled voyaging
                  canoe — on a voyage bound for Tahiti. The canoe capsized in the
                  Molokaʻi Channel. Eddie set out alone on his surfboard to paddle
                  for help. The rest of the crew was later rescued. Eddie was
                  never found, and was lost at sea; his body was never recovered.
                </p>

                <div className="mt-6 rounded-2xl border border-[#e6b062]/35 bg-[#04121f]/35 p-6">
                  <p className="eddie-display text-2xl font-semibold text-[#f0cd93]">
                    &ldquo;Eddie Would Go.&rdquo;
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#eef5fa]/80">
                    These three words are a memorial to Eddie&apos;s
                    fearlessness — his willingness to go, into giant surf or to
                    the aid of another, when others would not. On the North Shore
                    they are spoken with reverence. They are not a slogan. They
                    are a way of remembering how one man lived, and how he was
                    lost: going for others.
                  </p>
                </div>
              </div>
            </div>

            {/* an honest illustration of the Hokule'a — abstract, no depicted people */}
            <div className="mt-12">
              <WaveArt
                accent="night"
                figure="canoe"
                tall
                label="Hōkūleʻa — the Polynesian Voyaging Society's double-hulled voyaging canoe"
              />
            </div>
          </div>
        </section>

        {/* THE WAITING PERIOD */}
        <section id="waiting" className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="eddie-eyebrow mb-3">The holding period</p>
            <h2 className="eddie-display text-4xl font-bold text-[#0a2135] sm:text-5xl">
              A window, not a date.
            </h2>
            <div className="eddie-rule" />
            <p className="mx-auto mt-4 max-w-2xl text-[#39536b]">
              The Eddie has no fixed contest day. Each season opens with a
              ceremony and a waiting period; within that window, organizers watch
              the forecast and call the event only if the swell reaches the
              threshold. If it never does, the season passes without a running.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="eddie-card p-6">
              <p className="eddie-eyebrow mb-3 !text-[#c9853a]">Reference · 2025–26</p>
              <h3 className="eddie-display mb-2 text-lg font-semibold text-[#0a2135]">
                The most recent window
              </h3>
              <p className="text-sm leading-relaxed text-[#39536b]">
                For the 2025–26 season, Rip Curl returned as title sponsor. The
                opening ceremony was held on December 5, 2025, and the waiting
                period ran from December 7, 2025 through March 6, 2026. That
                window has since closed.
              </p>
            </div>

            <div className="eddie-card p-6">
              <p className="eddie-eyebrow mb-3 !text-[#c9853a]">The pattern</p>
              <h3 className="eddie-display mb-2 text-lg font-semibold text-[#0a2135]">
                Historically, winter
              </h3>
              <p className="text-sm leading-relaxed text-[#39536b]">
                Historically the waiting period opens in early December and runs
                into late February or March — the heart of the North Shore&apos;s
                big-wave season, when the largest North Pacific swells arrive.
              </p>
            </div>

            <div className="eddie-card p-6">
              <p className="eddie-eyebrow mb-3 !text-[#c9853a]">2026–27</p>
              <h3 className="eddie-display mb-2 text-lg font-semibold text-[#0a2135]">
                Not yet announced
              </h3>
              <p className="text-sm leading-relaxed text-[#39536b]">
                The 2026–27 season had not been announced as of mid-2026.{" "}
                <span className="rounded bg-[#0d3a5c]/8 px-1 py-0.5 font-mono text-[13px] text-[#c9853a]">
                  dates [confirm]
                </span>{" "}
                — check the official Eddie Aikau Foundation channels for this
                season&apos;s ceremony and holding-period dates.
              </p>
            </div>
          </div>
        </section>

        {/* HISTORY OF RUNNINGS */}
        <section id="history" className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="eddie-eyebrow mb-3">The history</p>
            <h2 className="eddie-display text-4xl font-bold text-[#0a2135] sm:text-5xl">
              Only about eleven times.
            </h2>
            <div className="eddie-rule" />
            <p className="mx-auto mt-4 max-w-2xl text-[#39536b]">
              In roughly forty years, the ocean has met the mark only about eleven
              times. Each running is remembered. These are the two most recent,
              stated only as far as the public record confirms.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {runnings.map((r) => (
              <div key={r.year} className="eddie-card flex flex-col overflow-hidden">
                <WaveArt
                  accent={r.accent}
                  figure={r.figure}
                  photo={r.photo}
                  label={`North Shore · big-wave season`}
                  className="rounded-b-none border-0"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="eddie-display mb-2 text-2xl font-bold text-[#0d3a5c]">
                    {r.year}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#39536b]">{r.note}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-[#6b7d8c]">
            The full list of runnings spans the event&apos;s history since the
            1984–85 season. Earlier years and champions are part of that record;
            they are not enumerated here to avoid stating any date or name that
            is not fully confirmed. Items marked{" "}
            <span className="rounded bg-[#0d3a5c]/8 px-1 py-0.5 font-mono text-[#c9853a]">
              [confirm]
            </span>{" "}
            are details not fully verified in this sample.
          </p>
        </section>

        {/* HOW TO EXPERIENCE IT AT WAIMEA */}
        <section id="experience" className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="eddie-eyebrow mb-3">If the call comes</p>
            <h2 className="eddie-display text-4xl font-bold text-[#0a2135] sm:text-5xl">
              Witnessing it at Waimea.
            </h2>
            <div className="eddie-rule" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {experience.map((c) => (
              <div key={c.t} className="eddie-card p-6">
                <h3 className="eddie-display mb-2 text-lg font-semibold text-[#0a2135]">
                  {c.t}
                </h3>
                <p className="text-sm leading-relaxed text-[#39536b]">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <WaveArt
              accent="dawn"
              figure="bay"
              tall
              photo={{
                src: "/demos/eddie/north-shore-surfer.webp",
                credit: "André Fleckenstein · CC BY-SA 4.0",
                position: "center 35%",
              }}
              label="The North Shore — free to watch from the beach, the bluffs, and the highway"
            />
          </div>
        </section>

        {/* THE FOUNDATION + THE AIKAU FAMILY */}
        <section
          id="foundation"
          className="relative overflow-hidden bg-gradient-to-br from-[#08243d] via-[#0d3a5c] to-[#04121f] py-20 text-[#eef5fa]"
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path d="M-50 200 C 300 160, 600 240, 900 200 S 1250 160, 1300 200" stroke="#eef5fa" strokeWidth="1.4" fill="none" />
            <path d="M-50 280 C 300 240, 600 320, 900 280 S 1250 240, 1300 280" stroke="#bcd9ea" strokeWidth="1.1" fill="none" />
          </svg>

          <div className="relative mx-auto max-w-4xl px-6">
            <div className="mb-10 text-center">
              <p className="eddie-eyebrow mb-3 !text-[#f0cd93]">Caretakers</p>
              <h2 className="eddie-display text-4xl font-bold sm:text-5xl">
                The Foundation &amp; the Aikau family.
              </h2>
              <div className="eddie-rule" />
            </div>

            <div className="space-y-5 text-[#eef5fa]/85">
              <p className="leading-relaxed">
                The Eddie is organized by the{" "}
                <span className="font-semibold text-[#eef5fa]">
                  Eddie Aikau Foundation
                </span>
                , led by its president, Linda Ipsen. The title sponsor for the
                2025–26 season was Rip Curl; sponsorship has changed over the
                event&apos;s history, having previously been held by Quiksilver.
              </p>
              <p className="leading-relaxed">
                The Aikau family are ancestral caretakers of Waimea Valley,
                stewarded today through Waimea Valley — Hiʻipaka LLC. Their
                connection to this place runs far deeper than any single event.
              </p>
              <p className="leading-relaxed">
                <span className="font-semibold text-[#eef5fa]">Clyde Aikau</span>,
                Eddie&apos;s brother, was himself a great big-wave surfer — he won
                The Eddie in 1986 — and for many years he led the opening ceremony
                and the paddle-out that begin the event. Clyde passed away in May
                2025. He is remembered with love and respect, and this hub notes
                his passing with the dignity it deserves.
              </p>
            </div>
          </div>
        </section>

        {/* INFORMATIONAL SIGN-OFF — not a buy-CTA */}
        <section className="mx-auto max-w-4xl px-6 pb-20 pt-16">
          <div className="relative overflow-hidden rounded-3xl border border-[#e6b062]/40 bg-gradient-to-br from-[#08243d] via-[#0d3a5c] to-[#04121f] p-10 text-center text-[#eef5fa] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            <MemorialMark size={96} className="mx-auto mb-6" />
            <h2 className="eddie-display mb-4 text-3xl font-bold sm:text-4xl">
              When the Bay calls the day.
            </h2>
            <p className="mx-auto max-w-2xl leading-relaxed text-[#eef5fa]/85">
              The Eddie belongs to Waimea, to the Aikau family, and to the memory
              of a man who gave everything for others. It cannot be scheduled and
              it cannot be rushed — it waits, as he would have, for the ocean to
              be ready. For this season&apos;s ceremony and holding-period dates,
              follow the official Eddie Aikau Foundation channels. Mālama i ke kai
              — care for the sea.
            </p>
          </div>
        </section>

        {/* SAMPLE NOTE — honest disclaimer */}
        <div className="mx-auto max-w-4xl px-6 pb-12">
          <div className="eddie-card px-5 py-4 text-center text-xs leading-relaxed text-[#6b7d8c]">
            <p>
              This is a{" "}
              <span className="font-semibold text-[#0a2135]">
                sample information hub
              </span>{" "}
              built by{" "}
              <a
                href={SITE}
                className="font-semibold text-[#c9853a] underline underline-offset-2 hover:text-[#e6b062]"
              >
                BlueWave Projects
              </a>{" "}
              on publicly available information, and is offered with respect for
              Eddie Aikau, the Aikau family, and Waimea Bay. The photographs shown
              are{" "}
              <span className="font-semibold text-[#0a2135]">
                license-clean Waimea Bay, North Shore, and big-wave scenery
              </span>{" "}
              from Wikimedia Commons — used only as samples, credited on-image and
              in{" "}
              <span className="font-mono text-[13px] text-[#c9853a]">
                CREDITS.md
              </span>
              : Waimea Bay by Steve Hedin (CC BY-SA 3.0), North Shore surf by Stan
              Shebs (CC BY-SA 3.0), and a North Shore surfer by André Fleckenstein
              (CC BY-SA 4.0). No image depicts Eddie Aikau, the Aikau family, the
              actual Eddie Aikau Invitational, or its competitors — those moments
              keep{" "}
              <span className="font-semibold text-[#0a2135]">
                designed illustration
              </span>{" "}
              out of respect. A real build would use the organization&apos;s own
              or licensed photography. Details marked{" "}
              <span className="rounded bg-[#0d3a5c]/8 px-1 py-0.5 font-mono text-[#c9853a]">
                [confirm]
              </span>{" "}
              are not fully verified in this sample and should be checked against
              official sources. This page is not affiliated with or endorsed by
              the Eddie Aikau Foundation, the Aikau family, or Rip Curl.
            </p>
          </div>
        </div>

      </main>
      </EddieShell>
      {/* Footer lives OUTSIDE <EddieShell>: the shell paints a pale warm-sand
          canvas, and the site Footer is styled for dark backgrounds (white-alpha
          text with no background of its own) — inside the shell its text washed
          out to invisible. Rendered here on a deep-Pacific abyss surface it reads
          correctly, matching the palette. */}
      <div className="bg-[#04121f] text-[#eef5fa]">
        <Footer />
      </div>
    </>
  );
}
