"use client";

// LIVE "KAʻIWI CHANNEL RIGHT NOW" panel — the showpiece of the Molokaʻi Hoe /
// Nā Wāhine O Ke Kai tribute hub, on the shared _wx library.
//
// Offered as a genuine service — an act of MĀLAMA — for the paddlers, escort
// crews, water-safety officials, and families who honor and make the crossing.
// It is NOT marketing. The channel's story is the WIND and the SWELL: when the
// northeast trades and the swell line up, the ~41-mile crossing becomes a
// downwind surf run.
//
// Feeds (all keyless + CORS, verified 2026-07-09):
//   - SWELL → PacIOOS SWAN Oʻahu model at the channel mouth (21.2°N, 202.4°E) —
//     a modeled nowcast, not a buoy (the Mokapu buoy 51202 has no CORS; SWAN
//     matched it within ~0.5 m). Reuses _wx fetchSwanWaves.
//   - WIND → NWS Honolulu (PHNL) — the trade-wind read.
//   - TIDE + WATER TEMP → NOAA Honolulu 1612340 (the Oʻahu finish; there is no
//     active tide gauge on Molokaʻi, so we report the finish side honestly).
//   - SUN → computed for Oʻahu.
//
// INFORMATIONAL ONLY — NOT FOR NAVIGATION. Defer to NWS/USCG official forecasts.

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
const TIDE_STATION = "1612340"; // Honolulu (finish side; tide + water temp)
const UV_ZIP = "96815"; // fetched by useMarine but not displayed here
const WIND_STATION = "PHNL"; // Honolulu — reliable trade-wind obs
const SWAN_LAT = 21.2; // channel-mouth SWAN cell
const SWAN_LON360 = 202.4;
const OAHU_LAT = 21.3;
const OAHU_LON = -157.86;

const BADGE = {
  live: "border-[#5fd0a0]/50 bg-[#5fd0a0]/15 text-[#a6e6c8]",
  computed: "border-[#e9b24a]/45 bg-[#e9b24a]/14 text-[#f2cf8f]",
  sample: "border-[#cfe0e6]/25 bg-[#cfe0e6]/8 text-[#cfe0e6]/70",
  loading: "border-[#cfe0e6]/20 text-[#cfe0e6]/45",
};

// ---- honest SAMPLE (clearly labeled) --------------------------------------
const SAMPLE_WX = decodeNwsObservation(
  {
    timestamp: null,
    rawMessage: "PHNL 092353Z 08016G28KT 10SM FEW030 SCT045 31/20 A3000",
    temperature: { value: 31 },
    dewpoint: { value: 20 },
    windDirection: { value: 80 },
    windSpeed: { value: 29 },
    windGust: { value: 52 },
    visibility: { value: 16090 },
    barometricPressure: { value: 101590 },
    cloudLayers: [
      { amount: "FEW", base: { value: 914 } },
      { amount: "SCT", base: { value: 1372 } },
    ],
  },
  "PHNL",
  TZ
);

const SAMPLE_TIDE_EVENTS: TideEvent[] = [
  { t: "2026-07-09 04:50", v: -0.1, type: "L", min: parsePredMin("2026-07-09 04:50") },
  { t: "2026-07-09 12:46", v: 2.1, type: "H", min: parsePredMin("2026-07-09 12:46") },
  { t: "2026-07-09 20:11", v: 0.6, type: "L", min: parsePredMin("2026-07-09 20:11") },
  { t: "2026-07-09 23:28", v: 0.7, type: "H", min: parsePredMin("2026-07-09 23:28") },
  { t: "2026-07-10 05:37", v: -0.2, type: "L", min: parsePredMin("2026-07-10 05:37") },
];
const SAMPLE_TIDE = buildTideView(SAMPLE_TIDE_EVENTS, parsePredMin("2026-07-09 13:00"), "2026-07-09")!;

const SAMPLE_MARINE: MarineData = {
  waves: { hsM: 1.96, hsFt: 6.4, peakPeriodS: 7.5, meanPeriodS: 6, dirDeg: 68, dirCardinal: "ENE" },
  waterTempF: 82,
  uv: null,
};

// A modest read of the crossing setup — NOT a go/no-go. The trades (ENE) with a
// matching swell are the downwind surf-run signature.
function channelRead(windDeg: number | null, windKt: number | null): string {
  const trade = windDeg != null && windDeg >= 40 && windDeg <= 115;
  if (trade && windKt != null && windKt >= 15) return "Trades up · downwind";
  if (trade) return "Light trades";
  return "Variable";
}

export function ChannelConditions() {
  const [sun] = useState(() => solarTimes(new Date(), OAHU_LAT, OAHU_LON, TZ));

  const marine = useMarine({ tempStation: TIDE_STATION, uvZip: UV_ZIP, sample: SAMPLE_MARINE, waveLat: SWAN_LAT, waveLon360: SWAN_LON360 });
  const wx = useNwsObservation(WIND_STATION, { sample: SAMPLE_WX, tz: TZ });
  const tide = useTidePredictions(TIDE_STATION, { tz: TZ, sampleView: SAMPLE_TIDE });

  const waves = marine.data.waves;
  const swellValue = waves ? `${waves.dirCardinal ? waves.dirCardinal + " " : ""}${waves.hsFt.toFixed(1)} ft` : "—";
  const swellPeriod = waves && waves.peakPeriodS != null ? `${Math.round(waves.peakPeriodS)} s` : "—";
  const waterText = marine.data.waterTempF != null ? `${Math.round(marine.data.waterTempF)}°F` : "—";
  const read = channelRead(wx.obs.windDeg, wx.obs.windKt);
  const tv = tide.view;

  const anyFetchedAt = marine.fetchedAt ?? wx.fetchedAt ?? tide.fetchedAt;
  const anyLive = marine.source === "live" || wx.source === "live" || tide.source === "live";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#cfe0e6]/12 bg-gradient-to-br from-[#0c2e42] via-[#14506e] to-[#071d2e] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6">
      {/* faint swell texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-20 70 C 100 50, 180 90, 420 60" stroke="#cfe0e6" strokeWidth="1" fill="none" />
        <path d="M-20 150 C 100 130, 180 170, 420 140" stroke="#cfe0e6" strokeWidth="1" fill="none" />
        <path d="M-20 230 C 100 210, 180 250, 420 220" stroke="#cfe0e6" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="kai-eyebrow !text-[#e9b24a]">Kaʻiwi Channel, right now</p>
            <h3 className="kai-display mt-1 text-xl font-semibold text-[#f4f8f6] sm:text-2xl">The crossing</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5fd0a0]/45 bg-[#071d2e]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a6e6c8]">
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute inline-flex h-full w-full rounded-full ${anyLive ? "animate-ping bg-[#5fd0a0]" : "bg-[#cfe0e6]"} opacity-75`} />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${anyLive ? "bg-[#5fd0a0]" : "bg-[#cfe0e6]"}`} />
            </span>
            {read}
          </span>
        </div>

        {/* SWELL hero tile */}
        <div className="kai-glass mb-3 flex items-end justify-between gap-4 p-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#cfe0e6]/55">Channel swell</span>
              <SourceBadge source={marine.source} labels={{ live: "Live · PacIOOS" }} classes={BADGE} />
            </div>
            <div className="kai-display text-2xl font-bold leading-none text-[#f4f8f6] sm:text-3xl">{swellValue}</div>
            <div className="mt-1 text-[11px] text-[#cfe0e6]/60">period {swellPeriod} · modeled at the channel mouth (SWAN)</div>
          </div>
          <svg viewBox="0 0 64 40" className="h-10 w-16 shrink-0 text-[#cfe0e6]" fill="none" aria-hidden="true">
            <path d="M2 30 C 18 30, 22 12, 36 12 C 50 12, 52 26, 62 26" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Tile label="Wind" value={wx.obs.windTextMph} sub={wx.source === "live" ? `Honolulu · ${wx.obs.obsTimeText}` : "trade winds"} source={wx.source} liveLabel="Live · NWS" />
          <Tile label="Tide (finish)" value={tv.stateText} sub={tv.rising ? (tv.nextHigh ? `H ${tv.nextHigh.time}` : "rising") : tv.nextLow ? `L ${tv.nextLow.time}` : "falling"} source={tide.source} liveLabel="Live · NOAA" />
          <Tile label="Water temp" value={waterText} sub="warm all season" source={marine.source} liveLabel="Live · NOAA" />
          <Tile label="Daylight" value={sun.daylight} sub={`↑ ${sun.sunrise} · ↓ ${sun.sunset}`} source="computed" liveLabel="Computed" />
        </div>

        <UpdatedAgo at={anyFetchedAt} live={anyLive} className="mt-3 block text-right text-[10px] text-[#cfe0e6]/45" />

        {/* honest, reverent footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#cfe0e6]/60">
          Offered in <span className="font-semibold text-[#f4f8f6]/85">mālama</span> for the paddlers, escort crews, and families who
          honor the crossing. Swell is the PacIOOS SWAN model at the channel mouth (a nowcast, not a buoy); wind is the live Honolulu
          (PHNL) observation; tide and water temperature are live NOAA for Honolulu — the Oʻahu finish, as there is no active gauge on
          Molokaʻi; sunrise, sunset, and daylight are computed. This is{" "}
          <span className="font-semibold text-[#f4f8f6]/85">informational only — not for navigation.</span> Always defer to official
          NWS and U.S. Coast Guard forecasts and to the race&apos;s own water-safety officials. The ocean is honored here, not
          conquered.
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
    <div className="kai-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between gap-1">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#cfe0e6]/50">{label}</span>
        <SourceBadge source={source} labels={{ live: liveLabel }} classes={BADGE} />
      </div>
      <span className="kai-display text-[15px] font-semibold leading-tight text-[#f4f8f6] sm:text-base">{value}</span>
      <span className="mt-0.5 text-[11px] text-[#cfe0e6]/60">{sub}</span>
    </div>
  );
}
