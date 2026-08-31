import React from 'react';
import { Card } from '../../ui/Card';
import { AmortizationService } from '../../../services/amortizationService';
import { formatCurrency } from '../../../math/formatters';

export const AmortizationWidget: React.FC = () => {
  const amort = AmortizationService.getAmortizationSchedule();

  return (
    <Card title="Mortgage EMI & Loan Amortization Schedule" subtitle="Monthly principal vs interest payment breakdown">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Monthly EMI</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(amort.monthlyEMI)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Total Interest Paid</span>
            <span className="text-xl font-extrabold text-red-600 dark:text-red-400">{formatCurrency(amort.totalInterestPaid)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Total Lifetime Outflow</span>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(amort.totalAmountPaid)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
