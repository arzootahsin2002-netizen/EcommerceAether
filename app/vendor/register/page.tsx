'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Store,
  User,
  Mail,
  Smartphone,
  Lock,
  Building2,
  FileCheck,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  UploadCloud
} from 'lucide-react';

export default function VendorRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Owner
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    // Step 2: Store
    storeName: '',
    storeCategory: 'Fashion',
    storeSlug: '',
    storeBio: '',
    // Step 3: Tax & KYC
    businessType: 'Private Limited',
    gstin: '',
    pan: '',
    storeAddress: '',
    pincode: '',
    // Step 4: Bank
    bankAccountHolder: '',
    bankAccountNumber: '',
    bankIfsc: '',
    bankName: ''
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'storeName' && !prev.storeSlug) {
        updated.storeSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Final submit
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'aether_vendor_session',
            JSON.stringify({
              storeName: formData.storeName || 'Custom Luxury Atelier',
              ownerName: formData.ownerName || 'Merchant Partner',
              email: formData.email,
              phone: formData.phone,
              gstin: formData.gstin || '29AABCB1234D1Z5',
              kycStatus: 'Approved',
              role: 'vendor'
            })
          );
        }
        router.push('/vendor/dashboard');
      }, 1200);
    }
  };

  const stepsHeader = [
    { num: 1, label: 'Owner Info', icon: User },
    { num: 2, label: 'Brand Profile', icon: Store },
    { num: 3, label: 'Tax & KYC', icon: FileCheck },
    { num: 4, label: 'Payout Bank', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center relative z-10 mb-8">
        <Link href="/" className="inline-flex items-center gap-2 group mb-3">
          <div className="w-9 h-9 bg-amber-400 text-zinc-950 rounded-xl flex items-center justify-center font-black text-lg">
            Æ
          </div>
          <span className="font-serif font-black text-xl text-white">
            AETHER <span className="text-amber-400 text-xs font-sans font-bold uppercase ml-1 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">Merchant Onboarding</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
          Register Your Brand & Become a Partner
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Reach millions of luxury apparel & lifestyle buyers across India with zero upfront fees.
        </p>

        {/* Stepper Wizard */}
        <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">
          {stepsHeader.map((s) => {
            const Icon = s.icon;
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;

            return (
              <div key={s.num} className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-md'
                      : isCurrent
                      ? 'bg-amber-400 text-zinc-950 ring-4 ring-amber-400/20 shadow-lg scale-105'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-[10px] font-bold mt-2 truncate ${isCurrent ? 'text-amber-400' : 'text-zinc-500'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Registration Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl relative z-10">
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          <form onSubmit={handleNextStep} className="space-y-5">
            
            {/* STEP 1: OWNER & LOGIN DETAILS */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="pb-3 border-b border-zinc-800">
                  <h2 className="text-base font-bold text-white">Step 1: Primary Business Owner & Login</h2>
                  <p className="text-xs text-zinc-400">Enter the contact credentials of the authorized business signatory.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Owner / Signatory Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raghav Kashyap"
                      value={formData.ownerName}
                      onChange={(e) => updateField('ownerName', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Direct Mobile Contact</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Official Business Email</label>
                    <input
                      type="email"
                      required
                      placeholder="merchant@brand.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Choose Portal Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Minimum 8 characters"
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: STORE PROFILE */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="pb-3 border-b border-zinc-800">
                  <h2 className="text-base font-bold text-white">Step 2: Store & Brand Profile</h2>
                  <p className="text-xs text-zinc-400">How your luxury storefront will appear to buyers across India.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Store / Brand Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Atelier Sartoria"
                      value={formData.storeName}
                      onChange={(e) => updateField('storeName', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Primary Product Category</label>
                    <select
                      value={formData.storeCategory}
                      onChange={(e) => updateField('storeCategory', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                    >
                      <option value="Fashion">Fashion & Luxury Apparel</option>
                      <option value="Electronics">Electronics & Audio Tech</option>
                      <option value="Mobiles">Mobiles & Flagships</option>
                      <option value="Beauty">Beauty, Scents & Skincare</option>
                      <option value="Home">Home Decor & Artisan Ceramics</option>
                      <option value="Furniture">Luxury Furniture & Living</option>
                      <option value="Sports">Athletic Gear & Tennis</option>
                      <option value="Books">Art & Design Books</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Custom Brand URL Slug</label>
                  <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-400">
                    <span>aether.store/brand/</span>
                    <input
                      type="text"
                      required
                      placeholder="atelier-sartoria"
                      value={formData.storeSlug}
                      onChange={(e) => updateField('storeSlug', e.target.value)}
                      className="bg-transparent text-amber-400 outline-none flex-1 ml-1 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Store Bio & Heritage Description</label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe your craftsmanship, material provenance, or specialty..."
                    value={formData.storeBio}
                    onChange={(e) => updateField('storeBio', e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: TAX & LEGAL KYC */}
            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="pb-3 border-b border-zinc-800">
                  <h2 className="text-base font-bold text-white">Step 3: Tax Compliance & KYC Verification</h2>
                  <p className="text-xs text-zinc-400">Required by Indian GST regulations for automated tax invoicing.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Business Structure</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => updateField('businessType', e.target.value)}
                      className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                    >
                      <option value="Private Limited">Private Limited</option>
                      <option value="Sole Proprietorship">Sole Proprietorship</option>
                      <option value="LLP">LLP</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">15-Digit GSTIN Number</label>
                    <input
                      type="text"
                      required
                      placeholder="29AABCB1234D1Z5"
                      maxLength={15}
                      value={formData.gstin}
                      onChange={(e) => updateField('gstin', e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono uppercase focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Company / Owner PAN</label>
                    <input
                      type="text"
                      required
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      value={formData.pan}
                      onChange={(e) => updateField('pan', e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono uppercase focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Registered Warehouse / Dispatch Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Unit 402, Signature Industrial Estate, Mumbai"
                      value={formData.storeAddress}
                      onChange={(e) => updateField('storeAddress', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Pickup Pincode</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="400001"
                      value={formData.pincode}
                      onChange={(e) => updateField('pincode', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: BANK & PAYOUTS */}
            {step === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="pb-3 border-b border-zinc-800">
                  <h2 className="text-base font-bold text-white">Step 4: Bank Payout & Settlement Setup</h2>
                  <p className="text-xs text-zinc-400">All customer sales revenue will be settled daily into this verified account.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Bank Account Holder Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Atelier Sartoria Pvt Ltd"
                      value={formData.bankAccountHolder}
                      onChange={(e) => updateField('bankAccountHolder', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Bank Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HDFC Bank / ICICI Bank"
                      value={formData.bankName}
                      onChange={(e) => updateField('bankName', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Account Number</label>
                    <input
                      type="text"
                      required
                      placeholder="50200012345678"
                      value={formData.bankAccountNumber}
                      onChange={(e) => updateField('bankAccountNumber', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">11-Character IFSC Code</label>
                    <input
                      type="text"
                      required
                      maxLength={11}
                      placeholder="HDFC0001234"
                      value={formData.bankIfsc}
                      onChange={(e) => updateField('bankIfsc', e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono uppercase focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-200 text-xs flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Instant Penny Drop Verification Active</p>
                    <p className="text-[11px] text-amber-200/80 mt-0.5">We will test-deposit ₹1 to verify your account name matching before the first payout cycle.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between gap-3 border-t border-zinc-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              ) : (
                <Link
                  href="/vendor/login"
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Already have an account? <span className="text-amber-400 font-bold underline">Login</span>
                </Link>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg transition-all cursor-pointer ml-auto"
              >
                {isLoading ? (
                  <span>Creating Merchant Portal...</span>
                ) : step === 4 ? (
                  <>
                    <span>Complete Onboarding & Enter Dashboard</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Continue to Step {step + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
}
