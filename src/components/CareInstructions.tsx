const CARE = [
  { icon: "↺",  label: "Del revés",           desc: "Lavar siempre del revés para proteger el gráfico." },
  { icon: "30°", label: "Agua fría",           desc: "Máximo 30°C. Sin calor excesivo." },
  { icon: "◌",  label: "Sin lejía",            desc: "No usar lejía ni blanqueadores." },
  { icon: "✕",  label: "Sin secadora",         desc: "Evitar la secadora completamente." },
  { icon: "▽",  label: "Sin plancha directa",  desc: "No planchar sobre el grabado." },
  { icon: "≋",  label: "Secar al aire",        desc: "Secar en horizontal, al aire libre." },
];

export default function CareInstructions() {
  return (
    <section id="cuidados" className="section-pad bg-[#f5f5f5] border-b border-[#e5e5e5]">
      <div className="container-base">

        <div className="mb-12">
          <p className="eyebrow mb-3">Cuidado de prenda</p>
          <h2 className="font-display title-lg text-[#0a0a0a] mb-4">CUIDADOS</h2>
          <p className="text-[#0a0a0a]/45 text-sm leading-relaxed max-w-xl">
            Cuida la prenda como cuidarías un vinilo raro: con calma, del revés
            y sin maltratar el gráfico.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CARE.map(({ icon, label, desc }) => (
            <div
              key={label}
              className="bg-white border border-[#e5e5e5] rounded-sm p-6 hover:border-[#c9a84c]/40 transition-colors duration-300 group"
            >
              <span className="block font-display text-2xl text-[#c9a84c] mb-4 group-hover:scale-110 transition-transform duration-200 origin-left">
                {icon}
              </span>
              <h3 className="text-[#0a0a0a] text-sm font-semibold mb-1.5">{label}</h3>
              <p className="text-[#0a0a0a]/40 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[#0a0a0a]/25 text-xs leading-relaxed max-w-2xl border-l-2 border-[#c9a84c]/40 pl-4">
          Para conservar el grabado, lavar con prendas similares, evitar roces
          fuertes y nunca usar centrifugado agresivo.
        </p>
      </div>
    </section>
  );
}
