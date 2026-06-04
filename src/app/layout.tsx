import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stay Groovy — Club Culture Merch",
  description:
    "Piezas oversize de algodón para la cultura de club. Camisetas y tops de Stay Groovy, dúo de DJs de Granada.",
  openGraph: {
    title: "Stay Groovy Merch",
    description: "Club culture, cotton and movement.",
    images: ["/logos/logo-letras.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-off-black text-white antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
