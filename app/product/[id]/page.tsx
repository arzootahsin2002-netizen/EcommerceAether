'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Home, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/store';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { FrequentlyBoughtTogether } from '@/components/product/FrequentlyBoughtTogether';
import { ProductTabs } from '@/components/product/ProductTabs';
import { ReviewsSection } from '@/components/product/ReviewsSection';
import { RelatedProducts } from '@/components/product/RelatedProducts';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const { products } = useApp();

  const product = products.find((p) => p.id === resolvedParams.id);

  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0]?.name || 'Standard'
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes[0] || 'M'
  );

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold font-serif text-zinc-950 mb-2">Garment Not Found</h2>
        <p className="text-xs text-zinc-500 mb-6">
          The requested garment might be sold out or archived.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-zinc-950 text-white rounded-full text-xs font-bold"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Get complement products for bundle
  const bundleItems = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  );

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8 overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-black flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-black">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/shop?subcategory=${encodeURIComponent(product.subcategory)}`} className="hover:text-black">
            {product.subcategory}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-900 font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Top Product Hero: Left Gallery + Right Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 sticky top-24">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          <div className="lg:col-span-5">
            <ProductInfo
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        <FrequentlyBoughtTogether
          currentProduct={product}
          bundleProducts={bundleItems}
        />

        {/* Detailed Tabs (Overview, Fabric & Care, Shipping, Authenticity) */}
        <ProductTabs product={product} />

        {/* Customer Reviews Section with Interactive Rating Submission */}
        <ReviewsSection product={product} />

        {/* Curated Recommendations */}
        <RelatedProducts currentProduct={product} />

      </div>
    </div>
  );
}
