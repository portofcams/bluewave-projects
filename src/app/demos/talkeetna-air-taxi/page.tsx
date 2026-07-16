import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import { AlpineShell, Emblem, ArtTile, TalkeetnaConditions, SITE, HUB_PATH, type TkaAccent } from "./_shared";

export const metadata: Metadata = {
  title: "Susitna Air — Denali Flightseeing & Glacier Landings from Talkeetna, with Live Flight Conditions (Sample Demo)",
  description:
    "A guest-facing sample for a Talkeetna flightseeing operator: Denali flightseeing, Ruth Glacier ski-plane landings, and Alaska Range tours, with a live 'flying today?' panel built on the Talkeetna (PATK) observation, a density-altitude read, and computed daylight. A clearly-labeled sample by BlueWave Projects on public geography and live public data — a fictional brand not affiliated with any real operator.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// "Susitna Air" is a DELIBERATELY FICTIONAL sample brand. Everything factual
// below — Denali, the Ruth and Kahiltna glaciers, the Alaska Range, PATK, the
// weather-dependence of mountain flying — is real and publicly verifiable. No
// real operator name, price, time, phone, or address appears. Public geography
// only (Talkeetna, Denali, Ruth Amphitheater, Kahiltna Glacier).

const BRAND = "Susitna Air";

type Item = { title: string; accent: TkaAccent; figure: "peak" | "plane" | "glacier" | "spruce" | "river" | "cabin"; blurb: string; tag: string };

const flights: Item[] = [
  {
    title: "The Denali flightseeing loop",
    accent: "ridge",
    figure: "peak",
    blurb:
      "Up the Susitna valley and into the Alaska Range — the south face of Denali, the Great Gorge of the Ruth, and glaciers running to the horizon. The classic first flight, no landing.",
    tag: "Flightseeing",
  },
  {
    title: "Glacier ski-plane landing",
    accent: "teal",
    figure: "glacier",
    blurb:
      "Ski-equipped, we set down on the Ruth Glacier and shut the engine off. Standing on a river of ice in the Don Sheldon Amphitheater, granite walls a mile over your head — the reason people come to Talkeetna.",
    tag: "Land on ice",
  },
  {
    title: "The Ruth Amphitheater",
    accent: "teal",
    figure: "river",
    blurb:
      "A longer loop deep into the Ruth — the Amphitheater, the Great Gorge deeper than the Grand Canyon, and the Sheldon Mountain House perched on its nunatak. Big air, big country.",
    tag: "Extended",
  },
  {
    title: "Denali summit flight",
    accent: "alpenglow",
    figure: "plane",
    blurb:
      "When the mountain is out and the air is right, the high circuit — around the 20,310-ft summit and the Kahiltna, where climbers stage for the West Buttress. Weather and altitude have to cooperate; we only go when they do.",
    tag: "Weather permitting",
  },
];

const safety = [
  { t: "The mountain makes the call", d: "Denali builds its own weather, and it changes fast. We fly when it's right and we don't when it isn't — a scrubbed flight beats a bad one, every time." },
  { t: "Real bush-flying weather", d: "Ceiling, visibility, and density altitude aren't trivia here — they decide whether a loaded ski plane climbs off a glacier. The panel on this page shows the same numbers the pilot is reading." },
  { t: "Leave no trace on the ice", d: "Glacier landings happen inside Denali National Park & Preserve. We pack out everything, stay on our sites, and leave the amphitheater the way we found it." },
];

const faq: { q: string; a: string }[] = [
  {
    q: "Will we actually fly, or get weathered out?",
    a: "Honestly, sometimes you'll get weathered out — Denali is 20,310 feet of self-made weather, and any Talkeetna operator who promises otherwise isn't being straight. What a good operator does is read it well, keep you posted, and rebook or refund cleanly when the mountain says no. The live panel on this page is exactly that read: the current Talkeetna observation, the density altitude, and the daylight, in plain sight.",
  },
  {
    q: "Is the conditions panel on this page real?",
    a: "Yes. It pulls the live observation for Talkeetna (PATK) from the National Weather Service — wind, visibility, sky, altimeter, temperature — and computes the density altitude against the field's 358-ft elevation, the number that governs a loaded ski plane's climb. Daylight is computed for Talkeetna. If the feed is unreachable, the panel shows a clearly-labeled sample, never presented as live.",
  },
  {
    q: "What's a glacier landing actually like?",
    a: "On skis, we touch down on the Ruth Glacier and shut the engine down. It goes silent. You step out onto packed snow with granite walls a mile overhead and the Great Gorge dropping away — no crowds, no sound but the wind. Twenty minutes or so on the ice, then wheels-up back to Talkeetna.",
  },
  {
    q: "When's the season?",
    a: "Roughly late spring through early fall for flightseeing and glacier landings, with the best light and the longest days around the summer solstice. The daylight tile on the panel tells you exactly how much you've got.",
  },
];

const quickFacts = [
  { v: "20,310 ft", l: "Denali", s: "the high one" },
  { v: "PATK", l: "Live flight read", s: "Talkeetna field" },
  { v: "Ski-plane", l: "Glacier landings", s: "on the Ruth" },
  { v: "Weather-first", l: "How we fly", s: "the mountain decides" },
];

export default function TalkeetnaAirPage() {
  return (
    <>
      <AlpineShell>
        <main className="min-h-screen text-[#10222e]">
          <Nav />
          <DemoTracking demo="talkeetna-air-taxi" />

          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#122a3a] via-[#1d4a56] to-[#0a1a26] text-[#eef7f7]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <radialGradient id="tka-hero-glow" cx="84%" cy="16%" r="46%">
                  <stop offset="0%" stopColor="#ffd9b0" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffd9b0" stopOpacity="0" />
                </radialGradient>
                <pattern id="tka-hero-grid" width="46" height="46" patternUnits="userSpaceOnUse">
                  <path d="M46 0H0V46" fill="none" stroke="#e7f1f2" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="1200" height="600" fill="url(#tka-hero-grid)" />
              <rect width="1200" height="600" fill="url(#tka-hero-glow)" />
              <path d="M-50 520 L250 300 L420 400 L620 250 L820 420 L1000 320 L1250 480 L1250 600 L-50 600 Z" fill="#0a1a26" opacity="0.34" />
              <path d="M620 250 L660 320 L636 332 L668 360 L572 360 Z" fill="#bfe6ea" opacity="0.3" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.12fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ffce6b]/45 bg-[#0a1a26]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffe0b0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff8a5c]" />
                    Talkeetna · Denali, Alaska
                  </div>
                  <h1 className="tka-display mb-5 max-w-2xl text-5xl font-bold leading-[1.02] sm:text-6xl">
                    Susitna <span className="text-[#ff8a5c]">Air</span>
                  </h1>
                  <div className="tka-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#eef7f7]/85">
                    Denali flightseeing and glacier ski-plane landings out of
                    Talkeetna — and the honesty to tell you, before you drive up,
                    whether the mountain&apos;s going to let us fly.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a href="#flights" className="rounded-full bg-gradient-to-r from-[#ff8a5c] to-[#ffce6b] px-8 py-3.5 text-center text-sm font-semibold text-[#0a1a26] shadow-[0_10px_30px_-10px_rgba(255,138,92,0.6)] transition-transform hover:-translate-y-0.5">
                      Fly the mountain →
                    </a>
                    <a href="#safety" className="rounded-full border border-[#eef7f7]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#eef7f7]/90 transition-colors hover:border-[#eef7f7]/70 hover:bg-[#eef7f7]/5">
                      How we fly
                    </a>
                  </div>
                </div>

                <div className="relative">
                  <TalkeetnaConditions />
                  <Emblem size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="tka-card p-5">
                  <div className="tka-display text-2xl font-bold text-[#e05f34] sm:text-[1.7rem]">{stat.v}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1d4a56]">{stat.l}</div>
                  <div className="mt-1 text-xs leading-relaxed text-[#6a8088]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* STORY */}
          <section className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="tka-card overflow-hidden p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="tka-eyebrow mb-3">Fly it right</p>
                  <h2 className="tka-display text-3xl font-bold leading-tight text-[#10222e] sm:text-4xl">
                    The mountain makes <span className="text-[#e05f34]">its own weather.</span>
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3a5560]">
                    <p>
                      Denali is high enough to build cloud and wind out of a clear
                      morning, and it changes by the hour. The good Talkeetna
                      operators aren&apos;t the ones who never cancel — they&apos;re
                      the ones who read it honestly and put you on the mountain
                      when it&apos;s right.
                    </p>
                    <p>
                      This sample concept shows how one of them could put that
                      honesty on the page: the live Talkeetna observation, the
                      density altitude the pilot is watching, and the daylight —
                      so a guest checking from the road already knows what kind of
                      day it is.
                    </p>
                  </div>
                </div>
                <ArtTile accent="ridge" figure="peak" label="Denali from the south" tall />
              </div>
            </div>
          </section>

          {/* FLIGHTS */}
          <section id="flights" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="tka-eyebrow mb-3">Into the range</p>
              <h2 className="tka-display text-4xl font-bold text-[#10222e] sm:text-5xl">
                The <span className="text-[#e05f34]">flights.</span>
              </h2>
              <div className="tka-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3a5560]">
                From a first look at the south face to shutting the engine off on a
                glacier — we go up when the mountain says yes.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {flights.map((it) => (
                <div key={it.title} className="tka-card flex flex-col overflow-hidden">
                  <ArtTile accent={it.accent} figure={it.figure} label={it.title} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="tka-display text-base font-semibold leading-tight text-[#10222e]">{it.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#1d4a56]/20 bg-[#1d4a56]/8 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#1d4a56]">
                        {it.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3a5560]">{it.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-8 max-w-3xl tka-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#6a8088]">
                <span className="font-semibold text-[#10222e]">Weather &amp; safety:</span> every flight is
                weather-dependent, and glacier landings happen inside Denali National Park &amp; Preserve. No
                pricing or schedule is shown on this sample — the live build would carry the operator&apos;s
                real aircraft, certifications, tours, and booking.
              </p>
            </div>
          </section>

          {/* SAFETY / HOW WE FLY */}
          <section id="safety" className="relative overflow-hidden bg-gradient-to-br from-[#122a3a] via-[#1d4a56] to-[#0a1a26] py-20 text-[#eef7f7]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 300 L200 180 L360 250 L560 150 L760 260 L960 190 L1250 300 L1250 400 L-50 400 Z" fill="#0a1a26" opacity="0.4" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="mb-10 text-center">
                <p className="tka-eyebrow mb-3 !text-[#ffce6b]">How we fly</p>
                <h2 className="tka-display text-3xl font-bold sm:text-4xl">
                  A scrubbed flight <span className="text-[#ffce6b]">beats a bad one.</span>
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {safety.map((m) => (
                  <div key={m.t} className="rounded-2xl border border-[#e7f1f2]/15 bg-[#0a1a26]/30 p-6 backdrop-blur-sm">
                    <h3 className="tka-display mb-2 text-lg font-semibold text-[#eef7f7]">{m.t}</h3>
                    <p className="text-sm leading-relaxed text-[#eef7f7]/80">{m.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-16">
            <div className="mb-10 text-center">
              <p className="tka-eyebrow mb-3">Frequently asked</p>
              <h2 className="tka-display text-4xl font-bold text-[#10222e] sm:text-5xl">
                Before you <span className="text-[#e05f34]">drive up.</span>
              </h2>
              <div className="tka-rule" />
            </div>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="tka-card p-6">
                  <h3 className="tka-display mb-2 text-base font-semibold leading-snug text-[#10222e]">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#3a5560]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INQUIRY CTA */}
          <section id="book" className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#ffce6b]/40 bg-gradient-to-br from-[#122a3a] via-[#1d4a56] to-[#0a1a26] p-10 text-center text-[#eef7f7] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="tka-display mb-4 text-3xl font-bold sm:text-4xl">
                Reserve a <span className="text-[#ffce6b]">flight.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#eef7f7]/85">
                Tell us the flight and your day — we&apos;ll watch the mountain and
                get you up when it&apos;s right. On the live build this is where the
                operator&apos;s real booking goes.
              </p>
              <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                {[
                  { l: "Flight", ph: "Glacier landing" },
                  { l: "Day", ph: "Jul 2026, morning" },
                  { l: "Party", ph: "2 passengers" },
                  { l: "Flexible?", ph: "Yes, for weather" },
                ].map((f) => (
                  <div key={f.l} className="rounded-2xl border border-[#e7f1f2]/15 bg-[#0a1a26]/30 p-3 text-left backdrop-blur-sm">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a8dbe4]/70">{f.l}</div>
                    <div className="mt-1 text-sm text-[#eef7f7]/80">{f.ph}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <button type="button" className="cursor-default rounded-full bg-gradient-to-r from-[#ff8a5c] to-[#ffce6b] px-8 py-3.5 text-sm font-semibold text-[#0a1a26] shadow-[0_10px_30px_-10px_rgba(255,138,92,0.6)]">
                  Request a flight →
                </button>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#eef7f7]/50">
                This is a sample inquiry mockup, not a live form — it doesn&apos;t
                submit anywhere. The live build wires up the operator&apos;s real
                booking and contact details.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="tka-card px-5 py-4 text-center text-xs leading-relaxed text-[#6a8088]">
              <p>
                This is a <span className="font-semibold text-[#10222e]">sample marketing &amp; inquiry concept</span>{" "}
                built by{" "}
                <a href={SITE} className="font-semibold text-[#e05f34] underline underline-offset-2 hover:text-[#1d4a56]">BlueWave Projects</a>.{" "}
                <span className="font-semibold text-[#10222e]">&quot;{BRAND}&quot; is a fictional sample brand</span>{" "}
                — not a real business, and not affiliated with or endorsed by any actual Talkeetna operator.
                All imagery is designed sample illustration, not photography. No prices, schedules, phone
                numbers, or addresses are shown, because none are real; Denali, the Ruth and Kahiltna
                glaciers, the Alaska Range, PATK, and the weather-dependence of mountain flying are real and
                publicly verifiable. The &quot;Flying today?&quot; panel pulls the live Talkeetna (PATK)
                observation from the National Weather Service and computes density altitude against the
                field&apos;s 358-ft elevation; daylight is computed. If the feed is unreachable it shows a
                clearly-labeled sample, never presented as live. It is a planning aid, never a substitute for
                an official preflight briefing. Always confirm current flights, conditions, and safety with a
                real, licensed operator before you book or fly.
              </p>
            </div>
          </div>
        </main>
      </AlpineShell>
      <div className="bg-[#0a1a26] text-[#eef7f7]">
        <Footer />
      </div>
    </>
  );
}
