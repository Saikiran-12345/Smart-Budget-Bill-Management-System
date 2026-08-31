import React from 'react';
import { Card } from '../../ui/Card';
import { PresumptiveTaxService } from '../../../services/presumptiveTaxService';
import { formatCurrency } from '../../../math/formatters';

export const PresumptiveTaxWidget: React.FC = () => {
  const p44 = PresumptiveTaxService.getSection44ADAEstimate();

  return (
    <Card title="Section 44ADA Presumptive Tax Scheme (50% Flat Profit)" subtitle="Freelancer & professional tax savings simulator">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Gross Receipts</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(p44.grossProfessionalReceiptsINR)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Presumptive 50% Income</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(p44.presumptiveIncome50PercentINR)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Tax Saved vs Bookkeeping</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{formatCurrency(p44.taxSavedVsNormalAccountingINR)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
