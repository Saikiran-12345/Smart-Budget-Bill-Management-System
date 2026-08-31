import { describe, it, expect } from 'vitest';
import { MortgageRefinanceEngine } from '../math/calculators/mortgageRefinanceEngine';

describe('MortgageRefinanceEngine Math', () => {
  it('should calculate refinancing monthly EMI savings and break-even months', () => {
    const res = MortgageRefinanceEngine.calculateRefinance(4000000, 9.5, 8.2, 180, 25000);
    expect(res.currentMonthlyEMI).toBeGreaterThan(res.newMonthlyEMI);
    expect(res.monthlyEMISavings).toBeGreaterThan(0);
    expect(res.netLifetimeInterestSavings).toBeGreaterThan(50000);
    expect(res.isRefinancingRecommended).toBe(true);
  });
});
