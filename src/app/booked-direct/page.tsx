import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuditRequestForm from "@/components/AuditRequestForm";

export const metadata: Metadata = {
  title: "Booked Direct — Get Found on Google, Get Booked Without the Commission · BlueWave Projects",
  description:
    "Local-search visibility for Hawaii ocean-tour and charter operators. We fix the structured data, Google Business Profile, and local pages that decide whether a searching traveler books you direct — or books an OTA that keeps 15–30%. Audit → Foundation Sprint → retainer.",
  keywords: [
    "hawaii tour operator marketing",
    "charter boat website help hawaii",
    "get more direct bookings hawaii",
    "local SEO hawaii tour operator",
    "google business profile hawaii charter",
    "ocean tour operator direct booking",
    "reduce OTA commission hawaii",
    "LocalBusiness schema hawaii operator",
  ],
  alternates: { canonical: "https://bluewaveprojects.com/booked-direct" },
  openGraph: {
    title: "Booked Direct — Local Visibility for Hawaii Ocean Operators",
    description:
      "58% of the Hawaii ocean-tour operators we audited carry a search-visibility gap. We fix the code and profile that send bookings direct instead of to an OTA.",
    url: "https://bluewaveprojects.com/booked-direct",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-booked-direct.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get found on Google. Get booked direct.",
    description:
      "58% of Hawaii's ocean-tour operators are invisible on the searches their customers type. BlueWave Projects fixes it.",
    images: ["/og-booked-direct.png"],
  },
};

const tiers = [
  {
    name: "Visibility Audit",
    price: "$250",
    unit: "credited to a sprint",
    tagline: "A no-obligation starting point.",
    featured: false,
    points: [
      "Recorded, plain-English walkthrough of your Google presence",
      "One-page scorecard, ranked by impact",
      "The exact searches you should own",
      "Delivered within 48 hours — you keep the findings",
    ],
  },
  {
    name: "Foundation Sprint",
    price: "from $1,490",
    unit: "one-time",
    tagline: "Fix the base, built in about two weeks.",
    featured: true,
    points: [
      "Structured data — LocalBusiness, trips, and FAQ schema",
      "Google Business Profile setup & optimization",
      "Mobile and technical fixes",
      "Local pages built for your top searches",
    ],
  },
  {
    name: "Visibility Retainer",
    price: "from $490",
    unit: "/ month",
    tagline: "Compound your visibility over time.",
    featured: false,
    points: [
      "New local content each month",
      "Ongoing schema & profile care",
      "Monthly Google Search Console report",
      "Priority tiers at $990 & $1,490 — cancel anytime",
    ],
  },
];

const audience = [
  { title: "Fishing charters", detail: "Deep-sea and sport-fishing operators competing on 'Kona / Oʻahu deep sea fishing charter'" },
  { title: "Snorkel & reef tours", detail: "The most contested lane — whoever's set up first takes the map pack" },
  { title: "Dive operators", detail: "Three broken sites for every clean one in our audit — a fast setup stands out" },
  { title: "Sailing & catamaran cruises", detail: "The most professionalized category; if you're not set up, you're behind your dock" },
  { title: "Surf schools", detail: "The most wide-open vertical in the state — almost nobody carries the right markup" },
  { title: "Whale watch & eco-tours", detail: "Seasonal demand spikes reward the operator Google can actually display" },
];

const proof = [
  { site: "AlohaCalendar", what: "Fixed Google indexing on ~500 pages; rich event & guide listings, live today" },
  { site: "Last Frontier Events", what: "Event & FAQ rich results, Google-eligible and verified" },
  { site: "Da Plate Lunch", what: "Restaurant & FAQ schema plus pages for real local queries" },
  { site: "BlueWave Projects", what: "Full LocalBusiness stack, rich-result eligible in Google's own test" },
];

export default function BookedDirectPage() {
  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="px-6 pt-32 pb-16 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wave-500/10 border border-wave-500/25 text-wave-300/90 text-xs uppercase tracking-[0.16em] mb-6 font-mono">
          Booked Direct — Local Visibility
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-4xl">
          Get found on Google.{" "}
          <span className="text-gradient">Get booked direct.</span>
        </h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl mb-8">
          Most Hawaiʻi ocean operators are invisible on the exact searches their customers type — so the booking
          goes to an online travel agency that keeps 15–30% of the fare. We fix the code and the profile that
          decide whether Google shows <em>you</em> — built by a Honolulu software studio, not a marketing agency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#audit" className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold text-white text-center">
            Get your free audit →
          </a>
          <a href="/state-of-hawaii-ocean-tourism-visibility-2026" className="px-8 py-3.5 rounded-full text-sm font-semibold text-white/80 border border-white/15 hover:border-white/30 transition-colors text-center">
            Read the 2026 visibility report →
          </a>
        </div>
      </section>

      {/* Data strip — the report as the warmer */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="rounded-3xl border border-wave-500/20 bg-white/3 p-8 sm:p-10">
          <div className="text-xs uppercase tracking-[0.16em] text-wave-300/80 font-mono mb-5">
            We audited the whole industry first
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-4xl font-bold text-gradient">58%</div>
              <div className="text-sm text-white/50 mt-1">of the 115 operator sites we scored carry a visibility gap</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient">1 in 7</div>
              <div className="text-sm text-white/50 mt-1">are badly broken — failing several checks at once</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient">8</div>
              <div className="text-sm text-white/50 mt-1">operator sites wouldn&apos;t even load for a customer</div>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-3xl">
            The full <em>State of Hawaiʻi Ocean-Tourism Visibility 2026</em> report shows where every category stands —
            fishing, snorkel, dive, sail, surf — with the methodology laid out in full.{" "}
            <a href="/state-of-hawaii-ocean-tourism-visibility-2026" className="text-wave-400 hover:text-wave-300 transition-colors font-semibold">
              Read the report →
            </a>
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">The boat is world-class. The website is a decade behind.</h2>
        <p className="text-white/55 leading-relaxed max-w-3xl">
          Most operators already have a real Google Business Profile and glowing reviews. What&apos;s missing is the
          structured data that lets Google <em>display</em> them — hours, star rating, price, and a tappable
          &ldquo;Book&rdquo; button — instead of a plain blue link. In our audit, the single most common failure was
          exactly that: <span className="text-white/80">missing or incomplete schema markup.</span> The fix is often an
          afternoon. Nobody had told them it was missing.
        </p>
      </section>

      {/* Offer tiers */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">What it costs to fix it</h2>
        <p className="text-white/50 mb-8 max-w-2xl">Start with the audit. It&apos;s credited to a sprint if you go ahead, and yours to keep if you don&apos;t.</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border p-6 ${t.featured ? "border-wave-500/40 bg-wave-500/5" : "border-white/8 bg-white/3"}`}
            >
              {t.featured && (
                <div className="inline-block text-[10px] uppercase tracking-[0.14em] font-mono text-wave-300/90 bg-wave-500/15 rounded px-2 py-1 mb-3">
                  Most popular
                </div>
              )}
              <h3 className="font-semibold text-white">{t.name}</h3>
              <div className="mt-2 mb-1">
                <span className="text-2xl font-bold text-white">{t.price}</span>{" "}
                <span className="text-xs text-white/40">{t.unit}</span>
              </div>
              <p className="text-sm text-white/45 mb-4">{t.tagline}</p>
              <ul className="space-y-2">
                {t.points.map((p) => (
                  <li key={p} className="text-sm text-white/60 leading-snug pl-4 relative">
                    <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-wave-500" />
                    {p}
                  </li>
                ))}
              </ul>
              {t.name === "Visibility Audit" && (
                <a
                  href="https://buy.stripe.com/7sY4gA3rQ7Dhb4E88WefC07"
                  className="btn-primary mt-5 block w-full text-center px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                >
                  Buy the audit — $250 →
                </a>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-white/35 mt-5">
          Pricing is honest and fixed — never below $1,490 for a sprint, audit fee always credited, retainer only
          proposed after your 30-day results are in. We make no promises about ranking positions; we build the fixes
          and the proof.
        </p>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Built for Hawaiʻi&apos;s ocean operators</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audience.map((a) => (
            <div key={a.title} className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <h3 className="font-semibold text-white mb-1">{a.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{a.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Why trust a software studio with this</h2>
        <p className="text-white/50 mb-8 max-w-2xl">
          We don&apos;t rent your rankings back to you — we build the same structured data on our own systems, and
          they&apos;re live and Google-eligible today.
        </p>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
          {proof.map((p) => (
            <div key={p.site} className="flex gap-3 py-3 border-b border-white/6">
              <span className="font-semibold text-white text-sm whitespace-nowrap">{p.site}</span>
              <span className="text-sm text-white/45">{p.what}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/35 mt-5 italic">
          Every property above is verified live and rich-result eligible in Google&apos;s own Rich Results Test. They&apos;re
          our own systems, built in-house — not paid client case studies yet. Yours would be the next one. That honesty is
          the whole pitch.
        </p>
      </section>

      {/* Audit request form */}
      <section id="audit" className="px-6 py-20 max-w-3xl mx-auto scroll-mt-24">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">See exactly where your operation stands — free.</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Send us your site and we&apos;ll record a short, no-obligation audit against everything in the 2026 report,
            delivered within 48 hours. Whether we build the fixes or you hand them to your own developer, you keep the map.
          </p>
        </div>
        <AuditRequestForm />
        <div className="text-center text-xs text-white/35 mt-5">
          Prefer to talk first? <Link href="/booking" className="text-wave-400 hover:text-wave-300 transition-colors">Book a 15-minute call →</Link>
          {"  ·  "}Or email <a href="mailto:portofcams@gmail.com" className="text-wave-400 hover:text-wave-300 transition-colors">portofcams@gmail.com</a>
        </div>
      </section>

      {/* Related reading */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-white/70">Related reading</h2>
        <a href="/state-of-hawaii-ocean-tourism-visibility-2026" className="text-wave-400 hover:text-wave-300 transition-colors text-sm">
          The State of Hawaiʻi Ocean-Tourism Visibility 2026 — the full industry audit →
        </a>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Booked Direct — Local Search Visibility for Hawaii Ocean Operators",
            serviceType: "Local SEO and structured-data implementation",
            description:
              "Local-search visibility service for Hawaii ocean-tour and charter operators. Structured data (LocalBusiness, trip, FAQ schema), Google Business Profile setup, mobile and technical fixes, and local pages — so Google can display your business and travelers book you direct instead of through a commission-charging OTA.",
            url: "https://bluewaveprojects.com/booked-direct",
            provider: {
              "@type": "Organization",
              name: "BlueWave Projects",
              url: "https://bluewaveprojects.com",
              email: "portofcams@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "440 Lewers St, Suite 603",
                addressLocality: "Honolulu",
                addressRegion: "HI",
                postalCode: "96815",
                addressCountry: "US",
              },
            },
            areaServed: [{ "@type": "State", name: "Hawaii" }],
            audience: {
              "@type": "Audience",
              audienceType:
                "Hawaii ocean-tour and charter operators — fishing charters, snorkel and dive tours, sailing cruises, surf schools, and whale-watch operators",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Booked Direct visibility services",
              itemListElement: [
                {
                  "@type": "Offer",
                  name: "Visibility Audit",
                  description:
                    "Recorded walkthrough of your Google presence plus a one-page scorecard, delivered within 48 hours. Credited toward a Foundation Sprint.",
                  price: "250",
                  priceCurrency: "USD",
                },
                {
                  "@type": "Offer",
                  name: "Foundation Sprint",
                  description:
                    "Two-week build: LocalBusiness / trip / FAQ schema, Google Business Profile setup, mobile and technical fixes, and local pages for your top searches.",
                  price: "1490",
                  priceCurrency: "USD",
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    price: "1490",
                    priceCurrency: "USD",
                    valueAddedTaxIncluded: false,
                    description: "Starting price, one-time",
                  },
                },
                {
                  "@type": "Offer",
                  name: "Visibility Retainer",
                  description:
                    "Monthly local content, ongoing schema and profile care, and a Google Search Console report. Priority tiers at $990 and $1,490 per month.",
                  price: "490",
                  priceCurrency: "USD",
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: "490",
                    priceCurrency: "USD",
                    unitCode: "MON",
                    description: "Starting price, per month",
                  },
                },
              ],
            },
          }),
        }}
      />
    </main>
  );
}
