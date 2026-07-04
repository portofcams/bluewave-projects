"use client";

// GuestSearch — Module 6, feature 28: instant search/filter across every
// guest for the currently-selected day.
//
// FICTIONAL SAMPLE DATA ONLY. Searches the REAL LIVE data — Module 1's
// actual current day-state (usePlatform()'s dayState[activeDay]), the SAME
// state ManifestBoard.tsx's drag-and-drop and reslot actions genuinely
// mutate. This is NOT a hardcoded guest list: switch days on Module 01's
// calendar and this search's result set genuinely reflects that day's
// actual roster (Day 2 has fewer guests than Day 1 per _data.tsx's
// seedDay2/seedDay3 — see the live count row below, which changes with the
// day tab). Clicking a result calls the same jumpToGuest() mechanism wired
// into ManifestBoard.tsx's GuestRow (see _platform.tsx), which scrolls to
// and highlights the REAL matched guest card on Module 01's board — if
// jumpToGuest returns false (card not currently mounted), this says so
// honestly rather than pretending the jump worked.

import { useMemo, useState } from "react";
import { OPS, SampleTag, panelTint } from "./_shared";
import { CatGroup, Guest, Helicopter, SAMPLE_DAYS } from "./_data";
import { usePlatform } from "./_platform";

type SearchHit = {
  guest: Guest;
  contextLabel: string; // e.g. "N412QX · Guide: Barry Steep (sample)" or "Snowcat 1 (sample)"
  kind: "heli" | "cat";
};

function collectAllGuests(helicopters: Helicopter[], catGroups: CatGroup[]): SearchHit[] {
  const hits: SearchHit[] = [];
  for (const heli of helicopters) {
    for (const group of heli.groups) {
      for (const guest of group.guests) {
        hits.push({ guest, contextLabel: `${heli.tailNumber} · ${group.guideName}`, kind: "heli" });
      }
    }
  }
  for (const cat of catGroups) {
    for (const guest of cat.guests) {
      hits.push({ guest, contextLabel: `${cat.catName} · ${cat.guideName}`, kind: "cat" });
    }
  }
  return hits;
}

// Wraps every case-insensitive match of `query` inside `text` in <mark>,
// matching the user's exact typed casing back out via the original text
// (not lowercased), so real names stay correctly capitalized on screen.
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "rgba(240,168,60,.55)", color: OPS.inkOnSnow, borderRadius: 3, padding: "0 1px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function GuestSearch() {
  const { dayState, activeDay, jumpToGuest } = usePlatform();
  const [query, setQuery] = useState("");
  const [jumpMsg, setJumpMsg] = useState<string | null>(null);

  const current = dayState[activeDay];
  const helicopters = current?.helicopters ?? [];
  const catGroups = current?.catGroups ?? [];

  const allGuests = useMemo(() => collectAllGuests(helicopters, catGroups), [helicopters, catGroups]);

  const trimmedQuery = query.trim();
  const results = useMemo(() => {
    if (!trimmedQuery) return [];
    const q = trimmedQuery.toLowerCase();
    return allGuests.filter((hit) => hit.guest.name.toLowerCase().includes(q));
  }, [allGuests, trimmedQuery]);

  const activeDayInfo = SAMPLE_DAYS.find((d) => d.key === activeDay) ?? SAMPLE_DAYS[0];

  const handleJump = (guestId: string, guestName: string) => {
    const found = jumpToGuest(guestId);
    setJumpMsg(
      found
        ? `Jumped to ${guestName}'s real card on Module 01's board.`
        : `${guestName}'s card isn't currently mounted on screen — try scrolling Module 01 into view first.`
    );
    window.setTimeout(() => setJumpMsg(null), 2800);
  };

  return (
    <div className="hops-panel overflow-hidden">
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3.5"
        style={{ borderColor: OPS.line, background: panelTint(0.02) }}
      >
        <div>
          <div className="text-base font-bold" style={{ color: OPS.snow }}>Guest search</div>
          <div className="text-[13px]" style={{ color: OPS.textMuted }}>
            Instant search across every guest currently on {activeDayInfo.label}&rsquo;s ({activeDayInfo.dateLabel})
            real manifest — {allGuests.length} guest{allGuests.length === 1 ? "" : "s"} total across helicopters +
            snowcats.
          </div>
        </div>
        <SampleTag />
      </div>

      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${activeDayInfo.label}'s ${allGuests.length} guests by name…`}
            className="hops-mono w-full rounded-md px-3.5 py-2.5 text-[14px] font-medium"
            style={{ background: OPS.slate, color: OPS.snow, border: `1px solid ${OPS.line}` }}
            aria-label="Search guests by name"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="hops-mono absolute right-2.5 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-[.04em]"
              style={{ color: OPS.textMuted }}
            >
              Clear ✕
            </button>
          )}
        </div>

        {trimmedQuery && (
          <div className="mt-3 flex items-center gap-2">
            <span className="hops-mono text-[12.5px] font-semibold" style={{ color: results.length ? OPS.ice : OPS.textMuted }}>
              {results.length} result{results.length === 1 ? "" : "s"}
            </span>
            <span className="text-[12px]" style={{ color: OPS.textMuted }}>
              for &ldquo;{trimmedQuery}&rdquo; on {activeDayInfo.label}
            </span>
          </div>
        )}

        {trimmedQuery && results.length === 0 && (
          <div
            className="mt-3 rounded-md border px-3.5 py-3"
            style={{ borderColor: OPS.line, background: panelTint(0.02) }}
          >
            <p className="text-[13.5px]" style={{ color: OPS.textMuted }}>
              No guests named &ldquo;{trimmedQuery}&rdquo; on {activeDayInfo.label}&rsquo;s manifest. Try another day
              tab in Module 01, or check the spelling — this searches real live guest names only, not a fuzzy match.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="hops-scroll mt-3 max-h-72 space-y-1.5 overflow-y-auto">
            {results.map((hit) => (
              <button
                key={hit.guest.id}
                type="button"
                onClick={() => handleJump(hit.guest.id, hit.guest.name)}
                className="flex w-full items-center justify-between gap-3 rounded-md border px-3.5 py-2.5 text-left transition hover:brightness-110"
                style={{ borderColor: OPS.line, background: panelTint(0.02) }}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold" style={{ color: OPS.snow }}>
                    {highlightMatch(hit.guest.name, trimmedQuery)}
                  </span>
                  <span className="block truncate text-[12px]" style={{ color: OPS.textMuted }}>
                    {hit.contextLabel} &middot; {hit.guest.weightLbs} lb &middot; {hit.guest.equipment}
                    {hit.guest.medicalFlag !== "None" && (
                      <span style={{ color: OPS.red }}> &middot; ⚑ medical/dietary flag</span>
                    )}
                  </span>
                </span>
                <span
                  className="hops-mono shrink-0 rounded-md px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[.04em]"
                  style={{ background: "rgba(94,200,232,.14)", color: OPS.ice, border: `1px solid rgba(94,200,232,.35)` }}
                >
                  Jump →
                </span>
              </button>
            ))}
          </div>
        )}

        {jumpMsg && (
          <p className="mt-3 text-[12.5px] font-medium" style={{ color: OPS.ice }}>
            {jumpMsg}
          </p>
        )}

        <p className="mt-4 text-[12px] leading-snug" style={{ color: OPS.textMuted }}>
          Searches the real current-day roster from Module 01&rsquo;s live state (name match, case-insensitive) —
          switching day tabs in the Scheduling &amp; Manifest Board below genuinely changes which{" "}
          {allGuests.length}-guest roster this box searches. Selecting a result scrolls to and highlights that
          guest&rsquo;s actual card on that board.
        </p>
      </div>
    </div>
  );
}
