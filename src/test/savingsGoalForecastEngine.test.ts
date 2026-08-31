import { describe, it, expect } from 'vitest';
import { SavingsGoalForecastEngine } from '../math/calculators/savingsGoalForecastEngine';

describe('SavingsGoalForecastEngine Math', () => {
  it('should calculate estimated completion date for savings goal', () => {
    const res = SavingsGoalForecastEngine.forecastGoal({
      id: 'g1',
      goalName: 'Laptop',
      category: 'Gadgets',
      targetAmount: 100000,
      currentAmount: 60000,
      startDate: '2026-01-01',
      targetDate: '2026-12-31',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      monthlyTargetContribution: 10000,
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    });

    expect(res.remainingAmount).toBe(40000);
    expect(res.estimatedMonthsToTarget).toBe(4);
    expect(res.isGoalOnTrack).toBe(true);
  });
});
