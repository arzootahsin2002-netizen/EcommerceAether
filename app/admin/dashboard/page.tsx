'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Store,
  ShieldCheck,
  Package,
  Boxes,
  Clock,
  ArrowRight,
  ExternalLink,
  Plus,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Filter
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { StatCard } from '@/components/admin/ui/StatCard';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { SalesOverviewChart, RevenueOverviewChart, CategoryShareChart } from '@/components/admin/ui/Charts';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';
import { RejectReasonModal, AddVendorModal, AddProductModal } from '@/components/admin/ui/Modals';

export default function AdminDashboardPage() {
  const {
    vendors,
    products,
    orders,
    approveVendor,
    rejectVendor,
    approveProduct,
    rejectProduct,
    activityLogs
  } = useAdmin();

  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | '90d' | 'custom'>('30d');
  
  // Modals
  const [rejectingVendorId, setRejectingVendorId] = useState<string | null>(null);
  const [rejectingProdId, setRejectingProdId] = useState<string | null>(null);
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Recent vendor applications (pending/review)
  const recentApplications = vendors.slice(0, 4);
  const pendingProducts = products.filter((p) => p.approvalStatus === 'Pending Approval' || p.approvalStatus === 'Approved').slice(0, 4);
  const recentOrdersList = orders.slice(0, 4);

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Monitor and manage your DRIBO marketplace operations in real-time."
      actions={
        <div className="flex items-center gap-2">
          {/* Date Selector */}
          <div className="flex items-center p-1 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 shadow-2xs">
            {(['today', '7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer uppercase text-[11px] ${
                  dateRange === r ? 'bg-zinc-950 text-white shadow-xs font-black' : 'hover:text-black'
                }`}
              >
                {r === 'today' ? 'Today' : r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAddVendorOpen(true)}
            className="px-3.5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Add Vendor</span>
          </button>
        </div>
      }
    >
      {/* 8-Card Responsive KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Sales"
          value="₹12,45,680"
          trend={{ value: '+12.8%', isPositive: true, label: 'vs last month' }}
          icon={DollarSign}
          iconColor="text-emerald-700"
          iconBg="bg-emerald-50"
        />

        <StatCard
          title="Total Orders"
          value="2,458"
          trend={{ value: '+8.4%', isPositive: true, label: 'vs last month' }}
          icon={ShoppingBag}
          iconColor="text-blue-700"
          iconBg="bg-blue-50"
        />

        <StatCard
          title="Total Users"
          value="18,245"
          trend={{ value: '+15.6%', isPositive: true, label: 'vs last month' }}
          icon={Users}
          iconColor="text-purple-700"
          iconBg="bg-purple-50"
        />

        <StatCard
          title="Active Vendors"
          value="486"
          trend={{ value: '+5.2%', isPositive: true, label: 'vs last month' }}
          icon={Store}
          iconColor="text-amber-700"
          iconBg="bg-amber-50"
        />

        <StatCard
          title="Pending Vendor Verification"
          value="42"
          attention={true}
          attentionLabel="Requires review"
          icon={ShieldCheck}
          iconColor="text-amber-700"
          iconBg="bg-amber-50"
          onClick={() => (window.location.href = '/admin/vendors/verification')}
        />

        <StatCard
          title="Pending Product Approval"
          value="126"
          attention={true}
          attentionLabel="Requires inspection"
          icon={Boxes}
          iconColor="text-orange-700"
          iconBg="bg-orange-50"
          onClick={() => (window.location.href = '/admin/products/approval')}
        />

        <StatCard
          title="Pending Orders"
          value="128"
          attention={true}
          attentionLabel="Awaiting dispatch"
          icon={Clock}
          iconColor="text-blue-700"
          iconBg="bg-blue-50"
          onClick={() => (window.location.href = '/admin/orders')}
        />

        <StatCard
          title="Platform Revenue"
          value="₹28,45,900"
          trend={{ value: '+10.4%', isPositive: true, label: 'vs last month' }}
          icon={TrendingUp}
          iconColor="text-zinc-950"
          iconBg="bg-amber-100"
        />
      </section>

      {/* Analytics & Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <SalesOverviewChart />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <RevenueOverviewChart />
          <CategoryShareChart />
        </div>
      </section>

      {/* Operational Queues: Vendor Applications & Pending Product Approvals */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Recent Vendor Applications Table */}
        <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <h3 className="text-base font-bold font-serif text-zinc-950">Recent Vendor Applications</h3>
              <p className="text-xs text-zinc-400">KYC onboarding & verification status</p>
            </div>
            <Link
              href="/admin/vendors/verification"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              Verify Queue →
            </Link>
          </div>

          <div className="divide-y divide-zinc-100">
            {recentApplications.map((v) => (
              <div key={v.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                    <Image src={v.logo} alt="" fill unoptimized className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-zinc-900 truncate">{v.businessName}</h4>
                    <p className="text-[11px] text-zinc-500">{v.vendorName} • {v.category}</p>
                    <span className="text-[10px] font-mono text-zinc-400">GSTIN: {v.gstin}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={v.verificationStatus} />
                  {v.verificationStatus !== 'Approved' ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => approveVendor(v.id)}
                        className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                        title="Quick Approve Vendor"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setRejectingVendorId(v.id)}
                        className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg transition-colors"
                        title="Reject Application"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={`/admin/vendors/${v.id}`}
                      className="px-2.5 py-1 text-[11px] font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg"
                    >
                      View
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Product Approvals */}
        <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <h3 className="text-base font-bold font-serif text-zinc-950">Product Approvals Queue</h3>
              <p className="text-xs text-zinc-400">Merchant submissions requiring quality audit</p>
            </div>
            <Link
              href="/admin/products/approval"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              Approval Hub →
            </Link>
          </div>

          <div className="divide-y divide-zinc-100">
            {pendingProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-12 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                    <Image src={p.image} alt="" fill unoptimized className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-zinc-900 truncate">{p.name}</h4>
                    <p className="text-[11px] text-zinc-500">{p.vendorName} • {p.category}</p>
                    <span className="text-xs font-black text-zinc-950">₹{p.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={p.approvalStatus} />
                  {p.approvalStatus === 'Pending Approval' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => approveProduct(p.id)}
                        className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
                        title="Approve Listing"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setRejectingProdId(p.id)}
                        className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg transition-colors"
                        title="Reject Listing"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Orders Matrix & Activity Audit Stream */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Recent Orders Overview */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-zinc-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <h3 className="text-base font-bold font-serif text-zinc-950">Recent Marketplace Orders</h3>
              <p className="text-xs text-zinc-400">Real-time fulfillment and payment tracking</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-zinc-700 hover:text-black flex items-center gap-1"
            >
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-50/50">
                  <th className="px-3 py-2.5">Order ID</th>
                  <th className="px-3 py-2.5">Customer</th>
                  <th className="px-3 py-2.5">Vendor</th>
                  <th className="px-3 py-2.5">Amount</th>
                  <th className="px-3 py-2.5">Payment</th>
                  <th className="px-3 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {recentOrdersList.map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="px-3 py-3 font-mono font-bold text-zinc-950">{o.orderNumber}</td>
                    <td className="px-3 py-3">
                      <p className="font-bold text-zinc-900">{o.customerName}</p>
                      <p className="text-[10px] text-zinc-400">{o.customerEmail}</p>
                    </td>
                    <td className="px-3 py-3 font-medium text-zinc-700">{o.vendorName}</td>
                    <td className="px-3 py-3 font-black text-zinc-950">{formatPrice(o.totalAmount)}</td>
                    <td className="px-3 py-3">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                        {o.paymentMethod}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={o.orderStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Stream */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-zinc-200/90 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <h3 className="text-base font-bold font-serif text-zinc-950">System Audit Log</h3>
              <p className="text-xs text-zinc-400">Live operational events</p>
            </div>
            <Link
              href="/admin/activity"
              className="text-xs font-bold text-zinc-600 hover:text-black"
            >
              View Log →
            </Link>
          </div>

          <div className="space-y-3">
            {activityLogs.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-amber-400" />
                <div className="min-w-0">
                  <p className="font-bold text-zinc-900">{act.action}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{act.record}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    by <strong>{act.adminName}</strong> • {act.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Reject Modals */}
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
        itemLabel="this vendor merchant"
      />

      <RejectReasonModal
        isOpen={!!rejectingProdId}
        onClose={() => setRejectingProdId(null)}
        onConfirm={(reason) => {
          if (rejectingProdId) {
            rejectProduct(rejectingProdId, reason);
            setRejectingProdId(null);
          }
        }}
        title="Reject Product Listing"
        itemLabel="this product"
      />

      {/* Add Vendor & Product Modals */}
      <AddVendorModal
        isOpen={isAddVendorOpen}
        onClose={() => setIsAddVendorOpen(false)}
        onAdd={(v) => {
          // Handled in store
        }}
      />

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAdd={(p) => {
          // Handled in store
        }}
        vendors={vendors}
      />
    </AdminLayout>
  );
}
