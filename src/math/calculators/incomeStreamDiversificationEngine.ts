import { IncomeItem } from '../../types/income';

export interface IncomeSourceConcentration {
  sourceCategory: string;
  totalIncomeAmount: number;
  percentageShare: number;
  isPrimarySource: boolean;
}

export class IncomeStreamDiversificationEngine {
  public static analyzeDiversification(incomes: IncomeItem[]): {
    totalIncome: number;
    sourcesCount: number;
    primarySourceSharePercent: number;
    incomeStabilityScore: number; // 0 to 100
    diversificationRating: 'HIGH_RISK_SINGLE_SOURCE' | 'MODERATELY_DIVERSIFIED' | 'WELL_DIVERSIFIED';
    sources: IncomeSourceConcentration[];
  } {
    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);

    const categorySum: Record<string, number> = {};
    incomes.forEach((i) => {
      categorySum[i.category] = (categorySum[i.category] || 0) + i.amount;
    });

    let maxShare = 0;

    const sources: IncomeSourceConcentration[] = Object.entries(categorySum).map(([cat, amt]) => {
      const share = totalIncome > 0 ? (amt / totalIncome) * 100 : 0;
      if (share > maxShare) maxShare = share;

      return {
        sourceCategory: cat,
        totalIncomeAmount: Math.round(amt),
        percentageShare: parseFloat(share.toFixed(1)),
        isPrimarySource: false,
      };
    });

    sources.forEach((s) => {
      if (s.percentageShare === maxShare) s.isPrimarySource = true;
    });

    const incomeStabilityScore = Math.max(0, Math.round(100 - maxShare * 0.7 + sources.length * 5));

    let diversificationRating: 'HIGH_RISK_SINGLE_SOURCE' | 'MODERATELY_DIVERSIFIED' | 'WELL_DIVERSIFIED' = 'MODERATELY_DIVERSIFIED';
    if (maxShare > 85 || sources.length === 1) diversificationRating = 'HIGH_RISK_SINGLE_SOURCE';
    else if (maxShare < 60 && sources.length >= 3) diversificationRating = 'WELL_DIVERSIFIED';

    return {
      totalIncome: Math.round(totalIncome),
      sourcesCount: sources.length,
      primarySourceSharePercent: parseFloat(maxShare.toFixed(1)),
      incomeStabilityScore,
      diversificationRating,
      sources,
    };
  }
}
