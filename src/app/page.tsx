import Header from "@/components/Header";
import ScrollScenes from "@/components/ScrollScenes";
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
        {/* ── Bloque cinematográfico: 4 escenas en sticky crossfade ── */}
        <ScrollScenes />

        {/* ── Ecommerce normal: scroll libre ── */}
        <ProductGrid />
        <WomenSection />
        <AboutSection />
        <CareInstructions />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
