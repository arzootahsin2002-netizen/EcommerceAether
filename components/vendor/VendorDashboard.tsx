'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Store,
  Package,
  ShoppingBag,
  TrendingUp,
  CreditCard,
  Settings,
  Plus,
  ArrowRight,
  ExternalLink,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  Sparkles,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Printer,
  Copy,
  LogOut,
  Building2,
  FileText,
  Trash2,
  Eye,
  Check,
  X
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/lib/types';

export function VendorDashboard() {
  const router = useRouter();
  const { products, addProduct, orders } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'inventory' | 'payouts' | 'settings'>('overview');
  const [vendorUser, setVendorUser] = useState<any>({
    storeName: 'Aether Atelier & Co.',
    ownerName: 'Raghav Kashyap',
    email: 'merchant@aether.store',
    gstin: '29AABCB1234D1Z5',
    availablePayout: 142850,
    escrowPayout: 28400,
    lifetimeEarnings: 1284900,
    rating: 4.9
  });

  // Modal States
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState<any | null>(null);

  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    brand: 'Aether Atelier',
    category: 'Fashion',
    subcategory: 'Hoodies & Sweatshirts',
    price: 2999,
    originalPrice: 4499,
    stock: 25,
    description: '',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop'
  });

  // Payout Transaction Ledger
  const [payoutsList, setPayoutsList] = useState([
    { id: 'PAY-8921', date: '25 Sep 2026', amount: 48500, status: 'Completed', utr: 'HDFC98214710', bank: 'HDFC Bank ••4892' },
    { id: 'PAY-8914', date: '18 Sep 2026', amount: 62100, status: 'Completed', utr: 'HDFC98142389', bank: 'HDFC Bank ••4892' },
    { id: 'PAY-8890', date: '11 Sep 2026', amount: 39400, status: 'Completed', utr: 'HDFC88901234', bank: 'HDFC Bank ••4892' }
  ]);

  // Load session from storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('aether_vendor_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setVendorUser((prev: any) => ({ ...prev, ...parsed }));
        } catch (e) {
          // fallback
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aether_vendor_session');
    }
    router.push('/vendor/login');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `prod-vnd-${Date.now()}`,
      slug: newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newProd.name,
      brand: newProd.brand,
      tagline: 'Crafted with premium materials by verified partner merchant',
      description: newProd.description || 'Exclusive luxury piece with tailored fit and timeless construction.',
      longDescription: 'Engineered with premium specifications and certified quality checks for discerning patrons.',
      price: Number(newProd.price),
      originalPrice: Number(newProd.originalPrice),
      discountPercentage: Math.round(((newProd.originalPrice - newProd.price) / newProd.originalPrice) * 100) || 0,
      category: newProd.category,
      subcategory: newProd.subcategory as any,
      gender: 'Unisex',
      images: [newProd.image],
      colors: [{ name: 'Default', hex: '#18181B', imageIndex: 0 }],
      sizes: ['S', 'M', 'L', 'XL'],
      materials: ['100% Certified Materials'],
      fabricCare: ['Gentle care recommended'],
      features: ['Artisan batch', 'Verified vendor authentic'],
      stock: Number(newProd.stock),
      rating: 5.0,
      reviewsCount: 1,
      sku: `VND-${Math.floor(1000 + Math.random() * 9000)}`,
      fit: 'Regular Fit',
      reviews: []
    };

    addProduct(created);
    setIsAddProductOpen(false);
    setNewProd({
      name: '',
      brand: 'Aether Atelier',
      category: 'Fashion',
      subcategory: 'Hoodies & Sweatshirts',
      price: 2999,
      originalPrice: 4499,
      stock: 25,
      description: '',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop'
    });
  };

  const handleRequestPayout = () => {
    if (vendorUser.availablePayout <= 0) return;
    const newPayout = {
      id: `PAY-${Math.floor(9000 + Math.random() * 1000)}`,
      date: 'Today, Just now',
      amount: vendorUser.availablePayout,
      status: 'Processing',
      utr: 'IMPS-PENDING-UTR',
      bank: 'HDFC Bank ••4892'
    };
    setPayoutsList([newPayout as any, ...payoutsList]);
    setVendorUser((prev: any) => ({ ...prev, availablePayout: 0 }));
    setPayoutSuccess(true);
    setTimeout(() => {
      setPayoutSuccess(false);
      setIsPayoutModalOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      
      {/* Top Vendor Header Bar */}
      <header className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-amber-400 text-zinc-950 rounded-xl flex items-center justify-center font-black text-base shadow-sm">
              Æ
            </div>
            <span className="font-serif font-bold text-lg hidden sm:inline">AETHER</span>
          </Link>
          <span className="text-zinc-600">/</span>
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider text-zinc-200">
              {vendorUser.storeName}
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 hidden sm:inline">
              KYC {vendorUser.kycStatus || 'Approved'}
            </span>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl hover:bg-zinc-800 transition-colors flex items-center gap-1.5 hidden sm:flex"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Buyer Store
          </Link>

          <button
            onClick={() => setIsAddProductOpen(true)}
            className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>

          <button
            onClick={handleLogout}
            className="p-2 text-zinc-400 hover:text-rose-400 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Log out of Vendor Portal"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8 border-b border-zinc-800/80">
          {[
            { id: 'overview', label: 'Overview & Metrics', icon: TrendingUp },
            { id: 'products', label: `Product Catalog (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'inventory', label: 'Inventory Matrix', icon: SlidersHorizontal },
            { id: 'payouts', label: 'Payouts & Settlements', icon: CreditCard },
            { id: 'settings', label: 'Store Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 shadow-md font-extrabold'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-850'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  <span>Gross Sales</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="my-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {formatPrice(vendorUser.lifetimeEarnings)}
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +24.8% from last month
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  <span>Available For Settlement</span>
                  <CreditCard className="w-4 h-4 text-amber-400" />
                </div>
                <div className="my-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-amber-400">
                    {formatPrice(vendorUser.availablePayout)}
                  </h3>
                  <button
                    onClick={() => setIsPayoutModalOpen(true)}
                    className="text-[11px] text-amber-300 hover:text-white font-bold underline mt-1 block"
                  >
                    Request Instant Payout →
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  <span>Active Catalog Items</span>
                  <Package className="w-4 h-4 text-blue-400" />
                </div>
                <div className="my-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">{products.length}</h3>
                  <span className="text-[11px] text-zinc-400 font-medium">All live on buyer marketplace</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  <span>Seller SLA Rating</span>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div className="my-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">4.92 ★</h3>
                  <span className="text-[11px] text-emerald-400 font-bold">99.4% On-Time Dispatch</span>
                </div>
              </div>
            </div>

            {/* Quick Overview Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recent Orders Processing */}
              <div className="lg:col-span-8 p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <h3 className="text-sm font-black text-white">Orders Requiring Dispatch</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-amber-400 hover:underline">
                    View All Orders
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-8 text-xs text-zinc-500">
                    No pending orders at this moment. You are all caught up!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-mono font-bold text-white">{ord.orderNumber}</p>
                          <p className="text-[11px] text-zinc-400">{ord.shippingAddress.fullName} • {ord.items.length} items</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-white block">{formatPrice(ord.pricing.total)}</span>
                          <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20 font-bold">
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Restock Alert Box */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Low Stock Alerts
                </h3>
                <div className="space-y-2.5">
                  {products.slice(0, 3).map((prod) => (
                    <div key={prod.id} className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-300 truncate max-w-[140px]">{prod.name}</span>
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md">
                        {prod.stock} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-xl font-bold text-white">Merchant Product Catalog</h2>
                <p className="text-xs text-zinc-400">Manage listings, edit retail prices, and update inventory availability.</p>
              </div>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2.5 bg-amber-400 text-zinc-950 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-md hover:bg-amber-300 transition-colors self-start cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Listing
              </button>
            </div>

            {/* Product Table */}
            <div className="rounded-3xl border border-zinc-800 overflow-hidden bg-zinc-900">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-3.5 px-4">Item Details</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Stock</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-850/50 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                            <Image src={p.images[0]} alt="" fill unoptimized className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-white line-clamp-1">{p.name}</p>
                            <span className="text-[10px] text-zinc-500 font-mono">SKU: {p.sku}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-zinc-300">{p.category}</td>
                        <td className="py-3 px-4 font-black text-white">{formatPrice(p.price)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${p.stock > 10 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Live on Store
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/product/${p.id}`}
                            target="_blank"
                            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 inline-flex items-center gap-1 text-xs"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="pb-4 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Order Processing & Dispatch Center</h2>
              <p className="text-xs text-zinc-400">Generate shipping labels, print tax invoices, and assign carrier tracking.</p>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900 border border-zinc-800 rounded-3xl">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">No Customer Orders Yet</h3>
                <p className="text-xs text-zinc-500 mt-1">Orders placed by customers will appear here for packing & shipping.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800 text-xs">
                      <div>
                        <span className="text-zinc-500">Order ID:</span> <strong className="font-mono text-white">{order.orderNumber}</strong>
                        <span className="mx-2 text-zinc-600">•</span>
                        <span className="text-zinc-400">{order.shippingAddress.fullName} ({order.shippingAddress.city}, {order.shippingAddress.state})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                          {order.status}
                        </span>
                        <button
                          onClick={() => setInvoiceOrder(order)}
                          className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" /> Print Invoice
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                              <Image src={it.product.images[0]} alt="" fill unoptimized className="object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-white">{it.product.name}</p>
                              <span className="text-[11px] text-zinc-400">{it.selectedSize} • {it.selectedColor} • Qty: {it.quantity}</span>
                            </div>
                          </div>
                          <span className="font-black text-white">{formatPrice(it.unitPrice * it.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="pb-4 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Inventory & Warehouse Stock Matrix</h2>
              <p className="text-xs text-zinc-400">Live warehouse stock counters with automated low-inventory alerts.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div key={prod.id} className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">{prod.category}</span>
                    <h3 className="text-xs font-bold text-white line-clamp-1 mt-0.5">{prod.name}</h3>
                    <p className="text-xs text-amber-400 font-bold mt-1">{formatPrice(prod.price)}</p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Current Stock:</span>
                    <span className="font-mono font-black text-white">{prod.stock} units</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PAYOUTS & SETTLEMENTS */}
        {activeTab === 'payouts' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="pb-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Merchant Payouts & Settlement Balance</h2>
                <p className="text-xs text-zinc-400">Daily bank transfers settled directly into your registered HDFC bank account.</p>
              </div>
              <button
                onClick={() => setIsPayoutModalOpen(true)}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <CreditCard className="w-4 h-4" /> Request Immediate Payout
              </button>
            </div>

            {/* Balances Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/20 via-zinc-900 to-zinc-900 border border-amber-500/30">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Available For Transfer</span>
                <h3 className="text-3xl font-black text-white mt-1">{formatPrice(vendorUser.availablePayout)}</h3>
                <p className="text-[11px] text-zinc-400 mt-2">Zero withdrawal fee on standard daily cycle.</p>
              </div>
              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Escrow / Pending Clearance</span>
                <h3 className="text-3xl font-black text-zinc-300 mt-1">{formatPrice(vendorUser.escrowPayout)}</h3>
                <p className="text-[11px] text-zinc-500 mt-2">Released 48h after confirmed doorstep delivery.</p>
              </div>
              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Lifetime Paid Out</span>
                <h3 className="text-3xl font-black text-emerald-400 mt-1">{formatPrice(vendorUser.lifetimeEarnings)}</h3>
                <p className="text-[11px] text-zinc-500 mt-2">Total settlements since store inception.</p>
              </div>
            </div>

            {/* Payout History Table */}
            <div className="rounded-3xl border border-zinc-800 overflow-hidden bg-zinc-900">
              <div className="p-4 border-b border-zinc-800">
                <h3 className="text-sm font-bold text-white">Settlement History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Payout ID</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Destination Bank</th>
                      <th className="py-3 px-4">UTR Number</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {payoutsList.map((pay) => (
                      <tr key={pay.id} className="hover:bg-zinc-850/50">
                        <td className="py-3 px-4 font-mono font-bold text-white">{pay.id}</td>
                        <td className="py-3 px-4 text-zinc-400">{pay.date}</td>
                        <td className="py-3 px-4 text-zinc-300">{pay.bank}</td>
                        <td className="py-3 px-4 font-mono text-zinc-400">{pay.utr}</td>
                        <td className="py-3 px-4 font-black text-white">{formatPrice(pay.amount)}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {pay.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn max-w-2xl">
            <div className="pb-4 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Merchant Profile & Settings</h2>
              <p className="text-xs text-zinc-400">Update store address, brand identity, and customer service email.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Store Display Name</label>
                <input
                  type="text"
                  defaultValue={vendorUser.storeName}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Registered GSTIN Number</label>
                <input
                  type="text"
                  disabled
                  defaultValue={vendorUser.gstin}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Merchant Support Email</label>
                <input
                  type="email"
                  defaultValue={vendorUser.email}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
                />
              </div>

              <button
                type="button"
                onClick={() => alert('Store settings successfully updated!')}
                className="px-6 py-2.5 bg-amber-400 text-zinc-950 rounded-xl text-xs font-black shadow-md hover:bg-amber-300"
              >
                Save Profile Changes
              </button>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 animate-scale">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" /> Add Product to Catalog
              </h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavyweight Cashmere Knit"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                  >
                    <option value="Fashion">Fashion</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Home">Home</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Sports">Sports</option>
                    <option value="Books">Books</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-300 block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs rounded-xl shadow-lg transition-all mt-2 cursor-pointer"
              >
                Publish to Live Buyer Store
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PAYOUT SETTLEMENT CONFIRMATION */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-sm w-full space-y-4 animate-scale">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" /> Instant Bank Settlement
            </h3>
            
            {payoutSuccess ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-1" />
                <p className="font-bold text-xs">Payout Initiated Successfully!</p>
                <p className="text-[10px] text-zinc-400">Transfer will reflect in HDFC Bank within 15 minutes.</p>
              </div>
            ) : (
              <>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Transfer <strong className="text-white font-black">{formatPrice(vendorUser.availablePayout)}</strong> directly to registered bank account <strong>HDFC Bank (••4892)</strong>?
                </p>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setIsPayoutModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:bg-zinc-800 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRequestPayout}
                    className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-black shadow-md cursor-pointer"
                  >
                    Confirm Transfer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: INVOICE PREVIEW MODAL */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-zinc-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-700">Official Tax Invoice</span>
                <h3 className="text-base font-bold text-zinc-950 font-mono">{invoiceOrder.orderNumber}</h3>
              </div>
              <button onClick={() => setInvoiceOrder(null)} className="text-zinc-400 hover:text-zinc-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">{vendorUser.storeName}</p>
                  <p className="text-zinc-500 font-mono text-[11px]">GSTIN: {vendorUser.gstin}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Ship To:</p>
                  <p className="text-zinc-600">{invoiceOrder.shippingAddress.fullName}</p>
                  <p className="text-zinc-500">{invoiceOrder.shippingAddress.city}, {invoiceOrder.shippingAddress.pincode}</p>
                </div>
              </div>

              <div className="divide-y divide-zinc-200 border-y border-zinc-200 py-2">
                {invoiceOrder.items.map((it: any, i: number) => (
                  <div key={i} className="py-1.5 flex justify-between">
                    <span>{it.product.name} (Qty: {it.quantity})</span>
                    <strong className="font-mono">{formatPrice(it.unitPrice * it.quantity)}</strong>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2 text-sm font-black">
                <span>Total Amount:</span>
                <span>{formatPrice(invoiceOrder.pricing.total)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Tax invoice printed.');
                setInvoiceOrder(null);
              }}
              className="w-full py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" /> Print Tax Invoice (PDF)
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
