'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails list (vertical on desktop, horizontal on mobile) */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[580px] no-scrollbar shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative w-20 h-24 sm:w-22 sm:h-28 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
              selectedIndex === idx
                ? 'border-zinc-950 scale-102 shadow-md'
                : 'border-zinc-200/80 hover:border-zinc-400 opacity-75 hover:opacity-100'
            }`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              unoptimized
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image Stage with Hover Lens Zoom */}
      <div className="relative flex-1 aspect-[3/4] min-h-[460px] sm:min-h-[580px] max-h-[640px] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-sm group">
        <div
          className="relative w-full h-full cursor-crosshair min-h-[460px] sm:min-h-[580px]"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={images[selectedIndex] || images[0]}
            alt={productName}
            fill
            unoptimized
            priority
            className={`object-cover object-center transition-transform duration-200 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                  }
                : undefined
            }
          />
        </div>

        {/* Hover hint */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-zinc-700 shadow-md backdrop-blur-xs transition-transform hover:scale-110 cursor-pointer"
            title="Expand Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 z-10 bg-zinc-950/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Hover to zoom • Click to expand
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-zinc-900 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-zinc-900 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-4xl h-[80vh] aspect-[3/4]">
            <Image
              src={images[selectedIndex] || images[0]}
              alt={productName}
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${selectedIndex === i ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
