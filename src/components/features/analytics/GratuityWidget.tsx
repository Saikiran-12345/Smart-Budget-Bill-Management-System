import React from 'react';
import { Card } from '../../ui/Card';
import { GratuityService } from '../../../services/gratuityService';
import { formatCurrency } from '../../../math/formatters';

export const GratuityWidget: React.FC = () => {
  const grat = GratuityService.getGratuityCalculation();

  return (
    <Card title="Gratuity Payout & Section 10(10) Tax Exemption" subtitle="15/26 formula calculation for 12 years of service">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Calculated Gratuity</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(grat.calculatedGratuityAmount)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Tax-Free Exempt Limit</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(grat.taxFreeGratuityAmount)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Taxable Portion</span>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(grat.taxableGratuityAmount)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
