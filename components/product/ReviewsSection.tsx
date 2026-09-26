'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ThumbsUp, CheckCircle2, MessageSquarePlus, X, ShieldCheck } from 'lucide-react';
import { Product, Review } from '@/lib/types';
import { useApp } from '@/lib/store';

interface ReviewsSectionProps {
  product: Product;
}

export function ReviewsSection({ product }: ReviewsSectionProps) {
  const { addReview, user } = useApp();
  
  const [selectedFilterRating, setSelectedFilterRating] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Review form state
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formSize, setFormSize] = useState<string>(product.sizes[0] || 'M');
  const [formColor, setFormColor] = useState<string>(product.colors[0]?.name || 'Standard');

  // Rating distribution calculation
  const total = product.reviews.length || 1;
  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  product.reviews.forEach((r) => {
    ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1;
  });

  const filteredReviews = selectedFilterRating
    ? product.reviews.filter((r) => r.rating === selectedFilterRating)
    : product.reviews;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formComment.trim()) return;

    addReview(product.id, {
      userName: user?.name || 'Verified Customer',
      userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      rating: formRating,
      title: formTitle,
      comment: formComment,
      verifiedPurchase: true,
      helpfulCount: 0,
      sizePurchased: formSize,
      colorPurchased: formColor
    });

    setFormTitle('');
    setFormComment('');
    setIsModalOpen(false);
  };

  return (
    <section id="customer-reviews" className="my-16 scroll-mt-28">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
            AUTHENTIC EXPERIENCES
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-zinc-950">
            Customer Reviews & Ratings
          </h3>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl text-xs font-bold shadow-md transition-all self-start sm:self-auto cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" /> Write a Review
        </button>
      </div>

      {/* Review Summary Breakdown Box */}
      <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
        
        {/* Overall Score */}
        <div className="lg:col-span-4 text-center lg:text-left lg:border-r border-zinc-200/80 lg:pr-8">
          <div className="text-5xl font-black text-zinc-950 font-serif leading-none">
            {product.rating}
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-400 my-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-amber-400' : 'text-zinc-300'}`}
              />
            ))}
          </div>
          <p className="text-xs text-zinc-500 font-medium">
            Based on {product.reviewsCount} verified purchase ratings
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Verified Buyers
          </div>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="lg:col-span-8 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingCounts[stars] || 0;
            const percent = Math.round((count / total) * 100);
            return (
              <button
                key={stars}
                onClick={() =>
                  setSelectedFilterRating(selectedFilterRating === stars ? null : stars)
                }
                className={`w-full flex items-center gap-3 text-xs p-1.5 rounded-xl transition-colors text-left cursor-pointer ${
                  selectedFilterRating === stars ? 'bg-zinc-200/80 font-bold' : 'hover:bg-zinc-100'
                }`}
              >
                <span className="w-12 font-bold text-zinc-700 flex items-center gap-0.5">
                  {stars} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                </span>
                <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-10 text-right text-zinc-500">{percent}%</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Filter Chips if rating selected */}
      {selectedFilterRating && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-zinc-500">Filtered by:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 text-white text-xs font-bold">
            {selectedFilterRating} Star Reviews ({filteredReviews.length})
            <button onClick={() => setSelectedFilterRating(null)} className="hover:text-zinc-300">
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center text-xs text-zinc-500 bg-zinc-50 rounded-2xl">
            No reviews matching this specific star rating yet.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-7 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200">
                    <Image
                      src={
                        rev.userAvatar ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
                      }
                      alt={rev.userName}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-950 flex items-center gap-1.5">
                      {rev.userName}
                      {rev.verifiedPurchase && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Purchase
                        </span>
                      )}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                      <span>{rev.date}</span>
                      {rev.sizePurchased && <span>• Size: {rev.sizePurchased}</span>}
                      {rev.colorPurchased && <span>• Color: {rev.colorPurchased}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              <h5 className="text-sm font-bold text-zinc-950 pt-1">{rev.title}</h5>
              <p className="text-xs text-zinc-600 leading-relaxed">{rev.comment}</p>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Was this review helpful?</span>
                <button
                  onClick={() => {}}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition-colors"
                >
                  <ThumbsUp className="w-3 h-3" /> Helpful ({rev.helpfulCount})
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 z-10 border border-zinc-200 animate-scale">
              
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
                <h3 className="text-lg font-bold text-zinc-950">Write a Verified Review</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-black rounded-lg hover:bg-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating Selector */}
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-2">
                    Overall Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormRating(star)}
                        className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${star <= formRating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'}`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-zinc-800 ml-2">
                      {formRating === 5
                        ? 'Exceptional'
                        : formRating === 4
                        ? 'Very Good'
                        : formRating === 3
                        ? 'Average'
                        : 'Needs Improvement'}
                    </span>
                  </div>
                </div>

                {/* Size / Color purchased */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Size Ordered
                    </label>
                    <select
                      value={formSize}
                      onChange={(e) => setFormSize(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium"
                    >
                      {product.sizes.map((sz) => (
                        <option key={sz} value={sz}>{sz}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Color Ordered
                    </label>
                    <select
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium"
                    >
                      {product.colors.map((c) => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Headline */}
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Unbelievable 500 GSM weight & fit"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs outline-none focus:border-zinc-950"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Detailed Experience
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share details regarding fabric drape, softness, washing, and how the sizing fits you..."
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs outline-none focus:border-zinc-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </form>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
