"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import productsData from "@/products.json";

type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
};

export function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

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
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Best Selling Products</h2>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex-[0_0_300px] min-w-0">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="relative w-full h-48 mb-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating.toFixed(1)} / 5.0</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
          >
            ←
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
}

