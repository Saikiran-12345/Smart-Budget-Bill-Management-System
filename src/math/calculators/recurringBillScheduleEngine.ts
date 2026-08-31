import { BillItem, BillFrequency } from '../../types/bill';

export interface BillScheduleOccurrence {
  billId: string;
  billName: string;
  category: string;
  amount: number;
  occurrenceDate: string;
  daysRemaining: number;
  isOverdue: boolean;
}

export class RecurringBillScheduleEngine {
  public static generateScheduleTimeline(
    bills: BillItem[],
    daysAhead = 60
  ): BillScheduleOccurrence[] {
    const today = new Date();
    const todayTime = today.getTime();
    const futureLimitTime = todayTime + daysAhead * 24 * 60 * 60 * 1000;

    const occurrences: BillScheduleOccurrence[] = [];

    bills.forEach((bill) => {
      let currentDateStr = bill.dueDate;
      let d = new Date(currentDateStr);

      while (!isNaN(d.getTime()) && d.getTime() <= futureLimitTime) {
        const diffDays = Math.ceil((d.getTime() - todayTime) / (1000 * 3600 * 24));
        const isOverdue = diffDays < 0 && bill.status !== 'PAID';

        occurrences.push({
          billId: bill.id,
          billName: bill.billName,
          category: bill.category,
          amount: bill.amount,
          occurrenceDate: d.toISOString().split('T')[0],
          daysRemaining: diffDays,
          isOverdue,
        });

        if (bill.frequency === 'ONE_TIME') break;

        // Increment according to frequency
        if (bill.frequency === 'WEEKLY') d.setDate(d.getDate() + 7);
        else if (bill.frequency === 'BI_WEEKLY') d.setDate(d.getDate() + 14);
        else if (bill.frequency === 'MONTHLY') d.setMonth(d.getMonth() + 1);
        else if (bill.frequency === 'QUARTERLY') d.setMonth(d.getMonth() + 3);
        else if (bill.frequency === 'YEARLY') d.setFullYear(d.getFullYear() + 1);
        else d.setMonth(d.getMonth() + 1);
      }
    });

    return occurrences.sort((a, b) => new Date(a.occurrenceDate).getTime() - new Date(b.occurrenceDate).getTime());
  }
}
