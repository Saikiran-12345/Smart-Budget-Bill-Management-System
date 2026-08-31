import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { StressTestService } from '../../../services/stressTestService';
import { formatCurrency } from '../../../math/formatters';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export const CashFlowStressTestWidget: React.FC = () => {
  const stress = StressTestService.getStressTestResults();

  return (
    <Card title="Cash Flow Stress Test & Liquidity Runway" subtitle="Job loss and emergency scenario simulation">
      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs flex justify-between items-center">
          <span>Baseline Emergency Liquid Runway:</span>
          <span className="text-base font-extrabold text-purple-700 dark:text-purple-300">{stress.baselineRunwayMonths} Months</span>
        </div>

        <div className="space-y-3">
          {stress.scenarios.map((sc, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800 dark:text-slate-200">{sc.scenarioName}</span>
                <Badge variant={sc.isSolvent ? 'success' : 'danger'}>
                  {sc.isSolvent ? 'Pass (Solvent)' : 'Fail (Shortfall)'}
                </Badge>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Runway Remaining: <strong className="text-slate-800 dark:text-slate-200">{sc.monthsOfRunwayRemaining} Months</strong></span>
                <span>Net Cashflow: <strong className={sc.netCashFlowInScenario < 0 ? 'text-red-600' : 'text-emerald-600'}>{formatCurrency(sc.netCashFlowInScenario)}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
