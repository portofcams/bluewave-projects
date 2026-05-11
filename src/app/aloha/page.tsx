import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aloha Off-Market Network — Hawaii deal flow for builders | BlueWave Projects",
  description:
    "Off-market signals on Hawaii parcels before they hit MLS. Tiered access for owners, agents, and investor-builders. $99 to $1,500 / month.",
  keywords: [
    "Hawaii off market deals",
    "Hawaii real estate investor",
    "off market network",
    "Hawaii pocket listing",
    "investor builder Hawaii",
    "pre-MLS Hawaii",
  ],
  alternates: { canonical: "https://bluewaveprojects.com/aloha" },
  openGraph: {
    title: "Aloha Off-Market Network — Hawaii deal flow",
    description:
      "Off-market signals on Hawaii parcels before they hit MLS. $99 to $1,500 / month.",
    url: "https://bluewaveprojects.com/aloha",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aloha Off-Market Network",
    description: "Hawaii off-market deal flow for builders.",
    images: ["/og-default.png"],
  },
};

const TIERS = [
  {
    name: "Watcher",
    price: "$99",
    period: "/ month",
    blurb: "For homeowners + first-look agents.",
    bullets: [
      "Weekly Hawaii off-market digest",
      "Track up to 5 watch areas",
      "Lava + flood + shoreline alerts",
      "Cancel anytime",
    ],
  },
  {
    name: "Builder",
    price: "$499",
    period: "/ month",
    featured: true,
    blurb: "For active investor-builders + GCs scouting deal flow.",
    bullets: [
      "Daily early-warning feed",
      "Unlimited parcel watches",
      "Adjacent-permit alerts (your block, your knowledge)",
      "Direct access to BlueWave scope generator",
      "Quarterly underwriting workshop",
    ],
  },
  {
    name: "Founding Member",
    price: "$1,500",
    period: "/ month",
    blurb: "For shops doing $5M+ a year. Limited seats.",
    bullets: [
      "Everything in Builder",
      "Private intro to vetted Hawaii agents + lenders",
      "Monthly 1:1 with the BlueWave team",
      "First-look on Ikena-originated deals",
    ],
  },
];

export default function AlohaPage() {
  return (
    <main className="ocean-gradient min-h-screen text-white">
      <Nav />

      <section className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/60 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Aloha Off-Market Network
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
          Deal flow,
          <br />
          <span className="text-gradient">before the MLS.</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mb-16 leading-relaxed">
          Off-market signals on Hawaii parcels — distressed permits,
          unusual recordings, adjacency moves — built from the same data
          layer the BlueWave Projects scope generator uses. For homeowners,
          investor-builders, and the people moving the most square footage
          in the islands.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`glass rounded-2xl p-6 ${tier.featured ? "ring-2 ring-emerald-400/50" : ""}`}
            >
              {tier.featured && (
                <div className="text-xs uppercase tracking-wider text-emerald-300 mb-3">
                  Most builders pick this
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="text-3xl font-bold text-gradient mb-1">
                {tier.price}
                <span className="text-base text-white/40">{tier.period}</span>
              </div>
              <p className="text-white/60 text-sm mb-6">{tier.blurb}</p>
              <ul className="space-y-2 text-white/70 text-sm mb-6">
                {tier.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-emerald-400">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`/signup?plan=aloha-${tier.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="block text-center btn-primary px-6 py-3 rounded-full text-white font-medium"
              >
                Start with {tier.name}
              </a>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Where the data comes from</h2>
          <p className="text-white/70 leading-relaxed mb-3">
            Hawaii statewide ArcGIS, county permit portals (Honolulu DPP,
            Hawaii County GIS, Maui, Kauai), and our own ground-truth
            from running an active design-build practice in Honolulu. We
            don&apos;t scrape MLS. We watch the layer underneath it.
          </p>
          <p className="text-white/70 leading-relaxed">
            All members get a free dry-run brief on one Hawaii parcel
            during onboarding so you can see what the actual reports look
            like before locking in.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
