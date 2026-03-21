import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfter from "@/components/BeforeAfter";
import Pricing from "@/components/Pricing";
import School from "@/components/School";
import About from "@/components/About";

import LeadMagnet from "@/components/LeadMagnet";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
      <Pricing />

      <LeadMagnet />
      <BlogPreview />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
