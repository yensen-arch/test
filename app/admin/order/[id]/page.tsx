"use client";

import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, Calendar, User, MapPin, Mail, CheckCircle, XCircle } from "lucide-react";
import { use } from "react";

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { orders, updateOrderStatus } = useCart();
  const { id } = use(params);
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Package className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Order Not Found</h2>
            <p className="text-slate-700 mb-6">The order you're looking for doesn't exist.</p>
            <Link href="/admin">
              <Button>Back to Orders</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleStatusChange = (newStatus: "completed" | "incomplete") => {
    updateOrderStatus(order.id, newStatus);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Order {order.id}</h1>
              <div className="flex items-center gap-4 text-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex gap-4 p-4 bg-slate-50 rounded-lg"
                    >
                      <div className="relative w-24 h-24 flex-shrink-0">
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
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-slate-900">Order Total</span>
                      <span className="text-2xl font-bold text-slate-900">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="md:col-span-2 flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-slate-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Shipping Address</p>
                      <p className="text-slate-700">
                        {order.shippingInfo.address}
                        <br />
                        {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
                        {order.shippingInfo.zipCode}
                        <br />
                        {order.shippingInfo.country}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-slate-900">Order Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status" className="mb-2 block text-sm font-medium text-slate-900">
                    Change Status
                  </Label>
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      handleStatusChange(value as "completed" | "incomplete")
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incomplete">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-yellow-600" />
                          Incomplete
                        </div>
                      </SelectItem>
                      <SelectItem value="completed">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Completed
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-4 border-t">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-700">
                      <span>Items:</span>
                      <span className="font-medium">{order.items.length}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Subtotal:</span>
                      <span className="font-medium">
                        ${(order.total - 10).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Shipping:</span>
                      <span className="font-medium">$10.00</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

