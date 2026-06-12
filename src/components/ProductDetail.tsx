"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, X, ZoomIn } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

// ── Iconos SVG cuidados ─────────────────────────────────────
const CARE_ICONS = [
  {
    label: "30°C",
    svg: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
      <path d="M5 10 Q7 7 16 7 Q25 7 27 10 L27 25 Q27 26 26 26 L6 26 Q5 26 5 25 Z"/>
      <text x="16" y="21" textAnchor="middle" fontSize="9" fill="currentColor" stroke="none" fontFamily="sans-serif">30°</text>
    </svg>
  },
  {
    label: "Sin lejía",
    svg: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
      <path d="M16 4 L28 24 H4 Z"/>
      <line x1="10" y1="12" x2="22" y2="22"/><line x1="22" y1="12" x2="10" y2="22"/>
    </svg>
  },
  {
    label: "Sin secadora",
    svg: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
      <rect x="4" y="4" width="24" height="24" rx="3"/>
      <circle cx="16" cy="16" r="7"/>
      <line x1="9" y1="9" x2="23" y2="23"/>
    </svg>
  },
  {
    label: "Baja temp.",
    svg: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
      <path d="M6 19 Q6 14 12 14 L24 14 Q27 14 27 17 L27 20 Q27 22 25 22 L8 22 Q6 22 6 20 Z"/>
      <path d="M10 22 L10 25"/>
      <text x="16" y="20" textAnchor="middle" fontSize="6" fill="currentColor" stroke="none">•</text>
    </svg>
  },
  {
    label: "Sin limpieza en seco",
    svg: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
      <circle cx="16" cy="16" r="11"/>
      <line x1="9" y1="9" x2="23" y2="23"/>
    </svg>
  },
];

// ── Componente principal ────────────────────────────────────
export default function ProductDetail({ product }: { product: Product }) {
  const images = [product.images.product, product.images.model];
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox,  setLightbox]  = useState(false);
  const [size,      setSize]      = useState("");
  const [qty,       setQty]       = useState(1);
  const [added,     setAdded]     = useState(false);
  const [sizeErr,   setSizeErr]   = useState(false);
  const { dispatch } = useCart();

  function addToCart() {
    if (!size) { setSizeErr(true); setTimeout(() => setSizeErr(false), 2000); return; }
    dispatch({ type: "ADD_ITEM", payload: { product, size, quantity: qty } });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const categoryLabel = product.category === "tee" ? "Camiseta Oversize" : "Top Mujer";

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-5xl mx-auto px-4">

        {/* Volver */}
        <div className="pt-4 pb-3">
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase font-medium hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-3 h-3" /> Volver al shop
          </Link>
        </div>

        {/* ── Grid 2 columnas: imagen | info ── */}
        <div className="grid grid-cols-[45%_55%] gap-3 lg:grid-cols-2 lg:gap-16">

          {/* Columna imagen */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setLightbox(true)}
              className="group relative w-full overflow-hidden border border-[#c9a84c]/30 bg-white cursor-zoom-in"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={images[activeIdx]}
                alt={product.nameEs}
                fill
                priority
                className={activeIdx === 0 ? "object-contain p-3 lg:p-8 transition-transform duration-300 group-hover:scale-105" : "object-cover object-top transition-transform duration-300 group-hover:scale-105"}
              />
              {product.isLaunch && (
                <span className="absolute top-2 left-2 bg-[#c9a84c] text-[#0a0a0a] text-[7px] lg:text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5">
                  Launch Price
                </span>
              )}
              <span className="absolute bottom-2 right-2 bg-black/50 text-white/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ZoomIn className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 gap-1.5">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative overflow-hidden border-2 transition-all ${
                    activeIdx === i ? "border-[#c9a84c]" : "border-white/10 opacity-40 hover:opacity-70"
                  }`}
                  style={{ aspectRatio: "1/1" }}
                >
                  <Image src={src} alt="" fill className={i === 0 ? "object-contain p-1 bg-white" : "object-cover object-top"} />
                </button>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setActiveIdx(i)}
                  className={`rounded-full transition-all ${activeIdx === i ? "w-4 h-1.5 bg-[#c9a84c]" : "w-1.5 h-1.5 bg-white/20"}`}
                />
              ))}
            </div>
          </div>

          {/* Columna info */}
          <div className="flex flex-col gap-2.5 lg:gap-4">

            {/* Categoría · Color */}
            <p className="text-[#c9a84c] text-[9px] lg:text-[11px] tracking-[0.25em] uppercase font-medium leading-none">
              {categoryLabel} · {product.colorLabel}
            </p>

            {/* Nombre */}
            <h1 className="font-display text-white leading-none text-[1.4rem] lg:text-[2.8rem]">
              {product.nameEs.toUpperCase()}
            </h1>

            {/* Precio */}
            <div className="flex items-end gap-2">
              <span className="font-display text-[#c9a84c] leading-none text-[2rem] lg:text-[3rem]">
                {product.price}€
              </span>
              <div className="pb-0.5">
                <span className="block text-white/30 text-sm line-through leading-none">{product.originalPrice}€</span>
                <span className="text-[#c9a84c] text-[8px] tracking-[0.2em] uppercase">Precio lanzamiento</span>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-white/65 text-[11px] lg:text-sm leading-relaxed">{product.description}</p>

            {/* Talla */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white text-[9px] lg:text-[11px] tracking-[0.25em] uppercase">Talla</span>
                {sizeErr && <span className="text-red-400 text-[9px]">Elige talla</span>}
              </div>
              <div className="flex gap-1.5">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => { setSize(s); setSizeErr(false); }}
                    className={`w-10 h-10 lg:w-12 lg:h-12 text-xs font-medium border transition-all ${
                      size === s
                        ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10"
                        : "border-white/20 text-white/60 hover:border-white/50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div>
              <span className="text-white text-[9px] lg:text-[11px] tracking-[0.25em] uppercase block mb-1.5">Cantidad</span>
              <div className="flex items-center border border-white/20 w-fit">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-white/60 hover:text-white border-r border-white/20 transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 lg:w-10 text-center text-white font-display text-base tabular-nums">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-white/60 hover:text-white border-l border-white/20 transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* ── Botón añadir al carrito ── */}
            <button
              onClick={addToCart}
              className={`flex items-center justify-center gap-2 w-full py-3 lg:py-4 text-[11px] lg:text-[13px] tracking-[0.25em] uppercase font-display transition-all duration-200 ${
                added ? "bg-transparent border border-[#c9a84c]/40 text-[#c9a84c]"
                : sizeErr ? "bg-transparent border border-red-500/40 text-red-400"
                : "bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#e2c97e]"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {added ? "Añadido ✓" : "Añadir al carrito"}
            </button>

            {/* ── Instrucciones de cuidado ── */}
            <div className="border border-white/10 rounded-xl p-3 lg:p-5">
              <p className="text-[#c9a84c] text-[8px] lg:text-[10px] tracking-[0.3em] uppercase text-center mb-3 lg:mb-4 font-medium">
                Instrucciones de cuidado
              </p>
              <div className="grid grid-cols-5 gap-1 lg:gap-2">
                {CARE_ICONS.map(({ svg, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 lg:gap-1.5">
                    <span className="text-white/60">{svg}</span>
                    <span className="text-[6px] lg:text-[8px] text-white/35 tracking-[0.06em] uppercase text-center leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Mini footer */}
        <div className="mt-6 pb-8 pt-5 border-t border-white/[0.06] flex flex-col items-center gap-2">
          <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Club Culture, Cotton and Movement.</p>
          <span className="text-[#c9a84c]">★</span>
        </div>

      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightbox(false)}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Imagen ampliada */}
          <div
            className="relative w-full max-w-lg max-h-[85vh] aspect-square"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={images[activeIdx]}
              alt={product.nameEs}
              fill
              className={activeIdx === 0 ? "object-contain" : "object-contain"}
              sizes="90vw"
            />
          </div>

          {/* Navegación entre imágenes dentro del lightbox */}
          {images.length > 1 && (
            <div className="absolute bottom-6 flex gap-3">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setActiveIdx(i); }}
                  className={`relative w-14 h-14 overflow-hidden border-2 transition-all ${
                    activeIdx === i ? "border-[#c9a84c]" : "border-white/20 opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={src} alt="" fill className={i === 0 ? "object-contain bg-white p-1" : "object-cover object-top"} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
