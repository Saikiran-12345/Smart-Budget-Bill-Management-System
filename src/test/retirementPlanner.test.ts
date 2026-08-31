import { describe, it, expect } from 'vitest';
import { RetirementPlanner } from '../math/retirementPlanner';

describe('RetirementPlanner FIRE Math', () => {
  it('should calculate FIRE target corpus based on 4% safe withdrawal rule', () => {
    const res = RetirementPlanner.calculateFIREPlan(30, 55, 600000, 500000, 10, 6, 4);
    expect(res.fireNumberTarget).toBeGreaterThan(15000000);
    expect(res.monthlySavingsRequired).toBeGreaterThan(0);
  });
});
