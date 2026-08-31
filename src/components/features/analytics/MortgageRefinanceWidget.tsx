import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { MortgageRefinanceService } from '../../../services/mortgageRefinanceService';
import { formatCurrency } from '../../../math/formatters';

export const MortgageRefinanceWidget: React.FC = () => {
  const ref = MortgageRefinanceService.getRefinanceComparison();

  return (
    <Card title="Mortgage Loan Refinancing & Break-Even Horizon" subtitle="Rate drop (9.5% -> 8.2%) lifetime interest savings">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Monthly EMI Reduction</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">-{formatCurrency(ref.monthlyEMISavings)}/mo</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Refinance Break-Even</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{ref.breakEvenMonths} Months</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Net Lifetime Interest Saved</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{formatCurrency(ref.netLifetimeInterestSavings)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
