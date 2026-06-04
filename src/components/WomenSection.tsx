"use client";

import Image from "next/image";

export default function WomenSection() {
  return (
    <section id="tops-mujer" className="section-pad bg-[#f5f5f5] border-b border-[#e5e5e5]">
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text — left */}
          <div className="order-2 lg:order-1">
            <p className="eyebrow mb-4">Para ella</p>
            <h2 className="font-display title-lg text-[#0a0a0a] mb-6">
              TOPS<br />MUJER
            </h2>
            <p className="text-[#0a0a0a]/65 text-base leading-relaxed mb-4 max-w-md">
              Diseñados para bailar, moverse y formar parte de la noche.
            </p>
            <p className="text-[#0a0a0a]/40 text-sm leading-relaxed mb-8 max-w-md">
              Crop tops de algodón con gráfica Stay Groovy. Ajuste ceñido, tela
              suave. Para llevarlos dentro del club y llevarlos al día siguiente.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-[#0a0a0a]/30 text-[10px] tracking-[0.2em] uppercase">Tallas</span>
              {["S", "M", "L"].map((s) => (
                <span key={s} className="w-8 h-8 border border-[#0a0a0a]/15 text-[#0a0a0a]/50 text-[11px] font-medium flex items-center justify-center">
                  {s}
                </span>
              ))}
            </div>

            <a href="#shop" className="btn-gold">Ver tops</a>
          </div>

          {/* Images — right */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white">
                <Image
                  src="/models/model-women-1.png"
                  alt="Stay Groovy Top Mujer"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white mt-8">
                <Image
                  src="/models/model-women-2.png"
                  alt="Stay Groovy Top Mujer"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
