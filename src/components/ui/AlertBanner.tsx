import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertBannerProps {
  type?: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  message?: string;
  onClose?: () => void;
  actionText?: string;
  onAction?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  actionText,
  onAction,
}) => {
  const styles = {
    info: {
      bg: 'bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-900',
      icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />,
      text: 'text-blue-900 dark:text-blue-200',
    },
    success: {
      bg: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />,
      text: 'text-emerald-900 dark:text-emerald-200',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-900',
      icon: <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />,
      text: 'text-amber-900 dark:text-amber-200',
    },
    danger: {
      bg: 'bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-900',
      icon: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />,
      text: 'text-red-900 dark:text-red-200',
    },
  };

  const current = styles[type];

  return (
    <div className={`p-4 rounded-xl border ${current.bg} flex items-start justify-between gap-3 text-sm`}>
      <div className="flex items-start gap-3">
        {current.icon}
        <div>
          <h4 className={`font-bold ${current.text}`}>{title}</h4>
          {message && <p className={`mt-0.5 text-xs opacity-90 ${current.text}`}>{message}</p>}
          {actionText && onAction && (
            <button
              type="button"
              onClick={onAction}
              className="mt-2 text-xs font-extrabold underline hover:opacity-80 transition-opacity"
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
