"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";
import SizeSelector from "@/components/SizeSelector";
import { products, type ProductCategory } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

// ── Filtros ─────────────────────────────────────────────────
const FILTERS = [
  { id: "all",  label: "Todo" },
  { id: "tee",  label: "Camisetas" },
  { id: "top",  label: "Tops Mujer" },
] as const;

// ── Tarjeta de producto (2 col, estilo editorial) ───────────
function ShopCard({ product }: { product: (typeof products)[number] }) {
  const [size,  setSize]  = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const { dispatch } = useCart();

  function addToCart(e: React.MouseEvent) {
    e.preventDefault();
    dispatch({ type: "ADD_ITEM", payload: { product, size, quantity: 1 } });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <article className="flex flex-col">
      {/* Imagen */}
      <Link href={`/producto/${product.slug}`} className="relative block overflow-hidden bg-[#f5f5f5]" style={{ aspectRatio: "3/4" }}>
        <Image
          src={product.id === "top-black" ? product.images.model : product.images.product}
          alt={product.nameEs}
          fill
          className={product.id === "top-black" ? "object-cover object-top" : "object-contain p-6"}
          sizes="(max-width: 1024px) 50vw, 33vw"
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
        {/* Quick-add */}
        <button
          onClick={addToCart}
          className="absolute bottom-3 right-3 w-9 h-9 bg-white text-[#0a0a0a] flex items-center justify-center text-xl font-light hover:bg-[#c9a84c] transition-colors duration-200"
          aria-label="Añadir al carrito"
        >
          {added ? "✓" : "+"}
        </button>
      </Link>

      {/* Info */}
      <div className="pt-3 pb-5 flex flex-col gap-2 px-1">
        <Link href={`/producto/${product.slug}`}>
          <h3 className="text-sm font-semibold text-[#0a0a0a] hover:text-[#c9a84c] transition-colors leading-snug">
            {product.nameEs}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[#0a0a0a] font-medium text-sm">{product.price}€</span>
          <span className="text-[#0a0a0a]/30 text-xs line-through">{product.originalPrice}€</span>
        </div>
        <SizeSelector sizes={product.sizes} selected={size} onChange={setSize} small />
      </div>
    </article>
  );
}

// ── Grid con filtro ─────────────────────────────────────────
function ShopGrid() {
  const params = useSearchParams();
  const initial = (params.get("cat") ?? "all") as ProductCategory | "all";
  const [filter, setFilter] = useState<ProductCategory | "all">(initial);

  const visible = filter === "all"
    ? products
    : products.filter(p => p.category === filter);

  return (
    <>
      {/* Cabecera */}
      <div className="border-b border-[#e5e5e5] py-5 px-4 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-[#0a0a0a]/40 text-xs tracking-[0.2em] uppercase">Colección SS26</p>
          <h1 className="font-display text-[#0a0a0a] leading-none mt-0.5" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            {filter === "all" ? "TODA LA COLECCIÓN" : filter === "tee" ? "CAMISETAS" : "TOPS MUJER"}
          </h1>
        </div>
        <div className="flex items-center gap-1">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id as ProductCategory | "all")}
              className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-200 ${
                filter === id
                  ? "bg-[#0a0a0a] text-white"
                  : "border border-[#e5e5e5] text-[#0a0a0a]/45 hover:text-[#0a0a0a] hover:border-[#0a0a0a]/30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteo */}
      <div className="px-4 lg:px-8 py-3 border-b border-[#e5e5e5]">
        <p className="text-xs text-[#0a0a0a]/40 tracking-[0.15em]">{visible.length} productos</p>
      </div>

      {/* Grid 2 columnas */}
      <div className="px-4 lg:px-8 py-6">
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 lg:gap-x-6 lg:gap-y-12">
          {visible.map(product => (
            <ShopCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

// ── Página ──────────────────────────────────────────────────
export default function ShopPage() {
  return (
    <>
      <Header />
      <CartSidebar />
      <main className="pt-[72px] min-h-screen bg-white">
        <Suspense fallback={<div className="p-8 text-center text-sm text-[#0a0a0a]/40">Cargando...</div>}>
          <ShopGrid />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
