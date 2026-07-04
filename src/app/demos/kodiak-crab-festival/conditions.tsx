"use client";

// LIVE "KODIAK RIGHT NOW" CONDITIONS panel — the showpiece of the Kodiak
// Crab Festival sample site.
//
// HONESTY CONTRACT (mirrors alaska-rainbow-lodge/conditions.tsx):
//   - We attempt a LIVE observation fetch, client-side, from the National
//     Weather Service public API for Kodiak Airport (ICAO PADQ):
//       https://api.weather.gov/stations/PADQ/observations/latest
//     This endpoint needs no API key AND is CORS-enabled (it returns
//     `access-control-allow-origin: *`), so a plain browser fetch works. When
//     the fetch succeeds and the browser reads the response, every decoded
//     field is badged "Live · NWS" and stamped with the observation time.
//   - If the fetch errors, or the response has no usable data, the panel
//     falls back to a CLEARLY-LABELED "Sample" observation with realistic
//     values — NEVER presented as live — and the footnote explains the
//     honest behavior.
//   - Sunrise / sunset for Kodiak Airport (57.75, -152.5) are COMPUTED
//     client-side (NOAA solar algorithm) — deterministic, no network, badged
//     "Computed" — plus a daylight-hours readout.
//
// This panel is framed as a friendly planning read for festival-goers
// deciding what to wear/bring each day of the 5-day run — explicitly a
// heuristic, NOT a go/no-go call for any festival activity. That's always
// the organizers' and Coast Guard's own call.
//
// NWS returns metric SI units in `json.properties`; we convert to familiar
// units (C/F, mph, miles, ft) below.
//
// All classes are Tailwind arbitrary values or the `.kcf-*` scoped helpers
// from _shared.tsx. Nothing global is touched.

import { useEffect, useState } from "react";

const KODIAK_LAT = 57.75;
const KODIAK_LON = -152.5;
const ICAO = "PADQ"; // Kodiak Airport
// NWS latest-observation endpoint: keyless AND CORS-enabled (Access-Control-Allow-Origin: *).
const OBS_URL = `https://api.weather.gov/stations/${ICAO}/observations/latest`;

type Source = "live" | "computed" | "sample" | "loading";

type Decoded = {
  windText: string; // "220° at 8 mph" / "Calm"
  visText: string; // "10+ mi"
  skyText: string; // "Broken 6,000 ft" / "Clear"
  tempText: string; // "14°C / 57°F"
  dewText: string; // "7°C / 45°F"
  altimText: string; // "29.86 inHg"
  dayRead: "Great festival weather" | "Bring a jacket" | "Bring rain gear" | "—"; // friendly read
  raw: string; // raw METAR-style string
  rawAssembled: boolean; // true when `raw` was composed from fields (no rawMessage)
  obsTime: string; // "10:53 AM AKDT" style, best-effort
};

type State = {
  source: Source;
  d: Decoded;
  sunrise: string;
  sunset: string;
  daylightHours: string;
};

// ---- NOAA solar algorithm (client-side, no network) ----------------------
// Returns local sunrise/sunset as "h:mm AM/PM" for the given date + coords,
// rendered in America/Anchorage (Kodiak's time zone), plus a daylight
// duration derived from the same two moments.
function solarTimes(date: Date, lat: number, lon: number) {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff =
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
    start;
  const dayOfYear = Math.floor(diff / 86400000);

  const zenith = 90.833; // official sunrise/sunset (includes refraction)
  const lngHour = lon / 15;

  function calcMinutesUTC(isSunrise: boolean): number | null {
    const t = dayOfYear + ((isSunrise ? 6 : 18) - lngHour) / 24;
    const M = 0.9856 * t - 3.289;
    let L =
      M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634;
    L = ((L % 360) + 360) % 360;
    let RA = deg * Math.atan(0.91764 * Math.tan(L * rad));
    RA = ((RA % 360) + 360) % 360;
    const Lquadrant = Math.floor(L / 90) * 90;
    const RAquadrant = Math.floor(RA / 90) * 90;
    RA = (RA + (Lquadrant - RAquadrant)) / 15;
    const sinDec = 0.39782 * Math.sin(L * rad);
    const cosDec = Math.cos(Math.asin(sinDec));
    const cosH =
      (Math.cos(zenith * rad) - sinDec * Math.sin(lat * rad)) /
      (cosDec * Math.cos(lat * rad));
    if (cosH > 1 || cosH < -1) return null; // sun never rises/sets that day
    let H = isSunrise ? 360 - deg * Math.acos(cosH) : deg * Math.acos(cosH);
    H = H / 15;
    const T = H + RA - 0.06571 * t - 6.622;
    let UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24;
    return Math.round(UT * 60); // minutes UTC from local midnight-anchored day
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
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Anchorage",
    });
  }

  const riseMin = calcMinutesUTC(true);
  const setMin = calcMinutesUTC(false);
  let daylightHours = "—";
  if (riseMin != null && setMin != null) {
    let diffMin = setMin - riseMin;
    if (diffMin < 0) diffMin += 24 * 60;
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;
    daylightHours = `${h}h ${m}m`;
  }

  return {
    sunrise: fmt(riseMin) ?? "—",
    sunset: fmt(setMin) ?? "—",
    daylightHours,
  };
}

// ---- honest SAMPLE observation (clearly labeled in the UI) ----------------
// Realistic late-May afternoon at Kodiak: brisk southwesterly wind, decent
// visibility, broken deck, cool Gulf-of-Alaska temps typical for Memorial Day
// weekend. NEVER shown as live.
const SAMPLE: Decoded = {
  windText: "220° at 12 mph",
  visText: "10+ mi",
  skyText: "Broken 3,200 ft",
  tempText: "9°C / 48°F",
  dewText: "6°C / 43°F",
  altimText: "29.79 inHg",
  dayRead: "Bring a jacket",
  raw: "PADQ 231953Z 22012KT 10SM BKN032 09/06 A2979 RMK AO2",
  rawAssembled: false,
  obsTime: "sample observation",
};

// ---- NWS decode helpers ---------------------------------------------------
// NWS gives SI/metric units; convert to familiar units for guests.
const cToF = (c: number) => Math.round((c * 9) / 5 + 32);
const kmhToMph = (kmh: number) => Math.round(kmh / 1.60934);
const mToMi = (m: number) => m / 1609.344;
const mToFt = (m: number) => m * 3.28084;
const paToInHg = (pa: number) => (pa / 3386.389).toFixed(2);

const COVER_LABEL: Record<string, string> = {
  SKC: "Sky clear",
  CLR: "Clear",
  CAVOK: "Clear (CAVOK)",
  NCD: "No cloud detected",
  FEW: "Few clouds",
  SCT: "Scattered",
  BKN: "Broken",
  OVC: "Overcast",
  OVX: "Obscured sky",
};

// ---- NWS observation shape (only the fields we read; all numerics nullable) --
type NwsValue = { value?: number | null } | null | undefined;
type NwsCloudLayer = {
  base?: { value?: number | null } | null;
  amount?: string | null;
};
type NwsProps = {
  timestamp?: string | null; // ISO
  textDescription?: string | null;
  rawMessage?: string | null;
  temperature?: NwsValue; // °C
  dewpoint?: NwsValue; // °C
  windDirection?: NwsValue; // degrees
  windSpeed?: NwsValue; // km/h
  windGust?: NwsValue; // km/h
  visibility?: NwsValue; // meters
  barometricPressure?: NwsValue; // Pascals
  cloudLayers?: NwsCloudLayer[] | null;
};

const numOrNull = (v: NwsValue): number | null =>
  v != null && typeof v.value === "number" ? v.value : null;

// ---- compose a valid METAR-format string from the LIVE decoded fields ------
// Used only when NWS `properties.rawMessage` is null/empty. This is the SAME
// live observation, just re-assembled into standard METAR wording — never
// fabricated. Every group is guarded and skipped cleanly if its source value
// is missing. Station is always PADQ; fields are space-joined in METAR order.
function composeMetar(p: NwsProps): string | null {
  const groups: string[] = ["PADQ"];

  // 2. Time — DDHHMMZ (UTC) from the obs timestamp.
  if (p.timestamp) {
    const dt = new Date(p.timestamp);
    if (!Number.isNaN(dt.getTime())) {
      const dd = String(dt.getUTCDate()).padStart(2, "0");
      const hh = String(dt.getUTCHours()).padStart(2, "0");
      const mm = String(dt.getUTCMinutes()).padStart(2, "0");
      groups.push(`${dd}${hh}${mm}Z`);
    }
  }

  // 3. Wind — 00000KT if calm; else dddff(Ggg)KT (dir VRB if unknown).
  const wspdKmh = numOrNull(p.windSpeed);
  if (wspdKmh != null) {
    const kt = Math.round(wspdKmh / 1.852);
    if (kt === 0) {
      groups.push("00000KT");
    } else {
      const wdir = numOrNull(p.windDirection);
      const dir =
        wdir != null
          ? String(Math.round(wdir) % 360).padStart(3, "0")
          : "VRB";
      const spd = String(kt).padStart(2, "0");
      const gustKmh = numOrNull(p.windGust);
      const gustKt = gustKmh != null ? Math.round(gustKmh / 1.852) : null;
      const gust =
        gustKt != null && gustKt > kt
          ? `G${String(gustKt).padStart(2, "0")}`
          : "";
      groups.push(`${dir}${spd}${gust}KT`);
    }
  }

  // 4. Visibility — whole statute miles (rounding acceptable).
  const visM = numOrNull(p.visibility);
  if (visM != null) {
    const visSM = Math.max(0, Math.round(mToMi(visM)));
    groups.push(`${visSM}SM`);
  }

  // 5. Sky — each layer AMTbbb (hundreds of ft) ascending; CLR if none.
  const layers = Array.isArray(p.cloudLayers) ? p.cloudLayers : [];
  const skyGroups = layers
    .filter((l) => l.amount && typeof l.base?.value === "number")
    .map((l) => ({
      amt: l.amount as string,
      hundreds: Math.round(mToFt(l.base!.value as number) / 100),
    }))
    .sort((a, b) => a.hundreds - b.hundreds)
    .map((l) => `${l.amt}${String(l.hundreds).padStart(3, "0")}`);
  if (skyGroups.length) {
    groups.push(...skyGroups);
  } else if (layers.length === 0) {
    // Only claim CLR when NWS actually reported no cloud layers.
    groups.push("CLR");
  }

  // 6. Temp/dewpoint — Celsius, 2-digit, negatives prefixed M, joined by /.
  const tempC = numOrNull(p.temperature);
  const dewC = numOrNull(p.dewpoint);
  if (tempC != null && dewC != null) {
    const fmt = (c: number) => {
      const n = Math.abs(Math.round(c));
      return `${c < 0 ? "M" : ""}${String(n).padStart(2, "0")}`;
    };
    groups.push(`${fmt(tempC)}/${fmt(dewC)}`);
  }

  // 7. Altimeter — A + inHg*100 as 4 digits.
  const paVal = numOrNull(p.barometricPressure);
  if (paVal != null) {
    const inHg = Number(paToInHg(paVal));
    if (!Number.isNaN(inHg)) {
      groups.push(`A${String(Math.round(inHg * 100)).padStart(4, "0")}`);
    }
  }

  // Need at least the station + one real group to be worth showing.
  return groups.length > 1 ? groups.join(" ") : null;
}

// Friendly "what to bring today" read from temp (°F) + sky/precip cues. This
// is a HEURISTIC read for festival-goers packing for the day, not a go/no-go
// for any event — the festival and Coast Guard make the real calls.
function dayRead(tempF: number | null, skyText: string): "Great festival weather" | "Bring a jacket" | "Bring rain gear" {
  const wet = /rain|shower|drizzle|snow/i.test(skyText);
  if (wet) return "Bring rain gear";
  if (tempF != null && tempF < 50) return "Bring a jacket";
  return "Great festival weather";
}

function decodeNws(p: NwsProps): Decoded {
  // The station's officially transmitted METAR, if present and non-empty.
  const transmitted = p.rawMessage && p.rawMessage.trim() ? p.rawMessage.trim() : null;

  // ---- temp / dew (°C) ----
  const tempC = numOrNull(p.temperature);
  const dewC = numOrNull(p.dewpoint);
  const tempText =
    tempC != null ? `${Math.round(tempC)}°C / ${cToF(tempC)}°F` : "—";
  const dewText =
    dewC != null ? `${Math.round(dewC)}°C / ${cToF(dewC)}°F` : "—";

  // ---- wind (dir deg, speed km/h, gust km/h) ----
  let windText = "—";
  const wdir = numOrNull(p.windDirection);
  const wspdKmh = numOrNull(p.windSpeed);
  if (wspdKmh != null) {
    const mph = kmhToMph(wspdKmh);
    if (mph === 0) {
      windText = "Calm";
    } else {
      const dir =
        wdir != null ? `${String(Math.round(wdir)).padStart(3, "0")}°` : "—";
      const gustKmh = numOrNull(p.windGust);
      const gust = gustKmh != null ? ` gust ${kmhToMph(gustKmh)} mph` : "";
      windText = `${dir} at ${mph} mph${gust}`;
    }
  }

  // ---- visibility (meters -> miles) ----
  let visText = "—";
  const visM = numOrNull(p.visibility);
  if (visM != null) {
    const visMi = mToMi(visM);
    // whole miles when >= ~1, one decimal below that
    const shown = visMi >= 1 ? Math.round(visMi) : Math.round(visMi * 10) / 10;
    visText = `${shown}${visMi >= 10 ? "+" : ""} mi`;
  }

  // ---- sky / ceiling (cloudLayers[]; base meters -> ft) ----
  let skyText = "—";
  const layers = Array.isArray(p.cloudLayers) ? p.cloudLayers : [];
  if (layers.length) {
    const parts = layers
      .filter((l) => l.amount)
      .map((l) => {
        const amt = l.amount ?? "";
        const label = COVER_LABEL[amt] ?? amt;
        const baseM = l.base?.value;
        const ft = typeof baseM === "number" ? Math.round(mToFt(baseM)) : null;
        return ft != null ? `${label} ${ft.toLocaleString()} ft` : label;
      });
    if (parts.length) skyText = parts.slice(0, 2).join(", ");
  } else {
    skyText = "Clear";
  }
  if (skyText === "—" && p.textDescription) skyText = p.textDescription;

  // ---- altimeter (Pascals -> inHg) ----
  const paVal = numOrNull(p.barometricPressure);
  const altimText = paVal != null ? `${paToInHg(paVal)} inHg` : "—";

  // ---- friendly "what to bring" read ----
  const tempFforRead = tempC != null ? cToF(tempC) : null;
  const combinedSkyText = (skyText === "—" && p.textDescription) ? p.textDescription : skyText;
  const readSource = p.textDescription ? `${combinedSkyText} ${p.textDescription}` : combinedSkyText;
  const dRead = tempFforRead != null || skyText !== "—" ? dayRead(tempFforRead, readSource) : "—";

  // ---- obs time (ISO -> local Kodiak / Anchorage time) ----
  let obsTime = "—";
  if (p.timestamp) {
    const dt = new Date(p.timestamp);
    if (!Number.isNaN(dt.getTime())) {
      obsTime = dt.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/Anchorage",
        timeZoneName: "short",
      });
    }
  }

  return {
    windText,
    visText,
    skyText: combinedSkyText,
    tempText,
    dewText,
    altimText,
    dayRead: dRead as Decoded["dayRead"],
    // Prefer the station's transmitted METAR; when NWS omits it, assemble one
    // from the same live fields (still live data). "—" only if we truly can't.
    raw: transmitted || composeMetar(p) || "—",
    rawAssembled: !transmitted,
    obsTime,
  };
}

export function FestConditions() {
  const [s, setS] = useState<State>(() => {
    const { sunrise, sunset, daylightHours } = solarTimes(
      new Date(),
      KODIAK_LAT,
      KODIAK_LON
    );
    return { source: "loading", d: SAMPLE, sunrise, sunset, daylightHours };
  });

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        // Plain client-side fetch. Do NOT set a User-Agent header — browsers
        // set their own and User-Agent is a forbidden fetch header. NWS is
        // CORS-enabled so this works cross-origin.
        const r = await fetch(OBS_URL, { headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error(`status ${r.status}`);
        const j = await r.json();
        const props: NwsProps | undefined = j?.properties;
        // Consider it live only if we got usable data.
        const hasData =
          props &&
          (props.rawMessage ||
            props.timestamp ||
            (props.temperature && props.temperature.value != null));
        if (hasData && alive) {
          setS((prev) => ({ ...prev, source: "live", d: decodeNws(props) }));
          return;
        }
        throw new Error("empty observation");
      } catch {
        // Any failure -> honest labeled sample (never presented as live)
        if (alive) setS((prev) => ({ ...prev, source: "sample", d: SAMPLE }));
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  const live = s.source === "live";
  const d = s.d;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#f4f8f7]/12 bg-gradient-to-br from-[#0b2d3d] via-[#0f4a58] to-[#061c26] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* faint harbor-swell texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M-20 60 C 100 40, 180 80, 420 50" stroke="#8fc4cf" strokeWidth="1" fill="none" />
        <path d="M-20 120 C 100 100, 180 140, 420 110" stroke="#8fc4cf" strokeWidth="1" fill="none" />
        <path d="M-20 200 C 100 180, 180 220, 420 190" stroke="#8fc4cf" strokeWidth="1" fill="none" />
        <circle cx="330" cy="64" r="34" fill="none" stroke="#f2a93c" strokeWidth="0.8" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="kcf-eyebrow !text-[#f2a93c]">Kodiak, right now</p>
            <h3 className="kcf-display mt-1 text-xl font-semibold text-[#f4f8f7] sm:text-2xl">
              PADQ conditions
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1c5266]/50 bg-[#061c26]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fc4cf]">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  live ? "animate-ping bg-[#7fd0c0]" : "bg-[#8fc4cf]"
                } opacity-75`}
              />
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  live ? "bg-[#7fd0c0]" : "bg-[#8fc4cf]"
                }`}
              />
            </span>
            {d.dayRead !== "—" ? d.dayRead : "PADQ"}
          </span>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric
            label="Wind"
            value={d.windText}
            sub={live ? `as of ${d.obsTime}` : "sample obs"}
            source={s.source}
            icon={
              <path
                d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5M3 12h13a2.5 2.5 0 1 1-2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
              />
            }
          />
          <Metric
            label="Visibility"
            value={d.visText}
            sub="ground / statute miles"
            source={s.source}
            icon={
              <>
                <path
                  d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                />
                <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.3" fill="none" />
              </>
            }
          />
          <Metric
            label="Sky / ceiling"
            value={d.skyText}
            sub="cloud layers"
            source={s.source}
            icon={
              <path
                d="M6 13h9a3 3 0 0 0 .3-6A4 4 0 0 0 7.5 6 3.2 3.2 0 0 0 6 13Z"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinejoin="round"
              />
            }
          />
          <Metric
            label="Altimeter"
            value={d.altimText}
            sub="station setting"
            source={s.source}
            icon={
              <>
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.3" fill="none" />
                <path d="M10 10L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="10" cy="10" r="1" fill="currentColor" />
              </>
            }
          />
          <Metric
            label="Temp"
            value={d.tempText}
            sub="dry bulb"
            source={s.source}
            icon={
              <path
                d="M8 3v9.5a3.5 3.5 0 1 0 4 0V3a2 2 0 0 0-4 0Z"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            }
          />
          <Metric
            label="Dewpoint"
            value={d.dewText}
            sub="moisture"
            source={s.source}
            icon={
              <path
                d="M10 3s5 6 5 9.5A5 5 0 0 1 5 12.5C5 9 10 3 10 3Z"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinejoin="round"
              />
            }
          />
          <Metric
            label="Today's read"
            value={d.dayRead}
            sub="friendly read, not a call for the festival"
            source={s.source}
            icon={
              <path
                d="M2 11l16-6-6 16-2.5-6.5L2 11Z"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinejoin="round"
              />
            }
          />
          <Metric
            label="Daylight (AKDT)"
            value={s.daylightHours}
            sub={`sunrise ${s.sunrise} · sunset ${s.sunset}`}
            source="computed"
            icon={
              <>
                <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
                <path
                  d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M15.5 4.5l-1.4 1.4M5.9 14.1l-1.4 1.4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </>
            }
          />
        </div>

        {/* raw observation strip */}
        <div className="mt-4 kcf-glass p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fc4cf]">
              Raw observation
            </span>
            <SourceBadge source={s.source} />
          </div>
          <code className="block overflow-x-auto whitespace-nowrap font-mono text-[12px] leading-relaxed text-[#dcecea]">
            {d.raw}
          </code>
          {live && d.rawAssembled && d.raw !== "—" && (
            <p className="mt-1.5 text-[10px] italic text-[#dcecea]/45">
              assembled from the live NWS observation
            </p>
          )}
        </div>

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#dcecea]/60">
          Pulls the live observation for{" "}
          <span className="font-semibold text-[#f4f8f7]/85">Kodiak Airport (PADQ)</span>{" "}
          from the National Weather Service API (no key, CORS-enabled).
          Sunrise/sunset/daylight are computed for Kodiak (57.75°N, 152.50°W).
          The &quot;today&apos;s read&quot; is a friendly heuristic for
          packing your day bag — never a go/no-go call for any festival
          activity. Festival organizers and the Coast Guard make the real
          calls for events like the parade and the survival-suit race. If the
          feed is unreachable, this panel shows a clearly-labeled{" "}
          <span className="font-semibold text-[#f4f8f7]/85">sample</span>{" "}
          instead — never presented as live.
        </p>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  source,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  source: Source;
  icon: React.ReactNode;
}) {
  return (
    <div className="kcf-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[#8fc4cf]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            {icon}
          </svg>
        </span>
        <SourceBadge source={source} />
      </div>
      <span className="kcf-display text-[15px] font-semibold leading-tight text-[#f4f8f7] sm:text-base">
        {value}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#dcecea]/45">
        {label}
      </span>
      <span className="mt-0.5 text-[11px] text-[#dcecea]/60">{sub}</span>
    </div>
  );
}

function SourceBadge({ source }: { source: Source }) {
  if (source === "loading")
    return (
      <span className="rounded-full border border-[#f4f8f7]/20 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#f4f8f7]/45">
        …
      </span>
    );
  const map: Record<Exclude<Source, "loading">, { t: string; cls: string }> = {
    live: {
      t: "Live · NWS",
      cls: "border-[#7fd0c0]/50 bg-[#7fd0c0]/15 text-[#a9e6d8]",
    },
    computed: {
      t: "Computed",
      cls: "border-[#f2a93c]/45 bg-[#f2a93c]/12 text-[#f7c979]",
    },
    sample: {
      t: "Sample",
      cls: "border-[#f4f8f7]/25 bg-[#f4f8f7]/8 text-[#f4f8f7]/70",
    },
  };
  const m = map[source];
  return (
    <span
      className={`rounded-full border px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] ${m.cls}`}
    >
      {m.t}
    </span>
  );
}
