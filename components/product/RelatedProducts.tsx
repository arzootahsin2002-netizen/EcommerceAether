'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/shop/ProductCard';

interface RelatedProductsProps {
  currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const { products } = useApp();

  const related = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category || p.subcategory === currentProduct.subcategory)
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="my-16 pt-12 border-t border-zinc-200">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> CURATED COMPLEMENTS
          </div>
          <h3 className="text-2xl font-serif font-bold text-zinc-950">
            You May Also Admire
          </h3>
        </div>

        <Link
          href={`/shop?category=${currentProduct.category}`}
          className="text-xs font-bold text-zinc-900 hover:text-black flex items-center gap-1"
        >
          View More in {currentProduct.category} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
