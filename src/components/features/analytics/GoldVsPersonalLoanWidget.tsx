import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { LoanComparisonGoldService } from '../../../services/loanComparisonGoldService';
import { formatCurrency } from '../../../math/formatters';

export const GoldVsPersonalLoanWidget: React.FC = () => {
  const comparison = LoanComparisonGoldService.getGoldVsPersonalComparison();

  return (
    <Card title="Gold Collateral Loan vs Personal Loan Simulator" subtitle="Interest rate differential & processing fee savings">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">Gold Loan (8.5% Interest)</span>
              <Badge variant="success">Lower Interest</Badge>
            </div>
            <div className="flex justify-between">
              <span>Monthly EMI:</span>
              <span className="font-bold">{formatCurrency(comparison.goldLoan.monthlyEMI)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest Paid:</span>
              <span className="font-bold text-emerald-600">{formatCurrency(comparison.goldLoan.totalInterestPaid)}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">Personal Loan (14.5% Interest)</span>
              <Badge variant="warning">Higher Outflow</Badge>
            </div>
            <div className="flex justify-between">
              <span>Monthly EMI:</span>
              <span className="font-bold">{formatCurrency(comparison.personalLoan.monthlyEMI)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest Paid:</span>
              <span className="font-bold text-red-600">{formatCurrency(comparison.personalLoan.totalInterestPaid)}</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex justify-between items-center">
          <span>Net Interest Saved by Choosing Gold Loan:</span>
          <span className="text-sm font-extrabold">{formatCurrency(comparison.interestSavingsAmount)}</span>
        </div>
      </div>
    </Card>
  );
};
