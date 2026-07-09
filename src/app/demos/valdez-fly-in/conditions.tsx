"use client";

// LIVE "FLYING IN?" CONDITIONS panel — the showpiece of the Valdez Fly-In &
// Air Show hub.
//
// WHY THIS PANEL: Valdez Pioneer Field (PAVD) sits at the head of a deep fjord,
// boxed in by the Chugach. Ceiling, visibility, and — for a STOL (short
// takeoff & landing) competition — DENSITY ALTITUDE are exactly the numbers a
// pilot flying in cares about. So the panel is a live aviation-weather read
// with a STOL-flavored density-altitude tile, not just generic weather.
//
// HONESTY CONTRACT (mirrors alaska-aviation-gathering/conditions.tsx):
//   - We attempt a LIVE observation fetch, client-side, from the National
//     Weather Service public API for Valdez Pioneer Field (ICAO PAVD):
//       https://api.weather.gov/stations/PAVD/observations/latest
//     Keyless AND CORS-enabled (Access-Control-Allow-Origin: *), so a plain
//     browser fetch works. On success every field is badged "Live · NWS" and
//     stamped with the observation time.
//   - If the fetch errors or returns nothing usable, the panel falls back to a
//     CLEARLY-LABELED "Sample" — NEVER presented as live.
//   - Sunrise / sunset for Valdez are COMPUTED client-side (NOAA solar
//     algorithm) — deterministic, no network, badged "Computed."
//   - Density altitude is derived from the LIVE temperature + altimeter and the
//     published PAVD field elevation (121 ft) — it inherits the live badge.
//
// NWS returns metric SI in `json.properties`; we convert to the aviation units
// pilots read (kt, SM, inHg, ft). Never a substitute for an official brief.
//
// All classes are Tailwind arbitrary values or the `.vfi-*` scoped helpers from
// _shared.tsx. Nothing global is touched.

import { useEffect, useState } from "react";
import { UpdatedAgo } from "../_wx/live";

const VALDEZ_LAT = 61.13333;
const VALDEZ_LON = -146.26667;
const FIELD_ELEV_FT = 121; // Valdez Pioneer Field elevation (NWS station "Valdez 2")
const ICAO = "PAVD";
const OBS_URL = `https://api.weather.gov/stations/${ICAO}/observations/latest`;

type Source = "live" | "computed" | "sample" | "loading";

type Decoded = {
  windText: string;
  visText: string;
  skyText: string;
  tempText: string;
  altimText: string;
  densAltText: string; // "−260 ft" style
  stolRead: string; // "Prime" / "Good" / "Thin air"
  fltCat: string; // VFR | MVFR | IFR | LIFR | —
  raw: string;
  rawAssembled: boolean;
  obsTime: string;
};

type State = {
  source: Source;
  d: Decoded;
  sunrise: string;
  sunset: string;
  daylight: string;
};

// ---- NOAA solar algorithm (client-side, no network) ----------------------
function solarTimes(date: Date, lat: number, lon: number) {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff =
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const dayOfYear = Math.floor(diff / 86400000);
  const zenith = 90.833;
  const lngHour = lon / 15;

  function calcMin(isSunrise: boolean): number | null {
    const t = dayOfYear + ((isSunrise ? 6 : 18) - lngHour) / 24;
    const M = 0.9856 * t - 3.289;
    let L = M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634;
    L = ((L % 360) + 360) % 360;
    let RA = deg * Math.atan(0.91764 * Math.tan(L * rad));
    RA = ((RA % 360) + 360) % 360;
    const Lq = Math.floor(L / 90) * 90;
    const RAq = Math.floor(RA / 90) * 90;
    RA = (RA + (Lq - RAq)) / 15;
    const sinDec = 0.39782 * Math.sin(L * rad);
    const cosDec = Math.cos(Math.asin(sinDec));
    const cosH = (Math.cos(zenith * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
    if (cosH > 1 || cosH < -1) return null;
    let H = isSunrise ? 360 - deg * Math.acos(cosH) : deg * Math.acos(cosH);
    H = H / 15;
    const T = H + RA - 0.06571 * t - 6.622;
    let UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24;
    return Math.round(UT * 60);
  }
  function fmt(minUTC: number | null): string | null {
    if (minUTC == null) return null;
    const d = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        Math.floor(minUTC / 60),
        minUTC % 60
      )
    );
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Anchorage" });
  }
  const rise = calcMin(true);
  const set = calcMin(false);
  let daylight = "—";
  if (rise != null && set != null) {
    let dm = set - rise;
    if (dm < 0) dm += 1440;
    daylight = `${Math.floor(dm / 60)}h ${dm % 60}m`;
  }
  return { sunrise: fmt(rise) ?? "—", sunset: fmt(set) ?? "—", daylight };
}

// ---- density altitude ------------------------------------------------------
// Standard approximation. PA = fieldElev + (29.92 − altimeter)·1000;
// ISA temp at PA = 15 − 2·(PA/1000) °C; DA = PA + 120·(OAT − ISA).
function densityAltitudeFt(tempC: number, altimInHg: number, fieldElevFt: number): number {
  const pressureAlt = fieldElevFt + (29.92 - altimInHg) * 1000;
  const isaTempC = 15 - 2 * (pressureAlt / 1000);
  return Math.round(pressureAlt + 120 * (tempC - isaTempC));
}
// STOL-flavored read: dense (cool/low) air = short ground roll.
function stolRead(daFt: number): string {
  if (daFt < 1000) return "Prime";
  if (daFt < 3000) return "Good";
  return "Thin air";
}
const fmtDA = (ft: number) => `${ft < 0 ? "−" : ""}${Math.abs(ft).toLocaleString()} ft`;

// ---- honest SAMPLE (clearly labeled) --------------------------------------
// Realistic early-May Valdez morning: light wind, high overcast, cool temps,
// dense air (great STOL). NEVER shown as live.
const SAMPLE: Decoded = {
  windText: "140° at 5 kt",
  visText: "10 SM",
  skyText: "Broken 4,500 ft",
  tempText: "6°C / 43°F",
  altimText: "29.94 inHg",
  densAltText: "−520 ft",
  stolRead: "Prime",
  fltCat: "VFR",
  raw: "PAVD 021553Z 14005KT 10SM BKN045 06/01 A2994 RMK AO2",
  rawAssembled: false,
  obsTime: "sample observation",
};

// ---- NWS decode helpers ----------------------------------------------------
const cToF = (c: number) => Math.round((c * 9) / 5 + 32);
const kmhToKt = (kmh: number) => Math.round(kmh / 1.852);
const mToSM = (m: number) => m / 1609.344;
const mToFt = (m: number) => m * 3.28084;
const paToInHg = (pa: number) => pa / 3386.389;

const COVER_LABEL: Record<string, string> = {
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

type NwsValue = { value?: number | null } | null | undefined;
type NwsCloudLayer = { base?: { value?: number | null } | null; amount?: string | null };
type NwsProps = {
  timestamp?: string | null;
  textDescription?: string | null;
  rawMessage?: string | null;
  temperature?: NwsValue;
  dewpoint?: NwsValue;
  windDirection?: NwsValue;
  windSpeed?: NwsValue;
  windGust?: NwsValue;
  visibility?: NwsValue;
  barometricPressure?: NwsValue;
  cloudLayers?: NwsCloudLayer[] | null;
};
const numOrNull = (v: NwsValue): number | null =>
  v != null && typeof v.value === "number" ? v.value : null;

// compose a valid METAR from live fields when rawMessage is empty (PAVD's is).
function composeMetar(p: NwsProps): string | null {
  const groups: string[] = [ICAO];
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

function flightCategory(ceilFt: number | null, visSM: number | null): string {
  const lowC = (t: number) => ceilFt != null && ceilFt < t;
  const lowV = (t: number) => visSM != null && visSM < t;
  if (lowC(500) || lowV(1)) return "LIFR";
  if (lowC(1000) || lowV(3)) return "IFR";
  if (lowC(3000) || lowV(5)) return "MVFR";
  return "VFR";
}

function decodeNws(p: NwsProps): Decoded {
  const transmitted = p.rawMessage && p.rawMessage.trim() ? p.rawMessage.trim() : null;

  const tempC = numOrNull(p.temperature);
  const tempText = tempC != null ? `${Math.round(tempC)}°C / ${cToF(tempC)}°F` : "—";

  let windText = "—";
  const wdir = numOrNull(p.windDirection);
  const wspdKmh = numOrNull(p.windSpeed);
  if (wspdKmh != null) {
    const kt = kmhToKt(wspdKmh);
    if (kt === 0) windText = "Calm";
    else {
      const dir = wdir != null ? `${String(Math.round(wdir)).padStart(3, "0")}°` : "—";
      const gustKmh = numOrNull(p.windGust);
      const gust = gustKmh != null ? ` gust ${kmhToKt(gustKmh)} kt` : "";
      windText = `${dir} at ${kt} kt${gust}`;
    }
  }

  let visText = "—";
  let visSM: number | null = null;
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

  // density altitude + STOL read (needs temp + altimeter)
  let densAltText = "—";
  let stol = "—";
  if (tempC != null && altimInHg != null) {
    const da = densityAltitudeFt(tempC, altimInHg, FIELD_ELEV_FT);
    densAltText = fmtDA(da);
    stol = stolRead(da);
  }

  const fltCat = flightCategory(ceilFt, visSM);

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
    skyText: skyText === "—" && p.textDescription ? p.textDescription : skyText,
    tempText,
    altimText,
    densAltText,
    stolRead: stol,
    fltCat,
    raw: transmitted || composeMetar(p) || "—",
    rawAssembled: !transmitted,
    obsTime,
  };
}

export function ValdezConditions() {
  const [s, setS] = useState<State>(() => {
    const { sunrise, sunset, daylight } = solarTimes(new Date(), VALDEZ_LAT, VALDEZ_LON);
    return { source: "loading", d: SAMPLE, sunrise, sunset, daylight };
  });
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const r = await fetch(OBS_URL, { headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error(`status ${r.status}`);
        const j = await r.json();
        const props: NwsProps | undefined = j?.properties;
        const hasData =
          props &&
          (props.rawMessage || props.timestamp || (props.temperature && props.temperature.value != null));
        if (hasData && alive) {
          setS((prev) => ({ ...prev, source: "live", d: decodeNws(props) }));
          setFetchedAt(Date.now());
          return;
        }
        throw new Error("empty observation");
      } catch {
        // keep the last live read on a transient refresh failure
        if (alive) setS((prev) => (prev.source === "live" ? prev : { ...prev, source: "sample", d: SAMPLE }));
      }
    }
    load();
    const id = setInterval(load, 5 * 60_000); // auto-refresh every 5 min
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const live = s.source === "live";
  const d = s.d;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e7f1f2]/12 bg-gradient-to-br from-[#0f2f3d] via-[#1a4a52] to-[#08202b] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* faint sectional grid + peak silhouette */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="vfi-cond-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#e7f1f2" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#vfi-cond-grid)" />
        <path d="M-20 250 L70 150 L120 200 L190 120 L260 200 L330 140 L420 210 L420 300 L-20 300 Z" fill="#7ec8d6" opacity="0.25" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="vfi-eyebrow !text-[#e0532f]">Flying in?</p>
            <h3 className="vfi-display mt-1 text-xl font-semibold text-[#eef7f7] sm:text-2xl">
              Valdez Pioneer (PAVD) wx
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5aa7b5]/40 bg-[#08202b]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a8dbe4]">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  live ? "animate-ping bg-[#4fd08a]" : "bg-[#a8dbe4]"
                } opacity-75`}
              />
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${live ? "bg-[#4fd08a]" : "bg-[#a8dbe4]"}`} />
            </span>
            {d.fltCat !== "—" ? d.fltCat : "PAVD"}
          </span>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric label="Wind" value={d.windText} sub={live ? `as of ${d.obsTime}` : "sample obs"} source={s.source}
            icon={<path d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5M3 12h13a2.5 2.5 0 1 1-2.5 2.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />} />
          <Metric label="Visibility" value={d.visText} sub="statute miles" source={s.source}
            icon={<><path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5Z" stroke="currentColor" strokeWidth="1.3" fill="none" /><circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.3" fill="none" /></>} />
          <Metric label="Sky / ceiling" value={d.skyText} sub="cloud layers" source={s.source}
            icon={<path d="M6 13h9a3 3 0 0 0 .3-6A4 4 0 0 0 7.5 6 3.2 3.2 0 0 0 6 13Z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />} />
          <Metric label="Altimeter" value={d.altimText} sub="station setting" source={s.source}
            icon={<><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.3" fill="none" /><path d="M10 10L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="10" cy="10" r="1" fill="currentColor" /></>} />
          <Metric label="Temp" value={d.tempText} sub="dry bulb" source={s.source}
            icon={<path d="M8 3v9.5a3.5 3.5 0 1 0 4 0V3a2 2 0 0 0-4 0Z" stroke="currentColor" strokeWidth="1.4" fill="none" />} />
          <Metric label="Density alt" value={d.densAltText} sub={d.stolRead !== "—" ? `STOL: ${d.stolRead}` : "vs. field elev 121 ft"} source={s.source}
            icon={<path d="M2 15l8-11 8 11M6 13h8" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" strokeLinecap="round" />} />
          <Metric label="Category" value={d.fltCat} sub="flight rules" source={s.source}
            icon={<path d="M2 11l16-6-6 16-2.5-6.5L2 11Z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />} />
          <Metric label="Daylight (AKDT)" value={s.daylight} sub={`↑ ${s.sunrise} · ↓ ${s.sunset}`} source="computed"
            icon={<><circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.4" fill="none" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M15.5 4.5l-1.4 1.4M5.9 14.1l-1.4 1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>} />
        </div>

        {/* raw METAR strip */}
        <div className="mt-4 vfi-glass p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8dbe4]">Raw METAR</span>
            <SourceBadge source={s.source} />
          </div>
          <code className="block overflow-x-auto whitespace-nowrap font-mono text-[12px] leading-relaxed text-[#cfe9ee]">
            {d.raw}
          </code>
          {live && d.rawAssembled && d.raw !== "—" && (
            <p className="mt-1.5 text-[10px] italic text-[#cfe9ee]/45">assembled from the live NWS observation</p>
          )}
        </div>

        <UpdatedAgo at={fetchedAt} live={live} className="mt-2 block text-right text-[10px] text-[#cfe9ee]/45" />

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#cfe9ee]/60">
          Pulls the live observation for{" "}
          <span className="font-semibold text-[#eef7f7]/85">Valdez Pioneer Field (PAVD)</span>{" "}
          from the National Weather Service API (no key, CORS-enabled). Density altitude is
          computed from the live temperature and altimeter against the field&apos;s 121 ft
          elevation — the number that governs a STOL takeoff roll. Sunrise, sunset, and daylight
          are computed for Valdez. If the feed is unreachable, this panel shows a clearly-labeled{" "}
          <span className="font-semibold text-[#eef7f7]/85">sample</span> instead — never presented
          as live. Never use any weather page as your sole preflight brief — get a full official
          briefing (1800wxbrief / ForeFlight) before you fly.
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
    <div className="vfi-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[#a8dbe4]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            {icon}
          </svg>
        </span>
        <SourceBadge source={source} />
      </div>
      <span className="vfi-display text-[15px] font-semibold leading-tight text-[#eef7f7] sm:text-base">{value}</span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#cfe9ee]/45">{label}</span>
      <span className="mt-0.5 text-[11px] text-[#cfe9ee]/60">{sub}</span>
    </div>
  );
}

function SourceBadge({ source }: { source: Source }) {
  if (source === "loading")
    return (
      <span className="rounded-full border border-[#e7f1f2]/20 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#e7f1f2]/45">
        …
      </span>
    );
  const map: Record<Exclude<Source, "loading">, { t: string; cls: string }> = {
    live: { t: "Live · NWS", cls: "border-[#4fd08a]/50 bg-[#4fd08a]/15 text-[#8fe6b4]" },
    computed: { t: "Computed", cls: "border-[#e0532f]/45 bg-[#e0532f]/12 text-[#f0a184]" },
    sample: { t: "Sample", cls: "border-[#e7f1f2]/25 bg-[#e7f1f2]/8 text-[#e7f1f2]/70" },
  };
  const m = map[source];
  return (
    <span className={`rounded-full border px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] ${m.cls}`}>
      {m.t}
    </span>
  );
}
