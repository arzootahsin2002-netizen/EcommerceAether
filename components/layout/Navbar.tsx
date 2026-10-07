'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Package,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  Ticket,
  Zap,
  CreditCard,
  MapPin,
  Gift,
  Bell,
  Store,
  Headphones,
  Presentation
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { CategoryBar } from '@/components/layout/CategoryBar';
import { AdvertiseModal } from '@/components/layout/AdvertiseModal';

export function Navbar() {
  const router = useRouter();
  const { cartCount, wishlistCount, products, setIsCartDrawerOpen, user } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAdvertiseModalOpen, setIsAdvertiseModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside for search, account, and more popups
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for autocomplete
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchFocused(false);
    router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const trendingSearches = ['French Terry Hoodie', 'Linen Shirt', 'Wide Leg Trousers', 'Selvedge Denim', 'Wool Overcoat'];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-200' : 'bg-white border-b border-zinc-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            suppressHydrationWarning={true}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-700 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 bg-zinc-950 text-white rounded-xl flex items-center justify-center font-bold text-lg tracking-wider group-hover:bg-zinc-800 transition-colors shadow-sm">
              Æ
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-zinc-950 font-serif leading-none">
                AETHER
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-medium">
                Apparel & Co.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-zinc-700">
            <Link href="/shop?sale=true" className="px-3.5 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-semibold flex items-center gap-1.5 transition-colors">
              <Sparkles className="w-3.5 h-3.5" /> Festive Sale
            </Link>
          </nav>

          {/* Search Bar with Autocomplete suggestions */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-md hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                suppressHydrationWarning={true}
                placeholder="Search premium tees, hoodies, trousers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-10 py-2.5 bg-zinc-100/80 hover:bg-zinc-100 focus:bg-white text-sm text-zinc-900 placeholder:text-zinc-400 rounded-full border border-transparent focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 outline-none transition-all"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  suppressHydrationWarning={true}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-zinc-200 p-4 z-50 animate-fadeIn">
                {searchQuery.trim() ? (
                  <div>
                    <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Matching Products ({searchResults.length})
                    </div>
                    {searchResults.length > 0 ? (
                      <div className="space-y-2">
                        {searchResults.map((item) => (
                          <Link
                            key={item.id}
                            href={`/product/${item.id}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 transition-colors group"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 shrink-0 border border-zinc-100">
                              <Image
                                src={item.images[0]}
                                alt={item.name}
                                fill
                                unoptimized
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-zinc-900 truncate group-hover:text-amber-700 transition-colors">
                                {item.name}
                              </p>
                              <p className="text-xs text-zinc-500">
                                {item.category} • {item.subcategory}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold text-zinc-950">
                                {formatPrice(item.price)}
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="block text-[11px] text-zinc-400 line-through">
                                  {formatPrice(item.originalPrice)}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                        <button
                          type="button"
                          suppressHydrationWarning={true}
                          onClick={handleSearchSubmit}
                          className="w-full text-center py-2 mt-2 text-xs font-semibold text-zinc-900 hover:text-black bg-zinc-100 hover:bg-zinc-200/80 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          View all results for &quot;{searchQuery}&quot; <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="py-6 text-center text-sm text-zinc-500">
                        No products found for &quot;{searchQuery}&quot;. Try searching for &quot;Hoodie&quot; or &quot;Linen&quot;.
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-500" /> Trending Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {trendingSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          suppressHydrationWarning={true}
                          onClick={() => {
                            setSearchQuery(term);
                            router.push(`/shop?q=${encodeURIComponent(term)}`);
                            setIsSearchFocused(false);
                          }}
                          className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-xs font-medium text-zinc-700 hover:text-black rounded-lg transition-colors cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Mobile Search Button */}
            <Link
              href="/shop"
              className="md:hidden p-2 text-zinc-700 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>


            {/* Shopping Cart Drawer Trigger */}
            <button
              type="button"
              suppressHydrationWarning={true}
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 text-zinc-700 hover:text-black rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-950 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale">
                  {cartCount}
                </span>
              )}
            </button>

            {/* More Dropdown (Beside Cart) */}
            <div ref={moreRef} className="relative">
              <button
                type="button"
                suppressHydrationWarning={true}
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold text-zinc-700 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer group"
                aria-label="More Options"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isMoreOpen ? 'rotate-180 text-zinc-700' : ''}`} />
              </button>

              {/* More Dropdown Card matching Flipkart Spec */}
              {isMoreOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-zinc-200/90 py-2.5 z-50 animate-fadeIn">
                  <div className="px-4 py-1.5 text-sm font-bold text-zinc-900">
                    More
                  </div>
                  <div className="py-1 text-xs">
                    <Link
                      href="/vendor/register"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3.5 px-4 py-2.5 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors font-medium group"
                    >
                      <Store className="w-4 h-4 text-zinc-600 group-hover:text-amber-700 shrink-0" />
                      <span>Become a Seller</span>
                    </Link>
                    <Link
                      href="/account?tab=notifications"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3.5 px-4 py-2.5 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors font-medium group"
                    >
                      <Bell className="w-4 h-4 text-zinc-600 group-hover:text-blue-600 shrink-0" />
                      <span>Notification Settings</span>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3.5 px-4 py-2.5 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors font-medium group"
                    >
                      <Headphones className="w-4 h-4 text-zinc-600 group-hover:text-emerald-600 shrink-0" />
                      <span>24x7 Customer Care</span>
                    </Link>
                    <button
                      type="button"
                      suppressHydrationWarning={true}
                      onClick={() => {
                        setIsMoreOpen(false);
                        setIsAdvertiseModalOpen(true);
                      }}
                      className="w-full flex items-center gap-3.5 px-4 py-2.5 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors font-medium text-left cursor-pointer group"
                    >
                      <Presentation className="w-4 h-4 text-zinc-600 group-hover:text-purple-600 shrink-0" />
                      <span>Advertise on Aether</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Flyout */}
            <div ref={accountRef} className="relative">
              <button
                type="button"
                suppressHydrationWarning={true}
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 pr-2 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all cursor-pointer group"
                aria-label="Account Menu"
              >
                <div className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {user ? user.name[0] : 'U'}
                </div>
                <span className="text-xs font-medium text-zinc-800 hidden sm:inline max-w-[85px] truncate">
                  {user ? user.name.split(' ')[0] : 'Account'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isAccountOpen ? 'rotate-180 text-zinc-700' : ''}`} />
              </button>

              {/* Account Dropdown */}
              {isAccountOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-zinc-200/90 py-2.5 z-50 animate-fadeIn divide-y divide-zinc-100">
                  {/* Dropdown Header */}
                  <div className="px-4 py-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-zinc-900">
                        Your Account
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                        VIP Member
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-zinc-800 truncate mt-1">{user?.name || 'Valued Customer'}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{user?.email || 'customer@aether.store'}</p>
                  </div>

                  {/* Flipkart-Style Account Navigation List */}
                  <div className="py-1 text-xs">
                    <Link
                      href="/account?tab=profile"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors"
                    >
                      <User className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="font-medium">My Profile</span>
                    </Link>

                    <Link
                      href="/account?tab=orders"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Package className="w-4 h-4 text-zinc-500 shrink-0" />
                        <span className="font-medium">Orders</span>
                      </div>
                      {user && (
                        <span className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded-md font-medium">
                          Active
                        </span>
                      )}
                    </Link>

                    <Link
                      href="/account?tab=coupons"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Ticket className="w-4 h-4 text-zinc-500 shrink-0" />
                        <span className="font-medium">Coupons</span>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-md border border-emerald-200/50">
                        3 Offers
                      </span>
                    </Link>

                    <Link
                      href="/account?tab=supercoin"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-amber-500 shrink-0 fill-amber-500/20" />
                        <span className="font-medium">Supercoin</span>
                      </div>
                      <span className="text-[10px] bg-amber-50 text-amber-900 font-bold px-1.5 py-0.5 rounded-md border border-amber-200/50">
                        450 Coins
                      </span>
                    </Link>

                    <Link
                      href="/account?tab=payments"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors"
                    >
                      <CreditCard className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="font-medium">Saved Cards & Wallet</span>
                    </Link>

                    <Link
                      href="/account?tab=addresses"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="font-medium">Saved Addresses</span>
                    </Link>

                    <Link
                      href="/account?tab=wishlist"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="w-4 h-4 text-zinc-500 shrink-0" />
                        <span className="font-medium">Wishlist</span>
                      </div>
                      {wishlistCount > 0 && (
                        <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-1.5 py-0.5 rounded-full border border-rose-200/50">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      href="/account?tab=giftcards"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors"
                    >
                      <Gift className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="font-medium">Gift Cards</span>
                    </Link>

                    <Link
                      href="/account?tab=notifications"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4 text-zinc-500 shrink-0" />
                        <span className="font-medium">Notifications</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Flipkart-Style Horizontal Category Navigation Bar */}
      <CategoryBar />

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-18 bg-white border-b border-zinc-200 p-6 shadow-2xl z-50 animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="pb-3 border-b border-zinc-100">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Explore Categories</p>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                {[
                  { name: 'For You', href: '/shop?category=For+You' },
                  { name: 'Fashion', href: '/shop?category=Fashion' },
                  { name: 'Mobiles', href: '/shop?category=Mobiles' },
                  { name: 'Electronics', href: '/shop?category=Electronics' },
                  { name: 'Beauty', href: '/shop?category=Beauty' },
                  { name: 'Home', href: '/shop?category=Home' },
                  { name: 'Appliances', href: '/shop?category=Appliances' },
                  { name: 'Toys and Baby', href: '/shop?category=Toys+%26+Baby' },
                  { name: 'Sports', href: '/shop?category=Sports' },
                  { name: 'Furniture', href: '/shop?category=Furniture' },
                  { name: 'Books', href: '/shop?category=Books' },
                  { name: 'All Products', href: '/shop' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-900 truncate"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions & More Options */}
            <div className="space-y-2 pt-1">
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 text-white text-sm font-semibold"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> View Cart
                </span>
                <span>{cartCount} items</span>
              </Link>
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-100 text-zinc-900 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" /> Account & Orders
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>
              
              {/* More Menu Items for Mobile */}
              <div className="pt-2 pb-1">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">More Options</p>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  <Link
                    href="/vendor/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-medium"
                  >
                    <span className="flex items-center gap-2.5">
                      <Store className="w-4 h-4 text-amber-700" /> Become a Seller
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </Link>
                  <Link
                    href="/account?tab=notifications"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-medium"
                  >
                    <span className="flex items-center gap-2.5">
                      <Bell className="w-4 h-4 text-blue-600" /> Notification Settings
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-medium"
                  >
                    <span className="flex items-center gap-2.5">
                      <Headphones className="w-4 h-4 text-emerald-600" /> 24x7 Customer Care
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </Link>
                  <button
                    type="button"
                    suppressHydrationWarning={true}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAdvertiseModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-medium text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Presentation className="w-4 h-4 text-purple-600" /> Advertise on Aether
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                </div>
              </div>

              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-100 text-zinc-700 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Admin Panel
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Advertise Modal */}
      <AdvertiseModal
        isOpen={isAdvertiseModalOpen}
        onClose={() => setIsAdvertiseModalOpen(false)}
      />
    </header>
  );
}
