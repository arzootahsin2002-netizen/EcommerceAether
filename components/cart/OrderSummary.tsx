'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Tag, ArrowRight, ShieldCheck, Check, Sparkles, X } from 'lucide-react';
import { useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export function OrderSummary() {
  const router = useRouter();
  const {
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    cart
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 space-y-6 shadow-xs sticky top-28">
      <h3 className="text-lg font-bold text-zinc-950 pb-3 border-b border-zinc-100">
        Order Summary
      </h3>

      {/* Pricing Breakdown */}
      <div className="space-y-3 text-xs text-zinc-600">
        <div className="flex justify-between">
          <span>Bag Subtotal ({cart.length} items)</span>
          <span className="font-bold text-zinc-950">{formatPrice(cartSubtotal)}</span>
        </div>

        {cartDiscount > 0 && (
          <div className="flex justify-between text-emerald-700 font-bold">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Promo Discount ({activeCoupon?.code})
            </span>
            <span>-{formatPrice(cartDiscount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Estimated Shipping</span>
          <span>
            {cartShipping === 0 ? (
              <span className="text-emerald-700 font-bold">FREE Express</span>
            ) : (
              formatPrice(cartShipping)
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>GST / Taxes</span>
          <span className="text-zinc-500">Included in price</span>
        </div>

        <div className="pt-3 border-t border-zinc-100 flex justify-between items-baseline text-zinc-950 font-black">
          <span className="text-sm">Total Payable</span>
          <span className="text-2xl">{formatPrice(cartTotal)}</span>
        </div>
      </div>

      {/* Coupon Form */}
      <div className="pt-2">
        {activeCoupon ? (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold font-mono text-emerald-800">{activeCoupon.code}</span>
              <p className="text-[11px] text-emerald-700">{activeCoupon.description}</p>
            </div>
            <button
              onClick={removeCoupon}
              className="p-1 text-emerald-800 hover:text-rose-600 transition-colors"
              title="Remove Coupon"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-700" /> Have a Promo Code?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Try AETHER20 or WELCOME10"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value.toUpperCase());
                  setCouponError('');
                }}
                className="flex-1 px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-mono font-bold uppercase placeholder:normal-case placeholder:font-sans placeholder:text-zinc-400 outline-none focus:border-zinc-950"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            {couponError && (
              <p className="text-[11px] text-rose-600 font-semibold">{couponError}</p>
            )}
          </form>
        )}
      </div>

      {/* Checkout CTA */}
      <button
        onClick={handleCheckout}
        disabled={cart.length === 0}
        className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-200 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
      >
        Proceed to Checkout <ArrowRight className="w-4 h-4" />
      </button>

      {/* Trust guarantees */}
      <div className="pt-2 text-center text-[11px] text-zinc-400 space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-zinc-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Encrypted & Safe Checkout
        </div>
        <p>Supports UPI, Net Banking, Debit/Credit Cards & COD</p>
      </div>
    </div>
  );
}
