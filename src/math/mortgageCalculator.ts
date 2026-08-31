export interface MortgageAmortizationMonth {
  month: number;
  year: number;
  beginningBalance: number;
  monthlyEMI: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

export interface MortgageCalculationResult {
  loanAmount: number;
  annualInterestRate: number;
  tenureYears: number;
  monthlyEMI: number;
  totalInterestPayable: number;
  totalAmountPayable: number;
  prepaymentSavingsEstimate: number;
  amortizationSchedule: MortgageAmortizationMonth[];
}

export class MortgageCalculator {
  public static calculateMortgage(
    loanAmount: number,
    annualInterestRatePercentage: number,
    tenureYears: number,
    extraMonthlyPrepayment = 0
  ): MortgageCalculationResult {
    const monthlyRate = annualInterestRatePercentage / 100 / 12;
    const totalMonths = tenureYears * 12;

    // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emiNumerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
    const emiDenominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
    const monthlyEMI = Math.round(emiNumerator / emiDenominator);

    let currentBalance = loanAmount;
    let totalInterest = 0;
    const amortizationSchedule: MortgageAmortizationMonth[] = [];

    for (let m = 1; m <= totalMonths && currentBalance > 0; m++) {
      const interestForMonth = currentBalance * monthlyRate;
      totalInterest += interestForMonth;

      const totalPayment = monthlyEMI + extraMonthlyPrepayment;
      const principalPaid = Math.min(currentBalance, Math.max(0, totalPayment - interestForMonth));
      const endingBalance = Math.max(0, currentBalance - principalPaid);

      if (m % 12 === 0 || endingBalance === 0) {
        amortizationSchedule.push({
          month: m,
          year: Math.ceil(m / 12),
          beginningBalance: Math.round(currentBalance),
          monthlyEMI,
          principalPaid: Math.round(principalPaid),
          interestPaid: Math.round(interestForMonth),
          endingBalance: Math.round(endingBalance),
        });
      }

      currentBalance = endingBalance;
    }

    const baselineTotalInterest = monthlyEMI * totalMonths - loanAmount;
    const prepaymentSavingsEstimate = Math.max(0, Math.round(baselineTotalInterest - totalInterest));

    return {
      loanAmount,
      annualInterestRate: annualInterestRatePercentage,
      tenureYears,
      monthlyEMI,
      totalInterestPayable: Math.round(totalInterest),
      totalAmountPayable: Math.round(loanAmount + totalInterest),
      prepaymentSavingsEstimate,
      amortizationSchedule,
    };
  }
}
