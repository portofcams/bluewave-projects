import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Harbor Management Software for Hawaii — Slip & Vessel Compliance · BlueWave Projects",
  description:
    "AI-powered harbor management software for Hawaii small boat harbors. Slip assignment, vessel documentation compliance, DOBOR reporting, transient check-in, and maintenance dispatch — built for DLNR-managed harbors.",
  keywords: [
    "harbor management software Hawaii",
    "small boat harbor software Hawaii",
    "DLNR harbor management",
    "DOBOR compliance software",
    "Hawaii slip assignment software",
    "vessel documentation tracking Hawaii",
    "marina management software Hawaii",
    "Ala Wai harbor management",
  ],
  alternates: { canonical: "https://bluewaveprojects.com/harbor-management-software-hawaii" },
  openGraph: {
    title: "Harbor Management Software for Hawaii Small Boat Harbors",
    description:
      "Slip assignment, vessel compliance, transient check-in, and DOBOR reporting — built for Hawaii's DLNR-managed small boat harbors.",
    url: "https://bluewaveprojects.com/harbor-management-software-hawaii",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const features = [
  {
    title: "Waitlist & slip assignment",
    description: "Automated vessel-to-slip matching by LOA, beam, and draft. Waitlist notifications drafted and ready to send — harbor manager confirms before anything goes out.",
  },
  {
    title: "Document expiration tracking",
    description: "Registration, insurance, and safety cert expiration dates pulled from uploaded docs. 90/60/30-day alerts. Compliance notices generated automatically.",
  },
  {
    title: "Transient vessel check-in",
    description: "Digital check-in flow: photograph registration, auto-extract vessel info, assign slip, collect fee, log the stay. Searchable record for DOBOR occupancy reporting.",
  },
  {
    title: "Maintenance request dispatch",
    description: "Categorize by type (structural, electrical, water, access), prioritize by safety impact, generate work orders, track from submission to completion.",
  },
  {
    title: "DOBOR & DLNR reporting",
    description: "Occupancy reports, vessel compliance summaries, and inspection-ready documentation — generated from your operational data, not assembled by hand.",
  },
  {
    title: "AIS vessel tracking integration",
    description: "Live AIS position data for vessels in and around your harbor. Know what's in your slip before the captain calls. Know what's inbound before they arrive.",
  },
];

const harbors = [
  "Ala Wai Small Boat Harbor",
  "Keehi Small Boat Harbor",
  "Ko Olina Marina",
  "Kaneohe Bay",
  "Haleiwa Small Boat Harbor",
  "Nawiliwili Harbor (Kauai)",
  "Port Allen Small Boat Harbor",
  "Maalaea Harbor (Maui)",
  "Lahaina Small Boat Harbor",
  "Hilo Small Boat Harbor",
  "Honokohau Harbor (Kona)",
  "Kawaihae Harbor",
];

export default function HarborHawaiiPage() {
  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="px-6 pt-32 pb-20 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wave-500/10 border border-wave-500/25 text-wave-300/90 text-xs uppercase tracking-[0.16em] mb-6 font-mono">
          Hawaii Harbor Software
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-4xl">
          Harbor management software{" "}
          <span className="text-gradient">built for Hawaii</span>
        </h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl mb-10">
          Hawaii's small boat harbors are some of the most active in the Pacific — and among the most understaffed. AI-assisted slip management, vessel compliance, and DOBOR reporting so your team can focus on the operations only a human can handle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/booking" className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold text-white text-center">
            Book a demo →
          </Link>
          <a href="https://binnacleai.com" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full text-sm font-semibold text-white/80 border border-white/15 hover:border-white/30 transition-colors text-center">
            See Binnacle Harbor →
          </a>
        </div>
      </section>

      {/* The problem */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-white/8 bg-white/3 p-8 sm:p-10">
          <h2 className="text-2xl font-bold mb-4">The staffing-to-workload gap</h2>
          <p className="text-white/60 leading-relaxed max-w-3xl">
            A harbor office with 2–4 staff manages hundreds of slips, thousands of annual transient arrivals, and a documentation load that hasn't changed much in decades. Vessel registration renewals, DLNR compliance checks, DOBOR occupancy reports, maintenance queues, waitlist management — all of it runs through the same small team. AI handles the repetitive documentation work so your staff handles the decisions.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">What the platform does</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Harbors */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Built for Hawaii's state harbors</h2>
        <p className="text-white/50 mb-8 max-w-2xl">
          The platform is built around DLNR/DOBOR's specific compliance requirements — not adapted from a mainland marina product.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {harbors.map((h) => (
            <div key={h} className="rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/60">
              {h}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="rounded-3xl border border-wave-500/25 bg-gradient-to-br from-ocean-900/50 via-black/40 to-black p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Running your harbor on spreadsheets and phone logs?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Book a 30-minute call. We'll walk through your current workflow and show you exactly what can be automated — no pitch, just an honest operational audit.
          </p>
          <Link href="/booking" className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold text-white inline-block">
            Book a free operational audit →
          </Link>
        </div>
      </section>

      {/* Related reading */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-white/70">Related reading</h2>
        <Link href="/blog/ai-for-hawaii-harbor-managers" className="text-wave-400 hover:text-wave-300 transition-colors text-sm">
          How AI helps Hawaii harbor managers cut through the paperwork →
        </Link>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Binnacle Harbor — Hawaii Harbor Management Software",
            description: "AI-powered harbor management for Hawaii small boat harbors. Slip assignment, vessel compliance, transient check-in, DOBOR reporting.",
            url: "https://bluewaveprojects.com/harbor-management-software-hawaii",
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
            audience: { "@type": "Audience", audienceType: "Hawaii harbor managers and DLNR/DOBOR-operated small boat harbors" },
            areaServed: { "@type": "State", name: "Hawaii" },
          }),
        }}
      />
    </main>
  );
}
