import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Header />
      <CartSidebar />
      <main className="pt-20 min-h-screen bg-[#0a0a0a]">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}
