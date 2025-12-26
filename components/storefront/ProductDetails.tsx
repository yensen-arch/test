"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full h-96 lg:h-[600px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold text-slate-900">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-slate-600">/ 5.0</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-slate-900 mb-6">${product.price.toFixed(2)}</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Description</h2>
              <p className="text-slate-700 leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1 gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Product Details</h3>
            <div className="space-y-2 text-slate-700">
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

