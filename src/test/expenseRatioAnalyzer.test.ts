import { describe, it, expect } from 'vitest';
import { ExpenseRatioAnalyzer } from '../math/expenseRatioAnalyzer';

describe('ExpenseRatioAnalyzer Math', () => {
  it('should evaluate 50/30/20 rule breakdown correctly', () => {
    const res = ExpenseRatioAnalyzer.analyze503020Rule(
      [{ id: '1', source: 'Sal', amount: 100000, date: '2026-08-01', category: 'Salary', description: '', frequency: 'MONTHLY', status: 'RECEIVED', isRecurring: true, createdAt: '', updatedAt: '' }],
      [
        { id: '1', title: 'Rent', amount: 40000, date: '2026-08-01', category: 'Housing', paymentMethod: 'Cash', description: '', status: 'COMPLETED', createdAt: '', updatedAt: '' },
        { id: '2', title: 'Shopping', amount: 20000, date: '2026-08-02', category: 'Shopping', paymentMethod: 'Cash', description: '', status: 'COMPLETED', createdAt: '', updatedAt: '' },
      ]
    );

    expect(res.needsPercentage).toBe(40);
    expect(res.wantsPercentage).toBe(20);
    expect(res.savingsPercentage).toBe(40);
    expect(res.is503020Balanced).toBe(true);
  });
});
