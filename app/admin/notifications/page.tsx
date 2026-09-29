'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle2, ShieldAlert, Store, Package, ShoppingBag, CreditCard, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { useAdmin } from '@/lib/admin/adminStore';

export default function AdminNotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsRead } = useAdmin();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifs = filter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications;

  return (
    <AdminLayout
      title="Notification Center"
      subtitle="Operational marketplace alerts, merchant onboarding signals, and security notifications."
      actions={
        <button
          onClick={markAllNotificationsRead}
          className="px-3.5 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer"
        >
          Mark All as Read
        </button>
      }
    >
      <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === 'all' ? 'bg-zinc-950 text-white' : 'text-zinc-500 hover:text-black'
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === 'unread' ? 'bg-zinc-950 text-white' : 'text-zinc-500 hover:text-black'
            }`}
          >
            Unread Only ({notifications.filter((n) => !n.isRead).length})
          </button>
        </div>

        <div className="divide-y divide-zinc-100">
          {filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-4 flex items-start justify-between gap-4 transition-colors cursor-pointer hover:bg-zinc-50 rounded-xl ${
                !notif.isRead ? 'bg-amber-50/40 font-bold' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0 mt-0.5">
                  <Bell className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950">{notif.title}</h4>
                  <p className="text-xs text-zinc-500 font-normal mt-0.5 leading-relaxed">{notif.description}</p>
                  <span className="text-[10px] text-zinc-400 mt-1 block">{notif.timestamp}</span>
                </div>
              </div>

              {!notif.isRead && (
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
