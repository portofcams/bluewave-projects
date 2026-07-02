"use client";

// Client-side schedule explorer for the AIFF 2026 hub.
//
// This is the piece that demos the hub's whole thesis: every screening, one
// filterable front door — and crucially, which of the two ticketing systems
// (FilmBOT vs GoElEvent) actually sells it. Static-export friendly — pure
// client state over a serializable row array passed down from the server
// page. No fetches, no URL state, no deps.

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AiffCategory, AiffTicketing } from "./events";
import { categoryLabels } from "./events";
import { ticketBadge, vendorBadge } from "./_shared";

export type ScheduleRow = {
  slug: string;
  shortName: string;
  date: string;
  sortKey: number;
  venue: string;
  category: AiffCategory;
  ticketed: AiffTicketing;
  ticketVia?: "FilmBOT" | "GoElEvent";
  teaser: string;
  /** internal href when the screening has a landing page */
  href?: string;
  /** official AIFF / vendor page */
  sourceUrl: string;
};

const CATEGORY_ORDER: (AiffCategory | "all")[] = [
  "all",
  "feature",
  "shorts",
  "special",
  "free",
  "awards",
];

const VENDOR_ORDER: ("all" | "FilmBOT" | "GoElEvent")[] = [
  "all",
  "FilmBOT",
  "GoElEvent",
];

export default function ScheduleExplorer({ rows }: { rows: ScheduleRow[] }) {
  const [category, setCategory] = useState<AiffCategory | "all">("all");
  const [vendor, setVendor] = useState<"all" | "FilmBOT" | "GoElEvent">("all");

  const filtered = useMemo(() => {
    return rows
      .filter((r) => (category === "all" ? true : r.category === category))
      .filter((r) => (vendor === "all" ? true : r.ticketVia === vendor))
      .sort((a, b) => a.sortKey - b.sortKey || a.shortName.localeCompare(b.shortName));
  }, [rows, category, vendor]);

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
              className={`aiff-cond rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-colors ${
                active
                  ? "border-[#f0b94a] bg-[#f0b94a]/15 text-[#f0b94a]"
                  : "border-[#2e2e38] bg-[#1e1e26]/60 text-[#a8a6ae] hover:border-[#f0b94a]/50 hover:text-[#f3f1ea]"
              }`}
              aria-pressed={active}
            >
              {c === "all" ? "All screenings" : categoryLabels[c]}
            </button>
          );
        })}
      </div>

      {/* Filter chips — which ticketing system, the hub's actual thesis */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {VENDOR_ORDER.map((v) => {
          const active = vendor === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => setVendor(v)}
              className={`aiff-cond rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-colors ${
                active
                  ? "border-[#4fd6e8] bg-[#4fd6e8]/15 text-[#4fd6e8]"
                  : "border-[#2e2e38] bg-[#1e1e26]/60 text-[#a8a6ae] hover:border-[#4fd6e8]/50 hover:text-[#f3f1ea]"
              }`}
              aria-pressed={active}
            >
              {v === "all" ? "Both ticket systems" : `Via ${v} only`}
            </button>
          );
        })}
      </div>

      <p className="mb-6 text-center text-xs text-[#a8a6ae]">
        Showing{" "}
        <span className="font-semibold text-[#f3f1ea]">{filtered.length}</span>{" "}
        of {rows.length} screenings
        {vendor !== "all" && ` sold through ${vendor}`}.
      </p>

      {/* Schedule rows */}
      <ol className="space-y-3">
        {filtered.map((r) => {
          const badge = ticketBadge[r.ticketed];
          const vBadge = r.ticketVia ? vendorBadge[r.ticketVia] : undefined;
          const inner = (
            <>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="aiff-cond text-base font-semibold text-[#f3f1ea]">
                    {r.shortName}
                  </h3>
                  <span className="text-xs font-semibold text-[#f0b94a]">
                    {r.date}
                  </span>
                </div>
                <p className="mt-0.5 text-xs uppercase tracking-[0.08em] text-[#8a8890]">
                  {r.venue}
                </p>
                <p className="mt-1.5 hidden text-sm leading-relaxed text-[#c9c7d0] sm:block">
                  {r.teaser}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span
                  className={`aiff-cond inline-flex items-center whitespace-nowrap rounded-md border px-2 py-1 text-[10px] tracking-[0.1em] ${badge.cls}`}
                >
                  {badge.label}
                </span>
                {r.ticketVia && vBadge && (
                  <span
                    className={`aiff-cond whitespace-nowrap rounded-md border px-2 py-1 text-[10px] tracking-[0.1em] ${vBadge.cls}`}
                  >
                    via {r.ticketVia}
                  </span>
                )}
                <span className="aiff-cond mt-1 text-[11px] font-semibold text-[#f0b94a]">
                  {r.href ? "Details →" : "Official page ↗"}
                </span>
              </div>
            </>
          );

          const cls =
            "aiff-panel flex items-start justify-between gap-4 p-4 sm:p-5";

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
        <p className="py-10 text-center text-sm text-[#a8a6ae]">
          Nothing in this slice — clear a filter and the marquee lights come
          back on.
        </p>
      )}
    </div>
  );
}
