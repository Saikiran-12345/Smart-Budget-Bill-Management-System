import { describe, it, expect } from 'vitest';
import { InsuranceCoverageAnalyzer } from '../math/insuranceCoverageAnalyzer';

describe('InsuranceCoverageAnalyzer Math', () => {
  it('should analyze life and health insurance gaps', () => {
    const res = InsuranceCoverageAnalyzer.analyzeCoverage(
      [{ id: '1', policyName: 'Term Life', type: 'LIFE', coverageAmount: 5000000, annualPremium: 15000, expiryDate: '2040-01-01' }],
      1200000,
      2000000,
      2
    );

    expect(res.recommendedLifeCover).toBe(14000000);
    expect(res.lifeCoverGap).toBe(9000000);
    expect(res.isAdequatelyInsured).toBe(false);
  });
});
