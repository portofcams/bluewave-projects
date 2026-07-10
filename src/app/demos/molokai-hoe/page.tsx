import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";
import {
  ChannelShell,
  Emblem,
  ArtTile,
  ChannelConditions,
  SITE,
  HUB_PATH,
  type KiAccent,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap.
export const metadata: Metadata = {
  title: "Molokaʻi Hoe & Nā Wāhine O Ke Kai — Honoring the Kaʻiwi Channel Crossing (Sample Tribute Hub)",
  description:
    "An independent, unofficial tribute hub honoring the Molokaʻi Hoe and Nā Wāhine O Ke Kai — the world-championship long-distance outrigger canoe (waʻa) races across the Kaʻiwi Channel, from Molokaʻi to Waikīkī. The tradition, the crossing, and a live channel-conditions read offered in mālama for the paddling community. A sample build by BlueWave Projects; not affiliated with or endorsed by the races or their organizers.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// ---------------------------------------------------------------------------
// GROUNDED DATA (workflow research + adversarial verify, 2026-07-09)
// ---------------------------------------------------------------------------
// A REVERENT, respect-first tribute hub honoring real, living Native Hawaiian
// traditions — using the real event names, kept clearly INDEPENDENT and
// UNOFFICIAL (never implying endorsement/affiliation). 2026 dates are published
// on the official sites. No growth-hack CTAs, no funnel, no merch — the studio
// stays quiet and in the background. Spelling: "Kaʻiwi" used site-wide (the
// variant "Kaiwi" also appears; footnoted). Nā Wāhine O Ke Kai held as an equal.

const OFFICIAL = {
  hoe: "https://www.molokaihoe.com/",
  wahine: "https://www.nawahineokekai.com/",
  ohcra: "https://ohcra.com/",
};

type Item = {
  title: string;
  accent: KiAccent;
  figure: "canoe" | "paddle" | "channel" | "islands" | "sunrise" | "sea";
  blurb: string;
  tag: string;
};

const crossing: Item[] = [
  {
    title: "The waʻa",
    accent: "koa",
    figure: "canoe",
    blurb:
      "A six-seat outrigger canoe — koa in the beginning, most often fiberglass today — roughly forty feet of hull steadied by the ama, its outrigger float, linked by two ʻiako. In Hawaiian tradition the waʻa is not equipment; it is the vessel that carried the ancestors across the Pacific.",
    tag: "The canoe",
  },
  {
    title: "Water changes mid-channel",
    accent: "channel",
    figure: "channel",
    blurb:
      "Crews carry more paddlers than a canoe can hold. Every twenty to thirty minutes, fresh paddlers slip into the open ocean ahead of the hull, the canoe glides over them, and the tired roll out to be gathered by the escort boat — a rhythm kept up at speed, miles from any shore.",
    tag: "The exchange",
  },
  {
    title: "Reading the ocean",
    accent: "steel",
    figure: "paddle",
    blurb:
      "The steersman's craft is everything: angling the hull to catch and link the trade-wind swells, chasing the downwind run when wind and swell align, then finding a way through the shifting water in the lee of Oʻahu on the long approach to Diamond Head.",
    tag: "The steersman",
  },
  {
    title: "The crews",
    accent: "gold",
    figure: "islands",
    blurb:
      "More than a hundred crews and well over a thousand paddlers make the crossing in a given year — from Hawaiʻi, Tahiti, the mainland, Australia, Aotearoa, and Japan. A finish is regarded, worldwide, as a crowning achievement of the sport.",
    tag: "The community",
  },
];

const faq: { q: string; a: string }[] = [
  {
    q: "What are the Molokaʻi Hoe and Nā Wāhine O Ke Kai?",
    a: "They are the world-championship long-distance outrigger canoe races across the Kaʻiwi Channel, from Hale O Lono Harbor on Molokaʻi to Waikīkī, Oʻahu — roughly forty-one miles of open ocean. The Molokaʻi Hoe is the men's race (first held in 1952); Nā Wāhine O Ke Kai, \"The Women of the Sea,\" is the women's race (first held in 1979). Both are conducted by the Oʻahu Hawaiian Canoe Racing Association (OHCRA).",
  },
  {
    q: "When are the 2026 crossings?",
    a: "Per the official race sites: Nā Wāhine O Ke Kai is Sunday, September 27, 2026, and the Molokaʻi Hoe is Sunday, October 11, 2026. Dates and details are the organizers' to set — please reconfirm at molokaihoe.com and nawahineokekai.com before race week.",
  },
  {
    q: "What is the live channel panel for?",
    a: "It's offered as a service to the paddling community — the wind and swell that shape the crossing, and the tide on the Oʻahu side. Swell is the PacIOOS model at the channel mouth; wind is the live Honolulu observation; tide and water temperature are live NOAA readings for Honolulu (there is no active gauge on Molokaʻi). It is informational only, never a substitute for official NWS/Coast Guard forecasts or the race's own water-safety officials.",
  },
  {
    q: "Is this an official race site?",
    a: "No. This is an independent, unofficial tribute hub built by BlueWave Projects to honor the tradition — not affiliated with or endorsed by the races, OHCRA, or any club. For registration, schedules, results, and anything official, please go to the organizers' own sites.",
  },
];

const quickFacts = [
  { v: "Sept 27, 2026", l: "Nā Wāhine O Ke Kai", s: "the women's crossing" },
  { v: "Oct 11, 2026", l: "Molokaʻi Hoe", s: "the men's crossing" },
  { v: "Hale O Lono", l: "The start", s: "west Molokaʻi" },
  { v: "~41 miles", l: "The Kaʻiwi Channel", s: "Molokaʻi to Waikīkī" },
];

export default function MolokaiHoePage() {
  return (
    <>
      <ChannelShell>
        <main className="min-h-screen text-[#10262f]">
          <Nav />
          <DemoTracking demo="molokai-hoe" />

          {/* HERO */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0c2e42] via-[#14506e] to-[#071d2e] text-[#f4f8f6]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 430 C 300 400, 700 470, 1250 420" stroke="#cfe0e6" strokeWidth="1.2" fill="none" opacity="0.5" />
              <path d="M-50 470 C 300 440, 700 510, 1250 460" stroke="#e9b24a" strokeWidth="1" fill="none" opacity="0.35" strokeDasharray="4 8" />
              {/* two island silhouettes across the channel */}
              <path d="M-50 480 C 120 452, 300 458, 420 480 Z" fill="#071d2e" opacity="0.4" />
              <path d="M760 480 C 900 452, 1120 456, 1250 480 Z" fill="#071d2e" opacity="0.4" />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e9b24a]/45 bg-[#071d2e]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f2cf8f]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e9b24a]" />
                    Honoring the Kaʻiwi Channel crossing
                  </div>
                  <h1 className="kai-display mb-5 max-w-2xl text-[2.7rem] font-bold leading-[1.05] sm:text-6xl">
                    Molokaʻi Hoe &amp;{" "}
                    <span className="text-[#e9b24a]">Nā Wāhine O Ke Kai.</span>
                  </h1>
                  <div className="kai-rule !mx-0 mb-6" />
                  <p className="mb-4 max-w-xl text-lg leading-relaxed text-[#f4f8f6]/85">
                    The world-championship outrigger canoe races across the
                    Kaʻiwi Channel — from Molokaʻi to Waikīkī, in the waʻa that
                    carried the ancestors. A tribute to the tradition, the ocean,
                    and the paddlers who honor both.
                  </p>
                  <p className="mb-8 max-w-xl kai-mono text-[13px] text-[#cfe0e6]/70">
                    He waʻa he moku, he moku he waʻa — the canoe is an island, the island is a canoe.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a href="#races" className="rounded-full bg-gradient-to-r from-[#e9b24a] to-[#c98f2f] px-8 py-3.5 text-center text-sm font-semibold text-[#071d2e] shadow-[0_10px_30px_-10px_rgba(233,178,74,0.5)] transition-transform hover:-translate-y-0.5">
                      The two races →
                    </a>
                    <a href="#crossing" className="rounded-full border border-[#f4f8f6]/35 px-8 py-3.5 text-center text-sm font-semibold text-[#f4f8f6]/90 transition-colors hover:border-[#f4f8f6]/70 hover:bg-[#f4f8f6]/5">
                      The crossing
                    </a>
                  </div>
                </div>

                {/* LIVE CONDITIONS — offered in mālama */}
                <div className="relative">
                  <ChannelConditions />
                  <Emblem size={100} className="absolute -bottom-8 -left-7 hidden sm:inline-flex" />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK FACTS */}
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((stat) => (
                <div key={stat.l} className="kai-card p-5">
                  <div className="kai-display text-2xl font-bold text-[#6b4423] sm:text-[1.7rem]">{stat.v}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#14506e]">{stat.l}</div>
                  <div className="mt-1 text-xs leading-relaxed text-[#6a7d82]">{stat.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* THE TWO RACES — held equal */}
          <section id="races" className="mx-auto max-w-6xl px-6 pb-4 pt-4">
            <div className="mb-10 text-center">
              <p className="kai-eyebrow mb-3">Two crossings, one channel</p>
              <h2 className="kai-display text-4xl font-bold text-[#10262f] sm:text-5xl">
                The <span className="text-[#6b4423]">races.</span>
              </h2>
              <div className="kai-rule" />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="kai-card overflow-hidden">
                <ArtTile accent="channel" figure="canoe" label="Molokaʻi Hoe · since 1952" className="rounded-b-none border-0" tall />
                <div className="p-6 sm:p-8">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="kai-display text-2xl font-bold text-[#10262f]">Molokaʻi Hoe</h3>
                    <span className="kai-mono text-[13px] text-[#c98f2f]">Oct 11, 2026</span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#3a555f]">
                    The men&apos;s crossing, first paddled on October 12, 1952,
                    when three koa canoes launched from Molokaʻi — the world&apos;s
                    first long-distance outrigger canoe race. Started by Albert
                    &quot;Toots&quot; Minvielle, it has grown into the most
                    prestigious race in the sport, won in recent years by dynasties
                    like the Outrigger Canoe Club and Tahiti&apos;s Shell Vaʻa and
                    Team OPT.
                  </p>
                </div>
              </div>
              <div className="kai-card overflow-hidden">
                <ArtTile accent="gold" figure="paddle" label="Nā Wāhine O Ke Kai · since 1979" className="rounded-b-none border-0" tall />
                <div className="p-6 sm:p-8">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="kai-display text-2xl font-bold text-[#10262f]">Nā Wāhine O Ke Kai</h3>
                    <span className="kai-mono text-[13px] text-[#c98f2f]">Sept 27, 2026</span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#3a555f]">
                    &quot;The Women of the Sea&quot; — the women&apos;s crossing,
                    first held October 8, 1979 with seventeen crews. It was born
                    after women paddlers made an unofficial crossing in 1975 and
                    proved the Kaʻiwi was theirs to cross too. Named by Puna Kalama
                    Dawson, with Mary Winchester as its first president and Hannie
                    Anderson as race director — a story of mana wahine, and an
                    equal of the Molokaʻi Hoe in every way.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* THE CROSSING */}
          <section id="crossing" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-12 text-center">
              <p className="kai-eyebrow mb-3">Forty-one miles of open ocean</p>
              <h2 className="kai-display text-4xl font-bold text-[#10262f] sm:text-5xl">
                The <span className="text-[#6b4423]">crossing.</span>
              </h2>
              <div className="kai-rule" />
              <p className="mx-auto mt-4 max-w-2xl text-[#3a555f]">
                What the race asks of a crew, out where there is no shore — only
                the wind, the swell, and each other.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {crossing.map((it) => (
                <div key={it.title} className="kai-card flex flex-col overflow-hidden">
                  <ArtTile accent={it.accent} figure={it.figure} label={it.title} className="rounded-b-none border-0" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="kai-display text-base font-semibold leading-tight text-[#10262f]">{it.title}</h3>
                      <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#14506e]/20 bg-[#14506e]/8 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#14506e]">
                        {it.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#3a555f]">{it.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THE CHANNEL — reverent */}
          <section id="channel" className="relative overflow-hidden bg-gradient-to-br from-[#0c2e42] via-[#14506e] to-[#071d2e] py-20 text-[#f4f8f6]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M-50 240 C 300 200, 700 280, 1250 220" stroke="#cfe0e6" strokeWidth="1.2" fill="none" strokeDasharray="4 9" />
            </svg>
            <div className="relative mx-auto max-w-5xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                <div className="flex justify-center lg:justify-start">
                  <ArtTile accent="deep" figure="channel" label="The Kaʻiwi Channel" tall className="w-full max-w-md sm:h-[340px]" />
                </div>
                <div>
                  <p className="kai-eyebrow mb-3 !text-[#f2cf8f]">Kaʻiwi</p>
                  <h2 className="kai-display mb-4 text-3xl font-bold sm:text-4xl">
                    The channel that <span className="text-[#e9b24a]">asks for humility.</span>
                  </h2>
                  <div className="space-y-4 text-[#f4f8f6]/85">
                    <p className="leading-relaxed">
                      Kaʻiwi means &quot;the bone.&quot; The channel between
                      Molokaʻi and Oʻahu runs some twenty-six miles across and more
                      than two thousand feet deep, with no land to soften the open
                      ocean. The trade winds and swell funnel through it, and where
                      wind, swell, and current meet, the sea can turn to what
                      paddlers call the washing machine.
                    </p>
                    <p className="leading-relaxed">
                      It is beauty and power in the same water — a channel that can
                      give a crew the ride of their lives, and one that has always
                      demanded respect. Crews cross it not to conquer the ocean, but
                      to honor it, and to arrive humbled and grateful on the far
                      shore.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TRADITION & COMMUNITY */}
          <section id="tradition" className="mx-auto max-w-6xl px-6 py-16">
            <div className="kai-card overflow-hidden p-8 sm:p-10">
              <div className="mb-8 max-w-3xl">
                <p className="kai-eyebrow mb-3">Mālama · kuleana · laulima</p>
                <h2 className="kai-display text-3xl font-bold leading-tight text-[#10262f] sm:text-4xl">
                  A tradition carried by{" "}
                  <span className="text-[#6b4423]">many hands.</span>
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-[#3a555f]">
                  These crossings belong to a community, not to any one paddler —
                  the clubs and ʻohana who prepare all season, the escort crews who
                  shadow every canoe, the water-safety officials who keep the
                  channel watched, and the people of Molokaʻi who host the start and
                  bless the canoes at Hale O Lono. The races are stewarded by the
                  Oʻahu Hawaiian Canoe Racing Association, whose work gives back to
                  the island communities that carry the tradition forward.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  { t: "The waʻa lineage", d: "From koa canoes to today's hulls, the racing waʻa descends from the voyaging canoes — the same seafaring tradition rekindled by Hōkūleʻa and the Hawaiian Renaissance." },
                  { t: "Molokaʻi as host", d: "The crossing begins on Molokaʻi, whose people and shoreline are stewards of the tradition — honored as host, never as backdrop." },
                  { t: "Around the Pacific", d: "Crews come from Hawaiʻi, Tahiti, the mainland, Australia, Aotearoa, and Japan — a gathering of the world's paddling ʻohana on this one channel." },
                ].map((v) => (
                  <div key={v.t} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#e9b24a] to-[#8a5a30]" aria-hidden="true" />
                    <div>
                      <h3 className="kai-display mb-1 text-[15px] font-semibold leading-snug text-[#10262f]">{v.t}</h3>
                      <p className="text-[13px] leading-relaxed text-[#3a555f]">{v.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-4">
            <div className="mb-10 text-center">
              <p className="kai-eyebrow mb-3">Questions</p>
              <h2 className="kai-display text-4xl font-bold text-[#10262f] sm:text-5xl">
                About the <span className="text-[#6b4423]">crossings.</span>
              </h2>
              <div className="kai-rule" />
            </div>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="kai-card p-6">
                  <h3 className="kai-display mb-2 text-base font-semibold leading-snug text-[#10262f]">{f.q}</h3>
                  <p className="text-sm leading-relaxed text-[#3a555f]">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FOLLOW — points to official sites, no funnel */}
          <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#e9b24a]/40 bg-gradient-to-br from-[#0c2e42] via-[#14506e] to-[#071d2e] p-10 text-center text-[#f4f8f6] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <Emblem size={88} className="mx-auto mb-6" />
              <h2 className="kai-display mb-4 text-3xl font-bold sm:text-4xl">
                Follow the crossings at <span className="text-[#e9b24a]">the source.</span>
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-[#f4f8f6]/85">
                For the schedule, registration, results, and everything official,
                go to the organizers&apos; own sites. This hub only hopes to help
                people find and honor the tradition.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={OFFICIAL.hoe} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#f4f8f6]/35 px-6 py-3 text-sm font-semibold text-[#f4f8f6]/90 transition-colors hover:border-[#f4f8f6]/70">
                  molokaihoe.com
                </a>
                <a href={OFFICIAL.wahine} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#f4f8f6]/35 px-6 py-3 text-sm font-semibold text-[#f4f8f6]/90 transition-colors hover:border-[#f4f8f6]/70">
                  nawahineokekai.com
                </a>
                <a href={OFFICIAL.ohcra} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#f4f8f6]/35 px-6 py-3 text-sm font-semibold text-[#f4f8f6]/90 transition-colors hover:border-[#f4f8f6]/70">
                  ohcra.com
                </a>
              </div>
            </div>
          </section>

          {/* SAMPLE / RESPECT NOTE */}
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="kai-card px-5 py-4 text-center text-xs leading-relaxed text-[#6a7d82]">
              <p>
                This is an{" "}
                <span className="font-semibold text-[#10262f]">independent, unofficial tribute hub</span>{" "}
                built by{" "}
                <a href={SITE} className="font-semibold text-[#6b4423] underline underline-offset-2 hover:text-[#14506e]">
                  BlueWave Projects
                </a>{" "}
                to honor the Molokaʻi Hoe and Nā Wāhine O Ke Kai. It is{" "}
                <span className="font-semibold text-[#10262f]">not affiliated with or endorsed by</span>{" "}
                the races, the Oʻahu Hawaiian Canoe Racing Association, or any club, and implies no official status. All imagery is
                designed sample illustration, not photography. The event names, history, and 2026 dates (Nā Wāhine O Ke Kai, September
                27; Molokaʻi Hoe, October 11) are drawn from the organizers&apos; public sites and should be reconfirmed there before
                race week; registration, entry, and official details belong to the organizers. The &quot;Kaʻiwi Channel, right now&quot;
                panel pulls live public data — the PacIOOS SWAN swell model at the channel mouth, the Honolulu (PHNL) wind observation,
                and NOAA tide and water temperature for Honolulu (the Oʻahu finish; there is no active gauge on Molokaʻi) — and is{" "}
                <span className="font-semibold text-[#10262f]">informational only, not for navigation</span>: always defer to official
                NWS and U.S. Coast Guard forecasts and the race&apos;s water-safety officials. We follow the organizers&apos; spelling of
                place names where we can; the channel name also appears as &quot;Kaiwi&quot; without an ʻokina. Offered with respect —
                for the waʻa, the ocean, and the paddlers who cross it.
              </p>
            </div>
          </div>
        </main>
      </ChannelShell>
      {/* Footer OUTSIDE <ChannelShell>: shell paints a light lauhala canvas; the
          site Footer is styled for dark backgrounds — on deep channel blue it
          reads correctly. */}
      <div className="bg-[#071d2e] text-[#f4f8f6]">
        <Footer />
      </div>
    </>
  );
}
