import { describe, it, expect } from 'vitest';
import { ELSSMutualFundEngine } from '../math/calculators/elssMutualFundEngine';

describe('ELSSMutualFundEngine Math', () => {
  it('should calculate Section 80C tax savings and 3-year ELSS corpus', () => {
    const res = ELSSMutualFundEngine.calculateELSSInvestment(12500, 12);
    expect(res.section80CDeductionClaimed).toBe(150000);
    expect(res.potentialTaxSaved).toBe(45000);
    expect(res.projectedCorpus3Years).toBeGreaterThan(500000);
  });
});
