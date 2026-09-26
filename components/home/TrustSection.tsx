'use client';

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Sparkles, Award, Lock, Feather, RefreshCw } from 'lucide-react';

export function TrustSection() {
  const guarantees = [
    {
      icon: Feather,
      title: 'Crafted from Raw Nobility',
      description: 'Long-staple Supima, French linen, and 19.5µ Merino sourced from certified ethical mills.'
    },
    {
      icon: Truck,
      title: 'Lightning Express Dispatch',
      description: 'Orders placed before 2 PM dispatched same-day with BlueDart Air tracking across India.'
    },
    {
      icon: RefreshCw,
      title: 'Hassle-Free 7-Day Returns',
      description: 'Zero questions asked. Doorstep reverse pickup with instant automated UPI/Card refunds.'
    },
    {
      icon: Lock,
      title: 'Enterprise Payment Security',
      description: 'End-to-end encrypted checkout supporting UPI, EMI, Rupay, and international credit cards.'
    }
  ];

  return (
    <section className="py-16 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-900/60 border border-zinc-800/80 p-6 rounded-3xl hover:border-zinc-700 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
