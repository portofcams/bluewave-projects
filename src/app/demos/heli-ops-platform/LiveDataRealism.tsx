"use client";

// LiveDataRealism — Module 5 (Live-data & realism) interactive component.
//
// TWO DIFFERENT HONESTY TIERS IN ONE MODULE — read carefully, they are NOT
// interchangeable:
//
//   REAL (items 21-22): a live public National Weather Service observation
//   for a real Alaska coordinate, real active-alert lookup, and a real
//   client-side sunrise/sunset/daylight astronomical calculation for that
//   same coordinate and TODAY'S actual date. This reuses the exact pattern
//   already proven in this repo at
//   src/app/demos/alaska-rainbow-lodge/conditions.tsx and
//   src/app/demos/alaska-royal-coachman-lodge/conditions.tsx: a plain
//   client-side fetch to api.weather.gov (keyless, CORS-enabled), decoded
//   into familiar units, with an honest labeled "Sample" fallback if the
//   fetch fails — NEVER presented as live if it isn't. The coordinate used
//   is Thompson Pass, AK (61.1286degN, 145.7297degW) — a real, specific,
//   verifiable South-Central Alaska mountain pass near Valdez — framed
//   generically as "a representative South-Central Alaska heli-ski
//   coordinate," NOT as any specific real operator's actual base.
//
//   SIMULATED / ILLUSTRATIVE (item 25): an avalanche-danger-rating widget
//   styled after the REAL public avalanche.org 5-level North American
//   Public Avalanche Danger Scale (colors verified against the National
//   Avalanche Center's own published color reference, 2026-07-03), tied to
//   the SAME 6 fictional zones already established in Module 2's schematic
//   zone map. The RATING ITSELF is 100% invented sample data per zone — it
//   is NOT wired to any real avalanche center API or real current advisory,
//   and must never be mistaken for one. This is a genuine safety
//   consideration (not just legal boilerplate): every instance of this
//   widget on this page carries an explicit, prominent disclaimer directing
//   any real reader to consult their local avalanche center's real forecast
//   before real backcountry travel decisions.
//
//   Item 23 (days since last incident) is REAL — computed genuinely from
//   Module 4's real incident/near-miss log (_platform.tsx's `incidents`
//   array), not a hardcoded number. Logging a new incident via
//   SafetyCompliance.tsx's form genuinely resets this counter to 0 — see
//   daysSinceLastIncident() in _data.tsx, which reads the actual
//   `loggedAt` timestamps captured at submission time.
//
//   Item 24 (simulated GPS/ADS-B-style position blips) is NOT in this file —
//   per the build instructions, it extends Module 2's EXISTING schematic
//   zone map directly (see FlightFollowing.tsx's GpsBlipOverlay), rather
//   than duplicating a parallel map here.

import { useEffect, useMemo, useState } from "react";
import { OPS, SampleTag } from "./_shared";
import {
  AVALANCHE_LEVEL_COLOR,
  AVALANCHE_LEVEL_LABEL,
  AVALANCHE_LEVEL_TEXT_ON_COLOR,
  AvalancheDangerLevel,
  REALISM_COORD_LABEL,
  REALISM_LAT,
  REALISM_LON,
  ZoneAvalancheRating,
  daysSinceLastIncident,
  seedZoneAvalancheRatings,
} from "./_data";
import { ZONES, usePlatform } from "./_platform";

// ---------------------------------------------------------------------------
// ITEM 21 — REAL LIVE WEATHER PANEL (weather.gov / NWS)
// ---------------------------------------------------------------------------

const NEAREST_STATION_ICAO = "PAVD"; // Valdez 2 — nearest NWS observation station to Thompson Pass
const OBS_URL = `https://api.weather.gov/stations/${NEAREST_STATION_ICAO}/observations/latest`;
const ALERTS_URL = `https://api.weather.gov/alerts/active?point=${REALISM_LAT},${REALISM_LON}`;

type WxSource = "live" | "sample" | "loading";

type WxDecoded = {
  windText: string;
  tempText: string;
  skyText: string;
  visText: string;
  obsTime: string;
};

const WX_SAMPLE: WxDecoded = {
  windText: "160° at 7 mph",
  tempText: "9°C / 48°F",
  skyText: "Broken 3,200 ft",
  visText: "10+ mi",
  obsTime: "sample observation",
};

const cToF = (c: number) => Math.round((c * 9) / 5 + 32);
const kmhToMph = (kmh: number) => Math.round(kmh / 1.60934);
const mToMi = (m: number) => m / 1609.344;
const mToFt = (m: number) => m * 3.28084;

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

type NwsValue = { value?: number | null } | null | undefined;
type NwsCloudLayer = { base?: { value?: number | null } | null; amount?: string | null };
type NwsProps = {
  timestamp?: string | null;
  textDescription?: string | null;
  temperature?: NwsValue;
  windDirection?: NwsValue;
  windSpeed?: NwsValue;
  windGust?: NwsValue;
  visibility?: NwsValue;
  cloudLayers?: NwsCloudLayer[] | null;
};

const numOrNull = (v: NwsValue): number | null => (v != null && typeof v.value === "number" ? v.value : null);

function decodeWx(p: NwsProps): WxDecoded {
  const tempC = numOrNull(p.temperature);
  const tempText = tempC != null ? `${Math.round(tempC)}°C / ${cToF(tempC)}°F` : "—";

  let windText = "—";
  const wdir = numOrNull(p.windDirection);
  const wspdKmh = numOrNull(p.windSpeed);
  if (wspdKmh != null) {
    const mph = kmhToMph(wspdKmh);
    if (mph === 0) {
      windText = "Calm";
    } else {
      const dir = wdir != null ? `${String(Math.round(wdir)).padStart(3, "0")}°` : "—";
      const gustKmh = numOrNull(p.windGust);
      const gust = gustKmh != null ? ` gust ${kmhToMph(gustKmh)} mph` : "";
      windText = `${dir} at ${mph} mph${gust}`;
    }
  }

  let visText = "—";
  const visM = numOrNull(p.visibility);
  if (visM != null) {
    const visMi = mToMi(visM);
    const shown = visMi >= 1 ? Math.round(visMi) : Math.round(visMi * 10) / 10;
    visText = `${shown}${visMi >= 10 ? "+" : ""} mi`;
  }

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

  return { windText, tempText, skyText, visText, obsTime };
}

type NwsAlertProps = { event?: string | null; headline?: string | null; severity?: string | null };

// ---------------------------------------------------------------------------
// ITEM 22 — REAL SUNRISE/SUNSET + DAYLIGHT HOURS (NOAA solar algorithm,
// computed client-side for TODAY'S actual date — no network, no hardcoded
// sample date). Same algorithm already proven in
// alaska-rainbow-lodge/conditions.tsx and
// alaska-royal-coachman-lodge/conditions.tsx, reused verbatim for Thompson
// Pass's real coordinate.
// ---------------------------------------------------------------------------
function solarTimes(date: Date, lat: number, lon: number) {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const dayOfYear = Math.floor(diff / 86400000);

  const zenith = 90.833;
  const lngHour = lon / 15;

  function calcMinutesUTC(isSunrise: boolean): number | null {
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
    const cosH = (Math.cos(zenith * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
    if (cosH > 1 || cosH < -1) return null; // sun never rises/sets that day (polar day/night)
    let H = isSunrise ? 360 - deg * Math.acos(cosH) : deg * Math.acos(cosH);
    H = H / 15;
    const T = H + RA - 0.06571 * t - 6.622;
    let UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24;
    return Math.round(UT * 60);
  }

  function fmt(minutesUTC: number | null): string | null {
    if (minutesUTC == null) return null;
    const d = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), Math.floor(minutesUTC / 60), minutesUTC % 60)
    );
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Anchorage" });
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

  return { sunrise: fmt(riseMin) ?? "—", sunset: fmt(setMin) ?? "—", daylightHours };
}

function SourceBadge({ tone, label }: { tone: "live" | "computed" | "sample" | "loading"; label?: string }) {
  const map: Record<typeof tone, { t: string; bg: string; fg: string; border: string }> = {
    live: { t: "Live · NWS", bg: "rgba(62,207,142,.16)", fg: OPS.green, border: "rgba(62,207,142,.45)" },
    computed: { t: "Computed · today", bg: "rgba(94,200,232,.14)", fg: OPS.ice, border: "rgba(94,200,232,.4)" },
    sample: { t: "Sample", bg: "rgba(255,255,255,.06)", fg: OPS.textMuted, border: OPS.line },
    loading: { t: "…", bg: "rgba(255,255,255,.04)", fg: OPS.textMuted, border: OPS.line },
  };
  const m = map[tone];
  return (
    <span
      className="hops-mono rounded-full border px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[.1em]"
      style={{ background: m.bg, color: m.fg, borderColor: m.border }}
    >
      {label ?? m.t}
    </span>
  );
}

function WeatherAndDaylightPanel() {
  const [wxSource, setWxSource] = useState<WxSource>("loading");
  const [wx, setWx] = useState<WxDecoded>(WX_SAMPLE);
  const [alertsState, setAlertsState] = useState<"loading" | "ok" | "error">("loading");
  const [alerts, setAlerts] = useState<NwsAlertProps[]>([]);

  const solar = useMemo(() => solarTimes(new Date(), REALISM_LAT, REALISM_LON), []);

  useEffect(() => {
    let alive = true;
    async function loadWx() {
      try {
        const r = await fetch(OBS_URL, { headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error(`status ${r.status}`);
        const j = await r.json();
        const props: NwsProps | undefined = j?.properties;
        const hasData = props && (props.timestamp || (props.temperature && props.temperature.value != null));
        if (hasData && alive) {
          setWx(decodeWx(props));
          setWxSource("live");
          return;
        }
        throw new Error("empty observation");
      } catch {
        if (alive) {
          setWx(WX_SAMPLE);
          setWxSource("sample");
        }
      }
    }
    async function loadAlerts() {
      try {
        const r = await fetch(ALERTS_URL, { headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error(`status ${r.status}`);
        const j = await r.json();
        const features: { properties: NwsAlertProps }[] = Array.isArray(j?.features) ? j.features : [];
        if (alive) {
          setAlerts(features.map((f) => f.properties));
          setAlertsState("ok");
        }
      } catch {
        if (alive) setAlertsState("error");
      }
    }
    loadWx();
    loadAlerts();
    return () => {
      alive = false;
    };
  }, []);

  const live = wxSource === "live";

  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3.5"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-base font-bold" style={{ color: OPS.snow }}>
            Live weather &amp; daylight — {REALISM_COORD_LABEL}
          </div>
          <div className="mt-0.5 text-[13px]" style={{ color: OPS.textMuted }}>
            Real National Weather Service observation (nearest station: {NEAREST_STATION_ICAO}, Valdez) + a real
            sunrise/sunset calculation for today&rsquo;s actual date. Not any specific real operator&rsquo;s base.
          </div>
        </div>
        <SourceBadge tone={wxSource} />
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Temp" value={wx.tempText} sub={live ? `as of ${wx.obsTime}` : "sample obs"} tone={wxSource} />
        <Metric label="Wind" value={wx.windText} sub={live ? `as of ${wx.obsTime}` : "sample obs"} tone={wxSource} />
        <Metric label="Sky" value={wx.skyText} sub="cloud layers" tone={wxSource} />
        <Metric label="Visibility" value={wx.visText} sub="ground / statute miles" tone={wxSource} />
        <Metric
          label="Sunrise"
          value={solar.sunrise}
          sub="America/Anchorage, computed for today"
          tone="computed"
        />
        <Metric label="Sunset" value={solar.sunset} sub="America/Anchorage, computed for today" tone="computed" />
        <Metric label="Daylight hours" value={solar.daylightHours} sub="sunset minus sunrise, today" tone="computed" />
        <Metric
          label="Active NWS alerts"
          value={alertsState === "loading" ? "…" : alertsState === "error" ? "—" : String(alerts.length)}
          sub={alertsState === "error" ? "alert lookup failed" : "for this coordinate"}
          tone={alertsState === "ok" ? "live" : alertsState === "error" ? "sample" : "loading"}
        />
      </div>

      {alertsState === "ok" && alerts.length > 0 && (
        <div className="mx-4 mb-4 space-y-2">
          {alerts.map((a, i) => (
            <div
              key={i}
              className="hops-panel px-3 py-2.5"
              style={{ borderColor: "rgba(240,168,60,.5)", background: "rgba(240,168,60,.08)" }}
            >
              <div className="hops-mono text-[11px] font-bold uppercase tracking-[.05em]" style={{ color: OPS.amber }}>
                {a.event ?? "NWS alert"}
              </div>
              {a.headline && (
                <p className="mt-1 text-[12.5px] leading-snug" style={{ color: OPS.text }}>
                  {a.headline}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="mx-4 mb-4 text-[12px] leading-relaxed" style={{ color: OPS.textMuted }}>
        Weather pulls the live observation from NWS station {NEAREST_STATION_ICAO} (no API key, CORS-enabled) — the
        nearest public station to Thompson Pass, AK (61.13°N, 145.73°W), a real South-Central Alaska mountain pass
        used here only as a representative heli-ski-terrain coordinate. Active-alert count queries the real NWS
        alerts endpoint for this exact point. Sunrise, sunset, and daylight hours are computed client-side with a
        standard solar-position algorithm for this coordinate and today&rsquo;s real date — not a fixed sample date.
        If the live feed is unreachable, the weather metrics fall back to a clearly-labeled sample observation,
        never presented as live.
      </p>
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "live" | "computed" | "sample" | "loading";
}) {
  return (
    <div className="hops-panel p-3" style={{ background: "rgba(255,255,255,.02)" }}>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="hops-mono text-[10px] font-semibold uppercase tracking-[.1em]" style={{ color: OPS.textMuted }}>
          {label}
        </span>
        <SourceBadge tone={tone} />
      </div>
      <div className="hops-mono text-[15px] font-bold leading-tight" style={{ color: OPS.snow }}>
        {value}
      </div>
      <div className="mt-1 text-[11px]" style={{ color: OPS.textMuted }}>
        {sub}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ITEM 23 — DAYS SINCE LAST INCIDENT (real, computed from Module 4's shared
// incident log — see _platform.tsx `incidents` + _data.tsx
// daysSinceLastIncident()).
// ---------------------------------------------------------------------------
function DaysSinceIncidentPanel() {
  const { incidents } = usePlatform();
  const [nowMs, setNowMs] = useState(() => Date.now());

  // Recompute against a ticking clock (not just on incidents changing) so the
  // counter would genuinely roll over at real local midnight during a long
  // session, same spirit as the rest of this app's live timers.
  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const { days, sinceLabel } = useMemo(() => daysSinceLastIncident(incidents, nowMs), [incidents, nowMs]);
  const hasLogged = incidents.length > 0;

  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3.5"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-base font-bold" style={{ color: OPS.snow }}>Days since last incident</div>
          <div className="text-[13px]" style={{ color: OPS.textMuted }}>
            A real safety-culture counter, genuinely computed from Module 04&rsquo;s incident/near-miss log.
          </div>
        </div>
        <SampleTag />
      </div>

      <div className="flex flex-wrap items-center gap-6 p-4">
        <div className="hops-mono text-6xl font-extrabold leading-none" style={{ color: days === 0 ? OPS.amber : OPS.green }}>
          {days}
        </div>
        <div>
          <div className="text-[13.5px] font-semibold" style={{ color: OPS.text }}>
            day{days === 1 ? "" : "s"}
          </div>
          <div className="mt-1 text-[12.5px]" style={{ color: OPS.textMuted }}>
            Since: {sinceLabel}
          </div>
          <div className="mt-1 text-[12.5px]" style={{ color: OPS.textMuted }}>
            {hasLogged
              ? `${incidents.length} entr${incidents.length === 1 ? "y" : "ies"} logged this session in Module 04.`
              : "No entries logged yet this session — counting from a sample baseline instead."}
          </div>
        </div>
      </div>

      <p className="mx-4 mb-4 text-[12px] leading-relaxed" style={{ color: OPS.textMuted }}>
        Genuinely recomputed from the real <code>loggedAt</code> timestamp of the most recent entry in Module
        04&rsquo;s incident/near-miss log — not a hardcoded number. Log a new incident in Module 04 and this counter
        will reset to <strong style={{ color: OPS.snow }}>0</strong> immediately, since that submission becomes the
        new most-recent entry. With zero entries logged this session, it counts from a real (if arbitrary) sample
        baseline instead of fabricating a streak.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ITEM 25 — AVALANCHE DANGER WIDGET — SIMULATED / ILLUSTRATIVE SAMPLE DATA
// ONLY. See the file-level and _data.tsx-level disclaimers above. This is
// NOT a real avalanche advisory and must never be read as one.
// ---------------------------------------------------------------------------
function DangerScaleLegend() {
  const levels: AvalancheDangerLevel[] = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-wrap gap-1.5">
      {levels.map((lvl) => (
        <span
          key={lvl}
          className="hops-mono flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-bold"
          style={{ background: AVALANCHE_LEVEL_COLOR[lvl], color: AVALANCHE_LEVEL_TEXT_ON_COLOR[lvl] }}
        >
          {lvl} · {AVALANCHE_LEVEL_LABEL[lvl]}
        </span>
      ))}
    </div>
  );
}

function AvalancheWidget() {
  const ratings = useMemo(() => seedZoneAvalancheRatings(), []);
  const ratingByZone = useMemo(() => {
    const map: Record<string, ZoneAvalancheRating> = {};
    for (const r of ratings) map[r.zone] = r;
    return map;
  }, [ratings]);

  const [selectedZoneKey, setSelectedZoneKey] = useState<string>(ZONES[0].key);
  const selectedZone = ZONES.find((z) => z.key === selectedZoneKey) ?? ZONES[0];
  const selectedRating = ratingByZone[selectedZoneKey];

  return (
    <div className="hops-panel overflow-hidden" style={{ borderColor: "rgba(229,72,77,.5)" }}>
      <div
        className="flex flex-col gap-2 border-b px-4 py-3.5"
        style={{ borderColor: "rgba(229,72,77,.4)", background: "rgba(229,72,77,.08)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className="hops-pill w-fit"
            style={{ background: "rgba(229,72,77,.22)", color: OPS.red, border: "1px solid rgba(229,72,77,.55)" }}
          >
            Simulated / illustrative sample data — not a real avalanche advisory
          </span>
          <SampleTag />
        </div>
        <p className="text-[13px] leading-relaxed" style={{ color: OPS.text }}>
          <strong>This widget is 100% fictional sample data</strong>, styled after the real public avalanche.org
          North American Public Avalanche Danger Scale purely for visual/UX reference. It is <strong>NOT</strong>{" "}
          connected to any real avalanche center, and does <strong>NOT</strong> reflect real current conditions
          anywhere. <strong>Before any real backcountry decision, always consult your local avalanche
          center&rsquo;s real, current forecast</strong> (e.g. avalanche.org) — never this demo.
        </p>
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="text-base font-bold" style={{ color: OPS.snow }}>Zone avalanche rating (sample)</div>
          <DangerScaleLegend />
        </div>

        <label className="mb-4 block text-[12.5px]" style={{ color: OPS.textMuted }}>
          Zone
          <select
            value={selectedZoneKey}
            onChange={(e) => setSelectedZoneKey(e.target.value)}
            className="hops-mono mt-1 block w-full max-w-xs rounded-md px-2.5 py-1.5 text-[13px] font-semibold"
            style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
          >
            {ZONES.map((z) => (
              <option key={z.key} value={z.key}>
                {z.label}
              </option>
            ))}
          </select>
        </label>

        {selectedRating && (
          <div className="hops-panel flex flex-wrap items-center gap-4 p-4" style={{ background: "rgba(255,255,255,.02)" }}>
            <div
              className="hops-mono flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg text-2xl font-extrabold"
              style={{
                background: AVALANCHE_LEVEL_COLOR[selectedRating.level],
                color: AVALANCHE_LEVEL_TEXT_ON_COLOR[selectedRating.level],
              }}
            >
              {selectedRating.level}
            </div>
            <div>
              <div className="text-lg font-bold" style={{ color: OPS.snow }}>
                {AVALANCHE_LEVEL_LABEL[selectedRating.level]}
              </div>
              <div className="text-[13px]" style={{ color: OPS.textMuted }}>
                {selectedZone.label} &middot; sample problem: {selectedRating.problemLabel}
              </div>
              <div className="mt-0.5 text-[12px]" style={{ color: OPS.textMuted }}>
                {selectedRating.aspectElevNote}
              </div>
            </div>
          </div>
        )}

        <p className="mt-4 text-[12px] leading-relaxed" style={{ color: OPS.textMuted }}>
          Danger-level colors verified against the National Avalanche Center&rsquo;s own published color reference
          for the North American Public Avalanche Danger Scale (Low #50B848, Moderate #FFF200, Considerable
          #F7941E, High #ED1C24, Extreme #231F20) — reused here purely for visual accuracy to the real public
          scale. The per-zone RATING shown is invented sample data for this concept demo, hardcoded per fictional
          zone, and is never fetched from or compared against any real avalanche-center feed.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function LiveDataRealism() {
  return (
    <div>
      <div className="mb-6">
        <WeatherAndDaylightPanel />
      </div>

      <div className="mb-6">
        <DaysSinceIncidentPanel />
      </div>

      <div className="mb-6">
        <AvalancheWidget />
      </div>

      <p className="mt-6 text-[12.5px] leading-relaxed" style={{ color: OPS.textMuted }}>
        This module deliberately mixes two honesty tiers and labels each clearly: the weather and daylight panel
        above is REAL live public data for a real Alaska coordinate; the days-since-incident counter is a REAL
        value computed from this session&rsquo;s actual incident log; the avalanche widget is CLEARLY LABELED
        SIMULATED sample data, styled after the real public danger scale but never wired to a real feed. Module
        02&rsquo;s schematic zone map (above, in Flight-Following &amp; Dispatch) separately gained simulated
        GPS/ADS-B-style position blips that smoothly interpolate between zones — still fictional, still labeled as
        such.
      </p>
    </div>
  );
}
