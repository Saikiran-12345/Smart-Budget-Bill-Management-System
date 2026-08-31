import { ExpenseItem } from '../../types/expense';

export interface PredictedSubscriptionPattern {
  merchantName: string;
  category: string;
  monthlyAverageAmount: number;
  annualizedAmount: number;
  detectedCadence: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  nextPredictedBillingDate: string;
  confidenceScorePercent: number;
}

export class RecurringExpensePredictionEngine {
  public static predictPatterns(expenses: ExpenseItem[]): PredictedSubscriptionPattern[] {
    const merchantGroups: Record<string, ExpenseItem[]> = {};

    expenses.forEach((e) => {
      const key = (e.merchant || e.title).toLowerCase().trim();
      if (!merchantGroups[key]) merchantGroups[key] = [];
      merchantGroups[key].push(e);
    });

    const results: PredictedSubscriptionPattern[] = [];

    Object.entries(merchantGroups).forEach(([key, items]) => {
      if (items.length < 2) return;

      items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      const totalAmt = items.reduce((s, i) => s + i.amount, 0);
      const avgAmt = totalAmt / items.length;

      const lastDateStr = items[items.length - 1].date;
      const d = new Date(lastDateStr);
      d.setMonth(d.getMonth() + 1);

      results.push({
        merchantName: items[0].merchant || items[0].title,
        category: items[0].category,
        monthlyAverageAmount: Math.round(avgAmt),
        annualizedAmount: Math.round(avgAmt * 12),
        detectedCadence: 'MONTHLY',
        nextPredictedBillingDate: d.toISOString().split('T')[0],
        confidenceScorePercent: 90,
      });
    });

    return results;
  }
}
