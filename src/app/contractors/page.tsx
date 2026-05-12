import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

// This page is the contractor + realtor pitch: scope generator, project
// room, property brief, off-market network, pricing. Pulled off the
// homepage on 2026-05-11 so the homepage can showcase the full studio
// portfolio instead of one vertical.
const Services = dynamic(() => import("@/components/Services"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const About = dynamic(() => import("@/components/About"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const BlogPreview = dynamic(() => import("@/components/BlogPreview"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export const metadata: Metadata = {
  title: "BlueWave Projects for contractors + realtors — Hawaii built",
  description:
    "Project room, AI scope generator, RoomPlan blueprints, off-market deal flow, weekly property briefs — the operations stack for Hawaii design-build contractors and real estate operators.",
  keywords: [
    "contractor project management",
    "construction software",
    "AI scope generator",
    "RoomPlan blueprint",
    "real estate off market",
    "Hawaii property data",
    "design build SaaS",
    "Hawaii contractor software",
    "client portal construction",
  ],
  alternates: { canonical: "https://bluewaveprojects.com/contractors" },
  openGraph: {
    title: "BlueWave Projects for contractors + realtors",
    description:
      "Scope, blueprint, client share, off-market deal flow — built for Hawaii contractors and real estate operators.",
    url: "https://bluewaveprojects.com/contractors",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueWave Projects — Contractors + Realtors",
    description:
      "Scope, blueprint, client share, off-market deal flow.",
    images: ["/og-default.png"],
  },
};

export default function ContractorsPage() {
  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />
      <Hero />
      <Services />
      <HowItWorks />
      <About />
      <Pricing />
      <BlogPreview />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
