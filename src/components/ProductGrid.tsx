"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

type Filter = "all" | "tee" | "top";
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Todo" },
  { id: "tee", label: "Camisetas" },
  { id: "top", label: "Tops Mujer" },
];

export default function ProductGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <section id="shop" className="section-pad bg-white border-b border-[#e5e5e5]">
      <div className="container-base">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <Reveal variant="title" delay={0}>
              <p className="eyebrow mb-2">Colección SS26</p>
            </Reveal>
            <Reveal variant="title" delay={100}>
              <h2 className="font-display title-lg text-[#0a0a0a]">TIENDA</h2>
            </Reveal>
          </div>
          <Reveal variant="action" delay={200}>
            <div className="flex gap-1">
              {FILTERS.map(({ id, label }) => (
                <button key={id} data-filter={id} onClick={() => setFilter(id)}
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
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {visible.map((product, i) => (
            <Reveal key={product.id} variant="image" delay={i * 100} threshold={0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
