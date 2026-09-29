'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UserCog, Plus, Shield, CheckCircle2, UserCheck, UserX } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { StatCard } from '@/components/admin/ui/StatCard';
import { AdminUser, AdminRole } from '@/lib/admin/types';
import { useAdmin } from '@/lib/admin/adminStore';
import { BaseModal } from '@/components/admin/ui/Modals';

export default function AdminStaffPage() {
  const { adminStaff, addAdminStaff, updateAdminStaffStatus } = useAdmin();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Vendor Manager' as AdminRole
  });

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    const newStaff: AdminUser = {
      id: `adm-${Date.now()}`,
      name: form.name,
      email: form.email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      role: form.role,
      status: 'Active',
      lastLogin: 'Never',
      createdDate: 'Today',
      permissions: ['*']
    };

    addAdminStaff(newStaff);
    setIsAddOpen(false);
    setForm({ name: '', email: '', role: 'Vendor Manager' });
  };

  const columns: Column<AdminUser>[] = [
    {
      key: 'name',
      header: 'Staff Member',
      sortable: true,
      accessor: (row) => row.name,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
            <Image src={row.avatar || ''} alt="" fill unoptimized className="object-cover" />
          </div>
          <div>
            <p className="font-bold text-zinc-950">{row.name}</p>
            <p className="text-[11px] text-zinc-400">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Assigned Role',
      sortable: true,
      accessor: (row) => row.role,
      render: (row) => (
        <span className="font-bold text-xs bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-md">
          {row.role}
        </span>
      )
    },
    {
      key: 'lastLogin',
      header: 'Last Active Session',
      accessor: (row) => row.lastLogin,
      render: (row) => <span className="text-zinc-500">{row.lastLogin}</span>
    },
    {
      key: 'created',
      header: 'Created On',
      accessor: (row) => row.createdDate,
      render: (row) => <span className="text-zinc-400 text-[11px]">{row.createdDate}</span>
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
      header: 'Status Toggle',
      sortable: false,
      render: (row) => (
        <div>
          {row.role !== 'Super Admin' && (
            <button
              onClick={() => updateAdminStaffStatus(row.id, row.status === 'Active' ? 'Suspended' : 'Active')}
              className="text-xs font-bold text-zinc-600 hover:text-black"
            >
              {row.status === 'Active' ? 'Suspend Access' : 'Reactivate'}
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <AdminLayout
      title="Admin Team & Operators"
      subtitle="Manage internal operations team members, department managers, and operator permissions."
      actions={
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-3.5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Admin User</span>
        </button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Administrators" value={adminStaff.length} icon={UserCog} />
        <StatCard title="Super Admins" value="1" icon={Shield} iconColor="text-amber-700" iconBg="bg-amber-50" />
        <StatCard title="Active Sessions" value={adminStaff.filter((a) => a.status === 'Active').length} icon={CheckCircle2} iconColor="text-emerald-700" iconBg="bg-emerald-50" />
      </div>

      <DataTable
        data={adminStaff}
        columns={columns}
        keyExtractor={(row) => row.id}
        title="Internal Marketplace Operators"
        searchPlaceholder="Search staff member name, email, role..."
        exportFilename="aether_admin_staff_export"
      />

      {/* Add Staff Modal */}
      <BaseModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Administrator Member">
        <form onSubmit={handleCreateStaff} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-zinc-700 block mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Vikram Malhotra"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-700 block mb-1">Official Email *</label>
            <input
              type="email"
              required
              placeholder="operator@aether.market"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-700 block mb-1">Assigned Operational Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as AdminRole })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
            >
              <option value="Admin">Admin</option>
              <option value="Vendor Manager">Vendor Manager</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Order Manager">Order Manager</option>
              <option value="Finance Manager">Finance Manager</option>
              <option value="Support Manager">Support Manager</option>
              <option value="Content Manager">Content Manager</option>
            </select>
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
              Create Account
            </button>
          </div>
        </form>
      </BaseModal>
    </AdminLayout>
  );
}
