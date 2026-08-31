import React from 'react';

export interface LoadingStateProps {
  message?: string;
  height?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading data, please wait...',
  height = 'py-12',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${height}`}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent dark:border-brand-400" />
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
};
