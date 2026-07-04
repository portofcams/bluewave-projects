"use client";

// FlightFollowing — Module 2 (Dispatch & Flight Following) interactive component.
//
// FICTIONAL SAMPLE DATA ONLY. The same invented tail numbers and pilot
// initials from Module 1 (ManifestBoard.tsx) are reused here for continuity
// within this single concept demo — they do not represent any real aircraft,
// pilot, or operator.
//
// THIS IS A DEMO SIMULATION, NOT A REAL FLIGHT-FOLLOWING SYSTEM. It is not
// connected to any aircraft, transponder, ADS-B feed, or dispatch radio. It
// is not a certified or FAA-compliant flight-locating system and must never
// be treated as a substitute for one. Every timer here runs against a
// simulated last-check-in timestamp captured in the browser at page load —
// see SIM_NOTE below and the inline banners rendered by this component.
//
// Demonstrates, with real React state + real client-side timers (not a
// static mockup):
//   1. A live board — one card per fictional aircraft, each with a REAL
//      ticking "time since last check-in" and "time until check-in due",
//      updated every second via useEffect + setInterval against a captured
//      Date.now() baseline.
//   2. Color-coded status: green / amber / red, driven purely by elapsed
//      time vs. a configurable check-in interval (default 60 min).
//   3. An escalation panel that appears for any aircraft in the red state,
//      listing a sample, customizable escalation sequence.
//   4. A structured, timestamped activity log — seeded with sample history,
//      and genuinely appended to when a live status change happens or a
//      user simulates a check-in.
//   5. A manual "Simulate check-in" button per aircraft that resets its
//      timer to zero and appends a log entry.

import { useEffect, useMemo, useRef, useState } from "react";
import { OPS, SampleTag } from "./_shared";
import { FLEET_ROSTER } from "./_data";

// ---------------------------------------------------------------------------
// CONFIG — sample/default check-in interval. Clearly labeled as configurable;
// this demo does not persist a per-operator config, it just shows the knob.
// ---------------------------------------------------------------------------
const CHECKIN_INTERVAL_MIN = 60; // default check-in interval, minutes
const AMBER_THRESHOLD_PCT = 0.75; // fraction of interval elapsed before amber
const TICK_MS = 1000;

type AircraftStatus = "In Flight" | "At Zone" | "Returning";
type SeverityTone = "ok" | "warn" | "alert";

type Aircraft = {
  id: string;
  tailNumber: string;
  model: string;
  pilotName: string;
  status: AircraftStatus;
  // Minutes-ago offset used ONLY to seed each aircraft's simulated last
  // check-in relative to component mount — see useEffect below where this
  // is converted into a real epoch-ms timestamp via Date.now().
  seedMinutesAgo: number;
};

type LogEntry = {
  id: string;
  ts: number; // epoch ms, real Date.now() at time of the event
  tailNumber: string;
  message: string;
  tone: SeverityTone;
};

// ---------------------------------------------------------------------------
// SEED FLEET — same fictional tail numbers / pilot names as Module 1
// (ManifestBoard.tsx / ./_data.tsx) for continuity within this one concept
// demo. Not real aircraft or people. Spread across green / amber / red so
// the board reads as a realistic busy-day mix rather than one flag apiece.
// ---------------------------------------------------------------------------
function seedAircraft(): Aircraft[] {
  const statusByTail: Record<string, { status: AircraftStatus; seedMinutesAgo: number }> = {
    N412QX: { status: "In Flight", seedMinutesAgo: 6 }, // recently checked in -> green
    N287TR: { status: "At Zone", seedMinutesAgo: 22 }, // comfortably green
    N559HB: { status: "At Zone", seedMinutesAgo: 48 }, // approaching the 60-min window -> amber
    N634VK: { status: "Returning", seedMinutesAgo: 74 }, // already past interval on load -> red
    N801ZL: { status: "In Flight", seedMinutesAgo: 57 }, // near the amber threshold -> amber
  };
  return FLEET_ROSTER.map((f) => ({
    id: f.id,
    tailNumber: f.tailNumber,
    model: f.model,
    pilotName: f.pilotName,
    ...statusByTail[f.tailNumber],
  }));
}

// ---------------------------------------------------------------------------
// SAMPLE ESCALATION PROTOCOL — invented, generic sequence. Explicitly labeled
// as a customizable sample, not a real SOP tied to any regulation or operator.
// ---------------------------------------------------------------------------
const ESCALATION_STEPS = [
  "Alert backup dispatcher on duty",
  "Attempt direct radio contact with the aircraft",
  "Attempt satellite / cell contact with the pilot-in-command",
  "If no contact within 15 minutes of overdue status, initiate search-and-rescue notification per operator SOP",
];

// ---------------------------------------------------------------------------
// TIME HELPERS
// ---------------------------------------------------------------------------
function formatElapsed(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatClock(ts: number): string {
  return new Date(ts).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function severity(elapsedMs: number): SeverityTone {
  const intervalMs = CHECKIN_INTERVAL_MIN * 60 * 1000;
  if (elapsedMs >= intervalMs) return "alert";
  if (elapsedMs >= intervalMs * AMBER_THRESHOLD_PCT) return "warn";
  return "ok";
}

// ---------------------------------------------------------------------------
// SMALL UI PRIMITIVES
// ---------------------------------------------------------------------------
function StatusDot({ tone }: { tone: SeverityTone }) {
  const color = tone === "alert" ? OPS.red : tone === "warn" ? OPS.amber : OPS.green;
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
        style={{ background: color, animationDuration: tone === "alert" ? "0.9s" : "2.4s" }}
      />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: color }} />
    </span>
  );
}

function TonePill({ tone, children }: { tone: SeverityTone; children: React.ReactNode }) {
  const styles: Record<SeverityTone, { bg: string; fg: string; border: string }> = {
    ok: { bg: "rgba(62,207,142,.14)", fg: OPS.green, border: "rgba(62,207,142,.4)" },
    warn: { bg: "rgba(240,168,60,.16)", fg: OPS.amber, border: "rgba(240,168,60,.45)" },
    alert: { bg: "rgba(229,72,77,.16)", fg: OPS.red, border: "rgba(229,72,77,.5)" },
  };
  const s = styles[tone];
  return (
    <span className="hops-pill" style={{ background: s.bg, color: s.fg, border: `1px solid ${s.border}` }}>
      {children}
    </span>
  );
}

function AircraftCard({
  aircraft,
  now,
  onCheckIn,
}: {
  aircraft: Aircraft & { lastCheckIn: number };
  now: number;
  onCheckIn: (id: string) => void;
}) {
  const elapsedMs = now - aircraft.lastCheckIn;
  const tone = severity(elapsedMs);
  const intervalMs = CHECKIN_INTERVAL_MIN * 60 * 1000;
  const remainingMs = intervalMs - elapsedMs;

  const toneLabel = tone === "alert" ? "Overdue" : tone === "warn" ? "Due soon" : "Normal";
  const glow =
    tone === "alert"
      ? "rgba(229,72,77,.55)"
      : tone === "warn"
      ? "rgba(240,168,60,.5)"
      : "rgba(62,207,142,.35)";

  return (
    <div
      className="hops-panel overflow-hidden transition-colors"
      style={{ borderColor: glow, boxShadow: tone === "alert" ? `0 0 0 1px ${glow}, 0 10px 28px -16px rgba(0,0,0,.7)` : undefined }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div className="flex items-center gap-3">
          <StatusDot tone={tone} />
          <span
            className="hops-mono flex h-8 items-center rounded-md px-2.5 text-[13px] font-bold"
            style={{ background: "rgba(94,200,232,.14)", color: OPS.ice, border: "1px solid rgba(94,200,232,.35)" }}
          >
            {aircraft.tailNumber}
          </span>
          <div>
            <div className="text-[13.5px] font-bold" style={{ color: OPS.snow }}>
              {aircraft.model} &middot; {aircraft.status}
            </div>
            <div className="text-[11.5px]" style={{ color: OPS.textMuted }}>{aircraft.pilotName}</div>
          </div>
        </div>
        <TonePill tone={tone}>{toneLabel}</TonePill>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="hops-panel p-3" style={{ background: "rgba(255,255,255,.02)" }}>
          <div className="hops-eyebrow mb-1">Time since last check-in</div>
          <div
            className="hops-mono text-2xl font-bold tabular-nums"
            style={{ color: tone === "alert" ? OPS.red : tone === "warn" ? OPS.amber : OPS.snow }}
          >
            {formatElapsed(elapsedMs)}
          </div>
          <div className="mt-1 text-[11px]" style={{ color: OPS.textMuted }}>
            Last check-in logged {formatClock(aircraft.lastCheckIn)}
          </div>
        </div>
        <div className="hops-panel p-3" style={{ background: "rgba(255,255,255,.02)" }}>
          <div className="hops-eyebrow mb-1">
            {remainingMs >= 0 ? "Time until check-in due" : "Overdue by"}
          </div>
          <div
            className="hops-mono text-2xl font-bold tabular-nums"
            style={{ color: tone === "alert" ? OPS.red : tone === "warn" ? OPS.amber : OPS.snow }}
          >
            {formatElapsed(Math.abs(remainingMs))}
          </div>
          <div className="mt-1 text-[11px]" style={{ color: OPS.textMuted }}>
            Check-in interval: {CHECKIN_INTERVAL_MIN} min (sample / configurable)
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t px-4 py-3" style={{ borderColor: OPS.line }}>
        <span className="text-[11px]" style={{ color: OPS.textMuted }}>
          Manual override — logs a new structured check-in event.
        </span>
        <button
          type="button"
          onClick={() => onCheckIn(aircraft.id)}
          className="hops-mono shrink-0 rounded-md px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110"
          style={{ background: OPS.iceDeep }}
        >
          Simulate check-in
        </button>
      </div>

      {tone === "alert" && <EscalationPanel tailNumber={aircraft.tailNumber} />}
    </div>
  );
}

function EscalationPanel({ tailNumber }: { tailNumber: string }) {
  return (
    <div
      className="border-t px-4 py-3.5"
      style={{ borderColor: "rgba(229,72,77,.4)", background: "rgba(229,72,77,.08)" }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="hops-pill" style={{ background: "rgba(229,72,77,.2)", color: OPS.red, border: "1px solid rgba(229,72,77,.5)" }}>
          Escalation triggered
        </span>
        <span className="text-[11.5px] font-medium" style={{ color: OPS.text }}>
          {tailNumber} is past the check-in interval with no update.
        </span>
      </div>
      <ol className="space-y-1.5 pl-1">
        {ESCALATION_STEPS.map((step, i) => (
          <li key={i} className="flex gap-2 text-[12.5px] leading-snug" style={{ color: OPS.textMuted }}>
            <span className="hops-mono shrink-0 font-bold" style={{ color: OPS.red }}>
              {i + 1}.
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-2.5 text-[10.5px] leading-snug" style={{ color: OPS.textMuted }}>
        Sample escalation sequence shown for demo purposes — customizable per operator SOP. This concept demo does
        not contact anyone or notify any real dispatcher, radio, or SAR authority.
      </p>
    </div>
  );
}

function ActivityLogPanel({ entries }: { entries: LogEntry[] }) {
  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-[13.5px] font-bold" style={{ color: OPS.snow }}>Structured activity log</div>
          <div className="text-[11.5px]" style={{ color: OPS.textMuted }}>
            Replaces informal WhatsApp messages and paper notes with a timestamped, auditable record.
          </div>
        </div>
        <SampleTag />
      </div>
      <div className="hops-scroll max-h-72 space-y-1.5 overflow-y-auto p-4">
        {entries.length === 0 && (
          <p className="text-[12px]" style={{ color: OPS.textMuted }}>No events logged yet.</p>
        )}
        {entries.map((e) => (
          <div key={e.id} className="flex items-start gap-2.5 text-[12.5px] leading-snug">
            <span className="hops-mono shrink-0 font-semibold" style={{ color: OPS.textMuted }}>
              {formatClock(e.ts)}
            </span>
            <span
              className="hops-mono mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                background: e.tone === "alert" ? OPS.red : e.tone === "warn" ? OPS.amber : OPS.green,
              }}
            />
            <span style={{ color: OPS.text }}>
              <strong className="hops-mono font-bold" style={{ color: OPS.ice }}>{e.tailNumber}</strong>{" "}
              {e.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function FlightFollowing() {
  // `mountedAt` is captured once via useState initializer — a real
  // Date.now() timestamp — and is the baseline every aircraft's simulated
  // "last check-in" is computed against. This is what makes the timers
  // genuinely live rather than pre-baked strings.
  const [mountedAt] = useState<number>(() => Date.now());
  const fleet = useMemo(() => seedAircraft(), []);

  const [lastCheckIns, setLastCheckIns] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    for (const a of fleet) {
      map[a.id] = mountedAt - a.seedMinutesAgo * 60 * 1000;
    }
    return map;
  });

  const [now, setNow] = useState<number>(() => Date.now());

  const [logEntries, setLogEntries] = useState<LogEntry[]>(() => {
    // Seed a short sample history, timestamped relative to mount so it reads
    // as "earlier today" rather than a hardcoded wall-clock time.
    const seedTs = mountedAt - 3 * 60 * 60 * 1000; // ~3 hours before mount
    return [
      { id: "log-seed-1", ts: seedTs, tailNumber: "N412QX", message: "checked in, status normal.", tone: "ok" },
      { id: "log-seed-2", ts: seedTs + 18 * 60 * 1000, tailNumber: "N634VK", message: "checked in, status normal.", tone: "ok" },
      { id: "log-seed-3", ts: seedTs + 40 * 60 * 1000, tailNumber: "N287TR", message: "checked in, status normal.", tone: "ok" },
      { id: "log-seed-4", ts: seedTs + 63 * 60 * 1000, tailNumber: "N801ZL", message: "checked in, status normal.", tone: "ok" },
      { id: "log-seed-5", ts: seedTs + 95 * 60 * 1000, tailNumber: "N559HB", message: "checked in, status normal.", tone: "ok" },
      { id: "log-seed-6", ts: seedTs + 132 * 60 * 1000, tailNumber: "N412QX", message: "checked in, status normal.", tone: "ok" },
    ];
  });

  // Track which aircraft have already had an amber/red transition logged so
  // the effect doesn't spam duplicate entries every tick.
  const loggedTone = useRef<Record<string, SeverityTone>>({});

  // Live tick — every second, advance `now`. This is a real setInterval
  // against real elapsed wall-clock time, not a scripted animation.
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), TICK_MS);
    return () => clearInterval(id);
  }, []);

  // Auto-log status transitions (green -> amber -> red) as the live clock
  // crosses thresholds, standing in for what would otherwise be a
  // dispatcher noticing (or failing to notice) the clock themselves.
  useEffect(() => {
    for (const a of fleet) {
      const last = lastCheckIns[a.id];
      const elapsed = now - last;
      const tone = severity(elapsed);
      const prevTone = loggedTone.current[a.id];
      if (tone !== prevTone) {
        loggedTone.current[a.id] = tone;
        if (prevTone !== undefined) {
          const message =
            tone === "alert"
              ? "has not checked in within the interval — status OVERDUE."
              : tone === "warn"
              ? "approaching check-in window — status due soon."
              : "checked in, status normal.";
          setLogEntries((prev) => [
            { id: `log-${a.id}-${now}`, ts: now, tailNumber: a.tailNumber, message, tone },
            ...prev,
          ]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now]);

  const handleCheckIn = (id: string) => {
    const ts = Date.now();
    setLastCheckIns((prev) => ({ ...prev, [id]: ts }));
    const a = fleet.find((f) => f.id === id);
    loggedTone.current[id] = "ok";
    setLogEntries((prev) => [
      { id: `log-manual-${id}-${ts}`, ts, tailNumber: a?.tailNumber ?? id, message: "checked in, status normal.", tone: "ok" },
      ...prev,
    ]);
  };

  const withElapsed = fleet.map((a) => ({ ...a, lastCheckIn: lastCheckIns[a.id] }));
  const counts = useMemo(() => {
    let ok = 0, warn = 0, alert = 0;
    for (const a of withElapsed) {
      const tone = severity(now - a.lastCheckIn);
      if (tone === "ok") ok++;
      else if (tone === "warn") warn++;
      else alert++;
    }
    return { ok, warn, alert };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, lastCheckIns]);

  return (
    <div>
      {/* Module-specific honesty banner — reinforces the page-level banner,
          made explicit again right here since this module simulates live
          safety-relevant timers. */}
      <div
        className="hops-panel mb-6 flex flex-col gap-1.5 border px-4 py-3.5"
        style={{ borderColor: "rgba(229,72,77,.45)", background: "rgba(229,72,77,.08)" }}
      >
        <span className="hops-pill w-fit" style={{ background: "rgba(229,72,77,.2)", color: OPS.red, border: "1px solid rgba(229,72,77,.5)" }}>
          Demo simulation — not a real flight-following system
        </span>
        <p className="text-[12.5px] leading-relaxed" style={{ color: OPS.text }}>
          Every timer below runs against a simulated last-check-in timestamp captured when this page loaded — it is
          <strong> not connected to any real aircraft, transponder, radio, or dispatcher</strong>. This is a
          portfolio concept demo, not a certified or FAA-compliant flight-locating system, and must never be used or
          relied on as a substitute for one. All tail numbers, pilots, and statuses shown are invented sample data.
        </p>
      </div>

      {/* Summary strip */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="hops-panel px-4 py-3">
          <div className="hops-eyebrow mb-1">Aircraft tracked</div>
          <div className="hops-mono text-xl font-bold" style={{ color: OPS.snow }}>{fleet.length}</div>
        </div>
        <div className="hops-panel px-4 py-3" style={{ borderColor: "rgba(62,207,142,.4)" }}>
          <div className="hops-eyebrow mb-1" style={{ color: OPS.green }}>Normal</div>
          <div className="hops-mono text-xl font-bold" style={{ color: OPS.snow }}>{counts.ok}</div>
        </div>
        <div className="hops-panel px-4 py-3" style={{ borderColor: counts.warn ? "rgba(240,168,60,.5)" : OPS.line }}>
          <div className="hops-eyebrow mb-1" style={{ color: counts.warn ? OPS.amber : OPS.ice }}>Due soon</div>
          <div className="hops-mono text-xl font-bold" style={{ color: counts.warn ? OPS.amber : OPS.snow }}>{counts.warn}</div>
        </div>
        <div className="hops-panel px-4 py-3" style={{ borderColor: counts.alert ? "rgba(229,72,77,.5)" : OPS.line }}>
          <div className="hops-eyebrow mb-1" style={{ color: counts.alert ? OPS.red : OPS.ice }}>Overdue</div>
          <div className="hops-mono text-xl font-bold" style={{ color: counts.alert ? OPS.red : OPS.snow }}>{counts.alert}</div>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h3 className="hops-display text-lg" style={{ color: OPS.snow }}>Live aircraft board</h3>
        <SampleTag />
      </div>
      <div className="space-y-4">
        {withElapsed.map((a) => (
          <AircraftCard key={a.id} aircraft={a} now={now} onCheckIn={handleCheckIn} />
        ))}
      </div>

      <div className="mt-6">
        <ActivityLogPanel entries={logEntries} />
      </div>

      <p className="mt-6 text-[11.5px] leading-relaxed" style={{ color: OPS.textMuted }}>
        Today, flight following depends on one on-duty dispatcher remembering to watch the clock for every aircraft,
        with check-ins logged informally in chat messages and paper notes. This module shows what a structured
        alternative could look like: an automatic timer per aircraft, a defined escalation sequence when a check-in
        is missed, and a timestamped audit trail — all sample/simulated for this concept demo.
      </p>
    </div>
  );
}
