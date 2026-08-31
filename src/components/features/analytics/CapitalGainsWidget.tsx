import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { CapitalGainsService } from '../../../services/capitalGainsService';
import { formatCurrency } from '../../../math/formatters';

export const CapitalGainsWidget: React.FC = () => {
  const cg = CapitalGainsService.getCapitalGainsTax('EQUITY_OR_EQUITY_MF');

  return (
    <Card title="STCG & LTCG Capital Gains Tax Calculator (Finance Act 2024)" subtitle="12.5% LTCG & ₹1.25 Lakh tax-free exemption threshold">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Gross Capital Gain</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(cg.grossCapitalGainINR)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Tax-Free LTCG Exemption</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(cg.ltcgExemptionLimitINR)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Estimated LTCG Tax (12.5%)</span>
            <span className="text-xl font-extrabold text-red-600 dark:text-red-400">{formatCurrency(cg.estimatedTaxPayableINR)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
