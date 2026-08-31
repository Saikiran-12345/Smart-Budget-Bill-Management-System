import { ExpenseItem } from '../types/expense';

export interface ExpenseAnomalyAlert {
  expenseId: string;
  title: string;
  category: string;
  amount: number;
  categoryAverage: number;
  multiplierAboveAverage: number;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  reason: string;
}

export class AnomalyDetectionEngine {
  public static detectExpenseAnomalies(expenses: ExpenseItem[]): ExpenseAnomalyAlert[] {
    const categoryTotals: Record<string, { sum: number; count: number }> = {};

    expenses.forEach((e) => {
      if (!categoryTotals[e.category]) {
        categoryTotals[e.category] = { sum: 0, count: 0 };
      }
      categoryTotals[e.category].sum += e.amount;
      categoryTotals[e.category].count += 1;
    });

    const categoryAverages: Record<string, number> = {};
    Object.keys(categoryTotals).forEach((cat) => {
      const data = categoryTotals[cat];
      categoryAverages[cat] = data.count > 0 ? data.sum / data.count : 0;
    });

    const anomalies: ExpenseAnomalyAlert[] = [];

    expenses.forEach((e) => {
      const avg = categoryAverages[e.category] || 0;
      if (avg > 0 && e.amount > avg * 2.5) {
        const multiplierAboveAverage = parseFloat((e.amount / avg).toFixed(1));
        let severity: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
        if (multiplierAboveAverage >= 4) severity = 'HIGH';
        else if (multiplierAboveAverage >= 3) severity = 'MEDIUM';

        anomalies.push({
          expenseId: e.id,
          title: e.title,
          category: e.category,
          amount: e.amount,
          categoryAverage: Math.round(avg),
          multiplierAboveAverage,
          severity,
          reason: `Expense amount is ${multiplierAboveAverage}x higher than category average (₹${Math.round(avg)}).`,
        });
      }
    });

    return anomalies.sort((a, b) => b.amount - a.amount);
  }
}
