import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    href:    "/shop?cat=tee",
    label:   "Camisetas",
    sub:     "Oversize · Unisex",
    src:     "/models/model-tee-back.jpg",
    btn:     "SHOP CAMISETAS",
  },
  {
    href:    "/shop?cat=top",
    label:   "Tops Mujer",
    sub:     "Crop top · Elástico",
    src:     "/models/model-women-1.png",
    btn:     "SHOP TOPS MUJER",
  },
];

export default function CategorySection() {
  return (
    <section id="shop" className="grid grid-cols-1 lg:grid-cols-2">
      {CATEGORIES.map(({ href, label, sub, src, btn }) => (
        <Link
          key={href}
          href={href}
          className="group relative overflow-hidden"
          style={{ aspectRatio: "3/4" }}
        >
          {/* Foto */}
          <Image
            src={src}
            alt={label}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Texto + botón */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 pb-10 px-6 text-center">
            <div>
              <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-1">{sub}</p>
              <h2 className="font-display text-white leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                {label.toUpperCase()}
              </h2>
            </div>
            <span className="btn-gold px-10 py-3 text-[11px] tracking-[0.25em] group-hover:bg-[#e2c97e] transition-colors duration-300">
              {btn}
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
