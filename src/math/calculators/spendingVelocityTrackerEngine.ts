import { ExpenseItem } from '../../types/expense';

export interface VelocityWindowMetric {
  windowDays: number;
  totalSpent: number;
  dailyBurnRate: number;
  projectedMonthlySpend: number;
  velocityTrend: 'ACCELERATING' | 'STABLE' | 'DECELERATING';
}

export class SpendingVelocityTrackerEngine {
  public static calculateVelocityWindows(expenses: ExpenseItem[]): {
    last7Days: VelocityWindowMetric;
    last30Days: VelocityWindowMetric;
    isSpikeDetected: boolean;
  } {
    const today = new Date();
    const todayTime = today.getTime();

    let sum7Days = 0;
    let sum30Days = 0;

    expenses.forEach((e) => {
      const d = new Date(e.date);
      if (isNaN(d.getTime())) return;

      const diffDays = (todayTime - d.getTime()) / (1000 * 3600 * 24);
      if (diffDays <= 7) sum7Days += e.amount;
      if (diffDays <= 30) sum30Days += e.amount;
    });

    const dailyBurn7 = sum7Days / 7;
    const dailyBurn30 = sum30Days / 30;

    let velocityTrend: 'ACCELERATING' | 'STABLE' | 'DECELERATING' = 'STABLE';
    if (dailyBurn7 > dailyBurn30 * 1.3) velocityTrend = 'ACCELERATING';
    else if (dailyBurn7 < dailyBurn30 * 0.7) velocityTrend = 'DECELERATING';

    const isSpikeDetected = dailyBurn7 > dailyBurn30 * 1.5;

    return {
      last7Days: {
        windowDays: 7,
        totalSpent: Math.round(sum7Days),
        dailyBurnRate: Math.round(dailyBurn7),
        projectedMonthlySpend: Math.round(dailyBurn7 * 30),
        velocityTrend,
      },
      last30Days: {
        windowDays: 30,
        totalSpent: Math.round(sum30Days),
        dailyBurnRate: Math.round(dailyBurn30),
        projectedMonthlySpend: Math.round(sum30Days),
        velocityTrend: 'STABLE',
      },
      isSpikeDetected,
    };
  }
}
