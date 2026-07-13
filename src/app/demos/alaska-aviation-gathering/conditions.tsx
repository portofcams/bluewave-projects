"use client";

// LIVE "FLYING IN?" CONDITIONS panel — the showpiece of the Great Alaska
// Aviation Gathering hub.
//
// HONESTY CONTRACT (shared with every other live-weather demo in this
// portfolio via ../_wx — see _wx/nws.ts for the decode contract):
//   - A LIVE observation fetch, client-side, of Palmer Municipal Airport
//     (ICAO PAAQ). Keyless, CORS-enabled. On success every field is badged
//     "Live · NWS" and stamped with the observation time.
//   - If the fetch errors, or the response has no usable data, the panel
//     falls back to a CLEARLY-LABELED "Sample" observation — NEVER presented
//     as live.
//   - Sunrise / sunset for Palmer are COMPUTED client-side (NOAA solar
//     algorithm) — deterministic, no network, badged "Computed".
//
// All classes are Tailwind arbitrary values or the `.gaag-*` scoped helpers
// from _shared.tsx. Nothing global is touched.

import { useState } from "react";
import { decodeNwsObservation, flightCategory, solarTimes, type NwsObservation } from "../_wx";
import { SourceBadge, UpdatedAgo, useNwsObservation, type WxSource as Source } from "../_wx/live";

const PALMER_LAT = 61.5951;
const PALMER_LON = -149.0917;
const ICAO = "PAAQ"; // Palmer Municipal Airport
const TZ = "America/Anchorage";

const BADGE = {
  live: "border-[#4fd08a]/50 bg-[#4fd08a]/15 text-[#8fe6b4]",
  computed: "border-[#f4b63e]/45 bg-[#f4b63e]/12 text-[#f6cd77]",
  sample: "border-[#dbe9f7]/25 bg-[#dbe9f7]/8 text-[#dbe9f7]/70",
  loading: "border-[#dbe9f7]/20 text-[#dbe9f7]/45",
};

// Realistic early-May morning at Palmer: light southerly wind, good
// visibility, broken deck, cool temps. NEVER shown as live.
const SAMPLE_WX: NwsObservation = decodeNwsObservation(
  { timestamp: null, rawMessage: "PAAQ 021553Z 22006KT 10SM BKN065 09/02 A2992 RMK AO2" },
  ICAO,
  TZ
);

export function GatheringConditions() {
  const [sun] = useState(() => solarTimes(new Date(), PALMER_LAT, PALMER_LON, TZ));
  const wx = useNwsObservation(ICAO, { sample: SAMPLE_WX, tz: TZ });

  const d = wx.obs;
  const live = wx.source === "live";
  const fltCat = flightCategory(d.ceilFt, d.visSM);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#dbe9f7]/12 bg-gradient-to-br from-[#0b2a4a] via-[#123a63] to-[#071d34] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* faint sectional-chart grid + runway texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="gaag-cond-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#dbe9f7" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#gaag-cond-grid)" />
        {/* compass rose hint */}
        <circle cx="330" cy="64" r="34" fill="none" stroke="#8fc0f0" strokeWidth="0.8" />
        <path d="M330 30 L334 64 L330 98 L326 64 Z" fill="#8fc0f0" opacity="0.7" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="gaag-eyebrow !text-[#f4b63e]">Flying in?</p>
            <h3 className="gaag-display mt-1 text-xl font-semibold text-[#eaf3fb] sm:text-2xl">
              Palmer Muni (PAAQ) wx
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4f9be0]/40 bg-[#071d34]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9ec8ef]">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  live ? "animate-ping bg-[#4fd08a]" : "bg-[#8fc0f0]"
                } opacity-75`}
              />
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  live ? "bg-[#4fd08a]" : "bg-[#8fc0f0]"
                }`}
              />
            </span>
            {fltCat}
          </span>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric
            label="Wind"
            value={d.windTextKt}
            sub={live ? `as of ${d.obsTimeText}` : "sample obs"}
            source={wx.source}
            icon={
              <path
                d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5M3 12h13a2.5 2.5 0 1 1-2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
              />
            }
          />
          <Metric
            label="Visibility"
            value={d.visText}
            sub="ground / statute miles"
            source={wx.source}
            icon={
              <>
                <path
                  d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                />
                <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.3" fill="none" />
              </>
            }
          />
          <Metric
            label="Sky / ceiling"
            value={d.skyText}
            sub="cloud layers"
            source={wx.source}
            icon={
              <path
                d="M6 13h9a3 3 0 0 0 .3-6A4 4 0 0 0 7.5 6 3.2 3.2 0 0 0 6 13Z"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinejoin="round"
              />
            }
          />
          <Metric
            label="Altimeter"
            value={d.altimText}
            sub="station setting"
            source={wx.source}
            icon={
              <>
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.3" fill="none" />
                <path d="M10 10L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="10" cy="10" r="1" fill="currentColor" />
              </>
            }
          />
          <Metric
            label="Temp"
            value={d.tempText}
            sub="dry bulb"
            source={wx.source}
            icon={
              <path
                d="M8 3v9.5a3.5 3.5 0 1 0 4 0V3a2 2 0 0 0-4 0Z"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            }
          />
          <Metric
            label="Dewpoint"
            value={d.dewText}
            sub="moisture"
            source={wx.source}
            icon={
              <path
                d="M10 3s5 6 5 9.5A5 5 0 0 1 5 12.5C5 9 10 3 10 3Z"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinejoin="round"
              />
            }
          />
          <Metric
            label="Category"
            value={fltCat}
            sub="flight rules"
            source={wx.source}
            icon={
              <path
                d="M2 11l16-6-6 16-2.5-6.5L2 11Z"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinejoin="round"
              />
            }
          />
          <Metric
            label="Sun (AKDT)"
            value={sun.sunset}
            sub={`sunrise ${sun.sunrise}`}
            source="computed"
            icon={
              <>
                <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
                <path
                  d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M15.5 4.5l-1.4 1.4M5.9 14.1l-1.4 1.4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </>
            }
          />
        </div>

        {/* raw METAR strip */}
        <div className="mt-4 gaag-glass p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9ec8ef]">
              Raw METAR
            </span>
            <SourceBadge source={wx.source} labels={{ live: "Live · NWS" }} classes={BADGE} />
          </div>
          <code className="block overflow-x-auto whitespace-nowrap font-mono text-[12px] leading-relaxed text-[#cfe4fa]">
            {d.raw}
          </code>
          {live && d.rawAssembled && d.raw !== "—" && (
            <p className="mt-1.5 text-[10px] italic text-[#cfe4fa]/45">
              assembled from the live NWS observation
            </p>
          )}
        </div>

        <UpdatedAgo at={wx.fetchedAt} live={live} className="mt-2 block text-right text-[10px] text-[#cfe4fa]/45" />

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#cfe4fa]/60">
          Pulls the live observation for{" "}
          <span className="font-semibold text-[#eaf3fb]/85">Palmer Municipal (PAAQ)</span>{" "}
          from the National Weather Service API (no key, CORS-enabled).
          Sunrise/sunset are computed for Palmer. If the feed is unreachable,
          this panel shows a clearly-labeled{" "}
          <span className="font-semibold text-[#eaf3fb]/85">sample</span> instead
          — never presented as live. Never use any weather page as your sole
          preflight brief — check official sources (1800wxbrief / ForeFlight)
          before you fly.
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
    <div className="gaag-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[#9ec8ef]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            {icon}
          </svg>
        </span>
        <SourceBadge source={source} labels={{ live: "Live · NWS" }} classes={BADGE} />
      </div>
      <span className="gaag-display text-[15px] font-semibold leading-tight text-[#eaf3fb] sm:text-base">
        {value}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#cfe4fa]/45">
        {label}
      </span>
      <span className="mt-0.5 text-[11px] text-[#cfe4fa]/60">{sub}</span>
    </div>
  );
}
