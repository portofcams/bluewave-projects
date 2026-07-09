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

export function swanWavesUrl(lat = SWAN_LAT, lon360 = SWAN_LON360, now = new Date()): string {
  const ts = currentUtcHourIso(now);
  // %5B = "[", %5D = "]"; depth dim left empty ([]) to take all depths.
  const sub = `%5B(${ts})%5D%5B%5D%5B(${lat})%5D%5B(${lon360})%5D`;
  const query = ["shgt", "pper", "mper", "mdir"].map((v) => v + sub).join(",");
  return `https://pae-paha.pacioos.hawaii.edu/erddap/griddap/swan_oahu.json?${query}`;
}

/** Fetch the modeled nearshore wave state. Returns null on any failure/NaN. */
export async function fetchSwanWaves(
  lat = SWAN_LAT,
  lon360 = SWAN_LON360,
  now = new Date()
): Promise<SwanWaves | null> {
  try {
    const r = await fetch(swanWavesUrl(lat, lon360, now), { headers: { Accept: "application/json" } });
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
