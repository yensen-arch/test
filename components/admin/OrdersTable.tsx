"use client";

import { useState, useMemo } from "react";
import { useCart, Order, OrderStatus } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, Eye } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export function OrdersTable() {
  const { orders } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateRangeFilter, setDateRangeFilter] = useState<string>("all");

  // Filter orders
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.shippingInfo.name.toLowerCase().includes(query) ||
          order.items.some((item) =>
            item.product.name.toLowerCase().includes(query)
          )
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Date range filter
    if (dateRangeFilter !== "all") {
      const now = Date.now();
      let minutesAgo = 0;

      switch (dateRangeFilter) {
        case "last-10-mins":
          minutesAgo = 10;
          break;
        case "last-hour":
          minutesAgo = 60;
          break;
        case "last-day":
          minutesAgo = 24 * 60;
          break;
        case "last-week":
          minutesAgo = 7 * 24 * 60;
          break;
        case "last-month":
          minutesAgo = 30 * 24 * 60;
          break;
      }

      const cutoffTime = now - minutesAgo * 60 * 1000;
      filtered = filtered.filter(
        (order) => order.createdAt.getTime() >= cutoffTime
      );
    }

    return filtered;
  }, [orders, searchQuery, statusFilter, dateRangeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, dateRangeFilter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="search" className="mb-2 block text-sm font-medium text-slate-900">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              id="search"
              type="text"
              placeholder="Search by order ID, customer name, or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="status" className="mb-2 block text-sm font-medium text-slate-900">
            Status
          </Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dateRange" className="mb-2 block text-sm font-medium text-slate-900">
            Date Range
          </Label>
          <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
            <SelectTrigger id="dateRange">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="last-10-mins">Last 10 Minutes</SelectItem>
              <SelectItem value="last-hour">Last Hour</SelectItem>
              <SelectItem value="last-day">Last Day</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-slate-700">
        Showing {filteredOrders.length} of {orders.length} orders
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-slate-900">Order ID</TableHead>
              <TableHead className="text-slate-900">Customer</TableHead>
              <TableHead className="text-slate-900">Products</TableHead>
              <TableHead className="text-slate-900">Total</TableHead>
              <TableHead className="text-slate-900">Status</TableHead>
              <TableHead className="text-slate-900">Date</TableHead>
              <TableHead className="text-slate-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-slate-700">
                  No orders found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-slate-900">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {order.shippingInfo.name}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/order/${order.id}`}>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

