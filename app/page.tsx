import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import { ProductCarousel } from "@/components/storefront/ProductCarousel";
import { FAQ } from "@/components/storefront/FAQ";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto">
        <ProductCarousel />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
