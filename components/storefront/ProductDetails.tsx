"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
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

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart, cart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const isInCart = cart.some((item) => item.productId === product.id);

  const handleAddToCart = () => {
    addToCart(product.id);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="font-medium">Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative w-full h-96 lg:h-[650px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sm font-medium text-slate-700 bg-slate-100 px-4 py-1.5 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold text-slate-900">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-slate-500">/ 5.0</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-5 leading-tight tracking-tight">{product.name}</h1>
            <p className="text-4xl font-bold text-slate-900 mb-8">${product.price.toFixed(2)}</p>
          </div>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Description</h2>
              <p className="text-slate-700 leading-relaxed text-base">{product.description}</p>
            </CardContent>
          </Card>

          <div className="flex gap-4 text-slate-900">
            {isInCart ? (
              <Button size="lg" className="flex-1 gap-2 h-14 text-base" disabled>
                <Check className="h-5 w-5" />
                Already in Cart
              </Button>
            ) : (
              <Button size="lg" className="flex-1 gap-2 h-14 text-base" onClick={handleAddToCart}>
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
            )}
            <Link href="/cart">
              <Button size="lg" variant="outline" className="text-slate-900 h-14 text-base border-2">
                View Cart
              </Button>
            </Link>
          </div>

          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-5">Product Details</h3>
            <div className="space-y-3 text-slate-700">
              <div className="flex justify-between">
                <span className="font-medium">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Rating:</span>
                <span>{product.rating.toFixed(1)} / 5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span>${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

