'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, DollarSign, ArrowUpRight } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { StatCard } from '@/components/admin/ui/StatCard';
import { AdminTransactionRecord } from '@/lib/admin/types';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';

export default function AdminPaymentsPage() {
  const { transactions } = useAdmin();
  const [statusFilter, setStatusFilter] = useState('All');

  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);

  const filteredTxns = transactions.filter((t) => {
    return statusFilter === 'All' || t.status === statusFilter;
  });

  const columns: Column<AdminTransactionRecord>[] = [
    {
      key: 'transactionId',
      header: 'Transaction Reference',
      sortable: true,
      accessor: (row) => row.transactionId,
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-zinc-950 block">{row.transactionId}</span>
          <span className="text-[10px] text-zinc-400">Order: {row.orderNumber}</span>
        </div>
      )
    },
    {
      key: 'customer',
      header: 'Customer',
      accessor: (row) => row.customerName,
      render: (row) => <span className="font-bold text-zinc-900">{row.customerName}</span>
    },
    {
      key: 'vendor',
      header: 'Fulfilling Merchant',
      accessor: (row) => row.vendorName,
      render: (row) => <span className="font-medium text-zinc-700">{row.vendorName}</span>
    },
    {
      key: 'amount',
      header: 'Gross Volume',
      sortable: true,
      accessor: (row) => row.amount,
      render: (row) => <span className="font-black text-zinc-950">{formatPrice(row.amount)}</span>
    },
    {
      key: 'method',
      header: 'Gateway Method',
      render: (row) => (
        <span className="text-[11px] font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded">
          {row.method}
        </span>
      )
    },
    {
      key: 'date',
      header: 'Timestamp',
      sortable: true,
      accessor: (row) => row.date,
      render: (row) => <span className="text-zinc-500 text-[11px]">{row.date}</span>
    },
    {
      key: 'status',
      header: 'Gateway Status',
      sortable: true,
      accessor: (row) => row.status,
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <AdminLayout
      title="Payment Gateway Transactions"
      subtitle="Audit inbound payments, settlement webhooks, and gateway authorization logs."
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/payouts"
            className="px-3.5 py-2 bg-zinc-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-800 transition-colors"
          >
            <span>Vendor Payouts Hub →</span>
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Settled Transactions" value={transactions.length} icon={CreditCard} />
        <StatCard title="Gross Volume Audited" value={formatPrice(totalVolume)} icon={DollarSign} iconColor="text-emerald-700" iconBg="bg-emerald-50" />
        <StatCard title="Payment Gateway Success Rate" value="99.6%" icon={CheckCircle2} iconColor="text-emerald-700" iconBg="bg-emerald-50" />
      </div>

      <DataTable
        data={filteredTxns}
        columns={columns}
        keyExtractor={(row) => row.id}
        title="Gateway Inbound Transaction Log"
        searchPlaceholder="Search txn ID, order ID, customer..."
        exportFilename="dribo_transactions_export"
      />
    </AdminLayout>
  );
}
