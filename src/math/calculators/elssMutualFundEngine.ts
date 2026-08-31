export interface ELSSInvestmentResult {
  monthlySIPAmount: number;
  annualSIPTotal: number;
  lockInPeriodYears: number; // 3 years for ELSS
  section80CDeductionClaimed: number;
  potentialTaxSaved: number;
  projectedCorpus3Years: number;
  totalGain: number;
}

export class ELSSMutualFundEngine {
  public static calculateELSSInvestment(
    monthlySIPAmount = 12500,
    expectedAnnualReturnPercent = 12
  ): ELSSInvestmentResult {
    const annualSIPTotal = monthlySIPAmount * 12;
    const section80CDeductionClaimed = Math.min(150000, annualSIPTotal);
    const potentialTaxSaved = Math.round(section80CDeductionClaimed * 0.30); // 30% slab

    const lockInPeriodYears = 3;
    const totalMonths = lockInPeriodYears * 12;
    const monthlyRate = expectedAnnualReturnPercent / 100 / 12;

    let corpus = 0;
    for (let m = 1; m <= totalMonths; m++) {
      corpus = (corpus + monthlySIPAmount) * (1 + monthlyRate);
    }

    const totalInvested = monthlySIPAmount * totalMonths;
    const totalGain = Math.round(corpus - totalInvested);

    return {
      monthlySIPAmount,
      annualSIPTotal,
      lockInPeriodYears,
      section80CDeductionClaimed,
      potentialTaxSaved,
      projectedCorpus3Years: Math.round(corpus),
      totalGain,
    };
  }
}
