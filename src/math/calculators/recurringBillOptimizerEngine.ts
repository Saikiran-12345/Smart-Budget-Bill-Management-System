import { BillItem } from '../../types/bill';

export interface OptimizedBillCycleDetail {
  billId: string;
  billName: string;
  currentFrequency: string;
  currentAnnualCost: number;
  annualBillingCost: number; // yearly plan cost
  potentialAnnualSavings: number;
  recommendation: string;
}

export class RecurringBillOptimizerEngine {
  public static optimizeBillCycles(bills: BillItem[]): {
    totalPotentialAnnualSavings: number;
    optimizations: OptimizedBillCycleDetail[];
  } {
    let totalPotentialAnnualSavings = 0;
    const optimizations: OptimizedBillCycleDetail[] = [];

    bills.forEach((b) => {
      let currentAnnual = b.amount * 12;
      if (b.frequency === 'YEARLY') currentAnnual = b.amount;

      // Typical yearly plans give 15-20% discount compared to monthly billing
      const estimatedAnnualPlanCost = Math.round(currentAnnual * 0.82);
      const savings = Math.max(0, currentAnnual - estimatedAnnualPlanCost);

      if (b.frequency === 'MONTHLY' && savings > 500) {
        totalPotentialAnnualSavings += savings;
        optimizations.push({
          billId: b.id,
          billName: b.billName,
          currentFrequency: b.frequency,
          currentAnnualCost: Math.round(currentAnnual),
          annualBillingCost: estimatedAnnualPlanCost,
          potentialAnnualSavings: savings,
          recommendation: `Switch ${b.billName} to an Annual billing plan to save ₹${savings}/yr.`,
        });
      }
    });

    return {
      totalPotentialAnnualSavings: Math.round(totalPotentialAnnualSavings),
      optimizations,
    };
  }
}
