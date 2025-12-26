"use client";

import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import { CartContent } from "@/components/storefront/CartContent";
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link
              href="/products"
              className="text-slate-700 hover:text-slate-900 inline-flex items-center gap-2"
            >
              ← Back to Products
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Shopping Cart</h1>
          <CartContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}

