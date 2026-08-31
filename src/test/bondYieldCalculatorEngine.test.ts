import { describe, it, expect } from 'vitest';
import { BondYieldCalculatorEngine } from '../math/calculators/bondYieldCalculatorEngine';

describe('BondYieldCalculatorEngine Math', () => {
  it('should calculate bond current yield and approximate YTM', () => {
    const res = BondYieldCalculatorEngine.calculateBondYield(1000, 7.5, 980, 5);
    expect(res.annualCouponPayment).toBe(75);
    expect(res.currentYieldPercent).toBeCloseTo(7.65, 2);
    expect(res.yieldToMaturityPercent).toBeGreaterThan(7.5);
  });
});
