import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import { SupperShell, Emblem, ArtTile, CommissionLeak, ReserveDirect, SITE, HUB_PATH, type KshAccent } from "./_shared";

export const metadata: Metadata = {
  title: "Kaimukī Supper House — Reserve Direct on Waiʻalae Ave, and What the Platforms Take (Sample Demo)",
  description:
    "A guest-facing sample for a Honolulu chef-driven restaurant: a direct reservation flow the room owns (golden-hour seating driven by the real sunset, live Honolulu lānai conditions) next to the arithmetic of what per-cover reservation fees and marketplace commission actually cost in a year. A clearly-labeled sample by BlueWave Projects on public geography and live public data — a fictional brand not affiliated with any real restaurant. All figures are illustrative.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// "Kaimukī Supper House" is a DELIBERATELY FICTIONAL sample brand. Everything
// factual below — Waiʻalae Avenue as Honolulu's restaurant row, the trades, the
// real sunset time, the live PHNL observation — is real and publicly verifiable.
// No real restaurant's name, menu, price, table, or contact appears. Landmarks
// only (Waiʻalae Avenue, Kaimukī, Diamond Head).
//
// Built because the premium-hospitality lead run (2026-07-17) qualified 14
// chef-driven HI restaurants — Beard winners among them — all running on rented
// reservations + rented ordering + no owned guest list. The Poʻipū demo answers
// the lodging half of that run; this answers the restaurant half.

const BRAND = "Kaimukī Supper House";

type Item = { title: string; accent: KshAccent; figure: "table" | "fire" | "greens" | "room"; blurb: string; tag: string };

const room: Item[] = [
  {
    title: "Everything over fire",
    accent: "ember",
    figure: "fire",
    blurb:
      "One hearth, kiawe and mesquite, and a menu that changes when the boats and the farms change it. If it didn't come off the fire, it came off the ice.",
    tag: "The hearth",
  },
  {
    title: "Greens from up the hill",
    accent: "moss",
    figure: "greens",
    blurb:
      "Waimānalo and the Windward farms three mornings a week. What's good this week is what's on tonight — which is exactly why the menu lives on our own site and not in a laminate.",
    tag: "This week",
  },
  {
    title: "The counter at 5:30",
    accent: "char",
    figure: "room",
    blurb:
      "Twelve seats at the pass, first service. You watch the fire, the cooks talk to you, and you're out in time for the rest of your night.",
    tag: "Walk-in friendly",
  },
  {
    title: "The table is ours to give",
    accent: "brass",
    figure: "table",
    blurb:
      "Book here and the table costs us nothing to hand you — no per-cover fee to a network, no cut of your takeout. That's not a principle, it's arithmetic; it's why we can keep the counter at the price it is.",
    tag: "Direct",
  },
];

export default function KaimukiSupperHousePage() {
  return (
    <>
      <SupperShell>
        <main className="min-h-screen text-[#241d1a]">
          <Nav />
          <DemoTracking demo="kaimuki-supper-house" />

          {/* HERO */}
          <section className="mx-auto max-w-6xl px-5 pb-10 pt-28 sm:px-8 sm:pt-32">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="ksh-eyebrow">Waiʻalae Avenue · Kaimukī, Oʻahu</p>
                <h1 className="ksh-display mt-3 text-4xl leading-[1.05] text-[#241d1a] sm:text-5xl lg:text-6xl">
                  {BRAND}
                </h1>
                <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[#584a44]">
                  A hearth, twelve seats at the pass, and whatever the farms sent down this week. Book the table{" "}
                  <span className="font-semibold text-[#241d1a]">here</span> — no network in the middle taking a
                  dollar a head, no marketplace taking a quarter of your takeout.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#reserve"
                    className="rounded-full bg-gradient-to-r from-[#932f12] to-[#c4451f] px-6 py-3 text-sm font-semibold text-[#f7f0e4] shadow-[0_10px_28px_-12px_rgba(147,47,18,.8)] transition-transform hover:-translate-y-0.5"
                  >
                    Reserve direct →
                  </a>
                  <a
                    href="#leak"
                    className="rounded-full border border-[#c4451f]/30 px-6 py-3 text-sm font-semibold text-[#241d1a] transition-colors hover:border-[#c4451f]/60"
                  >
                    What the platforms take
                  </a>
                </div>
                <div className="ksh-rule !mx-0" />
              </div>
              <div className="flex justify-center lg:justify-end">
                <Emblem size={210} />
              </div>
            </div>
          </section>

          {/* RESERVE — the owned half */}
          <section id="reserve" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-12 sm:px-8">
            <ReserveDirect />
          </section>

          {/* THE LEAK — the argument */}
          <section id="leak" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-12 sm:px-8">
            <CommissionLeak />
          </section>

          {/* THE ROOM */}
          <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
            <div className="mb-6 text-center">
              <p className="ksh-eyebrow">The room</p>
              <h2 className="ksh-display mt-2 text-3xl text-[#241d1a] sm:text-4xl">What we&apos;re doing in here</h2>
              <div className="ksh-rule" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {room.map((e) => (
                <article key={e.title} className="ksh-card overflow-hidden">
                  <ArtTile accent={e.accent} figure={e.figure} label={e.title} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="ksh-display text-lg font-semibold text-[#241d1a]">{e.title}</h3>
                      <span className="shrink-0 rounded-full border border-[#c4451f]/30 bg-[#c4451f]/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#932f12]">
                        {e.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#584a44]">{e.blurb}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* WHAT THIS IS */}
          <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
            <div className="ksh-card p-6 sm:p-7">
              <p className="ksh-eyebrow">What this actually is</p>
              <h2 className="ksh-display mt-2 text-xl text-[#241d1a]">A sample, built by BlueWave Projects</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-[#584a44]">
                <span className="font-semibold text-[#241d1a]">{BRAND} is a fictional restaurant.</span> It
                isn&apos;t real, isn&apos;t affiliated with any Kaimukī or Waiʻalae Avenue room, and every menu
                idea, seat, and figure here is invented for the page. All artwork is drawn, not photographed.
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#584a44]">
                <span className="font-semibold text-[#241d1a]">What is real:</span> the sunset time driving the
                golden-hour seating (computed for Honolulu), the live Honolulu{" "}
                <span className="font-semibold text-[#241d1a]">(PHNL)</span> observation on the lānai tiles — and{" "}
                <span className="font-semibold text-[#241d1a]">the arithmetic</span>. The fee percentages are
                typical published ranges quoted as typical, not a claim about what any platform charges any
                restaurant; the covers and tickets are yours to set. Put your real numbers in — the total moves,
                the shape doesn&apos;t.
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#584a44]">
                It exists because the same three things keep showing up in Hawaiʻi&apos;s best rooms: reservations
                rented by the cover, ordering rented by the ticket, and{" "}
                <span className="font-semibold text-[#241d1a]">no guest list of your own</span>. The food is
                already world-class. The stack under it is the part somebody should have built you years ago —{" "}
                <a href="/demos" className="font-semibold text-[#932f12] underline decoration-[#c4451f]/40 underline-offset-2">
                  see the rest of the shelf
                </a>
                .
              </p>
            </div>
          </section>
        </main>
      </SupperShell>
      <Footer />
    </>
  );
}
