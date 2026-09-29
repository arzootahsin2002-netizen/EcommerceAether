'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Boxes,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Package,
  Store,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';
import { RejectReasonModal } from '@/components/admin/ui/Modals';

export default function ProductApprovalPage() {
  const { products, approveProduct, rejectProduct, requestProductChanges } = useAdmin();

  const [rejectingProdId, setRejectingProdId] = useState<string | null>(null);

  const pendingList = products.filter((p) => p.approvalStatus === 'Pending Approval' || p.approvalStatus === 'Changes Requested');

  return (
    <AdminLayout
      title="Product Approval Hub"
      subtitle="Review new merchant listings, verify product quality and specs before publishing live to buyers."
      actions={
        <Link
          href="/admin/products"
          className="px-3.5 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
        >
          ← Back to Catalog
        </Link>
      }
    >
      <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h3 className="text-base font-bold font-serif text-zinc-950">Submissions Queue</h3>
            <p className="text-xs text-zinc-400">Products requiring catalog quality and compliance check</p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {pendingList.length} Items Awaiting Review
          </span>
        </div>

        {pendingList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingList.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50/50 flex flex-col justify-between space-y-4 hover:border-zinc-300 transition-all shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200 shadow-2xs">
                      <Image src={p.image} alt="" fill unoptimized className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-zinc-400">{p.sku}</span>
                        <StatusBadge status={p.approvalStatus} size="sm" />
                      </div>
                      <h4 className="font-bold text-sm text-zinc-950 truncate mt-0.5">{p.name}</h4>
                      <p className="text-xs text-zinc-500 font-medium">
                        By <strong className="text-zinc-800">{p.vendorName}</strong>
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {p.category} • {p.subcategory}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed bg-white p-3 rounded-xl border border-zinc-100">
                    {p.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs bg-white p-2 rounded-xl border border-zinc-100">
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Selling Price</span>
                      <strong className="text-zinc-950 font-black">{formatPrice(p.price)}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block">MRP</span>
                      <span className="text-zinc-500 line-through">{formatPrice(p.originalPrice)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Stock Units</span>
                      <strong className="text-zinc-900 font-mono">{p.stock}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setRejectingProdId(p.id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => requestProductChanges(p.id, 'Please update high-resolution lifestyle images.')}
                    className="px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Request Changes
                  </button>
                  <button
                    onClick={() => approveProduct(p.id)}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Publish
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-zinc-400 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-zinc-900">All submissions reviewed</h4>
            <p className="text-xs">There are no pending product approvals in the queue right now.</p>
          </div>
        )}
      </div>

      <RejectReasonModal
        isOpen={!!rejectingProdId}
        onClose={() => setRejectingProdId(null)}
        onConfirm={(reason) => {
          if (rejectingProdId) {
            rejectProduct(rejectingProdId, reason);
            setRejectingProdId(null);
          }
        }}
        title="Reject Product Submission"
        itemLabel="this product"
      />
    </AdminLayout>
  );
}
