"use client";

// EndOfDayDebrief — Module 3 cross-cutting refinement: a "closing out the
// day" summary computed LIVE from real shared state, not a separately
// hardcoded set of numbers.
//
// FICTIONAL SAMPLE DATA ONLY. See the disclaimers already established in
// _shared.tsx / FlightFollowing.tsx / PrototypeBanner.
//
// WHAT'S GENUINELY LIVE HERE:
//   - Helicopter/snowcat run + guest counts: read directly from Module 1's
//     Day-1 seed data via seedHelicopters()/seedCatGroups() + the same
//     totalGuestCount() helper OpsOverview uses. (Scoped to Day 1 — this
//     demo's debrief reports on today's seeded manifest, not Module 1's live
//     drag/drop edits or other calendar days, which are scoped to
//     ManifestBoard's own local day-state.)
//   - Weight-and-balance flag count: uses weightBalanceFlagCount() with the
//     CURRENT, demo-editable bay limits from the shared Settings panel — so
//     if you change a bay limit in Module 02's Settings before viewing this
//     debrief, the count here genuinely reflects that change.
//   - Weather holds: weatherHoldCount() against the same seed data.
//   - Overdue/escalation events THIS SESSION: derived by filtering the
//     shared activity log (the SAME log Module 02 appends to, and Incident
//     Mode's diverts append to) for "OVERDUE" and "diverting to assist"
//     messages — not a separate hardcoded counter.

import { useMemo } from "react";
import { OPS, SampleTag } from "./_shared";
import {
  seedCatGroups,
  seedHelicopters,
  totalGuestCount,
  weatherHoldCount,
  weightBalanceFlagCount,
} from "./_data";
import { usePlatform } from "./_platform";

function StatTile({
  label,
  value,
  tone = "info",
  footnote,
}: {
  label: string;
  value: string | number;
  tone?: "info" | "warn" | "alert" | "ok";
  footnote?: string;
}) {
  const toneColor = tone === "alert" ? OPS.red : tone === "warn" ? OPS.amber : tone === "ok" ? OPS.green : OPS.ice;
  const borderColor =
    tone === "alert" ? "rgba(229,72,77,.5)" : tone === "warn" ? "rgba(240,168,60,.5)" : tone === "ok" ? "rgba(62,207,142,.4)" : OPS.line;

  return (
    <div className="hops-panel h-full px-4 py-4" style={{ borderColor }}>
      <div className="hops-eyebrow mb-1.5" style={{ color: toneColor }}>{label}</div>
      <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: tone === "info" ? OPS.snow : toneColor }}>
        {value}
      </div>
      {footnote && (
        <div className="mt-1.5 text-[12px] leading-snug" style={{ color: OPS.textMuted }}>
          {footnote}
        </div>
      )}
    </div>
  );
}

export default function EndOfDayDebrief() {
  const { logEntries, settings } = usePlatform();

  const { helicopters, catGroups } = useMemo(
    () => ({ helicopters: seedHelicopters(), catGroups: seedCatGroups() }),
    []
  );

  const heliRunCount = helicopters.length;
  const heliGroupCount = helicopters.reduce((sum, h) => sum + h.groups.length, 0);
  const catRunCount = catGroups.length;
  const guestCount = totalGuestCount(helicopters, catGroups);
  const flagCount = weightBalanceFlagCount(helicopters, settings.bayLimits);
  const holdCount = weatherHoldCount(helicopters);

  // Derived live from the SHARED activity log — the same log Module 02's
  // check-in/zone/phase changes and Incident Mode's diverts append to.
  const escalationEvents = useMemo(
    () => logEntries.filter((e) => e.tone === "alert" || e.message.includes("diverting to assist")),
    [logEntries]
  );

  const divertEvents = useMemo(
    () => logEntries.filter((e) => e.message.includes("diverting to assist")),
    [logEntries]
  );

  return (
    <div>
      <div
        className="hops-panel mb-6 flex flex-col gap-1.5 border px-4 py-3.5"
        style={{ borderColor: "rgba(94,200,232,.4)", background: "rgba(94,200,232,.06)" }}
      >
        <span className="hops-pill w-fit" style={{ background: "rgba(94,200,232,.18)", color: OPS.ice, border: "1px solid rgba(94,200,232,.4)" }}>
          Computed live from shared state
        </span>
        <p className="text-[13.5px] leading-relaxed" style={{ color: OPS.text }}>
          Every number below is derived, at render time, from the same manifest seed data Module 01 uses and the
          same activity log Module 02 (and Incident Mode) writes to — not a separately hardcoded summary. The weight
          &amp; balance flag count uses whatever bay limits are currently set in Module 02&rsquo;s Settings panel.
        </p>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h3 className="hops-display text-lg" style={{ color: OPS.snow }}>Today&rsquo;s closing report</h3>
        <SampleTag />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <StatTile label="Helicopter runs" value={heliRunCount} footnote={`${heliGroupCount} guide groups across the fleet`} />
        <StatTile label="Snowcat runs" value={catRunCount} footnote="Snowcat groups today" />
        <StatTile label="Total guests" value={guestCount} footnote="Helicopter + snowcat manifests" />
        <StatTile
          label="Weight & balance flags"
          value={flagCount}
          tone={flagCount > 0 ? "alert" : "ok"}
          footnote="Live vs. current Settings bay limits"
        />
        <StatTile
          label="Weather holds processed"
          value={holdCount}
          tone={holdCount > 0 ? "warn" : "ok"}
          footnote="Flagged for reslot, Module 01"
        />
        <StatTile
          label="Overdue / escalation events"
          value={escalationEvents.length}
          tone={escalationEvents.length > 0 ? "alert" : "ok"}
          footnote="This session's activity log — OVERDUE + diverts"
        />
        <StatTile
          label="Incident-mode diverts"
          value={divertEvents.length}
          tone={divertEvents.length > 0 ? "warn" : "ok"}
          footnote="Aircraft genuinely diverted to assist"
        />
        <StatTile label="Activity log entries" value={logEntries.length} footnote="Full session audit trail, Module 02" />
      </div>

      {escalationEvents.length > 0 && (
        <div className="mt-6 hops-panel overflow-hidden">
          <div className="border-b px-4 py-3" style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}>
            <div className="text-base font-bold" style={{ color: OPS.snow }}>Escalation events this session</div>
            <div className="text-[13px]" style={{ color: OPS.textMuted }}>
              Pulled directly from the shared activity log — same entries visible in Module 02&rsquo;s Structured
              activity log.
            </div>
          </div>
          <div className="hops-scroll max-h-56 space-y-1.5 overflow-y-auto p-4">
            {escalationEvents.map((e) => (
              <div key={e.id} className="text-[13.5px] leading-snug" style={{ color: OPS.text }}>
                <strong className="hops-mono font-bold" style={{ color: OPS.ice }}>{e.tailNumber}</strong> {e.message}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 text-[12.5px] leading-relaxed" style={{ color: OPS.textMuted }}>
        A real end-of-day debrief today means someone reconstructing the day from memory, a printed manifest, and a
        stack of chat messages. This section shows a reconciled alternative: one report, computed the moment it
        renders from the same live state as the two modules above.
      </p>
    </div>
  );
}
