"use client";

// LIVE "PRINCE WILLIAM SOUND RIGHT NOW" CONDITIONS panel — the showpiece of
// the Lazy Otter Charters sample site.
//
// HONESTY CONTRACT (shared with every other live-weather demo in this
// portfolio via ../_wx — see _wx/nws.ts for the decode contract):
//   - A LIVE observation fetch, client-side, of Portage Glacier (ICAO PATO),
//     right at the entrance to Prince William Sound near Whittier. Keyless,
//     CORS-enabled. On success every field is badged "Live · NWS" and
//     stamped with the observation time.
//   - If the fetch errors, or the response has no usable data, the panel
//     falls back to a CLEARLY-LABELED "Sample" observation — NEVER presented
//     as live.
//   - Sunrise / sunset / daylight for Portage Glacier (60.78, -148.83) are
//     COMPUTED client-side (NOAA solar algorithm) — deterministic, no
//     network, badged "Computed".
//
// This panel is framed for a prospective Lazy Otter Charters customer sizing
// up a Prince William Sound glacier/wildlife tour before booking. It is
// explicitly NOT a substitute for the operator's own captains and crew, who
// make the real go/no-go call each day.
//
// All classes are Tailwind arbitrary values or the `.loc-*` scoped helpers
// from _shared.tsx. Nothing global is touched.

import { useState } from "react";
import { decodeNwsObservation, seaRead, solarTimes, visTextMi, type NwsObservation } from "../_wx";
import { SourceBadge, UpdatedAgo, useNwsObservation, type WxSource as Source } from "../_wx/live";

const PORTAGE_LAT = 60.78333;
const PORTAGE_LON = -148.83333;
const ICAO = "PATO"; // Portage Glacier — entrance to Prince William Sound, near Whittier
const TZ = "America/Anchorage";

const BADGE = {
  live: "border-[#7fe0c8]/50 bg-[#7fe0c8]/15 text-[#a9ecd8]",
  computed: "border-[#e8a23c]/45 bg-[#e8a23c]/12 text-[#f2c37f]",
  sample: "border-[#f2f8f7]/25 bg-[#f2f8f7]/8 text-[#f2f8f7]/70",
  loading: "border-[#f2f8f7]/20 text-[#f2f8f7]/45",
};

// Realistic mid-July afternoon at Portage Glacier: light southerly wind
// funneling up the sound, good visibility, scattered deck, cool PWS temps.
// NEVER shown as live.
const SAMPLE_WX: NwsObservation = decodeNwsObservation(
  { timestamp: null, rawMessage: "PATO 031953Z 19007KT 10SM SCT038 13/08 A2991 RMK AO2" },
  ICAO,
  TZ
);

export function SoundConditions() {
  const [sun] = useState(() => solarTimes(new Date(), PORTAGE_LAT, PORTAGE_LON, TZ));
  const wx = useNwsObservation(ICAO, { sample: SAMPLE_WX, tz: TZ });

  const d = wx.obs;
  const live = wx.source === "live";
  const onWater = d.ceilFt != null || d.visSM != null ? seaRead(d.ceilFt, d.visSM) : "—";
  const visText = visTextMi(d.visSM);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#f2f8f7]/12 bg-gradient-to-br from-[#0d2e36] via-[#134450] to-[#071c22] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* faint glacier-water current texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M-20 60 C 100 40, 180 80, 420 50" stroke="#bfe6e8" strokeWidth="1" fill="none" />
        <path d="M-20 120 C 100 100, 180 140, 420 110" stroke="#bfe6e8" strokeWidth="1" fill="none" />
        <path d="M-20 200 C 100 180, 180 220, 420 190" stroke="#bfe6e8" strokeWidth="1" fill="none" />
        <circle cx="330" cy="64" r="34" fill="none" stroke="#e8a23c" strokeWidth="0.8" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="loc-eyebrow !text-[#e8a23c]">Portage Glacier, right now</p>
            <h3 className="loc-display mt-1 text-xl font-semibold text-[#f2f8f7] sm:text-2xl">
              PATO conditions
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5fb8c4]/50 bg-[#071c22]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#bfe6e8]">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  live ? "animate-ping bg-[#7fe0c8]" : "bg-[#bfe6e8]"
                } opacity-75`}
              />
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  live ? "bg-[#7fe0c8]" : "bg-[#bfe6e8]"
                }`}
              />
            </span>
            {onWater !== "—" ? `${onWater} on the water` : "PATO"}
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
            sub="air temperature"
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
            label="On the water"
            value={onWater}
            sub="friendly read, not a go/no-go"
            source={wx.source}
            icon={
              <path
                d="M2 14c2-2 4-2 6 0s4 2 6 0 4-2 4-2M4 8l6-6 6 6"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
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
        <div className="mt-4 loc-glass p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#bfe6e8]">
              Raw observation
            </span>
            <SourceBadge source={wx.source} labels={{ live: "Live · NWS" }} classes={BADGE} />
          </div>
          <code className="block overflow-x-auto whitespace-nowrap font-mono text-[12px] leading-relaxed text-[#dcefee]">
            {d.raw}
          </code>
          {live && d.rawAssembled && d.raw !== "—" && (
            <p className="mt-1.5 text-[10px] italic text-[#dcefee]/45">
              assembled from the live NWS observation
            </p>
          )}
        </div>

        <UpdatedAgo at={wx.fetchedAt} live={live} className="mt-2 block text-right text-[10px] text-[#dcefee]/45" />

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#dcefee]/60">
          Pulls the live observation for{" "}
          <span className="font-semibold text-[#f2f8f7]/85">Portage Glacier (PATO)</span>{" "}
          from the National Weather Service API (no key, CORS-enabled) — right
          at the entrance to Prince William Sound near Whittier. Sunrise/
          sunset/daylight are computed for Portage Glacier (60.78°N,
          148.83°W). The &quot;on the water&quot; read is a friendly heuristic
          for trip planning — Lazy Otter Charters&apos; own captains and crew
          make the real daily call, on the dock and on the water. If the feed
          is unreachable, this panel shows a clearly-labeled{" "}
          <span className="font-semibold text-[#f2f8f7]/85">sample</span>{" "}
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
    <div className="loc-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[#bfe6e8]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            {icon}
          </svg>
        </span>
        <SourceBadge source={source} labels={{ live: "Live · NWS" }} classes={BADGE} />
      </div>
      <span className="loc-display text-[15px] font-semibold leading-tight text-[#f2f8f7] sm:text-base">
        {value}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#dcefee]/45">
        {label}
      </span>
      <span className="mt-0.5 text-[11px] text-[#dcefee]/60">{sub}</span>
    </div>
  );
}
