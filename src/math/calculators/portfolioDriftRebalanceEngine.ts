export interface DriftCategoryAllocation {
  categoryName: string;
  currentValue: number;
  currentPercentage: number;
  targetPercentage: number;
  driftPercentage: number;
  rebalanceAction: 'BUY' | 'SELL' | 'HOLD';
  actionAmountINR: number;
}

export class PortfolioDriftRebalanceEngine {
  public static calculateDrift(
    holdings: { categoryName: string; currentValue: number }[],
    targetModel: Record<string, number> = {
      MUTUAL_FUNDS: 40,
      STOCKS: 30,
      GOLD: 15,
      RETIREMENT: 15,
    },
    driftThresholdPercent = 5.0
  ): {
    totalPortfolioValue: number;
    isRebalanceTriggered: boolean;
    allocations: DriftCategoryAllocation[];
  } {
    const totalPortfolioValue = holdings.reduce((s, h) => s + h.currentValue, 0);

    const categoryTotals: Record<string, number> = {};
    holdings.forEach((h) => {
      categoryTotals[h.categoryName] = (categoryTotals[h.categoryName] || 0) + h.currentValue;
    });

    let isRebalanceTriggered = false;

    const allocations: DriftCategoryAllocation[] = Object.keys(targetModel).map((cat) => {
      const currentValue = categoryTotals[cat] || 0;
      const currentPercentage = totalPortfolioValue > 0 ? (currentValue / totalPortfolioValue) * 100 : 0;
      const targetPercentage = targetModel[cat] || 0;
      const driftPercentage = currentPercentage - targetPercentage;

      const targetValue = (totalPortfolioValue * targetPercentage) / 100;
      const diff = targetValue - currentValue;

      let rebalanceAction: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
      if (Math.abs(driftPercentage) >= driftThresholdPercent) {
        isRebalanceTriggered = true;
        rebalanceAction = diff > 0 ? 'BUY' : 'SELL';
      }

      return {
        categoryName: cat,
        currentValue: Math.round(currentValue),
        currentPercentage: parseFloat(currentPercentage.toFixed(1)),
        targetPercentage,
        driftPercentage: parseFloat(driftPercentage.toFixed(1)),
        rebalanceAction,
        actionAmountINR: Math.abs(Math.round(diff)),
      };
    });

    return {
      totalPortfolioValue: Math.round(totalPortfolioValue),
      isRebalanceTriggered,
      allocations,
    };
  }
}
