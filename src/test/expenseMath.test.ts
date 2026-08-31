import { describe, it, expect } from 'vitest';
import { calculateTotalExpenses, calculateExpenseCategorySummaries, calculateDailyAverageExpense, findLargestExpense } from '../math/expenseMath';
import { ExpenseItem } from '../types/expense';

const sampleExpenses: ExpenseItem[] = [
  {
    id: 'e1',
    title: 'Rent',
    amount: 30000,
    date: '2026-08-02',
    category: 'Housing',
    paymentMethod: 'Net Banking',
    description: 'Rent',
    status: 'COMPLETED',
    createdAt: '2026-08-02',
    updatedAt: '2026-08-02',
  },
  {
    id: 'e2',
    title: 'Groceries',
    amount: 5000,
    date: '2026-08-05',
    category: 'Food',
    paymentMethod: 'Credit Card',
    description: 'Food',
    status: 'COMPLETED',
    createdAt: '2026-08-05',
    updatedAt: '2026-08-05',
  },
];

describe('expenseMath Utilities', () => {
  it('should calculate total expenses correctly', () => {
    const total = calculateTotalExpenses(sampleExpenses);
    expect(total).toBe(35000);
  });

  it('should calculate daily average expense for 30 days', () => {
    const avg = calculateDailyAverageExpense(sampleExpenses, 30);
    expect(avg).toBeCloseTo(1166.67, 1);
  });

  it('should find the largest expense transaction', () => {
    const largest = findLargestExpense(sampleExpenses);
    expect(largest?.title).toBe('Rent');
    expect(largest?.amount).toBe(30000);
  });
});
