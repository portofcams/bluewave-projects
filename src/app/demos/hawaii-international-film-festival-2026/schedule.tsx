"use client";

// Client-side schedule explorer for the HIFF 2026 hub.
//
// This is the piece that demos the hub's whole thesis: one statewide
// festival, stretched across six weeks and up to five neighbor islands —
// filterable by program type AND by island, so an attendee on Maui isn't
// stuck scrolling past Honolulu-only screenings. Static-export friendly —
// pure client state over a serializable row array passed down from the
// server page. No fetches, no URL state, no deps.

import { useMemo, useState } from "react";
import Link from "next/link";
import type { HiffCategory, HiffScreening, HiffTicketing } from "./events";
import { categoryLabels } from "./events";
import { ticketBadge, islandBadge } from "./_shared";

export type ScheduleRow = {
  slug: string;
  shortName: string;
  date: string;
  sortKey: number;
  venue: string;
  island: HiffScreening["island"];
  category: HiffCategory;
  ticketed: HiffTicketing;
  teaser: string;
  /** internal href when the screening has a landing page */
  href?: string;
  /** official HIFF / vendor page */
  sourceUrl: string;
};

const CATEGORY_ORDER: (HiffCategory | "all")[] = [
  "all",
  "feature",
  "shorts",
  "opio",
  "industry",
  "neighbor-island",
  "special",
];

const ISLAND_ORDER: (HiffScreening["island"] | "all")[] = [
  "all",
  "Oʻahu",
  "Kauaʻi",
  "Maui",
  "Molokaʻi",
  "Hawaiʻi Island",
];

export default function ScheduleExplorer({ rows }: { rows: ScheduleRow[] }) {
  const [category, setCategory] = useState<HiffCategory | "all">("all");
  const [island, setIsland] = useState<HiffScreening["island"] | "all">("all");

  const availableIslands = useMemo(
    () => new Set(rows.map((r) => r.island)),
    [rows]
  );

  const filtered = useMemo(() => {
    return rows
      .filter((r) => (category === "all" ? true : r.category === category))
      .filter((r) => (island === "all" ? true : r.island === island))
      .sort((a, b) => a.sortKey - b.sortKey || a.shortName.localeCompare(b.shortName));
  }, [rows, category, island]);

  return (
    <div>
      {/* Filter chips — category */}
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
        {CATEGORY_ORDER.map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`hiff-cond rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-colors ${
                active
                  ? "border-[#f5a742] bg-[#f5a742]/15 text-[#f5a742]"
                  : "border-[#3a2652] bg-[#2a1a42]/60 text-[#b3a6c4] hover:border-[#f5a742]/50 hover:text-[#f7f2ea]"
              }`}
              aria-pressed={active}
            >
              {c === "all" ? "All programs" : categoryLabels[c]}
            </button>
          );
        })}
      </div>

      {/* Filter chips — which island, the hub's actual thesis */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {ISLAND_ORDER.filter((i) => i === "all" || availableIslands.has(i)).map(
          (i) => {
            const active = island === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIsland(i)}
                className={`hiff-cond rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-colors ${
                  active
                    ? "border-[#3fc4b0] bg-[#3fc4b0]/15 text-[#3fc4b0]"
                    : "border-[#3a2652] bg-[#2a1a42]/60 text-[#b3a6c4] hover:border-[#3fc4b0]/50 hover:text-[#f7f2ea]"
                }`}
                aria-pressed={active}
              >
                {i === "all" ? "Every island" : i}
              </button>
            );
          }
        )}
      </div>

      <p className="mb-6 text-center text-xs text-[#b3a6c4]">
        Showing{" "}
        <span className="font-semibold text-[#f7f2ea]">{filtered.length}</span>{" "}
        of {rows.length} programs
        {island !== "all" && ` on ${island}`}.
      </p>

      {/* Schedule rows */}
      <ol className="space-y-3">
        {filtered.map((r) => {
          const badge = ticketBadge[r.ticketed];
          const iBadge = islandBadge[r.island];
          const inner = (
            <>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="hiff-cond text-base font-semibold text-[#f7f2ea]">
                    {r.shortName}
                  </h3>
                  <span className="text-xs font-semibold text-[#f5a742]">
                    {r.date}
                  </span>
                </div>
                <p className="mt-0.5 text-xs uppercase tracking-[0.08em] text-[#9c8fae]">
                  {r.venue}
                </p>
                <p className="mt-1.5 hidden text-sm leading-relaxed text-[#d8cfe2] sm:block">
                  {r.teaser}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span
                  className={`hiff-cond inline-flex items-center whitespace-nowrap rounded-md border px-2 py-1 text-[10px] tracking-[0.1em] ${badge.cls}`}
                >
                  {badge.label}
                </span>
                <span
                  className={`hiff-cond whitespace-nowrap rounded-md border px-2 py-1 text-[10px] tracking-[0.1em] ${iBadge.cls}`}
                >
                  {r.island}
                </span>
                <span className="hiff-cond mt-1 text-[11px] font-semibold text-[#f5a742]">
                  {r.href ? "Details →" : "Official page ↗"}
                </span>
              </div>
            </>
          );

          const cls =
            "hiff-panel flex items-start justify-between gap-4 p-4 sm:p-5";

          return (
            <li key={r.slug}>
              {r.href ? (
                <Link href={r.href} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a
                  href={r.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ol>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-[#b3a6c4]">
          Nothing in this slice — clear a filter and the sun comes back up.
        </p>
      )}
    </div>
  );
}
