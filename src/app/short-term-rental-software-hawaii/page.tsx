import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Short-Term Rental Software for Hawaii — STR Compliance & Management · BlueWave Projects",
  description:
    "AI-powered software built for Hawaii STR hosts. County compliance tracking, TAT/GET deadline reminders, guest communication, and DCCA permit management — built for Oahu, Maui, Kauai, and Big Island operators.",
  keywords: [
    "short term rental software Hawaii",
    "STR compliance Hawaii",
    "Hawaii STR permit tracking",
    "Oahu STR software",
    "Maui vacation rental compliance",
    "Hawaii TAT GET tracking",
    "DCCA permit software Hawaii",
    "short term rental management Honolulu",
  ],
  alternates: { canonical: "https://bluewaveprojects.com/short-term-rental-software-hawaii" },
  openGraph: {
    title: "Short-Term Rental Software for Hawaii STR Hosts",
    description:
      "County compliance, TAT/GET deadlines, permit tracking — built for Hawaii's STR regulatory environment. Subscribe or hire us to build yours.",
    url: "https://bluewaveprojects.com/short-term-rental-software-hawaii",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const problems = [
  {
    icon: "📋",
    title: "County rules change constantly",
    body: "Oahu Bill 41, Maui's hosted/unhosted split, Big Island zoning overlays — your compliance checklist depends on your specific property, not a national template.",
  },
  {
    icon: "📅",
    title: "TAT & GET deadlines catch hosts off guard",
    body: "Monthly or quarterly filings. Miss one and it's 5% per month in penalties plus 8% annual interest. Most mainland software doesn't even know Hawaii has TAT.",
  },
  {
    icon: "🔍",
    title: "Inspections arrive without warning",
    body: "A complaint from a neighbor triggers a county inspection. If your documents aren't organized and current, a single visit can shut you down mid-peak-season.",
  },
  {
    icon: "🔄",
    title: "Turnover coordination on a tight labor market",
    body: "Hawaii's cleaning crew pool is small. Miscommunicated turnovers cost you reviews. Standard templates don't cut it when the next guest checks in at 3pm.",
  },
];

const features = [
  {
    title: "Property-specific compliance checklist",
    description: "Pulls your county, zoning classification, and permit numbers. Generates a checklist for your exact property — not a generic national template.",
  },
  {
    title: "TAT/GET deadline reminders",
    description: "Tracks your booking revenue by period, calculates expected tax liability, and sends reminders 10 days before each filing deadline.",
  },
  {
    title: "Permit expiration tracking",
    description: "90/60/30-day alerts for STR permits, insurance certificates, and any county-specific renewal requirements — by property.",
  },
  {
    title: "Turnover briefs for your crew",
    description: "Auto-generates per-property turnover checklists after each checkout: guest count, check-in time, owner notes — no phone tag.",
  },
  {
    title: "Guest communication templates",
    description: "Hawaii-specific answers for ocean entry conditions, lava zone disclosures, reef-safe requirements, and local rules — in your voice, not a chatbot's.",
  },
  {
    title: "Review response drafts",
    description: "First drafts of review responses that sound like a host who cares about the place — not a software company. Faster response = better search placement.",
  },
];

const counties = [
  { name: "Oahu (City & County of Honolulu)", detail: "Bill 41 compliance, hosted-only B&B rules, DPP permit integration" },
  { name: "Maui County", detail: "Annual inspector sign-off workflow, hosted/unhosted classification, permit renewal" },
  { name: "Kauai County", detail: "Non-hosted unit caps, zoning overlay checks, TVR permit tracking" },
  { name: "Hawaii County (Big Island)", detail: "Lava zone disclosure automation, district-specific rules, permit chains" },
];

export default function STRHawaiiPage() {
  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="px-6 pt-32 pb-20 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wave-500/10 border border-wave-500/25 text-wave-300/90 text-xs uppercase tracking-[0.16em] mb-6 font-mono">
          Hawaii STR Software
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-4xl">
          Short-term rental software{" "}
          <span className="text-gradient">built for Hawaii</span>
        </h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl mb-10">
          Hawaii STR compliance isn't like anywhere else. County-specific permits, TAT/GET filings, DCCA deadlines, and inspection readiness — managed in one place, built around Hawaii's actual regulatory structure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/booking" className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold text-white text-center">
            Book a call →
          </Link>
          <Link href="/ikena" className="px-8 py-3.5 rounded-full text-sm font-semibold text-white/80 border border-white/15 hover:border-white/30 transition-colors text-center">
            See Ikena →
          </Link>
        </div>
      </section>

      {/* Problems */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">
          What makes Hawaii STR compliance different
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {problems.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <div className="text-2xl mb-3">{p.icon}</div>
              <h3 className="font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">What the software does</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Counties */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">Built for every Hawaii county</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {counties.map((c) => (
            <div key={c.name} className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <h3 className="font-semibold text-white mb-1">{c.name}</h3>
              <p className="text-sm text-white/50">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="rounded-3xl border border-wave-500/25 bg-gradient-to-br from-ocean-900/50 via-black/40 to-black p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Still running your STR compliance on a spreadsheet?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Book a 30-minute call. We'll map your current compliance workflow and show you exactly where the gaps are — no pitch, just an honest audit.
          </p>
          <Link href="/booking" className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold text-white inline-block">
            Book a free compliance audit →
          </Link>
        </div>
      </section>

      {/* Related reading */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-white/70">Related reading</h2>
        <Link href="/blog/ai-tools-for-hawaii-str-hosts" className="text-wave-400 hover:text-wave-300 transition-colors text-sm">
          AI tools every Hawaii STR host should be using in 2026 →
        </Link>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Ikena — Hawaii STR Compliance Software",
            description: "AI-powered short-term rental compliance software built for Hawaii operators. County-specific permit tracking, TAT/GET deadline reminders, inspection readiness.",
            url: "https://bluewaveprojects.com/short-term-rental-software-hawaii",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Contact for pricing" },
            creator: {
              "@type": "Organization",
              name: "BlueWave Projects",
              url: "https://bluewaveprojects.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "440 Lewers St, Suite 603",
                addressLocality: "Honolulu",
                addressRegion: "HI",
                postalCode: "96815",
                addressCountry: "US",
              },
            },
            audience: { "@type": "Audience", audienceType: "Hawaii short-term rental hosts and property managers" },
            areaServed: [
              { "@type": "State", name: "Hawaii" },
              { "@type": "City", name: "Honolulu" },
              { "@type": "City", name: "Kailua" },
              { "@type": "City", name: "Lahaina" },
              { "@type": "City", name: "Kona" },
            ],
          }),
        }}
      />
    </main>
  );
}
