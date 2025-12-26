"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LogIn } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export function Header() {
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  return (
    <header className="bg-slate-50 border-b border-slate-400">
      <div className="container mx-auto px-6 py-5 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-slate-900 tracking-tight hover:opacity-80 transition-opacity">
            Storefront
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-medium text-slate-800 hover:text-slate-900 hover:underline transition-colors">
              Products
            </Link>
          </nav>
          <div className="flex items-center gap-3 text-slate-800">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart ({cartCount})
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

