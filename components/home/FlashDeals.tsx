'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Timer, ArrowRight, Zap } from 'lucide-react';
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/shop/ProductCard';

export function FlashDeals() {
  const { products } = useApp();
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 35).slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deal Header Banner with Countdown */}
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-zinc-800">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-zinc-950 text-xs font-black uppercase tracking-wider shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-current" /> DEALS OF THE DAY
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Curated Flash Archive • Up to 40% OFF
            </h2>
            <p className="text-xs text-zinc-400">
              Limited inventory drops refreshed every 24 hours. Once gone, gone forever.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/20">
            <Timer className="w-5 h-5 text-amber-400 animate-pulse" />
            <div className="text-xs font-semibold text-zinc-300 mr-2">ENDS IN:</div>
            
            <div className="flex items-center gap-2 font-mono font-bold text-lg text-white">
              <div className="bg-zinc-900/90 px-3 py-1.5 rounded-xl border border-white/10 text-center min-w-[40px]">
                {String(timeLeft.hours).padStart(2, '0')}
                <span className="block text-[9px] font-sans font-normal text-zinc-400">HRS</span>
              </div>
              <span>:</span>
              <div className="bg-zinc-900/90 px-3 py-1.5 rounded-xl border border-white/10 text-center min-w-[40px]">
                {String(timeLeft.minutes).padStart(2, '0')}
                <span className="block text-[9px] font-sans font-normal text-zinc-400">MIN</span>
              </div>
              <span>:</span>
              <div className="bg-zinc-900/90 px-3 py-1.5 rounded-xl border border-white/10 text-center min-w-[40px] text-amber-400">
                {String(timeLeft.seconds).padStart(2, '0')}
                <span className="block text-[9px] font-sans font-normal text-zinc-400">SEC</span>
              </div>
            </div>
          </div>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* View all deals link */}
        <div className="text-center mt-10">
          <Link
            href="/shop?sale=true"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold rounded-full shadow-md transition-all cursor-pointer"
          >
            View All Festive Deals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
