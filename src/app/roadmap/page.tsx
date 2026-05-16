import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TrackedCTA } from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Roadmap — BlueWave Projects · what's shipping, what's next",
  description:
    "Public roadmap for BlueWave Projects — the studio shipping Ikena, ProBuildCalc, Binnacle AI, Property Brief, and Aloha Network. Now / next / later, updated honestly.",
  alternates: { canonical: "https://bluewaveprojects.com/roadmap" },
  openGraph: {
    title: "Roadmap — BlueWave Projects",
    description:
      "Public roadmap. Now / next / later, updated honestly. No promises, no hand-wave timelines.",
    url: "https://bluewaveprojects.com/roadmap",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

type Status = "now" | "next" | "later" | "shipped";

interface RoadmapItem {
  product: string;
  what: string;
  status: Status;
  detail?: string;
}

const items: RoadmapItem[] = [
  // Shipped recently
  { product: "Ikena", what: "Flagship product landing + 3-tier pricing wired live", status: "shipped", detail: "Web $79 / Suite $99 / Enterprise from $499. 16 ops modules in production at portal.ikenagroup.com (tenant zero)." },
  { product: "ProBuildCalc", what: "BlueWave-family announcement bar on the landing", status: "shipped", detail: "Cross-product upsell link to Ikena Suite. Container rebuilt + recreated on Vultr." },
  { product: "Property Brief", what: "Two sample brief PDFs live + inline signup capture", status: "shipped", detail: "/property-brief-sample.html (Aloha Tower) + /property-brief-sample-kahala.html. InlinePropertyBrief lead magnet on homepage + Hawaii-tagged blog posts." },
  { product: "Aloha Off-Market Network", what: "Founding-member tier open + announcement post", status: "shipped", detail: "Ten seats, free for life. Pocket-listing feed + adjacent-owner data + permit alerts. /blog/aloha-network-founding-members-open." },
  { product: "Studio", what: "Analytics layer wired (env-gated)", status: "shipped", detail: "PostHog + TrackedCTA across 8 pages, signup/login/booking funnel events, footer click capture. Activates the moment the project key lands in env vars." },
  { product: "Studio", what: "/press page + sitemap + JSON-LD schemas", status: "shipped", detail: "Product/Offer schema on /pricing, FAQ schema on /pricing, SoftwareApplication on /ikena, /press with fact sheet + story angles." },

  // Active now
  { product: "Port of Cams iOS", what: "iOS App Store submission", status: "now", detail: "Apple Developer enrollment in progress. Listing copy + screenshot plan + submission playbook all in ~/Downloads. Target: TestFlight in 1 week, full release in 2-3 weeks." },
  { product: "Aloha Network", what: "Founding-member outreach to first 10 agents", status: "now", detail: "10 named Locations.com Oahu agents + personal-network warmest contacts. Templates paste-ready in the lunch outreach packet." },
  { product: "Binnacle AI", what: "Wouter @ Hamilton.AI demo email", status: "now", detail: "Single highest-leverage warm thread in the pipeline. Pre-seeded demo token URL + email draft ready." },
  { product: "Ikena", what: "Multi-tenant security cleanup", status: "now", detail: "Replace hardcoded user_id=kai in 5 portal client files + move hardcoded Neon key to env-only + wire token-gated auth on /ops/editor share URLs." },

  // Next up
  { product: "Ikena", what: "Charter demo seed for Binnacle parity", status: "next", detail: "Aloha Charter Co. with Subchapter T vessels so prospects can pick commercial vs charter at /demo/instant." },
  { product: "Aloha Network", what: "Permit anomaly alert engine v1", status: "next", detail: "Pulls HI county permit feeds + surfaces anomalies for Builder tier ($499/mo). Currently in beta; productionize the alert pipeline." },
  { product: "Property Brief", what: "Real Wednesday digest cron + first sends", status: "next", detail: "Server-side rendering of the per-subscriber digest + Resend integration + per-tip rotation. Template + variables already spec'd." },
  { product: "Property Brief", what: "ProBuildCalc deep-link from lookup tool", status: "next", detail: "When a user looks up a property on addressapi.portofcams.com, surface a 'Get a Property Brief on this address' inline CTA with the address pre-filled in /signup." },
  { product: "BlueWave School", what: "Stripe wiring for lifetime tier", status: "next", detail: "One-time charge mode for the $199 lifetime plan. Solo + Coaching already on subscription mode." },
  { product: "Aloha Network", what: "Pocket-listing entry form (frontend + backend)", status: "next", detail: "Form copy + DB schema specced. Needs backend POST endpoint at ai.portofcams.com/api/bluewave/aloha/listings + auth gate." },

  // Later
  { product: "Ikena iOS", what: "Native iOS companion app (post-PoC submission)", status: "later", detail: "Time-clock + LiDAR scan + project-share. Reuses PoC iOS scaffolding. Sequenced after Apple Dev account + PoC TestFlight." },
  { product: "Binnacle AI", what: "Pre/post NDA toggle in admin", status: "later", detail: "DB migration + UI toggle + veil logic. Lets the operator flip a token from pre-NDA (everything gated) to post-NDA after a call." },
  { product: "Studio", what: "Ikena Enterprise single-tenant white-label tier", status: "later", detail: "Custom subdomain, custom branding, dedicated DB instance. Target: shops doing $5M+/yr. Pricing $499-$1,500/mo." },
  { product: "Studio", what: "Mainland expansion of the parcel data layer", status: "later", detail: "hawaii-as-code is Hawaii-only by design. Mainland expansion is a different product if we ever do it — not a feature add." },

  // Honest about what we're NOT doing
  { product: "Studio", what: "Mobile app for every product", status: "later", detail: "Not happening. iOS lives where iOS adds value (RoomPlan scanning, time-clock with GPS, push). Property Brief + Aloha stay web-first." },
];

const statusConfig = {
  shipped: { label: "Shipped", color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  now: { label: "Now", color: "bg-wave-400/15 text-wave-400 border-wave-400/30" },
  next: { label: "Next", color: "bg-ocean-500/15 text-ocean-300 border-ocean-500/30" },
  later: { label: "Later", color: "bg-white/10 text-white/50 border-white/20" },
};

export default function RoadmapPage() {
  const grouped: Record<Status, RoadmapItem[]> = {
    shipped: items.filter((i) => i.status === "shipped"),
    now: items.filter((i) => i.status === "now"),
    next: items.filter((i) => i.status === "next"),
    later: items.filter((i) => i.status === "later"),
  };

  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />

      <section className="px-6 pt-32 pb-16 max-w-5xl mx-auto text-center">
        <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-wave-400 mb-6">
          Public roadmap · updated honestly
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          <span className="text-white">What's shipping.</span>{" "}
          <span className="text-gradient">What's next.</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/65 leading-relaxed max-w-3xl mx-auto">
          A small studio ships one thing at a time. This roadmap is honest — no
          hand-wave timelines, no aspirational vapor, no "Q3 2026" placeholders
          for features that aren't even started. Updated as work moves.
        </p>
      </section>

      {(["now", "next", "shipped", "later"] as Status[]).map((status) => (
        <section key={status} className="px-6 py-12 max-w-5xl mx-auto">
          <div className="flex items-baseline gap-4 mb-8">
            <span className={`text-xs font-bold uppercase tracking-[0.22em] px-3 py-1 rounded-full border ${statusConfig[status].color}`}>
              {statusConfig[status].label}
            </span>
            <span className="text-sm text-white/40">
              {grouped[status].length} item{grouped[status].length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="space-y-3">
            {grouped[status].map((item, i) => (
              <div
                key={`${status}-${i}`}
                className="glass rounded-2xl p-6 border border-white/5"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-wave-400">
                    {item.product}
                  </span>
                  <h3 className="text-base font-medium text-white">{item.what}</h3>
                </div>
                {item.detail && (
                  <p className="text-sm text-white/55 leading-relaxed mt-2">{item.detail}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="px-6 py-24 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          <span className="text-white">Want input on what ships next?</span>
        </h2>
        <p className="text-white/55 leading-relaxed max-w-2xl mx-auto mb-10">
          Customers + founding members influence the roadmap directly. If
          you're a paying tenant or active prospect, your feature requests
          jump the queue.
        </p>
        <TrackedCTA
          href="/booking?topic=roadmap-input"
          location="final_cta"
          className="btn-primary inline-block px-10 py-4 rounded-full text-white font-medium text-lg"
        >
          Talk to us
        </TrackedCTA>
        <p className="mt-4 text-xs text-white/40 tracking-widest uppercase">
          Last updated: 2026-05-15
        </p>
      </section>

      <Footer />
    </main>
  );
}
