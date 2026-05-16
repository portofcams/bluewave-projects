import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TrackedCTA } from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Ikena — the operator suite for property, contracting & real estate",
  description:
    "Ikena is the BlueWave family's flagship operator app. Sixteen ops modules on the web, an iOS LiDAR scanner in the field, AI workflows that turn a walk-through into a draft estimate. Built by an operator running real Hawaii projects.",
  alternates: { canonical: "https://bluewaveprojects.com/ikena" },
  openGraph: {
    title: "Ikena — operator suite for property, contracting & real estate",
    description:
      "The flagship app in the BlueWave family. Web admin (16 modules) + iOS LiDAR scanner + AI workflows. Hawaii-built, multi-tenant.",
    url: "https://bluewaveprojects.com/ikena",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, type: "image/png" }],
  },
};

const modules = [
  { name: "Projects", desc: "Multi-project pipeline, status, contract value, days-elapsed, photos." },
  { name: "Clients", desc: "Per-client view with project history, contacts, document trail." },
  { name: "Invoices", desc: "PDF generation, Hawaii GET gross-ups, sub deduction math, public approve links." },
  { name: "Subs & GET", desc: "Subcontractor ledger with 0.5% wholesale rate handling. No spreadsheet." },
  { name: "Time", desc: "iOS clock in/out feeds straight into the web ledger. Geofenced, photo-stamped." },
  { name: "Daily logs", desc: "Field notes, weather, headcount, photos. Client-shareable timeline." },
  { name: "Documents", desc: "Auto-filed: invoice → PDF → client docs section. Versioned, signed via DocuSeal." },
  { name: "Selections", desc: "Client picks finishes from a curated list. Approvals timestamped." },
  { name: "Change orders", desc: "Approved CO auto-creates a draft invoice line with GET gross-up." },
  { name: "Blueprint editor", desc: "Edit room geometry from a LiDAR scan. Dimensions, openings, objects." },
  { name: "3D editor", desc: "Walk the scan in 3D. Pin photos to AR world transforms. Compare scans over time." },
  { name: "Leads", desc: "Public scope form → AI categorisation → tenant inbox with priority + sentiment." },
  { name: "Employees", desc: "Crew roster, certs, payroll inputs. Hawaii-compliant onboarding handbook included." },
  { name: "Handbook", desc: "21-section Hawaii + federal employee handbook ready to issue on first hire." },
  { name: "Timeline", desc: "Cross-project activity feed. Every approval, sub payment, CO, document — one stream." },
  { name: "Settings", desc: "Branding, subdomain, billing, member roles, tenant-wide preferences." },
];

const proofPoints = [
  { stat: "16", label: "Live ops modules" },
  { stat: "13+", label: "API routers backing the platform" },
  { stat: "Multi-tenant", label: "Phase 1.5 — every endpoint tenant-scoped" },
  { stat: "Hawaii-aware", label: "GET, PTET, sub deductions, county zoning built in" },
];

export default function IkenaPage() {
  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />

      {/* HERO */}
      <section className="px-6 pt-32 pb-16 max-w-6xl mx-auto text-center">
        <div className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-wave-400 mb-6">
          The BlueWave flagship
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          <span className="text-white">Ikena.</span>{" "}
          <span className="text-gradient">The operator&rsquo;s complete kit.</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/65 leading-relaxed max-w-3xl mx-auto mb-10">
          Sixteen ops modules on the web. An iOS LiDAR scanner in the field. AI workflows that
          turn a walk-through into a draft estimate before you leave the parking lot. Built by an
          operator running real Hawaii projects — property, contracting, real estate, one platform.
        </p>

        <div className="flex flex-wrap justify-center gap-4 items-center">
          <TrackedCTA
            href="/pricing"
            location="hero"
            className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg"
          >
            See pricing
          </TrackedCTA>
          <TrackedCTA
            href="/booking?plan=ikena-suite"
            location="hero"
            className="px-8 py-4 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-colors text-lg"
          >
            Book a 20-min walkthrough
          </TrackedCTA>
        </div>

        <p className="mt-6 text-xs text-white/40 tracking-widest uppercase">
          Honolulu-built · Multi-tenant · Founding pricing locked for life
        </p>
      </section>

      {/* TWO PILLARS — Web + iOS */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-10 border border-white/5">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-wave-400 mb-3">
              Web admin
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Sixteen modules. One ledger.</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Every surface a Hawaii operator actually touches: projects, invoices with GET
              handled correctly, subs and time, daily logs, selections, change orders, blueprint
              + 3D editor, employees + handbook, leads. Sixteen modules, one place.
            </p>
            <p className="text-sm text-white/40">
              Live and in production at portal.ikenagroup.com as tenant zero. Every new tenant
              gets the same kit, isolated.
            </p>
          </div>

          <div className="glass rounded-2xl p-10 border border-white/5">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-wave-400 mb-3">
              iOS scanner
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">LiDAR in the field.</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Apple RoomPlan + Object Capture, native. Multi-room stitching, photo pinning to AR
              world transforms, time-lapse compare with geometric diff, AI design overlay that
              calls Claude with scan + budget + style context.
            </p>
            <p className="text-sm text-white/40">
              Scan ends, hit Send-as-lead, the project shows up in your web admin with a draft
              ballpark on it. Same tenant, same auth, one continuous workflow.
            </p>
          </div>
        </div>
      </section>

      {/* MODULE GRID */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            What ships in Ikena Web
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Sixteen modules,{" "}
            <span className="text-gradient">each pulling its weight.</span>
          </h2>
          <p className="text-white/55 max-w-2xl mx-auto leading-relaxed">
            These aren&rsquo;t features on a roadmap. They&rsquo;re live, in production, running
            an active Hawaii residential renovation right now.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((m) => (
            <div
              key={m.name}
              className="glass rounded-2xl p-6 border border-white/5"
            >
              <h3 className="text-base font-bold text-white mb-2">{m.name}</h3>
              <p className="text-xs text-white/55 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF STATS */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {proofPoints.map((p) => (
            <div
              key={p.label}
              className="glass rounded-2xl p-8 text-center border border-white/5"
            >
              <div className="text-3xl font-bold text-gradient mb-2">{p.stat}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider leading-relaxed">{p.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBUILDCALC POSITIONING */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="glass rounded-3xl p-10 sm:p-14 border border-white/10">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-wave-400 mb-3">
            Or start lighter
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Just want the iOS scanner?
          </h2>
          <p className="text-white/65 leading-relaxed mb-6 max-w-2xl">
            ProBuildCalc is the standalone iOS app — same LiDAR scanning, same AI ballpark, same
            Hawaii operator behind it. No web admin, no team features. $19/mo for the operators
            who just need a measure-and-quote tool in their pocket.
          </p>
          <div className="flex flex-wrap gap-4">
            <TrackedCTA
              href="https://probuildcalc.com"
              external
              location="inline"
              className="px-6 py-3 rounded-full bg-white/5 text-white border border-white/15 hover:bg-white/10 transition-all text-sm"
            >
              probuildcalc.com &rarr;
            </TrackedCTA>
            <TrackedCTA
              href="/pricing"
              location="inline"
              className="px-6 py-3 rounded-full btn-primary text-white text-sm"
            >
              Compare all tiers
            </TrackedCTA>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          <span className="text-white">Run real jobs.</span>{" "}
          <span className="text-gradient">In a tool built by someone who has.</span>
        </h2>
        <TrackedCTA
          href="/pricing"
          location="final_cta"
          className="btn-primary inline-block px-10 py-4 rounded-full text-white font-medium text-lg"
        >
          See pricing
        </TrackedCTA>
        <p className="mt-4 text-xs text-white/40 tracking-widest uppercase">
          Free 14-day trial · cancel anytime · founding pricing locked for life
        </p>
      </section>

      <Footer />
    </main>
  );
}
