import { BillItem, BillFrequency } from '../types/bill';

export interface NextDueDateOccurrence {
  billId: string;
  billName: string;
  nextDueDate: string;
  daysUntilDue: number;
  isOverdue: boolean;
}

export class BillSchedulerEngine {
  public static calculateNextDueDate(currentDueDate: string, frequency: BillFrequency): string {
    const d = new Date(currentDueDate);
    if (isNaN(d.getTime())) return currentDueDate;

    switch (frequency) {
      case 'WEEKLY':
        d.setDate(d.getDate() + 7);
        break;
      case 'BI_WEEKLY':
        d.setDate(d.getDate() + 14);
        break;
      case 'MONTHLY':
        d.setMonth(d.getMonth() + 1);
        break;
      case 'QUARTERLY':
        d.setMonth(d.getMonth() + 3);
        break;
      case 'SEMI_ANNUALLY':
        d.setMonth(d.getMonth() + 6);
        break;
      case 'YEARLY':
        d.setFullYear(d.getFullYear() + 1);
        break;
      case 'ONE_TIME':
      default:
        return currentDueDate;
    }

    return d.toISOString().split('T')[0];
  }

  public static generateUpcomingScheduleForBill(
    bill: BillItem,
    occurrencesCount = 6
  ): NextDueDateOccurrence[] {
    const result: NextDueDateOccurrence[] = [];
    let currentDateStr = bill.dueDate;
    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 0; i < occurrencesCount; i++) {
      const d = new Date(currentDateStr);
      const today = new Date(todayStr);
      const diffTime = d.getTime() - today.getTime();
      const daysUntilDue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const isOverdue = daysUntilDue < 0;

      result.push({
        billId: bill.id,
        billName: bill.billName,
        nextDueDate: currentDateStr,
        daysUntilDue,
        isOverdue,
      });

      if (bill.frequency === 'ONE_TIME') break;
      currentDateStr = this.calculateNextDueDate(currentDateStr, bill.frequency);
    }

    return result;
  }
}
