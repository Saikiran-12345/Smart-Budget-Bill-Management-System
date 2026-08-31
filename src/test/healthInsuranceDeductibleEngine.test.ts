import { describe, it, expect } from 'vitest';
import { HealthInsuranceDeductibleEngine } from '../math/calculators/healthInsuranceDeductibleEngine';

describe('HealthInsuranceDeductibleEngine Math', () => {
  it('should calculate patient deductible share and insurance payout', () => {
    const res = HealthInsuranceDeductibleEngine.calculateClaimShare(200000, 25000, 10, 50000);
    expect(res.patientPays).toBe(42500);
    expect(res.insuranceCovers).toBe(157500);
  });
});
