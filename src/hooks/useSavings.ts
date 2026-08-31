import { useApp } from '../context/AppContext';
import { SavingsService } from '../services/savingsService';
import { ActivityLogService } from '../services/activityLogService';
import { SavingsGoal } from '../types/savings';
import {
  calculateSavingsProgressSummary,
  calculateTotalSavingsAccumulated,
  calculateTotalSavingsTarget,
} from '../math/savingsMath';

export function useSavings() {
  const { savingsGoals, savingsTransactions, refreshAllData } = useApp();

  const addSavingsGoal = (
    goalData: Omit<SavingsGoal, 'id' | 'currentAmount' | 'status' | 'createdAt' | 'updatedAt'>
  ) => {
    const created = SavingsService.addGoal(goalData);
    ActivityLogService.logAction('CREATE_SAVINGS_GOAL', 'Savings Goals', `Created savings goal "${created.goalName}" (Target: ₹${created.targetAmount}).`);
    refreshAllData();
    return created;
  };

  const updateSavingsGoal = (id: string, updates: Partial<SavingsGoal>) => {
    const updated = SavingsService.updateGoal(id, updates);
    if (updated) {
      ActivityLogService.logAction('UPDATE_SAVINGS_GOAL', 'Savings Goals', `Updated savings goal "${updated.goalName}".`);
      refreshAllData();
    }
    return updated;
  };

  const deleteSavingsGoal = (id: string) => {
    const success = SavingsService.deleteGoal(id);
    if (success) {
      ActivityLogService.logAction('DELETE_SAVINGS_GOAL', 'Savings Goals', `Deleted savings goal.`);
      refreshAllData();
    }
    return success;
  };

  const addContribution = (
    goalId: string,
    amount: number,
    type: 'DEPOSIT' | 'WITHDRAWAL' = 'DEPOSIT',
    note?: string
  ) => {
    const result = SavingsService.addContribution(goalId, amount, type, note);
    const action = type === 'DEPOSIT' ? 'DEPOSIT_SAVINGS' : 'WITHDRAW_SAVINGS';
    ActivityLogService.logAction(action, 'Savings Goals', `${type === 'DEPOSIT' ? 'Deposited' : 'Withdrew'} ₹${amount} for goal "${result.updatedGoal.goalName}".`);
    refreshAllData();
    return result;
  };

  const totalSaved = calculateTotalSavingsAccumulated(savingsGoals);
  const totalTarget = calculateTotalSavingsTarget(savingsGoals);
  const overallProgressPercentage = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;
  const goalSummaries = savingsGoals.map((g) => calculateSavingsProgressSummary(g));

  return {
    savingsGoals,
    savingsTransactions,
    totalSaved,
    totalTarget,
    overallProgressPercentage,
    goalSummaries,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    addContribution,
    refreshSavings: refreshAllData,
  };
}
