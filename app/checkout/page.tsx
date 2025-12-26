"use client";

import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import { CheckoutForm } from "@/components/storefront/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-6 py-12">
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-3 text-slate-900 tracking-tight">Checkout</h1>
            <p className="text-slate-600 text-lg">Complete your order</p>
          </div>
          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

