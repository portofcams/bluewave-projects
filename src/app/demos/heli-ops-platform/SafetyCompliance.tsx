"use client";

// SafetyCompliance — Module 4 (Safety & Compliance Depth) interactive
// component.
//
// FICTIONAL SAMPLE DATA ONLY. Every pilot, guide, tail number, and cert
// record below reuses the SAME invented ski/snow-pun roster already
// established in ./_data.tsx (FLEET_ROSTER + the guide names assigned in
// seedHelicopters()'s Day-1 groups). No new fictional people are introduced
// in this module.
//
// ILLUSTRATIVE ONLY — NOT REAL REGULATORY RECORDKEEPING. This module touches
// FAA Part 135-style concepts: duty/flight-time limits, guide certification
// currency, and weight-and-balance sign-off. NONE of it is a certified or
// FAA-accepted compliance system, and none of the artifacts it produces
// (the duty-hours log, the cert tracker, the W&B export, the pilot
// sign-off) are legally valid regulatory documents. This is a portfolio
// concept demo illustrating what the SHAPE of such tooling could look like
// — every number here is real, computed live from this file's sample seed
// data and this session's live shared state, but the underlying limits and
// workflow are simplified teaching examples, not a substitute for an
// operator's real FAA-compliant duty/rest tracking, cert-currency program,
// or weight-and-balance recordkeeping process.
//
// Demonstrates, with real computed/persisted state (not cosmetic copy):
//  16. Part 135 duty-hours log — sums real per-pilot DutySegment seed data
//      for today and this week, flags anyone at/near an illustrative daily
//      flight-time limit (cited plainly as the TYPICAL 14 CFR 135.267
//      single-pilot figure, not asserted as precise regulatory guidance).
//  17. Guide cert / avalanche-training tracker — cross-references cert
//      expiry against Module 1's ACTUAL Day-1 assigned guides (not a cert
//      list shown in isolation), flagging expired/expiring certs for
//      whichever real guide is actually on today's manifest.
//  18. Incident/near-miss logging FORM — a real form whose submissions
//      genuinely append to a session-persisted, growing list in shared
//      state (_platform.tsx's `incidents`), reflected immediately below the
//      form and (in aggregate) in the End-of-Day Debrief.
//  19. Per-helicopter weight-and-balance export — a real downloadable
//      .txt/print-friendly artifact built from the SAME live groupWeight /
//      bayLoadForHeli math Module 1 uses, via the same Blob +
//      URL.createObjectURL pattern Module 2's log export already
//      established (no new dependency).
//  20. Digital pilot sign-off — a real per-aircraft acknowledgment of the
//      CURRENT computed total, that genuinely flips the aircraft's status
//      pill and is genuinely invalidated (see ManifestBoard.tsx's
//      staleness guard) the moment the real numbers change after sign-off.

import { useMemo, useState } from "react";
import { OPS, SampleTag } from "./_shared";
import {
  BAY_LABEL,
  CargoBayKey,
  FLEET_ROSTER,
  Helicopter,
  PART135_DUTY_PERIOD_LIMIT_HRS,
  PART135_FLIGHT_TIME_LIMIT_HRS,
  SAMPLE_TODAY_LABEL,
  bayLoadForHeli,
  computePilotDutySummaries,
  flagAssignedGuideCerts,
  groupWeight,
  heliTotalWeight,
  seedDutySegments,
  seedGuideCerts,
} from "./_data";
import { IncidentCategory, IncidentSeverity, usePlatform } from "./_platform";

// ---------------------------------------------------------------------------
// SMALL UI PRIMITIVES (module-local, mirrors the tone/pill patterns already
// established in ManifestBoard.tsx / FlightFollowing.tsx for visual
// consistency).
// ---------------------------------------------------------------------------
function Pill({ tone, children }: { tone: "ok" | "warn" | "alert" | "info"; children: React.ReactNode }) {
  const styles: Record<typeof tone, { bg: string; fg: string; border: string }> = {
    ok: { bg: "rgba(62,207,142,.14)", fg: OPS.green, border: "rgba(62,207,142,.4)" },
    warn: { bg: "rgba(240,168,60,.16)", fg: OPS.amber, border: "rgba(240,168,60,.45)" },
    alert: { bg: "rgba(229,72,77,.16)", fg: OPS.red, border: "rgba(229,72,77,.5)" },
    info: { bg: "rgba(94,200,232,.14)", fg: OPS.ice, border: "rgba(94,200,232,.4)" },
  };
  const s = styles[tone];
  return (
    <span className="hops-pill" style={{ background: s.bg, color: s.fg, border: `1px solid ${s.border}` }}>
      {children}
    </span>
  );
}

function ModuleDisclaimerBanner() {
  return (
    <div
      className="hops-panel mb-6 flex flex-col gap-1.5 border px-4 py-3.5"
      style={{ borderColor: "rgba(229,72,77,.45)", background: "rgba(229,72,77,.08)" }}
    >
      <span className="hops-pill w-fit" style={{ background: "rgba(229,72,77,.2)", color: OPS.red, border: "1px solid rgba(229,72,77,.5)" }}>
        Illustrative only — not real regulatory recordkeeping
      </span>
      <p className="text-[13.5px] leading-relaxed" style={{ color: OPS.text }}>
        This module illustrates the SHAPE of FAA Part 135-style safety &amp; compliance tooling — duty-hour tracking,
        guide certification currency, incident logging, and weight-and-balance sign-off. <strong>None of it is a
        certified or FAA-accepted compliance system.</strong> The duty-hour limit shown is cited as the typical 14
        CFR &sect;135.267 single-pilot flight-time figure (verified via eCFR, not asserted with legal precision), and
        every export/sign-off produced below is explicitly a <strong>sample / concept artifact</strong> — not a
        legally valid regulatory document, and not a substitute for an operator&rsquo;s real duty/rest, currency, or
        weight-and-balance recordkeeping process.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FEATURE 16 — PART 135 DUTY-HOURS LOG
// ---------------------------------------------------------------------------
function DutyHoursLog() {
  const segments = useMemo(() => seedDutySegments(), []);
  const summaries = useMemo(() => computePilotDutySummaries(segments), [segments]);

  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3.5"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-base font-bold" style={{ color: OPS.snow }}>Part 135 duty-hours log</div>
          <div className="text-[13px]" style={{ color: OPS.textMuted }}>
            Each pilot&rsquo;s flight time today and this week, computed from logged duty segments — cross-referenced
            against today&rsquo;s schedule.
          </div>
        </div>
        <SampleTag />
      </div>

      <div className="p-4">
        <div
          className="mb-4 rounded-md border px-3 py-2.5"
          style={{ borderColor: "rgba(240,168,60,.4)", background: "rgba(240,168,60,.08)" }}
        >
          <p className="text-[12.5px] leading-snug" style={{ color: OPS.text }}>
            Illustrative limit shown: <strong>{PART135_FLIGHT_TIME_LIMIT_HRS} hrs flight time / 24 hrs</strong> for a
            one-pilot crew, the typical figure under 14 CFR &sect;135.267 (flight time may extend under a duty period
            of up to <strong>{PART135_DUTY_PERIOD_LIMIT_HRS} hrs</strong> given qualifying rest periods — see 14 CFR
            &sect;135.267 for the actual conditions). Cited as the typical Part 135 single-pilot figure, not a
            precision legal reading — always confirm against an operator&rsquo;s actual FAR analysis and OpSpecs.
          </p>
        </div>

        <div className="space-y-2.5">
          {summaries.map((s) => {
            const aircraft = FLEET_ROSTER.find((f) => f.pilotName === s.pilotName);
            const pct = Math.min(150, Math.round(s.pctOfDailyLimit * 100));
            return (
              <div
                key={s.pilotName}
                className="hops-panel p-3.5"
                style={{
                  background: "rgba(255,255,255,.02)",
                  borderColor:
                    s.tone === "alert" ? "rgba(229,72,77,.5)" : s.tone === "warn" ? "rgba(240,168,60,.5)" : OPS.line,
                }}
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[14.5px] font-bold" style={{ color: OPS.snow }}>{s.pilotName}</div>
                    <div className="hops-mono text-[12px]" style={{ color: OPS.textMuted }}>
                      {aircraft?.tailNumber} &middot; {aircraft?.model}
                    </div>
                  </div>
                  {s.tone === "alert" ? (
                    <Pill tone="alert">At/over daily limit</Pill>
                  ) : s.tone === "warn" ? (
                    <Pill tone="warn">Approaching limit</Pill>
                  ) : (
                    <Pill tone="ok">Within limit</Pill>
                  )}
                </div>

                <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,.08)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, pct)}%`,
                      background: s.tone === "alert" ? OPS.red : s.tone === "warn" ? OPS.amber : OPS.green,
                    }}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px]" style={{ color: OPS.textMuted }}>
                  <span>
                    Today: <strong className="hops-mono" style={{ color: s.tone === "alert" ? OPS.red : OPS.text }}>{s.todayHrs} hrs</strong>{" "}
                    of {PART135_FLIGHT_TIME_LIMIT_HRS} hr limit ({pct}%)
                  </span>
                  <span>
                    This week: <strong className="hops-mono" style={{ color: OPS.text }}>{s.weekHrs} hrs</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <details className="mt-4">
          <summary className="hops-mono cursor-pointer text-[11.5px] font-semibold uppercase tracking-[.04em]" style={{ color: OPS.ice }}>
            View logged duty segments ({segments.length})
          </summary>
          <div className="mt-2.5 space-y-1.5">
            {segments.map((seg) => (
              <div
                key={seg.id}
                className="hops-mono flex flex-wrap items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-[12px]"
                style={{ background: "rgba(255,255,255,.03)", color: OPS.textMuted }}
              >
                <span style={{ color: OPS.text }}>
                  {seg.pilotName} &middot; {seg.dateLabel}{seg.isToday ? " (today)" : ""}
                </span>
                <span>{Math.round((seg.durationMin / 60) * 10) / 10} hrs &middot; {seg.note}</span>
              </div>
            ))}
          </div>
        </details>

        <p className="mt-4 text-[12px] leading-snug" style={{ color: OPS.textMuted }}>
          Totals above are summed live from the {segments.length} logged duty segments shown in the expandable list —
          not a separately hardcoded total. Sample duty log for this concept demo; not a real crewmember
          flight/duty-time record.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FEATURE 17 — GUIDE CERT / AVALANCHE-TRAINING EXPIRATION TRACKER
// ---------------------------------------------------------------------------
function CertTracker() {
  const { dayState } = usePlatform();
  const certs = useMemo(() => seedGuideCerts(), []);
  // Cross-references against Module 1's ACTUAL Day-1 helicopter roster — read
  // from the SAME shared day-state ManifestBoard.tsx owns (not a separate
  // reseed), so this genuinely reflects Day 1's live guide-group lineup. A
  // guest reassignment doesn't change which guide leads which group, but
  // reading the shared state keeps this check honest against the actual
  // live data rather than a parallel snapshot that could in principle drift.
  const day1Helicopters = dayState["day-1"]?.helicopters ?? [];
  const assignedFlags = useMemo(
    () => flagAssignedGuideCerts(day1Helicopters, certs),
    [day1Helicopters, certs]
  );

  const certsByGuide = useMemo(() => {
    const map = new Map<string, typeof certs>();
    for (const c of certs) {
      const list = map.get(c.guideName) ?? [];
      list.push(c);
      map.set(c.guideName, list);
    }
    return map;
  }, [certs]);

  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3.5"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-base font-bold" style={{ color: OPS.snow }}>Guide cert &amp; avalanche-training tracker</div>
          <div className="text-[13px]" style={{ color: OPS.textMuted }}>
            Checked against who&rsquo;s ACTUALLY assigned to a group on today&rsquo;s (Day 1) manifest board, not a
            standalone cert list.
          </div>
        </div>
        <SampleTag />
      </div>

      <div className="p-4">
        {assignedFlags.length > 0 ? (
          <div className="mb-5">
            <div className="hops-eyebrow mb-2.5" style={{ color: OPS.red }}>
              Assigned guides with a cert problem today ({assignedFlags.length})
            </div>
            <div className="space-y-2">
              {assignedFlags.map((f) => (
                <div
                  key={f.cert.id}
                  className="hops-panel flex flex-wrap items-center justify-between gap-2 p-3"
                  style={{
                    background: f.tone === "alert" ? "rgba(229,72,77,.08)" : "rgba(240,168,60,.08)",
                    borderColor: f.tone === "alert" ? "rgba(229,72,77,.5)" : "rgba(240,168,60,.5)",
                  }}
                >
                  <div>
                    <div className="text-[14px] font-bold" style={{ color: OPS.snow }}>{f.guideName}</div>
                    <div className="text-[12.5px]" style={{ color: OPS.textMuted }}>
                      Assigned today to <strong className="hops-mono" style={{ color: OPS.ice }}>{f.tailNumber}</strong> &middot;{" "}
                      {f.cert.certType} ({f.cert.levelLabel})
                    </div>
                  </div>
                  {f.tone === "alert" ? (
                    <Pill tone="alert">Expired {f.cert.expiresLabel}</Pill>
                  ) : (
                    <Pill tone="warn">Expires {f.cert.expiresLabel} ({f.daysUntilExpiry}d)</Pill>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-2.5 text-[12px] leading-snug" style={{ color: OPS.textMuted }}>
              Computed by cross-referencing this cert roster against Module 01&rsquo;s actual Day-1 guide-group
              assignments — a guide with an expired/expiring cert only appears here if they&rsquo;re genuinely
              assigned to a helicopter group today.
            </p>
          </div>
        ) : (
          <div
            className="mb-5 rounded-md border px-3 py-2.5"
            style={{ borderColor: "rgba(62,207,142,.4)", background: "rgba(62,207,142,.08)" }}
          >
            <p className="text-[13px]" style={{ color: OPS.text }}>
              No guide assigned to a helicopter group today has an expired or soon-expiring cert on file.
            </p>
          </div>
        )}

        <details>
          <summary className="hops-mono cursor-pointer text-[11.5px] font-semibold uppercase tracking-[.04em]" style={{ color: OPS.ice }}>
            View full cert roster ({certs.length} records, {certsByGuide.size} guides)
          </summary>
          <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
            {Array.from(certsByGuide.entries()).map(([guideName, guideCerts]) => (
              <div key={guideName} className="hops-panel p-3" style={{ background: "rgba(255,255,255,.02)" }}>
                <div className="mb-1.5 text-[13px] font-bold" style={{ color: OPS.snow }}>{guideName}</div>
                <div className="space-y-1">
                  {guideCerts.map((c) => {
                    const tone = c.expiresSampleDayOffset < 0 ? "alert" : c.expiresSampleDayOffset <= 14 ? "warn" : "ok";
                    return (
                      <div key={c.id} className="flex items-center justify-between gap-2 text-[12px]" style={{ color: OPS.textMuted }}>
                        <span>{c.certType} &middot; {c.levelLabel}</span>
                        <span
                          className="hops-mono font-semibold"
                          style={{ color: tone === "alert" ? OPS.red : tone === "warn" ? OPS.amber : OPS.textMuted }}
                        >
                          {c.expiresLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </details>

        <p className="mt-4 text-[12px] leading-snug" style={{ color: OPS.textMuted }}>
          Sample &ldquo;today&rdquo; for expiry math is {SAMPLE_TODAY_LABEL}, matching Module 01&rsquo;s Day 1.
          Illustrative cert types and expiry windows only — not a real training-currency management system.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FEATURE 18 — INCIDENT / NEAR-MISS LOGGING FORM + HISTORY
// ---------------------------------------------------------------------------
const INCIDENT_CATEGORIES: IncidentCategory[] = [
  "Weather / visibility",
  "Mechanical / maintenance",
  "Terrain / avalanche",
  "Passenger / guest safety",
  "Communications",
  "Other",
];

const INCIDENT_SEVERITIES: IncidentSeverity[] = ["Near-miss", "Minor", "Moderate", "Serious"];

function severityTone(sev: IncidentSeverity): "ok" | "warn" | "alert" {
  if (sev === "Serious") return "alert";
  if (sev === "Moderate" || sev === "Minor") return "warn";
  return "ok";
}

function IncidentLogPanel() {
  const { incidents, addIncident } = usePlatform();

  const [dateLabel, setDateLabel] = useState(SAMPLE_TODAY_LABEL);
  const [category, setCategory] = useState<IncidentCategory>("Weather / visibility");
  const [severity, setSeverity] = useState<IncidentSeverity>("Near-miss");
  const [description, setDescription] = useState("");
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = description.trim();
    if (!trimmed) {
      setError("A description is required before logging this entry.");
      return;
    }
    setError(null);
    addIncident({ dateLabel: dateLabel.trim() || SAMPLE_TODAY_LABEL, category, severity, description: trimmed });
    setDescription("");
    setSeverity("Near-miss");
    setCategory("Weather / visibility");
    setDateLabel(SAMPLE_TODAY_LABEL);
    setJustSubmitted(true);
    window.setTimeout(() => setJustSubmitted(false), 2500);
  };

  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3.5"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-base font-bold" style={{ color: OPS.snow }}>Incident / near-miss log</div>
          <div className="text-[13px]" style={{ color: OPS.textMuted }}>
            A real form — submissions genuinely append to this session&rsquo;s growing incident history below.
          </div>
        </div>
        <SampleTag />
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="hops-panel p-4" style={{ background: "rgba(255,255,255,.02)" }}>
          <div className="hops-eyebrow mb-3">Log a new entry</div>
          <div className="space-y-3">
            <label className="block text-[12.5px]" style={{ color: OPS.textMuted }}>
              Date
              <input
                type="text"
                value={dateLabel}
                onChange={(e) => setDateLabel(e.target.value)}
                className="hops-mono mt-1 w-full rounded-md px-2.5 py-1.5 text-[13px] font-semibold"
                style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
                placeholder={SAMPLE_TODAY_LABEL}
              />
            </label>

            <label className="block text-[12.5px]" style={{ color: OPS.textMuted }}>
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IncidentCategory)}
                className="hops-mono mt-1 w-full rounded-md px-2.5 py-1.5 text-[13px] font-semibold"
                style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
              >
                {INCIDENT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>

            <label className="block text-[12.5px]" style={{ color: OPS.textMuted }}>
              Severity
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as IncidentSeverity)}
                className="hops-mono mt-1 w-full rounded-md px-2.5 py-1.5 text-[13px] font-semibold"
                style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
              >
                {INCIDENT_SEVERITIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>

            <label className="block text-[12.5px]" style={{ color: OPS.textMuted }}>
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-md px-2.5 py-1.5 text-[13px]"
                style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
                placeholder="What happened, where, and what was the outcome or near-outcome?"
              />
            </label>

            {error && (
              <p className="text-[12.5px] font-semibold" style={{ color: OPS.red }}>{error}</p>
            )}

            <button
              type="submit"
              className="hops-mono w-full rounded-md px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110"
              style={{ background: OPS.amberDeep }}
            >
              Log incident / near-miss
            </button>

            {justSubmitted && (
              <p className="text-center text-[12.5px] font-semibold" style={{ color: OPS.green }}>
                Logged — now entry #{incidents.length} in the history panel.
              </p>
            )}
          </div>
        </form>

        <div className="hops-panel overflow-hidden" style={{ background: "rgba(255,255,255,.02)" }}>
          <div className="border-b px-3.5 py-2.5" style={{ borderColor: OPS.line }}>
            <div className="hops-eyebrow">Incident history — this session ({incidents.length})</div>
          </div>
          <div className="hops-scroll max-h-96 space-y-2 overflow-y-auto p-3.5">
            {incidents.length === 0 && (
              <p className="text-[13px]" style={{ color: OPS.textMuted }}>
                No incidents or near-misses logged yet this session. Submit the form to add the first entry.
              </p>
            )}
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className="rounded-md border px-3 py-2.5"
                style={{
                  borderColor:
                    severityTone(inc.severity) === "alert"
                      ? "rgba(229,72,77,.4)"
                      : severityTone(inc.severity) === "warn"
                      ? "rgba(240,168,60,.4)"
                      : OPS.line,
                  background: "rgba(255,255,255,.02)",
                }}
              >
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <span className="hops-mono text-[12px] font-semibold" style={{ color: OPS.textMuted }}>
                    {inc.dateLabel}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Pill tone="info">{inc.category}</Pill>
                    <Pill tone={severityTone(inc.severity)}>{inc.severity}</Pill>
                  </div>
                </div>
                <p className="text-[13.5px] leading-snug" style={{ color: OPS.text }}>{inc.description}</p>
                <p className="mt-1 text-[11px]" style={{ color: OPS.textMuted }}>
                  Logged this session at {new Date(inc.loggedAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-4 mb-4 text-[12px] leading-snug" style={{ color: OPS.textMuted }}>
        Session-persisted, not saved server-side — reloading the page clears this history, as stated plainly here.
        Sample incident-logging workflow for this concept demo; not a certified safety-management-system (SMS)
        reporting tool.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FEATURE 19 + 20 — PER-HELICOPTER W&B EXPORT + PILOT SIGN-OFF
// ---------------------------------------------------------------------------
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

// Builds a real plain-text W&B artifact from the SAME live per-group /
// per-bay math ManifestBoard.tsx uses (groupWeight, bayLoadForHeli,
// heliTotalWeight) — no separately hardcoded numbers.
function buildWBExportText(
  heli: Helicopter,
  bayLimits: Record<CargoBayKey, number>,
  signOff: { pilotName: string; signedAgainstTotalLbs: number; signedAt: number } | null
): string {
  const bayLoads = bayLoadForHeli(heli);
  const total = heliTotalWeight(heli);
  const lines: string[] = [
    "HELI-OPS PLATFORM — WEIGHT & BALANCE SAMPLE EXPORT (CONCEPT DEMO)",
    "This is a SAMPLE / CONCEPT artifact from a fictional portfolio demo.",
    "It is NOT a legally valid regulatory weight-and-balance record and",
    "must never be used as a substitute for an operator's real W&B",
    "documentation, load manifest, or FAA-required recordkeeping.",
    `Exported: ${formatDateTime(Date.now())}`,
    "-".repeat(72),
    `Aircraft: ${heli.tailNumber} (${heli.model})`,
    `Pilot on file: ${heli.pilotName}`,
    "-".repeat(72),
    "GUIDE GROUPS",
  ];
  for (const g of heli.groups) {
    lines.push(`  ${g.guideName} — bay: ${BAY_LABEL[g.cargoBay]} — group total: ${groupWeight(g)} lb`);
    for (const guest of g.guests) {
      lines.push(`    - ${guest.name}: ${guest.weightLbs} lb (${guest.equipment})`);
    }
  }
  lines.push("-".repeat(72));
  lines.push("CARGO BAY TOTALS");
  for (const bay of Object.keys(bayLoads) as CargoBayKey[]) {
    const over = bayLoads[bay] > bayLimits[bay];
    lines.push(`  ${BAY_LABEL[bay]}: ${bayLoads[bay]} lb / ${bayLimits[bay]} lb limit${over ? "  [OVER LIMIT]" : ""}`);
  }
  lines.push("-".repeat(72));
  lines.push(`AIRCRAFT TOTAL: ${total} lb`);
  lines.push("-".repeat(72));
  if (signOff && signOff.signedAgainstTotalLbs === total) {
    lines.push("PILOT SIGN-OFF");
    lines.push(`  Signed off by: ${signOff.pilotName}`);
    lines.push(`  Acknowledged total: ${signOff.signedAgainstTotalLbs} lb`);
    lines.push(`  Signed at: ${formatDateTime(signOff.signedAt)}`);
  } else {
    lines.push("PILOT SIGN-OFF: PENDING — not yet acknowledged at export time.");
  }
  lines.push("-".repeat(72));
  lines.push("SAMPLE / CONCEPT EXPORT ONLY. Not a legally valid regulatory document.");
  return `${lines.join("\n")}\n`;
}

function downloadWBExport(heli: Helicopter, bayLimits: Record<CargoBayKey, number>, signOff: { pilotName: string; signedAgainstTotalLbs: number; signedAt: number } | null) {
  const text = buildWBExportText(heli, bayLimits, signOff);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  a.href = url;
  a.download = `heli-ops-demo-wb-${heli.tailNumber}-${stamp}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function WBSignOffCard({ heli, bayLimits }: { heli: Helicopter; bayLimits: Record<CargoBayKey, number> }) {
  const { wbSignOffs, signOffWB, clearWBSignOff } = usePlatform();
  const total = heliTotalWeight(heli);
  const bayLoads = bayLoadForHeli(heli);
  const anyBayOver = (Object.keys(bayLoads) as CargoBayKey[]).some((b) => bayLoads[b] > bayLimits[b]);

  const existing = wbSignOffs[heli.tailNumber];
  // A sign-off only counts as valid if it was captured against the EXACT
  // current total — see ManifestBoard.tsx's staleness guard, which clears
  // this entry outright the moment the live total moves. This check here is
  // a second, independent read of the same honesty rule (defense in depth):
  // even if the guard hadn't yet re-rendered, this component would never
  // display a mismatched sign-off as valid.
  const isSignedAndCurrent = !!existing && existing.signedAgainstTotalLbs === total;

  const [justSigned, setJustSigned] = useState(false);

  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3.5"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="hops-mono flex h-8 items-center rounded-md px-2.5 text-[13.5px] font-bold"
            style={{ background: "rgba(94,200,232,.14)", color: OPS.ice, border: "1px solid rgba(94,200,232,.35)" }}
          >
            {heli.tailNumber}
          </span>
          <div>
            <div className="text-[13.5px] font-bold" style={{ color: OPS.snow }}>{heli.pilotName}</div>
            <div className="hops-mono text-[12px]" style={{ color: OPS.textMuted }}>
              Current computed total: {total} lb {anyBayOver && <span style={{ color: OPS.red }}>(bay over limit)</span>}
            </div>
          </div>
        </div>
        {isSignedAndCurrent ? (
          <Pill tone="ok">Signed off — cleared for departure</Pill>
        ) : (
          <Pill tone="warn">Pending sign-off</Pill>
        )}
      </div>

      <div className="p-4">
        {isSignedAndCurrent && existing ? (
          <div
            className="mb-3 rounded-md border px-3 py-2.5"
            style={{ borderColor: "rgba(62,207,142,.4)", background: "rgba(62,207,142,.08)" }}
          >
            <p className="text-[13px] leading-snug" style={{ color: OPS.text }}>
              <strong>{existing.pilotName}</strong> acknowledged a total of{" "}
              <strong className="hops-mono">{existing.signedAgainstTotalLbs} lb</strong> at{" "}
              {formatDateTime(existing.signedAt)}.
            </p>
            <button
              type="button"
              onClick={() => clearWBSignOff(heli.tailNumber)}
              className="hops-mono mt-2 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.04em] transition hover:brightness-110"
              style={{ background: "rgba(255,255,255,.08)", color: OPS.textMuted, border: `1px solid ${OPS.line}` }}
            >
              Revoke sign-off
            </button>
          </div>
        ) : (
          <div className="mb-3">
            <p className="mb-2.5 text-[13px] leading-snug" style={{ color: OPS.textMuted }}>
              {existing && existing.signedAgainstTotalLbs !== total
                ? `A prior sign-off by ${existing.pilotName} was invalidated because the load changed after signing (was ${existing.signedAgainstTotalLbs} lb, now ${total} lb) — re-sign against the current number below.`
                : `${heli.pilotName} has not yet acknowledged today's load numbers for this aircraft.`}
            </p>
            <button
              type="button"
              onClick={() => {
                signOffWB(heli.tailNumber, heli.pilotName, total);
                setJustSigned(true);
                window.setTimeout(() => setJustSigned(false), 2200);
              }}
              className="hops-mono w-full rounded-md px-3.5 py-2.5 text-[12.5px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110"
              style={{ background: OPS.green, color: OPS.inkOnSnow }}
            >
              {heli.pilotName} acknowledges load numbers ({total} lb total)
            </button>
            {justSigned && (
              <p className="mt-2 text-center text-[12.5px] font-semibold" style={{ color: OPS.green }}>
                Signed off — status above now reads &ldquo;Cleared for departure.&rdquo;
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 border-t pt-3" style={{ borderColor: OPS.line }}>
          <span className="text-[12px]" style={{ color: OPS.textMuted }}>
            Downloads a sample W&amp;B artifact built from this aircraft&rsquo;s current real weight totals.
          </span>
          <button
            type="button"
            onClick={() => downloadWBExport(heli, bayLimits, existing ?? null)}
            className="hops-mono shrink-0 rounded-md px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110"
            style={{ background: OPS.amberDeep }}
          >
            Export W&amp;B
          </button>
        </div>
      </div>
    </div>
  );
}

function WBExportAndSignOff() {
  const { settings, dayState, activeDay } = usePlatform();
  // Module 4 reads the SAME shared, live day-state ManifestBoard.tsx's
  // drag-and-drop and reslot actions genuinely mutate (hoisted into
  // _platform.tsx — see DayState there) — not a separately re-seeded
  // snapshot. This is what makes the staleness guard honest end-to-end: if
  // a guest is dragged into/out of a helicopter's groups on Module 01's
  // board, THIS panel's `heliTotalWeight()` reads the new real total on its
  // very next render, which is exactly what ManifestBoard's HeliCard
  // staleness-guard effect (and this panel's own isSignedAndCurrent check
  // in WBSignOffCard) compares against a captured sign-off number.
  const helicopters = dayState[activeDay]?.helicopters ?? [];

  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3.5"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-base font-bold" style={{ color: OPS.snow }}>Weight &amp; balance export + pilot sign-off</div>
          <div className="text-[13px]" style={{ color: OPS.textMuted }}>
            Real computed totals per aircraft, a downloadable sample export, and a genuine pilot acknowledgment step
            before departure.
          </div>
        </div>
        <SampleTag />
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-md border px-3 py-2.5" style={{ borderColor: "rgba(229,72,77,.4)", background: "rgba(229,72,77,.06)" }}>
          <p className="text-[12.5px] leading-snug" style={{ color: OPS.text }}>
            Sample / concept export and sign-off only — <strong>not a legally valid regulatory weight-and-balance
            document or acknowledgment</strong>. If a guest is reassigned via drag-and-drop on Module 01&rsquo;s
            board, any existing sign-off for the affected aircraft is genuinely invalidated (see the aircraft card
            above flip back to &ldquo;Pending sign-off&rdquo;) rather than silently staying valid against stale
            numbers.
          </p>
        </div>

        {helicopters.map((heli) => (
          <WBSignOffCard key={heli.id} heli={heli} bayLimits={settings.bayLimits} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function SafetyCompliance() {
  return (
    <div>
      <ModuleDisclaimerBanner />

      <div className="mb-6">
        <DutyHoursLog />
      </div>

      <div className="mb-6">
        <CertTracker />
      </div>

      <div className="mb-6">
        <IncidentLogPanel />
      </div>

      <div className="mb-6">
        <WBExportAndSignOff />
      </div>

      <p className="mt-6 text-[12.5px] leading-relaxed" style={{ color: OPS.textMuted }}>
        This module sketches what deeper Part 135-style safety &amp; compliance tooling could look like layered onto
        the scheduling and dispatch modules above: a duty-hours log cross-referenced against today&rsquo;s real
        schedule, a cert tracker that checks real assignments rather than a standalone roster, a real incident-log
        form feeding a growing history, and a per-aircraft weight-and-balance export and sign-off step wired to the
        same live math the rest of this concept demo already computes. Every number and status here is real for this
        session — none of it is a certified regulatory system.
      </p>
    </div>
  );
}
