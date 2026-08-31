import React from 'react';

export interface DividerProps {
  label?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ label, className = '' }) => {
  if (!label) {
    return <hr className={`border-slate-200 dark:border-slate-800 my-4 ${className}`} />;
  }

  return (
    <div className={`relative flex py-3 items-center ${className}`}>
      <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
      <span className="flex-shrink mx-4 text-xs font-semibold uppercase text-slate-400 tracking-wider">
        {label}
      </span>
      <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
    </div>
  );
};
