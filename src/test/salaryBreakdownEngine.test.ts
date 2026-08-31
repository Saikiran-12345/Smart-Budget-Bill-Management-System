import { describe, it, expect } from 'vitest';
import { SalaryBreakdownEngine } from '../math/calculators/salaryBreakdownEngine';

describe('SalaryBreakdownEngine Math', () => {
  it('should calculate net monthly take-home salary from CTC', () => {
    const res = SalaryBreakdownEngine.calculateBreakdown(1200000);
    expect(res.grossMonthlySalary).toBe(100000);
    expect(res.netTakeHomeMonthly).toBeGreaterThan(80000);
    expect(res.takeHomePercentage).toBeGreaterThan(80);
  });
});
