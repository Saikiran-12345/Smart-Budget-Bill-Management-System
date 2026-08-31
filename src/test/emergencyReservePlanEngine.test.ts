import { describe, it, expect } from 'vitest';
import { EmergencyReservePlanEngine } from '../math/calculators/emergencyReservePlanEngine';

describe('EmergencyReservePlanEngine Math', () => {
  it('should generate monthly deposit plan to reach 6-month buffer', () => {
    const res = EmergencyReservePlanEngine.generateSavingsPlan(40000, 100000, 20000, 6);
    expect(res.targetReserveAmount).toBe(240000);
    expect(res.shortfall).toBe(140000);
    expect(res.monthsToTarget).toBe(7);
    expect(res.plan.length).toBe(7);
  });
});
