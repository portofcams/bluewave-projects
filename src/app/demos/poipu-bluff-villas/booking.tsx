"use client";

// DIRECT-BOOKING panel — the commercial half of the Poʻipū Bluff Villas sample.
//
// WHY THIS PANEL IS THE POINT: the premium-hospitality lead run (2026-07-17)
// found the same thing at nearly every qualified operator — luxury inventory with
// NO direct booking of its own. Guests get routed to Airbnb/VRBO/Booking or an
// inquiry inbox, so the channel takes a cut off the guest AND the host, and the
// operator never owns the guest. This panel makes that arithmetic visible: pick a
// stay, watch the same villa cost more through the channel than it does here.
//
// HONESTY (non-negotiable — this is a sample, not a quote):
//   - Every villa, rate, and cleaning fee below is INVENTED and clearly labeled
//     illustrative. No real Poʻipū property's rates, units, or availability appear.
//   - The tax line is a SAMPLE rate, not tax advice.
//   - The channel-fee line uses a TYPICAL published guest-service-fee range, and
//     says so — it is not a claim about any specific platform's fee on any
//     specific booking.
//   - THE ARITHMETIC is the real part. That's the whole argument.

import { useMemo, useState } from "react";

type Villa = {
  id: string;
  name: string;
  kind: string;
  sleeps: number;
  nightly: number; // ILLUSTRATIVE
  cleaning: number; // ILLUSTRATIVE
  blurb: string;
};

// Fictional units on public geography. Names are invented.
const VILLAS: Villa[] = [
  { id: "kiawe", name: "Kiawe Cottage", kind: "Studio · garden", sleeps: 2, nightly: 295, cleaning: 165, blurb: "Dry-side studio a short walk up from the beach park." },
  { id: "kukui", name: "Hale Kukui", kind: "1 bedroom · bluff", sleeps: 2, nightly: 385, cleaning: 195, blurb: "Bluff-edge cottage, south-facing lānai, sunrise over Māhāʻulepū." },
  { id: "plumeria", name: "Plumeria Hale", kind: "2 bedroom · garden", sleeps: 4, nightly: 545, cleaning: 245, blurb: "Two suites off a shaded courtyard; outdoor shower, plumeria hedge." },
  { id: "bluff", name: "Bluff House", kind: "3 bedroom · oceanfront", sleeps: 6, nightly: 890, cleaning: 350, blurb: "The oceanfront hale — whitewater below the lānai on a summer south." },
];

const NIGHT_OPTS = [3, 5, 7];
const GUEST_OPTS = [2, 4, 6];

// SAMPLE combined state/county lodging tax. Illustrative, NOT tax advice.
const TAX_RATE = 0.18;
// TYPICAL published guest service fee charged by the big vacation-rental
// channels. A range, quoted as typical — not a claim about a specific booking.
const CHANNEL_GUEST_FEE = 0.15;
// TYPICAL host-side commission the channel bills the operator, on top.
const CHANNEL_HOST_FEE = 0.03;

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export function BookDirect() {
  const [nights, setNights] = useState(5);
  const [guests, setGuests] = useState(4);
  const [villaId, setVillaId] = useState("plumeria");

  const available = useMemo(() => VILLAS.filter((v) => v.sleeps >= guests), [guests]);
  const villa = useMemo(() => available.find((v) => v.id === villaId) ?? available[0], [available, villaId]);

  const q = useMemo(() => {
    if (!villa) return null;
    const stay = villa.nightly * nights;
    const pre = stay + villa.cleaning;
    const tax = pre * TAX_RATE;
    const direct = pre + tax;
    const guestFee = pre * CHANNEL_GUEST_FEE;
    const channel = direct + guestFee;
    const hostFee = stay * CHANNEL_HOST_FEE;
    return { stay, pre, tax, direct, guestFee, channel, hostFee };
  }, [villa, nights]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#eaf6f8]/12 bg-gradient-to-br from-[#8f3f1f] via-[#b4552d] to-[#10425c] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6">
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="pbv-eyebrow !text-[#f2b134]">Book direct</p>
            <h3 className="pbv-display mt-1 text-xl font-semibold text-[#fdf7ee] sm:text-2xl">
              Your dates, your rate, no middleman
            </h3>
          </div>
          <span className="hidden shrink-0 rounded-full border border-[#f2b134]/45 bg-[#0b2a3d]/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ffe0a0] sm:inline-block">
            Sample rates
          </span>
        </div>

        {/* controls */}
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Chips label="Nights" opts={NIGHT_OPTS} value={nights} onChange={setNights} suffix="" />
          <Chips label="Guests" opts={GUEST_OPTS} value={guests} onChange={setGuests} suffix="" />
        </div>

        {/* villas */}
        <div className="mb-4 grid gap-2 sm:grid-cols-2">
          {available.map((v) => {
            const on = villa?.id === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setVillaId(v.id)}
                aria-pressed={on}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  on
                    ? "border-[#f2b134]/70 bg-[#0b2a3d]/55"
                    : "border-[#eaf6f8]/14 bg-[#eaf6f8]/[0.05] hover:border-[#f2b134]/40"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="pbv-display text-sm font-semibold text-[#fdf7ee]">{v.name}</span>
                  <span className="pbv-mono text-[11px] text-[#ffe0a0]">{money(v.nightly)}/night</span>
                </div>
                <div className="mt-0.5 text-[11px] text-[#fdf7ee]/60">
                  {v.kind} · sleeps {v.sleeps}
                </div>
                <div className="mt-1 text-[11px] leading-snug text-[#fdf7ee]/45">{v.blurb}</div>
              </button>
            );
          })}
          {available.length === 0 && (
            <p className="text-[12px] text-[#fdf7ee]/70">Nothing in the collection sleeps {guests} — try fewer guests.</p>
          )}
        </div>

        {/* the arithmetic */}
        {villa && q && (
          <div className="grid gap-3 sm:grid-cols-2">
            {/* direct */}
            <div className="rounded-2xl border border-[#4cc9d9]/45 bg-[#0b2a3d]/45 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4cc9d9]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#bfeef5]">Direct — on this site</span>
              </div>
              <Line label={`${money(villa.nightly)} × ${nights} nights`} value={money(q.stay)} />
              <Line label="Cleaning" value={money(villa.cleaning)} />
              <Line label="Taxes (sample rate)" value={money(q.tax)} />
              <div className="mt-2 flex items-baseline justify-between border-t border-[#eaf6f8]/15 pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#bfeef5]">Guest pays</span>
                <span className="pbv-display text-xl font-bold text-[#f2fbfd]">{money(q.direct)}</span>
              </div>
              <p className="mt-2 text-[11px] leading-snug text-[#eaf6f8]/55">
                You keep the booking, the guest&apos;s email, and the margin.
              </p>
            </div>

            {/* channel */}
            <div className="rounded-2xl border border-[#f2b134]/40 bg-[#0b2a3d]/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f2b134]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ffe0a0]">Same villa — through a channel</span>
              </div>
              <Line label="Same stay + cleaning + tax" value={money(q.direct)} />
              <Line label="Guest service fee (~15%, typical)" value={"+ " + money(q.guestFee)} accent />
              <div className="mt-2 flex items-baseline justify-between border-t border-[#eaf6f8]/15 pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#ffe0a0]">Guest pays</span>
                <span className="pbv-display text-xl font-bold text-[#fdf7ee]">{money(q.channel)}</span>
              </div>
              <p className="mt-2 text-[11px] leading-snug text-[#fdf7ee]/60">
                …and the channel bills <span className="font-semibold text-[#ffe0a0]">you</span> roughly{" "}
                {money(q.hostFee)} more in host commission on this one stay.
              </p>
            </div>
          </div>
        )}

        {q && (
          <div className="mt-3 rounded-2xl border border-[#4cc9d9]/35 bg-[#0b2a3d]/40 p-4">
            <p className="text-[13px] leading-relaxed text-[#f2fbfd]">
              On this one booking, your guest saves{" "}
              <span className="pbv-display font-bold text-[#4cc9d9]">{money(q.guestFee)}</span> by booking direct —
              and you keep the <span className="pbv-display font-bold text-[#ffe0a0]">{money(q.hostFee)}</span> the
              channel would have billed you. That&apos;s{" "}
              <span className="font-semibold">{money(q.guestFee + q.hostFee)}</span> of value that currently leaves
              the property on every stay like this one.
            </p>
            <button
              type="button"
              className="mt-3 w-full cursor-default rounded-full bg-gradient-to-r from-[#d99420] to-[#f2b134] px-5 py-2.5 text-sm font-semibold text-[#0b2a3d]"
              aria-disabled="true"
              title="Sample demo — no real booking is taken"
            >
              Book direct — {money(q.direct)} total →
            </button>
            <p className="mt-2 text-center text-[10px] text-[#eaf6f8]/45">
              Sample demo — this button takes no booking and no payment.
            </p>
          </div>
        )}

        <p className="mt-3 text-[11px] leading-relaxed text-[#fdf7ee]/55">
          <span className="font-semibold text-[#ffe0a0]">What&apos;s real and what isn&apos;t:</span> the villas,
          nightly rates, and cleaning fees are <span className="font-semibold">invented for this sample</span> — no
          real Poʻipū property&apos;s rates or availability appear here, and the tax line is a sample rate, not tax
          advice. The channel fees are the <span className="font-semibold">typical published</span> guest-service and
          host-commission ranges, quoted as typical, not as a claim about any one platform or booking.{" "}
          <span className="font-semibold text-[#ffe0a0]">The arithmetic is the real part</span> — run any rate you
          like through it and the shape doesn&apos;t change. That gap is what a direct-booking flow you own is worth.
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
  suffix,
}: {
  label: string;
  opts: number[];
  value: number;
  onChange: (n: number) => void;
  suffix: string;
}) {
  return (
    <div className="rounded-xl border border-[#eaf6f8]/14 bg-[#eaf6f8]/[0.05] p-3">
      <div className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[#fdf7ee]/55">{label}</div>
      <div className="flex gap-2">
        {opts.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={`flex-1 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
              value === o
                ? "border-[#f2b134]/70 bg-[#f2b134]/20 text-[#ffe0a0]"
                : "border-[#eaf6f8]/14 text-[#fdf7ee]/65 hover:border-[#f2b134]/40"
            }`}
          >
            {o}
            {suffix}
          </button>
        ))}
      </div>
    </div>
  );
}

function Line({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-0.5">
      <span className="text-[12px] text-[#fdf7ee]/60">{label}</span>
      <span className={`pbv-mono text-[12px] ${accent ? "text-[#ffe0a0]" : "text-[#fdf7ee]/85"}`}>{value}</span>
    </div>
  );
}
