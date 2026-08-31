export interface LoanComparisonDetail {
  loanType: 'GOLD_LOAN' | 'PERSONAL_LOAN';
  requiredPrincipal: number;
  annualInterestRatePercent: number;
  tenureMonths: number;
  processingFee: number;
  monthlyEMI: number;
  totalInterestPaid: number;
  totalOutflow: number;
  collateralRequiredText: string;
}

export class GoldLoanVsPersonalLoanEngine {
  public static compareOptions(
    requiredPrincipal = 300000,
    tenureMonths = 24,
    goldGramWeight = 60
  ): {
    goldLoan: LoanComparisonDetail;
    personalLoan: LoanComparisonDetail;
    cheaperOption: 'GOLD_LOAN' | 'PERSONAL_LOAN';
    interestSavingsAmount: number;
  } {
    // 1. Gold Loan (8.5% interest, 0.5% fee)
    const goldRate = 8.5 / 100 / 12;
    const goldEMI = Math.round(
      (requiredPrincipal * goldRate * Math.pow(1 + goldRate, tenureMonths)) / (Math.pow(1 + goldRate, tenureMonths) - 1)
    );
    const goldTotalInterest = goldEMI * tenureMonths - requiredPrincipal;
    const goldOutflow = goldEMI * tenureMonths + requiredPrincipal * 0.005;

    // 2. Personal Loan (14.5% interest, 1.5% fee)
    const plRate = 14.5 / 100 / 12;
    const plEMI = Math.round(
      (requiredPrincipal * plRate * Math.pow(1 + plRate, tenureMonths)) / (Math.pow(1 + plRate, tenureMonths) - 1)
    );
    const plTotalInterest = plEMI * tenureMonths - requiredPrincipal;
    const plOutflow = plEMI * tenureMonths + requiredPrincipal * 0.015;

    const cheaperOption = goldOutflow <= plOutflow ? 'GOLD_LOAN' : 'PERSONAL_LOAN';
    const interestSavingsAmount = Math.max(0, Math.round(plTotalInterest - goldTotalInterest));

    return {
      goldLoan: {
        loanType: 'GOLD_LOAN',
        requiredPrincipal,
        annualInterestRatePercent: 8.5,
        tenureMonths,
        processingFee: Math.round(requiredPrincipal * 0.005),
        monthlyEMI: goldEMI,
        totalInterestPaid: Math.round(goldTotalInterest),
        totalOutflow: Math.round(goldOutflow),
        collateralRequiredText: `${goldGramWeight}g 22K Gold Ornaments`,
      },
      personalLoan: {
        loanType: 'PERSONAL_LOAN',
        requiredPrincipal,
        annualInterestRatePercent: 14.5,
        tenureMonths,
        processingFee: Math.round(requiredPrincipal * 0.015),
        monthlyEMI: plEMI,
        totalInterestPaid: Math.round(plTotalInterest),
        totalOutflow: Math.round(plOutflow),
        collateralRequiredText: 'None (Unsecured)',
      },
      cheaperOption,
      interestSavingsAmount,
    };
  }
}
