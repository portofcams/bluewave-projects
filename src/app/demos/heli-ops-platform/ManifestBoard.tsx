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
//   6. A small rentals/equipment snapshot for the day.
//
// Seed fleet/guest data lives in ./_data.tsx, shared with Module 2
// (FlightFollowing.tsx) and the page-level "Today's Ops Overview" strip so
// all three stay in lockstep instead of drifting apart.

import { useMemo, useState } from "react";
import { OPS, SampleTag } from "./_shared";
import {
  BAY_LABEL,
  BAY_LIMITS,
  CargoBayKey,
  CatGroup,
  GROUP_MAX_LBS,
  GROUP_WARN_LBS,
  GuideGroup,
  Guest,
  Helicopter,
  bayLoadForHeli,
  groupWeight,
  heliTotalWeight,
  seedCatGroups,
  seedHelicopters,
  seedRentalSnapshot,
} from "./_data";

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

function GuestRow({
  guest,
  onReslot,
}: {
  guest: Guest;
  onReslot?: (guestId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMedicalNote = guest.medicalFlag && guest.medicalFlag !== "None";

  return (
    <div
      className="rounded-lg border"
      style={{ borderColor: "rgba(19,23,34,.10)", background: expanded ? OPS.snowDim : "transparent" }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left"
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
          <span className="truncate text-[13.5px] font-semibold" style={{ color: OPS.inkOnSnow }}>
            {guest.name}
          </span>
          <span className="hops-mono shrink-0 text-[11.5px]" style={{ color: OPS.mutedOnSnow }}>
            {guest.weightLbs} lb
          </span>
          <span className="hidden shrink-0 text-[11px] sm:inline" style={{ color: OPS.mutedOnSnow }}>
            {guest.equipment}
          </span>
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
            <p className="text-[13px] font-medium leading-snug" style={{ color: OPS.inkOnSnow }}>
              {guest.medicalFlag}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px]" style={{ color: OPS.mutedOnSnow }}>
            <span>Weight: <strong style={{ color: OPS.inkOnSnow }}>{guest.weightLbs} lb</strong></span>
            <span>Equipment: <strong style={{ color: OPS.inkOnSnow }}>{guest.equipment}</strong></span>
          </div>

          {guest.weatherHold && onReslot && (
            <div
              className="flex flex-wrap items-center justify-between gap-2 rounded-md px-3 py-2"
              style={{ background: "rgba(240,168,60,.14)", border: "1px solid rgba(240,168,60,.4)" }}
            >
              <span className="text-[12px] font-medium" style={{ color: OPS.amberDeep }}>
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
        </div>
      )}
    </div>
  );
}

function BayMeter({ bay, load }: { bay: CargoBayKey; load: number }) {
  const limit = BAY_LIMITS[bay];
  const pct = Math.min(150, Math.round((load / limit) * 100));
  const over = load > limit;
  const near = !over && load >= limit * 0.9;
  const barColor = over ? OPS.red : near ? OPS.amber : OPS.green;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="hops-mono" style={{ color: OPS.textMuted }}>{BAY_LABEL[bay]}</span>
        <span className="hops-mono font-semibold" style={{ color: over ? OPS.red : OPS.text }}>
          {load} / {limit} lb
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,.08)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(100, pct)}%`, background: barColor }}
        />
      </div>
      {over && (
        <div className="mt-1 text-[10.5px] font-semibold uppercase tracking-[.04em]" style={{ color: OPS.red }}>
          Over limit by {load - limit} lb
        </div>
      )}
    </div>
  );
}

function GuideGroupCard({
  group,
  onReslot,
}: {
  group: GuideGroup;
  onReslot: (guestId: string) => void;
}) {
  const total = groupWeight(group);
  const overGroup = total > GROUP_MAX_LBS;
  const warnGroup = !overGroup && total >= GROUP_WARN_LBS;

  return (
    <div className="hops-card p-3.5">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span className="text-[13.5px] font-bold" style={{ color: OPS.inkOnSnow }}>
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
          <GuestRow key={guest.id} guest={guest} onReslot={onReslot} />
        ))}
      </div>
      <div
        className="mt-2.5 flex items-center justify-between border-t pt-2 text-[11.5px]"
        style={{ borderColor: "rgba(19,23,34,.08)" }}
      >
        <span style={{ color: OPS.mutedOnSnow }}>
          Bay: <span className="hops-mono">{BAY_LABEL[group.cargoBay]}</span>
        </span>
        <span className="hops-mono font-bold" style={{ color: overGroup ? OPS.redDeep : OPS.inkOnSnow }}>
          Group total: {total} lb
        </span>
      </div>
    </div>
  );
}

function HeliCard({
  heli,
  onReslot,
}: {
  heli: Helicopter;
  onReslot: (guestId: string) => void;
}) {
  const bayLoads = bayLoadForHeli(heli);
  const total = heliTotalWeight(heli);
  const anyBayOver = (Object.keys(bayLoads) as CargoBayKey[]).some((b) => bayLoads[b] > BAY_LIMITS[b]);

  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="hops-mono flex h-8 items-center rounded-md px-2.5 text-[13px] font-bold"
            style={{ background: "rgba(94,200,232,.14)", color: OPS.ice, border: "1px solid rgba(94,200,232,.35)" }}
          >
            {heli.tailNumber}
          </span>
          <div>
            <div className="text-[13.5px] font-bold" style={{ color: OPS.snow }}>{heli.model} · sample airframe</div>
            <div className="text-[11.5px]" style={{ color: OPS.textMuted }}>{heli.pilotName}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {anyBayOver ? (
            <StatusPill tone="alert">Weight &amp; balance flag</StatusPill>
          ) : (
            <StatusPill tone="ok">W&amp;B within limits</StatusPill>
          )}
          <span className="hops-mono text-[12px] font-semibold" style={{ color: OPS.text }}>
            {total} lb total
          </span>
        </div>
      </div>

      <div className="grid gap-3 p-4 lg:grid-cols-[1fr_1fr_220px]">
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
          {heli.groups.map((g) => (
            <GuideGroupCard key={g.id} group={g} onReslot={onReslot} />
          ))}
        </div>
        <div className="hops-panel p-3.5" style={{ background: "rgba(255,255,255,.02)" }}>
          <div className="hops-eyebrow mb-2.5">Cargo bay allocation</div>
          <div className="space-y-3">
            {(Object.keys(bayLoads) as CargoBayKey[]).map((bay) => (
              <BayMeter key={bay} bay={bay} load={bayLoads[bay]} />
            ))}
          </div>
          <p className="mt-3 text-[10.5px] leading-snug" style={{ color: OPS.textMuted }}>
            Bay limits are configurable per airframe. Sample limits shown here for demo purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}

function CatGroupCard({ cat }: { cat: CatGroup }) {
  const total = cat.guests.reduce((s, g) => s + g.weightLbs, 0);
  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ borderColor: OPS.line, background: "rgba(255,255,255,.02)" }}
      >
        <div>
          <div className="text-[13.5px] font-bold" style={{ color: OPS.snow }}>{cat.catName}</div>
          <div className="text-[11.5px]" style={{ color: OPS.textMuted }}>
            {cat.driverName} &middot; {cat.guideName}
          </div>
        </div>
        <span className="hops-mono text-[12px] font-semibold" style={{ color: OPS.text }}>
          {total} lb total
        </span>
      </div>
      <div className="p-4">
        <div className="hops-card p-3.5">
          <div className="space-y-1.5">
            {cat.guests.map((guest) => (
              <GuestRow key={guest.id} guest={guest} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RentalsWidget() {
  const rentals = useMemo(() => seedRentalSnapshot(), []);
  return (
    <div className="hops-panel p-4">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <div className="hops-eyebrow">Rentals &amp; equipment</div>
        <SampleTag />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <div className="hops-mono text-lg font-bold" style={{ color: OPS.snow }}>{rentals.newSetsOut}</div>
          <div className="text-[11px] leading-snug" style={{ color: OPS.textMuted }}>new sets out</div>
        </div>
        <div>
          <div className="hops-mono text-lg font-bold" style={{ color: OPS.snow }}>{rentals.guestOwnGear}</div>
          <div className="text-[11px] leading-snug" style={{ color: OPS.textMuted }}>guests on own gear</div>
        </div>
        <div>
          <div className="hops-mono text-lg font-bold" style={{ color: OPS.amber }}>{rentals.pendingFitting}</div>
          <div className="text-[11px] leading-snug" style={{ color: OPS.textMuted }}>pending fitting</div>
        </div>
      </div>
      <p className="mt-3 text-[10.5px] leading-snug" style={{ color: OPS.textMuted }}>
        Illustrative rentals snapshot for the day — sample counts, not tied to a live inventory system in this demo.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function ManifestBoard() {
  const [helicopters, setHelicopters] = useState<Helicopter[]>(() => seedHelicopters());
  const [catGroups] = useState<CatGroup[]>(() => seedCatGroups());
  const [reslottedIds, setReslottedIds] = useState<string[]>([]);

  const handleReslot = (guestId: string) => {
    setHelicopters((prev) =>
      prev.map((heli) => ({
        ...heli,
        groups: heli.groups.map((g) => ({
          ...g,
          guests: g.guests.map((guest) =>
            guest.id === guestId ? { ...guest, weatherHold: false } : guest
          ),
        })),
      }))
    );
    setReslottedIds((prev) => [...prev, guestId]);
  };

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

  const overweightBayCount = useMemo(
    () =>
      helicopters.reduce((sum, h) => {
        const bays = bayLoadForHeli(h);
        return sum + (Object.keys(bays) as CargoBayKey[]).filter((b) => bays[b] > BAY_LIMITS[b]).length;
      }, 0),
    [helicopters]
  );

  return (
    <div>
      {/* Summary strip */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="hops-panel px-4 py-3">
          <div className="hops-eyebrow mb-1">Aircraft today</div>
          <div className="hops-mono text-xl font-bold" style={{ color: OPS.snow }}>{helicopters.length}</div>
        </div>
        <div className="hops-panel px-4 py-3">
          <div className="hops-eyebrow mb-1">Snowcats today</div>
          <div className="hops-mono text-xl font-bold" style={{ color: OPS.snow }}>{catGroups.length}</div>
        </div>
        <div className="hops-panel px-4 py-3" style={{ borderColor: overweightGroupCount || overweightBayCount ? "rgba(229,72,77,.5)" : OPS.line }}>
          <div className="hops-eyebrow mb-1" style={{ color: overweightGroupCount || overweightBayCount ? OPS.red : OPS.ice }}>
            Weight &amp; balance flags
          </div>
          <div className="hops-mono text-xl font-bold" style={{ color: overweightGroupCount || overweightBayCount ? OPS.red : OPS.snow }}>
            {overweightGroupCount + overweightBayCount}
          </div>
        </div>
        <div className="hops-panel px-4 py-3" style={{ borderColor: holdCount ? "rgba(240,168,60,.5)" : OPS.line }}>
          <div className="hops-eyebrow mb-1" style={{ color: holdCount ? OPS.amber : OPS.ice }}>
            Weather holds pending
          </div>
          <div className="hops-mono text-xl font-bold" style={{ color: holdCount ? OPS.amber : OPS.snow }}>
            {holdCount}
          </div>
        </div>
      </div>

      {reslottedIds.length > 0 && (
        <div
          className="mb-6 flex items-center gap-2 rounded-lg border px-4 py-2.5"
          style={{ borderColor: "rgba(62,207,142,.4)", background: "rgba(62,207,142,.1)" }}
        >
          <StatusPill tone="ok">Reslotted</StatusPill>
          <span className="text-[12.5px]" style={{ color: OPS.text }}>
            {reslottedIds.length} guest{reslottedIds.length === 1 ? "" : "s"} automatically cleared from weather
            hold and moved off today&rsquo;s board — no manual re-typing of the manifest required.
          </span>
        </div>
      )}

      {/* Rentals / equipment widget */}
      <div className="mb-6">
        <RentalsWidget />
      </div>

      {/* Helicopter fleet */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="hops-display text-lg" style={{ color: OPS.snow }}>Helicopter fleet</h3>
        <SampleTag />
      </div>
      <div className="hops-scroll space-y-4 overflow-x-auto pb-2">
        {helicopters.map((heli) => (
          <HeliCard key={heli.id} heli={heli} onReslot={handleReslot} />
        ))}
      </div>

      {/* Snowcat fleet — unified view */}
      <div className="mb-3 mt-8 flex items-center justify-between">
        <h3 className="hops-display text-lg" style={{ color: OPS.snow }}>Snowcat fleet</h3>
        <SampleTag />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {catGroups.map((cat) => (
          <CatGroupCard key={cat.id} cat={cat} />
        ))}
      </div>

      <p className="mt-6 text-[11.5px] leading-relaxed" style={{ color: OPS.textMuted }}>
        Both fleets are reconciled into a single daily schedule view above, rather than tracked in two separate
        systems. Weight-and-balance totals recalculate automatically as guests move between groups, aircraft, or
        days — replacing manual addition on a printed manifest.
      </p>
    </div>
  );
}
