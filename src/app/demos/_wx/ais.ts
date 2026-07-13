// Shared live-data library for BlueWave demos — AIS vessel positions.
//
// Live vessel positions (AIS) have NO keyless CORS source, so this reads from a
// small self-hosted PROXY (a FastAPI route on the ai-app box that holds an
// aisstream.io key, subscribes to a bounding box over WebSocket, and serves the
// latest position per vessel as CORS-enabled JSON). This module owns the SHAPE
// the demo consumes — the proxy conforms to it — so the demo works against the
// proxy without knowing aisstream's wire format.
//
// HONESTY: when the proxy is unreachable (not yet deployed / no key), the demo
// shows a clearly-labeled ANIMATED SAMPLE fleet from makeSampleFleet() — never
// presented as live. When live, it shows REAL vessels transmitting AIS in the
// box (public data), honestly labeled as area traffic, not "our fleet."
//
// Framework-agnostic (no "use client"); the auto-refreshing hook is in ./live.

export type VesselType = "fishing" | "passenger" | "cargo" | "tanker" | "pleasure" | "other";

export type Vessel = {
  mmsi: number;
  name: string | null;
  lat: number;
  lon: number;
  sog: number | null; // speed over ground, knots
  cog: number | null; // course over ground, degrees
  heading: number | null; // true heading, degrees
  type: VesselType;
  status: string | null; // navigational status text
  updated: string | null; // ISO timestamp of last report
};

export type Bbox = { latMin: number; latMax: number; lonMin: number; lonMax: number };

// Proxy endpoint (see infra/ais-proxy/ais_proxy.py). The proxy is multi-region
// (subscribes to several bounding boxes and filters by ?region=), so each demo
// passes its region. Not yet deployed → fetch fails → demo falls back to the
// honest labeled sample.
export const AIS_PROXY_BASE = "https://ai.portofcams.com/marine/ais";
export const aisProxyUrl = (region?: string) =>
  region ? `${AIS_PROXY_BASE}?region=${encodeURIComponent(region)}` : AIS_PROXY_BASE;
// Back-compat default (no region filter).
export const AIS_PROXY_URL = AIS_PROXY_BASE;

// AIS ship-type code → coarse category (used if the proxy sends raw codes).
export function vesselTypeFromCode(code: number | null | undefined): VesselType {
  if (code == null) return "other";
  if (code === 30) return "fishing";
  if (code >= 60 && code <= 69) return "passenger";
  if (code >= 70 && code <= 79) return "cargo";
  if (code >= 80 && code <= 89) return "tanker";
  if (code === 36 || code === 37) return "pleasure";
  return "other";
}

type RawVessel = {
  mmsi?: number;
  name?: string | null;
  lat?: number;
  lon?: number;
  sog?: number | null;
  cog?: number | null;
  heading?: number | null;
  type?: VesselType | number | null;
  status?: string | null;
  updated?: string | null;
};

/** Fetch current vessels from the proxy. Returns null ONLY on a genuine
 *  failure — unreachable proxy, bad status, or a response that isn't even
 *  shaped like a vessel list. A well-formed response with zero vessels
 *  (genuinely quiet water right now) returns `[]`, NOT null — those are two
 *  different real states, and collapsing them into one made a working,
 *  currently-empty feed indistinguishable from a broken one: both showed the
 *  same animated sample fleet. Callers that want "is this actually live"
 *  should check for `!== null`, not truthiness. */
export async function fetchAisVessels(url = AIS_PROXY_URL): Promise<Vessel[] | null> {
  try {
    const r = await fetch(url, { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const j = await r.json();
    const raw: RawVessel[] = Array.isArray(j) ? j : j?.vessels;
    if (!Array.isArray(raw)) return null;
    const vessels = raw
      .filter((v) => typeof v.lat === "number" && typeof v.lon === "number" && typeof v.mmsi === "number")
      .map((v) => ({
        mmsi: v.mmsi as number,
        name: v.name ?? null,
        lat: v.lat as number,
        lon: v.lon as number,
        sog: typeof v.sog === "number" ? v.sog : null,
        cog: typeof v.cog === "number" ? v.cog : null,
        heading: typeof v.heading === "number" ? v.heading : null,
        type: typeof v.type === "number" ? vesselTypeFromCode(v.type) : (v.type as VesselType) ?? "other",
        status: v.status ?? null,
        updated: v.updated ?? null,
      }));
    return vessels;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Honest SAMPLE fleet — a fixed set of clearly-fictional vessels that drift
// deterministically by `tick` (so the map animates without Math.random, keeping
// SSR/hydration stable). ALWAYS badged "Sample" in the UI; never shown as live.
// ---------------------------------------------------------------------------
type SampleSeed = { name: string; type: VesselType; u: number; v: number; sog: number; cog: number; status: string; drift: number };

const SAMPLE_SEEDS: SampleSeed[] = [
  { name: "Sample vessel A", type: "fishing", u: 0.34, v: 0.42, sog: 7.2, cog: 118, status: "Underway", drift: 0.9 },
  { name: "Sample vessel B", type: "fishing", u: 0.58, v: 0.55, sog: 0.4, cog: 210, status: "On grounds", drift: 0.15 },
  { name: "Sample vessel C", type: "fishing", u: 0.7, v: 0.3, sog: 8.6, cog: 300, status: "Underway", drift: 1.0 },
  { name: "Sample vessel D", type: "passenger", u: 0.24, v: 0.66, sog: 12.0, cog: 45, status: "Underway", drift: 1.1 },
  { name: "Area passenger boat", type: "passenger", u: 0.48, v: 0.24, sog: 18.1, cog: 250, status: "Underway", drift: 1.4 },
  { name: "Area vessel", type: "other", u: 0.82, v: 0.6, sog: 3.0, cog: 160, status: "Underway", drift: 0.5 },
  { name: "In harbor", type: "fishing", u: 0.16, v: 0.2, sog: 0.0, cog: 0, status: "Moored", drift: 0 },
];

/** Deterministic animated sample fleet within `bbox`, parameterized by tick. */
export function makeSampleFleet(bbox: Bbox, tick: number): Vessel[] {
  const latSpan = bbox.latMax - bbox.latMin;
  const lonSpan = bbox.lonMax - bbox.lonMin;
  return SAMPLE_SEEDS.map((s, i) => {
    // gentle looping drift so pips move without leaving the box
    const phase = tick * 0.06 + i;
    const du = s.drift * 0.04 * Math.cos(phase);
    const dv = s.drift * 0.04 * Math.sin(phase * 0.8);
    const u = Math.min(0.96, Math.max(0.04, s.u + du));
    const v = Math.min(0.96, Math.max(0.04, s.v + dv));
    return {
      mmsi: 900000000 + i, // clearly-synthetic MMSI range
      name: s.name,
      lat: bbox.latMin + v * latSpan,
      lon: bbox.lonMin + u * lonSpan,
      sog: s.sog,
      cog: s.sog > 0.5 ? (s.cog + Math.round(6 * Math.sin(phase))) % 360 : s.cog,
      heading: s.cog,
      type: s.type,
      status: s.status,
      updated: null,
    };
  });
}

/** Project a lat/lon to x/y within a w×h box for the stylized chart (simple
 *  equirectangular fit; the demo's map is a stylized chart, not a survey). */
export function projectToXY(lat: number, lon: number, bbox: Bbox, w: number, h: number) {
  const x = ((lon - bbox.lonMin) / (bbox.lonMax - bbox.lonMin)) * w;
  const y = (1 - (lat - bbox.latMin) / (bbox.latMax - bbox.latMin)) * h; // north = up
  return { x, y };
}

export const VESSEL_LABEL: Record<VesselType, string> = {
  fishing: "Fishing / charter",
  passenger: "Passenger",
  cargo: "Cargo",
  tanker: "Tanker",
  pleasure: "Pleasure",
  other: "Other",
};
