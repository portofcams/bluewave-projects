import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { pages, concerts, HUB_PATH, SITE } from "./events";
import {
  PosterShell,
  Rosette,
  PhotoPlaceholder,
  SampleNote,
  FairMotion,
  ticketBadge,
  accentText,
} from "./_shared";
import FairDayPlanner from "./planner";

// UNLISTED + NOINDEX. Not in nav, not in sitemap.
export const metadata: Metadata = {
  title:
    "Alaska State Fair 2026 — Day Planner, Concerts & Tickets Explained (Sample Hub)",
  description:
    "Plan your Alaska State Fair 2026 day: the full 18-day calendar with closed days marked, all 14 Borealis Theatre concerts, the weigh-offs, and exactly which tickets each day needs. A sample build by BlueWave Projects on the fair's own published information.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

const hubFaq: { q: string; a: string }[] = [
  {
    q: "When is the Alaska State Fair in 2026?",
    a: "August 21 through September 7, 2026, in Palmer — gates 11 AM to 10 PM. The fair is closed Tuesdays and Wednesdays (August 25–26 and September 1–2), straight from the official hours page.",
  },
  {
    q: "Does a concert ticket get me into the fair?",
    a: "No — and it's the most common ticket mistake at the fair. Every Borealis show sells as two products: the concert alone, and a 'with fair admission' bundle. If you're doing the fair first, buy the bundle or add admission.",
  },
  {
    q: "Who's playing in 2026?",
    a: "Fourteen headliners: AJR, Megadeth, Ziggy Marley, Amy Grant, CAKE, Modest Mouse, Nate Smith, BigXthaPlug, The Beach Boys, Max McNown, Twisted Sister with Sebastian Bach, deadmau5, Nick Offerman, and Lyle Lovett. Dates are on the concert guide — and the day planner shows what plays the day you pick.",
  },
  {
    q: "What's included with fair admission?",
    a: "The grounds, exhibit halls, giant vegetables, livestock and 4-H, the free stages, and the weigh-offs. Not included: Borealis concerts, grandstand rodeo and monster trucks, carnival rides, and parking — each is its own purchase.",
  },
  {
    q: "What's the one thing I shouldn't miss?",
    a: "The 30th Annual Giant Cabbage Weigh-Off — Friday, September 4 at 6 PM. Hundred-pound cabbages on a scale in front of a roaring crowd, followed by Twisted Sister at 7. That's the fair in one evening.",
  },
  {
    q: "Where do I actually buy tickets?",
    a: "Through the official links on alaskastatefair.org. Admission, passes, parking, and shows sell on Etix; carnival ride passes come from Golden Wheel; camping books through a separate portal. This hub's planner tells you which of those your day actually needs.",
  },
];

export default function FairHubPage() {
  return (
    // Page-local "WPA harvest poster" theme: wheat paper, deep fir ink, the
    // fair's brand red + ribbon blue as working inks, Anton display type.
    // Scoped under <PosterShell> (.fair-poster) — nothing site-wide changes.
    <>
      <PosterShell>
      <main className="min-h-screen text-[#22381f]">
        <Nav />

        {/* Hero — the poster itself */}
        <section className="relative overflow-hidden border-b-4 border-[#22381f] bg-gradient-to-b from-[#f9f2df] via-[#f6eed9] to-[#eee1c1]">
          <FairMotion />

          <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="fair-eyebrow mb-5 inline-flex items-center gap-2 rounded-sm border border-[#c43a2d]/40 bg-[#faf4e3]/80 px-4 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c43a2d]" />
                  Palmer, Alaska · Est. 1936 · Aug 21 – Sep 7, 2026
                </div>
                <h1 className="fair-display mb-5 max-w-3xl text-5xl leading-[0.98] text-[#22381f] sm:text-7xl">
                  Alaska State Fair{" "}
                  <span className="text-[#c43a2d]">2026.</span>
                </h1>
                <div className="fair-rule !mx-0 mb-6" />
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#4a5c40]">
                  Eighteen days, fourteen headliners, hundred-pound cabbages,
                  and a Ferris wheel with a mountain view — Alaska&apos;s
                  biggest event, planned one day at a time. Pick your date
                  below and know exactly what&apos;s on and what to buy.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#planner"
                    className="fair-cond rounded-md border-2 border-[#93291f] bg-[#c43a2d] px-8 py-3.5 text-center text-sm font-bold text-[#f6eed9] shadow-[4px_4px_0_rgba(34,56,31,0.3)] transition-transform hover:-translate-y-0.5"
                  >
                    Build your fair day →
                  </a>
                  <a
                    href="#concerts"
                    className="fair-cond rounded-md border-2 border-[#22381f]/50 px-8 py-3.5 text-center text-sm font-bold text-[#22381f] transition-colors hover:border-[#2e4c90] hover:text-[#2e4c90]"
                  >
                    The 14 headliners
                  </a>
                </div>
              </div>

              <div className="relative">
                <PhotoPlaceholder
                  accent="wheat"
                  tall
                  imageKey="hero"
                  label="Alaska State Fair — Palmer"
                />
                <Rosette
                  size={120}
                  className="absolute -bottom-14 -left-8 hidden sm:inline-flex"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick facts */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { v: "1936", l: "First fair", s: "Matanuska Valley, Palmer" },
              { v: "14", l: "Open days", s: "Closed Tue & Wed" },
              { v: "14", l: "Headliners", s: "Borealis Theatre, nightly" },
              { v: "100 lb+", l: "Giant cabbages", s: "the famous weigh-off" },
            ].map((stat) => (
              <div key={stat.l} className="fair-card fair-band p-5">
                <div className="fair-display text-4xl text-[#c43a2d]">
                  {stat.v}
                </div>
                <div className="fair-cond mb-1 mt-2 text-xs font-semibold tracking-[0.12em] text-[#22381f]">
                  {stat.l}
                </div>
                <div className="text-xs leading-relaxed text-[#7d7458]">
                  {stat.s}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE PLANNER — centerpiece */}
        <section id="planner" className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="fair-eyebrow mb-3">The day planner</p>
            <h2 className="fair-display text-4xl text-[#22381f] sm:text-5xl">
              Build your <span className="text-[#c43a2d]">fair day.</span>
            </h2>
            <div className="fair-rule" />
            <p className="mx-auto mt-4 max-w-3xl text-[#4a5c40]">
              Every date of the 2026 run — what plays the Borealis that night,
              which signature moments land that day, and the exact ticket list
              your day needs. Closed days are marked so nobody drives to
              Palmer on a Tuesday.
            </p>
          </div>

          <FairDayPlanner />
        </section>

        {/* Concert strip */}
        <section id="concerts" className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="fair-eyebrow mb-3">Nightly at the Borealis</p>
            <h2 className="fair-display text-4xl text-[#22381f] sm:text-5xl">
              Fourteen nights, <span className="text-[#2e4c90]">fourteen headliners.</span>
            </h2>
            <div className="fair-rule" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {concerts.map((c) => {
              const d = new Date(`${c.date}T12:00:00`);
              const label = d.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
              return (
                <div key={c.slug} className="fair-card flex items-center justify-between gap-3 px-5 py-4">
                  <div className="min-w-0">
                    <div className="fair-display truncate text-lg text-[#22381f]">
                      {c.name}
                    </div>
                    <div className="text-xs text-[#7d7458]">{c.genreLine}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="fair-cond text-sm font-semibold text-[#c43a2d]">
                      {label}
                    </div>
                    <div className="text-[11px] text-[#7d7458]">{c.startTime}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center">
            <Link
              href={`${HUB_PATH}/concert-series`}
              className="fair-cond text-sm font-bold text-[#2e4c90] underline underline-offset-4 hover:text-[#22376b]"
            >
              The full concert guide — including the admission-bundle rule →
            </Link>
          </p>
        </section>

        {/* Featured guides */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <p className="fair-eyebrow mb-3">The guides</p>
            <h2 className="fair-display text-4xl text-[#22381f] sm:text-5xl">
              Five guides to <span className="text-[#c43a2d]">the big fair.</span>
            </h2>
            <div className="fair-rule" />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {pages.map((p) => {
              const badge = ticketBadge[p.ticketed];
              return (
                <Link
                  key={p.slug}
                  href={`${HUB_PATH}/${p.slug}`}
                  className="group fair-card fair-band flex flex-col overflow-hidden"
                >
                  <PhotoPlaceholder
                    accent={p.accent}
                    imageKey={p.slug}
                    label={p.shortName}
                    className="rounded-b-none rounded-t-[4px] border-0 shadow-none"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="fair-cond text-xl font-semibold leading-tight text-[#22381f]">
                          {p.shortName}
                        </h3>
                        <p className={`mt-1 text-sm font-semibold ${accentText[p.accent]}`}>
                          {p.date}
                        </p>
                      </div>
                      <span
                        className={`fair-cond inline-flex shrink-0 items-center whitespace-nowrap rounded-sm border px-2 py-1 text-[10px] tracking-[0.12em] ${badge.cls}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="mb-1 text-xs uppercase tracking-[0.08em] text-[#7d7458]">
                      {p.venue}
                    </p>
                    <p className="mb-4 text-sm leading-relaxed text-[#4a5c40]">
                      {p.teaser}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-[#22381f]/25 pt-4">
                      <span className="fair-cond text-sm font-bold text-[#c43a2d] transition-colors group-hover:text-[#2e4c90]">
                        Read the guide →
                      </span>
                      {p.ticketVia && (
                        <span className="text-[11px] uppercase tracking-[0.1em] text-[#7d7458]">
                          {p.ticketVia}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-4xl px-6 pb-8 pt-8">
          <div className="mb-10 text-center">
            <p className="fair-eyebrow mb-3">Frequently asked</p>
            <h2 className="fair-display text-4xl text-[#22381f] sm:text-5xl">
              The 2026 fair, <span className="text-[#2e4c90]">answered.</span>
            </h2>
            <div className="fair-rule" />
          </div>

          <div className="space-y-4">
            {hubFaq.map((f) => (
              <div key={f.q} className="fair-card p-6">
                <h3 className="fair-cond mb-2 text-base font-semibold leading-snug text-[#22381f]">
                  {f.q}
                </h3>
                <p className="leading-relaxed text-[#4a5c40]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing band */}
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-8">
          <div className="fair-card fair-band relative overflow-hidden p-10 text-center">
            <Rosette size={88} className="mx-auto mb-2" />
            <h2 className="fair-display mb-4 text-3xl text-[#22381f] sm:text-4xl">
              Ninety years of harvest,{" "}
              <span className="text-[#c43a2d]">one valley.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-[#4a5c40]">
              The Matanuska Valley has been showing off every August since
              1936. Pick your day above, buy through the official links, and
              ride the Ferris wheel at golden hour — Pioneer Peak does the
              rest.
            </p>
          </div>
        </section>

        <SampleNote />

        {/* schema.org FAQPage — grounded answers, no invented prices */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: hubFaq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </main>
      </PosterShell>
      {/* Footer lives OUTSIDE <PosterShell>: the shell paints a light wheat-paper
          canvas, and the site Footer is styled for dark backgrounds (white-alpha
          text with no background of its own) — inside the shell its text washed
          out to invisible. Rendered here on the poster's deep fir-ink surface it
          reads correctly, matching the palette. */}
      <div className="bg-[#22381f] text-[#f6eed9]">
        <Footer />
      </div>
    </>
  );
}
