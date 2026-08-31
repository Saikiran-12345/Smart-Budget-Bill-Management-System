import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Select } from '../components/ui/Select';
import { HealthIndexCard } from '../components/features/summary/HealthIndexCard';
import { TaxCalculatorWidget } from '../components/features/analytics/TaxCalculatorWidget';
import { CreditScoreWidget } from '../components/features/analytics/CreditScoreWidget';
import { FinancialAdviceWidget } from '../components/features/analytics/FinancialAdviceWidget';
import { DebtSnowballWidget } from '../components/features/analytics/DebtSnowballWidget';

import { useAnalytics } from '../hooks/useAnalytics';
import { formatCurrency } from '../math/formatters';
import { MONTH_NAMES } from '../math/dateUtils';
import { BarChart3, TrendingUp, CreditCard, PiggyBank, Receipt } from 'lucide-react';

export const SummaryPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(8);

  const { monthlySummary, healthScore } = useAnalytics(selectedYear, selectedMonth);

  const monthOptions = MONTH_NAMES.map((name, idx) => ({
    label: name,
    value: idx + 1,
  }));

  const yearOptions = [
    { label: '2026', value: 2026 },
    { label: '2025', value: 2025 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Monthly & Yearly Financial Summary"
        description="Comprehensive financial health index, tax optimization, credit simulator, and monthly statements."
        action={
          <div className="flex gap-2">
            <div className="w-32">
              <Select
                value={selectedMonth}
                options={monthOptions}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              />
            </div>
            <div className="w-24">
              <Select
                value={selectedYear}
                options={yearOptions}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              />
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Income"
          value={formatCurrency(monthlySummary.totalIncome)}
          subtitle={`${monthlySummary.monthName} ${selectedYear}`}
          icon={<TrendingUp className="h-5 w-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(monthlySummary.totalExpenses)}
          subtitle={`Top category: ${monthlySummary.topExpenseCategory}`}
          icon={<CreditCard className="h-5 w-5" />}
          iconBgColor="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
        />
        <StatCard
          title="Bills Cleared"
          value={formatCurrency(monthlySummary.totalBillsPaid)}
          subtitle="Utility and housing payments"
          icon={<Receipt className="h-5 w-5" />}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
        />
        <StatCard
          title="Savings Rate"
          value={`${monthlySummary.savingsRate.toFixed(1)}%`}
          subtitle={`Saved ${formatCurrency(monthlySummary.totalSavingsAdded)}`}
          icon={<PiggyBank className="h-5 w-5" />}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthIndexCard healthScore={healthScore} />
        <FinancialAdviceWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaxCalculatorWidget />
        <CreditScoreWidget />
      </div>

      <DebtSnowballWidget />
    </div>
  );
};
