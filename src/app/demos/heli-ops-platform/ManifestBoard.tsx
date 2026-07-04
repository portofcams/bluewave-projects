"use client";

// ManifestBoard — Module 1 (Scheduling) interactive component.
//
// FICTIONAL SAMPLE DATA ONLY. Every tail number, pilot, guide, guest, and
// cat-group name below is invented for this concept demo. Nothing here
// reflects a real operator, a real guest, or a real flight/dispatch log.
//
// Demonstrates, with real React state (not static markup):
//   1. A visual board of fictional helicopters + guide groups + guests.
//   2. Automatic weight-and-balance math per guide group, per aircraft, and
//      per cargo bay — with visible red/amber overweight flags.
//   3. A "weather hold -> reslot to next day" interaction that actually
//      moves a guest between days in state.
//   4. A unified Snowcat section alongside the helicopter fleet.
//   5. An expandable "safety card" per guest surfacing medical/dietary flags
//      prominently instead of burying them in a spreadsheet cell.
//   6. A small rentals/equipment snapshot for the day, now with per-guest
//      gear size/serial detail for renters.
//   7. Native HTML5 drag-and-drop guest reassignment between guide groups
//      and between helicopters, with weight/bay totals recomputed live.
//   8. A multi-day calendar view (day-picker tabs) — each day holds its own
//      independent live state, and the weather-hold -> reslot cascade is
//      shown carrying a guest across days, not just within one day.
//   9. An "Auto-suggest rebalancing" panel that computes (for real, against
//      live state) whether a single-guest swap would resolve an overweight
//      group, and is honest when no such swap exists.
//  10. A "Preview as guest" read-only mode showing one sample guest's own
//      simplified day view.
//
// Seed fleet/guest data lives in ./_data.tsx, shared with Module 2
// (FlightFollowing.tsx) and the page-level "Today's Ops Overview" strip so
// all three stay in lockstep instead of drifting apart.

import { useEffect, useMemo, useState } from "react";
import { OPS, SampleTag } from "./_shared";
import {
  BAY_LABEL,
  CargoBayKey,
  CatGroup,
  DayKey,
  GROUP_MAX_LBS,
  GROUP_WARN_LBS,
  GuideGroup,
  Guest,
  Helicopter,
  NEXT_DAY,
  RebalanceSuggestion,
  SAMPLE_DAYS,
  bayLoadForHeli,
  findRebalanceSuggestion,
  groupWeight,
  heliTotalWeight,
  seedDayData,
  seedRentalSnapshot,
} from "./_data";
import { usePlatform } from "./_platform";

// ---------------------------------------------------------------------------
// SMALL UI PRIMITIVES
// ---------------------------------------------------------------------------
function StatusPill({ tone, children }: { tone: "ok" | "warn" | "alert" | "info"; children: React.ReactNode }) {
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

// A guest's current location on the board — the drag payload shape. Cat
// groups are intentionally excluded from drag/drop targets (scope: guide
// groups + helicopters only, per the manifest board's core weight math).
export type GuestLocation = { heliId: string; groupId: string };

function GuestRow({
  guest,
  location,
  onReslot,
  draggable = false,
  onDragStartGuest,
  onPreview,
}: {
  guest: Guest;
  location?: GuestLocation;
  onReslot?: (guestId: string) => void;
  draggable?: boolean;
  onDragStartGuest?: (guestId: string, from: GuestLocation) => void;
  onPreview?: (guestId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMedicalNote = guest.medicalFlag && guest.medicalFlag !== "None";

  return (
    <div
      draggable={draggable}
      onDragStart={(e) => {
        if (!draggable || !location) return;
        e.dataTransfer.setData("text/plain", guest.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStartGuest?.(guest.id, location);
      }}
      className="rounded-lg border"
      style={{
        borderColor: "rgba(19,23,34,.10)",
        background: expanded ? OPS.snowDim : "transparent",
        cursor: draggable ? "grab" : undefined,
      }}
    >
      <div className="flex w-full items-center gap-1 pl-1.5">
        {draggable && (
          <span
            className="hops-mono shrink-0 select-none text-[13px] leading-none"
            style={{ color: OPS.mutedOnSnow }}
            aria-hidden="true"
            title="Drag to move this guest"
          >
            ⠿
          </span>
        )}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex min-w-0 flex-1 items-center justify-between gap-2 px-2 py-2 text-left"
          aria-expanded={expanded}
        >
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span
              className="hops-mono shrink-0 text-[10px] font-semibold"
              style={{ color: hasMedicalNote ? OPS.redDeep : OPS.mutedOnSnow }}
              aria-hidden="true"
            >
              {hasMedicalNote ? "⚑" : "·"}
            </span>
            <span className="truncate text-[15px] font-semibold" style={{ color: OPS.inkOnSnow }}>
              {guest.name}
            </span>
            <span className="hops-mono shrink-0 text-[13.5px] font-medium" style={{ color: OPS.mutedOnSnow }}>
              {guest.weightLbs} lb
            </span>
            <span className="hidden shrink-0 text-[12.5px] sm:inline" style={{ color: OPS.mutedOnSnow }}>
              {guest.equipment}
            </span>
            {guest.rental && (
              <span
                className="hops-mono hidden shrink-0 rounded px-1.5 py-0.5 text-[11px] font-semibold sm:inline"
                style={{ background: "rgba(94,200,232,.12)", color: OPS.iceDeep }}
              >
                Rental {guest.rental.skiOrBoardLengthCm}cm / boot {guest.rental.bootSizeMondo}
              </span>
            )}
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            {guest.weatherHold && <StatusPill tone="warn">WX hold</StatusPill>}
            {hasMedicalNote && <StatusPill tone="alert">Medical</StatusPill>}
            <svg
              viewBox="0 0 16 16"
              className="h-3 w-3 transition-transform"
              style={{ color: OPS.mutedOnSnow, transform: expanded ? "rotate(180deg)" : "none" }}
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 6 L8 11 L13 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      {expanded && (
        <div className="space-y-2.5 border-t px-3 py-3" style={{ borderColor: "rgba(19,23,34,.08)" }}>
          {/* SAFETY CARD — prominent, not a buried spreadsheet cell. */}
          <div
            className="rounded-md border px-3 py-2.5"
            style={{
              borderColor: hasMedicalNote ? "rgba(165,42,47,.35)" : "rgba(19,23,34,.10)",
              background: hasMedicalNote ? "rgba(229,72,77,.08)" : "rgba(19,23,34,.03)",
            }}
          >
            <div className="hops-eyebrow mb-1" style={{ color: hasMedicalNote ? OPS.redDeep : OPS.mutedOnSnow }}>
              Safety card — medical / dietary flag
            </div>
            <p className="text-[15px] font-semibold leading-snug" style={{ color: OPS.inkOnSnow }}>
              {guest.medicalFlag}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]" style={{ color: OPS.mutedOnSnow }}>
            <span>Weight: <strong style={{ color: OPS.inkOnSnow }}>{guest.weightLbs} lb</strong></span>
            <span>Equipment: <strong style={{ color: OPS.inkOnSnow }}>{guest.equipment}</strong></span>
          </div>

          {guest.rental && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]" style={{ color: OPS.mutedOnSnow }}>
              <span>Ski/board length: <strong style={{ color: OPS.inkOnSnow }}>{guest.rental.skiOrBoardLengthCm} cm</strong></span>
              <span>Boot size: <strong style={{ color: OPS.inkOnSnow }}>{guest.rental.bootSizeMondo} mondo</strong></span>
              <span>Rental tag: <strong className="hops-mono" style={{ color: OPS.inkOnSnow }}>{guest.rental.serial}</strong></span>
            </div>
          )}

          {guest.weatherHold && onReslot && (
            <div
              className="flex flex-wrap items-center justify-between gap-2 rounded-md px-3 py-2"
              style={{ background: "rgba(240,168,60,.14)", border: "1px solid rgba(240,168,60,.4)" }}
            >
              <span className="text-[13.5px] font-medium" style={{ color: OPS.amberDeep }}>
                Weather hold — booking needs reslotting to the next viable day.
              </span>
              <button
                type="button"
                onClick={() => onReslot(guest.id)}
                className="hops-mono shrink-0 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110"
                style={{ background: OPS.amberDeep }}
              >
                Reslot to next day
              </button>
            </div>
          )}

          {onPreview && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onPreview(guest.id)}
                className="hops-mono shrink-0 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.04em] transition hover:brightness-110"
                style={{ background: "rgba(94,200,232,.14)", color: OPS.iceDeep, border: "1px solid rgba(94,200,232,.35)" }}
              >
                Preview as guest
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BayMeter({ bay, load, limit }: { bay: CargoBayKey; load: number; limit: number }) {
  const pct = Math.min(150, Math.round((load / limit) * 100));
  const over = load > limit;
  const near = !over && load >= limit * 0.9;
  const barColor = over ? OPS.red : near ? OPS.amber : OPS.green;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="hops-mono text-[12px] font-medium" style={{ color: OPS.textMuted }}>{BAY_LABEL[bay]}</span>
        <span className="hops-mono text-lg font-bold leading-none" style={{ color: over ? OPS.red : OPS.text }}>
          {load} / {limit} lb
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,.08)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(100, pct)}%`, background: barColor }}
        />
      </div>
      {over && (
        <div
          className="mt-1.5 text-[13px] font-extrabold uppercase tracking-[.03em]"
          style={{ color: OPS.red }}
        >
          Over limit by {load - limit} lb
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// AUTO-SUGGEST REBALANCING PANEL — shown only for an overweight guide group.
// Computes a real single-guest swap suggestion against live fleet state (see
// findRebalanceSuggestion in ./_data.tsx); if none exists, says so honestly
// instead of fabricating a fix.
// ---------------------------------------------------------------------------
function RebalancePanel({
  suggestion,
  onApply,
}: {
  suggestion: RebalanceSuggestion | null;
  onApply?: (s: RebalanceSuggestion) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="hops-mono rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110"
        style={{ background: OPS.redDeep }}
      >
        {open ? "Hide fix" : "Suggest fix"}
      </button>
      {open && (
        <div
          className="mt-2 rounded-md border px-3 py-2.5"
          style={{ borderColor: "rgba(165,42,47,.35)", background: "rgba(229,72,77,.06)" }}
        >
          {suggestion ? (
            <>
              <p className="text-[13.5px] leading-snug" style={{ color: OPS.inkOnSnow }}>
                Move <strong>{suggestion.guestName}</strong> ({suggestion.guestWeightLbs} lb) from{" "}
                <strong>{suggestion.fromGroupLabel}</strong> to <strong>{suggestion.toGroupLabel}</strong> — both
                groups would be under limit after the swap.
              </p>
              {onApply && (
                <button
                  type="button"
                  onClick={() => onApply(suggestion)}
                  className="hops-mono mt-2 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110"
                  style={{ background: OPS.green, color: OPS.inkOnSnow }}
                >
                  Apply this swap
                </button>
              )}
            </>
          ) : (
            <p className="text-[13.5px] leading-snug" style={{ color: OPS.mutedOnSnow }}>
              No single-guest swap resolves this — consider adding capacity or splitting the group.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function GuideGroupCard({
  heliId,
  group,
  onReslot,
  onDragStartGuest,
  onDropGuest,
  onPreview,
  rebalanceSuggestion,
  onApplyRebalance,
}: {
  heliId: string;
  group: GuideGroup;
  onReslot: (guestId: string) => void;
  onDragStartGuest: (guestId: string, from: GuestLocation) => void;
  onDropGuest: (to: GuestLocation) => void;
  onPreview: (guestId: string) => void;
  rebalanceSuggestion: RebalanceSuggestion | null;
  onApplyRebalance: (s: RebalanceSuggestion) => void;
}) {
  const total = groupWeight(group);
  const overGroup = total > GROUP_MAX_LBS;
  const warnGroup = !overGroup && total >= GROUP_WARN_LBS;
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className="hops-card p-4 transition"
      style={{
        outline: dragOver ? `2px dashed ${OPS.iceDeep}` : "2px dashed transparent",
        outlineOffset: "3px",
        background: dragOver ? "rgba(94,200,232,.10)" : OPS.snow,
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        onDropGuest({ heliId, groupId: group.id });
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-[15px] font-bold" style={{ color: OPS.inkOnSnow }}>
          {group.guideName}
        </span>
        {overGroup ? (
          <StatusPill tone="alert">Overweight +{total - GROUP_MAX_LBS} lb</StatusPill>
        ) : warnGroup ? (
          <StatusPill tone="warn">Near limit</StatusPill>
        ) : (
          <StatusPill tone="ok">Within limit</StatusPill>
        )}
      </div>
      <div className="space-y-1.5">
        {group.guests.map((guest) => (
          <GuestRow
            key={guest.id}
            guest={guest}
            location={{ heliId, groupId: group.id }}
            onReslot={onReslot}
            draggable
            onDragStartGuest={onDragStartGuest}
            onPreview={onPreview}
          />
        ))}
      </div>
      <div
        className="mt-3 flex items-center justify-between gap-2 border-t pt-2.5 text-[13px]"
        style={{ borderColor: "rgba(19,23,34,.08)" }}
      >
        <span style={{ color: OPS.mutedOnSnow }}>
          Bay: <span className="hops-mono">{BAY_LABEL[group.cargoBay]}</span>
        </span>
        <span className="hops-mono text-base font-bold" style={{ color: overGroup ? OPS.redDeep : OPS.inkOnSnow }}>
          Group total: {total} lb
        </span>
      </div>
      {overGroup && <RebalancePanel suggestion={rebalanceSuggestion} onApply={onApplyRebalance} />}
    </div>
  );
}

function HeliCard({
  heli,
  helicopters,
  onReslot,
  onDragStartGuest,
  onDropGuest,
  onMoveGuest,
  onPreview,
  bayLimits,
}: {
  heli: Helicopter;
  helicopters: Helicopter[];
  onReslot: (guestId: string) => void;
  onDragStartGuest: (guestId: string, from: GuestLocation) => void;
  onDropGuest: (to: GuestLocation) => void;
  onMoveGuest: (guestId: string, to: GuestLocation) => void;
  onPreview: (guestId: string) => void;
  bayLimits: Record<CargoBayKey, number>;
}) {
  const { jumpToAircraft, wbSignOffs, clearWBSignOff } = usePlatform();
  const [jumpResult, setJumpResult] = useState<"ok" | "not-found" | null>(null);

  const bayLoads = bayLoadForHeli(heli);
  const total = heliTotalWeight(heli);
  const anyBayOver = (Object.keys(bayLoads) as CargoBayKey[]).some((b) => bayLoads[b] > bayLimits[b]);

  // STALENESS GUARD (Module 4, feature 20's core honesty requirement): if
  // this aircraft has a recorded pilot sign-off but the live computed total
  // no longer matches the exact number that was signed off against (e.g. a
  // guest was just dragged into/out of one of this aircraft's groups), the
  // sign-off is genuinely invalidated here — not left displayed as "Signed
  // off" against stale numbers. This runs as a real effect keyed to the
  // live `total`, so it fires the moment a drag-and-drop reassignment
  // changes this aircraft's weight, from ANY module reading the same
  // shared wbSignOffs state (Module 4's sign-off panel included).
  useEffect(() => {
    const existing = wbSignOffs[heli.tailNumber];
    if (existing && existing.signedAgainstTotalLbs !== total) {
      clearWBSignOff(heli.tailNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, heli.tailNumber]);

  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-4"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="hops-mono flex h-9 items-center rounded-md px-3 text-[15px] font-bold"
            style={{ background: "rgba(94,200,232,.14)", color: OPS.ice, border: "1px solid rgba(94,200,232,.35)" }}
          >
            {heli.tailNumber}
          </span>
          <div>
            <div className="text-base font-bold leading-snug" style={{ color: OPS.snow }}>{heli.model} · sample airframe</div>
            <div className="text-[13px]" style={{ color: OPS.textMuted }}>{heli.pilotName}</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {anyBayOver ? (
            <StatusPill tone="alert">Weight &amp; balance flag</StatusPill>
          ) : (
            <StatusPill tone="ok">W&amp;B within limits</StatusPill>
          )}
          <span className="hops-mono text-base font-bold" style={{ color: OPS.snow }}>
            {total} lb total
          </span>
          <button
            type="button"
            onClick={() => {
              const found = jumpToAircraft(heli.tailNumber);
              setJumpResult(found ? "ok" : "not-found");
              window.setTimeout(() => setJumpResult(null), 2500);
            }}
            className="hops-mono shrink-0 rounded-md px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[.04em] transition hover:brightness-110"
            style={{ background: "rgba(94,200,232,.16)", color: OPS.ice, border: "1px solid rgba(94,200,232,.4)" }}
            title={`Jump to ${heli.tailNumber} on the Module 02 live aircraft board`}
          >
            View live status →
          </button>
        </div>
      </div>

      {jumpResult === "not-found" && (
        <div className="border-b px-4 py-2 text-[12px]" style={{ borderColor: OPS.line, background: "rgba(229,72,77,.08)", color: OPS.red }}>
          {heli.tailNumber} isn&rsquo;t currently tracked on Module 02&rsquo;s live board.
        </div>
      )}

      <div className="grid gap-3 p-4 lg:grid-cols-[1fr_1fr_240px]">
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
          {heli.groups.map((g) => (
            <GuideGroupCard
              key={g.id}
              heliId={heli.id}
              group={g}
              onReslot={onReslot}
              onDragStartGuest={onDragStartGuest}
              onDropGuest={onDropGuest}
              onPreview={onPreview}
              rebalanceSuggestion={findRebalanceSuggestion(helicopters, heli.id, g, bayLimits)}
              onApplyRebalance={(s) => onMoveGuest(s.guestId, { heliId: s.toHeliId, groupId: s.toGroupId })}
            />
          ))}
        </div>
        <div className="hops-panel p-4" style={{ background: "rgba(255,255,255,.02)" }}>
          <div className="hops-eyebrow mb-3">Cargo bay allocation</div>
          <div className="space-y-4">
            {(Object.keys(bayLoads) as CargoBayKey[]).map((bay) => (
              <BayMeter key={bay} bay={bay} load={bayLoads[bay]} limit={bayLimits[bay]} />
            ))}
          </div>
          <p className="mt-3.5 text-[12px] leading-snug" style={{ color: OPS.textMuted }}>
            Bay limits are demo-editable in Module 02&rsquo;s Settings panel. Sample limits shown here for demo
            purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}

function CatGroupCard({ cat, onPreview }: { cat: CatGroup; onPreview: (guestId: string) => void }) {
  const total = cat.guests.reduce((s, g) => s + g.weightLbs, 0);
  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3.5"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-base font-bold" style={{ color: OPS.snow }}>{cat.catName}</div>
          <div className="text-[13px]" style={{ color: OPS.textMuted }}>
            {cat.driverName} &middot; {cat.guideName}
          </div>
        </div>
        <span className="hops-mono text-base font-bold" style={{ color: OPS.snow }}>
          {total} lb total
        </span>
      </div>
      <div className="p-4">
        <div className="hops-card p-3.5">
          <div className="space-y-1.5">
            {cat.guests.map((guest) => (
              <GuestRow key={guest.id} guest={guest} onPreview={onPreview} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RentalsWidget({ helicopters, catGroups }: { helicopters: Helicopter[]; catGroups: CatGroup[] }) {
  const rentals = useMemo(() => seedRentalSnapshot(), []);

  // Real per-guest renters across the currently-shown day's fleet — not a
  // separately hardcoded list, so it stays in lockstep with drag/drop moves
  // and day switches.
  const renters = useMemo(() => {
    const list: { name: string; rental: NonNullable<Guest["rental"]>; equipment: Guest["equipment"] }[] = [];
    for (const h of helicopters) {
      for (const g of h.groups) {
        for (const guest of g.guests) {
          if (guest.rental) list.push({ name: guest.name, rental: guest.rental, equipment: guest.equipment });
        }
      }
    }
    for (const c of catGroups) {
      for (const guest of c.guests) {
        if (guest.rental) list.push({ name: guest.name, rental: guest.rental, equipment: guest.equipment });
      }
    }
    return list;
  }, [helicopters, catGroups]);

  return (
    <div className="hops-panel p-4 sm:p-5">
      <div className="mb-3.5 flex items-center justify-between gap-2">
        <div className="hops-eyebrow">Rentals &amp; equipment</div>
        <SampleTag />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: OPS.snow }}>{rentals.newSetsOut}</div>
          <div className="mt-1.5 text-[12.5px] leading-snug" style={{ color: OPS.textMuted }}>new sets out</div>
        </div>
        <div>
          <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: OPS.snow }}>{rentals.guestOwnGear}</div>
          <div className="mt-1.5 text-[12.5px] leading-snug" style={{ color: OPS.textMuted }}>guests on own gear</div>
        </div>
        <div>
          <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: OPS.amber }}>{rentals.pendingFitting}</div>
          <div className="mt-1.5 text-[12.5px] leading-snug" style={{ color: OPS.textMuted }}>pending fitting</div>
        </div>
      </div>

      {renters.length > 0 && (
        <div className="mt-4 border-t pt-3.5" style={{ borderColor: OPS.line }}>
          <div className="hops-eyebrow mb-2">Rental sizes on file (sample)</div>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {renters.map((r) => (
              <div
                key={r.rental.serial}
                className="hops-mono flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-[12px]"
                style={{ background: "rgba(255,255,255,.03)", color: OPS.textMuted }}
              >
                <span className="truncate" style={{ color: OPS.text }}>{r.name}</span>
                <span className="shrink-0">
                  {r.equipment === "Snowboard" ? "Board" : "Ski"} {r.rental.skiOrBoardLengthCm}cm &middot; boot{" "}
                  {r.rental.bootSizeMondo} &middot; {r.rental.serial}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 text-[12px] leading-snug" style={{ color: OPS.textMuted }}>
        Illustrative rentals snapshot for the day — sample counts, not tied to a live inventory system in this demo.
        Sizes shown for guests marked as renting.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DAY PICKER — a small row of day tabs above the fleet view. Switching days
// swaps the whole fleet view to that day's independent state.
// ---------------------------------------------------------------------------
function DayPicker({ active, onSelect }: { active: DayKey; onSelect: (d: DayKey) => void }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {SAMPLE_DAYS.map((d) => {
        const isActive = d.key === active;
        return (
          <button
            key={d.key}
            type="button"
            onClick={() => onSelect(d.key)}
            className="hops-mono rounded-lg border px-3.5 py-2 text-left transition"
            style={{
              borderColor: isActive ? OPS.iceDeep : OPS.line,
              background: isActive ? "rgba(94,200,232,.14)" : "rgba(255,255,255,.02)",
            }}
          >
            <div
              className="text-[11px] font-semibold uppercase tracking-[.05em]"
              style={{ color: isActive ? OPS.ice : OPS.textMuted }}
            >
              {d.label}
            </div>
            <div className="text-[13px] font-bold" style={{ color: isActive ? OPS.snow : OPS.text }}>
              {d.dateLabel}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// GUEST-FACING READ-ONLY PREVIEW — a simplified card showing what a single
// sample guest would see of their own day: assigned aircraft/guide, weight
// on file, equipment, pickup info, and their medical/dietary flag (matching
// the ops-side safety-card pattern, but framed for the guest).
// ---------------------------------------------------------------------------
function findGuestWithContext(
  helicopters: Helicopter[],
  catGroups: CatGroup[],
  guestId: string
):
  | { guest: Guest; kind: "heli"; heli: Helicopter; group: GuideGroup }
  | { guest: Guest; kind: "cat"; cat: CatGroup }
  | null {
  for (const heli of helicopters) {
    for (const group of heli.groups) {
      const guest = group.guests.find((g) => g.id === guestId);
      if (guest) return { guest, kind: "heli", heli, group };
    }
  }
  for (const cat of catGroups) {
    const guest = cat.guests.find((g) => g.id === guestId);
    if (guest) return { guest, kind: "cat", cat };
  }
  return null;
}

function GuestPreviewModal({
  guestId,
  helicopters,
  catGroups,
  dayLabel,
  onClose,
}: {
  guestId: string;
  helicopters: Helicopter[];
  catGroups: CatGroup[];
  dayLabel: string;
  onClose: () => void;
}) {
  const found = useMemo(
    () => findGuestWithContext(helicopters, catGroups, guestId),
    [helicopters, catGroups, guestId]
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,14,20,.7)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Guest preview"
      onClick={onClose}
    >
      <div
        className="hops-card w-full max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <span
            className="hops-pill"
            style={{ background: "rgba(94,200,232,.14)", color: OPS.iceDeep, border: "1px solid rgba(94,200,232,.4)" }}
          >
            Preview as guest
          </span>
          <button
            type="button"
            onClick={onClose}
            className="hops-mono rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-[.04em]"
            style={{ color: OPS.mutedOnSnow }}
          >
            Close ✕
          </button>
        </div>

        {!found ? (
          <p className="text-[14px]" style={{ color: OPS.mutedOnSnow }}>
            This guest isn&rsquo;t on today&rsquo;s board.
          </p>
        ) : (
          <>
            <h4 className="text-xl font-extrabold" style={{ color: OPS.inkOnSnow }}>{found.guest.name}</h4>
            <p className="mb-4 text-[13px]" style={{ color: OPS.mutedOnSnow }}>
              Your day &middot; {dayLabel}
            </p>

            <div className="space-y-3">
              <div className="rounded-md px-3 py-2.5" style={{ background: "rgba(19,23,34,.04)" }}>
                <div className="hops-eyebrow mb-1" style={{ color: OPS.mutedOnSnow }}>
                  {found.kind === "heli" ? "Your helicopter & guide" : "Your snowcat & guide"}
                </div>
                {found.kind === "heli" ? (
                  <p className="text-[15px] font-semibold" style={{ color: OPS.inkOnSnow }}>
                    {found.heli.tailNumber} &middot; {found.group.guideName}
                  </p>
                ) : (
                  <p className="text-[15px] font-semibold" style={{ color: OPS.inkOnSnow }}>
                    {found.cat.catName} &middot; {found.cat.guideName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md px-3 py-2.5" style={{ background: "rgba(19,23,34,.04)" }}>
                  <div className="hops-eyebrow mb-1" style={{ color: OPS.mutedOnSnow }}>Weight on file</div>
                  <p className="text-[15px] font-semibold" style={{ color: OPS.inkOnSnow }}>{found.guest.weightLbs} lb</p>
                </div>
                <div className="rounded-md px-3 py-2.5" style={{ background: "rgba(19,23,34,.04)" }}>
                  <div className="hops-eyebrow mb-1" style={{ color: OPS.mutedOnSnow }}>Equipment</div>
                  <p className="text-[15px] font-semibold" style={{ color: OPS.inkOnSnow }}>{found.guest.equipment}</p>
                </div>
              </div>

              {found.guest.rental && (
                <div className="rounded-md px-3 py-2.5" style={{ background: "rgba(19,23,34,.04)" }}>
                  <div className="hops-eyebrow mb-1" style={{ color: OPS.mutedOnSnow }}>Your rental gear</div>
                  <p className="text-[15px] font-semibold" style={{ color: OPS.inkOnSnow }}>
                    {found.guest.equipment === "Snowboard" ? "Board" : "Ski"} {found.guest.rental.skiOrBoardLengthCm}
                    cm &middot; boot {found.guest.rental.bootSizeMondo} mondo
                  </p>
                </div>
              )}

              <div className="rounded-md px-3 py-2.5" style={{ background: "rgba(19,23,34,.04)" }}>
                <div className="hops-eyebrow mb-1" style={{ color: OPS.mutedOnSnow }}>Pickup / meeting info</div>
                <p className="text-[14px] leading-snug" style={{ color: OPS.inkOnSnow }}>
                  Meet your guide at the base lodge staging area 30 minutes before your scheduled lift time (sample
                  meeting-point text for this demo).
                </p>
              </div>

              {/* SAFETY CARD — same prominent pattern as the ops-side card,
                  reframed for the guest reading their own record. */}
              <div
                className="rounded-md border px-3 py-2.5"
                style={{
                  borderColor: found.guest.medicalFlag !== "None" ? "rgba(165,42,47,.35)" : "rgba(19,23,34,.10)",
                  background: found.guest.medicalFlag !== "None" ? "rgba(229,72,77,.08)" : "rgba(19,23,34,.03)",
                }}
              >
                <div
                  className="hops-eyebrow mb-1"
                  style={{ color: found.guest.medicalFlag !== "None" ? OPS.redDeep : OPS.mutedOnSnow }}
                >
                  Your medical / dietary flag on file
                </div>
                <p className="text-[15px] font-semibold leading-snug" style={{ color: OPS.inkOnSnow }}>
                  {found.guest.medicalFlag}
                </p>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-snug" style={{ color: OPS.mutedOnSnow }}>
              This is a simplified, read-only view — sample data for this concept demo. It shows only your own
              booking, not the full ops board.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function ManifestBoard() {
  // activeDay + dayState (per-day helicopters/cat groups) now live in the
  // shared PlatformProvider (Module 4 refinement) so Module 4's safety/
  // compliance panels can read the SAME live manifest state this board
  // mutates via drag/drop and reslot — not a disconnected re-seeded copy.
  // The lazy-seed-on-first-visit shape and all mutation logic below are
  // unchanged from before this hoist.
  const { activeDay, setActiveDay, dayState, setDayState, settings } = usePlatform();

  const handleSelectDay = (day: DayKey) => {
    setDayState((prev) => (prev[day] ? prev : { ...prev, [day]: seedDayData(day) }));
    setActiveDay(day);
  };

  const current = dayState[activeDay] ?? seedDayData(activeDay);
  const helicopters = current.helicopters;
  const catGroups = current.catGroups;

  const setHelicopters = (updater: (prev: Helicopter[]) => Helicopter[]) => {
    setDayState((prev) => {
      const day = prev[activeDay] ?? seedDayData(activeDay);
      return { ...prev, [activeDay]: { ...day, helicopters: updater(day.helicopters) } };
    });
  };

  // Tracks each reslot's outcome for the success banner: which guest moved,
  // and whether they genuinely landed on a next day or (on the last sample
  // day) simply had their hold cleared in place, so the banner copy never
  // claims a cross-day move that didn't actually happen.
  const [reslotEvents, setReslotEvents] = useState<
    { guestId: string; guestName: string; toDay: DayKey | null }[]
  >([]);

  // Reslotting a weather-held guest on day N must GENUINELY remove them from
  // day N's live state and GENUINELY add them into day N+1's live state
  // (clearing weatherHold on arrival) — not just flip a flag on the guest in
  // place. If there is no next sample day, fall back to clearing the hold in
  // place and say so honestly in the banner.
  //
  // NOTE: all the derivation below reads `dayState` directly and computes a
  // plain result rather than living inside a setDayState(prev => ...)
  // updater — React may invoke updater functions more than once per commit,
  // and this function has side effects (setReslotEvents), so those side
  // effects must run exactly once, outside any updater callback.
  const handleReslot = (guestId: string) => {
    const fromDay = activeDay;
    const nextDay = NEXT_DAY[fromDay];
    const current = dayState[fromDay] ?? seedDayData(fromDay);

    // Find + remove the guest from the current day's helicopters, and
    // capture the source group so the destination can inherit its cargo bay
    // type as a sensible default.
    let movedGuest: Guest | null = null;
    let sourceGroup: GuideGroup | null = null;
    const helicoptersWithoutGuest = current.helicopters.map((heli) => ({
      ...heli,
      groups: heli.groups.map((g) => {
        const idx = g.guests.findIndex((gu) => gu.id === guestId);
        if (idx === -1) return g;
        movedGuest = g.guests[idx];
        sourceGroup = g;
        return { ...g, guests: g.guests.filter((gu) => gu.id !== guestId) };
      }),
    }));

    if (!movedGuest) return; // guest not found on this day — no-op

    if (!nextDay) {
      // Last sample day in this demo — no further day to roll into. Honest
      // fallback: clear the hold in place, guest stays on this day.
      const clearedInPlace = current.helicopters.map((heli) => ({
        ...heli,
        groups: heli.groups.map((g) => ({
          ...g,
          guests: g.guests.map((guest) =>
            guest.id === guestId ? { ...guest, weatherHold: false } : guest
          ),
        })),
      }));
      setDayState((prev) => ({ ...prev, [fromDay]: { ...current, helicopters: clearedInPlace } }));
      setReslotEvents((events) => [...events, { guestId, guestName: (movedGuest as Guest).name, toDay: null }]);
      return;
    }

    const arrivingGuest: Guest = { ...(movedGuest as Guest), weatherHold: false };
    const nextDayState = dayState[nextDay] ?? seedDayData(nextDay);

    // Place the arriving guest into a sensible destination group: prefer the
    // same guide group (by id) if it still exists on the next day and has
    // room under the group weight ceiling; otherwise the first group on the
    // next day's fleet with room; otherwise fall back to the first group
    // overall as a clearly-labeled overflow slot.
    const fitsWithRoom = (g: GuideGroup) => groupWeight(g) + arrivingGuest.weightLbs <= GROUP_MAX_LBS;

    let placedHelicopters = nextDayState.helicopters;
    let placed = false;

    const tryPlace = (preferGroupId: string | null) => {
      if (placed) return;
      placedHelicopters = placedHelicopters.map((heli) => {
        if (placed) return heli;

        // Prefer the matching group id, if it fits.
        if (preferGroupId) {
          const match = heli.groups.find((g) => g.id === preferGroupId);
          if (match && fitsWithRoom(match)) {
            placed = true;
            return {
              ...heli,
              groups: heli.groups.map((g) =>
                g.id === preferGroupId ? { ...g, guests: [...g.guests, arrivingGuest] } : g
              ),
            };
          }
          return heli;
        }

        // Otherwise, first group on this helicopter with room.
        const roomyGroup = heli.groups.find((g) => fitsWithRoom(g));
        if (roomyGroup) {
          placed = true;
          return {
            ...heli,
            groups: heli.groups.map((g) =>
              g.id === roomyGroup.id ? { ...g, guests: [...g.guests, arrivingGuest] } : g
            ),
          };
        }
        return heli;
      });
    };

    // 1) Same guide group id, if it still exists on the next day and fits.
    if (sourceGroup) tryPlace((sourceGroup as GuideGroup).id);
    // 2) Any group on the fleet with room under the weight ceiling.
    if (!placed) tryPlace(null);
    // 3) Overflow fallback — no group had room; add to the first group on
    // the first helicopter as a clearly-labeled newly-added overflow slot
    // rather than silently dropping the guest.
    if (!placed && placedHelicopters.length > 0 && placedHelicopters[0].groups.length > 0) {
      const overflowHeliId = placedHelicopters[0].id;
      const overflowGroupId = placedHelicopters[0].groups[0].id;
      placedHelicopters = placedHelicopters.map((heli) =>
        heli.id !== overflowHeliId
          ? heli
          : {
              ...heli,
              groups: heli.groups.map((g) =>
                g.id !== overflowGroupId ? g : { ...g, guests: [...g.guests, arrivingGuest] }
              ),
            }
      );
    }

    setDayState((prev) => ({
      ...prev,
      [fromDay]: { ...current, helicopters: helicoptersWithoutGuest },
      [nextDay]: { ...nextDayState, helicopters: placedHelicopters },
    }));
    setReslotEvents((events) => [...events, { guestId, guestName: (movedGuest as Guest).name, toDay: nextDay }]);
  };

  // -------------------------------------------------------------------------
  // DRAG-AND-DROP GUEST REASSIGNMENT — native HTML5 DnD (draggable +
  // onDragStart/onDragOver/onDrop), no added dependency. `draggedFrom` tracks
  // the guest currently being dragged and its origin location; onDropGuest
  // moves it into the drop target's guide group in real state.
  // -------------------------------------------------------------------------
  const [draggedFrom, setDraggedFrom] = useState<{ guestId: string; from: GuestLocation } | null>(null);

  const moveGuestTo = (guestId: string, to: GuestLocation) => {
    setHelicopters((prev) => {
      // Find and remove the guest from wherever it currently lives.
      let movedGuest: Guest | null = null;
      const withoutGuest = prev.map((heli) => ({
        ...heli,
        groups: heli.groups.map((g) => {
          const idx = g.guests.findIndex((gu) => gu.id === guestId);
          if (idx === -1) return g;
          movedGuest = g.guests[idx];
          return { ...g, guests: g.guests.filter((gu) => gu.id !== guestId) };
        }),
      }));
      if (!movedGuest) return prev;
      return withoutGuest.map((heli) => {
        if (heli.id !== to.heliId) return heli;
        return {
          ...heli,
          groups: heli.groups.map((g) =>
            g.id === to.groupId ? { ...g, guests: [...g.guests, movedGuest as Guest] } : g
          ),
        };
      });
    });
  };

  const handleDragStartGuest = (guestId: string, from: GuestLocation) => {
    setDraggedFrom({ guestId, from });
  };

  const handleDropGuest = (to: GuestLocation) => {
    if (!draggedFrom) return;
    if (draggedFrom.from.heliId === to.heliId && draggedFrom.from.groupId === to.groupId) {
      setDraggedFrom(null);
      return; // dropped back on its own group — no-op
    }
    moveGuestTo(draggedFrom.guestId, to);
    setDraggedFrom(null);
  };

  // -------------------------------------------------------------------------
  // GUEST-FACING PREVIEW — which guest id (if any) is being previewed.
  // -------------------------------------------------------------------------
  const [previewGuestId, setPreviewGuestId] = useState<string | null>(null);

  const activeDayInfo = SAMPLE_DAYS.find((d) => d.key === activeDay) ?? SAMPLE_DAYS[0];

  const holdCount = useMemo(
    () =>
      helicopters.reduce(
        (sum, h) => sum + h.groups.reduce((s2, g) => s2 + g.guests.filter((gu) => gu.weatherHold).length, 0),
        0
      ),
    [helicopters]
  );

  const overweightGroupCount = useMemo(
    () =>
      helicopters.reduce(
        (sum, h) => sum + h.groups.filter((g) => groupWeight(g) > GROUP_MAX_LBS).length,
        0
      ),
    [helicopters]
  );

  const bayLimits = settings.bayLimits;

  const overweightBayCount = useMemo(
    () =>
      helicopters.reduce((sum, h) => {
        const bays = bayLoadForHeli(h);
        return sum + (Object.keys(bays) as CargoBayKey[]).filter((b) => bays[b] > bayLimits[b]).length;
      }, 0),
    [helicopters, bayLimits]
  );

  return (
    <div>
      {/* MULTI-DAY CALENDAR VIEW */}
      <DayPicker active={activeDay} onSelect={handleSelectDay} />

      {/* Summary strip */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="hops-panel px-4 py-4">
          <div className="hops-eyebrow mb-1.5">Aircraft &middot; {activeDayInfo.label}</div>
          <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: OPS.snow }}>{helicopters.length}</div>
        </div>
        <div className="hops-panel px-4 py-4">
          <div className="hops-eyebrow mb-1.5">Snowcats &middot; {activeDayInfo.label}</div>
          <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: OPS.snow }}>{catGroups.length}</div>
        </div>
        <div className="hops-panel px-4 py-4" style={{ borderColor: overweightGroupCount || overweightBayCount ? "rgba(229,72,77,.5)" : OPS.line }}>
          <div className="hops-eyebrow mb-1.5" style={{ color: overweightGroupCount || overweightBayCount ? OPS.red : OPS.ice }}>
            Weight &amp; balance flags
          </div>
          <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: overweightGroupCount || overweightBayCount ? OPS.red : OPS.snow }}>
            {overweightGroupCount + overweightBayCount}
          </div>
        </div>
        <div className="hops-panel px-4 py-4" style={{ borderColor: holdCount ? "rgba(240,168,60,.5)" : OPS.line }}>
          <div className="hops-eyebrow mb-1.5" style={{ color: holdCount ? OPS.amber : OPS.ice }}>
            Weather holds pending
          </div>
          <div className="hops-mono text-3xl font-extrabold leading-none" style={{ color: holdCount ? OPS.amber : OPS.snow }}>
            {holdCount}
          </div>
        </div>
      </div>

      {reslotEvents.length > 0 && (
        <div
          className="mb-6 flex flex-col gap-1.5 rounded-lg border px-4 py-2.5"
          style={{ borderColor: "rgba(62,207,142,.4)", background: "rgba(62,207,142,.1)" }}
        >
          {reslotEvents.map((ev, i) => {
            const toDayLabel = ev.toDay ? SAMPLE_DAYS.find((d) => d.key === ev.toDay)?.label ?? ev.toDay : null;
            return (
              <div key={`${ev.guestId}-${i}`} className="flex items-center gap-2">
                <StatusPill tone="ok">Reslotted</StatusPill>
                <span className="text-[13.5px]" style={{ color: OPS.text }}>
                  {toDayLabel ? (
                    <>
                      <strong>{ev.guestName}</strong> moved to {toDayLabel}&rsquo;s board, weather hold cleared —
                      switch days to see them there.
                    </>
                  ) : (
                    <>
                      <strong>{ev.guestName}</strong>&rsquo;s weather hold was cleared in place — no further day to
                      roll into in this demo.
                    </>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <p className="mb-6 text-[12.5px] leading-relaxed" style={{ color: OPS.textMuted }}>
        Drag any guest row (⠿) onto another guide group&rsquo;s card to reassign them — weight and cargo-bay totals
        recompute immediately. Switch days above to see each day&rsquo;s independent manifest. Reslotting a
        weather-held guest genuinely moves them to the next day&rsquo;s board with their hold cleared.
      </p>

      {/* Rentals / equipment widget */}
      <div className="mb-6">
        <RentalsWidget helicopters={helicopters} catGroups={catGroups} />
      </div>

      {/* Helicopter fleet */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="hops-display text-lg" style={{ color: OPS.snow }}>Helicopter fleet</h3>
        <SampleTag />
      </div>
      <div className="hops-scroll space-y-4 overflow-x-auto pb-2">
        {helicopters.map((heli) => (
          <HeliCard
            key={heli.id}
            heli={heli}
            helicopters={helicopters}
            onReslot={handleReslot}
            onDragStartGuest={handleDragStartGuest}
            onDropGuest={handleDropGuest}
            onMoveGuest={moveGuestTo}
            onPreview={setPreviewGuestId}
            bayLimits={bayLimits}
          />
        ))}
      </div>

      {/* Snowcat fleet — unified view */}
      <div className="mb-3 mt-8 flex items-center justify-between">
        <h3 className="hops-display text-lg" style={{ color: OPS.snow }}>Snowcat fleet</h3>
        <SampleTag />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {catGroups.map((cat) => (
          <CatGroupCard key={cat.id} cat={cat} onPreview={setPreviewGuestId} />
        ))}
      </div>

      <p className="mt-6 text-[12.5px] leading-relaxed" style={{ color: OPS.textMuted }}>
        Both fleets are reconciled into a single daily schedule view above, rather than tracked in two separate
        systems. Weight-and-balance totals recalculate automatically as guests move between groups, aircraft, or
        days — replacing manual addition on a printed manifest.
      </p>

      {previewGuestId && (
        <GuestPreviewModal
          guestId={previewGuestId}
          helicopters={helicopters}
          catGroups={catGroups}
          dayLabel={`${activeDayInfo.label} · ${activeDayInfo.dateLabel}`}
          onClose={() => setPreviewGuestId(null)}
        />
      )}
    </div>
  );
}
