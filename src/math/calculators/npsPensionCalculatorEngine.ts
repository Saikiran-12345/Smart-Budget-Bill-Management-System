export interface NPSPensionResult {
  currentAge: number;
  retirementAge: number;
  monthlyContribution: number;
  expectedAnnualReturnPercent: number;
  annuityAnnuityPurchasePercent: number; // e.g. 40% min
  expectedAnnuityReturnPercent: number; // e.g. 6%
  totalInvestedAmount: number;
  totalMaturityCorpus: number;
  lumpSumTaxFreeWithdrawal: number; // 60% max
  annuityCorpusPurchased: number; // 40% min
  estimatedMonthlyPension: number;
  taxSavedSection80CCD1B: number;
}

export class NPSPensionCalculatorEngine {
  public static calculateNPSPension(
    currentAge: number,
    retirementAge = 60,
    monthlyContribution = 5000,
    expectedAnnualReturnPercent = 10,
    annuityAnnuityPurchasePercent = 40,
    expectedAnnuityReturnPercent = 6
  ): NPSPensionResult {
    const totalYears = Math.max(1, retirementAge - currentAge);
    const totalMonths = totalYears * 12;
    const monthlyRate = expectedAnnualReturnPercent / 100 / 12;

    let corpus = 0;
    let totalInvested = 0;

    for (let m = 1; m <= totalMonths; m++) {
      totalInvested += monthlyContribution;
      corpus = (corpus + monthlyContribution) * (1 + monthlyRate);
    }

    const lumpSumPct = 100 - annuityAnnuityPurchasePercent;
    const lumpSumTaxFreeWithdrawal = Math.round((corpus * lumpSumPct) / 100);
    const annuityCorpusPurchased = Math.round((corpus * annuityAnnuityPurchasePercent) / 100);

    const estimatedMonthlyPension = Math.round((annuityCorpusPurchased * (expectedAnnuityReturnPercent / 100)) / 12);
    const taxSavedSection80CCD1B = Math.round(Math.min(50000, monthlyContribution * 12) * 0.30); // 30% top bracket

    return {
      currentAge,
      retirementAge,
      monthlyContribution,
      expectedAnnualReturnPercent,
      annuityAnnuityPurchasePercent,
      expectedAnnuityReturnPercent,
      totalInvestedAmount: Math.round(totalInvested),
      totalMaturityCorpus: Math.round(corpus),
      lumpSumTaxFreeWithdrawal,
      annuityCorpusPurchased,
      estimatedMonthlyPension,
      taxSavedSection80CCD1B,
    };
  }
}
