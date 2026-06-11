import Header from "@/components/Header";
import ScrollScenes from "@/components/ScrollScenes";
import CartSidebar from "@/components/CartSidebar";

export default function Home() {
  return (
    <>
      <Header />
      <CartSidebar />
      <main>
        <ScrollScenes />
      </main>
    </>
  );
}
