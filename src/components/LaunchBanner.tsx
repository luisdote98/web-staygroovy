import { Leaf, Shirt, Sparkles, Lock } from "lucide-react";
import Reveal from "./Reveal";

const CARDS = [
  { Icon: Leaf,     label: "Material", value: "100% Algodón premium" },
  { Icon: Shirt,    label: "Fit",      value: "Oversize" },
  { Icon: Sparkles, label: "Gráfica",  value: "Frontal y espalda" },
  { Icon: Lock,     label: "Edición",  value: "Drop limitado" },
];

export default function LaunchBanner() {
  return (
    <section className="bg-[#0a0a0a] py-16 md:py-20">
      <div className="container-base">
        <div className="border border-white/[0.1] rounded-xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* LEFT */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <Reveal variant="title" delay={0}>
                <p className="eyebrow mb-6">Drop · Primer mes</p>
              </Reveal>
              <Reveal variant="title" delay={100}>
                <div className="flex items-end gap-5 mb-4">
                  <span className="font-display text-white leading-none" style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}>18€</span>
                  <div className="pb-2 flex flex-col gap-0.5">
                    <span className="text-white/25 text-xl leading-none line-through">22€</span>
                    <span className="text-[#c9a84c] text-[10px] tracking-[0.25em] uppercase">después</span>
                  </div>
                </div>
              </Reveal>
              <Reveal variant="text" delay={200}>
                <p className="text-white/40 text-sm leading-relaxed">
                  <span className="text-white/70 font-medium">Precio de lanzamiento</span>{" "}durante el primer mes
                </p>
                <div className="w-10 h-[2px] bg-[#c9a84c] mt-6" />
              </Reveal>
            </div>

            <Reveal variant="text" delay={300}>
              <blockquote className="border-l-2 border-[#c9a84c] pl-5">
                <p className="font-display text-white leading-tight tracking-[0.03em]"
                   style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                  DEL BOOTH A TU ARMARIO.<br />STAY GROOVY FIRST DROP.
                </p>
              </blockquote>
            </Reveal>

            <Reveal variant="action" delay={420}>
              <a href="#shop" className="btn-gold self-start px-10 py-4 text-sm tracking-[0.2em]">
                Comprar ahora →
              </a>
            </Reveal>
          </div>

          {/* RIGHT: cards */}
          <div className="grid grid-cols-2 gap-5">
            {CARDS.map(({ Icon, label, value }, i) => (
              <Reveal key={label} variant="scene" delay={i * 120}>
                <div className="group bg-[#121212] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5 hover:border-[#c9a84c]/30 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full border border-[#c9a84c]/50 flex items-center justify-center">
                    <Icon className="w-[18px] h-[18px] text-[#c9a84c]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[#c9a84c] text-[10px] tracking-[0.25em] uppercase font-medium mb-2">{label}</p>
                    <p className="text-white font-medium leading-snug" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>{value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
