'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function AnnouncementBar() {
  const [copied, setCopied] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-zinc-950 text-white text-xs py-2 px-4 border-b border-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3 h-3 mr-1 text-amber-400" /> FESTIVE DROP
          </span>
          <span className="text-zinc-300 font-medium">
            Complimentary Express Delivery on orders above <span className="text-white font-semibold">₹1,999</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/60 px-2.5 py-0.5 rounded-md text-[11px]">
            <span className="text-zinc-400">Use code:</span>
            <span className="font-mono font-bold text-amber-400">AETHER20</span>
            <button
              type="button"
              suppressHydrationWarning={true}
              onClick={() => copyCode('AETHER20')}
              className="ml-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Copy Coupon"
              aria-label="Copy Coupon Code"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          <Link
            href="/shop?sort=newest"
            className="hidden md:inline-flex items-center text-zinc-300 hover:text-white font-medium group transition-colors"
          >
            Explore Drop <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
