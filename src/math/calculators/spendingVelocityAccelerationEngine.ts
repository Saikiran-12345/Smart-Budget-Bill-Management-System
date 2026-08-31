import { ExpenseItem } from '../../types/expense';

export interface VelocityWindowMetricDetail {
  timeWindowDays: number;
  totalSpentInWindow: number;
  dailyBurnRate: number;
  projectedMonthlySpend: number;
  trendStatus: 'ACCELERATING' | 'STABLE' | 'DECELERATING';
}

export class SpendingVelocityAccelerationEngine {
  public static calculateVelocity(expenses: ExpenseItem[]): {
    last7DaysWindow: VelocityWindowMetricDetail;
    last30DaysWindow: VelocityWindowMetricDetail;
    isBurnSpikeDetected: boolean;
  } {
    const today = new Date();
    const todayTime = today.getTime();

    let sum7 = 0;
    let sum30 = 0;

    expenses.forEach((e) => {
      const d = new Date(e.date);
      if (isNaN(d.getTime())) return;

      const diffDays = (todayTime - d.getTime()) / (1000 * 3600 * 24);
      if (diffDays <= 7) sum7 += e.amount;
      if (diffDays <= 30) sum30 += e.amount;
    });

    const dailyBurn7 = sum7 / 7;
    const dailyBurn30 = sum30 / 30;

    let trendStatus: 'ACCELERATING' | 'STABLE' | 'DECELERATING' = 'STABLE';
    if (dailyBurn7 > dailyBurn30 * 1.3) trendStatus = 'ACCELERATING';
    else if (dailyBurn7 < dailyBurn30 * 0.7) trendStatus = 'DECELERATING';

    const isBurnSpikeDetected = dailyBurn7 > dailyBurn30 * 1.5;

    return {
      last7DaysWindow: {
        timeWindowDays: 7,
        totalSpentInWindow: Math.round(sum7),
        dailyBurnRate: Math.round(dailyBurn7),
        projectedMonthlySpend: Math.round(dailyBurn7 * 30),
        trendStatus,
      },
      last30DaysWindow: {
        timeWindowDays: 30,
        totalSpentInWindow: Math.round(sum30),
        dailyBurnRate: Math.round(dailyBurn30),
        projectedMonthlySpend: Math.round(sum30),
        trendStatus: 'STABLE',
      },
      isBurnSpikeDetected,
    };
  }
}
