import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CountdownBanner from "@/components/CountdownBanner";
import LaunchBanner from "@/components/LaunchBanner";
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

      {/*
        snap-container activa scroll-snap en desktop (≥1024px).
        En móvil el scroll es libre y normal.
      */}
      <main
        className="snap-container"
        style={{
          // En desktop: contenedor scroll independiente con snap
          // En móvil: comportamiento normal (CSS media query lo controla)
        }}
      >
        {/* Hero — ya tiene 100svh, no necesita Scene wrapper */}
        <div className="snap-scene">
          <Hero />
        </div>

        {/* Countdown / First Drop */}
        <div className="snap-scene">
          <CountdownBanner />
        </div>

        {/* Launch Banner */}
        <div className="snap-scene">
          <LaunchBanner />
        </div>

        {/* Shop */}
        <div className="snap-scene">
          <ProductGrid />
        </div>

        {/* Tops Mujer */}
        <div className="snap-scene">
          <WomenSection />
        </div>

        {/* Sobre Nosotros */}
        <div className="snap-scene">
          <AboutSection />
        </div>

        {/* Cuidados */}
        <div className="snap-scene">
          <CareInstructions />
        </div>

        {/* Contacto */}
        <div className="snap-scene">
          <ContactSection />
        </div>

        {/* Footer — no snap, cierra la página */}
        <Footer />
      </main>
    </>
  );
}
