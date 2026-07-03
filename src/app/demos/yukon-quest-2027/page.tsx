import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  HeritageShell,
  Seal,
  PhotoPlaceholder,
  SampleNote,
  QuestMotion,
  HUB_PATH,
  SITE,
} from "./_shared";

// UNLISTED + NOINDEX. Not in nav, not in sitemap. robots.txt already disallows
// /demos; this block is belt-and-suspenders so this proof never enters the
// bluewaveprojects.com index.
export const metadata: Metadata = {
  title:
    "Yukon Quest 2027 — Dates, Route & How to Follow the Race (Sample Hub)",
  description:
    "Yukon Quest 2027 information headquarters — the Yukon Quest Alaska sled-dog race out of Fairbanks, Interior Alaska. Key dates, the trail and checkpoints, how to follow the run, plan to attend or volunteer, and how mushers enter. A sample build by BlueWave Projects on public information.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

// --- Grounded season-at-a-glance rows. Everything unpublished for 2027 is
// marked [confirm]; nothing here invents a specific date or price. ---
const keyDates: { when: string; what: string; where: string; confirm?: boolean }[] =
  [
    {
      when: "Early November 2026",
      what: "Musher sign-up opens",
      where: "In person, Fairbanks",
      confirm: true,
    },
    {
      when: "Early February 2027",
      what: "Race start",
      where: "Fairbanks area",
      confirm: true,
    },
    {
      when: "Race week 2027",
      what: "Trail running · live GPS tracking",
      where: "Interior Alaska",
      confirm: true,
    },
    {
      when: "Dates to be announced",
      what: "Awards / finish celebration",
      where: "Fairbanks area",
      confirm: true,
    },
  ];

// Historic checkpoints / communities along the Interior route. Treated as
// heritage reference, not a confirmed 2027 course — the exact 2027 trail and
// checkpoint list are set by the organization each year.
const checkpoints: { name: string; note: string }[] = [
  { name: "Fairbanks", note: "Race hub and traditional start city" },
  { name: "Two Rivers", note: "Historic mushing community east of Fairbanks" },
  { name: "Mile 101", note: "Steese Highway checkpoint on the interior route" },
  {
    name: "Interior villages",
    note: "Tribal Partner communities such as Tanana, Manley Hot Springs and Rampart",
  },
];

// Grounded FAQ. Heritage- and dog-welfare-forward, spectacle-free.
const hubFaq: { q: string; a: string }[] = [
  {
    q: "Who runs the Yukon Quest out of Alaska?",
    a: "Yukon Quest Alaska is the Alaska-side organization that carries the race forward from Fairbanks after the historic Yukon Quest split into separate US and Canadian efforts in 2022. It runs the Yukon Quest Alaska distances — including a roughly 750-mile Interior Alaska route — plus shorter-distance races. It is a distinct organization from the Canadian Yukon Quest based in Whitehorse.",
  },
  {
    q: "When does the Yukon Quest 2027 start?",
    a: "Historically the race starts the first Saturday of February, so 2027 is likely early February [confirm]. The organization's official 2027 dates were not yet posted when this sample was made — always confirm the start date with Yukon Quest Alaska before making travel plans.",
  },
  {
    q: "Where does the race run?",
    a: "Through Interior Alaska, out of the Fairbanks area. Historic checkpoints and communities along the interior include Two Rivers, Mile 101 on the Steese Highway, and Alaska Native villages such as Tanana, Manley Hot Springs and Rampart. The exact 2027 trail and checkpoint list are set by the organization each year [confirm].",
  },
  {
    q: "How do I follow the race from home?",
    a: "The field is followed mile by mile — historically with live GPS tracking through a third-party tracker (Trackleaders), with standings on the Yukon Quest Alaska site. Check the organization's site during race week for the current season's tracking and standings links [confirm].",
  },
  {
    q: "How do mushers enter?",
    a: "Musher sign-up has historically opened in early November, in person in Fairbanks. Entry requirements, qualifications and fees are set by Yukon Quest Alaska; confirm the current season's sign-up window and rules directly with the organization [confirm].",
  },
  {
    q: "Is this the same as the race that was cancelled?",
    a: "The Canadian Yukon Quest race out of Whitehorse was cancelled for 2026, while the Alaska side kept the trail alive and ran its event. That continuity — Alaska keeping the mail-trail tradition going — is a point of real pride in the mushing community.",
  },
];

export default function YukonQuestHubPage() {
  return (
    // Page-local "rugged heritage" theme scoped under <HeritageShell>
    // (.yq-heritage): warm cream paper canvas, deep spruce ink, rust accents,
    // aged-gold seal, vintage slab/serif display type. No globals.css /
    // tailwind.config / shared components touched.
    <>
      <HeritageShell>
      <main className="min-h-screen text-[#1f3d2f]">
        <Nav />

        {/* Hero — informational headquarters, spruce band, cream display type */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#2b4d3b] via-[#1f3d2f] to-[#152a20] text-[#F3EAD7]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path
              d="M-50 180 C 300 80, 600 240, 900 140 S 1300 90, 1300 180"
              stroke="#C08A2D"
              strokeWidth="60"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M0 470 C 250 440, 450 500, 700 470 S 1050 440, 1250 480"
              stroke="#F3EAD7"
              strokeWidth="1.5"
              strokeDasharray="3 10"
              fill="none"
            />
          </svg>

          <QuestMotion />

          <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="yq-eyebrow mb-5 inline-flex items-center gap-2 rounded-sm border border-[#C08A2D]/45 bg-[#14241c]/40 px-3 py-1.5 !text-[#e9dcbf]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C08A2D]" />
                  Yukon Quest Alaska · Fairbanks · Interior Alaska
                </div>
                <h1 className="yq-display mb-5 max-w-3xl text-5xl font-bold leading-[0.98] sm:text-7xl">
                  Yukon Quest 2027{" "}
                  <span className="text-[#e0a94a]">Keeping the trail alive.</span>
                </h1>
                <div className="yq-perf-rule !mx-0 mb-6" />
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#F3EAD7]/85">
                  Your information headquarters for the Yukon Quest Alaska
                  sled-dog race — the key dates, the Interior Alaska trail and
                  its historic checkpoints, how to follow the run mile by mile,
                  and how to attend, volunteer, or enter as a musher. Built on
                  the gold-rush mail-trail heritage, the dogs, and Alaskan grit.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#dates"
                    className="yq-display rounded-sm border-2 border-[#7d3517] bg-[#B5502A] px-8 py-3.5 text-center text-sm font-bold text-[#F3EAD7] shadow-[4px_4px_0_rgba(20,36,28,0.4)] transition-transform hover:-translate-y-0.5"
                  >
                    Season at a glance →
                  </a>
                  <a
                    href="#follow"
                    className="yq-display rounded-sm border-2 border-[#F3EAD7]/35 px-8 py-3.5 text-center text-sm font-bold text-[#F3EAD7]/90 transition-colors hover:border-[#F3EAD7]/70 hover:bg-[#F3EAD7]/5"
                  >
                    How to follow along
                  </a>
                </div>
              </div>

              <div className="relative">
                <PhotoPlaceholder
                  accent="aurora"
                  tall
                  label="Interior Alaska trail — Fairbanks"
                  stub
                />
                <Seal
                  size={132}
                  className="absolute -bottom-8 -left-8 hidden sm:inline-flex"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick facts — heritage ticket-well tiles, all grounded */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { v: "~750", l: "Miles", s: "Interior Alaska route [confirm]" },
              { v: "Feb", l: "Race start", s: "Early February 2027 [confirm]" },
              { v: "Fairbanks", l: "Race hub", s: "Interior Alaska" },
              { v: "Nov", l: "Sign-up opens", s: "In person, Fairbanks [confirm]" },
            ].map((stat) => (
              <div
                key={stat.l}
                className="rounded-sm border-2 border-[#1f3d2f]/30 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-5 shadow-[4px_4px_0_rgba(31,61,47,0.14)]"
              >
                <div className="yq-display text-3xl font-bold text-[#B5502A] sm:text-4xl">
                  {stat.v}
                </div>
                <div className="yq-display mb-1 mt-2 text-xs font-semibold tracking-[0.12em] text-[#1f3d2f]">
                  {stat.l}
                </div>
                <div className="text-xs leading-relaxed text-[#6b5f4a]">
                  {stat.s}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Season at a glance — key dates timeline */}
        <section id="dates" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <p className="yq-eyebrow mb-3">Season at a glance</p>
            <h2 className="yq-display text-4xl font-bold text-[#1f3d2f] sm:text-5xl">
              The 2027 season,{" "}
              <span className="text-[#B5502A]">as we know it so far.</span>
            </h2>
            <div className="yq-perf-rule" />
            <p className="mx-auto mt-4 max-w-3xl text-[#6b5f4a]">
              The Yukon Quest Alaska 2027 calendar was not yet officially posted
              when this sample was built, so the milestones below follow the
              race&apos;s historic rhythm. Everything unconfirmed is tagged{" "}
              <span className="rounded-sm bg-[#1f3d2f]/8 px-1 py-0.5 font-mono text-[#B5502A]">
                [confirm]
              </span>{" "}
              — verify with Yukon Quest Alaska before planning.
            </p>
          </div>

          <ol className="relative mx-auto max-w-3xl">
            <span
              className="pointer-events-none absolute left-[19px] top-2 bottom-2 w-px sm:left-[calc(11rem+19px)]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(180deg, #1f3d2f 0 8px, transparent 8px 14px)",
              }}
            />
            {keyDates.map((d) => (
              <li
                key={d.what}
                className="relative mb-6 flex flex-col gap-1 pl-14 sm:flex-row sm:items-baseline sm:gap-6 sm:pl-0"
              >
                <div className="yq-display shrink-0 text-sm font-bold text-[#B5502A] sm:w-44 sm:text-right">
                  {d.when}
                </div>
                <span
                  className="absolute left-[11px] top-1 h-4 w-4 rounded-full border-2 border-[#1f3d2f] bg-[#C08A2D] sm:left-[calc(11rem+11px)]"
                  aria-hidden="true"
                />
                <div className="sm:pl-8">
                  <h3 className="yq-display text-lg font-bold leading-tight text-[#1f3d2f]">
                    {d.what}
                    {d.confirm && (
                      <span className="ml-2 rounded-sm bg-[#1f3d2f]/8 px-1 py-0.5 font-mono text-[11px] font-normal text-[#B5502A]">
                        [confirm]
                      </span>
                    )}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6b5f4a]">
                    {d.where}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* The race — distance, route, checkpoints */}
        <section id="race" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <p className="yq-eyebrow mb-3">The race</p>
            <h2 className="yq-display text-4xl font-bold text-[#1f3d2f] sm:text-5xl">
              A trail through{" "}
              <span className="text-[#B5502A]">Interior Alaska.</span>
            </h2>
            <div className="yq-perf-rule" />
            <p className="mx-auto mt-4 max-w-3xl text-[#6b5f4a]">
              The Yukon Quest Alaska race runs a roughly 750-mile route out of
              the Fairbanks area, with shorter-distance races alongside it. It
              follows the old gold-rush mail trails that once connected the
              interior&apos;s mining camps and villages by dog team.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <PhotoPlaceholder
              accent="trail"
              tall
              label="Historic mail-trail checkpoints"
              stub
            />
            <div>
              <p className="mb-5 leading-relaxed text-[#14241c]">
                Historic checkpoints and communities along the interior route are
                as much a part of the Quest as the racing. Several are Tribal
                Partner communities whose hospitality and stewardship of the land
                make the race possible — the trail runs through their home, and
                is run with their partnership and respect.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {checkpoints.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-sm border-2 border-[#1f3d2f]/25 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-4 shadow-[3px_3px_0_rgba(31,61,47,0.12)]"
                  >
                    <h3 className="yq-display text-base font-bold text-[#1f3d2f]">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#6b5f4a]">
                      {c.note}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#6b5f4a]">
                The exact 2027 trail and checkpoint list are set by Yukon Quest
                Alaska each year{" "}
                <span className="rounded-sm bg-[#1f3d2f]/8 px-1 py-0.5 font-mono text-[#B5502A]">
                  [confirm]
                </span>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Dog care + heritage note — lead with welfare, never spectacle */}
        <section className="mx-auto max-w-5xl px-6 py-8">
          <div className="rounded-sm border-2 border-[#C08A2D]/50 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-8 shadow-[6px_6px_0_rgba(31,61,47,0.14)]">
            <p className="yq-eyebrow mb-3">The dogs come first</p>
            <h2 className="yq-display mb-3 text-2xl font-bold text-[#1f3d2f] sm:text-3xl">
              Dog care, veterinary teams, and the volunteers who make it happen.
            </h2>
            <p className="leading-relaxed text-[#14241c]">
              The Quest is, before anything else, a story about the dogs and the
              people who care for them. Veterinary teams follow the field,
              mandatory rest is built into the run, and a small army of
              volunteers staffs checkpoints, handles logistics, and looks after
              teams around the clock. If you take one thing from this hub, let it
              be that — the athletes on this trail have four legs, and their
              welfare is the whole point.
            </p>
          </div>
        </section>

        {/* How to follow along — live tracking + standings */}
        <section id="follow" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="yq-eyebrow mb-3">How to follow along</p>
            <h2 className="yq-display text-4xl font-bold text-[#1f3d2f] sm:text-5xl">
              Follow every mile{" "}
              <span className="text-[#B5502A]">from wherever you are.</span>
            </h2>
            <div className="yq-perf-rule" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                t: "Live GPS tracking",
                d: "The field has historically been followed mile by mile with live GPS, run through a third-party tracker (Trackleaders). During race week, the tracking link is posted on the Yukon Quest Alaska site. [confirm]",
              },
              {
                t: "Standings & checkpoint times",
                d: "Standings, checkpoint arrivals and rest times are published on the Yukon Quest Alaska site through the run. Check the organization's site for the current season's standings page. [confirm]",
              },
            ].map((card) => (
              <div
                key={card.t}
                className="rounded-sm border-2 border-[#1f3d2f]/25 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-6 shadow-[4px_4px_0_rgba(31,61,47,0.12)]"
              >
                <h3 className="yq-display mb-2 text-lg font-bold text-[#1f3d2f]">
                  {card.t}
                </h3>
                <p className="leading-relaxed text-[#14241c]">
                  {card.d.replace(" [confirm]", "")}
                  <span className="ml-1 rounded-sm bg-[#1f3d2f]/8 px-1 py-0.5 font-mono text-xs text-[#B5502A]">
                    [confirm]
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Plan to attend or volunteer + how mushers enter */}
        <section id="plan" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="yq-eyebrow mb-3">Attend · volunteer · enter</p>
            <h2 className="yq-display text-4xl font-bold text-[#1f3d2f] sm:text-5xl">
              Be part of it,{" "}
              <span className="text-[#B5502A]">on the trail or off.</span>
            </h2>
            <div className="yq-perf-rule" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                t: "Plan to attend",
                d: "Fairbanks is the race hub, and the start draws fans to the interior in the heart of winter. Dress for deep cold, plan your trip around the start day, and confirm the start location and time with Yukon Quest Alaska before booking travel.",
                tag: true,
              },
              {
                t: "Volunteer",
                d: "The race runs on volunteers — checkpoints, dog handling, logistics, communications and more. Volunteering is one of the best ways to be close to the action and to support the teams. Watch the Yukon Quest Alaska site for the season's volunteer sign-up.",
                tag: true,
              },
              {
                t: "How mushers enter",
                d: "Musher sign-up has historically opened in early November, in person in Fairbanks. Entry qualifications, requirements and fees are set by the organization — confirm the current window and rules directly with Yukon Quest Alaska.",
                tag: true,
              },
            ].map((card) => (
              <div
                key={card.t}
                className="rounded-sm border-2 border-[#1f3d2f]/25 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-6 shadow-[4px_4px_0_rgba(31,61,47,0.12)]"
              >
                <h3 className="yq-display mb-2 text-lg font-bold text-[#1f3d2f]">
                  {card.t}
                </h3>
                <p className="leading-relaxed text-[#14241c]">{card.d}</p>
                {card.tag && (
                  <p className="mt-3 text-xs">
                    <span className="rounded-sm bg-[#1f3d2f]/8 px-1 py-0.5 font-mono text-[#B5502A]">
                      [confirm]
                    </span>{" "}
                    <span className="text-[#6b5f4a]">
                      2027 dates and details not yet officially posted.
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-[#6b5f4a]">
            Always confirm dates, locations, entry rules and official links
            through Yukon Quest Alaska before making plans or travel
            arrangements.
          </p>
        </section>

        {/* FAQ — grounded */}
        <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
          <div className="mb-10 text-center">
            <p className="yq-eyebrow mb-3">Frequently asked</p>
            <h2 className="yq-display text-4xl font-bold text-[#1f3d2f] sm:text-5xl">
              Yukon Quest 2027, <span className="text-[#B5502A]">answered.</span>
            </h2>
            <div className="yq-perf-rule" />
          </div>

          <div className="space-y-4">
            {hubFaq.map((f) => (
              <div
                key={f.q}
                className="rounded-sm border-2 border-[#1f3d2f]/25 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-6 shadow-[4px_4px_0_rgba(31,61,47,0.12)]"
              >
                <h3 className="yq-display mb-2 text-base font-bold leading-snug text-[#1f3d2f]">
                  {f.q}
                </h3>
                <p className="leading-relaxed text-[#14241c]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsors / thank-you nod — generic, no invented names */}
        <section className="mx-auto max-w-5xl px-6 py-8">
          <div className="rounded-sm border-2 border-[#1f3d2f]/25 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] p-8 text-center shadow-[4px_4px_0_rgba(31,61,47,0.12)]">
            <p className="yq-eyebrow mb-3">With thanks</p>
            <h2 className="yq-display mb-3 text-2xl font-bold text-[#1f3d2f] sm:text-3xl">
              Sponsors, partners, and the community keep the trail alive.
            </h2>
            <p className="mx-auto max-w-2xl leading-relaxed text-[#14241c]">
              The Yukon Quest depends on its sponsors, its Tribal Partner
              communities, and hundreds of volunteers. Their support is what let
              Alaska keep the mail-trail tradition running. The organization&apos;s
              official sponsor list lives on the Yukon Quest Alaska site — this
              sample does not name specific sponsors.
            </p>
          </div>
        </section>

        {/* Closing seal band — informational sign-off, no buy CTA */}
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
          <div className="relative overflow-hidden rounded-sm border-4 border-[#C08A2D]/70 bg-gradient-to-br from-[#2b4d3b] via-[#1f3d2f] to-[#152a20] p-10 text-center text-[#F3EAD7] shadow-[8px_8px_0_rgba(31,61,47,0.3)]">
            <Seal size={96} className="mx-auto mb-6" />
            <h2 className="yq-display mb-4 text-3xl font-bold sm:text-4xl">
              Out of Fairbanks,{" "}
              <span className="text-[#e0a94a]">into the Interior.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-[#F3EAD7]/85">
              The Yukon Quest Alaska race is expected to run in early February
              2027 [confirm]. Use this hub to plan a trip, to volunteer, or to
              follow the teams mile by mile — and check Yukon Quest Alaska for
              the official 2027 dates as they are posted.
            </p>
          </div>
        </section>

        <SampleNote />
      </main>
      </HeritageShell>
      {/* Footer lives OUTSIDE <HeritageShell>: the shell paints a light warm-cream
          paper canvas, and the site Footer is styled for dark backgrounds
          (white-alpha text with no background of its own) — inside the shell its
          text washed out to invisible. Rendered here on a deep-spruce surface it
          reads correctly, matching the heritage palette. */}
      <div className="bg-[#152a20] text-[#F3EAD7]">
        <Footer />
      </div>
    </>
  );
}
