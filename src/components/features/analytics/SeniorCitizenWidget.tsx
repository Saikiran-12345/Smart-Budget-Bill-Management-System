import React from 'react';
import { Card } from '../../ui/Card';
import { SeniorCitizenService } from '../../../services/seniorCitizenService';
import { formatCurrency } from '../../../math/formatters';

export const SeniorCitizenWidget: React.FC = () => {
  const scss = SeniorCitizenService.getSCSSPayout();

  return (
    <Card title="Senior Citizen Savings Scheme (SCSS 8.2%)" subtitle="Quarterly interest payout & 5-year guaranteed return">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Quarterly Payout</span>
            <span className="text-xl font-extrabold text-amber-700 dark:text-amber-300">{formatCurrency(scss.quarterlyPayoutINR)}/quarter</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Annual Interest Income</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(scss.totalAnnualPayoutINR)}/yr</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">5-Year Total Interest</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(scss.fiveYearTotalInterestINR)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
