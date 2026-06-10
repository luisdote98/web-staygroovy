import Image from "next/image";
import Reveal from "./Reveal";

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="section-pad bg-white border-b border-[#e5e5e5]">
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image — left */}
          <Reveal variant="fade-up-blur" delay={0} threshold={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#f5f5f5]">
              <Image
                src="/models/model-tee-side.jpg"
                alt="Stay Groovy — dúo de DJs"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-16 pb-6 flex justify-center">
                <div className="text-center">
                  <p className="font-display text-sm text-[#c9a84c] tracking-widest">GRX</p>
                  <p className="text-white/50 text-[10px] tracking-[0.15em] uppercase mt-0.5">Base</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text — right */}
          <div className="flex flex-col gap-6">
            <Reveal variant="fade-up-blur" delay={0}>
              <div>
                <p className="eyebrow mb-4">Sobre nosotros</p>
                <h2 className="font-display title-lg text-[#0a0a0a]">STAY GROOVY</h2>
              </div>
            </Reveal>

            <div className="h-px bg-[#e5e5e5]" />

            <Reveal variant="fade-up-blur" delay={100}>
              <div className="flex flex-col gap-4 text-[#0a0a0a]/55 text-sm leading-relaxed max-w-lg">
                <p>
                  Stay Groovy nace en Granada con una visión clara: crear una marca
                  de ropa que refleje nuestra identidad dentro de la cultura de club.
                  Cada pieza está pensada para quien vive la música desde dentro.
                </p>
                <p>
                  Nuestro logo es el núcleo de todo. Lo entendemos como algo vivo,
                  en constante evolución — nuevos colores, formas 3D, colaboraciones
                  y detalles que irán apareciendo con cada drop. No es solo una
                  gráfica, es una firma.
                </p>
              </div>
            </Reveal>

            <div className="h-px bg-[#e5e5e5]" />

            <Reveal variant="fade-up-blur" delay={200}>
              <blockquote className="border-l-2 border-[#c9a84c] pl-4">
                <p className="text-[#0a0a0a] text-base font-medium leading-snug">
                  "Cada colección, una experiencia diferente."
                </p>
                <cite className="text-[#0a0a0a]/35 text-[11px] tracking-[0.15em] uppercase not-italic mt-1 block">
                  — Stay Groovy, Granada
                </cite>
              </blockquote>
            </Reveal>

            <Reveal variant="fade-up-blur" delay={280}>
              <div className="flex items-center gap-3 pt-2">
                <Image
                  src="/logos/logo-hat.png"
                  alt=""
                  width={40}
                  height={40}
                  className="w-9 h-9 object-contain opacity-30"
                />
                <div>
                  <p className="text-[#0a0a0a]/25 text-[10px] tracking-[0.2em] uppercase">Contacto</p>
                  <a
                    href="mailto:staygroovy.duo@gmail.com"
                    className="text-[#c9a84c] text-xs hover:text-[#b8943d] transition-colors"
                  >
                    staygroovy.duo@gmail.com
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
