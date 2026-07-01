import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { events, HUB_PATH, SITE } from "./events";
import {
  HeritageShell,
  Seal,
  PhotoPlaceholder,
  SampleNote,
  IditarodMotion,
  ticketBadge,
  accentText,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. The robots block keeps this
// proof out of bluewaveprojects.com's index so it never pollutes SEO.
export const metadata: Metadata = {
  title: "Iditarod 2027 Events & Tickets Hub — Sample by BlueWave Projects",
  description:
    "A sample, conversion-optimized events and ticketing hub for the Iditarod 2027 season — built by BlueWave Projects on public information to show the Iditarod Trail Committee what a unified, first-party ticketing experience could look like.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

export default function IditarodHubPage() {
  return (
    // Page-local "rugged heritage" theme (Direction 3): warm cream paper canvas,
    // deep spruce ink, rust/oxblood accents, aged-gold seal, vintage slab/serif
    // display type. Everything is scoped under <HeritageShell> (.idit-heritage) —
    // no globals.css / tailwind.config / shared components touched, so the rest of
    // bluewaveprojects.com is unchanged.
    <HeritageShell>
      <main className="min-h-screen text-[#1f3d2f]">
        <Nav />

        {/* Hero — spruce band over the real start-line photo, cream display type */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#2b4d3b] via-[#1f3d2f] to-[#152a20] text-[#F3EAD7]">
          {/* faint woodcut trail lines (aged gold / cream) */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path
              d="M-50 180 C 300 80, 600 240, 900 140 S 1300 90, 1300 180"
              stroke="#C08A2D"
              strokeWidth="60"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M0 470 C 250 440, 450 500, 700 470 S 1050 440, 1250 480"
              stroke="#F3EAD7"
              strokeWidth="1.5"
              strokeDasharray="3 10"
              fill="none"
            />
          </svg>

          {/* Subtle "alive" layer: falling flecks, aged-gold aurora shimmer, and a
              spruce sled-dog team running across the band. CSS/SVG only, scoped,
              disabled for prefers-reduced-motion. Sits above texture, below
              content. */}
          <IditarodMotion />

          <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="idit-eyebrow mb-5 inline-flex items-center gap-2 rounded-sm border border-[#C08A2D]/45 bg-[#14241c]/40 px-3 py-1.5 !text-[#e9dcbf]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C08A2D]" />
                  Sample build · Iditarod 2027 · 55th running
                </div>
                <h1 className="idit-display mb-5 max-w-3xl text-5xl font-bold leading-[0.98] sm:text-7xl">
                  The whole Iditarod season,{" "}
                  <span className="text-[#e0a94a]">one place to buy in.</span>
                </h1>
                <div className="idit-perf-rule !mx-0 mb-6" />
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#F3EAD7]/85">
                  Every ticketed moment of the 2027 race — banquet, ceremonial
                  start, restart, finish, and the documentary premiere — pulled
                  into one branded, conversion-optimized hub. No redirects to a
                  generic auction tool. No reseller outranking you for your own
                  events. The buyer stays on the Iditarod brand from interest to
                  checkout.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#events"
                    className="idit-display rounded-sm border-2 border-[#7d3517] bg-[#B5502A] px-8 py-3.5 text-center text-sm font-bold text-[#F3EAD7] shadow-[4px_4px_0_rgba(20,36,28,0.4)] transition-transform hover:-translate-y-0.5"
                  >
                    See the events →
                  </a>
                  <a
                    href="#why"
                    className="idit-display rounded-sm border-2 border-[#F3EAD7]/35 px-8 py-3.5 text-center text-sm font-bold text-[#F3EAD7]/90 transition-colors hover:border-[#F3EAD7]/70 hover:bg-[#F3EAD7]/5"
                  >
                    Why it matters
                  </a>
                </div>
              </div>

              <div className="relative">
                <PhotoPlaceholder
                  accent="aurora"
                  tall
                  imageKey="hero"
                  label="Iditarod start line — Anchorage"
                  stub
                />
                {/* Aged-gold vintage seal overlapping the hero photo */}
                <Seal
                  size={132}
                  className="absolute -bottom-8 -left-8 hidden sm:inline-flex"
                />
              </div>
            </div>
          </div>
        </section>

      {/* Value line / quick stats — heritage ticket-well tiles */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { v: "5", l: "Ticketable moments", s: "Mar 4 – summer 2027" },
            { v: "1", l: "Branded checkout", s: "No third-party redirect" },
            { v: "4+", l: "Systems today", s: "Auctria · ejoinme · Woo · cloud" },
            { v: "0", l: "Prices on the calendar", s: "Every event reads “not specified”" },
          ].map((stat) => (
            <div
              key={stat.l}
              className="rounded-sm border-2 border-[#1f3d2f]/30 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-5 shadow-[4px_4px_0_rgba(31,61,47,0.14)]"
            >
              <div className="idit-display text-4xl font-bold text-[#B5502A]">
                {stat.v}
              </div>
              <div className="idit-display mb-1 mt-2 text-xs font-semibold tracking-[0.12em] text-[#1f3d2f]">
                {stat.l}
              </div>
              <div className="text-xs leading-relaxed text-[#6b5f4a]">
                {stat.s}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events grid — vintage ticket-stub cards */}
      <section id="events" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <p className="idit-eyebrow mb-3">The 2027 season</p>
          <h2 className="idit-display text-4xl font-bold text-[#1f3d2f] sm:text-5xl">
            Five tickets. <span className="text-[#B5502A]">One hub.</span>
          </h2>
          <div className="idit-perf-rule" />
          <p className="mx-auto mt-4 max-w-3xl text-[#6b5f4a]">
            Each stub links to a dedicated, SEO-optimized event page — the kind
            of page that should rank for &ldquo;Iditarod 2027 [event]
            tickets&rdquo; and convert the fan on your own domain.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {events.map((e) => {
            const badge = ticketBadge[e.ticketed];
            return (
              <Link
                key={e.slug}
                href={`${HUB_PATH}/${e.slug}`}
                className="group idit-ticket flex flex-col overflow-hidden rounded-sm"
              >
                <PhotoPlaceholder
                  accent={e.accent}
                  imageKey={e.slug}
                  label={e.shortName}
                  className="idit-stub-tear rounded-none border-0"
                  stub
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="idit-display text-xl font-bold leading-tight text-[#1f3d2f]">
                        {e.shortName}
                      </h3>
                      <p className={`mt-1 text-sm font-semibold ${accentText[e.accent]}`}>
                        {e.date}
                      </p>
                    </div>
                    <span
                      className={`idit-display inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm border px-2 py-1 text-[10px] tracking-[0.12em] ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="mb-1 text-xs uppercase tracking-[0.08em] text-[#6b5f4a]">
                    {e.location}
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-[#14241c]">
                    {e.teaser}
                  </p>
                  <div className="idit-stub-foot mt-auto flex items-center justify-between pt-4">
                    <span className="idit-display text-sm font-bold text-[#B5502A] transition-colors group-hover:text-[#7d3517]">
                      {e.ticketed === "free-spectate"
                        ? "Plan your visit"
                        : "Reserve / buy tickets"}{" "}
                      →
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.1em] text-[#8a7d63]">
                      {e.priceStatus.includes("[confirm]")
                        ? "Pricing [confirm]"
                        : "Sample CTA"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why it matters — the pitch */}
      <section id="why" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="idit-eyebrow mb-3">Why a unified hub</p>
          <h2 className="idit-display text-4xl font-bold text-[#1f3d2f] sm:text-5xl">
            iditarod.com has the dates.{" "}
            <span className="text-[#B5502A]">It&apos;s missing the funnel.</span>
          </h2>
          <div className="idit-perf-rule !mx-0" />
          <p className="mt-4 max-w-3xl text-[#6b5f4a]">
            The experience is fragmented and it leaks revenue. Concrete gaps,
            verified against the live site:
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              t: "No first-party checkout",
              d: "The official “Musher's Banquet” link does a double 301 redirect out to a third-party fundraising-auction tool (iditarod.com → auctria.events → app.auctria.com). The highest-intent buyer leaves the brand mid-purchase and lands on a generic auction UI.",
            },
            {
              t: "Ticketing scattered across 4+ systems",
              d: "Auctria (banquet/auctions), ejoinme (older banquet tickets), a WooCommerce shop (Insider + documentary stream), and cloud.iditarod.com — with no unified “Attend / Buy Tickets” hub tying them together.",
            },
            {
              t: "The calendar shows no prices, tiers, or buy buttons",
              d: "iditarod.com/calendar lists names and dates but every event effectively reads “Cost: not specified.” There is nothing for a ready-to-buy fan to click.",
            },
            {
              t: "High-margin experiences handed to resellers",
              d: "Idita-Rider ceremonial-start sled seats, Willow VIP, and the Nome finish are largely sold by outside tour operators instead of direct — so the margin and the customer relationship both leave the building.",
            },
            {
              t: "No event-level SEO pages",
              d: "With no dedicated landing page per event, tour resellers outrank ITC for searches like “Iditarod mushers banquet tickets.” You are losing your own brand's traffic.",
            },
            {
              t: "ITC already monetizes online — just not centrally",
              d: "Insider subscriptions and the documentary stream already sell through the shop. The capability exists; it just isn't unified into one branded place a fan can act on.",
            },
          ].map((gap) => (
            <div
              key={gap.t}
              className="rounded-sm border-2 border-[#1f3d2f]/25 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-6 shadow-[4px_4px_0_rgba(31,61,47,0.12)]"
            >
              <h3 className="idit-display mb-2 text-lg font-bold text-[#1f3d2f]">
                {gap.t}
              </h3>
              <p className="leading-relaxed text-[#14241c]">{gap.d}</p>
            </div>
          ))}
        </div>

        {/* The redirect artifact — the single strongest pitch object */}
        <div className="mt-8 rounded-sm border-2 border-[#1f3d2f]/30 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-6 shadow-[6px_6px_0_rgba(31,61,47,0.14)]">
          <p className="idit-eyebrow mb-4 !text-[#1f3d2f]">
            The buyer's actual path today
          </p>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            {[
              { label: "iditarod.com", sub: "“Musher's Banquet” link", on: true },
              { label: "auctria.events", sub: "301 redirect", on: false },
              { label: "app.auctria.com", sub: "generic auction UI", on: false },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex flex-1 items-center gap-3">
                <div
                  className={`flex-1 rounded-sm border-2 px-4 py-3 text-center ${
                    step.on
                      ? "border-[#1f3d2f]/40 bg-[#1f3d2f]/8"
                      : "border-[#B5502A]/40 bg-[#B5502A]/8"
                  }`}
                >
                  <div className="font-mono text-sm font-semibold text-[#1f3d2f]">
                    {step.label}
                  </div>
                  <div
                    className={`mt-0.5 text-[11px] ${
                      step.on ? "text-[#1f3d2f]/80" : "text-[#7d3517]"
                    }`}
                  >
                    {step.sub}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <span className="hidden text-[#B5502A] sm:inline">→</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#6b5f4a]">
            Verified live: the official banquet link 301-redirects twice and
            drops the buyer on a third-party auction platform. A first-party hub
            keeps every one of those clicks — and the margin — on iditarod.com.
          </p>
        </div>
      </section>

      {/* CTA — spruce band, aged-gold seal, rust button */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
        <div className="relative overflow-hidden rounded-sm border-4 border-[#C08A2D]/70 bg-gradient-to-br from-[#2b4d3b] via-[#1f3d2f] to-[#152a20] p-10 text-center text-[#F3EAD7] shadow-[8px_8px_0_rgba(31,61,47,0.3)]">
          <Seal size={96} className="mx-auto mb-6" />
          <h2 className="idit-display mb-4 text-4xl font-bold">
            This is a sample.{" "}
            <span className="text-[#e0a94a]">The real thing keeps your margin.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-[#F3EAD7]/85">
            BlueWave Projects builds branded, first-party ticketing and event
            hubs that recapture the revenue currently bleeding to third-party
            platforms and resellers. Final pages would use ITC&apos;s official
            photos, logo, and ticketing back end.
          </p>
          <a
            href="https://bluewaveprojects.com/booking"
            className="idit-display inline-block rounded-sm border-2 border-[#7d3517] bg-[#B5502A] px-8 py-3.5 text-sm font-bold text-[#F3EAD7] shadow-[4px_4px_0_rgba(20,36,28,0.4)] transition-transform hover:-translate-y-0.5"
          >
            Talk to BlueWave Projects →
          </a>
        </div>
      </section>

      <SampleNote />
      <Footer />
      </main>
    </HeritageShell>
  );
}
