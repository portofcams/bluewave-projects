import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import {
  HarborShell,
  Burgee,
  ArtTile,
  PortTownsendConditions,
  SITE,
  HUB_PATH,
  type PtAccent,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders.
export const metadata: Metadata = {
  title: "Port Townsend Wooden Boat Festival — Info Hub with Live Admiralty Inlet Conditions (Sample)",
  description:
    "An information headquarters for the Port Townsend Wooden Boat Festival (Northwest Maritime), September 11–13, 2026 at Point Hudson: some 300 wooden boats, the Sunday Sail By, schooner racing, hands-on boatbuilding, and a live 'on the water' panel with the Point Wilson tidal current, Port Townsend tide, cold water temp, and Whidbey wind. A sample build by BlueWave Projects on public information; not affiliated with the festival.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED EVENT DATA (workflow research + adversarial verify, 2026-07-09)
// ---------------------------------------------------------------------------
// Real event name (the organizer, Northwest Maritime, is the pitch target).
// Dates are published verbatim — September 11–13, 2026 — so no "TBA." NO edition
// ordinal is printed (the organizer's "50th Annual" marketing conflicts with the
// 47th/48th ticket sequence), so the page uses "nearly fifty years" framing.
// Superlatives are attributed to the organizer, not asserted. No 2026 prices or
// exact schedule clock times (both unconfirmed/year-specific). Kept
// unmistakably tied to Port Townsend / Northwest Maritime (woodenboat.ORG), not
// the separate East Coast WoodenBoat magazine (woodenboat.COM).

type SeeItem = {
  title: string;
  accent: PtAccent;
  figure: "schooner" | "hull" | "compass" | "lighthouse" | "sea" | "boats";
  blurb: string;
  tag: string;
};

const seeItems: SeeItem[] = [
  {
    title: "Some 300 wooden boats",
    accent: "sea",
    figure: "boats",
    blurb:
      "Schooners, classic yachts, working craft, and small traditional boats line the docks and the grounds at Point Hudson — most open to tour, with the owners aboard to talk story. The old etiquette still holds: ask permission to come aboard.",
    tag: "The fleet",
  },
  {
    title: "The Sunday Sail By",
    accent: "wood",
    figure: "schooner",
    blurb:
      "The festival's signature spectacle — hundreds of wooden boats sail in procession past the waterfront on Port Townsend Bay. Find a spot along the shore and watch a half-century of craftsmanship parade by under sail.",
    tag: "Signature",
  },
  {
    title: "Schooner racing & rowing",
    accent: "sea",
    figure: "sea",
    blurb:
      "Classic schooners race in the bay for the NW Schooner Cup, alongside small-boat races and human-powered rowing races — wooden boats doing what they were built to do, out on the current.",
    tag: "On the water",
  },
  {
    title: "Get out on the water",
    accent: "brass",
    figure: "compass",
    blurb:
      "You don't just watch. Pull an oar in a replica ship's longboat, or take a festival sail on a schooner or catboat — no experience needed; help raise the sail or take a turn at the wheel.",
    tag: "Hands-on",
  },
  {
    title: "Boatbuilding & the trades",
    accent: "wood",
    figure: "hull",
    blurb:
      "The woodworking tent, traditional ropemaking, a ship's-helm simulator, and make-and-take projects — the living maritime trades that keep wooden boats afloat, demonstrated all weekend.",
    tag: "Craft",
  },
  {
    title: "Talks, kids & music",
    accent: "fir",
    figure: "lighthouse",
    blurb:
      "Over 100 presentations from master shipwrights and voyagers across the grounds, a kids' boatbuilding and pirate parade for the keiki, and live music, local food, and regional beer and wine all weekend.",
    tag: "All ages",
  },
];

const plan = [
  {
    n: "01",
    t: "Ferry in from Whidbey",
    d: "The Washington State Ferry crosses between Coupeville (Whidbey Island) and Port Townsend — a short, scenic run into the festival's front door. It's a reservation system in high season, so book ahead rather than counting on standby.",
  },
  {
    n: "02",
    t: "Or drive around",
    d: "From Seattle you can ride the Edmonds–Kingston ferry and drive up (about two hours), or stay on the road the whole way around via the Hood Canal Bridge (about three) and skip the ferry lines entirely.",
  },
  {
    n: "03",
    t: "Watch the water",
    d: "Point Hudson sits where Admiralty Inlet meets the Strait — the current runs hard here. The live panel up top shows the Point Wilson current, the tide, and the wind, so you can time a Sail By vantage or an on-water sail around slack.",
  },
];

const hubFaq: { q: string; a: string }[] = [
  {
    q: "When and where is the Port Townsend Wooden Boat Festival?",
    a: "September 11–13, 2026 (Friday–Sunday), on the Port Townsend, Washington waterfront — at the Northwest Maritime campus and the historic Point Hudson Marina, 431 Water Street. The dates are published on the organizer's official site.",
  },
  {
    q: "Who organizes it?",
    a: "Northwest Maritime, the Port Townsend nonprofit behind the Northwest Maritime Center (and events like Race to Alaska). Wooden boats have gathered at Point Hudson for nearly fifty years; the organizer bills the festival as one of the largest wooden boat festivals in North America.",
  },
  {
    q: "What is the Sunday Sail By?",
    a: "The festival's signature on-water event — hundreds of the wooden boats sail in a procession past the waterfront on Port Townsend Bay, so you can watch the whole fleet under sail from shore. It's the moment the whole weekend builds toward.",
  },
  {
    q: "Can I actually get on a boat?",
    a: "Yes — beyond touring the docked fleet, the festival offers on-water experiences: rowing a replica ship's longboat and festival sails on schooners and smaller traditional boats, with no experience needed. Availability and sign-ups are set by the organizer each year.",
  },
  {
    q: "Is the conditions panel on this page real?",
    a: "Yes. It pulls the live NOAA tidal-current prediction for Point Wilson (station PUG1623) — the rip right off the festival grounds — plus the live NOAA tide and cold water temperature for Port Townsend (station 9444900) and the latest wind and air from Whidbey Island NAS (KNUW). Sunrise, sunset, and daylight are computed. It's a planning glance, never a substitute for the harbormaster or your own read of the water.",
  },
  {
    q: "How do I get tickets and the schedule?",
    a: "Tickets and the full schedule of 100+ presentations are handled through the organizer's official channels — check the festival's site (woodenboat.org, Northwest Maritime's Port Townsend festival) for current pricing, hours, and the program. Children generally attend free with a paying adult; confirm the current policy before you go.",
  },
];

const quickFacts = [
  { v: "Sept 11–13", l: "2026", s: "Friday–Sunday" },
  { v: "Point Hudson", l: "Where", s: "Port Townsend, WA" },
  { v: "~300 boats", l: "On the water", s: "organizer's billing" },
  { v: "Sunday", l: "The Sail By", s: "the fleet parades past" },
];

export default function PortTownsendWoodenBoatPage() {
  return (
    <>
      <HarborShell>
        <main className="min-h-screen text-[#17332f]">
          <Nav />
          <DemoTracking demo="port-townsend-wooden-boat" />

          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#1b3a41] via-[#2c5560] to-[#12262b] text-[#f4efe0]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <radialGradient id="ptw-hero-sun" cx="85%" cy="16%" r="42%">
                  <stop offset="0%" stopColor="#f4e4bf" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f4e4bf" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#ptw-hero-sun)" />
              {/* Olympic hills + fir line */}
              <path d="M-50 460 L180 360 L360 430 L560 350 L760 440 L960 360 L1160 440 L1250 400 L1250 600 L-50 600 Z" fill="#12262b" opacity="0.3" />
              {/* current/chart lines */}
              <path d="M-50 500 C 300 470, 700 540, 1250 490" stroke="#cfe0dd" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
              <path d="M-50 540 C 300 510, 700 570, 1250 520" stroke="#cfe0dd" strokeWidth="1" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c99a3f]/45 bg-[#12262b]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e6c987]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c99a3f]" />
                    Point Hudson · Port Townsend, WA
                  </div>
                  <h1 className="ptw-display mb-5 max-w-2xl text-5xl font-bold leading-[1.04] sm:text-6xl">
                    Port Townsend{" "}
                    <span className="text-[#e6c987]">Wooden Boat Festival.</span>
                  </h1>
                  <div className="ptw-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#f4efe0]/85">
                    Nearly fifty years of wooden boats on the Point Hudson
                    waterfront — some three hundred of them, the Sunday Sail By,
                    schooner racing, and hands-on boatbuilding, where Admiralty
                    Inlet meets the Strait.{" "}
                    <span className="ptw-mono rounded bg-[#f4efe0]/10 px-1 py-0.5 text-[13px] text-[#e6c987]">
                      September 11–13, 2026
                    </span>
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a href="#see" className="rounded-full bg-gradient-to-r from-[#c99a3f] to-[#8a5a2a] px-8 py-3.5 text-center text-sm font-semibold text-[#f4efe0] shadow-[0_10px_30px_-10px_rgba(201,154,63,0.6)] transition-transform hover:-translate-y-0.5">
                      What to see →
                    </a>
                    <a href="#plan" className="rounded-full border border-[#f4efe0]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f4efe0]/90 transition-colors hover:border-[#f4efe0]/70 hover:bg-[#f4efe0]/5">
                      Plan your visit
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — the showpiece */}
                <div className="relative">
                  <PortTownsendConditions />
                  <Burgee size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="ptw-card p-5">
                  <div className="ptw-display text-2xl font-bold text-[#8a5a2a] sm:text-3xl">{stat.v}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2c5560]">{stat.l}</div>
                  <div className="mt-1 text-xs leading-relaxed text-[#6b7d78]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* WHAT IT IS */}
          <section className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="ptw-card overflow-hidden p-8 sm:p-10">
              <div className="mb-8 max-w-3xl">
                <p className="ptw-eyebrow mb-3">What it is</p>
                <h2 className="ptw-display text-3xl font-bold leading-tight text-[#17332f] sm:text-4xl">
                  A half-century of wood,{" "}
                  <span className="text-[#8a5a2a]">canvas, and brass.</span>
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-[#3f5b58]">
                  Every September the wooden-boat world sails into Point Hudson,
                  the historic marina and boatyard at the tip of Port
                  Townsend&apos;s Victorian seaport. Some three hundred boats,
                  the people who build and sail them, and a weekend of racing,
                  demonstrations, and the Sunday Sail By — put on by Northwest
                  Maritime on the Olympic Peninsula waterfront. In a town that
                  still builds boats by hand, it&apos;s the family reunion of a
                  whole craft.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { t: "One of the largest", d: "Billed by the organizer as one of the largest wooden boat festivals in North America — the marquee gathering of the craft." },
                  { t: "By Northwest Maritime", d: "Produced by the Port Townsend nonprofit behind the Northwest Maritime Center, and events like Race to Alaska." },
                  { t: "At Point Hudson", d: "On the working marina and boatyard basin at the northeast tip of downtown Port Townsend, WA." },
                  { t: "For everyone", d: "Boatbuilders, sailors, families, and the merely curious — most boats open to tour, with owners aboard." },
                ].map((v) => (
                  <div key={v.t} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#c99a3f] to-[#8a5a2a]" aria-hidden="true" />
                    <div>
                      <h3 className="ptw-display mb-1 text-[15px] font-semibold leading-snug text-[#17332f]">{v.t}</h3>
                      <p className="text-[13px] leading-relaxed text-[#3f5b58]">{v.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT TO SEE */}
          <section id="see" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="ptw-eyebrow mb-3">On the grounds & the water</p>
              <h2 className="ptw-display text-4xl font-bold text-[#17332f] sm:text-5xl">
                What to see at <span className="text-[#8a5a2a]">the festival.</span>
              </h2>
              <div className="ptw-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3f5b58]">
                From the docked fleet to the Sunday Sail By — the program spans
                the docks, the boatbuilding tents, and the bay itself. The 2026
                schedule is set by the organizer.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {seeItems.map((e) => (
                <div key={e.title} className="ptw-card flex flex-col overflow-hidden">
                  <ArtTile accent={e.accent} figure={e.figure} label={e.title} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="ptw-display text-lg font-semibold leading-tight text-[#17332f]">{e.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#2c5560]/20 bg-[#2c5560]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#2c5560]">
                        {e.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3f5b58]">{e.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SAIL BY BAND — ties to the live current panel */}
          <section id="sailby" className="relative overflow-hidden bg-gradient-to-br from-[#1b3a41] via-[#2c5560] to-[#12262b] py-20 text-[#f4efe0]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#cfe0dd" strokeWidth="1.2" fill="none" strokeDasharray="3 10" />
              <path d="M-50 290 C 300 255, 700 320, 1250 265" stroke="#cfe0dd" strokeWidth="0.8" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <ArtTile accent="wood" figure="schooner" label="The Sunday Sail By, Port Townsend Bay" tall className="w-full max-w-md sm:h-[340px]" />
                </div>
                <div>
                  <p className="ptw-eyebrow mb-3 !text-[#e6c987]">Time it with the tide</p>
                  <h2 className="ptw-display mb-4 text-3xl font-bold sm:text-4xl">
                    Where the water <span className="text-[#c99a3f]">runs the show.</span>
                  </h2>
                  <div className="space-y-4 text-[#f4efe0]/85">
                    <p className="leading-relaxed">
                      Port Townsend sits at Point Wilson, where Admiralty Inlet
                      meets the Strait of Juan de Fuca — one of the strongest
                      tidal rips in Puget Sound, running several knots on a good
                      ebb. It shapes the Sail By, the schooner races, and every
                      small boat working out of Point Hudson.
                    </p>
                    <p className="leading-relaxed">
                      That&apos;s why the panel up top leads with the live Point
                      Wilson current, not just the weather — so you can pick a
                      Sail By vantage or an on-water sail around slack water,
                      the way the sailors do.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PLAN YOUR VISIT */}
          <section id="plan" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <p className="ptw-eyebrow mb-3">Getting there</p>
              <h2 className="ptw-display text-4xl font-bold text-[#17332f] sm:text-5xl">
                Plan your <span className="text-[#8a5a2a]">visit.</span>
              </h2>
              <div className="ptw-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3f5b58]">
                A Victorian seaport on the Olympic Peninsula, reached by a
                short ferry or a scenic drive around the Sound.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {plan.map((s) => (
                <div key={s.n} className="ptw-card p-6">
                  <div className="ptw-display mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#c99a3f] to-[#8a5a2a] text-sm font-bold text-[#f4efe0]">
                    {s.n}
                  </div>
                  <h3 className="ptw-display mb-2 text-lg font-semibold text-[#17332f]">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-[#3f5b58]">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-6 max-w-3xl ptw-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#6b7d78]">
                Port Townsend is a rare National Historic District — Victorian
                brick on Water Street, sea-captains&apos; homes on the bluff, and
                a working boatyard town where the Northwest School of Wooden
                Boatbuilding trains the next generation nearby in Port Hadlock.
                Ferry schedules, festival hours, and ticket prices are set each
                year — confirm current details with the organizer before you
                travel.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
            <div className="mb-10 text-center">
              <p className="ptw-eyebrow mb-3">Frequently asked</p>
              <h2 className="ptw-display text-4xl font-bold text-[#17332f] sm:text-5xl">
                The festival, <span className="text-[#8a5a2a]">answered.</span>
              </h2>
              <div className="ptw-rule" />
            </div>
            <div className="space-y-4">
              {hubFaq.map((f) => (
                <div key={f.q} className="ptw-card p-6">
                  <h3 className="ptw-display mb-2 text-base font-semibold leading-snug text-[#17332f]">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#3f5b58]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CLOSING SIGN-OFF */}
          <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#c99a3f]/40 bg-gradient-to-br from-[#1b3a41] via-[#2c5560] to-[#12262b] p-10 text-center text-[#f4efe0] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Burgee size={88} className="mx-auto mb-6" />
              <h2 className="ptw-display mb-4 text-3xl font-bold sm:text-4xl">
                See you at <span className="text-[#e6c987]">Point Hudson.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#f4efe0]/85">
                The Port Townsend Wooden Boat Festival returns September 11–13,
                2026. Use the program above to plan your weekend, check the live
                panel to time the water, and confirm this year&apos;s schedule
                and tickets with Northwest Maritime. Fair winds — and mind the
                current.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="ptw-card px-5 py-4 text-center text-xs leading-relaxed text-[#6b7d78]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#17332f]">sample information hub</span>{" "}
                built by{" "}
                <a href={SITE} className="font-semibold text-[#8a5a2a] underline underline-offset-2 hover:text-[#c99a3f]">
                  BlueWave Projects
                </a>{" "}
                on public information. It is a concept sample and is{" "}
                <span className="font-semibold text-[#17332f]">not affiliated with or endorsed by</span>{" "}
                the Port Townsend Wooden Boat Festival or Northwest Maritime, and is unrelated to
                WoodenBoat magazine. All imagery is designed sample illustration, not photography — a
                real build would use the festival&apos;s own photography, branding, and logo. The
                &quot;on the water&quot; panel pulls live public data — the NOAA tidal-current
                prediction for Point Wilson (station PUG1623), the NOAA tide and water temperature for
                Port Townsend (station 9444900), and the latest Whidbey Island NAS (KNUW) observation
                from the National Weather Service; sunrise, sunset, and daylight are computed. If a
                feed is unreachable, that tile shows a clearly-labeled sample. The dates (September
                11–13, 2026) and venue are published by the organizer; the ~300 boats, 100+
                presentations, and &quot;largest in North America&quot; framing are the organizer&apos;s
                own billing. No ticket prices or exact schedule times are shown, because those are set
                and can change each year — always confirm current dates, hours, tickets, and the
                program with Northwest Maritime before you travel.
              </p>
            </div>
          </div>
        </main>
      </HarborShell>
      {/* Footer OUTSIDE <HarborShell>: shell paints a light sailcloth canvas; the
          site Footer is styled for dark backgrounds — on deep Salish slate it
          reads correctly. */}
      <div className="bg-[#12262b] text-[#f4efe0]">
        <Footer />
      </div>
    </>
  );
}
