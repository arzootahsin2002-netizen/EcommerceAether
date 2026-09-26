'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AccountDashboard } from '@/components/account/AccountDashboard';

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';

  return <AccountDashboard initialTab={initialTab} />;
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-400">Loading profile...</div>}>
      <AccountContent />
    </Suspense>
  );
}
