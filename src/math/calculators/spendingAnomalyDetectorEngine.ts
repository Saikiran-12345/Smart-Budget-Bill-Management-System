import { ExpenseItem } from '../../types/expense';

export interface ExpenseAnomalyAlertDetail {
  expenseId: string;
  title: string;
  category: string;
  amount: number;
  categoryAverageAmount: number;
  zScore: number;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  explanation: string;
}

export class SpendingAnomalyDetectorEngine {
  public static detectAnomalies(expenses: ExpenseItem[]): ExpenseAnomalyAlertDetail[] {
    const categoryStats: Record<string, { sum: number; count: number; values: number[] }> = {};

    expenses.forEach((e) => {
      if (!categoryStats[e.category]) {
        categoryStats[e.category] = { sum: 0, count: 0, values: [] };
      }
      categoryStats[e.category].sum += e.amount;
      categoryStats[e.category].count += 1;
      categoryStats[e.category].values.push(e.amount);
    });

    const categoryMeanStdDev: Record<string, { mean: number; stdDev: number }> = {};
    Object.entries(categoryStats).forEach(([cat, data]) => {
      const mean = data.sum / data.count;
      const variance = data.values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / data.count;
      const stdDev = Math.sqrt(variance);
      categoryMeanStdDev[cat] = { mean, stdDev };
    });

    const alerts: ExpenseAnomalyAlertDetail[] = [];

    expenses.forEach((e) => {
      const stats = categoryMeanStdDev[e.category];
      if (!stats || stats.stdDev === 0) return;

      const zScore = (e.amount - stats.mean) / stats.stdDev;
      if (zScore > 2.0) {
        let severity: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
        if (zScore > 3.5) severity = 'HIGH';
        else if (zScore > 2.5) severity = 'MEDIUM';

        alerts.push({
          expenseId: e.id,
          title: e.title,
          category: e.category,
          amount: e.amount,
          categoryAverageAmount: Math.round(stats.mean),
          zScore: parseFloat(zScore.toFixed(2)),
          severity,
          explanation: `Transaction of ₹${e.amount} is ${zScore.toFixed(1)} standard deviations above ${e.category} average (₹${Math.round(stats.mean)}).`,
        });
      }
    });

    return alerts.sort((a, b) => b.zScore - a.zScore);
  }
}
