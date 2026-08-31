import { NetWorthGrowthEngine, NetWorthGrowthPointDetail } from '../math/calculators/netWorthGrowthEngine';

export class NetWorthProjectionService {
  public static getProjection(
    initialAssets = 1500000,
    initialLiabilities = 400000,
    annualAssetGrowthPercent = 9,
    annualLiabilityPaydownPercent = 15,
    annualSavingsContribution = 240000,
    projectionYears = 10
  ): NetWorthGrowthPointDetail[] {
    return NetWorthGrowthEngine.calculateGrowth(
      initialAssets,
      initialLiabilities,
      annualAssetGrowthPercent,
      annualLiabilityPaydownPercent,
      annualSavingsContribution,
      projectionYears
    );
  }
}
