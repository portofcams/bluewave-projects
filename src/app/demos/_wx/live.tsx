"use client";

// Shared live-data library for BlueWave demos — CLIENT hooks & UI atoms.
//
// This is the only "use client" file in _wx. It provides:
//   - useRelativeTime / <UpdatedAgo>  — the self-ticking "Updated 2 min ago"
//     stamp that makes a live panel visibly refresh.
//   - <SourceBadge>                   — a THEMEABLE Live/Sample/Computed pill
//     (each demo passes its own palette classes so nothing is baked in).
//   - useNwsObservation               — fetch + AUTO-REFRESH an NWS station.
//   - useTidePredictions              — fetch + auto-refresh NOAA tides, and
//     recompute the "now" marker every minute so it creeps across the curve.
//
// New demos import these; the honest Live/Sample/Computed fallback is built in.

import { useEffect, useRef, useState } from "react";
import {
  decodeNwsObservation,
  fetchNwsLatest,
  type NwsObservation,
} from "./nws";
import {
  buildTideView,
  fetchTideEvents,
  naiveMin,
  zonedParts,
  type CurveDims,
  type TideEvent,
  type TideView,
} from "./tides";

export type WxSource = "live" | "computed" | "sample" | "loading";

// ---------------------------------------------------------------------------
// useRelativeTime — re-renders on a timer, returns "just now" / "2 min ago".
// SSR-safe: returns "—" while `ts` is null (before the first client fetch).
// ---------------------------------------------------------------------------
export function useRelativeTime(ts: number | null, tickMs = 30_000): string {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (ts == null) return;
    const id = setInterval(() => setTick((t) => t + 1), tickMs);
    return () => clearInterval(id);
  }, [ts, tickMs]);
  if (ts == null) return "—";
  const s = Math.max(0, Math.round((Date.now() - ts) / 1000));
  if (s < 45) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return `${h} hr ago`;
}

// ---------------------------------------------------------------------------
// <UpdatedAgo> — the live-tick stamp. Renders nothing until there's a live
// fetch time; then shows "Updated 2 min ago · auto-refreshes" and ticks.
// ---------------------------------------------------------------------------
export function UpdatedAgo({
  at,
  live,
  className = "",
  suffix = " · auto-refreshes",
}: {
  at: number | null;
  live: boolean;
  className?: string;
  suffix?: string;
}) {
  const rel = useRelativeTime(at);
  if (!live || at == null) return null;
  return (
    <span className={className}>
      Updated {rel}
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// <SourceBadge> — themeable Live/Sample/Computed pill. Each demo passes its own
// `classes` (Tailwind color strings) and `labels` (e.g. "Live · NWS").
// ---------------------------------------------------------------------------
export type BadgeLabels = { live: string; computed?: string; sample?: string };
export type BadgeClasses = { live: string; computed: string; sample: string; loading?: string };

export function SourceBadge({
  source,
  labels,
  classes,
}: {
  source: WxSource;
  labels: BadgeLabels;
  classes: BadgeClasses;
}) {
  const base = "rounded-full border px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em]";
  if (source === "loading")
    return <span className={`${base} ${classes.loading ?? "border-white/20 text-white/45"}`}>…</span>;
  const label =
    source === "live" ? labels.live : source === "computed" ? labels.computed ?? "Computed" : labels.sample ?? "Sample";
  return <span className={`${base} ${classes[source]}`}>{label}</span>;
}

// ---------------------------------------------------------------------------
// useNwsObservation — fetch + auto-refresh an NWS station observation.
// Returns { source, obs, fetchedAt }. On a refresh failure after a prior live
// read, it keeps the last live data rather than downgrading to sample.
// ---------------------------------------------------------------------------
export function useNwsObservation(
  icao: string,
  opts: {
    sample: NwsObservation;
    station?: string; // ICAO used when a METAR must be assembled; defaults to `icao`
    tz?: string;
    refreshMs?: number;
  }
): { source: WxSource; obs: NwsObservation; fetchedAt: number | null } {
  const { sample, station = icao, tz = "America/Anchorage", refreshMs = 5 * 60_000 } = opts;
  const [state, setState] = useState<{ source: WxSource; obs: NwsObservation; fetchedAt: number | null }>({
    source: "loading",
    obs: sample,
    fetchedAt: null,
  });

  useEffect(() => {
    let alive = true;
    async function load() {
      const props = await fetchNwsLatest(icao);
      if (!alive) return;
      if (props) {
        setState({ source: "live", obs: decodeNwsObservation(props, station, tz), fetchedAt: Date.now() });
      } else {
        setState((prev) => (prev.source === "live" ? prev : { source: "sample", obs: sample, fetchedAt: prev.fetchedAt }));
      }
    }
    load();
    const id = setInterval(load, refreshMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [icao, station, tz, refreshMs, sample]);

  return state;
}

// ---------------------------------------------------------------------------
// useTidePredictions — fetch + auto-refresh NOAA tide predictions, and
// recompute the day view every minute so "tide now" and the marker move live.
// ---------------------------------------------------------------------------
export function useTidePredictions(
  station: string,
  opts: {
    tz: string;
    sampleView: TideView;
    refreshMs?: number; // refetch predictions (default 30 min)
    recomputeMs?: number; // recompute "now" from cached events (default 60 s)
    dims?: CurveDims;
  }
): { source: WxSource; view: TideView; fetchedAt: number | null } {
  const { tz, sampleView, refreshMs = 30 * 60_000, recomputeMs = 60_000, dims } = opts;
  const eventsRef = useRef<TideEvent[] | null>(null);
  const [state, setState] = useState<{ source: WxSource; view: TideView; fetchedAt: number | null }>({
    source: "loading",
    view: sampleView,
    fetchedAt: null,
  });

  useEffect(() => {
    let alive = true;
    function recompute() {
      const ev = eventsRef.current;
      if (!ev || !alive) return;
      const hp = zonedParts(new Date(), tz);
      const p2 = (n: number) => String(n).padStart(2, "0");
      const todayYMD = `${hp.y}-${p2(hp.mo)}-${p2(hp.d)}`;
      const refNow = naiveMin(hp.y, hp.mo, hp.d, hp.h, hp.mi);
      const view = buildTideView(ev, refNow, todayYMD, dims);
      if (view) setState((prev) => ({ ...prev, source: "live", view }));
    }
    async function load() {
      const ev = await fetchTideEvents(station, tz);
      if (!alive) return;
      if (ev) {
        eventsRef.current = ev;
        setState((prev) => ({ ...prev, fetchedAt: Date.now() }));
        recompute();
      } else {
        setState((prev) => (prev.source === "live" ? prev : { ...prev, source: "sample" }));
      }
    }
    load();
    const fetchId = setInterval(load, refreshMs);
    const recomputeId = setInterval(recompute, recomputeMs);
    return () => {
      alive = false;
      clearInterval(fetchId);
      clearInterval(recomputeId);
    };
  }, [station, tz, refreshMs, recomputeMs, dims, sampleView]);

  return state;
}
