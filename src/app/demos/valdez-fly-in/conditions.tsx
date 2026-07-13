"use client";

// LIVE "FLYING IN?" CONDITIONS panel — the showpiece of the Valdez Fly-In &
// Air Show hub.
//
// WHY THIS PANEL: Valdez Pioneer Field (PAVD) sits at the head of a deep fjord,
// boxed in by the Chugach. Ceiling, visibility, and — for a STOL (short
// takeoff & landing) competition — DENSITY ALTITUDE are exactly the numbers a
// pilot flying in cares about. So the panel is a live aviation-weather read
// with a STOL-flavored density-altitude tile, not just generic weather.
//
// HONESTY CONTRACT (shared with every other live-weather demo in this
// portfolio via ../_wx — see _wx/nws.ts for the decode contract):
//   - A LIVE observation fetch, client-side, of Valdez Pioneer Field (ICAO
//     PAVD). Keyless, CORS-enabled. On success every field is badged
//     "Live · NWS" and stamped with the observation time.
//   - If the fetch errors or returns nothing usable, the panel falls back to
//     a CLEARLY-LABELED "Sample" — NEVER presented as live.
//   - Sunrise / sunset for Valdez are COMPUTED client-side (NOAA solar
//     algorithm) — deterministic, no network, badged "Computed."
//   - Density altitude is derived from the LIVE temperature + altimeter and
//     the published PAVD field elevation (121 ft) — it inherits the live
//     badge.
//
// Never a substitute for an official preflight brief.
//
// All classes are Tailwind arbitrary values or the `.vfi-*` scoped helpers from
// _shared.tsx. Nothing global is touched.

import { useState } from "react";
import { decodeNwsObservation, densityAltitude, flightCategory, solarTimes, type NwsObservation } from "../_wx";
import { SourceBadge, UpdatedAgo, useNwsObservation, type WxSource as Source } from "../_wx/live";

const VALDEZ_LAT = 61.13333;
const VALDEZ_LON = -146.26667;
const FIELD_ELEV_FT = 121; // Valdez Pioneer Field elevation (NWS station "Valdez 2")
const ICAO = "PAVD";
const TZ = "America/Anchorage";

const BADGE = {
  live: "border-[#4fd08a]/50 bg-[#4fd08a]/15 text-[#8fe6b4]",
  computed: "border-[#e0532f]/45 bg-[#e0532f]/12 text-[#f0a184]",
  sample: "border-[#e7f1f2]/25 bg-[#e7f1f2]/8 text-[#e7f1f2]/70",
  loading: "border-[#e7f1f2]/20 text-[#e7f1f2]/45",
};

// STOL-flavored read: dense (cool/low) air = short ground roll.
function stolRead(daFt: number): string {
  if (daFt < 1000) return "Prime";
  if (daFt < 3000) return "Good";
  return "Thin air";
}
const fmtDA = (ft: number) => `${ft < 0 ? "−" : ""}${Math.abs(ft).toLocaleString()} ft`;

// Realistic early-May Valdez morning: light wind, high overcast, cool temps,
// dense air (great STOL). NEVER shown as live.
const SAMPLE_WX: NwsObservation = decodeNwsObservation(
  { timestamp: null, rawMessage: "PAVD 021553Z 14005KT 10SM BKN045 06/01 A2994 RMK AO2" },
  ICAO,
  TZ
);

export function ValdezConditions() {
  const [sun] = useState(() => solarTimes(new Date(), VALDEZ_LAT, VALDEZ_LON, TZ));
  const wx = useNwsObservation(ICAO, { sample: SAMPLE_WX, tz: TZ });

  const d = wx.obs;
  const live = wx.source === "live";
  const fltCat = flightCategory(d.ceilFt, d.visSM);

  let densAltText = "—";
  let stol = "—";
  if (d.tempC != null && d.altimInHg != null) {
    const da = densityAltitude(d.tempC, d.altimInHg, FIELD_ELEV_FT);
    densAltText = fmtDA(da);
    stol = stolRead(da);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e7f1f2]/12 bg-gradient-to-br from-[#0f2f3d] via-[#1a4a52] to-[#08202b] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* faint sectional grid + peak silhouette */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="vfi-cond-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#e7f1f2" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#vfi-cond-grid)" />
        <path d="M-20 250 L70 150 L120 200 L190 120 L260 200 L330 140 L420 210 L420 300 L-20 300 Z" fill="#7ec8d6" opacity="0.25" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="vfi-eyebrow !text-[#e0532f]">Flying in?</p>
            <h3 className="vfi-display mt-1 text-xl font-semibold text-[#eef7f7] sm:text-2xl">
              Valdez Pioneer (PAVD) wx
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5aa7b5]/40 bg-[#08202b]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a8dbe4]">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  live ? "animate-ping bg-[#4fd08a]" : "bg-[#a8dbe4]"
                } opacity-75`}
              />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${live ? "bg-[#4fd08a]" : "bg-[#a8dbe4]"}`} />
            </span>
            {fltCat}
          </span>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric label="Wind" value={d.windTextKt} sub={live ? `as of ${d.obsTimeText}` : "sample obs"} source={wx.source}
            icon={<path d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5M3 12h13a2.5 2.5 0 1 1-2.5 2.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />} />
          <Metric label="Visibility" value={d.visText} sub="statute miles" source={wx.source}
            icon={<><path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5Z" stroke="currentColor" strokeWidth="1.3" fill="none" /><circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.3" fill="none" /></>} />
          <Metric label="Sky / ceiling" value={d.skyText} sub="cloud layers" source={wx.source}
            icon={<path d="M6 13h9a3 3 0 0 0 .3-6A4 4 0 0 0 7.5 6 3.2 3.2 0 0 0 6 13Z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />} />
          <Metric label="Altimeter" value={d.altimText} sub="station setting" source={wx.source}
            icon={<><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.3" fill="none" /><path d="M10 10L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="10" cy="10" r="1" fill="currentColor" /></>} />
          <Metric label="Temp" value={d.tempText} sub="dry bulb" source={wx.source}
            icon={<path d="M8 3v9.5a3.5 3.5 0 1 0 4 0V3a2 2 0 0 0-4 0Z" stroke="currentColor" strokeWidth="1.4" fill="none" />} />
          <Metric label="Density alt" value={densAltText} sub={stol !== "—" ? `STOL: ${stol}` : "vs. field elev 121 ft"} source={wx.source}
            icon={<path d="M2 15l8-11 8 11M6 13h8" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" strokeLinecap="round" />} />
          <Metric label="Category" value={fltCat} sub="flight rules" source={wx.source}
            icon={<path d="M2 11l16-6-6 16-2.5-6.5L2 11Z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />} />
          <Metric label="Daylight (AKDT)" value={sun.daylight} sub={`↑ ${sun.sunrise} · ↓ ${sun.sunset}`} source="computed"
            icon={<><circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.4" fill="none" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M15.5 4.5l-1.4 1.4M5.9 14.1l-1.4 1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>} />
        </div>

        {/* raw METAR strip */}
        <div className="mt-4 vfi-glass p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8dbe4]">Raw METAR</span>
            <SourceBadge source={wx.source} labels={{ live: "Live · NWS" }} classes={BADGE} />
          </div>
          <code className="block overflow-x-auto whitespace-nowrap font-mono text-[12px] leading-relaxed text-[#cfe9ee]">
            {d.raw}
          </code>
          {live && d.rawAssembled && d.raw !== "—" && (
            <p className="mt-1.5 text-[10px] italic text-[#cfe9ee]/45">assembled from the live NWS observation</p>
          )}
        </div>

        <UpdatedAgo at={wx.fetchedAt} live={live} className="mt-2 block text-right text-[10px] text-[#cfe9ee]/45" />

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#cfe9ee]/60">
          Pulls the live observation for{" "}
          <span className="font-semibold text-[#eef7f7]/85">Valdez Pioneer Field (PAVD)</span>{" "}
          from the National Weather Service API (no key, CORS-enabled). Density altitude is
          computed from the live temperature and altimeter against the field&apos;s 121 ft
          elevation — the number that governs a STOL takeoff roll. Sunrise, sunset, and daylight
          are computed for Valdez. If the feed is unreachable, this panel shows a clearly-labeled{" "}
          <span className="font-semibold text-[#eef7f7]/85">sample</span> instead — never presented
          as live. Never use any weather page as your sole preflight brief — get a full official
          briefing (1800wxbrief / ForeFlight) before you fly.
        </p>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  source,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  source: Source;
  icon: React.ReactNode;
}) {
  return (
    <div className="vfi-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[#a8dbe4]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            {icon}
          </svg>
        </span>
        <SourceBadge source={source} labels={{ live: "Live · NWS" }} classes={BADGE} />
      </div>
      <span className="vfi-display text-[15px] font-semibold leading-tight text-[#eef7f7] sm:text-base">{value}</span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#cfe9ee]/45">{label}</span>
      <span className="mt-0.5 text-[11px] text-[#cfe9ee]/60">{sub}</span>
    </div>
  );
}
