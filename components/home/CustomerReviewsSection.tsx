'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export function CustomerReviewsSection() {
  const testimonials = [
    {
      name: 'Aarav Malhotra',
      role: 'Creative Director, Mumbai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      product: '500 GSM French Terry Hoodie',
      comment: 'The weight and structural drape of the French Terry hoodie rivals European luxury fashion houses that charge 5x more. It holds its boxy contour after multiple washes without pilling.'
    },
    {
      name: 'Dr. Radhika Sharma',
      role: 'Architect, Bengaluru',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      product: 'Sculptural Linen Wrap Midi Dress',
      comment: 'Finding genuine heavyweight linen that is neither sheer nor stiff is rare in India. The terracotta shade is rich and the internal wrap ties ensure zero wardrobe malfunctions during long design presentations.'
    },
    {
      name: 'Kunal Roy',
      role: 'Product Designer, Delhi NCR',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      product: '280 GSM Supima Boxy Tee',
      comment: 'I ordered the 3-pack basic tees. The 1.25-inch sturdy neck collar doesn’t fry or stretch out at all. Easily the highest quality wardrobe blank available online today.'
    }
  ];

  return (
    <section className="py-20 bg-zinc-50 border-t border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1.5">
            CLIENT PERSPECTIVES
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-zinc-950">
            Endorsed by Discerning Patrons
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            Over 14,000+ verified orders delivered across 500+ Indian cities with a 4.9/5 overall rating.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-zinc-200 absolute top-6 right-6 pointer-events-none group-hover:text-amber-200 transition-colors" />

              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic mb-6">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md inline-block mb-3">
                  Verified Buyer: {item.product}
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200">
                    <Image src={item.avatar} alt={item.name} fill unoptimized className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-950 flex items-center gap-1">
                      {item.name} <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" />
                    </h4>
                    <p className="text-[11px] text-zinc-400">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
