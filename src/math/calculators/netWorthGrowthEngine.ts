export interface NetWorthGrowthPointDetail {
  year: number;
  projectedAssets: number;
  projectedLiabilities: number;
  projectedNetWorth: number;
  growthPercentageFromStart: number;
}

export class NetWorthGrowthEngine {
  public static calculateGrowth(
    initialAssets = 1500000,
    initialLiabilities = 400000,
    annualAssetGrowthPercent = 9,
    annualLiabilityPaydownPercent = 15,
    annualSavingsContribution = 240000,
    projectionYears = 10
  ): NetWorthGrowthPointDetail[] {
    const startNet = initialAssets - initialLiabilities;
    let assets = initialAssets;
    let liabilities = initialLiabilities;

    const timeline: NetWorthGrowthPointDetail[] = [];

    for (let y = 1; y <= projectionYears; y++) {
      assets = assets * (1 + annualAssetGrowthPercent / 100) + annualSavingsContribution;
      liabilities = Math.max(0, liabilities * (1 - annualLiabilityPaydownPercent / 100));

      const netWorth = assets - liabilities;
      const growthPct = startNet !== 0 ? ((netWorth - startNet) / Math.abs(startNet)) * 100 : 0;

      timeline.push({
        year: y,
        projectedAssets: Math.round(assets),
        projectedLiabilities: Math.round(liabilities),
        projectedNetWorth: Math.round(netWorth),
        growthPercentageFromStart: parseFloat(growthPct.toFixed(1)),
      });
    }

    return timeline;
  }
}
