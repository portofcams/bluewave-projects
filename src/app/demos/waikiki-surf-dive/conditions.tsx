"use client";

// LIVE "SURF & SEA RIGHT NOW" panel — the showpiece of the Waikiki surf/dive
// sample site, and the FIRST demo panel built entirely on the shared _wx
// library. All the fetching/decoding/interpolation lives in _wx; this file is
// mostly presentation + the honest fallbacks.
//
// Feeds (all keyless + CORS, verified browser-native 2026-07-09):
//   - SURF  → PacIOOS SWAN Oʻahu wave MODEL (useMarine) — labeled "modeled,"
//             it's a nowcast, not a buoy.
//   - WATER TEMP → NOAA CO-OPS water_temperature (useMarine)
//   - UV → EPA Envirofacts hourly by ZIP (useMarine)
//   - TIDE → NOAA CO-OPS Honolulu 1612340 (useTidePredictions) — small ~2 ft
//            Hawaii range, so it's a supporting tile, not the star.
//   - AIR / WIND → NWS PHNL (useNwsObservation)
//   - SUN → computed for Waikiki (solarTimes)
//
// HONESTY: underwater visibility has NO public live feed — we do NOT fabricate
// a number; the footnote points to the shop for today's viz. Each feed badges
// Live/Sample honestly and falls back to a clearly-labeled sample.

import { useState } from "react";
import {
  buildTideView,
  decodeNwsObservation,
  parsePredMin,
  solarTimes,
  type TideEvent,
} from "../_wx";
import {
  SourceBadge,
  UpdatedAgo,
  useMarine,
  useNwsObservation,
  useTidePredictions,
  type MarineData,
} from "../_wx/live";

const TZ = "Pacific/Honolulu";
const TIDE_STATION = "1612340"; // Honolulu Harbor (south shore)
const UV_ZIP = "96815"; // Waikiki
const WAIKIKI_LAT = 21.28;
const WAIKIKI_LON = -157.83;

// themeable badge palette (Waikiki: green live / gold computed / foam sample)
const BADGE = {
  live: "border-[#4fe0c0]/50 bg-[#4fe0c0]/15 text-[#a6efd9]",
  computed: "border-[#ffcf5c]/45 bg-[#ffcf5c]/14 text-[#ffe1a0]",
  sample: "border-[#d8f3f2]/25 bg-[#d8f3f2]/8 text-[#d8f3f2]/70",
  loading: "border-[#d8f3f2]/20 text-[#d8f3f2]/45",
};

// ---- honest SAMPLE values (clearly labeled; realistic summer south-shore) ---
const SAMPLE_WX = decodeNwsObservation(
  {
    timestamp: null,
    rawMessage: "PHNL 091953Z 06017G25KT 10SM FEW025 SCT035 29/20 A3010",
    temperature: { value: 29 },
    dewpoint: { value: 20 },
    windDirection: { value: 60 },
    windSpeed: { value: 31 },
    windGust: { value: 46 },
    visibility: { value: 16090 },
    barometricPressure: { value: 101930 },
    cloudLayers: [
      { amount: "FEW", base: { value: 760 } },
      { amount: "SCT", base: { value: 1070 } },
    ],
  },
  "PHNL",
  TZ
);

const SAMPLE_TIDE_EVENTS: TideEvent[] = [
  { t: "2026-07-08 23:28", v: 0.7, type: "H", min: parsePredMin("2026-07-08 23:28") },
  { t: "2026-07-09 04:50", v: -0.1, type: "L", min: parsePredMin("2026-07-09 04:50") },
  { t: "2026-07-09 12:46", v: 2.1, type: "H", min: parsePredMin("2026-07-09 12:46") },
  { t: "2026-07-09 20:11", v: 0.6, type: "L", min: parsePredMin("2026-07-09 20:11") },
  { t: "2026-07-10 00:30", v: 0.75, type: "H", min: parsePredMin("2026-07-10 00:30") },
];
const SAMPLE_TIDE = buildTideView(SAMPLE_TIDE_EVENTS, parsePredMin("2026-07-09 13:00"), "2026-07-09")!;

const SAMPLE_MARINE: MarineData = {
  waves: { hsM: 0.85, hsFt: 2.8, peakPeriodS: 13, meanPeriodS: 7, dirDeg: 190, dirCardinal: "S" },
  waterTempF: 81,
  uv: { value: 9, label: "Very high" },
};

function surfRead(hsFt: number): string {
  if (hsFt < 1.5) return "Flat-ish";
  if (hsFt < 2.5) return "Mellow";
  if (hsFt < 4) return "Fun-size";
  if (hsFt < 6) return "Solid";
  return "Big — know your limits";
}

export function WaikikiConditions() {
  const [sun] = useState(() => solarTimes(new Date(), WAIKIKI_LAT, WAIKIKI_LON, TZ));

  const tide = useTidePredictions(TIDE_STATION, { tz: TZ, sampleView: SAMPLE_TIDE });
  const wx = useNwsObservation("PHNL", { sample: SAMPLE_WX, tz: TZ });
  const marine = useMarine({ tempStation: TIDE_STATION, uvZip: UV_ZIP, sample: SAMPLE_MARINE });

  const waves = marine.data.waves;
  const surfValue = waves ? `${waves.dirCardinal ? waves.dirCardinal + " " : ""}${waves.hsFt.toFixed(1)} ft` : "—";
  const surfPeriod = waves && waves.peakPeriodS != null ? `${Math.round(waves.peakPeriodS)} s` : "—";
  const read = waves ? surfRead(waves.hsFt) : "—";

  const waterTemp = marine.data.waterTempF != null ? `${Math.round(marine.data.waterTempF)}°F` : "—";
  const uvText = marine.data.uv ? `${marine.data.uv.value} · ${marine.data.uv.label}` : "—";
  const tv = tide.view;

  const anyFetchedAt = marine.fetchedAt ?? tide.fetchedAt ?? wx.fetchedAt;
  const anyLive = marine.source === "live" || tide.source === "live" || wx.source === "live";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#d8f3f2]/12 bg-gradient-to-br from-[#0a4a54] via-[#12909e] to-[#052e38] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6">
      {/* faint reef-wave texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-20 70 C 100 50, 180 90, 420 60" stroke="#d8f3f2" strokeWidth="1" fill="none" />
        <path d="M-20 140 C 100 120, 180 160, 420 130" stroke="#d8f3f2" strokeWidth="1" fill="none" />
        <path d="M-20 220 C 100 200, 180 240, 420 210" stroke="#d8f3f2" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="wsd-eyebrow !text-[#ffcf5c]">Waikiki, right now</p>
            <h3 className="wsd-display mt-1 text-xl font-semibold text-[#f4fbfa] sm:text-2xl">Surf &amp; sea</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3fbfcf]/50 bg-[#052e38]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#bfeef0]">
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute inline-flex h-full w-full rounded-full ${anyLive ? "animate-ping bg-[#4fe0c0]" : "bg-[#bfeef0]"} opacity-75`} />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${anyLive ? "bg-[#4fe0c0]" : "bg-[#bfeef0]"}`} />
            </span>
            {read !== "—" ? read : "Surf"}
          </span>
        </div>

        {/* SURF hero tile */}
        <div className="wsd-glass mb-3 flex items-end justify-between gap-4 p-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#d8f3f2]/55">South-shore surf</span>
              <SourceBadge source={marine.source} labels={{ live: "Live · PacIOOS" }} classes={BADGE} />
            </div>
            <div className="wsd-display text-2xl font-bold leading-none text-[#f4fbfa] sm:text-3xl">{surfValue}</div>
            <div className="mt-1 text-[11px] text-[#d8f3f2]/60">
              peak period {surfPeriod} · modeled nowcast (SWAN)
            </div>
          </div>
          <svg viewBox="0 0 64 40" className="h-10 w-16 shrink-0 text-[#bfeef0]" fill="none" aria-hidden="true">
            <path d="M2 30 C 18 30, 22 10, 36 10 C 50 10, 52 26, 62 26" stroke="currentColor" strokeWidth="2" />
            <path d="M36 10 C 30 12, 26 20, 24 26" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
          </svg>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <Tile label="Water temp" value={waterTemp} sub="ocean, surface" source={marine.source} liveLabel="Live · NOAA" />
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
          <Tile label="Wind" value={wx.obs.windTextMph} sub={wx.source === "live" ? `PHNL · ${wx.obs.obsTimeText}` : "trade winds"} source={wx.source} liveLabel="Live · NWS" />
          <Tile label="Air temp" value={wx.obs.tempText} sub="Honolulu (PHNL)" source={wx.source} liveLabel="Live · NWS" />
          <Tile label="UV index" value={uvText} sub="wear reef-safe" source={marine.source} liveLabel="Live · EPA" />
          <Tile label="Daylight" value={sun.daylight} sub={`↑ ${sun.sunrise} · ↓ ${sun.sunset}`} source="computed" liveLabel="Computed" />
        </div>

        <UpdatedAgo at={anyFetchedAt} live={anyLive} className="mt-3 block text-right text-[10px] text-[#d8f3f2]/45" />

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#d8f3f2]/60">
          Surf is the <span className="font-semibold text-[#f4fbfa]/85">PacIOOS SWAN</span> nearshore
          wave model for the South Shore (a modeled nowcast, not a buoy). Water temperature and tide
          are live NOAA readings for Honolulu; wind and air are the latest{" "}
          <span className="font-semibold text-[#f4fbfa]/85">Honolulu (PHNL)</span> observation; UV is
          the EPA hourly forecast for Waikiki; sunrise, sunset, and daylight are computed. There is no
          public live feed for underwater visibility, so we don&apos;t show a number — summer viz off
          Waikiki is often 50–100+ ft, but ask the shop for today&apos;s report. This is a planning
          aid, not a substitute for lifeguards or the crew&apos;s own call. If a feed is unreachable,
          that tile shows a clearly-labeled <span className="font-semibold text-[#f4fbfa]/85">sample</span>.
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
    <div className="wsd-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between gap-1">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#d8f3f2]/50">{label}</span>
        <SourceBadge source={source} labels={{ live: liveLabel }} classes={BADGE} />
      </div>
      <span className="wsd-display text-[15px] font-semibold leading-tight text-[#f4fbfa] sm:text-base">{value}</span>
      <span className="mt-0.5 text-[11px] text-[#d8f3f2]/60">{sub}</span>
    </div>
  );
}
