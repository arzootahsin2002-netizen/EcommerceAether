'use client';

import React from 'react';
import { Filter, RotateCcw, Star, Check, Sparkles, Tag } from 'lucide-react';
import { FilterState, ProductCategory, ClothingType } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalMatches: number;
}

const CATEGORIES: ProductCategory[] = [
  'For You',
  'Fashion',
  'Mobiles',
  'Electronics',
  'Beauty',
  'Home',
  'Appliances',
  'Toys & Baby',
  'Sports',
  'Furniture',
  'Books',
  'Men',
  'Women',
  'Outerwear'
];

const SUBCATEGORIES: ClothingType[] = [
  'Hoodies & Sweatshirts',
  'T-Shirts',
  'Shirts',
  'Trousers & Pants',
  'Jackets & Coats',
  'Knitwear & Sweaters',
  'Jeans & Denim',
  'Dresses & Co-ords',
  'Blazers'
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const COLORS = [
  { name: 'Onyx Black', hex: '#18181B' },
  { name: 'Warm Taupe', hex: '#8B7765' },
  { name: 'Vintage White', hex: '#F4F4F5' },
  { name: 'Charcoal', hex: '#3F3F46' },
  { name: 'Olive Green', hex: '#55594C' },
  { name: 'Deep Indigo', hex: '#1E293B' },
  { name: 'Camel Tan', hex: '#B89778' },
  { name: 'Terracotta Rust', hex: '#B85D43' }
];

const MATERIALS = [
  '100% Organic Cotton',
  '500 GSM French Terry',
  'European Flax Linen',
  'Japanese Selvedge Denim',
  'Australian Merino Wool',
  'Melton Wool & Cashmere',
  'Supima Cotton'
];

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  totalMatches
}: FilterSidebarProps) {
  
  const toggleCategory = (cat: ProductCategory) => {
    const exists = filters.categories.includes(cat);
    const updated = exists
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onFilterChange({ ...filters, categories: updated });
  };

  const toggleSubcategory = (sub: ClothingType) => {
    const exists = filters.subcategories.includes(sub);
    const updated = exists
      ? filters.subcategories.filter((s) => s !== sub)
      : [...filters.subcategories, sub];
    onFilterChange({ ...filters, subcategories: updated });
  };

  const toggleSize = (sz: string) => {
    const exists = filters.sizes.includes(sz);
    const updated = exists ? filters.sizes.filter((s) => s !== sz) : [...filters.sizes, sz];
    onFilterChange({ ...filters, sizes: updated });
  };

  const toggleColor = (colorName: string) => {
    const exists = filters.colors.includes(colorName);
    const updated = exists ? filters.colors.filter((c) => c !== colorName) : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: updated });
  };

  const toggleMaterial = (mat: string) => {
    const exists = filters.materials.includes(mat);
    const updated = exists ? filters.materials.filter((m) => m !== mat) : [...filters.materials, mat];
    onFilterChange({ ...filters, materials: updated });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.subcategories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.materials.length > 0 ||
    filters.minRating > 0 ||
    filters.inStockOnly ||
    filters.onSaleOnly ||
    filters.priceRange[0] > 500 ||
    filters.priceRange[1] < 10000;

  return (
    <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 space-y-7 shadow-xs">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-950" />
          <h3 className="font-bold text-sm text-zinc-950">Filters</h3>
          <span className="text-[11px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full font-semibold">
            {totalMatches} results
          </span>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            suppressHydrationWarning
            onClick={onReset}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear All
          </button>
        )}
      </div>

      {/* Quick Toggles: On Sale / In Stock */}
      <div className="space-y-2.5 pb-5 border-b border-zinc-100">
        <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer text-xs font-medium text-zinc-800">
          <span className="flex items-center gap-1.5 font-bold text-rose-600">
            <Sparkles className="w-3.5 h-3.5" /> On Sale / Offers Only
          </span>
          <input
            type="checkbox"
            suppressHydrationWarning
            checked={filters.onSaleOnly}
            onChange={(e) => onFilterChange({ ...filters, onSaleOnly: e.target.checked })}
            className="w-4 h-4 rounded text-zinc-900 focus:ring-zinc-900"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer text-xs font-medium text-zinc-800">
          <span>In-Stock Only</span>
          <input
            type="checkbox"
            suppressHydrationWarning
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-zinc-900 focus:ring-zinc-900"
          />
        </label>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pb-5 border-b border-zinc-100">
        <div className="flex justify-between items-center text-xs font-bold text-zinc-900">
          <span>Max Price</span>
          <span className="font-mono text-amber-800">{formatPrice(filters.priceRange[1])}</span>
        </div>
        <input
          type="range"
          suppressHydrationWarning
          min="500"
          max="10000"
          step="250"
          value={filters.priceRange[1]}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              priceRange: [filters.priceRange[0], parseInt(e.target.value)]
            })
          }
          className="w-full accent-zinc-950 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>{formatPrice(500)}</span>
          <span>{formatPrice(10000)}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5 pb-5 border-b border-zinc-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Category</h4>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center justify-between text-xs text-zinc-700 hover:text-black py-1 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  suppressHydrationWarning
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded text-zinc-950 focus:ring-zinc-900"
                />
                <span>{cat}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Subcategory / Product Type */}
      <div className="space-y-2.5 pb-5 border-b border-zinc-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Product Type</h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {SUBCATEGORIES.map((sub) => (
            <label
              key={sub}
              className="flex items-center justify-between text-xs text-zinc-700 hover:text-black py-1 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  suppressHydrationWarning
                  checked={filters.subcategories.includes(sub)}
                  onChange={() => toggleSubcategory(sub)}
                  className="w-4 h-4 rounded text-zinc-950 focus:ring-zinc-900"
                />
                <span>{sub}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Size Selector Grid */}
      <div className="space-y-2.5 pb-5 border-b border-zinc-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Size</h4>
        <div className="grid grid-cols-3 gap-1.5">
          {SIZES.map((sz) => {
            const isSelected = filters.sizes.includes(sz);
            return (
              <button
                key={sz}
                type="button"
                suppressHydrationWarning
                onClick={() => toggleSize(sz)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-950 text-white border-zinc-950'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter Swatches */}
      <div className="space-y-2.5 pb-5 border-b border-zinc-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Color Palette</h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((col) => {
            const isSelected = filters.colors.includes(col.name);
            return (
              <button
                key={col.name}
                type="button"
                suppressHydrationWarning
                onClick={() => toggleColor(col.name)}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                  isSelected ? 'ring-2 ring-zinc-950 ring-offset-2 scale-110' : 'border-zinc-300'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 ${col.hex.toLowerCase() === '#f4f4f5' ? 'text-black' : 'text-white'}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Customer Ratings Filter */}
      <div className="space-y-2.5 pb-5 border-b border-zinc-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Customer Rating</h4>
        <div className="space-y-1.5 text-xs">
          {[4, 3].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 py-1 text-zinc-700 hover:text-black cursor-pointer"
            >
              <input
                type="radio"
                suppressHydrationWarning
                name="minRating"
                checked={filters.minRating === rating}
                onChange={() =>
                  onFilterChange({
                    ...filters,
                    minRating: filters.minRating === rating ? 0 : rating
                  })
                }
                className="w-4 h-4 text-zinc-950 focus:ring-zinc-900"
              />
              <div className="flex items-center gap-1">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                ))}
                <span className="ml-1 font-medium">{rating}★ & above</span>
              </div>
            </label>
          ))}
          {filters.minRating > 0 && (
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => onFilterChange({ ...filters, minRating: 0 })}
              className="text-[11px] text-zinc-400 hover:text-zinc-700 underline pt-1 block cursor-pointer"
            >
              Reset rating filter
            </button>
          )}
        </div>
      </div>

      {/* Materials */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Fabric & Material</h4>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {MATERIALS.map((mat) => (
            <label
              key={mat}
              className="flex items-center gap-2 text-xs text-zinc-700 hover:text-black py-1 cursor-pointer"
            >
              <input
                type="checkbox"
                suppressHydrationWarning
                checked={filters.materials.includes(mat)}
                onChange={() => toggleMaterial(mat)}
                className="w-4 h-4 rounded text-zinc-950 focus:ring-zinc-900"
              />
              <span className="truncate">{mat}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}
