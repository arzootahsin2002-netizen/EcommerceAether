'use client';

import React from 'react';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { FilterState } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface SortBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onOpenMobileFilters: () => void;
}

export function SortBar({
  filters,
  onFilterChange,
  totalResults,
  viewMode,
  onViewModeChange,
  onOpenMobileFilters
}: SortBarProps) {
  
  const removeCategory = (cat: string) => {
    onFilterChange({
      ...filters,
      categories: filters.categories.filter((c) => c !== cat)
    });
  };

  const removeSubcategory = (sub: string) => {
    onFilterChange({
      ...filters,
      subcategories: filters.subcategories.filter((s) => s !== sub)
    });
  };

  const removeSize = (sz: string) => {
    onFilterChange({
      ...filters,
      sizes: filters.sizes.filter((s) => s !== sz)
    });
  };

  const removeColor = (col: string) => {
    onFilterChange({
      ...filters,
      colors: filters.colors.filter((c) => c !== col)
    });
  };

  const activeChipsCount =
    filters.categories.length +
    filters.subcategories.length +
    filters.sizes.length +
    filters.colors.length +
    filters.materials.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0);

  return (
    <div className="space-y-4 mb-6">
      <div className="bg-white rounded-2xl border border-zinc-200/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        
        {/* Total Results & Mobile Filter Trigger */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeChipsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-zinc-950 text-[10px] font-extrabold flex items-center justify-center">
                {activeChipsCount}
              </span>
            )}
          </button>

          <p className="text-xs sm:text-sm text-zinc-600 font-medium">
            Showing <strong className="text-zinc-950 font-bold">{totalResults}</strong> handcrafted garments
          </p>
        </div>

        {/* Sort & View Switcher */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="sort-select" className="text-zinc-500 font-medium hidden sm:inline">
              Sort By:
            </label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  sortBy: e.target.value as FilterState['sortBy']
                })
              }
              className="px-3 py-2 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900 transition-colors cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center border border-zinc-200 rounded-xl p-1 bg-zinc-50">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-zinc-950' : 'text-zinc-400 hover:text-zinc-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white shadow-xs text-zinc-950' : 'text-zinc-400 hover:text-zinc-700'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Active Filter Chips */}
      {activeChipsCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-zinc-400 font-medium">Applied:</span>
          
          {filters.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-medium"
            >
              {cat}
              <button onClick={() => removeCategory(cat)} className="hover:text-zinc-300">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.subcategories.map((sub) => (
            <span
              key={sub}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200"
            >
              {sub}
              <button onClick={() => removeSubcategory(sub)} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.sizes.map((sz) => (
            <span
              key={sz}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200"
            >
              Size: {sz}
              <button onClick={() => removeSize(sz)} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.colors.map((col) => (
            <span
              key={col}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200"
            >
              Color: {col}
              <button onClick={() => removeColor(col)} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
              {filters.minRating}★ & Above
              <button onClick={() => onFilterChange({ ...filters, minRating: 0 })} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.onSaleOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold border border-rose-200">
              On Sale
              <button onClick={() => onFilterChange({ ...filters, onSaleOnly: false })} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
