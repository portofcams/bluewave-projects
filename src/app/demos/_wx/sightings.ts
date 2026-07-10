// Shared live-data library for BlueWave demos — WHALE SIGHTINGS (Salish Sea).
//
// Live community-reported whale sightings from Acartia — the open Salish Sea
// sightings data cooperative. Verified keyless + CORS (Access-Control-Allow-
// Origin: * on GET and preflight), so it's browser-fetchable directly (no
// proxy). Rolling ~7-day window.
//
// RESPONSIBLE-VIEWING DESIGN: sightings are COMMUNITY-REPORTED, APPROXIMATE,
// and DELAYED — never real-time telemetry. We deliberately do NOT plot precise
// live whale positions on a public map (publishing exact orca GPS draws traffic
// and cuts against "give them space" — the reason the mariner Whale Report
// Alert System is gated). Consumers should show a COARSE-AREA + relative-time
// LIST, not pins. `coarseArea()` maps a position to a broad named zone.
//
// ⚠️ Acartia returns lat/lon/no_sighted as MIXED string-or-number — coerce.
// Framework-agnostic (no "use client"); the hook is in ./live.

import type { Bbox } from "./ais";

export type Sighting = {
  species: string; // normalized label, e.g. "Orca", "Humpback"
  count: number | null;
  lat: number;
  lon: number;
  created: string; // raw UTC "YYYY-MM-DD HH:MM:SS"
  ageMin: number; // minutes since `created`
  area: string; // coarse named zone (NOT a precise point)
  trusted: boolean;
};

export const ACARTIA_URL = "https://acartia.io/api/v1/sightings/current";

const num = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : typeof v === "string" ? parseFloat(v) : NaN;
  return Number.isFinite(n) ? n : null;
};

/** Normalize Acartia's inconsistent species buckets to a clean label. */
export function speciesLabel(raw: unknown): string {
  const s = String(raw ?? "").trim().toLowerCase();
  if (!s || s === "unspecified") return "Whale (unspecified)";
  if (s.includes("orca") || s.includes("killer")) return "Orca";
  if (s.includes("humpback")) return "Humpback";
  if (s.includes("gray")) return "Gray whale";
  if (s.includes("minke")) return "Minke";
  if (s.includes("fin")) return "Fin whale";
  if (s.includes("blue")) return "Blue whale";
  if (s.includes("porpoise")) return "Porpoise";
  if (s.includes("dolphin")) return "Dolphin";
  if (s.includes("sea lion") || s.includes("seal")) return "Pinniped";
  return String(raw).trim();
}

/** Broad, deliberately-coarse named zone for a Salish Sea / San Juan position —
 *  we name an AREA, never a precise point. */
export function coarseArea(lat: number, lon: number): string {
  if (lon < -123.15) return "Haro Strait";
  if (lat > 48.6) return "Boundary Pass area";
  if (lon > -123.0 && lat > 48.5) return "San Juan Channel";
  if (lat < 48.45) return "Cattle Point area";
  return "San Juan Islands";
}

const relAge = (ageMin: number): string => {
  if (ageMin < 60) return `${Math.max(1, Math.round(ageMin))} min ago`;
  const h = ageMin / 60;
  if (h < 24) return `${Math.round(h)} hr ago`;
  return `${Math.round(h / 24)} d ago`;
};
export const sightingAgeText = relAge;

/** Fetch recent sightings, filtered to `bbox` and to `maxAgeHours` (default 48),
 *  newest first, capped. Returns null on any failure. */
export async function fetchSightings(
  bbox: Bbox,
  opts: { maxAgeHours?: number; cap?: number; now?: number } = {}
): Promise<Sighting[] | null> {
  const { maxAgeHours = 48, cap = 12, now = Date.now() } = opts;
  try {
    const r = await fetch(ACARTIA_URL, { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const arr = await r.json();
    if (!Array.isArray(arr)) return null;
    const out: Sighting[] = [];
    for (const s of arr) {
      const lat = num(s?.latitude);
      const lon = num(s?.longitude);
      if (lat == null || lon == null) continue;
      if (lat < bbox.latMin || lat > bbox.latMax || lon < bbox.lonMin || lon > bbox.lonMax) continue;
      const created = String(s?.created ?? "");
      const t = new Date(created.replace(" ", "T") + "Z");
      if (Number.isNaN(t.getTime())) continue;
      const ageMin = (now - t.getTime()) / 60000;
      if (ageMin < 0 || ageMin > maxAgeHours * 60) continue;
      out.push({
        species: speciesLabel(s?.type),
        count: num(s?.no_sighted),
        lat,
        lon,
        created,
        ageMin,
        area: coarseArea(lat, lon),
        trusted: s?.trusted === 1 || s?.trusted === "1" || s?.trusted === true,
      });
    }
    out.sort((a, b) => a.ageMin - b.ageMin);
    return out.slice(0, cap);
  } catch {
    return null;
  }
}
