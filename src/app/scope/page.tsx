import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TrackedCTA } from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "AI Scope Generator inside Ikena — Hawaii contractor scope of work | BlueWave Projects",
  description:
    "Built into the Ikena operator suite: photos + address in, phase-by-phase scope of work + budget ranges + Hawaii GE tax gross-up out. Live for tenant-zero. See examples + book a walkthrough.",
  keywords: [
    "AI scope of work",
    "construction scope generator",
    "renovation scope Hawaii",
    "AI renovation estimate",
    "Hawaii contractor tax gross-up",
    "RoomPlan scope",
    "Ikena scope generator",
    "contractor scoping tool",
  ],
  alternates: { canonical: "https://bluewaveprojects.com/scope" },
  openGraph: {
    title: "AI Scope Generator — built into Ikena",
    description:
      "Photos in. Phase-by-phase scope + Hawaii GE tax gross-up out. Live inside the Ikena operator suite.",
    url: "https://bluewaveprojects.com/scope",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Scope Generator — built into Ikena",
    description: "Photos in. Phase-by-phase scope + budget + tax gross-up out.",
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
          Built into the Ikena operator suite
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
          Scope a renovation in
          <br />
          <span className="text-gradient">60 seconds.</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mb-4 leading-relaxed">
          The AI Scope Generator is a feature inside <a href="/ikena" className="text-wave-400 hover:text-wave-300 underline">Ikena</a>, our operator
          suite for Hawaii contractors. Photos + address + a couple of notes go in; a
          phase-by-phase scope with line-item ranges, contingency, and Hawaii GE tax
          gross-up comes back out — all stored against the project so it&apos;s ready to
          become a quote.
        </p>
        <p className="text-sm text-white/40 max-w-2xl mb-10 italic">
          It&apos;s not a standalone tool — it lives inside your Ikena tenant so the scope
          flows straight into your project room, change orders, and invoicing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <TrackedCTA
            href="/booking?topic=scope-generator"
            location="hero"
            className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg"
          >
            Book a walkthrough
          </TrackedCTA>
          <TrackedCTA
            href="/ikena"
            location="hero"
            className="px-8 py-4 rounded-full text-white/60 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-300 font-medium text-lg"
          >
            See the full Ikena suite →
          </TrackedCTA>
        </div>

        {/* What it actually does — 3 step flow */}
        <div className="grid sm:grid-cols-3 gap-6 mt-20">
          <Card
            num="01"
            title="Photos + address in"
            body="Multi-photo upload from iPhone, paste a TMK, or pull from a RoomPlan scan you already have. Address looks up against our 384K-parcel Hawaii GIS layer (TMK, zone, acres, lava zone)."
          />
          <Card
            num="02"
            title="Claude writes the scope"
            body="Phase breakdown (demo · framing · electrical · finish · cleanup), labor and material ranges with low/likely/high, 8-15% contingency, Hawaii GE tax gross-up computed against current statute."
          />
          <Card
            num="03"
            title="Lives in your project room"
            body="Approved scope auto-creates a draft change-order line item, attaches photos to the project file, and surfaces in the /ops dashboard. One click sends a client-facing version through the portal."
          />
        </div>

        {/* What the output actually looks like */}
        <div className="mt-24">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">Sample output</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            What a generated scope <span className="text-gradient">actually looks like</span>
          </h2>
          <p className="text-white/55 max-w-3xl mb-8">
            Below is a redacted version of a real Maui kitchen refresh that came out of the
            Scope Generator on tenant-zero (a Honolulu finish-carpentry shop). 12 photos
            + a ZIP code in; this came back in 47 seconds.
          </p>

          <div className="glass rounded-2xl p-8 font-mono text-sm text-white/70 leading-relaxed">
            <div className="text-white/40 mb-4">// Project: Wailea kitchen refresh · Maui · ~180 sqft kitchen footprint</div>
            <div className="space-y-3">
              <div>
                <strong className="text-white/90">Phase 1 — Demo + protection</strong> ($1,800–$2,600)<br />
                <span className="text-white/50 pl-4">Selective demo of upper cabinets + backsplash, floor protection, dust containment, debris haul.</span>
              </div>
              <div>
                <strong className="text-white/90">Phase 2 — Rough trades</strong> ($3,400–$5,100)<br />
                <span className="text-white/50 pl-4">Electrical: 3 new outlets (GFCI), under-cabinet circuit, dishwasher loop. Plumbing: re-route disposal drain, ice-maker stub. Sub deduction applies (HRS §237-13).</span>
              </div>
              <div>
                <strong className="text-white/90">Phase 3 — Cabinets + counter</strong> ($14,000–$22,000)<br />
                <span className="text-white/50 pl-4">15 LF upper + 12 LF lower cabinets (semi-custom), 38 sqft quartz counter, undermount sink, faucet install. Material range reflects local quartz availability + shipping.</span>
              </div>
              <div>
                <strong className="text-white/90">Phase 4 — Finish + close-out</strong> ($2,800–$4,200)<br />
                <span className="text-white/50 pl-4">Tile backsplash (~32 sqft), paint touch-up, final electrical trim, appliance set, punch.</span>
              </div>
              <div className="border-t border-white/10 pt-3 mt-3">
                <strong className="text-white/90">Subtotal</strong> $22,000–$33,900<br />
                <span className="text-white/50">+ 10% contingency · + 4.712% GE on net (subs deducted)</span><br />
                <strong className="text-emerald-300">All-in range: $25,500–$39,200</strong>
              </div>
              <div className="text-white/30 text-xs mt-3 pt-3 border-t border-white/5">
                Sources: 12 photos analyzed · TMK 2-3-9-008-016 · MCTAT 3% noted for STR conversion path · timeline estimate 4-6 weeks
              </div>
            </div>
          </div>
        </div>

        {/* Why it beats a spreadsheet */}
        <div className="mt-16 glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Why operators stop using spreadsheets after a week</h2>
          <ul className="space-y-3 text-white/70 leading-relaxed">
            <li><strong className="text-white/90">It reads the photos.</strong> RoomPlan scans drop straight in. No measuring with a tape twice.</li>
            <li><strong className="text-white/90">It handles Hawaii contractor tax.</strong> Sub deductions computed per HRS §237-13. GE gross-up math is already in the line items.</li>
            <li><strong className="text-white/90">It learns your pricing.</strong> Each scope you accept tunes the model toward your shop&apos;s actual line-item history.</li>
            <li><strong className="text-white/90">It hands off to the rest of Ikena.</strong> Approved scope → draft change order → invoice. Photos stay attached. Client sees the polished version in their portal.</li>
          </ul>
        </div>

        {/* Where it lives */}
        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Status</p>
            <h3 className="text-xl font-bold mb-2">Live in production</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Tenant-zero (a Honolulu finish-carpentry shop) uses this on every real-job intake.
              Available to Ikena Web ($79/mo) and Ikena Suite ($99/mo) tenants today.
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Stack</p>
            <h3 className="text-xl font-bold mb-2">Claude Sonnet · RoomPlan · TypeScript</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Built on Anthropic Claude with a custom Hawaii-contractor-rules prompt layer. Photo analysis via vision; tax math via deterministic county rule engine.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Want to see it run on one of your jobs?</h2>
          <p className="text-white/55 mb-6 max-w-xl mx-auto">
            Bring 6-12 photos from a recent estimate. 15-minute walkthrough, no pitch deck. We&apos;ll generate a real scope on your data and you keep it whether you sign up or not.
          </p>
          <TrackedCTA
            href="/booking?topic=scope-generator"
            location="footer-cta"
            className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg inline-block"
          >
            Book a 15-min walkthrough
          </TrackedCTA>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Card({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="glass rounded-2xl p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-3">{num}</p>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed text-sm">{body}</p>
    </div>
  );
}
