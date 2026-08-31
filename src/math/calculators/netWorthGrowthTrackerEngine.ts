export interface NetWorthTrajectoryYear {
  year: number;
  projectedAssets: number;
  projectedLiabilities: number;
  projectedNetWorth: number;
  growthPercentageFromStart: number;
}

export class NetWorthGrowthTrackerEngine {
  public static projectTrajectory(
    currentAssets: number,
    currentLiabilities: number,
    annualAssetGrowthRatePercent = 9.5,
    annualLiabilityPaydownRatePercent = 15.0,
    annualNetSavingsAdded = 240000,
    projectionYears = 10
  ): NetWorthTrajectoryYear[] {
    const initialNetWorth = currentAssets - currentLiabilities;
    let assets = currentAssets;
    let liabilities = currentLiabilities;

    const trajectory: NetWorthTrajectoryYear[] = [];

    for (let y = 1; y <= projectionYears; y++) {
      assets = assets * (1 + annualAssetGrowthRatePercent / 100) + annualNetSavingsAdded;
      liabilities = Math.max(0, liabilities * (1 - annualLiabilityPaydownRatePercent / 100));

      const netWorth = assets - liabilities;
      const growthPct = initialNetWorth !== 0 ? ((netWorth - initialNetWorth) / Math.abs(initialNetWorth)) * 100 : 0;

      trajectory.push({
        year: y,
        projectedAssets: Math.round(assets),
        projectedLiabilities: Math.round(liabilities),
        projectedNetWorth: Math.round(netWorth),
        growthPercentageFromStart: parseFloat(growthPct.toFixed(1)),
      });
    }

    return trajectory;
  }
}
