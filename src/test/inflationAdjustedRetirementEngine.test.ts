import { describe, it, expect } from 'vitest';
import { InflationAdjustedRetirementEngine } from '../math/calculators/inflationAdjustedRetirementEngine';

describe('InflationAdjustedRetirementEngine Math', () => {
  it('should generate 30-year retirement depletion schedule', () => {
    const res = InflationAdjustedRetirementEngine.calculateRetirementTimeline(10000000, 400000, 8, 6, 30, 60);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].nominalCorpus).toBeGreaterThan(0);
  });
});
