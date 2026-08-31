import { describe, it, expect } from 'vitest';
import { calculateBudgetStatusSummary, calculateOverallBudgetSummary } from '../math/budgetMath';
import { BudgetItem } from '../types/budget';

const sampleBudget: BudgetItem = {
  id: 'b1',
  budgetName: 'Food Cap',
  category: 'Food',
  allocatedAmount: 10000,
  spentAmount: 8500,
  period: 'MONTHLY',
  month: 8,
  year: 2026,
  startDate: '2026-08-01',
  endDate: '2026-08-31',
  rolloverUnused: false,
  alertThresholdPercent: 80,
  createdAt: '2026-08-01',
  updatedAt: '2026-08-01',
};

describe('budgetMath Utilities', () => {
  it('should calculate budget status summary and alert level correctly', () => {
    const summary = calculateBudgetStatusSummary(sampleBudget);
    expect(summary.allocated).toBe(10000);
    expect(summary.spent).toBe(8500);
    expect(summary.remaining).toBe(1500);
    expect(summary.percentageUsed).toBe(85);
    expect(summary.alertLevel).toBe('WARNING_75');
    expect(summary.isOverBudget).toBe(false);
  });

  it('should detect when budget limit is exceeded', () => {
    const exceeded = { ...sampleBudget, spentAmount: 12000 };
    const summary = calculateBudgetStatusSummary(exceeded);
    expect(summary.percentageUsed).toBe(120);
    expect(summary.alertLevel).toBe('EXCEEDED_100');
    expect(summary.isOverBudget).toBe(true);
  });
});
