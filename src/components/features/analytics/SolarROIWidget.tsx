import React from 'react';
import { Card } from '../../ui/Card';
import { SolarROIService } from '../../../services/solarROIService';
import { formatCurrency } from '../../../math/formatters';
import { Sun, Leaf } from 'lucide-react';

export const SolarROIWidget: React.FC = () => {
  const solar = SolarROIService.getSolarROI(3);

  return (
    <Card title="Rooftop Solar PM Surya Ghar Subsidy & Payback" subtitle="Solar power bill offset & 25-year net savings">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">PM Surya Ghar Subsidy</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">-{formatCurrency(solar.govPMSuryaGharSubsidy)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Net Capital Cost (3 kW)</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(solar.netCapitalInvestment)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Payback Horizon</span>
            <span className="text-xl font-extrabold text-amber-700 dark:text-amber-300">{solar.paybackPeriodYears} Years</span>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs flex justify-between items-center">
          <span className="text-slate-600 dark:text-slate-300">25-Year Lifetime Net Bill Savings:</span>
          <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">+{formatCurrency(solar.twentyFiveYearNetSavings)}</span>
        </div>
      </div>
    </Card>
  );
};
