import { useApp } from '../context/AppContext';
import { IncomeService } from '../services/incomeService';
import { ActivityLogService } from '../services/activityLogService';
import { IncomeItem } from '../types/income';
import { calculateTotalIncome, calculateIncomeCategorySummaries, calculateProjectedAnnualIncome } from '../math/incomeMath';

export function useIncome() {
  const { incomes, refreshAllData } = useApp();

  const addIncome = (incomeData: Omit<IncomeItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = IncomeService.add(incomeData);
    ActivityLogService.logAction('CREATE_INCOME', 'Income Management', `Added income from ${created.source} (₹${created.amount}).`);
    refreshAllData();
    return created;
  };

  const updateIncome = (id: string, updates: Partial<IncomeItem>) => {
    const updated = IncomeService.update(id, updates);
    if (updated) {
      ActivityLogService.logAction('UPDATE_INCOME', 'Income Management', `Updated income record ${updated.source}.`);
      refreshAllData();
    }
    return updated;
  };

  const deleteIncome = (id: string) => {
    const success = IncomeService.delete(id);
    if (success) {
      ActivityLogService.logAction('DELETE_INCOME', 'Income Management', `Deleted income record.`);
      refreshAllData();
    }
    return success;
  };

  const totalIncome = calculateTotalIncome(incomes);
  const categorySummaries = calculateIncomeCategorySummaries(incomes);
  const projectedAnnualIncome = calculateProjectedAnnualIncome(incomes);

  return {
    incomes,
    totalIncome,
    categorySummaries,
    projectedAnnualIncome,
    addIncome,
    updateIncome,
    deleteIncome,
    refreshIncomes: refreshAllData,
  };
}
