import React from 'react';

export interface ProgressBarProps {
  progress: number; // 0 to 100
  colorClass?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  colorClass,
  size = 'md',
  showLabel = false,
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  let defaultColor = 'bg-brand-600 dark:bg-brand-500';
  if (!colorClass) {
    if (clamped >= 100) defaultColor = 'bg-red-600 dark:bg-red-500';
    else if (clamped >= 90) defaultColor = 'bg-amber-600 dark:bg-amber-500';
    else if (clamped >= 75) defaultColor = 'bg-yellow-500 dark:bg-yellow-400';
    else defaultColor = 'bg-emerald-600 dark:bg-emerald-500';
  }

  const barColor = colorClass || defaultColor;

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          <span>Progress</span>
          <span>{clamped.toFixed(1)}%</span>
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 ${sizeClasses[size]}`}>
        <div
          className={`h-full transition-all duration-500 rounded-full ${barColor}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
