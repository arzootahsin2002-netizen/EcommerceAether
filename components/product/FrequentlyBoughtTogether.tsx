'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

interface FrequentlyBoughtTogetherProps {
  currentProduct: Product;
  bundleProducts: Product[];
}

export function FrequentlyBoughtTogether({ currentProduct, bundleProducts }: FrequentlyBoughtTogetherProps) {
  const { addToCart, showToast } = useApp();
  
  const allItems = [currentProduct, ...bundleProducts.slice(0, 2)];
  const [selectedIds, setSelectedIds] = useState<string[]>(allItems.map((p) => p.id));

  const toggleItem = (id: string) => {
    if (id === currentProduct.id) return; // Keep main item
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedItems = allItems.filter((item) => selectedIds.includes(item.id));
  const rawTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
  // 15% bundle discount when at least 2 items selected
  const bundleDiscount = selectedItems.length >= 2 ? Math.round(rawTotal * 0.15) : 0;
  const finalBundlePrice = rawTotal - bundleDiscount;

  const handleAddBundleToCart = () => {
    selectedItems.forEach((item) => {
      addToCart(item, item.sizes[0] || 'M', item.colors[0]?.name || 'Standard', 1);
    });
    showToast({
      title: 'Bundle Added to Bag!',
      message: `Added ${selectedItems.length} coordinating pieces.`,
      type: 'success'
    });
  };

  if (bundleProducts.length === 0) return null;

  return (
    <section className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 sm:p-8 my-12">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          COORDINATING CAPSULE BUNDLE
        </span>
      </div>
      <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-950 mb-6">
        Frequently Styled Together
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Visual Product Thumbnails with + signs */}
        <div className="lg:col-span-8 flex flex-wrap items-center gap-3 sm:gap-4">
          {allItems.map((item, idx) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <React.Fragment key={item.id}>
                {idx > 0 && (
                  <div className="w-8 h-8 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center shrink-0">
                    <Plus className="w-4 h-4" />
                  </div>
                )}
                <div
                  onClick={() => toggleItem(item.id)}
                  className={`relative w-24 sm:w-28 h-32 sm:h-36 rounded-2xl overflow-hidden border-2 bg-white cursor-pointer transition-all ${
                    isSelected
                      ? 'border-zinc-950 shadow-md ring-2 ring-zinc-950/20'
                      : 'border-zinc-200 opacity-50 grayscale'
                  }`}
                >
                  <Image src={item.images[0]} alt={item.name} fill unoptimized className="object-cover" />
                  <div className="absolute top-2 left-2 z-10">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-white ${
                        isSelected ? 'bg-zinc-950' : 'bg-zinc-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-zinc-950/80 p-1 text-center">
                    <span className="text-[10px] font-bold text-white block truncate px-1">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Bundle Summary & CTA */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">
              Bundle Total ({selectedItems.length} items):
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-zinc-950">
                {formatPrice(finalBundlePrice)}
              </span>
              {bundleDiscount > 0 && (
                <span className="text-sm text-zinc-400 line-through">
                  {formatPrice(rawTotal)}
                </span>
              )}
            </div>
            {bundleDiscount > 0 && (
              <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Save {formatPrice(bundleDiscount)} (15% Bundle Offer)
              </span>
            )}
          </div>

          <button
            onClick={handleAddBundleToCart}
            disabled={selectedItems.length === 0}
            className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-300 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" /> Add All {selectedItems.length} to Bag
          </button>
        </div>

      </div>
    </section>
  );
}
