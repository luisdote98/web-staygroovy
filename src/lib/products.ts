export type ProductCategory = "tee" | "top";
export type ProductColor = "black" | "white" | "turquoise" | "fuchsia" | "pink" | "lilac";

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameEs: string;
  category: ProductCategory;
  color: ProductColor;
  colorLabel: string;
  colorHex: string;
  price: number;
  originalPrice: number;
  sizes: string[];
  images: {
    product: string;
    model: string;
  };
  description: string;
  isLaunch?: boolean;
  isSpecialEdition?: boolean;
}

export const products: Product[] = [
  {
    id: "tee-black",
    slug: "stay-groovy-tee-black",
    name: "Stay Groovy Oversize Tee Black",
    nameEs: "Camiseta Oversize Negra",
    category: "tee",
    color: "black",
    colorLabel: "Negro",
    colorHex: "#1a1a1a",
    price: 18,
    originalPrice: 22,
    sizes: ["M", "L", "XL"],
    images: {
      product: "/products/tee-black-product.png",
      model: "/models/model-tee-back.jpg",
    },
    description:
      "Camiseta oversize 100% algodón con gráfica Stay Groovy frontal y diseño principal en espalda. Una pieza pensada para llevar dentro y fuera del club.",
    isLaunch: true,
  },
  {
    id: "tee-lilac",
    slug: "stay-groovy-tee-lilac",
    name: "Stay Groovy Oversize Tee Lilac",
    nameEs: "Camiseta Oversize Morada",
    category: "tee",
    color: "lilac",
    colorLabel: "Morado",
    colorHex: "#9B8EC4",
    price: 18,
    originalPrice: 22,
    sizes: ["M", "L", "XL"],
    images: {
      product: "/products/tee-lilac-product.png",
      model: "/models/model-tee-back.jpg",
    },
    description:
      "Camiseta oversize 100% algodón con gráfica Stay Groovy frontal y diseño principal en espalda. Una pieza pensada para llevar dentro y fuera del club.",
    isLaunch: true,
    isSpecialEdition: true,
  },
  {
    id: "tee-turquoise",
    slug: "stay-groovy-tee-turquoise",
    name: "Stay Groovy Oversize Tee Turquoise",
    nameEs: "Camiseta Oversize Turquesa",
    category: "tee",
    color: "turquoise",
    colorLabel: "Turquesa",
    colorHex: "#00CED1",
    price: 18,
    originalPrice: 22,
    sizes: ["M", "L", "XL"],
    images: {
      product: "/products/tee-turquoise-product.png",
      model: "/models/model-tee-back.jpg",
    },
    description:
      "Edición especial en turquesa. Camiseta oversize 100% algodón con gráfica Stay Groovy. Limitada.",
    isLaunch: true,
    isSpecialEdition: true,
  },
  {
    id: "top-black",
    slug: "stay-groovy-top-black",
    name: "Stay Groovy Women Top Black",
    nameEs: "Top Mujer Negro",
    category: "top",
    color: "black",
    colorLabel: "Negro",
    colorHex: "#1a1a1a",
    price: 18,
    originalPrice: 22,
    sizes: ["S", "M", "L"],
    images: {
      product: "/products/top-black-product.png",
      model: "/models/model-women-1.png",
    },
    description:
      "Top crop de mujer de tela elástica con gráfica Stay Groovy. Ajuste ceñido, tela flexible y cómoda. Diseñado para bailar, moverse y formar parte de la noche.",
    isLaunch: true,
  },
  {
    id: "top-fuchsia",
    slug: "stay-groovy-top-fuchsia",
    name: "Stay Groovy Women Top Fuchsia",
    nameEs: "Top Mujer Fucsia",
    category: "top",
    color: "fuchsia",
    colorLabel: "Fucsia",
    colorHex: "#E91E8C",
    price: 18,
    originalPrice: 22,
    sizes: ["S", "M", "L"],
    images: {
      product: "/products/top-fuchsia-product.png",
      model: "/models/model-women-2.png",
    },
    description:
      "Top crop de mujer 100% algodón con gráfica Stay Groovy en fucsia intenso. Atrevida, para la noche.",
    isLaunch: true,
    isSpecialEdition: true,
  },
  {
    id: "top-pink",
    slug: "stay-groovy-top-pink",
    name: "Stay Groovy Women Top Pink",
    nameEs: "Top Mujer Rosa",
    category: "top",
    color: "pink",
    colorLabel: "Rosa",
    colorHex: "#F8C8D4",
    price: 18,
    originalPrice: 22,
    sizes: ["S", "M", "L"],
    images: {
      product: "/products/top-pink-product.png",
      model: "/models/model-women-3.png",
    },
    description:
      "Top crop de mujer 100% algodón con gráfica Stay Groovy en rosa suave. Una pieza que va del club a la calle.",
    isLaunch: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}
