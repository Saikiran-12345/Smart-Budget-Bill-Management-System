import { ExpenseItem } from '../../types/expense';

export interface VelocityMetric {
  periodLabel: string;
  totalSpent: number;
  dailyBurnRate: number;
  highestSpendingDay: string;
  transactionCount: number;
}

export class CashBurnVelocityEngine {
  public static calculateVelocity(expenses: ExpenseItem[], daysCount = 30): VelocityMetric {
    const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
    const dailyBurnRate = daysCount > 0 ? totalSpent / daysCount : totalSpent;

    const dayTotals: Record<string, number> = {};
    expenses.forEach((e) => {
      dayTotals[e.date] = (dayTotals[e.date] || 0) + e.amount;
    });

    let highestSpendingDay = 'None';
    let maxSpent = -1;

    Object.entries(dayTotals).forEach(([dStr, amt]) => {
      if (amt > maxSpent) {
        maxSpent = amt;
        highestSpendingDay = dStr;
      }
    });

    return {
      periodLabel: `Last ${daysCount} Days`,
      totalSpent: Math.round(totalSpent),
      dailyBurnRate: Math.round(dailyBurnRate),
      highestSpendingDay,
      transactionCount: expenses.length,
    };
  }
}
