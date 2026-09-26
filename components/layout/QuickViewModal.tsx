'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useApp();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0);
      setSelectedSize(quickViewProduct.sizes[0] || 'M');
      setSelectedColor(quickViewProduct.colors[0]?.name || 'Standard');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isWished = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden z-10 animate-scale border border-zinc-200">
          
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-zinc-500 hover:text-black bg-white/80 hover:bg-white rounded-full shadow-sm transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="bg-zinc-100 p-6 flex flex-col justify-between">
              <div className="relative aspect-[3/4] min-h-[360px] w-full rounded-2xl overflow-hidden bg-white shadow-inner">
                <Image
                  src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
                {quickViewProduct.discountPercentage > 0 && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-600 text-white shadow-sm">
                    {quickViewProduct.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-14 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        selectedImageIndex === idx ? 'border-zinc-950 scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="" fill unoptimized className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                    {quickViewProduct.brand}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-xs text-zinc-500">{quickViewProduct.category}</span>
                </div>

                <h2 className="text-xl font-bold text-zinc-950 leading-snug mb-2">
                  {quickViewProduct.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{quickViewProduct.rating}</span>
                  </div>
                  <span className="text-xs text-zinc-500">({quickViewProduct.reviewsCount} verified reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2.5 pb-4 border-b border-zinc-100">
                  <span className="text-2xl font-black text-zinc-950">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <span className="text-sm text-zinc-400 line-through">
                      {formatPrice(quickViewProduct.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-emerald-600 font-semibold">
                    Save {formatPrice(quickViewProduct.originalPrice - quickViewProduct.price)}
                  </span>
                </div>

                {/* Color Selector */}
                <div className="mt-4">
                  <label className="text-xs font-semibold text-zinc-700 block mb-2">
                    Color: <span className="text-zinc-950 font-bold">{selectedColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          setSelectedColor(color.name);
                          if (color.imageIndex !== undefined) {
                            setSelectedImageIndex(color.imageIndex);
                          }
                        }}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                          selectedColor === color.name ? 'ring-2 ring-zinc-950 ring-offset-2 scale-110' : 'border-zinc-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <Check className={`w-3.5 h-3.5 ${color.hex.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-zinc-700">Select Size</label>
                    <span className="text-[11px] text-zinc-500 font-medium">{quickViewProduct.fit}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                            : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 px-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-zinc-400" /> Dispatched within 24 Hours
                  </span>
                  <Link
                    href={`/product/${quickViewProduct.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="text-zinc-900 font-semibold hover:underline flex items-center gap-1"
                  >
                    View Full Specs <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
