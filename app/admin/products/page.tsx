'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Plus,
  Boxes,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Trash2,
  Power,
  Layers,
  Star
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { StatCard } from '@/components/admin/ui/StatCard';
import { AdminProductItem } from '@/lib/admin/types';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';
import { AddProductModal, ConfirmModal } from '@/components/admin/ui/Modals';

export default function AdminProductsPage() {
  const { products, vendors, addProduct, deleteProduct, toggleProductStatus } = useAdmin();

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deletingProd, setDeletingProd] = useState<AdminProductItem | null>(null);

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === 'Active').length;
  const pendingApprovals = products.filter((p) => p.approvalStatus === 'Pending Approval').length;
  const outOfStock = products.filter((p) => p.stock === 0 || p.status === 'Out of Stock').length;

  const filteredProducts = products.filter((p) => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchCat && matchStatus;
  });

  const columns: Column<AdminProductItem>[] = [
    {
      key: 'product',
      header: 'Product',
      sortable: true,
      accessor: (row) => row.name,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-12 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
            <Image src={row.image} alt="" fill unoptimized className="object-cover" />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-zinc-950 truncate max-w-[220px]">{row.name}</h4>
            <p className="text-[11px] text-zinc-400 font-mono">SKU: {row.sku}</p>
          </div>
        </div>
      )
    },
    {
      key: 'vendor',
      header: 'Merchant / Vendor',
      sortable: true,
      accessor: (row) => row.vendorName,
      render: (row) => <span className="font-medium text-zinc-800">{row.vendorName}</span>
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      accessor: (row) => row.category,
      render: (row) => (
        <div>
          <span className="font-semibold text-zinc-800">{row.category}</span>
          <span className="block text-[10px] text-zinc-400">{row.subcategory}</span>
        </div>
      )
    },
    {
      key: 'pricing',
      header: 'Price / MRP',
      sortable: true,
      accessor: (row) => row.price,
      render: (row) => (
        <div>
          <span className="font-black text-zinc-950">{formatPrice(row.price)}</span>
          {row.originalPrice > row.price && (
            <span className="block text-[10px] text-zinc-400 line-through">
              {formatPrice(row.originalPrice)}
            </span>
          )}
        </div>
      )
    },
    {
      key: 'stock',
      header: 'Stock Units',
      sortable: true,
      accessor: (row) => row.stock,
      render: (row) => (
        <span
          className={`font-mono font-bold ${
            row.stock === 0 ? 'text-rose-600' : row.stock < 10 ? 'text-amber-600' : 'text-zinc-800'
          }`}
        >
          {row.stock} in stock
        </span>
      )
    },
    {
      key: 'approval',
      header: 'Approval',
      sortable: true,
      accessor: (row) => row.approvalStatus,
      render: (row) => <StatusBadge status={row.approvalStatus} />
    },
    {
      key: 'status',
      header: 'Listing Status',
      sortable: true,
      accessor: (row) => row.status,
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => toggleProductStatus(row.id)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              row.status === 'Active'
                ? 'text-zinc-400 hover:text-amber-600 hover:bg-zinc-100'
                : 'text-emerald-600 hover:bg-emerald-50'
            }`}
            title={row.status === 'Active' ? 'Deactivate Product' : 'Activate Product'}
          >
            <Power className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeletingProd(row)}
            className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <AdminLayout
      title="Product Catalog"
      subtitle="Manage global marketplace listings, inventory levels, merchant SKUs, and retail pricing."
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/approval"
            className="px-3.5 py-2 bg-amber-50 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-colors"
          >
            <Boxes className="w-4 h-4 text-amber-700" />
            <span>Approval Queue ({pendingApprovals})</span>
          </Link>

          <button
            onClick={() => setIsAddOpen(true)}
            className="px-3.5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Product</span>
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total Listings" value={totalProducts} icon={Package} />
        <StatCard title="Active & Live" value={activeProducts} icon={CheckCircle2} iconColor="text-emerald-700" iconBg="bg-emerald-50" />
        <StatCard title="Pending Review" value={pendingApprovals} attention={pendingApprovals > 0} icon={Boxes} iconColor="text-amber-700" iconBg="bg-amber-50" />
        <StatCard title="Out of Stock" value={outOfStock} icon={AlertTriangle} iconColor="text-rose-700" iconBg="bg-rose-50" />
      </div>

      <DataTable
        data={filteredProducts}
        columns={columns}
        keyExtractor={(row) => row.id}
        title="Marketplace Catalog Directory"
        searchPlaceholder="Search product title, SKU, brand, merchant..."
        exportFilename="aether_products_export"
        filterComponent={
          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Fashion">Fashion</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty">Beauty</option>
              <option value="Furniture">Furniture</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 outline-none hidden sm:block"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        }
      />

      <AddProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={addProduct}
        vendors={vendors}
      />

      {deletingProd && (
        <ConfirmModal
          isOpen={!!deletingProd}
          onClose={() => setDeletingProd(null)}
          onConfirm={() => {
            deleteProduct(deletingProd.id);
            setDeletingProd(null);
          }}
          title="Delete Product Listing"
          message={`Are you sure you want to remove "${deletingProd.name}" from the AETHER catalog? This action cannot be undone.`}
          confirmLabel="Delete Product"
          isDanger={true}
        />
      )}
    </AdminLayout>
  );
}
