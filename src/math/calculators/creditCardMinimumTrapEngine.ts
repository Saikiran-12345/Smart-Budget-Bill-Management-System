export interface MinimumPaymentTrapAnalysis {
  cardBalance: number;
  annualAPRPercent: number;
  minimumMonthlyPayment: number;
  monthsToPayoffMinimum: number;
  totalInterestPaidMinimum: number;
  totalAmountPaidMinimum: number;
  fixedMonthlyPayoffPlan: {
    monthlyPayment: number;
    monthsToPayoff: number;
    totalInterestPaid: number;
    totalAmountPaid: number;
  };
  interestSavingsAmount: number;
  timeSavingsMonths: number;
}

export class CreditCardMinimumTrapEngine {
  public static calculateTrap(
    cardBalance = 60000,
    annualAPRPercent = 36,
    fixedMonthlyPayment = 3500
  ): MinimumPaymentTrapAnalysis {
    const monthlyRate = annualAPRPercent / 100 / 12;

    // Minimum Payment model (5% of balance or ₹500)
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

    const interestSavingsAmount = Math.max(0, Math.round(minInterestTotal - fixedInterestTotal));
    const timeSavingsMonths = Math.max(0, minMonths - fixedMonths);

    return {
      cardBalance,
      annualAPRPercent,
      minimumMonthlyPayment: Math.round(Math.max(500, cardBalance * 0.05)),
      monthsToPayoffMinimum: minMonths,
      totalInterestPaidMinimum: Math.round(minInterestTotal),
      totalAmountPaidMinimum: Math.round(cardBalance + minInterestTotal),
      fixedMonthlyPayoffPlan: {
        monthlyPayment: fixedMonthlyPayment,
        monthsToPayoff: fixedMonths,
        totalInterestPaid: Math.round(fixedInterestTotal),
        totalAmountPaid: Math.round(cardBalance + fixedInterestTotal),
      },
      interestSavingsAmount,
      timeSavingsMonths,
    };
  }
}
