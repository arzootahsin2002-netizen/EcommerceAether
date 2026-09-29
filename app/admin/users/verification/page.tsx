'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserCheck, CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { useAdmin } from '@/lib/admin/adminStore';

export default function UserVerificationPage() {
  const { customers, verifyCustomer, blockCustomer } = useAdmin();

  const pendingUsers = customers.filter((c) => c.verificationStatus !== 'Verified');

  return (
    <AdminLayout
      title="User Identity Verification"
      subtitle="Audit and authorize customer KYC identities, OTP verification, and high-value patron profiles."
      actions={
        <Link
          href="/admin/users"
          className="px-3.5 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
        >
          ← Back to Users Directory
        </Link>
      }
    >
      <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h3 className="text-base font-bold font-serif text-zinc-950">Verification Queue</h3>
            <p className="text-xs text-zinc-400">Patrons with pending identity or phone confirmation</p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            {pendingUsers.length} Unverified Users
          </span>
        </div>

        {pendingUsers.length > 0 ? (
          <div className="divide-y divide-zinc-100">
            {pendingUsers.map((u) => (
              <div key={u.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                    <Image src={u.avatar} alt="" fill unoptimized className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-950">{u.name}</h4>
                    <p className="text-[11px] text-zinc-500">{u.email} • {u.phone}</p>
                    <span className="text-[10px] text-zinc-400">Registered: {u.registrationDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <StatusBadge status={u.verificationStatus} />
                  <button
                    onClick={() => verifyCustomer(u.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verify Identity
                  </button>
                  <button
                    onClick={() => blockCustomer(u.id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    Reject & Block
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-zinc-400 space-y-2">
            <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="font-bold text-zinc-800 text-sm">All users are verified</p>
            <p>There are no pending identity audits at this time.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
