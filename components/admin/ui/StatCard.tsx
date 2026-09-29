import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  attention?: boolean;
  attentionLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  trend,
  attention,
  attentionLabel,
  icon: Icon,
  iconColor = 'text-zinc-900',
  iconBg = 'bg-zinc-100',
  onClick
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden group ${
        onClick ? 'cursor-pointer hover:border-zinc-300' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block truncate">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 font-serif">
            {value}
          </div>
        </div>

        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-100 shadow-2xs ${iconBg} ${iconColor} group-hover:scale-105 transition-transform`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100/90 flex items-center justify-between text-xs">
        {trend && (
          <div className="flex items-center gap-1.5 font-bold">
            <span
              className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] ${
                trend.isPositive !== false
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              {trend.isPositive !== false ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {trend.value}
            </span>
            <span className="text-[11px] text-zinc-400 font-medium">
              {trend.label || 'vs last month'}
            </span>
          </div>
        )}

        {attention && (
          <div className="flex items-center gap-1.5 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md text-[11px] border border-amber-200/50">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>{attentionLabel || 'Requires attention'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
