"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export function CartContent() {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="h-20 w-20 mx-auto text-slate-400 mb-6" />
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Your cart is empty</h2>
        <p className="text-slate-600 text-lg mb-8">Add some products to get started!</p>
        <Link href="/products">
          <Button size="lg" className="px-8">Browse Products</Button>
        </Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = 10.0; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Cart Items ({cart.length})
          </h2>
          <Button variant="outline" onClick={clearCart} className="gap-2" size="sm">
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </Button>
        </div>

        {cart.map((item) => (
          <Card key={item.productId} className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Link href={`/product/${item.productId}`} className="flex-shrink-0">
                  <div className="relative w-28 h-28 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.productId}`}>
                    <h3 className="text-lg font-semibold text-slate-900 hover:underline mb-1">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-600 mb-3">{item.product.category}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-6 border-slate-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-slate-900">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-slate-700 text-base">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-700 text-base">
                <span>Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold text-slate-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link href="/checkout" className="block">
              <Button className="w-full gap-2 text-slate-900" size="lg">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products" className="block">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

