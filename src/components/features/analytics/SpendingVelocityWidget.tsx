import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { SpendingVelocityService } from '../../../services/spendingVelocityService';
import { formatCurrency } from '../../../math/formatters';
import { Flame, AlertTriangle, TrendingUp } from 'lucide-react';

export const SpendingVelocityWidget: React.FC = () => {
  const velocity = SpendingVelocityService.getVelocityAnalysis();

  return (
    <Card title="Spending Velocity & Burn Rate Monitor" subtitle="7-day vs 30-day outflow acceleration tracking">
      <div className="space-y-4">
        {velocity.isSpikeDetected && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <span>
              <strong className="text-amber-900 dark:text-amber-200">Spending Spike Alert:</strong> Your 7-day burn rate ({formatCurrency(velocity.last7Days.dailyBurnRate)}/day) is >50% higher than your monthly average ({formatCurrency(velocity.last30Days.dailyBurnRate)}/day).
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-slate-700 dark:text-slate-300">Last 7 Days Burn</span>
              <Badge variant={velocity.last7Days.velocityTrend === 'ACCELERATING' ? 'danger' : 'success'}>
                {velocity.last7Days.velocityTrend}
              </Badge>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(velocity.last7Days.totalSpent)}</div>
            <span className="text-slate-400 font-semibold">{formatCurrency(velocity.last7Days.dailyBurnRate)} / day</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-slate-700 dark:text-slate-300">Last 30 Days Burn</span>
              <Badge variant="info">30-Day Base</Badge>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(velocity.last30Days.totalSpent)}</div>
            <span className="text-slate-400 font-semibold">{formatCurrency(velocity.last30Days.dailyBurnRate)} / day</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
