'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronRight, Home, ShieldAlert } from 'lucide-react';
import { AdminProvider, useAdmin } from '@/lib/admin/adminStore';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

function AdminLayoutInner({
  children,
  title,
  subtitle,
  actions,
  breadcrumbs
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { adminUser, isAdminLoggedIn } = useAdmin();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Authentication Guard: if on an admin page that is not /admin/login, ensure logged in
  useEffect(() => {
    if (!isAdminLoggedIn && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAdminLoggedIn, pathname, router]);

  if (!isAdminLoggedIn && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white text-xs">
        Authenticating DRIBO Admin Access...
      </div>
    );
  }

  // Generate dynamic breadcrumbs if not explicitly provided
  const pathSegments = pathname.split('/').filter(Boolean);
  const generatedBreadcrumbs =
    breadcrumbs ||
    pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      const formatted = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
      return {
        label: formatted === 'Admin' ? 'Home' : formatted,
        href: index === pathSegments.length - 1 ? undefined : href
      };
    });

  return (
    <div className="min-h-screen bg-zinc-50/70 text-zinc-900 font-sans antialiased flex flex-col">
      {/* Sidebar Navigation */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Workspace Frame */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Sticky Topbar */}
        <AdminTopbar
          isCollapsed={isCollapsed}
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setIsMobileOpen(!isMobileOpen);
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
        />

        {/* Content Area with Breadcrumbs & Page Header */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* Breadcrumbs Row */}
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>

            {generatedBreadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-zinc-900 font-bold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Page Title & Action Bar */}
          {(title || actions) && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div>
                {title && (
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-zinc-950 tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
            </div>
          )}

          {/* Page Children */}
          {children}
        </main>
      </div>
    </div>
  );
}

export function AdminLayout({
  children,
  title,
  subtitle,
  actions,
  breadcrumbs
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <AdminLayoutInner
      title={title}
      subtitle={subtitle}
      actions={actions}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </AdminLayoutInner>
  );
}
