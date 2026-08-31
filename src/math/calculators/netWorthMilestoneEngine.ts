export interface NetWorthMilestonePoint {
  milestoneTargetAmount: number;
  label: string;
  isAchieved: boolean;
  estimatedMonthsToReach: number;
  projectedAchieveDate: string;
}

export class NetWorthMilestoneEngine {
  public static calculateMilestones(
    currentNetWorth: number,
    monthlyNetSavings: number,
    annualAssetReturnPercent = 8
  ): NetWorthMilestonePoint[] {
    const targets = [250000, 500000, 1000000, 2500000, 5000000, 10000000];

    return targets.map((target) => {
      const isAchieved = currentNetWorth >= target;
      const shortfall = Math.max(0, target - currentNetWorth);

      const months = monthlyNetSavings > 0 ? Math.ceil(shortfall / monthlyNetSavings) : 999;
      const d = new Date();
      d.setMonth(d.getMonth() + months);

      return {
        milestoneTargetAmount: target,
        label: `₹${(target / 100000).toFixed(1)} Lakhs Milestone`,
        isAchieved,
        estimatedMonthsToReach: isAchieved ? 0 : months,
        projectedAchieveDate: isAchieved ? 'ACHIEVED' : d.toISOString().split('T')[0],
      };
    });
  }
}
