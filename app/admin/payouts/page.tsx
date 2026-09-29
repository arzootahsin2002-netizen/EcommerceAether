'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, Clock, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { StatCard } from '@/components/admin/ui/StatCard';
import { AdminPayoutRecord } from '@/lib/admin/types';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';
import { BaseModal } from '@/components/admin/ui/Modals';

export default function AdminPayoutsPage() {
  const { payouts, processPayout } = useAdmin();

  const [authorizingPayout, setAuthorizingPayout] = useState<AdminPayoutRecord | null>(null);
  const [utrNumber, setUtrNumber] = useState('');

  const totalPendingPayouts = payouts
    .filter((p) => p.status === 'Pending' || p.status === 'Processing')
    .reduce((sum, p) => sum + p.payableAmount, 0);

  const totalCompletedPayouts = payouts
    .filter((p) => p.status === 'Completed')
    .reduce((sum, p) => sum + p.payableAmount, 0);

  const handleAuthorizeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorizingPayout) return;
    processPayout(authorizingPayout.id, utrNumber || `HDFC${Date.now().toString().slice(-8)}`);
    setAuthorizingPayout(null);
    setUtrNumber('');
  };

  const columns: Column<AdminPayoutRecord>[] = [
    {
      key: 'payoutId',
      header: 'Settlement ID',
      sortable: true,
      accessor: (row) => row.payoutId,
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-zinc-950 block">{row.payoutId}</span>
          <span className="text-[10px] text-zinc-400">{row.date}</span>
        </div>
      )
    },
    {
      key: 'vendor',
      header: 'Merchant Partner',
      sortable: true,
      accessor: (row) => row.vendorName,
      render: (row) => (
        <div>
          <span className="font-bold text-zinc-900 block">{row.vendorName}</span>
          <span className="text-[11px] text-zinc-400 font-mono">{row.bankAccount}</span>
        </div>
      )
    },
    {
      key: 'gross',
      header: 'Gross Sales',
      sortable: true,
      accessor: (row) => row.grossSales,
      render: (row) => <span className="font-medium text-zinc-800">{formatPrice(row.grossSales)}</span>
    },
    {
      key: 'commission',
      header: 'Commission Deducted',
      sortable: true,
      accessor: (row) => row.commission,
      render: (row) => <span className="text-emerald-700 font-bold">{formatPrice(row.commission)}</span>
    },
    {
      key: 'payable',
      header: 'Net Settlement Payable',
      sortable: true,
      accessor: (row) => row.payableAmount,
      render: (row) => <span className="font-black text-zinc-950 text-sm">{formatPrice(row.payableAmount)}</span>
    },
    {
      key: 'utr',
      header: 'Bank UTR Reference',
      render: (row) => (
        <span className="font-mono text-[11px] font-bold text-zinc-700">
          {row.utrNumber || <span className="text-zinc-400 font-normal">Pending Transfer</span>}
        </span>
      )
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
              onClick={() => {
                setAuthorizingPayout(row);
                setUtrNumber(`HDFC${Math.floor(10000000 + Math.random() * 90000000)}`);
              }}
              className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              Approve Payout
            </button>
          ) : (
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Dispatched
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <AdminLayout
      title="Vendor Payouts & Settlement Hub"
      subtitle="Authorize batch settlements, bank wire IMPS/NEFT transfers, and UTR tracking references."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Pending Settlement Queue" value={formatPrice(totalPendingPayouts)} attention={totalPendingPayouts > 0} icon={Clock} iconColor="text-amber-700" iconBg="bg-amber-50" />
        <StatCard title="Total Settled (Completed)" value={formatPrice(totalCompletedPayouts)} icon={CheckCircle2} iconColor="text-emerald-700" iconBg="bg-emerald-50" />
        <StatCard title="Standard Settlement Cycle" value="T + 2 Days" icon={ShieldCheck} iconColor="text-blue-700" iconBg="bg-blue-50" />
      </div>

      <DataTable
        data={payouts}
        columns={columns}
        keyExtractor={(row) => row.id}
        title="Vendor Settlement Ledger"
        searchPlaceholder="Search payout ID, vendor, bank UTR..."
        exportFilename="aether_payouts_export"
      />

      {/* Authorize Payout Modal */}
      {authorizingPayout && (
        <BaseModal
          isOpen={!!authorizingPayout}
          onClose={() => setAuthorizingPayout(null)}
          title={`Authorize Settlement: ${authorizingPayout.payoutId}`}
        >
          <form onSubmit={handleAuthorizeSubmit} className="space-y-4 text-xs">
            <div className="p-4 bg-zinc-950 text-white rounded-2xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">Bank Transfer Summary</span>
              <div className="flex items-center justify-between text-sm">
                <span>Vendor:</span>
                <strong>{authorizingPayout.vendorName}</strong>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Net Transfer Amount:</span>
                <strong className="text-emerald-400 text-base">{formatPrice(authorizingPayout.payableAmount)}</strong>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-800">
                <span>Destination Bank Account:</span>
                <span className="font-mono text-zinc-200">{authorizingPayout.bankAccount}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">Bank IMPS / NEFT UTR Reference Number *</label>
              <input
                type="text"
                required
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-mono text-xs font-bold focus:bg-white outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setAuthorizingPayout(null)}
                className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black rounded-xl hover:bg-zinc-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Confirm Bank Wire Transfer
              </button>
            </div>
          </form>
        </BaseModal>
      )}
    </AdminLayout>
  );
}
