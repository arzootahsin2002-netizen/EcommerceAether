'use client';

import React, { useState } from 'react';
import { ChevronDown, Truck, RotateCcw, Ruler, CreditCard } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Shipping & Delivery',
    question: 'How fast do you dispatch orders across India?',
    answer: 'Orders placed before 2:00 PM IST on weekdays are dispatched the very same day. Metro deliveries across Bengaluru, Mumbai, Delhi NCR, and Hyderabad typically arrive within 24 to 48 hours via BlueDart Air Priority.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'Is shipping completely free?',
    answer: 'Yes! We offer complimentary Express Air delivery on all orders above ₹1,999. For smaller orders under ₹1,999, a flat shipping fee of ₹99 is applied at checkout.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'How does the 7-day doorstep return process work?',
    answer: 'You have 7 days from the delivery date to initiate a return or size exchange directly from your account page. Our courier will come to your doorstep to pick up the garment with no return shipping fees deducted. Once picked up, refunds are processed instantly back to your original payment method or UPI ID.'
  },
  {
    category: 'Sizing & Fitting',
    question: 'Are your t-shirts and hoodies true to size or oversized?',
    answer: 'Our French Terry hoodies and 280 GSM tees are intentionally cut with a modern boxy/oversized drop-shoulder silhouette. If you prefer the relaxed aesthetic shown on our editorial models, order your usual size. If you desire a classic slim fit, order one size down.'
  },
  {
    category: 'Payments & Security',
    question: 'What payment methods do you support?',
    answer: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm, CRED), Visa, Mastercard, RuPay cards, Net Banking across 50+ banks, EMI on credit cards, and Cash on Delivery (COD) for eligible pincodes.'
  }
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-zinc-50/50 py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
            CLIENT CONCIERGE
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-zinc-950">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto">
            Everything you need to know about our luxury fabric weights, express dispatch, and doorstep returns.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
            <Truck className="w-5 h-5 text-amber-700 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-zinc-900">Shipping</h4>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
            <RotateCcw className="w-5 h-5 text-amber-700 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-zinc-900">7-Day Returns</h4>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
            <Ruler className="w-5 h-5 text-amber-700 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-zinc-900">Size Guides</h4>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
            <CreditCard className="w-5 h-5 text-amber-700 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-zinc-900">Payments & COD</h4>
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50/50 transition-colors"
                >
                  <span className="text-sm font-bold text-zinc-950">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
