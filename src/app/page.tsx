import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";

// Below-the-fold sections — lazy-loaded so they don't block first paint.
// ssr: true keeps SEO content in static HTML; only the JS hydration is deferred.
const Services = dynamic(() => import("@/components/Services"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const BeforeAfter = dynamic(() => import("@/components/BeforeAfter"));
const School = dynamic(() => import("@/components/School"));
const About = dynamic(() => import("@/components/About"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const LeadMagnet = dynamic(() => import("@/components/LeadMagnet"));
const BlogPreview = dynamic(() => import("@/components/BlogPreview"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />
      <Hero />
      <Portfolio />
      <Services />
      <HowItWorks />
      <BeforeAfter />
      <School />
      <About />
      <Testimonials />
      <Pricing />

      <LeadMagnet />
      <BlogPreview />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
