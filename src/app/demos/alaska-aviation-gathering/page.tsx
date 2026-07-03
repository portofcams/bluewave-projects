import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  SkyShell,
  Roundel,
  PhotoPlaceholder,
  GatheringConditions,
  SITE,
  HUB_PATH,
  type SkyAccent,
  type PhotoSrc,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders so the proof
// never pollutes bluewaveprojects.com's index.
export const metadata: Metadata = {
  title:
    "Great Alaska Aviation Gathering — Palmer Fly-In Info Hub (Sample)",
  description:
    "An information headquarters for the Great Alaska Aviation Gathering — Alaska's premier general-aviation event, hosted by the Alaska Airmen's Association in Palmer. What it is, what to see, flying in vs. driving in, the aircraft raffle, and a live 'flying in?' Palmer Muni (PAAQ) weather panel. A sample build by BlueWave Projects on public information.",
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
// Every recurring feature below is real per the brief's verified facts. Any
// 2027-specific detail not yet published (dates, this year's raffle aircraft)
// is marked "[confirm]" and nothing is invented.
type SeeItem = {
  title: string;
  accent: SkyAccent;
  figure: "highwing" | "float" | "prop" | "tent";
  blurb: string;
  tag: string;
  // Optional license-clean sample photo (Wikimedia Commons; see
  // /public/demos/aviation/CREDITS.md). Omitted where no fitting licensed photo
  // exists — that slot falls back to the honest designed SVG art.
  photo?: PhotoSrc;
};

const seeItems: SeeItem[] = [
  {
    title: "Exhibitors & vendor booths",
    accent: "steel",
    figure: "prop",
    blurb:
      "Rows of aviation exhibitors and vendors — avionics, aircraft, parts, gear, flight training, and services — fill the halls and grounds. It's the trade-show heart of the Gathering.",
    tag: "Trade show",
    // No license-clean generic trade-show photo that wouldn't risk
    // misrepresenting the event — keeps the honest SVG art.
  },
  {
    title: "Static aircraft displays",
    accent: "glacier",
    figure: "highwing",
    blurb:
      "Aircraft parked wingtip to wingtip for a close look — bush planes, floatplanes, warbirds, kit builds, and more. Walk the flight line and talk to the owners.",
    tag: "Flight line",
    photo: {
      src: "/demos/aviation/bush-plane-lake.webp",
      credit: "Brian A. Ridder · CC BY-SA 2.0",
      position: "center 55%",
    },
  },
  {
    title: "Safety & flying forums",
    accent: "sky",
    figure: "prop",
    blurb:
      "Seminars and forums on backcountry flying, weather, mountain and glacier ops, avionics, and staying safe in Alaska's demanding environment — the education core the Association is known for.",
    tag: "Seminars",
    // Forum/seminar slot — no license-clean photo, keeps the SVG art.
  },
  {
    title: "Show & Shine aircraft showcase",
    accent: "amber",
    figure: "float",
    blurb:
      "Owners polish up their pride and joy for the Show & Shine — a showcase of beautifully kept and creatively built aircraft. A favorite for photographers and dreamers alike.",
    tag: "Showcase",
    photo: {
      src: "/demos/aviation/super-cub.webp",
      credit: "Sir Mildred Pierce · CC BY 2.0",
      position: "center",
    },
  },
  {
    title: "Floatplanes & the seaplane scene",
    accent: "glacier",
    figure: "float",
    blurb:
      "Floatplanes are woven into Alaska aviation — from Lake Hood, the world's busiest seaplane base, to countless backcountry lakes. Their presence is part of what makes this event distinctly Alaskan.",
    tag: "On the water",
    photo: {
      src: "/demos/aviation/lake-hood.webp",
      credit: "Laura Alier · CC BY 4.0",
      position: "center 45%",
    },
  },
  {
    title: "Kids' activities",
    accent: "sunset",
    figure: "tent",
    blurb:
      "Hands-on activities aim to spark the next generation of Alaska aviators — the future pilots, mechanics, and dreamers who'll keep the north flying.",
    tag: "All ages",
    // Kids' activities — no identifiable-people photo used; keeps SVG art.
  },
];

// Quick "flying in vs. driving in" — grounded, no invented fees/links.
const gettingThere = [
  {
    n: "01",
    t: "Fly yourself in",
    d: "Many attendees fly in and become part of the show. Airport camping at Palmer Municipal (PAAQ) has long been part of the scene — pitch a tent by your airplane and stay for the weekend. Check the Association's current fly-in, parking, and camping details, PPR, and any NOTAMs before you go [confirm].",
  },
  {
    n: "02",
    t: "Drive up from Anchorage",
    d: "Palmer sits about a 45-minute drive north of Anchorage up the Glenn Highway, in the Matanuska-Susitna Valley. The event is at the Alaska State Fairgrounds and Palmer Municipal Airport. Plan for event-day traffic and parking.",
  },
  {
    n: "03",
    t: "Use the live panel up top",
    d: "The 'Flying in?' panel at the top of this page pulls current Palmer Muni (PAAQ) weather so you can gauge conditions before you launch or drive. It's a preflight glance — never your only brief. Always get a full official weather briefing before you fly.",
  },
];

// Grounded FAQ. Anything not publicly confirmed for the coming edition is
// marked [confirm].
const hubFaq: { q: string; a: string }[] = [
  {
    q: "When and where is the Great Alaska Aviation Gathering?",
    a: "It's held in Palmer, Alaska — at the Alaska State Fairgrounds and Palmer Municipal Airport, about a 45-minute drive north of Anchorage. The 2026 edition ran May 2–3, 2026 (Sat 9am–5pm, Sun 10am–5pm). It historically returns in early May; the 2027 dates are not yet published here [confirm] — check the Alaska Airmen's Association site before planning travel.",
  },
  {
    q: "Who organizes it?",
    a: "The Great Alaska Aviation Gathering is organized annually by the Alaska Airmen's Association, a membership nonprofit that advocates for and supports general aviation across Alaska. It is widely regarded as Alaska's premier general-aviation event and trade show.",
  },
  {
    q: "Is there really an airplane raffle?",
    a: "Yes — the aircraft raffle is one of the Gathering's iconic traditions: the organization raffles off an airplane each year. The 2026 grand prize was a Cessna 180 [confirm]. The specific 2027 aircraft and raffle details are set by the Association [confirm] — see their official site for rules, tickets, and the drawing.",
  },
  {
    q: "What will I see there?",
    a: "Exhibitor and vendor booths, static aircraft displays along the flight line, safety and flying forums/seminars, the Show & Shine aircraft showcase, kids' activities, and the famous airplane raffle. Many attendees fly themselves in, and airport camping at Palmer Muni is part of the weekend.",
  },
  {
    q: "Can I fly in and camp?",
    a: "Flying in is a big part of the culture, and airport camping at Palmer Municipal has traditionally been available for fly-in attendees. Prior-permission, parking, camping, and fee details are set each year by the organizers [confirm] — confirm the current fly-in procedures and any NOTAMs with the Alaska Airmen's Association before you launch.",
  },
  {
    q: "Is the weather data on this page real?",
    a: "The 'Flying in?' panel attempts a live METAR for Palmer Municipal Airport (ICAO PAAQ) from the FAA/NWS Aviation Weather Center, decoded into friendly fields. If your browser can read that feed cross-origin, it's badged 'Live · FAA' with the observation time; if not, the panel shows a clearly-labeled 'Sample' and a full build would wire the Association's chosen aviation-weather feed. Sunrise/sunset are computed for Palmer. Never use it as your sole preflight brief.",
  },
];

export default function AlaskaAviationGatheringPage() {
  return (
    // Page-local "Alaska sky / sectional chart" theme: pale sky canvas, deep
    // sky-blue ink, aviation amber + runway-rust accents, Space Grotesk display.
    // Everything scoped under <SkyShell> (.gaag-sky) — no globals.css /
    // tailwind.config / shared components touched, so the rest of
    // bluewaveprojects.com is unchanged. The site Footer is rendered AFTER
    // </SkyShell> on its own dark surface so its light-on-dark text stays
    // legible (inside the pale canvas it washed out).
    <>
      <SkyShell>
        <main className="min-h-screen text-[#0e2a44]">
          <Nav />

          {/* HERO — info headquarters over a real Alaska floatplane photo, under
              a deep-sky scrim that keeps the palette + legibility. */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2a4a] via-[#123a63] to-[#071d34] text-[#eaf3fb]">
            {/* real hero background photo (license-clean; see CREDITS.md) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/aviation/hero-beaver.webp"
              alt="A de Havilland Beaver floatplane on the water in Alaska — sample hero photo"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 42%" }}
            />
            {/* deep-sky scrim over the photo — keeps text fully legible */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0b2a4a]/92 via-[#123a63]/84 to-[#071d34]/94" />
            <div className="pointer-events-none absolute inset-0 bg-[#071d34]/25" />
            {/* on-image hero credit */}
            <span className="absolute right-3 top-20 z-10 rounded-full bg-[#071d34]/50 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#eaf3fb]/70 backdrop-blur-sm">
              DHC-2 Beaver, Ketchikan · Diego Delso · CC BY-SA 4.0
            </span>
            {/* sectional-chart grid + compass rose */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M60 0H0V60" fill="none" stroke="#eaf3fb" strokeWidth="0.7" />
                </pattern>
                <radialGradient id="hero-sun" cx="84%" cy="18%" r="42%">
                  <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffe6b0" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#hero-grid)" />
              <rect width="1200" height="600" fill="url(#hero-sun)" />
              {/* compass rose */}
              <g transform="translate(980 150)" opacity="0.5">
                <circle r="70" fill="none" stroke="#eaf3fb" strokeWidth="1.2" />
                <circle r="54" fill="none" stroke="#eaf3fb" strokeWidth="0.6" />
                <path d="M0 -70 L7 0 L0 70 L-7 0 Z" fill="#f4b63e" opacity="0.8" />
                <path d="M-70 0 L0 7 L70 0 L0 -7 Z" fill="#eaf3fb" opacity="0.5" />
              </g>
              {/* contrail */}
              <path d="M-50 420 C 300 360, 700 460, 1250 400" stroke="#eaf3fb" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f4b63e]/45 bg-[#071d34]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f6cd77]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f4b63e]" />
                    Palmer, Alaska · Mat-Su Valley
                  </div>
                  <h1 className="gaag-display mb-5 max-w-2xl text-5xl font-bold leading-[1.03] sm:text-6xl">
                    The Great Alaska{" "}
                    <span className="text-[#f4b63e]">Aviation Gathering.</span>
                  </h1>
                  <div className="gaag-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#eaf3fb]/85">
                    Your headquarters for Alaska&apos;s premier general-aviation
                    event — the Alaska Airmen&apos;s Association&apos;s annual
                    fly-in and trade show at Palmer. Static displays, safety
                    forums, the Show &amp; Shine, kids&apos; activities, and the
                    iconic airplane raffle.{" "}
                    <span className="gaag-mono rounded bg-[#eaf3fb]/10 px-1 py-0.5 text-[13px] text-[#f6cd77]">
                      returns early May 2027 [confirm]
                    </span>
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#see"
                      className="rounded-full bg-gradient-to-r from-[#f4b63e] to-[#e08a2b] px-8 py-3.5 text-center text-sm font-semibold text-[#071d34] shadow-[0_10px_30px_-10px_rgba(244,182,62,0.7)] transition-transform hover:-translate-y-0.5"
                    >
                      What to see →
                    </a>
                    <a
                      href="#getting-there"
                      className="rounded-full border border-[#eaf3fb]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#eaf3fb]/90 transition-colors hover:border-[#eaf3fb]/70 hover:bg-[#eaf3fb]/5"
                    >
                      Flying in / driving in
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — the showpiece, prominent in the hero */}
                <div className="relative">
                  <GatheringConditions />
                  <Roundel size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS — grounded anchors */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { v: "Early May", l: "When", s: "2027 dates [confirm]" },
                { v: "Palmer", l: "Where", s: "Fairgrounds + PAAQ" },
                { v: "~45 min", l: "From Anchorage", s: "North on the Glenn Hwy" },
                { v: "Airplane", l: "Raffle", s: "An aircraft each year" },
              ].map((stat) => (
                <div key={stat.l} className="gaag-card p-5">
                  <div className="gaag-display text-2xl font-bold text-[#c8551f] sm:text-3xl">
                    {stat.v}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1f4f7d]">
                    {stat.l}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#6b8199]">
                    {stat.s}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WHAT IT IS — grounded intro band */}
          <section className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="gaag-card overflow-hidden p-8 sm:p-10">
              <div className="mb-8 max-w-3xl">
                <p className="gaag-eyebrow mb-3">What it is</p>
                <h2 className="gaag-display text-3xl font-bold leading-tight text-[#0e2a44] sm:text-4xl">
                  Alaska&apos;s general-aviation{" "}
                  <span className="text-[#c8551f]">homecoming.</span>
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-[#3a5670]">
                  Each year the Alaska Airmen&apos;s Association gathers the
                  state&apos;s flying community in Palmer for a weekend of
                  aircraft, learning, and camaraderie — the Great Alaska Aviation
                  Gathering. It&apos;s a trade show, a fly-in, a safety school,
                  and a family day all at once, set against the Chugach and the
                  Matanuska Valley. In a state where the airplane is often the
                  only road, this is the gathering of the people who fly.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    t: "Premier GA event",
                    d: "Widely regarded as Alaska's top general-aviation event and trade show — the flying community's marquee weekend.",
                  },
                  {
                    t: "Hosted by the Airmen",
                    d: "Organized by the Alaska Airmen's Association, a membership nonprofit advocating for general aviation across the state.",
                  },
                  {
                    t: "In Palmer",
                    d: "At the Alaska State Fairgrounds and Palmer Municipal Airport, about 45 minutes north of Anchorage in the Mat-Su Valley.",
                  },
                  {
                    t: "For everyone who flies",
                    d: "Pilots, mechanics, builders, dreamers, and families — many attendees fly themselves in and camp at the airport.",
                  },
                ].map((v) => (
                  <div key={v.t} className="flex gap-3">
                    <span
                      className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#f4b63e] to-[#c8551f]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="gaag-display mb-1 text-[15px] font-semibold leading-snug text-[#0e2a44]">
                        {v.t}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-[#3a5670]">
                        {v.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT TO SEE */}
          <section id="see" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="gaag-eyebrow mb-3">On the grounds</p>
              <h2 className="gaag-display text-4xl font-bold text-[#0e2a44] sm:text-5xl">
                What to see at <span className="text-[#c8551f]">the Gathering.</span>
              </h2>
              <div className="gaag-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3a5670]">
                The recurring program spans the trade-show floor, the flight
                line, the forum rooms, and the family areas. Exact 2027 schedules
                and booth lists are set by the organizers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {seeItems.map((e) => (
                <div key={e.title} className="gaag-card flex flex-col overflow-hidden">
                  <PhotoPlaceholder
                    accent={e.accent}
                    figure={e.figure}
                    label={e.title}
                    photo={e.photo}
                    className="rounded-b-none border-0"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="gaag-display text-lg font-semibold leading-tight text-[#0e2a44]">
                        {e.title}
                      </h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#1f4f7d]/20 bg-[#1f4f7d]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1f4f7d]">
                        {e.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3a5670]">{e.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THE RAFFLE — iconic feature band */}
          <section id="raffle" className="relative overflow-hidden bg-gradient-to-br from-[#0b2a4a] via-[#123a63] to-[#071d34] py-20 text-[#eaf3fb]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <pattern id="raffle-grid" width="54" height="54" patternUnits="userSpaceOnUse">
                  <path d="M54 0H0V54" fill="none" stroke="#eaf3fb" strokeWidth="0.7" />
                </pattern>
              </defs>
              <rect width="1200" height="400" fill="url(#raffle-grid)" />
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#8fc0f0" strokeWidth="1.2" fill="none" strokeDasharray="3 10" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-3xl border border-[#eaf3fb]/15 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/demos/aviation/bush-plane-beach.webp"
                        alt="An Alaska bush plane on a remote beach — sample photo"
                        loading="lazy"
                        decoding="async"
                        className="h-[280px] w-full object-cover sm:h-[340px]"
                        style={{ objectPosition: "center 55%" }}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071d34]/55 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-3 rounded-full bg-[#071d34]/55 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#eaf3fb]/80 backdrop-blur-sm">
                        Bush plane, Hallo Bay · Marshmallow · CC BY 2.0
                      </span>
                    </div>
                    <Roundel size={88} className="absolute -bottom-6 -right-6 hidden sm:inline-flex" />
                  </div>
                </div>
                <div>
                  <p className="gaag-eyebrow mb-3 !text-[#f6cd77]">The tradition</p>
                  <h2 className="gaag-display mb-4 text-3xl font-bold sm:text-4xl">
                    The airplane <span className="text-[#f4b63e]">raffle.</span>
                  </h2>
                  <div className="space-y-4 text-[#eaf3fb]/85">
                    <p className="leading-relaxed">
                      One tradition sets this event apart: each year the Alaska
                      Airmen&apos;s Association raffles off an airplane. Somebody
                      walks away an aircraft owner — and the raffle helps power
                      the Association&apos;s work for Alaska&apos;s flying
                      community all year long.
                    </p>
                    <p className="leading-relaxed">
                      The 2026 grand prize was a{" "}
                      <span className="font-semibold text-[#eaf3fb]">Cessna 180</span>{" "}
                      <span className="gaag-mono text-[13px] text-[#f6cd77]">[confirm]</span>
                      . The aircraft, rules, ticket details, and drawing for the
                      coming year are set by the Association{" "}
                      <span className="gaag-mono text-[13px] text-[#f6cd77]">[confirm]</span>
                      — see their official site for how to enter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FLYING IN / DRIVING IN */}
          <section id="getting-there" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <p className="gaag-eyebrow mb-3">Getting there</p>
              <h2 className="gaag-display text-4xl font-bold text-[#0e2a44] sm:text-5xl">
                Flying in <span className="text-[#c8551f]">or driving in.</span>
              </h2>
              <div className="gaag-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3a5670]">
                In Alaska, plenty of folks arrive by air. Whether you fly yourself
                to Palmer Muni or drive up the Glenn Highway, here&apos;s the lay
                of the land.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {gettingThere.map((s) => (
                <div key={s.n} className="gaag-card p-6">
                  <div className="gaag-display mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f4b63e] to-[#c8551f] text-sm font-bold text-[#071d34]">
                    {s.n}
                  </div>
                  <h3 className="gaag-display mb-2 text-lg font-semibold text-[#0e2a44]">
                    {s.t}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3a5670]">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-6 max-w-3xl gaag-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#6b8199]">
                Fly-in procedures, prior-permission requirements, parking,
                camping fees, and NOTAMs for Palmer Municipal (PAAQ) are set each
                year and can change. Always confirm the current details with the
                Alaska Airmen&apos;s Association and official aviation sources —
                and get a full weather briefing — before you launch. Items marked{" "}
                <span className="gaag-mono rounded bg-[#1f4f7d]/8 px-1 py-0.5 text-[#c8551f]">
                  [confirm]
                </span>{" "}
                are real recurring details not yet published for the coming edition.
              </p>
            </div>
          </section>

          {/* HOW TO ATTEND + REGISTER — neutral, helpful, points to the org */}
          <section id="attend" className="mx-auto max-w-6xl px-6 pb-8 pt-4">
            <div className="mb-10 text-center">
              <p className="gaag-eyebrow mb-3">How to attend</p>
              <h2 className="gaag-display text-4xl font-bold text-[#0e2a44] sm:text-5xl">
                Tickets &amp; <span className="text-[#c8551f]">registration.</span>
              </h2>
              <div className="gaag-rule" />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  t: "Get tickets from the Airmen",
                  d: "Admission tickets, hours, and any advance registration are handled on the Alaska Airmen's Association's official site. Check there for the current year's pricing, dates, and entry details.",
                },
                {
                  t: "Fly-in & camping sign-up",
                  d: "If you're flying yourself in, look for the Association's fly-in and airport-camping information for Palmer Municipal — including any prior-permission or registration steps for parking and camping [confirm].",
                },
                {
                  t: "Exhibiting or volunteering?",
                  d: "Vendors, exhibitors, forum speakers, and volunteers all coordinate through the Association. Their official channels are the place to start if you'd like to take part beyond attending.",
                },
              ].map((card) => (
                <div key={card.t} className="gaag-card p-6">
                  <h3 className="gaag-display mb-2 text-lg font-semibold text-[#0e2a44]">
                    {card.t}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3a5670]">{card.d}</p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-[#6b8199]">
              This hub points you toward the Alaska Airmen&apos;s Association for
              tickets, registration, and the raffle — always confirm dates,
              hours, and prices on their official site before planning travel.
            </p>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
            <div className="mb-10 text-center">
              <p className="gaag-eyebrow mb-3">Frequently asked</p>
              <h2 className="gaag-display text-4xl font-bold text-[#0e2a44] sm:text-5xl">
                The Gathering, <span className="text-[#c8551f]">answered.</span>
              </h2>
              <div className="gaag-rule" />
            </div>

            <div className="space-y-4">
              {hubFaq.map((f) => (
                <div key={f.q} className="gaag-card p-6">
                  <h3 className="gaag-display mb-2 text-base font-semibold leading-snug text-[#0e2a44]">
                    {f.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3a5670]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CLOSING SIGN-OFF — informational, not a hard CTA */}
          <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#f4b63e]/40 bg-gradient-to-br from-[#0b2a4a] via-[#123a63] to-[#071d34] p-10 text-center text-[#eaf3fb] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Roundel size={88} className="mx-auto mb-6" />
              <h2 className="gaag-display mb-4 text-3xl font-bold sm:text-4xl">
                See you on the <span className="text-[#f4b63e]">flight line.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#eaf3fb]/85">
                The Great Alaska Aviation Gathering returns to Palmer in early May
                2027 <span className="gaag-mono text-[13px] text-[#f6cd77]">[confirm]</span>.
                Use the program above to plan your weekend, check the live panel
                before you fly or drive, and confirm this year&apos;s dates,
                tickets, and raffle with the Alaska Airmen&apos;s Association. Fly
                safe — and welcome to the north.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE — honest disclaimer */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="gaag-card px-5 py-4 text-center text-xs leading-relaxed text-[#6b8199]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#0e2a44]">sample information hub</span>{" "}
                built by{" "}
                <a
                  href={SITE}
                  className="font-semibold text-[#c8551f] underline underline-offset-2 hover:text-[#e08a2b]"
                >
                  BlueWave Projects
                </a>{" "}
                on public information. Photos are{" "}
                <span className="font-semibold text-[#0e2a44]">
                  license-clean sample imagery
                </span>{" "}
                of general Alaska aviation from Wikimedia Commons — the final
                build would use the Alaska Airmen&apos;s Association&apos;s own
                official event photography, branding, and logo. Sample photo
                credits, all Creative-Commons: DHC-2 Beaver floatplane (Ketchikan)
                by Diego Delso (CC BY-SA 4.0); Lake Hood seaplane base by Laura
                Alier (CC BY 4.0); Super Cub bush plane by Sir Mildred Pierce
                (CC BY 2.0); bush plane at Eklutna Lake by Brian A. Ridder
                (CC BY-SA 2.0); bush plane at Hallo Bay by Marshmallow (CC BY 2.0).
                The exhibitor, forums, and kids&apos; tiles keep designed
                illustration art. The &quot;Flying in?&quot; panel attempts a live
                METAR for Palmer Municipal (ICAO PAAQ) from the FAA/NWS Aviation
                Weather Center; if the browser can&apos;t read it cross-origin it
                shows a clearly-labeled sample, and a full build would wire the
                Association&apos;s chosen aviation-weather feed. Sunrise/sunset are
                computed for Palmer. Event dates, the 2027 raffle aircraft, and
                fly-in details marked{" "}
                <span className="gaag-mono rounded bg-[#1f4f7d]/8 px-1 py-0.5 text-[#c8551f]">
                  [confirm]
                </span>{" "}
                are real recurring details not yet published for the coming
                edition. This page is not affiliated with or endorsed by the Great
                Alaska Aviation Gathering or the Alaska Airmen&apos;s Association.
                Never use any weather page as your sole preflight brief.
              </p>
            </div>
          </div>
        </main>
      </SkyShell>
      {/* Footer lives OUTSIDE <SkyShell>: the shell paints a light pale-sky
          canvas, and the site Footer is styled for dark backgrounds (white-alpha
          text with no background of its own) — inside the shell its text washed
          out. Rendered here on a deep-sky surface it reads correctly, matching
          the palette. */}
      <div className="bg-[#071d34] text-[#eaf3fb]">
        <Footer />
      </div>
    </>
  );
}
