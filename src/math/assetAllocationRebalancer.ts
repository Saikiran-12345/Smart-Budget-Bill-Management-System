export interface AssetHoldingDetail {
  id: string;
  name: string;
  category: 'EQUITY' | 'DEBT' | 'GOLD' | 'REAL_ESTATE' | 'CASH';
  currentValue: number;
}

export interface RebalanceInstruction {
  category: string;
  currentPercentage: number;
  targetPercentage: number;
  currentAmount: number;
  targetAmount: number;
  action: 'BUY' | 'SELL' | 'NO_CHANGE';
  tradeAmount: number;
}

export class AssetAllocationRebalancer {
  public static calculateRebalancePlan(
    holdings: AssetHoldingDetail[],
    targetModel: Record<string, number> = {
      EQUITY: 50,
      DEBT: 30,
      GOLD: 10,
      CASH: 10,
    }
  ): {
    totalValue: number;
    instructions: RebalanceInstruction[];
    isRebalanceNeeded: boolean;
  } {
    const totalValue = holdings.reduce((s, h) => s + h.currentValue, 0);

    const categoryTotals: Record<string, number> = {
      EQUITY: 0,
      DEBT: 0,
      GOLD: 0,
      CASH: 0,
    };

    holdings.forEach((h) => {
      categoryTotals[h.category] = (categoryTotals[h.category] || 0) + h.currentValue;
    });

    let isRebalanceNeeded = false;

    const instructions: RebalanceInstruction[] = Object.keys(targetModel).map((cat) => {
      const currentAmt = categoryTotals[cat] || 0;
      const currentPct = totalValue > 0 ? (currentAmt / totalValue) * 100 : 0;
      const targetPct = targetModel[cat] || 0;
      const targetAmt = (totalValue * targetPct) / 100;
      const diff = targetAmt - currentAmt;

      let action: 'BUY' | 'SELL' | 'NO_CHANGE' = 'NO_CHANGE';
      if (diff > 5000) {
        action = 'BUY';
        if (Math.abs(currentPct - targetPct) > 5) isRebalanceNeeded = true;
      } else if (diff < -5000) {
        action = 'SELL';
        if (Math.abs(currentPct - targetPct) > 5) isRebalanceNeeded = true;
      }

      return {
        category: cat,
        currentPercentage: parseFloat(currentPct.toFixed(1)),
        targetPercentage: targetPct,
        currentAmount: currentAmt,
        targetAmount: Math.round(targetAmt),
        action,
        tradeAmount: Math.abs(Math.round(diff)),
      };
    });

    return {
      totalValue,
      instructions,
      isRebalanceNeeded,
    };
  }
}
