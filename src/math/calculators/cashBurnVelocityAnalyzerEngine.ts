import { ExpenseItem } from '../../types/expense';

export interface BurnVelocitySummary {
  periodDays: number;
  totalOutflowAmount: number;
  dailyBurnRate: number;
  highestExpenseCategory: string;
  transactionCount: number;
}

export class CashBurnVelocityAnalyzerEngine {
  public static calculateBurnVelocity(expenses: ExpenseItem[], daysCount = 30): BurnVelocitySummary {
    const totalOutflowAmount = expenses.reduce((s, e) => s + e.amount, 0);
    const dailyBurnRate = daysCount > 0 ? totalOutflowAmount / daysCount : totalOutflowAmount;

    const categoryTotals: Record<string, number> = {};
    expenses.forEach((e) => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    let highestExpenseCategory = 'None';
    let maxAmt = -1;

    Object.entries(categoryTotals).forEach(([cat, amt]) => {
      if (amt > maxAmt) {
        maxAmt = amt;
        highestExpenseCategory = cat;
      }
    });

    return {
      periodDays: daysCount,
      totalOutflowAmount: Math.round(totalOutflowAmount),
      dailyBurnRate: Math.round(dailyBurnRate),
      highestExpenseCategory,
      transactionCount: expenses.length,
    };
  }
}
