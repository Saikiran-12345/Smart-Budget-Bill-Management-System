import { useApp } from '../context/AppContext';
import { ExpenseService } from '../services/expenseService';
import { ActivityLogService } from '../services/activityLogService';
import { ExpenseItem } from '../types/expense';
import {
  calculateTotalExpenses,
  calculateExpenseCategorySummaries,
  calculateDailyAverageExpense,
  findLargestExpense,
  calculateMerchantSpendingBreakdown,
} from '../math/expenseMath';

export function useExpenses() {
  const { expenses, refreshAllData } = useApp();

  const addExpense = (expenseData: Omit<ExpenseItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = ExpenseService.add(expenseData);
    ActivityLogService.logAction('CREATE_EXPENSE', 'Expense Management', `Recorded expense "${created.title}" (₹${created.amount}).`);
    refreshAllData();
    return created;
  };

  const updateExpense = (id: string, updates: Partial<ExpenseItem>) => {
    const updated = ExpenseService.update(id, updates);
    if (updated) {
      ActivityLogService.logAction('UPDATE_EXPENSE', 'Expense Management', `Updated expense "${updated.title}".`);
      refreshAllData();
    }
    return updated;
  };

  const deleteExpense = (id: string) => {
    const success = ExpenseService.delete(id);
    if (success) {
      ActivityLogService.logAction('DELETE_EXPENSE', 'Expense Management', `Deleted expense record.`);
      refreshAllData();
    }
    return success;
  };

  const totalExpenses = calculateTotalExpenses(expenses);
  const categorySummaries = calculateExpenseCategorySummaries(expenses);
  const dailyAverage = calculateDailyAverageExpense(expenses, 30);
  const largestExpense = findLargestExpense(expenses);
  const merchantBreakdown = calculateMerchantSpendingBreakdown(expenses);

  return {
    expenses,
    totalExpenses,
    categorySummaries,
    dailyAverage,
    largestExpense,
    merchantBreakdown,
    addExpense,
    updateExpense,
    deleteExpense,
    refreshExpenses: refreshAllData,
  };
}
