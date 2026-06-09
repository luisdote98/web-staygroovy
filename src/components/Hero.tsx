import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="flex flex-col bg-white"
      style={{ paddingTop: "72px" }}
    >
      {/* ── Logo + MERCH — arriba del vídeo ── */}
      <div className="flex flex-col items-center justify-center gap-3 py-10 sm:py-12">
        <Image
          src="/logos/logo-letras.png"
          alt="Stay Groovy"
          width={420}
          height={175}
          className="w-40 sm:w-56 md:w-72 lg:w-80 h-auto object-contain"
          priority
        />
        <h1
          className="font-display text-[#0a0a0a] tracking-[0.15em] leading-none"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", margin: 0 }}
        >
          MERCH
        </h1>
      </div>

      {/* ── Vídeo debajo del texto ── */}
      <div className="w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto block"
          style={{ maxHeight: "75vh", objectFit: "cover" }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
