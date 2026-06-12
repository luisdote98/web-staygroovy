import Header from "@/components/Header";
import ScrollScenes from "@/components/ScrollScenes";
import CategorySection from "@/components/CategorySection";
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
        {/* Hero + Countdown */}
        <ScrollScenes />

        {/* Bloques de categoría: foto modelo + botón shop */}
        <CategorySection />

        {/* Resto de secciones */}
        <AboutSection />
        <CareInstructions />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
