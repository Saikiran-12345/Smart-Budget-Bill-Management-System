import { ExpenseItem, ExpenseFilterOptions } from '../types/expense';
import { INITIAL_DEMO_EXPENSES } from '../constants/initialDemoData';
import { StorageService } from './storageService';

const STORAGE_KEY = 'expenses_list';

export class ExpenseService {
  public static getAll(): ExpenseItem[] {
    return StorageService.getItem<ExpenseItem[]>(STORAGE_KEY, INITIAL_DEMO_EXPENSES);
  }

  public static getById(id: string): ExpenseItem | undefined {
    const list = this.getAll();
    return list.find((exp) => exp.id === id);
  }

  public static add(expenseData: Omit<ExpenseItem, 'id' | 'createdAt' | 'updatedAt'>): ExpenseItem {
    const list = this.getAll();
    const now = new Date().toISOString();
    const newExpense: ExpenseItem = {
      ...expenseData,
      id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newExpense, ...list];
    StorageService.setItem(STORAGE_KEY, updated);
    return newExpense;
  }

  public static update(id: string, updates: Partial<ExpenseItem>): ExpenseItem | null {
    const list = this.getAll();
    const index = list.findIndex((exp) => exp.id === id);
    if (index === -1) return null;

    const updatedItem: ExpenseItem = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updatedItem;
    StorageService.setItem(STORAGE_KEY, list);
    return updatedItem;
  }

  public static delete(id: string): boolean {
    const list = this.getAll();
    const filtered = list.filter((exp) => exp.id !== id);
    if (filtered.length === list.length) return false;

    StorageService.setItem(STORAGE_KEY, filtered);
    return true;
  }

  public static filterExpenses(expenses: ExpenseItem[], options: ExpenseFilterOptions): ExpenseItem[] {
    let result = [...expenses];

    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase().trim();
      result = result.filter(
        (exp) =>
          exp.title.toLowerCase().includes(q) ||
          exp.description.toLowerCase().includes(q) ||
          (exp.merchant && exp.merchant.toLowerCase().includes(q))
      );
    }

    if (options.category && options.category !== 'ALL') {
      result = result.filter((exp) => exp.category === options.category);
    }

    if (options.paymentMethod && options.paymentMethod !== 'ALL') {
      result = result.filter((exp) => exp.paymentMethod === options.paymentMethod);
    }

    if (options.status && options.status !== 'ALL') {
      result = result.filter((exp) => exp.status === options.status);
    }

    if (options.isTaxDeductible !== undefined) {
      result = result.filter((exp) => !!exp.taxDeductible === options.isTaxDeductible);
    }

    if (options.startDate) {
      result = result.filter((exp) => exp.date >= options.startDate!);
    }

    if (options.endDate) {
      result = result.filter((exp) => exp.date <= options.endDate!);
    }

    if (options.minAmount !== undefined) {
      result = result.filter((exp) => exp.amount >= options.minAmount!);
    }

    if (options.maxAmount !== undefined) {
      result = result.filter((exp) => exp.amount <= options.maxAmount!);
    }

    if (options.sortBy) {
      const field = options.sortBy;
      const isDesc = options.sortOrder === 'desc';
      result.sort((a, b) => {
        let valA = a[field] ?? '';
        let valB = b[field] ?? '';
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return isDesc ? 1 : -1;
        if (valA > valB) return isDesc ? -1 : 1;
        return 0;
      });
    }

    return result;
  }
}
