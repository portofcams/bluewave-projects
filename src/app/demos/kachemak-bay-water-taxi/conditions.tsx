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
// HONESTY CONTRACT (mirrors lazy-otter-charters/conditions.tsx):
//   - TIDES: we attempt a LIVE fetch, client-side, of NOAA CO-OPS tide
//     predictions for Homer, AK — Coal Point, at the tip of the Homer Spit
//     (station 9455558) from
//       https://api.tidesandcurrents.noaa.gov/api/prod/datagetter
//     This endpoint needs no API key and is CORS-enabled (verified:
//     Access-Control-Allow-Origin: *). When it succeeds,
//     the panel badges "Live · NOAA" and shows the current tide state, the
//     next high/low, today's range, and a tide curve — all derived from the
//     live prediction series. Heights are feet relative to MLLW.
//   - WEATHER: we attempt a LIVE fetch of the latest Homer Airport (PAHO)
//     observation from the National Weather Service API (keyless, CORS-ok)
//     for a compact wind / sky / temp read — wind matters on the bay
//     crossing. Badged "Live · NWS" on success.
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

const TIDE_STATION = "9455558"; // Homer, AK — Coal Point (tip of the Homer Spit)
const HOMER_LAT = 59.6014; // Coal Point
const HOMER_LON = -151.4106;
const HOMER_TZ = "America/Anchorage";
const PAHO = "PAHO"; // Homer Airport
const TIDE_URL = (begin: string, end: string) =>
  `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=BlueWaveProjects&begin_date=${begin}&end_date=${end}&datum=MLLW&station=${TIDE_STATION}&time_zone=lst_ldt&units=english&interval=hilo&format=json`;
const WX_URL = `https://api.weather.gov/stations/${PAHO}/observations/latest`;

type Src = "live" | "sample" | "loading";

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

type WxView = {
  windText: string;
  skyText: string;
  tempText: string;
  bayRead: string; // "Calm" / "Light chop" / "Building"
  obsTime: string;
};

type State = {
  tideSrc: Src;
  tide: TideView;
  wxSrc: Src;
  wx: WxView;
  sunrise: string;
  sunset: string;
  daylight: string;
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

const SAMPLE_WX: WxView = {
  windText: "SW 9 mph",
  skyText: "Broken 3,500 ft",
  tempText: "56°F / 13°C",
  bayRead: "Light chop",
  obsTime: "sample observation",
};

// ---- NWS decode (compact) -------------------------------------------------
const cToF = (c: number) => Math.round((c * 9) / 5 + 32);
const kmhToMph = (kmh: number) => Math.round(kmh / 1.60934);
const mToFt = (m: number) => m * 3.28084;
const DIRS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
const compass = (deg: number) => DIRS[Math.round(deg / 22.5) % 16];
const COVER: Record<string, string> = {
  SKC: "Clear",
  CLR: "Clear",
  FEW: "Few",
  SCT: "Scattered",
  BKN: "Broken",
  OVC: "Overcast",
};

type NwsVal = { value?: number | null } | null | undefined;
type NwsLayer = { base?: { value?: number | null } | null; amount?: string | null };
type NwsProps = {
  timestamp?: string | null;
  temperature?: NwsVal;
  windDirection?: NwsVal;
  windSpeed?: NwsVal;
  cloudLayers?: NwsLayer[] | null;
  textDescription?: string | null;
};
const numOr = (v: NwsVal): number | null =>
  v != null && typeof v.value === "number" ? v.value : null;

function decodeWx(p: NwsProps): WxView {
  const tempC = numOr(p.temperature);
  const tempText = tempC != null ? `${cToF(tempC)}°F / ${Math.round(tempC)}°C` : "—";

  let windText = "—";
  let mph = 0;
  const spd = numOr(p.windSpeed);
  const dir = numOr(p.windDirection);
  if (spd != null) {
    mph = kmhToMph(spd);
    windText = mph === 0 ? "Calm" : `${dir != null ? compass(dir) : "—"} ${mph} mph`;
  }

  let skyText = "—";
  const layers = Array.isArray(p.cloudLayers) ? p.cloudLayers : [];
  if (layers.length) {
    const l = layers.find((x) => x.amount === "BKN" || x.amount === "OVC") ?? layers[0];
    const label = COVER[l.amount ?? ""] ?? l.amount ?? "—";
    const ft = typeof l.base?.value === "number" ? Math.round(mToFt(l.base.value)) : null;
    skyText = ft != null ? `${label} ${ft.toLocaleString()} ft` : label;
  } else {
    skyText = p.textDescription || "Clear";
  }

  const bayRead = mph >= 18 ? "Building" : mph >= 10 ? "Light chop" : "Calm";

  let obsTime = "—";
  if (p.timestamp) {
    const dt = new Date(p.timestamp);
    if (!Number.isNaN(dt.getTime())) {
      obsTime = dt.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: HOMER_TZ,
        timeZoneName: "short",
      });
    }
  }
  return { windText, skyText, tempText, bayRead, obsTime };
}

// ---- NOAA solar algorithm (client-side, no network) -----------------------
function solarTimes(date: Date, lat: number, lon: number) {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff =
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const dayOfYear = Math.floor(diff / 86400000);
  const zenith = 90.833;
  const lngHour = lon / 15;

  function calc(isSunrise: boolean): number | null {
    const t = dayOfYear + ((isSunrise ? 6 : 18) - lngHour) / 24;
    const M = 0.9856 * t - 3.289;
    let L = M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634;
    L = ((L % 360) + 360) % 360;
    let RA = deg * Math.atan(0.91764 * Math.tan(L * rad));
    RA = ((RA % 360) + 360) % 360;
    const Lq = Math.floor(L / 90) * 90;
    const RAq = Math.floor(RA / 90) * 90;
    RA = (RA + (Lq - RAq)) / 15;
    const sinDec = 0.39782 * Math.sin(L * rad);
    const cosDec = Math.cos(Math.asin(sinDec));
    const cosH = (Math.cos(zenith * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
    if (cosH > 1 || cosH < -1) return null;
    let H = isSunrise ? 360 - deg * Math.acos(cosH) : deg * Math.acos(cosH);
    H = H / 15;
    const T = H + RA - 0.06571 * t - 6.622;
    let UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24;
    return Math.round(UT * 60);
  }
  function fmt(minutesUTC: number | null): string | null {
    if (minutesUTC == null) return null;
    const d = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        Math.floor(minutesUTC / 60),
        minutesUTC % 60
      )
    );
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: HOMER_TZ });
  }
  const rise = calc(true);
  const set = calc(false);
  let daylight = "—";
  if (rise != null && set != null) {
    let dm = set - rise;
    if (dm < 0) dm += 1440;
    daylight = `${Math.floor(dm / 60)}h ${dm % 60}m`;
  }
  return { sunrise: fmt(rise) ?? "—", sunset: fmt(set) ?? "—", daylight };
}

// ---------------------------------------------------------------------------
export function BayConditions() {
  const [s, setS] = useState<State>(() => {
    const { sunrise, sunset, daylight } = solarTimes(new Date(), HOMER_LAT, HOMER_LON);
    return {
      tideSrc: "loading",
      tide: SAMPLE_TIDE,
      wxSrc: "loading",
      wx: SAMPLE_WX,
      sunrise,
      sunset,
      daylight,
    };
  });

  useEffect(() => {
    let alive = true;

    // --- tides (NOAA CO-OPS) ---
    (async () => {
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
        if (view && alive) setS((prev) => ({ ...prev, tideSrc: "live", tide: view }));
        else throw new Error("could not build view");
      } catch {
        if (alive) setS((prev) => ({ ...prev, tideSrc: "sample", tide: SAMPLE_TIDE }));
      }
    })();

    // --- weather (NWS PAHO) ---
    (async () => {
      try {
        const r = await fetch(WX_URL, { headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error(`status ${r.status}`);
        const j = await r.json();
        const props: NwsProps | undefined = j?.properties;
        const hasData =
          props && (props.timestamp || (props.temperature && props.temperature.value != null));
        if (hasData && alive) setS((prev) => ({ ...prev, wxSrc: "live", wx: decodeWx(props) }));
        else throw new Error("empty obs");
      } catch {
        if (alive) setS((prev) => ({ ...prev, wxSrc: "sample", wx: SAMPLE_WX }));
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const t = s.tide;
  const tideLive = s.tideSrc === "live";

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
            <Badge src={s.tideSrc} liveLabel="Live · NOAA" />
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
            value={s.wx.windText}
            sub={s.wxSrc === "live" ? `as of ${s.wx.obsTime}` : "sample obs"}
            src={s.wxSrc}
            liveLabel="Live · NWS"
          />
          <Metric
            label="Sky"
            value={s.wx.skyText}
            sub="Homer Airport"
            src={s.wxSrc}
            liveLabel="Live · NWS"
          />
          <Metric
            label="On the water"
            value={s.wx.bayRead}
            sub="friendly read, not a go/no-go"
            src={s.wxSrc}
            liveLabel="Live · NWS"
          />
          <Metric
            label="Daylight"
            value={s.daylight}
            sub={`↑ ${s.sunrise} · ↓ ${s.sunset}`}
            src="computed"
            liveLabel="Live · NWS"
          />
        </div>

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
  src: Src | "computed";
  liveLabel: string;
}) {
  return (
    <div className="kb-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#dcefee]/50">{label}</span>
        <Badge src={src} liveLabel={liveLabel} />
      </div>
      <span className="kb-display text-[15px] font-semibold leading-tight text-[#f3faf9] sm:text-base">
        {value}
      </span>
      <span className="mt-0.5 text-[11px] text-[#dcefee]/60">{sub}</span>
    </div>
  );
}

function Badge({ src, liveLabel }: { src: Src | "computed"; liveLabel: string }) {
  if (src === "loading")
    return (
      <span className="rounded-full border border-[#f3faf9]/20 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#f3faf9]/45">
        …
      </span>
    );
  const map: Record<Exclude<Src | "computed", "loading">, { t: string; cls: string }> = {
    live: { t: liveLabel, cls: "border-[#7fe0c8]/50 bg-[#7fe0c8]/15 text-[#a9ecd8]" },
    computed: { t: "Computed", cls: "border-[#e6a94b]/45 bg-[#e6a94b]/12 text-[#f2c37f]" },
    sample: { t: "Sample", cls: "border-[#f3faf9]/25 bg-[#f3faf9]/8 text-[#f3faf9]/70" },
  };
  const m = map[src];
  return (
    <span
      className={`rounded-full border px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] ${m.cls}`}
    >
      {m.t}
    </span>
  );
}
