"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
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

export type OrderStatus = "completed" | "incomplete";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
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
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Generate dummy orders
function generateDummyOrders(): Order[] {
  const allProducts = productsData as Product[];
  const dummyCustomers = [
    { name: "John Doe", email: "john@example.com", address: "123 Main St", city: "New York", state: "NY", zipCode: "10001", country: "USA" },
    { name: "Jane Smith", email: "jane@example.com", address: "456 Oak Ave", city: "Los Angeles", state: "CA", zipCode: "90001", country: "USA" },
    { name: "Bob Johnson", email: "bob@example.com", address: "789 Pine Rd", city: "Chicago", state: "IL", zipCode: "60601", country: "USA" },
    { name: "Alice Williams", email: "alice@example.com", address: "321 Elm St", city: "Houston", state: "TX", zipCode: "77001", country: "USA" },
    { name: "Charlie Brown", email: "charlie@example.com", address: "654 Maple Dr", city: "Phoenix", state: "AZ", zipCode: "85001", country: "USA" },
    { name: "Diana Prince", email: "diana@example.com", address: "987 Cedar Ln", city: "Philadelphia", state: "PA", zipCode: "19101", country: "USA" },
    { name: "Ethan Hunt", email: "ethan@example.com", address: "147 Birch Way", city: "San Antonio", state: "TX", zipCode: "78201", country: "USA" },
    { name: "Fiona Green", email: "fiona@example.com", address: "258 Spruce Ct", city: "San Diego", state: "CA", zipCode: "92101", country: "USA" },
    { name: "George White", email: "george@example.com", address: "369 Willow St", city: "Dallas", state: "TX", zipCode: "75201", country: "USA" },
    { name: "Hannah Black", email: "hannah@example.com", address: "741 Ash Ave", city: "San Jose", state: "CA", zipCode: "95101", country: "USA" },
  ];

  const statuses: OrderStatus[] = ["completed", "incomplete"];
  const dummyOrders: Order[] = [];

  // Create 25 dummy orders with varying dates
  for (let i = 0; i < 25; i++) {
    const customer = dummyCustomers[i % dummyCustomers.length];
    const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items
    const selectedProducts = allProducts
      .sort(() => Math.random() - 0.5)
      .slice(0, numItems);
    
    const items: CartItem[] = selectedProducts.map((product) => ({
      productId: product.id,
      product,
    }));

    const total = items.reduce((sum, item) => sum + item.product.price, 0) + 10; // Add shipping

    // Create dates from last 10 minutes to 7 days ago
    const minutesAgo = Math.floor(Math.random() * (7 * 24 * 60 - 10)) + 10;
    const createdAt = new Date(Date.now() - minutesAgo * 60 * 1000);

    dummyOrders.push({
      id: `ORD-${1000 + i}`,
      items,
      total,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      shippingInfo: customer,
      createdAt,
    });
  }

  // Sort by date, newest first
  return dummyOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Initialize with dummy orders
  useEffect(() => {
    if (orders.length === 0) {
      setOrders(generateDummyOrders());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      total: getCartTotal() + 10, // Add shipping
      status: "incomplete",
      shippingInfo,
      createdAt: new Date(),
    };
    setOrders([newOrder, ...orders]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
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
        updateOrderStatus,
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

