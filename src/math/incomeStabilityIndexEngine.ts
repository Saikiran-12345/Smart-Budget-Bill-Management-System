import { IncomeItem } from '../types/income';

export interface IncomeStabilityResult {
  stabilityScore: number; // 0 to 100
  stabilityRating: 'HIGHLY_STABLE' | 'MODERATE' | 'VOLATILE';
  primarySourcePercentage: number;
  diversificationCount: number;
  recurringIncomePercentage: number;
}

export class IncomeStabilityIndexEngine {
  public static calculateStabilityIndex(incomes: IncomeItem[]): IncomeStabilityResult {
    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
    if (totalIncome === 0) {
      return {
        stabilityScore: 0,
        stabilityRating: 'VOLATILE',
        primarySourcePercentage: 0,
        diversificationCount: 0,
        recurringIncomePercentage: 0,
      };
    }

    const sourceTotals: Record<string, number> = {};
    let recurringAmount = 0;

    incomes.forEach((i) => {
      sourceTotals[i.source] = (sourceTotals[i.source] || 0) + i.amount;
      if (i.isRecurring || i.category === 'Salary') {
        recurringAmount += i.amount;
      }
    });

    const sources = Object.values(sourceTotals);
    const maxSourceAmt = Math.max(...sources, 0);
    const primarySourcePercentage = (maxSourceAmt / totalIncome) * 100;
    const recurringIncomePercentage = (recurringAmount / totalIncome) * 100;

    // 1. Recurring ratio score (0 - 50 pts)
    const recurringScore = (recurringIncomePercentage / 100) * 50;

    // 2. Diversification score (0 - 30 pts)
    const count = Object.keys(sourceTotals).length;
    const divScore = Math.min(30, count * 10);

    // 3. Concentration penalty: penalize if 100% dependent on single non-salary gig
    const concentrationScore = Math.min(20, Math.round(20 * (1 - primarySourcePercentage / 100)));

    const totalScore = Math.round(Math.min(100, recurringScore + divScore + concentrationScore));

    let stabilityRating: 'HIGHLY_STABLE' | 'MODERATE' | 'VOLATILE' = 'MODERATE';
    if (totalScore >= 75) stabilityRating = 'HIGHLY_STABLE';
    else if (totalScore < 45) stabilityRating = 'VOLATILE';

    return {
      stabilityScore: totalScore,
      stabilityRating,
      primarySourcePercentage: parseFloat(primarySourcePercentage.toFixed(1)),
      diversificationCount: count,
      recurringIncomePercentage: parseFloat(recurringIncomePercentage.toFixed(1)),
    };
  }
}
