"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  category: string;
};

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  const { addToCart, cart } = useCart();
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-slate-700">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Card className="h-full flex flex-col cursor-pointer hover:shadow-xl transition-all duration-300 border-slate-200">
            <CardHeader className="p-5">
              <div className="relative w-full h-56 mb-5 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
                </div>
              </div>
              <CardTitle className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">{product.name}</CardTitle>
              <CardDescription className="text-slate-600 line-clamp-2 text-sm leading-relaxed">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 px-5 pb-3">
              <p className="text-2xl font-bold text-slate-900">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="px-5 pb-5">
              {cart.some((item) => item.productId === product.id) ||
              addedProducts.has(product.id) ? (
                <Button
                  className="w-full gap-2 text-slate-900"
                  disabled
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Check className="h-4 w-4" />
                  In Cart
                </Button>
              ) : (
                <Button
                  className="w-full gap-2 text-slate-900"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product.id);
                    setAddedProducts((prev) => new Set(prev).add(product.id));
                    setTimeout(() => {
                      setAddedProducts((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(product.id);
                        return newSet;
                      });
                    }, 2000);
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

