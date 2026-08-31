import { AssetItem } from './netWorthTracker';

export interface AssetAllocationMix {
  category: string;
  amount: number;
  percentage: number;
  recommendedPercentage: number;
  rebalanceAction: 'BUY' | 'SELL' | 'HOLD';
  rebalanceAmount: number;
}

export interface PortfolioRiskResult {
  totalPortfolioValue: number;
  riskScore: number; // 1 to 10
  riskCategory: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
  allocations: AssetAllocationMix[];
  sharpeRatioEstimate: number;
}

export class PortfolioRiskEngine {
  public static analyzePortfolio(assets: AssetItem[]): PortfolioRiskResult {
    const investmentAssets = assets.filter(
      (a) => a.category !== 'LIQUID_CASH'
    );

    const totalPortfolioValue = investmentAssets.reduce((s, a) => s + a.currentValue, 0);

    const categoryTotals: Record<string, number> = {};
    investmentAssets.forEach((a) => {
      categoryTotals[a.category] = (categoryTotals[a.category] || 0) + a.currentValue;
    });

    // Model target allocations for MODERATE risk profile
    const targetAllocations: Record<string, number> = {
      MUTUAL_FUNDS: 40,
      STOCKS: 30,
      GOLD: 10,
      RETIREMENT: 20,
    };

    const allocations: AssetAllocationMix[] = Object.keys(categoryTotals).map((cat) => {
      const amount = categoryTotals[cat];
      const percentage = totalPortfolioValue > 0 ? (amount / totalPortfolioValue) * 100 : 0;
      const targetPct = targetAllocations[cat] || 10;
      const targetAmount = (totalPortfolioValue * targetPct) / 100;
      const diff = targetAmount - amount;

      let action: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
      if (diff > 5000) action = 'BUY';
      else if (diff < -5000) action = 'SELL';

      return {
        category: cat,
        amount,
        percentage: parseFloat(percentage.toFixed(1)),
        recommendedPercentage: targetPct,
        rebalanceAction: action,
        rebalanceAmount: Math.abs(Math.round(diff)),
      };
    });

    const equityPercentage = ((categoryTotals['STOCKS'] || 0) + (categoryTotals['MUTUAL_FUNDS'] || 0)) / (totalPortfolioValue || 1) * 100;

    let riskScore = 5;
    let riskCategory: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE' = 'MODERATE';

    if (equityPercentage > 75) {
      riskScore = 8;
      riskCategory = 'AGGRESSIVE';
    } else if (equityPercentage < 35) {
      riskScore = 3;
      riskCategory = 'CONSERVATIVE';
    }

    return {
      totalPortfolioValue,
      riskScore,
      riskCategory,
      allocations,
      sharpeRatioEstimate: parseFloat((1.2 + (riskScore * 0.05)).toFixed(2)),
    };
  }
}
