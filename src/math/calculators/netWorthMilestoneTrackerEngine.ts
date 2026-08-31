export interface MilestoneTargetDetail {
  milestoneAmount: number;
  label: string;
  isAchieved: boolean;
  monthsRemaining: number;
  projectedAchieveDate: string;
}

export class NetWorthMilestoneTrackerEngine {
  public static calculateMilestones(
    currentNetWorth: number,
    monthlyNetSavings: number
  ): MilestoneTargetDetail[] {
    const milestones = [100000, 250000, 500000, 1000000, 2500000, 5000000, 10000000];

    return milestones.map((target) => {
      const isAchieved = currentNetWorth >= target;
      const shortfall = Math.max(0, target - currentNetWorth);

      const months = monthlyNetSavings > 0 ? Math.ceil(shortfall / monthlyNetSavings) : 999;
      const d = new Date();
      d.setMonth(d.getMonth() + months);

      return {
        milestoneAmount: target,
        label: `₹${(target / 100000).toFixed(1)} Lakhs Milestone`,
        isAchieved,
        monthsRemaining: isAchieved ? 0 : months,
        projectedAchieveDate: isAchieved ? 'ACHIEVED' : d.toISOString().split('T')[0],
      };
    });
  }
}
