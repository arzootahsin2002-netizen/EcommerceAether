'use client';

import React, { useState } from 'react';
import {
  Settings,
  Building2,
  CreditCard,
  Truck,
  ShieldCheck,
  Mail,
  Bell,
  Save,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'business' | 'payment' | 'shipping' | 'security'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [marketName, setMarketName] = useState('DRIBO Marketplace');
  const [supportEmail, setSupportEmail] = useState('support@dribo.market');
  const [legalEntity, setLegalEntity] = useState('Dribo Marketplace Technologies India Private Limited');
  const [gstin, setGstin] = useState('29AABCD9876E1Z4');
  const [razorpayKey, setRazorpayKey] = useState('rzp_live_98471092481');
  const [stripeKey, setStripeKey] = useState('pk_live_51M892184910284');
  const [twoFactorEnforced, setTwoFactorEnforced] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const tabs = [
    { id: 'general', label: 'General & Store', icon: Settings },
    { id: 'business', label: 'Legal & Tax Details', icon: Building2 },
    { id: 'payment', label: 'Payment Gateways', icon: CreditCard },
    { id: 'shipping', label: 'Shipping Logistics', icon: Truck },
    { id: 'security', label: 'Security & 2FA', icon: ShieldCheck }
  ];

  return (
    <AdminLayout
      title="Platform Settings & Configuration"
      subtitle="Configure master marketplace parameters, legal GSTIN identity, payment gateways, and security policies."
    >
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Platform configuration settings updated successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Settings Tab Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-zinc-200/90 p-3 shadow-xs space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content Area */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* GENERAL TAB */}
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-zinc-100">
                  <h3 className="text-base font-bold font-serif text-zinc-950">General Marketplace Settings</h3>
                  <p className="text-xs text-zinc-400">Master branding and communication coordinates</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Marketplace Public Name</label>
                    <input
                      type="text"
                      value={marketName}
                      onChange={(e) => setMarketName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Customer Support Email</label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* BUSINESS TAB */}
            {activeTab === 'business' && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-zinc-100">
                  <h3 className="text-base font-bold font-serif text-zinc-950">Legal Entity & Tax Compliance</h3>
                  <p className="text-xs text-zinc-400">Corporate registration and government GST compliance numbers</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="font-bold text-zinc-700 block mb-1">Registered Corporate Entity Name</label>
                    <input
                      type="text"
                      value={legalEntity}
                      onChange={(e) => setLegalEntity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-medium focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Master Marketplace GSTIN</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-mono font-bold focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">TDS / TCS Withholding Percentage</label>
                    <input
                      type="text"
                      defaultValue="1.0% under Section 194-O (Income Tax Act)"
                      disabled
                      className="w-full px-3.5 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-500 font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PAYMENT TAB */}
            {activeTab === 'payment' && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-zinc-100">
                  <h3 className="text-base font-bold font-serif text-zinc-950">Payment Gateways & Webhook Keys</h3>
                  <p className="text-xs text-zinc-400">Production API keys for card, netbanking, and UPI processing</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Razorpay Live Key ID</label>
                    <input
                      type="text"
                      value={razorpayKey}
                      onChange={(e) => setRazorpayKey(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-mono text-xs focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-zinc-700 block mb-1">Stripe Publishable Key</label>
                    <input
                      type="text"
                      value={stripeKey}
                      onChange={(e) => setStripeKey(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-mono text-xs focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SHIPPING TAB */}
            {activeTab === 'shipping' && (
              <div className="space-y-4 text-xs">
                <div className="pb-3 border-b border-zinc-100">
                  <h3 className="text-base font-bold font-serif text-zinc-950">Logistics & Carrier Partners</h3>
                  <p className="text-xs text-zinc-400">Integrated carrier APIs for automated AWB generation</p>
                </div>

                <div className="space-y-2">
                  {[
                    { name: 'BlueDart Express API', active: true, desc: 'Surface & Air express door delivery across 28,000+ pincodes.' },
                    { name: 'Delhivery Surface Logistics', active: true, desc: 'Heavy and large parcel fulfillment integration.' },
                    { name: 'Shadowfax Hyperlocal Express', active: false, desc: 'Same-day 4-hour metro delivery routing.' }
                  ].map((car, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-zinc-900">{car.name}</h4>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{car.desc}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${car.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-zinc-200 text-zinc-600'}`}>
                        {car.active ? 'Connected' : 'Disabled'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-4 text-xs">
                <div className="pb-3 border-b border-zinc-100">
                  <h3 className="text-base font-bold font-serif text-zinc-950">Security & Access Policy</h3>
                  <p className="text-xs text-zinc-400">Administrator session timeouts and two-factor enforcement</p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactorEnforced}
                      onChange={(e) => setTwoFactorEnforced(e.target.checked)}
                      className="w-4 h-4 rounded text-zinc-950 mt-0.5 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-zinc-950 block">Enforce 2FA on All Administrator Accounts</span>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        Requires OTP/Authenticator token before accessing the DRIBO admin dashboard.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-zinc-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Save Platform Settings
              </button>
            </div>

          </form>
        </div>

      </div>
    </AdminLayout>
  );
}
