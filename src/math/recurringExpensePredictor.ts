import { ExpenseItem } from '../types/expense';

export interface PredictedRecurringExpense {
  title: string;
  merchant: string;
  category: string;
  averageAmount: number;
  frequency: 'MONTHLY' | 'WEEKLY' | 'QUARTERLY';
  lastOccurrenceDate: string;
  predictedNextDate: string;
  confidenceScorePercentage: number;
}

export class RecurringExpensePredictor {
  public static predictRecurringExpenses(expenses: ExpenseItem[]): PredictedRecurringExpense[] {
    const merchantGroups: Record<string, ExpenseItem[]> = {};

    expenses.forEach((e) => {
      const key = (e.merchant || e.title).toLowerCase().trim();
      if (!merchantGroups[key]) merchantGroups[key] = [];
      merchantGroups[key].push(e);
    });

    const predictions: PredictedRecurringExpense[] = [];

    Object.entries(merchantGroups).forEach(([key, items]) => {
      if (items.length < 2) return;

      // Sort by date ascending
      items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      const totalAmount = items.reduce((s, i) => s + i.amount, 0);
      const averageAmount = Math.round(totalAmount / items.length);

      // Check date gaps
      const gaps: number[] = [];
      for (let i = 1; i < items.length; i++) {
        const d1 = new Date(items[i - 1].date);
        const d2 = new Date(items[i].date);
        const diffDays = Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
        gaps.push(diffDays);
      }

      const avgGap = gaps.reduce((s, g) => s + g, 0) / gaps.length;

      let frequency: 'MONTHLY' | 'WEEKLY' | 'QUARTERLY' = 'MONTHLY';
      let confidence = 85;

      if (avgGap >= 25 && avgGap <= 35) {
        frequency = 'MONTHLY';
      } else if (avgGap >= 6 && avgGap <= 9) {
        frequency = 'WEEKLY';
      } else if (avgGap >= 85 && avgGap <= 95) {
        frequency = 'QUARTERLY';
      } else {
        confidence = 60;
      }

      const lastOccurrenceDate = items[items.length - 1].date;
      const lastDate = new Date(lastOccurrenceDate);
      lastDate.setDate(lastDate.getDate() + Math.round(avgGap));
      const predictedNextDate = lastDate.toISOString().split('T')[0];

      predictions.push({
        title: items[0].title,
        merchant: items[0].merchant || items[0].title,
        category: items[0].category,
        averageAmount,
        frequency,
        lastOccurrenceDate,
        predictedNextDate,
        confidenceScorePercentage: confidence,
      });
    });

    return predictions.sort((a, b) => b.averageAmount - a.averageAmount);
  }
}
