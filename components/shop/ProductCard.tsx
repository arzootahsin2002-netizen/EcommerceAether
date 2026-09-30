'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop';

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart, setQuickViewProduct } = useApp();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [imgSrc, setImgSrc] = useState<string>(product.images[0] || FALLBACK_IMAGE);

  const isWished = isInWishlist(product.id);

  const handleQuickAdd = (size: string) => {
    addToCart(product, size, selectedColor, 1);
    setShowSizePicker(false);
  };

  const activeImage = isHovered && product.images[1] && currentImageIndex === 0
    ? product.images[1]
    : product.images[currentImageIndex] || product.images[0] || FALLBACK_IMAGE;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-3xl border border-zinc-200/80 hover:border-zinc-300 p-4 flex flex-col sm:flex-row gap-5 transition-all duration-300 hover:shadow-lg group">
        {/* Image Container */}
        <div className="relative w-full sm:w-56 h-64 sm:h-72 rounded-2xl overflow-hidden bg-zinc-100 shrink-0">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            unoptimized
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-zinc-950 text-white">
              {product.discountPercentage}% OFF
            </span>
          )}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-rose-500 shadow-xs transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWished ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-zinc-600">{product.brand}</span>
              <span>•</span>
              <span>{product.subcategory}</span>
            </div>

            <Link href={`/product/${product.id}`} className="block">
              <h3 className="text-lg font-bold text-zinc-950 hover:text-amber-800 transition-colors">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-zinc-600 line-clamp-2 mt-1.5 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded text-xs font-bold text-amber-900">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-zinc-500">({product.reviewsCount} reviews)</span>
              <span className="text-xs text-zinc-300">•</span>
              <span className="text-xs text-emerald-700 font-medium">In Stock ({product.stock} units)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-zinc-100 mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-zinc-950">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-zinc-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuickViewProduct(product)}
                className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
                title="Quick View"
                aria-label="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
              <Link
                href={`/product/${product.id}`}
                className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Select Size
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-white rounded-3xl border border-zinc-200/70 hover:border-zinc-300/90 transition-all duration-300 hover:shadow-xl flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full min-h-[300px] sm:min-h-[360px] bg-zinc-100 overflow-hidden">
        <Link href={`/product/${product.id}`} className="block h-full w-full relative">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isDealOfTheDay && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-500 text-zinc-950 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" /> Deal
            </span>
          )}
          {product.isBestSeller && !product.isDealOfTheDay && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-zinc-900 text-white shadow-sm">
              Bestseller
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-600 text-white shadow-xs">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-rose-500 shadow-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWished ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-black shadow-sm flex items-center justify-center transition-transform hover:scale-110 opacity-0 group-hover:opacity-100 cursor-pointer"
            title="Quick View"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Size Selector Dropup on hover */}
        {showSizePicker ? (
          <div className="absolute inset-x-2 bottom-2 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-zinc-200 z-20 animate-slideUp">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-zinc-900 uppercase">Select Size:</span>
              <button
                type="button"
                onClick={() => setShowSizePicker(false)}
                className="text-[10px] text-zinc-500 hover:text-black font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => handleQuickAdd(sz)}
                  className="py-1.5 text-xs font-bold rounded-lg border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-950 hover:text-white transition-all text-zinc-800 cursor-pointer"
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
            <button
              type="button"
              onClick={() => {
                if (product.sizes.length === 1) {
                  addToCart(product, product.sizes[0], selectedColor, 1);
                } else {
                  setShowSizePicker(true);
                }
              }}
              className="w-full py-2.5 bg-zinc-950/90 hover:bg-zinc-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg backdrop-blur-xs transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
            </button>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Subcategory */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-zinc-600">{product.brand}</span>
            <span className="text-zinc-400">{product.fit}</span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="text-sm font-bold text-zinc-900 group-hover:text-amber-800 transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => {
                    setSelectedColor(color.name);
                    if (color.imageIndex !== undefined) {
                      setCurrentImageIndex(color.imageIndex);
                    }
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColor === color.name ? 'ring-2 ring-zinc-950 ring-offset-1 scale-110' : 'border-zinc-300'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                />
              ))}
              <span className="text-[10px] text-zinc-400 ml-1">+{product.colors.length} shades</span>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-0.5 text-xs font-bold text-zinc-900">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{product.rating}</span>
            </div>
            <span className="text-[11px] text-zinc-400">({product.reviewsCount})</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-semibold ml-auto">
              Assured
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 pt-3 mt-2 border-t border-zinc-100">
          <span className="text-base font-black text-zinc-950">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-zinc-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
