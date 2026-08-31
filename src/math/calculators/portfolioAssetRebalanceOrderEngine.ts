import { AssetItem } from '../netWorthTracker';

export interface RebalanceTradeOrder {
  assetCategory: string;
  currentAmount: number;
  currentPercent: number;
  targetPercent: number;
  targetAmount: number;
  tradeDirection: 'BUY' | 'SELL' | 'NO_CHANGE';
  tradeAmountINR: number;
}

export class PortfolioAssetRebalanceOrderEngine {
  public static generateTradeOrders(
    assets: AssetItem[],
    targetModel: Record<string, number> = {
      MUTUAL_FUNDS: 40,
      STOCKS: 30,
      GOLD: 15,
      RETIREMENT: 15,
    }
  ): {
    totalValuation: number;
    isRebalanceNeeded: boolean;
    tradeOrders: RebalanceTradeOrder[];
  } {
    const totalValuation = assets.reduce((s, a) => s + a.currentValue, 0);

    const categoryTotals: Record<string, number> = {};
    assets.forEach((a) => {
      categoryTotals[a.category] = (categoryTotals[a.category] || 0) + a.currentValue;
    });

    let isRebalanceNeeded = false;

    const tradeOrders: RebalanceTradeOrder[] = Object.keys(targetModel).map((cat) => {
      const currentAmount = categoryTotals[cat] || 0;
      const currentPercent = totalValuation > 0 ? (currentAmount / totalValuation) * 100 : 0;
      const targetPercent = targetModel[cat] || 0;
      const targetAmount = (totalValuation * targetPercent) / 100;
      const diff = targetAmount - currentAmount;

      let tradeDirection: 'BUY' | 'SELL' | 'NO_CHANGE' = 'NO_CHANGE';
      if (diff > 5000) {
        tradeDirection = 'BUY';
        if (Math.abs(currentPercent - targetPercent) > 5) isRebalanceNeeded = true;
      } else if (diff < -5000) {
        tradeDirection = 'SELL';
        if (Math.abs(currentPercent - targetPercent) > 5) isRebalanceNeeded = true;
      }

      return {
        assetCategory: cat,
        currentAmount: Math.round(currentAmount),
        currentPercent: parseFloat(currentPercent.toFixed(1)),
        targetPercent,
        targetAmount: Math.round(targetAmount),
        tradeDirection,
        tradeAmountINR: Math.abs(Math.round(diff)),
      };
    });

    return {
      totalValuation: Math.round(totalValuation),
      isRebalanceNeeded,
      tradeOrders,
    };
  }
}
