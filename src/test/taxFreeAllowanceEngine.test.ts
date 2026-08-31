import { describe, it, expect } from 'vitest';
import { TaxFreeAllowanceEngine } from '../math/calculators/taxFreeAllowanceEngine';

describe('TaxFreeAllowanceEngine Math', () => {
  it('should calculate total tax free allowances and HRA exemption', () => {
    const res = TaxFreeAllowanceEngine.calculateTaxFreeAllowance(
      600000, 240000, 180000, 50000, 100000, 15000, 15000, 50000, 150000
    );

    expect(res.standardDeduction).toBe(75000);
    expect(res.section80CAllowance).toBe(150000);
    expect(res.section80DAllowance).toBe(30000);
    expect(res.totalTaxFreeExemptions).toBeGreaterThan(500000);
  });
});
