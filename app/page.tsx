import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { LocalMarketplace } from "@/components/LocalMarketplace";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LocalMarketplace />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}