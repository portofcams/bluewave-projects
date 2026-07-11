"use client";

// LIVE "TONIGHT'S AURORA CHANCE" panel — the showpiece of the Fairbanks
// aurora-viewing sample site.
//
// WHY THIS PANEL, AND WHY IT'S DIFFERENT: every other conditions panel in this
// portfolio answers "what are the numbers right now." This one exists to
// answer an honest question tourist aurora sites usually dodge: a geomagnetic
// storm being IN PROGRESS is necessary but NOT sufficient to actually SEE the
// aurora — Fairbanks also needs real darkness and clear sky. In July, this
// panel will often (correctly) say "too bright to see it," even on a night
// with real geomagnetic activity, because Fairbanks doesn't reach nautical
// twilight again until roughly mid-August. That gap is the point, not a bug.
//
// HONESTY CONTRACT (mirrors kachemak-bay-water-taxi/conditions.tsx):
//   - GEOMAGNETIC ACTIVITY: a LIVE fetch of NOAA SWPC's planetary Kp index
//     (observed + estimated + predicted in one series) and the OVATION Prime
//     aurora-probability grid, nearest point to Fairbanks. Both keyless and
//     CORS-enabled (verified: Access-Control-Allow-Origin: *). Badged
//     "Live · NOAA SWPC" on success.
//   - SKY: a LIVE fetch of the latest Fairbanks Airport (PAFA) observation
//     from the National Weather Service (keyless, CORS-ok) for cloud cover —
//     clouds block the view regardless of how active the aurora is. Badged
//     "Live · NWS" on success.
//   - DARKNESS: COMPUTED client-side (no network) from real solar geometry —
//     NAUTICAL twilight (sun 12° below horizon), not plain sunset, because
//     that's the threshold a bright aurora actually needs. Badged "Computed."
//   - If a live feed errors or returns nothing usable, THAT block falls back
//     to a CLEARLY-LABELED "Sample" — never presented as live.
//
// This panel is a trip-planning aid, not a guarantee — the aurora is a
// natural phenomenon and no operator can promise a sighting.
//
// All classes are Tailwind arbitrary values or the `.aur-*` scoped helpers
// from _shared.tsx. Nothing global is touched.

import { useEffect, useState } from "react";
import { UpdatedAgo } from "../_wx/live";
import { decodeNwsObservation, fetchNwsLatest, type NwsObservation } from "../_wx/nws";
import { darkAt, nextDarkCapableDate, nextSunEvent, reachesZenith, solarTimes } from "../_wx/solar";
import { auroraVerdict, fetchAuroraProbability, fetchKpSummary, type AuroraVerdict, type KpPoint } from "../_wx/aurora";

const FAIRBANKS_LAT = 64.8378;
const FAIRBANKS_LON = -147.7164; // degrees, west negative
const FAIRBANKS_LON360 = 360 - 147.7164; // OVATION grid uses 0-360°E
const FAIRBANKS_TZ = "America/Anchorage";
const PAFA = "PAFA"; // Fairbanks International Airport
// Nautical twilight (sun 12° below horizon) — verified (2026-07-10) against
// real solar geometry to first return ~Aug 18 and last hold ~Apr 25, which
// lines up with the commonly-cited "aurora season" window. Plain civil
// sunset would overclaim viewability during Fairbanks' bright summer
// twilight, and full astronomical twilight (18°) doesn't return until early
// September — nautical is the honest middle ground for "a bright aurora
// could actually be seen."
const NAUTICAL_ZENITH = 102;

type Src = "live" | "computed" | "sample" | "loading";

// ---- honest SAMPLE data (clearly labeled, never shown as live) -----------
const SAMPLE_KP_NOW = 2.7;
const SAMPLE_KP_PEAK: number | null = 4.0;
const SAMPLE_PROBABILITY = 14;
const SAMPLE_NWS: NwsObservation = {
  windDeg: 320,
  windKt: 4,
  windMph: 5,
  gustKt: null,
  gustMph: null,
  visSM: 10,
  ceilFt: null,
  tempC: -8,
  dewC: -12,
  altimInHg: 29.98,
  windTextKt: "320° at 4 kt",
  windTextMph: "NW 5 mph",
  visText: "10 SM",
  skyText: "Clear",
  tempText: "-8°C / 18°F",
  dewText: "-12°C / 10°F",
  altimText: "29.98 inHg",
  raw: "PAFA 102253Z 32004KT 10SM SKC M08/M12 A2998 RMK AO2",
  rawAssembled: false,
  obsAt: null,
  obsTimeText: "sample observation",
};

type State = {
  kpSource: Src;
  kpNow: number | null;
  kpNoaaScale: string | null;
  kpPeak3Day: number | null;
  kpPoints: KpPoint[];
  probSource: Src;
  probability: number | null;
  probObservedAt: Date | null;
  wxSource: Src;
  wx: NwsObservation;
};

export function AuroraConditions() {
  const [s, setS] = useState<State>({
    kpSource: "loading",
    kpNow: null,
    kpNoaaScale: null,
    kpPeak3Day: null,
    kpPoints: [],
    probSource: "loading",
    probability: null,
    probObservedAt: null,
    wxSource: "loading",
    wx: SAMPLE_NWS,
  });
  const [kpFetchedAt, setKpFetchedAt] = useState<number | null>(null);
  const [probFetchedAt, setProbFetchedAt] = useState<number | null>(null);
  const [wxFetchedAt, setWxFetchedAt] = useState<number | null>(null);
  const [nowTick, setNowTick] = useState(0);

  // --- Kp (small payload — refresh every 5 min) ---
  useEffect(() => {
    let alive = true;
    async function load() {
      const summary = await fetchKpSummary();
      if (!alive) return;
      if (summary) {
        setS((prev) => ({
          ...prev,
          kpSource: "live",
          kpNow: summary.now?.kp ?? null,
          kpNoaaScale: summary.now?.noaaScale ?? null,
          kpPeak3Day: summary.peak3Day?.kp ?? null,
          kpPoints: summary.points,
        }));
        setKpFetchedAt(Date.now());
      } else {
        setS((prev) =>
          prev.kpSource === "live"
            ? prev
            : { ...prev, kpSource: "sample", kpNow: SAMPLE_KP_NOW, kpNoaaScale: null, kpPeak3Day: SAMPLE_KP_PEAK, kpPoints: [] }
        );
      }
    }
    load();
    const id = setInterval(load, 5 * 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // --- OVATION aurora probability (~900KB payload — refresh every 12 min) ---
  useEffect(() => {
    let alive = true;
    async function load() {
      const pt = await fetchAuroraProbability(FAIRBANKS_LAT, FAIRBANKS_LON360);
      if (!alive) return;
      if (pt) {
        setS((prev) => ({ ...prev, probSource: "live", probability: pt.probability, probObservedAt: pt.observedAt }));
        setProbFetchedAt(Date.now());
      } else {
        setS((prev) =>
          prev.probSource === "live" ? prev : { ...prev, probSource: "sample", probability: SAMPLE_PROBABILITY, probObservedAt: null }
        );
      }
    }
    load();
    const id = setInterval(load, 12 * 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // --- Sky (NWS PAFA) ---
  useEffect(() => {
    let alive = true;
    async function load() {
      const props = await fetchNwsLatest(PAFA);
      if (!alive) return;
      if (props) {
        setS((prev) => ({ ...prev, wxSource: "live", wx: decodeNwsObservation(props, PAFA, FAIRBANKS_TZ) }));
        setWxFetchedAt(Date.now());
      } else {
        setS((prev) => (prev.wxSource === "live" ? prev : { ...prev, wxSource: "sample", wx: SAMPLE_NWS }));
      }
    }
    load();
    const id = setInterval(load, 5 * 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // --- darkness re-tick (pure solar math, no network) ---
  useEffect(() => {
    const id = setInterval(() => setNowTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();
  void nowTick; // referenced only to force this recompute on the interval tick
  const isDark = darkAt(now, FAIRBANKS_LAT, FAIRBANKS_LON, NAUTICAL_ZENITH);
  const inGap = !reachesZenith(now, FAIRBANKS_LAT, FAIRBANKS_LON, NAUTICAL_ZENITH);
  const nextEvent = nextSunEvent(now, FAIRBANKS_LAT, FAIRBANKS_LON, NAUTICAL_ZENITH);
  const nextGapEnd = inGap ? nextDarkCapableDate(now, FAIRBANKS_LAT, FAIRBANKS_LON, NAUTICAL_ZENITH) : null;
  const { sunrise, sunset, daylight } = solarTimes(now, FAIRBANKS_LAT, FAIRBANKS_LON, FAIRBANKS_TZ);

  const skyClear = s.wxSource === "loading" ? null : s.wx.ceilFt == null;

  const verdict: AuroraVerdict = auroraVerdict({
    isDark,
    inNoDarknessGap: inGap,
    nextDarkCapableDate: nextGapEnd,
    nextDarkEvent: nextEvent,
    probability: s.probability,
    kpNow: s.kpNow,
    skyClear,
    tz: FAIRBANKS_TZ,
  });

  const anyLive = s.kpSource === "live" || s.probSource === "live" || s.wxSource === "live";
  const dotColor: Record<AuroraVerdict["level"], string> = {
    gap: "bg-[#9fb0d9]",
    daylight: "bg-[#9fb0d9]",
    low: "bg-[#9fb0d9]",
    moderate: "bg-[#3fe6a4]",
    good: "bg-[#3fe6a4]",
    high: "bg-[#a06bff]",
  };

  // darkness metric tile content
  let darkValue: string;
  let darkSub: string;
  if (inGap) {
    darkValue = "No true darkness";
    darkSub = nextGapEnd
      ? `sky won't be dark enough until ~${nextGapEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: FAIRBANKS_TZ })}`
      : "not this time of year";
  } else if (isDark) {
    darkValue = "Dark now";
    darkSub = nextEvent ? `until ${nextEvent.at.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: FAIRBANKS_TZ })}` : "—";
  } else {
    darkValue = "Daylight";
    darkSub = nextEvent ? `dark at ${nextEvent.at.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: FAIRBANKS_TZ })}` : "—";
  }

  // Kp sparkline: a window around "now" (last non-predicted point)
  const nowIdx = (() => {
    for (let i = s.kpPoints.length - 1; i >= 0; i--) if (s.kpPoints[i].phase !== "predicted") return i;
    return -1;
  })();
  const winStart = nowIdx >= 0 ? Math.max(0, nowIdx - 8) : 0;
  const winEnd = nowIdx >= 0 ? Math.min(s.kpPoints.length, nowIdx + 13) : 0;
  const kpWindow = s.kpPoints.slice(winStart, winEnd);

  const CW = 300;
  const CH = 64;
  const barW = kpWindow.length ? CW / kpWindow.length : 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#eaf0ff]/12 bg-gradient-to-br from-[#0b1330] via-[#15224a] to-[#05070f] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)] sm:p-6">
      {/* faint star field */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[[20,20],[60,50],[110,16],[160,40],[210,14],[250,46],[300,20],[340,50],[380,16],[30,80],[150,70],[280,86],[370,74]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.3 : 0.8} fill="#eaf0ff" opacity={0.4 + (i % 4) * 0.1} />
        ))}
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="aur-eyebrow !text-[#a06bff]">Fairbanks, right now</p>
            <h3 className="aur-display mt-1 text-xl font-semibold text-[#eaf0ff] sm:text-2xl">Tonight&apos;s aurora chance</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3fe6a4]/40 bg-[#05070f]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9fb0d9]">
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute inline-flex h-full w-full rounded-full ${anyLive ? "animate-ping" : ""} ${dotColor[verdict.level]} opacity-75`} />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotColor[verdict.level]}`} />
            </span>
            {verdict.headline}
          </span>
        </div>

        {/* verdict detail band */}
        <div className="aur-glass p-3.5">
          <p className="text-[13px] leading-relaxed text-[#eaf0ff]/90">{verdict.detail}</p>
        </div>

        {/* metric grid */}
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric
            label="Kp index"
            value={s.kpNow != null ? s.kpNow.toFixed(1) : "—"}
            sub={s.kpPeak3Day != null ? `peaking ~${s.kpPeak3Day.toFixed(1)} in 3 days` : "geomagnetic activity"}
            src={s.kpSource}
            liveLabel="Live · NOAA SWPC"
          />
          <Metric
            label="Aurora probability"
            value={s.probability != null ? `${s.probability}%` : "—"}
            sub="modeled, this location"
            src={s.probSource}
            liveLabel="Live · NOAA SWPC"
          />
          <Metric
            label="Sky"
            value={s.wx.skyText}
            sub="Fairbanks Airport (PAFA)"
            src={s.wxSource}
            liveLabel="Live · NWS"
          />
          <Metric
            label="Darkness"
            value={darkValue}
            sub={darkSub}
            src="computed"
            liveLabel="Live"
          />
        </div>

        {/* Kp sparkline strip */}
        {kpWindow.length > 1 && (
          <div className="mt-3 aur-glass p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9fb0d9]">
                Kp index · observed → forecast
              </span>
              <SourceBadge src={s.kpSource} liveLabel="Live · NOAA SWPC" />
            </div>
            <svg viewBox={`0 0 ${CW} ${CH}`} className="h-16 w-full" preserveAspectRatio="none" aria-label="Kp index, recent and forecast">
              {/* G1 storm threshold */}
              <line x1={0} y1={CH - (5 / 9) * CH} x2={CW} y2={CH - (5 / 9) * CH} stroke="#eaf0ff" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.35" />
              {kpWindow.map((p, i) => {
                const h = Math.max(2, (p.kp / 9) * CH);
                const x = i * barW;
                const color = p.phase === "predicted" ? "#a06bff" : "#3fe6a4";
                return (
                  <rect
                    key={i}
                    x={x + barW * 0.15}
                    y={CH - h}
                    width={barW * 0.7}
                    height={h}
                    fill={color}
                    opacity={p.phase === "predicted" ? 0.55 : 0.9}
                  />
                );
              })}
              {nowIdx >= 0 && nowIdx >= winStart && nowIdx < winEnd && (
                <line
                  x1={(nowIdx - winStart + 0.5) * barW}
                  y1={0}
                  x2={(nowIdx - winStart + 0.5) * barW}
                  y2={CH}
                  stroke="#eaf0ff"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  opacity="0.6"
                />
              )}
            </svg>
            <div className="mt-1 flex items-center justify-between text-[10px] text-[#9fb0d9]/70">
              <span>~36 hr ago</span>
              <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#3fe6a4]" />observed/estimated</span>
              <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#a06bff]" />forecast</span>
              <span>~2 days ahead</span>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#eaf0ff]/45">
          <span>↑ {sunrise} · ↓ {sunset} · {daylight} of daylight</span>
          <UpdatedAgo at={kpFetchedAt ?? probFetchedAt ?? wxFetchedAt} live={anyLive} className="" />
        </div>

        {/* honest footnote */}
        <p className="mt-4 text-[11px] leading-relaxed text-[#eaf0ff]/60">
          Geomagnetic activity is the live{" "}
          <span className="font-semibold text-[#eaf0ff]/85">NOAA Space Weather Prediction Center</span>{" "}
          planetary Kp index and OVATION aurora-probability model for this location. Sky is the latest{" "}
          <span className="font-semibold text-[#eaf0ff]/85">Fairbanks Airport (PAFA)</span> observation from the
          National Weather Service. Darkness is computed from real solar geometry — nautical twilight, the point a
          bright aurora actually becomes visible, not just sunset. A storm being active doesn&apos;t mean it can be
          seen: it also has to be dark and clear. If a feed is unreachable, that block shows a clearly-labeled{" "}
          <span className="font-semibold text-[#eaf0ff]/85">sample</span> instead — never presented as live. This is
          a planning aid, not a guarantee; the aurora is a natural phenomenon and no one can promise a sighting.
        </p>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  src,
  liveLabel,
}: {
  label: string;
  value: string;
  sub: string;
  src: Src;
  liveLabel: string;
}) {
  return (
    <div className="aur-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#9fb0d9]/80">{label}</span>
        <SourceBadge src={src} liveLabel={liveLabel} />
      </div>
      <span className="aur-display text-[16px] font-semibold leading-tight text-[#eaf0ff] sm:text-[17px]">{value}</span>
      <span className="mt-0.5 text-[11px] text-[#eaf0ff]/60">{sub}</span>
    </div>
  );
}

function SourceBadge({ src, liveLabel }: { src: Src; liveLabel: string }) {
  if (src === "loading")
    return (
      <span className="rounded-full border border-[#eaf0ff]/20 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#eaf0ff]/45">
        …
      </span>
    );
  const map: Record<Exclude<Src, "loading">, { t: string; cls: string }> = {
    live: { t: liveLabel, cls: "border-[#3fe6a4]/50 bg-[#3fe6a4]/15 text-[#a9f2d4]" },
    computed: { t: "Computed", cls: "border-[#a06bff]/45 bg-[#a06bff]/12 text-[#d3bdff]" },
    sample: { t: "Sample", cls: "border-[#eaf0ff]/25 bg-[#eaf0ff]/8 text-[#eaf0ff]/70" },
  };
  const m = map[src];
  return <span className={`rounded-full border px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] ${m.cls}`}>{m.t}</span>;
}
