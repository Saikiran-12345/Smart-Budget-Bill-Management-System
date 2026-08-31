import { describe, it, expect } from 'vitest';
import { CollegeFundPlannerEngine } from '../math/calculators/collegeFundPlannerEngine';

describe('CollegeFundPlannerEngine Math', () => {
  it('should calculate education inflation and target monthly savings', () => {
    const res = CollegeFundPlannerEngine.calculateCollegeFund(3, 18, 500000, 4, 100000, 8, 11);
    expect(res.yearsToCollege).toBe(15);
    expect(res.inflatedTotalCollegeCost).toBeGreaterThan(2000000);
    expect(res.monthlyDepositRequired).toBeGreaterThan(0);
  });
});
