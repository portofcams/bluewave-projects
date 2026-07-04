"use client";

// GuideView — Module 3 cross-cutting refinement: a guide-facing MOBILE view.
//
// FICTIONAL SAMPLE DATA ONLY. Guide names, tail numbers, and guests below are
// the same invented sample data used throughout Module 1 (ManifestBoard) and
// Module 2 (FlightFollowing).
//
// HONEST FRAMING: a guide's own phone isn't a real separate device in this
// demo — there's one browser tab. This section is styled as "here's what a
// guide would see on their phone" (a phone-frame mockup container), and says
// so explicitly. What IS genuinely real: picking a guide, seeing THEIR
// actual assigned aircraft (matched by tail number against Module 02's live
// fleet) and THEIR actual guest group (from Module 01's seed data), and a
// "Check in now" button that calls the exact same handleCheckIn function
// Module 02's "Simulate check-in" button uses — confirmed by hand-trace: it
// resets lastCheckIns[aircraftId] via the shared PlatformProvider, which is
// the same state Module 02's live timers read from. Not a separate cosmetic
// action.

import { useMemo, useState } from "react";
import { OPS, SampleTag } from "./_shared";
import { Helicopter, seedHelicopters } from "./_data";
import { severity, usePlatform } from "./_platform";

type GuideOption = {
  guideName: string;
  heliId: string;
  tailNumber: string;
  groupId: string;
  guests: { name: string; medicalFlag: string }[];
};

// Builds the flat list of "which guide is on which helicopter with which
// guests" from the SAME seed data Module 1 uses for Day 1 — this demo's
// guide picker deliberately mirrors today's real manifest rather than a
// separately hardcoded roster. (Module 1's live drag/drop edits are scoped
// to its own day-state and aren't reflected here in this concept demo — the
// picker always reflects the Day-1 seed lineup.)
function buildGuideOptions(): GuideOption[] {
  const helicopters: Helicopter[] = seedHelicopters();
  const options: GuideOption[] = [];
  for (const heli of helicopters) {
    for (const group of heli.groups) {
      options.push({
        guideName: group.guideName,
        heliId: heli.id,
        tailNumber: heli.tailNumber,
        groupId: group.id,
        guests: group.guests.map((g) => ({ name: g.name, medicalFlag: g.medicalFlag })),
      });
    }
  }
  return options;
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div
        className="w-full max-w-[380px] rounded-[32px] p-3"
        style={{ background: "#0d1117", border: `2px solid ${OPS.line}`, boxShadow: "0 20px 44px -20px rgba(0,0,0,.85)" }}
      >
        <div className="mb-2 flex items-center justify-center">
          <div className="h-1.5 w-16 rounded-full" style={{ background: OPS.line }} />
        </div>
        <div
          className="overflow-hidden rounded-[22px]"
          style={{ background: "linear-gradient(180deg, #1b212d, #12161f)", border: `1px solid ${OPS.line}` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function GuideView() {
  const { fleet, lastCheckIns, now, handleCheckIn, settings } = usePlatform();
  const guideOptions = useMemo(() => buildGuideOptions(), []);
  const [selectedGuide, setSelectedGuide] = useState<string>(guideOptions[0]?.guideName ?? "");
  const [justCheckedIn, setJustCheckedIn] = useState(false);

  const selected = guideOptions.find((g) => g.guideName === selectedGuide) ?? guideOptions[0] ?? null;

  // Match the guide's assigned tail number to the ACTUAL Module 02 fleet —
  // if it's not found (shouldn't happen with sample data, but stated
  // honestly rather than silently assumed), say so instead of faking it.
  const aircraft = selected ? fleet.find((a) => a.tailNumber === selected.tailNumber) ?? null : null;
  const lastCheckIn = aircraft ? lastCheckIns[aircraft.id] : undefined;
  const elapsedMs = aircraft && lastCheckIn ? now - lastCheckIn : 0;
  const tone = aircraft ? severity(elapsedMs, aircraft.phase, settings.phaseIntervalMin) : "ok";
  const elapsedMin = Math.floor(elapsedMs / 60000);

  return (
    <div>
      <div
        className="hops-panel mb-6 flex flex-col gap-1.5 border px-4 py-3.5"
        style={{ borderColor: "rgba(94,200,232,.4)", background: "rgba(94,200,232,.06)" }}
      >
        <span className="hops-pill w-fit" style={{ background: "rgba(94,200,232,.18)", color: OPS.ice, border: "1px solid rgba(94,200,232,.4)" }}>
          Illustrative device framing
        </span>
        <p className="text-[13.5px] leading-relaxed" style={{ color: OPS.text }}>
          A guide&rsquo;s phone isn&rsquo;t a real separate device in this demo — this section is shown in the same
          browser tab, styled with a phone-frame mockup to illustrate what a guide would see on their own phone. The
          <strong> guide picker, aircraft/guest data, and Check-in button below are genuinely real</strong>: picking
          a guide loads their actual assigned aircraft and guest group, and Check-in now calls the exact same
          check-in function used by Module 02&rsquo;s &ldquo;Simulate check-in&rdquo; button — it resets that
          aircraft&rsquo;s real timer in shared state, visible live on Module 02&rsquo;s board.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-[13px]" style={{ color: OPS.textMuted }}>
          Sample guide:
          <select
            value={selectedGuide}
            onChange={(e) => setSelectedGuide(e.target.value)}
            className="hops-mono rounded-md px-2.5 py-1.5 text-[13px] font-semibold"
            style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
          >
            {guideOptions.map((g) => (
              <option key={g.groupId} value={g.guideName}>
                {g.guideName}
              </option>
            ))}
          </select>
        </label>
        <SampleTag />
      </div>

      {!selected || !aircraft ? (
        <p className="text-[14px]" style={{ color: OPS.textMuted }}>
          No sample guide/aircraft data available.
        </p>
      ) : (
        <PhoneFrame>
          <div className="p-4">
            <div className="mb-4 text-center">
              <div className="hops-eyebrow" style={{ color: OPS.ice }}>Guide view (sample device)</div>
              <div className="mt-1 text-lg font-extrabold" style={{ color: OPS.snow }}>{selected.guideName}</div>
            </div>

            <div
              className="mb-4 rounded-2xl p-4 text-center"
              style={{ background: "rgba(94,200,232,.12)", border: "1px solid rgba(94,200,232,.4)" }}
            >
              <div className="hops-mono text-[11px] font-semibold uppercase tracking-[.06em]" style={{ color: OPS.ice }}>
                Your helicopter
              </div>
              <div className="hops-mono mt-1 text-3xl font-extrabold" style={{ color: OPS.snow }}>
                {aircraft.tailNumber}
              </div>
              <div
                className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[.04em]"
                style={{
                  background: tone === "alert" ? "rgba(229,72,77,.2)" : tone === "warn" ? "rgba(240,168,60,.2)" : "rgba(62,207,142,.2)",
                  color: tone === "alert" ? OPS.red : tone === "warn" ? OPS.amber : OPS.green,
                }}
              >
                {tone === "alert" ? "Check-in overdue" : tone === "warn" ? "Check-in due soon" : "Checked in — normal"}
              </div>
              <div className="mt-1.5 text-[12px]" style={{ color: OPS.textMuted }}>
                {elapsedMin} min since last check-in
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-2 hops-eyebrow" style={{ color: OPS.textMuted }}>Your group ({selected.guests.length})</div>
              <div className="space-y-2">
                {selected.guests.map((g) => {
                  const flagged = g.medicalFlag !== "None";
                  return (
                    <div
                      key={g.name}
                      className="rounded-xl px-3.5 py-3"
                      style={{
                        background: flagged ? "rgba(229,72,77,.10)" : "rgba(255,255,255,.04)",
                        border: `1px solid ${flagged ? "rgba(229,72,77,.4)" : OPS.line}`,
                      }}
                    >
                      <div className="text-[16px] font-bold" style={{ color: OPS.snow }}>{g.name}</div>
                      {flagged ? (
                        <div className="mt-1 text-[13px] font-medium" style={{ color: OPS.red }}>
                          ⚑ {g.medicalFlag}
                        </div>
                      ) : (
                        <div className="mt-1 text-[13px]" style={{ color: OPS.textMuted }}>No medical/dietary flag on file</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                handleCheckIn(aircraft.id);
                setJustCheckedIn(true);
                window.setTimeout(() => setJustCheckedIn(false), 2200);
              }}
              className="hops-mono w-full rounded-2xl py-4 text-[15px] font-extrabold uppercase tracking-[.05em] text-white transition hover:brightness-110 active:scale-[0.98]"
              style={{ background: OPS.green, color: OPS.inkOnSnow }}
            >
              Check in now
            </button>
            {justCheckedIn && (
              <p className="mt-2.5 text-center text-[12.5px] font-semibold" style={{ color: OPS.green }}>
                Checked in — {aircraft.tailNumber}&rsquo;s timer just reset on Module 02&rsquo;s live board.
              </p>
            )}
          </div>
        </PhoneFrame>
      )}

      <p className="mt-6 text-[12.5px] leading-relaxed" style={{ color: OPS.textMuted }}>
        Today, a guide&rsquo;s only way to signal status is a radio call relayed to whoever&rsquo;s at the base. This
        view sketches a lightweight, large-tap-target alternative: pick a sample guide, see only what they need —
        their aircraft and their own group&rsquo;s medical/dietary flags, nothing else from the full ops board — and
        one big button wired to the same real check-in state Module 02 tracks.
      </p>
    </div>
  );
}
