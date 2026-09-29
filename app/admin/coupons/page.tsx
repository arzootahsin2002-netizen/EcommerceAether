'use client';

import React, { useState } from 'react';
import {
  BadgePercent,
  Plus,
  Ticket,
  CheckCircle2,
  Trash2,
  Power,
  Copy,
  Check
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { StatCard } from '@/components/admin/ui/StatCard';
import { AdminCoupon } from '@/lib/admin/types';
import { useAdmin } from '@/lib/admin/adminStore';
import { BaseModal, ConfirmModal } from '@/components/admin/ui/Modals';

export default function AdminCouponsPage() {
  const { coupons, addCoupon, toggleCouponStatus, deleteCoupon } = useAdmin();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [deletingCoupon, setDeletingCoupon] = useState<AdminCoupon | null>(null);

  const [form, setForm] = useState({
    code: '',
    title: '',
    discountType: 'Percentage' as 'Percentage' | 'Flat Amount',
    value: 20,
    minimumOrder: 2999,
    maximumDiscount: 1500,
    startDate: '01 Oct 2026',
    endDate: '31 Dec 2026',
    usageLimit: 5000
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.title) return;

    const newCpn: AdminCoupon = {
      id: `cpn-${Date.now()}`,
      code: form.code.toUpperCase().trim(),
      title: form.title,
      discountType: form.discountType,
      value: Number(form.value),
      minimumOrder: Number(form.minimumOrder),
      maximumDiscount: Number(form.maximumDiscount),
      startDate: form.startDate,
      endDate: form.endDate,
      usageLimit: Number(form.usageLimit),
      usedCount: 0,
      applicableVendors: ['All'],
      applicableCategories: ['All'],
      status: 'Active'
    };

    addCoupon(newCpn);
    setIsAddOpen(false);
    setForm({
      code: '',
      title: '',
      discountType: 'Percentage',
      value: 20,
      minimumOrder: 2999,
      maximumDiscount: 1500,
      startDate: '01 Oct 2026',
      endDate: '31 Dec 2026',
      usageLimit: 5000
    });
  };

  const columns: Column<AdminCoupon>[] = [
    {
      key: 'code',
      header: 'Promo Code & Details',
      sortable: true,
      accessor: (row) => row.code,
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="font-mono text-xs font-black bg-zinc-100 text-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-200">
            {row.code}
          </div>
          <button
            onClick={() => handleCopy(row.code)}
            className="text-zinc-400 hover:text-black transition-colors"
            title="Copy Code"
          >
            {copiedCode === row.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )
    },
    {
      key: 'title',
      header: 'Campaign Title',
      accessor: (row) => row.title,
      render: (row) => (
        <div>
          <span className="font-bold text-zinc-900 block">{row.title}</span>
          <span className="text-[11px] text-zinc-400">Min spend: ₹{row.minimumOrder}</span>
        </div>
      )
    },
    {
      key: 'discount',
      header: 'Benefit Value',
      sortable: true,
      accessor: (row) => row.value,
      render: (row) => (
        <span className="font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
          {row.discountType === 'Percentage' ? `${row.value}% OFF` : `FLAT ₹${row.value} OFF`}
        </span>
      )
    },
    {
      key: 'usage',
      header: 'Redemptions',
      sortable: true,
      accessor: (row) => row.usedCount,
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-zinc-800">{row.usedCount}</span>
          <span className="text-zinc-400 text-[11px]"> / {row.usageLimit} max</span>
        </div>
      )
    },
    {
      key: 'validity',
      header: 'Validity Period',
      render: (row) => <span className="text-zinc-500 text-[11px]">{row.startDate} – {row.endDate}</span>
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
      header: 'Actions',
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => toggleCouponStatus(row.code)}
            className="p-1.5 text-zinc-500 hover:text-zinc-950 rounded hover:bg-zinc-100 transition-colors"
            title={row.status === 'Active' ? 'Disable Code' : 'Enable Code'}
          >
            <Power className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeletingCoupon(row)}
            className="p-1.5 text-zinc-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
            title="Delete Code"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <AdminLayout
      title="Coupons & Promotional Offers"
      subtitle="Create vouchers, checkout discounts, minimum spend thresholds, and promotional campaigns."
      actions={
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-3.5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Create Coupon</span>
        </button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Active Promo Codes" value={coupons.filter((c) => c.status === 'Active').length} icon={BadgePercent} />
        <StatCard title="Total Redemptions" value="23,550" icon={Ticket} iconColor="text-emerald-700" iconBg="bg-emerald-50" />
        <StatCard title="Promotional GMV Lift" value="+18.4%" icon={CheckCircle2} iconColor="text-blue-700" iconBg="bg-blue-50" />
      </div>

      <DataTable
        data={coupons}
        columns={columns}
        keyExtractor={(row) => row.id}
        title="Promotional Campaigns & Vouchers"
        searchPlaceholder="Search coupon code, campaign name..."
        exportFilename="aether_coupons_export"
      />

      {/* Add Coupon Modal */}
      <BaseModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create New Coupon Campaign">
        <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-zinc-700 block mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. AETHERFEST30"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-mono font-bold focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-zinc-700 block mb-1">Discount Type *</label>
              <select
                value={form.discountType}
                onChange={(e) => setForm({ ...form, discountType: e.target.value as any })}
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
              >
                <option value="Percentage">Percentage Discount (%)</option>
                <option value="Flat Amount">Flat Rupee Amount (₹)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-zinc-700 block mb-1">Campaign Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. VIP Festive Luxury Discount"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-zinc-700 block mb-1">
                {form.discountType === 'Percentage' ? 'Discount % *' : 'Discount ₹ *'}
              </label>
              <input
                type="number"
                required
                value={form.value}
                onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-zinc-700 block mb-1">Min Order Value (₹)</label>
              <input
                type="number"
                value={form.minimumOrder}
                onChange={(e) => setForm({ ...form, minimumOrder: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-zinc-700 block mb-1">Usage Limit</label>
              <input
                type="number"
                value={form.usageLimit}
                onChange={(e) => setForm({ ...form, usageLimit: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 font-bold text-zinc-600 hover:text-black rounded-xl hover:bg-zinc-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl font-bold shadow-xs"
            >
              Publish Coupon
            </button>
          </div>
        </form>
      </BaseModal>

      {deletingCoupon && (
        <ConfirmModal
          isOpen={!!deletingCoupon}
          onClose={() => setDeletingCoupon(null)}
          onConfirm={() => {
            deleteCoupon(deletingCoupon.code);
            setDeletingCoupon(null);
          }}
          title="Delete Coupon Code"
          message={`Are you sure you want to delete promo code "${deletingCoupon.code}"?`}
          confirmLabel="Delete Code"
          isDanger={true}
        />
      )}
    </AdminLayout>
  );
}
