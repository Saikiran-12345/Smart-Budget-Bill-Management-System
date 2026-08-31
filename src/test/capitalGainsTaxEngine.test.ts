import { describe, it, expect } from 'vitest';
import { CapitalGainsTaxEngine } from '../math/calculators/capitalGainsTaxEngine';

describe('CapitalGainsTaxEngine Math', () => {
  it('should calculate LTCG on equity stocks with 1.25L exemption', () => {
    const res = CapitalGainsTaxEngine.calculateCapitalGains('EQUITY_STOCKS', 200000, 450000, 18);
    expect(res.isLongTerm).toBe(true);
    expect(res.totalGainOrLoss).toBe(250000);
    expect(res.taxExemptionClaimed).toBe(125000);
    expect(res.taxableCapitalGain).toBe(125000);
    expect(res.estimatedTaxLiability).toBe(15625);
  });
});
