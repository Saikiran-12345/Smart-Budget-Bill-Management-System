import { SpendingVelocityTrackerEngine, VelocityWindowMetric } from '../math/calculators/spendingVelocityTrackerEngine';
import { ExpenseService } from './expenseService';

export class SpendingVelocityService {
  public static getVelocityAnalysis(): {
    last7Days: VelocityWindowMetric;
    last30Days: VelocityWindowMetric;
    isSpikeDetected: boolean;
  } {
    const expenses = ExpenseService.getAll();
    return SpendingVelocityTrackerEngine.calculateVelocityWindows(expenses);
  }
}
