import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  TopoShell,
  TopoLines,
  MountainSeal,
  PhotoPlaceholder,
  DenaliConditions,
  SITE,
  HUB_PATH,
  NPS_CONDITIONS_URL,
  NPS_ROAD_LOTTERY_URL,
  NPS_POLYCHROME_URL,
  RECREATION_GOV_URL,
  type TopoAccent,
  type PhotoSrc,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders so the sample
// never pollutes bluewaveprojects.com's index.
export const metadata: Metadata = {
  title:
    "Denali Park Road — access, closures & how far you can go (Sample info hub)",
  description:
    "A grounded visitor-info hub for the Denali Park Road: the current closure at ~Mile 43, how far vehicles and buses can go, the Polychrome bridge reopening timeline, the (currently paused) Road Lottery, and a live 'Denali right now' weather panel. A sample build by BlueWave Projects on public information — not affiliated with the NPS. Always confirm live road status on the official NPS Current Conditions page.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED CONTENT DATA — verified against NPS + recreation.gov on 2026-07-03.
// Road status and lottery status are FLUID. Every year-specific or changeable
// fact is marked [confirm] and points to the official NPS Current Conditions
// page. Nothing is invented.
// ---------------------------------------------------------------------------

type PlanItem = {
  title: string;
  accent: TopoAccent;
  figure: "peak" | "road" | "bus" | "wildlife";
  blurb: string;
  tag: string;
  photo?: PhotoSrc;
};

const planItems: PlanItem[] = [
  {
    title: "The mountain",
    accent: "granite",
    figure: "peak",
    blurb:
      "Denali — 20,310 ft, the highest peak in North America — makes its own weather and is often wrapped in cloud. Only about 30% of visitors ever see the summit [confirm], so any clear view is a gift. The best odds come early morning and on cold, high-pressure days.",
    tag: "The high one",
    photo: {
      src: "/demos/denali/hero-wonder-lake.webp",
      credit: "NPS · Public domain",
      position: "center 40%",
    },
  },
  {
    title: "Fall colors on the tundra",
    accent: "gold",
    figure: "wildlife",
    blurb:
      "Late August into September, the tundra turns — reds, oranges, and gold sweep the open country as berries ripen. It's the historic Road Lottery season and, for many, the most beautiful time in the park (it can also bring the first snow).",
    tag: "Late summer",
    photo: {
      src: "/demos/denali/tundra-autumn.webp",
      credit: "NPS Photo / Emily Mesner · Public domain",
      position: "center",
    },
  },
  {
    title: "Wildlife",
    accent: "moss",
    figure: "wildlife",
    blurb:
      "Grizzly bears, caribou, Dall sheep, moose, and wolves range across the park. The park road was built to move people through wildlife country slowly — buses stop for animals, and staying with the bus is part of how the park protects them.",
    tag: "Big five",
    photo: {
      src: "/demos/denali/grizzly.webp",
      credit: "NPS · Public domain",
      position: "center",
    },
  },
  {
    title: "Caribou country",
    accent: "spruce",
    figure: "wildlife",
    blurb:
      "The Denali caribou herd moves across the tundra with the seasons. Watching a band of caribou drift below the peaks is one of the classic sights from the park road — bring binoculars and patience.",
    tag: "Wildlife",
    photo: {
      src: "/demos/denali/caribou.webp",
      credit: "NPS · Public domain",
      position: "center",
    },
  },
  {
    title: "Dall sheep on the ridges",
    accent: "granite",
    figure: "wildlife",
    blurb:
      "Denali was established in 1917 in large part to protect its Dall sheep. Look for them as white specks on the high green ridgelines above the road — the reason the park exists at all.",
    tag: "Wildlife",
    photo: {
      src: "/demos/denali/dall-sheep.webp",
      credit: "NPS · Public domain",
      position: "center",
    },
  },
  {
    title: "The green park bus",
    accent: "moss",
    figure: "bus",
    blurb:
      "Beyond the private-vehicle limit, the park's transit and tour buses are how you go deeper. Hop-on, hop-off transit buses let you get off to hike and catch a later bus; narrated tour buses stay together. Reserve ahead — seats are limited [confirm].",
    tag: "How you go deeper",
    photo: {
      src: "/demos/denali/park-bus.webp",
      credit: "NPS Photo / Emily Mesner · Public domain",
      position: "center 55%",
    },
  },
];

// How the road works — grounded, no invented mileposts beyond the verified ones.
const roadWorks = [
  {
    n: "01",
    t: "~92 miles, one road",
    d: "The Denali Park Road runs about 92 miles from the park entrance to Kantishna at the end. There's just this one road into the heart of the park — no loop, no shortcuts.",
  },
  {
    n: "02",
    t: "Private cars to ~Mile 15",
    d: "In a normal season, private vehicles may drive only to about Mile 15 (Savage River). The first ~15 miles are paved; that's as far as your own car goes. From there, the park takes over.",
  },
  {
    n: "03",
    t: "Buses beyond Mile 15",
    d: "Past the private-vehicle limit, access is by the park's transit and tour bus system. Historically reserved through reservedenali.com and recreation.gov — check the current reservation channel and this year's routes [confirm].",
  },
];

// Grounded FAQ. Anything fluid or year-specific is marked [confirm] and points
// to the official NPS conditions page.
const hubFaq: { q: string; a: string }[] = [
  {
    q: "Can I drive my own car into Denali?",
    a: "Only partway. In a normal season, private vehicles may drive to about Mile 15 (Savage River) — the paved section near the entrance. Beyond that, access is by the park's transit and tour buses. During the current road construction the drivable and bus-served distances are further limited, so always check the official NPS Current Conditions page before you go [confirm].",
  },
  {
    q: "Is the road open all the way to the end?",
    a: "No — not right now. Since 2021, the Pretty Rocks Landslide (~Mile 45) has closed the Denali Park Road at about Mile 43. As of the NPS Current Conditions page (updated June 2026), the closure was expected to remain through summer 2026, with transit and tour buses traveling no farther than the East Fork Bridge at Mile 43 [confirm]. Eielson Visitor Center (Mile 66), Wonder Lake (Mile 85), and Kantishna (Mile 92) are not reachable by bus while the road is closed. Confirm live status with the NPS before planning.",
  },
  {
    q: "When will the road fully reopen?",
    a: "The Polychrome bridge project spanning the slide had project completion targeted around mid-summer 2026 [confirm], with a partial reopening in 2026 (the bridge and road west of it opening to pedestrians and bikers, and buses reaching the Mile 43 East Fork area). Full bus service back to Eielson, Wonder Lake, and Kantishna is expected to resume in 2027 [confirm]. Timelines on a project like this can slip — the official NPS Polychrome Area Plan and Current Conditions pages have the live status.",
  },
  {
    q: "When is the Road Lottery back?",
    a: "The Road Lottery is currently suspended and has not been running during the road closure — the NPS has described it as suspended for the foreseeable future [confirm]. Historically, each September a small number of permit winners could drive their own vehicle the open length of the road. It's expected to return when the road fully reopens, but no date is confirmed. recreation.gov is the official channel — watch the NPS Road Lottery page for when applications resume.",
  },
  {
    q: "Will I actually see the mountain?",
    a: "Maybe. Denali is so tall it makes its own weather and is frequently hidden by cloud — a commonly-cited figure is that only about 30% of visitors see the summit [confirm]. Clear, cold, high-pressure mornings give the best odds. The 'Denali right now' panel on this page reads current cloud cover near the entrance into an honest good/fair/hidden guess — a heuristic, never a guarantee.",
  },
  {
    q: "Is the weather on this page real?",
    a: "The 'Denali right now' panel attempts a live observation from the nearest National Weather Service station to the park entrance (a keyless, CORS-enabled public API). When your browser can read it, fields are badged 'Live · NWS' with the observation time; if not, the panel shows a clearly-labeled 'Sample' and never presents it as live. Sunrise, sunset, and total daylight are computed for the entrance. Road status is not live here — confirm that with the NPS.",
  },
];

export default function DenaliParkRoadPage() {
  return (
    // Page-local "interior-Alaska tundra" theme: warm tundra-paper canvas,
    // spruce ink, tundra-orange + birch-gold accents, Fraunces display, topo
    // contour motifs. Everything scoped under <TopoShell> (.dena-topo) — no
    // globals.css / tailwind.config / shared components touched, so the rest of
    // bluewaveprojects.com is unchanged. The site Footer is rendered AFTER
    // </TopoShell> on its own dark surface so its light-on-dark text stays
    // legible (inside the warm canvas it washed out).
    <>
      <TopoShell>
        <main className="min-h-screen text-[#22301f]">
          <Nav />

          {/* HERO — info hub over a real Denali photo, under a spruce scrim that
              keeps the palette + legibility. */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#26382b] via-[#1d2b21] to-[#141f18] text-[#f2efe6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/denali/hero-wonder-lake.webp"
              alt="Denali reflected in Wonder Lake — sample hero photo"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 38%" }}
            />
            {/* spruce scrim over the photo — keeps text fully legible */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#141f18]/92 via-[#1d2b21]/82 to-[#141f18]/94" />
            <div className="pointer-events-none absolute inset-0 bg-[#141f18]/25" />
            {/* on-image hero credit */}
            <span className="absolute right-3 top-20 z-10 rounded-full bg-[#141f18]/50 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#f2efe6]/70 backdrop-blur-sm">
              Denali &amp; Wonder Lake · NPS · Public domain
            </span>
            {/* topo contour field */}
            <TopoLines className="absolute inset-0 h-full w-full" opacity={0.13} />

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e6b34e]/45 bg-[#141f18]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f0d089]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e6b34e]" />
                    Interior Alaska · Denali National Park
                  </div>
                  <h1 className="dena-display mb-5 max-w-2xl text-5xl font-bold leading-[1.04] sm:text-6xl">
                    The Denali{" "}
                    <span className="text-[#e6b34e]">Park Road.</span>
                  </h1>
                  <div className="dena-rule !mx-0 mb-6" />
                  <p className="mb-6 max-w-xl text-lg leading-relaxed text-[#f2efe6]/85">
                    Access, closures, and how far you can actually go — a plain,
                    grounded guide to the one road into the heart of the park.
                    Right now the road is closed partway for the Polychrome bridge
                    project, so what you can reach is different than usual.{" "}
                    <span className="dena-mono rounded bg-[#f2efe6]/10 px-1 py-0.5 text-[13px] text-[#f0d089]">
                      status is fluid — confirm with NPS
                    </span>
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#road-status"
                      className="rounded-full bg-gradient-to-r from-[#e6b34e] to-[#b4622b] px-8 py-3.5 text-center text-sm font-semibold text-[#141f18] shadow-[0_10px_30px_-10px_rgba(214,138,61,0.7)] transition-transform hover:-translate-y-0.5"
                    >
                      Current road status →
                    </a>
                    <a
                      href="#how-road-works"
                      className="rounded-full border border-[#f2efe6]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f2efe6]/90 transition-colors hover:border-[#f2efe6]/70 hover:bg-[#f2efe6]/5"
                    >
                      How the road works
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — the showpiece, prominent in the hero */}
                <div className="relative">
                  <DenaliConditions />
                  <MountainSeal size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS — grounded anchors */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { v: "~92 mi", l: "Park road", s: "Entrance to Kantishna" },
                { v: "~Mile 15", l: "Private cars", s: "To Savage River [confirm]" },
                { v: "~Mile 43", l: "Road closed at", s: "Pretty Rocks slide [confirm]" },
                { v: "Paused", l: "Road Lottery", s: "Returns when road reopens [confirm]" },
              ].map((stat) => (
                <div key={stat.l} className="dena-card p-5">
                  <div className="dena-display text-2xl font-bold text-[#b4622b] sm:text-3xl">
                    {stat.v}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3d5a44]">
                    {stat.l}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#7a8676]">
                    {stat.s}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CURRENT ROAD STATUS — the prominent callout */}
          <section id="road-status" className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="dena-card dena-alert overflow-hidden p-8 sm:p-10">
              <div className="mb-6 flex items-start gap-4">
                <svg viewBox="0 0 24 24" className="mt-1 h-8 w-8 shrink-0 text-[#b4622b]" fill="none" aria-hidden="true">
                  <path d="M12 3 L22 20 H2 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M12 9v5M12 17v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <div>
                  <p className="dena-eyebrow mb-2">Current road status</p>
                  <h2 className="dena-display text-3xl font-bold leading-tight text-[#22301f] sm:text-4xl">
                    The road is closed{" "}
                    <span className="text-[#b4622b]">partway.</span>
                  </h2>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                <div className="space-y-4 text-[15px] leading-relaxed text-[#4a5a48]">
                  <p>
                    Since 2021, the{" "}
                    <span className="font-semibold text-[#22301f]">
                      Pretty Rocks Landslide
                    </span>{" "}
                    (~Mile 45) has closed the Denali Park Road at about{" "}
                    <span className="font-semibold text-[#22301f]">Mile 43</span>.
                    As of the NPS Current Conditions page (last updated June 2026),
                    the closure was expected to remain in place through summer 2026,
                    with transit and tour buses traveling no farther than the East
                    Fork Bridge at Mile 43{" "}
                    <span className="dena-mono text-[13px] text-[#b4622b]">[confirm]</span>.
                  </p>
                  <p>
                    That means Eielson Visitor Center (Mile 66), Wonder Lake
                    (Mile 85), and Kantishna (Mile 92) are{" "}
                    <span className="font-semibold text-[#22301f]">not reachable by bus</span>{" "}
                    while the road is closed. The{" "}
                    <span className="font-semibold text-[#22301f]">Polychrome bridge</span>{" "}
                    spanning the slide had project completion targeted around
                    mid-summer 2026{" "}
                    <span className="dena-mono text-[13px] text-[#b4622b]">[confirm]</span>,
                    with a partial reopening in 2026 and full bus service to
                    Eielson, Wonder Lake, and Kantishna expected to return in 2027{" "}
                    <span className="dena-mono text-[13px] text-[#b4622b]">[confirm]</span>.
                  </p>
                  <p className="text-[13px] text-[#7a8676]">
                    Dates and reopening details on a project like this can shift.
                    Items marked{" "}
                    <span className="dena-mono rounded bg-[#3d5a44]/10 px-1 py-0.5 text-[#b4622b]">
                      [confirm]
                    </span>{" "}
                    are real, sourced details that must be verified against the
                    official NPS pages before you plan.
                  </p>
                </div>

                {/* official-link box */}
                <div className="rounded-2xl border border-[#3d5a44]/20 bg-[#faf8f1]/70 p-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3d5a44]">
                    Check live status
                  </p>
                  <div className="space-y-2.5">
                    <a
                      href={NPS_CONDITIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 rounded-xl border border-[#b4622b]/30 bg-[#b4622b]/8 px-4 py-3 text-sm font-semibold text-[#8a4a24] transition-colors hover:bg-[#b4622b]/14"
                    >
                      NPS Current Conditions
                      <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      href={NPS_POLYCHROME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 rounded-xl border border-[#3d5a44]/25 px-4 py-3 text-sm font-semibold text-[#3d5a44] transition-colors hover:bg-[#3d5a44]/8"
                    >
                      Polychrome Area Plan
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  <p className="mt-3 text-[11px] leading-relaxed text-[#7a8676]">
                    Road status is the single most important thing to confirm
                    before a Denali trip. It is not shown live on this sample.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* HOW THE ROAD WORKS */}
          <section id="how-road-works" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <p className="dena-eyebrow mb-3">How the road works</p>
              <h2 className="dena-display text-4xl font-bold text-[#22301f] sm:text-5xl">
                One road, <span className="text-[#b4622b]">92 miles.</span>
              </h2>
              <div className="dena-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#4a5a48]">
                Denali is built around a single road and a bus system that carries
                you into wildlife country slowly. Here&apos;s the normal setup —
                the current closure limits it further (see the status above).
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {roadWorks.map((s) => (
                <div key={s.n} className="dena-card p-6">
                  <div className="dena-display mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e6b34e] to-[#b4622b] text-sm font-bold text-[#141f18]">
                    {s.n}
                  </div>
                  <h3 className="dena-display mb-2 text-lg font-semibold text-[#22301f]">
                    {s.t}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4a5a48]">{s.d}</p>
                </div>
              ))}
            </div>

            {/* road photo band */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="dena-card overflow-hidden">
                <PhotoPlaceholder
                  accent="spruce"
                  figure="road"
                  label="The paved first ~15 miles"
                  photo={{
                    src: "/demos/denali/park-road-paved.webp",
                    credit: "NPS Photo / Emily Mesner · Public domain",
                    position: "center 55%",
                  }}
                  tall
                  className="rounded-b-none border-0"
                />
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-[#4a5a48]">
                    The first ~15 miles to Savage River are paved and open to
                    private vehicles in a normal season — the part of the road you
                    can drive yourself.
                  </p>
                </div>
              </div>
              <div className="dena-card overflow-hidden">
                <PhotoPlaceholder
                  accent="moss"
                  figure="road"
                  label="Beyond, the road turns to gravel"
                  photo={{
                    src: "/demos/denali/park-road.webp",
                    credit: "Mary Lewandowski · NPS · Public domain",
                    position: "center 45%",
                  }}
                  tall
                  className="rounded-b-none border-0"
                />
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-[#4a5a48]">
                    Past the private-vehicle limit the road narrows to gravel and
                    winds through the mountains — this is bus country, and how you
                    go deeper into the park.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* THE ROAD LOTTERY — feature band */}
          <section id="lottery" className="relative overflow-hidden bg-gradient-to-br from-[#26382b] via-[#1d2b21] to-[#141f18] py-20 text-[#f2efe6]">
            <TopoLines className="absolute inset-0 h-full w-full" opacity={0.1} />
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="mb-10 text-center">
                <p className="dena-eyebrow mb-3 !text-[#f0d089]">The September tradition</p>
                <h2 className="dena-display text-4xl font-bold sm:text-5xl">
                  The Road <span className="text-[#e6b34e]">Lottery.</span>
                </h2>
                <div className="dena-rule" />
              </div>

              {/* paused banner */}
              <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-[#e6b34e]/40 bg-[#e6b34e]/8 p-5 text-center">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#f0d089]">
                  Currently paused
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#f2efe6]/85">
                  The Road Lottery has been suspended during the road closure — the
                  NPS has described it as suspended for the foreseeable future{" "}
                  <span className="dena-mono text-[13px] text-[#f0d089]">[confirm]</span>.
                  It is expected to return when the road fully reopens, but no date
                  is confirmed. It is <span className="font-semibold">not</span>{" "}
                  running right now.
                </p>
              </div>

              <div className="grid items-start gap-8 lg:grid-cols-[1fr_1fr]">
                <div className="space-y-4 text-[#f2efe6]/85">
                  <h3 className="dena-display text-xl font-semibold text-[#f2efe6]">
                    What it is (historically)
                  </h3>
                  <p className="leading-relaxed">
                    Each September, a small number of lottery winners could drive
                    their <span className="font-semibold text-[#f2efe6]">own private vehicle</span>{" "}
                    the full open length of the park road — the one time of year
                    the road opens to personal cars deep into the park. For many
                    Alaskans it&apos;s a bucket-list drive through peak fall color.
                  </p>
                  <p className="leading-relaxed">
                    Historically, applications ran on{" "}
                    <span className="font-semibold text-[#f2efe6]">recreation.gov</span>{" "}
                    (roughly May 1–31) with a $15 non-refundable application fee, a
                    drawing in July, around 1,600 permits per day over about 4–5
                    days, plus a Military Appreciation Day{" "}
                    <span className="dena-mono text-[13px] text-[#f0d089]">[confirm]</span>.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#f2efe6]/12 bg-[#141f18]/40 p-6">
                  <h3 className="dena-display mb-3 text-xl font-semibold text-[#f2efe6]">
                    When it&apos;s back
                  </h3>
                  <p className="leading-relaxed text-[#f2efe6]/85">
                    The lottery is expected to return once the road fully reopens
                    (full service is expected in 2027{" "}
                    <span className="dena-mono text-[13px] text-[#f0d089]">[confirm]</span>),
                    but the NPS has not confirmed a date. When it resumes,{" "}
                    <span className="font-semibold text-[#f2efe6]">recreation.gov</span>{" "}
                    is the official channel and the NPS Road Lottery page is where
                    the application window will be announced.
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <a
                      href={NPS_ROAD_LOTTERY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 rounded-xl border border-[#e6b34e]/40 bg-[#e6b34e]/10 px-4 py-3 text-sm font-semibold text-[#f0d089] transition-colors hover:bg-[#e6b34e]/16"
                    >
                      NPS Road Lottery page
                      <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      href={RECREATION_GOV_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 rounded-xl border border-[#f2efe6]/25 px-4 py-3 text-sm font-semibold text-[#f2efe6]/90 transition-colors hover:bg-[#f2efe6]/6"
                    >
                      recreation.gov
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* GETTING IN NOW */}
          <section id="getting-in" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <p className="dena-eyebrow mb-3">Getting in now</p>
              <h2 className="dena-display text-4xl font-bold text-[#22301f] sm:text-5xl">
                Private vehicle <span className="text-[#b4622b]">or the bus.</span>
              </h2>
              <div className="dena-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#4a5a48]">
                While the road is under construction, here&apos;s how access
                generally works. Confirm this year&apos;s specifics — routes,
                reservation channel, and how far buses run — with the NPS.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  t: "Drive yourself (to the limit)",
                  d: "You can drive your own vehicle to the private-vehicle limit near the entrance — normally about Mile 15 (Savage River) — and walk, bike, or picnic from there. The entrance-area trails, the visitor center, and the sled-dog kennels are all near the front of the park.",
                },
                {
                  t: "Take a park bus",
                  d: "To go deeper (as far as the closure allows), ride the park's transit or tour buses. Transit buses are hop-on, hop-off for hikers; tour buses are narrated and stay together. Seats are limited and fill up — reserve ahead [confirm].",
                },
                {
                  t: "How to reserve",
                  d: "Bus reservations have historically been handled through reservedenali.com and recreation.gov. During construction the routes and how far buses run change year to year — check the current NPS bus information and reservation channel before booking [confirm].",
                },
              ].map((card) => (
                <div key={card.t} className="dena-card p-6">
                  <h3 className="dena-display mb-2 text-lg font-semibold text-[#22301f]">
                    {card.t}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4a5a48]">{card.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PLAN YOUR VISIT — seasons, wildlife, the mountain */}
          <section id="plan" className="mx-auto max-w-6xl px-6 pb-8 pt-4">
            <div className="mb-12 text-center">
              <p className="dena-eyebrow mb-3">Plan your visit</p>
              <h2 className="dena-display text-4xl font-bold text-[#22301f] sm:text-5xl">
                The mountain, the tundra, <span className="text-[#b4622b]">the wildlife.</span>
              </h2>
              <div className="dena-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#4a5a48]">
                What people come for — and honest odds. Check the live panel at the
                top for current weather and a read on whether the summit is likely
                out.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {planItems.map((e) => (
                <div key={e.title} className="dena-card flex flex-col overflow-hidden">
                  <PhotoPlaceholder
                    accent={e.accent}
                    figure={e.figure}
                    label={e.title}
                    photo={e.photo}
                    className="rounded-b-none border-0"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="dena-display text-lg font-semibold leading-tight text-[#22301f]">
                        {e.title}
                      </h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#3d5a44]/20 bg-[#3d5a44]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3d5a44]">
                        {e.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#4a5a48]">{e.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-12">
            <div className="mb-10 text-center">
              <p className="dena-eyebrow mb-3">Frequently asked</p>
              <h2 className="dena-display text-4xl font-bold text-[#22301f] sm:text-5xl">
                The park road, <span className="text-[#b4622b]">answered.</span>
              </h2>
              <div className="dena-rule" />
            </div>

            <div className="space-y-4">
              {hubFaq.map((f) => (
                <div key={f.q} className="dena-card p-6">
                  <h3 className="dena-display mb-2 text-base font-semibold leading-snug text-[#22301f]">
                    {f.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4a5a48]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* THE NAME — a brief, genuine nod to the Athabascan name/land */}
          <section className="mx-auto max-w-5xl px-6 pb-8 pt-8">
            <div className="dena-card overflow-hidden p-8 sm:p-10">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <MountainSeal size={96} className="shrink-0" />
                <div>
                  <p className="dena-eyebrow mb-2">The name</p>
                  <h2 className="dena-display mb-3 text-2xl font-bold text-[#22301f] sm:text-3xl">
                    Denali — &ldquo;the high one.&rdquo;
                  </h2>
                  <p className="text-[15px] leading-relaxed text-[#4a5a48]">
                    &ldquo;Denali&rdquo; is the Koyukon Athabascan name for the
                    mountain, meaning &ldquo;the high one.&rdquo; The Koyukon and
                    other Alaska Native peoples have known this country and called
                    the mountain by this name for generations. Visiting is a chance
                    to travel through their homeland with respect — for the land,
                    the wildlife, and the people who have always been here.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CLOSING SIGN-OFF — informational, not a hard CTA */}
          <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#e6b34e]/40 bg-gradient-to-br from-[#26382b] via-[#1d2b21] to-[#141f18] p-10 text-center text-[#f2efe6] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <TopoLines className="absolute inset-0 h-full w-full" opacity={0.09} />
              <div className="relative">
                <MountainSeal size={88} className="mx-auto mb-6" />
                <h2 className="dena-display mb-4 text-3xl font-bold sm:text-4xl">
                  Before you go, <span className="text-[#e6b34e]">check the road.</span>
                </h2>
                <p className="mx-auto max-w-2xl text-[#f2efe6]/85">
                  Denali is one road into big, wild country — and right now that
                  road is only partway open. Use this guide to understand how it
                  works, then confirm the current closure, bus service, and any
                  Road Lottery news on the official NPS Current Conditions page
                  before you plan. The mountain, when it shows itself, is worth it.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href={NPS_CONDITIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gradient-to-r from-[#e6b34e] to-[#b4622b] px-8 py-3.5 text-sm font-semibold text-[#141f18] shadow-[0_10px_30px_-10px_rgba(214,138,61,0.7)] transition-transform hover:-translate-y-0.5"
                  >
                    NPS Current Conditions ↗
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* SAMPLE NOTE — honest disclaimer */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="dena-card px-5 py-4 text-center text-xs leading-relaxed text-[#7a8676]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#22301f]">sample information hub</span>{" "}
                built by{" "}
                <a
                  href={SITE}
                  className="font-semibold text-[#b4622b] underline underline-offset-2 hover:text-[#8a4a24]"
                >
                  BlueWave Projects
                </a>{" "}
                on public information. It is{" "}
                <span className="font-semibold text-[#22301f]">
                  not affiliated with or endorsed by the National Park Service
                </span>{" "}
                or Denali National Park &amp; Preserve. Road and Road Lottery status
                are <span className="font-semibold text-[#22301f]">fluid</span> and
                must be confirmed with the NPS — the details on this page were
                researched on 2026-07-03 and anything marked{" "}
                <span className="dena-mono rounded bg-[#3d5a44]/10 px-1 py-0.5 text-[#b4622b]">
                  [confirm]
                </span>{" "}
                may have changed. Photos are{" "}
                <span className="font-semibold text-[#22301f]">
                  license-clean public-domain NPS imagery
                </span>{" "}
                from Wikimedia Commons (Denali &amp; Wonder Lake, the park road, a
                green park bus, fall tundra near Toklat, and grizzly / caribou /
                Dall-sheep wildlife — full credits in the project&apos;s CREDITS
                file); a real build would use official NPS information and licensed
                photography. The &ldquo;Denali right now&rdquo; panel attempts a
                live observation from the nearest National Weather Service station
                to the park entrance; if the browser can&apos;t read it, it shows a
                clearly-labeled sample, never presented as live. Sunrise, sunset,
                and daylight are computed for the entrance, and the &ldquo;is the
                mountain out?&rdquo; read is an honest cloud-cover heuristic, not a
                guarantee. Road status is not shown live here — always check the
                official{" "}
                <a
                  href={NPS_CONDITIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#b4622b] underline underline-offset-2 hover:text-[#8a4a24]"
                >
                  NPS Current Conditions page
                </a>
                .
              </p>
            </div>
          </div>
        </main>
      </TopoShell>
      {/* Footer lives OUTSIDE <TopoShell>: the shell paints a warm tundra-paper
          canvas, and the site Footer is styled for dark backgrounds (light-on-
          dark text with no background of its own) — inside the shell its text
          washed out. Rendered here on a deep-spruce surface it reads correctly,
          matching the palette. */}
      <div className="bg-[#141f18] text-[#f2efe6]">
        <Footer />
      </div>
    </>
  );
}
