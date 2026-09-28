'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { QuickViewModal } from '@/components/layout/QuickViewModal';
import { ToastContainer } from '@/components/layout/ToastContainer';

export function StoreLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if current route is a standalone portal (vendor portal or admin console)
  const isPortal = pathname?.startsWith('/vendor') || pathname?.startsWith('/admin');

  if (isPortal) {
    return (
      <>
        <main className="min-h-screen">
          {children}
        </main>
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <QuickViewModal />
      <ToastContainer />
    </>
  );
}
