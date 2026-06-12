import Image from "next/image";
import Reveal from "./Reveal";

const PARRAFOS = [
  "Nacemos en Granada con una visión clara: crear ropa que represente nuestra identidad dentro de la cultura de club.",
  "Cada pieza está pensada para quienes viven la música desde dentro.",
  "Nuestro logo es el núcleo de todo. Evoluciona con cada drop: nuevos colores, formas 3D y colaboraciones exclusivas.",
];

export default function AboutSection() {
  return (
    <div id="sobre-nosotros" className="bg-white border-b border-[#e5e5e5] scene-center" style={{ minHeight: "100vh" }}>
      <div className="container-base section-pad">

        {/* ── DESKTOP: 2 columnas (imagen izq, texto der) ── */}
        <div className="hidden lg:grid grid-cols-2 gap-20 items-center">
          <Reveal variant="image" delay={0} threshold={0.06}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#f5f5f5]">
              <Image src="/models/model-tee-side.jpg" alt="Stay Groovy" fill className="object-cover"
                sizes="50vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-16 pb-6 flex justify-center">
                <div className="text-center">
                  <p className="font-display text-sm text-[#c9a84c] tracking-widest">GRX</p>
                  <p className="text-white/50 text-[10px] tracking-[0.15em] uppercase mt-0.5">Base</p>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            <Reveal variant="title" delay={0}>
              <p className="eyebrow mb-1">Sobre nosotros</p>
              <h2 className="font-display title-lg text-[#0a0a0a]">STAY GROOVY</h2>
            </Reveal>
            <div className="h-px bg-[#e5e5e5]" />
            <Reveal variant="text" delay={180}>
              <div className="flex flex-col gap-4 text-[#0a0a0a]/55 text-sm leading-relaxed max-w-lg">
                {PARRAFOS.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Reveal>
            <div className="h-px bg-[#e5e5e5]" />
            <Reveal variant="text" delay={300}>
              <blockquote className="border-l-2 border-[#c9a84c] pl-4">
                <p className="text-[#0a0a0a] text-base font-medium leading-snug">"Cada colección, una experiencia diferente."</p>
                <cite className="text-[#0a0a0a]/35 text-[11px] tracking-[0.15em] uppercase not-italic mt-1 block">— Stay Groovy, Granada</cite>
              </blockquote>
            </Reveal>
          </div>
        </div>

        {/* ── MÓVIL: columna única, imagen después del texto ── */}
        <div className="flex flex-col gap-6 lg:hidden">
          <Reveal variant="title" delay={0}>
            <p className="eyebrow mb-1">Sobre nosotros</p>
            <h2 className="font-display title-lg text-[#0a0a0a]">STAY GROOVY</h2>
          </Reveal>
          <div className="h-px bg-[#e5e5e5]" />
          <Reveal variant="text" delay={180}>
            <div className="flex flex-col gap-4 text-[#0a0a0a]/55 text-sm leading-relaxed">
              {PARRAFOS.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Reveal>
          <Reveal variant="image" delay={60} threshold={0.06}>
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-[#f5f5f5]">
              <Image src="/models/model-tee-side.jpg" alt="Stay Groovy" fill className="object-contain"
                sizes="100vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-16 pb-6 flex justify-center">
                <div className="text-center">
                  <p className="font-display text-sm text-[#c9a84c] tracking-widest">GRX</p>
                  <p className="text-white/50 text-[10px] tracking-[0.15em] uppercase mt-0.5">Base</p>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="h-px bg-[#e5e5e5]" />
          <Reveal variant="text" delay={300}>
            <blockquote className="border-l-2 border-[#c9a84c] pl-4">
              <p className="text-[#0a0a0a] text-base font-medium leading-snug">"Cada colección, una experiencia diferente."</p>
              <cite className="text-[#0a0a0a]/35 text-[11px] tracking-[0.15em] uppercase not-italic mt-1 block">— Stay Groovy, Granada</cite>
            </blockquote>
          </Reveal>
        </div>

      </div>
    </div>
  );
}
