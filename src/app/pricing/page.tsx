import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TrackedCTA } from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Pricing — ProBuildCalc, Ikena Web, Ikena Suite",
  description:
    "Three tiers. ProBuildCalc iOS-only at $19/mo. Ikena Web at $79/mo. Ikena Suite at $99/mo for both. Hawaii-built, multi-tenant. Founding pricing locked for life.",
  alternates: { canonical: "https://bluewaveprojects.com/pricing" },
  openGraph: {
    title: "Pricing — three tiers across the BlueWave family",
    description:
      "ProBuildCalc $19 · Ikena Web $79 · Ikena Suite $99. Founding pricing locked for life.",
    url: "https://bluewaveprojects.com/pricing",
    siteName: "BlueWave Projects",
    type: "website",
  },
};

type Tier = {
  name: string;
  parent: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
  footnote?: string;
};

const tiers: Tier[] = [
  {
    name: "ProBuildCalc",
    parent: "iOS · entry tier",
    price: "$19",
    period: "/ month",
    tagline: "The pocket scanner. Measure and ballpark on-site, in 60 seconds.",
    features: [
      "iOS RoomPlan + Object Capture scanning",
      "Multi-room stitching, PDF blueprint export",
      "AI ballpark in seconds (Claude, on-device prompt)",
      "Send-as-lead → drops into your inbox",
      "No team, no web admin",
      "Cancel anytime",
    ],
    cta: { label: "Get on iOS", href: "https://probuildcalc.com" },
  },
  {
    name: "Ikena Web",
    parent: "Web admin · operator tier",
    price: "$79",
    period: "/ month",
    tagline: "Sixteen ops modules. The full operator suite, on the web.",
    features: [
      "Projects · Clients · Invoices · Subs · Time",
      "Daily logs · Documents · Selections · Change orders",
      "Blueprint editor · 3D editor · Leads inbox",
      "Employees · Handbook · Timeline · Settings",
      "Hawaii GET handled correctly across every line",
      "Multi-tenant — your data, isolated",
    ],
    cta: { label: "Start 14-day trial", href: "/signup?plan=ikena-web&redirect=/ops" },
  },
  {
    name: "Ikena Suite",
    parent: "Web + iOS · the bundle",
    price: "$99",
    period: "/ month",
    badge: "Best value — both for $20 more",
    tagline: "Everything in Ikena Web. Plus the iOS scanner, fully wired in.",
    featured: true,
    features: [
      "Everything in Ikena Web",
      "ProBuildCalc iOS app included",
      "Scan in the field → lead in the inbox, same tenant",
      "AI scope generator with full project context",
      "Property Brief credits for client outreach",
      "Adjacent-permit alerts",
      "Founding pricing locked for life",
    ],
    cta: { label: "Start 14-day trial", href: "/signup?plan=ikena-suite&redirect=/ops" },
    footnote: "Free 14-day trial · no card required",
  },
];

const compareRows: { feature: string; pbc: string | boolean; web: string | boolean; suite: string | boolean }[] = [
  { feature: "iOS LiDAR scanner (ProBuildCalc)", pbc: true, web: false, suite: true },
  { feature: "Multi-room stitching + PDF export", pbc: true, web: false, suite: true },
  { feature: "AI ballpark on scan", pbc: true, web: false, suite: true },
  { feature: "Web admin — Projects", pbc: false, web: true, suite: true },
  { feature: "Web admin — Invoices + Hawaii GET", pbc: false, web: true, suite: true },
  { feature: "Web admin — Subs, Time, Change Orders", pbc: false, web: true, suite: true },
  { feature: "Daily logs · Documents · Selections", pbc: false, web: true, suite: true },
  { feature: "Blueprint + 3D editor", pbc: false, web: true, suite: true },
  { feature: "Leads inbox · Employees · Handbook", pbc: false, web: true, suite: true },
  { feature: "Tenant isolation + Phase 1.5 multi-tenancy", pbc: false, web: true, suite: true },
  { feature: "AI scope generator (project-aware)", pbc: false, web: "Limited", suite: true },
  { feature: "Property Brief credits", pbc: false, web: false, suite: true },
  { feature: "Adjacent-permit alerts", pbc: false, web: false, suite: true },
  { feature: "Custom subdomain + branding", pbc: false, web: false, suite: true },
  { feature: "Founding pricing locked for life", pbc: false, web: true, suite: true },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-300">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </span>
    );
  }
  if (value === false) {
    return <span className="text-white/20">—</span>;
  }
  return <span className="text-xs text-white/70">{value}</span>;
}

export default function PricingPage() {
  // Schema.org Product + Offer JSON-LD — qualifies for rich-result
  // eligibility in Google search (price snippet, comparison cards).
  const pricingLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Ikena Suite (and family)",
    "description":
      "Operator software for property, contracting, and real estate — three tiers across the BlueWave Projects family.",
    "brand": { "@type": "Brand", "name": "BlueWave Projects" },
    "offers": tiers.map((t) => ({
      "@type": "Offer",
      "name": t.name,
      "description": t.tagline,
      "price": t.price.replace(/[^0-9]/g, ""),
      "priceCurrency": "USD",
      "url": `https://bluewaveprojects.com${t.cta.href.startsWith("/") ? t.cta.href : ""}`,
      "availability": "https://schema.org/InStock",
      "category": t.parent,
    })),
  };

  return (
    <main className="ocean-gradient min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingLd) }}
      />
      <Nav />

      {/* HERO */}
      <section className="px-6 pt-32 pb-16 max-w-6xl mx-auto text-center">
        <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-wave-400 mb-6">
          Three tiers · across the BlueWave family
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          <span className="text-white">Honest pricing.</span>{" "}
          <span className="text-gradient">Pick where you are.</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
          ProBuildCalc gets you measuring on the jobsite this afternoon. Ikena Web runs the rest
          of your business. Ikena Suite ties them together for $20 more than the web admin alone.
          Cancel anytime, founding pricing locked for life on monthly tiers.
        </p>
      </section>

      {/* PLAN CARDS */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative glass rounded-2xl p-8 transition-all duration-500 ${
                t.featured
                  ? "border-ocean-500/30 shadow-lg shadow-ocean-500/10 md:scale-105"
                  : "border-white/5 glass-hover"
              }`}
            >
              {t.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="btn-primary px-4 py-1.5 rounded-full text-sm font-medium text-white whitespace-nowrap">
                    {t.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-xs text-wave-400 uppercase tracking-[0.18em] mb-2">{t.parent}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.name}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{t.tagline}</p>
              </div>

              <div className="mb-7">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${t.featured ? "text-gradient" : "text-white"}`}>
                    {t.price}
                  </span>
                  <span className="text-white/40 text-base">{t.period}</span>
                </div>
                {t.footnote && (
                  <p className="text-[11px] text-white/40 mt-2 leading-relaxed">{t.footnote}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      className={`w-5 h-5 mt-0.5 shrink-0 ${t.featured ? "text-wave-400" : "text-ocean-500"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-white/65 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <TrackedCTA
                href={t.cta.href}
                external={t.cta.href.startsWith("http")}
                location="pricing_card"
                tier={t.name}
                cta_text_override={t.cta.label}
                className={`block w-full text-center py-3.5 rounded-full font-medium text-base transition-all duration-300 ${
                  t.featured
                    ? "btn-primary text-white"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {t.cta.label}
              </TrackedCTA>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-white/40 mt-8 tracking-widest uppercase">
          All tiers include cancel-anytime · BlueWave is the parent · founding pricing locked for life on monthly tiers
        </p>
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Compare features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            What&rsquo;s in each,{" "}
            <span className="text-gradient">side by side.</span>
          </h2>
        </div>

        <div className="glass rounded-2xl overflow-hidden border border-white/5">
          <div className="grid grid-cols-4 border-b border-white/10 bg-white/5">
            <div className="p-4 text-sm font-bold text-white/80">Feature</div>
            <div className="p-4 text-sm font-bold text-white/80 text-center">ProBuildCalc</div>
            <div className="p-4 text-sm font-bold text-white/80 text-center">Ikena Web</div>
            <div className="p-4 text-sm font-bold text-gradient text-center">Ikena Suite</div>
          </div>
          {compareRows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-4 ${i !== compareRows.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <div className="p-4 text-sm text-white/70 leading-relaxed">{row.feature}</div>
              <div className="p-4 text-center"><Cell value={row.pbc} /></div>
              <div className="p-4 text-center"><Cell value={row.web} /></div>
              <div className="p-4 text-center"><Cell value={row.suite} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* ENTERPRISE TEASER */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="glass rounded-3xl p-10 sm:p-14 border border-white/10">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-wave-400 mb-3">
            Doing $5M+ a year?
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ikena Enterprise — single-tenant, white-labeled.
          </h2>
          <p className="text-white/65 leading-relaxed mb-6 max-w-3xl">
            Your own subdomain, your own branding, a dedicated instance you own end-to-end. For
            shops who want every advantage of the platform without sharing infrastructure with
            other tenants. Custom pricing — typically $499–$1,500/mo depending on scale + on-call
            needs.
          </p>
          <TrackedCTA
            href="/booking?plan=ikena-enterprise"
            location="pricing_card"
            tier="Enterprise"
            className="inline-block px-6 py-3 rounded-full btn-primary text-white text-sm"
          >
            Talk to us
          </TrackedCTA>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Honest answers
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">FAQ</h2>
        </div>

        <div className="space-y-6">
          {[
            {
              q: "How is Ikena different from ProBuildCalc?",
              a: "ProBuildCalc is the iOS scanner alone — measure, ballpark, send. Ikena is the full operator suite on the web — projects, invoices, subs, change orders, the works. Ikena Suite gives you both, wired together so a scan in the field becomes a lead in the same tenant.",
            },
            {
              q: "What does BlueWave Projects mean if Ikena is the product?",
              a: "BlueWave is the parent studio. We ship multiple products under it — Ikena is the flagship operator app, ProBuildCalc is the iOS-first sibling. Binnacle AI, Property Brief, Aloha Network and a few others all live under the same roof. One company, multiple products.",
            },
            {
              q: "Is the founding pricing actually locked for life?",
              a: "Yes. If you sign up at $79 or $99 today, that price doesn't change as long as your subscription stays active. The pricing on the public page may rise; yours doesn't.",
            },
            {
              q: "What if I outgrow ProBuildCalc?",
              a: "Upgrade to Ikena Suite directly from the app — your scan history, leads, and project context migrate cleanly. No data lost, no re-onboarding.",
            },
            {
              q: "Hawaii-specific features?",
              a: "Hawaii GET gross-ups on every invoice line, sub deductions handled at the 0.5% wholesale rate, county TMK parcel lookup, Hawaii-compliant employee handbook ready to issue. Built for Hawaii first. Works elsewhere — just won't have the tax math handled for you if you're not in HI.",
            },
          ].map((item) => (
            <div key={item.q} className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-base font-bold text-white mb-2">{item.q}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          <span className="text-white">Pick your tier.</span>{" "}
          <span className="text-gradient">Start running real jobs.</span>
        </h2>
        <TrackedCTA
          href="/signup?plan=ikena-suite&redirect=/ops"
          location="final_cta"
          tier="Ikena Suite"
          className="btn-primary inline-block px-10 py-4 rounded-full text-white font-medium text-lg"
        >
          Start free trial
        </TrackedCTA>
        <p className="mt-4 text-xs text-white/40 tracking-widest uppercase">
          14 days · cancel anytime · no card required
        </p>
      </section>

      <Footer />
    </main>
  );
}
