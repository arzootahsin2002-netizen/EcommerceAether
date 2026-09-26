'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function LookbookSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Lookbook Image */}
          <div className="lg:col-span-7 relative h-[500px] sm:h-[600px] rounded-3xl overflow-hidden bg-zinc-900 group shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
              alt="Editorial Lookbook Outfit"
              fill
              unoptimized
              className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-black/20" />

            {/* Hotspot Pin 1 */}
            <div className="absolute top-[35%] left-[45%] z-20 group/pin">
              <div className="w-8 h-8 rounded-full bg-white/90 shadow-xl flex items-center justify-center cursor-pointer animate-pulse-subtle border-2 border-zinc-950">
                <Tag className="w-3.5 h-3.5 text-zinc-950" />
              </div>
              <div className="absolute left-10 top-0 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-zinc-200 min-w-[180px] pointer-events-none group-hover/pin:pointer-events-auto opacity-0 group-hover/pin:opacity-100 transition-all duration-200">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Featured Top</p>
                <p className="text-xs font-bold text-zinc-900">French Terry Hoodie</p>
                <p className="text-xs font-black text-amber-800">{formatPrice(3299)}</p>
              </div>
            </div>

            {/* Hotspot Pin 2 */}
            <div className="absolute top-[68%] left-[52%] z-20 group/pin">
              <div className="w-8 h-8 rounded-full bg-white/90 shadow-xl flex items-center justify-center cursor-pointer animate-pulse-subtle border-2 border-zinc-950">
                <Tag className="w-3.5 h-3.5 text-zinc-950" />
              </div>
              <div className="absolute left-10 top-0 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-zinc-200 min-w-[180px] pointer-events-none group-hover/pin:pointer-events-auto opacity-0 group-hover/pin:opacity-100 transition-all duration-200">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Featured Bottom</p>
                <p className="text-xs font-bold text-zinc-900">Pleated Wide Trousers</p>
                <p className="text-xs font-black text-amber-800">{formatPrice(3799)}</p>
              </div>
            </div>

            {/* Floating Tag */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between p-4 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/10 text-white">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                  EDITORIAL CAPSULE
                </span>
                <p className="text-sm font-bold">Monochrome Autumn Outfit #04</p>
              </div>
              <Link
                href="/shop"
                className="px-4 py-2 bg-white text-zinc-950 text-xs font-bold rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Shop Full Look
              </Link>
            </div>
          </div>

          {/* Lookbook Description & Pieces */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> STYLING DOSSIER
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-zinc-950 leading-tight">
                Effortless Proportion. Pure Comfort.
              </h2>
              <p className="text-sm text-zinc-600 mt-3 leading-relaxed">
                Pairing our custom 500 GSM loopback cotton hoodie with double-pleated tropical wool trousers creates a harmonious interplay of relaxed volume and tailored poise.
              </p>
            </div>

            {/* Bundled pieces list */}
            <div className="space-y-3 pt-2">
              <Link
                href="/product/prod-001"
                className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 transition-all group"
              >
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 group-hover:text-amber-800 transition-colors">
                    Heavyweight French Terry Hoodie
                  </h4>
                  <p className="text-xs text-zinc-500">Warm Taupe • Size S to XXL</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-zinc-950">{formatPrice(3299)}</span>
                  <span className="block text-[11px] text-emerald-600 font-semibold">In Stock</span>
                </div>
              </Link>

              <Link
                href="/product/prod-003"
                className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 transition-all group"
              >
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 group-hover:text-amber-800 transition-colors">
                    Pleated Wide-Leg Trousers
                  </h4>
                  <p className="text-xs text-zinc-500">Charcoal Twill • Tropical Wool Blend</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-zinc-950">{formatPrice(3799)}</span>
                  <span className="block text-[11px] text-emerald-600 font-semibold">In Stock</span>
                </div>
              </Link>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold text-zinc-900 hover:text-black uppercase tracking-wider group"
              >
                Explore Full Lookbook Editorial <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
