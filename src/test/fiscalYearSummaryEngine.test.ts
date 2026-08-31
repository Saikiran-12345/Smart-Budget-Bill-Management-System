import { describe, it, expect } from 'vitest';
import { FiscalYearSummaryEngine } from '../math/fiscalYearSummaryEngine';

describe('FiscalYearSummaryEngine Math', () => {
  it('should filter and aggregate FY 2025-26 transactions correctly', () => {
    const res = FiscalYearSummaryEngine.calculateFiscalYearSummary(
      [{ id: '1', source: 'Sal', amount: 120000, date: '2025-08-01', category: 'Salary', description: '', frequency: 'MONTHLY', status: 'RECEIVED', isRecurring: true, createdAt: '', updatedAt: '' }],
      [{ id: '1', title: 'Rent', amount: 30000, date: '2025-08-05', category: 'Housing', paymentMethod: 'Cash', description: '', status: 'COMPLETED', createdAt: '', updatedAt: '' }],
      2025
    );

    expect(res.fiscalYearLabel).toBe('FY 2025-26');
    expect(res.totalFiscalIncome).toBe(120000);
    expect(res.totalFiscalExpenses).toBe(30000);
    expect(res.netFiscalSavings).toBe(90000);
  });
});
