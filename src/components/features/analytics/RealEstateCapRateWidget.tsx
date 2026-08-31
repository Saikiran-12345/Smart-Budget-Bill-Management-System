import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { RealEstateCapRateService } from '../../../services/realEstateCapRateService';
import { formatCurrency } from '../../../math/formatters';

export const RealEstateCapRateWidget: React.FC = () => {
  const prop = RealEstateCapRateService.getCapRateAnalysis();

  return (
    <Card title="Real Estate Property Cap Rate & Rental Yield" subtitle="Net Operating Income (NOI) vs Purchase Valuation">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Net Operating Income (NOI)</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(prop.netOperatingIncomeNOI)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Capitalization Rate (Cap Rate)</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{prop.capRatePercent}%</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Gross Rental Yield</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{prop.grossRentalYieldPercent}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
