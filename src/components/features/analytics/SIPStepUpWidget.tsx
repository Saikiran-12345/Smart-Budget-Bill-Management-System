import React from 'react';
import { Card } from '../../ui/Card';
import { SIPStepUpService } from '../../../services/sipStepUpService';
import { formatCurrency } from '../../../math/formatters';

export const SIPStepUpWidget: React.FC = () => {
  const timeline = SIPStepUpService.getStepUpTimeline();
  const year15 = timeline[timeline.length - 1];

  return (
    <Card title="Annual Step-Up Increment SIP Compounding" subtitle="10% annual deposit increase 15-year wealth multiplier">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Total Invested (15 Yrs)</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(year15.totalCumulativeInvested)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Wealth Gain</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">+{formatCurrency(year15.wealthGainAmount)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Final Corpus Value</span>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(year15.totalCorpusValue)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
