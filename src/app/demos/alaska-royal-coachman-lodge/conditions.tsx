"use client";

// LIVE "DILLINGHAM RIGHT NOW" CONDITIONS panel — the showpiece of the Royal
// Coachman Lodge sample site.
//
// HONESTY CONTRACT (shared with every other live-weather demo in this
// portfolio via ../_wx — see _wx/nws.ts for the decode contract):
//   - A LIVE observation fetch, client-side, of Dillingham Airport (ICAO
//     PADL) — the real regional hub airport nearest the lodge's floatplane
//     departure point. Keyless, CORS-enabled. On success every field is
//     badged "Live · NWS" and stamped with the observation time.
//   - If the fetch errors, or the response has no usable data, the panel
//     falls back to a CLEARLY-LABELED "Sample" observation — NEVER presented
//     as live.
//   - Sunrise / sunset / daylight for Dillingham (59.05, -158.52) are
//     COMPUTED client-side (NOAA solar algorithm) — deterministic, no
//     network, badged "Computed".
//
// This panel is framed for BOTH audiences: a prospective guest sizing up a
// fly-in-only lodge before booking, and a guest already there checking
// today's fly-out weather. It is explicitly NOT a substitute for the lodge's
// own pilots and guides, who make the real go/no-go call each morning.
//
// All classes are Tailwind arbitrary values or the `.rcl-*` scoped helpers
// from _shared.tsx. Nothing global is touched.

import { useState } from "react";
import { decodeNwsObservation, seaRead, solarTimes, visTextMi, type NwsObservation } from "../_wx";
import { SourceBadge, useNwsObservation, type WxSource as Source } from "../_wx/live";

const DILLINGHAM_LAT = 59.05;
const DILLINGHAM_LON = -158.52;
const ICAO = "PADL"; // Dillingham Airport
const TZ = "America/Anchorage";

const BADGE = {
  live: "border-[#7fd0c8]/50 bg-[#7fd0c8]/15 text-[#a9e6de]",
  computed: "border-[#c9793f]/45 bg-[#c9793f]/12 text-[#e8b077]",
  sample: "border-[#f2ede2]/25 bg-[#f2ede2]/8 text-[#f2ede2]/70",
  loading: "border-[#f2ede2]/20 text-[#f2ede2]/45",
};

// Realistic mid-July afternoon at Dillingham: light southwesterly wind, good
// visibility, scattered deck, comfortable temps for Bristol Bay. NEVER shown
// as live.
const SAMPLE_WX: NwsObservation = decodeNwsObservation(
  { timestamp: null, rawMessage: "PADL 031953Z 21009KT 10SM SCT040 15/09 A2990 RMK AO2" },
  ICAO,
  TZ
);

export function LodgeConditions() {
  const [sun] = useState(() => solarTimes(new Date(), DILLINGHAM_LAT, DILLINGHAM_LON, TZ));
  const wx = useNwsObservation(ICAO, { sample: SAMPLE_WX, tz: TZ });

  const d = wx.obs;
  const live = wx.source === "live";
  // Same "Good/Fair/Marginal" ceiling+visibility thresholds as the marine
  // demos' "on the water" read — this lodge just calls it "flying."
  const flyRead = d.ceilFt != null || d.visSM != null ? seaRead(d.ceilFt, d.visSM) : "—";
  const visText = visTextMi(d.visSM);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#f2ede2]/12 bg-gradient-to-br from-[#0f2033] via-[#16334a] to-[#0a1420] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* faint river-current texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M-20 60 C 100 40, 180 80, 420 50" stroke="#7fa3bd" strokeWidth="1" fill="none" />
        <path d="M-20 120 C 100 100, 180 140, 420 110" stroke="#7fa3bd" strokeWidth="1" fill="none" />
        <path d="M-20 200 C 100 180, 180 220, 420 190" stroke="#7fa3bd" strokeWidth="1" fill="none" />
        <circle cx="330" cy="64" r="34" fill="none" stroke="#c9793f" strokeWidth="0.8" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="rcl-eyebrow !text-[#c9793f]">Dillingham, right now</p>
            <h3 className="rcl-display mt-1 text-xl font-semibold text-[#f2ede2] sm:text-2xl">
              PADL conditions
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#233f56]/60 bg-[#0a1420]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7fa3bd]">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  live ? "animate-ping bg-[#7fd0c8]" : "bg-[#7fa3bd]"
                } opacity-75`}
              />
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  live ? "bg-[#7fd0c8]" : "bg-[#7fa3bd]"
                }`}
              />
            </span>
            {flyRead !== "—" ? `${flyRead} flying` : "PADL"}
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
            label="Flying today"
            value={flyRead}
            sub="friendly read, not a go/no-go"
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
        <div className="mt-4 rcl-glass p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7fa3bd]">
              Raw observation
            </span>
            <SourceBadge source={wx.source} labels={{ live: "Live · NWS" }} classes={BADGE} />
          </div>
          <code className="block overflow-x-auto whitespace-nowrap font-mono text-[12px] leading-relaxed text-[#dbe6ec]">
            {d.raw}
          </code>
          {live && d.rawAssembled && d.raw !== "—" && (
            <p className="mt-1.5 text-[10px] italic text-[#dbe6ec]/45">
              assembled from the live NWS observation
            </p>
          )}
        </div>

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#dbe6ec]/60">
          Pulls the live observation for{" "}
          <span className="font-semibold text-[#f2ede2]/85">Dillingham Airport (PADL)</span>{" "}
          from the National Weather Service API (no key, CORS-enabled) — the
          real regional hub airport nearest the lodge&apos;s floatplane
          departure point. Sunrise/sunset/daylight are computed for
          Dillingham (59.05°N, 158.52°W). The &quot;flying today&quot; read
          is a friendly heuristic for trip planning — the lodge&apos;s own
          pilots and guides make the real daily fly-out call, in the air and
          on the water. If the feed is unreachable, this panel shows a
          clearly-labeled <span className="font-semibold text-[#f2ede2]/85">sample</span>{" "}
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
    <div className="rcl-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[#7fa3bd]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            {icon}
          </svg>
        </span>
        <SourceBadge source={source} labels={{ live: "Live · NWS" }} classes={BADGE} />
      </div>
      <span className="rcl-display text-[15px] font-semibold leading-tight text-[#f2ede2] sm:text-base">
        {value}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#dbe6ec]/45">
        {label}
      </span>
      <span className="mt-0.5 text-[11px] text-[#dbe6ec]/60">{sub}</span>
    </div>
  );
}
