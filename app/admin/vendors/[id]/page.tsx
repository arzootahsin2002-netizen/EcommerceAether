'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Store,
  ShieldCheck,
  Package,
  ShoppingBag,
  CreditCard,
  FileText,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Smartphone,
  MapPin,
  Building2,
  Percent,
  Plus
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { StatCard } from '@/components/admin/ui/StatCard';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';
import { RejectReasonModal, ConfirmModal } from '@/components/admin/ui/Modals';

export default function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const vendorId = resolvedParams.id;

  const { vendors, products, orders, payouts, approveVendor, rejectVendor, suspendVendor } = useAdmin();

  const vendor = vendors.find((v) => v.id === vendorId || v.vendorId === vendorId) || vendors[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'payouts' | 'documents' | 'activity'>('overview');
  const [rejecting, setRejecting] = useState(false);
  const [suspending, setSuspending] = useState(false);

  if (!vendor) {
    return (
      <AdminLayout title="Vendor Not Found">
        <div className="bg-white rounded-2xl p-12 text-center text-zinc-500 space-y-4">
          <Store className="w-12 h-12 text-zinc-300 mx-auto" />
          <h2 className="text-lg font-bold text-zinc-900">Vendor Not Found</h2>
          <Link href="/admin/vendors" className="px-4 py-2 bg-zinc-950 text-white rounded-xl text-xs font-bold inline-block">
            ← Return to Vendors Directory
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const vendorProducts = products.filter((p) => p.vendorId === vendor.id || p.vendorName === vendor.businessName);
  const vendorOrders = orders.filter((o) => o.vendorId === vendor.id || o.vendorName === vendor.businessName);
  const vendorPayouts = payouts.filter((p) => p.vendorId === vendor.id || p.vendorName === vendor.businessName);

  return (
    <AdminLayout
      title={vendor.businessName}
      subtitle={`Vendor ID: ${vendor.vendorId} • Registered: ${vendor.submittedAt}`}
      actions={
        <div className="flex items-center gap-2">
          {vendor.verificationStatus !== 'Approved' && (
            <button
              onClick={() => approveVendor(vendor.id)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve KYC</span>
            </button>
          )}

          <button
            onClick={() => setSuspending(true)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              vendor.status === 'Suspended'
                ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
            }`}
          >
            {vendor.status === 'Suspended' ? 'Reactivate Account' : 'Suspend Account'}
          </button>
        </div>
      }
    >
      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200 shadow-xs">
              <Image src={vendor.logo} alt="" fill unoptimized className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold font-serif text-zinc-950">{vendor.businessName}</h1>
                <StatusBadge status={vendor.verificationStatus} />
                <StatusBadge status={vendor.status} />
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                Authorized Signatory: <strong className="text-zinc-800">{vendor.vendorName}</strong> • {vendor.email} • {vendor.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto text-center">
            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Commission</span>
              <span className="text-base font-black text-amber-600">{vendor.commissionRate}%</span>
            </div>
            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Seller SLA</span>
              <span className="text-base font-black text-emerald-600">★ {vendor.rating}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation Header */}
        <div className="flex items-center gap-2 border-b border-zinc-200 overflow-x-auto text-xs font-bold">
          {[
            { id: 'overview', label: 'Overview', icon: Store },
            { id: 'products', label: `Catalog (${vendorProducts.length})`, icon: Package },
            { id: 'orders', label: `Orders (${vendorOrders.length})`, icon: ShoppingBag },
            { id: 'payouts', label: 'Payouts & Ledger', icon: CreditCard },
            { id: 'documents', label: 'KYC Documents', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-3 px-3 transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-zinc-950 text-zinc-950 font-black'
                    : 'border-transparent text-zinc-400 hover:text-zinc-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-500' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard title="Total GMV Sales" value={formatPrice(vendor.totalRevenue)} icon={Store} />
              <StatCard title="Available Settlement" value={formatPrice(vendor.availablePayout)} icon={CreditCard} iconColor="text-emerald-700" iconBg="bg-emerald-50" />
              <StatCard title="Active Listings" value={vendorProducts.length} icon={Package} iconColor="text-blue-700" iconBg="bg-blue-50" />
              <StatCard title="Fulfillments" value={vendorOrders.length} icon={ShoppingBag} iconColor="text-purple-700" iconBg="bg-purple-50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 space-y-2">
                <h4 className="font-bold text-zinc-950 flex items-center gap-1.5 border-b border-zinc-200 pb-2">
                  <Building2 className="w-4 h-4 text-amber-600" /> Business Registration Info
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-zinc-400 text-[11px] block">GSTIN:</span>
                    <span className="font-mono font-bold text-zinc-900">{vendor.gstin}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[11px] block">PAN:</span>
                    <span className="font-mono font-bold text-zinc-900">{vendor.pan}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[11px] block">Registered Address:</span>
                    <span className="text-zinc-700">{vendor.address.street}, {vendor.address.city}, {vendor.address.state} - {vendor.address.pincode}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 space-y-2">
                <h4 className="font-bold text-zinc-950 flex items-center gap-1.5 border-b border-zinc-200 pb-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" /> Bank Settlement Info
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-zinc-400 text-[11px] block">Bank:</span>
                    <span className="font-bold text-zinc-900">{vendor.bankDetails.bankName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[11px] block">IFSC:</span>
                    <span className="font-mono font-bold text-zinc-900">{vendor.bankDetails.ifscCode}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-zinc-400 text-[11px] block">Account Number:</span>
                    <span className="font-mono font-bold text-zinc-900">{vendor.bankDetails.accountNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-bold uppercase text-zinc-400">
                    <th className="px-4 py-3">Product Name</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock Units</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {vendorProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 font-bold text-zinc-900">{p.name}</td>
                      <td className="px-4 py-3 text-zinc-500">{p.category}</td>
                      <td className="px-4 py-3 font-bold text-zinc-950">{formatPrice(p.price)}</td>
                      <td className="px-4 py-3 font-mono">{p.stock}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={p.approvalStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-bold uppercase text-zinc-400">
                    <th className="px-4 py-3">Order Number</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {vendorOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 font-mono font-bold text-zinc-950">{o.orderNumber}</td>
                      <td className="px-4 py-3 text-zinc-800">{o.customerName}</td>
                      <td className="px-4 py-3 font-black text-zinc-950">{formatPrice(o.totalAmount)}</td>
                      <td className="px-4 py-3 text-zinc-500">{o.date}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={o.orderStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PAYOUTS */}
        {activeTab === 'payouts' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-bold uppercase text-zinc-400">
                    <th className="px-4 py-3">Payout ID</th>
                    <th className="px-4 py-3">Gross Sales</th>
                    <th className="px-4 py-3">Commission Cut</th>
                    <th className="px-4 py-3">Net Payable</th>
                    <th className="px-4 py-3">UTR Reference</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {vendorPayouts.map((py) => (
                    <tr key={py.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 font-mono font-bold text-zinc-950">{py.payoutId}</td>
                      <td className="px-4 py-3 text-zinc-800">{formatPrice(py.grossSales)}</td>
                      <td className="px-4 py-3 text-emerald-700 font-bold">{formatPrice(py.commission)}</td>
                      <td className="px-4 py-3 font-black text-zinc-950">{formatPrice(py.payableAmount)}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-zinc-500">{py.utrNumber || 'Pending'}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={py.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vendor.documents.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-zinc-900">{doc.type}</h4>
                  <p className="text-[11px] font-mono text-zinc-500">{doc.documentNumber}</p>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </div>
        )}

      </div>

      {suspending && (
        <ConfirmModal
          isOpen={suspending}
          onClose={() => setSuspending(false)}
          onConfirm={() => {
            suspendVendor(vendor.id);
            setSuspending(false);
          }}
          title={vendor.status === 'Suspended' ? 'Reactivate Vendor' : 'Suspend Vendor'}
          message={`Are you sure you want to ${
            vendor.status === 'Suspended' ? 'reactivate' : 'suspend'
          } ${vendor.businessName}?`}
          confirmLabel={vendor.status === 'Suspended' ? 'Reactivate' : 'Suspend'}
          isDanger={vendor.status !== 'Suspended'}
        />
      )}
    </AdminLayout>
  );
}
