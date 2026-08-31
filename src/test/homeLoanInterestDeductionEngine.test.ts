import { describe, it, expect } from 'vitest';
import { HomeLoanInterestDeductionEngine } from '../math/calculators/homeLoanInterestDeductionEngine';

describe('HomeLoanInterestDeductionEngine Math', () => {
  it('should calculate joint home loan tax deduction split', () => {
    const res = HomeLoanInterestDeductionEngine.calculateJointDeduction(350000, 200000, 50, 30);
    expect(res.borrower1Deduction.section24bInterest).toBe(175000);
    expect(res.borrower2Deduction.section24bInterest).toBe(175000);
    expect(res.combinedTaxSavings).toBeGreaterThan(150000);
  });
});
