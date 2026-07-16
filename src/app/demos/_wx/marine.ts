// Shared live-data library for BlueWave demos — MARINE (surf / SST / UV).
//
// Keyless, CORS-friendly ocean feeds for Hawaii/Pacific demos, all verified
// browser-fetchable (2026-07-09):
//   - PacIOOS SWAN nearshore wave MODEL (ERDDAP griddap) — significant wave
//     height, peak/mean period, direction. It's a model NOWCAST, not a sensor:
//     label it "modeled." Cross-validates well against the CDIP buoy.
//   - NOAA CO-OPS water_temperature — same host as tides, keyless.
//   - EPA Envirofacts hourly UV index by ZIP — keyless.
//
// (Real buoy observations — CDIP 233 / NDBC 51211 in Mamala Bay — are NOT
// CORS-enabled and need a server proxy; that's a Phase-2 "verified by buoy"
// upgrade, not required for the live panel.)
//
// Framework-agnostic (no "use client"); the auto-refreshing hook is in ./live.

import { compass } from "./nws";
import { naiveMin, parsePredMin, predTimeText, ymdCompact, zonedParts } from "./tides";

// ---------------------------------------------------------------------------
// PacIOOS SWAN Oahu nearshore wave model (griddap)
// ---------------------------------------------------------------------------
export type SwanWaves = {
  hsM: number;
  hsFt: number;
  peakPeriodS: number | null;
  meanPeriodS: number | null;
  dirDeg: number | null;
  dirCardinal: string | null;
};

// Default grid point: nearshore Waikiki / south shore. Longitude is 0–360°E,
// so Waikiki −157.83°W = 202.17°E.
const SWAN_LAT = 21.26;
const SWAN_LON360 = 202.17;

/** Current UTC hour as an ERDDAP timestamp, e.g. "2026-07-09T20:00:00Z".
 *  The dataset is a rolling hindcast+forecast; `[(last)]` returns the forecast
 *  tail and `(now)` isn't supported on this build, so we pass an explicit hour
 *  and let griddap snap to nearest. */
function currentUtcHourIso(now = new Date()): string {
  const d = new Date(now.getTime());
  d.setUTCMinutes(0, 0, 0);
  return d.toISOString().slice(0, 19) + "Z";
}

// PacIOOS publishes a per-island SWAN nearshore grid: swan_oahu, swan_maui,
// swan_kauai, swan_bigi, etc. Default is Oʻahu; pass `dataset` for another
// island (e.g. "swan_maui" for a West-Maui point). Coordinates must fall on a
// wet grid cell of the chosen island's model or the fetch returns null.
export function swanWavesUrl(lat = SWAN_LAT, lon360 = SWAN_LON360, now = new Date(), dataset = "swan_oahu"): string {
  const ts = currentUtcHourIso(now);
  // %5B = "[", %5D = "]"; depth dim left empty ([]) to take all depths.
  const sub = `%5B(${ts})%5D%5B%5D%5B(${lat})%5D%5B(${lon360})%5D`;
  const query = ["shgt", "pper", "mper", "mdir"].map((v) => v + sub).join(",");
  return `https://pae-paha.pacioos.hawaii.edu/erddap/griddap/${dataset}.json?${query}`;
}

/** Fetch the modeled nearshore wave state. Returns null on any failure/NaN.
 *  `dataset` selects the island grid (default swan_oahu). */
export async function fetchSwanWaves(
  lat = SWAN_LAT,
  lon360 = SWAN_LON360,
  now = new Date(),
  dataset = "swan_oahu"
): Promise<SwanWaves | null> {
  try {
    const r = await fetch(swanWavesUrl(lat, lon360, now, dataset), { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const j = await r.json();
    const cols: string[] | undefined = j?.table?.columnNames;
    const rows: unknown[][] | undefined = j?.table?.rows;
    if (!Array.isArray(cols) || !Array.isArray(rows) || !rows.length) return null;
    const idx = (name: string) => cols.indexOf(name);
    const si = idx("shgt");
    if (si < 0) return null;
    const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
    const row = rows.find((rw) => isNum(rw[si])) ?? rows[0];
    const num = (name: string): number | null => {
      const i = idx(name);
      const v = i >= 0 ? row?.[i] : null;
      return isNum(v) ? v : null;
    };
    const hsM = num("shgt");
    if (hsM == null) return null;
    const dirDeg = num("mdir");
    return {
      hsM,
      hsFt: hsM * 3.28084,
      peakPeriodS: num("pper"),
      meanPeriodS: num("mper"),
      dirDeg,
      dirCardinal: dirDeg != null ? compass(dirDeg) : null,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// NOAA CO-OPS water temperature (same host as tides; keyless, CORS)
// ---------------------------------------------------------------------------
export function waterTempUrl(station: string, app = "BlueWaveProjects"): string {
  return (
    `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=water_temperature` +
    `&application=${app}&date=latest&station=${station}&time_zone=lst_ldt&units=english&format=json`
  );
}

/** Latest observed water temperature in °F, or null. */
export async function fetchWaterTempF(station: string): Promise<number | null> {
  try {
    const r = await fetch(waterTempUrl(station), { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const j = await r.json();
    const v = j?.data?.[0]?.v;
    const t = typeof v === "string" ? parseFloat(v) : typeof v === "number" ? v : NaN;
    return Number.isFinite(t) ? t : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// EPA Envirofacts hourly UV index by ZIP (keyless, CORS)
// ---------------------------------------------------------------------------
export type UvIndex = { value: number; label: string };

export function uvLabel(v: number): string {
  if (v <= 2) return "Low";
  if (v <= 5) return "Moderate";
  if (v <= 7) return "High";
  if (v <= 10) return "Very high";
  return "Extreme";
}

export function uvUrl(zip: string): string {
  return `https://data.epa.gov/efservice/getEnvirofactsUVHOURLY/ZIP/${zip}/JSON`;
}

/** Current-hour UV index for a ZIP (matches the local Honolulu hour to the
 *  EPA hourly forecast array). Returns null on failure. */
export async function fetchUvIndex(zip: string, tz = "Pacific/Honolulu", now = new Date()): Promise<UvIndex | null> {
  try {
    const r = await fetch(uvUrl(zip), { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const arr: { DATE_TIME?: string; UV_VALUE?: number }[] = await r.json();
    if (!Array.isArray(arr) || !arr.length) return null;
    // current local hour like "01 AM"
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "2-digit", hour12: true }).formatToParts(now);
    const hour = parts.find((p) => p.type === "hour")?.value ?? "";
    const ap = (parts.find((p) => p.type === "dayPeriod")?.value ?? "").toUpperCase();
    const key = `${hour} ${ap}`; // e.g. "01 AM"
    const match =
      arr.find((e) => typeof e.DATE_TIME === "string" && e.DATE_TIME.toUpperCase().trim().endsWith(key)) ??
      // fallback: the row with the highest UV (daytime peak) so the tile isn't blank
      arr.reduce((best, e) => ((e.UV_VALUE ?? -1) > (best.UV_VALUE ?? -1) ? e : best), arr[0]);
    const v = match?.UV_VALUE;
    return typeof v === "number" && Number.isFinite(v) ? { value: v, label: uvLabel(v) } : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// NOAA CO-OPS tidal CURRENT predictions (keyless, CORS). For places where the
// current is the story — Admiralty Inlet / Point Wilson rips ~3.5 kt. Uses the
// `currents_predictions` product with MAX_SLACK events; velocity is signed
// (flood +, ebb −) in knots, with mean flood/ebb directions on each entry.
// ---------------------------------------------------------------------------
export type CurrentState = {
  stateText: "Flooding" | "Ebbing" | "Slack";
  speedKt: number; // |velocity| now (interpolated)
  dirCardinal: string | null; // cardinal of the current flow direction
  peakKt: number | null; // strongest |velocity| today
  nextText: string | null; // "slack at 1:46 PM" / "max ebb 3.5 kt at 4:33 AM"
};

export function currentsUrl(station: string, begin: string, end: string, app = "BlueWaveProjects"): string {
  return (
    `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=currents_predictions` +
    `&application=${app}&begin_date=${begin}&end_date=${end}&station=${station}` +
    `&time_zone=lst_ldt&units=english&interval=MAX_SLACK&format=json`
  );
}

type CpEntry = { Time?: string; Velocity_Major?: number; Type?: string; meanFloodDir?: number; meanEbbDir?: number };

/** Current tidal-current state for a CO-OPS current station, in the station's
 *  `tz`. Interpolates the signed velocity between MAX_SLACK events (cosine).
 *  Returns null on any failure. */
export async function fetchCurrentPredictions(station: string, tz: string, now = new Date()): Promise<CurrentState | null> {
  try {
    const hp = zonedParts(now, tz);
    const base = new Date(Date.UTC(hp.y, hp.mo - 1, hp.d, 12));
    const begin = new Date(base.getTime() - 86400000);
    const end = new Date(base.getTime() + 86400000);
    const r = await fetch(currentsUrl(station, ymdCompact(begin), ymdCompact(end)), {
      headers: { Accept: "application/json" },
    });
    if (!r.ok) return null;
    const j = await r.json();
    const cp: CpEntry[] | undefined = j?.current_predictions?.cp;
    if (!Array.isArray(cp) || cp.length < 2) return null;
    const floodDir = Number(cp[0]?.meanFloodDir);
    const ebbDir = Number(cp[0]?.meanEbbDir);
    const events = cp
      .map((e) => ({ t: String(e.Time), min: parsePredMin(String(e.Time)), v: Number(e.Velocity_Major), type: String(e.Type) }))
      .filter((e) => Number.isFinite(e.v) && Number.isFinite(e.min))
      .sort((a, b) => a.min - b.min);
    if (events.length < 2) return null;

    const refNow = naiveMin(hp.y, hp.mo, hp.d, hp.h, hp.mi);
    let prev: (typeof events)[number] | null = null;
    let next: (typeof events)[number] | null = null;
    for (const e of events) {
      if (e.min <= refNow) prev = e;
      else {
        next = e;
        break;
      }
    }
    let vNow: number;
    if (prev && next) {
      const span = next.min - prev.min;
      const frac = span > 0 ? (refNow - prev.min) / span : 0;
      vNow = next.v + (prev.v - next.v) * ((1 + Math.cos(Math.PI * frac)) / 2);
    } else {
      vNow = (prev ?? next!).v;
    }

    const speed = Math.abs(vNow);
    let stateText: CurrentState["stateText"];
    let dirCardinal: string | null = null;
    if (speed < 0.2) {
      stateText = "Slack";
    } else if (vNow > 0) {
      stateText = "Flooding";
      dirCardinal = Number.isFinite(floodDir) ? compass(floodDir) : null;
    } else {
      stateText = "Ebbing";
      dirCardinal = Number.isFinite(ebbDir) ? compass(ebbDir) : null;
    }

    let nextText: string | null = null;
    if (next) {
      nextText =
        next.type === "slack"
          ? `slack at ${predTimeText(next.t)}`
          : `max ${next.type} ${Math.abs(next.v).toFixed(1)} kt at ${predTimeText(next.t)}`;
    }

    const todayYMD = `${hp.y}-${String(hp.mo).padStart(2, "0")}-${String(hp.d).padStart(2, "0")}`;
    const todays = events.filter((e) => e.t.startsWith(todayYMD));
    const peakKt = todays.length ? Math.max(...todays.map((e) => Math.abs(e.v))) : null;

    return { stateText, speedKt: speed, dirCardinal, peakKt, nextText };
  } catch {
    return null;
  }
}
