import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { events, HUB_PATH, SITE } from "./events";
import {
  PhotoPlaceholder,
  SampleNote,
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
    <main className="ocean-gradient min-h-screen text-white">
      <Nav />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-wave-500/25 bg-wave-500/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-wave-300/90">
              <span className="h-1.5 w-1.5 rounded-full bg-wave-400" />
              Sample build · Iditarod 2027 · 55th running
            </div>
            <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              The whole Iditarod season,{" "}
              <span className="text-gradient">one place to buy in.</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/65">
              Every ticketed moment of the 2027 race — banquet, ceremonial
              start, restart, finish, and the documentary premiere — pulled into
              one branded, conversion-optimized hub. No redirects to a generic
              auction tool. No reseller outranking you for your own events. The
              buyer stays on the Iditarod brand from interest to checkout.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#events"
                className="btn-primary rounded-full px-8 py-3.5 text-center text-sm font-semibold text-white"
              >
                See the events →
              </a>
              <a
                href="#why"
                className="rounded-full border border-white/15 px-8 py-3.5 text-center text-sm font-semibold text-white/80 transition-colors hover:border-white/30"
              >
                Why it matters
              </a>
            </div>
          </div>

          <PhotoPlaceholder
            accent="aurora"
            tall
            label="Iditarod hero — start-chute / aurora over the trail"
          />
        </div>
      </section>

      {/* Value line / quick stats */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { v: "5", l: "Ticketable moments", s: "Mar 4 – summer 2027" },
            { v: "1", l: "Branded checkout", s: "No third-party redirect" },
            { v: "4+", l: "Systems today", s: "Auctria · ejoinme · Woo · cloud" },
            { v: "0", l: "Prices on the calendar", s: "Every event reads “not specified”" },
          ].map((stat) => (
            <div key={stat.l} className="glass rounded-2xl p-5">
              <div className="text-gradient text-3xl font-bold">{stat.v}</div>
              <div className="mb-1 mt-2 text-xs uppercase tracking-wider text-white/60">
                {stat.l}
              </div>
              <div className="text-xs leading-relaxed text-white/40">
                {stat.s}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events grid */}
      <section id="events" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-white/40">
            The 2027 season
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Five tickets. <span className="text-gradient">One hub.</span>
          </h2>
          <p className="mt-3 max-w-3xl text-white/55">
            Each card links to a dedicated, SEO-optimized event page — the kind
            of page that should rank for &ldquo;Iditarod 2027 [event]
            tickets&rdquo; and convert the fan on your own domain.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {events.map((e) => {
            const badge = ticketBadge[e.ticketed];
            return (
              <Link
                key={e.slug}
                href={`${HUB_PATH}/${e.slug}`}
                className="glass glass-hover group flex flex-col overflow-hidden rounded-2xl transition-all"
              >
                <PhotoPlaceholder
                  accent={e.accent}
                  label={e.shortName}
                  className="rounded-none rounded-t-2xl border-0 border-b border-white/10"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold leading-tight">
                        {e.shortName}
                      </h3>
                      <p className={`mt-1 text-sm font-medium ${accentText[e.accent]}`}>
                        {e.date}
                      </p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.16em] ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="mb-1 text-xs text-white/40">{e.location}</p>
                  <p className="mb-4 text-sm leading-relaxed text-white/70">
                    {e.teaser}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-sm font-semibold text-wave-400 transition-colors group-hover:text-wave-300">
                      {e.ticketed === "free-spectate"
                        ? "Plan your visit"
                        : "Reserve / buy tickets"}{" "}
                      →
                    </span>
                    <span className="text-[11px] text-white/30">
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
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-white/40">
            Why a unified hub
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            iditarod.com has the dates.{" "}
            <span className="text-gradient">It&apos;s missing the funnel.</span>
          </h2>
          <p className="mt-3 max-w-3xl text-white/55">
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
            <div key={gap.t} className="glass rounded-2xl p-6">
              <h3 className="mb-2 text-lg font-bold">{gap.t}</h3>
              <p className="leading-relaxed text-white/70">{gap.d}</p>
            </div>
          ))}
        </div>

        {/* The redirect artifact — the single strongest pitch object */}
        <div className="mt-8 glass rounded-2xl p-6">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-wave-400">
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
                  className={`flex-1 rounded-xl border px-4 py-3 text-center ${
                    step.on
                      ? "border-emerald-400/30 bg-emerald-500/10"
                      : "border-lava-500/30 bg-lava-500/10"
                  }`}
                >
                  <div className="font-mono text-sm font-semibold text-white">
                    {step.label}
                  </div>
                  <div className="mt-0.5 text-[11px] text-white/45">
                    {step.sub}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <span className="hidden text-white/30 sm:inline">→</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/40">
            Verified live: the official banquet link 301-redirects twice and
            drops the buyer on a third-party auction platform. A first-party hub
            keeps every one of those clicks — and the margin — on iditarod.com.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-wave-500/25 bg-gradient-to-br from-ocean-900/50 via-black/40 to-black p-10 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            This is a sample.{" "}
            <span className="text-gradient">The real thing keeps your margin.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/60">
            BlueWave Projects builds branded, first-party ticketing and event
            hubs that recapture the revenue currently bleeding to third-party
            platforms and resellers. Final pages would use ITC&apos;s official
            photos, logo, and ticketing back end.
          </p>
          <a
            href="https://bluewaveprojects.com/booking"
            className="btn-primary inline-block rounded-full px-8 py-3.5 text-sm font-semibold text-white"
          >
            Talk to BlueWave Projects →
          </a>
        </div>
      </section>

      <SampleNote />
      <Footer />
    </main>
  );
}
