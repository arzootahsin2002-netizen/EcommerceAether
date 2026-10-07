'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  Heart,
  Zap,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  MapPin,
  Share2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Product } from '@/lib/types';
import { useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { SizeGuideModal } from './SizeGuideModal';

interface ProductInfoProps {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

export function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize
}: ProductInfoProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const isWished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.length < 6) {
      setPincodeStatus('Please enter a valid 6-digit postal pincode.');
      return;
    }
    const days = Math.floor(Math.random() * 2) + 2;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    const dateStr = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    setPincodeStatus(`Eligible for Free Delivery to ${pincode} by ${dateStr}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        title: 'Link Copied',
        message: 'Product link copied to your clipboard',
        type: 'info'
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Brand & Meta */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/50">
              {product.brand}
            </span>
            <span className="text-xs text-zinc-400">• SKU: {product.sku}</span>
          </div>

          <button
            type="button"
            suppressHydrationWarning
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-black transition-colors cursor-pointer"
            title="Share this item"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-black text-zinc-950 leading-snug">
          {product.name}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 font-light mt-1">
          {product.tagline}
        </p>
      </div>

      {/* Ratings Bar */}
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
        <a
          href="#customer-reviews"
          className="flex items-center gap-1.5 bg-amber-500 text-zinc-950 font-black px-2.5 py-1 rounded-lg text-xs shadow-xs hover:bg-amber-400 transition-colors"
        >
          <span>{product.rating}</span>
          <Star className="w-3.5 h-3.5 fill-zinc-950" />
        </a>
        <a href="#customer-reviews" className="text-xs font-semibold text-zinc-600 hover:underline">
          {product.reviewsCount} Verified Customer Reviews
        </a>
        <span className="text-zinc-300">•</span>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
          {product.stock > 10 ? 'In Stock' : `Only ${product.stock} Left - Order Soon`}
        </span>
      </div>

      {/* Pricing Section */}
      <div className="space-y-1 pb-4 border-b border-zinc-100">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-black text-zinc-950">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-lg text-zinc-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-600 text-white uppercase tracking-wider">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>
        <p className="text-[11px] text-zinc-400">
          Inclusive of all taxes • Free shipping on orders over ₹1,999
        </p>
      </div>

      {/* Color Swatches */}
      <div>
        <label className="text-xs font-bold text-zinc-800 block mb-2.5">
          Color: <span className="text-zinc-950 font-extrabold">{selectedColor}</span>
        </label>
        <div className="flex flex-wrap gap-2.5">
          {product.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              suppressHydrationWarning
              onClick={() => setSelectedColor(color.name)}
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                selectedColor === color.name
                  ? 'ring-2 ring-zinc-950 ring-offset-2 scale-110 shadow-md'
                  : 'border-zinc-300 hover:scale-105'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {selectedColor === color.name && (
                <Check
                  className={`w-4 h-4 ${color.hex.toLowerCase() === '#ffffff' || color.hex.toLowerCase() === '#f4f4f5' ? 'text-black' : 'text-white'}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selector & Size Guide */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold text-zinc-800">
            Select Size: <span className="text-zinc-950 font-extrabold">{selectedSize}</span>
          </label>
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 underline cursor-pointer"
          >
            <Ruler className="w-3.5 h-3.5" /> Size Guide
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {product.sizes.map((sz) => {
            const isSelected = selectedSize === sz;
            return (
              <button
                key={sz}
                type="button"
                suppressHydrationWarning
                onClick={() => setSelectedSize(sz)}
                className={`py-3 text-xs font-bold rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                    : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-900'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>

        {product.modelInfo && (
          <p className="text-[11px] text-zinc-500 mt-2 italic flex items-center gap-1">
            <Sparkles className="w-3 hand-3 text-amber-600" /> {product.modelInfo}
          </p>
        )}
      </div>

      {/* Quantity & CTA Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-zinc-200 rounded-2xl bg-zinc-50 overflow-hidden px-2">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-zinc-600 hover:text-black font-bold text-sm cursor-pointer"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-3 text-xs font-bold text-zinc-950 min-w-[28px] text-center">{quantity}</span>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="p-2 text-zinc-600 hover:text-black font-bold text-sm cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-6 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
          </button>
        </div>

        {/* 1-Click Buy Now */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={handleBuyNow}
          className="w-full py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-current" /> Buy Now with 1-Click
        </button>
      </div>

      {/* Pincode Delivery Estimator */}
      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
        <label className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-amber-700" /> Check Estimated Delivery Date & COD Availability
        </label>

        <form onSubmit={checkPincode} className="flex gap-2">
          <input
            type="text"
            suppressHydrationWarning
            placeholder="Enter 6-digit Pincode (e.g. 560038)"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            className="flex-1 px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl outline-none focus:border-zinc-950"
          />
          <button
            type="submit"
            suppressHydrationWarning
            className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors cursor-pointer"
          >
            Check
          </button>
        </form>

        {pincodeStatus && (
          <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1 mt-1 animate-fadeIn">
            <Check className="w-3.5 h-3.5" /> {pincodeStatus}
          </p>
        )}
      </div>

      {/* Value Badges */}
      <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-zinc-600">
        <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col items-center gap-1">
          <Truck className="w-4 h-4 text-zinc-800" />
          <span className="font-bold text-zinc-900">Complimentary</span>
          <span>Express Shipping</span>
        </div>
        <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col items-center gap-1">
          <RotateCcw className="w-4 h-4 text-zinc-800" />
          <span className="font-bold text-zinc-900">7-Day Return</span>
          <span>Doorstep Pickup</span>
        </div>
        <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-zinc-800" />
          <span className="font-bold text-zinc-900">100% Genuine</span>
          <span>Artisanal Quality</span>
        </div>
      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        productType={product.subcategory}
      />

    </div>
  );
}
