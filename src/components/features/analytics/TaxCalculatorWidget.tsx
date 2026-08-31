import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { TaxService } from '../../../services/taxService';
import { formatCurrency } from '../../../math/formatters';
import { Calculator, CheckCircle2 } from 'lucide-react';

export const TaxCalculatorWidget: React.FC = () => {
  const comparison = TaxService.getTaxComparisonForCurrentUser();
  const headroom = TaxService.getTaxOptimizationHeadroom();

  return (
    <Card title="Tax Optimization & Regime Simulator" subtitle="Old vs New Tax Regime comparison">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Old Regime Box */}
          <div className={`p-4 rounded-xl border ${comparison.recommendedRegime === 'OLD_REGIME' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-800 dark:text-slate-200">Old Tax Regime</span>
              {comparison.recommendedRegime === 'OLD_REGIME' && <Badge variant="success">Recommended</Badge>}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Deductions Claimed:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(comparison.oldRegime.deductionsTotal)}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-1 border-slate-200 dark:border-slate-700">
                <span>Tax Liability:</span>
                <span className="text-red-600 dark:text-red-400">{formatCurrency(comparison.oldRegime.taxLiability)}</span>
              </div>
            </div>
          </div>

          {/* New Regime Box */}
          <div className={`p-4 rounded-xl border ${comparison.recommendedRegime === 'NEW_REGIME' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-800 dark:text-slate-200">New Tax Regime (2025/26)</span>
              {comparison.recommendedRegime === 'NEW_REGIME' && <Badge variant="success">Recommended</Badge>}
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Standard Deduction:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(comparison.newRegime.standardDeduction)}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-1 border-slate-200 dark:border-slate-700">
                <span>Tax Liability:</span>
                <span className="text-red-600 dark:text-red-400">{formatCurrency(comparison.newRegime.taxLiability)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Headroom Tip */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Unused 80C Headroom: <span className="font-bold">{formatCurrency(headroom.remaining80CHeadroom)}</span></span>
          </div>
          <span className="font-semibold text-emerald-600">Potential Tax Savings: {formatCurrency(headroom.potentialTaxSaved)}</span>
        </div>
      </div>
    </Card>
  );
};
