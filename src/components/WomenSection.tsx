"use client";

import Image from "next/image";
import Reveal from "./Reveal";

export default function WomenSection() {
  return (
    <section id="tops-mujer" className="section-pad bg-[#f5f5f5] border-b border-[#e5e5e5]">
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text — left */}
          <div className="order-2 lg:order-1 flex flex-col gap-5">
            <Reveal variant="title" delay={0}>
              <p className="eyebrow">Para ella</p>
            </Reveal>
            <Reveal variant="title" delay={120}>
              <h2 className="font-display title-lg text-[#0a0a0a]">TOPS<br />MUJER</h2>
            </Reveal>
            <Reveal variant="text" delay={240}>
              <p className="text-[#0a0a0a]/65 text-base leading-relaxed max-w-md">
                Diseñados para bailar, moverse y formar parte de la noche.
              </p>
              <p className="text-[#0a0a0a]/40 text-sm leading-relaxed mt-2 max-w-md">
                Crop tops de tela elástica con gráfica Stay Groovy. Ajuste ceñido,
                tela flexible y cómoda.
              </p>
            </Reveal>
            <Reveal variant="text" delay={340}>
              <div className="flex items-center gap-3">
                <span className="text-[#0a0a0a]/30 text-[10px] tracking-[0.2em] uppercase">Tallas</span>
                {["S", "M", "L"].map((s) => (
                  <span key={s} className="w-8 h-8 border border-[#0a0a0a]/15 text-[#0a0a0a]/50 text-[11px] font-medium flex items-center justify-center">{s}</span>
                ))}
              </div>
            </Reveal>
            <Reveal variant="action" delay={440}>
              <a href="#shop" className="btn-gold self-start">Ver tops</a>
            </Reveal>
          </div>

          {/* Images — right */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3">
              <Reveal variant="image" delay={80} threshold={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  <Image src="/models/model-women-1.png" alt="Stay Groovy Top Mujer" fill
                    className="object-cover object-top" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
              </Reveal>
              <Reveal variant="image" delay={200} threshold={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mt-8">
                  <Image src="/models/model-women-2.png" alt="Stay Groovy Top Mujer" fill
                    className="object-cover object-top" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
