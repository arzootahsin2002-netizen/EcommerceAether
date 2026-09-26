'use client';

import React from 'react';
import { X, Check } from 'lucide-react';
import { FilterState } from '@/lib/types';
import { FilterSidebar } from './FilterSidebar';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalMatches: number;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalMatches
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-950">Filter Products</h3>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Filters */}
          <div className="flex-1 overflow-y-auto p-4">
            <FilterSidebar
              filters={filters}
              onFilterChange={onFilterChange}
              onReset={onReset}
              totalMatches={totalMatches}
            />
          </div>

          {/* Sticky Apply Button */}
          <div className="p-4 border-t border-zinc-100 bg-white">
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-zinc-950 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Check className="w-4 h-4" /> Apply Filters ({totalMatches} Results)
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
