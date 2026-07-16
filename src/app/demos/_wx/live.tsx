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
import {
  fetchCurrentPredictions,
  fetchSwanWaves,
  fetchUvIndex,
  fetchWaterTempF,
  type CurrentState,
  type SwanWaves,
  type UvIndex,
} from "./marine";
import {
  AIS_PROXY_URL,
  fetchAisVessels,
  makeSampleFleet,
  type Bbox,
  type Vessel,
} from "./ais";
import { fetchSightings, type Sighting } from "./sightings";
import { fetchBuoyObservation, type BuoyObservation } from "./buoy";

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

// ---------------------------------------------------------------------------
// useMarine — fetch + auto-refresh the surf/sea cluster (SWAN modeled waves,
// CO-OPS water temperature, EPA UV) in one hook. `source` is "live" if any of
// the three succeeded, else the labeled sample. Keeps the last live read on a
// transient failure.
// ---------------------------------------------------------------------------
export type MarineData = { waves: SwanWaves | null; waterTempF: number | null; uv: UvIndex | null };

export function useMarine(opts: {
  tempStation: string;
  uvZip: string;
  sample: MarineData;
  waveLat?: number;
  waveLon360?: number;
  waveDataset?: string; // island SWAN grid, e.g. "swan_maui"; defaults to swan_oahu
  refreshMs?: number;
}): { source: WxSource; data: MarineData; fetchedAt: number | null } {
  const { tempStation, uvZip, sample, waveLat, waveLon360, waveDataset, refreshMs = 15 * 60_000 } = opts;
  const [state, setState] = useState<{ source: WxSource; data: MarineData; fetchedAt: number | null }>({
    source: "loading",
    data: sample,
    fetchedAt: null,
  });

  useEffect(() => {
    let alive = true;
    async function load() {
      const [waves, waterTempF, uv] = await Promise.all([
        fetchSwanWaves(waveLat, waveLon360, undefined, waveDataset),
        fetchWaterTempF(tempStation),
        fetchUvIndex(uvZip),
      ]);
      if (!alive) return;
      if (waves != null || waterTempF != null || uv != null) {
        setState({ source: "live", data: { waves, waterTempF, uv }, fetchedAt: Date.now() });
      } else {
        setState((prev) => (prev.source === "live" ? prev : { source: "sample", data: sample, fetchedAt: prev.fetchedAt }));
      }
    }
    load();
    const id = setInterval(load, refreshMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [tempStation, uvZip, waveLat, waveLon360, waveDataset, refreshMs, sample]);

  return state;
}

// ---------------------------------------------------------------------------
// useCurrents — fetch + auto-refresh a NOAA CO-OPS tidal-current station (for
// places where the current is the story, e.g. Admiralty Inlet / Point Wilson).
// ---------------------------------------------------------------------------
export function useCurrents(
  station: string,
  opts: { tz: string; sample: CurrentState; refreshMs?: number }
): { source: WxSource; state: CurrentState; fetchedAt: number | null } {
  const { tz, sample, refreshMs = 15 * 60_000 } = opts;
  const [s, setS] = useState<{ source: WxSource; state: CurrentState; fetchedAt: number | null }>({
    source: "loading",
    state: sample,
    fetchedAt: null,
  });
  useEffect(() => {
    let alive = true;
    async function load() {
      const cur = await fetchCurrentPredictions(station, tz);
      if (!alive) return;
      if (cur) setS({ source: "live", state: cur, fetchedAt: Date.now() });
      else setS((prev) => (prev.source === "live" ? prev : { source: "sample", state: sample, fetchedAt: prev.fetchedAt }));
    }
    load();
    const id = setInterval(load, refreshMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [station, tz, refreshMs, sample]);
  return s;
}

// ---------------------------------------------------------------------------
// useWaterTemp — fetch + auto-refresh a NOAA CO-OPS water_temperature station.
// ---------------------------------------------------------------------------
export function useWaterTemp(
  station: string,
  opts: { sample: number | null; refreshMs?: number }
): { source: WxSource; tempF: number | null; fetchedAt: number | null } {
  const { sample, refreshMs = 15 * 60_000 } = opts;
  const [s, setS] = useState<{ source: WxSource; tempF: number | null; fetchedAt: number | null }>({
    source: "loading",
    tempF: sample,
    fetchedAt: null,
  });
  useEffect(() => {
    let alive = true;
    async function load() {
      const t = await fetchWaterTempF(station);
      if (!alive) return;
      if (t != null) setS({ source: "live", tempF: t, fetchedAt: Date.now() });
      else setS((prev) => (prev.source === "live" ? prev : { source: "sample", tempF: sample, fetchedAt: prev.fetchedAt }));
    }
    load();
    const id = setInterval(load, refreshMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [station, refreshMs, sample]);
  return s;
}

// ---------------------------------------------------------------------------
// useAisVessels — poll the AIS proxy for live vessel positions; keep the last
// live read on a transient failure; when the proxy is unreachable, return the
// clearly-labeled animated SAMPLE fleet (driven by a tick) so the map is never
// blank and never fakes "live." Returns { source, vessels, fetchedAt }.
// ---------------------------------------------------------------------------
export function useAisVessels(opts: {
  bbox: Bbox;
  url?: string;
  refreshMs?: number; // proxy poll interval (default 20 s)
  animMs?: number; // sample-drift tick (default 2.5 s)
}): { source: WxSource; vessels: Vessel[]; fetchedAt: number | null } {
  const { bbox, url = AIS_PROXY_URL, refreshMs = 20_000, animMs = 2500 } = opts;
  const [live, setLive] = useState<{ vessels: Vessel[]; fetchedAt: number } | null>(null);
  const [source, setSource] = useState<WxSource>("loading");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let alive = true;
    async function load() {
      const v = await fetchAisVessels(url);
      if (!alive) return;
      // Explicit !== null, not truthiness: an empty array is a genuine live
      // result (nothing in range right now), not a failure. Relying on "[]
      // is truthy" here would work by accident of JS semantics; say what's
      // actually meant instead.
      if (v !== null) {
        setLive({ vessels: v, fetchedAt: Date.now() });
        setSource("live");
      } else {
        setSource((prev) => (prev === "live" ? prev : "sample"));
      }
    }
    load();
    const id = setInterval(load, refreshMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [url, refreshMs]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), animMs);
    return () => clearInterval(id);
  }, [animMs]);

  const isLive = source === "live" && live != null;
  const vessels = isLive ? live!.vessels : makeSampleFleet(bbox, tick);
  return { source, vessels, fetchedAt: isLive ? live!.fetchedAt : null };
}

// ---------------------------------------------------------------------------
// useSightings — fetch + auto-refresh community-reported whale sightings
// (Acartia, keyless + CORS, no proxy) filtered to `bbox`. Returns { source,
// sightings, fetchedAt }. Community-reported / approximate / delayed — the UI
// must label it as such and show coarse areas, never precise whale pins.
// ---------------------------------------------------------------------------
export function useSightings(
  bbox: Bbox,
  opts: { maxAgeHours?: number; cap?: number; refreshMs?: number } = {}
): { source: WxSource; sightings: Sighting[]; fetchedAt: number | null } {
  const { maxAgeHours = 48, cap = 12, refreshMs = 5 * 60_000 } = opts;
  const [s, setS] = useState<{ source: WxSource; sightings: Sighting[]; fetchedAt: number | null }>({
    source: "loading",
    sightings: [],
    fetchedAt: null,
  });
  useEffect(() => {
    let alive = true;
    async function load() {
      const list = await fetchSightings(bbox, { maxAgeHours, cap });
      if (!alive) return;
      if (list) setS({ source: "live", sightings: list, fetchedAt: Date.now() });
      else setS((prev) => (prev.source === "live" ? prev : { source: "sample", sightings: [], fetchedAt: prev.fetchedAt }));
    }
    load();
    const id = setInterval(load, refreshMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [bbox, maxAgeHours, cap, refreshMs]);
  return s;
}

// ---------------------------------------------------------------------------
// useBuoyObservation — fetch + auto-refresh a real NDBC buoy reading (via the
// ai.portofcams.com relay in ./buoy). NDBC itself only updates ~every 30 min,
// so this defaults to a longer interval than the small NWS/tide feeds.
// ---------------------------------------------------------------------------
export function useBuoyObservation(
  station: string,
  opts: { sample: BuoyObservation; refreshMs?: number }
): { source: WxSource; obs: BuoyObservation; fetchedAt: number | null } {
  const { sample, refreshMs = 15 * 60_000 } = opts;
  const [s, setS] = useState<{ source: WxSource; obs: BuoyObservation; fetchedAt: number | null }>({
    source: "loading",
    obs: sample,
    fetchedAt: null,
  });

  useEffect(() => {
    let alive = true;
    async function load() {
      const obs = await fetchBuoyObservation(station);
      if (!alive) return;
      const hasReading = obs && (obs.waveHeightM != null || obs.waterTempC != null);
      if (hasReading) {
        setS({ source: "live", obs: obs!, fetchedAt: Date.now() });
      } else {
        setS((prev) => (prev.source === "live" ? prev : { source: "sample", obs: sample, fetchedAt: prev.fetchedAt }));
      }
    }
    load();
    const id = setInterval(load, refreshMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [station, refreshMs, sample]);

  return s;
}
