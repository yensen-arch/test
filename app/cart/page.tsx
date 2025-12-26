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
        <div className="container mx-auto px-6 py-12">
          <div className="mb-8">
            <Link
              href="/products"
              className="text-slate-700 hover:text-slate-900 inline-flex items-center gap-2 font-medium transition-colors"
            >
              ← Back to Products
            </Link>
          </div>
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-3 text-slate-900 tracking-tight">Shopping Cart</h1>
            <p className="text-slate-600 text-lg">Review your items before checkout</p>
          </div>
          <CartContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}

