import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import { NorthShell, Emblem, ArtTile, NorthShoreConditions, SITE, HUB_PATH, type NsdAccent } from "./_shared";

export const metadata: Metadata = {
  title: "North Shore Dive Co. — Shore & Boat Diving, Haleʻiwa, with a Live Swell Report (Sample Demo)",
  description:
    "A guest-facing sample for a North Shore Oʻahu dive shop: summer shore dives at Shark's Cove and Three Tables, boat dives out of Haleʻiwa, and a live dive report built on the real Waimea buoy, the SWAN model, tide, wind, and UV — honest about the season. A clearly-labeled sample by BlueWave Projects on public geography and live public data, a fictional brand not affiliated with any real operator.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// "North Shore Dive Co." is a DELIBERATELY FICTIONAL sample brand. Everything
// factual below — dive sites, the Pūpūkea Marine Life Conservation District, the
// summer/winter season, the honu distance — is real and publicly verifiable. No
// real operator name, price, time, phone, or address appears. Landmarks only
// (Shark's Cove, Three Tables, Waimea Bay, Haleʻiwa Harbor).

const BRAND = "North Shore Dive Co.";

type Item = { title: string; accent: NsdAccent; figure: "wave" | "diver" | "turtle" | "reef" | "cliff" | "boat"; blurb: string; tag: string };

const diveItems: Item[] = [
  {
    title: "Shark's Cove (Pūpūkea)",
    accent: "ocean",
    figure: "reef",
    blurb:
      "In summer, the cove inside the Pūpūkea Marine Life Conservation District goes glassy — lava tubes, arches, and reef fish in easy, shallow water. One of the best shore dives in the state, half the year.",
    tag: "Summer · beginner",
  },
  {
    title: "Three Tables",
    accent: "kelp",
    figure: "turtle",
    blurb:
      "Three flat reef ledges just down the beach from the Cove, 15–35 ft, with honu, eels, and the occasional white-tip resting under a shelf. A gentle second dive on a calm summer day.",
    tag: "Summer · beginner",
  },
  {
    title: "Waimea Bay",
    accent: "aqua",
    figure: "cliff",
    blurb:
      "The winter big-wave arena becomes a calm summer snorkel-and-dive bay — the same water the buoy on this page is reading. We only go when the swell says yes.",
    tag: "Summer · all levels",
  },
  {
    title: "Haleʻiwa boat dives",
    accent: "night",
    figure: "boat",
    blurb:
      "When the shore sites are marginal, the boat runs offshore reefs and ledges out of Haleʻiwa Harbor — deeper structure, bigger fish, and a stable platform between dives.",
    tag: "Boat · certified",
  },
];

const courses: Item[] = [
  {
    title: "Discover Scuba",
    accent: "ocean",
    figure: "diver",
    blurb: "Never breathed underwater? A guided first dive in shallow, calm summer water — no certification, just a good briefing and one instructor per small group.",
    tag: "First timers",
  },
  {
    title: "Open Water certification",
    accent: "kelp",
    figure: "reef",
    blurb: "The full entry cert, taught on the North Shore's summer reefs — classroom, confined water, and open-water dives at the Cove and off the boat.",
    tag: "Get certified",
  },
  {
    title: "Guided shore dives",
    accent: "aqua",
    figure: "turtle",
    blurb: "Already certified? Skip the guesswork on conditions and entries — a local divemaster picks the right site for the day's swell and tide, and shows you the good stuff.",
    tag: "Certified",
  },
];

const malama = [
  { t: "It's a conservation district", d: "Shark's Cove and Three Tables sit in the Pūpūkea Marine Life Conservation District — no taking, no feeding, nothing moved. We look, we don't touch." },
  { t: "Ten feet from honu", d: "Green sea turtles are protected. NOAA asks everyone to stay at least 10 feet away, in the water and on the sand — we watch, we never chase." },
  { t: "Mālama i ke kai", d: "Care for the ocean. Reef-safe mineral sunscreen only, nothing left behind, nothing taken but pictures. The reef is why we're here." },
];

const faq: { q: string; a: string }[] = [
  {
    q: "Can I really dive the North Shore any time of year?",
    a: "Honestly, no — and any shop that says otherwise isn't leveling with you. The North Shore is a summer diving coast. From roughly late spring through early fall the shore sites are calm and clear; in winter the big groundswell that makes Pipeline and Waimea famous closes them out. We dive when the ocean says yes, and on winter days we run the boat offshore or point you south. The live report on this page shows exactly why.",
  },
  {
    q: "Is the dive report on this page real?",
    a: "Yes. The headline swell is the actual NDBC 51201 buoy in Waimea Bay — a real instrument in the water — with the PacIOOS SWAN nearshore model shown beside it. Water temperature is the buoy's own reading; tide is the live NOAA prediction for Haleʻiwa; wind and air are the latest Honolulu (PHNL) observation; UV is the EPA hourly forecast; sunrise and sunset are computed. There's no public live feed for underwater visibility, so we don't show a number — ask us for today's.",
  },
  {
    q: "I've never dived. Where do I start?",
    a: "Discover Scuba on a calm summer day at the Cove or Three Tables. Shallow, warm, forgiving water, a thorough briefing, and one instructor with a small group. If you love it, the Open Water cert picks up right where that leaves off.",
  },
  {
    q: "What will I see?",
    a: "Lava tubes and arches at Shark's Cove, honu cruising the flats at Three Tables, reef fish and eels everywhere, and — off the boat — deeper reefs with bigger schools and the occasional shark passing through. It's the North Shore; the ocean shows off.",
  },
];

const quickFacts = [
  { v: "Shark's Cove", l: "Summer shore dive", s: "in the MLCD" },
  { v: "Waimea buoy", l: "Live swell read", s: "NDBC 51201" },
  { v: "Summer season", l: "When we shore-dive", s: "winter closes out" },
  { v: "Reef-safe", l: "How we run", s: "mālama i ke kai" },
];

export default function NorthShoreDivePage() {
  return (
    <>
      <NorthShell>
        <main className="min-h-screen text-[#0c2a3a]">
          <Nav />
          <DemoTracking demo="north-shore-dive" />

          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2f4a] via-[#1f6f9e] to-[#05192b] text-[#eef7fb]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <radialGradient id="nsd-hero-sun" cx="86%" cy="16%" r="44%">
                  <stop offset="0%" stopColor="#ffe6a8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffe6a8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#nsd-hero-sun)" />
              <path d="M-50 470 L250 470 L470 360 L620 420 L820 470 L1250 470 L1250 600 L-50 600 Z" fill="#05192b" opacity="0.3" />
              <path d="M-50 500 C 300 470, 700 540, 1250 490" stroke="#d6ecf5" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
              <path d="M-50 540 C 300 510, 700 570, 1250 520" stroke="#d6ecf5" strokeWidth="1" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ffc24d]/45 bg-[#05192b]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffdd93]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#57b6d6]" />
                    Haleʻiwa · North Shore, Oʻahu
                  </div>
                  <h1 className="nsd-display mb-5 max-w-2xl text-5xl font-bold leading-[1.02] sm:text-6xl">
                    North Shore <span className="text-[#ffc24d]">Dive Co.</span>
                  </h1>
                  <div className="nsd-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#eef7fb]/85">
                    Shore dives at Shark&apos;s Cove, boat dives out of Haleʻiwa,
                    and the honesty to tell you when the ocean says no. We read the
                    Waimea buoy before every trip — and now, so can you.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a href="#dive" className="rounded-full bg-gradient-to-r from-[#57b6d6] to-[#ffc24d] px-8 py-3.5 text-center text-sm font-semibold text-[#05192b] shadow-[0_10px_30px_-10px_rgba(87,182,214,0.6)] transition-transform hover:-translate-y-0.5">
                      Dive with us →
                    </a>
                    <a href="#malama" className="rounded-full border border-[#eef7fb]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#eef7fb]/90 transition-colors hover:border-[#eef7fb]/70 hover:bg-[#eef7fb]/5">
                      How we mālama
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — the showpiece */}
                <div className="relative">
                  <NorthShoreConditions />
                  <Emblem size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="nsd-card p-5">
                  <div className="nsd-display text-2xl font-bold text-[#1f6f9e] sm:text-[1.7rem]">{stat.v}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2f7d6b]">{stat.l}</div>
                  <div className="mt-1 text-xs leading-relaxed text-[#6d8592]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* STORY */}
          <section className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="nsd-card overflow-hidden p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="nsd-eyebrow mb-3">Read the water first</p>
                  <h2 className="nsd-display text-3xl font-bold leading-tight text-[#0c2a3a] sm:text-4xl">
                    The same swell that <span className="text-[#e04b3d]">runs the winter</span> runs our season.
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#395a68]">
                    <p>
                      The North Shore is famous for the winter it can&apos;t be
                      dived — the groundswell that lights up Waimea and Pipeline.
                      The flip side is a summer most visitors never hear about:
                      the same coast goes glassy, and the reefs open up.
                    </p>
                    <p>
                      This sample concept shows how one North Shore operator could
                      put that honesty right on the page — the real Waimea buoy,
                      the model beside it, and a plain read on whether today is a
                      dive day. No overselling a closed-out coast.
                    </p>
                  </div>
                </div>
                <ArtTile accent="ocean" figure="cliff" label="Waimea Bay, summer-calm" tall />
              </div>
            </div>
          </section>

          {/* DIVE SITES */}
          <section id="dive" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="nsd-eyebrow mb-3">Below the surface</p>
              <h2 className="nsd-display text-4xl font-bold text-[#0c2a3a] sm:text-5xl">
                Where we <span className="text-[#e04b3d]">dive.</span>
              </h2>
              <div className="nsd-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#395a68]">
                Summer shore dives inside the conservation district, boat dives out
                of Haleʻiwa when it&apos;s right — we pick the site for the day&apos;s swell.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {diveItems.map((it) => (
                <div key={it.title} className="nsd-card flex flex-col overflow-hidden">
                  <ArtTile accent={it.accent} figure={it.figure} label={it.title} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="nsd-display text-base font-semibold leading-tight text-[#0c2a3a]">{it.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#1f6f9e]/20 bg-[#1f6f9e]/8 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#1f6f9e]">
                        {it.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#395a68]">{it.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* COURSES */}
          <section id="learn" className="mx-auto max-w-6xl px-6 pb-8">
            <div className="mb-12 text-center">
              <p className="nsd-eyebrow mb-3">On the tanks</p>
              <h2 className="nsd-display text-4xl font-bold text-[#0c2a3a] sm:text-5xl">
                Start, or go <span className="text-[#e04b3d]">deeper.</span>
              </h2>
              <div className="nsd-rule" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {courses.map((it) => (
                <div key={it.title} className="nsd-card flex flex-col overflow-hidden">
                  <ArtTile accent={it.accent} figure={it.figure} label={it.title} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="nsd-display text-lg font-semibold leading-tight text-[#0c2a3a]">{it.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#1f6f9e]/20 bg-[#1f6f9e]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1f6f9e]">
                        {it.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#395a68]">{it.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-8 max-w-3xl nsd-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#6d8592]">
                <span className="font-semibold text-[#0c2a3a]">Season &amp; certification:</span> shore
                diving is a summer activity here; winter groundswell closes the exposed sites and we run the
                boat or reschedule. No pricing or schedule is shown on this sample — the live build would
                carry the operator&apos;s real courses, certifications, and booking.
              </p>
            </div>
          </section>

          {/* MĀLAMA */}
          <section id="malama" className="relative overflow-hidden bg-gradient-to-br from-[#0b2f4a] via-[#1f6f9e] to-[#05192b] py-20 text-[#eef7fb]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#d6ecf5" strokeWidth="1.2" fill="none" strokeDasharray="3 10" />
              <path d="M-50 290 C 300 255, 700 320, 1250 265" stroke="#d6ecf5" strokeWidth="0.8" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="mb-10 text-center">
                <p className="nsd-eyebrow mb-3 !text-[#ffc24d]">Mālama i ke kai</p>
                <h2 className="nsd-display text-3xl font-bold sm:text-4xl">
                  It&apos;s a protected reef. <span className="text-[#ffc24d]">We treat it like one.</span>
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {malama.map((m) => (
                  <div key={m.t} className="rounded-2xl border border-[#d6ecf5]/15 bg-[#05192b]/30 p-6 backdrop-blur-sm">
                    <h3 className="nsd-display mb-2 text-lg font-semibold text-[#eef7fb]">{m.t}</h3>
                    <p className="text-sm leading-relaxed text-[#eef7fb]/80">{m.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-16">
            <div className="mb-10 text-center">
              <p className="nsd-eyebrow mb-3">Frequently asked</p>
              <h2 className="nsd-display text-4xl font-bold text-[#0c2a3a] sm:text-5xl">
                Before you <span className="text-[#e04b3d]">gear up.</span>
              </h2>
              <div className="nsd-rule" />
            </div>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="nsd-card p-6">
                  <h3 className="nsd-display mb-2 text-base font-semibold leading-snug text-[#0c2a3a]">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#395a68]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INQUIRY CTA */}
          <section id="book" className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#ffc24d]/40 bg-gradient-to-br from-[#0b2f4a] via-[#1f6f9e] to-[#05192b] p-10 text-center text-[#eef7fb] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="nsd-display mb-4 text-3xl font-bold sm:text-4xl">
                Book a <span className="text-[#ffc24d]">dive.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#eef7fb]/85">
                Tell us your level and your day — we&apos;ll read the swell and match
                you to the right site. On the live build this is where the
                operator&apos;s real booking goes.
              </p>
              <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                {[
                  { l: "Shore or boat", ph: "Shore dive" },
                  { l: "Level", ph: "Never dived" },
                  { l: "Day", ph: "Jul 2026, morning" },
                  { l: "Party", ph: "2 divers" },
                ].map((f) => (
                  <div key={f.l} className="rounded-2xl border border-[#d6ecf5]/15 bg-[#05192b]/30 p-3 text-left backdrop-blur-sm">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bfe6f2]/70">{f.l}</div>
                    <div className="mt-1 text-sm text-[#eef7fb]/80">{f.ph}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <button type="button" className="cursor-default rounded-full bg-gradient-to-r from-[#57b6d6] to-[#ffc24d] px-8 py-3.5 text-sm font-semibold text-[#05192b] shadow-[0_10px_30px_-10px_rgba(87,182,214,0.6)]">
                  Request a dive →
                </button>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#eef7fb]/50">
                This is a sample inquiry mockup, not a live form — it doesn&apos;t
                submit anywhere. The live build wires up the operator&apos;s real
                booking and contact details.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="nsd-card px-5 py-4 text-center text-xs leading-relaxed text-[#6d8592]">
              <p>
                This is a <span className="font-semibold text-[#0c2a3a]">sample marketing &amp; inquiry concept</span>{" "}
                built by{" "}
                <a href={SITE} className="font-semibold text-[#e04b3d] underline underline-offset-2 hover:text-[#1f6f9e]">BlueWave Projects</a>.{" "}
                <span className="font-semibold text-[#0c2a3a]">&quot;{BRAND}&quot; is a fictional sample brand</span>{" "}
                — not a real business, and not affiliated with or endorsed by any actual North Shore operator.
                All imagery is designed sample illustration, not photography. No prices, schedules, phone
                numbers, or addresses are shown, because none are real; the dive sites, the Pūpūkea Marine
                Life Conservation District, the summer/winter season, and the honu distance are real and
                publicly verifiable. The &quot;Dive report&quot; panel pulls live public data — the NDBC 51201
                Waimea Bay buoy, the PacIOOS SWAN nearshore model, NOAA tide for Haleʻiwa, the latest Honolulu
                (PHNL) observation, and the EPA hourly UV forecast; sunrise and sunset are computed. There is
                no public live feed for underwater visibility, so none is shown or invented. It is a planning
                aid, never a substitute for a licensed divemaster&apos;s own call. Always confirm current
                trips, conditions, and certification requirements with a real, licensed operator before booking.
              </p>
            </div>
          </div>
        </main>
      </NorthShell>
      <div className="bg-[#05192b] text-[#eef7fb]">
        <Footer />
      </div>
    </>
  );
}
