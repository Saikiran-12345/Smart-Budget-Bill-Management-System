import { BillItem, BillFilterOptions } from '../types/bill';
import { INITIAL_DEMO_BILLS } from '../constants/initialDemoData';
import { StorageService } from './storageService';
import { isDateInPast } from '../math/dateUtils';

const STORAGE_KEY = 'bills_list';

export class BillService {
  public static getAll(): BillItem[] {
    const bills = StorageService.getItem<BillItem[]>(STORAGE_KEY, INITIAL_DEMO_BILLS);
    // Auto-update overdue statuses dynamically
    return bills.map((b) => {
      if (b.status !== 'PAID' && b.status !== 'CANCELLED' && isDateInPast(b.dueDate)) {
        return { ...b, status: 'OVERDUE' };
      }
      return b;
    });
  }

  public static getById(id: string): BillItem | undefined {
    return this.getAll().find((b) => b.id === id);
  }

  public static add(billData: Omit<BillItem, 'id' | 'createdAt' | 'updatedAt'>): BillItem {
    const list = this.getAll();
    const now = new Date().toISOString();
    const newBill: BillItem = {
      ...billData,
      id: `bill_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newBill, ...list];
    StorageService.setItem(STORAGE_KEY, updated);
    return newBill;
  }

  public static update(id: string, updates: Partial<BillItem>): BillItem | null {
    const list = this.getAll();
    const index = list.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updatedBill: BillItem = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updatedBill;
    StorageService.setItem(STORAGE_KEY, list);
    return updatedBill;
  }

  public static delete(id: string): boolean {
    const list = this.getAll();
    const filtered = list.filter((b) => b.id !== id);
    if (filtered.length === list.length) return false;

    StorageService.setItem(STORAGE_KEY, filtered);
    return true;
  }

  public static filterBills(bills: BillItem[], options: BillFilterOptions): BillItem[] {
    let result = [...bills];

    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.billName.toLowerCase().includes(q) ||
          b.billerName.toLowerCase().includes(q) ||
          (b.notes && b.notes.toLowerCase().includes(q))
      );
    }

    if (options.category && options.category !== 'ALL') {
      result = result.filter((b) => b.category === options.category);
    }

    if (options.status && options.status !== 'ALL') {
      result = result.filter((b) => b.status === options.status);
    }

    if (options.frequency && options.frequency !== 'ALL') {
      result = result.filter((b) => b.frequency === options.frequency);
    }

    if (options.startDate) {
      result = result.filter((b) => b.dueDate >= options.startDate!);
    }

    if (options.endDate) {
      result = result.filter((b) => b.dueDate <= options.endDate!);
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
