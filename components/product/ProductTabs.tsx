'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Truck, RotateCcw, Feather, CheckCircle2 } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductTabsProps {
  product: Product;
}

type TabType = 'overview' | 'materials' | 'shipping' | 'authenticity';

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="my-14 bg-white rounded-3xl border border-zinc-200/80 overflow-hidden shadow-xs">
      
      {/* Tab Navigation */}
      <div className="flex border-b border-zinc-100 overflow-x-auto no-scrollbar bg-zinc-50/50">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-4 text-xs font-bold transition-all cursor-pointer whitespace-nowrap border-b-2 ${
            activeTab === 'overview'
              ? 'border-zinc-950 text-zinc-950 bg-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Product Overview & Fit
        </button>

        <button
          onClick={() => setActiveTab('materials')}
          className={`px-6 py-4 text-xs font-bold transition-all cursor-pointer whitespace-nowrap border-b-2 ${
            activeTab === 'materials'
              ? 'border-zinc-950 text-zinc-950 bg-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Fabric & Garment Care
        </button>

        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-6 py-4 text-xs font-bold transition-all cursor-pointer whitespace-nowrap border-b-2 ${
            activeTab === 'shipping'
              ? 'border-zinc-950 text-zinc-950 bg-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Shipping & 7-Day Returns
        </button>

        <button
          onClick={() => setActiveTab('authenticity')}
          className={`px-6 py-4 text-xs font-bold transition-all cursor-pointer whitespace-nowrap border-b-2 ${
            activeTab === 'authenticity'
              ? 'border-zinc-950 text-zinc-950 bg-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Aether Authenticity Guarantee
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8 text-xs text-zinc-700 leading-relaxed">
        
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-zinc-950 mb-2">Design & Silhouette Description</h4>
              <p className="text-zinc-600 leading-relaxed max-w-3xl">
                {product.longDescription || product.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-zinc-950 mb-3">Key Features & Architecture</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-zinc-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-zinc-950 mb-3">Material Composition</h4>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((mat, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold border border-zinc-200"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-zinc-950 mb-3">Washing & Garment Care Protocol</h4>
              <ul className="space-y-2 text-zinc-600">
                {product.fabricCare.map((care, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                    <span>{care}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
              <Truck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-zinc-950">Complimentary Express Shipping Across India</h5>
                <p className="text-zinc-600 mt-0.5">
                  Orders over ₹1,999 qualify for Free BlueDart Express Air Delivery. Metro deliveries typically arrive within 24 to 48 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
              <RotateCcw className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-zinc-950">7-Day Zero-Question Return & Exchange</h5>
                <p className="text-zinc-600 mt-0.5">
                  Try it in the comfort of your home. If the fit isn&apos;t absolute perfection, book a complimentary doorstep return or size exchange directly from your account page.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'authenticity' && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-amber-950">
              <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-amber-900">Certified Luxury Craftsmanship</h5>
                <p className="text-amber-900/80 mt-0.5 leading-relaxed">
                  Every Aether garment is individually numbered and inspected before dispatch. Our fabrics are sourced directly from OEKO-TEX and GOTS certified European & Indian spinning mills.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
