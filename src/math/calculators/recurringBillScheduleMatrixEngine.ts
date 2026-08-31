import { BillItem } from '../../types/bill';

export interface BillScheduleMatrixItem {
  billId: string;
  billName: string;
  category: string;
  amount: number;
  dueDate: string;
  frequency: string;
  daysUntilDue: number;
  isOverdue: boolean;
  urgencyRating: 'IMMEDIATE_ACTION' | 'UPCOMING_THIS_WEEK' | 'SCHEDULED';
}

export class RecurringBillScheduleMatrixEngine {
  public static generateMatrix(bills: BillItem[]): {
    totalUpcomingAmount: number;
    overdueBillsCount: number;
    matrix: BillScheduleMatrixItem[];
  } {
    const todayTime = new Date().getTime();
    let totalUpcomingAmount = 0;
    let overdueBillsCount = 0;

    const matrix: BillScheduleMatrixItem[] = bills.map((b) => {
      const d = new Date(b.dueDate);
      const diffDays = Math.ceil((d.getTime() - todayTime) / (1000 * 3600 * 24));
      const isOverdue = diffDays < 0 && b.status !== 'PAID';

      if (b.status !== 'PAID') totalUpcomingAmount += b.amount;
      if (isOverdue) overdueBillsCount++;

      let urgencyRating: 'IMMEDIATE_ACTION' | 'UPCOMING_THIS_WEEK' | 'SCHEDULED' = 'SCHEDULED';
      if (isOverdue || diffDays <= 2) urgencyRating = 'IMMEDIATE_ACTION';
      else if (diffDays <= 7) urgencyRating = 'UPCOMING_THIS_WEEK';

      return {
        billId: b.id,
        billName: b.billName,
        category: b.category,
        amount: b.amount,
        dueDate: b.dueDate,
        frequency: b.frequency,
        daysUntilDue: diffDays,
        isOverdue,
        urgencyRating,
      };
    });

    return {
      totalUpcomingAmount: Math.round(totalUpcomingAmount),
      overdueBillsCount,
      matrix: matrix.sort((a, b) => a.daysUntilDue - b.daysUntilDue),
    };
  }
}
