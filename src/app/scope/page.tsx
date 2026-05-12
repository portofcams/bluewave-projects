import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Scope Generator — Scope a renovation in 60 seconds | BlueWave Projects",
  description:
    "Drop the photos and the address, get a phase-by-phase scope of work + budget range in under a minute. Built on RoomPlan + Claude + Hawaii-specific tax accounting. Free during beta.",
  keywords: [
    "AI scope of work",
    "construction scope generator",
    "renovation scope",
    "AI renovation estimate",
    "Hawaii contractor tax",
    "RoomPlan scope",
    "contractor scoping tool",
  ],
  alternates: { canonical: "https://bluewaveprojects.com/scope" },
  openGraph: {
    title: "Scope a renovation in 60 seconds — BlueWave Projects",
    description:
      "Photos in. Phase-by-phase scope + budget out. Built on RoomPlan + Claude + Hawaii-specific tax accounting.",
    url: "https://bluewaveprojects.com/scope",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scope a renovation in 60 seconds",
    description: "Photos in. Phase-by-phase scope + budget out.",
    images: ["/og-default.png"],
  },
};

export default function ScopePage() {
  return (
    <main className="ocean-gradient min-h-screen text-white">
      <Nav />

      <section className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/60 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          AI Scope Generator
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
          Scope a renovation in
          <br />
          <span className="text-gradient">60 seconds.</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
          Drop in photos, the address, and a couple of notes. Get back a
          phase-by-phase scope of work, line-item ranges, and a tax gross-up.
          Then turn it into a real lead with one click.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a href="/signup" className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg">
            Try the scope generator
          </a>
          <a href="/booking" className="px-8 py-4 rounded-full text-white/60 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-300 font-medium text-lg">
            See a sample output
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-20">
          <Card
            title="Photos + address in"
            body="Multi-photo upload from iPhone, paste a TMK, or pull from a RoomPlan scan you already have."
          />
          <Card
            title="Claude does the writing"
            body="Phase breakdown (demo, framing, electrical, finish), labor and material ranges, contingency, tax gross-up."
          />
          <Card
            title="Send as a lead"
            body="One click pushes it into your tenant&apos;s lead queue with the photos attached and a draft client message."
          />
        </div>

        <div className="mt-24 glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Why this beats a spreadsheet</h2>
          <ul className="space-y-3 text-white/70 leading-relaxed">
            <li>It reads the photos. RoomPlan scans drop straight in.</li>
            <li>It handles Hawaii contractor tax rules — sub deductions computed for you.</li>
            <li>It learns your pricing. Each scope you accept tunes the model toward your shop.</li>
            <li>It hands off to BlueWave Projects. Approved scope → live project room → client portal.</li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed">{body}</p>
    </div>
  );
}
