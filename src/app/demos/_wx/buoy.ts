// Shared live-data library for BlueWave demos — real NDBC BUOY observations.
//
// PacIOOS SWAN (marine.ts's fetchSwanWaves) is a wave MODEL — useful, but not a
// measurement. This module fetches the actual latest NDBC buoy reading via an
// existing CORS-enabled relay already running on the shared ai-app box (built
// for a different project; verified 2026-07-11 that it already allows the
// bluewaveprojects.com origin via the box's CORSMiddleware allowlist, so no
// new deploy was needed for this):
//
//     https://ai.portofcams.com/api/weather/buoy/{station}
//
// NDBC's own feed (https://www.ndbc.noaa.gov/data/realtime2/<station>.txt) has
// NO CORS headers itself (verified) — this relay is what makes a browser fetch
// possible without standing up a second proxy.
//
// Stations used by BlueWave demos:
//   51211 — Mamala Bay (south shore Oahu, off Waikiki)
//   51201 — Waimea Bay (north shore Oahu)
//
// The relay's response shape is a flat dict of RAW NDBC header abbreviations,
// all strings, "MM" meaning "sensor not reporting" (confusingly, "MM" is ALSO
// the literal key for the month field — a key/value coincidence, not a bug).
// This module is what turns that raw shape into a clean, typed, honest read.
//
// Framework-agnostic (no "use client"); the auto-refreshing hook is in ./live.

export type BuoyObservation = {
  station: string;
  time: Date | null;
  waveHeightM: number | null;
  dominantPeriodS: number | null;
  avgPeriodS: number | null;
  waveDirDeg: number | null;
  waterTempC: number | null;
};

const BUOY_PROXY_URL = (station: string) => `https://ai.portofcams.com/api/weather/buoy/${station}`;

function numOrNull(v: string | undefined): number | null {
  if (v == null || v === "MM" || v === "--") return null;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

/** Fetch the latest real NDBC buoy observation for a station via the relay.
 *  Returns null on any failure — unreachable relay, unknown station, or an
 *  empty/error payload. Never fabricates a reading. */
export async function fetchBuoyObservation(station: string): Promise<BuoyObservation | null> {
  try {
    const r = await fetch(BUOY_PROXY_URL(station), { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const j = await r.json();
    const d: Record<string, string> | undefined = j?.data;
    if (!d || j?.error) return null;

    let time: Date | null = null;
    const y = d["#YY"], mo = d["MM"], dy = d["DD"], hh = d["hh"], mi = d["mm"];
    if (y && mo && dy && hh && mi) {
      const dt = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(dy), Number(hh), Number(mi)));
      if (!Number.isNaN(dt.getTime())) time = dt;
    }

    return {
      station,
      time,
      waveHeightM: numOrNull(d["WVHT"]),
      dominantPeriodS: numOrNull(d["DPD"]),
      avgPeriodS: numOrNull(d["APD"]),
      waveDirDeg: numOrNull(d["MWD"]),
      waterTempC: numOrNull(d["WTMP"]),
    };
  } catch {
    return null;
  }
}
