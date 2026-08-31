import React from 'react';
import { Select, SelectOption } from './Select';
import { Button } from './Button';
import { RotateCcw } from 'lucide-react';

export interface FilterOptionConfig {
  key: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (val: string) => void;
}

export interface FilterPanelProps {
  filters: FilterOptionConfig[];
  onReset: () => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onReset, className = '' }) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 ${className}`}>
      {filters.map((f) => (
        <div key={f.key} className="min-w-[160px] flex-1">
          <Select
            label={f.label}
            value={f.value}
            options={f.options}
            onChange={(e) => f.onChange(e.target.value)}
          />
        </div>
      ))}
      <div className="flex items-end self-end pb-0.5">
        <Button variant="ghost" size="sm" onClick={onReset} icon={<RotateCcw className="h-3.5 w-3.5" />}>
          Reset
        </Button>
      </div>
    </div>
  );
};
