export interface FreelanceRateCalculation {
  targetNetAnnualIncome: number;
  billableHoursPerWeek: number;
  vacationWeeksPerYear: number;
  annualTaxBufferPercent: number;
  totalBillableHoursPerYear: number;
  grossAnnualRevenueTarget: number;
  minimumHourlyRateRequired: number;
  minimumDailyRateRequired: number;
}

export class FreelanceInvoiceEngine {
  public static calculateFreelanceRate(
    targetNetAnnualIncome: number,
    billableHoursPerWeek = 25,
    vacationWeeksPerYear = 4,
    annualTaxBufferPercent = 25,
    businessOverheadAnnual = 100000
  ): FreelanceRateCalculation {
    const workingWeeks = Math.max(1, 52 - vacationWeeksPerYear);
    const totalBillableHoursPerYear = billableHoursPerWeek * workingWeeks;

    const grossTargetWithTax = (targetNetAnnualIncome + businessOverheadAnnual) / (1 - annualTaxBufferPercent / 100);
    const minimumHourlyRateRequired = totalBillableHoursPerYear > 0 ? grossTargetWithTax / totalBillableHoursPerYear : 0;
    const minimumDailyRateRequired = minimumHourlyRateRequired * 8;

    return {
      targetNetAnnualIncome,
      billableHoursPerWeek,
      vacationWeeksPerYear,
      annualTaxBufferPercent,
      totalBillableHoursPerYear,
      grossAnnualRevenueTarget: Math.round(grossTargetWithTax),
      minimumHourlyRateRequired: Math.round(minimumHourlyRateRequired),
      minimumDailyRateRequired: Math.round(minimumDailyRateRequired),
    };
  }
}
