import { BudgetItem, BudgetStatusSummary, AlertLevel, OverallBudgetSummary } from '../types/budget';
import { ExpenseItem } from '../types/expense';

export const calculateBudgetStatusSummary = (budget: BudgetItem): BudgetStatusSummary => {
  const allocated = budget.allocatedAmount || 0;
  const spent = budget.spentAmount || 0;
  const remaining = Math.max(0, allocated - spent);
  const percentageUsed = allocated > 0 ? (spent / allocated) * 100 : 0;
  const isOverBudget = spent > allocated;

  let alertLevel: AlertLevel = 'NORMAL';
  if (percentageUsed >= 100) {
    alertLevel = 'EXCEEDED_100';
  } else if (percentageUsed >= 90) {
    alertLevel = 'CRITICAL_90';
  } else if (percentageUsed >= 75) {
    alertLevel = 'WARNING_75';
  } else if (percentageUsed >= 50) {
    alertLevel = 'WARNING_50';
  }

  return {
    budgetId: budget.id,
    budgetName: budget.budgetName,
    category: budget.category,
    allocated,
    spent,
    remaining,
    percentageUsed,
    alertLevel,
    isOverBudget,
  };
};

export const calculateOverallBudgetSummary = (budgets: BudgetItem[]): OverallBudgetSummary => {
  let totalBudgeted = 0;
  let totalSpent = 0;
  let overBudgetCount = 0;
  let nearLimitCount = 0;

  budgets.forEach((b) => {
    totalBudgeted += b.allocatedAmount || 0;
    totalSpent += b.spentAmount || 0;
    const summary = calculateBudgetStatusSummary(b);
    if (summary.isOverBudget) overBudgetCount += 1;
    if (summary.alertLevel === 'CRITICAL_90' || summary.alertLevel === 'WARNING_75') nearLimitCount += 1;
  });

  const totalRemaining = Math.max(0, totalBudgeted - totalSpent);
  const overallPercentageUsed = totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0;

  return {
    totalBudgeted,
    totalSpent,
    totalRemaining,
    overallPercentageUsed,
    activeBudgetsCount: budgets.length,
    overBudgetCount,
    nearLimitCount,
  };
};

export const syncBudgetsWithExpenses = (
  budgets: BudgetItem[],
  expenses: ExpenseItem[]
): BudgetItem[] => {
  return budgets.map((budget) => {
    // Filter expenses matching budget category and date range
    const categoryExpenses = expenses.filter((exp) => {
      const isCategoryMatch = exp.category.toLowerCase() === budget.category.toLowerCase();
      const isDateInRange = exp.date >= budget.startDate && exp.date <= budget.endDate;
      return isCategoryMatch && isDateInRange;
    });

    const newSpentAmount = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    return {
      ...budget,
      spentAmount: newSpentAmount,
      updatedAt: new Date().toISOString(),
    };
  });
};
