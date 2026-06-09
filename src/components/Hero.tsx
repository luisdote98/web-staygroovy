import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "72px" }}
    >
      {/* ── Background video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-contain md:object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay so logo stays legible ── */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.55)", zIndex: 1 }}
      />

      {/* ── Content ── */}
      <div
        className="relative flex flex-col items-center justify-center gap-4"
        style={{ zIndex: 2 }}
      >
        <Image
          src="/logos/logo-letras.png"
          alt="Stay Groovy"
          width={420}
          height={175}
          className="w-48 sm:w-64 md:w-80 lg:w-[380px] h-auto object-contain invert"
          priority
        />

        <h1
          className="font-display text-white tracking-[0.12em] leading-none"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)", margin: 0 }}
        >
          MERCH
        </h1>
      </div>
    </section>
  );
}
