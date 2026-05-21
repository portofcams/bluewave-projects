import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TrackedCTA } from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Press — BlueWave Projects · Honolulu software studio",
  description:
    "Press resources for BlueWave Projects — fact sheet, founder bio, product portfolio, downloadable assets. For journalists, podcast hosts, and writers covering Honolulu-built AI software, Hawaii real-estate data, and operator-in-public stories.",
  alternates: { canonical: "https://bluewaveprojects.com/press" },
  openGraph: {
    title: "Press — BlueWave Projects",
    description:
      "Fact sheet, founder bio, portfolio, and assets for journalists covering BlueWave Projects.",
    url: "https://bluewaveprojects.com/press",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const facts = [
  { label: "Studio", value: "BlueWave Projects" },
  { label: "Parent entity", value: "Ikena Design & Build, LLC (S-Corp pending)" },
  { label: "Founded", value: "2026 · Honolulu, Hawaii" },
  { label: "Team size", value: "1 (solo operator)" },
  { label: "Founder", value: "John C. Thomas" },
  { label: "Headquarters", value: "Honolulu, Hawaii (HST · UTC-10)" },
  { label: "Products live", value: "12+ across web, iOS, and infra" },
  { label: "Primary stack", value: "Next.js · FastAPI · Postgres · Anthropic Claude · iOS Swift · Cloudflare · Vultr" },
];

const products = [
  { name: "Ikena", desc: "Flagship operator suite for property, contracting, and real estate. 16 ops modules.", url: "/ikena" },
  { name: "ProBuildCalc", desc: "iOS LiDAR scanner + AI estimating for the trades.", url: "https://probuildcalc.com" },
  { name: "Binnacle AI", desc: "USCG compliance + ops platform for commercial mariners.", url: "https://binnacleai.com" },
  { name: "HawaiiSTR", desc: "Hawaiʻi short-term rental compliance — all 4 counties. Permit renewals, GE/TAT/county-TAT filings, AI document classifier.", url: "https://hawaiistr.ikenagroup.com" },
  { name: "Property Brief", desc: "Weekly Hawaii parcel intel for homeowners. $15/mo.", url: "/property-brief" },
  { name: "Aloha Off-Market Network", desc: "Closed-loop pocket-listing exchange for Hawaii real estate operators.", url: "/aloha" },
  { name: "hawaii-as-code", desc: "Every parcel, building, and address in Hawaii — as TypeScript, served as 3D map.", url: "https://maps.ikenagroup.com" },
  { name: "Hawaii Property Lookup", desc: "Statewide address autocomplete + parcel card. Free, no signup.", url: "https://addressapi.portofcams.com" },
  { name: "Port of Cams", desc: "Live webcam network — 14,400+ feeds, currently capturing Kilauea Episode 47.", url: "https://portofcams.com" },
  { name: "Last Frontier Events", desc: "Alaska's event calendar across six regions.", url: "https://lastfrontierevents.com" },
  { name: "AlohaCalendar", desc: "Hawaii events platform, auto-updating every 30 minutes.", url: "https://alohacalendar.com" },
];

const storyAngles = [
  {
    title: "Solo operator + AI-native software",
    body:
      "John Thomas built and ships 12+ products as a solo operator using Anthropic Claude as primary collaborator. ~600K lines of code, ~15 billion Claude tokens through Claude Code in 9 weeks. Demonstrates a working model for the small-team future of vertical SaaS.",
  },
  {
    title: "USCG Master Captain → SaaS founder",
    body:
      "1,000+ sea days across Alaska and Hawaii. Former Operations Manager at Chugach Powder Guides, Senior Tow & Salvage Master at Sea Tow International, Charter Operations at Fjords Adventures (Seward, AK). Pivoted to software-only in 2026.",
  },
  {
    title: "Hawaii data infrastructure",
    body:
      "Mirrored every parcel in the state of Hawaii — 384,262 statewide TMK parcels, 239,458 Honolulu building footprints with real heights, 204,775 address points across all four islands — and encoded as TypeScript instead of database rows. Powers four downstream products.",
  },
  {
    title: "Operator-in-public",
    body:
      "Every feature ships first on a real Hawaii job (a residential renovation he managed and built himself for months) before reaching paying tenants. Documents the build narrative in journal posts at bluewaveprojects.com/blog.",
  },
  {
    title: "Hawaii GET handling at the software layer",
    body:
      "First construction-management platform to handle Hawaii's 0.5% wholesale GET cascade correctly. Buildertrend, Procore, and CoConstruct don't model this — Hawaii operators previously had to do the tax math externally.",
  },
];

export default function PressPage() {
  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />

      {/* HERO */}
      <section className="px-6 pt-32 pb-16 max-w-6xl mx-auto text-center">
        <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-wave-400 mb-6">
          Press · Media · Inquiries
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          <span className="text-white">For journalists,</span>{" "}
          <span className="text-gradient">writers, and hosts.</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/65 leading-relaxed max-w-3xl mx-auto mb-10">
          Fact sheet, story angles, founder bio, product portfolio. If you're
          covering Honolulu-built AI software, Hawaii real-estate data, the
          operator-in-public movement, or a solo-founder shipping at scale —
          everything you need is here.
        </p>
        <TrackedCTA
          href="mailto:portofcams@gmail.com?subject=Press%20inquiry%20%E2%80%94%20BlueWave%20Projects"
          external
          location="hero"
          cta_text_override="Email John (press inquiry)"
          className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg"
        >
          Email John for an interview
        </TrackedCTA>
      </section>

      {/* FACT SHEET */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Fact sheet
          </span>
          <h2 className="text-4xl font-bold tracking-tight">
            <span className="text-gradient">The numbers and names.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {facts.map((f) => (
            <div key={f.label} className="glass rounded-2xl p-6 border border-white/5">
              <div className="text-xs text-wave-400 uppercase tracking-[0.18em] mb-2">{f.label}</div>
              <div className="text-base text-white">{f.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY ANGLES */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Possible story angles
          </span>
          <h2 className="text-4xl font-bold tracking-tight">
            <span className="text-gradient">Pre-thought hooks for the piece.</span>
          </h2>
          <p className="text-white/55 max-w-2xl mx-auto leading-relaxed mt-4">
            Any of these are fair game. Mix and match. Quote freely.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {storyAngles.map((s) => (
            <div key={s.title} className="glass rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT PORTFOLIO */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Products
          </span>
          <h2 className="text-4xl font-bold tracking-tight">
            <span className="text-gradient">10 live, more in development.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {products.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target={p.url.startsWith("http") ? "_blank" : undefined}
              rel={p.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all"
            >
              <h3 className="text-lg font-bold text-white mb-2">{p.name}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* DOWNLOADABLE ASSETS */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="glass rounded-3xl p-10 sm:p-14 border border-white/10">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Assets
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Logos, photos, and copy
          </h2>
          <p className="text-white/65 leading-relaxed mb-6 max-w-3xl">
            High-resolution founder photo: <a href="/captain.webp" target="_blank" className="text-wave-400 underline">captain.webp</a> (1024×1024, square crop also available on request).
            Generic OG image (1200×630): <a href="/og-default.png" target="_blank" className="text-wave-400 underline">og-default.png</a>.
            Captain's résumé PDF: see <Link href="/captain" className="text-wave-400 underline">/captain</Link>.
            Sample Property Brief (PDF): <a href="/property-brief-sample.html" target="_blank" className="text-wave-400 underline">/property-brief-sample.html</a>.
          </p>
          <p className="text-sm text-white/50">
            Need a different format, logo SVG, or specific asset? Email
            portofcams@gmail.com and you'll get a reply within 24 hours.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 py-32 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          <span className="text-white">Quick to reply.</span>{" "}
          <span className="text-gradient">Honest answers.</span>
        </h2>
        <p className="text-white/55 leading-relaxed max-w-2xl mx-auto mb-10">
          Press inquiries get a same-day reply from John directly. No press
          rep, no PR firm, no agency layer.
        </p>
        <TrackedCTA
          href="mailto:portofcams@gmail.com?subject=Press%20inquiry%20%E2%80%94%20BlueWave%20Projects"
          external
          location="final_cta"
          cta_text_override="Email John (press final)"
          className="btn-primary inline-block px-10 py-4 rounded-full text-white font-medium text-lg"
        >
          Email John
        </TrackedCTA>
        <p className="mt-4 text-xs text-white/40 tracking-widest uppercase">
          Honolulu, Hawaii · HST (UTC-10) · same-day reply
        </p>
      </section>

      <Footer />
    </main>
  );
}
