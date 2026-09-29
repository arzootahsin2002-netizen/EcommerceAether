'use client';

import React, { useState } from 'react';
import { Layers, ShieldCheck, Download, Filter } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { AdminActivityLog } from '@/lib/admin/types';
import { useAdmin } from '@/lib/admin/adminStore';

export default function AdminActivityPage() {
  const { activityLogs } = useAdmin();
  const [moduleFilter, setModuleFilter] = useState('All');

  const filteredLogs = activityLogs.filter((l) => {
    return moduleFilter === 'All' || l.module === moduleFilter;
  });

  const columns: Column<AdminActivityLog>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      accessor: (row) => row.timestamp,
      render: (row) => <span className="font-mono text-zinc-500 text-[11px]">{row.timestamp}</span>
    },
    {
      key: 'admin',
      header: 'Admin Operator',
      sortable: true,
      accessor: (row) => row.adminName,
      render: (row) => (
        <div>
          <span className="font-bold text-zinc-950 block">{row.adminName}</span>
          <span className="text-[10px] font-semibold text-amber-700">{row.adminRole}</span>
        </div>
      )
    },
    {
      key: 'action',
      header: 'Action Executed',
      sortable: true,
      accessor: (row) => row.action,
      render: (row) => <span className="font-bold text-zinc-800">{row.action}</span>
    },
    {
      key: 'module',
      header: 'Module',
      sortable: true,
      accessor: (row) => row.module,
      render: (row) => (
        <span className="text-[10px] font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
          {row.module}
        </span>
      )
    },
    {
      key: 'record',
      header: 'Entity / Target Record',
      render: (row) => <span className="text-zinc-600 font-mono text-[11px]">{row.record}</span>
    },
    {
      key: 'ip',
      header: 'IP Address & Device',
      render: (row) => (
        <div>
          <span className="font-mono text-[11px] text-zinc-800 block">{row.ipAddress}</span>
          <span className="text-[10px] text-zinc-400">{row.device}</span>
        </div>
      )
    }
  ];

  return (
    <AdminLayout
      title="System Audit & Activity Logs"
      subtitle="Immutable security audit trail of administrative modifications, approvals, and payout transfers."
    >
      <DataTable
        data={filteredLogs}
        columns={columns}
        keyExtractor={(row) => row.id}
        title="Admin Operational Event Trail"
        searchPlaceholder="Search action, operator name, record..."
        exportFilename="dribo_activity_log"
        filterComponent={
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 outline-none"
          >
            <option value="All">All Modules</option>
            <option value="Vendors">Vendors</option>
            <option value="Catalog">Catalog</option>
            <option value="Payouts">Payouts</option>
            <option value="Commission">Commission</option>
            <option value="Users">Users</option>
            <option value="Authentication">Authentication</option>
          </select>
        }
      />
    </AdminLayout>
  );
}
