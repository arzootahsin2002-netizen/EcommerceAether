'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Store,
  Calendar,
  Download
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { StatCard } from '@/components/admin/ui/StatCard';
import { SalesOverviewChart, RevenueOverviewChart, CategoryShareChart } from '@/components/admin/ui/Charts';

export default function AdminAnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState('30d');

  return (
    <AdminLayout
      title="Marketplace Analytics & BI"
      subtitle="Deep-dive sales trajectories, merchant performance rankings, and customer cohort metrics."
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting full BI report as Excel/PDF...')}
            className="px-3.5 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download BI Report</span>
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Gross Merchandise Value" value="₹12,45,680" trend={{ value: '+12.8%', isPositive: true }} icon={DollarSign} />
        <StatCard title="Total Completed Orders" value="2,458" trend={{ value: '+8.4%', isPositive: true }} icon={ShoppingBag} iconColor="text-blue-700" iconBg="bg-blue-50" />
        <StatCard title="Customer Conversion Rate" value="3.42%" trend={{ value: '+0.6%', isPositive: true }} icon={TrendingUp} iconColor="text-purple-700" iconBg="bg-purple-50" />
        <StatCard title="Platform Net Take" value="₹1,24,568" trend={{ value: '+10.4%', isPositive: true }} icon={Store} iconColor="text-emerald-700" iconBg="bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <SalesOverviewChart />

          {/* Top Products Table */}
          <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs space-y-3">
            <h3 className="text-base font-bold font-serif text-zinc-950">Top Selling Products</h3>
            <div className="divide-y divide-zinc-100 text-xs">
              {[
                { name: '500 GSM French Terry Oversized Hoodie', merchant: 'Aether Atelier & Co.', volume: '₹4,89,860 (140 units)', rank: '#1' },
                { name: 'Flagship OLED Pro 5G Smartphone', merchant: 'Apex Mobility Tech', volume: '₹3,74,995 (5 units)', rank: '#2' },
                { name: 'Italian Tailored Wool Overcoat', merchant: 'Aether Atelier & Co.', volume: '₹2,39,976 (24 units)', rank: '#3' },
                { name: 'Rose & Squalane Botanical Elixir', merchant: 'Aurora Glow Organics', volume: '₹1,51,920 (80 units)', rank: '#4' }
              ].map((item, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-950 font-black flex items-center justify-center text-[10px]">
                      {item.rank}
                    </span>
                    <div>
                      <p className="font-bold text-zinc-900">{item.name}</p>
                      <p className="text-[11px] text-zinc-400">By {item.merchant}</p>
                    </div>
                  </div>
                  <span className="font-black text-zinc-950">{item.volume}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <RevenueOverviewChart />
          <CategoryShareChart />
        </div>
      </div>
    </AdminLayout>
  );
}
