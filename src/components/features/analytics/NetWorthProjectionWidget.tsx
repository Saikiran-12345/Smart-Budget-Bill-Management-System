import React from 'react';
import { Card } from '../../ui/Card';
import { NetWorthGrowthEngine } from '../../../math/calculators/netWorthGrowthEngine';
import { formatCurrency } from '../../../math/formatters';
import { TrendingUp, Target } from 'lucide-react';

export const NetWorthProjectionWidget: React.FC = () => {
  const trajectory = NetWorthGrowthEngine.calculateGrowth();
  const year10 = trajectory[trajectory.length - 1];

  return (
    <Card title="10-Year Net Worth Trajectory Projection" subtitle="Asset compounding & liability paydown forecast">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Projected 10-Yr Assets</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(year10.projectedAssets)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Projected 10-Yr Liabilities</span>
            <span className="text-xl font-extrabold text-red-600 dark:text-red-400">{formatCurrency(year10.projectedLiabilities)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">10-Yr Net Worth Target</span>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(year10.projectedNetWorth)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
