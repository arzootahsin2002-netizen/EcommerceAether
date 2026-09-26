'use client';

import React, { Suspense } from 'react';
import { VendorDashboard } from '@/components/vendor/VendorDashboard';

export default function VendorDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center text-xs text-zinc-400">Loading Vendor Portal...</div>}>
      <VendorDashboard />
    </Suspense>
  );
}
