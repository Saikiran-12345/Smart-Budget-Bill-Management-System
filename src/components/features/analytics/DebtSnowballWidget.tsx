import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { DebtPayoffCalculator } from '../../../math/debtPayoffCalculator';
import { NetWorthService } from '../../../services/netWorthService';
import { formatCurrency } from '../../../math/formatters';
import { TrendingDown, ShieldAlert } from 'lucide-react';

export const DebtSnowballWidget: React.FC = () => {
  const [strategy, setStrategy] = useState<'AVALANCHE' | 'SNOWBALL'>('AVALANCHE');
  const liabilities = NetWorthService.getLiabilities();

  const plan = DebtPayoffCalculator.calculatePayoffPlan(liabilities, 5000, strategy);

  return (
    <Card title="Debt Repayment Strategy Simulator" subtitle="Debt Avalanche (High Interest) vs Snowball (Lowest Balance)">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={strategy === 'AVALANCHE' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStrategy('AVALANCHE')}
          >
            Avalanche Strategy (Save Interest)
          </Button>
          <Button
            variant={strategy === 'SNOWBALL' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStrategy('SNOWBALL')}
          >
            Snowball Strategy (Quick Wins)
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block">Months to Freedom</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{plan.monthsToPayoff} Months</span>
          </div>
          <div>
            <span className="text-slate-400 block">Total Interest Cost</span>
            <span className="font-bold text-red-600 dark:text-red-400">{formatCurrency(plan.totalInterestPaid)}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Extra Monthly Cash</span>
            <span className="font-bold text-emerald-600">{formatCurrency(plan.monthlyExtraPayment)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Amortization Milestone Preview:</span>
          {plan.schedule.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Month {item.month} ({item.liabilityName})</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Balance: {formatCurrency(item.remainingPrincipal)}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
