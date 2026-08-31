import React from 'react';
import { Card } from '../../ui/Card';
import { StatusBadge } from '../../ui/StatusBadge';
import { ProgressBar } from '../../ui/ProgressBar';
import { FinancialHealthScore } from '../../../types/analytics';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface HealthIndexCardProps {
  healthScore: FinancialHealthScore;
}

export const HealthIndexCard: React.FC<HealthIndexCardProps> = ({ healthScore }) => {
  return (
    <Card title="Financial Health Index (0-100)" subtitle="Composite credit & savings rate metric">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-50 dark:bg-brand-950/50 p-3 text-brand-600 dark:text-brand-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{healthScore.score}</span>
              <span className="text-xs text-slate-400 font-semibold"> / 100</span>
            </div>
          </div>
          <StatusBadge status={healthScore.rating} />
        </div>

        <ProgressBar progress={healthScore.score} size="lg" showLabel />

        <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
          <div>
            <span className="text-slate-400 block">Savings Rate Score</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{healthScore.savingsRateScore} / 30 pts</span>
          </div>
          <div>
            <span className="text-slate-400 block">Budget Compliance</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{healthScore.budgetComplianceScore} / 30 pts</span>
          </div>
          <div>
            <span className="text-slate-400 block">Bill On-Time Score</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{healthScore.billOnTimeScore} / 25 pts</span>
          </div>
          <div>
            <span className="text-slate-400 block">Emergency Fund Runway</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{healthScore.emergencyFundMonths} Months</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Action Recommendations:</span>
          {healthScore.recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
