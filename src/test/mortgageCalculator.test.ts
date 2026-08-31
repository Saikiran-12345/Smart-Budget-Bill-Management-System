import { describe, it, expect } from 'vitest';
import { MortgageCalculator } from '../math/mortgageCalculator';

describe('MortgageCalculator Math', () => {
  it('should calculate EMI accurately for 50 Lakh home loan at 8.5%', () => {
    const res = MortgageCalculator.calculateMortgage(5000000, 8.5, 20, 0);
    expect(res.monthlyEMI).toBeCloseTo(43391, -2);
    expect(res.totalAmountPayable).toBeGreaterThan(5000000);
    expect(res.amortizationSchedule.length).toBe(20);
  });

  it('should estimate interest savings with prepayment', () => {
    const res = MortgageCalculator.calculateMortgage(5000000, 8.5, 20, 5000);
    expect(res.prepaymentSavingsEstimate).toBeGreaterThan(0);
  });
});
