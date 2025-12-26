"use client";

import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import { CheckoutForm } from "@/components/storefront/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Checkout</h1>
          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

