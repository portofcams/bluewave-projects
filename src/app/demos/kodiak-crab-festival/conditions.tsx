"use client";

// LIVE "KODIAK RIGHT NOW" CONDITIONS panel — the showpiece of the Kodiak
// Crab Festival sample site.
//
// HONESTY CONTRACT (shared with every other live-weather demo in this
// portfolio via ../_wx — see _wx/nws.ts for the decode contract):
//   - A LIVE observation fetch, client-side, of Kodiak Airport (ICAO PADQ).
//     Keyless, CORS-enabled. On success every field is badged "Live · NWS"
//     and stamped with the observation time.
//   - If the fetch errors, or the response has no usable data, the panel
//     falls back to a CLEARLY-LABELED "Sample" observation — NEVER presented
//     as live.
//   - Sunrise / sunset / daylight for Kodiak Airport (57.75, -152.5) are
//     COMPUTED client-side (NOAA solar algorithm) — deterministic, no
//     network, badged "Computed".
//
// This panel is framed as a friendly planning read for festival-goers
// deciding what to wear/bring each day of the 5-day run — explicitly a
// heuristic, NOT a go/no-go call for any festival activity. That's always
// the organizers' and Coast Guard's own call.
//
// All classes are Tailwind arbitrary values or the `.kcf-*` scoped helpers
// from _shared.tsx. Nothing global is touched.

import { useState } from "react";
import { cToF, decodeNwsObservation, solarTimes, visTextMi, type NwsObservation } from "../_wx";
import { SourceBadge, useNwsObservation, type WxSource as Source } from "../_wx/live";

const KODIAK_LAT = 57.75;
const KODIAK_LON = -152.5;
const ICAO = "PADQ"; // Kodiak Airport
const TZ = "America/Anchorage";

const BADGE = {
  live: "border-[#7fd0c0]/50 bg-[#7fd0c0]/15 text-[#a9e6d8]",
  computed: "border-[#f2a93c]/45 bg-[#f2a93c]/12 text-[#f7c979]",
  sample: "border-[#f4f8f7]/25 bg-[#f4f8f7]/8 text-[#f4f8f7]/70",
  loading: "border-[#f4f8f7]/20 text-[#f4f8f7]/45",
};

// Realistic late-May afternoon at Kodiak: brisk southwesterly wind, decent
// visibility, broken deck, cool Gulf-of-Alaska temps typical for Memorial Day
// weekend. NEVER shown as live.
const SAMPLE_WX: NwsObservation = decodeNwsObservation(
  { timestamp: null, rawMessage: "PADQ 231953Z 22012KT 10SM BKN032 09/06 A2979 RMK AO2" },
  ICAO,
  TZ
);

// Friendly "what to bring today" read from temp (°F) + sky/precip cues. This
// is a HEURISTIC read for festival-goers packing for the day, not a go/no-go
// for any event — the festival and Coast Guard make the real calls. Cloud
// COVER codes (SKC/BKN/OVC/...) never encode precipitation, so the wet check
// relies on NWS's free-text description, not the derived sky label.
function dayRead(tempF: number | null, wetText: string): "Great festival weather" | "Bring a jacket" | "Bring rain gear" {
  const wet = /rain|shower|drizzle|snow/i.test(wetText);
  if (wet) return "Bring rain gear";
  if (tempF != null && tempF < 50) return "Bring a jacket";
  return "Great festival weather";
}

export function FestConditions() {
  const [sun] = useState(() => solarTimes(new Date(), KODIAK_LAT, KODIAK_LON, TZ));
  const wx = useNwsObservation(ICAO, { sample: SAMPLE_WX, tz: TZ });

  const d = wx.obs;
  const live = wx.source === "live";
  const tempF = d.tempC != null ? cToF(d.tempC) : null;
  const wetText = d.textDescription ? `${d.skyText} ${d.textDescription}` : d.skyText;
  const dRead = tempF != null || d.skyText !== "—" ? dayRead(tempF, wetText) : "—";
  const visText = visTextMi(d.visSM);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#f4f8f7]/12 bg-gradient-to-br from-[#0b2d3d] via-[#0f4a58] to-[#061c26] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* faint harbor-swell texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M-20 60 C 100 40, 180 80, 420 50" stroke="#8fc4cf" strokeWidth="1" fill="none" />
        <path d="M-20 120 C 100 100, 180 140, 420 110" stroke="#8fc4cf" strokeWidth="1" fill="none" />
        <path d="M-20 200 C 100 180, 180 220, 420 190" stroke="#8fc4cf" strokeWidth="1" fill="none" />
        <circle cx="330" cy="64" r="34" fill="none" stroke="#f2a93c" strokeWidth="0.8" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="kcf-eyebrow !text-[#f2a93c]">Kodiak, right now</p>
            <h3 className="kcf-display mt-1 text-xl font-semibold text-[#f4f8f7] sm:text-2xl">
              PADQ conditions
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1c5266]/50 bg-[#061c26]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fc4cf]">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  live ? "animate-ping bg-[#7fd0c0]" : "bg-[#8fc4cf]"
                } opacity-75`}
              />
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  live ? "bg-[#7fd0c0]" : "bg-[#8fc4cf]"
                }`}
              />
            </span>
            {dRead !== "—" ? dRead : "PADQ"}
          </span>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric
            label="Wind"
            value={d.windTextMph}
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
            value={visText}
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
            label="Today's read"
            value={dRead}
            sub="friendly read, not a call for the festival"
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
            label="Daylight (AKDT)"
            value={sun.daylight}
            sub={`sunrise ${sun.sunrise} · sunset ${sun.sunset}`}
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

        {/* raw observation strip */}
        <div className="mt-4 kcf-glass p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fc4cf]">
              Raw observation
            </span>
            <SourceBadge source={wx.source} labels={{ live: "Live · NWS" }} classes={BADGE} />
          </div>
          <code className="block overflow-x-auto whitespace-nowrap font-mono text-[12px] leading-relaxed text-[#dcecea]">
            {d.raw}
          </code>
          {live && d.rawAssembled && d.raw !== "—" && (
            <p className="mt-1.5 text-[10px] italic text-[#dcecea]/45">
              assembled from the live NWS observation
            </p>
          )}
        </div>

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#dcecea]/60">
          Pulls the live observation for{" "}
          <span className="font-semibold text-[#f4f8f7]/85">Kodiak Airport (PADQ)</span>{" "}
          from the National Weather Service API (no key, CORS-enabled).
          Sunrise/sunset/daylight are computed for Kodiak (57.75°N, 152.50°W).
          The &quot;today&apos;s read&quot; is a friendly heuristic for
          packing your day bag — never a go/no-go call for any festival
          activity. Festival organizers and the Coast Guard make the real
          calls for events like the parade and the survival-suit race. If the
          feed is unreachable, this panel shows a clearly-labeled{" "}
          <span className="font-semibold text-[#f4f8f7]/85">sample</span>{" "}
          instead — never presented as live.
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
    <div className="kcf-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[#8fc4cf]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            {icon}
          </svg>
        </span>
        <SourceBadge source={source} labels={{ live: "Live · NWS" }} classes={BADGE} />
      </div>
      <span className="kcf-display text-[15px] font-semibold leading-tight text-[#f4f8f7] sm:text-base">
        {value}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#dcecea]/45">
        {label}
      </span>
      <span className="mt-0.5 text-[11px] text-[#dcecea]/60">{sub}</span>
    </div>
  );
}
