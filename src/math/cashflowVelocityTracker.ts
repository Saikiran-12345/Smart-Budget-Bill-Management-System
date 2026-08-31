import { ExpenseItem } from '../types/expense';

export interface DayOfWeekVelocity {
  dayName: string;
  totalSpent: number;
  transactionCount: number;
  averageTransactionAmount: number;
}

export class CashflowVelocityTracker {
  public static analyzeSpendingVelocity(expenses: ExpenseItem[]): {
    weekdaySpendingTotal: number;
    weekendSpendingTotal: number;
    peakSpendingDayName: string;
    dayOfWeekBreakdown: DayOfWeekVelocity[];
  } {
    const daysMap: Record<string, { sum: number; count: number }> = {
      Sunday: { sum: 0, count: 0 },
      Monday: { sum: 0, count: 0 },
      Tuesday: { sum: 0, count: 0 },
      Wednesday: { sum: 0, count: 0 },
      Thursday: { sum: 0, count: 0 },
      Friday: { sum: 0, count: 0 },
      Saturday: { sum: 0, count: 0 },
    };

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let weekdaySum = 0;
    let weekendSum = 0;

    expenses.forEach((e) => {
      const d = new Date(e.date);
      if (isNaN(d.getTime())) return;

      const dayIdx = d.getDay();
      const dayName = dayNames[dayIdx];

      daysMap[dayName].sum += e.amount;
      daysMap[dayName].count += 1;

      if (dayIdx === 0 || dayIdx === 6) {
        weekendSum += e.amount;
      } else {
        weekdaySum += e.amount;
      }
    });

    let peakDay = 'Sunday';
    let maxSpent = -1;

    const dayOfWeekBreakdown: DayOfWeekVelocity[] = Object.entries(daysMap).map(([dayName, data]) => {
      if (data.sum > maxSpent) {
        maxSpent = data.sum;
        peakDay = dayName;
      }

      return {
        dayName,
        totalSpent: data.sum,
        transactionCount: data.count,
        averageTransactionAmount: data.count > 0 ? Math.round(data.sum / data.count) : 0,
      };
    });

    return {
      weekdaySpendingTotal: weekdaySum,
      weekendSpendingTotal: weekendSum,
      peakSpendingDayName: peakDay,
      dayOfWeekBreakdown,
    };
  }
}
