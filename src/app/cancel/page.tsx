import Link from "next/link";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";

export default function CancelPage() {
  return (
    <>
      <Header />
      <CartSidebar />
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 pt-[72px]">
        <div className="max-w-md w-full text-center flex flex-col items-center gap-8">

          {/* Icono */}
          <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center">
            <svg className="w-9 h-9 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          {/* Título */}
          <div className="flex flex-col gap-3">
            <p className="text-white/30 text-[11px] tracking-[0.35em] uppercase font-medium">
              Pago cancelado
            </p>
            <h1 className="font-display text-white leading-none" style={{ fontSize: "clamp(2rem, 7vw, 3.5rem)" }}>
              NO SE HA<br />REALIZADO EL PAGO
            </h1>
          </div>

          {/* Info */}
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Tu carrito sigue intacto. Puedes volver a intentarlo cuando quieras.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 w-full">
            <Link href="/shop"
              className="btn-gold w-full py-4 text-[12px] tracking-[0.25em] text-center">
              VOLVER A LA TIENDA
            </Link>
            <Link href="/"
              className="w-full py-3 text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors text-center">
              Ir al inicio
            </Link>
          </div>

          <p className="text-white/15 text-[10px] tracking-[0.25em] uppercase">
            Stay Groovy — Club Culture, Cotton and Movement.
          </p>
        </div>
      </main>
    </>
  );
}
