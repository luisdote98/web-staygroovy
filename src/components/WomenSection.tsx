"use client";

import Image from "next/image";
import Reveal from "./Reveal";

export default function WomenSection() {
  return (
    <section id="tops-mujer" className="section-pad bg-[#f5f5f5] border-b border-[#e5e5e5]">
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text — left */}
          <div className="order-2 lg:order-1">
            <Reveal variant="fade-up-blur" delay={0}>
              <p className="eyebrow mb-4">Para ella</p>
            </Reveal>
            <Reveal variant="fade-up-blur" delay={80}>
              <h2 className="font-display title-lg text-[#0a0a0a] mb-6">
                TOPS<br />MUJER
              </h2>
            </Reveal>
            <Reveal variant="fade-up-blur" delay={160}>
              <p className="text-[#0a0a0a]/65 text-base leading-relaxed mb-4 max-w-md">
                Diseñados para bailar, moverse y formar parte de la noche.
              </p>
              <p className="text-[#0a0a0a]/40 text-sm leading-relaxed mb-8 max-w-md">
                Crop tops de tela elástica con gráfica Stay Groovy. Ajuste ceñido,
                tela flexible y cómoda. Para llevarlos dentro del club y al día siguiente.
              </p>
            </Reveal>
            <Reveal variant="fade-up-blur" delay={240}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[#0a0a0a]/30 text-[10px] tracking-[0.2em] uppercase">Tallas</span>
                {["S", "M", "L"].map((s) => (
                  <span key={s} className="w-8 h-8 border border-[#0a0a0a]/15 text-[#0a0a0a]/50 text-[11px] font-medium flex items-center justify-center">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal variant="fade-up-blur" delay={300}>
              <a href="#shop" className="btn-gold">Ver tops</a>
            </Reveal>
          </div>

          {/* Images — right */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3">
              <Reveal variant="fade-up-blur" delay={100} threshold={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  <Image
                    src="/models/model-women-1.png"
                    alt="Stay Groovy Top Mujer"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </Reveal>
              <Reveal variant="fade-up-blur" delay={200} threshold={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mt-8">
                  <Image
                    src="/models/model-women-2.png"
                    alt="Stay Groovy Top Mujer"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
