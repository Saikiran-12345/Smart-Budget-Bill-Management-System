import { ExpenseItem } from '../../types/expense';

export interface CategoryVolatilityMetric {
  categoryName: string;
  totalSpent: number;
  monthlyAverageSpent: number;
  standardDeviation: number;
  coefficientOfVariationCVPercent: number; // SD / Mean * 100
  volatilityRating: 'STABLE' | 'MODERATE' | 'HIGHLY_VOLATILE';
}

export class SpendingCategoryVolatilityEngine {
  public static calculateVolatility(expenses: ExpenseItem[]): CategoryVolatilityMetric[] {
    const categoryValues: Record<string, number[]> = {};

    expenses.forEach((e) => {
      if (!categoryValues[e.category]) categoryValues[e.category] = [];
      categoryValues[e.category].push(e.amount);
    });

    return Object.entries(categoryValues).map(([cat, values]) => {
      const sum = values.reduce((s, v) => s + v, 0);
      const mean = values.length > 0 ? sum / values.length : 0;

      const variance = values.length > 0 ? values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / values.length : 0;
      const stdDev = Math.sqrt(variance);

      const cv = mean > 0 ? (stdDev / mean) * 100 : 0;

      let rating: 'STABLE' | 'MODERATE' | 'HIGHLY_VOLATILE' = 'STABLE';
      if (cv > 60) rating = 'HIGHLY_VOLATILE';
      else if (cv > 30) rating = 'MODERATE';

      return {
        categoryName: cat,
        totalSpent: Math.round(sum),
        monthlyAverageSpent: Math.round(mean),
        standardDeviation: parseFloat(stdDev.toFixed(1)),
        coefficientOfVariationCVPercent: parseFloat(cv.toFixed(1)),
        volatilityRating: rating,
      };
    });
  }
}
