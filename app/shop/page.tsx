'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { MobileFilterDrawer } from '@/components/shop/MobileFilterDrawer';
import { SortBar } from '@/components/shop/SortBar';
import { ProductCard } from '@/components/shop/ProductCard';
import { useApp } from '@/lib/store';
import { FilterState, ProductCategory, ClothingType } from '@/lib/types';
import { Sparkles, SearchX } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const { products } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const initialFilters: FilterState = {
    searchQuery: searchParams.get('q') || '',
    categories: searchParams.get('category')
      ? [searchParams.get('category') as ProductCategory]
      : [],
    subcategories: searchParams.get('subcategory')
      ? [searchParams.get('subcategory') as ClothingType]
      : [],
    sizes: searchParams.get('size') ? [searchParams.get('size')!] : [],
    colors: searchParams.get('color') ? [searchParams.get('color')!] : [],
    materials: [],
    priceRange: [0, 100000],
    minRating: 0,
    inStockOnly: false,
    onSaleOnly: searchParams.get('sale') === 'true',
    sortBy: (searchParams.get('sort') as FilterState['sortBy']) || 'featured'
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Sync state when URL params change
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    const sub = searchParams.get('subcategory');
    const sale = searchParams.get('sale');
    const sort = searchParams.get('sort');

    setFilters((prev) => ({
      ...prev,
      searchQuery: q || '',
      categories: cat ? [cat as ProductCategory] : prev.categories,
      subcategories: sub ? [sub as ClothingType] : prev.subcategories,
      onSaleOnly: sale === 'true' ? true : prev.onSaleOnly,
      sortBy: (sort as FilterState['sortBy']) || prev.sortBy
    }));
  }, [searchParams]);

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          const matches =
            product.name.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q) ||
            product.subcategory.toLowerCase().includes(q) ||
            product.brand.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category
        if (filters.categories.length > 0) {
          const matchesCategory = filters.categories.some((cat) => {
            const catLower = cat.toLowerCase();
            const prodCatLower = product.category.toLowerCase();
            
            if (catLower === 'for you') {
              return product.isFeatured || product.isBestSeller || product.rating >= 4.8;
            }
            if (catLower === 'fashion') {
              return ['fashion', 'men', 'women', 'outerwear', 'unisex'].includes(prodCatLower);
            }
            if (catLower.includes('toys') || catLower.includes('baby')) {
              return prodCatLower.includes('toy') || prodCatLower.includes('baby');
            }
            return prodCatLower === catLower;
          });
          if (!matchesCategory) return false;
        }

        // Subcategory
        if (filters.subcategories.length > 0) {
          if (!filters.subcategories.includes(product.subcategory)) return false;
        }

        // Sizes
        if (filters.sizes.length > 0) {
          const hasSize = filters.sizes.some((s) => product.sizes.includes(s as any));
          if (!hasSize) return false;
        }

        // Colors
        if (filters.colors.length > 0) {
          const hasColor = filters.colors.some((c) =>
            product.colors.some((pc) => pc.name.toLowerCase() === c.toLowerCase())
          );
          if (!hasColor) return false;
        }

        // Materials
        if (filters.materials.length > 0) {
          const hasMaterial = filters.materials.some((m) =>
            product.materials.some((pm) => pm.toLowerCase().includes(m.toLowerCase()))
          );
          if (!hasMaterial) return false;
        }

        // Price
        if (
          product.price < filters.priceRange[0] ||
          product.price > filters.priceRange[1]
        ) {
          return false;
        }

        // Rating
        if (filters.minRating > 0) {
          if (product.rating < filters.minRating) return false;
        }

        // In Stock
        if (filters.inStockOnly) {
          if (product.stock <= 0) return false;
        }

        // On Sale
        if (filters.onSaleOnly) {
          if (!product.discountPercentage || product.discountPercentage <= 0) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (filters.sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      subcategories: [],
      sizes: [],
      colors: [],
      materials: [],
      priceRange: [500, 10000],
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: false,
      sortBy: 'featured'
    });
  };

  return (
    <div className="bg-zinc-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> ARCHITECTURAL CATALOG
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-zinc-950">
            {filters.categories.length === 1
              ? `${filters.categories[0]}'s Collection`
              : filters.subcategories.length === 1
              ? `${filters.subcategories[0]}`
              : filters.searchQuery
              ? `Results for "${filters.searchQuery}"`
              : 'Complete Garment Archive'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl">
            Precision knits, French flax linen, and Japanese selvedge denim tailored for modern proportions.
          </p>
        </div>

        {/* Main Grid: Left Filter Sidebar + Right Products View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              totalMatches={filteredProducts.length}
            />
          </div>

          {/* Main Products Listing Area */}
          <div className="lg:col-span-9">
            <SortBar
              filters={filters}
              onFilterChange={setFilters}
              totalResults={filteredProducts.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
            />

            {/* Product Grid or Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center shadow-xs">
                <SearchX className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-zinc-950 mb-1">No garments match your active filters</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-6">
                  Try clearing some filters, adjusting the price range, or searching for broader categories.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-bold transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode="list" />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
        totalMatches={filteredProducts.length}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-400">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
