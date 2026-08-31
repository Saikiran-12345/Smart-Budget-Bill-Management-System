import { AssetHoldingDetail, RebalanceInstruction } from '../assetAllocationRebalancer';

export interface OptimalRebalancePlan {
  totalPortfolioValue: number;
  tradeInstructions: RebalanceInstruction[];
  totalBuyCapitalRequired: number;
  totalSellCapitalReleased: number;
  isRebalanceRequired: boolean;
}

export class AssetRebalanceOptimizerEngine {
  public static calculateOptimalTrades(
    holdings: AssetHoldingDetail[],
    targetModel: Record<string, number> = { EQUITY: 50, DEBT: 30, GOLD: 10, CASH: 10 }
  ): OptimalRebalancePlan {
    const totalPortfolioValue = holdings.reduce((s, h) => s + h.currentValue, 0);

    const categoryTotals: Record<string, number> = { EQUITY: 0, DEBT: 0, GOLD: 0, CASH: 0 };
    holdings.forEach((h) => {
      categoryTotals[h.category] = (categoryTotals[h.category] || 0) + h.currentValue;
    });

    let totalBuyCapitalRequired = 0;
    let totalSellCapitalReleased = 0;
    let isRebalanceRequired = false;

    const tradeInstructions: RebalanceInstruction[] = Object.keys(targetModel).map((cat) => {
      const currentAmount = categoryTotals[cat] || 0;
      const currentPercentage = totalPortfolioValue > 0 ? (currentAmount / totalPortfolioValue) * 100 : 0;
      const targetPercentage = targetModel[cat] || 0;
      const targetAmount = (totalPortfolioValue * targetPercentage) / 100;
      const diff = targetAmount - currentAmount;

      let action: 'BUY' | 'SELL' | 'NO_CHANGE' = 'NO_CHANGE';
      if (diff > 5000) {
        action = 'BUY';
        totalBuyCapitalRequired += diff;
        if (Math.abs(currentPercentage - targetPercentage) > 5) isRebalanceRequired = true;
      } else if (diff < -5000) {
        action = 'SELL';
        totalSellCapitalReleased += Math.abs(diff);
        if (Math.abs(currentPercentage - targetPercentage) > 5) isRebalanceRequired = true;
      }

      return {
        category: cat,
        currentPercentage: parseFloat(currentPercentage.toFixed(1)),
        targetPercentage,
        currentAmount: Math.round(currentAmount),
        targetAmount: Math.round(targetAmount),
        action,
        tradeAmount: Math.abs(Math.round(diff)),
      };
    });

    return {
      totalPortfolioValue: Math.round(totalPortfolioValue),
      tradeInstructions,
      totalBuyCapitalRequired: Math.round(totalBuyCapitalRequired),
      totalSellCapitalReleased: Math.round(totalSellCapitalReleased),
      isRebalanceRequired,
    };
  }
}
