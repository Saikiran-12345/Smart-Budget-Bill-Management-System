import React from 'react';
import { Card } from '../../ui/Card';
import { CashFlowForecastService } from '../../../services/cashFlowForecastService';
import { formatCurrency } from '../../../math/formatters';

export const CashFlowForecast12MWidget: React.FC = () => {
  const forecast = CashFlowForecastService.get12MonthForecast();
  const endMonth = forecast[forecast.length - 1];

  return (
    <Card title="12-Month Rolling Cash Flow & Liquidity Forecast" subtitle="Projected monthly net income & cumulative cash reserves">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Starting Cash Balance</span>
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatCurrency(150000)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Monthly Average Net Cashflow</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">+{formatCurrency(50000)}/mo</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Projected 12-Mo Cash Reserves</span>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(endMonth.cumulativeCashBalance)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
