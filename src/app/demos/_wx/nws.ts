// Shared live-data library for BlueWave demos — NWS (National Weather Service).
//
// A live METAR/observation decoder for api.weather.gov station observations —
// keyless and CORS-enabled (Access-Control-Allow-Origin: *), so a plain browser
// fetch works. Extracted, unchanged in behavior, from the aviation/marine demo
// conditions panels so every demo decodes the same way.
//
// `decodeNwsObservation` returns BOTH raw numbers (for domain math like density
// altitude or a marine "sea read") AND pilot/guest-friendly formatted strings,
// so each demo formats to its audience (knots vs mph) without re-deriving.
//
// Framework-agnostic (no "use client"); safe to import anywhere. The React
// hook that fetches + auto-refreshes lives in ./live.

// ---- unit converters -------------------------------------------------------
export const cToF = (c: number) => Math.round((c * 9) / 5 + 32);
export const kmhToKt = (kmh: number) => Math.round(kmh / 1.852);
export const kmhToMph = (kmh: number) => Math.round(kmh / 1.60934);
export const mToSM = (m: number) => m / 1609.344;
export const mToMi = (m: number) => m / 1609.344;
export const mToFt = (m: number) => m * 3.28084;
export const paToInHg = (pa: number) => pa / 3386.389;

const DIRS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
export const compass = (deg: number) => DIRS[Math.round(deg / 22.5) % 16];

export const COVER_LABEL: Record<string, string> = {
  SKC: "Sky clear",
  CLR: "Clear",
  CAVOK: "Clear (CAVOK)",
  NCD: "No cloud",
  FEW: "Few",
  SCT: "Scattered",
  BKN: "Broken",
  OVC: "Overcast",
  OVX: "Obscured",
};

// ---- NWS observation shape (only the fields we read; all numerics nullable) --
export type NwsValue = { value?: number | null } | null | undefined;
export type NwsCloudLayer = { base?: { value?: number | null } | null; amount?: string | null };
export type NwsProps = {
  timestamp?: string | null; // ISO
  textDescription?: string | null;
  rawMessage?: string | null; // transmitted METAR, or "" at some stations
  temperature?: NwsValue; // °C
  dewpoint?: NwsValue; // °C
  windDirection?: NwsValue; // degrees
  windSpeed?: NwsValue; // km/h
  windGust?: NwsValue; // km/h
  visibility?: NwsValue; // meters
  barometricPressure?: NwsValue; // Pascals
  relativeHumidity?: NwsValue; // % — not surfaced by decodeNwsObservation; read directly for the one demo (Denali) that needs it
  cloudLayers?: NwsCloudLayer[] | null;
};

export const numOrNull = (v: NwsValue): number | null =>
  v != null && typeof v.value === "number" ? v.value : null;

// ---- decoded observation ---------------------------------------------------
export type NwsObservation = {
  // raw numeric fields (nullable) for domain math
  windDeg: number | null;
  windKt: number | null;
  windMph: number | null;
  gustKt: number | null;
  gustMph: number | null;
  visSM: number | null;
  ceilFt: number | null; // lowest BKN/OVC base; null = no ceiling
  tempC: number | null;
  dewC: number | null;
  altimInHg: number | null;
  // formatted, audience-neutral strings
  windTextKt: string; // "220° at 6 kt gust 12 kt" / "Calm"
  windTextMph: string; // "SW 9 mph" / "Calm"
  visText: string; // "10 SM"
  skyText: string; // "Broken 6,000 ft, Overcast 8,500 ft" / "Clear"
  tempText: string; // "12°C / 54°F"
  dewText: string;
  altimText: string; // "29.96 inHg"
  raw: string; // transmitted METAR, or one assembled from live fields
  rawAssembled: boolean; // true when `raw` was composed (rawMessage empty)
  obsAt: Date | null; // observation timestamp
  obsTimeText: string; // "11:25 AM AKDT" (formatted in `tz`) or "—"
  // NWS's free-text summary (e.g. "Light Rain", "Mostly Cloudy"). Cloud-cover
  // codes (SKC/FEW/SCT/BKN/OVC) never encode precipitation, so a demo whose
  // heuristic needs to detect rain/snow (not just ceiling/visibility) needs
  // this raw field, not just the derived `skyText`.
  textDescription: string | null;
};

/** Compose a valid METAR string from live decoded fields (used when the
 *  station's transmitted rawMessage is empty — e.g. PAVD). Still live data,
 *  just re-assembled into standard METAR wording; every group is guarded. */
export function composeMetar(p: NwsProps, station: string): string | null {
  const groups: string[] = [station];
  if (p.timestamp) {
    const dt = new Date(p.timestamp);
    if (!Number.isNaN(dt.getTime())) {
      const dd = String(dt.getUTCDate()).padStart(2, "0");
      const hh = String(dt.getUTCHours()).padStart(2, "0");
      const mm = String(dt.getUTCMinutes()).padStart(2, "0");
      groups.push(`${dd}${hh}${mm}Z`);
    }
  }
  const wspdKmh = numOrNull(p.windSpeed);
  if (wspdKmh != null) {
    const kt = kmhToKt(wspdKmh);
    if (kt === 0) groups.push("00000KT");
    else {
      const wdir = numOrNull(p.windDirection);
      const dir = wdir != null ? String(Math.round(wdir) % 360).padStart(3, "0") : "VRB";
      const spd = String(kt).padStart(2, "0");
      const gustKmh = numOrNull(p.windGust);
      const gustKt = gustKmh != null ? kmhToKt(gustKmh) : null;
      const gust = gustKt != null && gustKt > kt ? `G${String(gustKt).padStart(2, "0")}` : "";
      groups.push(`${dir}${spd}${gust}KT`);
    }
  }
  const visM = numOrNull(p.visibility);
  if (visM != null) groups.push(`${Math.max(0, Math.round(mToSM(visM)))}SM`);
  const layers = Array.isArray(p.cloudLayers) ? p.cloudLayers : [];
  const skyGroups = layers
    .filter((l) => l.amount && typeof l.base?.value === "number")
    .map((l) => ({ amt: l.amount as string, hundreds: Math.round(mToFt(l.base!.value as number) / 100) }))
    .sort((a, b) => a.hundreds - b.hundreds)
    .map((l) => `${l.amt}${String(l.hundreds).padStart(3, "0")}`);
  if (skyGroups.length) groups.push(...skyGroups);
  else if (layers.length === 0) groups.push("CLR");
  const tempC = numOrNull(p.temperature);
  const dewC = numOrNull(p.dewpoint);
  if (tempC != null && dewC != null) {
    const f = (c: number) => `${c < 0 ? "M" : ""}${String(Math.abs(Math.round(c))).padStart(2, "0")}`;
    groups.push(`${f(tempC)}/${f(dewC)}`);
  }
  const paVal = numOrNull(p.barometricPressure);
  if (paVal != null) {
    const inHg = paToInHg(paVal);
    if (!Number.isNaN(inHg)) groups.push(`A${String(Math.round(inHg * 100)).padStart(4, "0")}`);
  }
  return groups.length > 1 ? groups.join(" ") : null;
}

/** Aviation flight category from ceiling (ft) + visibility (SM). */
export function flightCategory(ceilFt: number | null, visSM: number | null): "VFR" | "MVFR" | "IFR" | "LIFR" {
  const lowC = (t: number) => ceilFt != null && ceilFt < t;
  const lowV = (t: number) => visSM != null && visSM < t;
  if (lowC(500) || lowV(1)) return "LIFR";
  if (lowC(1000) || lowV(3)) return "IFR";
  if (lowC(3000) || lowV(5)) return "MVFR";
  return "VFR";
}

/** Density altitude (ft) — the number that governs a STOL takeoff roll.
 *  PA = fieldElev + (29.92 − altimeter)·1000; ISA = 15 − 2·(PA/1000) °C;
 *  DA = PA + 120·(OAT − ISA). */
export function densityAltitude(tempC: number, altimInHg: number, fieldElevFt: number): number {
  const pressureAlt = fieldElevFt + (29.92 - altimInHg) * 1000;
  const isaTempC = 15 - 2 * (pressureAlt / 1000);
  return Math.round(pressureAlt + 120 * (tempC - isaTempC));
}

/** Friendly "conditions on the water" heuristic from ceiling (ft) + vis (mi).
 *  A trip-planning read, NOT a go/no-go. */
export function seaRead(ceilFt: number | null, visMi: number | null): "Good" | "Fair" | "Marginal" {
  const lowC = (t: number) => ceilFt != null && ceilFt < t;
  const lowV = (t: number) => visMi != null && visMi < t;
  if (lowC(1000) || lowV(3)) return "Marginal";
  if (lowC(3000) || lowV(6)) return "Fair";
  return "Good";
}

/** Wheel-choice read from live wind speed (mph) — a training-ride planning
 *  heuristic for a crosswind-prone course, not a rule. IRONMAN itself
 *  restricts disc wheels at Kona specifically because of its Queen K
 *  crosswinds, which is the real precedent this categorization follows. */
export function wheelRead(windMph: number): "Deep-section fine" | "Consider mid-depth" | "Spoked — mind the gusts" {
  if (windMph < 12) return "Deep-section fine";
  if (windMph < 20) return "Consider mid-depth";
  return "Spoked — mind the gusts";
}

/** Statute-miles visibility formatted for a non-aviation audience ("10+ mi"),
 *  as an alternative to the SM-suffixed `visText` on NwsObservation — used by
 *  the marine/tourism demos (vs. the aviation demos, which read `visText`
 *  directly). Same underlying `visSM` number either way, just the label a
 *  guest vs. a pilot expects. */
export function visTextMi(visSM: number | null): string {
  if (visSM == null) return "—";
  const shown = visSM >= 1 ? Math.round(visSM) : Math.round(visSM * 10) / 10;
  return `${shown}${visSM >= 10 ? "+" : ""} mi`;
}

// ---- raw METAR fallback parsing --------------------------------------------
// NWS's structured JSON fields (temperature.value, windSpeed.value, etc.) are
// intermittently null even when the station clearly transmitted a full METAR
// with the data embedded — verified 2026-07-12 across PHKO and PHNL, roughly
// every other hourly reading has this gap. When it happens, `rawMessage`
// usually still carries the real METAR text, so we parse it as a fallback
// rather than silently downgrade to "sample" for data the station actually
// reported. This benefits every demo using decodeNwsObservation, not just one.

function parseMetarWind(raw: string): { dir: number | null; speedKt: number; gustKt: number | null } | null {
  const m = raw.match(/\b(\d{3}|VRB)(\d{2,3})(?:G(\d{2,3}))?KT\b/);
  if (!m) return null;
  return {
    dir: m[1] === "VRB" ? null : Number(m[1]),
    speedKt: Number(m[2]),
    gustKt: m[3] ? Number(m[3]) : null,
  };
}

function parseMetarTempDew(raw: string): { tempC: number; dewC: number | null } | null {
  const m = raw.match(/\s(M?\d{2})\/(M?\d{2})?\b/);
  if (!m) return null;
  const conv = (t: string) => (t.startsWith("M") ? -Number(t.slice(1)) : Number(t));
  return { tempC: conv(m[1]), dewC: m[2] ? conv(m[2]) : null };
}

function parseMetarVisSM(raw: string): number | null {
  const m = raw.match(/\b(\d+(?:\/\d+)?)SM\b/);
  if (!m) return null;
  if (m[1].includes("/")) {
    const [a, b] = m[1].split("/").map(Number);
    return b ? a / b : null;
  }
  return Number(m[1]);
}

function parseMetarAltimeter(raw: string): number | null {
  const m = raw.match(/\bA(\d{4})\b/);
  return m ? Number(m[1]) / 100 : null;
}

function parseMetarClouds(raw: string): NwsCloudLayer[] | null {
  const matches = [...raw.matchAll(/\b(FEW|SCT|BKN|OVC)(\d{3})\b/g)];
  if (!matches.length) return null;
  return matches.map((m) => ({ amount: m[1], base: { value: Number(m[2]) * 100 * 0.3048 } }));
}

/** Fill any null structured fields using the station's own raw transmitted
 *  METAR, when present. Never overrides a real structured value — only fills
 *  gaps the NWS API itself left blank. */
function fillFromRawMetar(p: NwsProps): NwsProps {
  const raw = p.rawMessage?.trim();
  if (!raw) return p;
  const out: NwsProps = { ...p };

  if (numOrNull(p.windSpeed) == null) {
    const w = parseMetarWind(raw);
    if (w) {
      out.windSpeed = { value: w.speedKt * 1.852 }; // kt -> km/h
      if (w.dir != null) out.windDirection = { value: w.dir };
      if (w.gustKt != null) out.windGust = { value: w.gustKt * 1.852 };
    }
  }
  if (numOrNull(p.temperature) == null) {
    const td = parseMetarTempDew(raw);
    if (td) {
      out.temperature = { value: td.tempC };
      if (td.dewC != null && numOrNull(p.dewpoint) == null) out.dewpoint = { value: td.dewC };
    }
  }
  if (numOrNull(p.visibility) == null) {
    const visSM = parseMetarVisSM(raw);
    if (visSM != null) out.visibility = { value: visSM * 1609.344 };
  }
  if (numOrNull(p.barometricPressure) == null) {
    const inHg = parseMetarAltimeter(raw);
    if (inHg != null) out.barometricPressure = { value: inHg * 3386.389 };
  }
  if (!Array.isArray(p.cloudLayers) || !p.cloudLayers.length) {
    const clouds = parseMetarClouds(raw);
    if (clouds) out.cloudLayers = clouds;
  }
  return out;
}

/** Decode an NWS observation `properties` object into raw + formatted fields.
 *  `station` is the ICAO used when a METAR must be assembled from fields.
 *  `tz` formats the observation time; defaults to America/Anchorage. */
export function decodeNwsObservation(
  rawProps: NwsProps,
  station: string,
  tz = "America/Anchorage"
): NwsObservation {
  const p = fillFromRawMetar(rawProps);
  const transmitted = p.rawMessage && p.rawMessage.trim() ? p.rawMessage.trim() : null;

  const tempC = numOrNull(p.temperature);
  const dewC = numOrNull(p.dewpoint);
  const tempText = tempC != null ? `${Math.round(tempC)}°C / ${cToF(tempC)}°F` : "—";
  const dewText = dewC != null ? `${Math.round(dewC)}°C / ${cToF(dewC)}°F` : "—";

  const windDeg = numOrNull(p.windDirection);
  const wspdKmh = numOrNull(p.windSpeed);
  const gustKmh = numOrNull(p.windGust);
  const windKt = wspdKmh != null ? kmhToKt(wspdKmh) : null;
  const windMph = wspdKmh != null ? kmhToMph(wspdKmh) : null;
  const gustKt = gustKmh != null ? kmhToKt(gustKmh) : null;
  const gustMph = gustKmh != null ? kmhToMph(gustKmh) : null;

  let windTextKt = "—";
  let windTextMph = "—";
  if (windKt != null) {
    if (windKt === 0) {
      windTextKt = "Calm";
      windTextMph = "Calm";
    } else {
      const dirDeg = windDeg != null ? `${String(Math.round(windDeg)).padStart(3, "0")}°` : "—";
      const dirCard = windDeg != null ? compass(windDeg) : "—";
      windTextKt = `${dirDeg} at ${windKt} kt${gustKt != null ? ` gust ${gustKt} kt` : ""}`;
      windTextMph = `${dirCard} ${windMph} mph${gustMph != null ? ` g${gustMph}` : ""}`;
    }
  }

  let visSM: number | null = null;
  let visText = "—";
  const visM = numOrNull(p.visibility);
  if (visM != null) {
    visSM = mToSM(visM);
    const shown = visSM >= 1 ? Math.round(visSM) : Math.round(visSM * 10) / 10;
    visText = `${shown} SM`;
  }

  let skyText = "—";
  let ceilFt: number | null = null;
  const layers = Array.isArray(p.cloudLayers) ? p.cloudLayers : [];
  if (layers.length) {
    const parts = layers
      .filter((l) => l.amount)
      .map((l) => {
        const label = COVER_LABEL[l.amount ?? ""] ?? l.amount ?? "";
        const baseM = l.base?.value;
        const ft = typeof baseM === "number" ? Math.round(mToFt(baseM)) : null;
        return ft != null ? `${label} ${ft.toLocaleString()} ft` : label;
      });
    if (parts.length) skyText = parts.slice(0, 2).join(", ");
    const ceilCandidates = layers
      .filter((l) => (l.amount === "BKN" || l.amount === "OVC") && typeof l.base?.value === "number")
      .map((l) => Math.round(mToFt(l.base!.value as number)));
    if (ceilCandidates.length) ceilFt = Math.min(...ceilCandidates);
  } else {
    skyText = "Clear";
  }

  const paVal = numOrNull(p.barometricPressure);
  const altimInHg = paVal != null ? paToInHg(paVal) : null;
  const altimText = altimInHg != null ? `${altimInHg.toFixed(2)} inHg` : "—";

  let obsAt: Date | null = null;
  let obsTimeText = "—";
  if (p.timestamp) {
    const dt = new Date(p.timestamp);
    if (!Number.isNaN(dt.getTime())) {
      obsAt = dt;
      obsTimeText = dt.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: tz,
        timeZoneName: "short",
      });
    }
  }

  return {
    windDeg,
    windKt,
    windMph,
    gustKt,
    gustMph,
    visSM,
    ceilFt,
    tempC,
    dewC,
    altimInHg,
    windTextKt,
    windTextMph,
    visText,
    skyText: skyText === "—" && p.textDescription ? p.textDescription : skyText,
    tempText,
    dewText,
    altimText,
    raw: transmitted || composeMetar(p, station) || "—",
    rawAssembled: !transmitted,
    obsAt,
    obsTimeText,
    textDescription: p.textDescription ?? null,
  };
}

/** True when an NWS `properties` object carries usable observation data.
 *  `timestamp` alone does NOT count — every observation the API returns has
 *  one, even the ones where every actual field (temp, wind, sky...) is null
 *  (verified 2026-07-12: PHKO and PHNL both do this on roughly every other
 *  hourly reading). Counting a bare timestamp as "usable" meant a demo could
 *  badge a blank reading "Live" and show nothing but dashes — worse than the
 *  honest sample fallback it was supposed to avoid. Require an actual raw
 *  METAR or a real temperature/wind value instead. */
export function hasUsableObs(p: NwsProps | undefined | null): p is NwsProps {
  if (!p) return false;
  if (p.rawMessage && p.rawMessage.trim()) return true;
  if (numOrNull(p.temperature) != null) return true;
  if (numOrNull(p.windSpeed) != null) return true;
  return false;
}

export const nwsLatestUrl = (icao: string) =>
  `https://api.weather.gov/stations/${icao}/observations/latest`;

/** Client-side fetch of the latest observation `properties`. Returns null on
 *  any failure or empty payload (callers fall back to a labeled sample). Do NOT
 *  set a User-Agent header — browsers set their own and it's a forbidden header. */
export async function fetchNwsLatest(icao: string): Promise<NwsProps | null> {
  try {
    const r = await fetch(nwsLatestUrl(icao), { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const j = await r.json();
    const props: NwsProps | undefined = j?.properties;
    return hasUsableObs(props) ? props : null;
  } catch {
    return null;
  }
}

export const nwsRecentUrl = (icao: string, limit = 6) =>
  `https://api.weather.gov/stations/${icao}/observations?limit=${limit}`;

/** Fetch recent observations and return the freshest `properties` that carries
 *  usable data AND is no older than `maxAgeMs`. Some stations (verified PHNL and
 *  PHKO, 2026-07-21) transmit a COMPLETELY blank observation — no raw METAR, no
 *  structured fields — on roughly every other hourly cycle. `fetchNwsLatest`
 *  rightly rejects the blank latest, but a caller then drops straight to a
 *  labeled sample even though the PREVIOUS cycle (an hour back) carried a full,
 *  real reading. Reaching back one or two cycles to that reading is still honest
 *  live data as long as it's shown with its own observation time. Features come
 *  newest-first, so the first usable one within the window is the freshest real
 *  reading; if even that is too old, return null so the caller shows its sample
 *  rather than badge a stale reading "Live". This differs from `fillFromRawMetar`
 *  (which recovers a latest obs whose raw METAR is present but structured fields
 *  are null) — this recovers the case where the latest obs is blank entirely.
 *  Do NOT set a User-Agent header — browsers forbid it. */
export async function fetchNwsRecentUsable(
  icao: string,
  opts: { limit?: number; maxAgeMs?: number } = {}
): Promise<NwsProps | null> {
  // Default 3h: PHNL's usable cycles can be ~2h apart during a blank spell, so a
  // tighter window would drop to sample mid-spell. The reading's own obs time is
  // shown on the tile, so an older-but-real reading stays honest; past 3h we do
  // fall to the sample rather than badge a clearly-stale reading "Live".
  const { limit = 6, maxAgeMs = 3 * 60 * 60_000 } = opts;
  try {
    const r = await fetch(nwsRecentUrl(icao, limit), { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const j = await r.json();
    const feats: Array<{ properties?: NwsProps }> | undefined = j?.features;
    if (!Array.isArray(feats)) return null;
    const now = Date.now();
    for (const f of feats) {
      const p = f?.properties;
      if (!hasUsableObs(p)) continue;
      const ts = p.timestamp ? new Date(p.timestamp).getTime() : NaN;
      if (Number.isNaN(ts)) continue;
      // newest-first: the first usable reading is the freshest. Accept it only
      // within the window; anything older is worse, so fall to the sample.
      return now - ts <= maxAgeMs ? p : null;
    }
    return null;
  } catch {
    return null;
  }
}
