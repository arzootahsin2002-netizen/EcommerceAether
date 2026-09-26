'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ContactPage() {
  const { showToast } = useApp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Order & Sizing Assistance',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast({
      title: 'Message Transmitted',
      message: 'A dedicated concierge specialist will respond within 4 hours.',
      type: 'success'
    });
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
            CONCIERGE SERVICES
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-zinc-950">
            Connect with Our Atelier
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            For bespoke styling consultations, order assistance, or wholesale inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-4">
              <h3 className="text-base font-bold text-zinc-950">Design Studio & Headquarters</h3>
              
              <div className="space-y-4 text-xs text-zinc-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 block">Aether Studio Bengaluru</strong>
                    <span>12th Main Road, Indiranagar, Bengaluru, Karnataka 560038</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 block">Electronic Dispatch</strong>
                    <span>concierge@aetherapparel.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 block">Direct Telephone Concierge</strong>
                    <span>+91 (80) 4921-9900 (Mon - Sat, 10 AM - 7 PM IST)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 block">Live Chat Support</strong>
                    <span>Available 7 days a week with instant order tracking response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-xs">
            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 animate-scale">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold">Your Inquiry Has Been Received</h3>
                <p className="text-xs text-emerald-800">
                  Thank you for reaching out. A dedicated styling and fulfillment concierge will contact you via email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raghav Kashyap"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-950"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-zinc-700 block mb-1">Inquiry Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-medium"
                  >
                    <option value="Order & Sizing Assistance">Order & Sizing Assistance</option>
                    <option value="Return / Exchange Request">Return / Exchange Request</option>
                    <option value="Custom Tailoring Consultation">Custom Tailoring Consultation</option>
                    <option value="Press & Partnership">Press & Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-zinc-700 block mb-1">Detailed Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="How may our concierge assist your wardrobe requirements today?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Send Message to Concierge
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
