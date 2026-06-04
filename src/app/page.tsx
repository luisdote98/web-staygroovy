import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CountdownBanner from "@/components/CountdownBanner";
import ProductGrid from "@/components/ProductGrid";
import WomenSection from "@/components/WomenSection";
import AboutSection from "@/components/AboutSection";
import CareInstructions from "@/components/CareInstructions";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";

export default function Home() {
  return (
    <>
      <Header />
      <CartSidebar />
      <main>
        <Hero />
        <CountdownBanner />
        <ProductGrid />
        <WomenSection />
        <AboutSection />
        <CareInstructions />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
