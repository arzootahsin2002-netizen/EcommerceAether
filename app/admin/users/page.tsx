'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  DollarSign,
  ShoppingBag,
  Eye,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { StatCard } from '@/components/admin/ui/StatCard';
import { AdminCustomer } from '@/lib/admin/types';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';
import { ConfirmModal } from '@/components/admin/ui/Modals';

export default function AdminUsersPage() {
  const { customers, blockCustomer, unblockCustomer, verifyCustomer } = useAdmin();

  const [statusFilter, setStatusFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');
  const [blockingUser, setBlockingUser] = useState<AdminCustomer | null>(null);

  const totalUsers = customers.length;
  const activeUsers = customers.filter((c) => c.status === 'Active').length;
  const verifiedUsers = customers.filter((c) => c.verificationStatus === 'Verified').length;
  const blockedUsers = customers.filter((c) => c.status === 'Blocked').length;

  const filteredUsers = customers.filter((c) => {
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchTier = tierFilter === 'All' || c.loyaltyTier === tierFilter;
    return matchStatus && matchTier;
  });

  const columns: Column<AdminCustomer>[] = [
    {
      key: 'user',
      header: 'Customer',
      sortable: true,
      accessor: (row) => row.name,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
            <Image src={row.avatar} alt="" fill unoptimized className="object-cover" />
          </div>
          <div>
            <p className="font-bold text-zinc-900">{row.name}</p>
            <p className="text-[11px] text-zinc-400 font-mono">{row.userId}</p>
          </div>
        </div>
      )
    },
    {
      key: 'contact',
      header: 'Contact Info',
      accessor: (row) => row.email,
      render: (row) => (
        <div>
          <p className="text-zinc-800">{row.email}</p>
          <p className="text-[11px] text-zinc-400">{row.phone}</p>
        </div>
      )
    },
    {
      key: 'tier',
      header: 'Tier & Loyalty',
      sortable: true,
      accessor: (row) => row.loyaltyTier,
      render: (row) => (
        <span className="text-[10px] font-black uppercase bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
          {row.loyaltyTier}
        </span>
      )
    },
    {
      key: 'metrics',
      header: 'Orders & Spent',
      sortable: true,
      accessor: (row) => row.totalSpent,
      render: (row) => (
        <div>
          <span className="font-black text-zinc-950">{formatPrice(row.totalSpent)}</span>
          <span className="block text-[10px] text-zinc-400">{row.ordersCount} lifetime orders</span>
        </div>
      )
    },
    {
      key: 'verification',
      header: 'KYC Status',
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
          {row.verificationStatus !== 'Verified' && (
            <button
              onClick={() => verifyCustomer(row.id)}
              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
              title="Verify User Identity"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}

          {row.status === 'Active' ? (
            <button
              onClick={() => setBlockingUser(row)}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Block User"
            >
              <UserX className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => unblockCustomer(row.id)}
              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
              title="Unblock User"
            >
              <UserCheck className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <AdminLayout
      title="User Management"
      subtitle="Manage registered marketplace patrons, loyalty VIP tiers, and account permissions."
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/users/verification"
            className="px-3.5 py-2 bg-zinc-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-800 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>User KYC Verification</span>
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total Customers" value={totalUsers} icon={Users} />
        <StatCard title="Active Patrons" value={activeUsers} icon={UserCheck} iconColor="text-emerald-700" iconBg="bg-emerald-50" />
        <StatCard title="KYC Verified" value={verifiedUsers} icon={ShieldCheck} iconColor="text-blue-700" iconBg="bg-blue-50" />
        <StatCard title="Blocked Accounts" value={blockedUsers} icon={UserX} iconColor="text-rose-700" iconBg="bg-rose-50" />
      </div>

      <DataTable
        data={filteredUsers}
        columns={columns}
        keyExtractor={(row) => row.id}
        title="Marketplace Users Directory"
        searchPlaceholder="Search customer name, email, phone, user ID..."
        exportFilename="aether_users_export"
        filterComponent={
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>

            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 outline-none hidden sm:block"
            >
              <option value="All">All Loyalty Tiers</option>
              <option value="Regular">Regular</option>
              <option value="Gold">Gold</option>
              <option value="VIP Diamond">VIP Diamond</option>
            </select>
          </div>
        }
      />

      {blockingUser && (
        <ConfirmModal
          isOpen={!!blockingUser}
          onClose={() => setBlockingUser(null)}
          onConfirm={() => {
            blockCustomer(blockingUser.id);
            setBlockingUser(null);
          }}
          title="Block User Account"
          message={`Are you sure you want to block ${blockingUser.name}? Blocked users will not be able to log in or place new marketplace orders.`}
          confirmLabel="Block User"
          isDanger={true}
        />
      )}
    </AdminLayout>
  );
}
