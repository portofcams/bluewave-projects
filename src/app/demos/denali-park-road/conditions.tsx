"use client";

// LIVE "DENALI RIGHT NOW" CONDITIONS panel — the showpiece of the Denali Park
// Road info hub.
//
// HONESTY CONTRACT (mirrors the aviation demo's conditions.tsx):
//   - We attempt a LIVE observation fetch, client-side, from the National
//     Weather Service public API for the nearest station to the Denali park
//     entrance area (63.7280, -148.8867). NWS is keyless AND CORS-enabled
//     (returns `access-control-allow-origin: *`), so a plain browser fetch
//     works. Do NOT set a User-Agent header (forbidden fetch header; browsers
//     set their own). When the fetch succeeds and returns usable data, every
//     decoded field is badged "Live · NWS" and stamped with the observation
//     time.
//   - If the fetch errors or the response has no usable data, the panel falls
//     back to a CLEARLY-LABELED "Sample" observation with realistic values —
//     NEVER presented as live — and the footnote explains the honest behavior.
//   - Sunrise / sunset + total daylight for the park are COMPUTED client-side
//     (NOAA solar algorithm) — deterministic, no network, badged "Computed".
//     Interior Alaska's daylight swing is dramatic, so this is a real touch.
//   - "Is the mountain likely out?" is an HONEST HEURISTIC derived from cloud
//     cover (clear/few -> good odds; broken/overcast -> likely hidden). It is
//     explicitly labeled a heuristic, never a guarantee — the mountain makes
//     its own weather and is hidden roughly 2 of every 3 visitor days.
//   - Road status is NOT live here. The panel says so and points to the
//     official NPS Current Conditions page.
//
// All classes are Tailwind arbitrary values or the `.dena-*` scoped helpers
// from _shared.tsx. Nothing global is touched.

import { useEffect, useState } from "react";
import { NPS_CONDITIONS_URL } from "./_shared";

// Denali park entrance area (near the visitor center / park road mile 0).
const ENTRANCE_LAT = 63.728;
const ENTRANCE_LON = -148.8867;
// NWS "points" endpoint resolves the nearest forecast office + observation
// stations for a coordinate. Keyless, CORS-enabled.
const POINTS_URL = `https://api.weather.gov/points/${ENTRANCE_LAT},${ENTRANCE_LON}`;

type Source = "live" | "computed" | "sample" | "loading";

type MountainOdds = "good" | "fair" | "hidden" | "unknown";

type Decoded = {
  tempText: string; // "9°C / 48°F"
  windText: string; // "SW 6 mph" / "Calm"
  skyText: string; // "Broken clouds" / "Clear"
  humidText: string; // "62%"
  odds: MountainOdds; // mountain-visibility heuristic
  oddsText: string; // friendly read
  station: string; // e.g. "PAKP" or a name
  obsTime: string; // "10:53 AM AKDT" style
};

type State = {
  source: Source;
  d: Decoded;
  sunrise: string;
  sunset: string;
  daylight: string; // "18h 42m"
};

// ---- NOAA solar algorithm (client-side, no network) ----------------------
// Returns local sunrise/sunset for the given date + coords in the park's zone
// (America/Anchorage). Also returns raw UT decimals so we can compute daylight.
function solarCalc(date: Date, lat: number, lon: number) {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff =
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
    start;
  const dayOfYear = Math.floor(diff / 86400000);

  const zenith = 90.833;
  const lngHour = lon / 15;

  function calc(isSunrise: boolean): { label: string; ut: number | null } {
    const t = dayOfYear + ((isSunrise ? 6 : 18) - lngHour) / 24;
    const M = 0.9856 * t - 3.289;
    let L = M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634;
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
    if (cosH > 1) return { label: "—", ut: null }; // sun never rises (polar night)
    if (cosH < -1) return { label: "—", ut: null }; // sun never sets (midnight sun)
    let H = isSunrise ? 360 - deg * Math.acos(cosH) : deg * Math.acos(cosH);
    H = H / 15;
    const T = H + RA - 0.06571 * t - 6.622;
    let UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24;
    const d = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        Math.floor(UT),
        Math.round((UT - Math.floor(UT)) * 60)
      )
    );
    return {
      label: d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/Anchorage",
      }),
      ut: UT,
    };
  }

  const rise = calc(true);
  const set = calc(false);

  // total daylight from the two UT decimals (handles wrap)
  let daylight = "—";
  if (rise.ut != null && set.ut != null) {
    let hrs = set.ut - rise.ut;
    if (hrs < 0) hrs += 24;
    const h = Math.floor(hrs);
    const m = Math.round((hrs - h) * 60);
    daylight = `${h}h ${String(m).padStart(2, "0")}m`;
  } else if (rise.ut == null && set.ut == null) {
    // Both null: either polar night or midnight sun depending on season.
    // Northern summer -> midnight sun; northern winter -> polar night.
    const month = date.getUTCMonth();
    daylight = month >= 4 && month <= 7 ? "24h (midnight sun)" : "~0h (polar night)";
  }

  return { sunrise: rise.label, sunset: set.label, daylight };
}

// ---- mountain-visibility heuristic ----------------------------------------
// Honest, transparent: purely from cloud cover. NOT a guarantee.
function mountainOdds(coverCodes: string[], textDesc: string | null): {
  odds: MountainOdds;
  text: string;
} {
  const codes = coverCodes.map((c) => c.toUpperCase());
  const clearish =
    codes.length === 0 ||
    codes.every((c) => ["SKC", "CLR", "NCD", "CAVOK", "FEW"].includes(c));
  const anyHeavy = codes.some((c) => ["BKN", "OVC", "OVX"].includes(c));
  const anyScat = codes.some((c) => c === "SCT");

  const t = (textDesc || "").toLowerCase();
  const textClear = /clear|sunny|fair/.test(t);
  const textCloudy = /cloud|overcast|rain|snow|fog|mist|storm/.test(t);

  if (clearish || (textClear && !anyHeavy))
    return {
      odds: "good",
      text: "Skies are clear-ish near the entrance — decent odds the summit is out. Still a heuristic: the mountain makes its own weather.",
    };
  if (anyScat && !anyHeavy)
    return {
      odds: "fair",
      text: "Partly cloudy near the entrance — fair odds, but the peak may be capped. Worth a look, no promises.",
    };
  if (anyHeavy || textCloudy)
    return {
      odds: "hidden",
      text: "Broken to overcast near the entrance — the summit is likely hidden right now. It clears without warning, so keep watching.",
    };
  return {
    odds: "unknown",
    text: "Not enough sky data to guess — only about 30% of visitors ever see the summit [confirm]. Keep your eyes up.",
  };
}

// ---- honest SAMPLE observation (clearly labeled in the UI) ----------------
// Realistic late-summer day near the Denali entrance: cool, light wind, a
// broken deck (so the "mountain likely hidden" read is the honest default when
// we have no live sky). NEVER shown as live.
const SAMPLE_ODDS = mountainOdds(["BKN"], "Mostly cloudy");
const SAMPLE: Decoded = {
  tempText: "11°C / 52°F",
  windText: "SW 7 mph",
  skyText: "Broken clouds",
  humidText: "68%",
  odds: SAMPLE_ODDS.odds,
  oddsText: SAMPLE_ODDS.text,
  station: "sample",
  obsTime: "sample observation",
};

// ---- unit helpers ----------------------------------------------------------
const cToF = (c: number) => Math.round((c * 9) / 5 + 32);
const kmhToMph = (kmh: number) => Math.round(kmh / 1.609344);
const degToCompass = (deg: number) => {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return dirs[Math.round(deg / 22.5) % 16];
};

const COVER_LABEL: Record<string, string> = {
  SKC: "Sky clear",
  CLR: "Clear",
  CAVOK: "Clear",
  NCD: "No cloud detected",
  FEW: "Few clouds",
  SCT: "Scattered clouds",
  BKN: "Broken clouds",
  OVC: "Overcast",
  OVX: "Obscured sky",
};

// ---- NWS observation shape (only the fields we read; numerics nullable) ----
type NwsValue = { value?: number | null } | null | undefined;
type NwsCloudLayer = { amount?: string | null };
type NwsProps = {
  timestamp?: string | null;
  textDescription?: string | null;
  temperature?: NwsValue; // °C
  windSpeed?: NwsValue; // km/h
  windDirection?: NwsValue; // degrees
  relativeHumidity?: NwsValue; // %
  cloudLayers?: NwsCloudLayer[] | null;
};

const numOrNull = (v: NwsValue): number | null =>
  v != null && typeof v.value === "number" ? v.value : null;

function decodeNws(p: NwsProps, station: string): Decoded {
  const tempC = numOrNull(p.temperature);
  const tempText = tempC != null ? `${Math.round(tempC)}°C / ${cToF(tempC)}°F` : "—";

  // wind
  let windText = "—";
  const wspdKmh = numOrNull(p.windSpeed);
  if (wspdKmh != null) {
    const mph = kmhToMph(wspdKmh);
    if (mph === 0) {
      windText = "Calm";
    } else {
      const wdir = numOrNull(p.windDirection);
      const dir = wdir != null ? `${degToCompass(wdir)} ` : "";
      windText = `${dir}${mph} mph`;
    }
  }

  // humidity
  const rh = numOrNull(p.relativeHumidity);
  const humidText = rh != null ? `${Math.round(rh)}%` : "—";

  // sky / cloud cover
  const layers = Array.isArray(p.cloudLayers) ? p.cloudLayers : [];
  const codes = layers.map((l) => l.amount ?? "").filter(Boolean);
  let skyText: string;
  if (codes.length === 0) {
    skyText = p.textDescription || "Clear";
  } else {
    // show the most significant (last / highest coverage) layer label
    const priority = ["OVC", "BKN", "SCT", "FEW", "CLR", "SKC"];
    const top =
      codes.slice().sort((a, b) => priority.indexOf(a) - priority.indexOf(b))[0] ??
      codes[0];
    skyText = COVER_LABEL[top] ?? p.textDescription ?? top;
  }

  const { odds, text } = mountainOdds(codes, p.textDescription ?? null);

  // obs time
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
    tempText,
    windText,
    skyText,
    humidText,
    odds,
    oddsText: text,
    station,
    obsTime,
  };
}

export function DenaliConditions() {
  const [s, setS] = useState<State>(() => {
    const { sunrise, sunset, daylight } = solarCalc(
      new Date(),
      ENTRANCE_LAT,
      ENTRANCE_LON
    );
    return { source: "loading", d: SAMPLE, sunrise, sunset, daylight };
  });

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        // 1) resolve nearest observation stations for the entrance coords
        const pr = await fetch(POINTS_URL, {
          headers: { Accept: "application/geo+json" },
        });
        if (!pr.ok) throw new Error(`points ${pr.status}`);
        const pj = await pr.json();
        const stationsUrl: string | undefined =
          pj?.properties?.observationStations;
        if (!stationsUrl) throw new Error("no stations url");

        const sr = await fetch(stationsUrl, {
          headers: { Accept: "application/geo+json" },
        });
        if (!sr.ok) throw new Error(`stations ${sr.status}`);
        const sj = await sr.json();
        const first = sj?.features?.[0];
        const stationId: string | undefined =
          first?.properties?.stationIdentifier;
        const stationName: string | undefined = first?.properties?.name;
        if (!stationId) throw new Error("no station id");

        // 2) latest observation for the nearest station
        const or = await fetch(
          `https://api.weather.gov/stations/${stationId}/observations/latest`,
          { headers: { Accept: "application/geo+json" } }
        );
        if (!or.ok) throw new Error(`obs ${or.status}`);
        const oj = await or.json();
        const props: NwsProps | undefined = oj?.properties;
        const hasData =
          props &&
          (props.timestamp ||
            (props.temperature && props.temperature.value != null) ||
            (props.cloudLayers && props.cloudLayers.length > 0));
        if (hasData && alive) {
          const label = stationName || stationId;
          setS((prev) => ({
            ...prev,
            source: "live",
            d: decodeNws(props, label),
          }));
          return;
        }
        throw new Error("empty observation");
      } catch {
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

  const oddsChip: Record<MountainOdds, { t: string; cls: string }> = {
    good: { t: "Good odds", cls: "border-[#8fd6a0]/50 bg-[#8fd6a0]/15 text-[#b6e8c1]" },
    fair: { t: "Fair odds", cls: "border-[#e6b34e]/50 bg-[#e6b34e]/15 text-[#f0d089]" },
    hidden: { t: "Likely hidden", cls: "border-[#d98a3d]/50 bg-[#d98a3d]/12 text-[#e6b98a]" },
    unknown: { t: "Unknown", cls: "border-[#a9c4cf]/40 bg-[#a9c4cf]/10 text-[#cfe0e6]" },
  };
  const oc = oddsChip[d.odds];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#a9c4cf]/12 bg-gradient-to-br from-[#26382b] via-[#1d2b21] to-[#141f18] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* faint contour texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="#f2efe6" strokeWidth="0.7" fill="none">
          <path d="M-20 90 C 120 60, 260 72, 420 50" />
          <path d="M-20 120 C 120 92, 260 104, 420 80" />
          <path d="M-20 152 C 120 124, 260 136, 420 112" />
          <path d="M-20 186 C 120 158, 260 170, 420 146" />
        </g>
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="dena-eyebrow !text-[#e6b34e]">Denali right now</p>
            <h3 className="dena-display mt-1 text-xl font-semibold text-[#f2efe6] sm:text-2xl">
              At the park entrance
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6e8a6f]/40 bg-[#141f18]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a9c4cf]">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  live ? "animate-ping bg-[#8fd6a0]" : "bg-[#a9c4cf]"
                } opacity-75`}
              />
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  live ? "bg-[#8fd6a0]" : "bg-[#a9c4cf]"
                }`}
              />
            </span>
            {live ? "Live" : "Sample"}
          </span>
        </div>

        {/* "Is the mountain out?" — the signature read */}
        <div className="mb-4 dena-glass p-4">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a9c4cf]">
              Is the mountain likely out?
            </span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${oc.cls}`}
            >
              {oc.t}
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-[#e8e4d8]/85">
            {d.oddsText}
          </p>
          <p className="mt-1.5 text-[10px] italic text-[#cfe0e6]/45">
            Heuristic from cloud cover near the entrance — not a guarantee. Denali
            makes its own weather.
          </p>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric
            label="Temp"
            value={d.tempText}
            sub="near entrance"
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
            label="Wind"
            value={d.windText}
            sub="surface"
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
            label="Sky"
            value={d.skyText}
            sub="cloud cover"
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
            label="Humidity"
            value={d.humidText}
            sub="relative"
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
            label="Sunrise"
            value={s.sunrise}
            sub="AKDT"
            source="computed"
            icon={
              <>
                <circle cx="10" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.3" fill="none" />
                <path d="M10 4v3M4 12H2M18 12h-2M5.5 7.5l1.4 1.4M13.1 8.9l1.4-1.4M3 16h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </>
            }
          />
          <Metric
            label="Sunset"
            value={s.sunset}
            sub="AKDT"
            source="computed"
            icon={
              <>
                <circle cx="10" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.3" fill="none" />
                <path d="M10 8V5M4 12H2M18 12h-2M5.5 9.4L4.1 8M14.5 9.4l1.4-1.4M3 16h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </>
            }
          />
          <Metric
            label="Daylight"
            value={s.daylight}
            sub="today"
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
          <Metric
            label="Station"
            value={live ? d.station : "—"}
            sub={live ? `as of ${d.obsTime}` : "sample obs"}
            source={s.source}
            icon={
              <>
                <path d="M10 2 L16 16 H4 Z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
                <path d="M8 11 L12 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </>
            }
          />
        </div>

        {/* road-status honesty strip */}
        <div className="mt-4 dena-glass p-3">
          <div className="flex items-start gap-2.5">
            <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#e6b34e]" fill="none" aria-hidden="true">
              <path d="M10 2 L18 16 H2 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M10 8v4M10 14.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-[11px] leading-relaxed text-[#e8e4d8]/70">
              This panel is weather only —{" "}
              <span className="font-semibold text-[#f2efe6]/90">
                road status is not live here
              </span>
              . The Denali Park Road status changes; always confirm the current
              closure and bus service on the official{" "}
              <a
                href={NPS_CONDITIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#e6b34e] underline underline-offset-2 hover:text-[#f0d089]"
              >
                NPS Current Conditions page
              </a>
              .
            </p>
          </div>
        </div>

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#cfe0e6]/55">
          Pulls the live observation from the nearest{" "}
          <span className="font-semibold text-[#f2efe6]/85">
            National Weather Service
          </span>{" "}
          station to the park entrance (no key, CORS-enabled). Sunrise, sunset,
          and total daylight are computed for the entrance. If the feed is
          unreachable, this panel shows a clearly-labeled{" "}
          <span className="font-semibold text-[#f2efe6]/85">sample</span> instead
          — never presented as live.
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
    <div className="dena-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[#a9c4cf]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            {icon}
          </svg>
        </span>
        <SourceBadge source={source} />
      </div>
      <span className="dena-display text-[15px] font-semibold leading-tight text-[#f2efe6] sm:text-base">
        {value}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#cfe0e6]/45">
        {label}
      </span>
      <span className="mt-0.5 text-[11px] text-[#cfe0e6]/60">{sub}</span>
    </div>
  );
}

function SourceBadge({ source }: { source: Source }) {
  if (source === "loading")
    return (
      <span className="rounded-full border border-[#f2efe6]/20 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#f2efe6]/45">
        …
      </span>
    );
  const map: Record<Exclude<Source, "loading">, { t: string; cls: string }> = {
    live: { t: "Live · NWS", cls: "border-[#8fd6a0]/50 bg-[#8fd6a0]/15 text-[#b6e8c1]" },
    computed: { t: "Computed", cls: "border-[#e6b34e]/45 bg-[#e6b34e]/12 text-[#f0d089]" },
    sample: { t: "Sample", cls: "border-[#f2efe6]/25 bg-[#f2efe6]/8 text-[#f2efe6]/70" },
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
