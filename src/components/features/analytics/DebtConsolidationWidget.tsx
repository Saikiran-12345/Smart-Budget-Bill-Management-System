import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { DebtConsolidationRefinanceService } from '../../../services/debtConsolidationRefinanceService';
import { formatCurrency } from '../../../math/formatters';

export const DebtConsolidationWidget: React.FC = () => {
  const sampleDebts = [
    { id: '1', lenderName: 'Credit Card A', outstandingBalance: 60000, annualInterestRatePercent: 36, monthlyEMI: 5000 },
    { id: '2', lenderName: 'Personal Loan B', outstandingBalance: 140000, annualInterestRatePercent: 16, monthlyEMI: 5500 },
  ];

  const res = DebtConsolidationRefinanceService.getConsolidationAnalysis(sampleDebts);

  return (
    <Card title="Multi-Loan Debt Consolidation & EMI Reduction" subtitle="Refinance high-interest credit cards into single 11.5% loan">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Combined Monthly EMI</span>
            <span className="text-xl font-extrabold text-red-600 dark:text-red-400">{formatCurrency(res.currentCombinedMonthlyEMI)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">New Single Consolidated EMI</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(res.newConsolidatedMonthlyEMI)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Monthly EMI Savings</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">-{formatCurrency(res.monthlyEMIReduction)}/mo</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
