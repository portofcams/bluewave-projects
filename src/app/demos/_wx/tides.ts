// Shared live-data library for BlueWave demos — NOAA CO-OPS TIDES.
//
// Live tide predictions from api.tidesandcurrents.noaa.gov (keyless,
// CORS-enabled: Access-Control-Allow-Origin: *). Extracted from the Kachemak
// Bay water-taxi panel. Heights are feet relative to MLLW.
//
// ⚠️ The working host is api.tidesandcurrents.NOAA.gov (NOT the bare
//    api.tidesandcurrents.gov, which does not resolve).
//
// TZ-INDEPENDENT: prediction times come back in the STATION's local wall-clock
// (time_zone=lst_ldt). We parse both those strings and "station now" into the
// SAME naive integer frame (minutes, treating wall-clock as UTC), so the
// current-tide state and interpolation are correct regardless of the VISITOR's
// own timezone.
//
// Framework-agnostic (no "use client"); the auto-refreshing hook lives in ./live.

export type TideEvent = { min: number; v: number; type: "H" | "L"; t: string };

export type TideView = {
  stateText: "Rising" | "Falling";
  rising: boolean;
  nowHeight: string; // "≈ 12.4 ft"
  nowHeightFt: number | null;
  nextHigh: { v: string; time: string } | null;
  nextLow: { v: string; time: string } | null;
  rangeText: string; // "15.7 ft"
  curve: string; // SVG path for the day's tide curve
  area: string; // SVG path, filled area under the curve
  nowX: number | null; // x in curve viewBox for the "now" marker
  nowY: number | null;
  marks: { x: number; y: number; type: "H" | "L" }[];
  events: { time: string; v: string; type: "H" | "L" }[]; // today's hi/lo list
};

export type CurveDims = { width: number; height: number; padY: number };
export const DEFAULT_CURVE: CurveDims = { width: 300, height: 96, padY: 12 };

// ---- TZ-independent time helpers ------------------------------------------
export function naiveMin(y: number, mo: number, d: number, h: number, mi: number): number {
  return Date.UTC(y, mo - 1, d, h, mi) / 60000;
}
export function parsePredMin(t: string): number {
  // "2026-07-09 20:45"
  const [dp, tp] = t.split(" ");
  const [y, mo, d] = dp.split("-").map(Number);
  const [h, mi] = tp.split(":").map(Number);
  return naiveMin(y, mo, d, h, mi);
}
export function predTimeText(t: string): string {
  const [, tp] = t.split(" ");
  const [h, mi] = tp.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(mi).padStart(2, "0")} ${ap}`;
}
export const predDateYMD = (t: string) => t.split(" ")[0];

/** Station wall-clock parts for an instant, in the station's IANA `tz`. */
export function zonedParts(date: Date, tz: string) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
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
  return { y: Number(map.year), mo: Number(map.month), d: Number(map.day), h, mi: Number(map.minute) };
}
export const ymdCompact = (dt: Date) =>
  `${dt.getUTCFullYear()}${String(dt.getUTCMonth() + 1).padStart(2, "0")}${String(dt.getUTCDate()).padStart(2, "0")}`;

// ---- cosine interpolation between surrounding hi/lo events -----------------
export function heightAt(min: number, events: TideEvent[]): number | null {
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

/** Build the full day tide view from an event series that spans today. */
export function buildTideView(
  events: TideEvent[],
  refNowMin: number,
  todayYMD: string,
  dims: CurveDims = DEFAULT_CURVE
): TideView | null {
  if (events.length < 2) return null;
  const { width: CW, height: CH, padY: PAD_Y } = dims;

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
  const stateText: "Rising" | "Falling" = rising ? "Rising" : "Falling";
  const nowH = heightAt(refNowMin, events);
  const nowHeight = nowH != null ? `≈ ${nowH.toFixed(1)} ft` : "—";

  const future = events.filter((e) => e.min > refNowMin);
  const nh = future.find((e) => e.type === "H") ?? null;
  const nl = future.find((e) => e.type === "L") ?? null;
  const nextHigh = nh ? { v: `${nh.v.toFixed(1)} ft`, time: predTimeText(nh.t) } : null;
  const nextLow = nl ? { v: `${nl.v.toFixed(1)} ft`, time: predTimeText(nl.t) } : null;

  const todays = events.filter((e) => predDateYMD(e.t) === todayYMD);
  const highs = todays.filter((e) => e.type === "H").map((e) => e.v);
  const lows = todays.filter((e) => e.type === "L").map((e) => e.v);
  const rangeText =
    highs.length && lows.length ? `${(Math.max(...highs) - Math.min(...lows)).toFixed(1)} ft` : "—";
  const eventList = todays.map((e) => ({ time: predTimeText(e.t), v: `${e.v.toFixed(1)} ft`, type: e.type }));

  const [ty, tmo, td] = todayYMD.split("-").map(Number);
  const dayStart = naiveMin(ty, tmo, td, 0, 0);
  const SAMPLES = 96;
  const pts: { m: number; v: number }[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const m = dayStart + (i / SAMPLES) * 1440;
    const v = heightAt(m, events);
    if (v != null) pts.push({ m, v });
  }
  if (pts.length < 2) return null;
  const minV = Math.min(...pts.map((p) => p.v));
  let maxV = Math.max(...pts.map((p) => p.v));
  if (maxV - minV < 0.5) maxV = minV + 0.5;
  const pad = (maxV - minV) * 0.12;
  const lo = minV - pad;
  const hi = maxV + pad;
  const xOf = (m: number) => ((m - dayStart) / 1440) * CW;
  const yOf = (v: number) => CH - PAD_Y - ((v - lo) / (hi - lo)) * (CH - 2 * PAD_Y);

  const curve = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${xOf(p.m).toFixed(1)} ${yOf(p.v).toFixed(1)}`).join(" ");
  const area = `${curve} L ${CW} ${CH} L 0 ${CH} Z`;

  const nowClamped = Math.max(dayStart, Math.min(dayStart + 1440, refNowMin));
  const nowXv = xOf(nowClamped);
  const nowHv = heightAt(nowClamped, events);
  const nowY = nowHv != null ? yOf(nowHv) : null;
  const marks = todays.map((e) => ({ x: xOf(e.min), y: yOf(e.v), type: e.type }));

  return {
    stateText,
    rising,
    nowHeight,
    nowHeightFt: nowH,
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

export function tidePredictionsUrl(station: string, begin: string, end: string, app = "BlueWaveProjects") {
  return (
    `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions` +
    `&application=${app}&begin_date=${begin}&end_date=${end}&datum=MLLW&station=${station}` +
    `&time_zone=lst_ldt&units=english&interval=hilo&format=json`
  );
}

/** Client-side fetch of a 3-day (yesterday→tomorrow) hi/lo window for `station`,
 *  in the station's `tz`. Returns a sorted TideEvent[] or null on any failure. */
export async function fetchTideEvents(station: string, tz: string, now = new Date()): Promise<TideEvent[] | null> {
  try {
    const hp = zonedParts(now, tz);
    const base = new Date(Date.UTC(hp.y, hp.mo - 1, hp.d, 12));
    const begin = new Date(base.getTime() - 86400000);
    const end = new Date(base.getTime() + 86400000);
    const r = await fetch(tidePredictionsUrl(station, ymdCompact(begin), ymdCompact(end)), {
      headers: { Accept: "application/json" },
    });
    if (!r.ok) return null;
    const j = await r.json();
    const preds: { t: string; v: string; type: string }[] = j?.predictions;
    if (!Array.isArray(preds) || preds.length < 2) return null;
    const events = preds
      .map((p) => ({
        t: p.t,
        v: parseFloat(p.v),
        type: (p.type === "H" ? "H" : "L") as "H" | "L",
        min: parsePredMin(p.t),
      }))
      .filter((e) => Number.isFinite(e.v))
      .sort((a, b) => a.min - b.min);
    return events.length >= 2 ? events : null;
  } catch {
    return null;
  }
}
