import Reveal from "./Reveal";

const CARE = [
  { num: "01", label: "Del revés",           desc: "Lavar siempre del revés para proteger el gráfico." },
  { num: "02", label: "Agua fría",            desc: "Máximo 30°C. Sin calor excesivo." },
  { num: "03", label: "Sin lejía",            desc: "No usar lejía ni blanqueadores." },
  { num: "04", label: "Sin secadora",         desc: "Evitar la secadora completamente." },
  { num: "05", label: "Sin plancha directa",  desc: "No planchar sobre el grabado." },
  { num: "06", label: "Secar al aire",        desc: "En horizontal, alejado del sol directo." },
];

export default function CareInstructions() {
  return (
    <section id="cuidados" className="section-pad bg-white border-b border-[#e5e5e5]">
      <div className="container-base">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mb-14 items-end">
          <div>
            <Reveal variant="title" delay={0}>
              <p className="eyebrow mb-3">Cuidado de prenda</p>
              <h2 className="font-display title-lg text-[#0a0a0a] leading-none">CUIDADOS</h2>
            </Reveal>
          </div>
          <Reveal variant="text" delay={150}>
            <p className="text-[#0a0a0a]/45 text-sm leading-relaxed max-w-md">
              Cuida la prenda como cuidarías un vinilo raro —
              con calma, del revés y sin maltratar el gráfico.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-[#f0f0f0] rounded-xl overflow-hidden">
          {CARE.map(({ num, label, desc }, i) => (
            <Reveal key={num} variant="scene" delay={i * 80} threshold={0.05}>
              <div className={`group flex items-start gap-6 py-7 px-8 border-t border-[#e0e0e0] hover:bg-[#e8e8e8] transition-colors duration-300 cursor-default
                ${i % 2 === 0 ? "" : "md:border-l md:border-[#e0e0e0]"}`}>
                <span className="font-display text-[#c9a84c] text-2xl leading-none tracking-wider flex-shrink-0 pt-0.5 group-hover:scale-110 transition-transform duration-300">
                  {num}
                </span>
                <div>
                  <h3 className="text-[#0a0a0a] text-sm font-semibold tracking-wide group-hover:text-[#c9a84c] transition-colors duration-300">{label}</h3>
                  <p className="text-[#0a0a0a]/50 text-xs leading-relaxed mt-1">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="text" delay={200}>
          <div className="mt-10 flex items-start gap-4">
            <div className="w-0.5 min-h-[2.5rem] bg-[#c9a84c]/40 flex-shrink-0 mt-1" />
            <p className="text-[#0a0a0a]/30 text-xs leading-relaxed">
              Para conservar el grabado, lavar con prendas similares y evitar roces fuertes.
              El cuidado correcto alarga la vida de la pieza y mantiene la intensidad del gráfico.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
