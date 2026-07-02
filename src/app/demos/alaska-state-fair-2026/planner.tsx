"use client";

// Build-your-fair-day planner — the demo's centerpiece, and the layer the
// fair's ticketing currently doesn't provide: pick a date, see everything
// that day, and get the exact ticket list that day requires.
//
// Pure client state over the grounded data in events.ts (real published 2026
// dates; closed days verified from the official hours page). Static-export
// safe: no fetches, no URL state, no deps.

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  days,
  concerts,
  moments,
  DAILY_CONSTANTS,
  HUB_PATH,
  FAIR_URL,
} from "./events";

export default function FairDayPlanner() {
  // default to the first open day
  const [selected, setSelected] = useState(days.find((d) => d.open)!.date);

  const day = useMemo(() => days.find((d) => d.date === selected)!, [selected]);
  const concert = day.concert
    ? concerts.find((c) => c.slug === day.concert)
    : undefined;
  const dayMoments = (day.momentIdx ?? []).map((i) => moments[i]);

  return (
    <div>
      {/* Date strip */}
      <div
        className="mb-8 grid grid-cols-6 gap-1.5 sm:grid-cols-9"
        role="tablist"
        aria-label="Pick your fair day"
      >
        {days.map((d) => {
          const active = d.date === selected;
          const dayNum = d.date.slice(8);
          const mon = d.date.slice(5, 7) === "08" ? "Aug" : "Sep";
          return (
            <button
              key={d.date}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(d.date)}
              className={`fair-cond relative rounded-md border-2 px-1 py-2 text-center transition-all ${
                !d.open
                  ? "border-[#d9c9a2] bg-[#eee1c1]/60 text-[#b3a67f]"
                  : active
                    ? "border-[#c43a2d] bg-[#c43a2d] text-[#f6eed9] shadow-[3px_3px_0_rgba(34,56,31,0.3)]"
                    : "border-[#22381f]/50 bg-[#faf4e3] text-[#22381f] hover:-translate-y-0.5 hover:border-[#c43a2d]"
              }`}
            >
              <span className="block text-[10px] leading-tight">
                {d.weekday.slice(0, 3)}
              </span>
              <span className="fair-display block text-lg leading-tight">
                {Number(dayNum)}
              </span>
              <span className="block text-[9px] leading-tight opacity-80">
                {mon}
              </span>
              {!d.open && (
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 -rotate-12 text-[8px] font-bold tracking-[0.18em] text-[#c43a2d]/80">
                  CLOSED
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Day card */}
      <div className="fair-card fair-band overflow-hidden">
        <div className="border-b-2 border-[#22381f]/20 bg-gradient-to-r from-[#faf4e3] to-[#eee1c1] px-6 py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="fair-display text-2xl text-[#22381f] sm:text-3xl">
              {day.weekday}, {day.label.split(", ")[1]}
            </h3>
            {day.open ? (
              <span className="fair-cond text-xs font-semibold tracking-[0.14em] text-[#557d2b]">
                Gates 11 AM – 10 PM
              </span>
            ) : (
              <span className="fair-cond text-xs font-semibold tracking-[0.14em] text-[#c43a2d]">
                Fair closed today
              </span>
            )}
          </div>
          <p className="mt-1 text-sm italic text-[#4a5c40]">{day.vibe}</p>
        </div>

        {day.open ? (
          <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
            {/* What's on */}
            <div className="space-y-5 p-6">
              {concert && (
                <div>
                  <p className="fair-eyebrow mb-2 !text-[10px]">
                    Tonight at the Borealis
                  </p>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="fair-display text-xl text-[#c43a2d]">
                        {concert.name}
                      </div>
                      <p className="text-sm text-[#4a5c40]">
                        {concert.genreLine} · {concert.startTime}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {dayMoments.map((m) => (
                <div key={m.name}>
                  <p className="fair-eyebrow mb-2 !text-[10px] !text-[#557d2b]">
                    Signature moment
                  </p>
                  <div className="fair-display text-lg text-[#22381f]">
                    {m.name}
                  </div>
                  <p className="text-sm text-[#4a5c40]">
                    {m.time && `${m.time} · `}
                    {m.note}
                  </p>
                </div>
              ))}

              <div>
                <p className="fair-eyebrow mb-2 !text-[10px] !text-[#2e4c90]">
                  Running all day
                </p>
                <ul className="space-y-1 text-sm text-[#22381f]">
                  {DAILY_CONSTANTS.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#dfa32b]" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The ticket list — the whole point */}
            <div className="border-t-2 border-[#22381f]/20 bg-[#22381f]/[0.045] p-6 md:border-l-2 md:border-t-0">
              <p className="fair-eyebrow mb-3 !text-[10px]">
                Your ticket list for this day
              </p>
              <ol className="space-y-3 text-sm text-[#22381f]">
                <li className="flex gap-2.5">
                  <span className="fair-display mt-0.5 text-[#c43a2d]">1</span>
                  <span>
                    <b>Fair admission</b>
                    {concert ? (
                      <>
                        {" "}
                        — or skip it and buy the{" "}
                        <b>“{concert.name} with fair admission”</b> bundle,
                        which covers both. The concert-only ticket does{" "}
                        <b>not</b> get you into the fair.
                      </>
                    ) : (
                      " — one-day, multi-pack, or season pass."
                    )}
                  </span>
                </li>
                {concert && (
                  <li className="flex gap-2.5">
                    <span className="fair-display mt-0.5 text-[#c43a2d]">2</span>
                    <span>
                      <b>{concert.name}</b> ({concert.startTime}) — sold as its
                      own Etix ticket or as the admission bundle above. Pick
                      one, not both.
                    </span>
                  </li>
                )}
                <li className="flex gap-2.5">
                  <span className="fair-display mt-0.5 text-[#c43a2d]">
                    {concert ? "3" : "2"}
                  </span>
                  <span>
                    <b>Parking</b> — premier or reserved, pre-sold separately
                    {concert ? " and worth pre-buying on a concert night" : ""}.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="fair-display mt-0.5 text-[#c43a2d]">
                    {concert ? "4" : "3"}
                  </span>
                  <span>
                    <b>Carnival rides</b> (optional) — wristbands/credits from
                    Golden Wheel on the midway; never included in admission.
                  </span>
                </li>
              </ol>
              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={`${FAIR_URL}/buy-tix/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fair-cond rounded-md border-2 border-[#93291f] bg-[#c43a2d] px-5 py-2.5 text-center text-xs font-bold text-[#f6eed9] shadow-[3px_3px_0_rgba(34,56,31,0.3)] transition-transform hover:-translate-y-0.5"
                >
                  Official Buy Tix page →
                </a>
                <Link
                  href={`${HUB_PATH}/which-ticket`}
                  className="fair-cond rounded-md border-2 border-[#22381f]/40 px-5 py-2.5 text-center text-xs font-bold text-[#22381f] transition-colors hover:border-[#2e4c90] hover:text-[#2e4c90]"
                >
                  Full ticket explainer
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <p className="max-w-2xl text-sm leading-relaxed text-[#4a5c40]">
              The fair is closed Tuesdays and Wednesdays (August 25–26 and
              September 1–2) — verified from the official hours page. Slide to
              the next open day; Thursday reopens rested and the lines are
              shorter.
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-[#7d7458]">
        Dates, hours, and closed days from alaskastatefair.org (verified July
        2026). Always confirm and buy through the official links.
      </p>
    </div>
  );
}
