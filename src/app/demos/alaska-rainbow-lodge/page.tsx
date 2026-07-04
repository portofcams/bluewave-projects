import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  LodgeShell,
  Emblem,
  PhotoPlaceholder,
  LodgeConditions,
  SITE,
  HUB_PATH,
  type LodgeAccent,
  type PhotoSrc,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders so the proof
// never pollutes bluewaveprojects.com's index.
export const metadata: Metadata = {
  title: "Alaska Rainbow Lodge — Bristol Bay Fly-In Fishing (Sample)",
  description:
    "A guest-facing marketing and booking-inquiry sample for Alaska Rainbow Lodge — a Bristol Bay fly-in fishing lodge run by the Ferguson family since 2016. 2026 Signature and Build-Your-Own packages, a live King Salmon flying-conditions panel, and a clear path to a real availability inquiry. A sample build by BlueWave Projects on publicly verified information.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED LODGE DATA
// ---------------------------------------------------------------------------
// Every figure below is from the brief's verified facts (fetched directly
// from alaskarainbowlodge.com, 2026-07-03). Anything not confirmed there is
// marked "[confirm]" and nothing is invented.

const INQUIRY_EMAIL = "info@alaskarainbowlodge.com";
const INQUIRY_PHONE = "800.451.6198";
const INQUIRY_PHONE_TEL = "+18004516198";

type ExperienceItem = {
  title: string;
  accent: LodgeAccent;
  figure: "river" | "fish" | "float" | "cabin" | "bear";
  blurb: string;
  tag: string;
  photo?: PhotoSrc;
};

const experienceItems: ExperienceItem[] = [
  {
    title: "Daily guided fishing",
    accent: "forest",
    figure: "fish",
    blurb:
      "Six full days of guided fishing on the Kvichak and Alagnak river systems, with expert guides typically running two guests per boat — built around Bristol Bay's legendary rainbow trout, salmon, and grayling.",
    tag: "Signature",
    photo: {
      src: "/demos/rainbow-lodge/rainbow-trout.webp",
      credit: "Fishinphoto · CC BY-SA 4.0",
      position: "center 35%",
    },
  },
  {
    title: "Bear & wildlife viewing",
    accent: "moss",
    figure: "bear",
    blurb:
      "Bristol Bay's rivers are Alaska brown bear country — an add-on excursion (BYOB tiers) puts you in position to watch bears fishing the same waters you do, at a respectful distance with your guide.",
    tag: "Add-on · $900pp",
    photo: {
      src: "/demos/rainbow-lodge/brown-bear-fishing.webp",
      credit: "USFWS Alaska · Public domain",
      position: "center 40%",
    },
  },
  {
    title: "Rafting excursions",
    accent: "slate",
    figure: "river",
    blurb:
      "A gentler way to see the country between casts — a rafting add-on drifts a stretch of river for scenery, wildlife, and a change of pace from the boat. [confirm exact stretch/operator]",
    tag: "Add-on · $900pp",
    // No fitting license-clean rafting-specific photo found — keeps SVG art.
  },
  {
    title: "Photography excursions",
    accent: "amber",
    figure: "float",
    blurb:
      "A dedicated outing for photographers — golden Bristol Bay evening light, the river, the floatplanes, and the wildlife that make this country worth framing.",
    tag: "Add-on · $900pp",
    photo: {
      src: "/demos/rainbow-lodge/hero-floatplane.webp",
      credit: "Paxson Woelber · CC BY 2.0",
      position: "center 60%",
    },
  },
  {
    title: "Dick Proenneke Cabin Tour",
    accent: "forest",
    figure: "cabin",
    blurb:
      "A guided visit to the cabin of Dick Proenneke — the woodsman who famously built his own home by hand and lived alone at Twin Lakes, chronicled in \"Alone in the Wilderness.\" Minimum 4 guests.",
    tag: "$550pp · 4-guest min",
    // Cabin-tour slot — no fitting license-clean photo of the specific cabin
    // was verified for this build; keeps the honest SVG placeholder.
  },
  {
    title: "The rivers themselves",
    accent: "slate",
    figure: "river",
    blurb:
      "The Kvichak and Alagnak feed one of the richest sockeye salmon fisheries on earth, drawing the rainbow trout, char, and grayling that built the lodge's reputation over four decades.",
    tag: "The waters",
    photo: {
      src: "/demos/rainbow-lodge/kvichak-river.webp",
      credit: "U.S. Senate — Office of Lisa Murkowski · Public domain",
      position: "center 55%",
    },
  },
];

// 2026 packages — every number is real per the brief.
const byobTiers = [
  { nights: "3 days / 4 nights", price: "$5,550", note: "per person" },
  { nights: "4 days / 5 nights", price: "$7,400", note: "per person" },
  { nights: "5 days / 6 nights", price: "$9,250", note: "per person" },
  {
    nights: "6 days / 7 nights",
    price: "$11,100",
    note: "per person · includes Anchorage transportation",
  },
];

const addOns = [
  { t: "Fishing excursion", p: "$900", n: "per person" },
  { t: "Bear / wildlife viewing", p: "$900", n: "per person" },
  { t: "Rafting excursion", p: "$900", n: "per person" },
  { t: "Photography excursion", p: "$900", n: "per person" },
  { t: "Dick Proenneke Cabin Tour", p: "$550", n: "per person · 4-guest minimum" },
];

// Grounded FAQ. Anything not publicly confirmed is marked [confirm].
const lodgeFaq: { q: string; a: string }[] = [
  {
    q: "How much does a trip cost?",
    a: "The 2026 Signature package is $16,500 per person for 7 nights / 6 full days of guided fishing, running June 13 – September 25, 2026. Shorter Build-Your-Own (BYOB) stays are available June 12 – July 31, 2026, from $5,550/person (3 days/4 nights) up to $11,100/person (6 days/7 nights, which includes Anchorage transportation — shorter BYOB stays do not).",
  },
  {
    q: "What's included in the Signature package?",
    a: "A private round-trip charter flight from Anchorage, daily floatplane fly-outs to the fishing, luxury accommodations, gourmet meals with an open bar, quality fishing gear, and expert guides — typically two guests per guide.",
  },
  {
    q: "How do I book, and what are the payment terms?",
    a: "There's no online real-time booking engine today — every trip is arranged through a direct inquiry: call 800.451.6198 or email info@alaskarainbowlodge.com. A 50% deposit is required at booking, with the balance due 90 days before arrival. The deposit is non-refundable within 180 days of arrival, unless the lodge successfully rebooks the spot.",
  },
  {
    q: "When should I go?",
    a: "The 2026 season runs June 13 – September 25 for the Signature package, with BYOB stays available June 12 – July 31. Different weeks favor different species and water conditions through the summer — ask the lodge team which window best fits what you want to fish for [confirm specifics by week].",
  },
  {
    q: "Who runs the lodge?",
    a: "Alaska Rainbow Lodge was founded in 1982 by Ron and Sharon Hayes, starting as a single lodge with room for just 10 guests. In 2016, Chip and Amanda Ferguson took over ownership and management — Chip had been the lodge's longtime pilot before becoming owner. The Ferguson family continues to operate it today, with an off-season base in Galveston, Texas.",
  },
  {
    q: "Is the flying-conditions panel on this page real?",
    a: "The \"King Salmon right now\" panel attempts a live observation for King Salmon Airport (ICAO PAKN), the nearest station to the lodge, from the National Weather Service API. If your browser can read that feed, it's badged \"Live · NWS\" with the observation time; if not, the panel shows a clearly-labeled \"Sample.\" Sunrise, sunset, and daylight hours are computed for King Salmon's coordinates. It's a friendly planning read, not a substitute for the lodge's own daily fly-out call.",
  },
];

export default function AlaskaRainbowLodgePage() {
  return (
    // Page-local "river-green / evening amber" theme: warm parchment canvas,
    // deep forest-green ink, salmon-red + evening-amber accents, Fraunces
    // display serif. Everything scoped under <LodgeShell> (.arl-lodge) — no
    // globals.css / tailwind.config / shared components touched, so the rest
    // of bluewaveprojects.com is unchanged. The site Footer is rendered AFTER
    // </LodgeShell> on its own dark surface so its light-on-dark text stays
    // legible (inside the parchment shell it washed out).
    <>
      <LodgeShell>
        <main className="min-h-screen text-[#16281f]">
          <Nav />

          {/* HERO — lodge marketing hero over a real floatplane photo, under a
              deep forest-green scrim, live conditions panel prominent. */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#132b22] via-[#1c3b2e] to-[#0c1a15] text-[#f5f1e6]">
            {/* real hero background photo (license-clean; see CREDITS.md) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/rainbow-lodge/hero-floatplane.webp"
              alt="A floatplane on a remote lake near Katmai National Park, Alaska — sample hero photo"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 58%" }}
            />
            {/* deep forest scrim over the photo — keeps text fully legible */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#132b22]/92 via-[#1c3b2e]/84 to-[#0c1a15]/94" />
            <div className="pointer-events-none absolute inset-0 bg-[#0c1a15]/25" />
            {/* on-image hero credit */}
            <span className="absolute right-3 top-20 z-10 rounded-full bg-[#0c1a15]/50 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#f5f1e6]/70 backdrop-blur-sm">
              Katmai floatplane drop-off · Paxson Woelber · CC BY 2.0
            </span>
            {/* river-current texture + evening sun */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="hero-sun" cx="84%" cy="18%" r="42%">
                  <stop offset="0%" stopColor="#ffe0a8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffe0a8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#hero-sun)" />
              <path d="M-50 460 C 300 400, 700 500, 1250 440" stroke="#f5f1e6" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
              <path d="M-50 500 C 300 450, 700 540, 1250 480" stroke="#f5f1e6" strokeWidth="1" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d79a3c]/45 bg-[#0c1a15]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e8bd77]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d79a3c]" />
                    Bristol Bay, Alaska · Fly-in only
                  </div>
                  <h1 className="arl-display mb-5 max-w-2xl text-5xl font-bold leading-[1.03] sm:text-6xl">
                    Alaska Rainbow Lodge.{" "}
                    <span className="text-[#d79a3c]">A family legacy on the water.</span>
                  </h1>
                  <div className="arl-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#f5f1e6]/85">
                    Since 1982, this fly-in lodge in the heart of Bristol Bay has
                    put guests on the Kvichak and Alagnak — some of the finest
                    rainbow trout and salmon water on earth. Chip and Amanda
                    Ferguson, who took the helm in 2016, carry the tradition
                    forward with the same crew, the same rivers, and a pilot's
                    eye for getting you there safely.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#packages"
                      className="rounded-full bg-gradient-to-r from-[#d79a3c] to-[#b6772a] px-8 py-3.5 text-center text-sm font-semibold text-[#0c1a15] shadow-[0_10px_30px_-10px_rgba(215,154,60,0.7)] transition-transform hover:-translate-y-0.5"
                    >
                      See 2026 packages →
                    </a>
                    <a
                      href="#inquire"
                      className="rounded-full border border-[#f5f1e6]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f5f1e6]/90 transition-colors hover:border-[#f5f1e6]/70 hover:bg-[#f5f1e6]/5"
                    >
                      Request availability
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — the showpiece, prominent in the hero */}
                <div className="relative">
                  <LodgeConditions />
                  <Emblem size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS — grounded anchors */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { v: "$16,500pp", l: "Signature package", s: "7 nights / 6 full days" },
                { v: "1982", l: "Founded", s: "Ron & Sharon Hayes" },
                { v: "2016", l: "Ferguson family", s: "Chip & Amanda take the helm" },
                { v: "Fly-in only", l: "Access", s: "Charter + daily floatplane" },
              ].map((stat) => (
                <div key={stat.l} className="arl-card p-5">
                  <div className="arl-display text-2xl font-bold text-[#9c4230] sm:text-3xl">
                    {stat.v}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2c4a3d]">
                    {stat.l}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#6b7d70]">
                    {stat.s}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THE LODGE & THE FERGUSONS */}
          <section id="story" className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="arl-card overflow-hidden p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="arl-eyebrow mb-3">Four decades on the water</p>
                  <h2 className="arl-display text-3xl font-bold leading-tight text-[#16281f] sm:text-4xl">
                    Built by a founding family,{" "}
                    <span className="text-[#9c4230]">carried forward by a pilot.</span>
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3d5347]">
                    <p>
                      Alaska Rainbow Lodge began in 1982, when Ron and Sharon
                      Hayes opened a single lodge in Bristol Bay with room for
                      just 10 guests. Over the decades that followed, it grew
                      into one of the region&apos;s known fly-in fishing
                      operations — built on the same rivers, the same
                      hospitality, and word of mouth from anglers who kept
                      coming back.
                    </p>
                    <p>
                      In 2016, ownership and management passed to Chip and
                      Amanda Ferguson. Chip wasn&apos;t new to the lodge — he
                      had been its longtime pilot, flying guests in and out of
                      Bristol Bay long before he became owner. That background
                      matters at a fly-in-only property: the person now
                      running the operation spent years behind the controls
                      of the very floatplanes that get guests to the water
                      each morning. The Ferguson family continues to operate
                      the lodge today, splitting the year between Bristol Bay
                      in summer and an off-season base in Galveston, Texas.
                    </p>
                  </div>
                </div>
                <PhotoPlaceholder
                  accent="forest"
                  figure="river"
                  label="Kvichak & Alagnak river country"
                  tall
                  photo={{
                    src: "/demos/rainbow-lodge/sockeye-run.webp",
                    credit: "USEPA · Public domain",
                    position: "center 45%",
                  }}
                />
              </div>
            </div>
          </section>

          {/* 2026 PACKAGES */}
          <section id="packages" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="arl-eyebrow mb-3">2026 season</p>
              <h2 className="arl-display text-4xl font-bold text-[#16281f] sm:text-5xl">
                Packages &amp; <span className="text-[#9c4230]">pricing.</span>
              </h2>
              <div className="arl-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3d5347]">
                Every figure below is real, current 2026 pricing. The Signature
                package is the full week; Build-Your-Own (BYOB) options give
                you a shorter, flexible stay earlier in the season.
              </p>
            </div>

            {/* SIGNATURE — the flagship package, full width */}
            <div className="mb-8 overflow-hidden rounded-3xl border border-[#d79a3c]/40 bg-gradient-to-br from-[#132b22] via-[#1c3b2e] to-[#0c1a15] p-8 text-[#f5f1e6] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="arl-eyebrow mb-2 !text-[#e8bd77]">The flagship trip</p>
                  <h3 className="arl-display text-2xl font-bold sm:text-3xl">
                    Signature package
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f5f1e6]/80">
                    7 nights / 6 full days of guided fishing. Season runs{" "}
                    <span className="font-semibold text-[#f5f1e6]">
                      June 13 – September 25, 2026
                    </span>
                    . Includes a private round-trip charter flight from
                    Anchorage, daily floatplane fly-outs, luxury
                    accommodations, gourmet meals with open bar, quality
                    fishing gear, and expert guides (typically two guests per
                    guide).
                  </p>
                </div>
                <div className="text-center lg:text-right">
                  <div className="arl-display text-4xl font-bold text-[#d79a3c] sm:text-5xl">
                    $16,500
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.14em] text-[#f5f1e6]/60">
                    per person
                  </div>
                  <a
                    href="#inquire"
                    className="mt-5 inline-block rounded-full bg-gradient-to-r from-[#d79a3c] to-[#b6772a] px-7 py-3 text-sm font-semibold text-[#0c1a15] shadow-[0_10px_30px_-10px_rgba(215,154,60,0.7)] transition-transform hover:-translate-y-0.5"
                  >
                    Request availability →
                  </a>
                </div>
              </div>
            </div>

            {/* BYOB tiers */}
            <div className="mb-4">
              <h3 className="arl-display mb-1 text-xl font-semibold text-[#16281f]">
                Build Your Own Booking (BYOB)
              </h3>
              <p className="text-sm leading-relaxed text-[#3d5347]">
                Available <span className="font-semibold">June 12 – July 31, 2026</span> —
                a shorter, flexible stay for guests who can&apos;t take the full
                week. Only the 6-day/7-night tier includes Anchorage
                transportation.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {byobTiers.map((tier) => (
                <div key={tier.nights} className="arl-card p-6">
                  <div className="arl-display text-2xl font-bold text-[#9c4230]">
                    {tier.price}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.1em] text-[#6b7d70]">
                    {tier.note}
                  </div>
                  <h4 className="arl-display mt-3 text-base font-semibold text-[#16281f]">
                    {tier.nights}
                  </h4>
                </div>
              ))}
            </div>

            {/* Add-ons */}
            <div className="mt-10 arl-card p-6 sm:p-8">
              <h3 className="arl-display mb-4 text-lg font-semibold text-[#16281f]">
                Optional add-ons (BYOB)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {addOns.map((a) => (
                  <div key={a.t} className="rounded-2xl border border-[#2c4a3d]/15 bg-[#faf7ef] p-4">
                    <div className="arl-display text-xl font-bold text-[#d79a3c]">{a.p}</div>
                    <div className="mt-2 text-sm font-semibold leading-snug text-[#16281f]">
                      {a.t}
                    </div>
                    <div className="mt-1 text-[11px] text-[#6b7d70]">{a.n}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment terms — grounded, honest */}
            <div className="mx-auto mt-6 max-w-3xl arl-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#6b7d70]">
                <span className="font-semibold text-[#16281f]">Payment terms:</span> a
                50% deposit is required at booking, with the balance due 90
                days before arrival. The deposit is non-refundable within 180
                days of arrival unless the lodge successfully rebooks the
                spot. There is no online real-time booking engine today —
                every trip is arranged through a direct inquiry (see below).
              </p>
            </div>
          </section>

          {/* FLYING IN */}
          <section id="flying-in" className="relative overflow-hidden bg-gradient-to-br from-[#132b22] via-[#1c3b2e] to-[#0c1a15] py-20 text-[#f5f1e6]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#a9c4b6" strokeWidth="1.2" fill="none" strokeDasharray="3 10" />
              <path d="M-50 280 C 300 250, 700 310, 1250 260" stroke="#a9c4b6" strokeWidth="0.8" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <PhotoPlaceholder
                      accent="amber"
                      figure="float"
                      label="Daily floatplane fly-outs"
                      tall
                      photo={{
                        src: "/demos/rainbow-lodge/hero-floatplane.webp",
                        credit: "Paxson Woelber · CC BY 2.0",
                        position: "center 55%",
                      }}
                      className="w-full max-w-md sm:h-[340px]"
                    />
                  </div>
                </div>
                <div>
                  <p className="arl-eyebrow mb-3 !text-[#e8bd77]">Getting there</p>
                  <h2 className="arl-display mb-4 text-3xl font-bold sm:text-4xl">
                    Fly-in only — <span className="text-[#d79a3c]">and that's the point.</span>
                  </h2>
                  <div className="space-y-4 text-[#f5f1e6]/85">
                    <p className="leading-relaxed">
                      Alaska Rainbow Lodge sits in the heart of Bristol Bay,
                      with access to the Kvichak and Alagnak rivers — country
                      you simply can&apos;t drive to. The Signature package
                      includes a private round-trip charter flight from
                      Anchorage, then daily floatplane fly-outs from the lodge
                      to the day&apos;s water.
                    </p>
                    <p className="leading-relaxed">
                      During the summer season (June–September), the lodge
                      operates from its King Salmon-area base. The live panel
                      up top pulls current conditions from the nearest
                      station, King Salmon Airport (PAKN) — useful for sizing
                      up a floatplane-access lodge before you book, and for
                      guests already there checking today&apos;s fly-out
                      weather. The lodge&apos;s own pilots and guides always
                      make the real daily call.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* THE EXPERIENCE */}
          <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="arl-eyebrow mb-3">Beyond the boat</p>
              <h2 className="arl-display text-4xl font-bold text-[#16281f] sm:text-5xl">
                The <span className="text-[#9c4230]">experience.</span>
              </h2>
              <div className="arl-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3d5347]">
                Fishing is the heart of it, but Bristol Bay has more to offer —
                from wildlife to wilderness history.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {experienceItems.map((e) => (
                <div key={e.title} className="arl-card flex flex-col overflow-hidden">
                  <PhotoPlaceholder
                    accent={e.accent}
                    figure={e.figure}
                    label={e.title}
                    photo={e.photo}
                    className="rounded-b-none border-0"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="arl-display text-lg font-semibold leading-tight text-[#16281f]">
                        {e.title}
                      </h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#2c4a3d]/20 bg-[#2c4a3d]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#2c4a3d]">
                        {e.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3d5347]">{e.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
            <div className="mb-10 text-center">
              <p className="arl-eyebrow mb-3">Frequently asked</p>
              <h2 className="arl-display text-4xl font-bold text-[#16281f] sm:text-5xl">
                Planning your <span className="text-[#9c4230]">trip.</span>
              </h2>
              <div className="arl-rule" />
            </div>

            <div className="space-y-4">
              {lodgeFaq.map((f) => (
                <div key={f.q} className="arl-card p-6">
                  <h3 className="arl-display mb-2 text-base font-semibold leading-snug text-[#16281f]">
                    {f.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3d5347]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INQUIRY CTA — honest: no fake checkout, a real request-availability
              prompt pointing to the lodge's actual contact channels. */}
          <section id="inquire" className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#d79a3c]/40 bg-gradient-to-br from-[#132b22] via-[#1c3b2e] to-[#0c1a15] p-10 text-center text-[#f5f1e6] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="arl-display mb-4 text-3xl font-bold sm:text-4xl">
                Request your <span className="text-[#d79a3c]">2026 availability.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#f5f1e6]/85">
                Alaska Rainbow Lodge doesn&apos;t run an online booking
                engine today — every trip starts with a direct conversation
                with the lodge team, who can walk you through 2026 dates,
                the Signature package, or a Build-Your-Own stay. A 50%
                deposit locks in your spot.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={`mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(
                    "2026 availability inquiry — Alaska Rainbow Lodge"
                  )}`}
                  className="rounded-full bg-gradient-to-r from-[#d79a3c] to-[#b6772a] px-8 py-3.5 text-center text-sm font-semibold text-[#0c1a15] shadow-[0_10px_30px_-10px_rgba(215,154,60,0.7)] transition-transform hover:-translate-y-0.5"
                >
                  Email {INQUIRY_EMAIL} →
                </a>
                <a
                  href={`tel:${INQUIRY_PHONE_TEL}`}
                  className="rounded-full border border-[#f5f1e6]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f5f1e6]/90 transition-colors hover:border-[#f5f1e6]/70 hover:bg-[#f5f1e6]/5"
                >
                  Call {INQUIRY_PHONE}
                </a>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#f5f1e6]/50">
                This is a sample inquiry prompt, not a live form — the real
                Alaska Rainbow Lodge handles all 2026 booking inquiries
                directly by phone and email.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE — honest disclaimer */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="arl-card px-5 py-4 text-center text-xs leading-relaxed text-[#6b7d70]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#16281f]">
                  sample marketing &amp; booking-inquiry site
                </span>{" "}
                built by{" "}
                <a
                  href={SITE}
                  className="font-semibold text-[#9c4230] underline underline-offset-2 hover:text-[#b6772a]"
                >
                  BlueWave Projects
                </a>{" "}
                on publicly verified information — it is{" "}
                <span className="font-semibold text-[#16281f]">
                  not affiliated with or endorsed by Alaska Rainbow Lodge
                </span>{" "}
                or the Ferguson family. Photos are{" "}
                <span className="font-semibold text-[#16281f]">
                  license-clean sample imagery
                </span>{" "}
                of general Bristol Bay fishing, wildlife, and floatplane scenes
                from Wikimedia Commons — the final build would use the
                lodge&apos;s own official photography, branding, and logo.
                Sample photo credits: floatplane drop-off, Dakavak Lake, Katmai
                National Park by Paxson Woelber (CC BY 2.0); leopard rainbow
                trout, Bristol Bay by Fishinphoto (CC BY-SA 4.0); Kvichak River
                by the U.S. Senate — Office of Lisa Murkowski (public domain);
                spawning sockeye salmon and the Bristol Bay sockeye run by the
                U.S. EPA (public domain); Kodiak brown bear catching a salmon
                by USFWS Alaska (public domain). Full credits in{" "}
                <span className="arl-mono rounded bg-[#2c4a3d]/8 px-1 py-0.5 text-[#9c4230]">
                  /demos/rainbow-lodge/CREDITS.md
                </span>
                . The rafting and Proenneke Cabin Tour tiles, and other slots
                with no fitting licensed photo, keep designed illustration
                art. The &quot;King Salmon right now&quot; panel attempts a
                live observation for King Salmon Airport (ICAO PAKN) from the
                National Weather Service API; if the browser can&apos;t read
                it, it shows a clearly-labeled sample instead. Sunrise,
                sunset, and daylight hours are computed for King Salmon&apos;s
                coordinates. All package pricing, package inclusions, founding
                and ownership history, and contact details above were verified
                directly from alaskarainbowlodge.com on 2026-07-03. Items
                marked{" "}
                <span className="arl-mono rounded bg-[#2c4a3d]/8 px-1 py-0.5 text-[#9c4230]">
                  [confirm]
                </span>{" "}
                are real details not fully specified in that source. Always
                confirm current pricing, availability, and terms directly with
                Alaska Rainbow Lodge before booking.
              </p>
            </div>
          </div>
        </main>
      </LodgeShell>
      {/* Footer lives OUTSIDE <LodgeShell>: the shell paints a light parchment
          canvas, and the site Footer is styled for dark backgrounds (white-
          alpha text with no background of its own) — inside the shell its
          text washed out. Rendered here on a deep forest-green surface it
          reads correctly, matching the palette. */}
      <div className="bg-[#0c1a15] text-[#f5f1e6]">
        <Footer />
      </div>
    </>
  );
}
