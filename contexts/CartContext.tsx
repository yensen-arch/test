"use client";

import { createContext, useContext, useState, ReactNode } from "react";
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

type CartItem = {
  productId: string;
  product: Product;
};

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  shippingInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
};

type CartContextType = {
  cart: CartItem[];
  orders: Order[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  createOrder: (shippingInfo: Order["shippingInfo"]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (productId: string) => {
    const product = (productsData as Product[]).find((p) => p.id === productId);
    if (!product) return;

    // Check if product already in cart (limit to single quantity)
    if (cart.some((item) => item.productId === productId)) {
      return; // Already in cart, do nothing
    }

    setCart([...cart, { productId, product }]);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price, 0);
  };

  const getCartItemCount = () => {
    return cart.length;
  };

  const createOrder = (shippingInfo: Order["shippingInfo"]) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total: getCartTotal(),
      shippingInfo,
      createdAt: new Date(),
    };
    setOrders([...orders, newOrder]);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemCount,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

