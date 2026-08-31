import { describe, it, expect } from 'vitest';
import { calculateTotalIncome, calculateIncomeCategorySummaries, calculateProjectedAnnualIncome } from '../math/incomeMath';
import { IncomeItem } from '../types/income';

const sampleIncomes: IncomeItem[] = [
  {
    id: '1',
    source: 'Salary',
    amount: 100000,
    date: '2026-08-01',
    category: 'Salary',
    description: 'Monthly salary',
    frequency: 'MONTHLY',
    status: 'RECEIVED',
    isRecurring: true,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-01',
  },
  {
    id: '2',
    source: 'Freelance',
    amount: 25000,
    date: '2026-08-10',
    category: 'Freelance',
    description: 'Design gig',
    frequency: 'ONE_TIME',
    status: 'RECEIVED',
    isRecurring: false,
    createdAt: '2026-08-10',
    updatedAt: '2026-08-10',
  },
];

describe('incomeMath Utilities', () => {
  it('should calculate total income correctly', () => {
    const total = calculateTotalIncome(sampleIncomes);
    expect(total).toBe(125000);
  });

  it('should calculate income category summaries with percentages', () => {
    const summaries = calculateIncomeCategorySummaries(sampleIncomes);
    expect(summaries.length).toBe(2);
    expect(summaries[0].category).toBe('Salary');
    expect(summaries[0].totalAmount).toBe(100000);
    expect(summaries[0].percentage).toBe(80);
  });

  it('should calculate projected annual income for recurring monthly salary', () => {
    const annual = calculateProjectedAnnualIncome(sampleIncomes);
    expect(annual).toBe(1200000);
  });
});
