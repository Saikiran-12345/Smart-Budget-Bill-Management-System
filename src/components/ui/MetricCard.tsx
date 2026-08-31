import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  badgeText?: string;
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  icon,
  badgeText,
  badgeVariant = 'info',
}) => {
  const badgeColors = {
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
  };

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">{label}</span>
        {icon && <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{icon}</div>}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{value}</span>
        {badgeText && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColors[badgeVariant]}`}>
            {badgeText}
          </span>
        )}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-xs">
          <span className={trend.isPositive ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
            {trend.isPositive ? '▲' : '▼'} {trend.value}
          </span>
          <span className="text-slate-400">vs last period</span>
        </div>
      )}
    </div>
  );
};
