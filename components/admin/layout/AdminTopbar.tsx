'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  Shield,
  Layers,
  LogOut,
  ChevronDown,
  X,
  ExternalLink,
  Store,
  Package,
  ShoppingBag,
  FolderTree,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAdmin } from '@/lib/admin/adminStore';

interface AdminTopbarProps {
  onToggleSidebar: () => void;
  isCollapsed: boolean;
}

export function AdminTopbar({ onToggleSidebar, isCollapsed }: AdminTopbarProps) {
  const router = useRouter();
  const {
    adminUser,
    logout,
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    globalSearchResults
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter((n) => !n.isRead);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const searchResults = globalSearchResults(searchQuery);
  const hasSearchResults =
    searchResults.products.length > 0 ||
    searchResults.vendors.length > 0 ||
    searchResults.customers.length > 0 ||
    searchResults.orders.length > 0 ||
    searchResults.categories.length > 0;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200/90 h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
      
      {/* Left: Sidebar Hamburger Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-zinc-600 hover:text-black rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Multi-Entity Search */}
        <div ref={searchRef} className="relative min-w-[260px] sm:min-w-[340px] md:min-w-[400px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, vendors, users, orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full pl-9 pr-8 py-2 bg-zinc-100/90 hover:bg-zinc-100 focus:bg-white text-xs font-medium text-zinc-900 placeholder:text-zinc-400 rounded-xl border border-transparent focus:border-zinc-300 focus:ring-2 focus:ring-zinc-100 outline-none transition-all"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Grouped Search Autocomplete Dropdown */}
          {isSearchFocused && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-200 p-4 z-50 max-h-[75vh] overflow-y-auto animate-fadeIn divide-y divide-zinc-100">
              {hasSearchResults ? (
                <div className="space-y-4">
                  {/* Vendors Group */}
                  {searchResults.vendors.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                        <Store className="w-3.5 h-3.5 text-amber-500" /> Vendors ({searchResults.vendors.length})
                      </div>
                      <div className="space-y-1">
                        {searchResults.vendors.map((v) => (
                          <Link
                            key={v.id}
                            href={`/admin/vendors/${v.id}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-50 transition-colors group text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                                <Image src={v.logo} alt="" fill unoptimized className="object-cover" />
                              </div>
                              <div>
                                <p className="font-bold text-zinc-900 group-hover:text-amber-600">{v.businessName}</p>
                                <p className="text-[10px] text-zinc-400">{v.vendorName} • {v.category}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-zinc-400">{v.vendorId}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Products Group */}
                  {searchResults.products.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                        <Package className="w-3.5 h-3.5 text-blue-500" /> Products ({searchResults.products.length})
                      </div>
                      <div className="space-y-1">
                        {searchResults.products.map((p) => (
                          <Link
                            key={p.id}
                            href="/admin/products"
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-50 transition-colors group text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                                <Image src={p.image} alt="" fill unoptimized className="object-cover" />
                              </div>
                              <div>
                                <p className="font-bold text-zinc-900 group-hover:text-blue-600 truncate max-w-[200px]">{p.name}</p>
                                <p className="text-[10px] text-zinc-400">{p.vendorName} • {p.category}</p>
                              </div>
                            </div>
                            <span className="font-bold text-zinc-950">₹{p.price}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Orders Group */}
                  {searchResults.orders.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                        <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" /> Orders ({searchResults.orders.length})
                      </div>
                      <div className="space-y-1">
                        {searchResults.orders.map((o) => (
                          <Link
                            key={o.id}
                            href="/admin/orders"
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-50 transition-colors group text-xs"
                          >
                            <div>
                              <p className="font-bold text-zinc-900 group-hover:text-emerald-600">{o.orderNumber}</p>
                              <p className="text-[10px] text-zinc-400">{o.customerName} • {o.orderStatus}</p>
                            </div>
                            <span className="font-bold text-zinc-950">₹{o.totalAmount}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Customers Group */}
                  {searchResults.customers.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                        <User className="w-3.5 h-3.5 text-purple-500" /> Users ({searchResults.customers.length})
                      </div>
                      <div className="space-y-1">
                        {searchResults.customers.map((c) => (
                          <Link
                            key={c.id}
                            href="/admin/users"
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-50 transition-colors group text-xs"
                          >
                            <div>
                              <p className="font-bold text-zinc-900 group-hover:text-purple-600">{c.name}</p>
                              <p className="text-[10px] text-zinc-400">{c.email} • {c.loyaltyTier}</p>
                            </div>
                            <span className="text-[10px] font-bold bg-zinc-100 px-2 py-0.5 rounded">{c.status}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-zinc-400">
                  No matching records found for &quot;{searchQuery}&quot;.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile Flyout */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* View Storefront Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:text-black hover:bg-zinc-50 transition-colors"
          title="Open Buyer Storefront"
        >
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          <span>Live Storefront</span>
        </Link>

        {/* Notifications Flyout */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2.5 text-zinc-600 hover:text-black rounded-full hover:bg-zinc-100 transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-scale">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-zinc-200 py-3 z-50 animate-fadeIn">
              <div className="px-4 pb-2.5 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">Notifications</h4>
                  <p className="text-[11px] text-zinc-400">{unreadNotifs.length} unread alerts</p>
                </div>
                {unreadNotifs.length > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-bold text-amber-600 hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-zinc-100 max-h-72 overflow-y-auto text-xs">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markNotificationAsRead(notif.id);
                      if (notif.actionUrl) {
                        router.push(notif.actionUrl);
                        setIsNotifOpen(false);
                      }
                    }}
                    className={`p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer flex items-start gap-3 ${
                      !notif.isRead ? 'bg-amber-50/40' : ''
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-amber-500" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-zinc-900">{notif.title}</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{notif.description}</p>
                      <span className="text-[10px] text-zinc-400 mt-1 block">{notif.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 px-4 border-t border-zinc-100 text-center">
                <Link
                  href="/admin/notifications"
                  onClick={() => setIsNotifOpen(false)}
                  className="text-xs font-bold text-zinc-900 hover:underline"
                >
                  View All Notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Flyout */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1.5 pl-2.5 pr-2 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-zinc-950 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {adminUser?.name ? adminUser.name[0] : 'A'}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xs font-bold text-zinc-900 block leading-tight">
                {adminUser?.name || 'Alexander S.'}
              </span>
              <span className="text-[10px] font-semibold text-amber-600 block leading-none">
                {adminUser?.role || 'Super Admin'}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-zinc-200 py-2.5 z-50 animate-fadeIn divide-y divide-zinc-100 text-xs">
              
              <div className="px-4 py-2">
                <p className="font-bold text-zinc-950">{adminUser?.name || 'Alexander Sterling'}</p>
                <p className="text-[11px] text-zinc-400">{adminUser?.email || 'admin@aether.market'}</p>
                <span className="inline-block mt-1 text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                  {adminUser?.role || 'Super Admin'}
                </span>
              </div>

              <div className="py-1">
                <Link
                  href="/admin/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black font-medium"
                >
                  <User className="w-4 h-4 text-zinc-500" />
                  <span>Admin Profile & Settings</span>
                </Link>
                <Link
                  href="/admin/roles"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black font-medium"
                >
                  <Shield className="w-4 h-4 text-zinc-500" />
                  <span>Roles & Permissions</span>
                </Link>
                <Link
                  href="/admin/activity"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black font-medium"
                >
                  <Layers className="w-4 h-4 text-zinc-500" />
                  <span>Activity Audit Log</span>
                </Link>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-rose-600 hover:bg-rose-50 font-bold transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>

    </header>
  );
}
