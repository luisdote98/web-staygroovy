"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col" style={{ minHeight: "92vh", paddingTop: "72px" }}>

      {/* ── Main split panel ── */}
      <div className="flex flex-col lg:flex-row flex-1">

        {/* LEFT — dark panel */}
        <div className="bg-[#0a0a0a] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-14 lg:py-0 lg:w-[42%] xl:w-[40%]">
          <p className="eyebrow mb-6">Granada · Groove Culture</p>

          <Image
            src="/logos/logo-letras.png"
            alt="Stay Groovy"
            width={360}
            height={150}
            className="w-[200px] sm:w-[260px] lg:w-[300px] h-auto object-contain invert mb-5"
            priority
          />

          <h1 className="font-display text-white leading-none mb-5"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
            MERCH
          </h1>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-1 max-w-xs">
            Piezas oversize de algodón para la cultura de club.
          </p>
          <p className="text-white/35 text-xs leading-relaxed mb-10 max-w-xs">
            Oversize cotton pieces for club culture.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#shop" className="btn-gold">
              Ver colección →
            </a>
            <a href="#sobre-nosotros" className="btn-outline-dark">
              Sobre la marca
            </a>
          </div>
        </div>

        {/* RIGHT — white/light panel with product grid */}
        <div className="bg-[#f5f5f5] flex-1 p-4 sm:p-6 lg:p-8">
          <div className="h-full grid grid-cols-3 gap-3" style={{ minHeight: "420px" }}>

            {/* Big product — spans 2 cols and full height */}
            <div className="col-span-2 relative rounded-sm overflow-hidden bg-white">
              <Image
                src="/products/tee-black-product.png"
                alt="Camiseta Oversize Negra"
                fill
                className="object-contain p-6 lg:p-10"
                priority
                sizes="40vw"
              />
              <span className="absolute top-3 left-3 bg-[#c9a84c] text-[#0a0a0a] text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5">
                Precio lanzamiento
              </span>
            </div>

            {/* Two small products stacked */}
            <div className="flex flex-col gap-3">
              <div className="flex-1 relative rounded-sm overflow-hidden bg-white">
                <Image
                  src="/products/tee-white-product.png"
                  alt="Camiseta Oversize Blanca"
                  fill
                  className="object-contain p-4 lg:p-6"
                  sizes="15vw"
                />
              </div>
              <div className="flex-1 relative rounded-sm overflow-hidden bg-white">
                <Image
                  src="/products/top-black-product.png"
                  alt="Top Mujer Negro"
                  fill
                  className="object-contain p-4 lg:p-6"
                  sizes="15vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
