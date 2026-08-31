import React from 'react';
import { StatCard } from '../../ui/StatCard';
import { IncomeCategorySummary } from '../../../types/income';
import { formatCurrency } from '../../../math/formatters';
import { TrendingUp, DollarSign, Award, Percent } from 'lucide-react';

export interface IncomeSummaryCardsProps {
  totalIncome: number;
  projectedAnnualIncome: number;
  topCategorySummary?: IncomeCategorySummary;
  totalCount: number;
}

export const IncomeSummaryCards: React.FC<IncomeSummaryCardsProps> = ({
  totalIncome,
  projectedAnnualIncome,
  topCategorySummary,
  totalCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Gross Recorded Income"
        value={formatCurrency(totalIncome)}
        subtitle={`${totalCount} credit entries`}
        icon={<TrendingUp className="h-5 w-5" />}
        iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
      />
      <StatCard
        title="Annualized Projected"
        value={formatCurrency(projectedAnnualIncome)}
        subtitle="Recurring sources estimate"
        icon={<DollarSign className="h-5 w-5" />}
        iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
      />
      <StatCard
        title="Top Category"
        value={topCategorySummary ? topCategorySummary.category : 'None'}
        subtitle={topCategorySummary ? formatCurrency(topCategorySummary.totalAmount) : '₹0'}
        icon={<Award className="h-5 w-5" />}
        iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
      />
      <StatCard
        title="Top Category Share"
        value={topCategorySummary ? `${topCategorySummary.percentage.toFixed(1)}%` : '0%'}
        subtitle="Contribution ratio"
        icon={<Percent className="h-5 w-5" />}
        iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
      />
    </div>
  );
};
