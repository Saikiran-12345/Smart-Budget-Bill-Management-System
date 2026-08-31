import { AssetItem } from '../netWorthTracker';

export interface RebalanceInstructionDetail {
  categoryName: string;
  currentValuation: number;
  currentSharePercent: number;
  targetSharePercent: number;
  targetValuation: number;
  varianceAmount: number;
  recommendedTrade: 'BUY' | 'SELL' | 'HOLD';
}

export interface PortfolioRebalanceSummary {
  totalPortfolioValuation: number;
  isRebalanceRequired: boolean;
  driftThresholdPercent: number;
  instructions: RebalanceInstructionDetail[];
}

export class PortfolioRebalanceEngine {
  public static calculateRebalance(
    assets: AssetItem[],
    targetModel: Record<string, number> = {
      MUTUAL_FUNDS: 40,
      STOCKS: 30,
      GOLD: 15,
      RETIREMENT: 15,
    },
    driftThresholdPercent = 5.0
  ): PortfolioRebalanceSummary {
    const totalPortfolioValuation = assets.reduce((s, a) => s + a.currentValue, 0);

    const categoryTotals: Record<string, number> = {};
    assets.forEach((a) => {
      categoryTotals[a.category] = (categoryTotals[a.category] || 0) + a.currentValue;
    });

    let isRebalanceRequired = false;

    const instructions: RebalanceInstructionDetail[] = Object.keys(targetModel).map((cat) => {
      const currentValuation = categoryTotals[cat] || 0;
      const currentSharePercent = totalPortfolioValuation > 0 ? (currentValuation / totalPortfolioValuation) * 100 : 0;
      const targetSharePercent = targetModel[cat] || 0;
      const targetValuation = (totalPortfolioValuation * targetSharePercent) / 100;
      const varianceAmount = targetValuation - currentValuation;

      let recommendedTrade: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
      const drift = Math.abs(currentSharePercent - targetSharePercent);

      if (drift > driftThresholdPercent) {
        isRebalanceRequired = true;
        recommendedTrade = varianceAmount > 0 ? 'BUY' : 'SELL';
      }

      return {
        categoryName: cat,
        currentValuation: Math.round(currentValuation),
        currentSharePercent: parseFloat(currentSharePercent.toFixed(1)),
        targetSharePercent,
        targetValuation: Math.round(targetValuation),
        varianceAmount: Math.round(varianceAmount),
        recommendedTrade,
      };
    });

    return {
      totalPortfolioValuation: Math.round(totalPortfolioValuation),
      isRebalanceRequired,
      driftThresholdPercent,
      instructions,
    };
  }
}
