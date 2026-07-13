"use client";

// LIVE "QUEEN K RIGHT NOW" panel — the showpiece of the Queen K Cycle Co.
// sample site.
//
// WHY THIS PANEL: Kona's Queen Kaʻahumanu Highway ("Queen K") — the spine of
// the Ironman World Championship bike course across the black lava fields —
// is genuinely famous for crosswinds (documented sustained 20+ mph, gusting
// to a sourced 45 mph near Hawi; IRONMAN restricts disc wheels here for
// exactly this reason). For a bike shop serving race-week and training-camp
// riders, "what's the wind doing on the Queen K today" is a real equipment
// decision, not decorative weather — the same shape as Valdez Fly-In's live
// density-altitude tile driving a real STOL choice.
//
// HONESTY CONTRACT (mirrors the rest of this portfolio):
//   - A LIVE fetch, client-side, of the latest Ellison Onizuka Kona
//     International Airport (PHKO) observation from the National Weather
//     Service (keyless, CORS-enabled, verified). Badged "Live · NWS" on
//     success.
//   - PHKO sits roughly 7 miles from downtown Kailua-Kona and the actual
//     race course — the same airport-station honesty tradeoff every other
//     demo in this portfolio already makes (Homer/Valdez/Fairbanks all read
//     an airport some distance from the exact point of interest). Stated
//     plainly in the footnote, never hidden.
//   - The wheel-choice read is a planning heuristic, not a rule — real
//     conditions and the rider's own judgment always come first.
//   - If the feed errors or returns nothing usable, the panel falls back to
//     a CLEARLY-LABELED "Sample" — never presented as live.
//   - Sunrise/sunset for Kailua-Kona are COMPUTED client-side, no network.
//
// All classes are Tailwind arbitrary values or the `.qkc-*` scoped helpers
// from _shared.tsx. Nothing global is touched.

import { useState } from "react";
import { decodeNwsObservation, solarTimes, wheelRead, type NwsObservation } from "../_wx";
import { SourceBadge, UpdatedAgo, useNwsObservation } from "../_wx/live";

const TZ = "Pacific/Honolulu";
const PHKO = "PHKO"; // Ellison Onizuka Kona International Airport at Keahole
const KONA_LAT = 19.64;
const KONA_LON = -155.9969; // Kailua-Kona town, for the computed daylight tile

const BADGE = {
  live: "border-[#ff5a36]/50 bg-[#ff5a36]/15 text-[#ffb49e]",
  computed: "border-[#f2b134]/45 bg-[#f2b134]/14 text-[#f7d896]",
  sample: "border-[#faf3ea]/25 bg-[#faf3ea]/8 text-[#faf3ea]/70",
  loading: "border-[#faf3ea]/20 text-[#faf3ea]/45",
};

// Realistic race-week Kona afternoon — NEVER shown as live.
const SAMPLE_WX: NwsObservation = decodeNwsObservation(
  {
    timestamp: null,
    rawMessage: "PHKO 121953Z 05014G22KT 10SM FEW040 31/23 A3000",
    temperature: { value: 31 },
    dewpoint: { value: 23 },
    windDirection: { value: 50 },
    windSpeed: { value: 26 },
    windGust: { value: 41 },
    visibility: { value: 16090 },
    barometricPressure: { value: 101600 },
    cloudLayers: [{ amount: "FEW", base: { value: 1220 } }],
  },
  PHKO,
  TZ
);

export function QkcConditions() {
  const [sun] = useState(() => solarTimes(new Date(), KONA_LAT, KONA_LON, TZ));
  const wx = useNwsObservation(PHKO, { sample: SAMPLE_WX, tz: TZ });

  const d = wx.obs;
  const live = wx.source === "live";
  const wheel = d.windMph != null ? wheelRead(d.windMph) : null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#faf3ea]/12 bg-gradient-to-br from-[#1c130d] via-[#2e1c12] to-[#0a0705] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)] sm:p-6">
      {/* faint heat-shimmer / lava texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-20 90 C 100 70, 180 110, 420 80" stroke="#ff5a36" strokeWidth="1.2" fill="none" />
        <path d="M-20 160 C 100 140, 180 180, 420 150" stroke="#0891b2" strokeWidth="1" fill="none" />
        <path d="M-20 230 C 100 210, 180 250, 420 220" stroke="#f2b134" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="qkc-eyebrow !text-[#0891b2]">Queen K, right now</p>
            <h3 className="qkc-display mt-1 text-xl text-[#faf3ea] sm:text-2xl">Ride conditions</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff5a36]/50 bg-[#0a0705]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ffb49e]">
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute inline-flex h-full w-full rounded-full ${live ? "animate-ping bg-[#ff5a36]" : "bg-[#ffb49e]"} opacity-75`} />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${live ? "bg-[#ff5a36]" : "bg-[#ffb49e]"}`} />
            </span>
            {wheel ?? "Wheels"}
          </span>
        </div>

        {/* wind hero tile */}
        <div className="qkc-glass mb-3 flex flex-col gap-3 p-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#d9c4b0]">Wind</span>
                <SourceBadge source={wx.source} labels={{ live: "Live · NWS" }} classes={BADGE} />
              </div>
              <div className="qkc-display text-2xl text-[#faf3ea] sm:text-3xl">{d.windTextMph}</div>
              <div className="mt-1 text-[11px] text-[#d9c4b0]">
                {wheel ? `${wheel} for a training ride today` : "wheel read unavailable"}
              </div>
            </div>
            <svg viewBox="0 0 64 40" className="h-10 w-16 shrink-0 text-[#ffb49e]" fill="none" aria-hidden="true">
              <path d="M4 14h40a6 6 0 1 0-6-6M4 26h32a6 6 0 1 1-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </div>

          {/* Queen K context range — today's reading against the course's real
              reputation, so a calm day still shows what "famous" looks like. */}
          <div>
            <div className="relative h-1.5 w-full rounded-full bg-gradient-to-r from-[#0891b2] to-[#ff5a36]">
              {d.windMph != null && (
                <div
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0a0705] bg-[#faf3ea]"
                  style={{ left: `${Math.min(100, Math.max(0, (d.windMph / 50) * 100))}%` }}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#d9c4b0]/70">
              <span>Calm</span>
              <span>Sourced 45 mph gusts near Hawiʻi turnaround</span>
            </div>
          </div>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Tile label="Air temp" value={d.tempText} sub="Kona Airport (PHKO)" source={wx.source} liveLabel="Live · NWS" />
          <Tile label="Dewpoint" value={d.dewText} sub="humidity proxy" source={wx.source} liveLabel="Live · NWS" />
          <Tile label="Sky" value={d.skyText} sub="cloud layers" source={wx.source} liveLabel="Live · NWS" />
          <Tile label="Daylight" value={sun.daylight} sub={`↑ ${sun.sunrise} · ↓ ${sun.sunset}`} source="computed" liveLabel="Computed" />
        </div>

        <UpdatedAgo at={wx.fetchedAt} live={live} className="mt-3 block text-right text-[10px] text-[#faf3ea]/45" />

        {/* honest footnote */}
        <p className="mt-4 text-[11px] leading-relaxed text-[#faf3ea]/60">
          Wind, temperature, and sky are the latest{" "}
          <span className="font-semibold text-[#faf3ea]/85">Ellison Onizuka Kona International Airport (PHKO)</span>{" "}
          observation from the National Weather Service — roughly 7 miles from downtown Kailua-Kona and the Queen K
          itself, the same airport-proxy tradeoff every live panel in this portfolio makes plainly rather than hides.
          The wheel-choice read is a training-ride planning heuristic, not a rule — IRONMAN itself restricts disc
          wheels at Kona specifically because of these crosswinds, but real conditions and your own judgment always
          come first. Sunrise, sunset, and daylight are computed for Kailua-Kona. If the feed is unreachable, this
          panel shows a clearly-labeled <span className="font-semibold text-[#faf3ea]/85">sample</span> instead —
          never presented as live.
        </p>
      </div>
    </div>
  );
}

function Tile({
  label,
  value,
  sub,
  source,
  liveLabel,
}: {
  label: string;
  value: string;
  sub: string;
  source: "live" | "sample" | "loading" | "computed";
  liveLabel: string;
}) {
  return (
    <div className="qkc-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between gap-1">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#d9c4b0]/80">{label}</span>
        <SourceBadge source={source} labels={{ live: liveLabel }} classes={BADGE} />
      </div>
      <span className="qkc-display text-[15px] leading-tight text-[#faf3ea] sm:text-base">{value}</span>
      <span className="mt-0.5 text-[11px] text-[#faf3ea]/60">{sub}</span>
    </div>
  );
}
