import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import { BluffShell, Emblem, ArtTile, PoipuConditions, BookDirect, SITE, HUB_PATH, type PbvAccent, type PbvPhoto } from "./_shared";

export const metadata: Metadata = {
  title: "Poʻipū Bluff Villas — Book Direct on Kauaʻi's South Shore, with a Live Guest Hub (Sample Demo)",
  description:
    "A guest-facing sample for a Poʻipū villa collection: a direct-booking flow the operator owns (with the channel-commission arithmetic shown side by side) and a live guest hub built on the PacIOOS SWAN Kauaʻi model, NOAA Nāwiliwili tide and water temperature, Līhuʻe wind, and EPA UV. A clearly-labeled sample by BlueWave Projects on public geography and live public data — a fictional brand not affiliated with any real property. All rates are illustrative.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// "Poʻipū Bluff Villas" is a DELIBERATELY FICTIONAL sample brand. Everything
// factual below — the south-shore summer swell, the protected keiki pool at the
// beach park, Māhāʻulepū, Spouting Horn, the reef-safe sunscreen law — is real and
// publicly verifiable. No real property name, rate, unit, phone, or address
// appears. Landmarks only (Poʻipū Beach Park, Kōloa, Māhāʻulepū, Spouting Horn).
//
// This sample exists because the premium-hospitality lead run (2026-07-17) found
// the same two gaps at nearly every qualified HI operator: no direct booking they
// own, and no guest experience after the deposit clears. Those are the two panels.

const BRAND = "Poʻipū Bluff Villas";

type Item = { title: string; accent: PbvAccent; figure: "bluff" | "villa" | "palm" | "reef" | "swell" | "sun"; blurb: string; tag: string };

// Real, openly-licensed Kauaʻi south-shore scenery keyed by tile title.
const PBV_PHOTOS: Record<string, PbvPhoto> = {
  "The beach park, two minutes down": { src: "/demos/poipu-bluff-villas/poipu-beach.webp", credit: "Heath Cajandig · CC BY 2.0" },
  "A summer south under the lānai": { src: "/demos/poipu-bluff-villas/poipu-golden-hour.webp", credit: "dronepicr · CC BY 2.0" },
  "Māhāʻulepū at sunrise": { src: "/demos/poipu-bluff-villas/mahaulepu-bluff.webp", credit: "Robert Linsdell · CC BY 2.0" },
  "Spouting Horn, ten minutes west": { src: "/demos/poipu-bluff-villas/spouting-horn.webp", credit: "Ron Clausen · CC BY-SA 4.0" },
};

const experiences: Item[] = [
  {
    title: "The beach park, two minutes down",
    accent: "aqua",
    figure: "reef",
    blurb:
      "Poʻipū Beach Park sits just down the road — snorkeling off the rocks, and a naturally protected keiki pool that stays swimmable for small kids on days the open beach breaks. Honu haul out on the sand; we keep our distance and so do you.",
    tag: "Walkable",
  },
  {
    title: "A summer south under the lānai",
    accent: "ocean",
    figure: "swell",
    blurb:
      "From April to September the south swells arrive long-period and clean, and the bluff hale get whitewater right below the rail. The guest hub puts the live model reading on the page, so you know before you walk down whether it's a swim day or a watch-it day.",
    tag: "Summer",
  },
  {
    title: "Māhāʻulepū at sunrise",
    accent: "dirt",
    figure: "bluff",
    blurb:
      "The Mahaulepu Heritage Trail runs the red-dirt cliffs east of Shipwreck — lithified dunes, seabirds, and a coastline that hasn't been built on. Best in the first hour of light, before the trades and the heat come up.",
    tag: "At dawn",
  },
  {
    title: "Spouting Horn, ten minutes west",
    accent: "gold",
    figure: "sun",
    blurb:
      "The old lava tube blowhole off Lāwaʻi Road throws spray on the right swell and tide — which is exactly the pair of numbers on the hub. Time it with the afternoon light and you'll see why everyone stops here.",
    tag: "Golden hour",
  },
];

export default function PoipuBluffVillasPage() {
  return (
    <>
      <BluffShell>
        <main className="min-h-screen text-[#123246]">
          <Nav />
          <DemoTracking demo="poipu-bluff-villas" />

          {/* HERO */}
          <section className="mx-auto max-w-6xl px-5 pb-10 pt-28 sm:px-8 sm:pt-32">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="pbv-eyebrow">Poʻipū · Kōloa, Kauaʻi</p>
                <h1 className="pbv-display mt-3 text-4xl leading-[1.05] text-[#123246] sm:text-5xl lg:text-6xl">
                  {BRAND}
                </h1>
                <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[#3f5b6b]">
                  Four hale on the south shore — booked <span className="font-semibold text-[#123246]">direct</span>,
                  at the rate we set, with the ocean report you&apos;d actually check before you walk down to the water.
                  No channel in the middle, no service fee stapled to your stay.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#book"
                    className="rounded-full bg-gradient-to-r from-[#8f3f1f] to-[#b4552d] px-6 py-3 text-sm font-semibold text-[#fdf7ee] shadow-[0_10px_28px_-12px_rgba(143,63,31,.8)] transition-transform hover:-translate-y-0.5"
                  >
                    Book direct →
                  </a>
                  <a
                    href="#hub"
                    className="rounded-full border border-[#1b7fa8]/30 px-6 py-3 text-sm font-semibold text-[#123246] transition-colors hover:border-[#1b7fa8]/60"
                  >
                    Today&apos;s water
                  </a>
                </div>
                <div className="pbv-rule !mx-0" />
              </div>
              <div className="flex justify-center lg:justify-end">
                <Emblem size={210} />
              </div>
            </div>
          </section>

          {/* BOOK DIRECT — the commercial half */}
          <section id="book" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-12 sm:px-8">
            <BookDirect />
          </section>

          {/* GUEST HUB — the retention half */}
          <section id="hub" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-12 sm:px-8">
            <PoipuConditions />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { h: "Gate code & arrival", p: "Sent the morning of check-in, and it lives here too — no digging through a six-week-old email thread." },
                { h: "Reef-safe only", p: "Hawaiʻi law: no oxybenzone or octinoxate. There's mineral sunscreen in every hale — take it to the beach park." },
                { h: "Ask us anything", p: "One thread, one place, the whole stay. The people answering are the ones who own the hale." },
              ].map((c) => (
                <div key={c.h} className="pbv-card p-4">
                  <h4 className="pbv-display text-sm font-semibold text-[#123246]">{c.h}</h4>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#3f5b6b]">{c.p}</p>
                </div>
              ))}
            </div>
          </section>

          {/* THE SOUTH SHORE */}
          <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
            <div className="mb-6 text-center">
              <p className="pbv-eyebrow">The south shore</p>
              <h2 className="pbv-display mt-2 text-3xl text-[#123246] sm:text-4xl">What&apos;s out the door</h2>
              <div className="pbv-rule" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {experiences.map((e) => (
                <article key={e.title} className="pbv-card overflow-hidden">
                  <ArtTile accent={e.accent} figure={e.figure} label={e.title} photo={PBV_PHOTOS[e.title]} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="pbv-display text-lg font-semibold text-[#123246]">{e.title}</h3>
                      <span className="shrink-0 rounded-full border border-[#b4552d]/30 bg-[#b4552d]/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f3f1f]">
                        {e.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#3f5b6b]">{e.blurb}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* WHAT THIS IS — honest framing */}
          <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
            <div className="pbv-card p-6 sm:p-7">
              <p className="pbv-eyebrow">What this actually is</p>
              <h2 className="pbv-display mt-2 text-xl text-[#123246]">A sample, built by BlueWave Projects</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-[#3f5b6b]">
                <span className="font-semibold text-[#123246]">{BRAND} is a fictional brand.</span> It isn&apos;t a
                real business, isn&apos;t affiliated with any Poʻipū or Kōloa property, and the four hale, their
                nightly rates, and the cleaning fees are invented for this page. The scenery photographs (the beach
                park, the summer south, Māhāʻulepū, Spouting Horn) are real, openly-licensed images of those Kauaʻi
                places, credited on each; the villas themselves are not shown, and the emblem is a designed mark.
                Nothing here quotes a real operator&apos;s rates, units, or availability.
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#3f5b6b]">
                <span className="font-semibold text-[#123246]">What is real:</span> the geography (Poʻipū Beach Park
                and its keiki pool, Māhāʻulepū, Spouting Horn, the summer south swell, the reef-safe sunscreen law),
                every live feed on the guest hub — the PacIOOS SWAN Kauaʻi nearshore model, NOAA Nāwiliwili tide and
                water temperature, the Līhuʻe (PHLI) observation, EPA UV for Kōloa — and{" "}
                <span className="font-semibold text-[#123246]">the booking arithmetic</span>. Run your own rate
                through it; the shape of the gap doesn&apos;t change.
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#3f5b6b]">
                It exists to show two things most premium Hawaiʻi properties are missing: a{" "}
                <span className="font-semibold text-[#123246]">direct-booking flow you own</span>, and a{" "}
                <span className="font-semibold text-[#123246]">guest hub worth coming back to</span> after the
                deposit clears. If your property has the first problem, the fix is a build, not a plugin —{" "}
                <a href="/demos" className="font-semibold text-[#8f3f1f] underline decoration-[#b4552d]/40 underline-offset-2">
                  see the rest of the shelf
                </a>
                .
              </p>
            </div>
          </section>
        </main>
      </BluffShell>
      <Footer />
    </>
  );
}
