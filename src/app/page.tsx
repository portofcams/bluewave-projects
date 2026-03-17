import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import School from "@/components/School";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />
      <Hero />
      <Portfolio />
      <Services />
      <School />
      <Contact />
      <Footer />
    </main>
  );
}
