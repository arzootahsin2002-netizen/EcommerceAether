'use client';

import React from 'react';
import Link from 'next/link';
import { Receipt, CheckCircle2, RotateCcw, CreditCard } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { StatCard } from '@/components/admin/ui/StatCard';
import { AdminRefundRecord } from '@/lib/admin/types';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';

export default function AdminRefundsPage() {
  const { refunds, processRefund } = useAdmin();

  const totalRefundsValue = refunds.reduce((sum, r) => sum + r.amount, 0);

  const columns: Column<AdminRefundRecord>[] = [
    {
      key: 'refundId',
      header: 'Refund Reference',
      sortable: true,
      accessor: (row) => row.refundId,
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-zinc-950 block">{row.refundId}</span>
          <span className="text-[10px] text-zinc-400">Order: {row.orderNumber}</span>
        </div>
      )
    },
    {
      key: 'customer',
      header: 'Customer',
      accessor: (row) => row.customerName,
      render: (row) => <span className="font-semibold text-zinc-900">{row.customerName}</span>
    },
    {
      key: 'amount',
      header: 'Refund Value',
      sortable: true,
      accessor: (row) => row.amount,
      render: (row) => <span className="font-black text-zinc-950">{formatPrice(row.amount)}</span>
    },
    {
      key: 'reason',
      header: 'Reason',
      render: (row) => <span className="text-zinc-600">{row.reason}</span>
    },
    {
      key: 'method',
      header: 'Destination Gateway',
      render: (row) => (
        <div>
          <span className="text-[11px] font-bold text-zinc-800">{row.paymentMethod}</span>
          {row.arnNumber && (
            <span className="block font-mono text-[10px] text-zinc-400">ARN: {row.arnNumber}</span>
          )}
        </div>
      )
    },
    {
      key: 'date',
      header: 'Processed Date',
      sortable: true,
      accessor: (row) => row.date,
      render: (row) => <span className="text-zinc-500">{row.date}</span>
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      accessor: (row) => row.status,
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      key: 'actions',
      header: 'Action',
      sortable: false,
      render: (row) => (
        <div>
          {row.status !== 'Completed' ? (
            <button
              onClick={() => processRefund(row.id)}
              className="px-3 py-1 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Release Refund
            </button>
          ) : (
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Settled
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <AdminLayout
      title="Refunds & Reversals"
      subtitle="Process customer refunds, gateway reversals, and ARN tracking references."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Refund Claims" value={refunds.length} icon={Receipt} />
        <StatCard title="Total Refund Value" value={formatPrice(totalRefundsValue)} icon={CreditCard} iconColor="text-rose-700" iconBg="bg-rose-50" />
        <StatCard title="Auto-Resolved via UPI" value="98.4%" icon={CheckCircle2} iconColor="text-emerald-700" iconBg="bg-emerald-50" />
      </div>

      <DataTable
        data={refunds}
        columns={columns}
        keyExtractor={(row) => row.id}
        title="Customer Refunds Ledger"
        searchPlaceholder="Search refund ID, order, customer..."
        exportFilename="aether_refunds_export"
      />
    </AdminLayout>
  );
}
