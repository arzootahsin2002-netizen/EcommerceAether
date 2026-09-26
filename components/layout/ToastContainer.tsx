'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useApp } from '@/lib/store';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-zinc-950 text-white rounded-2xl p-3.5 shadow-2xl border border-zinc-800 flex items-start gap-3 animate-slideUp backdrop-blur-md"
        >
          {toast.image ? (
            <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700">
              <Image src={toast.image} alt="" fill unoptimized className="object-cover" />
            </div>
          ) : (
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-400" />}
              {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400" />}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white leading-tight">{toast.title}</h4>
            {toast.message && (
              <p className="text-[11px] text-zinc-300 mt-0.5 line-clamp-2 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-zinc-500 hover:text-zinc-300 p-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
