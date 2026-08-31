import { describe, it, expect } from 'vitest';
import { LifeStagePlannerEngine } from '../math/calculators/lifeStagePlannerEngine';

describe('LifeStagePlannerEngine Math', () => {
  it('should recommend asset allocation and emergency buffer by age', () => {
    const res = LifeStagePlannerEngine.calculateLifeStageRecommendations(32);
    expect(res.stageName).toBe('FAMILY_BUILDING');
    expect(res.recommendedEmergencyMonths).toBe(6);
    expect(res.recommendedEquityPercent).toBe(70);
  });
});
