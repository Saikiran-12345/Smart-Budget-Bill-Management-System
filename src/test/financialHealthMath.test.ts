import { describe, it, expect } from 'vitest';
import { calculateFinancialHealthScore } from '../math/financialHealthMath';

describe('financialHealthMath Engine', () => {
  it('should compute health index score between 0 and 100', () => {
    const health = calculateFinancialHealthScore(
      [{ id: '1', source: 'Sal', amount: 100000, date: '2026-08-01', category: 'Salary', description: '', frequency: 'MONTHLY', status: 'RECEIVED', isRecurring: true, createdAt: '', updatedAt: '' }],
      [{ id: '1', title: 'Rent', amount: 30000, date: '2026-08-01', category: 'Housing', paymentMethod: 'Cash', description: '', status: 'COMPLETED', createdAt: '', updatedAt: '' }],
      [{ id: '1', billName: 'Net', billerName: '', category: 'Utilities', amount: 1000, dueDate: '2026-08-01', frequency: 'MONTHLY', status: 'PAID', autoPay: false, reminderDaysBefore: 3, createdAt: '', updatedAt: '' }],
      [{ id: '1', goalName: 'Emerg', category: 'Emergency', targetAmount: 300000, currentAmount: 180000, startDate: '', targetDate: '', priority: 'HIGH', status: 'IN_PROGRESS', monthlyTargetContribution: 10000, createdAt: '', updatedAt: '' }]
    );

    expect(health.score).toBeGreaterThanOrEqual(0);
    expect(health.score).toBeLessThanOrEqual(100);
    expect(['POOR', 'FAIR', 'GOOD', 'EXCELLENT']).toContain(health.rating);
    expect(health.emergencyFundMonths).toBe(6);
  });
});
