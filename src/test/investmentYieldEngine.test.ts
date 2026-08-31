import { describe, it, expect } from 'vitest';
import { InvestmentYieldEngine } from '../math/investmentYieldEngine';

describe('InvestmentYieldEngine Math', () => {
  it('should calculate SIP wealth creation accurately', () => {
    const res = InvestmentYieldEngine.calculateSIPReturn(10000, 12, 5);
    expect(res.principalInvested).toBe(600000);
    expect(res.estimatedWealthCreated).toBeGreaterThan(800000);
    expect(res.schedule.length).toBe(5);
  });

  it('should calculate lumpsum growth', () => {
    const res = InvestmentYieldEngine.calculateLumpsumReturn(100000, 10, 3);
    expect(res.finalAmount).toBe(133100);
    expect(res.totalGain).toBe(33100);
  });
});
