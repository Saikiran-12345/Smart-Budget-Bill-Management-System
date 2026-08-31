import React from 'react';
import { Card } from '../../ui/Card';
import { FreelanceService } from '../../../services/freelanceService';
import { formatCurrency } from '../../../math/formatters';
import { Briefcase, Calendar } from 'lucide-react';

export const FreelanceCalculatorWidget: React.FC = () => {
  const target = FreelanceService.getTargetRate();
  const tax = FreelanceService.getPresumptiveTax();

  return (
    <Card title="Freelance Hourly Target Rate & Sec 44ADA Presumptive Tax" subtitle="Target billable hourly rate & quarterly advance tax schedule">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Target Hourly Rate</span>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(target.targetHourlyRateINR)}/hr</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Target Daily Rate</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{formatCurrency(target.targetDailyRateINR)}/day</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Sec 44ADA Taxable (50%)</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(tax.presumptiveIncome50Percent)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
