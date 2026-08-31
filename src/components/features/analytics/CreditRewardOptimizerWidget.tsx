import React from 'react';
import { Card } from '../../ui/Card';
import { CreditCardRewardOptimizerEngine } from '../../../math/calculators/creditCardRewardOptimizerEngine';
import { formatCurrency } from '../../../math/formatters';
import { CreditCard, Award, Flame } from 'lucide-react';

export const CreditRewardOptimizerWidget: React.FC = () => {
  const sampleCategories = [
    { categoryName: 'Dining & Food Delivery', monthlySpend: 15000, rewardRatePercent: 5 },
    { categoryName: 'Supermarket Groceries', monthlySpend: 20000, rewardRatePercent: 3 },
    { categoryName: 'Fuel & Transportation', monthlySpend: 8000, rewardRatePercent: 4 },
    { categoryName: 'Shopping & Electronics', monthlySpend: 12000, rewardRatePercent: 5 },
  ];

  const summary = CreditCardRewardOptimizerEngine.calculateRewards(sampleCategories);

  return (
    <Card title="Credit Card Reward & Cashback Optimizer" subtitle="Category reward rate yield schedule">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Monthly Cashback Earned</span>
            <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300">{formatCurrency(summary.totalMonthlyCashback)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Annualized Cashback</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(summary.totalAnnualCashback)}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold uppercase block">Effective Cashback Yield</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{summary.effectiveCashbackRatePercent}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Category Reward Rates:</span>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {summary.categories.map((cat, idx) => (
              <div key={idx} className="flex justify-between py-2 text-xs">
                <span className="text-slate-700 dark:text-slate-300">{cat.categoryName} ({cat.rewardRatePercent}%)</span>
                <span className="font-bold text-emerald-600">+{formatCurrency(cat.monthlyCashbackEarned)}/mo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
