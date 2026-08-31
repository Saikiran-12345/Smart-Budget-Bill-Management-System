import { describe, it, expect } from 'vitest';
import { RealEstateROIEngine } from '../math/calculators/realEstateROIEngine';

describe('RealEstateROIEngine Math', () => {
  it('should calculate Cap Rate and Net Operating Income accurately', () => {
    const res = RealEstateROIEngine.calculateROI(5000000, 30000, 15000, 25000, 8000);
    expect(res.grossAnnualRentalIncome).toBe(360000);
    expect(res.netOperatingIncome).toBe(312000);
    expect(res.capRatePercentage).toBeCloseTo(6.24, 2);
  });
});
