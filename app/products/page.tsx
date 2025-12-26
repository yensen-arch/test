"use client";

import { useState } from "react";
import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { ProductFilters } from "@/components/storefront/ProductFilters";
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

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData as Product[]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">All Products</h1>
          <ProductFilters
            products={productsData as Product[]}
            onFilteredProductsChange={setFilteredProducts}
          />
          <ProductGrid products={filteredProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
