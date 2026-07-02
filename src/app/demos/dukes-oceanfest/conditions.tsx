"use client";

// LIVE OCEAN CONDITIONS panel — the showpiece of the Duke's OceanFest hub.
//
// HONESTY CONTRACT (per brief):
//   - Tide + water temperature are fetched LIVE, client-side, from NOAA CO-OPS
//     (Tides & Currents), station 1612340 "Honolulu" — the closest official
//     gauge to Waikiki. Those endpoints return Access-Control-Allow-Origin:* so
//     they work from the browser with NO API key. When a value comes back from
//     the network it is badged "LIVE · NOAA" and stamped with its reading time.
//   - Sunrise / sunset are COMPUTED client-side (NOAA solar algorithm) for
//     Waikiki's coordinates — deterministic, no network, badged "Computed".
//   - Surf / swell has no reliable no-key CORS source for Waikiki, so it is
//     shown as a clearly-labeled SAMPLE and NEVER presented as live data.
//   - If a live fetch fails, that metric falls back to a clearly-labeled sample
//     value so the panel still demonstrates the design honestly.
//
// All classes are Tailwind arbitrary values or the `.duke-*` scoped helpers from
// _shared.tsx. Nothing global is touched.

import { useEffect, useState } from "react";

const WAIKIKI_LAT = 21.2762;
const WAIKIKI_LON = -157.8267;
const NOAA_STATION = "1612340"; // Honolulu — nearest official CO-OPS gauge

type Source = "live" | "computed" | "sample" | "loading";

type TideEvent = { time: string; type: "H" | "L"; height: number };

type Conditions = {
  waterTempF: number | null;
  waterTempSource: Source;
  waterTempTime: string | null;
  tides: TideEvent[];
  tideSource: Source;
  sunrise: string;
  sunset: string;
};

// ---- NOAA solar algorithm (client-side, no network) ----------------------
// Returns local sunrise/sunset as "h:mm AM/PM" for the given date + coords.
function solarTimes(date: Date, lat: number, lon: number) {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;
  // day of year
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const dayOfYear = Math.floor(diff / 86400000);

  const zenith = 90.833; // official sunrise/sunset (includes refraction)
  const lngHour = lon / 15;

  function calc(isSunrise: boolean): string | null {
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
    if (cosH > 1 || cosH < -1) return null; // sun never rises/sets
    let H = isSunrise ? 360 - deg * Math.acos(cosH) : deg * Math.acos(cosH);
    H = H / 15;
    const T = H + RA - 0.06571 * t - 6.622;
    let UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24;
    // build a UTC Date for today at UT, then render in local tz
    const d = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        Math.floor(UT),
        Math.round((UT - Math.floor(UT)) * 60)
      )
    );
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Pacific/Honolulu",
    });
  }

  return { sunrise: calc(true) ?? "—", sunset: calc(false) ?? "—" };
}

// ---- honest sample fallbacks (clearly labeled in the UI) ------------------
const SAMPLE: Pick<Conditions, "waterTempF" | "tides"> = {
  waterTempF: 79,
  tides: [
    { time: "5:25 AM", type: "H", height: 1.6 },
    { time: "10:25 AM", type: "L", height: 0.2 },
    { time: "6:00 PM", type: "H", height: 2.1 },
    { time: "11:50 PM", type: "L", height: 0.4 },
  ],
};

// surf/swell is ALWAYS a labeled sample — no reliable no-key CORS source.
const SURF_SAMPLE = {
  faceFt: "2–3 ft",
  swellDir: "S / SSW",
  periodSec: 13,
  wind: "NE trades 10–15 mph",
};

function fmtNoaaTime(t: string): string {
  // NOAA returns "YYYY-MM-DD HH:mm" in local station time (lst_ldt).
  const [, hm] = t.split(" ");
  if (!hm) return t;
  const [hStr, m] = hm.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

export function OceanConditions() {
  const [c, setC] = useState<Conditions>(() => {
    const { sunrise, sunset } = solarTimes(new Date(), WAIKIKI_LAT, WAIKIKI_LON);
    return {
      waterTempF: null,
      waterTempSource: "loading",
      waterTempTime: null,
      tides: [],
      tideSource: "loading",
      sunrise,
      sunset,
    };
  });

  useEffect(() => {
    let alive = true;
    const base = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter";
    const common = `station=${NOAA_STATION}&time_zone=lst_ldt&units=english&format=json&application=bluewaveprojects.com`;

    async function loadTemp() {
      try {
        const r = await fetch(`${base}?date=latest&product=water_temperature&${common}`);
        const j = await r.json();
        const row = j?.data?.[0];
        if (row?.v && alive) {
          setC((prev) => ({
            ...prev,
            waterTempF: Math.round(parseFloat(row.v)),
            waterTempSource: "live",
            waterTempTime: fmtNoaaTime(row.t),
          }));
          return;
        }
        throw new Error("no temp");
      } catch {
        if (alive)
          setC((prev) => ({
            ...prev,
            waterTempF: SAMPLE.waterTempF,
            waterTempSource: "sample",
          }));
      }
    }

    async function loadTides() {
      try {
        const r = await fetch(
          `${base}?date=today&product=predictions&datum=MLLW&interval=hilo&${common}`
        );
        const j = await r.json();
        const preds = j?.predictions;
        if (Array.isArray(preds) && preds.length && alive) {
          setC((prev) => ({
            ...prev,
            tides: preds.map((p: { t: string; v: string; type: string }) => ({
              time: fmtNoaaTime(p.t),
              type: p.type === "H" ? "H" : "L",
              height: Math.round(parseFloat(p.v) * 10) / 10,
            })),
            tideSource: "live",
          }));
          return;
        }
        throw new Error("no tides");
      } catch {
        if (alive)
          setC((prev) => ({ ...prev, tides: SAMPLE.tides, tideSource: "sample" }));
      }
    }

    loadTemp();
    loadTides();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e8f6f2]/12 bg-gradient-to-br from-[#0a3d47] via-[#0e5561] to-[#062a33] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* faint wave texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-20 90 C 80 66, 160 110, 260 84 S 420 70, 440 96" stroke="#e8f6f2" strokeWidth="1.4" fill="none" />
        <path d="M-20 150 C 90 126, 180 170, 280 144 S 420 130, 440 156" stroke="#e8f6f2" strokeWidth="1.2" fill="none" />
        <path d="M-20 220 C 70 196, 150 240, 250 214 S 420 200, 440 226" stroke="#e8f6f2" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative">
        {/* header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="duke-eyebrow !text-[#e8a54c]">Waikiki right now</p>
            <h3 className="duke-display mt-1 text-xl font-semibold text-[#e8f6f2] sm:text-2xl">
              Live ocean conditions
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2fb0a3]/40 bg-[#062a33]/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fe6d4]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2fb0a3] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2fb0a3]" />
            </span>
            Kuhio Beach
          </span>
        </div>

        {/* metric grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {/* Water temp — LIVE */}
          <Metric
            label="Water temp"
            value={c.waterTempF != null ? `${c.waterTempF}°F` : "—"}
            sub={c.waterTempTime ? `as of ${c.waterTempTime}` : " "}
            source={c.waterTempSource}
            icon={
              <path d="M8 3v9.5a3.5 3.5 0 1 0 4 0V3a2 2 0 0 0-4 0Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
            }
          />

          {/* Tide — LIVE, show next event */}
          <Metric
            label="Next tide"
            value={nextTideLabel(c.tides)}
            sub={nextTideSub(c.tides)}
            source={c.tideSource}
            icon={
              <path d="M2 14c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            }
          />

          {/* Sunrise/sunset — COMPUTED */}
          <Metric
            label="Sun"
            value={c.sunset}
            sub={`sunrise ${c.sunrise}`}
            source="computed"
            icon={
              <>
                <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
                <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M15.5 4.5l-1.4 1.4M5.9 14.1l-1.4 1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </>
            }
          />

          {/* Surf — SAMPLE (always labeled) */}
          <Metric
            label="Surf (S shore)"
            value={SURF_SAMPLE.faceFt}
            sub={`${SURF_SAMPLE.swellDir} · ${SURF_SAMPLE.periodSec}s`}
            source="sample"
            icon={
              <path d="M2 15c4 0 5-9 10-9 3 0 5 3 6 5-2-1-4-1-5 1-2-3-5-3-7 0-1.5 2-3 2-4 2Z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
            }
          />
        </div>

        {/* tide strip (today's high/low sequence) */}
        <div className="mt-4 duke-glass p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fe6d4]">
              Today&apos;s tides
            </span>
            <SourceBadge source={c.tideSource} />
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {(c.tides.length ? c.tides : SAMPLE.tides).map((t, i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <span className={`text-[11px] font-bold uppercase ${t.type === "H" ? "text-[#e8a54c]" : "text-[#8fe6d4]"}`}>
                  {t.type === "H" ? "High" : "Low"}
                </span>
                <span className="text-sm font-semibold text-[#e8f6f2]">{t.time}</span>
                <span className="text-[11px] text-[#e8f6f2]/55">{t.height} ft</span>
              </div>
            ))}
          </div>
        </div>

        {/* honest footnote */}
        <p className="mt-3 text-[11px] leading-relaxed text-[#e8f6f2]/55">
          Tide &amp; water-temp read live from{" "}
          <span className="font-semibold text-[#e8f6f2]/80">NOAA Tides &amp; Currents</span>{" "}
          station {NOAA_STATION} (Honolulu), no key required. Sun times computed
          for Waikiki. Surf is a labeled sample — the full build wires the
          organization&apos;s chosen live surf/swell feed. Always confirm before
          heading out.
        </p>
      </div>
    </div>
  );
}

function nextTideLabel(tides: TideEvent[]): string {
  const list = tides.length ? tides : SAMPLE.tides;
  const now = new Date();
  const next = list.find((t) => parseLocalTime(t.time) > now) ?? list[0];
  return next ? (next.type === "H" ? "High tide" : "Low tide") : "—";
}
function nextTideSub(tides: TideEvent[]): string {
  const list = tides.length ? tides : SAMPLE.tides;
  const now = new Date();
  const next = list.find((t) => parseLocalTime(t.time) > now) ?? list[0];
  return next ? `${next.time} · ${next.height} ft` : " ";
}
// parse "h:mm AM/PM" against today (local browser tz) for a rough ordering
function parseLocalTime(s: string): Date {
  const m = s.match(/(\d+):(\d+)\s*(AM|PM)/i);
  const d = new Date();
  if (!m) return d;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const pm = m[3].toUpperCase() === "PM";
  if (pm && h !== 12) h += 12;
  if (!pm && h === 12) h = 0;
  d.setHours(h, min, 0, 0);
  return d;
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
    <div className="duke-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[#8fe6d4]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            {icon}
          </svg>
        </span>
        <SourceBadge source={source} />
      </div>
      <span className="duke-display text-xl font-semibold leading-none text-[#e8f6f2] sm:text-2xl">
        {value}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#e8f6f2]/50">
        {label}
      </span>
      <span className="mt-0.5 text-[11px] text-[#e8f6f2]/65">{sub}</span>
    </div>
  );
}

function SourceBadge({ source }: { source: Source }) {
  if (source === "loading")
    return (
      <span className="rounded-full border border-[#e8f6f2]/20 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#e8f6f2]/45">
        …
      </span>
    );
  const map: Record<Exclude<Source, "loading">, { t: string; cls: string }> = {
    live: { t: "Live · NOAA", cls: "border-[#2fb0a3]/50 bg-[#2fb0a3]/15 text-[#8fe6d4]" },
    computed: { t: "Computed", cls: "border-[#e8a54c]/45 bg-[#e8a54c]/12 text-[#f2c884]" },
    sample: { t: "Sample", cls: "border-[#e8f6f2]/25 bg-[#e8f6f2]/8 text-[#e8f6f2]/70" },
  };
  const m = map[source];
  return (
    <span className={`rounded-full border px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] ${m.cls}`}>
      {m.t}
    </span>
  );
}
