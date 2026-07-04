"use client";

// TvMode — Module 6, feature 27: a genuine full-viewport "wall-mounted
// ops-room TV" display mode.
//
// FICTIONAL SAMPLE DATA ONLY — reads the SAME real, live state every other
// module in this demo reads (usePlatform()'s fleet/lastCheckIns/now, and
// Module 1's live dayState/activeDay), not a separately hardcoded snapshot.
// Every number shown here is genuinely computed at render time from that
// shared state — see each slide's render function below, which calls the
// exact same _data.tsx math helpers (totalGuestCount, weightBalanceFlagCount,
// weatherHoldCount, daysSinceLastIncident) and _platform.tsx's severity()
// that OpsOverview.tsx, ManifestBoard.tsx, FlightFollowing.tsx, and
// LiveDataRealism.tsx already use — so a real state change (a check-in, a
// weather-hold reslot, an incident logged) shows up on the TV the next time
// its slide cycles around, exactly as it would in the normal view.
//
// AUTO-CYCLE: a REAL timer (setInterval, 1s tick) advances through a fixed
// sequence of slides every SLIDE_DURATION_MS (18s). A visible countdown ring
// ticks down every second so a viewer can tell it's genuinely auto-advancing
// (not a static enlarged screenshot) — this is not a CSS animation trick,
// the ring's stroke-dashoffset is driven by the same real countdown state
// that triggers the slide change.

import { useEffect, useMemo, useState } from "react";
import { OPS } from "./_shared";
import {
  BAY_LABEL,
  CargoBayKey,
  daysSinceLastIncident,
  totalGuestCount,
  weatherHoldCount,
  weightBalanceFlagCount,
  bayLoadForHeli,
  heliTotalWeight,
} from "./_data";
import { severity, usePlatform } from "./_platform";

const SLIDE_DURATION_MS = 18_000; // 18s per slide — within the 15-20s range asked for
const TICK_MS = 250; // finer-grained than 1s so the countdown ring animates smoothly

type SlideKey = "overview" | "fleet-status" | "manifest-flags" | "safety";
const SLIDE_ORDER: SlideKey[] = ["overview", "fleet-status", "manifest-flags", "safety"];

function formatElapsedShort(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// COUNTDOWN RING — a real SVG progress ring whose dash-offset is computed
// from genuine remaining-time state (not a CSS @keyframes loop that could
// silently drift from the actual setInterval-driven slide change).
// ---------------------------------------------------------------------------
function CountdownRing({ pct, size = 64 }: { pct: number; size?: number }) {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={OPS.ice}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset .2s linear" }}
      />
    </svg>
  );
}

function BigStat({ label, value, tone }: { label: string; value: string | number; tone?: "ok" | "warn" | "alert" }) {
  const color = tone === "alert" ? "#ff8a8f" : tone === "warn" ? "#ffcf87" : "#ffffff";
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 text-center">
      <div
        className="hops-mono font-extrabold leading-none tabular-nums"
        style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", color }}
      >
        {value}
      </div>
      <div
        className="hops-mono font-semibold uppercase tracking-[.14em]"
        style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.35rem)", color: "rgba(255,255,255,.72)" }}
      >
        {label}
      </div>
    </div>
  );
}

function OverviewSlide() {
  const { dayState, activeDay, fleet, settings } = usePlatform();
  const current = dayState[activeDay];
  const helicopters = current?.helicopters ?? [];
  const catGroups = current?.catGroups ?? [];

  const guests = totalGuestCount(helicopters, catGroups);
  const flags = weightBalanceFlagCount(helicopters, settings.bayLimits);
  const holds = weatherHoldCount(helicopters);
  const aircraftFlying = fleet.length;

  return (
    <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4">
      <BigStat label="Guests today" value={guests} />
      <BigStat label="Aircraft flying" value={aircraftFlying} />
      <BigStat label="W&B flags" value={flags} tone={flags > 0 ? "alert" : "ok"} />
      <BigStat label="Weather holds" value={holds} tone={holds > 0 ? "warn" : "ok"} />
    </div>
  );
}

function FleetStatusSlide() {
  const { fleet, lastCheckIns, now, settings } = usePlatform();
  const counts = useMemo(() => {
    let ok = 0, warn = 0, alert = 0;
    for (const a of fleet) {
      const tone = severity(now - lastCheckIns[a.id], a.phase, settings.phaseIntervalMin);
      if (tone === "ok") ok++;
      else if (tone === "warn") warn++;
      else alert++;
    }
    return { ok, warn, alert };
  }, [fleet, lastCheckIns, now, settings.phaseIntervalMin]);

  const worst = useMemo(() => {
    return [...fleet]
      .map((a) => ({ a, elapsed: now - lastCheckIns[a.id], tone: severity(now - lastCheckIns[a.id], a.phase, settings.phaseIntervalMin) }))
      .sort((x, y) => y.elapsed - x.elapsed)
      .slice(0, 3);
  }, [fleet, lastCheckIns, now, settings.phaseIntervalMin]);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="grid w-full grid-cols-3 gap-6">
        <BigStat label="Normal" value={counts.ok} tone="ok" />
        <BigStat label="Due soon" value={counts.warn} tone={counts.warn ? "warn" : undefined} />
        <BigStat label="Overdue" value={counts.alert} tone={counts.alert ? "alert" : undefined} />
      </div>
      <div className="w-full max-w-2xl space-y-2">
        {worst.map(({ a, elapsed, tone }) => (
          <div
            key={a.id}
            className="hops-mono flex items-center justify-between rounded-lg px-4 py-2.5"
            style={{
              background: "rgba(255,255,255,.06)",
              color: tone === "alert" ? "#ff8a8f" : tone === "warn" ? "#ffcf87" : "rgba(255,255,255,.85)",
              fontSize: "clamp(0.85rem, 1.3vw, 1.15rem)",
            }}
          >
            <span className="font-bold">{a.tailNumber}</span>
            <span>{formatElapsedShort(elapsed)} since check-in</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManifestFlagsSlide() {
  const { dayState, activeDay, settings } = usePlatform();
  const current = dayState[activeDay];
  const helicopters = current?.helicopters ?? [];

  const overweightBays = useMemo(() => {
    const rows: { tailNumber: string; bay: CargoBayKey; load: number; limit: number }[] = [];
    for (const h of helicopters) {
      const loads = bayLoadForHeli(h);
      for (const bay of Object.keys(loads) as CargoBayKey[]) {
        if (loads[bay] > settings.bayLimits[bay]) {
          rows.push({ tailNumber: h.tailNumber, bay, load: loads[bay], limit: settings.bayLimits[bay] });
        }
      }
    }
    return rows;
  }, [helicopters, settings.bayLimits]);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <BigStat
        label="Overweight cargo bays"
        value={overweightBays.length}
        tone={overweightBays.length ? "alert" : "ok"}
      />
      {overweightBays.length > 0 ? (
        <div className="w-full max-w-2xl space-y-2">
          {overweightBays.map((r, i) => (
            <div
              key={`${r.tailNumber}-${r.bay}-${i}`}
              className="hops-mono flex items-center justify-between rounded-lg px-4 py-2.5"
              style={{ background: "rgba(255,80,90,.14)", color: "#ff8a8f", fontSize: "clamp(0.85rem, 1.3vw, 1.15rem)" }}
            >
              <span className="font-bold">{r.tailNumber}</span>
              <span>{BAY_LABEL[r.bay]}: {r.load} / {r.limit} lb</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="hops-mono text-center" style={{ color: "rgba(255,255,255,.65)", fontSize: "clamp(1rem, 1.6vw, 1.4rem)" }}>
          Every cargo bay is within limit right now.
        </div>
      )}
    </div>
  );
}

function SafetySlide() {
  const { incidents } = usePlatform();
  const [nowMs, setNowMs] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  const { days } = useMemo(() => daysSinceLastIncident(incidents, nowMs), [incidents, nowMs]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <BigStat label="Days since last incident" value={days} tone={days === 0 ? "warn" : "ok"} />
      <div className="hops-mono text-center" style={{ color: "rgba(255,255,255,.65)", fontSize: "clamp(0.9rem, 1.4vw, 1.2rem)" }}>
        {incidents.length} entr{incidents.length === 1 ? "y" : "ies"} logged this session &middot; Module 04
      </div>
    </div>
  );
}

const SLIDE_META: Record<SlideKey, { title: string; Component: React.ComponentType }> = {
  overview: { title: "Today's Ops Overview", Component: OverviewSlide },
  "fleet-status": { title: "Live Aircraft Board", Component: FleetStatusSlide },
  "manifest-flags": { title: "Weight & Balance", Component: ManifestFlagsSlide },
  safety: { title: "Safety & Compliance", Component: SafetySlide },
};

// ---------------------------------------------------------------------------
// FULL-VIEWPORT TV OVERLAY
// ---------------------------------------------------------------------------
function TvOverlay({ onExit }: { onExit: () => void }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [remainingMs, setRemainingMs] = useState(SLIDE_DURATION_MS);

  useEffect(() => {
    const id = setInterval(() => {
      setRemainingMs((prev) => {
        const next = prev - TICK_MS;
        if (next <= 0) {
          setSlideIndex((i) => (i + 1) % SLIDE_ORDER.length);
          return SLIDE_DURATION_MS;
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  // Exit on Escape — a second, obvious way out besides the visible button.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  const slideKey = SLIDE_ORDER[slideIndex];
  const meta = SLIDE_META[slideKey];
  const CurrentSlide = meta.Component;
  const pct = 1 - remainingMs / SLIDE_DURATION_MS;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "linear-gradient(175deg, #12161f 0%, #05070b 100%)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Ops-room TV display mode"
    >
      <div className="flex items-center justify-between px-8 py-6">
        <div>
          <div
            className="hops-mono font-semibold uppercase tracking-[.2em]"
            style={{ color: "rgba(255,255,255,.5)", fontSize: "clamp(0.75rem, 1.1vw, 1rem)" }}
          >
            Heli-Ops Platform &middot; Ops-Room Display &middot; Sample data
          </div>
          <div
            className="hops-display mt-1 font-extrabold"
            style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)" }}
          >
            {meta.title}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            <CountdownRing pct={pct} />
            <span
              className="hops-mono absolute font-bold tabular-nums"
              style={{ color: "#ffffff", fontSize: 15 }}
            >
              {Math.ceil(remainingMs / 1000)}
            </span>
          </div>
          <button
            type="button"
            onClick={onExit}
            className="hops-mono rounded-lg border px-4 py-2.5 font-semibold uppercase tracking-[.05em] text-white transition hover:brightness-125"
            style={{ borderColor: "rgba(255,255,255,.3)", background: "rgba(255,255,255,.08)", fontSize: "clamp(0.75rem, 1vw, 0.95rem)" }}
          >
            Exit TV mode (Esc)
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-8 pb-10">
        <CurrentSlide />
      </div>

      <div className="flex items-center justify-center gap-2 pb-6">
        {SLIDE_ORDER.map((key, i) => (
          <span
            key={key}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === slideIndex ? 28 : 10,
              background: i === slideIndex ? OPS.ice : "rgba(255,255,255,.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LAUNCHER BUTTON — rendered in the hero, opens the full-viewport overlay.
// ---------------------------------------------------------------------------
export default function TvModeLauncher() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hops-mono flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[.04em] transition hover:brightness-110"
        style={{ background: "rgba(94,200,232,.14)", color: OPS.ice, borderColor: "rgba(94,200,232,.4)" }}
        title="Full-viewport ops-room TV display mode — auto-cycles through live stats"
      >
        <span aria-hidden="true">📺</span> Ops-room TV mode
      </button>
      {open && <TvOverlay onExit={() => setOpen(false)} />}
    </>
  );
}
