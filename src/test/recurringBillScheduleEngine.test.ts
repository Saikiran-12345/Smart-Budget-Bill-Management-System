import { describe, it, expect } from 'vitest';
import { RecurringBillScheduleEngine } from '../math/calculators/recurringBillScheduleEngine';

describe('RecurringBillScheduleEngine Math', () => {
  it('should generate upcoming bill occurrences timeline', () => {
    const res = RecurringBillScheduleEngine.generateScheduleTimeline([
      { id: 'b1', billName: 'Rent', billerName: 'Landlord', category: 'Housing', amount: 25000, dueDate: '2026-08-01', frequency: 'MONTHLY', status: 'UPCOMING', autoPay: false, reminderDaysBefore: 5, createdAt: '', updatedAt: '' },
    ], 60);

    expect(res.length).toBeGreaterThan(0);
    expect(res[0].billName).toBe('Rent');
  });
});
