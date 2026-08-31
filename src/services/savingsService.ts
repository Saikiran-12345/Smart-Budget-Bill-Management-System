import { SavingsGoal, SavingsTransaction } from '../types/savings';
import { INITIAL_DEMO_SAVINGS, INITIAL_DEMO_SAVINGS_TXNS } from '../constants/initialDemoData';
import { StorageService } from './storageService';

const GOALS_STORAGE_KEY = 'savings_goals_list';
const TXNS_STORAGE_KEY = 'savings_transactions_list';

export class SavingsService {
  public static getAllGoals(): SavingsGoal[] {
    return StorageService.getItem<SavingsGoal[]>(GOALS_STORAGE_KEY, INITIAL_DEMO_SAVINGS);
  }

  public static getGoalById(id: string): SavingsGoal | undefined {
    return this.getAllGoals().find((g) => g.id === id);
  }

  public static addGoal(
    goalData: Omit<SavingsGoal, 'id' | 'currentAmount' | 'status' | 'createdAt' | 'updatedAt'>
  ): SavingsGoal {
    const goals = this.getAllGoals();
    const now = new Date().toISOString();
    const newGoal: SavingsGoal = {
      ...goalData,
      id: `sav_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      currentAmount: 0,
      status: 'IN_PROGRESS',
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newGoal, ...goals];
    StorageService.setItem(GOALS_STORAGE_KEY, updated);
    return newGoal;
  }

  public static updateGoal(id: string, updates: Partial<SavingsGoal>): SavingsGoal | null {
    const goals = this.getAllGoals();
    const index = goals.findIndex((g) => g.id === id);
    if (index === -1) return null;

    const updatedGoal: SavingsGoal = {
      ...goals[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    goals[index] = updatedGoal;
    StorageService.setItem(GOALS_STORAGE_KEY, goals);
    return updatedGoal;
  }

  public static deleteGoal(id: string): boolean {
    const goals = this.getAllGoals();
    const filtered = goals.filter((g) => g.id !== id);
    if (filtered.length === goals.length) return false;

    StorageService.setItem(GOALS_STORAGE_KEY, filtered);
    return true;
  }

  public static getAllTransactions(): SavingsTransaction[] {
    return StorageService.getItem<SavingsTransaction[]>(TXNS_STORAGE_KEY, INITIAL_DEMO_SAVINGS_TXNS);
  }

  public static addContribution(
    goalId: string,
    amount: number,
    type: 'DEPOSIT' | 'WITHDRAWAL' = 'DEPOSIT',
    note?: string
  ): { transaction: SavingsTransaction; updatedGoal: SavingsGoal } {
    const goal = this.getGoalById(goalId);
    if (!goal) throw new Error('Target savings goal not found');

    const now = new Date().toISOString();
    const newTxn: SavingsTransaction = {
      id: `sav_txn_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      goalId,
      goalName: goal.goalName,
      amount,
      type,
      date: now.split('T')[0],
      note,
      createdAt: now,
    };

    const txns = this.getAllTransactions();
    StorageService.setItem(TXNS_STORAGE_KEY, [newTxn, ...txns]);

    const newAmount = type === 'DEPOSIT' ? goal.currentAmount + amount : Math.max(0, goal.currentAmount - amount);
    const isCompleted = newAmount >= goal.targetAmount;
    const updatedStatus = isCompleted ? 'COMPLETED' : goal.status;

    const updatedGoal = this.updateGoal(goalId, {
      currentAmount: newAmount,
      status: updatedStatus,
    })!;

    return { transaction: newTxn, updatedGoal };
  }
}
