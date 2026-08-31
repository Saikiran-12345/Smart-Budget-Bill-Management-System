import { describe, it, expect } from 'vitest';
import { FiscalYearLedgerExporterEngine } from '../math/calculators/fiscalYearLedgerExporterEngine';

describe('FiscalYearLedgerExporterEngine Math', () => {
  it('should generate quarterly breakdown and tax statement for FY 2025-26', () => {
    const res = FiscalYearLedgerExporterEngine.generateStatement(
      [{ id: '1', source: 'Sal', amount: 150000, date: '2025-05-01', category: 'Salary', description: '', frequency: 'MONTHLY', status: 'RECEIVED', isRecurring: true, createdAt: '', updatedAt: '' }],
      [{ id: '1', title: 'Rent', amount: 40000, date: '2025-05-05', category: 'Housing', paymentMethod: 'Cash', description: '', status: 'COMPLETED', createdAt: '', updatedAt: '' }],
      2025
    );

    expect(res.fiscalYear).toBe('FY 2025-26');
    expect(res.quarterlyBreakdown.q1Income).toBe(150000);
    expect(res.quarterlyBreakdown.q1Expense).toBe(40000);
  });
});
