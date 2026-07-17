"use client";

// COMMISSION LEAK panel — the whole argument for a chef-driven restaurant.
//
// WHY THIS IS THE POINT: the premium-hospitality lead run (2026-07-17) qualified
// 14 Hawaiʻi restaurants — Beard winners among them — and found the same stack at
// nearly every one: reservations rented (OpenTable/Resy, billed per cover),
// ordering rented (Toast/DoorDash/Uber Eats, billed as a % of the ticket), gift
// cards rented, and no owned guest list. Individually each fee looks survivable.
// Annualized, side by side, it is the build budget — twice over. This panel does
// that arithmetic in front of the operator.
//
// HONESTY (non-negotiable — a sample, not a quote, not an audit):
//   - Cover counts, order volumes, and tickets are the OPERATOR'S OWN inputs —
//     nothing here claims to know any real restaurant's numbers.
//   - The per-cover fee and the marketplace/card percentages are TYPICAL PUBLISHED
//     RANGES, labeled as typical. They are not a claim about what any specific
//     platform charges any specific restaurant — real deals vary by tier,
//     promotion, and negotiation, and the page says so.
//   - THE ARITHMETIC is the real part. Change any input; the shape holds.

import { useMemo, useState } from "react";

// TYPICAL published figures, quoted as typical — not a claim about any one deal.
const RES_FEE_PER_COVER = 1.25; // per-cover reservation-network fee
const NIGHTS_PER_WEEK = 6;
const MARKETPLACE_PCT = 0.25; // delivery-marketplace commission (commonly ~15-30%)
const DIRECT_CARD_PCT = 0.03; // card processing on your own checkout

const COVERS = [40, 70, 110];
const ORDERS = [30, 60, 100];
const TICKETS = [45, 65, 90];

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export function CommissionLeak() {
  const [covers, setCovers] = useState(70);
  const [orders, setOrders] = useState(60);
  const [ticket, setTicket] = useState(65);

  const q = useMemo(() => {
    const resFees = covers * NIGHTS_PER_WEEK * 52 * RES_FEE_PER_COVER;
    const marketplace = orders * 52 * ticket * MARKETPLACE_PCT;
    const directCard = orders * 52 * ticket * DIRECT_CARD_PCT;
    const takeoutDelta = marketplace - directCard;
    const total = resFees + takeoutDelta;
    const covServed = covers * NIGHTS_PER_WEEK * 52;
    return { resFees, marketplace, directCard, takeoutDelta, total, covServed };
  }, [covers, orders, ticket]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#f7f0e4]/12 bg-gradient-to-br from-[#932f12] via-[#c4451f] to-[#1a1614] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6">
      <div className="relative">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="ksh-eyebrow !text-[#d9a441]">The rented stack</p>
            <h3 className="ksh-display mt-1 text-xl font-semibold text-[#f7f0e4] sm:text-2xl">
              What the platforms take, in a year
            </h3>
          </div>
          <span className="hidden shrink-0 rounded-full border border-[#d9a441]/45 bg-[#1a1614]/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f3d69a] sm:inline-block">
            Your numbers
          </span>
        </div>

        <p className="mb-4 max-w-2xl text-[13px] leading-relaxed text-[#f7f0e4]/65">
          Put your own room in. Every fee below is survivable on its own — that&apos;s exactly why nobody adds
          them up.
        </p>

        {/* controls */}
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <Chips label="Covers a night" opts={COVERS} value={covers} onChange={setCovers} fmt={(n) => String(n)} />
          <Chips label="Takeout orders a week" opts={ORDERS} value={orders} onChange={setOrders} fmt={(n) => String(n)} />
          <Chips label="Average ticket" opts={TICKETS} value={ticket} onChange={setTicket} fmt={(n) => "$" + n} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* rented */}
          <div className="rounded-2xl border border-[#d9a441]/45 bg-[#1a1614]/45 p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d9a441]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f3d69a]">Rented — per year</span>
            </div>
            <Line label={`Reservations · ~$${RES_FEE_PER_COVER.toFixed(2)}/cover, typical`} value={money(q.resFees)} />
            <div className="pl-1 text-[10px] text-[#f7f0e4]/40">
              {q.covServed.toLocaleString("en-US")} covers served · {NIGHTS_PER_WEEK} nights/wk
            </div>
            <Line label="Takeout · ~25% marketplace, typical" value={money(q.marketplace)} accent />
            <div className="mt-2 flex items-baseline justify-between border-t border-[#f7f0e4]/15 pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f3d69a]">Off the top</span>
              <span className="ksh-display text-xl font-bold text-[#f7f0e4]">{money(q.resFees + q.marketplace)}</span>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-[#f7f0e4]/55">
              …and not one guest email is yours at the end of it.
            </p>
          </div>

          {/* owned */}
          <div className="rounded-2xl border border-[#4a6b4f]/60 bg-[#1a1614]/35 p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7fb98a]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a9d3b0]">Owned — per year</span>
            </div>
            <Line label="Reservations · on your own site" value="$0" />
            <div className="pl-1 text-[10px] text-[#f7f0e4]/40">no per-cover fee — the table is yours to give</div>
            <Line label={`Takeout · ~${Math.round(DIRECT_CARD_PCT * 100)}% card processing`} value={money(q.directCard)} />
            <div className="mt-2 flex items-baseline justify-between border-t border-[#f7f0e4]/15 pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a9d3b0]">Off the top</span>
              <span className="ksh-display text-xl font-bold text-[#f7f0e4]">{money(q.directCard)}</span>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-[#f7f0e4]/55">
              …and every guest who books lands in a list you own.
            </p>
          </div>
        </div>

        {/* the number */}
        <div className="mt-3 rounded-2xl border border-[#d9a441]/40 bg-[#1a1614]/55 p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f3d69a]">
            The gap, every year
          </div>
          <div className="ksh-display mt-1 text-4xl font-bold leading-none text-[#f7f0e4] sm:text-5xl">
            {money(q.total)}
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-[#f7f0e4]/75">
            That&apos;s {money(q.resFees)} in per-cover reservation fees plus {money(q.takeoutDelta)} of takeout
            commission above what your own checkout would cost — leaving the room every year, on the volume you
            just entered. It buys you no guest list, no data, and no way to reach the people who already love the
            food.
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-[#f7f0e4]/50">
            Weigh a build against that number, not against zero.
          </p>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-[#f7f0e4]/55">
          <span className="font-semibold text-[#f3d69a]">What&apos;s real and what isn&apos;t:</span> the covers,
          orders, and ticket are <span className="font-semibold">your inputs</span> — this page doesn&apos;t claim
          to know any restaurant&apos;s numbers. The per-cover fee and the marketplace and card percentages are{" "}
          <span className="font-semibold">typical published ranges, quoted as typical</span> — real agreements vary
          by tier, promotion, and what you negotiated, and a marketplace cut commonly lands anywhere from ~15% to
          ~30%. Put your actual rates in and the total moves;{" "}
          <span className="font-semibold text-[#f3d69a]">the shape doesn&apos;t</span>. That shape is the argument.
        </p>
      </div>
    </div>
  );
}

function Chips({
  label,
  opts,
  value,
  onChange,
  fmt,
}: {
  label: string;
  opts: number[];
  value: number;
  onChange: (n: number) => void;
  fmt: (n: number) => string;
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
            {fmt(o)}
          </button>
        ))}
      </div>
    </div>
  );
}

function Line({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-0.5">
      <span className="text-[12px] text-[#f7f0e4]/60">{label}</span>
      <span className={`ksh-mono text-[12px] ${accent ? "text-[#f3d69a]" : "text-[#f7f0e4]/85"}`}>{value}</span>
    </div>
  );
}
