import { ExpenseItem, ExpenseCategorySummary, ExpenseCategoryType } from '../types/expense';

export const calculateTotalExpenses = (expenses: ExpenseItem[]): number => {
  return expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
};

export const filterExpensesByDateRange = (
  expenses: ExpenseItem[],
  startDate: string,
  endDate: string
): ExpenseItem[] => {
  return expenses.filter((item) => {
    if (!item.date) return false;
    return item.date >= startDate && item.date <= endDate;
  });
};

export const calculateExpenseCategorySummaries = (expenses: ExpenseItem[]): ExpenseCategorySummary[] => {
  const total = calculateTotalExpenses(expenses);
  const categoryMap: Record<string, { totalAmount: number; count: number; maxAmount: number }> = {};

  expenses.forEach((item) => {
    const cat = item.category || 'Other';
    if (!categoryMap[cat]) {
      categoryMap[cat] = { totalAmount: 0, count: 0, maxAmount: 0 };
    }
    categoryMap[cat].totalAmount += item.amount;
    categoryMap[cat].count += 1;
    if (item.amount > categoryMap[cat].maxAmount) {
      categoryMap[cat].maxAmount = item.amount;
    }
  });

  return Object.entries(categoryMap).map(([category, data]) => ({
    category: category as ExpenseCategoryType,
    totalAmount: data.totalAmount,
    count: data.count,
    percentage: total > 0 ? (data.totalAmount / total) * 100 : 0,
    averageAmount: data.count > 0 ? data.totalAmount / data.count : 0,
    maxAmount: data.maxAmount,
  })).sort((a, b) => b.totalAmount - a.totalAmount);
};

export const calculateDailyAverageExpense = (expenses: ExpenseItem[], daysCount = 30): number => {
  const total = calculateTotalExpenses(expenses);
  return daysCount > 0 ? total / daysCount : 0;
};

export const findLargestExpense = (expenses: ExpenseItem[]): ExpenseItem | null => {
  if (expenses.length === 0) return null;
  return expenses.reduce((max, item) => (item.amount > max.amount ? item : max), expenses[0]);
};

export const calculateTaxDeductibleExpensesTotal = (expenses: ExpenseItem[]): number => {
  return expenses
    .filter((item) => item.taxDeductible)
    .reduce((sum, item) => sum + item.amount, 0);
};

export const calculateMerchantSpendingBreakdown = (
  expenses: ExpenseItem[]
): { merchant: string; totalAmount: number; count: number }[] => {
  const merchantMap: Record<string, { totalAmount: number; count: number }> = {};

  expenses.forEach((item) => {
    const merchantName = item.merchant || 'General Merchant';
    if (!merchantMap[merchantName]) {
      merchantMap[merchantName] = { totalAmount: 0, count: 0 };
    }
    merchantMap[merchantName].totalAmount += item.amount;
    merchantMap[merchantName].count += 1;
  });

  return Object.entries(merchantMap)
    .map(([merchant, data]) => ({
      merchant,
      totalAmount: data.totalAmount,
      count: data.count,
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);
};
