"use client";

// LIVE "KACHEMAK BAY TIDES RIGHT NOW" panel — the showpiece of the Kachemak
// Bay water-taxi sample site.
//
// WHY TIDES: Kachemak Bay has one of the largest tidal ranges in the world
// (mean range ~15 ft, extremes swinging ~28 ft). For a Homer water taxi, the
// tide is the whole ballgame — beach landings at the state-park trailheads
// (Glacier Spit, Saddle, Grewingk), and dock access at Halibut Cove and
// Seldovia, are gated by the stage of the tide. So the "wow" panel is a LIVE
// tide read, not just weather.
//
// HONESTY CONTRACT:
//   - TIDES: we attempt a LIVE fetch, client-side, of NOAA CO-OPS tide
//     predictions for Homer, AK — Coal Point, at the tip of the Homer Spit
//     (station 9455558) from
//       https://api.tidesandcurrents.noaa.gov/api/prod/datagetter
//     This endpoint needs no API key and is CORS-enabled (verified:
//     Access-Control-Allow-Origin: *). When it succeeds,
//     the panel badges "Live · NOAA" and shows the current tide state, the
//     next high/low, today's range, and a tide curve — all derived from the
//     live prediction series. Heights are feet relative to MLLW.
//   - WEATHER: a LIVE fetch of the latest Homer Airport (PAHO) observation
//     from the National Weather Service (keyless, CORS-ok, shared decode
//     contract in ../_wx/nws.ts) for a compact wind / sky / temp read — wind
//     matters on the bay crossing. Badged "Live · NWS" on success.
//   - If either feed errors or returns nothing usable, THAT block falls back
//     to a CLEARLY-LABELED "Sample" — never presented as live.
//   - Sunrise / sunset for Homer (59.64, -151.55) are COMPUTED client-side
//     (NOAA solar algorithm) — deterministic, no network, badged "Computed."
//
// This panel is a trip-planning aid for a prospective customer sizing up a
// crossing or a drop-off. It is explicitly NOT a substitute for the operator's
// own captains, who make the real go/no-go call each day.
//
// All classes are Tailwind arbitrary values or the `.kb-*` scoped helpers from
// _shared.tsx. Nothing global is touched.

import { useEffect, useState } from "react";
import { decodeNwsObservation, solarTimes, type NwsObservation } from "../_wx";
import { SourceBadge, UpdatedAgo, useNwsObservation, type WxSource } from "../_wx/live";

const TIDE_STATION = "9455558"; // Homer, AK — Coal Point (tip of the Homer Spit)
const HOMER_LAT = 59.6014; // Coal Point
const HOMER_LON = -151.4106;
const HOMER_TZ = "America/Anchorage";
const PAHO = "PAHO"; // Homer Airport
const TIDE_URL = (begin: string, end: string) =>
  `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=BlueWaveProjects&begin_date=${begin}&end_date=${end}&datum=MLLW&station=${TIDE_STATION}&time_zone=lst_ldt&units=english&interval=hilo&format=json`;

type Src = "live" | "sample" | "loading";

const BADGE = {
  live: "border-[#7fe0c8]/50 bg-[#7fe0c8]/15 text-[#a9ecd8]",
  computed: "border-[#e6a94b]/45 bg-[#e6a94b]/12 text-[#f2c37f]",
  sample: "border-[#f3faf9]/25 bg-[#f3faf9]/8 text-[#f3faf9]/70",
  loading: "border-[#f3faf9]/20 text-[#f3faf9]/45",
};

// ---- shared tide types ----------------------------------------------------
type TideEvent = { min: number; v: number; type: "H" | "L"; t: string };
type TideView = {
  stateText: string; // "Rising" / "Falling"
  rising: boolean;
  nowHeight: string; // "≈ 12.4 ft"
  nextHigh: { v: string; time: string } | null;
  nextLow: { v: string; time: string } | null;
  rangeText: string; // "22.1 ft"
  curve: string; // SVG path for the day's tide curve
  area: string; // SVG path, filled area under the curve
  nowX: number | null; // x in curve viewBox for "now" marker
  nowY: number | null;
  marks: { x: number; y: number; type: "H" | "L" }[]; // hi/lo dots today
  events: { time: string; v: string; type: "H" | "L" }[]; // today's hi/lo list
};

type State = {
  tideSrc: Src;
  tide: TideView;
};

// curve viewBox
const CW = 300;
const CH = 96;
const PAD_Y = 12;

// ---------------------------------------------------------------------------
// TZ-independent time helpers. NOAA returns prediction times in Homer local
// wall-clock (time_zone=lst_ldt). We parse both those strings and "Homer now"
// into the SAME naive integer frame (minutes, treating the wall-clock as UTC),
// so state/interpolation is correct regardless of the VISITOR's own timezone.
// ---------------------------------------------------------------------------
function naiveMin(y: number, mo: number, d: number, h: number, mi: number): number {
  return Date.UTC(y, mo - 1, d, h, mi) / 60000;
}
function parsePredMin(t: string): number {
  // "2026-07-09 20:45"
  const [dp, tp] = t.split(" ");
  const [y, mo, d] = dp.split("-").map(Number);
  const [h, mi] = tp.split(":").map(Number);
  return naiveMin(y, mo, d, h, mi);
}
function predTimeText(t: string): string {
  const [, tp] = t.split(" ");
  const [h, mi] = tp.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(mi).padStart(2, "0")} ${ap}`;
}
function predDateYMD(t: string): string {
  return t.split(" ")[0]; // "2026-07-09"
}
// Homer wall-clock parts for a given instant.
function homerParts(date: Date) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: HOMER_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const map: Record<string, string> = {};
  for (const p of f.formatToParts(date)) map[p.type] = p.value;
  let h = Number(map.hour);
  if (h === 24) h = 0; // some engines render midnight as "24"
  return {
    y: Number(map.year),
    mo: Number(map.month),
    d: Number(map.day),
    h,
    mi: Number(map.minute),
  };
}
const ymd = (dt: Date) =>
  `${dt.getUTCFullYear()}${String(dt.getUTCMonth() + 1).padStart(2, "0")}${String(
    dt.getUTCDate()
  ).padStart(2, "0")}`;

// cosine tide interpolation between two surrounding hi/lo events
function heightAt(min: number, events: TideEvent[]): number | null {
  if (!events.length) return null;
  if (min <= events[0].min) return events[0].v;
  if (min >= events[events.length - 1].min) return events[events.length - 1].v;
  let prev = events[0];
  let next = events[events.length - 1];
  for (let i = 0; i < events.length - 1; i++) {
    if (events[i].min <= min && events[i + 1].min >= min) {
      prev = events[i];
      next = events[i + 1];
      break;
    }
  }
  const span = next.min - prev.min;
  if (span <= 0) return prev.v;
  const frac = (min - prev.min) / span;
  return next.v + (prev.v - next.v) * ((1 + Math.cos(Math.PI * frac)) / 2);
}

// Build the full tide view (used by BOTH live and sample paths).
function buildTide(events: TideEvent[], refNowMin: number, todayYMD: string): TideView | null {
  if (events.length < 2) return null;

  // current state
  let prev: TideEvent | null = null;
  let next: TideEvent | null = null;
  for (const e of events) {
    if (e.min <= refNowMin) prev = e;
    else {
      next = e;
      break;
    }
  }
  const rising = next ? next.type === "H" : prev?.type === "L";
  const stateText = rising ? "Rising" : "Falling";
  const nowH = heightAt(refNowMin, events);
  const nowHeight = nowH != null ? `≈ ${nowH.toFixed(1)} ft` : "—";

  // next high / low (first future events of each type)
  const future = events.filter((e) => e.min > refNowMin);
  const nh = future.find((e) => e.type === "H") ?? null;
  const nl = future.find((e) => e.type === "L") ?? null;
  const nextHigh = nh ? { v: `${nh.v.toFixed(1)} ft`, time: predTimeText(nh.t) } : null;
  const nextLow = nl ? { v: `${nl.v.toFixed(1)} ft`, time: predTimeText(nl.t) } : null;

  // today's events + range
  const todays = events.filter((e) => predDateYMD(e.t) === todayYMD);
  const highs = todays.filter((e) => e.type === "H").map((e) => e.v);
  const lows = todays.filter((e) => e.type === "L").map((e) => e.v);
  const rangeText =
    highs.length && lows.length
      ? `${(Math.max(...highs) - Math.min(...lows)).toFixed(1)} ft`
      : "—";
  const eventList = todays.map((e) => ({
    time: predTimeText(e.t),
    v: `${e.v.toFixed(1)} ft`,
    type: e.type,
  }));

  // curve over today 00:00 -> 24:00 (Homer)
  const [ty, tmo, td] = todayYMD.split("-").map(Number);
  const dayStart = naiveMin(ty, tmo, td, 0, 0);
  const SAMPLES = 96; // 15-min steps
  const pts: { m: number; v: number }[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const m = dayStart + (i / SAMPLES) * 1440;
    const v = heightAt(m, events);
    if (v != null) pts.push({ m, v });
  }
  if (pts.length < 2) return null;
  let minV = Math.min(...pts.map((p) => p.v));
  let maxV = Math.max(...pts.map((p) => p.v));
  if (maxV - minV < 0.5) maxV = minV + 0.5; // avoid flat-line divide-by-zero
  const pad = (maxV - minV) * 0.12;
  const lo = minV - pad;
  const hi = maxV + pad;
  const xOf = (m: number) => ((m - dayStart) / 1440) * CW;
  const yOf = (v: number) => CH - PAD_Y - ((v - lo) / (hi - lo)) * (CH - 2 * PAD_Y);

  const curve = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xOf(p.m).toFixed(1)} ${yOf(p.v).toFixed(1)}`)
    .join(" ");
  const area = `${curve} L ${CW} ${CH} L 0 ${CH} Z`;

  const nowClamped = Math.max(dayStart, Math.min(dayStart + 1440, refNowMin));
  const nowXv = xOf(nowClamped);
  const nowHv = heightAt(nowClamped, events);
  const nowY = nowHv != null ? yOf(nowHv) : null;

  const marks = todays.map((e) => ({
    x: xOf(e.min),
    y: yOf(e.v),
    type: e.type,
  }));

  return {
    stateText,
    rising,
    nowHeight,
    nextHigh,
    nextLow,
    rangeText,
    curve,
    area,
    nowX: nowXv,
    nowY,
    marks,
    events: eventList,
  };
}

// ---- honest SAMPLE tide (clearly labeled) ---------------------------------
// A realistic Homer mixed-semidiurnal summer day (big Kachemak range). Fixed
// reference "now" at 1:00 PM so the sample reads consistently. NEVER live.
const SAMPLE_TODAY = "2026-07-09";
const SAMPLE_EVENTS: TideEvent[] = [
  { t: "2026-07-08 21:55", v: 17.6, type: "H", min: parsePredMin("2026-07-08 21:55") },
  { t: "2026-07-09 04:05", v: 1.4, type: "L", min: parsePredMin("2026-07-09 04:05") },
  { t: "2026-07-09 10:20", v: 13.6, type: "H", min: parsePredMin("2026-07-09 10:20") },
  { t: "2026-07-09 16:05", v: 5.1, type: "L", min: parsePredMin("2026-07-09 16:05") },
  { t: "2026-07-09 22:15", v: 18.0, type: "H", min: parsePredMin("2026-07-09 22:15") },
  { t: "2026-07-10 04:30", v: 0.8, type: "L", min: parsePredMin("2026-07-10 04:30") },
];
const SAMPLE_REF_NOW = parsePredMin("2026-07-09 13:00");
const SAMPLE_TIDE = buildTide(SAMPLE_EVENTS, SAMPLE_REF_NOW, SAMPLE_TODAY) as TideView;

// Realistic Homer summer afternoon: SW breeze, broken deck. NEVER shown live.
const SAMPLE_WX: NwsObservation = decodeNwsObservation(
  { timestamp: null, rawMessage: "PAHO 091953Z 22009KT 10SM BKN035 13/08 A2988 RMK AO2" },
  PAHO,
  HOMER_TZ
);

// Friendly "on the water" read from wind speed alone — wind is what matters
// on the bay crossing. A planning heuristic, not a go/no-go.
function bayRead(windMph: number): string {
  if (windMph >= 18) return "Building";
  if (windMph >= 10) return "Light chop";
  return "Calm";
}

// ---------------------------------------------------------------------------
export function BayConditions() {
  const [sun] = useState(() => solarTimes(new Date(), HOMER_LAT, HOMER_LON, HOMER_TZ));
  const wx = useNwsObservation(PAHO, { sample: SAMPLE_WX, tz: HOMER_TZ });

  const [s, setS] = useState<State>({ tideSrc: "loading", tide: SAMPLE_TIDE });
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;

    // --- tides (NOAA CO-OPS) ---
    async function loadTides() {
      try {
        const now = new Date();
        const hp = homerParts(now);
        const base = new Date(Date.UTC(hp.y, hp.mo - 1, hp.d, 12));
        const begin = new Date(base.getTime() - 86400000);
        const end = new Date(base.getTime() + 86400000);
        const todayYMD = `${hp.y}-${String(hp.mo).padStart(2, "0")}-${String(hp.d).padStart(2, "0")}`;
        const refNow = naiveMin(hp.y, hp.mo, hp.d, hp.h, hp.mi);

        const r = await fetch(TIDE_URL(ymd(begin), ymd(end)), {
          headers: { Accept: "application/json" },
        });
        if (!r.ok) throw new Error(`status ${r.status}`);
        const j = await r.json();
        const preds: { t: string; v: string; type: string }[] = j?.predictions;
        if (!Array.isArray(preds) || preds.length < 2) throw new Error("no predictions");
        const events: TideEvent[] = preds
          .map((p) => ({
            t: p.t,
            v: parseFloat(p.v),
            type: (p.type === "H" ? "H" : "L") as "H" | "L",
            min: parsePredMin(p.t),
          }))
          .filter((e) => Number.isFinite(e.v))
          .sort((a, b) => a.min - b.min);
        const view = buildTide(events, refNow, todayYMD);
        if (view && alive) {
          setS((prev) => ({ ...prev, tideSrc: "live", tide: view }));
          setFetchedAt(Date.now());
        } else throw new Error("could not build view");
      } catch {
        // keep the last live read on a transient refresh failure
        if (alive) setS((prev) => (prev.tideSrc === "live" ? prev : { ...prev, tideSrc: "sample", tide: SAMPLE_TIDE }));
      }
    }

    loadTides();
    const id = setInterval(loadTides, 5 * 60_000); // auto-refresh every 5 min
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const t = s.tide;
  const tideLive = s.tideSrc === "live";
  const d = wx.obs;
  const bay = bayRead(d.windMph ?? 0);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#f3faf9]/12 bg-gradient-to-br from-[#0d3540] via-[#166170] to-[#08222b] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* faint bay-current texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M-20 60 C 100 40, 180 80, 420 50" stroke="#c9e9e9" strokeWidth="1" fill="none" />
        <path d="M-20 130 C 100 110, 180 150, 420 120" stroke="#c9e9e9" strokeWidth="1" fill="none" />
        <path d="M-20 210 C 100 190, 180 230, 420 200" stroke="#c9e9e9" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="kb-eyebrow !text-[#e6a94b]">Kachemak Bay, right now</p>
            <h3 className="kb-display mt-1 text-xl font-semibold text-[#f3faf9] sm:text-2xl">
              Homer tides &amp; conditions
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6fc3cf]/50 bg-[#08222b]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c9e9e9]">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  tideLive ? "animate-ping bg-[#7fe0c8]" : "bg-[#c9e9e9]"
                } opacity-75`}
              />
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  tideLive ? "bg-[#7fe0c8]" : "bg-[#c9e9e9]"
                }`}
              />
            </span>
            {t.rising ? "Tide rising" : "Tide falling"}
          </span>
        </div>

        {/* tide curve */}
        <div className="kb-glass p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c9e9e9]">
              Today&apos;s tide · Homer (MLLW)
            </span>
            <SourceBadge source={s.tideSrc} labels={{ live: "Live · NOAA" }} classes={BADGE} />
          </div>
          <svg
            viewBox={`0 0 ${CW} ${CH}`}
            className="h-24 w-full"
            preserveAspectRatio="none"
            aria-label="Today's tide curve for Homer, Alaska"
          >
            <defs>
              <linearGradient id="kb-tide-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6fc3cf" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#6fc3cf" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d={t.area} fill="url(#kb-tide-fill)" />
            <path d={t.curve} fill="none" stroke="#c9e9e9" strokeWidth="1.6" />
            {/* hi/lo dots */}
            {t.marks.map((m, i) => (
              <circle
                key={i}
                cx={m.x}
                cy={m.y}
                r={2.2}
                fill={m.type === "H" ? "#e6a94b" : "#d9558c"}
              />
            ))}
            {/* now marker */}
            {t.nowX != null && (
              <line
                x1={t.nowX}
                y1={4}
                x2={t.nowX}
                y2={CH - 4}
                stroke="#f3faf9"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.7"
              />
            )}
            {t.nowX != null && t.nowY != null && (
              <circle cx={t.nowX} cy={t.nowY} r={3} fill="#f3faf9" stroke="#08222b" strokeWidth="1" />
            )}
          </svg>
          <div className="mt-1 flex items-center justify-between text-[10px] text-[#c9e9e9]/55">
            <span>12 AM</span>
            <span>{tideLive ? "now" : "sample day"}</span>
            <span>12 PM</span>
            <span>12 AM</span>
          </div>
        </div>

        {/* tide metric row */}
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric
            label="Tide now"
            value={`${t.stateText} · ${t.nowHeight}`}
            sub="predicted vs. MLLW"
            src={s.tideSrc}
            liveLabel="Live · NOAA"
          />
          <Metric
            label="Next high"
            value={t.nextHigh ? t.nextHigh.v : "—"}
            sub={t.nextHigh ? `at ${t.nextHigh.time}` : "—"}
            src={s.tideSrc}
            liveLabel="Live · NOAA"
          />
          <Metric
            label="Next low"
            value={t.nextLow ? t.nextLow.v : "—"}
            sub={t.nextLow ? `at ${t.nextLow.time}` : "—"}
            src={s.tideSrc}
            liveLabel="Live · NOAA"
          />
          <Metric
            label="Range today"
            value={t.rangeText}
            sub="high − low swing"
            src={s.tideSrc}
            liveLabel="Live · NOAA"
          />
        </div>

        {/* weather + daylight row */}
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric
            label="Wind (PAHO)"
            value={d.windTextMph}
            sub={wx.source === "live" ? `as of ${d.obsTimeText}` : "sample obs"}
            src={wx.source}
            liveLabel="Live · NWS"
          />
          <Metric
            label="Sky"
            value={d.skyText}
            sub="Homer Airport"
            src={wx.source}
            liveLabel="Live · NWS"
          />
          <Metric
            label="On the water"
            value={bay}
            sub="friendly read, not a go/no-go"
            src={wx.source}
            liveLabel="Live · NWS"
          />
          <Metric
            label="Daylight"
            value={sun.daylight}
            sub={`↑ ${sun.sunrise} · ↓ ${sun.sunset}`}
            src="computed"
            liveLabel="Live · NWS"
          />
        </div>

        <UpdatedAgo at={fetchedAt} live={tideLive} className="mt-3 block text-right text-[10px] text-[#dcefee]/45" />

        {/* honest footnote */}
        <p className="mt-4 text-[11px] leading-relaxed text-[#dcefee]/60">
          Tides are the live NOAA CO-OPS predictions for{" "}
          <span className="font-semibold text-[#f3faf9]/85">Homer, AK — Coal Point (station 9455558)</span>,
          in feet relative to MLLW; wind and sky are the latest{" "}
          <span className="font-semibold text-[#f3faf9]/85">Homer Airport (PAHO)</span>{" "}
          observation from the National Weather Service. Sunrise, sunset, and daylight are
          computed for Homer (59.60°N, 151.41°W). Kachemak Bay runs one of the largest tidal
          ranges anywhere — the &quot;on the water&quot; read is a friendly planning heuristic,
          not a go/no-go; the operator&apos;s own captains make the real daily call. If a feed is
          unreachable, that block shows a clearly-labeled{" "}
          <span className="font-semibold text-[#f3faf9]/85">sample</span> instead — never
          presented as live.
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
  src: WxSource;
  liveLabel: string;
}) {
  return (
    <div className="kb-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#dcefee]/50">{label}</span>
        <SourceBadge source={src} labels={{ live: liveLabel }} classes={BADGE} />
      </div>
      <span className="kb-display text-[15px] font-semibold leading-tight text-[#f3faf9] sm:text-base">
        {value}
      </span>
      <span className="mt-0.5 text-[11px] text-[#dcefee]/60">{sub}</span>
    </div>
  );
}
