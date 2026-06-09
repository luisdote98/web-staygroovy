"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import SizeSelector from "./SizeSelector";
import { useCart } from "@/lib/cart-context";

const CARE = [
  "Del revés", "Máx. 30°C", "Sin lejía",
  "Sin secadora", "Sin plancha directa", "Secar al aire",
];

export default function ProductDetail({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState<"product" | "model">("product");
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

  return (
    <div className="container-base py-12 lg:py-16">

      {/* Breadcrumb */}
      <Link
        href="/#shop"
        className="inline-flex items-center gap-2 text-white/30 text-xs tracking-[0.15em] uppercase hover:text-[#c9a84c] transition-colors mb-10"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver al shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

        {/* ── Images ── */}
        <div className="flex flex-col gap-3">
          {/* Main */}
          <div className="relative aspect-[4/5] bg-transparent overflow-hidden rounded-sm border border-[#c9a84c]/40">
            <Image
              src={product.images[activeImg]}
              alt={product.nameEs}
              fill
              priority
              className={`transition-opacity duration-400 ${
                activeImg === "product" ? "object-contain p-10" : "object-cover"
              }`}
            />
            {product.isLaunch && (
              <span className="absolute top-4 left-4 bg-[#c9a84c] text-[#0a0a0a] text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-0.5">
                Launch price
              </span>
            )}
          </div>
          {/* Thumbs */}
          <div className="grid grid-cols-2 gap-3">
            {(["product", "model"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setActiveImg(k)}
                className={`relative aspect-[4/5] bg-transparent overflow-hidden rounded-sm border-2 transition-colors ${
                  activeImg === k ? "border-[#c9a84c]" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={product.images[k]}
                  alt={k === "product" ? "Producto" : "Modelo"}
                  fill
                  className={k === "product" ? "object-contain p-4" : "object-cover"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Info ── */}
        <div className="flex flex-col gap-6">

          <div>
            <p className="eyebrow mb-3">
              {product.category === "tee" ? "Camiseta Oversize" : "Top Mujer"} · {product.colorLabel}
            </p>
            <h1 className="font-display title-md text-white">
              {product.nameEs.toUpperCase()}
            </h1>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="font-display text-5xl leading-none text-[#c9a84c]">{product.price}€</span>
            <div className="pb-1">
              <span className="block text-white/30 text-base line-through leading-none">{product.originalPrice}€</span>
              <span className="text-[#c9a84c]/60 text-[10px] tracking-[0.2em] uppercase">Precio lanzamiento</span>
            </div>
          </div>

          <div className="h-px bg-white/[0.08]" />

          <p className="text-white/55 text-sm leading-relaxed">{product.description}</p>

          {/* Size */}
          <div>
            <div className="flex justify-between mb-3">
              <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Talla</span>
              {sizeErr && <span className="text-red-400 text-[10px] tracking-wide">Selecciona una talla</span>}
            </div>
            <SizeSelector sizes={product.sizes} selected={size} onChange={(s) => { setSize(s); setSizeErr(false); }} dark />
          </div>

          {/* Quantity */}
          <div>
            <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase block mb-3">Cantidad</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-display text-xl tracking-widest w-6 text-center tabular-nums">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={addToCart}
            className={`flex items-center justify-center gap-3 w-full py-4 text-[11px] tracking-[0.22em] uppercase font-display transition-all duration-200 ${
              added ? "bg-transparent border border-[#c9a84c]/40 text-[#c9a84c]"
                    : sizeErr ? "bg-transparent border border-red-500/30 text-red-400"
                    : "btn-gold"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {added ? "Añadido al carrito ✓" : "Añadir al carrito"}
          </button>

          {/* Details table */}
          <div className="border-t border-white/[0.08] pt-6 space-y-4">
            {[
              { k: "Composición", v: "100% Algodón" },
              { k: "Fit",         v: product.category === "tee" ? "Oversize" : "Crop fit" },
              { k: "Envío",       v: "España peninsular · 3-5 días hábiles" },
              { k: "Cambios",     v: "Cambio de talla en 14 días" },
            ].map(({ k, v }) => (
              <div key={k} className="flex justify-between border-b border-white/[0.06] pb-4">
                <span className="text-white/30 text-xs tracking-[0.12em] uppercase">{k}</span>
                <span className="text-white/65 text-sm text-right">{v}</span>
              </div>
            ))}
          </div>

          {/* Care chips */}
          <div>
            <span className="text-white/20 text-[9px] tracking-[0.25em] uppercase block mb-3">Cuidados</span>
            <div className="flex flex-wrap gap-1.5">
              {CARE.map((c) => (
                <span key={c} className="text-[10px] text-white/30 border border-white/[0.08] px-2.5 py-1">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
