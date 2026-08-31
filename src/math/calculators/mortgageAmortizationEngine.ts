export interface AmortizationScheduleMonth {
  month: number;
  year: number;
  beginningBalance: number;
  monthlyEMI: number;
  principalPaid: number;
  interestPaid: number;
  extraPrepayment: number;
  endingBalance: number;
  cumulativeInterestPaid: number;
  cumulativePrincipalPaid: number;
}

export interface MortgageAmortizationSummary {
  principalAmount: number;
  annualInterestRatePercent: number;
  tenureYears: number;
  scheduledMonthlyEMI: number;
  totalInterestWithoutPrepayment: number;
  totalInterestWithPrepayment: number;
  totalAmountPayable: number;
  interestSavedWithPrepayment: number;
  tenureMonthsSaved: number;
  taxDeductionSec24BAnnualEstimate: number;
  schedule: AmortizationScheduleMonth[];
}

export class MortgageAmortizationEngine {
  public static calculateAmortizationSchedule(
    principalAmount: number,
    annualInterestRatePercent: number,
    tenureYears: number,
    extraMonthlyPrepayment = 0,
    annualLumpSumPrepayment = 0
  ): MortgageAmortizationSummary {
    const monthlyRate = annualInterestRatePercent / 100 / 12;
    const totalTenureMonths = tenureYears * 12;

    // Standard EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emiNumerator = principalAmount * monthlyRate * Math.pow(1 + monthlyRate, totalTenureMonths);
    const emiDenominator = Math.pow(1 + monthlyRate, totalTenureMonths) - 1;
    const scheduledMonthlyEMI = Math.round(emiNumerator / emiDenominator);

    const baselineTotalInterest = scheduledMonthlyEMI * totalTenureMonths - principalAmount;

    let balance = principalAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    let actualMonthsCount = 0;

    const schedule: AmortizationScheduleMonth[] = [];

    while (balance > 0 && actualMonthsCount < totalTenureMonths * 2) {
      actualMonthsCount++;
      const interestForMonth = balance * monthlyRate;
      totalInterestPaid += interestForMonth;

      let extra = extraMonthlyPrepayment;
      if (actualMonthsCount % 12 === 0) {
        extra += annualLumpSumPrepayment;
      }

      const totalPayment = scheduledMonthlyEMI + extra;
      const principalPaid = Math.min(balance, Math.max(0, totalPayment - interestForMonth));
      totalPrincipalPaid += principalPaid;

      const endingBalance = Math.max(0, balance - principalPaid);

      if (actualMonthsCount % 12 === 0 || endingBalance === 0) {
        schedule.push({
          month: actualMonthsCount,
          year: Math.ceil(actualMonthsCount / 12),
          beginningBalance: Math.round(balance),
          monthlyEMI: scheduledMonthlyEMI,
          principalPaid: Math.round(principalPaid),
          interestPaid: Math.round(interestForMonth),
          extraPrepayment: Math.round(extra),
          endingBalance: Math.round(endingBalance),
          cumulativeInterestPaid: Math.round(totalInterestPaid),
          cumulativePrincipalPaid: Math.round(totalPrincipalPaid),
        });
      }

      balance = endingBalance;
    }

    const interestSavedWithPrepayment = Math.max(0, Math.round(baselineTotalInterest - totalInterestPaid));
    const tenureMonthsSaved = Math.max(0, totalTenureMonths - actualMonthsCount);
    const taxDeductionSec24BAnnualEstimate = Math.min(200000, Math.round(totalInterestPaid / (actualMonthsCount / 12 || 1)));

    return {
      principalAmount,
      annualInterestRatePercent,
      tenureYears,
      scheduledMonthlyEMI,
      totalInterestWithoutPrepayment: Math.round(baselineTotalInterest),
      totalInterestWithPrepayment: Math.round(totalInterestPaid),
      totalAmountPayable: Math.round(principalAmount + totalInterestPaid),
      interestSavedWithPrepayment,
      tenureMonthsSaved,
      taxDeductionSec24BAnnualEstimate,
      schedule,
    };
  }
}
