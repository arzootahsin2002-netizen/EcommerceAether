'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Flame, TrendingUp } from 'lucide-react';
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/shop/ProductCard';

type TabKey = 'trending' | 'bestsellers' | 'newarrivals' | 'outerwear';

export function FeaturedProducts() {
  const { products } = useApp();
  const [activeTab, setActiveTab] = useState<TabKey>('trending');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'trending') return p.isFeatured || p.rating >= 4.8;
    if (activeTab === 'bestsellers') return p.isBestSeller;
    if (activeTab === 'newarrivals') return p.isNewArrival || p.isFeatured;
    if (activeTab === 'outerwear') return p.category === 'Outerwear' || p.subcategory.includes('Jacket');
    return true;
  }).slice(0, 8);

  return (
    <section className="py-20 bg-zinc-50 border-t border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1.5 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> CURATED SELECTION
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-zinc-950">
              The Signature Essentials
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 p-1.5 bg-zinc-200/80 rounded-2xl overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'trending' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Trending Now
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'bestsellers' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Best Sellers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('newarrivals')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'newarrivals' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              New Arrivals
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('outerwear')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'outerwear' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Outerwear
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* Explore More CTA */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-zinc-900 text-zinc-950 hover:bg-zinc-950 hover:text-white font-bold text-xs transition-all cursor-pointer"
          >
            Explore Complete Catalog ({products.length} Items) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
