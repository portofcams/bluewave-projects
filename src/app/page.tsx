import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

// Below-the-fold sections — lazy-loaded so they don't block first paint.
// ssr: true keeps SEO content in static HTML; only the JS hydration is deferred.
//
// 2026-05-10 pivot: hid Portfolio, BeforeAfter, School, Testimonials,
// LeadMagnet. Those four sections still sold the old AI-agency
// positioning (8 unrelated apps, AI school plug, AI consulting
// testimonials, AI lead magnet) and were diluting the contractor-SaaS
// signal to Google. They're not deleted — just removed from the homepage
// render so the page tells one coherent story. School + Portfolio can be
// brought back as their own routes (/school, /case-studies) if useful.
const Services = dynamic(() => import("@/components/Services"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const About = dynamic(() => import("@/components/About"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const BlogPreview = dynamic(() => import("@/components/BlogPreview"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
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
