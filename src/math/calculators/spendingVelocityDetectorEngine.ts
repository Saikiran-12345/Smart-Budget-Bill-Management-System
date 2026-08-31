import { ExpenseItem } from '../../types/expense';

export interface VelocityWindowAnalysis {
  windowDays: number;
  totalSpentInWindow: number;
  dailyAverageBurnRate: number;
  projectedMonthlySpent: number;
  trendStatus: 'ACCELERATING' | 'STABLE' | 'DECELERATING';
}

export class SpendingVelocityDetectorEngine {
  public static calculateVelocity(expenses: ExpenseItem[]): {
    last7DaysWindow: VelocityWindowAnalysis;
    last30DaysWindow: VelocityWindowAnalysis;
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
        windowDays: 7,
        totalSpentInWindow: Math.round(sum7),
        dailyAverageBurnRate: Math.round(dailyBurn7),
        projectedMonthlySpent: Math.round(dailyBurn7 * 30),
        trendStatus,
      },
      last30DaysWindow: {
        windowDays: 30,
        totalSpentInWindow: Math.round(sum30),
        dailyAverageBurnRate: Math.round(dailyBurn30),
        projectedMonthlySpent: Math.round(sum30),
        trendStatus: 'STABLE',
      },
      isBurnSpikeDetected,
    };
  }
}
