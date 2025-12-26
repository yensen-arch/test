import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import { ProductDetails } from "@/components/storefront/ProductDetails";
import { notFound } from "next/navigation";
import productsData from "@/products.json";

type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  category: string;
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (productsData as Product[]).find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 bg-slate-50 max-w-7xl mx-auto">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </div>
  );
}

