'use client';

import React, { useState, useEffect } from 'react';
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
  ExternalLink,
  ChevronUp
} from 'lucide-react';
import { useAdmin } from '@/lib/admin/adminStore';

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

interface SubMenuItem {
  name: string;
  href: string;
  badge?: number;
  badgeColor?: string;
}

interface NavItem {
  id: string;
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  badgeColor?: string;
  count?: number;
  children?: SubMenuItem[];
}

interface NavGroup {
  title: string;
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

  // Dynamic badge counts
  const pendingVendorsCount = vendors.filter(
    (v) => v.verificationStatus === 'Pending' || v.verificationStatus === 'Under Review'
  ).length;
  const pendingProductsCount = products.filter(
    (p) => p.approvalStatus === 'Pending Approval'
  ).length;
  const pendingOrdersCount = orders.filter(
    (o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing'
  ).length;
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  const navGroups: NavGroup[] = [
    {
      title: 'MAIN',
      items: [
        {
          id: 'dashboard',
          name: 'Dashboard',
          href: '/admin/dashboard',
          icon: LayoutDashboard
        }
      ]
    },
    {
      title: 'MARKETPLACE',
      items: [
        {
          id: 'vendors',
          name: 'Vendors',
          icon: Store,
          badge: pendingVendorsCount > 0 ? pendingVendorsCount : undefined,
          badgeColor: 'bg-amber-500',
          children: [
            { name: 'All Vendors', href: '/admin/vendors' },
            {
              name: 'Vendor Verification',
              href: '/admin/vendors/verification',
              badge: pendingVendorsCount || 42,
              badgeColor: 'bg-amber-500'
            },
            { name: 'Vendor Payouts', href: '/admin/payouts' },
            { name: 'Commission Rates', href: '/admin/commission' }
          ]
        },
        {
          id: 'users',
          name: 'Users & Customers',
          icon: Users,
          children: [
            { name: 'Users Directory', href: '/admin/users' },
            { name: 'User Verification', href: '/admin/users/verification' }
          ]
        }
      ]
    },
    {
      title: 'CATALOG & ORDERS',
      items: [
        {
          id: 'catalog',
          name: 'Products & Catalog',
          icon: Package,
          badge: pendingProductsCount > 0 ? pendingProductsCount : undefined,
          badgeColor: 'bg-amber-500',
          children: [
            { name: 'All Products', href: '/admin/products' },
            {
              name: 'Product Approval',
              href: '/admin/products/approval',
              badge: pendingProductsCount || 126,
              badgeColor: 'bg-amber-500'
            },
            { name: 'Categories', href: '/admin/categories' }
          ]
        },
        {
          id: 'orders',
          name: 'Orders & Logistics',
          icon: ShoppingBag,
          badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
          badgeColor: 'bg-blue-600',
          children: [
            {
              name: 'All Orders',
              href: '/admin/orders',
              badge: pendingOrdersCount || 128,
              badgeColor: 'bg-blue-600'
            },
            { name: 'Returns & QC', href: '/admin/returns' },
            { name: 'Refunds Ledger', href: '/admin/refunds' }
          ]
        }
      ]
    },
    {
      title: 'FINANCE & MARKETING',
      items: [
        {
          id: 'finance',
          name: 'Finance & Payments',
          icon: CreditCard,
          children: [
            { name: 'Transactions', href: '/admin/payments' },
            { name: 'Vendor Payouts', href: '/admin/payouts' },
            { name: 'Platform Commission', href: '/admin/commission' }
          ]
        },
        {
          id: 'marketing',
          name: 'Marketing & Reports',
          icon: BadgePercent,
          children: [
            { name: 'Coupons & Vouchers', href: '/admin/coupons' },
            { name: 'Analytics & BI', href: '/admin/analytics' }
          ]
        }
      ]
    },
    {
      title: 'SYSTEM & SETTINGS',
      items: [
        {
          id: 'communication',
          name: 'Communication & Site',
          icon: Globe,
          badge: unreadNotifsCount > 0 ? unreadNotifsCount : undefined,
          badgeColor: 'bg-rose-500',
          children: [
            {
              name: 'Notifications',
              href: '/admin/notifications',
              badge: unreadNotifsCount,
              badgeColor: 'bg-rose-500'
            },
            { name: 'Website Curation', href: '/admin/website' }
          ]
        },
        {
          id: 'system',
          name: 'System & RBAC',
          icon: ShieldAlert,
          children: [
            { name: 'Admin Staff', href: '/admin/admin-users' },
            { name: 'Roles & Permissions', href: '/admin/roles' },
            { name: 'Activity Audit Log', href: '/admin/activity' },
            { name: 'Platform Settings', href: '/admin/settings' }
          ]
        }
      ]
    }
  ];

  // Initialize open submenus based on current active route
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {
      vendors: true,
      catalog: true,
      orders: true
    };
    return initial;
  });

  // Automatically expand dropdown if navigating to a child page
  useEffect(() => {
    navGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.children) {
          const hasActiveChild = item.children.some(
            (child) => pathname === child.href || pathname.startsWith(child.href + '/')
          );
          if (hasActiveChild) {
            setOpenMenus((prev) => ({ ...prev, [item.id]: true }));
          }
        }
      });
    });
  }, [pathname]);

  const toggleMenu = (id: string) => {
    if (isCollapsed) {
      // If collapsed, expand sidebar first so submenus become accessible
      setIsCollapsed(false);
    }
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-300 select-none border-r border-zinc-900">
      
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-zinc-900 shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-zinc-950 flex items-center justify-center font-black text-lg shadow-md group-hover:scale-105 transition-transform shrink-0">
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
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-zinc-800">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                {group.title}
              </div>
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isOpen = Boolean(openMenus[item.id]);

                // Check if any child is active
                const isChildActive =
                  hasChildren &&
                  item.children?.some(
                    (child) => pathname === child.href || pathname.startsWith(child.href + '/')
                  );

                // Check if direct link is active
                const isDirectActive = item.href ? pathname === item.href : false;

                if (!hasChildren && item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative cursor-pointer ${
                        isDirectActive
                          ? 'bg-amber-400 text-zinc-950 font-black shadow-md'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                      }`}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isDirectActive ? 'text-zinc-950' : 'text-zinc-400 group-hover:text-amber-400'
                          }`}
                        />
                        {!isCollapsed && <span className="truncate">{item.name}</span>}
                      </div>

                      {!isCollapsed && item.badge !== undefined && item.badge > 0 && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                            isDirectActive ? 'bg-zinc-950 text-white' : item.badgeColor || 'bg-amber-500'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* Tooltip in Collapsed Mode */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2.5 py-1 bg-zinc-900 text-white text-xs rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-zinc-800">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  );
                }

                return (
                  <div key={item.id} className="space-y-0.5">
                    {/* Expandable Parent Button */}
                    <button
                      type="button"
                      onClick={() => toggleMenu(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative cursor-pointer ${
                        isChildActive
                          ? 'bg-zinc-900 text-white font-bold'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/70'
                      }`}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isChildActive ? 'text-amber-400' : 'text-zinc-400 group-hover:text-amber-400'
                          }`}
                        />
                        {!isCollapsed && <span className="truncate">{item.name}</span>}
                      </div>

                      {!isCollapsed && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge !== undefined && item.badge > 0 && (
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full text-white ${
                                item.badgeColor || 'bg-amber-500'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${
                              isOpen ? 'transform rotate-180 text-amber-400' : ''
                            }`}
                          />
                        </div>
                      )}

                      {/* Tooltip in Collapsed Mode */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2.5 py-1 bg-zinc-900 text-white text-xs rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-zinc-800">
                          {item.name} (Click to expand)
                        </div>
                      )}
                    </button>

                    {/* Accordion Submenu Links (Sliding Downwards) */}
                    {!isCollapsed && isOpen && item.children && (
                      <div className="pl-7 pr-1 py-1 space-y-0.5 border-l border-zinc-800/80 ml-5 my-0.5 animate-fadeIn">
                        {item.children.map((subItem) => {
                          const isSubActive =
                            pathname === subItem.href || pathname.startsWith(subItem.href + '/');

                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                                isSubActive
                                  ? 'bg-amber-400 text-zinc-950 font-black shadow-sm'
                                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                              }`}
                            >
                              <span className="truncate">{subItem.name}</span>
                              {subItem.badge !== undefined && subItem.badge > 0 && (
                                <span
                                  className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full text-white ${
                                    isSubActive
                                      ? 'bg-zinc-950 text-white'
                                      : subItem.badgeColor || 'bg-amber-500'
                                  }`}
                                >
                                  {subItem.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
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
        className={`hidden lg:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 ${
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
