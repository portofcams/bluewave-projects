"use client";

// RESERVE DIRECT — the owned half of the Kaimukī Supper House sample.
//
// The leak panel makes the case; this is the thing that replaces the rented
// stack: a table booked on the restaurant's OWN site. No per-cover fee, and the
// guest's email lands in a list the restaurant owns.
//
// THE LIVE BIT: the "golden hour" seating badge is driven by the REAL sunset time
// computed for Honolulu — the slot that falls inside the ~75 minutes before sunset
// gets flagged, and the lānai tiles carry the live Honolulu (PHNL) observation. A
// small thing that a rented reservation widget will never do for you: sell the
// seating that's actually worth selling tonight, using data you didn't buy.
//
// HONESTY: a fictional restaurant. No real menu, price, table, or availability.
// The reserve button takes no booking. Sunset is computed; the lānai reading is
// the live PHNL observation with a clearly-labeled sample fallback.

import { useMemo, useState } from "react";
import { solarTimes, decodeNwsObservation } from "../_wx";
import { SourceBadge, useNwsObservation } from "../_wx/live";

const TZ = "Pacific/Honolulu";
const HNL_LAT = 21.3069;
const HNL_LON = -157.8583;

const BADGE = {
  live: "border-[#7fb98a]/55 bg-[#4a6b4f]/25 text-[#a9d3b0]",
  computed: "border-[#d9a441]/45 bg-[#d9a441]/14 text-[#f3d69a]",
  sample: "border-[#f7f0e4]/25 bg-[#f7f0e4]/8 text-[#f7f0e4]/70",
  loading: "border-[#f7f0e4]/20 text-[#f7f0e4]/45",
};

const SAMPLE_WX = decodeNwsObservation(
  { timestamp: null, rawMessage: "PHNL 170553Z 05011KT 10SM FEW025 FEW034 FEW050 27/20 A2998" },
  "PHNL",
  TZ
);

const DAYS = ["Tonight", "Tomorrow", "Saturday"];
const PARTIES = [2, 4, 6];
// minutes past midnight, local
const SLOTS = [
  { label: "5:30", min: 17 * 60 + 30 },
  { label: "6:45", min: 18 * 60 + 45 },
  { label: "8:00", min: 20 * 60 },
];

// "7:15 PM" -> 1155
function clockToMin(s: string): number | null {
  const m = s.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return h * 60 + Number(m[2]);
}

export function ReserveDirect() {
  const [sun] = useState(() => solarTimes(new Date(), HNL_LAT, HNL_LON, TZ));
  const [day, setDay] = useState("Tonight");
  const [party, setParty] = useState(4);
  const [slot, setSlot] = useState(SLOTS[1].label);

  const wx = useNwsObservation("PHNL", { sample: SAMPLE_WX, tz: TZ });

  // The seating worth selling: inside the ~75 min before real sunset.
  const goldenLabel = useMemo(() => {
    const setMin = clockToMin(sun.sunset);
    if (setMin == null) return null;
    const inWindow = SLOTS.filter((s) => s.min >= setMin - 75 && s.min <= setMin);
    if (inWindow.length === 0) return null;
    // the latest slot still before sunset is the best table
    return inWindow[inWindow.length - 1].label;
  }, [sun.sunset]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#f7f0e4]/12 bg-gradient-to-br from-[#2b2320] via-[#1a1614] to-[#4a6b4f] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6">
      <div className="relative">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="ksh-eyebrow !text-[#a9d3b0]">Reserve direct</p>
            <h3 className="ksh-display mt-1 text-xl font-semibold text-[#f7f0e4] sm:text-2xl">
              The table is ours to give
            </h3>
          </div>
          <span className="hidden shrink-0 rounded-full border border-[#7fb98a]/45 bg-[#1a1614]/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a9d3b0] sm:inline-block">
            No per-cover fee
          </span>
        </div>

        {/* controls */}
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <Chips label="Night" opts={DAYS} value={day} onChange={setDay} />
          <Chips label="Party" opts={PARTIES.map(String)} value={String(party)} onChange={(v) => setParty(Number(v))} />
        </div>

        {/* slots — golden hour comes from the real sunset */}
        <div className="mb-4 rounded-xl border border-[#f7f0e4]/14 bg-[#f7f0e4]/[0.05] p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[#f7f0e4]/55">Seating</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-[#f3d69a]">
              <SourceBadge source="computed" labels={{ live: "Computed", computed: "Computed" }} classes={BADGE} />
              sunset {sun.sunset}
            </span>
          </div>
          <div className="flex gap-2">
            {SLOTS.map((s) => {
              const on = slot === s.label;
              const golden = goldenLabel === s.label;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSlot(s.label)}
                  aria-pressed={on}
                  className={`flex-1 rounded-lg border px-2 py-2 text-sm font-semibold transition-colors ${
                    on
                      ? "border-[#d9a441]/70 bg-[#d9a441]/20 text-[#f3d69a]"
                      : "border-[#f7f0e4]/14 text-[#f7f0e4]/65 hover:border-[#d9a441]/40"
                  }`}
                >
                  <span className="block">{s.label}</span>
                  {golden && (
                    <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.1em] text-[#f3d69a]">
                      Golden hour
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {goldenLabel && (
            <p className="mt-2 text-[11px] leading-snug text-[#f7f0e4]/55">
              The {goldenLabel} seating lands in the last light — sunset is {sun.sunset} tonight. A rented widget
              doesn&apos;t know that. Yours does, and can sell it.
            </p>
          )}
        </div>

        {/* lānai — live */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <Tile label="On the lānai" value={wx.obs.tempText} sub="Honolulu (PHNL)" source={wx.source} liveLabel="Live · NWS" />
          <Tile label="Trades" value={wx.obs.windTextMph} sub="Honolulu (PHNL)" source={wx.source} liveLabel="Live · NWS" />
        </div>

        {/* confirm */}
        <div className="rounded-2xl border border-[#7fb98a]/45 bg-[#1a1614]/55 p-4">
          <p className="text-[13px] leading-relaxed text-[#f7f0e4]">
            <span className="ksh-display font-bold text-[#f7f0e4]">
              Table for {party} · {day} at {slot}
            </span>
            {goldenLabel === slot ? " — the last-light table." : "."}
          </p>
          <button
            type="button"
            className="mt-3 w-full cursor-default rounded-full bg-gradient-to-r from-[#932f12] to-[#c4451f] px-5 py-2.5 text-sm font-semibold text-[#f7f0e4]"
            aria-disabled="true"
            title="Sample demo — no real reservation is taken"
          >
            Reserve direct →
          </button>
          <p className="mt-2 text-center text-[10px] text-[#f7f0e4]/45">
            Sample demo — this button takes no reservation.
          </p>
          <p className="mt-3 text-[11px] leading-relaxed text-[#f7f0e4]/60">
            No per-cover fee on this table — and the guest&apos;s name and email land in{" "}
            <span className="font-semibold text-[#a9d3b0]">your</span> list, not a platform&apos;s. That list is the
            asset. It&apos;s how you fill a Tuesday, announce a menu, and stop renting your own regulars back.
          </p>
        </div>
      </div>
    </div>
  );
}

function Tile({
  label,
  value,
  sub,
  source,
  liveLabel,
}: {
  label: string;
  value: string;
  sub: string;
  source: "live" | "sample" | "loading" | "computed";
  liveLabel: string;
}) {
  return (
    <div className="ksh-glass flex flex-col p-3">
      <div className="mb-1.5 flex items-center justify-between gap-1">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#f7f0e4]/50">{label}</span>
        <SourceBadge source={source} labels={{ live: liveLabel }} classes={BADGE} />
      </div>
      <span className="ksh-display text-[15px] font-semibold leading-tight text-[#f7f0e4] sm:text-base">{value}</span>
      <span className="mt-0.5 text-[11px] text-[#f7f0e4]/60">{sub}</span>
    </div>
  );
}

function Chips({
  label,
  opts,
  value,
  onChange,
}: {
  label: string;
  opts: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-xl border border-[#f7f0e4]/14 bg-[#f7f0e4]/[0.05] p-3">
      <div className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[#f7f0e4]/55">{label}</div>
      <div className="flex gap-2">
        {opts.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={`flex-1 rounded-lg border px-2 py-1.5 text-sm font-semibold transition-colors ${
              value === o
                ? "border-[#d9a441]/70 bg-[#d9a441]/20 text-[#f3d69a]"
                : "border-[#f7f0e4]/14 text-[#f7f0e4]/65 hover:border-[#d9a441]/40"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
