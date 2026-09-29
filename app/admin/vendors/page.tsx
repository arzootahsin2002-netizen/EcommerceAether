'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Store,
  ShieldCheck,
  Plus,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  MoreVertical,
  Eye,
  Trash2,
  UserX,
  UserCheck
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { StatCard } from '@/components/admin/ui/StatCard';
import { AdminVendor } from '@/lib/admin/types';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';
import { AddVendorModal, RejectReasonModal, ConfirmModal } from '@/components/admin/ui/Modals';

export default function AdminVendorsPage() {
  const { vendors, approveVendor, rejectVendor, suspendVendor, addVendor } = useAdmin();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [rejectingVendorId, setRejectingVendorId] = useState<string | null>(null);
  const [suspendingVendor, setSuspendingVendor] = useState<AdminVendor | null>(null);

  // Statistics
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter((v) => v.status === 'Active').length;
  const pendingVendors = vendors.filter((v) => v.verificationStatus === 'Pending' || v.verificationStatus === 'Under Review').length;
  const suspendedVendors = vendors.filter((v) => v.status === 'Suspended' || v.status === 'Blocked').length;

  // Filtered dataset
  const filteredVendors = vendors.filter((v) => {
    const matchStatus =
      statusFilter === 'All' ||
      v.status.toLowerCase() === statusFilter.toLowerCase() ||
      v.verificationStatus.toLowerCase() === statusFilter.toLowerCase();
    const matchCategory =
      categoryFilter === 'All' || v.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchStatus && matchCategory;
  });

  const columns: Column<AdminVendor>[] = [
    {
      key: 'vendor',
      header: 'Vendor Details',
      sortable: true,
      accessor: (row) => row.businessName,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
            <Image src={row.logo} alt="" fill unoptimized className="object-cover" />
          </div>
          <div>
            <Link
              href={`/admin/vendors/${row.id}`}
              className="font-bold text-zinc-950 hover:text-amber-600 transition-colors block"
            >
              {row.businessName}
            </Link>
            <span className="text-[11px] text-zinc-400 font-mono">{row.vendorId}</span>
          </div>
        </div>
      )
    },
    {
      key: 'owner',
      header: 'Owner & Contact',
      accessor: (row) => row.vendorName,
      render: (row) => (
        <div>
          <p className="font-semibold text-zinc-800">{row.vendorName}</p>
          <p className="text-[11px] text-zinc-400">{row.email}</p>
          <p className="text-[10px] text-zinc-400">{row.phone}</p>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Department',
      sortable: true,
      accessor: (row) => row.category,
      render: (row) => <span className="font-medium text-zinc-700">{row.category}</span>
    },
    {
      key: 'tax',
      header: 'Tax / GSTIN',
      render: (row) => (
        <div>
          <span className="font-mono text-[11px] font-bold text-zinc-800">{row.gstin}</span>
          <span className="block text-[10px] text-zinc-400">PAN: {row.pan}</span>
        </div>
      )
    },
    {
      key: 'metrics',
      header: 'Catalog & GMV',
      sortable: true,
      accessor: (row) => row.totalRevenue,
      render: (row) => (
        <div>
          <span className="font-bold text-zinc-950">{formatPrice(row.totalRevenue)}</span>
          <span className="block text-[10px] text-zinc-400">
            {row.productsCount} items • {row.ordersCount} orders
          </span>
        </div>
      )
    },
    {
      key: 'verification',
      header: 'Verification',
      sortable: true,
      accessor: (row) => row.verificationStatus,
      render: (row) => <StatusBadge status={row.verificationStatus} />
    },
    {
      key: 'status',
      header: 'Account Status',
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
          <Link
            href={`/admin/vendors/${row.id}`}
            className="p-1.5 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
            title="View Full Vendor Profile"
          >
            <Eye className="w-4 h-4" />
          </Link>

          {row.verificationStatus !== 'Approved' && (
            <button
              onClick={() => approveVendor(row.id)}
              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
              title="Approve Vendor Application"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setSuspendingVendor(row)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              row.status === 'Suspended'
                ? 'text-emerald-600 hover:bg-emerald-50'
                : 'text-amber-600 hover:bg-amber-50'
            }`}
            title={row.status === 'Suspended' ? 'Unsuspend Vendor' : 'Suspend Vendor'}
          >
            {row.status === 'Suspended' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
          </button>
        </div>
      )
    }
  ];

  return (
    <AdminLayout
      title="Vendors Management"
      subtitle="Onboard, verify, audit, and regulate marketplace merchant partners."
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/vendors/verification"
            className="px-3.5 py-2 bg-amber-50 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>KYC Verification Hub ({pendingVendors})</span>
          </Link>

          <button
            onClick={() => setIsAddVendorOpen(true)}
            className="px-3.5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Vendor</span>
          </button>
        </div>
      }
    >
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total Vendors" value={totalVendors} icon={Store} />
        <StatCard title="Active Merchants" value={activeVendors} icon={CheckCircle2} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <StatCard title="Pending Verification" value={pendingVendors} attention={pendingVendors > 0} icon={ShieldCheck} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <StatCard title="Suspended Merchants" value={suspendedVendors} icon={AlertTriangle} iconColor="text-rose-600" iconBg="bg-rose-50" />
      </div>

      {/* Main Vendors Table */}
      <DataTable
        data={filteredVendors}
        columns={columns}
        keyExtractor={(row) => row.id}
        title="Verified Merchant Partners Directory"
        searchPlaceholder="Search vendor name, business, GSTIN, email..."
        exportFilename="dribo_vendors_list"
        filterComponent={
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending Verification</option>
              <option value="Approved">Approved</option>
              <option value="Suspended">Suspended</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 outline-none hidden sm:block"
            >
              <option value="All">All Categories</option>
              <option value="Fashion">Fashion</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty">Beauty</option>
              <option value="Home">Home & Furniture</option>
            </select>
          </div>
        }
      />

      {/* Modals */}
      <AddVendorModal
        isOpen={isAddVendorOpen}
        onClose={() => setIsAddVendorOpen(false)}
        onAdd={addVendor}
      />

      <RejectReasonModal
        isOpen={!!rejectingVendorId}
        onClose={() => setRejectingVendorId(null)}
        onConfirm={(reason) => {
          if (rejectingVendorId) {
            rejectVendor(rejectingVendorId, reason);
            setRejectingVendorId(null);
          }
        }}
        title="Reject Vendor Application"
        itemLabel="this vendor"
      />

      {suspendingVendor && (
        <ConfirmModal
          isOpen={!!suspendingVendor}
          onClose={() => setSuspendingVendor(null)}
          onConfirm={() => {
            suspendVendor(suspendingVendor.id);
            setSuspendingVendor(null);
          }}
          title={suspendingVendor.status === 'Suspended' ? 'Reactivate Vendor' : 'Suspend Vendor'}
          message={`Are you sure you want to ${
            suspendingVendor.status === 'Suspended' ? 'reactivate' : 'suspend'
          } ${suspendingVendor.businessName}? Suspended vendors cannot receive new marketplace orders.`}
          confirmLabel={suspendingVendor.status === 'Suspended' ? 'Reactivate Vendor' : 'Suspend Vendor'}
          isDanger={suspendingVendor.status !== 'Suspended'}
        />
      )}
    </AdminLayout>
  );
}
