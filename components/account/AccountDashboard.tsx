'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  Truck,
  CheckCircle2,
  Clock,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Plus,
  Ticket,
  Zap,
  Gift,
  Bell,
  User,
  Copy,
  Check,
  Wallet,
  Send,
  Tag,
  AlertCircle,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { ProductCard } from '@/components/shop/ProductCard';

interface AccountDashboardProps {
  initialTab?: string;
}

export function AccountDashboard({ initialTab = 'orders' }: AccountDashboardProps) {
  const { user, orders, wishlist, products, addresses, deleteAddress, addToCart } = useApp();
  
  // Normalize tab names (e.g. 'settings' -> 'profile')
  const normalizeTab = (tab: string) => {
    if (tab === 'settings') return 'profile';
    return tab;
  };

  const [activeTab, setActiveTab] = useState<string>(normalizeTab(initialTab));
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherPin, setVoucherPin] = useState('');
  const [voucherRedeemed, setVoucherRedeemed] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Sync tab with props when changed from URL
  useEffect(() => {
    if (initialTab) {
      setActiveTab(normalizeTab(initialTab));
    }
  }, [initialTab]);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  const couponsList = [
    {
      code: 'LUXE20',
      discount: '20% OFF',
      title: 'Luxury Capsule Discount',
      description: 'Applicable on all Outerwear & Tailored Jackets above ₹4,999.',
      validTill: '31 Oct 2026',
      badge: 'Bestseller Offer',
      minSpend: '₹4,999'
    },
    {
      code: 'AETHER1000',
      discount: 'FLAT ₹1,000 OFF',
      title: 'VIP Patron Appreciation',
      description: 'Instant discount on premium shirts, cashmere knits & trousers.',
      validTill: '15 Nov 2026',
      badge: 'VIP Exclusive',
      minSpend: '₹7,999'
    },
    {
      code: 'FIRSTVIP',
      discount: '15% OFF',
      title: 'New Season Welcome Gift',
      description: 'Valid across our entire 2026 Autumn-Winter ready-to-wear catalog.',
      validTill: '31 Dec 2026',
      badge: 'Universal',
      minSpend: '₹2,499'
    }
  ];

  const notificationsList = [
    {
      id: 1,
      title: 'Order Dispatched with BlueDart Express',
      description: 'Your package containing Italian Wool Overcoat (ORD-9824) is out for delivery.',
      time: '2 hours ago',
      type: 'order',
      isUnread: true
    },
    {
      id: 2,
      title: 'Supercoin Cashback Credited',
      description: '+120 Supercoins added to your account for your recent purchases.',
      time: 'Yesterday',
      type: 'coin',
      isUnread: true
    },
    {
      id: 3,
      title: 'Exclusive Drop: Autumn-Winter 2026',
      description: 'Early access now open for VIP Patrons. Limited hand-crafted units available.',
      time: '3 days ago',
      type: 'promo',
      isUnread: false
    },
    {
      id: 4,
      title: 'Price Drop Alert on Saved Item',
      description: 'Silk Evening Shirt in your wishlist just dropped by ₹1,200!',
      time: '5 days ago',
      type: 'wishlist',
      isUnread: false
    }
  ];

  const supercoinLedger = [
    { id: 1, title: 'Order #ORD-9824 Reward Points', change: '+120', date: '25 Sep 2026', type: 'credit' },
    { id: 2, title: 'VIP Account Verification Bonus', change: '+150', date: '20 Sep 2026', type: 'credit' },
    { id: 3, title: 'Seasonal Voucher Redemption', change: '-200', date: '12 Sep 2026', type: 'debit' },
    { id: 4, title: 'Review & Styling Photo Bonus', change: '+80', date: '05 Sep 2026', type: 'credit' }
  ];

  const navTabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'Orders & Tracking', icon: Package, count: orders.length },
    { id: 'coupons', label: 'Coupons', icon: Ticket, count: 3 },
    { id: 'supercoin', label: 'Supercoin', icon: Zap, count: '450' },
    { id: 'payments', label: 'Saved Cards & Wallet', icon: CreditCard },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
    { id: 'giftcards', label: 'Gift Cards', icon: Gift },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: 2 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Profile Header Card */}
      <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-zinc-800">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-zinc-800 border-2 border-amber-400/60 shadow-md shrink-0">
            <Image
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
              alt={user?.name || 'User'}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl font-bold font-serif text-white">{user?.name || 'Raghav Kapoor'}</h1>
              <span className="text-[10px] font-extrabold uppercase bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-md">
                VIP PATRON
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{user?.email || 'customer@aether.store'} • {user?.phone || '+91 98765 43210'}</p>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="flex items-center gap-4 sm:gap-6 text-center">
          <div className="bg-zinc-900/80 px-4 py-2.5 rounded-2xl border border-zinc-800">
            <span className="text-lg font-black text-white">{orders.length}</span>
            <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Orders</span>
          </div>
          <div className="bg-zinc-900/80 px-4 py-2.5 rounded-2xl border border-zinc-800">
            <span className="text-lg font-black text-amber-400 flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-amber-400" /> 450
            </span>
            <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Supercoins</span>
          </div>
          <div className="bg-zinc-900/80 px-4 py-2.5 rounded-2xl border border-zinc-800">
            <span className="text-lg font-black text-rose-400">{wishlist.length}</span>
            <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Tabs Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-zinc-200/80 p-3 shadow-xs space-y-1">
          <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-zinc-400">
            Account Management
          </div>
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-zinc-800 text-amber-300' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-xs">
          
          {/* TAB: MY PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100">
                <h2 className="text-xl font-bold text-zinc-950">My Profile & Preferences</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Manage your personal details, contact preferences, and luxury sizing profile.
                </p>
              </div>

              {/* VIP Membership Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 text-white border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Tier: Diamond VIP Patron
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-zinc-100">Free Express Delivery & Personal Concierge</p>
                  <p className="text-[11px] text-zinc-400">Enjoy 4x Supercoins on every transaction across our luxury catalog.</p>
                </div>
                <div className="px-3.5 py-1.5 bg-amber-500/20 border border-amber-400/40 rounded-xl text-center shrink-0">
                  <span className="block text-[10px] uppercase font-bold text-amber-300">Active Balance</span>
                  <span className="text-base font-black text-white">450 Supercoins</span>
                </div>
              </div>

              {/* Personal Details Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setProfileSaved(true);
                  setTimeout(() => setProfileSaved(false), 3000);
                }}
                className="space-y-4 max-w-xl"
              >
                {profileSaved && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profile preferences updated successfully!
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name || 'Raghav Kapoor'}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-zinc-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Gender</label>
                    <select
                      defaultValue="Male"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-zinc-900 outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-Binary">Non-Binary / Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      defaultValue={user?.email || 'customer@aether.store'}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-zinc-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Mobile Number</label>
                    <input
                      type="text"
                      defaultValue={user?.phone || '+91 98765 43210'}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-zinc-900 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Default Top Size</label>
                    <select
                      defaultValue="L"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-zinc-900 outline-none"
                    >
                      <option value="S">S (38)</option>
                      <option value="M">M (40)</option>
                      <option value="L">L (42)</option>
                      <option value="XL">XL (44)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">Waist Size</label>
                    <select
                      defaultValue="32"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-zinc-900 outline-none"
                    >
                      <option value="30">30 Inches</option>
                      <option value="32">32 Inches</option>
                      <option value="34">34 Inches</option>
                      <option value="36">36 Inches</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors shadow-xs"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-950">My Purchase History</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Track live deliveries, review past orders, and download receipts.
                  </p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3 text-zinc-400">
                    <Package className="w-8 h-8 stroke-1" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 mb-1">No Orders Placed Yet</h3>
                  <p className="text-xs text-zinc-500 mb-6">
                    Explore our curated catalog to begin building your luxury wardrobe capsule.
                  </p>
                  <Link
                    href="/shop"
                    className="px-6 py-2.5 bg-zinc-950 text-white text-xs font-bold rounded-full inline-flex items-center gap-2"
                  >
                    Explore Catalog <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-2xl border border-zinc-200 p-5 space-y-4 hover:border-zinc-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100 text-xs">
                        <div>
                          <span className="text-zinc-400">Order ID:</span>{' '}
                          <strong className="font-mono text-zinc-950">{order.orderNumber}</strong>
                          <span className="text-zinc-300 mx-2">•</span>
                          <span className="text-zinc-500">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60">
                            {order.status}
                          </span>
                          <span className="font-black text-zinc-950">
                            {formatPrice(order.pricing.total)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                                <Image src={item.product.images[0]} alt="" fill unoptimized className="object-cover" />
                              </div>
                              <div>
                                <h4 className="font-bold text-zinc-900">{item.product.name}</h4>
                                <p className="text-[11px] text-zinc-500">
                                  {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-zinc-950">
                              {formatPrice(item.unitPrice * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-zinc-100 bg-zinc-50/50 p-3.5 rounded-xl">
                        <div className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-2">
                          Carrier: {order.carrier} (AWB: <span className="font-mono">{order.trackingNumber}</span>)
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px]">
                          {order.timeline.map((ev, idx) => (
                            <div
                              key={idx}
                              className={`p-2 rounded-lg ${
                                ev.completed ? 'bg-zinc-900 text-white font-bold' : 'bg-zinc-100 text-zinc-400'
                              }`}
                            >
                              <div className="truncate">{ev.status}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-950">Coupons & Offers</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Available vouchers and promotional codes applicable on your next orders.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {couponsList.length} Active Vouchers
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {couponsList.map((cpn) => (
                  <div
                    key={cpn.code}
                    className="p-5 rounded-2xl border-2 border-dashed border-zinc-200 bg-gradient-to-br from-zinc-50/60 to-white relative flex flex-col justify-between hover:border-zinc-300 transition-all shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                          {cpn.badge}
                        </span>
                        <span className="text-[11px] font-bold text-zinc-500">
                          Expires: {cpn.validTill}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-zinc-900">{cpn.discount}</h3>
                      <h4 className="text-xs font-bold text-zinc-800 mt-0.5">{cpn.title}</h4>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{cpn.description}</p>
                      <p className="text-[11px] text-zinc-400 mt-2">Min order value: <strong className="text-zinc-700">{cpn.minSpend}</strong></p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between">
                      <div className="font-mono text-xs font-extrabold bg-zinc-100 text-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-200">
                        {cpn.code}
                      </div>
                      <button
                        onClick={() => handleCopyCoupon(cpn.code)}
                        className={`text-xs font-bold px-4 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                          copiedCoupon === cpn.code
                            ? 'bg-emerald-600 text-white'
                            : 'bg-zinc-900 text-white hover:bg-zinc-800'
                        }`}
                      >
                        {copiedCoupon === cpn.code ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy Code
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SUPERCOIN */}
          {activeTab === 'supercoin' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100">
                <h2 className="text-xl font-bold text-zinc-950">Supercoin Rewards</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Earn 4 Supercoins for every ₹100 spent. Redeem coins for instant cart discounts.
                </p>
              </div>

              {/* Supercoin Highlight Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-100 block mb-1">
                      Available Supercoins Balance
                    </span>
                    <div className="flex items-center gap-3">
                      <Zap className="w-10 h-10 fill-white text-white drop-shadow-sm" />
                      <span className="text-4xl font-black tracking-tight">450</span>
                    </div>
                    <p className="text-xs text-amber-100 mt-2">
                      Equivalent Value: <strong>₹450 Discount</strong> at checkout
                    </p>
                  </div>

                  <div className="bg-amber-900/40 backdrop-blur-xs p-4 rounded-2xl border border-amber-300/30 text-xs space-y-1.5">
                    <p className="font-bold text-amber-100">VIP Earning Multiplier</p>
                    <p className="text-amber-200 text-[11px]">4 Coins / ₹100 on all luxury purchases</p>
                    <Link
                      href="/shop"
                      className="mt-2 inline-flex items-center gap-1 bg-white text-amber-900 px-3 py-1.5 rounded-xl font-bold text-[11px] hover:bg-amber-50 transition-colors"
                    >
                      Shop & Earn Coins <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Coin Activity History */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-zinc-900">Coin Activity History</h3>
                <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden">
                  {supercoinLedger.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between text-xs hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          item.type === 'credit' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900">{item.title}</p>
                          <p className="text-[11px] text-zinc-400">{item.date}</p>
                        </div>
                      </div>
                      <span className={`font-black text-sm ${
                        item.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {item.change} Coins
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: SAVED CARDS & WALLET */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100">
                <h2 className="text-xl font-bold text-zinc-950">Saved Cards & Wallet</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Manage digital wallet balance, saved credit/debit cards, and verified UPI handles.
                </p>
              </div>

              {/* Wallet Balance Widget */}
              <div className="p-5 rounded-2xl bg-zinc-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-amber-400">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Aether Wallet</span>
                    <h3 className="text-2xl font-black text-white">₹1,500.00</h3>
                    <p className="text-[11px] text-zinc-400">Usable for 1-click seamless checkout</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Add money to wallet: gateway modal')}
                  className="px-4 py-2 bg-amber-500 text-zinc-950 rounded-xl text-xs font-bold hover:bg-amber-400 transition-colors shrink-0"
                >
                  + Add Balance
                </button>
              </div>

              {/* Saved Cards */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-zinc-900">Saved Cards</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-amber-700" />
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">HDFC Millennia Credit Card</h4>
                        <p className="text-[11px] text-zinc-500 font-mono">•••• •••• •••• 4892 (08/28)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                      Primary
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-zinc-600" />
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">ICICI Amazon Pay Card</h4>
                        <p className="text-[11px] text-zinc-500 font-mono">•••• •••• •••• 1049 (11/27)</p>
                      </div>
                    </div>
                    <button className="text-[11px] text-zinc-400 hover:text-rose-600">Remove</button>
                  </div>
                </div>
              </div>

              {/* Saved UPI IDs */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-zinc-900">Verified UPI Handles</h3>
                <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 flex items-center justify-between max-w-md">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-zinc-600" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Google Pay UPI</h4>
                      <p className="text-[11px] text-zinc-500 font-mono">raghavk@okhdfcbank</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200/60">Verified</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-950">Saved Shipping Addresses</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Manage delivery locations for 1-click doorstep delivery.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-zinc-950">{addr.fullName}</span>
                        <span className="text-[10px] font-bold uppercase bg-zinc-200 px-2 py-0.5 rounded text-zinc-700">
                          {addr.addressType}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {addr.streetAddress}, {addr.apartment && `${addr.apartment}, `}
                        {addr.city}, {addr.state} - <strong className="font-mono">{addr.pincode}</strong>
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">Phone: {addr.phone}</p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-zinc-200/60 flex items-center justify-between">
                      {addr.isDefault ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                          Default Address
                        </span>
                      ) : (
                        <span />
                      )}
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-xs text-zinc-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100">
                <h2 className="text-xl font-bold text-zinc-950">Saved Wishlist ({wishlist.length})</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Garments you have bookmarked for future acquisition.
                </p>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-zinc-900">Your Wishlist is Empty</h3>
                  <p className="text-xs text-zinc-500 mt-1 mb-4">
                    Click the heart icon on any product card to save it here.
                  </p>
                  <Link
                    href="/shop"
                    className="px-6 py-2.5 bg-zinc-950 text-white text-xs font-bold rounded-full inline-block"
                  >
                    Browse Catalog
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: GIFT CARDS */}
          {activeTab === 'giftcards' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100">
                <h2 className="text-xl font-bold text-zinc-950">Gift Cards & Vouchers</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Redeem digital gift cards directly into your shopping wallet or gift them to loved ones.
                </p>
              </div>

              {/* Gift card balance hero */}
              <div className="p-6 rounded-3xl bg-zinc-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-zinc-800 shadow-xl">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Redeemed Gift Card Balance
                  </span>
                  <div className="text-3xl font-black text-white">
                    {voucherRedeemed ? '₹5,000.00' : '₹2,500.00'}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">No expiry date on redeemed gift vouchers.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Gift className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Redeem Card Form */}
              <div className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 space-y-4 max-w-lg">
                <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-600" /> Have a Gift Card? Redeem It Here
                </h3>
                {voucherRedeemed && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Voucher of ₹2,500 successfully added to your balance!
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-700 block mb-1">Card Number (16 Digits)</label>
                    <input
                      type="text"
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-700 block mb-1">6-Digit PIN</label>
                    <input
                      type="password"
                      placeholder="••••••"
                      maxLength={6}
                      value={voucherPin}
                      onChange={(e) => setVoucherPin(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (voucherCode.length > 0) {
                      setVoucherRedeemed(true);
                      setVoucherCode('');
                      setVoucherPin('');
                    } else {
                      alert('Please enter a valid gift card number.');
                    }
                  }}
                  className="px-5 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Redeem to Account Balance
                </button>
              </div>
            </div>
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zinc-950">Notifications & Alerts</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Stay informed on order shipments, Supercoin bonuses, and private collection releases.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('All notifications marked as read')}
                  className="text-xs font-semibold text-zinc-500 hover:text-zinc-900"
                >
                  Mark All as Read
                </button>
              </div>

              <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden">
                {notificationsList.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors ${
                      item.isUnread ? 'bg-zinc-50/80' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                        item.type === 'order' ? 'bg-blue-50 text-blue-600' :
                        item.type === 'coin' ? 'bg-amber-50 text-amber-600' :
                        item.type === 'wishlist' ? 'bg-rose-50 text-rose-600' :
                        'bg-zinc-100 text-zinc-700'
                      }`}>
                        {item.type === 'order' && <Package className="w-4 h-4" />}
                        {item.type === 'coin' && <Zap className="w-4 h-4" />}
                        {item.type === 'wishlist' && <Heart className="w-4 h-4" />}
                        {item.type === 'promo' && <Sparkles className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-zinc-900">{item.title}</h4>
                          {item.isUnread && (
                            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{item.description}</p>
                        <span className="text-[10px] text-zinc-400 mt-2 block">{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
