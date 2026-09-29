'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Percent, TrendingUp, Save, DollarSign, Store, Sparkles, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { StatCard } from '@/components/admin/ui/StatCard';
import { useAdmin } from '@/lib/admin/adminStore';
import { formatPrice } from '@/lib/utils';

export default function AdminCommissionPage() {
  const { commissionRates, updateCommissionRate, categories } = useAdmin();

  const [rates, setRates] = useState<Record<string, number>>(commissionRates);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleRateChange = (key: string, val: number) => {
    setRates((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = (key: string) => {
    updateCommissionRate(key, rates[key]);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <AdminLayout
      title="Commission & Fee Structure"
      subtitle="Configure global marketplace take-rates and category-specific revenue commissions."
    >
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Commission rates updated successfully!</span>
        </div>
      )}

      {/* Global Default Take-Rate Card */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-400 text-zinc-950 px-2 py-0.5 rounded-md">
            Marketplace Take Rate
          </span>
          <h2 className="text-2xl font-bold font-serif text-white mt-2">Global Baseline Commission</h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-md">
            Default platform cut applied automatically to all new merchant vendors and untiered categories.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800 shrink-0">
          <div>
            <span className="text-[10px] text-zinc-400 font-bold block uppercase">Current Baseline</span>
            <div className="flex items-center gap-1.5 mt-1">
              <input
                type="number"
                value={rates['Global'] ?? 10}
                onChange={(e) => handleRateChange('Global', Number(e.target.value))}
                className="w-16 px-2 py-1 bg-zinc-950 border border-zinc-700 rounded-lg text-lg font-black text-amber-400 font-mono text-center outline-none"
              />
              <span className="text-lg font-bold text-zinc-400">%</span>
            </div>
          </div>
          <button
            onClick={() => handleSave('Global')}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" /> Save
          </button>
        </div>
      </div>

      {/* Category-Wise Commission Grid */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-xs space-y-4">
        <div className="pb-3 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-serif text-zinc-950">Department Commission Matrix</h3>
            <p className="text-xs text-zinc-400">Custom commission percentages per merchandise category</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const currentRate = rates[cat.name] ?? cat.commissionRate ?? 10;
            return (
              <div
                key={cat.id}
                className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/60 flex items-center justify-between gap-3 hover:border-zinc-300 transition-colors"
              >
                <div>
                  <h4 className="font-bold text-xs text-zinc-900">{cat.name}</h4>
                  <p className="text-[11px] text-zinc-400">{cat.productsCount} live listings</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-zinc-200 shadow-2xs">
                    <input
                      type="number"
                      value={currentRate}
                      onChange={(e) => handleRateChange(cat.name, Number(e.target.value))}
                      className="w-12 text-xs font-black text-zinc-950 text-center outline-none"
                    />
                    <span className="text-xs font-bold text-zinc-400">%</span>
                  </div>

                  <button
                    onClick={() => handleSave(cat.name)}
                    className="p-1.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg transition-colors cursor-pointer"
                    title="Save Commission"
                  >
                    <Save className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
