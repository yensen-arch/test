"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Check } from "lucide-react";
import productsData from "@/products.json";
import { useCart } from "@/contexts/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  description?: string;
  category?: string;
};

export function ProductCarousel() {
  const { addToCart, cart } = useCart();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  // Get top rated products (sorted by rating, highest first)
  const topProducts: Product[] = [...productsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full py-16 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-3 text-slate-900 tracking-tight">Best Selling Products</h2>
          <p className="text-slate-600 text-lg">Discover our most popular items</p>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex-[0_0_300px] min-w-0">
                  <Link href={`/product/${product.id}`}>
                    <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 border-slate-200">
                      <CardHeader className="p-5">
                        <div className="relative w-full h-56 mb-5 rounded-lg overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <CardTitle className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">{product.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1.5 text-slate-600">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{product.rating.toFixed(1)}</span>
                          <span className="text-slate-400">/ 5.0</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-5 pb-3">
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
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-slate-100"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-slate-100"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

