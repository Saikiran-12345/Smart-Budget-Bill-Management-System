import { describe, it, expect } from 'vitest';
import { calculateSavingsProgressSummary, calculateTotalSavingsAccumulated, calculateCompoundInterestYield } from '../math/savingsMath';
import { SavingsGoal } from '../types/savings';

const sampleGoal: SavingsGoal = {
  id: 's1',
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
};

describe('savingsMath Utilities', () => {
  it('should calculate savings progress percentage correctly', () => {
    const summary = calculateSavingsProgressSummary(sampleGoal);
    expect(summary.progressPercentage).toBe(60);
    expect(summary.remainingAmount).toBe(40000);
    expect(summary.isCompleted).toBe(false);
  });

  it('should accumulate total savings across multiple goals', () => {
    const total = calculateTotalSavingsAccumulated([sampleGoal, { ...sampleGoal, currentAmount: 20000 }]);
    expect(total).toBe(80000);
  });

  it('should calculate compound interest yield schedule', () => {
    const schedule = calculateCompoundInterestYield(10000, 5000, 8, 3);
    expect(schedule.length).toBe(3);
    expect(schedule[2].balance).toBeGreaterThan(190000);
  });
});
