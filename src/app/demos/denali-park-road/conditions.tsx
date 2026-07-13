"use client";

// LIVE "DENALI RIGHT NOW" CONDITIONS panel — the showpiece of the Denali Park
// Road info hub.
//
// HONESTY CONTRACT:
//   - We attempt a LIVE observation fetch, client-side, from the National
//     Weather Service public API. Unlike every other live-weather demo in
//     this portfolio, Denali has no single obvious ICAO to read: the panel
//     resolves the NEAREST reporting station to the park entrance area
//     (63.7280, -148.8867) dynamically via NWS's `/points` -> observation
//     stations -> latest-observation chain, then decodes it through the
//     SAME shared decode contract as every other demo (../_wx/nws.ts) —
//     so it gets the same null-field/raw-METAR-fallback robustness without
//     duplicating that logic. Keyless, CORS-enabled throughout. Do NOT set a
//     User-Agent header (forbidden fetch header; browsers set their own).
//   - If the fetch errors or the response has no usable data, the panel
//     falls back to a CLEARLY-LABELED "Sample" observation — NEVER
//     presented as live.
//   - Sunrise / sunset + total daylight for the park are COMPUTED
//     client-side (NOAA solar algorithm) — deterministic, no network,
//     badged "Computed". Interior Alaska's daylight swing is dramatic, so
//     this is a real touch.
//   - "Is the mountain likely out?" is an HONEST HEURISTIC derived from
//     cloud cover (clear/few -> good odds; broken/overcast -> likely
//     hidden). It is explicitly labeled a heuristic, never a guarantee —
//     the mountain makes its own weather and is hidden roughly 2 of every 3
//     visitor days.
//   - Road status is NOT live here. The panel says so and points to the
//     official NPS Current Conditions page.
//
// All classes are Tailwind arbitrary values or the `.dena-*` scoped helpers
// from _shared.tsx. Nothing global is touched.

import { useEffect, useState } from "react";
import { NPS_CONDITIONS_URL } from "./_shared";
import { decodeNwsObservation, hasUsableObs, numOrNull, solarTimes, type NwsObservation, type NwsProps } from "../_wx";
import { SourceBadge, type WxSource as Source } from "../_wx/live";

const BADGE = {
  live: "border-[#8fd6a0]/50 bg-[#8fd6a0]/15 text-[#b6e8c1]",
  computed: "border-[#e6b34e]/45 bg-[#e6b34e]/12 text-[#f0d089]",
  sample: "border-[#f2efe6]/25 bg-[#f2efe6]/8 text-[#f2efe6]/70",
  loading: "border-[#f2efe6]/20 text-[#f2efe6]/45",
};

// Denali park entrance area (near the visitor center / park road mile 0).
const ENTRANCE_LAT = 63.728;
const ENTRANCE_LON = -148.8867;
const TZ = "America/Anchorage";
// NWS "points" endpoint resolves the nearest forecast office + observation
// stations for a coordinate. Keyless, CORS-enabled.
const POINTS_URL = `https://api.weather.gov/points/${ENTRANCE_LAT},${ENTRANCE_LON}`;

type MountainOdds = "good" | "fair" | "hidden" | "unknown";

type State = {
  source: Source;
  d: NwsObservation;
  humidText: string;
  odds: MountainOdds;
  oddsText: string;
  station: string;
};

// ---- mountain-visibility heuristic ----------------------------------------
// Honest, transparent: derived from the shared decoder's ceiling/sky read
// plus NWS's free-text description. NOT a guarantee. Cloud-cover codes never
// encode precipitation or obscuration-without-a-ceiling, so `skyText` (which
// carries the "Broken"/"Overcast"/"Obscured" label) plus `textDescription`
// stand in for the raw per-layer codes the previous local heuristic read.
function mountainOdds(
  ceilFt: number | null,
  skyText: string,
  textDescription: string | null
): { odds: MountainOdds; text: string } {
  const heavy = ceilFt != null || /overcast|broken|obscured/i.test(skyText);
  const scatteredOnly = !heavy && /scattered/i.test(skyText);
  const clearish = !heavy && !scatteredOnly;

  const t = (textDescription || "").toLowerCase();
  const textClear = /clear|sunny|fair/.test(t);
  const textCloudy = /cloud|overcast|rain|snow|fog|mist|storm/.test(t);

  if (clearish || (textClear && !heavy))
    return {
      odds: "good",
      text: "Skies are clear-ish near the entrance — decent odds the summit is out. Still a heuristic: the mountain makes its own weather.",
    };
  if (scatteredOnly)
    return {
      odds: "fair",
      text: "Partly cloudy near the entrance — fair odds, but the peak may be capped. Worth a look, no promises.",
    };
  if (heavy || textCloudy)
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
// broken deck (so the "mountain likely hidden" read is the honest default
// when we have no live sky). NEVER shown as live.
const SAMPLE_WX: NwsObservation = decodeNwsObservation(
  { timestamp: null, rawMessage: "SAMP 021553Z 22006KT 10SM BKN035 11/07 A2980 RMK AO2" },
  "sample",
  TZ
);
const SAMPLE_ODDS = mountainOdds(SAMPLE_WX.ceilFt, SAMPLE_WX.skyText, "Mostly cloudy");
const SAMPLE_HUMID_TEXT = "68%";

export function DenaliConditions() {
  const [sun] = useState(() => solarTimes(new Date(), ENTRANCE_LAT, ENTRANCE_LON, TZ));
  const [s, setS] = useState<State>({
    source: "loading",
    d: SAMPLE_WX,
    humidText: SAMPLE_HUMID_TEXT,
    odds: SAMPLE_ODDS.odds,
    oddsText: SAMPLE_ODDS.text,
    station: "sample",
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
        if (hasUsableObs(props) && alive) {
          const label = stationName || stationId;
          const decoded = decodeNwsObservation(props, stationId, TZ);
          const rh = numOrNull(props.relativeHumidity);
          const oddsResult = mountainOdds(decoded.ceilFt, decoded.skyText, decoded.textDescription);
          setS({
            source: "live",
            d: decoded,
            humidText: rh != null ? `${Math.round(rh)}%` : "—",
            odds: oddsResult.odds,
            oddsText: oddsResult.text,
            station: label,
          });
          return;
        }
        throw new Error("empty observation");
      } catch {
        if (alive)
          setS({
            source: "sample",
            d: SAMPLE_WX,
            humidText: SAMPLE_HUMID_TEXT,
            odds: SAMPLE_ODDS.odds,
            oddsText: SAMPLE_ODDS.text,
            station: "sample",
          });
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
  const oc = oddsChip[s.odds];

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
            {s.oddsText}
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
            value={d.windTextMph}
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
            value={s.humidText}
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
            value={sun.sunrise}
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
            value={sun.sunset}
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
            value={sun.daylight}
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
            value={live ? s.station : "—"}
            sub={live ? `as of ${d.obsTimeText}` : "sample obs"}
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
        <SourceBadge source={source} labels={{ live: "Live · NWS" }} classes={BADGE} />
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
