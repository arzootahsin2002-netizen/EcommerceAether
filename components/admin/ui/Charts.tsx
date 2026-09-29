'use client';

import React, { useState } from 'react';
import { TrendingUp, DollarSign, ShoppingBag, ArrowUpRight, Zap } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface SalesChartProps {
  timeframe?: string;
}

export function SalesOverviewChart() {
  const [range, setRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dataMap = {
    '7d': [
      { date: '23 Sep', sales: 142000, orders: 42 },
      { date: '24 Sep', sales: 189000, orders: 58 },
      { date: '25 Sep', sales: 215000, orders: 64 },
      { date: '26 Sep', sales: 178000, orders: 51 },
      { date: '27 Sep', sales: 245000, orders: 72 },
      { date: '28 Sep', sales: 290000, orders: 89 },
      { date: 'Today', sales: 310000, orders: 94 }
    ],
    '30d': [
      { date: 'Week 1', sales: 840000, orders: 240 },
      { date: 'Week 2', sales: 1120000, orders: 310 },
      { date: 'Week 3', sales: 1450000, orders: 420 },
      { date: 'Week 4', sales: 1890000, orders: 580 }
    ],
    '90d': [
      { date: 'Jul', sales: 3800000, orders: 1100 },
      { date: 'Aug', sales: 4900000, orders: 1420 },
      { date: 'Sep', sales: 5840000, orders: 1750 }
    ],
    '1y': [
      { date: 'Q1', sales: 11200000, orders: 3200 },
      { date: 'Q2', sales: 14800000, orders: 4100 },
      { date: 'Q3', sales: 18200000, orders: 5200 },
      { date: 'Q4 (Est)', sales: 24500000, orders: 6800 }
    ]
  };

  const currentData = dataMap[range];
  const maxSales = Math.max(...currentData.map((d) => d.sales));

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold font-serif text-zinc-950">Sales Overview</h3>
            <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200/60">
              +12.8% YoY
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Gross merchandise value (GMV) and completed order volumes across marketplace.
          </p>
        </div>

        {/* Range Buttons */}
        <div className="flex items-center p-1 bg-zinc-100 rounded-xl text-xs font-bold text-zinc-600">
          {(['7d', '30d', '90d', '1y'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer uppercase text-[11px] ${
                range === r ? 'bg-white text-zinc-950 shadow-xs font-black' : 'hover:text-black'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="pt-6 pb-2">
        <div className="h-64 flex items-end gap-2 sm:gap-4 relative pt-6 px-2">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-dashed border-zinc-400 w-full" />
            <div className="border-b border-dashed border-zinc-400 w-full" />
            <div className="border-b border-dashed border-zinc-400 w-full" />
            <div className="border-b border-zinc-400 w-full" />
          </div>

          {currentData.map((item, idx) => {
            const heightPercent = Math.round((item.sales / maxSales) * 100);
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
              >
                {/* Tooltip on Hover */}
                {isHovered && (
                  <div className="absolute -top-14 z-20 bg-zinc-950 text-white p-2 rounded-xl text-[10px] shadow-xl whitespace-nowrap animate-scale border border-zinc-700">
                    <div className="font-bold text-amber-400">{item.date}</div>
                    <div>Sales: <strong className="text-white">{formatPrice(item.sales)}</strong></div>
                    <div>Orders: <strong className="text-white">{item.orders}</strong></div>
                  </div>
                )}

                {/* Animated Column Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 relative ${
                    isHovered
                      ? 'bg-gradient-to-t from-zinc-900 to-amber-500 shadow-md'
                      : 'bg-gradient-to-t from-zinc-900 via-zinc-800 to-zinc-700'
                  }`}
                >
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400/80" />
                </div>

                <span className="text-[11px] font-semibold text-zinc-500 mt-2 truncate max-w-full">
                  {item.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Highlights */}
      <div className="mt-4 pt-4 border-t border-zinc-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total GMV</span>
          <span className="text-sm font-black text-zinc-950">₹12,45,680</span>
        </div>
        <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Orders</span>
          <span className="text-sm font-black text-zinc-950">2,458</span>
        </div>
        <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Avg Order Value</span>
          <span className="text-sm font-black text-zinc-950">₹5,067</span>
        </div>
        <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Platform Cut</span>
          <span className="text-sm font-black text-emerald-600">₹1,24,568</span>
        </div>
      </div>
    </div>
  );
}

export function RevenueOverviewChart() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h3 className="text-base font-bold font-serif text-zinc-950">Revenue Breakdown</h3>
            <p className="text-xs text-zinc-400">Net revenue vs payouts & commissions</p>
          </div>
          <span className="text-xs font-black text-zinc-900 bg-zinc-100 px-2.5 py-1 rounded-lg">
            This Month
          </span>
        </div>

        <div className="space-y-4 py-4">
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-zinc-600">Gross Marketplace Sales</span>
              <span className="text-zinc-950">₹12,45,680</span>
            </div>
            <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-950 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-zinc-600">Vendor Net Settlements</span>
              <span className="text-zinc-950">₹11,21,112 (90%)</span>
            </div>
            <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '90%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-zinc-600">Platform Commission (10%)</span>
              <span className="text-emerald-700">₹1,24,568</span>
            </div>
            <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '10%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-zinc-600">Refunds & Reversals</span>
              <span className="text-rose-600">₹15,998 (1.2%)</span>
            </div>
            <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '1.2%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="p-3.5 bg-gradient-to-r from-zinc-950 to-zinc-900 rounded-xl text-white flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Total Platform Revenue</span>
          <span className="text-xl font-black font-serif">₹28,45,900</span>
        </div>
        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
          <TrendingUp className="w-3.5 h-3.5" /> +10.4% MoM
        </span>
      </div>
    </div>
  );
}

export function CategoryShareChart() {
  const categories = [
    { name: 'Fashion & Luxury', share: 38, color: 'bg-zinc-950', hex: '#18181B' },
    { name: 'Electronics & Audio', share: 24, color: 'bg-blue-600', hex: '#2563EB' },
    { name: 'Mobiles & 5G', share: 18, color: 'bg-amber-500', hex: '#F59E0B' },
    { name: 'Beauty & Skincare', share: 12, color: 'bg-rose-500', hex: '#F43F5E' },
    { name: 'Home & Living', share: 8, color: 'bg-emerald-500', hex: '#10B981' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs space-y-4">
      <div className="pb-3 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold font-serif text-zinc-950">Category Distribution</h3>
          <p className="text-xs text-zinc-400">Sales volume by department</p>
        </div>
      </div>

      {/* Multi-segment Progress Bar */}
      <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner">
        {categories.map((cat, i) => (
          <div
            key={i}
            style={{ width: `${cat.share}%` }}
            className={`${cat.color} transition-all hover:opacity-90`}
            title={`${cat.name}: ${cat.share}%`}
          />
        ))}
      </div>

      {/* Category Legend */}
      <div className="space-y-2 pt-1 text-xs">
        {categories.map((cat, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${cat.color}`} />
              <span className="font-semibold text-zinc-700">{cat.name}</span>
            </div>
            <span className="font-mono font-bold text-zinc-950">{cat.share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
