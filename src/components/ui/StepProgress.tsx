import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

export interface StepProgressProps {
  steps: StepItem[];
  currentStepIndex: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStepIndex }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-600 transition-all duration-300 -z-10"
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  isCompleted
                    ? 'bg-brand-600 text-white'
                    : isCurrent
                    ? 'bg-brand-600 text-white ring-4 ring-brand-100 dark:ring-brand-950'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              <span className={`mt-2 text-xs font-semibold ${isCurrent ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-500'}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
