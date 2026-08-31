export interface CreditCardPayoffResult {
  cardBalance: number;
  annualAPRPercent: number;
  minimumMonthlyPayment: number;
  fixedMonthlyPayment: number;
  minimumPaymentPlan: {
    monthsToPayoff: number;
    totalInterestPaid: number;
    totalAmountPaid: number;
  };
  fixedPaymentPlan: {
    monthsToPayoff: number;
    totalInterestPaid: number;
    totalAmountPaid: number;
  };
  interestSavedWithFixedPlan: number;
  monthsSavedWithFixedPlan: number;
}

export class CreditCardPayoffCalculator {
  public static calculatePayoff(
    cardBalance: number,
    annualAPRPercent: number,
    fixedMonthlyPayment: number
  ): CreditCardPayoffResult {
    const monthlyRate = annualAPRPercent / 100 / 12;

    // Minimum payment model (e.g. 5% of balance or ₹500)
    let minBalance = cardBalance;
    let minMonths = 0;
    let minTotalInterest = 0;

    while (minBalance > 1 && minMonths < 360) {
      minMonths++;
      const interest = minBalance * monthlyRate;
      minTotalInterest += interest;
      const minPayment = Math.max(500, minBalance * 0.05);
      const principal = Math.min(minBalance, Math.max(0, minPayment - interest));
      minBalance -= principal;
    }

    // Fixed monthly payment model
    let fixedBalance = cardBalance;
    let fixedMonths = 0;
    let fixedTotalInterest = 0;

    while (fixedBalance > 0 && fixedMonths < 360) {
      fixedMonths++;
      const interest = fixedBalance * monthlyRate;
      fixedTotalInterest += interest;
      const principal = Math.min(fixedBalance, Math.max(0, fixedMonthlyPayment - interest));
      fixedBalance -= principal;
    }

    const interestSavedWithFixedPlan = Math.max(0, Math.round(minTotalInterest - fixedTotalInterest));
    const monthsSavedWithFixedPlan = Math.max(0, minMonths - fixedMonths);

    return {
      cardBalance,
      annualAPRPercent,
      minimumMonthlyPayment: Math.round(Math.max(500, cardBalance * 0.05)),
      fixedMonthlyPayment,
      minimumPaymentPlan: {
        monthsToPayoff: minMonths,
        totalInterestPaid: Math.round(minTotalInterest),
        totalAmountPaid: Math.round(cardBalance + minTotalInterest),
      },
      fixedPaymentPlan: {
        monthsToPayoff: fixedMonths,
        totalInterestPaid: Math.round(fixedTotalInterest),
        totalAmountPaid: Math.round(cardBalance + fixedTotalInterest),
      },
      interestSavedWithFixedPlan,
      monthsSavedWithFixedPlan,
    };
  }
}
