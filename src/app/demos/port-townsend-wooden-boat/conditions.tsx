"use client";

// LIVE "ON THE WATER RIGHT NOW" panel — the showpiece of the Port Townsend
// Wooden Boat Festival hub, built on the shared _wx library.
//
// WHY THIS PANEL: a wooden-boat festival on Puget Sound with sail-bys and
// on-water racing — and the organizer's site shows NO live conditions. For the
// Salish Sea the headline number is the TIDAL CURRENT: Admiralty Inlet /
// Point Wilson rips hard (peak ebb ~3.5 kt right off the festival grounds), so
// the current leads, backed by tide, cold water temp, and wind.
//
// Feeds (all keyless + CORS, verified live 2026-07-09):
//   - CURRENT → NOAA CO-OPS PUG1623 "Point Wilson" (useCurrents)
//   - TIDE → NOAA CO-OPS 9444900 "Port Townsend" (useTidePredictions)
//   - WATER TEMP → NOAA CO-OPS 9444900 water_temperature (useWaterTemp)
//   - AIR / WIND → NWS KNUW Whidbey Island NAS (useNwsObservation; 0S9 Port
//     Townsend's own strip 404s on the obs API, so the nearest working station)
//   - SUN → computed for Port Townsend (solarTimes)
//
// (The NWS marine text zone is intentionally omitted — the correct zone is
// PZZ134 Admiralty Inlet, but marine zones don't serve text at /forecast; the
// live current/tide/wind tell the on-water story without a fragile text fetch.)

import { useState } from "react";
import {
  buildTideView,
  decodeNwsObservation,
  parsePredMin,
  solarTimes,
  type CurrentState,
  type TideEvent,
} from "../_wx";
import {
  SourceBadge,
  UpdatedAgo,
  useCurrents,
  useNwsObservation,
  useTidePredictions,
  useWaterTemp,
} from "../_wx/live";

const TZ = "America/Los_Angeles";
const TIDE_STATION = "9444900"; // Port Townsend (tide + water temp)
const CURRENT_STATION = "PUG1623"; // Point Wilson, Admiralty Inlet
const WIND_STATION = "KNUW"; // Whidbey Island NAS (nearest working NWS obs)
const PT_LAT = 48.1112;
const PT_LON = -122.7597;

const BADGE = {
  live: "border-[#5bbf8f]/50 bg-[#5bbf8f]/15 text-[#a7e3c4]",
  computed: "border-[#c99a3f]/45 bg-[#c99a3f]/14 text-[#e6c987]",
  sample: "border-[#cfe0dd]/25 bg-[#cfe0dd]/8 text-[#cfe0dd]/70",
  loading: "border-[#cfe0dd]/20 text-[#cfe0dd]/45",
};

// ---- honest SAMPLE values (clearly labeled; realistic Salish Sea) ----------
const SAMPLE_WX = decodeNwsObservation(
  {
    timestamp: null,
    rawMessage: "KNUW 092053Z 28006KT 10SM BKN035 16/11 A3015",
    temperature: { value: 16 },
    dewpoint: { value: 11 },
    windDirection: { value: 280 },
    windSpeed: { value: 11 },
    visibility: { value: 16090 },
    barometricPressure: { value: 102070 },
    cloudLayers: [{ amount: "BKN", base: { value: 1067 } }],
  },
  "KNUW",
  TZ
);

const SAMPLE_TIDE_EVENTS: TideEvent[] = [
  { t: "2026-07-09 06:21", v: -0.1, type: "L", min: parsePredMin("2026-07-09 06:21") },
  { t: "2026-07-09 14:52", v: 6.1, type: "H", min: parsePredMin("2026-07-09 14:52") },
  { t: "2026-07-09 17:10", v: 5.9, type: "L", min: parsePredMin("2026-07-09 17:10") },
  { t: "2026-07-09 23:29", v: 8.7, type: "H", min: parsePredMin("2026-07-09 23:29") },
  { t: "2026-07-10 07:09", v: -1.3, type: "L", min: parsePredMin("2026-07-10 07:09") },
];
const SAMPLE_TIDE = buildTideView(SAMPLE_TIDE_EVENTS, parsePredMin("2026-07-09 13:00"), "2026-07-09")!;

const SAMPLE_CURRENT: CurrentState = {
  stateText: "Ebbing",
  speedKt: 2.1,
  dirCardinal: "NW",
  peakKt: 3.5,
  nextText: "slack at 1:46 PM",
};

export function PortTownsendConditions() {
  const [sun] = useState(() => solarTimes(new Date(), PT_LAT, PT_LON, TZ));

  const current = useCurrents(CURRENT_STATION, { tz: TZ, sample: SAMPLE_CURRENT });
  const tide = useTidePredictions(TIDE_STATION, { tz: TZ, sampleView: SAMPLE_TIDE });
  const water = useWaterTemp(TIDE_STATION, { sample: 55 });
  const wx = useNwsObservation(WIND_STATION, { sample: SAMPLE_WX, tz: TZ });

  const cs = current.state;
  const curValue = cs.stateText === "Slack" ? "Slack water" : `${cs.stateText} ${cs.speedKt.toFixed(1)} kt`;
  const curSub =
    (cs.stateText !== "Slack" && cs.dirCardinal ? `setting ${cs.dirCardinal} · ` : "") +
    (cs.nextText ? `next ${cs.nextText}` : cs.peakKt != null ? `peak ~${cs.peakKt.toFixed(1)} kt today` : "Point Wilson");

  const tv = tide.view;
  const waterText = water.tempF != null ? `${Math.round(water.tempF)}°F` : "—";

  const anyFetchedAt = current.fetchedAt ?? tide.fetchedAt ?? water.fetchedAt ?? wx.fetchedAt;
  const anyLive =
    current.source === "live" || tide.source === "live" || water.source === "live" || wx.source === "live";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#cfe0dd]/12 bg-gradient-to-br from-[#1b3a41] via-[#2c5560] to-[#12262b] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6">
      {/* faint chart-current texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-20 70 C 100 50, 180 90, 420 60" stroke="#cfe0dd" strokeWidth="1" fill="none" />
        <path d="M-20 150 C 100 130, 180 170, 420 140" stroke="#cfe0dd" strokeWidth="1" fill="none" />
        <path d="M-20 230 C 100 210, 180 250, 420 220" stroke="#cfe0dd" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="ptw-eyebrow !text-[#c99a3f]">Port Townsend, right now</p>
            <h3 className="ptw-display mt-1 text-xl font-semibold text-[#f4efe0] sm:text-2xl">On the water</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5bbf8f]/45 bg-[#12262b]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#bfe0d0]">
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute inline-flex h-full w-full rounded-full ${anyLive ? "animate-ping bg-[#5bbf8f]" : "bg-[#bfe0d0]"} opacity-75`} />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${anyLive ? "bg-[#5bbf8f]" : "bg-[#bfe0d0]"}`} />
            </span>
            {cs.stateText === "Slack" ? "Slack" : `${cs.stateText} ${cs.speedKt.toFixed(1)} kt`}
          </span>
        </div>

        {/* CURRENT hero tile — the Admiralty Inlet story */}
        <div className="ptw-glass mb-3 flex items-end justify-between gap-4 p-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#cfe0dd]/55">Tidal current · Point Wilson</span>
              <SourceBadge source={current.source} labels={{ live: "Live · NOAA" }} classes={BADGE} />
            </div>
            <div className="ptw-display text-2xl font-bold leading-none text-[#f4efe0] sm:text-3xl">{curValue}</div>
            <div className="mt-1 text-[11px] text-[#cfe0dd]/60">{curSub}</div>
          </div>
          <svg viewBox="0 0 64 40" className="h-10 w-16 shrink-0 text-[#bfe0d0]" fill="none" aria-hidden="true">
            <path d="M4 26 C 18 26, 20 14, 34 14 C 48 14, 50 24, 60 24" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
            <path d="M4 20 h44 M40 14 l8 6 l-8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Tile
            label="Tide"
            value={tv.stateText}
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
          <Tile label="Water temp" value={waterText} sub="cold — dress for it" source={water.source} liveLabel="Live · NOAA" />
          <Tile label="Wind" value={wx.obs.windTextMph} sub={wx.source === "live" ? `Whidbey NAS · ${wx.obs.obsTimeText}` : "Whidbey NAS (KNUW)"} source={wx.source} liveLabel="Live · NWS" />
          <Tile label="Air temp" value={wx.obs.tempText} sub="across the inlet" source={wx.source} liveLabel="Live · NWS" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Tile label="Range today" value={tv.rangeText} sub="tide high − low" source={tide.source} liveLabel="Live · NOAA" />
          <Tile label="Peak current" value={cs.peakKt != null ? `${cs.peakKt.toFixed(1)} kt` : "—"} sub="strongest today" source={current.source} liveLabel="Live · NOAA" />
          <Tile label="Daylight" value={sun.daylight} sub={`↑ ${sun.sunrise} · ↓ ${sun.sunset}`} source="computed" liveLabel="Computed" />
          <Tile label="Sky" value={wx.obs.skyText} sub="cloud cover" source={wx.source} liveLabel="Live · NWS" />
        </div>

        <UpdatedAgo at={anyFetchedAt} live={anyLive} className="mt-3 block text-right text-[10px] text-[#cfe0dd]/45" />

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#cfe0dd]/60">
          The tidal current is the live NOAA prediction for{" "}
          <span className="font-semibold text-[#f4efe0]/85">Point Wilson (PUG1623)</span>, the rip
          just off the festival grounds where Admiralty Inlet meets the Strait — it runs hard.
          Tide, range, and cold water temperature are live NOAA readings for{" "}
          <span className="font-semibold text-[#f4efe0]/85">Port Townsend (9444900)</span>; wind, air,
          and sky are the latest{" "}
          <span className="font-semibold text-[#f4efe0]/85">Whidbey Island NAS (KNUW)</span>{" "}
          observation across the inlet; sunrise, sunset, and daylight are computed. It&apos;s a
          planning glance, not a substitute for the harbormaster, the race committee, or your own
          look at the water. If a feed is unreachable, that tile shows a clearly-labeled{" "}
          <span className="font-semibold text-[#f4efe0]/85">sample</span>.
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
    <div className="ptw-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between gap-1">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#cfe0dd]/50">{label}</span>
        <SourceBadge source={source} labels={{ live: liveLabel }} classes={BADGE} />
      </div>
      <span className="ptw-display text-[15px] font-semibold leading-tight text-[#f4efe0] sm:text-base">{value}</span>
      <span className="mt-0.5 text-[11px] text-[#cfe0dd]/60">{sub}</span>
    </div>
  );
}
