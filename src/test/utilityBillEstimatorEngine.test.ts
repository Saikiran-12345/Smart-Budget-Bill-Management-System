import { describe, it, expect } from 'vitest';
import { UtilityBillEstimatorEngine } from '../math/calculators/utilityBillEstimatorEngine';

describe('UtilityBillEstimatorEngine Math', () => {
  it('should calculate annual utility bills with seasonal surge', () => {
    const res = UtilityBillEstimatorEngine.calculateUtilityForecast(3000, 800, 600);
    expect(res.totalAnnualUtilitiesCost).toBeGreaterThan(30000);
    expect(res.monthlyAverageCost).toBeGreaterThan(2000);
    expect(res.breakdown.length).toBe(12);
  });
});
