"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
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

export function ProductGrid() {
  const products: Product[] = productsData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Card className="h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-slate-700">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                </div>
              </div>
              <CardTitle className="text-lg text-slate-900">{product.name}</CardTitle>
              <CardDescription className="text-slate-700 line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-2xl font-bold text-slate-900">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full gap-2" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

