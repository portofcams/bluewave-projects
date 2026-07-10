"use client";

// LIVE FLEET MAP — the showpiece of the charter-fishing-fleet sample site, and
// the demo's biggest capability leap: a live vessel map, built on the shared
// _wx library (useAisVessels + the conditions hooks).
//
// PROTOTYPED ON SEWARD / RESURRECTION BAY (not Homer): most Homer halibut
// charter boats are under 65 ft and legally don't transmit AIS, so a Homer box
// would be sparse. Seward has the same sport-fishing identity AND dense,
// AIS-equipped traffic (Kenai Fjords / Major Marine tour catamarans, cruise,
// rail freight) — so the live map is provably alive.
//
// HONESTY CONTRACT:
//   - LIVE mode shows REAL vessels transmitting AIS in the bay (public data via
//     aisstream.io), labeled "live vessel traffic," NEVER relabeled as "our
//     fleet." Most small charter boats aren't AIS-equipped, so the live layer
//     is larger vessels — the value prop is: equip your boats and THEY become
//     the branded markers.
//   - When the proxy is unreachable (default — not yet deployed), the map shows
//     a clearly-labeled ANIMATED SAMPLE fleet ("illustrative — how your branded
//     boats would appear"), visually distinct, never presented as live.
//   - No fake boats are ever mixed into the live layer.

import { useState } from "react";
import {
  buildTideView,
  decodeNwsObservation,
  parsePredMin,
  projectToXY,
  solarTimes,
  VESSEL_LABEL,
  type Bbox,
  type TideEvent,
  type Vessel,
} from "../_wx";
import {
  SourceBadge,
  UpdatedAgo,
  useAisVessels,
  useNwsObservation,
  useTidePredictions,
  useWaterTemp,
} from "../_wx/live";

const TZ = "America/Anchorage";
const SEWARD_BBOX: Bbox = { latMin: 59.8, latMax: 60.15, lonMin: -149.6, lonMax: -149.25 };
const TIDE_STATION = "9455090"; // Seward
const WIND_STATION = "PAWD"; // Seward
const SEWARD_LAT = 60.03;
const SEWARD_LON = -149.44;

const BADGE = {
  live: "border-[#2fd07a]/50 bg-[#2fd07a]/15 text-[#8fe6b8]",
  computed: "border-[#ff7a3c]/45 bg-[#ff7a3c]/14 text-[#ffb591]",
  sample: "border-[#d6e6ee]/25 bg-[#d6e6ee]/8 text-[#d6e6ee]/70",
  loading: "border-[#d6e6ee]/20 text-[#d6e6ee]/45",
};

// map viewBox
const W = 520;
const H = 380;

// vessel pip color by type; in sample mode, "your fleet" fishing boats are the
// safety-orange brand color and everything else reads as muted area traffic.
function pipColor(v: Vessel, sample: boolean): string {
  if (sample) return v.type === "fishing" ? "#ff7a3c" : "#8fb8cc";
  switch (v.type) {
    case "fishing":
      return "#ff7a3c";
    case "passenger":
      return "#5bb0e0";
    case "cargo":
    case "tanker":
      return "#8aa0b0";
    case "pleasure":
      return "#c9a0e0";
    default:
      return "#b6c6d2";
  }
}

// ---- honest SAMPLE conditions -------------------------------------------
const SAMPLE_WX = decodeNwsObservation(
  {
    timestamp: null,
    rawMessage: "PAWD 092340Z 03010G15KT 10SM BKN040 15/10 A2998",
    temperature: { value: 15 },
    dewpoint: { value: 10 },
    windDirection: { value: 30 },
    windSpeed: { value: 18.5 },
    windGust: { value: 27.8 },
    visibility: { value: 16090 },
    barometricPressure: { value: 101520 },
    cloudLayers: [{ amount: "BKN", base: { value: 1219 } }],
  },
  "PAWD",
  TZ
);

const SAMPLE_TIDE_EVENTS: TideEvent[] = [
  { t: "2026-07-09 03:14", v: 1.1, type: "L", min: parsePredMin("2026-07-09 03:14") },
  { t: "2026-07-09 09:27", v: 6.5, type: "H", min: parsePredMin("2026-07-09 09:27") },
  { t: "2026-07-09 14:34", v: 3.3, type: "L", min: parsePredMin("2026-07-09 14:34") },
  { t: "2026-07-09 21:12", v: 10.5, type: "H", min: parsePredMin("2026-07-09 21:12") },
  { t: "2026-07-10 04:27", v: 0.2, type: "L", min: parsePredMin("2026-07-10 04:27") },
];
const SAMPLE_TIDE = buildTideView(SAMPLE_TIDE_EVENTS, parsePredMin("2026-07-09 13:00"), "2026-07-09")!;

export function CharterFleet() {
  const [sun] = useState(() => solarTimes(new Date(), SEWARD_LAT, SEWARD_LON, TZ));

  const ais = useAisVessels({ bbox: SEWARD_BBOX });
  const tide = useTidePredictions(TIDE_STATION, { tz: TZ, sampleView: SAMPLE_TIDE });
  const wx = useNwsObservation(WIND_STATION, { sample: SAMPLE_WX, tz: TZ });
  const water = useWaterTemp(TIDE_STATION, { sample: 52 });

  const sampleMode = ais.source !== "live";
  const vessels = ais.vessels;
  const moving = vessels.filter((v) => (v.sog ?? 0) > 0.5).length;
  // roster: moving vessels first, then by name
  const roster = [...vessels]
    .sort((a, b) => (b.sog ?? 0) - (a.sog ?? 0))
    .slice(0, 6);

  const tv = tide.view;
  const waterText = water.tempF != null ? `${Math.round(water.tempF)}°F` : "—";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#d6e6ee]/12 bg-gradient-to-br from-[#0c2740] via-[#123a5c] to-[#081a2b] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6">
      <div className="relative">
        {/* header */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="chf-eyebrow !text-[#ff7a3c]">Resurrection Bay · live</p>
            <h3 className="chf-display mt-1 text-xl font-semibold text-[#eef6fa] sm:text-2xl">Where&apos;s the fleet</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="chf-mono text-[11px] text-[#9fc4d6]">{vessels.length} vessels · {moving} underway</span>
            <SourceBadge
              source={ais.source}
              labels={{ live: "Live · AIS", sample: "Sample fleet" }}
              classes={BADGE}
            />
          </div>
        </div>

        {/* THE CHART MAP */}
        <div className="relative overflow-hidden rounded-2xl border border-[#d6e6ee]/10 bg-[#081f34]">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Live vessel chart of Resurrection Bay, Seward">
            {/* lat/lon grid */}
            <g stroke="#d6e6ee" strokeWidth="0.5" opacity="0.12">
              {[0.2, 0.4, 0.6, 0.8].map((f) => (
                <line key={`v${f}`} x1={f * W} y1={0} x2={f * W} y2={H} />
              ))}
              {[0.25, 0.5, 0.75].map((f) => (
                <line key={`h${f}`} x1={0} y1={f * H} x2={W} y2={f * H} />
              ))}
            </g>

            {/* water channel (lighter than bg) */}
            <path d="M150 0 L370 0 L400 120 L370 210 L410 300 L360 380 L160 380 L110 300 L150 210 L120 120 Z" fill="#0e3352" opacity="0.85" />
            {/* depth contours */}
            <g fill="none" stroke="#7fb0cc" opacity="0.28">
              <path d="M180 60 C 240 90, 300 70, 350 100" strokeWidth="1" />
              <path d="M170 170 C 240 200, 300 180, 360 210" strokeWidth="1" />
              <path d="M180 290 C 240 320, 310 300, 360 320" strokeWidth="1" />
            </g>

            {/* land masses (forested Alaska shores of the fjord) */}
            <path d="M0 0 L150 0 L120 120 L150 210 L110 300 L150 380 L0 380 Z" fill="#15321f" />
            <path d="M520 0 L370 0 L400 120 L370 210 L410 300 L360 380 L520 380 Z" fill="#15321f" />
            <g stroke="#2f5a3d" strokeWidth="1" opacity="0.5" fill="none">
              <path d="M120 40 L96 44 M132 120 L108 124 M120 220 L96 226 M132 300 L104 306" />
              <path d="M400 40 L424 44 M388 120 L412 124 M400 220 L424 226 M388 300 L416 306" />
            </g>

            {/* Seward harbor marker (head of the bay, north/top) */}
            <g transform={`translate(${W / 2} 26)`}>
              <rect x="-26" y="-8" width="52" height="16" rx="3" fill="#0c2740" stroke="#ff7a3c" strokeWidth="1" opacity="0.9" />
              <text x="0" y="4" textAnchor="middle" fill="#ffb591" fontSize="10" fontFamily="'Chivo', sans-serif" fontWeight="700" letterSpacing="1">SEWARD</text>
              <path d="M-30 12 L30 12" stroke="#ff7a3c" strokeWidth="1.4" opacity="0.7" />
              <path d="M0 12 L0 18" stroke="#ff7a3c" strokeWidth="1.4" opacity="0.7" />
            </g>
            {/* compass N */}
            <g transform="translate(30 34)" opacity="0.7">
              <path d="M0 -12 L4 4 L0 0 L-4 4 Z" fill="#d6e6ee" />
              <text x="0" y="18" textAnchor="middle" fill="#9fc4d6" fontSize="8" fontFamily="ui-monospace">N</text>
            </g>
            {/* "Gulf of Alaska" toward the mouth */}
            <text x={W / 2} y={H - 12} textAnchor="middle" fill="#9fc4d6" fontSize="9" fontFamily="ui-monospace" opacity="0.55" letterSpacing="1">↓ GULF OF ALASKA</text>

            {/* VESSEL PIPS */}
            {vessels.map((v) => {
              const { x, y } = projectToXY(v.lat, v.lon, SEWARD_BBOX, W, H);
              const color = pipColor(v, sampleMode);
              const hdg = v.cog ?? v.heading ?? 0;
              const isMoving = (v.sog ?? 0) > 0.5;
              return (
                <g key={v.mmsi} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                  {/* wake for moving vessels */}
                  {isMoving && (
                    <line
                      x1={0}
                      y1={0}
                      x2={-8 * Math.sin((hdg * Math.PI) / 180)}
                      y2={8 * Math.cos((hdg * Math.PI) / 180)}
                      stroke={color}
                      strokeWidth="1"
                      opacity="0.4"
                    />
                  )}
                  {/* live ping */}
                  {isMoving && ais.source === "live" && (
                    <circle r="4" fill="none" stroke={color} strokeWidth="1.2" className="chf-ping" style={{ transformOrigin: "center" }} />
                  )}
                  {/* the boat pip: triangle pointing along heading */}
                  <g transform={`rotate(${hdg})`}>
                    <path d="M0 -5.5 L3.6 4.5 L0 2 L-3.6 4.5 Z" fill={color} stroke="#081a2b" strokeWidth="0.5" />
                  </g>
                  {/* sample-mode "your fleet" ring on charter boats */}
                  {sampleMode && v.type === "fishing" && (
                    <circle r="7" fill="none" stroke="#ff7a3c" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7" />
                  )}
                </g>
              );
            })}
          </svg>

          {/* on-map source note */}
          <div className="pointer-events-none absolute bottom-2 left-3 right-3 flex items-end justify-between gap-2">
            <span className="rounded bg-[#081a2b]/70 px-2 py-1 text-[9px] leading-tight text-[#d6e6ee]/70 backdrop-blur-sm">
              {ais.source === "live"
                ? "Live vessel traffic (public AIS) — your fleet would appear here in your colors"
                : "Sample fleet — illustrative, not live AIS"}
            </span>
            <UpdatedAgo at={ais.fetchedAt} live={ais.source === "live"} className="rounded bg-[#081a2b]/70 px-2 py-1 text-[9px] text-[#d6e6ee]/60 backdrop-blur-sm" />
          </div>
        </div>

        {/* ROSTER */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {roster.map((v) => (
            <div key={v.mmsi} className="chf-glass flex items-center gap-2 p-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: pipColor(v, sampleMode) }} />
              <div className="min-w-0">
                <div className="truncate text-[12px] font-semibold text-[#eef6fa]">{v.name ?? `MMSI ${v.mmsi}`}</div>
                <div className="truncate text-[10px] text-[#9fc4d6]">
                  {VESSEL_LABEL[v.type]} · {v.sog != null ? `${v.sog.toFixed(1)} kt` : "—"}
                  {v.status ? ` · ${v.status}` : ""}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COMPACT CONDITIONS STRIP */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Mini label="Tide" value={tv.stateText} sub={tv.rising ? (tv.nextHigh ? `H ${tv.nextHigh.time}` : "rising") : tv.nextLow ? `L ${tv.nextLow.time}` : "falling"} source={tide.source} liveLabel="NOAA" />
          <Mini label="Wind" value={wx.obs.windTextMph} sub="Seward (PAWD)" source={wx.source} liveLabel="NWS" />
          <Mini label="Water" value={waterText} sub="surface" source={water.source} liveLabel="NOAA" />
          <Mini label="Daylight" value={sun.daylight} sub={`↓ ${sun.sunset}`} source="computed" liveLabel="calc" />
        </div>

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#9fc4d6]/70">
          The map shows{" "}
          {ais.source === "live" ? (
            <>
              <span className="font-semibold text-[#eef6fa]/85">real live vessel traffic</span> in Resurrection
              Bay from public AIS (via aisstream.io)
            </>
          ) : (
            <>
              a clearly-labeled <span className="font-semibold text-[#eef6fa]/85">illustrative sample fleet</span>{" "}
              (the live AIS proxy isn&apos;t connected here)
            </>
          )}
          . Most small charter boats aren&apos;t AIS-equipped, so the live layer is larger vessels — the point
          is that once an operator&apos;s own boats carry a GPS/AIS unit, <span className="font-semibold text-[#eef6fa]/85">they</span>{" "}
          become the branded markers a family on shore can watch. Tide, water temp, and wind are live NOAA/NWS
          for Seward; daylight is computed. Real vessels are never relabeled as &quot;our fleet,&quot; and AIS is
          a public, crowd-sourced broadcast — a planning aid, not an authoritative or guaranteed feed.
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
    <div className="chf-glass flex flex-col p-2.5">
      <div className="mb-1 flex items-center justify-between gap-1">
        <span className="text-[9px] uppercase tracking-[0.12em] text-[#9fc4d6]/60">{label}</span>
        <SourceBadge source={source} labels={{ live: `Live · ${liveLabel}` }} classes={BADGE} />
      </div>
      <span className="chf-display text-[13px] font-semibold leading-tight text-[#eef6fa]">{value}</span>
      <span className="mt-0.5 text-[10px] text-[#9fc4d6]/70">{sub}</span>
    </div>
  );
}
