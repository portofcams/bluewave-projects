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

/** Decode an NWS observation `properties` object into raw + formatted fields.
 *  `station` is the ICAO used when a METAR must be assembled from fields.
 *  `tz` formats the observation time; defaults to America/Anchorage. */
export function decodeNwsObservation(
  p: NwsProps,
  station: string,
  tz = "America/Anchorage"
): NwsObservation {
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
  };
}

/** True when an NWS `properties` object carries usable observation data. */
export function hasUsableObs(p: NwsProps | undefined | null): p is NwsProps {
  return !!(
    p &&
    (p.rawMessage || p.timestamp || (p.temperature && p.temperature.value != null))
  );
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
