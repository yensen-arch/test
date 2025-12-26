import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LogIn } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-slate-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Storefront
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:underline">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:underline">
              Categories
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Cart (0)
            </Button>
            <Button size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

