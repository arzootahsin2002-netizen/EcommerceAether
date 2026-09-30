'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import { CATEGORY_BAR_DATA } from '@/components/layout/CategoryBar';

export function CategoryTiles() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const displayedCategories = selectedCategory === 'all'
    ? CATEGORY_BAR_DATA
    : CATEGORY_BAR_DATA.filter((c) => c.id === selectedCategory);

  return (
    <section className="py-20 bg-zinc-50 border-y border-zinc-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-700 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> EXPLORE OUR PRODUCT UNIVERSE
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-zinc-950">
              Curated Category Collections
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
              Discover top-rated selections from fashion to flagships, home sanctuaries, and artisanal hardcovers.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-extrabold text-zinc-900 hover:text-amber-700 flex items-center gap-1.5 self-start md:self-auto group"
          >
            <span>Explore All Products</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-zinc-950 text-white shadow-sm'
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 hover:text-black'
            }`}
          >
            All Categories ({CATEGORY_BAR_DATA.length})
          </button>
          {CATEGORY_BAR_DATA.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 hover:text-black'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Direct Clickable Category Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedCategories.map((cat) => {
            const Icon = cat.icon;

            return (
              <Link
                key={cat.id}
                href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className="group relative rounded-3xl overflow-hidden bg-white border border-zinc-200/90 shadow-2xs hover:shadow-xl hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between p-5 space-y-4"
              >
                {/* Visual Image Header */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                  
                  {/* Category Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-zinc-900 text-[10px] font-extrabold flex items-center gap-1 shadow-xs">
                      <Icon className="w-3 h-3 text-amber-600" />
                      {cat.name}
                    </span>
                    {cat.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 text-[9px] font-black uppercase tracking-wider shadow-xs">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-serif font-black drop-shadow-xs group-hover:text-amber-200 transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Card Description & Action */}
                <div className="space-y-3">
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>

                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-900 group-hover:text-amber-700 transition-colors">
                    <span>Explore {cat.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
