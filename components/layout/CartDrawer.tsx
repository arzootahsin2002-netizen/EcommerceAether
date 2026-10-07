'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Bookmark, Truck } from 'lucide-react';
import { useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    saveForLater,
    cartSubtotal,
    cartShipping,
    cartDiscount,
    cartTotal,
    cartCount
  } = useApp();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 1999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slideLeft">
          
          {/* Header */}
          <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-zinc-900" />
              <h2 className="text-lg font-bold text-zinc-900">Your Shopping Bag</h2>
              <span className="text-xs bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full font-semibold">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          {cart.length > 0 && (
            <div className="bg-zinc-50 px-5 py-3 border-b border-zinc-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 font-medium text-zinc-700">
                  <Truck className="w-4 h-4 text-amber-600" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">🎉 You unlocked FREE Express Shipping!</span>
                  ) : (
                    <span>
                      Add <strong className="text-zinc-900">{formatPrice(remainingForFreeShipping)}</strong> more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="font-semibold text-zinc-500">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-900 rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="text-base font-semibold text-zinc-900 mb-1">Your bag is empty</h3>
                <p className="text-xs text-zinc-500 mb-6 max-w-xs mx-auto">
                  Explore our modern apparel collection of heavyweight tees, linen shirts, and outerwear.
                </p>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    router.push('/shop');
                  }}
                  className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold rounded-full transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  Start Shopping <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 p-3 rounded-2xl bg-zinc-50/70 border border-zinc-100 group transition-all"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-zinc-200 shrink-0 border border-zinc-200/60">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <Link
                          href={`/product/${item.productId}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="text-sm font-semibold text-zinc-900 hover:text-amber-800 line-clamp-1 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={() => removeFromCart(item.productId, item.selectedSize, item.selectedColor)}
                          className="text-zinc-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
                        <span className="px-2 py-0.5 rounded bg-zinc-200/80 font-medium text-zinc-800">
                          {item.selectedSize}
                        </span>
                        <span>•</span>
                        <span className="truncate">{item.selectedColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-zinc-300 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={() => updateQuantity(item.productId, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="p-1.5 text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-zinc-900">{item.quantity}</span>
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={() => updateQuantity(item.productId, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="p-1.5 text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-zinc-950">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[10px] text-zinc-400">
                            {formatPrice(item.unitPrice)} each
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-zinc-200/50 flex justify-end">
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => saveForLater(item)}
                        className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Bookmark className="w-3 h-3" /> Save for later
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-100 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{cartShipping === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : formatPrice(cartShipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
                  <span>Total Payable</span>
                  <span className="text-base">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-3 px-4 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-xs font-bold text-zinc-900 text-center transition-colors"
                >
                  View Cart
                </Link>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={handleCheckout}
                  className="py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  Checkout <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Encrypted & Safe Payments
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
