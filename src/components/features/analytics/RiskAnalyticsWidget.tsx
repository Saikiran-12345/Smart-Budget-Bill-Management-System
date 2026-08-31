import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { RiskAnalyticsService } from '../../../services/riskAnalyticsService';

export const RiskAnalyticsWidget: React.FC = () => {
  const sharpe = RiskAnalyticsService.getSharpeRatio();
  const sortino = RiskAnalyticsService.getSortinoRatio();

  return (
    <Card title="Portfolio Risk-Adjusted Return Ratios" subtitle="Sharpe Ratio & Sortino Ratio downside risk metrics">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">Sharpe Ratio</span>
              <Badge variant="success">{sharpe.riskRating}</Badge>
            </div>
            <span className="text-2xl font-extrabold text-brand-600 dark:text-brand-400 block">{sharpe.sharpeRatio}</span>
            <span className="text-slate-400">Total Volatility Risk-Adjusted</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">Sortino Ratio</span>
              <Badge variant="info">Low Downside</Badge>
            </div>
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block">{sortino.sortinoRatio}</span>
            <span className="text-slate-400">Downside Volatility Adjusted</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
