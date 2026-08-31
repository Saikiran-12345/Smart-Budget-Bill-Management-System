export interface MilestoneProgressionPoint {
  milestoneAmount: number;
  milestoneLabel: string;
  isAchieved: boolean;
  monthsRemaining: number;
  projectedAchieveDate: string;
}

export class NetWorthMilestoneProgressionEngine {
  public static calculateMilestones(
    currentNetWorth = 650000,
    monthlyNetSavings = 25000
  ): MilestoneProgressionPoint[] {
    const targets = [250000, 500000, 1000000, 2500000, 5000000, 10000000];

    return targets.map((target) => {
      const isAchieved = currentNetWorth >= target;
      const shortfall = Math.max(0, target - currentNetWorth);

      const months = monthlyNetSavings > 0 ? Math.ceil(shortfall / monthlyNetSavings) : 999;
      const d = new Date();
      d.setMonth(d.getMonth() + months);

      return {
        milestoneAmount: target,
        milestoneLabel: `₹${(target / 100000).toFixed(1)} Lakhs Milestone`,
        isAchieved,
        monthsRemaining: isAchieved ? 0 : months,
        projectedAchieveDate: isAchieved ? 'ACHIEVED' : d.toISOString().split('T')[0],
      };
    });
  }
}
