import { BudgetItem } from '../types/budget';
import { INITIAL_DEMO_BUDGETS } from '../constants/initialDemoData';
import { StorageService } from './storageService';
import { ExpenseService } from './expenseService';
import { syncBudgetsWithExpenses } from '../math/budgetMath';

const STORAGE_KEY = 'budgets_list';

export class BudgetService {
  public static getAll(): BudgetItem[] {
    const rawBudgets = StorageService.getItem<BudgetItem[]>(STORAGE_KEY, INITIAL_DEMO_BUDGETS);
    const expenses = ExpenseService.getAll();
    return syncBudgetsWithExpenses(rawBudgets, expenses);
  }

  public static getById(id: string): BudgetItem | undefined {
    return this.getAll().find((b) => b.id === id);
  }

  public static add(budgetData: Omit<BudgetItem, 'id' | 'spentAmount' | 'createdAt' | 'updatedAt'>): BudgetItem {
    const budgets = this.getAll();
    const now = new Date().toISOString();
    const newBudget: BudgetItem = {
      ...budgetData,
      id: `bud_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      spentAmount: 0,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newBudget, ...budgets];
    StorageService.setItem(STORAGE_KEY, updated);
    return newBudget;
  }

  public static update(id: string, updates: Partial<BudgetItem>): BudgetItem | null {
    const budgets = this.getAll();
    const index = budgets.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updatedItem: BudgetItem = {
      ...budgets[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    budgets[index] = updatedItem;
    StorageService.setItem(STORAGE_KEY, budgets);
    return updatedItem;
  }

  public static delete(id: string): boolean {
    const budgets = this.getAll();
    const filtered = budgets.filter((b) => b.id !== id);
    if (filtered.length === budgets.length) return false;

    StorageService.setItem(STORAGE_KEY, filtered);
    return true;
  }
}
