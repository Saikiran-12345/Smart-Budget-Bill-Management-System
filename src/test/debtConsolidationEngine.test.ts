import { describe, it, expect } from 'vitest';
import { DebtConsolidationEngine } from '../math/calculators/debtConsolidationEngine';

describe('DebtConsolidationEngine Math', () => {
  it('should calculate single consolidated monthly EMI and interest savings', () => {
    const res = DebtConsolidationEngine.calculateConsolidation([
      { id: '1', debtName: 'Credit Card', balance: 50000, aprPercent: 36, monthlyEMI: 4500 },
      { id: '2', debtName: 'Personal Loan', balance: 100000, aprPercent: 16, monthlyEMI: 4000 },
    ], 11.5, 36);

    expect(res.totalOriginalBalance).toBe(150000);
    expect(res.newSingleMonthlyEMI).toBeLessThan(res.currentCombinedMonthlyEMI);
    expect(res.isConsolidationBeneficial).toBe(true);
  });
});
