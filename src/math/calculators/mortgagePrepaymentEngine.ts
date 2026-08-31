export interface PrepaymentImpactAnalysis {
  originalLoanAmount: number;
  annualInterestRatePercent: number;
  originalTenureMonths: number;
  originalMonthlyEMI: number;
  extraMonthlyPrepayment: number;
  newTenureMonths: number;
  monthsSaved: number;
  yearsSaved: number;
  originalTotalInterest: number;
  newTotalInterest: number;
  netInterestSavings: number;
}

export class MortgagePrepaymentEngine {
  public static calculatePrepaymentImpact(
    originalLoanAmount: number,
    annualInterestRatePercent: number,
    originalTenureMonths: number,
    extraMonthlyPrepayment: number
  ): PrepaymentImpactAnalysis {
    const monthlyRate = annualInterestRatePercent / 100 / 12;

    const emiNumerator = originalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, originalTenureMonths);
    const emiDenominator = Math.pow(1 + monthlyRate, originalTenureMonths) - 1;
    const originalMonthlyEMI = Math.round(emiNumerator / emiDenominator);

    const originalTotalInterest = originalMonthlyEMI * originalTenureMonths - originalLoanAmount;

    let balance = originalLoanAmount;
    let monthsCount = 0;
    let newTotalInterest = 0;

    const newMonthlyPayment = originalMonthlyEMI + extraMonthlyPrepayment;

    while (balance > 0 && monthsCount < originalTenureMonths * 2) {
      monthsCount++;
      const interest = balance * monthlyRate;
      newTotalInterest += interest;

      const principalPaid = Math.min(balance, Math.max(0, newMonthlyPayment - interest));
      balance -= principalPaid;
    }

    const monthsSaved = Math.max(0, originalTenureMonths - monthsCount);
    const yearsSaved = parseFloat((monthsSaved / 12).toFixed(1));
    const netInterestSavings = Math.max(0, Math.round(originalTotalInterest - newTotalInterest));

    return {
      originalLoanAmount,
      annualInterestRatePercent,
      originalTenureMonths,
      originalMonthlyEMI,
      extraMonthlyPrepayment,
      newTenureMonths: monthsCount,
      monthsSaved,
      yearsSaved,
      originalTotalInterest: Math.round(originalTotalInterest),
      newTotalInterest: Math.round(newTotalInterest),
      netInterestSavings,
    };
  }
}
