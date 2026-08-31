import { describe, it, expect } from 'vitest';
import { NPSPensionCalculatorEngine } from '../math/calculators/npsPensionCalculatorEngine';

describe('NPSPensionCalculatorEngine Math', () => {
  it('should calculate NPS maturity corpus and estimated monthly pension', () => {
    const res = NPSPensionCalculatorEngine.calculateNPSPension(30, 60, 5000, 10, 40, 6);
    expect(res.totalMaturityCorpus).toBeGreaterThan(5000000);
    expect(res.lumpSumTaxFreeWithdrawal).toBeGreaterThan(3000000);
    expect(res.estimatedMonthlyPension).toBeGreaterThan(10000);
  });
});
