export interface LoanAmortizationMonth {
  month: number;
  beginningBalance: number;
  scheduledEMI: number;
  extraPrepayment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export interface DetailedAmortizationResult {
  principalAmount: number;
  annualInterestRate: number;
  tenureMonths: number;
  baseMonthlyEMI: number;
  totalInterestWithoutPrepayment: number;
  totalInterestWithPrepayment: number;
  interestSavings: number;
  monthsSaved: number;
  schedule: LoanAmortizationMonth[];
}

export class LoanAmortizationCalculator {
  public static calculateDetailedAmortization(
    principal: number,
    annualInterestRatePercent: number,
    tenureMonths: number,
    extraMonthlyPrepayment = 0,
    annualLumpSumPrepayment = 0
  ): DetailedAmortizationResult {
    const monthlyRate = annualInterestRatePercent / 100 / 12;

    const emiNumerator = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
    const emiDenominator = Math.pow(1 + monthlyRate, tenureMonths) - 1;
    const baseMonthlyEMI = Math.round(emiNumerator / emiDenominator);

    const baseTotalInterest = baseMonthlyEMI * tenureMonths - principal;

    let balance = principal;
    let totalInterest = 0;
    let actualMonths = 0;

    const schedule: LoanAmortizationMonth[] = [];

    while (balance > 0 && actualMonths < tenureMonths * 2) {
      actualMonths++;
      const interestForMonth = balance * monthlyRate;
      totalInterest += interestForMonth;

      let extra = extraMonthlyPrepayment;
      if (actualMonths % 12 === 0) {
        extra += annualLumpSumPrepayment;
      }

      const totalPayment = baseMonthlyEMI + extra;
      const principalPaid = Math.min(balance, Math.max(0, totalPayment - interestForMonth));
      const remainingBalance = Math.max(0, balance - principalPaid);

      if (actualMonths % 12 === 0 || remainingBalance === 0) {
        schedule.push({
          month: actualMonths,
          beginningBalance: Math.round(balance),
          scheduledEMI: baseMonthlyEMI,
          extraPrepayment: Math.round(extra),
          principalPaid: Math.round(principalPaid),
          interestPaid: Math.round(interestForMonth),
          remainingBalance: Math.round(remainingBalance),
        });
      }

      balance = remainingBalance;
    }

    const interestSavings = Math.max(0, Math.round(baseTotalInterest - totalInterest));
    const monthsSaved = Math.max(0, tenureMonths - actualMonths);

    return {
      principalAmount: principal,
      annualInterestRate: annualInterestRatePercent,
      tenureMonths,
      baseMonthlyEMI,
      totalInterestWithoutPrepayment: Math.round(baseTotalInterest),
      totalInterestWithPrepayment: Math.round(totalInterest),
      interestSavings,
      monthsSaved,
      schedule,
    };
  }
}
