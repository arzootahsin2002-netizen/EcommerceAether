'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  RotateCcw,
  Receipt,
  Eye,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { StatCard } from '@/components/admin/ui/StatCard';
import { AdminOrderRecord } from '@/lib/admin/types';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';
import { BaseModal } from '@/components/admin/ui/Modals';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();

  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderRecord | null>(null);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending').length;
  const processingOrders = orders.filter((o) => o.orderStatus === 'Processing').length;
  const shippedOrders = orders.filter((o) => o.orderStatus === 'Shipped').length;
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;

  const filteredOrders = orders.filter((o) => {
    return statusFilter === 'All' || o.orderStatus === statusFilter;
  });

  const columns: Column<AdminOrderRecord>[] = [
    {
      key: 'orderNumber',
      header: 'Order ID',
      sortable: true,
      accessor: (row) => row.orderNumber,
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-zinc-950 block">{row.orderNumber}</span>
          <span className="text-[10px] text-zinc-400">{row.date}</span>
        </div>
      )
    },
    {
      key: 'customer',
      header: 'Customer Details',
      sortable: true,
      accessor: (row) => row.customerName,
      render: (row) => (
        <div>
          <p className="font-bold text-zinc-900">{row.customerName}</p>
          <p className="text-[11px] text-zinc-400">{row.customerEmail}</p>
          <p className="text-[10px] text-zinc-400">{row.customerPhone}</p>
        </div>
      )
    },
    {
      key: 'vendor',
      header: 'Fulfilling Merchant',
      sortable: true,
      accessor: (row) => row.vendorName,
      render: (row) => <span className="font-medium text-zinc-800">{row.vendorName}</span>
    },
    {
      key: 'pricing',
      header: 'Amount & Commission',
      sortable: true,
      accessor: (row) => row.totalAmount,
      render: (row) => (
        <div>
          <span className="font-black text-zinc-950">{formatPrice(row.totalAmount)}</span>
          <span className="block text-[10px] text-emerald-700 font-bold">
            Cut: {formatPrice(row.platformCommission)}
          </span>
        </div>
      )
    },
    {
      key: 'payment',
      header: 'Payment Status',
      sortable: true,
      accessor: (row) => row.paymentMethod,
      render: (row) => (
        <div>
          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
            {row.paymentMethod}
          </span>
          <span className="block text-[10px] text-zinc-400 mt-0.5">Status: {row.paymentStatus}</span>
        </div>
      )
    },
    {
      key: 'fulfillment',
      header: 'Logistics / Carrier',
      render: (row) => (
        <div>
          <span className="font-bold text-zinc-800 text-[11px] block">{row.carrier}</span>
          <span className="font-mono text-[10px] text-zinc-400">{row.trackingNumber}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Order Status',
      sortable: true,
      accessor: (row) => row.orderStatus,
      render: (row) => <StatusBadge status={row.orderStatus} />
    },
    {
      key: 'actions',
      header: 'Update Status',
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <select
            value={row.orderStatus}
            onChange={(e) => updateOrderStatus(row.id, e.target.value as any)}
            className="px-2.5 py-1 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-800 outline-none cursor-pointer"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => setSelectedOrder(row)}
            className="p-1 text-zinc-400 hover:text-black rounded"
            title="Inspect Order Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <AdminLayout
      title="Orders Fulfillment Matrix"
      subtitle="Track customer orders across multiple vendors, carrier dispatch, and settlement splits."
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/returns"
            className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-bold transition-colors"
          >
            Returns Portal
          </Link>
          <Link
            href="/admin/refunds"
            className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-bold transition-colors"
          >
            Refunds Ledger
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} />
        <StatCard title="Processing & Packed" value={processingOrders} icon={Clock} iconColor="text-amber-700" iconBg="bg-amber-50" />
        <StatCard title="In Transit (Shipped)" value={shippedOrders} icon={Truck} iconColor="text-blue-700" iconBg="bg-blue-50" />
        <StatCard title="Successfully Delivered" value={deliveredOrders} icon={CheckCircle2} iconColor="text-emerald-700" iconBg="bg-emerald-50" />
      </div>

      <DataTable
        data={filteredOrders}
        columns={columns}
        keyExtractor={(row) => row.id}
        title="Marketplace Fulfillment Ledger"
        searchPlaceholder="Search order ID, customer name, tracking AWB..."
        exportFilename="aether_orders_export"
        filterComponent={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        }
      />

      {/* Order Detail Modal */}
      {selectedOrder && (
        <BaseModal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`Order Summary: ${selectedOrder.orderNumber}`}>
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div>
                <span className="text-zinc-400 text-[11px] block">Order Date & Time</span>
                <strong className="text-zinc-900">{selectedOrder.date}</strong>
              </div>
              <StatusBadge status={selectedOrder.orderStatus} />
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 bg-zinc-50 rounded-xl border border-zinc-100">
              <div>
                <span className="text-zinc-400 text-[11px] block">Customer</span>
                <p className="font-bold text-zinc-900">{selectedOrder.customerName}</p>
                <p className="text-zinc-500">{selectedOrder.customerPhone}</p>
              </div>
              <div>
                <span className="text-zinc-400 text-[11px] block">Fulfilling Merchant</span>
                <p className="font-bold text-zinc-900">{selectedOrder.vendorName}</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-zinc-200/60">
                <span className="text-zinc-400 text-[11px] block">Shipping Destination</span>
                <p className="text-zinc-800">{selectedOrder.shippingAddress}</p>
              </div>
            </div>

            {/* Carrier & Tracking */}
            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-zinc-400 text-[11px] block">Carrier Logistics</span>
                <p className="font-bold text-zinc-900">{selectedOrder.carrier}</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-zinc-400 text-[11px] block">Tracking AWB</span>
                <p className="font-bold text-zinc-900">{selectedOrder.trackingNumber}</p>
              </div>
            </div>

            {/* Financial Split */}
            <div className="p-3.5 bg-zinc-950 text-white rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Total Customer Paid:</span>
                <strong className="text-white text-sm">{formatPrice(selectedOrder.totalAmount)}</strong>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-emerald-400">Platform Commission Cut:</span>
                <strong className="text-emerald-400">{formatPrice(selectedOrder.platformCommission)}</strong>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-amber-400">Vendor Net Payable:</span>
                <strong className="text-amber-400">{formatPrice(selectedOrder.vendorPayout)}</strong>
              </div>
            </div>
          </div>
        </BaseModal>
      )}
    </AdminLayout>
  );
}
