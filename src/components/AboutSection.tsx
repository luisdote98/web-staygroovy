import Image from "next/image";
import Reveal from "./Reveal";

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
                <p>Stay Groovy nace en Granada con una visión clara: crear una marca de ropa que refleje nuestra identidad dentro de la cultura de club. Cada pieza está pensada para quien vive la música desde dentro.</p>
                <p>Nuestro logo es el núcleo de todo. Lo entendemos como algo vivo, en constante evolución — nuevos colores, formas 3D, colaboraciones y detalles que irán apareciendo con cada drop.</p>
              </div>
            </Reveal>
            <div className="h-px bg-[#e5e5e5]" />
            <Reveal variant="text" delay={300}>
              <blockquote className="border-l-2 border-[#c9a84c] pl-4">
                <p className="text-[#0a0a0a] text-base font-medium leading-snug">"Cada colección, una experiencia diferente."</p>
                <cite className="text-[#0a0a0a]/35 text-[11px] tracking-[0.15em] uppercase not-italic mt-1 block">— Stay Groovy, Granada</cite>
              </blockquote>
            </Reveal>
            <Reveal variant="action" delay={420}>
              <div className="flex items-center gap-3 pt-2">
                <Image src="/logos/logo-hat.png" alt="" width={40} height={40} className="w-9 h-9 object-contain opacity-30" />
                <div>
                  <p className="text-[#0a0a0a]/25 text-[10px] tracking-[0.2em] uppercase">Contacto</p>
                  <a href="mailto:staygroovy.duo@gmail.com" className="text-[#c9a84c] text-xs hover:text-[#b8943d] transition-colors">staygroovy.duo@gmail.com</a>
                </div>
              </div>
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
              <p>Stay Groovy nace en Granada con una visión clara: crear una marca de ropa que refleje nuestra identidad dentro de la cultura de club. Cada pieza está pensada para quien vive la música desde dentro.</p>
              <p>Nuestro logo es el núcleo de todo. Lo entendemos como algo vivo, en constante evolución — nuevos colores, formas 3D, colaboraciones y detalles que irán apareciendo con cada drop.</p>
            </div>
          </Reveal>
          <Reveal variant="image" delay={60} threshold={0.06}>
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-[#f5f5f5]">
              <Image src="/models/model-tee-side.jpg" alt="Stay Groovy" fill className="object-cover object-center"
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
          <Reveal variant="action" delay={420}>
            <div className="flex items-center gap-3 pt-2">
              <Image src="/logos/logo-hat.png" alt="" width={40} height={40} className="w-9 h-9 object-contain opacity-30" />
              <div>
                <p className="text-[#0a0a0a]/25 text-[10px] tracking-[0.2em] uppercase">Contacto</p>
                <a href="mailto:staygroovy.duo@gmail.com" className="text-[#c9a84c] text-xs hover:text-[#b8943d] transition-colors">staygroovy.duo@gmail.com</a>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  );
}
