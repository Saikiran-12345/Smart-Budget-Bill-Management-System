import { describe, it, expect } from 'vitest';
import { BillSchedulerEngine } from '../math/billSchedulerEngine';
import { BillItem } from '../types/bill';

const sampleBill: BillItem = {
  id: 'b1',
  billName: 'Broadband',
  billerName: 'Airtel',
  category: 'Utilities',
  amount: 1500,
  dueDate: '2026-08-01',
  frequency: 'MONTHLY',
  status: 'PAID',
  autoPay: true,
  reminderDaysBefore: 3,
  createdAt: '2026-08-01',
  updatedAt: '2026-08-01',
};

describe('BillSchedulerEngine Math', () => {
  it('should calculate next monthly due date', () => {
    const next = BillSchedulerEngine.calculateNextDueDate('2026-08-01', 'MONTHLY');
    expect(next).toBe('2026-09-01');
  });

  it('should generate upcoming schedule occurrences', () => {
    const occurrences = BillSchedulerEngine.generateUpcomingScheduleForBill(sampleBill, 4);
    expect(occurrences.length).toBe(4);
    expect(occurrences[0].nextDueDate).toBe('2026-08-01');
    expect(occurrences[1].nextDueDate).toBe('2026-09-01');
  });
});
