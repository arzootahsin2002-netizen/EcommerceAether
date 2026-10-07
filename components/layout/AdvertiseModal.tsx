'use client';

import React, { useState } from 'react';
import { X, Sparkles, TrendingUp, CheckCircle2, Megaphone, Target, BarChart3, ShieldCheck } from 'lucide-react';

interface AdvertiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdvertiseModal({ isOpen, onClose }: AdvertiseModalProps) {
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('₹25,000 - ₹50,000');
  const [category, setCategory] = useState('Fashion');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden">
        
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white p-6 relative">
          <button
            type="button"
            suppressHydrationWarning
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-md">
              Ads & Growth Suite
            </span>
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> High ROI Campaigns
            </span>
          </div>
          <h2 className="text-xl font-bold font-serif text-white">Advertise on Aether</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Reach millions of high-intent luxury shoppers across premium collections and discovery feeds.
          </p>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3 text-center">
              <TrendingUp className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <div className="text-base font-black text-zinc-900">4.2x</div>
              <div className="text-[10px] text-zinc-500 font-medium">Avg. ROAS</div>
            </div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3 text-center">
              <Target className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <div className="text-base font-black text-zinc-900">10M+</div>
              <div className="text-[10px] text-zinc-500 font-medium">Monthly Reach</div>
            </div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3 text-center">
              <BarChart3 className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <div className="text-base font-black text-zinc-900">&lt; ₹2.50</div>
              <div className="text-[10px] text-zinc-500 font-medium">Avg. CPC</div>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-emerald-950 mb-1">Ad Campaign Request Received!</h3>
              <p className="text-xs text-emerald-800">
                Our Brand Partnership Manager will contact <strong>{email}</strong> within 4 business hours to setup your campaign.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                Launch an Ad Campaign
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">Brand / Business Name</label>
                  <input
                    type="text"
                    required
                    suppressHydrationWarning
                    placeholder="e.g. Atelier Studio"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">Business Email</label>
                  <input
                    type="email"
                    required
                    suppressHydrationWarning
                    placeholder="partner@brand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">Target Category</label>
                  <select
                    value={category}
                    suppressHydrationWarning
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-zinc-900 outline-none"
                  >
                    <option value="Fashion">Fashion & Apparel</option>
                    <option value="Electronics">Electronics & Mobiles</option>
                    <option value="Home">Home & Furniture</option>
                    <option value="Beauty">Beauty & Personal Care</option>
                    <option value="Appliances">Appliances</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">Monthly Ad Budget</label>
                  <select
                    value={budget}
                    suppressHydrationWarning
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-zinc-900 outline-none"
                  >
                    <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000 (Starter)</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (Growth)</option>
                    <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000 (Scale)</option>
                    <option value="₹2,00,000+">₹2,00,000+ (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  suppressHydrationWarning
                  className="w-full py-3 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Megaphone className="w-4 h-4 text-amber-400" /> Submit Advertising Inquiry
                </button>
              </div>
            </form>
          )}

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Guaranteed Brand Safety
            </span>
            <span>Dedicated Campaign Manager</span>
          </div>

        </div>
      </div>
    </div>
  );
}
