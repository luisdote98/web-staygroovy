"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const NAV = [
  { href: "/#shop",           label: "Shop" },
  { href: "/#tops-mujer",     label: "Tops Mujer" },
  { href: "/#sobre-nosotros", label: "Sobre Nosotros" },
  { href: "/#cuidados",       label: "Cuidados" },
  { href: "/#contacto",       label: "Contacto" },
];

export default function Header() {
  const { totalItems, dispatch } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/97 backdrop-blur-md border-b border-white/[0.07]"
            : "bg-[#0a0a0a]"
        }`}
      >
        <div className="container-base w-full flex items-center justify-between gap-8">

          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logos/logo-letras.png"
              alt="Stay Groovy"
              width={110}
              height={46}
              className="h-9 w-auto object-contain invert"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] tracking-[0.18em] uppercase text-white/55 hover:text-[#c9a84c] transition-colors duration-200 font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch({ type: "OPEN_CART" })}
              className="relative p-2 text-white/60 hover:text-[#c9a84c] transition-colors"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-[22px] h-[22px]" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#c9a84c] text-[#0a0a0a] text-[9px] font-bold rounded-full w-[16px] h-[16px] flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Menú"
            >
              <Menu className="w-[22px] h-[22px]" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-[#0a0a0a]" onClick={() => setOpen(false)} />
          <div className="relative h-full flex flex-col px-8 py-10">
            <div className="flex items-center justify-between mb-14">
              <Image
                src="/logos/logo-letras.png"
                alt="Stay Groovy"
                width={100}
                height={42}
                className="h-8 w-auto object-contain invert"
              />
              <button onClick={() => setOpen(false)} className="p-2 text-white/40 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {NAV.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl tracking-[0.06em] text-white hover:text-[#c9a84c] transition-colors"
                >
                  {l.label.toUpperCase()}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <div className="h-px bg-white/10 mb-5" />
              <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase">Stay Groovy — Granada</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
