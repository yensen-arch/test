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
      <div className="text-center py-12">
        <ShoppingBag className="h-16 w-16 mx-auto text-slate-400 mb-4" />
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-700 mb-6">Add some products to get started!</p>
        <Link href="/products">
          <Button>Browse Products</Button>
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
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Cart Items ({cart.length})
          </h2>
          <Button variant="outline" onClick={clearCart} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </Button>
        </div>

        {cart.map((item) => (
          <Card key={item.productId}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Link href={`/product/${item.productId}`} className="flex-shrink-0">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </Link>
                <div className="flex-1">
                  <Link href={`/product/${item.productId}`}>
                    <h3 className="text-lg font-semibold text-slate-900 hover:underline">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-600 mt-1">{item.product.category}</p>
                  <p className="text-xl font-bold text-slate-900 mt-2">
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
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle className="text-slate-900">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-slate-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold text-slate-900">
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

