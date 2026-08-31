import { IncomeItem, IncomeFilterOptions } from '../types/income';
import { INITIAL_DEMO_INCOMES } from '../constants/initialDemoData';
import { StorageService } from './storageService';

const STORAGE_KEY = 'incomes_list';

export class IncomeService {
  public static getAll(): IncomeItem[] {
    return StorageService.getItem<IncomeItem[]>(STORAGE_KEY, INITIAL_DEMO_INCOMES);
  }

  public static getById(id: string): IncomeItem | undefined {
    const incomes = this.getAll();
    return incomes.find((inc) => inc.id === id);
  }

  public static add(incomeData: Omit<IncomeItem, 'id' | 'createdAt' | 'updatedAt'>): IncomeItem {
    const incomes = this.getAll();
    const now = new Date().toISOString();
    const newIncome: IncomeItem = {
      ...incomeData,
      id: `inc_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newIncome, ...incomes];
    StorageService.setItem(STORAGE_KEY, updated);
    return newIncome;
  }

  public static update(id: string, updates: Partial<IncomeItem>): IncomeItem | null {
    const incomes = this.getAll();
    const index = incomes.findIndex((inc) => inc.id === id);
    if (index === -1) return null;

    const updatedItem: IncomeItem = {
      ...incomes[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    incomes[index] = updatedItem;
    StorageService.setItem(STORAGE_KEY, incomes);
    return updatedItem;
  }

  public static delete(id: string): boolean {
    const incomes = this.getAll();
    const filtered = incomes.filter((inc) => inc.id !== id);
    if (filtered.length === incomes.length) return false;

    StorageService.setItem(STORAGE_KEY, filtered);
    return true;
  }

  public static filterIncomes(incomes: IncomeItem[], options: IncomeFilterOptions): IncomeItem[] {
    let result = [...incomes];

    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase().trim();
      result = result.filter(
        (inc) =>
          inc.source.toLowerCase().includes(q) ||
          inc.description.toLowerCase().includes(q) ||
          (inc.referenceNumber && inc.referenceNumber.toLowerCase().includes(q))
      );
    }

    if (options.category && options.category !== 'ALL') {
      result = result.filter((inc) => inc.category === options.category);
    }

    if (options.frequency && options.frequency !== 'ALL') {
      result = result.filter((inc) => inc.frequency === options.frequency);
    }

    if (options.status && options.status !== 'ALL') {
      result = result.filter((inc) => inc.status === options.status);
    }

    if (options.startDate) {
      result = result.filter((inc) => inc.date >= options.startDate!);
    }

    if (options.endDate) {
      result = result.filter((inc) => inc.date <= options.endDate!);
    }

    if (options.minAmount !== undefined) {
      result = result.filter((inc) => inc.amount >= options.minAmount!);
    }

    if (options.maxAmount !== undefined) {
      result = result.filter((inc) => inc.amount <= options.maxAmount!);
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
