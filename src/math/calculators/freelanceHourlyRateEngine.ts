export interface FreelanceTargetRate {
  targetAnnualNetSalary: number;
  annualBusinessOverheadExpenses: number;
  desiredVacationWeeks: number;
  billableHoursPerWeek: number;
  totalBillableHoursPerYear: number;
  targetHourlyRateINR: number;
  targetDailyRateINR: number;
  effectiveGrossRevenueNeeded: number;
}

export class FreelanceHourlyRateEngine {
  public static calculateTargetRate(
    targetAnnualNetSalary = 1800000,
    annualBusinessOverheadExpenses = 300000,
    desiredVacationWeeks = 4,
    billableHoursPerWeek = 25
  ): FreelanceTargetRate {
    const workingWeeks = Math.max(1, 52 - desiredVacationWeeks);
    const totalBillableHoursPerYear = workingWeeks * billableHoursPerWeek;

    // Revenue needed = Net Salary + Overhead + 15% Tax buffer
    const effectiveGrossRevenueNeeded = Math.round((targetAnnualNetSalary + annualBusinessOverheadExpenses) * 1.15);

    const targetHourlyRateINR = totalBillableHoursPerYear > 0 ? effectiveGrossRevenueNeeded / totalBillableHoursPerYear : 0;
    const targetDailyRateINR = targetHourlyRateINR * 8;

    return {
      targetAnnualNetSalary,
      annualBusinessOverheadExpenses,
      desiredVacationWeeks,
      billableHoursPerWeek,
      totalBillableHoursPerYear,
      targetHourlyRateINR: Math.round(targetHourlyRateINR),
      targetDailyRateINR: Math.round(targetDailyRateINR),
      effectiveGrossRevenueNeeded,
    };
  }
}
