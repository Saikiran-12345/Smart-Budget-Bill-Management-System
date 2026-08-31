export interface MinimumTrapComparison {
  cardBalance: number;
  annualAPRPercent: number;
  minimumMonthlyPayment: number;
  monthsToPayoffMinimum: number;
  totalInterestPaidMinimum: number;
  totalOutflowMinimum: number;
  fixedMonthlyPayoff: {
    monthlyPayment: number;
    monthsToPayoff: number;
    totalInterestPaid: number;
    totalOutflow: number;
  };
  netInterestSavingsAmount: number;
  timeSavedMonths: number;
}

export class CreditCardMinimumPaymentTrapEngine {
  public static calculateMinimumTrap(
    cardBalance = 80000,
    annualAPRPercent = 36,
    fixedMonthlyPayment = 4500
  ): MinimumTrapComparison {
    const monthlyRate = annualAPRPercent / 100 / 12;

    // Minimum Payment model (5% or ₹500)
    let minBal = cardBalance;
    let minMonths = 0;
    let minInterestTotal = 0;

    while (minBal > 1 && minMonths < 360) {
      minMonths++;
      const interest = minBal * monthlyRate;
      minInterestTotal += interest;

      const minPay = Math.max(500, minBal * 0.05);
      const principal = Math.min(minBal, Math.max(0, minPay - interest));
      minBal -= principal;
    }

    // Fixed Payment model
    let fixedBal = cardBalance;
    let fixedMonths = 0;
    let fixedInterestTotal = 0;

    while (fixedBal > 0 && fixedMonths < 360) {
      fixedMonths++;
      const interest = fixedBal * monthlyRate;
      fixedInterestTotal += interest;

      const principal = Math.min(fixedBal, Math.max(0, fixedMonthlyPayment - interest));
      fixedBal -= principal;
    }

    const netInterestSavingsAmount = Math.max(0, Math.round(minInterestTotal - fixedInterestTotal));
    const timeSavedMonths = Math.max(0, minMonths - fixedMonths);

    return {
      cardBalance,
      annualAPRPercent,
      minimumMonthlyPayment: Math.round(Math.max(500, cardBalance * 0.05)),
      monthsToPayoffMinimum: minMonths,
      totalInterestPaidMinimum: Math.round(minInterestTotal),
      totalOutflowMinimum: Math.round(cardBalance + minInterestTotal),
      fixedMonthlyPayoff: {
        monthlyPayment: fixedMonthlyPayment,
        monthsToPayoff: fixedMonths,
        totalInterestPaid: Math.round(fixedInterestTotal),
        totalOutflow: Math.round(cardBalance + fixedInterestTotal),
      },
      netInterestSavingsAmount,
      timeSavedMonths,
    };
  }
}
