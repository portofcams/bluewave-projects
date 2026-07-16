"use client";

// LIVE "NORTH SHORE DIVE REPORT" panel — the showpiece of the North Shore Dive
// Co. sample site (Haleʻiwa, Oʻahu). Built on the shared _wx library.
//
// WHY THIS PANEL: a North Shore dive operation lives and dies by the swell
// window. Flat summer days are prime; a winter groundswell closes the shore
// dives out entirely. So the headline is the REAL swell off Waimea and an
// honest "diveable?" read, not generic weather.
//
// Feeds (all keyless + CORS except the buoy relay, which is same-origin-proxied
// on the real domain — verified 2026-07-16):
//   - SWELL (real) → NDBC buoy 51201 Waimea Bay, via the ai.portofcams.com relay
//     (useBuoyObservation) — the actual instrument right off the North Shore.
//   - SWELL (modeled) → PacIOOS SWAN Oʻahu nearshore model at Haleʻiwa
//     (useMarine) — a nowcast, shown next to the buoy so you see both.
//   - WATER TEMP → the Waimea buoy's own WTMP (real, local — no CO-OPS station
//     sits on the North Shore).
//   - TIDE → NOAA CO-OPS Haleʻiwa 1612482 (useTidePredictions).
//   - WIND / AIR → NWS Honolulu (PHNL) — the island observation; North Shore
//     wind can run different, so it's labeled honestly.
//   - UV → EPA hourly for Haleʻiwa 96712 (useMarine).
//   - SUN → computed for Haleʻiwa (solarTimes).
//
// HONESTY: underwater visibility has NO public live feed — no number is shown;
// the footnote points to the shop. Every feed badges Live/Sample honestly.

import { useState } from "react";
import {
  buildTideView,
  decodeNwsObservation,
  parsePredMin,
  solarTimes,
  type BuoyObservation,
  type TideEvent,
} from "../_wx";
import {
  SourceBadge,
  UpdatedAgo,
  useBuoyObservation,
  useMarine,
  useNwsObservation,
  useTidePredictions,
  type MarineData,
} from "../_wx/live";

const TZ = "Pacific/Honolulu";
const TIDE_STATION = "1612482"; // Haleʻiwa (North Shore)
const TEMP_STATION = "1612340"; // Honolulu — fetched by useMarine but not shown; NS water temp comes from the buoy
const UV_ZIP = "96712"; // Haleʻiwa
const HALEIWA_LAT = 21.593;
const HALEIWA_LON = -158.103;
const BUOY_STATION = "51201"; // NDBC Waimea Bay — the real North Shore buoy
const SWAN_LAT = 21.585; // wet nearshore cell off Haleʻiwa (verified)
const SWAN_LON360 = 201.835;

// themeable badge palette (North Shore: cool live-teal / gold computed / ice sample)
const BADGE = {
  live: "border-[#57b6d6]/55 bg-[#57b6d6]/15 text-[#bfe6f2]",
  computed: "border-[#ffc24d]/45 bg-[#ffc24d]/12 text-[#ffdd93]",
  sample: "border-[#d6ecf5]/25 bg-[#d6ecf5]/8 text-[#d6ecf5]/70",
  loading: "border-[#d6ecf5]/20 text-[#d6ecf5]/45",
};

// ---- honest SAMPLE values (clearly labeled; realistic summer North Shore) ---
const SAMPLE_WX = decodeNwsObservation(
  { timestamp: null, rawMessage: "PHNL 161953Z 05012KT 10SM FEW030 SCT045 28/21 A3009" },
  "PHNL",
  TZ
);

const SAMPLE_TIDE_EVENTS: TideEvent[] = [
  { t: "2026-07-16 02:10", v: 1.9, type: "H", min: parsePredMin("2026-07-16 02:10") },
  { t: "2026-07-16 08:34", v: 0.2, type: "L", min: parsePredMin("2026-07-16 08:34") },
  { t: "2026-07-16 14:52", v: 1.7, type: "H", min: parsePredMin("2026-07-16 14:52") },
  { t: "2026-07-16 21:03", v: 0.4, type: "L", min: parsePredMin("2026-07-16 21:03") },
  { t: "2026-07-17 03:01", v: 1.95, type: "H", min: parsePredMin("2026-07-17 03:01") },
];
const SAMPLE_TIDE = buildTideView(SAMPLE_TIDE_EVENTS, parsePredMin("2026-07-16 13:00"), "2026-07-16")!;

// Modeled SWAN nearshore, summer flat-ish North Shore. NEVER shown as live.
const SAMPLE_MARINE: MarineData = {
  waves: { hsM: 0.9, hsFt: 3.0, peakPeriodS: 9, meanPeriodS: 6, dirDeg: 20, dirCardinal: "NNE" },
  waterTempF: null, // NS water temp comes from the buoy, not CO-OPS
  uv: { value: 9, label: "Very high" },
};

// Realistic summer Waimea buoy reading — NEVER shown as live.
const SAMPLE_BUOY: BuoyObservation = {
  station: BUOY_STATION,
  time: null,
  waveHeightM: 0.9,
  dominantPeriodS: 9,
  avgPeriodS: 6,
  waveDirDeg: 20,
  waterTempC: 26,
};

// North Shore dive read, off the REAL swell height. Summer flat = prime;
// a winter groundswell closes the shore dives out.
function diveRead(ft: number): string {
  if (ft < 2) return "Prime";
  if (ft < 4) return "Good";
  if (ft < 6) return "Marginal";
  return "Big — shore dives off";
}

export function NorthShoreConditions() {
  const [sun] = useState(() => solarTimes(new Date(), HALEIWA_LAT, HALEIWA_LON, TZ));

  const buoy = useBuoyObservation(BUOY_STATION, { sample: SAMPLE_BUOY });
  const marine = useMarine({
    tempStation: TEMP_STATION,
    uvZip: UV_ZIP,
    sample: SAMPLE_MARINE,
    waveLat: SWAN_LAT,
    waveLon360: SWAN_LON360,
  });
  const tide = useTidePredictions(TIDE_STATION, { tz: TZ, sampleView: SAMPLE_TIDE });
  const wx = useNwsObservation("PHNL", { sample: SAMPLE_WX, tz: TZ });

  // REAL swell off the Waimea buoy is the headline
  const buoyFt = buoy.obs.waveHeightM != null ? buoy.obs.waveHeightM * 3.28084 : null;
  const swellValue = buoyFt != null ? `${buoyFt.toFixed(1)} ft` : "—";
  const swellPeriod = buoy.obs.dominantPeriodS != null ? `${buoy.obs.dominantPeriodS} s` : "—";
  const read = buoyFt != null ? diveRead(buoyFt) : "—";
  const waterTemp = buoy.obs.waterTempC != null ? `${Math.round((buoy.obs.waterTempC * 9) / 5 + 32)}°F` : "—";

  // modeled SWAN, shown alongside the real buoy. Falls back to a clearly-labeled
  // sample if the PacIOOS ERDDAP model is unreachable (it 503s under load) — so
  // the badge reads Sample, never "Live · —".
  const waves = marine.data.waves ?? SAMPLE_MARINE.waves;
  const waveSource = marine.data.waves ? marine.source : marine.source === "loading" ? "loading" : "sample";
  const modeledValue = waves ? `${waves.hsFt.toFixed(1)} ft` : "—";
  const modeledSub = waves && waves.peakPeriodS != null ? `${Math.round(waves.peakPeriodS)} s · modeled (SWAN)` : "modeled (SWAN)";

  const uvText = marine.data.uv ? `${marine.data.uv.value} · ${marine.data.uv.label}` : "—";
  const tv = tide.view;

  const anyFetchedAt = buoy.fetchedAt ?? marine.fetchedAt ?? tide.fetchedAt ?? wx.fetchedAt;
  const anyLive = buoy.source === "live" || marine.source === "live" || tide.source === "live" || wx.source === "live";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#d6ecf5]/12 bg-gradient-to-br from-[#0b2f4a] via-[#1f6f9e] to-[#05192b] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* faint swell-line texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-20 80 C 110 40, 190 110, 420 60" stroke="#d6ecf5" strokeWidth="1.2" fill="none" />
        <path d="M-20 150 C 110 110, 190 180, 420 130" stroke="#d6ecf5" strokeWidth="1.2" fill="none" />
        <path d="M-20 230 C 110 190, 190 260, 420 210" stroke="#d6ecf5" strokeWidth="1.2" fill="none" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="nsd-eyebrow !text-[#ffc24d]">North Shore, right now</p>
            <h3 className="nsd-display mt-1 text-xl font-semibold text-[#eef7fb] sm:text-2xl">Dive report</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#57b6d6]/50 bg-[#05192b]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#bfe6f2]">
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute inline-flex h-full w-full rounded-full ${anyLive ? "animate-ping bg-[#57b6d6]" : "bg-[#bfe6f2]"} opacity-75`} />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${anyLive ? "bg-[#57b6d6]" : "bg-[#bfe6f2]"}`} />
            </span>
            {read !== "—" ? read : "Swell"}
          </span>
        </div>

        {/* SWELL hero tile — the REAL buoy */}
        <div className="nsd-glass mb-3 flex items-end justify-between gap-4 p-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#d6ecf5]/55">Swell off Waimea</span>
              <SourceBadge source={buoy.source} labels={{ live: "Live · NDBC" }} classes={BADGE} />
            </div>
            <div className="nsd-display text-2xl font-bold leading-none text-[#eef7fb] sm:text-3xl">{swellValue}</div>
            <div className="mt-1 text-[11px] text-[#d6ecf5]/60">
              dominant period {swellPeriod} · buoy 51201 (real, in the water)
            </div>
          </div>
          <svg viewBox="0 0 64 40" className="h-10 w-16 shrink-0 text-[#bfe6f2]" fill="none" aria-hidden="true">
            <path d="M2 28 C 16 28, 20 8, 34 8 C 48 8, 52 24, 62 24" stroke="currentColor" strokeWidth="2" />
            <path d="M34 8 C 27 10, 22 20, 20 26" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
          </svg>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <Tile label="Modeled surf" value={modeledValue} sub={modeledSub} source={waveSource} liveLabel="Live · PacIOOS" />
          <Tile label="Water temp" value={waterTemp} sub="from the buoy" source={buoy.source} liveLabel="Live · NDBC" />
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
          <Tile label="Wind" value={wx.obs.windTextMph} sub={wx.source === "live" ? `PHNL · ${wx.obs.obsTimeText}` : "island obs (PHNL)"} source={wx.source} liveLabel="Live · NWS" />
          <Tile label="UV index" value={uvText} sub="mineral sunscreen" source={marine.source} liveLabel="Live · EPA" />
          <Tile label="Daylight" value={sun.daylight} sub={`↑ ${sun.sunrise} · ↓ ${sun.sunset}`} source="computed" liveLabel="Computed" />
        </div>

        <UpdatedAgo at={anyFetchedAt} live={anyLive} className="mt-3 block text-right text-[10px] text-[#d6ecf5]/45" />

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#d6ecf5]/60">
          The headline swell is the real{" "}
          <span className="font-semibold text-[#eef7fb]/85">NDBC 51201 Waimea Bay buoy</span> — an actual
          instrument in the water off the North Shore — with the{" "}
          <span className="font-semibold text-[#eef7fb]/85">PacIOOS SWAN</span> nearshore model for Haleʻiwa
          shown beside it. Water temperature is the buoy&apos;s own reading; tide is the live NOAA
          prediction for Haleʻiwa; wind and air are the latest{" "}
          <span className="font-semibold text-[#eef7fb]/85">Honolulu (PHNL)</span> observation (the island
          station — North Shore wind can run different); UV is the EPA hourly forecast; sunrise, sunset, and
          daylight are computed. There is no public live feed for underwater visibility, so we don&apos;t
          show a number — ask the shop for today&apos;s report. A winter groundswell closes the shore dives
          out entirely; this is a planning aid, never a substitute for the divemaster&apos;s own call. If a
          feed is unreachable, that tile shows a clearly-labeled <span className="font-semibold text-[#eef7fb]/85">sample</span>.
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
    <div className="nsd-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between gap-1">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#d6ecf5]/50">{label}</span>
        <SourceBadge source={source} labels={{ live: liveLabel }} classes={BADGE} />
      </div>
      <span className="nsd-display text-[15px] font-semibold leading-tight text-[#eef7fb] sm:text-base">{value}</span>
      <span className="mt-0.5 text-[11px] text-[#d6ecf5]/60">{sub}</span>
    </div>
  );
}
