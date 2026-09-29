'use client';

import React from 'react';
import { AdminProvider } from '@/lib/admin/adminStore';

export default function AdminRootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminProvider>{children}</AdminProvider>;
}
