import React from 'react';
import { Card } from '../../ui/Card';
import { StatusBadge } from '../../ui/StatusBadge';
import { ProgressBar } from '../../ui/ProgressBar';
import { CreditScoreSimulator } from '../../../math/creditScoreSimulator';
import { useBills } from '../../../hooks/useBills';
import { useExpenses } from '../../../hooks/useExpenses';
import { Gauge, ShieldCheck, AlertCircle } from 'lucide-react';

export const CreditScoreWidget: React.FC = () => {
  const { bills } = useBills();
  const { expenses } = useExpenses();

  const creditData = CreditScoreSimulator.simulateScore(bills, expenses);

  return (
    <Card title="Credit Health & Score Simulator" subtitle="Estimated credit score model (300-850)">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 dark:bg-purple-950/50 p-3 text-purple-600 dark:text-purple-400">
              <Gauge className="h-6 w-6" />
            </div>
            <div>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{creditData.estimatedScore}</span>
              <span className="text-xs text-slate-400 font-semibold"> / 850</span>
            </div>
          </div>
          <StatusBadge status={creditData.creditGrade} />
        </div>

        <ProgressBar progress={((creditData.estimatedScore - 300) / 550) * 100} size="lg" colorClass="bg-purple-600" showLabel />

        <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
          <div>
            <span className="text-slate-400 block">Credit Card Utilization</span>
            <span className={`font-bold ${creditData.utilizationRatioPercentage > 30 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {creditData.utilizationRatioPercentage}%
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">On-Time Payment History</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{creditData.onTimePaymentPercentage}%</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Score Factor Recommendations:</span>
          {creditData.improvementTips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
