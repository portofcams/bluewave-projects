import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Maritime Software for Hawaii — USCG Compliance & Charter Operations · BlueWave Projects",
  description:
    "AI-powered maritime operations software for Hawaii charter operators, fishing fleets, and vessel owners. USCG COI compliance, DLNR permits, trip logs, crew scheduling, and NOAA catch reporting — built for Hawaii and Alaska waters.",
  keywords: [
    "maritime software Hawaii",
    "USCG compliance software Hawaii",
    "Hawaii charter boat software",
    "fishing charter management software Hawaii",
    "DLNR commercial marine permit Hawaii",
    "vessel compliance tracking Hawaii",
    "Hawaii maritime operator software",
    "Binnacle maritime software",
  ],
  alternates: { canonical: "https://bluewaveprojects.com/maritime-software-hawaii" },
  openGraph: {
    title: "Maritime Software for Hawaii Charter & Vessel Operators",
    description:
      "USCG COI compliance, DLNR permits, crew scheduling, trip logs, and NOAA catch reporting — built for Hawaii's maritime operators.",
    url: "https://bluewaveprojects.com/maritime-software-hawaii",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const permits = [
  { name: "USCG Certificate of Inspection", detail: "Annual inspection prep, equipment expiration tracking, COI terms monitoring" },
  { name: "DLNR Commercial Marine License", detail: "Trip log compliance, annual renewal workflow, catch reporting" },
  { name: "NOAA HMS Federal Permit", detail: "Logbook requirements, species quotas, reporting deadlines" },
  { name: "State of Hawaii Business License", detail: "Annual renewal reminders, county registration sync" },
  { name: "DLNR Commercial Use Permit", detail: "State waters authorization, area restrictions, renewal tracking" },
  { name: "EPA Vessel General Permit", detail: "Discharge compliance, inspection records, renewal calendar" },
];

const features = [
  {
    title: "COI compliance tracking",
    description: "Equipment expiration dates pulled from your COI. EPIRB test dates, flare expirations, life raft repack schedules — surfaced before your annual inspection.",
  },
  {
    title: "Pre-trip documentation",
    description: "Digital float plan filing, passenger manifest generation from reservations, liability waiver collection before guests arrive at the dock.",
  },
  {
    title: "Weather-dependent rescheduling",
    description: "NOAA marine forecast pulled against your operating parameters. Reschedule communications drafted and queued for captain review before sending.",
  },
  {
    title: "Crew scheduling",
    description: "Match trips to certified captains and qualified crew. Automated crew assignment notifications. Conflict detection before the day-of call.",
  },
  {
    title: "Trip log and catch reporting",
    description: "Post-trip entry for species, weight, and disposition. DLNR annual reports generated from your operational data — not assembled by hand.",
  },
  {
    title: "AIS vessel monitoring",
    description: "Live AIS tracking for your fleet and inbound traffic. Know your vessel's position and status from the dock. Channel crossing situational awareness.",
  },
];

export default function MaritimeHawaiiPage() {
  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="px-6 pt-32 pb-20 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wave-500/10 border border-wave-500/25 text-wave-300/90 text-xs uppercase tracking-[0.16em] mb-6 font-mono">
          Hawaii Maritime Software
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-4xl">
          Maritime operations software{" "}
          <span className="text-gradient">built for Hawaii waters</span>
        </h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl mb-10">
          USCG compliance, DLNR permits, NOAA reporting, crew scheduling, and trip documentation — managed in one platform built around the specific regulatory stack Hawaii commercial maritime operators carry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/booking" className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold text-white text-center">
            Book a call →
          </Link>
          <a href="https://binnacleai.com" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full text-sm font-semibold text-white/80 border border-white/15 hover:border-white/30 transition-colors text-center">
            See Binnacle.ai →
          </a>
        </div>
      </section>

      {/* Compliance stack */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">The Hawaii maritime compliance stack</h2>
        <p className="text-white/50 mb-8 max-w-2xl">
          A Hawaii charter operator holds up to 6 permits before a single trip departs. Each has its own renewal cycle, documentation requirement, and reporting obligation. The platform tracks all of them.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {permits.map((p) => (
            <div key={p.name} className="rounded-xl border border-white/8 bg-white/3 p-5">
              <h3 className="font-semibold text-white text-sm mb-1">{p.name}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">What the platform handles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Built for Hawaii's maritime operators</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "Sport fishing charters", detail: "6-pack and larger, HMS permits, NOAA catch logs, seasonal species tracking" },
            { title: "Whale watch & tour operators", detail: "Passenger manifests, DLNR commercial use permits, marine sanctuary compliance" },
            { title: "Dive boat operators", detail: "Diver manifests, site access permits, tank inspection records" },
            { title: "Inter-island cargo & ferry", detail: "USCG COI for larger vessels, crew certification tracking, route authorization" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-white/50">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="rounded-3xl border border-wave-500/25 bg-gradient-to-br from-ocean-900/50 via-black/40 to-black p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Running your compliance off a filing cabinet?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Book a 30-minute call. We'll walk through your current compliance and trip documentation workflow and show you exactly where the risk is — no pitch, just an honest audit.
          </p>
          <Link href="/booking" className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold text-white inline-block">
            Book a free compliance audit →
          </Link>
        </div>
      </section>

      {/* Related reading */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-white/70">Related reading</h2>
        <Link href="/blog/ai-for-hawaii-maritime-charter-operators" className="text-wave-400 hover:text-wave-300 transition-colors text-sm">
          AI tools for Hawaii fishing charter and tour operators: the practical guide →
        </Link>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Binnacle — Hawaii Maritime Operations Software",
            description: "AI-powered maritime operations software for Hawaii charter operators and vessel owners. USCG COI compliance, DLNR permits, trip logs, crew scheduling.",
            url: "https://bluewaveprojects.com/maritime-software-hawaii",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
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
            audience: { "@type": "Audience", audienceType: "Hawaii charter boat operators, fishing fleets, tour vessels, and commercial maritime operators" },
            areaServed: [
              { "@type": "State", name: "Hawaii" },
              { "@type": "State", name: "Alaska" },
            ],
          }),
        }}
      />
    </main>
  );
}
