import { describe, it, expect } from 'vitest';
import { calculateTotalBillsAmount, getUpcomingBillsWithinDays, getOverdueBills, calculateBillPaymentCompletionRate } from '../math/billMath';
import { BillItem } from '../types/bill';

const sampleBills: BillItem[] = [
  {
    id: 'b1',
    billName: 'Rent',
    billerName: 'Landlord',
    category: 'Housing',
    amount: 25000,
    dueDate: '2026-09-02',
    frequency: 'MONTHLY',
    status: 'UPCOMING',
    autoPay: false,
    reminderDaysBefore: 5,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-01',
  },
  {
    id: 'b2',
    billName: 'Electricity',
    billerName: 'Power Grid',
    category: 'Utilities',
    amount: 3000,
    dueDate: '2026-08-10',
    frequency: 'MONTHLY',
    status: 'OVERDUE',
    autoPay: false,
    reminderDaysBefore: 3,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-01',
  },
  {
    id: 'b3',
    billName: 'Broadband',
    billerName: 'Airtel',
    category: 'Utilities',
    amount: 1500,
    dueDate: '2026-08-08',
    frequency: 'MONTHLY',
    status: 'PAID',
    autoPay: true,
    reminderDaysBefore: 3,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-01',
  },
];

describe('billMath Utilities', () => {
  it('should calculate total bill amounts', () => {
    const total = calculateTotalBillsAmount(sampleBills);
    expect(total).toBe(29500);
  });

  it('should identify overdue bills correctly', () => {
    const overdue = getOverdueBills(sampleBills);
    expect(overdue.length).toBe(1);
    expect(overdue[0].billName).toBe('Electricity');
  });

  it('should calculate completion rates correctly', () => {
    const metrics = calculateBillPaymentCompletionRate(sampleBills);
    expect(metrics.totalCount).toBe(3);
    expect(metrics.paidCount).toBe(1);
    expect(metrics.completionPercentage).toBeCloseTo(33.33, 1);
  });
});
