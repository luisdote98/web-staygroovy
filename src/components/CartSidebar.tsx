"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { CheckoutRequestItem } from "@/app/api/checkout/route";

export default function CartSidebar() {
  const { state, dispatch, totalItems, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const items: CheckoutRequestItem[] = state.items.map((i) => ({
        productId: i.product.id,
        size: i.size,
        quantity: i.quantity,
      }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al iniciar el pago");

      // Redirigir a Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setLoading(false);
    }
  }

  return (
    <>
      {state.isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          onClick={() => dispatch({ type: "CLOSE_CART" })}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[70] flex flex-col border-l border-[#e5e5e5] transition-transform ease-in-out ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionDuration: "350ms" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e5e5]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#c9a84c]" />
            <span className="font-display text-lg tracking-[0.1em] text-[#0a0a0a]">CARRITO</span>
            {totalItems > 0 && <span className="text-[#0a0a0a]/30 text-xs">({totalItems})</span>}
          </div>
          <button onClick={() => dispatch({ type: "CLOSE_CART" })} className="p-1.5 text-[#0a0a0a]/30 hover:text-[#0a0a0a] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <div className="w-12 h-px bg-[#e5e5e5]" />
              <p className="text-[#0a0a0a]/30 text-xs tracking-[0.2em] uppercase">Tu carrito está vacío</p>
              <button
                onClick={() => dispatch({ type: "CLOSE_CART" })}
                className="mt-4 text-[#c9a84c] text-xs tracking-wider underline underline-offset-4 hover:text-[#b8943d] transition-colors"
              >
                Ver colección
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4 py-4 border-b border-[#e5e5e5]">
                  <div className="w-[72px] h-[72px] bg-transparent border border-[#c9a84c]/30 flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images.product}
                      alt={item.product.nameEs}
                      width={72}
                      height={72}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0a0a0a] leading-snug">{item.product.nameEs}</p>
                    <p className="text-[#0a0a0a]/35 text-xs mt-0.5">Talla {item.size}</p>
                    <p className="text-[#c9a84c] text-sm font-display tracking-wide mt-1">{item.product.price}€</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? dispatch({ type: "UPDATE_QUANTITY", payload: { productId: item.product.id, size: item.size, quantity: item.quantity - 1 } })
                            : dispatch({ type: "REMOVE_ITEM", payload: { productId: item.product.id, size: item.size } })
                        }
                        className="w-6 h-6 border border-[#e5e5e5] flex items-center justify-center hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-4 text-center tabular-nums text-[#0a0a0a]">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { productId: item.product.id, size: item.size, quantity: item.quantity + 1 } })}
                        className="w-6 h-6 border border-[#e5e5e5] flex items-center justify-center hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { productId: item.product.id, size: item.size } })}
                    className="self-start p-1 text-[#0a0a0a]/20 hover:text-[#0a0a0a] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="px-6 py-6 border-t border-[#e5e5e5] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#0a0a0a]/40 text-xs tracking-[0.15em] uppercase">Total</span>
              <span className="font-display text-2xl tracking-wider text-[#c9a84c]">{totalPrice}€</span>
            </div>
            <p className="text-[#0a0a0a]/25 text-[10px] text-center">IVA incluido · Precio de lanzamiento</p>

            {error && (
              <p className="text-red-500 text-[11px] text-center bg-red-50 border border-red-200 px-3 py-2 rounded">
                {error}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-gold w-full py-4 text-[11px] tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Redirigiendo...
                </>
              ) : (
                "PAGAR AHORA"
              )}
            </button>

            <button
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="w-full py-2.5 text-[11px] text-[#0a0a0a]/30 hover:text-[#0a0a0a] tracking-[0.15em] uppercase transition-colors"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
