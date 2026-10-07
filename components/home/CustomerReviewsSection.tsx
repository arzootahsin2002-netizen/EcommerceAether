'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  product: string;
  comment: string;
}

const TESTIMONIALS: Testimonial[] = [
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
  },
  {
    name: 'Ananya Deshmukh',
    role: 'Fashion Stylist, Pune',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    product: 'Japanese Selvedge Denim Jacket',
    comment: 'The 14oz raw selvedge has an exceptional hand feel. The subtle brass hardware and contrast chain stitching show authentic craftsmanship that usually requires bespoke tailoring.'
  },
  {
    name: 'Vikramaditya Sengupta',
    role: 'Brand Strategist, Kolkata',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    product: 'Double-Breasted Wool Overshirt',
    comment: 'The structured silhouette and micro-herringbone wool blend elevate my evening attire seamlessly. The bespoke horn buttons and satin-lined cuffs add that touch of quiet luxury.'
  },
  {
    name: 'Meera Iyer',
    role: 'Interior Stylist, Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    product: 'Relaxed Pleated Trousers',
    comment: 'The drape of these pleated trousers is immaculate. Breathable yet substantial, they hold their crease from morning meetings all the way through dinner events.'
  },
  {
    name: 'Rohan Kapoor',
    role: 'Tech Entrepreneur, Gurgaon',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    product: 'Heavyweight Zip Overshirt',
    comment: 'Flawless minimal aesthetic. The Japanese YKK dual zippers glide like butter, and the garment-dyed wash gives it an understated vintage patina that turns heads.'
  },
  {
    name: 'Pooja Nambiar',
    role: 'Art Director, Chennai',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    product: 'Australian Merino Knit Sweater',
    comment: 'Superb softness without any itchiness. The ribbed cuffs and hem stay crisp throughout the day. It has become my go-to luxury essential for travel and studio days.'
  }
];

export function CustomerReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Update visible items count based on window viewport width
  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setVisibleCount(1);
        } else if (window.innerWidth < 1024) {
          setVisibleCount(2);
        } else {
          setVisibleCount(3);
        }
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount);

  // Keep index within bounds if window resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay slider: advance 1 by 1 every 4.5s
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section
      className="py-20 bg-zinc-50 border-t border-zinc-200/60 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> CLIENT PERSPECTIVES
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-zinc-950">
              Endorsed by Discerning Patrons
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-xl">
              Over 14,000+ verified orders delivered across 500+ Indian cities with a 4.9/5 overall rating.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="text-xs font-semibold text-zinc-400 mr-2 hidden sm:inline">
              <span className="text-zinc-950 font-bold">{currentIndex + 1}</span>
              {' '}/ {maxIndex + 1}
            </div>

            <button
              type="button"
              suppressHydrationWarning
              onClick={prevSlide}
              aria-label="Previous Testimonial"
              className="w-11 h-11 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-900 hover:bg-zinc-950 hover:text-white text-zinc-700 transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              suppressHydrationWarning
              onClick={nextSlide}
              aria-label="Next Testimonial"
              className="w-11 h-11 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-900 hover:bg-zinc-950 hover:text-white text-zinc-700 transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport (Shows 3 items on desktop, moves 1 by 1) */}
        <div
          className="relative overflow-hidden -mx-3"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
            }}
          >
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="shrink-0 px-3 transition-all duration-300"
                style={{
                  width: `${100 / visibleCount}%`
                }}
              >
                <div className="bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group h-full min-h-[320px]">
                  <Quote className="w-8 h-8 text-zinc-200 absolute top-6 right-6 pointer-events-none group-hover:text-amber-300 transition-colors" />

                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic mb-6">
                      &ldquo;{item.comment}&rdquo;
                    </p>
                  </div>

                  <div>
                    {/* Verified Product Badge */}
                    <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md inline-block mb-3 border border-amber-200/40">
                      Verified Buyer: {item.product}
                    </div>

                    {/* Author Meta */}
                    <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-zinc-950 flex items-center gap-1 truncate">
                          {item.name} <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 inline" />
                        </h4>
                        <p className="text-[11px] text-zinc-400 truncate">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              suppressHydrationWarning
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === dotIdx
                  ? 'w-8 h-2.5 bg-zinc-950'
                  : 'w-2.5 h-2.5 bg-zinc-300 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
