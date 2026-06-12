import Link from "next/link";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  // Número de pedido legible (últimos 8 chars del session_id)
  const orderRef = session_id
    ? session_id.replace("cs_", "").replace("test_", "").slice(-8).toUpperCase()
    : "——";

  return (
    <>
      <Header />
      <CartSidebar />
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 pt-[72px]">
        <div className="max-w-md w-full text-center flex flex-col items-center gap-8">

          {/* Icono */}
          <div className="w-20 h-20 rounded-full border-2 border-[#c9a84c] flex items-center justify-center">
            <svg className="w-9 h-9 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Título */}
          <div className="flex flex-col gap-3">
            <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase font-medium">
              Pago confirmado
            </p>
            <h1 className="font-display text-white leading-none" style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}>
              GRACIAS POR<br />TU COMPRA
            </h1>
          </div>

          {/* Número de pedido */}
          <div className="border border-white/10 rounded-xl px-8 py-5 w-full">
            <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase mb-1">Número de pedido</p>
            <p className="font-display text-[#c9a84c] text-xl tracking-[0.2em]">#{orderRef}</p>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2 text-white/40 text-sm leading-relaxed">
            <p>Recibirás un email de confirmación con los detalles de tu pedido.</p>
            <p>Envío en 24–48h a partir de la confirmación.</p>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 w-full">
            <Link href="/shop"
              className="btn-gold w-full py-4 text-[12px] tracking-[0.25em] text-center">
              SEGUIR COMPRANDO
            </Link>
            <Link href="/"
              className="w-full py-3 text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors text-center">
              Volver al inicio
            </Link>
          </div>

          {/* Footer mini */}
          <p className="text-white/15 text-[10px] tracking-[0.25em] uppercase">
            Stay Groovy — Club Culture, Cotton and Movement.
          </p>
        </div>
      </main>
    </>
  );
}
