'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Bookmark,
  Truck,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const {
    cart,
    savedForLater,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCartFromSaved,
    removeSavedForLater,
    cartCount,
    cartSubtotal
  } = useApp();

  return (
    <div className="bg-zinc-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-zinc-950">
            Shopping Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Review your items and proceed with seamless encrypted checkout.
          </p>
        </div>

        {cart.length === 0 && savedForLater.length === 0 ? (
          <div className="bg-white rounded-3xl border border-zinc-200 p-16 text-center shadow-xs">
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <ShoppingBag className="w-8 h-8 stroke-1" />
            </div>
            <h2 className="text-lg font-bold text-zinc-950 mb-1">Your Shopping Bag is Empty</h2>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-6">
              Looks like you haven&apos;t added any items to your bag yet. Explore our luxury basics and outerwear collection.
            </p>
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cart Items Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {cart.length > 0 ? (
                <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 space-y-5 shadow-xs">
                  <div className="space-y-4 divide-y divide-zinc-100">
                    {cart.map((item) => (
                      <div
                        key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                        className="pt-4 first:pt-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                      >
                        {/* Product Thumbnail & Details */}
                        <div className="flex gap-4 items-center">
                          <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200/80">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                              {item.product.brand}
                            </span>
                            <Link
                              href={`/product/${item.productId}`}
                              className="block text-sm font-bold text-zinc-950 hover:text-amber-800 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                              <span>Size: <strong className="text-zinc-900">{item.selectedSize}</strong></span>
                              <span>•</span>
                              <span>Color: <strong className="text-zinc-900">{item.selectedColor}</strong></span>
                            </div>
                            <span className="text-xs font-bold text-emerald-700 block">
                              In Stock
                            </span>
                          </div>
                        </div>

                        {/* Quantity & Pricing */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                          <div className="text-right">
                            <span className="text-base font-black text-zinc-950">
                              {formatPrice(item.unitPrice * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <span className="block text-[10px] text-zinc-400">
                                {formatPrice(item.unitPrice)} each
                              </span>
                            )}
                          </div>

                          {/* Quantity Adjuster */}
                          <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.selectedSize,
                                  item.selectedColor,
                                  item.quantity - 1
                                )
                              }
                              className="p-1.5 text-zinc-600 hover:text-black font-bold"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-zinc-950">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.selectedSize,
                                  item.selectedColor,
                                  item.quantity + 1
                                )
                              }
                              className="p-1.5 text-zinc-600 hover:text-black font-bold"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3 text-xs text-zinc-400">
                            <button
                              onClick={() => saveForLater(item)}
                              className="hover:text-zinc-800 flex items-center gap-1"
                            >
                              <Bookmark className="w-3.5 h-3.5" /> Save
                            </button>
                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.productId,
                                  item.selectedSize,
                                  item.selectedColor
                                )
                              }
                              className="hover:text-rose-600 flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Saved For Later Section */}
              {savedForLater.length > 0 && (
                <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 space-y-4 shadow-xs">
                  <h3 className="text-base font-bold text-zinc-950 flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-amber-700" /> Saved For Later ({savedForLater.length})
                  </h3>

                  <div className="space-y-3 divide-y divide-zinc-100">
                    {savedForLater.map((item) => (
                      <div
                        key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                        className="pt-3 first:pt-0 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                            <Image src={item.product.images[0]} alt="" fill unoptimized className="object-cover" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-zinc-900">{item.product.name}</h4>
                            <p className="text-[11px] text-zinc-500">
                              {item.selectedSize} • {item.selectedColor} • {formatPrice(item.unitPrice)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => moveToCartFromSaved(item)}
                            className="px-3.5 py-1.5 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors"
                          >
                            Move to Bag
                          </button>
                          <button
                            onClick={() => removeSavedForLater(item.productId, item.selectedSize, item.selectedColor)}
                            className="p-1.5 text-zinc-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <OrderSummary />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
