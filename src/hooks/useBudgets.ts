import { useApp } from '../context/AppContext';
import { BudgetService } from '../services/budgetService';
import { ActivityLogService } from '../services/activityLogService';
import { BudgetItem } from '../types/budget';
import { calculateOverallBudgetSummary, calculateBudgetStatusSummary } from '../math/budgetMath';

export function useBudgets() {
  const { budgets, refreshAllData } = useApp();

  const addBudget = (budgetData: Omit<BudgetItem, 'id' | 'spentAmount' | 'createdAt' | 'updatedAt'>) => {
    const created = BudgetService.add(budgetData);
    ActivityLogService.logAction('CREATE_BUDGET', 'Budget Management', `Created budget "${created.budgetName}" (₹${created.allocatedAmount}).`);
    refreshAllData();
    return created;
  };

  const updateBudget = (id: string, updates: Partial<BudgetItem>) => {
    const updated = BudgetService.update(id, updates);
    if (updated) {
      ActivityLogService.logAction('UPDATE_BUDGET', 'Budget Management', `Updated budget "${updated.budgetName}".`);
      refreshAllData();
    }
    return updated;
  };

  const deleteBudget = (id: string) => {
    const success = BudgetService.delete(id);
    if (success) {
      ActivityLogService.logAction('DELETE_BUDGET', 'Budget Management', `Deleted budget record.`);
      refreshAllData();
    }
    return success;
  };

  const overallSummary = calculateOverallBudgetSummary(budgets);
  const budgetStatuses = budgets.map((b) => calculateBudgetStatusSummary(b));

  return {
    budgets,
    overallSummary,
    budgetStatuses,
    addBudget,
    updateBudget,
    deleteBudget,
    refreshBudgets: refreshAllData,
  };
}
