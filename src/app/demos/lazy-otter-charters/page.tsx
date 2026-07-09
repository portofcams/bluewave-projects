import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import {
  TourShell,
  Emblem,
  PhotoPlaceholder,
  SoundConditions,
  SITE,
  HUB_PATH,
  type TourAccent,
  type PhotoSrc,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already
// Disallow: /demos; this metadata block is belt-and-suspenders so the proof
// never pollutes bluewaveprojects.com's index.
export const metadata: Metadata = {
  title: "Lazy Otter Charters — Prince William Sound Glacier & Wildlife Tours (Sample)",
  description:
    "A guest-facing marketing and inquiry sample for Lazy Otter Charters — a family-run Whittier, Alaska boat-tour operator since 1994, offering custom small-group glacier and wildlife cruises, water taxi, and guided kayaking of Prince William Sound. A live Portage Glacier conditions panel and a clear path to a real phone inquiry. A sample build by BlueWave Projects on publicly verified information.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED TOUR DATA
// ---------------------------------------------------------------------------
// Every figure below is from the brief's verified facts (fetched directly
// from lazyottercharters.com and the earlier business sweep, 2026-07-03).
// Anything not confirmed there is marked "[confirm]" and nothing is invented.
// No pricing is shown anywhere on this page — the operator's own site
// publishes none, and none is fabricated here.

const INQUIRY_PHONE = "(800) 587-6887";
const INQUIRY_PHONE_TEL = "+18005876887";

type TourItem = {
  title: string;
  accent: TourAccent;
  figure: "glacier" | "boat" | "kayak" | "otter" | "seal";
  blurb: string;
  tag: string;
  photo?: PhotoSrc;
};

const tourItems: TourItem[] = [
  {
    title: "Glacier & wildlife cruises",
    accent: "fjord",
    figure: "glacier",
    blurb:
      "Custom small-group cruises into Prince William Sound — tidewater glaciers calving into cold, still water, with a captain who knows where the wildlife tends to show up that day.",
    tag: "Signature",
    photo: {
      src: "/demos/lazy-otter-charters/hero-tidewater-glacier.webp",
      credit: "USFWS · Public domain",
      position: "center 45%",
    },
  },
  {
    title: "Sightseeing tours",
    accent: "slate",
    figure: "boat",
    blurb:
      "A gentler, scenery-first outing through the Sound for guests who want the glaciers, the mountains, and the wildlife without a full-day itinerary. [confirm exact duration/route]",
    tag: "Sightseeing",
    // No fitting license-clean sightseeing-specific photo found — keeps SVG art.
  },
  {
    title: "Water taxi service",
    accent: "amber",
    figure: "boat",
    blurb:
      "Drop-off and pickup service into Prince William Sound's backcountry — for campers, kayakers, and anyone who needs a boat ride into country you can't drive to.",
    tag: "Water taxi",
    photo: {
      src: "/demos/lazy-otter-charters/whittier-harbor.webp",
      credit: "USDA Forest Service · Public domain",
      position: "center 50%",
    },
  },
  {
    title: "Guided kayaking tours",
    accent: "ice",
    figure: "kayak",
    blurb:
      "Guided sea-kayaking outings on the Sound's protected waters — a quieter, closer-to-the-water way to see the same glaciers, otters, and seals the bigger boats reach.",
    tag: "Guided kayaking",
    photo: {
      src: "/demos/lazy-otter-charters/kayakers-pws-whittier.webp",
      credit: "Laura Alier · CC BY 4.0",
      position: "center 55%",
    },
  },
  {
    title: "Exclusive beach landings",
    accent: "coral",
    figure: "otter",
    blurb:
      "Custom beach landings that put you ashore in spots most Sound tours only pass by — Lazy Otter's small-group approach makes a stop like this possible. [confirm which beaches]",
    tag: "Custom · exclusive",
    photo: {
      src: "/demos/lazy-otter-charters/sea-otter.webp",
      credit: "RndmCrs · CC0",
      position: "center 40%",
    },
  },
  {
    title: "The wildlife of the Sound",
    accent: "slate",
    figure: "seal",
    blurb:
      "Sea otters, harbor seals, and Steller sea lions haul out and raft up throughout Prince William Sound — part of what makes a small, patient boat worth booking over a big one.",
    tag: "What you'll see",
    photo: {
      src: "/demos/lazy-otter-charters/harbor-seal-ice-pws.webp",
      credit: "NPS Alaska Region · Public domain",
      position: "center 45%",
    },
  },
];

// Grounded FAQ. Anything not publicly confirmed is marked [confirm].
const tourFaq: { q: string; a: string }[] = [
  {
    q: "How do I book a tour?",
    a: `There's no online booking or pricing published today — every trip is arranged directly with the Lazy Otter Charters team. Call ${INQUIRY_PHONE} to ask about dates, group size, and what's running this week.`,
  },
  {
    q: "Where do we meet?",
    a: "At the Lazy Otter Charters dock in Whittier, Alaska — at the end of Harbor Road. Look for the green roof.",
  },
  {
    q: "When does the season run?",
    a: "Roughly March through October, weather and ice conditions permitting each year. [confirm exact season dates for 2026]",
  },
  {
    q: "What's included on a glacier & wildlife cruise?",
    a: "A custom, small-group cruise into Prince William Sound with a Lazy Otter captain — tidewater glaciers, and whatever wildlife (otters, seals, sea lions, and more) is showing up that day. Exact duration, group size, and inclusions vary by trip — ask the team directly. [confirm specifics]",
  },
  {
    q: "Do you do water taxi drop-offs for kayakers and campers?",
    a: "Yes — Lazy Otter runs a water taxi service into Prince William Sound's backcountry, in addition to their own guided kayaking tours and cruises.",
  },
  {
    q: "Is the conditions panel on this page real?",
    a: "The \"Prince William Sound right now\" panel attempts a live observation for Portage Glacier (ICAO PATO), right at the entrance to the Sound near Whittier, from the National Weather Service API. If your browser can read that feed, it's badged \"Live · NWS\" with the observation time; if not, the panel shows a clearly-labeled \"Sample.\" Sunrise, sunset, and daylight hours are computed for Portage Glacier's coordinates. It's a friendly planning read, not a substitute for Lazy Otter's own captains and crew.",
  },
];

export default function LazyOtterChartersPage() {
  return (
    // Page-local "glacier ice / sunset coral" theme: cool pale canvas, deep
    // fjord-teal ink, coral + amber accents, Fraunces display serif.
    // Everything scoped under <TourShell> (.loc-tour) — no globals.css /
    // tailwind.config / shared components touched, so the rest of
    // bluewaveprojects.com is unchanged. The site Footer is rendered AFTER
    // </TourShell> on its own dark surface so its light-on-dark text stays
    // legible (inside the shell it washed out).
    <>
      <TourShell>
        <main className="min-h-screen text-[#0e2a30]">
          <Nav />
          <DemoTracking demo="lazy-otter-charters" />

          {/* HERO — tour marketing hero over a real glacier photo, under a
              deep fjord-teal scrim, live conditions panel prominent. */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0d2e36] via-[#134450] to-[#071c22] text-[#f2f8f7]">
            {/* real hero background photo (license-clean; see CREDITS.md) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/lazy-otter-charters/hero-tidewater-glacier.webp"
              alt="A tidewater glacier in Prince William Sound, Alaska — sample hero photo"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 55%" }}
            />
            {/* deep fjord-teal scrim over the photo — keeps text fully legible */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0d2e36]/92 via-[#134450]/84 to-[#071c22]/94" />
            <div className="pointer-events-none absolute inset-0 bg-[#071c22]/25" />
            {/* on-image hero credit */}
            <span className="absolute right-3 top-20 z-10 rounded-full bg-[#071c22]/50 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#f2f8f7]/70 backdrop-blur-sm">
              Tidewater glacier, Prince William Sound · USFWS · Public domain
            </span>
            {/* sound-water texture + evening sun */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="hero-sun" cx="84%" cy="18%" r="42%">
                  <stop offset="0%" stopColor="#ffd9a8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffd9a8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#hero-sun)" />
              <path d="M-50 460 C 300 400, 700 500, 1250 440" stroke="#f2f8f7" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
              <path d="M-50 500 C 300 450, 700 540, 1250 480" stroke="#f2f8f7" strokeWidth="1" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e8a23c]/45 bg-[#071c22]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f2c37f]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e8a23c]" />
                    Whittier, Alaska · Gateway to Prince William Sound
                  </div>
                  <h1 className="loc-display mb-5 max-w-2xl text-5xl font-bold leading-[1.03] sm:text-6xl">
                    Lazy Otter Charters.{" "}
                    <span className="text-[#e8a23c]">Family-run on the Sound since 1994.</span>
                  </h1>
                  <div className="loc-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#f2f8f7]/85">
                    For over 30 years, this family-owned operator has been
                    running custom small-group glacier and wildlife cruises,
                    sightseeing tours, a water taxi, and guided kayaking out
                    of Whittier — the gateway to Prince William Sound.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#tours"
                      className="rounded-full bg-gradient-to-r from-[#e8a23c] to-[#c17f27] px-8 py-3.5 text-center text-sm font-semibold text-[#071c22] shadow-[0_10px_30px_-10px_rgba(232,162,60,0.7)] transition-transform hover:-translate-y-0.5"
                    >
                      See the tours →
                    </a>
                    <a
                      href="#inquire"
                      className="rounded-full border border-[#f2f8f7]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f2f8f7]/90 transition-colors hover:border-[#f2f8f7]/70 hover:bg-[#f2f8f7]/5"
                    >
                      Call to book
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — the showpiece, prominent in the hero */}
                <div className="relative">
                  <SoundConditions />
                  <Emblem size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS — grounded anchors */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { v: "1994", l: "Family-run since", s: "30+ years on the Sound" },
                { v: "Whittier, AK", l: "Home port", s: "End of Harbor Rd · green roof" },
                { v: "March–Oct", l: "Season", s: "[confirm exact 2026 dates]" },
                { v: INQUIRY_PHONE, l: "Book by phone", s: "No online booking today" },
              ].map((stat) => (
                <div key={stat.l} className="loc-card p-5">
                  <div className="loc-display text-2xl font-bold text-[#bd5e37] sm:text-3xl">
                    {stat.v}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1d5c68]">
                    {stat.l}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#5f7f84]">
                    {stat.s}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THE FAMILY STORY */}
          <section id="story" className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="loc-card overflow-hidden p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="loc-eyebrow mb-3">Three decades on the water</p>
                  <h2 className="loc-display text-3xl font-bold leading-tight text-[#0e2a30] sm:text-4xl">
                    A family business,{" "}
                    <span className="text-[#bd5e37]">built on the Sound.</span>
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3a5c62]">
                    <p>
                      Lazy Otter Charters has been family owned and operated
                      out of Whittier, Alaska since 1994 — over three decades
                      running custom small-group tours into Prince William
                      Sound. Whittier sits at the head of Passage Canal, the
                      gateway harbor for the Sound&apos;s glaciers, fjords,
                      and wildlife.
                    </p>
                    <p>
                      Rather than running large tour boats on a fixed
                      schedule, Lazy Otter&apos;s approach centers on custom,
                      small-group trips — glacier and wildlife cruises,
                      sightseeing, a water taxi service, and guided kayaking
                      — with exclusive beach landings built around a small
                      operator&apos;s ability to go where the bigger boats
                      don&apos;t stop. [confirm additional family/company
                      history]
                    </p>
                  </div>
                </div>
                <PhotoPlaceholder
                  accent="fjord"
                  figure="boat"
                  label="Whittier — gateway to Prince William Sound"
                  tall
                  photo={{
                    src: "/demos/lazy-otter-charters/whittier-passage-canal-sunrise.webp",
                    credit: "USDA Forest Service · Public domain",
                    position: "center 50%",
                  }}
                />
              </div>
            </div>
          </section>

          {/* THE TOURS */}
          <section id="tours" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="loc-eyebrow mb-3">What Lazy Otter runs</p>
              <h2 className="loc-display text-4xl font-bold text-[#0e2a30] sm:text-5xl">
                The <span className="text-[#bd5e37]">tours.</span>
              </h2>
              <div className="loc-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3a5c62]">
                Every trip is custom and small-group — from glacier cruises
                to a quiet kayak paddle along the shoreline.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tourItems.map((t) => (
                <div key={t.title} className="loc-card flex flex-col overflow-hidden">
                  <PhotoPlaceholder
                    accent={t.accent}
                    figure={t.figure}
                    label={t.title}
                    photo={t.photo}
                    className="rounded-b-none border-0"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="loc-display text-lg font-semibold leading-tight text-[#0e2a30]">
                        {t.title}
                      </h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#1d5c68]/20 bg-[#1d5c68]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1d5c68]">
                        {t.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3a5c62]">{t.blurb}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Honest note: no online pricing today */}
            <div className="mx-auto mt-8 max-w-3xl loc-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#5f7f84]">
                <span className="font-semibold text-[#0e2a30]">Booking:</span> Lazy
                Otter Charters doesn&apos;t publish pricing or run an online
                booking system today — every trip is arranged by calling the
                team directly at {INQUIRY_PHONE}.
              </p>
            </div>
          </section>

          {/* CONDITIONS TODAY — ties back to the live panel, genuinely useful
              for a PWS boat-tour customer sizing up the day. */}
          <section id="conditions" className="relative overflow-hidden bg-gradient-to-br from-[#0d2e36] via-[#134450] to-[#071c22] py-20 text-[#f2f8f7]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#bfe6e8" strokeWidth="1.2" fill="none" strokeDasharray="3 10" />
              <path d="M-50 280 C 300 250, 700 310, 1250 260" stroke="#bfe6e8" strokeWidth="0.8" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <PhotoPlaceholder
                      accent="ice"
                      figure="glacier"
                      label="Prince William Sound, from Whittier"
                      tall
                      photo={{
                        src: "/demos/lazy-otter-charters/hero-tidewater-glacier.webp",
                        credit: "USFWS · Public domain",
                        position: "center 60%",
                      }}
                      className="w-full max-w-md sm:h-[340px]"
                    />
                  </div>
                </div>
                <div>
                  <p className="loc-eyebrow mb-3 !text-[#f2c37f]">Before you go</p>
                  <h2 className="loc-display mb-4 text-3xl font-bold sm:text-4xl">
                    Conditions on the Sound, <span className="text-[#e8a23c]">right now.</span>
                  </h2>
                  <div className="space-y-4 text-[#f2f8f7]/85">
                    <p className="leading-relaxed">
                      Prince William Sound&apos;s weather changes fast — wind,
                      visibility, and ceiling all matter to a small-boat
                      operator planning a glacier run or a kayak put-in. The
                      live panel up top pulls current conditions from
                      Portage Glacier (PATO), the nearest station right at
                      the Sound&apos;s entrance near Whittier.
                    </p>
                    <p className="leading-relaxed">
                      It&apos;s a useful planning read before you call to
                      book, and a quick check the morning of your trip — but
                      Lazy Otter&apos;s own captains and crew always make the
                      real call on whether and where to run that day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-16">
            <div className="mb-10 text-center">
              <p className="loc-eyebrow mb-3">Frequently asked</p>
              <h2 className="loc-display text-4xl font-bold text-[#0e2a30] sm:text-5xl">
                Planning your <span className="text-[#bd5e37]">trip.</span>
              </h2>
              <div className="loc-rule" />
            </div>

            <div className="space-y-4">
              {tourFaq.map((f) => (
                <div key={f.q} className="loc-card p-6">
                  <h3 className="loc-display mb-2 text-base font-semibold leading-snug text-[#0e2a30]">
                    {f.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3a5c62]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INQUIRY CTA — honest: no fake checkout, a real call-to-book
              prompt pointing to the operator's actual phone number. */}
          <section id="inquire" className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#e8a23c]/40 bg-gradient-to-br from-[#0d2e36] via-[#134450] to-[#071c22] p-10 text-center text-[#f2f8f7] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="loc-display mb-4 text-3xl font-bold sm:text-4xl">
                Ready to see <span className="text-[#e8a23c]">Prince William Sound?</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#f2f8f7]/85">
                Lazy Otter Charters doesn&apos;t run an online booking engine
                today — every trip starts with a phone call to the team, who
                can talk through dates, group size, and what&apos;s running.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={`tel:${INQUIRY_PHONE_TEL}`}
                  className="rounded-full bg-gradient-to-r from-[#e8a23c] to-[#c17f27] px-8 py-3.5 text-center text-sm font-semibold text-[#071c22] shadow-[0_10px_30px_-10px_rgba(232,162,60,0.7)] transition-transform hover:-translate-y-0.5"
                >
                  Call {INQUIRY_PHONE} →
                </a>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#f2f8f7]/50">
                This is a sample inquiry prompt, not a live form — the real
                Lazy Otter Charters handles all booking inquiries directly by
                phone.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE — honest disclaimer */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="loc-card px-5 py-4 text-center text-xs leading-relaxed text-[#5f7f84]">
              <p>
                This is a{" "}
                <span className="font-semibold text-[#0e2a30]">
                  sample marketing &amp; inquiry site
                </span>{" "}
                built by{" "}
                <a
                  href={SITE}
                  className="font-semibold text-[#bd5e37] underline underline-offset-2 hover:text-[#c17f27]"
                >
                  BlueWave Projects
                </a>{" "}
                on publicly verified information — it is{" "}
                <span className="font-semibold text-[#0e2a30]">
                  not affiliated with or endorsed by Lazy Otter Charters
                </span>
                . Photos are{" "}
                <span className="font-semibold text-[#0e2a30]">
                  license-clean sample imagery
                </span>{" "}
                of general Prince William Sound and Whittier scenery and
                wildlife from Wikimedia Commons — the final build would use
                the operator&apos;s own official photography, branding, and
                logo. Sample photo credits: tidewater glacier, Prince William
                Sound by the U.S. Fish and Wildlife Service (public domain);
                sunrise over Passage Canal and the city of Whittier by Aubrey
                Jurgerson / USDA Forest Service, Alaska Region (public
                domain); kayakers on Prince William Sound, Whittier by Laura
                Alier (CC BY 4.0); sea otter in Alaska by RndmCrs (CC0);
                harbor seal on ice, Prince William Sound by the National Park
                Service, Alaska Region (public domain). Full credits in{" "}
                <span className="loc-mono rounded bg-[#1d5c68]/8 px-1 py-0.5 text-[#bd5e37]">
                  /demos/lazy-otter-charters/CREDITS.md
                </span>
                . The &quot;Prince William Sound right now&quot; panel
                attempts a live observation for Portage Glacier (ICAO PATO)
                from the National Weather Service API; if the browser
                can&apos;t read it, it shows a clearly-labeled sample
                instead. Sunrise, sunset, and daylight hours are computed for
                Portage Glacier&apos;s coordinates. Business details above
                (location, family ownership since 1994, tour types, season,
                and phone number) were verified directly from
                lazyottercharters.com on 2026-07-03. Items marked{" "}
                <span className="loc-mono rounded bg-[#1d5c68]/8 px-1 py-0.5 text-[#bd5e37]">
                  [confirm]
                </span>{" "}
                are real details not fully specified in that source. No
                pricing is shown anywhere on this page — Lazy Otter Charters
                does not publish pricing online; none is fabricated here.
                Always confirm current tours, availability, and rates
                directly with Lazy Otter Charters before booking.
              </p>
            </div>
          </div>
        </main>
      </TourShell>
      {/* Footer lives OUTSIDE <TourShell>: the shell paints a light pale
          canvas, and the site Footer is styled for dark backgrounds (white-
          alpha text with no background of its own) — inside the shell its
          text washed out. Rendered here on a deep fjord-teal surface it
          reads correctly, matching the palette. */}
      <div className="bg-[#071c22] text-[#f2f8f7]">
        <Footer />
      </div>
    </>
  );
}
