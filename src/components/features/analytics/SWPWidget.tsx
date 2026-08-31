import React from 'react';
import { Card } from '../../ui/Card';
import { SWPService } from '../../../services/swpService';
import { formatCurrency } from '../../../math/formatters';

export const SWPWidget: React.FC = () => {
  const swp = SWPService.getSWPSchedule();

  return (
    <Card title="Systematic Withdrawal Plan (SWP) Pension Generator" subtitle="Monthly ₹50,000 withdrawal schedule from ₹1 Cr corpus">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Starting Corpus</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(swp.initialCorpus)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Total Withdrawals (20 Yrs)</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(swp.totalWithdrawalsAmount)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Ending Remaining Corpus</span>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(swp.finalRemainingCorpus)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
