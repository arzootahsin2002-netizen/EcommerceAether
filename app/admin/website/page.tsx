'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Globe, Plus, Sparkles, CheckCircle2, Eye, LayoutTemplate, Layers } from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';

export default function AdminWebsitePage() {
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [heroHeading, setHeroHeading] = useState('Architectural Minimalist Luxury');
  const [heroSubtitle, setHeroSubtitle] = useState('Experience bespoke 500 GSM French Terry hoodies, Australian Merino wool knits, and European linen shirts.');
  const [announcementText, setAnnouncementText] = useState('Festive Sale: Flat 20% OFF on Luxury Tailored Outerwear • Use Code: LUXE20');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <AdminLayout
      title="Storefront & Merchandising Curation"
      subtitle="Manage buyer homepage hero campaigns, promotional banners, and featured collection curations."
      actions={
        <a
          href="/"
          target="_blank"
          className="px-3.5 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50 flex items-center gap-1.5 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview Buyer Storefront</span>
        </a>
      }
    >
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Storefront merchandising updates saved and deployed live!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Top Announcement Bar Configuration */}
        <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <h3 className="text-base font-bold font-serif text-zinc-950">Top Announcement Banner</h3>
              <p className="text-xs text-zinc-400">Fixed promotional message displayed across all storefront pages</p>
            </div>
            <StatusBadge status="Active" size="sm" />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Banner Text / Promo Message</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* Hero Section Curation */}
        <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-zinc-100">
            <h3 className="text-base font-bold font-serif text-zinc-950">Hero Showcase Banner</h3>
            <p className="text-xs text-zinc-400">Primary visual headline and CTA banner on buyer homepage</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-zinc-700 block mb-1">Hero Primary Title</label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-bold focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-700 block mb-1">Hero Subtitle</label>
              <textarea
                rows={2}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            Save Merchandising Changes
          </button>
        </div>

      </form>
    </AdminLayout>
  );
}
