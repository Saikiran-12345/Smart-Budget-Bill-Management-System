import { describe, it, expect } from 'vitest';
import { TaxDeductionTrackerEngine } from '../math/calculators/taxDeductionTrackerEngine';

describe('TaxDeductionTrackerEngine Math', () => {
  it('should calculate Section 80C, 80D, 80CCD1B headroom status', () => {
    const res = TaxDeductionTrackerEngine.calculateDeductionStatus(100000, 20000, 50000, 150000);
    expect(res.length).toBe(4);
    expect(res[0].remainingHeadroomAmount).toBe(50000);
    expect(res[2].utilizationPercentage).toBe(100);
  });
});
