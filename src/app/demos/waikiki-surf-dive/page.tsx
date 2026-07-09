import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import {
  ReefShell,
  Emblem,
  ArtTile,
  WaikikiConditions,
  SITE,
  HUB_PATH,
  type WsdAccent,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders.
export const metadata: Metadata = {
  title: "Waikiki Surf & Dive Co. — Learn to Surf & Dive Waikiki, with Live Surf Conditions (Sample Demo)",
  description:
    "A guest-facing sample for a Waikiki surf school & dive shop: beginner surf lessons at Canoes and Queens, boat dives from the honu-filled Turtle Canyon reef to the Waikiki wrecks, and a live South-Shore surf, water-temp, tide, and UV panel. Built reef-safe and mālama-first. A clearly-labeled sample concept by BlueWave Projects on public geography and live public data — a fictional brand, not affiliated with any real operator.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED DATA (research 2026-07-09)
// ---------------------------------------------------------------------------
// "Waikiki Surf & Dive Co." is a DELIBERATELY FICTIONAL sample brand (most real
// Waikiki operators already run online booking, so a real-name demo would
// misrepresent them; and house rule bars real client data on a public sample).
// Everything factual below — surf breaks, dive sites and their depths/levels,
// reef-safe law, honu distance — is real and publicly verified. NO real
// operator name, price, time, phone, or address appears. Examples use public
// landmarks (Kūhiō Beach, Kalākaua Ave, Diamond Head, Kewalo Basin).

const BRAND = "Waikiki Surf & Dive Co.";

type Item = {
  title: string;
  accent: WsdAccent;
  figure: "wave" | "board" | "turtle" | "reef" | "diamondhead" | "palm";
  blurb: string;
  tag: string;
};

const surfItems: Item[] = [
  {
    title: "First-timers at Canoes & Queens",
    accent: "lagoon",
    figure: "board",
    blurb:
      "The gentle, forgiving rollers off Kūhiō Beach — Canoes and Queens — are where Waikiki has taught people to surf for a century. Long, slow waves, a sandy-bottom paddle-out, and Diamond Head over your shoulder.",
    tag: "Beginner",
  },
  {
    title: "Longboard & SUP sessions",
    accent: "aqua",
    figure: "wave",
    blurb:
      "Step up to trimming a longboard down the line or standing tall on a SUP. The South Shore's summer swells are made for the classic Waikiki glide.",
    tag: "All levels",
  },
  {
    title: "Move out to Populars & Threes",
    accent: "coral",
    figure: "wave",
    blurb:
      "Ready for a real wave? Populars (\"Pops\") is a mellow step out on smaller days; Threes is a proper intermediate peak when the south swell fills in. We paddle out when you're ready — not before.",
    tag: "Intermediate",
  },
];

const diveItems: Item[] = [
  {
    title: "Turtle Canyon reef",
    accent: "palm",
    figure: "turtle",
    blurb:
      "A shallow, sunlit reef off Waikiki (roughly 15–40 ft) where green sea turtles — honu — glide in to clean. The easiest, most magical intro dive or snorkel on the South Shore.",
    tag: "Beginner",
  },
  {
    title: "Kewalo reef dives",
    accent: "lagoon",
    figure: "reef",
    blurb:
      "Shallow reef and ledges just off Kewalo Basin, thick with reef fish, eels, and the occasional white-tip resting under a shelf. A friendly two-tank boat morning for newer divers.",
    tag: "Beginner–intermediate",
  },
  {
    title: "The Waikiki wrecks",
    accent: "night",
    figure: "diamondhead",
    blurb:
      "The YO-257 and San Pedro sit upright on the sand about 100 ft down off Waikiki — a Naval yard oiler and its neighbor, now an artificial reef swirling with fish. A deep dive for certified, comfortable divers.",
    tag: "Advanced",
  },
  {
    title: "Sea Tiger wreck",
    accent: "night",
    figure: "diamondhead",
    blurb:
      "A 168-ft ship resting near 110–120 ft off Honolulu — one of Hawaii's largest accessible wrecks, with eagle rays and big schools. Advanced, deep, and unforgettable. [confirm current charter]",
    tag: "Advanced · deep",
  },
];

const malama = [
  {
    t: "Reef-safe only",
    d: "Hawaii was the first US state to ban the sale of sunscreen with oxybenzone and octinoxate (effective 2021). We're mineral-sunscreen only, and we'll help you find the right reef-safe one.",
  },
  {
    t: "Ten feet from honu",
    d: "Green sea turtles are protected. NOAA asks everyone to stay at least 10 feet away, in the water and on the sand — we watch, we don't touch, and we never chase.",
  },
  {
    t: "Mālama i ke kai",
    d: "Care for the ocean. No standing on coral, nothing left behind, nothing taken but pictures. The reef feeds this island — we treat it like it's ours to keep.",
  },
];

const faq: { q: string; a: string }[] = [
  {
    q: "I've never surfed — can I really learn in one lesson?",
    a: "Most first-timers stand up on their first day at Canoes or Queens. The waves there are slow and forgiving, the water's warm, and the paddle-out is short. You bring a swimsuit and a good attitude; the ocean does the rest.",
  },
  {
    q: "Do I need to be a strong swimmer?",
    a: "You should be comfortable in the water and able to swim, but you don't need to be an athlete. For surf lessons the inside breaks are shallow and mellow; for diving, comfort in the water matters more than speed.",
  },
  {
    q: "What will I see on a dive?",
    a: "On the shallow reefs (Turtle Canyon, Kewalo) — honu, reef fish, eels, and coral in clear warm water. On the wrecks — the YO-257, San Pedro, and Sea Tiger draw big schools, rays, and the occasional shark cruising by. The deep wrecks are for certified, comfortable divers.",
  },
  {
    q: "Is the conditions panel on this page real?",
    a: "Yes. Surf is the PacIOOS SWAN South-Shore wave model (a modeled nowcast); water temperature and tide are live NOAA readings for Honolulu; wind and air are the latest Honolulu Airport (PHNL) observation; UV is the EPA hourly forecast for Waikiki; sunrise and sunset are computed. There is no public live feed for underwater visibility, so we don't show a number — ask us for today's report.",
  },
  {
    q: "What should I bring — and is sunscreen an issue?",
    a: "Swimsuit, a towel, and reef-safe (mineral) sunscreen. Hawaii law restricts the reef-harming kind, and we're mineral-only on the boat and in the water — we'll help you sort it out if you're not sure.",
  },
];

const quickFacts = [
  { v: "Kūhiō Beach", l: "Surf lessons", s: "Canoes & Queens" },
  { v: "Turtle Canyon", l: "Beginner dive", s: "honu on the reef" },
  { v: "~100 ft", l: "Waikiki wrecks", s: "YO-257 & San Pedro" },
  { v: "Reef-safe", l: "How we run", s: "mālama i ke kai" },
];

export default function WaikikiSurfDivePage() {
  return (
    <>
      <ReefShell>
        <main className="min-h-screen text-[#0f333a]">
          <Nav />
          <DemoTracking demo="waikiki-surf-dive" />

          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0a4a54] via-[#12909e] to-[#052e38] text-[#f4fbfa]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <radialGradient id="wsd-hero-sun" cx="86%" cy="16%" r="44%">
                  <stop offset="0%" stopColor="#ffe6a8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffe6a8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#wsd-hero-sun)" />
              {/* Diamond Head silhouette */}
              <path d="M-50 470 L250 470 L470 360 L620 420 L820 470 L1250 470 L1250 600 L-50 600 Z" fill="#052e38" opacity="0.3" />
              {/* rolling swell lines */}
              <path d="M-50 500 C 300 470, 700 540, 1250 490" stroke="#d8f3f2" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
              <path d="M-50 540 C 300 510, 700 570, 1250 520" stroke="#d8f3f2" strokeWidth="1" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ffcf5c]/45 bg-[#052e38]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffe1a0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff6f5e]" />
                    Waikiki · Oʻahu, Hawaiʻi
                  </div>
                  <h1 className="wsd-display mb-5 max-w-2xl text-5xl font-bold leading-[1.02] sm:text-6xl">
                    {BRAND.replace(" Co.", "")}{" "}
                    <span className="text-[#ff6f5e]">Co.</span>
                  </h1>
                  <div className="wsd-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#f4fbfa]/85">
                    Learn to surf where surfing was born, and dive from the
                    honu-filled reefs to the wrecks off Waikiki — with a live
                    read on the South Shore before you ever get wet. Reef-safe,
                    mālama-first, all levels welcome.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a href="#surf" className="rounded-full bg-gradient-to-r from-[#ff6f5e] to-[#ffcf5c] px-8 py-3.5 text-center text-sm font-semibold text-[#052e38] shadow-[0_10px_30px_-10px_rgba(255,111,94,0.6)] transition-transform hover:-translate-y-0.5">
                      Surf &amp; dive with us →
                    </a>
                    <a href="#malama" className="rounded-full border border-[#f4fbfa]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f4fbfa]/90 transition-colors hover:border-[#f4fbfa]/70 hover:bg-[#f4fbfa]/5">
                      How we mālama
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — the showpiece */}
                <div className="relative">
                  <WaikikiConditions />
                  <Emblem size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="wsd-card p-5">
                  <div className="wsd-display text-2xl font-bold text-[#e14b3d] sm:text-3xl">{stat.v}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#12909e]">{stat.l}</div>
                  <div className="mt-1 text-xs leading-relaxed text-[#6d7f7c]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* STORY */}
          <section className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="wsd-card overflow-hidden p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="wsd-eyebrow mb-3">Where surfing was born</p>
                  <h2 className="wsd-display text-3xl font-bold leading-tight text-[#0f333a] sm:text-4xl">
                    Two ways to know{" "}
                    <span className="text-[#e14b3d]">the same ocean.</span>
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3c5b60]">
                    <p>
                      Waikiki is where Duke Kahanamoku carried surfing to the
                      world, and the gentle waves off Kūhiō Beach are still the
                      best classroom on earth. On the surface you learn to ride;
                      a few fin-kicks down you meet the reef — honu on the sand
                      flats, and steel wrecks a hundred feet down that the fish
                      have made their own.
                    </p>
                    <p>
                      This sample concept shows how one Waikiki operator could
                      hold both — surf and dive — in one clear place, with a
                      live South-Shore conditions read and reef-first values
                      built into every trip.
                    </p>
                  </div>
                </div>
                <ArtTile accent="lagoon" figure="diamondhead" label="Diamond Head over the South Shore" tall />
              </div>
            </div>
          </section>

          {/* SURF */}
          <section id="surf" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="wsd-eyebrow mb-3">On the water</p>
              <h2 className="wsd-display text-4xl font-bold text-[#0f333a] sm:text-5xl">
                Learn to <span className="text-[#e14b3d]">surf.</span>
              </h2>
              <div className="wsd-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3c5b60]">
                From your very first wave at Canoes to trimming down the line at
                Threes — we paddle out when you&apos;re ready.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {surfItems.map((it) => (
                <div key={it.title} className="wsd-card flex flex-col overflow-hidden">
                  <ArtTile accent={it.accent} figure={it.figure} label={it.title} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="wsd-display text-lg font-semibold leading-tight text-[#0f333a]">{it.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#12909e]/20 bg-[#12909e]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#12909e]">
                        {it.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3c5b60]">{it.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DIVE */}
          <section id="dive" className="mx-auto max-w-6xl px-6 pb-8">
            <div className="mb-12 text-center">
              <p className="wsd-eyebrow mb-3">Below the surface</p>
              <h2 className="wsd-display text-4xl font-bold text-[#0f333a] sm:text-5xl">
                Dive the <span className="text-[#e14b3d]">South Shore.</span>
              </h2>
              <div className="wsd-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3c5b60]">
                Boats leave from Kewalo Basin for reefs and wrecks — from an easy
                honu snorkel to a hundred-foot wreck dive.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {diveItems.map((it) => (
                <div key={it.title} className="wsd-card flex flex-col overflow-hidden">
                  <ArtTile accent={it.accent} figure={it.figure} label={it.title} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="wsd-display text-base font-semibold leading-tight text-[#0f333a]">{it.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#12909e]/20 bg-[#12909e]/8 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#12909e]">
                        {it.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3c5b60]">{it.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-8 max-w-3xl wsd-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#6d7f7c]">
                <span className="font-semibold text-[#0f333a]">Certification &amp; depth:</span> the
                shallow reefs suit new and snorkel-only guests; the wrecks are deep dives for
                certified, comfortable divers. No pricing or schedule is shown on this sample concept —
                the live build would carry the operator&apos;s own certifications, trips, and booking.
              </p>
            </div>
          </section>

          {/* MĀLAMA */}
          <section id="malama" className="relative overflow-hidden bg-gradient-to-br from-[#0a4a54] via-[#12909e] to-[#052e38] py-20 text-[#f4fbfa]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#d8f3f2" strokeWidth="1.2" fill="none" strokeDasharray="3 10" />
              <path d="M-50 290 C 300 255, 700 320, 1250 265" stroke="#d8f3f2" strokeWidth="0.8" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="mb-10 text-center">
                <p className="wsd-eyebrow mb-3 !text-[#ffcf5c]">Mālama i ke kai</p>
                <h2 className="wsd-display text-3xl font-bold sm:text-4xl">
                  Care for the ocean, <span className="text-[#ffcf5c]">and it cares for us.</span>
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {malama.map((m) => (
                  <div key={m.t} className="rounded-2xl border border-[#d8f3f2]/15 bg-[#052e38]/30 p-6 backdrop-blur-sm">
                    <h3 className="wsd-display mb-2 text-lg font-semibold text-[#f4fbfa]">{m.t}</h3>
                    <p className="text-sm leading-relaxed text-[#f4fbfa]/80">{m.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-16">
            <div className="mb-10 text-center">
              <p className="wsd-eyebrow mb-3">Frequently asked</p>
              <h2 className="wsd-display text-4xl font-bold text-[#0f333a] sm:text-5xl">
                Before you <span className="text-[#e14b3d]">paddle out.</span>
              </h2>
              <div className="wsd-rule" />
            </div>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="wsd-card p-6">
                  <h3 className="wsd-display mb-2 text-base font-semibold leading-snug text-[#0f333a]">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#3c5b60]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INQUIRY CTA */}
          <section id="book" className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#ffcf5c]/40 bg-gradient-to-br from-[#0a4a54] via-[#12909e] to-[#052e38] p-10 text-center text-[#f4fbfa] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="wsd-display mb-4 text-3xl font-bold sm:text-4xl">
                Book your <span className="text-[#ffcf5c]">session.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#f4fbfa]/85">
                Tell us surf or dive, your level, and your day — we&apos;ll match
                you to the right break or site and the right tide. On the live
                build this is where the operator&apos;s real booking goes.
              </p>
              <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                {[
                  { l: "Surf or dive", ph: "First surf lesson" },
                  { l: "Level", ph: "Never surfed" },
                  { l: "Day", ph: "Jul 2026, morning" },
                  { l: "Party", ph: "2 adults" },
                ].map((f) => (
                  <div key={f.l} className="rounded-2xl border border-[#d8f3f2]/15 bg-[#052e38]/30 p-3 text-left backdrop-blur-sm">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bfeef0]/70">{f.l}</div>
                    <div className="mt-1 text-sm text-[#f4fbfa]/80">{f.ph}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <button type="button" className="cursor-default rounded-full bg-gradient-to-r from-[#ff6f5e] to-[#ffcf5c] px-8 py-3.5 text-sm font-semibold text-[#052e38] shadow-[0_10px_30px_-10px_rgba(255,111,94,0.6)]">
                  Request a session →
                </button>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#f4fbfa]/50">
                This is a sample inquiry mockup, not a live form — it doesn&apos;t
                submit anywhere. The live build wires up the operator&apos;s real
                booking system and contact details.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="wsd-card px-5 py-4 text-center text-xs leading-relaxed text-[#6d7f7c]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#0f333a]">sample marketing &amp; inquiry concept</span>{" "}
                built by{" "}
                <a href={SITE} className="font-semibold text-[#e14b3d] underline underline-offset-2 hover:text-[#12909e]">
                  BlueWave Projects
                </a>
                .{" "}
                <span className="font-semibold text-[#0f333a]">&quot;{BRAND}&quot; is a fictional sample brand</span>{" "}
                — not a real business, and not affiliated with or endorsed by any actual Waikiki
                operator. All imagery is designed sample illustration, not photography. No prices,
                schedules, phone numbers, or addresses are shown, because none are real; the surf
                breaks, dive sites and their depths/levels, the reef-safe sunscreen law, and the honu
                distance are real and publicly verifiable. The &quot;Surf &amp; sea&quot; panel pulls
                live public data — the PacIOOS SWAN South-Shore wave model (a modeled nowcast, not a
                buoy), NOAA water temperature and tide for Honolulu, the latest Honolulu Airport (PHNL)
                observation, and the EPA hourly UV forecast; sunrise and sunset are computed. There is
                no public live feed for underwater visibility, so none is shown or invented. It is a
                planning aid, not a substitute for lifeguards or a licensed operator&apos;s own call.
                Always confirm current trips, conditions, certification requirements, and rates with a
                real, licensed operator before booking.
              </p>
            </div>
          </div>
        </main>
      </ReefShell>
      {/* Footer OUTSIDE <ReefShell>: shell paints a light sand canvas; the site
          Footer is styled for dark backgrounds — rendered here on deep lagoon it
          reads correctly. */}
      <div className="bg-[#052e38] text-[#f4fbfa]">
        <Footer />
      </div>
    </>
  );
}
