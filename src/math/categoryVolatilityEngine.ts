import { ExpenseItem } from '../types/expense';

export interface CategoryVolatilityScore {
  category: string;
  monthlyAverage: number;
  standardDeviation: number;
  volatilityRating: 'STABLE' | 'MODERATE' | 'VOLATILE';
  coefficientOfVariationPercentage: number;
}

export class CategoryVolatilityEngine {
  public static calculateCategoryVolatility(expenses: ExpenseItem[]): CategoryVolatilityScore[] {
    const categoryMonthlyData: Record<string, Record<string, number>> = {};

    expenses.forEach((e) => {
      const monthKey = e.date.substring(0, 7); // YYYY-MM
      if (!categoryMonthlyData[e.category]) categoryMonthlyData[e.category] = {};
      categoryMonthlyData[e.category][monthKey] = (categoryMonthlyData[e.category][monthKey] || 0) + e.amount;
    });

    const results: CategoryVolatilityScore[] = [];

    Object.entries(categoryMonthlyData).forEach(([cat, monthsMap]) => {
      const monthlyValues = Object.values(monthsMap);
      if (monthlyValues.length === 0) return;

      const sum = monthlyValues.reduce((s, v) => s + v, 0);
      const mean = sum / monthlyValues.length;

      const variance = monthlyValues.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / monthlyValues.length;
      const stdDev = Math.sqrt(variance);

      const cv = mean > 0 ? (stdDev / mean) * 100 : 0;

      let volatilityRating: 'STABLE' | 'MODERATE' | 'VOLATILE' = 'STABLE';
      if (cv > 40) volatilityRating = 'VOLATILE';
      else if (cv > 20) volatilityRating = 'MODERATE';

      results.push({
        category: cat,
        monthlyAverage: Math.round(mean),
        standardDeviation: Math.round(stdDev),
        volatilityRating,
        coefficientOfVariationPercentage: parseFloat(cv.toFixed(1)),
      });
    });

    return results.sort((a, b) => b.coefficientOfVariationPercentage - a.coefficientOfVariationPercentage);
  }
}
