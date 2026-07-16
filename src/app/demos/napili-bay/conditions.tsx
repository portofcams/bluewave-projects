"use client";

// LIVE "NAPILI BAY RIGHT NOW" panel — the showpiece of the Napili Bay Beach Club
// sample site (Napili, West Maui). Built on the shared _wx library.
//
// WHY THIS PANEL: Napili is a leeward snorkeling bay — guests want to know if
// it's calm and clear enough to get in the water, what the tide's doing over the
// reef, and how strong the sun is. So the headline is a "snorkel read" off the
// nearshore wave model, not surf hype.
//
// Feeds (all keyless + CORS, verified 2026-07-16):
//   - SURF (modeled) → PacIOOS SWAN MAUI nearshore model at Napili Bay
//     (useMarine, waveDataset "swan_maui") — a nowcast, labeled "modeled." There
//     is no nearshore buoy on West Maui's leeward side, so no buoy tile is shown
//     (the Pauwela buoy reads the exposed north shore, not this bay).
//   - WATER TEMP → NOAA CO-OPS Kahului 1615680 (useMarine) — the island station.
//   - TIDE → NOAA CO-OPS Kahului 1615680 (useTidePredictions) — small Hawaii
//     range, a supporting tile.
//   - WIND / AIR → NWS Kahului (PHOG) — the island observation; leeward Napili
//     usually sits calmer, so it's labeled honestly.
//   - UV → EPA hourly for West Maui 96761 (useMarine).
//   - SUN → computed for Napili (solarTimes).
//
// HONESTY: water clarity has NO public live feed — no number is shown. Every
// feed badges Live/Sample honestly and falls back to a clearly-labeled sample.

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
const STATION = "1615680"; // NOAA CO-OPS Kahului (Maui) — tide + water temp
const UV_ZIP = "96761"; // West Maui (Lahaina district, incl. Napili)
const NAPILI_LAT = 20.994;
const NAPILI_LON = -156.667;
const SWAN_LAT = 20.995; // wet nearshore cell off Napili Bay (verified)
const SWAN_LON360 = 203.33;

const BADGE = {
  live: "border-[#4fd4cf]/55 bg-[#4fd4cf]/15 text-[#a9efe8]",
  computed: "border-[#ffbf47]/45 bg-[#ffbf47]/14 text-[#ffe0a0]",
  sample: "border-[#e6f6f2]/25 bg-[#e6f6f2]/8 text-[#e6f6f2]/70",
  loading: "border-[#e6f6f2]/20 text-[#e6f6f2]/45",
};

const SAMPLE_WX = decodeNwsObservation(
  { timestamp: null, rawMessage: "PHOG 162054Z 07013KT 10SM FEW035 SCT060 30/20 A3007" },
  "PHOG",
  TZ
);

const SAMPLE_TIDE_EVENTS: TideEvent[] = [
  { t: "2026-07-16 03:16", v: 1.4, type: "H", min: parsePredMin("2026-07-16 03:16") },
  { t: "2026-07-16 09:22", v: -0.3, type: "L", min: parsePredMin("2026-07-16 09:22") },
  { t: "2026-07-16 16:04", v: 1.5, type: "H", min: parsePredMin("2026-07-16 16:04") },
  { t: "2026-07-16 22:10", v: 0.2, type: "L", min: parsePredMin("2026-07-16 22:10") },
  { t: "2026-07-17 04:02", v: 1.45, type: "H", min: parsePredMin("2026-07-17 04:02") },
];
const SAMPLE_TIDE = buildTideView(SAMPLE_TIDE_EVENTS, parsePredMin("2026-07-16 13:00"), "2026-07-16")!;

// Modeled leeward Napili nearshore — calm summer bay. NEVER shown as live.
const SAMPLE_MARINE: MarineData = {
  waves: { hsM: 0.5, hsFt: 1.6, peakPeriodS: 10, meanPeriodS: 7, dirDeg: 250, dirCardinal: "WSW" },
  waterTempF: 81,
  uv: { value: 10, label: "Very high" },
};

// Napili snorkel read — a leeward bay is best when it's small and glassy.
function bayRead(hsFt: number): string {
  if (hsFt < 1) return "Glassy";
  if (hsFt < 2) return "Calm";
  if (hsFt < 3) return "Light chop";
  return "Chop — check the desk";
}

export function NapiliConditions() {
  const [sun] = useState(() => solarTimes(new Date(), NAPILI_LAT, NAPILI_LON, TZ));

  const marine = useMarine({
    tempStation: STATION,
    uvZip: UV_ZIP,
    sample: SAMPLE_MARINE,
    waveLat: SWAN_LAT,
    waveLon360: SWAN_LON360,
    waveDataset: "swan_maui",
  });
  const tide = useTidePredictions(STATION, { tz: TZ, sampleView: SAMPLE_TIDE });
  const wx = useNwsObservation("PHOG", { sample: SAMPLE_WX, tz: TZ });

  // SWAN Maui model is this bay's headline. Fall back to a clearly-labeled
  // sample if PacIOOS ERDDAP is unreachable (it 503s under load) — the badge
  // then reads Sample, never "Live · —".
  const waves = marine.data.waves ?? SAMPLE_MARINE.waves;
  const waveSource = marine.data.waves ? marine.source : marine.source === "loading" ? "loading" : "sample";
  const surfValue = waves ? `${waves.hsFt.toFixed(1)} ft` : "—";
  const surfPeriod = waves && waves.peakPeriodS != null ? `${Math.round(waves.peakPeriodS)} s` : "—";
  const read = waves ? bayRead(waves.hsFt) : "—";

  const waterTemp = marine.data.waterTempF != null ? `${Math.round(marine.data.waterTempF)}°F` : "—";
  const uvText = marine.data.uv ? `${marine.data.uv.value} · ${marine.data.uv.label}` : "—";
  const tv = tide.view;

  const anyFetchedAt = marine.fetchedAt ?? tide.fetchedAt ?? wx.fetchedAt;
  const anyLive = marine.source === "live" || tide.source === "live" || wx.source === "live";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e6f6f2]/12 bg-gradient-to-br from-[#0a4f57] via-[#17a2a6] to-[#06303a] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6">
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-20 80 C 100 62, 180 100, 420 72" stroke="#e6f6f2" strokeWidth="1" fill="none" />
        <path d="M-20 150 C 100 132, 180 170, 420 142" stroke="#e6f6f2" strokeWidth="1" fill="none" />
        <path d="M-20 220 C 100 202, 180 240, 420 212" stroke="#e6f6f2" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="npb-eyebrow !text-[#ffbf47]">Napili Bay, right now</p>
            <h3 className="npb-display mt-1 text-xl font-semibold text-[#f2fbf9] sm:text-2xl">Snorkel &amp; sea</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4fd4cf]/50 bg-[#06303a]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#bff0ea]">
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute inline-flex h-full w-full rounded-full ${anyLive ? "animate-ping bg-[#4fd4cf]" : "bg-[#bff0ea]"} opacity-75`} />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${anyLive ? "bg-[#4fd4cf]" : "bg-[#bff0ea]"}`} />
            </span>
            {read !== "—" ? read : "Bay"}
          </span>
        </div>

        {/* SNORKEL hero tile */}
        <div className="npb-glass mb-3 flex items-end justify-between gap-4 p-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#e6f6f2]/55">In the bay</span>
              <SourceBadge source={waveSource} labels={{ live: "Live · PacIOOS" }} classes={BADGE} />
            </div>
            <div className="npb-display text-2xl font-bold leading-none text-[#f2fbf9] sm:text-3xl">{surfValue}</div>
            <div className="mt-1 text-[11px] text-[#e6f6f2]/60">
              period {surfPeriod} · modeled nowcast (SWAN Maui)
            </div>
          </div>
          <svg viewBox="0 0 64 40" className="h-10 w-16 shrink-0 text-[#bff0ea]" fill="none" aria-hidden="true">
            <path d="M2 26 C 16 22, 24 22, 34 24 C 46 26, 52 24, 62 22" stroke="currentColor" strokeWidth="2" />
            <path d="M2 32 C 16 28, 24 28, 34 30 C 46 32, 52 30, 62 28" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <Tile label="Water temp" value={waterTemp} sub="Kahului · ocean" source={marine.source} liveLabel="Live · NOAA" />
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
          <Tile label="Wind" value={wx.obs.windTextMph} sub={wx.source === "live" ? `Kahului (PHOG)` : "trade winds"} source={wx.source} liveLabel="Live · NWS" />
          <Tile label="Air temp" value={wx.obs.tempText} sub="Kahului (PHOG)" source={wx.source} liveLabel="Live · NWS" />
          <Tile label="UV index" value={uvText} sub="reef-safe only" source={marine.source} liveLabel="Live · EPA" />
          <Tile label="Daylight" value={sun.daylight} sub={`↑ ${sun.sunrise} · ↓ ${sun.sunset}`} source="computed" liveLabel="Computed" />
        </div>

        <UpdatedAgo at={anyFetchedAt} live={anyLive} className="mt-3 block text-right text-[10px] text-[#e6f6f2]/45" />

        <p className="mt-3 text-[11px] leading-relaxed text-[#e6f6f2]/60">
          The bay reading is the <span className="font-semibold text-[#f2fbf9]/85">PacIOOS SWAN Maui</span>{" "}
          nearshore wave model at Napili (a modeled nowcast, not a buoy — there&apos;s no nearshore buoy on
          West Maui&apos;s leeward side). Water temperature and tide are live NOAA readings for Kahului; wind
          and air are the latest <span className="font-semibold text-[#f2fbf9]/85">Kahului (PHOG)</span>{" "}
          observation (the island station — leeward Napili usually sits calmer); UV is the EPA hourly
          forecast for West Maui; sunrise, sunset, and daylight are computed. There is no public live feed for
          water clarity, so we don&apos;t show a number — the bay is usually clearest on a calm morning before
          the trades fill in. A planning aid, not a lifeguard. If a feed is unreachable, that tile shows a
          clearly-labeled <span className="font-semibold text-[#f2fbf9]/85">sample</span>.
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
    <div className="npb-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between gap-1">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#e6f6f2]/50">{label}</span>
        <SourceBadge source={source} labels={{ live: liveLabel }} classes={BADGE} />
      </div>
      <span className="npb-display text-[15px] font-semibold leading-tight text-[#f2fbf9] sm:text-base">{value}</span>
      <span className="mt-0.5 text-[11px] text-[#e6f6f2]/60">{sub}</span>
    </div>
  );
}
