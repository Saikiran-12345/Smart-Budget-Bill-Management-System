export interface NetWorthGrowthPoint {
  year: number;
  projectedAssets: number;
  projectedLiabilities: number;
  projectedNetWorth: number;
}

export class NetWorthGrowthCalculator {
  public static projectNetWorth(
    initialAssets: number,
    initialLiabilities: number,
    annualAssetReturnPercent: number,
    annualLiabilityPaydownPercent: number,
    annualNetSavingsContribution: number,
    projectionYears = 10
  ): NetWorthGrowthPoint[] {
    const assetRate = annualAssetReturnPercent / 100;
    const liabilityRate = annualLiabilityPaydownPercent / 100;

    let assets = initialAssets;
    let liabilities = initialLiabilities;

    const timeline: NetWorthGrowthPoint[] = [];

    for (let y = 1; y <= projectionYears; y++) {
      assets = assets * (1 + assetRate) + annualNetSavingsContribution;
      liabilities = Math.max(0, liabilities * (1 - liabilityRate));
      const netWorth = assets - liabilities;

      timeline.push({
        year: y,
        projectedAssets: Math.round(assets),
        projectedLiabilities: Math.round(liabilities),
        projectedNetWorth: Math.round(netWorth),
      });
    }

    return timeline;
  }
}
