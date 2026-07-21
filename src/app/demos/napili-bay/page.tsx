import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import { BayShell, Emblem, ArtTile, NapiliConditions, SITE, HUB_PATH, type NpbAccent, type NpbPhoto } from "./_shared";

export const metadata: Metadata = {
  title: "Napili Bay Beach Club — Snorkel, Sea & Sunset on West Maui, with a Live Bay Report (Sample Demo)",
  description:
    "A guest-facing sample for a West Maui beachfront concept on Napili Bay: snorkeling the leeward reef points, honu on the flats, golden sunsets, and a live bay report built on the PacIOOS SWAN Maui model, NOAA tide and water temperature, wind, and UV. A clearly-labeled sample by BlueWave Projects on public geography and live public data — a fictional brand not affiliated with any real property.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// "Napili Bay Beach Club" is a DELIBERATELY FICTIONAL sample brand. Everything
// factual below — the leeward bay, the reef points, honu, the west-facing
// sunset, the reef-safe sunscreen law — is real and publicly verifiable. No real
// property name, price, room, phone, or address appears. Landmarks only (Napili
// Bay, Napili Point, Honokeana, Kapalua).

const BRAND = "Napili Bay Beach Club";

type Item = { title: string; accent: NpbAccent; figure: "sunset" | "turtle" | "palm" | "reef" | "wave" | "cottage"; blurb: string; tag: string };

// Real, openly-licensed West Maui / Hawaii photos keyed by tile title.
const NPB_PHOTOS: Record<string, NpbPhoto> = {
  "Snorkel the reef points": { src: "/demos/napili-bay/hawaii-coral-reef.webp", credit: "Andy Collins / NOAA · Public domain" },
  "Honu on the flats": { src: "/demos/napili-bay/honu-reef.webp", credit: "Brocken Inaglory · CC BY-SA 3.0" },
  "A crescent to yourself": { src: "/demos/napili-bay/napili-bay-crescent.webp", credit: "Cmholm · CC BY-SA 3.0" },
  "The sunset off the bay": { src: "/demos/napili-bay/kaanapali-sunset.webp", credit: "dronepicr · CC BY 2.0" },
};

const experiences: Item[] = [
  {
    title: "Snorkel the reef points",
    accent: "lagoon",
    figure: "reef",
    blurb:
      "The rocky points at either end of the bay hold the reef — parrotfish, tang, and coral in easy, shallow water. Walk in off the sand; no boat needed. Clearest on a calm morning before the trades fill in.",
    tag: "Right off the sand",
  },
  {
    title: "Honu on the flats",
    accent: "palm",
    figure: "turtle",
    blurb:
      "Green sea turtles graze the reef and rest in the shallows. We keep ten feet, in the water and on the beach — watch, never chase — and the bay rewards you for it almost every day.",
    tag: "All ages",
  },
  {
    title: "A crescent to yourself",
    accent: "aqua",
    figure: "wave",
    blurb:
      "One of West Maui's great swimming beaches — soft sand, leeward calm, and gentle enough for kids on most summer days. The live bay report tells you when it's glass and when to wait for the trades to ease.",
    tag: "Beach day",
  },
  {
    title: "The sunset off the bay",
    accent: "gold",
    figure: "sunset",
    blurb:
      "Napili faces west, and the sun drops straight into the channel between Molokaʻi and Lānaʻi. We put the real sunset time on the page so you never miss the ten minutes that matter.",
    tag: "Every evening",
  },
];

const malama = [
  { t: "Reef-safe only", d: "Hawaii restricts the sale of sunscreen with oxybenzone and octinoxate. Mineral sunscreen only in this bay — the reef that makes the snorkeling good is the one it protects." },
  { t: "Ten feet from honu", d: "Green sea turtles are protected. NOAA asks everyone to stay at least ten feet away, in the water and on the sand. We watch, we don't touch, we never chase." },
  { t: "Mālama i ke kai", d: "Care for the ocean. Nothing standing on coral, nothing left behind, nothing taken but pictures and a good sunset." },
];

const faq: { q: string; a: string }[] = [
  {
    q: "Is the bay always calm enough to snorkel?",
    a: "Most summer mornings, yes — Napili is leeward and protected, and it's one of the gentlest swimming bays on West Maui. But it's still the ocean: a north or west swell or strong trades can put chop and a shorebreak in the bay. That's exactly what the live report on this page is for — it reads the nearshore model, the tide, and the wind so you know before you walk down.",
  },
  {
    q: "Is the bay report on this page real?",
    a: "Yes. The in-the-bay reading is the PacIOOS SWAN Maui nearshore wave model at Napili (a modeled nowcast — there's no nearshore buoy on West Maui's leeward side). Water temperature and tide are live NOAA readings for Kahului; wind and air are the latest Kahului (PHOG) observation; UV is the EPA hourly forecast; sunrise and sunset are computed. Water clarity has no public live feed, so we don't invent a number.",
  },
  {
    q: "When's the best time to snorkel?",
    a: "Early. The bay is usually clearest and calmest in the morning before the trade winds fill in and stir it up. Turtles are around most of the day, but the water — and the visibility — is at its best not long after sunrise.",
  },
  {
    q: "Where exactly is Napili Bay?",
    a: "West Maui, between Kapalua and Kahana, just north of Honokeana. A crescent of sand facing west across the channel toward Molokaʻi and Lānaʻi — which is why the sunsets are what they are.",
  },
];

const quickFacts = [
  { v: "Napili Bay", l: "Leeward snorkel", s: "reef off the points" },
  { v: "SWAN Maui", l: "Live bay read", s: "modeled nowcast" },
  { v: "Faces west", l: "Sunset every night", s: "into the channel" },
  { v: "Reef-safe", l: "How we run", s: "mālama i ke kai" },
];

export default function NapiliBayPage() {
  return (
    <>
      <BayShell>
        <main className="min-h-screen text-[#123b3e]">
          <Nav />
          <DemoTracking demo="napili-bay" />

          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0a4f57] via-[#17a2a6] to-[#06303a] text-[#f2fbf9]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <radialGradient id="npb-hero-sun" cx="82%" cy="18%" r="46%">
                  <stop offset="0%" stopColor="#ffe6a8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffe6a8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#npb-hero-sun)" />
              <path d="M-50 480 C 300 452, 700 520, 1250 470" stroke="#e6f6f2" strokeWidth="1.4" fill="none" strokeDasharray="3 10" />
              <path d="M-50 520 C 300 492, 700 560, 1250 508" stroke="#e6f6f2" strokeWidth="1" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ffbf47]/45 bg-[#06303a]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffe0a0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff6f61]" />
                    Napili · West Maui, Hawaiʻi
                  </div>
                  <h1 className="npb-display mb-5 max-w-2xl text-5xl font-bold leading-[1.02] sm:text-6xl">
                    Napili Bay <span className="text-[#ffbf47]">Beach Club</span>
                  </h1>
                  <div className="npb-rule !mx-0 mb-6" />
                  <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#f2fbf9]/85">
                    A leeward crescent of sand, a reef full of honu off the points,
                    and a sunset straight into the channel — with a live read on the
                    bay before you walk down to the water.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a href="#bay" className="rounded-full bg-gradient-to-r from-[#ff6f61] to-[#ffbf47] px-8 py-3.5 text-center text-sm font-semibold text-[#06303a] shadow-[0_10px_30px_-10px_rgba(255,111,97,0.6)] transition-transform hover:-translate-y-0.5">
                      Come to the bay →
                    </a>
                    <a href="#malama" className="rounded-full border border-[#f2fbf9]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f2fbf9]/90 transition-colors hover:border-[#f2fbf9]/70 hover:bg-[#f2fbf9]/5">
                      How we mālama
                    </a>
                  </div>
                </div>

                <div className="relative">
                  <NapiliConditions />
                  <Emblem size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="npb-card p-5">
                  <div className="npb-display text-2xl font-bold text-[#e2503f] sm:text-[1.7rem]">{stat.v}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#17a2a6]">{stat.l}</div>
                  <div className="mt-1 text-xs leading-relaxed text-[#6f8280]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* STORY */}
          <section className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="npb-card overflow-hidden p-8 sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="npb-eyebrow mb-3">The leeward side</p>
                  <h2 className="npb-display text-3xl font-bold leading-tight text-[#123b3e] sm:text-4xl">
                    A bay that mostly says <span className="text-[#e2503f]">yes.</span>
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3f5f60]">
                    <p>
                      Napili sits on West Maui&apos;s leeward shore, tucked out of
                      the big north swells and the worst of the trades. That&apos;s
                      why the snorkeling is so forgiving, why families come back for
                      generations, and why the sunset is the event of the day.
                    </p>
                    <p>
                      This sample concept shows how a small beachfront operator
                      could put the bay itself on the page — the live nearshore
                      model, the tide over the reef, the real sunset time — so a
                      guest knows exactly when to grab a mask and when to grab a
                      chair.
                    </p>
                  </div>
                </div>
                <ArtTile accent="gold" figure="sunset" label="Sunset into the channel" tall photo={{ src: "/demos/napili-bay/maui-sunset.webp", credit: "Bernard Spragg · CC0" }} />
              </div>
            </div>
          </section>

          {/* THE BAY */}
          <section id="bay" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="npb-eyebrow mb-3">In the water</p>
              <h2 className="npb-display text-4xl font-bold text-[#123b3e] sm:text-5xl">
                The <span className="text-[#e2503f]">bay.</span>
              </h2>
              <div className="npb-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3f5f60]">
                Snorkel the reef, meet the honu, take the crescent, stay for the
                sunset — all in one leeward bay.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {experiences.map((it) => (
                <div key={it.title} className="npb-card flex flex-col overflow-hidden">
                  <ArtTile accent={it.accent} figure={it.figure} label={it.title} photo={NPB_PHOTOS[it.title]} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="npb-display text-base font-semibold leading-tight text-[#123b3e]">{it.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#17a2a6]/20 bg-[#17a2a6]/8 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#17a2a6]">
                        {it.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3f5f60]">{it.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-8 max-w-3xl npb-card p-5 text-center">
              <p className="text-xs leading-relaxed text-[#6f8280]">
                <span className="font-semibold text-[#123b3e]">A note on the water:</span> Napili is
                leeward and usually gentle, but it&apos;s still open ocean — swell and wind can put chop and
                a shorebreak in the bay. No pricing, rooms, or schedule is shown on this sample; the live
                build would carry the operator&apos;s real offering and booking.
              </p>
            </div>
          </section>

          {/* MĀLAMA */}
          <section id="malama" className="relative overflow-hidden bg-gradient-to-br from-[#0a4f57] via-[#17a2a6] to-[#06303a] py-20 text-[#f2fbf9]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#e6f6f2" strokeWidth="1.2" fill="none" strokeDasharray="3 10" />
              <path d="M-50 290 C 300 255, 700 320, 1250 265" stroke="#e6f6f2" strokeWidth="0.8" fill="none" strokeDasharray="2 9" opacity="0.6" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="mb-10 text-center">
                <p className="npb-eyebrow mb-3 !text-[#ffbf47]">Mālama i ke kai</p>
                <h2 className="npb-display text-3xl font-bold sm:text-4xl">
                  The reef makes the bay. <span className="text-[#ffbf47]">We look after it.</span>
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {malama.map((m) => (
                  <div key={m.t} className="rounded-2xl border border-[#e6f6f2]/15 bg-[#06303a]/30 p-6 backdrop-blur-sm">
                    <h3 className="npb-display mb-2 text-lg font-semibold text-[#f2fbf9]">{m.t}</h3>
                    <p className="text-sm leading-relaxed text-[#f2fbf9]/80">{m.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-16">
            <div className="mb-10 text-center">
              <p className="npb-eyebrow mb-3">Frequently asked</p>
              <h2 className="npb-display text-4xl font-bold text-[#123b3e] sm:text-5xl">
                Before you <span className="text-[#e2503f]">walk down.</span>
              </h2>
              <div className="npb-rule" />
            </div>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="npb-card p-6">
                  <h3 className="npb-display mb-2 text-base font-semibold leading-snug text-[#123b3e]">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#3f5f60]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INQUIRY CTA */}
          <section id="stay" className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#ffbf47]/40 bg-gradient-to-br from-[#0a4f57] via-[#17a2a6] to-[#06303a] p-10 text-center text-[#f2fbf9] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="npb-display mb-4 text-3xl font-bold sm:text-4xl">
                Plan a day at the <span className="text-[#ffbf47]">bay.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-[#f2fbf9]/85">
                Tell us your day and your crew — we&apos;ll point you to the calm
                morning and the good tide. On the live build this is where the
                operator&apos;s real booking goes.
              </p>
              <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                {[
                  { l: "Doing", ph: "Snorkel + beach day" },
                  { l: "Day", ph: "Jul 2026, morning" },
                  { l: "Crew", ph: "2 adults, 2 kids" },
                  { l: "Sunset?", ph: "Yes, stay for it" },
                ].map((f) => (
                  <div key={f.l} className="rounded-2xl border border-[#e6f6f2]/15 bg-[#06303a]/30 p-3 text-left backdrop-blur-sm">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bff0ea]/70">{f.l}</div>
                    <div className="mt-1 text-sm text-[#f2fbf9]/80">{f.ph}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <button type="button" className="cursor-default rounded-full bg-gradient-to-r from-[#ff6f61] to-[#ffbf47] px-8 py-3.5 text-sm font-semibold text-[#06303a] shadow-[0_10px_30px_-10px_rgba(255,111,97,0.6)]">
                  Plan a bay day →
                </button>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-[#f2fbf9]/50">
                This is a sample inquiry mockup, not a live form — it doesn&apos;t
                submit anywhere. The live build wires up the operator&apos;s real
                booking and contact details.
              </p>
            </div>
          </section>

          {/* SAMPLE NOTE */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="npb-card px-5 py-4 text-center text-xs leading-relaxed text-[#6f8280]">
              <p>
                This is a <span className="font-semibold text-[#123b3e]">sample marketing &amp; inquiry concept</span>{" "}
                built by{" "}
                <a href={SITE} className="font-semibold text-[#e2503f] underline underline-offset-2 hover:text-[#17a2a6]">BlueWave Projects</a>.{" "}
                <span className="font-semibold text-[#123b3e]">&quot;{BRAND}&quot; is a fictional sample brand</span>{" "}
                — not a real business, and not affiliated with or endorsed by any actual Napili or West Maui
                property. The scenery photographs are real, openly-licensed images of West Maui and Hawaiian marine life (from Wikimedia Commons and NOAA, credited on each), and none shows a real property or its branding; the round emblem is a designed sample mark. No prices, rooms,
                phone numbers, or addresses are shown, because none are real; the leeward bay, the reef
                points, honu, the west-facing sunset, and the reef-safe sunscreen law are real and publicly
                verifiable. The &quot;Snorkel &amp; sea&quot; panel pulls live public data — the PacIOOS SWAN
                Maui nearshore model (a modeled nowcast, not a buoy), NOAA water temperature and tide for
                Kahului, the latest Kahului (PHOG) observation, and the EPA hourly UV forecast; sunrise and
                sunset are computed. Water clarity has no public live feed, so none is shown or invented. It
                is a planning aid, never a substitute for a lifeguard. Always confirm current conditions and
                offerings with a real operator before you travel.
              </p>
            </div>
          </div>
        </main>
      </BayShell>
      <div className="bg-[#06303a] text-[#f2fbf9]">
        <Footer />
      </div>
    </>
  );
}
