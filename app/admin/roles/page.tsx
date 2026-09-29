'use client';

import React from 'react';
import { ShieldAlert, Check, X, Shield, Lock } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';

export default function AdminRolesPage() {
  const roles = [
    {
      role: 'Super Admin',
      description: 'Unrestricted master access to all marketplace settings, finance, payouts, and team accounts.',
      usersCount: 1,
      permissions: {
        dashboard: true,
        vendorsView: true,
        vendorsApprove: true,
        productsView: true,
        productsApprove: true,
        ordersManage: true,
        payoutsAuthorize: true,
        commissionEdit: true,
        settingsEdit: true
      }
    },
    {
      role: 'Vendor Manager',
      description: 'Onboards, verifies GSTIN records, and manages merchant communication.',
      usersCount: 1,
      permissions: {
        dashboard: true,
        vendorsView: true,
        vendorsApprove: true,
        productsView: true,
        productsApprove: false,
        ordersManage: true,
        payoutsAuthorize: false,
        commissionEdit: false,
        settingsEdit: false
      }
    },
    {
      role: 'Finance Manager',
      description: 'Authorizes merchant bank payouts, reviews refund claims, and audits gateway transactions.',
      usersCount: 1,
      permissions: {
        dashboard: true,
        vendorsView: true,
        vendorsApprove: false,
        productsView: false,
        productsApprove: false,
        ordersManage: true,
        payoutsAuthorize: true,
        commissionEdit: true,
        settingsEdit: false
      }
    },
    {
      role: 'Product & Catalog Manager',
      description: 'Audits seller submissions, enforces image quality compliance, and manages taxonomy.',
      usersCount: 1,
      permissions: {
        dashboard: true,
        vendorsView: true,
        vendorsApprove: false,
        productsView: true,
        productsApprove: true,
        ordersManage: false,
        payoutsAuthorize: false,
        commissionEdit: false,
        settingsEdit: false
      }
    }
  ];

  return (
    <AdminLayout
      title="Role-Based Access Control (RBAC)"
      subtitle="Granular permission sets and operational security capabilities across administrative roles."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-zinc-950">{r.role}</span>
                  <span className="text-[10px] font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                    {r.usersCount} Staff
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{r.description}</p>
              </div>

              <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-400 font-medium">
                {Object.values(r.permissions).filter(Boolean).length} Active Capabilities
              </div>
            </div>
          ))}
        </div>

        {/* Matrix Table */}
        <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs p-5 space-y-4">
          <h3 className="text-base font-bold font-serif text-zinc-950">Permission Capabilities Matrix</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase text-[10px]">
                  <th className="px-4 py-3">Permission Module / Action</th>
                  <th className="px-4 py-3 text-center">Super Admin</th>
                  <th className="px-4 py-3 text-center">Vendor Manager</th>
                  <th className="px-4 py-3 text-center">Finance Manager</th>
                  <th className="px-4 py-3 text-center">Product Manager</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  { label: 'View Marketplace Dashboard & Sales Analytics', pKey: 'dashboard' },
                  { label: 'Audit & Approve Vendor KYC Applications', pKey: 'vendorsApprove' },
                  { label: 'Inspect & Approve New Product Listings', pKey: 'productsApprove' },
                  { label: 'Update Fulfillment & Order Dispatch Status', pKey: 'ordersManage' },
                  { label: 'Authorize Bank Wire Settlements & Payouts', pKey: 'payoutsAuthorize' },
                  { label: 'Modify Department Commission Percentages', pKey: 'commissionEdit' },
                  { label: 'Configure Marketplace Settings & Gateway Keys', pKey: 'settingsEdit' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50">
                    <td className="px-4 py-3 font-semibold text-zinc-800">{row.label}</td>
                    {roles.map((r, rIdx) => {
                      const hasPerm = (r.permissions as any)[row.pKey];
                      return (
                        <td key={rIdx} className="px-4 py-3 text-center">
                          {hasPerm ? (
                            <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-zinc-300 mx-auto" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
