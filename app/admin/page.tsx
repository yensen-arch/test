"use client";

import { OrdersTable } from "@/components/admin/OrdersTable";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Provider Portal</h1>
          <p className="text-slate-700">Manage and view all customer orders</p>
        </div>
        <OrdersTable />
      </div>
    </div>
  );
}
