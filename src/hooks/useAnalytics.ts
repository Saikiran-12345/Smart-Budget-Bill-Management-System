import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { calculateFinancialHealthScore } from '../math/financialHealthMath';
import { calculateMonthlyFinancialSummary, calculateSpendingCategoryDistributionForChart } from '../math/analyticsMath';
import { calculateMonthlyIncomeTrend } from '../math/incomeMath';
import { calculateEstimatedTaxLiability } from '../math/taxMath';

export function useAnalytics(selectedYear = new Date().getFullYear(), selectedMonth = new Date().getMonth() + 1) {
  const { incomes, expenses, bills, savingsGoals, payments, savingsTransactions } = useApp();

  const healthScore = useMemo(() => {
    return calculateFinancialHealthScore(incomes, expenses, bills, savingsGoals);
  }, [incomes, expenses, bills, savingsGoals]);

  const monthlySummary = useMemo(() => {
    return calculateMonthlyFinancialSummary(selectedYear, selectedMonth, incomes, expenses, payments, savingsTransactions);
  }, [selectedYear, selectedMonth, incomes, expenses, payments, savingsTransactions]);

  const categoryDistribution = useMemo(() => {
    return calculateSpendingCategoryDistributionForChart(expenses);
  }, [expenses]);

  const incomeMonthlyTrend = useMemo(() => {
    return calculateMonthlyIncomeTrend(incomes, selectedYear);
  }, [incomes, selectedYear]);

  const taxEstimate = useMemo(() => {
    return calculateEstimatedTaxLiability(incomes, expenses);
  }, [incomes, expenses]);

  return {
    healthScore,
    monthlySummary,
    categoryDistribution,
    incomeMonthlyTrend,
    taxEstimate,
  };
}
