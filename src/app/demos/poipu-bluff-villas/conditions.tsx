"use client";

// LIVE "YOUR STAY, RIGHT NOW" guest-hub panel — the retention half of the
// Poʻipū Bluff Villas sample site. Built on the shared _wx library.
//
// WHY THIS PANEL: the lead run found premium HI properties with no guest
// experience after the deposit clears — the guest books, then gets a PDF. This
// is what a hub the operator OWNS looks like: the one question a Poʻipū guest
// actually asks each morning ("can we get in the water?"), answered from live
// public data, on the operator's own domain, where the upsell also lives.
//
// Feeds (all keyless + CORS, verified live 2026-07-17):
//   - WATER (modeled) → PacIOOS SWAN KAUAʻI nearshore model off Poʻipū
//     (useMarine, waveDataset "swan_kauai", wet cell 21.865 / 200.545 — verified
//     returning shgt/pper). A nowcast, labeled "modeled." There is no nearshore
//     Poʻipū buoy, so no buoy tile is shown rather than borrow a distant one.
//   - WATER TEMP → NOAA CO-OPS Nāwiliwili 1611400 (useMarine) — verified carrying
//     water_temperature. It is the island station on the EAST side; Poʻipū's south
//     shore runs slightly different. Labeled honestly, not as a Poʻipū reading.
//   - TIDE → NOAA CO-OPS Nāwiliwili 1611400 (useTidePredictions) — small Hawaiʻi range.
//   - WIND / AIR → NWS Līhuʻe (PHLI) — the island observation.
//   - UV → EPA hourly for Kōloa 96756 (useMarine) — the Poʻipū district ZIP.
//   - SUN → computed for Poʻipū (solarTimes).
//
// HONESTY: water clarity has NO public live feed — no number is shown. Every feed
// badges Live/Sample honestly and falls back to a clearly-labeled sample.

import { useState } from "react";
import { buildTideView, parsePredMin, solarTimes, decodeNwsObservation, type TideEvent } from "../_wx";
import {
  SourceBadge,
  UpdatedAgo,
  useMarine,
  useNwsObservation,
  useTidePredictions,
  type MarineData,
} from "../_wx/live";

const TZ = "Pacific/Honolulu";
const STATION = "1611400"; // NOAA CO-OPS Nāwiliwili (Kauaʻi) — tide + water temp
const UV_ZIP = "96756"; // Kōloa — the Poʻipū district ZIP
const POIPU_LAT = 21.874;
const POIPU_LON = -159.456;
const SWAN_LAT = 21.865; // wet nearshore cell off Poʻipū on the swan_kauai grid (verified)
const SWAN_LON360 = 200.545;

const BADGE = {
  live: "border-[#4cc9d9]/55 bg-[#4cc9d9]/15 text-[#a9e9f2]",
  computed: "border-[#f2b134]/45 bg-[#f2b134]/14 text-[#ffe0a0]",
  sample: "border-[#eaf6f8]/25 bg-[#eaf6f8]/8 text-[#eaf6f8]/70",
  loading: "border-[#eaf6f8]/20 text-[#eaf6f8]/45",
};

const SAMPLE_WX = decodeNwsObservation(
  { timestamp: null, rawMessage: "PHLI 170553Z 06012KT 10SM FEW030 SCT045 26/21 A3001" },
  "PHLI",
  TZ
);

const SAMPLE_TIDE_EVENTS: TideEvent[] = [
  { t: "2026-07-17 00:38", v: 0.29, type: "L", min: parsePredMin("2026-07-17 00:38") },
  { t: "2026-07-17 05:57", v: 0.97, type: "H", min: parsePredMin("2026-07-17 05:57") },
  { t: "2026-07-17 11:07", v: 0.19, type: "L", min: parsePredMin("2026-07-17 11:07") },
  { t: "2026-07-17 18:18", v: 2.01, type: "H", min: parsePredMin("2026-07-17 18:18") },
  { t: "2026-07-18 01:22", v: 0.31, type: "L", min: parsePredMin("2026-07-18 01:22") },
];
const SAMPLE_TIDE = buildTideView(SAMPLE_TIDE_EVENTS, parsePredMin("2026-07-17 13:00"), "2026-07-17")!;

// Modeled Poʻipū nearshore — a typical long-period summer south. NEVER shown as live.
const SAMPLE_MARINE: MarineData = {
  waves: { hsM: 0.91, hsFt: 3.0, peakPeriodS: 18, meanPeriodS: 7, dirDeg: 159, dirCardinal: "SSE" },
  waterTempF: 83,
  uv: { value: 11, label: "Extreme" },
};

// Poʻipū read — a south-shore beach: summer swell is the story, and the
// protected keiki pool is the honest answer when the south is up.
function waterRead(hsFt: number): string {
  if (hsFt < 1) return "Glassy";
  if (hsFt < 2) return "Calm";
  if (hsFt < 3.5) return "Small south";
  if (hsFt < 5) return "South running";
  return "Big south — keiki pool";
}

export function PoipuConditions() {
  const [sun] = useState(() => solarTimes(new Date(), POIPU_LAT, POIPU_LON, TZ));

  const marine = useMarine({
    tempStation: STATION,
    uvZip: UV_ZIP,
    sample: SAMPLE_MARINE,
    waveLat: SWAN_LAT,
    waveLon360: SWAN_LON360,
    waveDataset: "swan_kauai",
  });
  const tide = useTidePredictions(STATION, { tz: TZ, sampleView: SAMPLE_TIDE });
  const wx = useNwsObservation("PHLI", { sample: SAMPLE_WX, tz: TZ });

  // SWAN Kauaʻi is this beach's headline. Fall back to a clearly-labeled sample
  // if PacIOOS ERDDAP is unreachable (it 503s under load) — the badge then reads
  // Sample, never "Live · —".
  const waves = marine.data.waves ?? SAMPLE_MARINE.waves;
  const waveSource = marine.data.waves ? marine.source : marine.source === "loading" ? "loading" : "sample";
  const surfValue = waves ? `${waves.hsFt.toFixed(1)} ft` : "—";
  const surfPeriod = waves && waves.peakPeriodS != null ? `${Math.round(waves.peakPeriodS)} s` : "—";
  const read = waves ? waterRead(waves.hsFt) : "—";

  const waterTemp = marine.data.waterTempF != null ? `${Math.round(marine.data.waterTempF)}°F` : "—";
  const uvText = marine.data.uv ? `${marine.data.uv.value} · ${marine.data.uv.label}` : "—";
  const tv = tide.view;

  const anyFetchedAt = marine.fetchedAt ?? tide.fetchedAt ?? wx.fetchedAt;
  const anyLive = marine.source === "live" || tide.source === "live" || wx.source === "live";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#eaf6f8]/12 bg-gradient-to-br from-[#10425c] via-[#1b7fa8] to-[#0b2a3d] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6">
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-20 80 C 100 62, 180 100, 420 72" stroke="#eaf6f8" strokeWidth="1" fill="none" />
        <path d="M-20 150 C 100 132, 180 170, 420 142" stroke="#eaf6f8" strokeWidth="1" fill="none" />
        <path d="M-20 220 C 100 202, 180 240, 420 212" stroke="#eaf6f8" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="pbv-eyebrow !text-[#f2b134]">Your stay, right now</p>
            <h3 className="pbv-display mt-1 text-xl font-semibold text-[#f2fbfd] sm:text-2xl">Poʻipū today</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4cc9d9]/50 bg-[#0b2a3d]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#bfeef5]">
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute inline-flex h-full w-full rounded-full ${anyLive ? "animate-ping bg-[#4cc9d9]" : "bg-[#bfeef5]"} opacity-75`} />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${anyLive ? "bg-[#4cc9d9]" : "bg-[#bfeef5]"}`} />
            </span>
            {read !== "—" ? read : "Water"}
          </span>
        </div>

        {/* WATER hero tile */}
        <div className="pbv-glass mb-3 flex items-end justify-between gap-4 p-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#eaf6f8]/55">In the water</span>
              <SourceBadge source={waveSource} labels={{ live: "Live · PacIOOS" }} classes={BADGE} />
            </div>
            <div className="pbv-display text-2xl font-bold leading-none text-[#f2fbfd] sm:text-3xl">{surfValue}</div>
            <div className="mt-1 text-[11px] text-[#eaf6f8]/60">
              period {surfPeriod} · modeled nowcast (SWAN Kauaʻi)
            </div>
          </div>
          <svg viewBox="0 0 64 40" className="h-10 w-16 shrink-0 text-[#bfeef5]" fill="none" aria-hidden="true">
            <path d="M2 26 C 16 22, 24 22, 34 24 C 46 26, 52 24, 62 22" stroke="currentColor" strokeWidth="2" />
            <path d="M2 32 C 16 28, 24 28, 34 30 C 46 32, 52 30, 62 28" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <Tile label="Water temp" value={waterTemp} sub="Nāwiliwili · ocean" source={marine.source} liveLabel="Live · NOAA" />
          <Tile
            label="Tide"
            value={tv.nextHigh || tv.nextLow ? `${tv.stateText}` : "—"}
            sub={
              tv.rising
                ? tv.nextHigh
                  ? `high ${tv.nextHigh.v} at ${tv.nextHigh.time}`
                  : "rising"
                : tv.nextLow
                  ? `low ${tv.nextLow.v} at ${tv.nextLow.time}`
                  : "falling"
            }
            source={tide.source}
            liveLabel="Live · NOAA"
          />
          <Tile label="Wind" value={wx.obs.windTextMph} sub={wx.source === "live" ? "Līhuʻe (PHLI)" : "trade winds"} source={wx.source} liveLabel="Live · NWS" />
          <Tile label="Air temp" value={wx.obs.tempText} sub="Līhuʻe (PHLI)" source={wx.source} liveLabel="Live · NWS" />
          <Tile label="UV index" value={uvText} sub="reef-safe only" source={marine.source} liveLabel="Live · EPA" />
          <Tile label="Daylight" value={sun.daylight} sub={`↑ ${sun.sunrise} · ↓ ${sun.sunset}`} source="computed" liveLabel="Computed" />
        </div>

        <UpdatedAgo at={anyFetchedAt} live={anyLive} className="mt-3 block text-right text-[10px] text-[#eaf6f8]/45" />

        <p className="mt-3 text-[11px] leading-relaxed text-[#eaf6f8]/60">
          The water reading is the <span className="font-semibold text-[#f2fbfd]/85">PacIOOS SWAN Kauaʻi</span>{" "}
          nearshore model off Poʻipū — a modeled nowcast, not a buoy (there is no nearshore Poʻipū buoy, and we
          won&apos;t borrow a distant one and call it yours). Water temperature and tide are live NOAA readings at{" "}
          <span className="font-semibold text-[#f2fbfd]/85">Nāwiliwili</span> — the island station on the east
          side, so the south shore runs a touch different. Wind and air are the latest{" "}
          <span className="font-semibold text-[#f2fbfd]/85">Līhuʻe (PHLI)</span> observation; UV is the EPA hourly
          forecast for Kōloa; sunrise, sunset, and daylight are computed for Poʻipū. There is no public live feed
          for water clarity, so we don&apos;t show a number. A summer south fills the beach break and the
          protected keiki pool becomes the honest answer for small kids. A planning aid, not a lifeguard — if a
          feed is unreachable, that tile shows a clearly-labeled{" "}
          <span className="font-semibold text-[#f2fbfd]/85">sample</span>.
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
    <div className="pbv-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between gap-1">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#eaf6f8]/50">{label}</span>
        <SourceBadge source={source} labels={{ live: liveLabel }} classes={BADGE} />
      </div>
      <span className="pbv-display text-[15px] font-semibold leading-tight text-[#f2fbfd] sm:text-base">{value}</span>
      <span className="mt-0.5 text-[11px] text-[#eaf6f8]/60">{sub}</span>
    </div>
  );
}
