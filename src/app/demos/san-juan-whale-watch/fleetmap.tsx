"use client";

// LIVE WHALE-WATCH MAP — the showpiece of the San Juan whale-watch sample site,
// on the shared _wx library. The strong version of the AIS demo: whale-watch
// tour boats DO carry AIS (65 ft+ Class A by law in the Haro Strait VTS area;
// RIBs often Class B), so the live map genuinely shows tour/commercial traffic.
//
// RESPONSIBLE-VIEWING DESIGN (the honest posture, verified against WA/NOAA
// rules): the map tracks OUR BOAT (a commercial vessel broadcasting itself on
// AIS) — it does NOT plot whales. Whale sightings show as a COARSE-AREA,
// community-reported "recent activity" list from Acartia (keyless + CORS, no
// proxy), never as precise live pins. Southern Resident orcas are endangered
// (1,000 yd setback, RCW 77.15.740); tours focus on Bigg's + other species.
//
// Feeds (all keyless + CORS): AIS via the proxy (?region=sanjuan; sample until
// deployed) · tide 9449880 Friday Harbor · current PUG1724 (Haro Strait off
// Lime Kiln) · water temp 9444900 Port Townsend (nearest working sensor —
// labeled honestly) · wind KFHR · sightings Acartia · sun computed.

import { useState } from "react";
import {
  aisProxyUrl,
  buildTideView,
  decodeNwsObservation,
  parsePredMin,
  projectToXY,
  sightingAgeText,
  solarTimes,
  VESSEL_LABEL,
  type Bbox,
  type CurrentState,
  type TideEvent,
  type Vessel,
} from "../_wx";
import {
  SourceBadge,
  UpdatedAgo,
  useAisVessels,
  useCurrents,
  useNwsObservation,
  useSightings,
  useTidePredictions,
  useWaterTemp,
} from "../_wx/live";

const TZ = "America/Los_Angeles";
const SJ_BBOX: Bbox = { latMin: 48.4, latMax: 48.72, lonMin: -123.32, lonMax: -122.95 };
const TIDE_STATION = "9449880"; // Friday Harbor
const CURRENT_STATION = "PUG1724"; // South Haro Strait, off Lime Kiln
const WATER_STATION = "9444900"; // Port Townsend (nearest working SST sensor)
const WIND_STATION = "KFHR"; // Friday Harbor Airport
const SJ_LAT = 48.53;
const SJ_LON = -123.1;

const W = 520;
const H = 380;

const BADGE = {
  live: "border-[#2fc7d6]/50 bg-[#2fc7d6]/15 text-[#a6ecf2]",
  computed: "border-[#e0a06a]/45 bg-[#e0a06a]/14 text-[#f0c9a6]",
  sample: "border-[#cfe4e6]/25 bg-[#cfe4e6]/8 text-[#cfe4e6]/70",
  loading: "border-[#cfe4e6]/20 text-[#cfe4e6]/45",
};

function pipColor(v: Vessel, sample: boolean): string {
  if (sample) return v.type === "passenger" || v.type === "fishing" ? "#2fc7d6" : "#8fb8cc";
  switch (v.type) {
    case "passenger":
      return "#2fc7d6"; // tour boats — the operator's category
    case "fishing":
      return "#7fd0c0";
    case "cargo":
    case "tanker":
      return "#8aa0b0";
    case "pleasure":
      return "#c9a0e0";
    default:
      return "#b6c6d2";
  }
}

function speciesColor(sp: string): string {
  const s = sp.toLowerCase();
  if (s.includes("orca")) return "#2fc7d6";
  if (s.includes("humpback")) return "#4a9a7a";
  if (s.includes("gray")) return "#e0a06a";
  if (s.includes("minke")) return "#8fb8cc";
  if (s.includes("fin") || s.includes("blue")) return "#8fa8d8";
  return "#cfe4e6";
}

// ---- honest SAMPLE conditions ---------------------------------------------
const SAMPLE_WX = decodeNwsObservation(
  {
    timestamp: null,
    rawMessage: "KFHR 100020Z 22007KT 10SM FEW045 18/11 A3005",
    temperature: { value: 18 },
    dewpoint: { value: 11 },
    windDirection: { value: 220 },
    windSpeed: { value: 13 },
    visibility: { value: 16090 },
    barometricPressure: { value: 101760 },
    cloudLayers: [{ amount: "FEW", base: { value: 1372 } }],
  },
  "KFHR",
  TZ
);

const SAMPLE_TIDE_EVENTS: TideEvent[] = [
  { t: "2026-07-09 07:17", v: -0.1, type: "L", min: parsePredMin("2026-07-09 07:17") },
  { t: "2026-07-09 13:48", v: 5.4, type: "H", min: parsePredMin("2026-07-09 13:48") },
  { t: "2026-07-09 17:36", v: 4.1, type: "L", min: parsePredMin("2026-07-09 17:36") },
  { t: "2026-07-09 23:44", v: 8.2, type: "H", min: parsePredMin("2026-07-09 23:44") },
  { t: "2026-07-10 08:03", v: -1.2, type: "L", min: parsePredMin("2026-07-10 08:03") },
];
const SAMPLE_TIDE = buildTideView(SAMPLE_TIDE_EVENTS, parsePredMin("2026-07-09 13:00"), "2026-07-09")!;

const SAMPLE_CURRENT: CurrentState = {
  stateText: "Ebbing",
  speedKt: 2.1,
  dirCardinal: "SE",
  peakKt: 2.8,
  nextText: "slack at 10:32 AM",
};

export function WhaleFleet() {
  const [sun] = useState(() => solarTimes(new Date(), SJ_LAT, SJ_LON, TZ));

  const ais = useAisVessels({ bbox: SJ_BBOX, url: aisProxyUrl("sanjuan") });
  const sightings = useSightings(SJ_BBOX, { maxAgeHours: 168, cap: 8 });
  const tide = useTidePredictions(TIDE_STATION, { tz: TZ, sampleView: SAMPLE_TIDE });
  const current = useCurrents(CURRENT_STATION, { tz: TZ, sample: SAMPLE_CURRENT });
  const water = useWaterTemp(WATER_STATION, { sample: 54 });
  const wx = useNwsObservation(WIND_STATION, { sample: SAMPLE_WX, tz: TZ });

  const sampleMode = ais.source !== "live";
  const vessels = ais.vessels;
  const moving = vessels.filter((v) => (v.sog ?? 0) > 0.5).length;

  const cs = current.state;
  const currentText = cs.stateText === "Slack" ? "Slack" : `${cs.stateText} ${cs.speedKt.toFixed(1)} kt`;
  const tv = tide.view;
  const waterText = water.tempF != null ? `${Math.round(water.tempF)}°F` : "—";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#cfe4e6]/12 bg-gradient-to-br from-[#0f2f3f] via-[#16495e] to-[#0a1f2e] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6">
      <div className="relative">
        {/* header */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="sjw-eyebrow !text-[#2fc7d6]">Haro Strait · live</p>
            <h3 className="sjw-display mt-1 text-xl font-semibold text-[#f2fbfb] sm:text-2xl">Where&apos;s the fleet</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="sjw-mono text-[11px] text-[#a6d6da]">{vessels.length} vessels · {moving} underway</span>
            <SourceBadge source={ais.source} labels={{ live: "Live · AIS", sample: "Sample fleet" }} classes={BADGE} />
          </div>
        </div>

        {/* THE CHART MAP */}
        <div className="relative overflow-hidden rounded-2xl border border-[#cfe4e6]/10 bg-[#081f2c]">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Live vessel chart of Haro Strait and San Juan Channel">
            {/* lat/lon grid */}
            <g stroke="#cfe4e6" strokeWidth="0.5" opacity="0.1">
              {[0.2, 0.4, 0.6, 0.8].map((f) => <line key={`v${f}`} x1={f * W} y1={0} x2={f * W} y2={H} />)}
              {[0.25, 0.5, 0.75].map((f) => <line key={`h${f}`} x1={0} y1={f * H} x2={W} y2={f * H} />)}
            </g>

            {/* Vancouver Island edge (far west) */}
            <path d="M0 0 L44 0 L30 120 L40 240 L24 380 L0 380 Z" fill="#12302a" />
            {/* small islands top */}
            <path d="M120 0 L200 0 L180 40 L120 44 Z" fill="#12302a" opacity="0.9" />
            <path d="M440 0 L520 0 L520 70 L446 56 Z" fill="#12302a" opacity="0.9" />
            {/* Haro Strait shipping lane hint (west channel) */}
            <path d="M110 20 C 130 140, 120 260, 150 370" stroke="#2fc7d6" strokeWidth="1" fill="none" opacity="0.22" strokeDasharray="5 8" />
            {/* depth contours in Haro Strait */}
            <g fill="none" stroke="#7fb0cc" opacity="0.22">
              <path d="M60 100 C 100 130, 150 120, 190 150" strokeWidth="1" />
              <path d="M60 220 C 100 250, 150 240, 190 270" strokeWidth="1" />
            </g>

            {/* San Juan Island (central-right blob) */}
            <path d="M210 150 C 250 120, 360 118, 430 150 C 470 170, 470 260, 420 300 C 360 330, 250 322, 214 288 C 190 262, 190 190, 210 150 Z" fill="#15321f" />
            <g stroke="#1f4a3a" strokeWidth="1.4" opacity="0.5" fill="none">
              <path d="M250 180 L242 168 L258 180 M320 170 L312 156 L328 170 M380 186 L372 172 L388 186 M300 250 L292 236 L308 250" />
            </g>

            {/* Lime Kiln lighthouse — island's west shore (Haro Strait side) */}
            <g transform="translate(214 240)">
              <path d="M-3 10 L-2 -8 L2 -8 L3 10 Z" fill="#eaf6f6" />
              <rect x="-3" y="-12" width="6" height="5" fill="#2fc7d6" />
              <text x="-8" y="26" fill="#a6d6da" fontSize="8" fontFamily="ui-monospace" textAnchor="middle" opacity="0.7">Lime Kiln</text>
            </g>
            {/* Friday Harbor — island's east side */}
            <g transform="translate(430 214)">
              <rect x="-30" y="-8" width="60" height="16" rx="3" fill="#0a1f2e" stroke="#2fc7d6" strokeWidth="1" opacity="0.9" />
              <text x="0" y="4" textAnchor="middle" fill="#a6ecf2" fontSize="9.5" fontFamily="'Spectral', serif" fontWeight="700" letterSpacing="0.4">FRIDAY HBR</text>
            </g>

            {/* compass N + zone label */}
            <g transform="translate(30 34)" opacity="0.7">
              <path d="M0 -12 L4 4 L0 0 L-4 4 Z" fill="#eaf6f6" />
              <text x="0" y="18" textAnchor="middle" fill="#a6d6da" fontSize="8" fontFamily="ui-monospace">N</text>
            </g>
            <text x={120} y={H - 12} textAnchor="middle" fill="#a6d6da" fontSize="9" fontFamily="ui-monospace" opacity="0.5" letterSpacing="1">HARO STRAIT</text>

            {/* VESSEL PIPS */}
            {vessels.map((v) => {
              const { x, y } = projectToXY(v.lat, v.lon, SJ_BBOX, W, H);
              const color = pipColor(v, sampleMode);
              const hdg = v.cog ?? v.heading ?? 0;
              const isMoving = (v.sog ?? 0) > 0.5;
              return (
                <g key={v.mmsi} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                  {isMoving && (
                    <line x1={0} y1={0} x2={-8 * Math.sin((hdg * Math.PI) / 180)} y2={8 * Math.cos((hdg * Math.PI) / 180)} stroke={color} strokeWidth="1" opacity="0.4" />
                  )}
                  {isMoving && ais.source === "live" && (
                    <circle r="4" fill="none" stroke={color} strokeWidth="1.2" className="sjw-ping" style={{ transformOrigin: "center" }} />
                  )}
                  <g transform={`rotate(${hdg})`}>
                    <path d="M0 -5.5 L3.6 4.5 L0 2 L-3.6 4.5 Z" fill={color} stroke="#0a1f2e" strokeWidth="0.5" />
                  </g>
                  {sampleMode && (v.type === "passenger" || v.type === "fishing") && (
                    <circle r="7" fill="none" stroke="#2fc7d6" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7" />
                  )}
                </g>
              );
            })}
          </svg>

          <div className="pointer-events-none absolute bottom-2 left-3 right-3 flex items-end justify-between gap-2">
            <span className="rounded bg-[#0a1f2e]/70 px-2 py-1 text-[9px] leading-tight text-[#cfe4e6]/70 backdrop-blur-sm">
              {ais.source === "live" ? "Live vessel traffic (public AIS)" : "Sample fleet — illustrative"} · we track our boat, not the whales
            </span>
            <UpdatedAgo at={ais.fetchedAt} live={ais.source === "live"} className="rounded bg-[#0a1f2e]/70 px-2 py-1 text-[9px] text-[#cfe4e6]/60 backdrop-blur-sm" />
          </div>
        </div>

        {/* RECENT WHALE ACTIVITY — coarse, community-reported, NO whale pins */}
        <div className="mt-3 rounded-2xl border border-[#cfe4e6]/10 bg-[#0a2634]/60 p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="sjw-display text-[13px] font-semibold text-[#f2fbfb]">Recent whale activity</span>
            <SourceBadge source={sightings.source} labels={{ live: "Live · Acartia", sample: "No reports" }} classes={BADGE} />
          </div>
          {sightings.sightings.length ? (
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {sightings.sightings.slice(0, 6).map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px]">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: speciesColor(s.species) }} />
                  <span className="font-semibold text-[#eaf6f6]">{s.species}</span>
                  {s.count && s.count > 1 ? <span className="text-[#a6d6da]">×{s.count}</span> : null}
                  <span className="truncate text-[#a6d6da]">· {s.area} · {sightingAgeText(s.ageMin)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-[#a6d6da]/70">
              {sightings.source === "loading" ? "Checking the sightings network…" : "No recent reports in the area — the whales move on their own schedule."}
            </p>
          )}
          <p className="mt-2 text-[10px] leading-relaxed text-[#a6d6da]/55">
            Community-reported via Acartia (Orca Network, Whale Museum &amp; others) — approximate area and delayed, not live
            telemetry. We deliberately don&apos;t plot precise whale positions: give them space. <span className="text-[#a6ecf2]">Be Whale Wise.</span>
          </p>
        </div>

        {/* CONDITIONS STRIP */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Mini label="Tide" value={tv.stateText} sub={tv.rising ? (tv.nextHigh ? `H ${tv.nextHigh.time}` : "rising") : tv.nextLow ? `L ${tv.nextLow.time}` : "falling"} source={tide.source} liveLabel="NOAA" />
          <Mini label="Current" value={currentText} sub={cs.nextText ? cs.nextText : "Haro Strait"} source={current.source} liveLabel="NOAA" />
          <Mini label="Water" value={waterText} sub="Salish · Pt Townsend" source={water.source} liveLabel="NOAA" />
          <Mini label="Wind" value={wx.obs.windTextMph} sub="Friday Harbor (KFHR)" source={wx.source} liveLabel="NWS" />
        </div>

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#a6d6da]/70">
          The map shows{" "}
          {ais.source === "live" ? "real live vessel traffic in Haro Strait / San Juan Channel from public AIS" : "a clearly-labeled illustrative sample fleet (the AIS proxy isn't connected here)"}
          . Whale-watch tour boats carry AIS, so once an operator&apos;s vessel is on the feed it&apos;s a live marker — the map tracks the
          boat, not the whales. Tide and current are live NOAA for Friday Harbor / Haro Strait; water temp is the nearest NOAA sensor
          (Port Townsend); wind is Friday Harbor Airport (KFHR); sunrise/sunset ({sun.sunrise} / {sun.sunset}) are computed. Whale
          sightings are community-reported and approximate. Southern Resident orcas are endangered — responsible tours focus on Bigg&apos;s
          and other species and keep their distance.
        </p>
      </div>
    </div>
  );
}

function Mini({
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
    <div className="sjw-glass flex flex-col p-2.5">
      <div className="mb-1 flex items-center justify-between gap-1">
        <span className="text-[9px] uppercase tracking-[0.12em] text-[#a6d6da]/60">{label}</span>
        <SourceBadge source={source} labels={{ live: `Live · ${liveLabel}` }} classes={BADGE} />
      </div>
      <span className="sjw-display text-[13px] font-semibold leading-tight text-[#f2fbfb]">{value}</span>
      <span className="mt-0.5 text-[10px] text-[#a6d6da]/70">{sub}</span>
    </div>
  );
}
