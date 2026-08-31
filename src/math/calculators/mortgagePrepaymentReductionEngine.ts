export interface PrepaymentImpactSummary {
  originalLoanAmount: number;
  annualInterestRatePercent: number;
  originalTenureMonths: number;
  originalMonthlyEMI: number;
  extraPrepaymentMonthly: number;
  newTenureMonths: number;
  monthsSaved: number;
  yearsSaved: number;
  originalTotalInterest: number;
  newTotalInterest: number;
  netInterestSavings: number;
}

export class MortgagePrepaymentReductionEngine {
  public static calculatePrepaymentImpact(
    originalLoanAmount = 5000000,
    annualInterestRatePercent = 8.5,
    originalTenureMonths = 240,
    extraPrepaymentMonthly = 10000
  ): PrepaymentImpactSummary {
    const monthlyRate = annualInterestRatePercent / 100 / 12;

    const emiNum = originalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, originalTenureMonths);
    const emiDen = Math.pow(1 + monthlyRate, originalTenureMonths) - 1;
    const originalMonthlyEMI = Math.round(emiNum / emiDen);

    const originalTotalInterest = originalMonthlyEMI * originalTenureMonths - originalLoanAmount;

    let balance = originalLoanAmount;
    let monthsCount = 0;
    let newTotalInterest = 0;

    const newPayment = originalMonthlyEMI + extraPrepaymentMonthly;

    while (balance > 0 && monthsCount < originalTenureMonths * 2) {
      monthsCount++;
      const interest = balance * monthlyRate;
      newTotalInterest += interest;

      const principalPaid = Math.min(balance, Math.max(0, newPayment - interest));
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
      extraPrepaymentMonthly,
      newTenureMonths: monthsCount,
      monthsSaved,
      yearsSaved,
      originalTotalInterest: Math.round(originalTotalInterest),
      newTotalInterest: Math.round(newTotalInterest),
      netInterestSavings,
    };
  }
}
