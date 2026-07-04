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
  title: "Royal Coachman Lodge — Wood-Tikchik Fly-In Fishing (Sample)",
  description:
    "A guest-facing marketing and inquiry sample for Royal Coachman Lodge — a rare, grandfathered fly-in-only lodge on the Nuyakuk River in Wood-Tikchik State Park, Bristol Bay, Alaska. A live Dillingham flying-conditions panel and a clear path to a real availability inquiry. A sample build by BlueWave Projects on publicly verified information.",
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
// from royalcoachmanlodge.com, 2026-07-03). Rates are third-party-sourced,
// clearly marked as such — never presented as the lodge's own published
// pricing. Anything not confirmed is marked "[confirm]" and nothing is
// invented.

const INQUIRY_EMAIL = "info@royalcoachmanlodge.com";
const INQUIRY_PHONE = "406.222.0624";
const INQUIRY_PHONE_TEL = "+14062220624";

type ExperienceItem = {
  title: string;
  accent: LodgeAccent;
  figure: "river" | "fish" | "float" | "cabin" | "map";
  blurb: string;
  tag: string;
  photo?: PhotoSrc;
};

const experienceItems: ExperienceItem[] = [
  {
    title: "Daily fly-out fishing",
    accent: "river",
    figure: "float",
    blurb:
      "Two De Havilland Beaver floatplanes and three pilots with a combined 60+ years of bush-flying experience carry guests out from the lodge each morning to whichever water is fishing best that day. [confirm — fleet/pilot figures per third-party sources]",
    tag: "Signature",
    photo: {
      src: "/demos/royal-coachman/beaver-floatplane.webp",
      credit: "gillfoto · CC BY-SA 4.0",
      position: "center 55%",
    },
  },
  {
    title: "Roughly 30 rivers, up to 120 miles out",
    accent: "slate",
    figure: "map",
    blurb:
      "Rather than fishing one home river, the lodge's daily fly-outs reach a network of roughly 30 rivers across the region — up to 120 miles one-way — chasing whichever water and species are running best. [confirm — figures per third-party sources]",
    tag: "The range",
  },
  {
    title: "Wood-Tikchik State Park",
    accent: "river",
    figure: "river",
    blurb:
      "The lodge sits inside Wood-Tikchik State Park — the largest state park in the United States — on the Nuyakuk River, a rare grandfathered property in a park otherwise closed to new development.",
    tag: "The setting",
    photo: {
      src: "/demos/royal-coachman/wood-tikchik.webp",
      credit: "mazaletel · CC BY 2.0",
      position: "center 45%",
    },
  },
  {
    title: "Rainbow trout, salmon & grayling",
    accent: "copper",
    figure: "fish",
    blurb:
      "The Wood River Lakes system and its tributary creeks hold some of Bristol Bay's best-known rainbow trout, along with salmon and grayling through the season.",
    tag: "The fishing",
    photo: {
      src: "/demos/royal-coachman/rainbow-trout-gechiak.webp",
      credit: "USFWS · Public domain",
      position: "center 40%",
    },
  },
  {
    title: "Aleknagik — the gateway",
    accent: "slate",
    figure: "river",
    blurb:
      "Guests arrive via a roughly 30-minute floatplane flight from the Aleknagik/Dillingham area — the last stretch of a trip that starts with commercial air into Dillingham.",
    tag: "Getting there",
    photo: {
      src: "/demos/royal-coachman/aleknagik-lake.webp",
      credit: "Alex Smith · CC BY 3.0 US",
      position: "center 50%",
    },
  },
  {
    title: "Sweetwater Travel",
    accent: "copper",
    figure: "cabin",
    blurb:
      "Royal Coachman Lodge operates under Sweetwater Travel, a parent company managing multiple fishing properties — bringing shared operational depth to a small, remote, fly-in-only lodge.",
    tag: "Who runs it",
    // No fitting license-clean photo of Sweetwater Travel's other properties
    // was verified for this build; keeps the honest SVG placeholder.
  },
];

// Grounded FAQ. Anything not publicly confirmed is marked [confirm].
const lodgeFaq: { q: string; a: string }[] = [
  {
    q: "How much does a trip cost?",
    a: "Royal Coachman Lodge does not publish pricing on its own site. Third-party booking sources cite roughly $13,850–$14,500 per person for 7 nights / 6 days of guided fishing (2026–2027 range), with some sources mentioning group discounts for 4+ or 10+ anglers. Treat these as approximate — confirm current pricing directly with the lodge.",
  },
  {
    q: "How do I get there?",
    a: "This is a rare, grandfathered fly-in-only property inside Wood-Tikchik State Park — there's no road access. Guests fly commercial into the Dillingham area, then take a roughly 30-minute floatplane flight to the lodge on the Nuyakuk River.",
  },
  {
    q: "Who runs the lodge?",
    a: "Scott Schumacher manages the lodge and leads the guide operation — he's been fishing the Bristol Bay region since 1987. The lodge operates under Sweetwater Travel, a parent company that manages several fishing properties.",
  },
  {
    q: "How do I book, and what happens once I'm there?",
    a: "There's no online real-time booking engine — the lodge's own site directs prospective guests to contact them directly for prime-date availability. Once at the lodge, daily floatplane fly-outs reach roughly 30 rivers up to 120 miles out, so each day's water is chosen based on conditions and what's running. [confirm — booking terms/deposit schedule not published on the lodge's own site]",
  },
  {
    q: "Is the flying-conditions panel on this page real?",
    a: "The \"Dillingham right now\" panel attempts a live observation for Dillingham Airport (ICAO PADL), the real regional hub airport nearest the lodge's floatplane departure point, from the National Weather Service API. If your browser can read that feed, it's badged \"Live · NWS\" with the observation time; if not, the panel shows a clearly-labeled \"Sample.\" Sunrise, sunset, and daylight hours are computed for Dillingham's coordinates. It's a friendly planning read, not a substitute for the lodge's own pilots' daily fly-out call.",
  },
];

export default function RoyalCoachmanLodgePage() {
  return (
    // Page-local "slate river-blue / copper" theme: cool stone canvas, deep
    // slate-blue ink, copper + rust accents, Fraunces display serif.
    // Everything scoped under <LodgeShell> (.rcl-lodge) — no globals.css /
    // tailwind.config / shared components touched, so the rest of
    // bluewaveprojects.com is unchanged. The site Footer is rendered AFTER
    // </LodgeShell> on its own dark surface so its light-on-dark text stays
    // legible (inside the parchment shell it washed out).
    <>
      <LodgeShell>
        <main className="min-h-screen text-[#111f2b]">
          <Nav />

          {/* HERO — lodge marketing hero over a real Wood-Tikchik photo,
              under a deep slate scrim, live conditions panel prominent. */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2033] via-[#16334a] to-[#0a1420] text-[#f2ede2]">
            {/* real hero background photo (license-clean; see CREDITS.md) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/royal-coachman/wood-tikchik.webp"
              alt="Wood-Tikchik State Park, Alaska — sample hero photo"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 55%" }}
            />
            {/* deep slate scrim over the photo — keeps text fully legible */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0f2033]/92 via-[#16334a]/84 to-[#0a1420]/94" />
            <div className="pointer-events-none absolute inset-0 bg-[#0a1420]/25" />
            {/* on-image hero credit */}
            <span className="absolute right-3 top-20 z-10 rounded-full bg-[#0a1420]/50 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#f2ede2]/70 backdrop-blur-sm">
              Wood-Tikchik State Park · mazaletel · CC BY 2.0
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
                  <stop offset="0%" stopColor="#ffd9ae" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffd9ae" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#hero-sun)" />
              <path d="M-50 460 C 300 400, 700 500, 1250 440" stroke="#f2ede2" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
              <path d="M-50 500 C 300 450, 700 540, 1250 480" stroke="#f2ede2" strokeWidth="1" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c9793f]/45 bg-[#0a1420]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e8b077]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9793f]" />
                    Wood-Tikchik State Park, Alaska · Fly-in only
                  </div>
                  <h1 className="rcl-display mb-5 max-w-2xl text-5xl font-bold leading-[1.03] sm:text-6xl">
                    Royal Coachman Lodge.{" "}
                    <span className="text-[#c9793f]">A rare, grandfathered place on the Nuyakuk.</span>
                  </h1>
                  <div className="rcl-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#f2ede2]/85">
                    Set on the Nuyakuk River inside Wood-Tikchik State Park —
                    one of the only lodges grandfathered into a park otherwise
                    closed to new development — Royal Coachman Lodge is
                    completely fly-in only. Manager Scott Schumacher has
                    guided this stretch of Bristol Bay since 1987, running
                    daily floatplane fly-outs to whichever water is fishing
                    best.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#experience"
                      className="rounded-full bg-gradient-to-r from-[#c9793f] to-[#a35f2c] px-8 py-3.5 text-center text-sm font-semibold text-[#0a1420] shadow-[0_10px_30px_-10px_rgba(201,121,63,0.7)] transition-transform hover:-translate-y-0.5"
                    >
                      See the experience →
                    </a>
                    <a
                      href="#inquire"
                      className="rounded-full border border-[#f2ede2]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f2ede2]/90 transition-colors hover:border-[#f2ede2]/70 hover:bg-[#f2ede2]/5"
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
                { v: "Fly-in only", l: "Access", s: "~30 min floatplane from Aleknagik/Dillingham" },
                { v: "1987–present", l: "Scott Schumacher", s: "Manager & lead guide" },
                { v: "~30 rivers", l: "Daily fly-outs", s: "Up to 120 miles one-way [confirm]" },
                { v: "Sweetwater Travel", l: "Parent company", s: "Manages multiple fishing properties" },
              ].map((stat) => (
                <div key={stat.l} className="rcl-card p-5">
                  <div className="rcl-display text-2xl font-bold text-[#a35f2c] sm:text-3xl">
                    {stat.v}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#233f56]">
                    {stat.l}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#647985]">
                    {stat.s}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THE LODGE & SCOTT SCHUMACHER */}
          <section id="story" className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="rcl-card overflow-hidden p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="rcl-eyebrow mb-3">Bristol Bay since 1987</p>
                  <h2 className="rcl-display text-3xl font-bold leading-tight text-[#111f2b] sm:text-4xl">
                    A career guide,{" "}
                    <span className="text-[#a35f2c]">a rare piece of ground.</span>
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3a4d5c]">
                    <p>
                      Royal Coachman Lodge sits on the Nuyakuk River, inside
                      Wood-Tikchik State Park — the largest state park in the
                      United States, and a place otherwise closed to new
                      development. The lodge is a rare grandfathered property,
                      completely fly-in only: there is no road, and no
                      substitute for a floatplane.
                    </p>
                    <p>
                      Scott Schumacher manages the lodge and leads the guide
                      operation. He has been fishing the Bristol Bay region
                      since 1987 — decades of reading this water before a
                      single guest steps off the float. The lodge operates
                      under Sweetwater Travel, a parent company that manages
                      several fishing properties, giving a small, remote
                      operation the backing of a larger team.
                    </p>
                  </div>
                </div>
                <PhotoPlaceholder
                  accent="river"
                  figure="river"
                  label="Aleknagik — the gateway to the lodge"
                  tall
                  photo={{
                    src: "/demos/royal-coachman/aleknagik-lake.webp",
                    credit: "Alex Smith · CC BY 3.0 US",
                    position: "center 50%",
                  }}
                />
              </div>
            </div>
          </section>

          {/* THE EXPERIENCE */}
          <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="rcl-eyebrow mb-3">Fly-out fishing</p>
              <h2 className="rcl-display text-4xl font-bold text-[#111f2b] sm:text-5xl">
                The <span className="text-[#a35f2c]">experience.</span>
              </h2>
              <div className="rcl-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3a4d5c]">
                A remote, fly-in-only lodge built around one thing: getting
                guests onto whichever water is fishing best each day.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {experienceItems.map((e) => (
                <div key={e.title} className="rcl-card flex flex-col overflow-hidden">
                  <PhotoPlaceholder
                    accent={e.accent}
                    figure={e.figure}
                    label={e.title}
                    photo={e.photo}
                    className="rounded-b-none border-0"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="rcl-display text-lg font-semibold leading-tight text-[#111f2b]">
                        {e.title}
                      </h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#233f56]/20 bg-[#233f56]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#233f56]">
                        {e.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3a4d5c]">{e.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RATES — clearly marked third-party-sourced/approximate */}
          <section id="rates" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <p className="rcl-eyebrow mb-3">Planning ahead</p>
              <h2 className="rcl-display text-4xl font-bold text-[#111f2b] sm:text-5xl">
                Rates &amp; <span className="text-[#a35f2c]">availability.</span>
              </h2>
              <div className="rcl-rule" />
            </div>

            <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-[#c9793f]/40 bg-gradient-to-br from-[#0f2033] via-[#16334a] to-[#0a1420] p-8 text-[#f2ede2] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-10">
              <p className="rcl-eyebrow mb-2 !text-[#e8b077]">Not the lodge&apos;s own published pricing</p>
              <h3 className="rcl-display text-2xl font-bold sm:text-3xl">
                Roughly $13,850 – $14,500 per person
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f2ede2]/80">
                for 7 nights / 6 days of guided fishing (2026–2027 range),
                <span className="whitespace-nowrap"> per third-party booking sources</span> —
                not published directly by Royal Coachman Lodge. Some sources
                mention group discounts for 4+ or 10+ anglers.{" "}
                <span className="font-semibold text-[#f2ede2]">
                  Treat this as approximate.
                </span>{" "}
                The lodge&apos;s own site has no online booking engine and
                directs prospective guests to contact them directly for
                current, prime-date availability.
              </p>
              <a
                href="#inquire"
                className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#c9793f] to-[#a35f2c] px-7 py-3 text-sm font-semibold text-[#0a1420] shadow-[0_10px_30px_-10px_rgba(201,121,63,0.7)] transition-transform hover:-translate-y-0.5"
              >
                Get a firm quote from the lodge →
              </a>
            </div>
          </section>

          {/* FLYING IN */}
          <section id="flying-in" className="relative overflow-hidden bg-gradient-to-br from-[#0f2033] via-[#16334a] to-[#0a1420] py-20 text-[#f2ede2]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#7fa3bd" strokeWidth="1.2" fill="none" strokeDasharray="3 10" />
              <path d="M-50 280 C 300 250, 700 310, 1250 260" stroke="#7fa3bd" strokeWidth="0.8" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <PhotoPlaceholder
                      accent="copper"
                      figure="float"
                      label="Daily floatplane fly-outs"
                      tall
                      photo={{
                        src: "/demos/royal-coachman/beaver-floatplane.webp",
                        credit: "gillfoto · CC BY-SA 4.0",
                        position: "center 55%",
                      }}
                      className="w-full max-w-md sm:h-[340px]"
                    />
                  </div>
                </div>
                <div>
                  <p className="rcl-eyebrow mb-3 !text-[#e8b077]">Getting there</p>
                  <h2 className="rcl-display mb-4 text-3xl font-bold sm:text-4xl">
                    Fly-in only — <span className="text-[#c9793f]">completely, and by design.</span>
                  </h2>
                  <div className="space-y-4 text-[#f2ede2]/85">
                    <p className="leading-relaxed">
                      Royal Coachman Lodge is a rare, grandfathered property
                      inside Wood-Tikchik State Park — reachable only by
                      floatplane. Guests fly commercial into the
                      Aleknagik/Dillingham area, then take a roughly 30-minute
                      floatplane flight to the lodge on the Nuyakuk River.
                    </p>
                    <p className="leading-relaxed">
                      The live panel up top pulls current conditions from
                      Dillingham Airport (PADL) — the real regional hub
                      airport nearest that floatplane departure point. It's a
                      useful read for sizing up a fly-in-only lodge before you
                      book, and for guests already there checking today's
                      fly-out weather. The lodge's own pilots and guides
                      always make the real daily call.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-16">
            <div className="mb-10 text-center">
              <p className="rcl-eyebrow mb-3">Frequently asked</p>
              <h2 className="rcl-display text-4xl font-bold text-[#111f2b] sm:text-5xl">
                Planning your <span className="text-[#a35f2c]">trip.</span>
              </h2>
              <div className="rcl-rule" />
            </div>

            <div className="space-y-4">
              {lodgeFaq.map((f) => (
                <div key={f.q} className="rcl-card p-6">
                  <h3 className="rcl-display mb-2 text-base font-semibold leading-snug text-[#111f2b]">
                    {f.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3a4d5c]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INQUIRY CTA — honest: no fake checkout, a real request-availability
              prompt pointing to the lodge's actual contact channels. */}
          <section id="inquire" className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#c9793f]/40 bg-gradient-to-br from-[#0f2033] via-[#16334a] to-[#0a1420] p-10 text-center text-[#f2ede2] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="rcl-display mb-4 text-3xl font-bold sm:text-4xl">
                Request your <span className="text-[#c9793f]">availability.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#f2ede2]/85">
                Royal Coachman Lodge doesn&apos;t run an online booking engine
                today — the lodge&apos;s own site directs every inquiry
                straight to the team, who can confirm prime dates, current
                pricing, and what the season is fishing like.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={`mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(
                    "Availability inquiry — Royal Coachman Lodge"
                  )}`}
                  className="rounded-full bg-gradient-to-r from-[#c9793f] to-[#a35f2c] px-8 py-3.5 text-center text-sm font-semibold text-[#0a1420] shadow-[0_10px_30px_-10px_rgba(201,121,63,0.7)] transition-transform hover:-translate-y-0.5"
                >
                  Email {INQUIRY_EMAIL} →
                </a>
                <a
                  href={`tel:${INQUIRY_PHONE_TEL}`}
                  className="rounded-full border border-[#f2ede2]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f2ede2]/90 transition-colors hover:border-[#f2ede2]/70 hover:bg-[#f2ede2]/5"
                >
                  Call {INQUIRY_PHONE}
                </a>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#f2ede2]/50">
                This is a sample inquiry prompt, not a live form — the real
                Royal Coachman Lodge handles all booking inquiries directly
                by phone and email.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE — honest disclaimer */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="rcl-card px-5 py-4 text-center text-xs leading-relaxed text-[#647985]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#111f2b]">
                  sample marketing &amp; inquiry site
                </span>{" "}
                built by{" "}
                <a
                  href={SITE}
                  className="font-semibold text-[#a35f2c] underline underline-offset-2 hover:text-[#c9793f]"
                >
                  BlueWave Projects
                </a>{" "}
                on publicly verified information — it is{" "}
                <span className="font-semibold text-[#111f2b]">
                  not affiliated with or endorsed by Royal Coachman Lodge
                </span>
                , Sweetwater Travel, or Scott Schumacher. Photos are{" "}
                <span className="font-semibold text-[#111f2b]">
                  license-clean sample imagery
                </span>{" "}
                of general Wood-Tikchik / Bristol Bay fishing, wildlife, and
                floatplane scenes from Wikimedia Commons — the final build
                would use the lodge&apos;s own official photography,
                branding, and logo. Sample photo credits: Wood-Tikchik State
                Park by mazaletel (CC BY 2.0); Lake Aleknagik by Alex Smith
                (CC BY 3.0 US); a De Havilland Beaver floatplane (Ward Air) by
                gillfoto (CC BY-SA 4.0); rainbow trout in hand at Gechiak
                Creek by the U.S. Fish and Wildlife Service (public domain).
                Full credits in{" "}
                <span className="rcl-mono rounded bg-[#233f56]/8 px-1 py-0.5 text-[#a35f2c]">
                  /demos/royal-coachman/CREDITS.md
                </span>
                . Slots with no fitting licensed photo — Sweetwater Travel&apos;s
                other properties, the lodge&apos;s own cabins, and Scott
                Schumacher himself — keep designed illustration art. The
                &quot;Dillingham right now&quot; panel attempts a live
                observation for Dillingham Airport (ICAO PADL) from the
                National Weather Service API; if the browser can&apos;t read
                it, it shows a clearly-labeled sample instead. Sunrise,
                sunset, and daylight hours are computed for Dillingham&apos;s
                coordinates. The lodge&apos;s setting, fly-in-only access,
                Scott Schumacher&apos;s tenure since 1987, and the Sweetwater
                Travel relationship were verified directly from
                royalcoachmanlodge.com on 2026-07-03. The fleet/pilot figures
                and per-person rates come from third-party sources, not the
                lodge&apos;s own site, and are marked{" "}
                <span className="rcl-mono rounded bg-[#233f56]/8 px-1 py-0.5 text-[#a35f2c]">
                  [confirm]
                </span>{" "}
                or called out as approximate above. Always confirm current
                pricing, availability, and terms directly with Royal Coachman
                Lodge before booking.
              </p>
            </div>
          </div>
        </main>
      </LodgeShell>
      {/* Footer lives OUTSIDE <LodgeShell>: the shell paints a light stone
          canvas, and the site Footer is styled for dark backgrounds (white-
          alpha text with no background of its own) — inside the shell its
          text washed out. Rendered here on a deep slate-blue surface it
          reads correctly, matching the palette. */}
      <div className="bg-[#0a1420] text-[#f2ede2]">
        <Footer />
      </div>
    </>
  );
}
