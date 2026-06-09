"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import SizeSelector from "./SizeSelector";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [size,    setSize]    = useState(product.sizes[0]);
  const [added,   setAdded]   = useState(false);
  const { dispatch } = useCart();

  function addToCart(e: React.MouseEvent) {
    e.preventDefault();
    dispatch({ type: "ADD_ITEM", payload: { product, size, quantity: 1 } });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <article className="flex flex-col gap-3">

      {/* Image */}
      <Link
        href={`/producto/${product.slug}`}
        className="block relative aspect-[4/5] bg-[#f5f5f5] overflow-hidden rounded-sm"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={product.images.product}
          alt={product.nameEs}
          fill
          className={`object-contain p-8 transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <Image
          src={product.images.model}
          alt={`${product.nameEs} puesto`}
          fill
          className={`object-cover transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isLaunch && (
            <span className="bg-[#c9a84c] text-[#0a0a0a] text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-0.5">
              Precio lanzamiento
            </span>
          )}
          {product.isSpecialEdition && (
            <span className="bg-[#0a0a0a] text-white text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-0.5">
              Edición especial
            </span>
          )}
        </div>

        {/* Quick-add hover bar */}
        <div className={`absolute inset-x-0 bottom-0 bg-[#0a0a0a]/90 backdrop-blur-sm px-3 py-2.5 flex items-center justify-between gap-3 transition-all duration-300 ${hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
          <SizeSelector sizes={product.sizes} selected={size} onChange={setSize} small dark />
          <button onClick={addToCart} className="btn-gold text-[10px] px-3 py-2 flex-shrink-0">
            {added ? "✓" : "Añadir"}
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-2">
        <Link href={`/producto/${product.slug}`}>
          <h3 className="text-sm font-medium text-[#0a0a0a] hover:text-[#c9a84c] transition-colors leading-snug">
            {product.nameEs}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[#c9a84c] font-display text-lg tracking-wide leading-none">{product.price}€</span>
          <span className="text-[#0a0a0a]/30 text-sm line-through leading-none">{product.originalPrice}€</span>
        </div>

        <SizeSelector sizes={product.sizes} selected={size} onChange={setSize} small />

        <button
          onClick={addToCart}
          className={`mt-1 py-2.5 text-[11px] tracking-[0.18em] uppercase font-display transition-all duration-200 ${
            added
              ? "bg-transparent border border-[#c9a84c]/60 text-[#c9a84c]"
              : "btn-gold w-full"
          }`}
        >
          {added ? "Añadido al carrito ✓" : "Añadir al carrito"}
        </button>
      </div>
    </article>
  );
}
