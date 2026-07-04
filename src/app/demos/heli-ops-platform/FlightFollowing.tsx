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
//      time vs. a check-in interval that genuinely depends on the aircraft's
//      current flight phase (see settings.phaseIntervalMin, editable below).
//   3. An escalation panel that appears for any aircraft in the red state,
//      listing an escalation sequence whose names are pulled live from the
//      staffing panel's current on-shift state.
//   4. A structured, timestamped activity log — seeded with sample history,
//      and genuinely appended to when a live status change happens, a user
//      simulates a check-in, moves an aircraft's zone, or changes its phase.
//   5. A manual "Simulate check-in" button per aircraft that resets its
//      timer to zero and appends a log entry.
//   6. A schematic zone map with a real per-aircraft zone selector.
//   7. A "who's on shift" staffing panel wired live into the escalation copy.
//   8. A simulated phone-alert mockup for overdue aircraft, clearly labeled
//      as illustrative only.
//   9. A real, downloadable end-of-day log export (Blob + createObjectURL).
//  10. Incident Mode — a coordinated-response panel that lets the user
//      genuinely divert another tracked aircraft to assist (Module 3).
//  11. An editable Settings panel driving both this module's check-in
//      interval math AND Module 1's cargo-bay overweight math (Module 3).
//
// NOTE ON STATE: the aircraft fleet, check-in timestamps, activity log, and
// staffing roster used to be local useState here. They are now hoisted into
// _platform.tsx's PlatformProvider (see usePlatform()) so Guide View, the
// End-of-Day Debrief, and Incident Mode's "divert to assist" can all read and
// write the SAME real state instead of a duplicated parallel copy. All the
// functions below behave exactly as they did before — same fields, same
// log-append mechanism — they're just sourced from the shared context.

import { useMemo, useRef, useState } from "react";
import { OPS, SampleTag } from "./_shared";
import {
  Aircraft,
  EDITABLE_PHASES,
  FlightPhase,
  LogEntry,
  SeverityTone,
  ShiftRole,
  ShiftRoleKey,
  SHIFT_ROSTER_OPTIONS,
  ZoneKey,
  ZONES,
  ZONE_BY_KEY,
  severity,
  usePlatform,
} from "./_platform";
import { BAY_LABEL, CargoBayKey } from "./_data";

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

function formatDateTime(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

// severity() is imported from ./_platform — it now takes the current,
// demo-editable phaseIntervalMin map as a third argument so a changed
// Settings value genuinely changes every severity calculation, live.

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

// ---------------------------------------------------------------------------
// SCHEMATIC ZONE MAP (feature 1) — CSS-grid schematic, not a real geographic
// map. Each aircraft renders as a marker/pin positioned at its current
// zone's grid cell. A per-aircraft dropdown (rendered in the legend below
// the grid) lets the user genuinely move an aircraft to a different zone,
// which re-renders the marker at the new cell live.
// ---------------------------------------------------------------------------
function ZoneMap({
  fleet,
  onZoneChange,
}: {
  fleet: Aircraft[];
  onZoneChange: (id: string, zone: ZoneKey) => void;
}) {
  const markersByZone = useMemo(() => {
    const map: Record<string, Aircraft[]> = {};
    for (const a of fleet) {
      map[a.zone] = map[a.zone] ? [...map[a.zone], a] : [a];
    }
    return map;
  }, [fleet]);

  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-base font-bold" style={{ color: OPS.snow }}>Schematic zone map</div>
          <div className="text-[13px]" style={{ color: OPS.textMuted }}>
            Stylized layout of sample zones — not a real geographic map. Positions are illustrative.
          </div>
        </div>
        <SampleTag />
      </div>

      <div className="p-4">
        <div
          className="grid grid-cols-3 gap-2.5"
          style={{ gridTemplateRows: "repeat(3, minmax(76px, auto))" }}
        >
          {ZONES.map((z) => {
            const markers = markersByZone[z.key] ?? [];
            return (
              <div
                key={z.key}
                className="hops-panel relative flex flex-col gap-1.5 p-2.5"
                style={{
                  gridColumn: z.col,
                  gridRow: z.row,
                  background: "rgba(255,255,255,.03)",
                  borderColor: markers.length ? "rgba(94,200,232,.4)" : OPS.line,
                }}
              >
                <div className="hops-mono text-[10.5px] font-semibold uppercase tracking-[.04em]" style={{ color: OPS.textMuted }}>
                  {z.label}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {markers.map((a) => (
                    <span
                      key={a.id}
                      className="hops-mono flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold"
                      style={{ background: "rgba(94,200,232,.16)", color: OPS.ice, border: "1px solid rgba(94,200,232,.4)" }}
                      title={`${a.tailNumber} currently at ${z.label}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: OPS.ice }} />
                      {a.tailNumber}
                    </span>
                  ))}
                  {markers.length === 0 && (
                    <span className="text-[11px]" style={{ color: OPS.textMuted }}>—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Per-aircraft zone selector legend — the real working interaction
            behind the map: changing this select genuinely moves the marker
            above to the new zone's cell. */}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {fleet.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between gap-2 rounded-md px-3 py-2"
              style={{ background: "rgba(255,255,255,.02)", border: `1px solid ${OPS.line}` }}
            >
              <span className="hops-mono text-[12.5px] font-bold" style={{ color: OPS.ice }}>
                {a.tailNumber}
              </span>
              <label className="flex items-center gap-2 text-[12px]" style={{ color: OPS.textMuted }}>
                Zone:
                <select
                  value={a.zone}
                  onChange={(e) => onZoneChange(a.id, e.target.value as ZoneKey)}
                  className="hops-mono rounded-md px-2 py-1 text-[12px] font-semibold"
                  style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
                >
                  {ZONES.map((z) => (
                    <option key={z.key} value={z.key}>
                      {z.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// STAFFING PANEL (feature 3) — "who's on shift", with a real per-role
// selector. This state is the single source of truth the escalation panel
// reads from, so changing who's on shift genuinely changes the escalation
// copy shown for any overdue aircraft.
// ---------------------------------------------------------------------------
function StaffingPanel({
  roster,
  onChange,
}: {
  roster: ShiftRole[];
  onChange: (key: ShiftRoleKey, name: string) => void;
}) {
  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-base font-bold" style={{ color: OPS.snow }}>Who&rsquo;s on shift</div>
          <div className="text-[13px]" style={{ color: OPS.textMuted }}>
            Live-linked to the escalation panel below — change a name here and any overdue aircraft&rsquo;s
            escalation steps update to match.
          </div>
        </div>
        <SampleTag />
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        {roster.map((role) => (
          <div key={role.key} className="hops-panel p-3" style={{ background: "rgba(255,255,255,.02)" }}>
            <div className="hops-eyebrow mb-1.5">{role.label}</div>
            <select
              value={role.name}
              onChange={(e) => onChange(role.key, e.target.value)}
              className="hops-mono w-full rounded-md px-2 py-1.5 text-[13px] font-semibold"
              style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
            >
              {SHIFT_ROSTER_OPTIONS[role.key].map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

function AircraftCard({
  aircraft,
  now,
  roster,
  phaseIntervalMin,
  onCheckIn,
  onZoneChange,
  onPhaseChange,
  registerNode,
  highlighted,
  incidentModePanel,
}: {
  aircraft: Aircraft & { lastCheckIn: number };
  now: number;
  roster: ShiftRole[];
  phaseIntervalMin: Record<FlightPhase, number>;
  onCheckIn: (id: string) => void;
  onZoneChange: (id: string, zone: ZoneKey) => void;
  onPhaseChange: (id: string, phase: FlightPhase) => void;
  registerNode?: (node: HTMLDivElement | null) => void;
  highlighted?: boolean;
  incidentModePanel?: React.ReactNode;
}) {
  const elapsedMs = now - aircraft.lastCheckIn;
  const tone = severity(elapsedMs, aircraft.phase, phaseIntervalMin);
  const intervalMin = phaseIntervalMin[aircraft.phase];
  const intervalMs = intervalMin * 60 * 1000;
  const remainingMs = intervalMs - elapsedMs;

  const toneLabel = tone === "alert" ? "Overdue" : tone === "warn" ? "Due soon" : "Normal";
  const glow = highlighted
    ? OPS.ice
    : tone === "alert"
      ? "rgba(229,72,77,.55)"
      : tone === "warn"
      ? "rgba(240,168,60,.5)"
      : "rgba(62,207,142,.35)";

  return (
    <div
      ref={registerNode}
      className="hops-panel overflow-hidden transition-all"
      style={{
        borderColor: glow,
        boxShadow: highlighted
          ? `0 0 0 3px rgba(94,200,232,.55), 0 10px 28px -16px rgba(0,0,0,.7)`
          : tone === "alert"
          ? `0 0 0 1px ${glow}, 0 10px 28px -16px rgba(0,0,0,.7)`
          : undefined,
      }}
      data-tail-number={aircraft.tailNumber}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-4"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div className="flex items-center gap-3">
          <StatusDot tone={tone} />
          <span
            className="hops-mono flex h-9 items-center rounded-md px-3 text-[15px] font-bold"
            style={{ background: "rgba(94,200,232,.14)", color: OPS.ice, border: "1px solid rgba(94,200,232,.35)" }}
          >
            {aircraft.tailNumber}
          </span>
          <div>
            <div className="text-base font-bold leading-snug" style={{ color: OPS.snow }}>
              {aircraft.model} &middot; {aircraft.status}
            </div>
            <div className="text-[13px]" style={{ color: OPS.textMuted }}>{aircraft.pilotName}</div>
          </div>
        </div>
        <TonePill tone={tone}>{toneLabel}</TonePill>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="hops-panel p-4" style={{ background: "rgba(255,255,255,.02)" }}>
          <div className="hops-eyebrow mb-2">Time since last check-in</div>
          <div
            className="hops-mono text-4xl font-extrabold leading-none tabular-nums"
            style={{ color: tone === "alert" ? OPS.red : tone === "warn" ? OPS.amber : OPS.snow }}
          >
            {formatElapsed(elapsedMs)}
          </div>
          <div className="mt-2 text-[12.5px]" style={{ color: OPS.textMuted }}>
            Last check-in logged {formatClock(aircraft.lastCheckIn)}
          </div>
        </div>
        <div className="hops-panel p-4" style={{ background: "rgba(255,255,255,.02)" }}>
          <div className="hops-eyebrow mb-2">
            {remainingMs >= 0 ? "Time until check-in due" : "Overdue by"}
          </div>
          <div
            className="hops-mono text-4xl font-extrabold leading-none tabular-nums"
            style={{ color: tone === "alert" ? OPS.red : tone === "warn" ? OPS.amber : OPS.snow }}
          >
            {formatElapsed(Math.abs(remainingMs))}
          </div>
          <div className="mt-2 text-[12.5px]" style={{ color: OPS.textMuted }}>
            Check-in interval: {intervalMin} min for phase &ldquo;{aircraft.phase}&rdquo; (sample / configurable)
          </div>
        </div>
      </div>

      {/* Phase control (feature 2) — a real state change; the interval and
          both timers above genuinely recompute against the new phase's
          threshold as soon as it's changed. */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3"
        style={{ borderColor: OPS.line }}
      >
        <label className="flex items-center gap-2 text-[12.5px]" style={{ color: OPS.textMuted }}>
          Flight phase:
          <select
            value={aircraft.phase}
            onChange={(e) => onPhaseChange(aircraft.id, e.target.value as FlightPhase)}
            className="hops-mono rounded-md px-2 py-1 text-[12.5px] font-semibold"
            style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
          >
            {EDITABLE_PHASES.map((p) => (
              <option key={p} value={p}>
                {p} ({phaseIntervalMin[p]} min interval)
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-[12.5px]" style={{ color: OPS.textMuted }}>
          Current zone:
          <select
            value={aircraft.zone}
            onChange={(e) => onZoneChange(aircraft.id, e.target.value as ZoneKey)}
            className="hops-mono rounded-md px-2 py-1 text-[12.5px] font-semibold"
            style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
          >
            {ZONES.map((z) => (
              <option key={z.key} value={z.key}>
                {z.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between gap-2 border-t px-4 py-3.5" style={{ borderColor: OPS.line }}>
        <span className="text-[12.5px]" style={{ color: OPS.textMuted }}>
          Manual override — logs a new structured check-in event.
        </span>
        <button
          type="button"
          onClick={() => onCheckIn(aircraft.id)}
          className="hops-mono shrink-0 rounded-md px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110"
          style={{ background: OPS.iceDeep }}
        >
          Simulate check-in
        </button>
      </div>

      {tone === "alert" && (
        <>
          <EscalationPanel tailNumber={aircraft.tailNumber} roster={roster} />
          <PhoneAlertMockup tailNumber={aircraft.tailNumber} elapsedMs={elapsedMs} />
          {incidentModePanel}
        </>
      )}
    </div>
  );
}

// Escalation steps are built live from the current staffing roster (feature
// 3's link into feature already-existing escalation panel) — this is a
// function of live state, not a hardcoded string, so changing who's on shift
// genuinely changes what's rendered here.
function buildEscalationSteps(roster: ShiftRole[]): string[] {
  const backup = roster.find((r) => r.key === "backup")?.name ?? "the backup dispatcher on duty";
  const onCall = roster.find((r) => r.key === "onCall")?.name ?? "the on-call ops manager";
  return [
    `Alert ${backup} (backup dispatcher on duty)`,
    "Attempt direct radio contact with the aircraft",
    "Attempt satellite / cell contact with the pilot-in-command",
    `If no contact within 15 minutes of overdue status, escalate to ${onCall} (on-call ops manager) and initiate search-and-rescue notification per operator SOP`,
  ];
}

function EscalationPanel({ tailNumber, roster }: { tailNumber: string; roster: ShiftRole[] }) {
  const steps = buildEscalationSteps(roster);
  return (
    <div
      className="border-t px-4 py-3.5"
      style={{ borderColor: "rgba(229,72,77,.4)", background: "rgba(229,72,77,.08)" }}
    >
      <div className="mb-2.5 flex flex-wrap items-center gap-2">
        <span className="hops-pill" style={{ background: "rgba(229,72,77,.2)", color: OPS.red, border: "1px solid rgba(229,72,77,.5)" }}>
          Escalation triggered
        </span>
        <span className="text-[13.5px] font-semibold" style={{ color: OPS.snow }}>
          {tailNumber} is past the check-in interval with no update.
        </span>
      </div>
      <ol className="space-y-2 pl-1">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-2.5 text-[14px] leading-snug" style={{ color: OPS.text }}>
            <span className="hops-mono shrink-0 font-bold" style={{ color: OPS.red }}>
              {i + 1}.
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[12px] leading-snug" style={{ color: OPS.textMuted }}>
        Escalation sequence names are pulled live from the &ldquo;Who&rsquo;s on shift&rdquo; panel above — change
        who&rsquo;s on shift there and these steps update to match. Sample escalation sequence shown for demo
        purposes — customizable per operator SOP. This concept demo does not contact anyone or notify any real
        dispatcher, radio, or SAR authority.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SIMULATED PHONE-ALERT MOCKUP (feature 4) — a visual mockup of what a
// push/SMS alert would look like, computed from real overdue-aircraft state
// (tail number + elapsed time). Clearly labeled as illustrative only — no
// real phone number, no real SMS/push API call, nothing that sends anything.
// ---------------------------------------------------------------------------
function PhoneAlertMockup({ tailNumber, elapsedMs }: { tailNumber: string; elapsedMs: number }) {
  const elapsedMin = Math.floor(elapsedMs / 60000);
  return (
    <div
      className="border-t px-4 py-4"
      style={{ borderColor: "rgba(229,72,77,.4)", background: "rgba(10,14,20,.35)" }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className="hops-pill"
          style={{ background: "rgba(229,72,77,.2)", color: OPS.red, border: "1px solid rgba(229,72,77,.5)" }}
        >
          Mockup only — not a real notification
        </span>
        <span className="text-[12.5px]" style={{ color: OPS.textMuted }}>
          Illustration of what a push/SMS alert would look like. No SMS or push API is called; no phone number is
          used or contacted.
        </span>
      </div>

      {/* phone-frame visual */}
      <div className="flex justify-start">
        <div
          className="w-[240px] rounded-[22px] p-2.5"
          style={{ background: "#0d1117", border: `2px solid ${OPS.line}`, boxShadow: "0 14px 34px -18px rgba(0,0,0,.8)" }}
        >
          <div className="mb-2 flex items-center justify-center">
            <div className="h-1 w-10 rounded-full" style={{ background: OPS.line }} />
          </div>
          <div
            className="rounded-xl p-3"
            style={{ background: "linear-gradient(180deg, #1b212d, #12161f)", border: `1px solid ${OPS.line}` }}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="hops-mono text-[10px] font-bold uppercase tracking-[.06em]" style={{ color: OPS.red }}>
                Dispatch Alert (mockup)
              </span>
              <span className="hops-mono text-[10px]" style={{ color: OPS.textMuted }}>
                now
              </span>
            </div>
            <div className="text-[12.5px] font-semibold leading-snug" style={{ color: OPS.snow }}>
              {tailNumber} is overdue for check-in
            </div>
            <div className="mt-1 text-[11.5px] leading-snug" style={{ color: OPS.textMuted }}>
              No check-in for {elapsedMin} min. Escalation steps in progress — open flight-following board.
            </div>
          </div>
        </div>
      </div>
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
          <div className="text-base font-bold" style={{ color: OPS.snow }}>Structured activity log</div>
          <div className="text-[13px]" style={{ color: OPS.textMuted }}>
            Replaces informal WhatsApp messages and paper notes with a timestamped, auditable record.
          </div>
        </div>
        <SampleTag />
      </div>
      <div className="hops-scroll max-h-72 space-y-2 overflow-y-auto p-4">
        {entries.length === 0 && (
          <p className="text-[13.5px]" style={{ color: OPS.textMuted }}>No events logged yet.</p>
        )}
        {entries.map((e) => (
          <div key={e.id} className="flex items-start gap-2.5 text-[14px] leading-snug">
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
// EXPORTABLE END-OF-DAY LOG (feature 5) — builds a real .txt file from
// whatever is actually in `entries` at click time, and triggers a genuine
// browser download via Blob + URL.createObjectURL. No fake/static download.
// ---------------------------------------------------------------------------
function buildLogExportText(entries: LogEntry[]): string {
  const header = [
    "HELI-OPS PLATFORM — FLIGHT-FOLLOWING LOG (SAMPLE / DEMO DATA)",
    "This file is exported from a fictional concept-demo prototype.",
    "All tail numbers, times, and events are invented sample data —",
    "not a real flight-following record, and not affiliated with any",
    "real operator.",
    `Exported: ${formatDateTime(Date.now())}`,
    `Entries: ${entries.length}`,
    "-".repeat(72),
  ].join("\n");

  // Log is stored newest-first for display; export chronologically
  // (oldest-first) so the file reads top-to-bottom like a real log.
  const chronological = [...entries].sort((a, b) => a.ts - b.ts);
  const lines = chronological.map((e) => `${formatDateTime(e.ts)}  [${e.tone.toUpperCase()}]  ${e.tailNumber}  ${e.message}`);

  return `${header}\n${lines.join("\n")}\n`;
}

function downloadLog(entries: LogEntry[]) {
  const text = buildLogExportText(entries);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  a.href = url;
  a.download = `heli-ops-demo-flight-following-log-${stamp}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// INCIDENT MODE (feature 1, Module 3) — a "coordinated response" panel shown
// for the currently-overdue aircraft when incident mode is switched on.
// Lists every OTHER tracked aircraft with its live zone, and lets the user
// pick one to genuinely divert to assist: this calls handleDivertToAssist
// from _platform.tsx, which is a REAL state change (status/phase set to
// "Diverting to assist") and appends a real timestamped entry via the same
// appendLog mechanism every other feature in this module uses — not a
// parallel fake log. Turning incident mode off hides this panel but never
// deletes anything from the log history.
// ---------------------------------------------------------------------------
function IncidentResponsePanel({
  overdueTailNumber,
  overdueAircraftId,
  fleet,
  onDivert,
}: {
  overdueTailNumber: string;
  overdueAircraftId: string;
  fleet: Aircraft[];
  onDivert: (id: string, zone: ZoneKey) => void;
}) {
  const [diverted, setDiverted] = useState<string | null>(null);
  const others = fleet.filter((a) => a.id !== overdueAircraftId);

  return (
    <div
      className="border-t px-4 py-4"
      style={{ borderColor: "rgba(94,200,232,.4)", background: "rgba(94,200,232,.06)" }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className="hops-pill"
          style={{ background: "rgba(94,200,232,.2)", color: OPS.ice, border: "1px solid rgba(94,200,232,.5)" }}
        >
          Incident mode — coordinated response
        </span>
        <span className="text-[13px]" style={{ color: OPS.text }}>
          Pick another tracked aircraft to genuinely divert toward {overdueTailNumber}&rsquo;s last known zone.
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {others.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between gap-2 rounded-md px-3 py-2"
            style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${OPS.line}` }}
          >
            <div className="min-w-0">
              <div className="hops-mono text-[13px] font-bold" style={{ color: OPS.ice }}>{a.tailNumber}</div>
              <div className="text-[11.5px]" style={{ color: OPS.textMuted }}>
                Currently: {ZONE_BY_KEY[a.zone].label} &middot; {a.status}
              </div>
            </div>
            <button
              type="button"
              disabled={a.status === "Diverting to assist"}
              onClick={() => {
                const target = fleet.find((f) => f.id === overdueAircraftId);
                onDivert(a.id, target?.zone ?? a.zone);
                setDiverted(a.tailNumber);
              }}
              className="hops-mono shrink-0 rounded-md px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110 disabled:opacity-50"
              style={{ background: OPS.iceDeep }}
            >
              {a.status === "Diverting to assist" ? "Diverting" : "Divert to assist"}
            </button>
          </div>
        ))}
        {others.length === 0 && (
          <p className="text-[13px]" style={{ color: OPS.textMuted }}>No other tracked aircraft available.</p>
        )}
      </div>

      {diverted && (
        <p className="mt-3 text-[12.5px] leading-snug" style={{ color: OPS.ice }}>
          {diverted} is now genuinely marked &ldquo;Diverting to assist&rdquo; in the live board above, with a real
          entry appended to the activity log below.
        </p>
      )}

      <p className="mt-3 text-[12px] leading-snug" style={{ color: OPS.textMuted }}>
        This is a real state change against this session&rsquo;s live fleet data, logged the same way every other
        check-in/zone/phase change in this module is logged. It does not contact any real aircraft, pilot, or
        dispatcher.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SETTINGS PANEL (feature 5, Module 3) — real, editable numeric inputs for
// the per-phase check-in interval (drives this module's overdue math) and
// the per-cargo-bay weight limit (drives Module 1's overweight-flagging
// math). Both read/write the SAME shared settings object in _platform.tsx,
// so a change here genuinely changes both modules' live calculations.
// Demo-editable / session-only: values reset on page reload, stated plainly
// below rather than implying a persisted configuration.
// ---------------------------------------------------------------------------
function SettingsPanel() {
  const { settings, setPhaseInterval, setBayLimit, resetSettings } = usePlatform();
  const [open, setOpen] = useState(false);

  return (
    <div className="hops-panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-wrap items-center justify-between gap-2 border-b px-4 py-3 text-left"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-base font-bold" style={{ color: OPS.snow }}>Settings (demo-editable)</div>
          <div className="text-[13px]" style={{ color: OPS.textMuted }}>
            Check-in intervals &amp; cargo-bay weight limits — changes drive both modules&rsquo; live math below.
          </div>
        </div>
        <span className="hops-mono text-[11px] font-semibold uppercase tracking-[.04em]" style={{ color: OPS.ice }}>
          {open ? "Hide ▲" : "Open ▼"}
        </span>
      </button>

      {open && (
        <div className="p-4">
          <div className="mb-4 rounded-md border px-3 py-2.5" style={{ borderColor: "rgba(240,168,60,.4)", background: "rgba(240,168,60,.08)" }}>
            <p className="text-[12.5px] leading-snug" style={{ color: OPS.text }}>
              These are <strong>demo-editable sample settings</strong>, not a persisted real configuration — values
              reset to defaults on page reload. Changing a number here genuinely changes the overdue-threshold math
              in the live aircraft board below AND the overweight-flagging math in Module 01&rsquo;s manifest board.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="hops-eyebrow mb-2">Check-in interval per phase (minutes)</div>
              <div className="space-y-2">
                {EDITABLE_PHASES.map((phase) => (
                  <label key={phase} className="flex items-center justify-between gap-3 text-[13px]" style={{ color: OPS.textMuted }}>
                    <span>{phase}</span>
                    <input
                      type="number"
                      min={1}
                      max={240}
                      value={settings.phaseIntervalMin[phase]}
                      onChange={(e) => {
                        const v = Math.max(1, Math.min(240, Number(e.target.value) || 1));
                        setPhaseInterval(phase, v);
                      }}
                      className="hops-mono w-20 rounded-md px-2 py-1 text-right text-[13px] font-semibold"
                      style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="hops-eyebrow mb-2">Cargo-bay weight limits (lb)</div>
              <div className="space-y-2">
                {(Object.keys(settings.bayLimits) as CargoBayKey[]).map((bay) => (
                  <label key={bay} className="flex items-center justify-between gap-3 text-[13px]" style={{ color: OPS.textMuted }}>
                    <span>{BAY_LABEL[bay]}</span>
                    <input
                      type="number"
                      min={50}
                      max={2000}
                      step={10}
                      value={settings.bayLimits[bay]}
                      onChange={(e) => {
                        const v = Math.max(50, Math.min(2000, Number(e.target.value) || 50));
                        setBayLimit(bay, v);
                      }}
                      className="hops-mono w-20 rounded-md px-2 py-1 text-right text-[13px] font-semibold"
                      style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={resetSettings}
              className="hops-mono rounded-md px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.04em] transition hover:brightness-110"
              style={{ background: "rgba(255,255,255,.06)", color: OPS.textMuted, border: `1px solid ${OPS.line}` }}
            >
              Reset to sample defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function FlightFollowing() {
  const {
    fleet,
    lastCheckIns,
    now,
    roster,
    setRoster,
    logEntries,
    handleCheckIn,
    handleZoneChange,
    handlePhaseChange,
    handleDivertToAssist,
    settings,
    registerAircraftCardNode,
    highlightedTail,
  } = usePlatform();

  const handleRosterChange = (key: ShiftRoleKey, name: string) => {
    setRoster((prev) => prev.map((r) => (r.key === key ? { ...r, name } : r)));
  };

  // Incident mode — a local UI toggle (not itself safety state), scoped to
  // this module. Turning it on/off never touches the activity log; only
  // picking a divert target does (via handleDivertToAssist).
  const [incidentModeOn, setIncidentModeOn] = useState(false);

  // Stable, per-tail-number ref callbacks (feature 4) — memoized so the
  // registry in _platform.tsx doesn't get nulled-then-reset on every
  // 1-second fleet tick (a fresh inline closure every render would make
  // React call the ref callback with null then the node on every tick).
  const registerNodeCache = useRef<Record<string, (node: HTMLDivElement | null) => void>>({});
  const getRegisterNode = (tailNumber: string) => {
    if (!registerNodeCache.current[tailNumber]) {
      registerNodeCache.current[tailNumber] = (node: HTMLDivElement | null) =>
        registerAircraftCardNode(tailNumber, node);
    }
    return registerNodeCache.current[tailNumber];
  };

  const withElapsed = fleet.map((a) => ({ ...a, lastCheckIn: lastCheckIns[a.id] }));
  const counts = useMemo(() => {
    let ok = 0, warn = 0, alert = 0;
    for (const a of withElapsed) {
      const tone = severity(now - a.lastCheckIn, a.phase, settings.phaseIntervalMin);
      if (tone === "ok") ok++;
      else if (tone === "warn") warn++;
      else alert++;
    }
    return { ok, warn, alert };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, lastCheckIns, fleet, settings.phaseIntervalMin]);

  // The first genuinely-overdue aircraft, if any — incident mode's
  // coordinated-response panel targets this one. Honest about there being no
  // overdue aircraft (the toggle stays available but the panel says so).
  const firstOverdue = withElapsed.find((a) => severity(now - a.lastCheckIn, a.phase, settings.phaseIntervalMin) === "alert");

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
        <p className="text-[13.5px] leading-relaxed" style={{ color: OPS.text }}>
          Every timer below runs against a simulated last-check-in timestamp captured when this page loaded — it is
          <strong> not connected to any real aircraft, transponder, radio, or dispatcher</strong>. This is a
          portfolio concept demo, not a certified or FAA-compliant flight-locating system, and must never be used or
          relied on as a substitute for one. All tail numbers, pilots, zones, staff names, and statuses shown are
          invented sample data. <strong>The phone-alert mockup below is illustrative only</strong> — it does not
          send any real SMS, push notification, or contact any real phone number.
        </p>
      </div>

      {/* Summary strip + Incident mode toggle (feature 1, Module 3) */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="hops-panel px-4 py-4">
          <div className="hops-eyebrow mb-1.5">Aircraft tracked</div>
          <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: OPS.snow }}>{fleet.length}</div>
        </div>
        <div className="hops-panel px-4 py-4" style={{ borderColor: "rgba(62,207,142,.4)" }}>
          <div className="hops-eyebrow mb-1.5" style={{ color: OPS.green }}>Normal</div>
          <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: OPS.snow }}>{counts.ok}</div>
        </div>
        <div className="hops-panel px-4 py-4" style={{ borderColor: counts.warn ? "rgba(240,168,60,.5)" : OPS.line }}>
          <div className="hops-eyebrow mb-1.5" style={{ color: counts.warn ? OPS.amber : OPS.ice }}>Due soon</div>
          <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: counts.warn ? OPS.amber : OPS.snow }}>{counts.warn}</div>
        </div>
        <div className="hops-panel px-4 py-4" style={{ borderColor: counts.alert ? "rgba(229,72,77,.5)" : OPS.line }}>
          <div className="hops-eyebrow mb-1.5" style={{ color: counts.alert ? OPS.red : OPS.ice }}>Overdue</div>
          <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: counts.alert ? OPS.red : OPS.snow }}>{counts.alert}</div>
        </div>
      </div>

      <div
        className="mb-6 flex flex-wrap items-center justify-between gap-3 hops-panel px-4 py-3.5"
        style={{ borderColor: incidentModeOn ? "rgba(94,200,232,.5)" : OPS.line }}
      >
        <div>
          <div className="text-[13.5px] font-semibold" style={{ color: OPS.snow }}>Incident mode</div>
          <div className="text-[12.5px]" style={{ color: OPS.textMuted }}>
            {firstOverdue
              ? `When on, shows a coordinated-response panel for ${firstOverdue.tailNumber} (currently overdue), letting you divert another tracked aircraft to assist.`
              : "No aircraft is currently overdue — turn this on and one will go overdue soon, or wait for the live timers above."}
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={incidentModeOn}
          onClick={() => setIncidentModeOn((v) => !v)}
          className="hops-mono shrink-0 rounded-md px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[.04em] transition hover:brightness-110"
          style={{
            background: incidentModeOn ? OPS.iceDeep : "rgba(255,255,255,.06)",
            color: incidentModeOn ? "white" : OPS.textMuted,
            border: `1px solid ${incidentModeOn ? OPS.iceDeep : OPS.line}`,
          }}
        >
          {incidentModeOn ? "Incident mode: ON" : "Incident mode: OFF"}
        </button>
      </div>

      {/* Zone map + staffing panel side by side on wide screens */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <ZoneMap fleet={fleet} onZoneChange={handleZoneChange} />
        <StaffingPanel roster={roster} onChange={handleRosterChange} />
      </div>

      {/* Settings panel (feature 5, Module 3) */}
      <div className="mb-6">
        <SettingsPanel />
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h3 className="hops-display text-lg" style={{ color: OPS.snow }}>Live aircraft board</h3>
        <SampleTag />
      </div>
      <div className="space-y-4">
        {withElapsed.map((a) => (
          <AircraftCard
            key={a.id}
            aircraft={a}
            now={now}
            roster={roster}
            phaseIntervalMin={settings.phaseIntervalMin}
            onCheckIn={handleCheckIn}
            onZoneChange={handleZoneChange}
            onPhaseChange={handlePhaseChange}
            registerNode={getRegisterNode(a.tailNumber)}
            highlighted={highlightedTail === a.tailNumber}
            incidentModePanel={
              incidentModeOn && firstOverdue?.id === a.id ? (
                <IncidentResponsePanel
                  overdueTailNumber={a.tailNumber}
                  overdueAircraftId={a.id}
                  fleet={fleet}
                  onDivert={handleDivertToAssist}
                />
              ) : undefined
            }
          />
        ))}
      </div>

      <div className="mt-6">
        <ActivityLogPanel entries={logEntries} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 hops-panel px-4 py-3.5">
        <span className="text-[12.5px]" style={{ color: OPS.textMuted }}>
          Downloads a real .txt file built from the {logEntries.length} log entr{logEntries.length === 1 ? "y" : "ies"} currently
          in this session&rsquo;s activity log above — sample/demo data, clearly labeled in the file itself.
        </span>
        <button
          type="button"
          onClick={() => downloadLog(logEntries)}
          className="hops-mono shrink-0 rounded-md px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110"
          style={{ background: OPS.amberDeep }}
        >
          Download today&rsquo;s flight-following log
        </button>
      </div>

      <p className="mt-6 text-[12.5px] leading-relaxed" style={{ color: OPS.textMuted }}>
        Today, flight following depends on one on-duty dispatcher remembering to watch the clock for every aircraft,
        with check-ins logged informally in chat messages and paper notes. This module shows what a structured
        alternative could look like: an automatic timer per aircraft with an interval that adapts to flight phase, a
        schematic zone map, a defined escalation sequence tied to who&rsquo;s actually on shift, a mockup of what a
        phone alert would look like, and a timestamped, exportable audit trail — all sample/simulated for this
        concept demo.
      </p>
    </div>
  );
}
