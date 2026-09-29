'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  ShieldCheck,
  Package,
  ShoppingBag,
  CreditCard,
  Percent,
  Users,
  UserCheck,
  FolderTree,
  Boxes,
  RotateCcw,
  Receipt,
  BadgePercent,
  Megaphone,
  BarChart3,
  Bell,
  Globe,
  UserCog,
  ShieldAlert,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useAdmin } from '@/lib/admin/adminStore';

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  badgeColor?: string;
  count?: number;
}

interface NavGroup {
  title: string;
  key?: string;
  items: NavItem[];
}

export function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout, notifications, vendors, products, orders } = useAdmin();

  // Calculate dynamic badge counts
  const pendingVendorsCount = vendors.filter((v) => v.verificationStatus === 'Pending' || v.verificationStatus === 'Under Review').length;
  const pendingProductsCount = products.filter((p) => p.approvalStatus === 'Pending Approval').length;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing').length;
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    marketplace: true,
    catalog: true,
    orders: true
  });

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navGroups: NavGroup[] = [
    {
      title: 'MAIN',
      items: [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'MARKETPLACE',
      key: 'marketplace',
      items: [
        { name: 'Vendors', href: '/admin/vendors', icon: Store, count: vendors.length },
        { name: 'Vendor Verification', href: '/admin/vendors/verification', icon: ShieldCheck, badge: pendingVendorsCount || 42, badgeColor: 'bg-amber-500' },
        { name: 'Vendor Payouts', href: '/admin/payouts', icon: CreditCard },
        { name: 'Commission Rates', href: '/admin/commission', icon: Percent }
      ]
    },
    {
      title: 'USERS & CUSTOMERS',
      key: 'users',
      items: [
        { name: 'Users Directory', href: '/admin/users', icon: Users },
        { name: 'User Verification', href: '/admin/users/verification', icon: UserCheck }
      ]
    },
    {
      title: 'CATALOG & INVENTORY',
      key: 'catalog',
      items: [
        { name: 'Products', href: '/admin/products', icon: Package, count: products.length },
        { name: 'Product Approval', href: '/admin/products/approval', icon: Boxes, badge: pendingProductsCount || 126, badgeColor: 'bg-amber-500' },
        { name: 'Categories', href: '/admin/categories', icon: FolderTree }
      ]
    },
    {
      title: 'ORDERS & FULFILLMENT',
      key: 'orders',
      items: [
        { name: 'All Orders', href: '/admin/orders', icon: ShoppingBag, badge: pendingOrdersCount || 128, badgeColor: 'bg-blue-600' },
        { name: 'Returns', href: '/admin/returns', icon: RotateCcw },
        { name: 'Refunds', href: '/admin/refunds', icon: Receipt }
      ]
    },
    {
      title: 'FINANCE & PAYMENTS',
      items: [
        { name: 'Transactions', href: '/admin/payments', icon: CreditCard }
      ]
    },
    {
      title: 'GROWTH & MARKETING',
      items: [
        { name: 'Coupons & Vouchers', href: '/admin/coupons', icon: BadgePercent },
        { name: 'Analytics & Reports', href: '/admin/analytics', icon: BarChart3 }
      ]
    },
    {
      title: 'COMMUNICATION & SITE',
      items: [
        { name: 'Notifications', href: '/admin/notifications', icon: Bell, badge: unreadNotifsCount, badgeColor: 'bg-rose-500' },
        { name: 'Website Curation', href: '/admin/website', icon: Globe }
      ]
    },
    {
      title: 'SYSTEM & RBAC',
      items: [
        { name: 'Admin Staff', href: '/admin/admin-users', icon: UserCog },
        { name: 'Roles & Permissions', href: '/admin/roles', icon: ShieldAlert },
        { name: 'Activity Audit Log', href: '/admin/activity', icon: Layers },
        { name: 'Settings', href: '/admin/settings', icon: Settings }
      ]
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-300 select-none">
      
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-zinc-900 shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-zinc-950 flex items-center justify-center font-black text-lg shadow-md group-hover:scale-105 transition-transform">
            D
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-serif font-black text-lg tracking-tight text-white leading-none">
                DRIBO
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-amber-400 font-extrabold mt-0.5">
                Marketplace Admin
              </span>
            </div>
          )}
        </Link>

        {/* Mobile close / desktop collapse button */}
        <button
          onClick={() => {
            if (isMobileOpen) {
              setIsMobileOpen(false);
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
          className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" />
          ) : isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Links Scroll Container */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                {group.title}
              </div>
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-zinc-950 font-black shadow-md'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-zinc-950' : 'text-zinc-400 group-hover:text-amber-400'}`} />
                      {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </div>

                    {!isCollapsed && item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                          isActive ? 'bg-zinc-950 text-white' : item.badgeColor || 'bg-amber-500'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {!isCollapsed && item.count !== undefined && (
                      <span className={`text-[10px] ${isActive ? 'text-zinc-950 font-bold' : 'text-zinc-600'}`}>
                        {item.count}
                      </span>
                    )}

                    {/* Tooltip in Collapsed Mode */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2.5 py-1 bg-zinc-900 text-white text-xs rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-zinc-800">
                        {item.name}
                        {item.badge ? ` (${item.badge})` : ''}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Area: View Storefront & Logout */}
      <div className="p-3 border-t border-zinc-900 space-y-1 shrink-0 bg-zinc-950/80">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-amber-400 hover:bg-zinc-900 rounded-xl transition-colors"
          title="Open Buyer Storefront in new tab"
        >
          <div className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-zinc-500" />
            {!isCollapsed && <span>View Buyer Store</span>}
          </div>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer"
          title="Sign out of Admin Dashboard"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span>Log Out</span>}
          </div>
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 border-r border-zinc-900 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs animate-fadeIn"
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slideInLeft">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
