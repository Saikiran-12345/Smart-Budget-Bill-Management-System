import React from 'react';
import { StatCard } from '../../ui/StatCard';
import { ExpenseCategorySummary } from '../../../types/expense';
import { formatCurrency } from '../../../math/formatters';
import { CreditCard, ShoppingCart, Award, Flame } from 'lucide-react';

export interface ExpenseSummaryCardsProps {
  totalExpenses: number;
  dailyAverage: number;
  topCategorySummary?: ExpenseCategorySummary;
  taxDeductibleTotal: number;
}

export const ExpenseSummaryCards: React.FC<ExpenseSummaryCardsProps> = ({
  totalExpenses,
  dailyAverage,
  topCategorySummary,
  taxDeductibleTotal,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Spending"
        value={formatCurrency(totalExpenses)}
        subtitle="Gross debit transactions"
        icon={<CreditCard className="h-5 w-5" />}
        iconBgColor="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
      />
      <StatCard
        title="Daily Burn Rate"
        value={formatCurrency(dailyAverage)}
        subtitle="Average daily outflow"
        icon={<Flame className="h-5 w-5" />}
        iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
      />
      <StatCard
        title="Highest Category"
        value={topCategorySummary ? topCategorySummary.category : 'None'}
        subtitle={topCategorySummary ? formatCurrency(topCategorySummary.totalAmount) : '₹0'}
        icon={<Award className="h-5 w-5" />}
        iconBgColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
      />
      <StatCard
        title="Tax Deductible Tally"
        value={formatCurrency(taxDeductibleTotal)}
        subtitle="Eligible business expenses"
        icon={<ShoppingCart className="h-5 w-5" />}
        iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
      />
    </div>
  );
};
