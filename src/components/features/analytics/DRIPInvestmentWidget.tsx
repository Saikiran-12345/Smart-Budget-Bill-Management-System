import React from 'react';
import { Card } from '../../ui/Card';
import { DRIPInvestmentService } from '../../../services/dripInvestmentService';
import { formatCurrency } from '../../../math/formatters';
import { TrendingUp, DollarSign } from 'lucide-react';

export const DRIPInvestmentWidget: React.FC = () => {
  const schedule = DRIPInvestmentService.getDRIPSchedule();
  const finalPoint = schedule[schedule.length - 1];

  return (
    <Card title="Dividend Reinvestment (DRIP) Compounding" subtitle="Reinvested dividend yield vs cash payout comparison">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Without DRIP Reinvestment</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(finalPoint.portfolioValueWithoutDRIP)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">With DRIP Reinvestment</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(finalPoint.portfolioValueWithDRIP)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Additional Wealth Created</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">+{formatCurrency(finalPoint.additionalWealthFromDRIP)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
