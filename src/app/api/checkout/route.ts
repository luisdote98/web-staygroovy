import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/lib/products";

// Stripe se instancia solo en el servidor — la secret key nunca llega al cliente
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export interface CheckoutRequestItem {
  productId: string;
  size: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CheckoutRequestItem[] } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? "http://localhost:3000";

    // Construir line_items validando precios contra el catálogo (no confiamos en el cliente)
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Producto no encontrado: ${item.productId}`);

      // Las imágenes solo funcionan con URLs públicas (no localhost)
      const isLocal = origin.includes("localhost") || origin.includes("127.0.0.1");
      const imageUrl = isLocal ? [] : [`${origin}${product.images.product}`];

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: `${product.nameEs} — Talla ${item.size}`,
            description: product.description,
            ...(imageUrl.length ? { images: imageUrl } : {}),
          },
          unit_amount: Math.round(product.price * 100), // céntimos
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // Apple Pay y Google Pay se activan automáticamente desde el dashboard de Stripe
      // Bizum: disponible como "przelewy24" o "sepa_debit" según región (activar en dashboard)
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      locale: "es",
      shipping_address_collection: {
        allowed_countries: ["ES"],
      },
      custom_text: {
        submit: { message: "Primera colección Stay Groovy — Precio de lanzamiento" },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
