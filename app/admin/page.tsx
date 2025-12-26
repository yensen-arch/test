"use client";

import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Package, Calendar, User, MapPin, Mail } from "lucide-react";

export default function AdminPage() {
  const { orders } = useCart();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Provider Portal</h1>
          <p className="text-slate-700">Manage and view all customer orders</p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">No Orders Yet</h2>
              <p className="text-slate-700">
                Orders will appear here once customers complete checkout.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                All Orders ({orders.length})
              </h2>
            </div>

            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900">Order {order.id}</CardTitle>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Shipping Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 text-slate-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Name</p>
                          <p className="text-slate-700">{order.shippingInfo.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-slate-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Email</p>
                          <p className="text-slate-700">{order.shippingInfo.email}</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-slate-900 mb-1">Address</p>
                        <p className="text-slate-700">
                          {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
                          {order.shippingInfo.state} {order.shippingInfo.zipCode}
                        </p>
                        <p className="text-slate-700">{order.shippingInfo.country}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.productId}
                          className="flex gap-4 p-4 bg-slate-50 rounded-lg"
                        >
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900">{item.product.name}</h4>
                            <p className="text-sm text-slate-600">{item.product.category}</p>
                            <p className="text-lg font-bold text-slate-900 mt-1">
                              ${item.product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-slate-900">Order Total</span>
                      <span className="text-2xl font-bold text-slate-900">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

