import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ChartCard } from '../components/ui/ChartCard';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { useAnalytics } from '../hooks/useAnalytics';
import { useExpenses } from '../hooks/useExpenses';
import { useBudgets } from '../hooks/useBudgets';
import { useSavings } from '../hooks/useSavings';

import { SIPTopupCalculatorWidget } from '../components/features/analytics/SIPTopupCalculatorWidget';
import { CompoundInterestWidget } from '../components/features/analytics/CompoundInterestWidget';
import { RetirementPlannerWidget } from '../components/features/analytics/RetirementPlannerWidget';
import { MortgageCalculatorWidget } from '../components/features/analytics/MortgageCalculatorWidget';
import { CreditCardPayoffWidget } from '../components/features/analytics/CreditCardPayoffWidget';
import { TaxCalculatorWidget } from '../components/features/analytics/TaxCalculatorWidget';
import { CreditScoreWidget } from '../components/features/analytics/CreditScoreWidget';
import { FinancialAdviceWidget } from '../components/features/analytics/FinancialAdviceWidget';

import { formatCurrency } from '../math/formatters';
import { BarChart3, PieChart as PieIcon, TrendingUp, Target, Calculator, Gauge, ShieldAlert } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart as RePieChart, Pie, Cell, Legend } from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('spending');
  const { categoryDistribution, incomeMonthlyTrend } = useAnalytics();
  const { merchantBreakdown } = useExpenses();
  const { budgetStatuses } = useBudgets();
  const { goalSummaries } = useSavings();

  const tabs = [
    { id: 'spending', label: 'Spending Analytics', icon: <PieIcon className="h-4 w-4" /> },
    { id: 'budget', label: 'Budget Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'savings', label: 'Savings Analytics', icon: <Target className="h-4 w-4" /> },
    { id: 'calculators', label: 'Financial Calculators', icon: <Calculator className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Analytics & Intelligence"
        description="Deep dive category analytics, merchant ranking, budget compliance, and interactive financial calculators."
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'spending' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Category Spending Distribution" subtitle="Percentage breakdown">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie data={categoryDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="amount" nameKey="category" label>
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => formatCurrency(Number(val))} />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </ChartCard>

            <Card title="Top Merchant Outflows" subtitle="Merchants ranked by transaction total">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {merchantBreakdown.slice(0, 5).map((m, idx) => (
                  <div key={idx} className="flex justify-between py-2.5 text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{m.merchant}</span>
                    <span className="font-bold text-red-600 dark:text-red-400">{formatCurrency(m.totalAmount)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="space-y-6">
          <ChartCard title="Budget vs Actual Spending" subtitle="Category compliance comparison">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetStatuses}>
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip formatter={(val) => formatCurrency(Number(val))} />
                <Legend />
                <Bar dataKey="allocated" fill="#3b82f6" name="Allocated Budget" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" fill="#ef4444" name="Actual Spent" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {activeTab === 'savings' && (
        <div className="space-y-6">
          <ChartCard title="Savings Goals Progress" subtitle="Current saved vs target goal amount">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={goalSummaries}>
                <XAxis dataKey="goalName" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip formatter={(val) => formatCurrency(Number(val))} />
                <Legend />
                <Bar dataKey="currentAmount" fill="#8b5cf6" name="Current Saved" radius={[4, 4, 0, 0]} />
                <Bar dataKey="targetAmount" fill="#cbd5e1" name="Target Objective" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {activeTab === 'calculators' && (
        <div className="space-y-6">
          <SIPTopupCalculatorWidget />
          <CompoundInterestWidget />
          <RetirementPlannerWidget />
          <MortgageCalculatorWidget />
          <CreditCardPayoffWidget />
        </div>
      )}
    </div>
  );
};
