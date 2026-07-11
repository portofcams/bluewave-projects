// Shared live-data library for BlueWave demos — AURORA (NOAA SWPC space
// weather).
//
// Keyless, CORS-enabled feeds from NOAA's Space Weather Prediction Center
// (verified 2026-07-10, Access-Control-Allow-Origin: * on both):
//   - Planetary Kp index, OBSERVED + ESTIMATED + PREDICTED in one series —
//       https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json
//     3-hourly cadence, ~81 rows spanning several days back through ~3.5 days
//     forward. Each row's `observed` field is "observed" | "estimated" |
//     "predicted"; `noaa_scale` is "G1".."G5" or null below storm level.
//   - OVATION Prime aurora probability grid —
//       https://services.swpc.noaa.gov/json/ovation_aurora_latest.json
//     A ~1°-resolution global grid: `coordinates` is an array of
//     [lon (0-360°E), lat (-90..90), probability (0-100)] triples, ~65k
//     points, ~900KB. That payload size means callers should poll this far
//     less often than the small feeds (e.g. every 10-15 min, not every 5).
//
// A geomagnetic storm being IN PROGRESS is necessary but not sufficient to
// SEE the aurora — you also need real darkness (see _wx/solar.ts's
// zenith-parameterized helpers) and clear sky (see _wx/nws.ts). Fairbanks in
// particular can show real activity in July and still be unviewable, because
// the sky never reaches nautical twilight that time of year. `auroraVerdict`
// below exists specifically to surface that gap instead of hiding it — a
// tourist page that only prints "Kp 5!" without the darkness gate overpromises
// exactly the thing this portfolio never does.
//
// Framework-agnostic (no "use client"); demos fetch these from their own
// useEffect (this module intentionally has no auto-refreshing hook — see the
// payload-size note above, which makes a one-size-fits-all interval wrong).

const KP_FORECAST_URL = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json";
const OVATION_URL = "https://services.swpc.noaa.gov/json/ovation_aurora_latest.json";

export type KpPhase = "observed" | "estimated" | "predicted";
export type KpPoint = {
  time: Date;
  kp: number;
  phase: KpPhase;
  noaaScale: string | null; // "G1".."G5" or null below storm level
};

export type KpSummary = {
  points: KpPoint[]; // full observed+forecast series, chronological
  now: KpPoint | null; // latest observed/estimated point
  peak3Day: KpPoint | null; // highest PREDICTED point in the forecast horizon
};

/** Fetch the observed+forecast Kp series and summarize it. Returns null on
 *  any failure or an empty/unusable payload. */
export async function fetchKpSummary(): Promise<KpSummary | null> {
  try {
    const r = await fetch(KP_FORECAST_URL, { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const j = await r.json();
    if (!Array.isArray(j) || !j.length) return null;

    const points: KpPoint[] = j
      .map((row: { time_tag?: unknown; kp?: unknown; observed?: unknown; noaa_scale?: unknown }) => {
        const time = new Date(`${String(row.time_tag)}Z`);
        const kp = Number(row.kp);
        const phase: KpPhase =
          row.observed === "predicted" ? "predicted" : row.observed === "estimated" ? "estimated" : "observed";
        return { time, kp, phase, noaaScale: (row.noaa_scale as string | null) ?? null };
      })
      .filter((p) => Number.isFinite(p.kp) && !Number.isNaN(p.time.getTime()))
      .sort((a, b) => a.time.getTime() - b.time.getTime());
    if (!points.length) return null;

    const observedOrEstimated = points.filter((p) => p.phase !== "predicted");
    const now = observedOrEstimated.length ? observedOrEstimated[observedOrEstimated.length - 1] : null;

    const predicted = points.filter((p) => p.phase === "predicted");
    const peak3Day = predicted.length
      ? predicted.reduce((best, p) => (p.kp > best.kp ? p : best), predicted[0])
      : null;

    return { points, now, peak3Day };
  } catch {
    return null;
  }
}

export type OvationPoint = {
  lon360: number;
  lat: number;
  probability: number; // 0-100
  observedAt: Date | null;
};

/** Fetch the OVATION aurora probability grid and return the nearest ~1° grid
 *  point to (lat, lon360). Returns null on any failure. See the module note
 *  above on payload size / refresh cadence. */
export async function fetchAuroraProbability(lat: number, lon360: number): Promise<OvationPoint | null> {
  try {
    const r = await fetch(OVATION_URL, { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const j = await r.json();
    const coords: [number, number, number][] | undefined = j?.coordinates;
    if (!Array.isArray(coords) || !coords.length) return null;

    let best = coords[0];
    let bestDist = Infinity;
    for (const c of coords) {
      const d = (c[0] - lon360) ** 2 + (c[1] - lat) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = c;
      }
    }
    const observedAt = typeof j["Observation Time"] === "string" ? new Date(j["Observation Time"]) : null;
    return {
      lon360: best[0],
      lat: best[1],
      probability: best[2],
      observedAt: observedAt && !Number.isNaN(observedAt.getTime()) ? observedAt : null,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Honest combined verdict
// ---------------------------------------------------------------------------
export type AuroraLevel = "gap" | "daylight" | "low" | "moderate" | "good" | "high";
export type AuroraVerdict = { level: AuroraLevel; headline: string; detail: string };

/**
 * Combine aurora probability + Kp + real darkness (+ sky, if known) into one
 * honest read. `inNoDarknessGap` is the high-latitude-summer case where the
 * sky never reaches nautical twilight at all that day — Fairbanks specifically
 * doesn't clear that bar again until roughly mid-August (computed live via
 * _wx/solar.ts, not hardcoded here).
 */
export function auroraVerdict(opts: {
  isDark: boolean;
  inNoDarknessGap: boolean;
  nextDarkCapableDate: Date | null; // meaningful only when inNoDarknessGap
  nextDarkEvent: { at: Date; type: "rise" | "set" } | null; // next transition either way
  probability: number | null;
  kpNow: number | null;
  skyClear: boolean | null; // null = unknown
  tz: string;
}): AuroraVerdict {
  const { isDark, inNoDarknessGap, nextDarkCapableDate, nextDarkEvent, probability, kpNow, skyClear, tz } = opts;

  const kpText = kpNow != null ? ` · Kp ${kpNow.toFixed(1)}` : "";
  const dateText = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: tz });
  const timeText = (d: Date) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz });

  if (inNoDarknessGap) {
    return {
      level: "gap",
      headline: "Too bright to see it right now",
      detail:
        nextDarkCapableDate != null
          ? `Fairbanks doesn't get dark enough for aurora viewing this time of year. The sky won't reach real darkness again until around ${dateText(
              nextDarkCapableDate
            )}${probability != null ? ` — even though modeled activity here already reads ${probability}%${kpText}` : ""}.`
          : `Fairbanks doesn't get dark enough for aurora viewing this time of year.`,
    };
  }

  if (!isDark) {
    return {
      level: "daylight",
      headline: "Not dark yet",
      detail:
        nextDarkEvent != null
          ? `Sky reaches nautical darkness at ${timeText(nextDarkEvent.at)}${
              probability != null ? ` · modeled activity here right now is ${probability}%${kpText}` : ""
            }.`
          : `The sky isn't dark enough yet.`,
    };
  }

  const p = probability ?? 0;
  const cloudy = skyClear === false;
  const untilText = nextDarkEvent != null ? ` until ${timeText(nextDarkEvent.at)}` : "";
  const cloudNote = cloudy ? " — clouds may block the view" : "";

  if (p < 10) {
    return {
      level: "low",
      headline: "Low chance tonight",
      detail: `Dark${untilText}, but modeled aurora activity here is only ${p}%${kpText}${cloudy ? " and skies are cloudy" : ""}.`,
    };
  }
  if (p < 30) {
    return {
      level: "moderate",
      headline: cloudy ? "Some activity, but clouded over" : "Worth stepping outside",
      detail: `${p}% modeled chance overhead${kpText}${cloudNote}, dark${untilText}.`,
    };
  }
  if (p < 60) {
    return {
      level: "good",
      headline: cloudy ? "Active, but clouded over" : "Good chance tonight",
      detail: `${p}% modeled chance overhead${kpText}${cloudNote}, dark${untilText}.`,
    };
  }
  return {
    level: "high",
    headline: cloudy ? "Storm-level activity — but clouded over" : "High chance — storm-level activity",
    detail: `${p}% modeled chance overhead${kpText}${cloudNote}, dark${untilText}.`,
  };
}
