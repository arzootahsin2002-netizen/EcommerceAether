'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Shield, Clock } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  tagline: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    badge: 'AUTUMN / WINTER 2026',
    title: 'Architectural Fabric. Minimalist Drape.',
    subtitle: '500 GSM Heavyweight French Terry & 100% Australian Merino Knits',
    tagline: 'Precision-tailored proportions designed for modern living.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'Explore Collection',
    ctaLink: '/shop?sort=newest',
    secondaryCtaText: 'Shop Best Sellers',
    secondaryCtaLink: '/shop?sort=rating'
  },
  {
    id: 2,
    badge: 'FESTIVE EDIT • UP TO 40% OFF',
    title: 'Pure Italian Linen & Selvedge Denim',
    subtitle: 'Woven on vintage shuttle looms in Okayama & certified European flax',
    tagline: 'Experience unparalleled breathability and organic texture.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'Shop Festive Deals',
    ctaLink: '/shop?sale=true',
    secondaryCtaText: 'Men’s Resort Edit',
    secondaryCtaLink: '/shop?category=Men'
  },
  {
    id: 3,
    badge: 'OUTERWEAR EXPEDITION',
    title: 'Cashmere-Wool Overcoats & 3-Layer Storm Shells',
    subtitle: '20,000mm waterproof techwear and double-faced Italian wool',
    tagline: 'Engineered for sub-zero elegance and urban monsoons.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'Shop Outerwear',
    ctaLink: '/shop?category=Outerwear',
    secondaryCtaText: 'Women’s Edition',
    secondaryCtaLink: '/shop?category=Women'
  }
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div
      className="relative bg-zinc-950 text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Overlay */}
      <div className="relative h-[560px] sm:h-[640px] lg:h-[700px] w-full">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              unoptimized
              priority={idx === 0}
              className="object-cover object-center scale-105 transition-transform duration-10000"
            />
            {/* Gradient Overlays for high-contrast luxury look */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />
          </div>
        ))}

        {/* Slide Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-2xl space-y-5 animate-fadeIn">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wider uppercase text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {slide.badge}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-[1.1] text-white">
              {slide.title}
            </h1>

            {/* Subtitle & Tagline */}
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl">
              {slide.subtitle}. <span className="text-zinc-400 hidden sm:inline">{slide.tagline}</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href={slide.ctaLink}
                className="px-7 py-3.5 bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm rounded-full flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all hover:scale-102 group cursor-pointer"
              >
                {slide.ctaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              {slide.secondaryCtaText && (
                <Link
                  href={slide.secondaryCtaLink || '/shop'}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-semibold text-sm rounded-full transition-all cursor-pointer"
                >
                  {slide.secondaryCtaText}
                </Link>
              )}
            </div>

            {/* Trust Pill Bar */}
            <div className="pt-6 flex flex-wrap items-center gap-4 text-xs text-zinc-400 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" /> 100% Authentic Long-Staple Fibers
              </span>
              <span className="hidden sm:inline text-zinc-600">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" /> Same-Day Dispatch Across India
              </span>
            </div>

          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="absolute right-6 sm:right-12 bottom-10 z-20 flex items-center gap-3">
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-1.5">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === i ? 'w-8 bg-white' : 'w-2 bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
