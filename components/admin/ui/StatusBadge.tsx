import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const s = status.toLowerCase();

  let styles = 'bg-zinc-100 text-zinc-700 border-zinc-200';

  if (['approved', 'active', 'delivered', 'paid', 'successful', 'verified', 'completed'].includes(s)) {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
  } else if (['pending', 'pending approval', 'under review', 'processing', 'pickup scheduled', 'inspecting'].includes(s)) {
    styles = 'bg-amber-50 text-amber-800 border-amber-200/80';
  } else if (['shipped'].includes(s)) {
    styles = 'bg-blue-50 text-blue-700 border-blue-200/80';
  } else if (['rejected', 'blocked', 'failed', 'cancelled', 'out of stock'].includes(s)) {
    styles = 'bg-rose-50 text-rose-700 border-rose-200/80';
  } else if (['suspended', 'inactive', 'disabled', 'expired', 'more info required', 'changes requested'].includes(s)) {
    styles = 'bg-orange-50 text-orange-800 border-orange-200/80';
  } else if (['refunded', 'partially refunded'].includes(s)) {
    styles = 'bg-purple-50 text-purple-700 border-purple-200/80';
  }

  const sizeClasses = size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1 font-bold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full border capitalize tracking-tight whitespace-nowrap shadow-2xs ${sizeClasses} ${styles}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          styles.includes('emerald')
            ? 'bg-emerald-500'
            : styles.includes('amber')
            ? 'bg-amber-500'
            : styles.includes('blue')
            ? 'bg-blue-500'
            : styles.includes('rose')
            ? 'bg-rose-500'
            : styles.includes('purple')
            ? 'bg-purple-500'
            : styles.includes('orange')
            ? 'bg-orange-500'
            : 'bg-zinc-400'
        }`}
      />
      {status}
    </span>
  );
}
