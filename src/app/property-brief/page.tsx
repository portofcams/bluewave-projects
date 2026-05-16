import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Property Brief — Weekly Hawaii parcel intel for homeowners | BlueWave Projects",
  description:
    "Your address, every Wednesday. TMK, zoning, lava zone, permit history, neighborhood comps, and the contractor signals worth knowing. $15 / month, cancel anytime.",
  keywords: [
    "Hawaii property report",
    "TMK lookup",
    "Hawaii zoning",
    "lava zone map",
    "Hawaii permit history",
    "homeowner property intel",
    "Hawaii Loa Ridge real estate",
  ],
  alternates: { canonical: "https://bluewaveprojects.com/property-brief" },
  openGraph: {
    title: "Property Brief — Weekly Hawaii parcel intel",
    description:
      "Your address every Wednesday. TMK, zoning, lava zone, permits, comps, contractor signals. $15/mo.",
    url: "https://bluewaveprojects.com/property-brief",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Brief — weekly parcel intel",
    description: "TMK, zoning, lava zone, permits, comps — your address every Wednesday.",
    images: ["/og-default.png"],
  },
};

export default function PropertyBriefPage() {
  return (
    <main className="ocean-gradient min-h-screen text-white">
      <Nav />

      <section className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/60 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Property Brief · $15 / mo
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
          Your address,
          <br />
          <span className="text-gradient">every Wednesday.</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
          A weekly intel report on one Hawaii property: TMK, zoning, lava
          zone, recent permits, neighborhood comps, and the contractor
          signals worth knowing. Track multiple addresses, get alerts when
          adjacent parcels file permits.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <a href="/signup?plan=property-brief" className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg">
            Start — $15 / month
          </a>
          <a href="/property-brief-sample.html" target="_blank" rel="noopener" className="px-8 py-4 rounded-full text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300 font-medium text-lg">
            See a sample brief
          </a>
          <a href="https://ai.ikenagroup.com/lookup" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full text-white/60 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-300 font-medium text-lg">
            Free preview — look up an address
          </a>
        </div>
        <p className="text-xs text-white/40 tracking-widest uppercase mb-16">
          Sample uses the Aloha Tower District · No signup · Real Wednesday format
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mt-20">
          <Bullet
            title="State + county data, refreshed weekly"
            body="Pulls from Hawaii statewide ArcGIS, Honolulu DPP, Hawaii County GIS, Maui + Kauai county portals. Auto-scraped, no stale data."
          />
          <Bullet
            title="Permit history + adjacent watch"
            body="Every permit filed on the parcel since 2014. Plus get an alert when an adjacent parcel files anything — your block, your knowledge."
          />
          <Bullet
            title="Lava zone, flood zone, shoreline"
            body="One pane of glass for the risk factors that move insurance + financing. Color-coded, printable."
          />
          <Bullet
            title="Comps + neighborhood signal"
            body="Last 12 months of recorded sales within 500ft. Median list-to-close gap. Days on market."
          />
        </div>

        <div className="mt-24 glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Who this is for</h2>
          <p className="text-white/70 leading-relaxed mb-3">
            Homeowners thinking about a renovation, addition, or sale.
            Investors tracking parcels they want to acquire. Anyone who
            wants to be the most informed person in the room when
            decisions get made.
          </p>
          <p className="text-white/70 leading-relaxed">
            Not a Realtor. Not a contractor. The intel layer underneath
            both — so when you do hire one, you&apos;re a smarter client.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Bullet({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed">{body}</p>
    </div>
  );
}
