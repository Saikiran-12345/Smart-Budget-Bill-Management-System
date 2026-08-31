import React from 'react';
import { AlertOctagon } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading financial data.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 p-8 text-center">
      <div className="rounded-full bg-red-100 dark:bg-red-900/40 p-3 text-red-600 dark:text-red-400 mb-3">
        <AlertOctagon className="h-8 w-8" />
      </div>
      <h4 className="text-base font-semibold text-red-900 dark:text-red-300">{title}</h4>
      <p className="mt-1 text-xs text-red-600 dark:text-red-400 max-w-md">{message}</p>
      {onRetry && (
        <div className="mt-4">
          <Button variant="danger" size="sm" onClick={onRetry}>
            Retry
          </Button>
        </div>
      )}
    </div>
  );
};
