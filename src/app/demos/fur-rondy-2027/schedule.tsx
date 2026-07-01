"use client";

// Client-side schedule explorer for the Fur Rondy 2027 hub.
//
// This is the piece that demos the hub's whole thesis: ~25 official events,
// one filterable front door. Static-export friendly — pure client state over
// a serializable row array passed down from the server page. No fetches, no
// URL state, no deps.

import { useMemo, useState } from "react";
import Link from "next/link";
import type { RondyCategory, RondyTicketing } from "./events";
import { categoryLabels } from "./events";
import { ticketBadge } from "./_shared";

export type ScheduleRow = {
  slug: string;
  shortName: string;
  date: string;
  sortKey: number;
  venue: string;
  category: RondyCategory;
  ticketed: RondyTicketing;
  ticketVia?: string;
  teaser: string;
  /** internal href when the event has a landing page (deep or cross-demo) */
  href?: string;
  /** official furrondy.net / iditarod.com page */
  sourceUrl: string;
};

const CATEGORY_ORDER: (RondyCategory | "all")[] = [
  "all",
  "signature",
  "race",
  "nightlife",
  "competition",
  "family",
  "market",
];

export default function ScheduleExplorer({ rows }: { rows: ScheduleRow[] }) {
  const [category, setCategory] = useState<RondyCategory | "all">("all");
  const [ticketedOnly, setTicketedOnly] = useState(false);

  const filtered = useMemo(() => {
    return rows
      .filter((r) => (category === "all" ? true : r.category === category))
      .filter((r) =>
        ticketedOnly ? r.ticketed === "paid" || r.ticketed === "register" : true
      )
      .sort((a, b) => a.sortKey - b.sortKey || a.shortName.localeCompare(b.shortName));
  }, [rows, category, ticketedOnly]);

  return (
    <div>
      {/* Filter chips */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {CATEGORY_ORDER.map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rondy-cond rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-colors ${
                active
                  ? "border-[#ffc65c] bg-[#ffc65c]/15 text-[#ffc65c]"
                  : "border-[#26305c] bg-[#121a3f]/60 text-[#aab4d8] hover:border-[#ffc65c]/50 hover:text-[#eef2ff]"
              }`}
              aria-pressed={active}
            >
              {c === "all" ? "All events" : categoryLabels[c]}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setTicketedOnly((v) => !v)}
          className={`rondy-cond rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-colors ${
            ticketedOnly
              ? "border-[#8b6cf0] bg-[#8b6cf0]/18 text-[#a98ffb]"
              : "border-[#26305c] bg-[#121a3f]/60 text-[#aab4d8] hover:border-[#8b6cf0]/50 hover:text-[#eef2ff]"
          }`}
          aria-pressed={ticketedOnly}
        >
          Tickets &amp; sign-ups only
        </button>
      </div>

      <p className="mb-6 text-center text-xs text-[#aab4d8]">
        Showing{" "}
        <span className="font-semibold text-[#eef2ff]">{filtered.length}</span>{" "}
        of {rows.length} official events
        {ticketedOnly && " that need a ticket or registration"}.
      </p>

      {/* Schedule rows */}
      <ol className="space-y-3">
        {filtered.map((r) => {
          const badge = ticketBadge[r.ticketed];
          const inner = (
            <>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="rondy-cond text-base font-semibold text-[#eef2ff]">
                    {r.shortName}
                  </h3>
                  <span className="text-xs font-semibold text-[#ffc65c]">
                    {r.date}
                  </span>
                </div>
                <p className="mt-0.5 text-xs uppercase tracking-[0.08em] text-[#8992b8]">
                  {r.venue}
                </p>
                <p className="mt-1.5 hidden text-sm leading-relaxed text-[#c9d2f2] sm:block">
                  {r.teaser}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span
                  className={`rondy-cond inline-flex items-center whitespace-nowrap rounded-md border px-2 py-1 text-[10px] tracking-[0.1em] ${badge.cls}`}
                >
                  {badge.label}
                </span>
                {r.ticketVia && (
                  <span className="whitespace-nowrap rounded-md border border-[#26305c] bg-[#070b1e]/60 px-2 py-1 text-[10px] text-[#8992b8]">
                    via {r.ticketVia}
                  </span>
                )}
                <span className="rondy-cond mt-1 text-[11px] font-semibold text-[#ffc65c]">
                  {r.href ? "Event page →" : "Official page ↗"}
                </span>
              </div>
            </>
          );

          const cls =
            "rondy-booth flex items-start justify-between gap-4 p-4 sm:p-5";

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
        <p className="py-10 text-center text-sm text-[#aab4d8]">
          Nothing in this slice — clear a filter and the midway lights come
          back on.
        </p>
      )}
    </div>
  );
}
