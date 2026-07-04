"use client";

// OpsOverview — unified "Today's Ops Overview" landing strip, rendered above
// both module tabs on page.tsx.
//
// FICTIONAL SAMPLE DATA ONLY. This strip computes its numbers from the exact
// same seed data + math helpers in ./_data.tsx that Module 1 (ManifestBoard)
// and Module 2 (FlightFollowing) use, so it stays consistent with both
// modules instead of being a separately hardcoded set of numbers. It does
// not share live React state with the two modules (each manages its own
// local state, e.g. reslotting), but all three read from one source of
// truth for the initial/seeded picture of the day.

import { useMemo } from "react";
import { OPS, SampleTag } from "./_shared";
import {
  FLEET_ROSTER,
  seedCatGroups,
  seedHelicopters,
  seedRentalSnapshot,
  totalGuestCount,
  weatherHoldCount,
  weightBalanceFlagCount,
} from "./_data";

function OverviewCard({
  eyebrow,
  value,
  tone = "info",
  href,
  footnote,
}: {
  eyebrow: string;
  value: string | number;
  tone?: "info" | "warn" | "alert" | "ok";
  href?: string;
  footnote?: string;
}) {
  const toneColor =
    tone === "alert" ? OPS.red : tone === "warn" ? OPS.amber : tone === "ok" ? OPS.green : OPS.ice;
  const borderColor =
    tone === "alert"
      ? "rgba(229,72,77,.5)"
      : tone === "warn"
      ? "rgba(240,168,60,.5)"
      : tone === "ok"
      ? "rgba(62,207,142,.4)"
      : OPS.line;

  // Short numeric-style values (e.g. "3") get the biggest hero treatment;
  // longer compound strings (e.g. "2 new / 1 pending") step down one size
  // so they don't wrap awkwardly inside the stat tile.
  const isShortValue = String(value).length <= 3;

  const content = (
    <div className="hops-panel h-full px-4 py-4 transition" style={{ borderColor }}>
      <div className="hops-eyebrow mb-1.5" style={{ color: toneColor }}>
        {eyebrow}
      </div>
      <div
        className={`hops-mono font-extrabold leading-tight tracking-tight ${isShortValue ? "text-3xl" : "text-xl"}`}
        style={{ color: tone === "info" ? OPS.snow : toneColor }}
      >
        {value}
      </div>
      {footnote && (
        <div className="mt-1.5 text-[12px] leading-snug" style={{ color: OPS.textMuted }}>
          {footnote}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full hover:brightness-110">
        {content}
      </a>
    );
  }
  return content;
}

export default function OpsOverview() {
  const helicopters = useMemo(() => seedHelicopters(), []);
  const catGroups = useMemo(() => seedCatGroups(), []);
  const rentals = useMemo(() => seedRentalSnapshot(), []);

  const guests = totalGuestCount(helicopters, catGroups);
  const flags = weightBalanceFlagCount(helicopters);
  const holds = weatherHoldCount(helicopters);
  const aircraftFlying = FLEET_ROSTER.length;

  return (
    <section className="mb-10">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="hops-eyebrow">Today&rsquo;s ops overview</div>
        <SampleTag />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <OverviewCard eyebrow="Guests today" value={guests} tone="info" footnote="Helicopter + snowcat manifests" />
        <OverviewCard
          eyebrow="Aircraft flying"
          value={aircraftFlying}
          tone="info"
          href="#module-dispatch"
          footnote="See live board in Module 02"
        />
        <OverviewCard
          eyebrow="Weight &amp; balance flags"
          value={flags}
          tone={flags > 0 ? "alert" : "ok"}
          href="#module-scheduling"
          footnote="Overweight group/bay — Module 01"
        />
        <OverviewCard
          eyebrow="Weather holds pending"
          value={holds}
          tone={holds > 0 ? "warn" : "ok"}
          href="#module-scheduling"
          footnote="Needs reslot — Module 01"
        />
        <OverviewCard
          eyebrow="Rentals status"
          value={`${rentals.newSetsOut} new / ${rentals.pendingFitting} pending`}
          tone={rentals.pendingFitting > 0 ? "warn" : "ok"}
          footnote={`${rentals.guestOwnGear} guests on own gear`}
        />
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed" style={{ color: OPS.textMuted }}>
        One reconciled snapshot of the day&rsquo;s manifest, fleet, and gear status — computed from the same sample
        data as the two modules below, not a separately hardcoded set of numbers.
      </p>
    </section>
  );
}
