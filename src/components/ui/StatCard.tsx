import React from 'react';

export interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'neutral',
  icon,
  iconBgColor = 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400',
}) => {
  const changeColors = {
    positive: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40',
    negative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40',
    neutral: 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800',
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={`rounded-xl p-2.5 ${iconBgColor}`}>{icon}</div>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{value}</h2>
        {change && (
          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${changeColors[changeType]}`}>
            {change}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
    </div>
  );
};
