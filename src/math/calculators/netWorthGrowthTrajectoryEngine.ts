export interface NetWorthYearTrajectoryPoint {
  yearNumber: number;
  futureYear: number;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  growthFromBaselinePercent: number;
}

export class NetWorthGrowthTrajectoryEngine {
  public static calculateTrajectory(
    startingAssets = 2000000,
    startingLiabilities = 500000,
    annualAssetGrowthPercent = 9.5,
    annualLiabilityPaydownPercent = 15.0,
    annualSavingsAdded = 300000,
    years = 10
  ): NetWorthYearTrajectoryPoint[] {
    const currentYear = new Date().getFullYear();
    const baselineNetWorth = startingAssets - startingLiabilities;

    let assets = startingAssets;
    let liabilities = startingLiabilities;

    const timeline: NetWorthYearTrajectoryPoint[] = [];

    for (let y = 1; y <= years; y++) {
      assets = assets * (1 + annualAssetGrowthPercent / 100) + annualSavingsAdded;
      liabilities = Math.max(0, liabilities * (1 - annualLiabilityPaydownPercent / 100));

      const netWorth = assets - liabilities;
      const growthFromBaselinePercent = baselineNetWorth > 0 ? ((netWorth - baselineNetWorth) / baselineNetWorth) * 100 : 0;

      timeline.push({
        yearNumber: y,
        futureYear: currentYear + y,
        totalAssets: Math.round(assets),
        totalLiabilities: Math.round(liabilities),
        netWorth: Math.round(netWorth),
        growthFromBaselinePercent: parseFloat(growthFromBaselinePercent.toFixed(1)),
      });
    }

    return timeline;
  }
}
