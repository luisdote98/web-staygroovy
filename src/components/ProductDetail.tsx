"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

// ── Iconos SVG cuidados ─────────────────────────────────────
function IconWash30() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M6 12 Q8 8 20 8 Q32 8 34 12 L34 32 Q34 34 32 34 L8 34 Q6 34 6 32 Z" />
      <text x="20" y="26" textAnchor="middle" fontSize="11" fill="currentColor" stroke="none" fontFamily="sans-serif">30°</text>
    </svg>
  );
}
function IconNoBleach() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M20 6 L34 30 H6 Z" />
      <line x1="12" y1="14" x2="28" y2="28" />
      <line x1="28" y1="14" x2="12" y2="28" />
    </svg>
  );
}
function IconNoDry() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="6" y="6" width="28" height="28" rx="3" />
      <circle cx="20" cy="20" r="9" />
      <line x1="12" y1="12" x2="28" y2="28" />
    </svg>
  );
}
function IconIron() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M8 24 Q8 18 16 18 L30 18 Q34 18 34 22 L34 26 Q34 28 32 28 L10 28 Q8 28 8 26 Z" />
      <path d="M12 28 L12 32" />
      <path d="M20 18 L20 14 Q20 10 16 10" />
      <text x="20" y="27" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif">•</text>
    </svg>
  );
}
function IconNoDryCleaning() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="20" cy="20" r="13" />
      <line x1="11" y1="11" x2="29" y2="29" />
    </svg>
  );
}

const CARE_ICONS = [
  { icon: <IconWash30 />,         label: "LAVAR A\n30°C" },
  { icon: <IconNoBleach />,       label: "NO USAR\nLEJÍA" },
  { icon: <IconNoDry />,          label: "NO USAR\nSECADORA" },
  { icon: <IconIron />,           label: "PLANCHAR A\nBAJA TEMP." },
  { icon: <IconNoDryCleaning />,  label: "NO LAVAR\nEN SECO" },
];

// ── Iconos características ──────────────────────────────────
function FeaturesRow({ category }: { category: Product["category"] }) {
  const features = category === "top"
    ? [
        { icon: "🧵", label: "TELA\nELÁSTICA" },
        { icon: "👕", label: "AJUSTE\nCEÑIDO" },
        { icon: "🚚", label: "ENVÍO\n24-48H" },
        { icon: "🔄", label: "CAMBIOS\nFÁCILES" },
      ]
    : [
        { icon: "🌿", label: "100%\nALGODÓN" },
        { icon: "👕", label: "FIT\nOVERSIZE" },
        { icon: "🚚", label: "ENVÍO\n24-48H" },
        { icon: "🔄", label: "CAMBIOS\nFÁCILES" },
      ];
  return (
    <div className="grid grid-cols-4 border border-white/10 rounded-xl overflow-hidden">
      {features.map(({ icon, label }, i) => (
        <div key={i} className={`flex flex-col items-center gap-2 py-5 px-2 ${i < 3 ? "border-r border-white/10" : ""}`}>
          <span className="text-2xl">{icon}</span>
          <span className="text-[9px] text-white/50 tracking-[0.15em] uppercase text-center leading-tight whitespace-pre-line">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Componente principal ────────────────────────────────────
export default function ProductDetail({ product }: { product: Product }) {
  const images = [product.images.product, product.images.model];
  const [activeIdx, setActiveIdx] = useState(0);
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

  const categoryLabel = product.category === "tee" ? "CAMISETA OVERSIZE" : "TOP MUJER";

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-16">
      <div className="max-w-lg mx-auto px-4 lg:max-w-6xl">

        {/* Volver */}
        <div className="pt-6 pb-5">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#c9a84c] text-[11px] tracking-[0.2em] uppercase font-medium hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al shop
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">

          {/* ── IMÁGENES ── */}
          <div className="flex flex-col gap-3">
            {/* Imagen principal */}
            <div className="relative overflow-hidden border border-[#c9a84c]/30 bg-white" style={{ aspectRatio: "1/1" }}>
              <Image
                src={images[activeIdx]}
                alt={product.nameEs}
                fill
                priority
                className={activeIdx === 0 ? "object-contain p-8" : "object-cover object-top"}
              />
              {product.isLaunch && (
                <span className="absolute top-4 left-4 bg-[#c9a84c] text-[#0a0a0a] text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1">
                  Launch Price
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 gap-3">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative overflow-hidden border-2 transition-all duration-200 ${
                    activeIdx === i ? "border-[#c9a84c]" : "border-white/10 opacity-50 hover:opacity-80"
                  }`}
                  style={{ aspectRatio: "1/1" }}
                >
                  <Image
                    src={src}
                    alt={i === 0 ? "Producto" : "Modelo"}
                    fill
                    className={i === 0 ? "object-contain p-4 bg-white" : "object-cover object-top"}
                  />
                </button>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`rounded-full transition-all duration-200 ${
                    activeIdx === i ? "w-4 h-2 bg-[#c9a84c]" : "w-2 h-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── INFO ── */}
          <div className="flex flex-col gap-5 mt-8 lg:mt-0">

            {/* Categoría · Color */}
            <p className="text-[#c9a84c] text-[11px] tracking-[0.3em] uppercase font-medium">
              {categoryLabel} · {product.colorLabel.toUpperCase()}
            </p>

            {/* Nombre */}
            <h1 className="font-display text-white leading-none" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              {product.nameEs.toUpperCase()}
            </h1>

            {/* Precio */}
            <div className="flex items-end gap-3">
              <span className="font-display text-[#c9a84c] leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)" }}>
                {product.price}€
              </span>
              <div className="pb-1 flex flex-col">
                <span className="text-white/30 text-lg line-through leading-none">{product.originalPrice}€</span>
                <span className="text-[#c9a84c] text-[9px] tracking-[0.25em] uppercase mt-0.5">Precio lanzamiento</span>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-white/70 text-sm leading-relaxed">{product.description}</p>

            {/* Talla */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white text-[11px] tracking-[0.25em] uppercase font-medium">Talla</span>
                {sizeErr && <span className="text-red-400 text-[10px] tracking-wide">Selecciona una talla</span>}
              </div>
              <div className="flex gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSize(s); setSizeErr(false); }}
                    className={`w-12 h-12 text-sm font-medium transition-all duration-200 border ${
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
              <span className="text-white text-[11px] tracking-[0.25em] uppercase font-medium block mb-3">Cantidad</span>
              <div className="flex items-center gap-0 border border-white/20 w-fit">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white border-r border-white/20 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-white font-display text-lg tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white border-l border-white/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={addToCart}
              className={`flex items-center justify-center gap-3 w-full py-4 text-[13px] tracking-[0.25em] uppercase font-display transition-all duration-200 ${
                added
                  ? "bg-transparent border border-[#c9a84c]/40 text-[#c9a84c]"
                  : sizeErr
                  ? "bg-transparent border border-red-500/40 text-red-400"
                  : "bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#e2c97e]"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {added ? "Añadido al carrito ✓" : "Añadir al carrito"}
            </button>

            {/* Características */}
            <FeaturesRow category={product.category} />

            {/* Instrucciones de cuidado */}
            <div className="border border-white/10 rounded-xl p-5">
              <p className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase text-center mb-5 font-medium">
                Instrucciones de cuidado
              </p>
              <div className="grid grid-cols-5 gap-2">
                {CARE_ICONS.map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <span className="text-white/60">{icon}</span>
                    <span className="text-[8px] text-white/40 tracking-[0.1em] uppercase text-center leading-tight whitespace-pre-line">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mini footer */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col items-center gap-4">
          <p className="text-white/25 text-[11px] tracking-[0.3em] uppercase">
            Club Culture, Cotton and Movement.
          </p>
          <span className="text-[#c9a84c] text-2xl">★</span>
        </div>
      </div>
    </div>
  );
}
