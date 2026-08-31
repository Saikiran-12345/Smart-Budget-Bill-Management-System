import { describe, it, expect } from 'vitest';
import { TaxOptimizationEngine } from '../math/taxOptimizationEngine';

describe('TaxOptimizationEngine Math', () => {
  it('should calculate Section 80C and 80D headroom', () => {
    const res = TaxOptimizationEngine.calculateTaxOptimizationHeadroom(
      50000, // ELSS
      20000, // PPF
      0,
      15000, // Health Ins
      240000, // Rent
      800000 // Basic Salary
    );

    expect(res.current80CDeductions).toBe(70000);
    expect(res.remaining80CHeadroom).toBe(80000);
    expect(res.remaining80DHeadroom).toBe(10000);
    expect(res.potentialTaxSaved).toBeGreaterThan(0);
  });
});
