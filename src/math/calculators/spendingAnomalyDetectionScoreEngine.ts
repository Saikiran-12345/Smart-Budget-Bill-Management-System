import { ExpenseItem } from '../../types/expense';

export interface ExpenseAnomalyScoreItem {
  expenseId: string;
  title: string;
  category: string;
  amount: number;
  categoryAverageAmount: number;
  zScore: number;
  anomalySeverity: 'CRITICAL' | 'WARNING' | 'MINOR';
  recommendationNote: string;
}

export class SpendingAnomalyDetectionScoreEngine {
  public static calculateAnomalyScores(expenses: ExpenseItem[]): ExpenseAnomalyScoreItem[] {
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

    const anomalies: ExpenseAnomalyScoreItem[] = [];

    expenses.forEach((e) => {
      const stats = categoryMeanStdDev[e.category];
      if (!stats || stats.stdDev === 0) return;

      const zScore = (e.amount - stats.mean) / stats.stdDev;
      if (zScore > 2.0) {
        let anomalySeverity: 'CRITICAL' | 'WARNING' | 'MINOR' = 'MINOR';
        if (zScore > 3.5) anomalySeverity = 'CRITICAL';
        else if (zScore > 2.5) anomalySeverity = 'WARNING';

        anomalies.push({
          expenseId: e.id,
          title: e.title,
          category: e.category,
          amount: e.amount,
          categoryAverageAmount: Math.round(stats.mean),
          zScore: parseFloat(zScore.toFixed(2)),
          anomalySeverity,
          recommendationNote: `Expense of ₹${e.amount} is ${zScore.toFixed(1)} SDs above normal ${e.category} baseline (₹${Math.round(stats.mean)}).`,
        });
      }
    });

    return anomalies.sort((a, b) => b.zScore - a.zScore);
  }
}
