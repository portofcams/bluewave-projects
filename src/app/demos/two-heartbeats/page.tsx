import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import { StoryShell, SITE, HUB_PATH, THB } from "./_shared";
import { Story, TideWhisper } from "./story";
import data from "./heartbeats-data.json";

// UNLISTED + NOINDEX. Not in nav, not in sitemap.
export const metadata: Metadata = {
  title: "One Island, Two Heartbeats — 16 Years of Oʻahu Surf, Told by the Data (Data Essay)",
  description:
    "A scroll-driven data essay: the North Shore's winter drum and the South Shore's summer pulse, breathing out of phase across sixteen years of the PacIOOS SWAN wave-model hindcast — the biggest modeled days, the visible gaps, and today's live reading placed on the rhythm. An independent editorial piece by BlueWave Projects on public model data.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

export default function TwoHeartbeatsPage() {
  return (
    <>
      <StoryShell>
        <main className="min-h-screen">
          <Nav />
          <DemoTracking demo="two-heartbeats" />

          {/* MASTHEAD — typography-led, no hero panel */}
          <header className="mx-auto max-w-4xl px-6 pb-10 pt-36 text-center">
            <p className="thb-eyebrow mb-6">A data essay · BlueWave Projects</p>
            <h1 className="thb-display mx-auto max-w-3xl text-5xl leading-[1.06] sm:text-7xl">
              One island,{" "}
              <span style={{ color: THB.south }}>two heartbeats.</span>
            </h1>
            <div className="thb-rule mx-auto mt-8" />
            <p className="thb-prose mx-auto mt-8 text-left sm:text-center" style={{ fontSize: "1.2rem", color: THB.ink2 }}>
              Oʻahu&apos;s North Shore roars in winter. Waikīkī glides in
              summer. Sixteen years of a wave model&apos;s memory — {" "}
              {(data.meta.hours.north + data.meta.hours.south).toLocaleString()}{" "}
              hourly readings at two points off two shores — show an island that
              breathes: two heartbeats, half a year out of phase.
            </p>
            <p className="thb-sans mx-auto mt-6 text-[11px] uppercase tracking-[0.2em]" style={{ color: THB.muted }}>
              PacIOOS SWAN hindcast · 2010–2026 · with a live overlay — scroll ↓
            </p>
          </header>

          {/* THE SCROLLY */}
          <section className="mx-auto max-w-6xl px-6 pb-10 pt-6">
            <Story />
          </section>

          {/* THE QUIET LAYERS */}
          <section className="mx-auto max-w-4xl px-6 py-14">
            <p className="thb-eyebrow mb-3">Coda · the quiet layers</p>
            <h2 className="thb-display mb-6 text-3xl sm:text-4xl">Under the swell, softer rhythms.</h2>
            <TideWhisper />
          </section>

          {/* METHOD NOTES — the disclosures, all of them */}
          <section className="mx-auto max-w-4xl px-6 pb-10 pt-4">
            <div className="thb-card p-6 sm:p-8">
              <h2 className="thb-display mb-4 text-2xl">Method notes</h2>
              <div className="thb-sans grid gap-2 text-[13px] leading-relaxed" style={{ color: THB.ink2 }}>
                <p>
                  <strong style={{ color: THB.ink }}>Source.</strong> {data.meta.source} — accessed via the PacIOOS ERDDAP
                  server. Historical series baked on {data.meta.generated}; span {data.meta.span}. The opening and closing
                  &quot;now&quot; readings are fetched live in your browser from the same model&apos;s nowcast.
                </p>
                <p>
                  <strong style={{ color: THB.ink }}>The two cells.</strong> North: {data.meta.cells.north.lat}°N,{" "}
                  {Math.abs(data.meta.cells.north.lonW)}°W (off Waimea/Sunset). South: {data.meta.cells.south.lat}°N,{" "}
                  {Math.abs(data.meta.cells.south.lonW)}°W (off Waikīkī). Model hours used: north{" "}
                  {data.meta.hours.north.toLocaleString()}, south {data.meta.hours.south.toLocaleString()}.
                </p>
                <p>
                  <strong style={{ color: THB.ink }}>Aggregation.</strong> Climatology uses {data.meta.climatologyYears};
                  {" "}{data.meta.heatmapRule}. South-shore event ranking admits only {data.meta.southSwellFilter}. All
                  monthly math in UTC.
                </p>
                {data.meta.notes.map((n, i) => (
                  <p key={i}>
                    <strong style={{ color: THB.ink }}>{i === 0 ? "Model, not measurement." : i === 1 ? "Gaps." : "Provenance."}</strong>{" "}
                    {n}
                  </p>
                ))}
                <p>
                  <strong style={{ color: THB.ink }}>Corroboration.</strong> The largest modeled north-shore days were
                  cross-checked against NDBC buoy records (Waimea 51201) and documented events — the January 2014 swell,
                  the 2016 and 2024 Eddie-era days, and the July 2022 south swell all appear in both the model and the
                  public record. Nearshore model heights sit below open-water buoy heights by design (refraction and
                  shoaling), so the two are never quoted interchangeably.
                </p>
                <p>
                  <strong style={{ color: THB.ink }}>What this is.</strong> An editorial data essay — not a surf forecast,
                  not safety guidance, and not affiliated with PacIOOS, NOAA, or any surf brand. PacIOOS distributes the
                  model &quot;without warranty&quot;; treat every number here the same way. For conditions you plan a day
                  around, use official forecasts and your own eyes on the water.
                </p>
              </div>
            </div>
          </section>

          {/* SAMPLE NOTE */}
          <div className="mx-auto max-w-4xl px-6 pb-14">
            <p className="thb-sans text-center text-[11px] leading-relaxed" style={{ color: THB.muted }}>
              An independent, unlisted portfolio piece by{" "}
              <a href={SITE} className="underline underline-offset-2" style={{ color: THB.ink2 }}>
                BlueWave Projects
              </a>
              {" "}— built on public data from PacIOOS (SWAN Oʻahu) and NOAA. Data and charts generated{" "}
              {data.meta.generated}; the live dots are fetched at view time. Mahalo to the modelers, the buoy keepers,
              and everyone who checks the ocean every morning.
            </p>
          </div>
        </main>
      </StoryShell>
      <div style={{ background: THB.page, color: THB.ink }}>
        <Footer />
      </div>
    </>
  );
}
