'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RotateCcw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { StatCard } from '@/components/admin/ui/StatCard';
import { AdminReturnRecord } from '@/lib/admin/types';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';
import { RejectReasonModal } from '@/components/admin/ui/Modals';

export default function AdminReturnsPage() {
  const { returns, approveReturn, rejectReturn } = useAdmin();
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  const columns: Column<AdminReturnRecord>[] = [
    {
      key: 'returnId',
      header: 'Return ID & Order',
      sortable: true,
      accessor: (row) => row.returnId,
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-zinc-950 block">{row.returnId}</span>
          <span className="text-[10px] text-zinc-400">Order: {row.orderNumber}</span>
        </div>
      )
    },
    {
      key: 'product',
      header: 'Item Returned',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-10 rounded-lg overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
            <Image src={row.productImage} alt="" fill unoptimized className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-zinc-900 truncate max-w-[200px]">{row.productName}</p>
            <p className="text-[11px] text-zinc-500">Merchant: {row.vendorName}</p>
          </div>
        </div>
      )
    },
    {
      key: 'customer',
      header: 'Customer',
      accessor: (row) => row.customerName,
      render: (row) => <span className="font-medium text-zinc-800">{row.customerName}</span>
    },
    {
      key: 'reason',
      header: 'Return Reason',
      render: (row) => <p className="text-zinc-600 max-w-xs line-clamp-2">{row.reason}</p>
    },
    {
      key: 'amount',
      header: 'Refund Value',
      sortable: true,
      accessor: (row) => row.amount,
      render: (row) => <span className="font-black text-zinc-950">{formatPrice(row.amount)}</span>
    },
    {
      key: 'status',
      header: 'Inspection Status',
      sortable: true,
      accessor: (row) => row.status,
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      key: 'actions',
      header: 'Audit Actions',
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-1.5">
          {row.status !== 'Approved' && row.status !== 'Completed' && (
            <button
              onClick={() => approveReturn(row.id)}
              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Approve Return
            </button>
          )}
          {row.status !== 'Rejected' && (
            <button
              onClick={() => setRejectingId(row.id)}
              className="p-1 text-zinc-400 hover:text-rose-600 rounded"
              title="Reject Return"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <AdminLayout
      title="Returns & Reverse Logistics"
      subtitle="Audit customer return claims, quality inspection reports, and reverse pickups."
      actions={
        <Link
          href="/admin/refunds"
          className="px-3.5 py-2 bg-zinc-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-800 transition-colors"
        >
          <span>Go to Refunds Ledger →</span>
        </Link>
      }
    >
      <DataTable
        data={returns}
        columns={columns}
        keyExtractor={(row) => row.id}
        title="Active Return Claims"
        searchPlaceholder="Search return ID, customer, product..."
        exportFilename="dribo_returns_export"
      />

      <RejectReasonModal
        isOpen={!!rejectingId}
        onClose={() => setRejectingId(null)}
        onConfirm={(reason) => {
          if (rejectingId) {
            rejectReturn(rejectingId, reason);
            setRejectingId(null);
          }
        }}
        title="Reject Return Claim"
        itemLabel="this return request"
      />
    </AdminLayout>
  );
}
